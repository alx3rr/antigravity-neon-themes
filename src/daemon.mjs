/**
 * src/daemon.mjs — Lightweight zero-dependency CDP daemon for Antigravity Worldline
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WORLDLINES, DEFAULT_CONFIG, normalizeConfig, buildThemeCss } from './themes.mjs';
import { createGeminiMetricsService } from './metrics.mjs';
import { buildBrowserBundle } from './browser-bundle.mjs';

export function getDataDir() {
  return path.join(os.homedir(), '.antigravity-worldline');
}

export function getConfigPath() {
  return path.join(getDataDir(), 'config.json');
}

export function getPidPath() {
  return path.join(getDataDir(), 'daemon.pid');
}

export function getConversationsDir() {
  return path.join(os.homedir(), '.gemini', 'antigravity', 'conversations');
}

export function loadConfig() {
  try {
    const raw = JSON.parse(fs.readFileSync(getConfigPath(), 'utf8'));
    return normalizeConfig(raw);
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(cfg) {
  const dir = getDataDir();
  fs.mkdirSync(dir, { recursive: true });
  const normalized = normalizeConfig(cfg);
  fs.writeFileSync(getConfigPath(), JSON.stringify(normalized, null, 2) + '\n', 'utf8');
  return normalized;
}

export function getDevToolsPortCandidates() {
  const candidates = [];
  const envPort = Number(process.env.WORLDLINE_CDP_PORT || 0);
  if (envPort > 0) candidates.push(envPort);

  const userDataDirs = [];
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    userDataDirs.push(path.join(appData, 'Antigravity'));
  } else if (process.platform === 'darwin') {
    userDataDirs.push(path.join(os.homedir(), 'Library', 'Application Support', 'Antigravity'));
  } else {
    userDataDirs.push(path.join(os.homedir(), '.config', 'Antigravity'));
  }

  for (const dir of userDataDirs) {
    try {
      const text = fs.readFileSync(path.join(dir, 'DevToolsActivePort'), 'utf8');
      const firstLine = Number(String(text).split(/\r?\n/)[0].trim());
      if (firstLine > 0 && firstLine < 65536 && !candidates.includes(firstLine)) {
        candidates.push(firstLine);
      }
    } catch {}
  }

  if (!candidates.includes(9222)) candidates.push(9222);
  return candidates;
}

export async function discoverAntigravityTargets() {
  const ports = getDevToolsPortCandidates();
  for (const port of ports) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`, {
        signal: AbortSignal.timeout(1200)
      });
      if (!res.ok) continue;
      const list = await res.json();
      if (!Array.isArray(list)) continue;
      const pages = list.filter(
        (t) =>
          t &&
          t.type === 'page' &&
          t.webSocketDebuggerUrl &&
          !String(t.url || '').startsWith('devtools://') &&
          !String(t.url || '').startsWith('chrome-extension://') &&
          !String(t.url || '').startsWith('data:')
      );
      if (pages.length > 0) {
        return { port, targets: pages };
      }
    } catch {}
  }
  return { port: null, targets: [] };
}

class CdpSession {
  constructor(target, hooks) {
    this.target = target;
    this.hooks = hooks;
    this.ws = null;
    this.seq = 1;
    this.pending = new Map();
    this.closed = false;
    this.cascadeId = '';
    this.lastMetricsSig = '';
  }

  connect() {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.target.webSocketDebuggerUrl);
      this.ws = ws;

      ws.addEventListener('open', async () => {
        try {
          await this.send('Runtime.enable');
          await this.send('Runtime.addBinding', { name: '__wlUpdateConfig' });
          await this.send('Runtime.addBinding', { name: '__wlRequestMetrics' });
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      ws.addEventListener('message', (ev) => {
        let msg;
        try {
          msg = JSON.parse(String(ev.data));
        } catch {
          return;
        }
        if (msg.id && this.pending.has(msg.id)) {
          const { res, rej } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) rej(new Error(msg.error.message || 'CDP error'));
          else res(msg.result);
          return;
        }
        if (msg.method === 'Runtime.bindingCalled' && msg.params) {
          const { name, payload } = msg.params;
          if (name === '__wlUpdateConfig' && this.hooks.onConfigPatch) {
            try {
              this.hooks.onConfigPatch(JSON.parse(payload));
            } catch {}
          } else if (name === '__wlRequestMetrics' && this.hooks.onMetricsRequest) {
            this.cascadeId = String(payload || '').trim();
            this.lastMetricsSig = '';
            this.hooks.onMetricsRequest(this);
          }
        }
      });

      ws.addEventListener('close', () => {
        this.closed = true;
        for (const [, { rej }] of this.pending) rej(new Error('Closed'));
        this.pending.clear();
        if (this.hooks.onClose) this.hooks.onClose(this);
      });

      ws.addEventListener('error', () => {
        if (!this.closed) reject(new Error('WebSocket connection error'));
      });
    });
  }

  send(method, params = {}) {
    if (!this.ws || this.closed || this.ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('Not connected'));
    }
    const id = this.seq++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { res: resolve, rej: reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evalJs(expression) {
    return this.send('Runtime.evaluate', {
      expression,
      silent: true,
      returnByValue: true
    });
  }

  close() {
    this.closed = true;
    try {
      this.ws?.close();
    } catch {}
  }
}

export async function injectDisabledOnce() {
  const { targets } = await discoverAntigravityTargets();
  const disableScript = buildBrowserBundle({
    config: { ...DEFAULT_CONFIG, enabled: false },
    cssText: ''
  });
  for (const t of targets) {
    const sess = new CdpSession(t, {});
    try {
      await sess.connect();
      await sess.evalJs(disableScript);
    } catch {}
    sess.close();
  }
}

async function runDaemon() {
  const dataDir = getDataDir();
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(getPidPath(), String(process.pid), 'utf8');

  let config = loadConfig();
  const metricsService = createGeminiMetricsService(getConversationsDir());
  const sessions = new Map();

  function buildCurrentScript() {
    const cssText = buildThemeCss(config);
    return buildBrowserBundle({ config, cssText });
  }

  async function pushMetrics(sess) {
    if (!config.enabled || !config.showMetrics || sess.closed) return;
    try {
      if (!sess.cascadeId) {
        const res = await sess.evalJs('typeof window.__wl_get_cid === "function" ? window.__wl_get_cid() : ""');
        if (res?.result?.value) sess.cascadeId = String(res.result.value);
      }
      const wl = WORLDLINES[config.preset] || WORLDLINES[DEFAULT_CONFIG.preset];
      const payload = metricsService.buildPayload(sess.cascadeId, wl.divergence);
      const sig = JSON.stringify(payload);
      if (sig === sess.lastMetricsSig) return;
      sess.lastMetricsSig = sig;
      await sess.evalJs(`window.__wl_render_metrics && window.__wl_render_metrics(${sig});`);
    } catch {}
  }

  async function injectAll() {
    const script = buildCurrentScript();
    for (const sess of sessions.values()) {
      if (sess.closed) continue;
      try {
        await sess.evalJs(script);
        sess.lastMetricsSig = '';
        await pushMetrics(sess);
      } catch {}
    }
  }

  async function syncTargets() {
    const { targets } = await discoverAntigravityTargets();
    const activeIds = new Set(targets.map((t) => t.id));

    for (const [id, sess] of sessions.entries()) {
      if (!activeIds.has(id) || sess.closed) {
        sess.close();
        sessions.delete(id);
      }
    }

    const script = buildCurrentScript();
    for (const target of targets) {
      if (sessions.has(target.id)) continue;
      const sess = new CdpSession(target, {
        onConfigPatch: (patch) => {
          config = saveConfig({ ...config, ...patch });
          injectAll();
        },
        onMetricsRequest: (s) => {
          pushMetrics(s);
        },
        onClose: (s) => {
          sessions.delete(s.target.id);
        }
      });
      try {
        await sess.connect();
        sessions.set(target.id, sess);
        await sess.evalJs(script);
        await pushMetrics(sess);
      } catch {
        sess.close();
      }
    }
  }

  await syncTargets();

  const targetInterval = setInterval(() => {
    syncTargets().catch(() => {});
  }, 1000);
  const metricsInterval = setInterval(() => {
    for (const sess of sessions.values()) {
      pushMetrics(sess).catch(() => {});
    }
  }, 2000);

  const shutdown = () => {
    clearInterval(targetInterval);
    clearInterval(metricsInterval);
    for (const sess of sessions.values()) sess.close();
    try {
      const curPid = fs.readFileSync(getPidPath(), 'utf8').trim();
      if (curPid === String(process.pid)) fs.unlinkSync(getPidPath());
    } catch {}
    process.exit(0);
  };

  process.on('uncaughtException', () => {});
  process.on('unhandledRejection', () => {});
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Run when executed directly as a daemon process
const isDirect =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirect) {
  runDaemon();
}
