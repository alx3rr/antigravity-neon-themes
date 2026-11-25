#!/usr/bin/env node
/**
 * cli.mjs — Simple installer, uninstaller & launcher for Antigravity · Neon Themes
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawn } from 'node:child_process';
import { WORLDLINES, DEFAULT_CONFIG } from './src/themes.mjs';
import {
  getDataDir,
  getPidPath,
  loadConfig,
  saveConfig,
  discoverAntigravityTargets,
  injectDisabledOnce
} from './src/daemon.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DAEMON_SCRIPT = path.join(__dirname, 'src', 'daemon.mjs');
const CDP_FLAG = '--remote-debugging-port=0';

function getWindowsShortcuts() {
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  return [
    path.join(appData, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Antigravity.lnk'),
    path.join(appData, 'Microsoft', 'Internet Explorer', 'Quick Launch', 'User Pinned', 'TaskBar', 'Antigravity.lnk'),
    path.join(os.homedir(), 'Desktop', 'Antigravity.lnk'),
    path.join('C:\\Users\\Public\\Desktop', 'Antigravity.lnk')
  ].filter((p) => fs.existsSync(p));
}

function patchWindowsShortcuts(enable) {
  if (process.platform !== 'win32') return [];
  const shortcuts = getWindowsShortcuts();
  const touched = [];
  for (const lnk of shortcuts) {
    const escaped = lnk.replace(/'/g, "''");
    const ps = enable
      ? `$s=(New-Object -ComObject WScript.Shell).CreateShortcut('${escaped}'); if ($s.Arguments -notmatch '--remote-debugging-port=') { $s.Arguments = ($s.Arguments + ' ${CDP_FLAG}').Trim(); $s.Save(); Write-Output 'PATCHED' }`
      : `$s=(New-Object -ComObject WScript.Shell).CreateShortcut('${escaped}'); if ($s.Arguments -match '--remote-debugging-port=\\S*') { $s.Arguments = ($s.Arguments -replace '\\s*--remote-debugging-port=\\S*', '').Trim(); $s.Save(); Write-Output 'CLEANED' }`;
    try {
      const out = execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8' }).trim();
      if (out) touched.push(lnk);
    } catch {}
  }
  return touched;
}

function setupWindowsAutostart(enable) {
  if (process.platform !== 'win32') return;
  const vbsPath = path.join(getDataDir(), 'AntigravityWorldline.vbs');
  const regKey = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  const regName = 'AntigravityWorldline';

  if (enable) {
    fs.mkdirSync(getDataDir(), { recursive: true });
    const nodeExe = process.execPath.replace(/"/g, '""');
    const script = DAEMON_SCRIPT.replace(/"/g, '""');
    const vbs = `CreateObject("WScript.Shell").Run """${nodeExe}"" ""${script}""", 0, False\r\n`;
    fs.writeFileSync(vbsPath, vbs, 'utf8');
    try {
      execFileSync('reg.exe', ['add', regKey, '/v', regName, '/t', 'REG_SZ', '/d', `wscript.exe "${vbsPath}"`, '/f'], {
        stdio: 'ignore'
      });
    } catch {}
  } else {
    try {
      execFileSync('reg.exe', ['delete', regKey, '/v', regName, '/f'], { stdio: 'ignore' });
    } catch {}
    try {
      if (fs.existsSync(vbsPath)) fs.unlinkSync(vbsPath);
    } catch {}
  }
}

function readDaemonPid() {
  try {
    const pid = Number(fs.readFileSync(getPidPath(), 'utf8').trim());
    if (pid > 0) {
      process.kill(pid, 0);
      return pid;
    }
  } catch {}
  return null;
}

function stopDaemon() {
  const pid = readDaemonPid();
  if (pid) {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {}
  }
  if (process.platform === 'win32') {
    try {
      execFileSync(
        'powershell.exe',
        [
          '-NoProfile',
          '-Command',
          "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -like '*daemon.mjs*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
        ],
        { stdio: 'ignore' }
      );
    } catch {}
  }
  try {
    if (fs.existsSync(getPidPath())) fs.unlinkSync(getPidPath());
  } catch {}
}

function startDaemon() {
  stopDaemon();
  if (process.platform === 'win32') {
    const vbsPath = path.join(getDataDir(), 'AntigravityWorldline.vbs');
    if (fs.existsSync(vbsPath)) {
      const cmdLine = `wscript.exe "${vbsPath}"`.replace(/'/g, "''");
      try {
        // Spawn via WMI so the background daemon survives parent terminal / Antigravity restarts
        execFileSync(
          'powershell.exe',
          [
            '-NoProfile',
            '-Command',
            `Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = '${cmdLine}' } | Out-Null`
          ],
          { stdio: 'ignore' }
        );
        return null;
      } catch {}
    }
  }
  const child = spawn(process.execPath, [DAEMON_SCRIPT], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true
  });
  child.unref();
  return child.pid;
}

function findAntigravityExeWindows() {
  const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
  const candidates = [
    path.join(localAppData, 'Programs', 'Antigravity', 'Antigravity.exe'),
    path.join(localAppData, 'Antigravity', 'Antigravity.exe')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // Fallback: read TargetPath from existing shortcut
  for (const lnk of getWindowsShortcuts()) {
    try {
      const escaped = lnk.replace(/'/g, "''");
      const target = execFileSync(
        'powershell.exe',
        ['-NoProfile', '-Command', `(New-Object -ComObject WScript.Shell).CreateShortcut('${escaped}').TargetPath`],
        { encoding: 'utf8' }
      ).trim();
      if (target && fs.existsSync(target)) return target;
    } catch {}
  }
  return null;
}

async function cmdInstall(args) {
  const presetIdx = args.indexOf('--preset');
  const requestedPreset = presetIdx >= 0 ? args[presetIdx + 1] : null;
  const current = loadConfig();
  const next = saveConfig({
    ...current,
    enabled: true,
    ...(requestedPreset && WORLDLINES[requestedPreset] ? { preset: requestedPreset } : {})
  });

  patchWindowsShortcuts(true);
  setupWindowsAutostart(true);
  let pid = startDaemon();

  for (let i = 0; i < 10 && !pid; i++) {
    await new Promise((r) => setTimeout(r, 200));
    pid = readDaemonPid();
  }
  await new Promise((r) => setTimeout(r, 700));
  const { port, targets } = await discoverAntigravityTargets();

  console.log(`\n✦ Antigravity · Neon Themes instalado (${WORLDLINES[next.preset].name})`);
  console.log(`  Demonio activo (${pid ? `PID ${pid}` : 'en segundo plano'})`);
  if (port && targets.length > 0) {
    console.log(`  Conectado a Antigravity (puerto CDP ${port}) — tema aplicado en caliente.`);
  } else {
    console.log('  Antigravity no expone CDP todavía. Ejecuta: node cli.mjs relaunch');
  }
  console.log('');
}

async function cmdUninstall() {
  console.log('Desinstalando Antigravity · Neon Themes...');
  await injectDisabledOnce();
  stopDaemon();
  setupWindowsAutostart(false);
  patchWindowsShortcuts(false);
  try {
    fs.rmSync(getDataDir(), { recursive: true, force: true });
  } catch {}
  console.log('✓ Desinstalado por completo. Antigravity restaurado a su estado original.');
}

async function cmdRelaunch() {
  if (process.platform === 'win32') {
    const exe = findAntigravityExeWindows();
    if (!exe) {
      console.error('No se encontró Antigravity.exe automáticamente. Ábrelo desde el acceso directo actualizado.');
      process.exit(1);
    }
    try {
      execFileSync('taskkill.exe', ['/IM', 'Antigravity.exe', '/F'], { stdio: 'ignore' });
    } catch {}
    await new Promise((r) => setTimeout(r, 1200));
    const child = spawn(exe, [CDP_FLAG], { detached: true, stdio: 'ignore' });
    child.unref();
    console.log(`✓ Antigravity relanzado con ${CDP_FLAG}`);
  } else if (process.platform === 'darwin') {
    try { execFileSync('pkill', ['-x', 'Antigravity'], { stdio: 'ignore' }); } catch {}
    await new Promise((r) => setTimeout(r, 1000));
    spawn('open', ['-a', 'Antigravity', '--args', CDP_FLAG], { detached: true, stdio: 'ignore' }).unref();
    console.log(`✓ Antigravity relanzado con ${CDP_FLAG}`);
  } else {
    console.log(`Lanza Antigravity manualmente con: antigravity ${CDP_FLAG}`);
  }
}

async function cmdStatus() {
  const cfg = loadConfig();
  const pid = readDaemonPid();
  const { port, targets } = await discoverAntigravityTargets();
  const wl = WORLDLINES[cfg.preset] || WORLDLINES[DEFAULT_CONFIG.preset];
  console.log('\nAntigravity · Neon Themes · Estado');
  console.log(`  Future Gadget  : ${wl.name}`);
  console.log(`  Demonio        : ${pid ? `Activo (PID ${pid})` : 'Detenido'}`);
  console.log(`  Puerto CDP     : ${port ? `${port} (${targets.length} ventana/s)` : 'No detectado (usa node cli.mjs relaunch)'}`);
  console.log(`  Métricas Gemini: ${cfg.showMetrics ? 'Activadas' : 'Desactivadas'}`);
  console.log('');
}

const [cmd = 'help', ...rest] = process.argv.slice(2);
if (cmd === 'install') {
  await cmdInstall(rest);
} else if (cmd === 'uninstall') {
  await cmdUninstall();
} else if (cmd === 'relaunch') {
  await cmdRelaunch();
} else if (cmd === 'status') {
  await cmdStatus();
} else {
  console.log(`
Antigravity · Neon Themes · Comandos:
  node cli.mjs install [--preset border-translucent|cyberpunk|border-sunset]
  node cli.mjs relaunch
  node cli.mjs status
  node cli.mjs uninstall
`);
}
