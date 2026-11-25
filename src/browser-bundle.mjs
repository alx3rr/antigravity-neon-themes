/**
 * src/browser-bundle.mjs — Generates the lightweight runtime JS injected via CDP
 */
import { WORLDLINES, ACCENT_SWATCHES } from './themes.mjs';

export function buildBrowserBundle({ config, cssText }) {
  const bootPayload = JSON.stringify({
    config,
    cssText,
    worldlines: Object.values(WORLDLINES).map((w) => ({
      id: w.id,
      name: w.name,
      divergence: w.divergence,
      tagline: w.tagline,
      swatches: w.swatches
    })),
    accents: ACCENT_SWATCHES
  });

  return `((boot) => {
  if (window.top !== window) return;

  // Clean previous injection safely on hot-reload
  if (typeof window.__wl_cleanup === 'function') {
    try { window.__wl_cleanup(); } catch {}
  }

  const cfg = boot.config || {};
  const root = document.documentElement;
  const cleanups = [];

  if (!cfg.enabled) {
    root.removeAttribute('data-wl-active');
    root.removeAttribute('data-wl-preset');
    root.removeAttribute('data-wl-zen');
    root.removeAttribute('data-wl-running');
    for (const id of ['wl-theme-style', 'wl-metrics-pill', 'wl-metrics-popover', 'wl-settings-nav-btn', 'wl-settings-pane']) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }
    return;
  }

  // 1. Mount CSS & theme attributes
  root.setAttribute('data-wl-active', '1');
  root.setAttribute('data-wl-preset', cfg.preset || 'tokyo-night');
  root.setAttribute('data-wl-zen', cfg.zenMode ? '1' : '0');

  let styleEl = document.getElementById('wl-theme-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'wl-theme-style';
    (document.head || root).appendChild(styleEl);
  }
  styleEl.textContent = boot.cssText || '';

  function sendConfigPatch(patch) {
    if (typeof window.__wlUpdateConfig === 'function') {
      try {
        window.__wlUpdateConfig(JSON.stringify(patch));
      } catch {}
    }
  }

  // 2. Zen Mode shortcut (Ctrl + Shift + Z)
  const onKeyDown = (e) => {
    if (e.ctrlKey && e.shiftKey && String(e.key || '').toLowerCase() === 'z') {
      e.preventDefault();
      const nextZen = root.getAttribute('data-wl-zen') !== '1';
      root.setAttribute('data-wl-zen', nextZen ? '1' : '0');
      sendConfigPatch({ zenMode: nextZen });
    } else if (e.key === 'Escape') {
      closePopover();
    }
  };
  window.addEventListener('keydown', onKeyDown, true);
  cleanups.push(() => window.removeEventListener('keydown', onKeyDown, true));

  // 3. Extract active conversation UUID
  const UUID_RE = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  function getActiveCascadeId() {
    try {
      const m = String(window.location.pathname || '').match(UUID_RE);
      if (m && m[1]) return m[1];
      const view = document.querySelector('[data-testid="conversation-view"][data-cascade-id]');
      if (view) return view.getAttribute('data-cascade-id') || '';
      const row = document.querySelector('[data-testid="conversation-row-sidebar"][data-selected="true"]');
      if (row) return row.getAttribute('data-cascade-id') || '';
    } catch {}
    return '';
  }
  window.__wl_get_cid = getActiveCascadeId;

  // 4. Gemini Telemetry Pill + Hover / Click Popover
  let pinned = false;
  let hideTimer = null;
  let latestMetrics = window.__wl_latest_metrics || null;

  function ensurePopover() {
    let pop = document.getElementById('wl-metrics-popover');
    if (!pop && document.body) {
      pop = document.createElement('div');
      pop.id = 'wl-metrics-popover';
      document.body.appendChild(pop);
      pop.addEventListener('mouseenter', () => {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      });
      pop.addEventListener('mouseleave', () => {
        if (!pinned) scheduleHidePopover();
      });
    }
    return pop;
  }

  function positionPopover(pill, pop) {
    if (!pill || !pop) return;
    const rect = pill.getBoundingClientRect();
    const popW = pop.offsetWidth || 356;
    const vw = window.innerWidth || 1280;
    const vh = window.innerHeight || 800;
    const left = Math.max(12, Math.min(Math.round(rect.left + rect.width / 2 - popW / 2), vw - popW - 12));
    const bottom = Math.max(12, Math.round(vh - rect.top + 10));
    pop.style.left = left + 'px';
    pop.style.bottom = bottom + 'px';
    pop.style.top = 'auto';
  }

  function showPopover(pill) {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    const pop = ensurePopover();
    if (!pop) return;
    if (latestMetrics && latestMetrics.popoverHtml) {
      pop.innerHTML = latestMetrics.popoverHtml;
    }
    positionPopover(pill, pop);
    pop.setAttribute('data-visible', '1');
  }

  function scheduleHidePopover() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!pinned) closePopover();
    }, 170);
  }

  function closePopover() {
    pinned = false;
    const pop = document.getElementById('wl-metrics-popover');
    if (pop) pop.removeAttribute('data-visible');
  }

  const onDocClick = (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('#wl-metrics-pill') || t.closest('#wl-metrics-popover')) return;
    closePopover();
  };
  document.addEventListener('click', onDocClick, true);
  cleanups.push(() => document.removeEventListener('click', onDocClick, true));

  function mountMetricsPill() {
    const existing = document.getElementById('wl-metrics-pill');
    if (!cfg.showMetrics) {
      if (existing) existing.remove();
      closePopover();
      return;
    }
    const inputBox = document.getElementById('antigravity.agentSidePanelInputBox');
    if (!inputBox) return;
    const modelTrigger = inputBox.querySelector('[data-testid="model-selector-trigger"]');
    if (!modelTrigger || !modelTrigger.parentElement) return;

    let pill = existing;
    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'wl-metrics-pill';
      pill.className = 'wl-metrics-pill';
      pill.innerHTML = '<span class="wl-dot"></span><span>Gemini listo</span>';
      pill.addEventListener('mouseenter', () => showPopover(pill));
      pill.addEventListener('mouseleave', () => {
        if (!pinned) scheduleHidePopover();
      });
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const pop = ensurePopover();
        const visible = pop && pop.getAttribute('data-visible') === '1';
        if (visible && pinned) {
          closePopover();
        } else {
          pinned = true;
          showPopover(pill);
        }
      });
    }

    const hostRow = modelTrigger.parentElement;
    if (pill.parentElement !== hostRow) {
      hostRow.appendChild(pill);
    }

    if (latestMetrics && latestMetrics.pillHtml && pill.innerHTML !== latestMetrics.pillHtml) {
      pill.innerHTML = latestMetrics.pillHtml;
    }
  }

  window.__wl_render_metrics = (payload) => {
    if (!payload) return;
    latestMetrics = payload;
    window.__wl_latest_metrics = payload;
    root.setAttribute('data-wl-running', payload.isRunning ? '1' : '0');
    const pill = document.getElementById('wl-metrics-pill');
    if (pill && payload.pillHtml) {
      pill.innerHTML = payload.pillHtml;
    }
    const pop = document.getElementById('wl-metrics-popover');
    if (pop && pop.getAttribute('data-visible') === '1' && payload.popoverHtml) {
      pop.innerHTML = payload.popoverHtml;
      if (pill) positionPopover(pill, pop);
    }
  };

  // 5. Simple Settings -> Worldline Tab (in Spanish)
  function renderSettingsPaneHtml() {
    const presetCards = boot.worldlines
      .map(
        (w) =>
          '<button type="button" class="wl-preset-card" data-wl-pick-preset="' + w.id + '" data-selected="' + (cfg.preset === w.id ? '1' : '0') + '">' +
          '<div class="wl-preset-top"><span class="wl-preset-name">' + w.name + '</span><span class="wl-preset-div">' + w.divergence + '</span></div>' +
          '<div class="wl-preset-desc">' + w.tagline + '</div>' +
          '<div class="wl-swatches">' + w.swatches.map((c) => '<span class="wl-swatch" style="background:' + c + '"></span>').join('') + '</div>' +
          '</button>'
      )
      .join('');

    const accentBtns = boot.accents
      .map(
        (a) =>
          '<button type="button" class="wl-accent-btn" data-wl-pick-accent="' + a.id + '" data-selected="' + (cfg.accent === a.id ? '1' : '0') + '">' +
          (a.color ? '<span class="wl-accent-dot" style="background:' + a.color + '"></span>' : '') +
          '<span>' + a.label + '</span></button>'
      )
      .join('');

    const toggleRow = (key, title, desc, isOn) =>
      '<div class="wl-toggle-row">' +
      '<div><div class="wl-toggle-title">' + title + '</div><div class="wl-toggle-desc">' + desc + '</div></div>' +
      '<button type="button" class="wl-switch" data-wl-toggle="' + key + '" data-on="' + (isOn ? '1' : '0') + '"></button>' +
      '</div>';

    const activeWl = boot.worldlines.find((w) => w.id === cfg.preset) || boot.worldlines[0];

    return (
      '<h2 class="wl-sp-title">Worldline <span class="wl-div-badge">' + activeWl.divergence + '</span></h2>' +
      '<p class="wl-sp-sub">Cambia la apariencia de Antigravity y el medidor de tokens Gemini al instante.</p>' +
      '<div class="wl-sp-section">Línea de mundo (Tema)</div>' +
      '<div class="wl-preset-grid">' + presetCards + '</div>' +
      '<div class="wl-sp-section">Color de acento</div>' +
      '<div class="wl-accent-row">' + accentBtns + '</div>' +
      '<div class="wl-sp-section">Opciones</div>' +
      '<div class="wl-toggle-list">' +
      toggleRow('showMetrics', 'Barra de tokens Gemini', 'Muestra memoria libre del chat y gráfica semanal de los modelos Gemini.', cfg.showMetrics) +
      toggleRow('cleanFont', 'Tipografía limpia', 'Usa Inter / JetBrains Mono para texto y bloques de código.', cfg.cleanFont) +
      toggleRow('zenMode', 'Modo Zen (Ctrl+Shift+Z)', 'Oculta la barra lateral izquierda para centrarte solo en el chat.', cfg.zenMode) +
      '</div>'
    );
  }

  function mountSettingsEntry() {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return;

    // Look for Appearance nav button inside the Settings modal
    const navButtons = Array.from(dialog.querySelectorAll('button, a'));
    const appearanceBtn = navButtons.find((b) => /^Appearance$/i.test((b.textContent || '').trim()));
    if (!appearanceBtn || !appearanceBtn.parentElement) return;

    const navContainer = appearanceBtn.parentElement;
    if (document.getElementById('wl-settings-nav-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'wl-settings-nav-btn';
    btn.type = 'button';
    btn.innerHTML = '<span>✦</span><span>Worldline</span>';
    navContainer.appendChild(btn);

    const openWorldlinePane = () => {
      const contentHost = navContainer.parentElement && navContainer.parentElement.nextElementSibling;
      if (!contentHost) return;
      btn.setAttribute('data-active', '1');
      Array.from(contentHost.children).forEach((ch) => {
        if (ch.id !== 'wl-settings-pane') ch.style.display = 'none';
      });
      let pane = document.getElementById('wl-settings-pane');
      if (!pane) {
        pane = document.createElement('div');
        pane.id = 'wl-settings-pane';
        contentHost.appendChild(pane);
        pane.addEventListener('click', (ev) => {
          const presetBtn = ev.target.closest('[data-wl-pick-preset]');
          if (presetBtn) {
            cfg.preset = presetBtn.getAttribute('data-wl-pick-preset');
            sendConfigPatch({ preset: cfg.preset });
            pane.innerHTML = renderSettingsPaneHtml();
            return;
          }
          const accentBtn = ev.target.closest('[data-wl-pick-accent]');
          if (accentBtn) {
            cfg.accent = accentBtn.getAttribute('data-wl-pick-accent');
            sendConfigPatch({ accent: cfg.accent });
            pane.innerHTML = renderSettingsPaneHtml();
            return;
          }
          const toggleBtn = ev.target.closest('[data-wl-toggle]');
          if (toggleBtn) {
            const key = toggleBtn.getAttribute('data-wl-toggle');
            cfg[key] = !cfg[key];
            sendConfigPatch({ [key]: cfg[key] });
            pane.innerHTML = renderSettingsPaneHtml();
          }
        });
      }
      pane.style.display = 'block';
      pane.innerHTML = renderSettingsPaneHtml();
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWorldlinePane();
    });

    navContainer.addEventListener('click', (e) => {
      if (e.target.closest('#wl-settings-nav-btn')) return;
      btn.removeAttribute('data-active');
      const pane = document.getElementById('wl-settings-pane');
      if (pane) pane.style.display = 'none';
      const contentHost = navContainer.parentElement && navContainer.parentElement.nextElementSibling;
      if (contentHost) {
        Array.from(contentHost.children).forEach((ch) => {
          if (ch.id !== 'wl-settings-pane') ch.style.display = '';
        });
      }
    });
  }

  // 6. Lightweight periodic sync for SPA navigation & Settings modal
  const tick = () => {
    mountMetricsPill();
    mountSettingsEntry();
    const cid = getActiveCascadeId();
    if (cid !== window.__wl_last_cid) {
      window.__wl_last_cid = cid;
      if (typeof window.__wlRequestMetrics === 'function') {
        try { window.__wlRequestMetrics(cid); } catch {}
      }
    }
  };
  tick();
  const timer = setInterval(tick, 1200);
  cleanups.push(() => clearInterval(timer));

  window.__wl_cleanup = () => {
    for (const fn of cleanups) {
      try { fn(); } catch {}
    }
  };
})(${bootPayload});`;
}
