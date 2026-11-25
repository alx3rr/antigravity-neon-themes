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

  // Remove stale Worldline Settings nodes so updated layout mounts cleanly
  try {
    for (const oldId of ['wl-settings-nav-btn', 'wl-settings-pane']) {
      const el = document.getElementById(oldId);
      if (el) el.remove();
    }
    document.querySelectorAll('[data-wl-hidden="1"]').forEach((el) => {
      el.style.display = '';
      el.removeAttribute('data-wl-hidden');
    });
    document.querySelectorAll('[data-wl-nav-bound="1"]').forEach((el) => el.removeAttribute('data-wl-nav-bound'));
  } catch {}

  // Clean any leftover DOM artifacts from previously uninstalled third-party themes
  try {
    for (const staleId of [
      'ag-live-metrics-pill',
      'ag-side-metrics-pill',
      'ag-live-metrics-tooltip',
      'ag-turn-metrics-tooltip',
      'ag-codex-theme',
      'ag-user-theme-vars',
      'ag-user-custom-style'
    ]) {
      const el = document.getElementById(staleId);
      if (el) el.remove();
    }
    document.querySelectorAll('.ag-live-metrics-pill, .ag-turn-metrics').forEach((el) => el.remove());
  } catch {}

  const cfg = boot.config || {};
  const root = document.documentElement;
  const cleanups = [];

  if (!cfg.enabled) {
    root.removeAttribute('data-wl-active');
    root.removeAttribute('data-wl-preset');
    root.removeAttribute('data-wl-running');
    for (const id of ['wl-theme-style', 'wl-metrics-pill', 'wl-metrics-popover', 'wl-settings-nav-btn', 'wl-settings-pane']) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }
    document.querySelectorAll('[data-wl-model]').forEach((el) => el.removeAttribute('data-wl-model'));
    return;
  }

  // 1. Mount CSS & theme attributes
  root.setAttribute('data-wl-active', '1');
  root.setAttribute('data-wl-preset', cfg.preset || 'cyberpunk');

  // 1b. Colorize model names + animated fluorescent Gemini 4 Neon
  function classifyModel(rawText) {
    const t = String(rawText || '').trim();
    if (!t) return '';
    if (/gemini\\s*\\d*(?:\\.\\d+)?\\s*neon/i.test(t)) return 'neon';
    if (/gemini\\s*\\d*(?:\\.\\d+)?\\s*carbon/i.test(t)) return 'carbon';
    if (/gemini\\s*\\d*(?:\\.\\d+)?\\s*argon/i.test(t)) return 'argon';
    if (/gemini\\s*\\d*(?:\\.\\d+)?\\s*hydrogen/i.test(t)) return 'hydrogen';
    if (/gemini\\s*\\d*(?:\\.\\d+)?\\s*flash/i.test(t)) return 'flash';
    if (/claude/i.test(t)) return 'claude';
    if (/\\bgpt\\b/i.test(t)) return 'gpt';
    return '';
  }

  function findModelLabelSpan(container, fallbackEl) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const val = (node.nodeValue || '').trim();
      if (!val || /^(New|Leaving Soon|Notice|Low|Medium|High|Extra High|Orchestrator)$/i.test(val)) continue;
      if (classifyModel(val)) {
        return node.parentElement || fallbackEl;
      }
    }
    return fallbackEl;
  }

  function tagModelElements() {
    try {
      const triggers = document.querySelectorAll('[data-testid="model-selector-trigger"]');
      for (const trig of triggers) {
        const raw = trig.getAttribute('data-model-label') || trig.textContent || '';
        const kind = classifyModel(raw);
        trig.querySelectorAll('[data-wl-model]').forEach((el) => el.removeAttribute('data-wl-model'));
        if (kind) {
          const targetSpan = findModelLabelSpan(trig, trig);
          targetSpan.setAttribute('data-wl-model', kind);
        }
      }

      const menuItems = document.querySelectorAll('[role="menu"] [role="menuitem"], [role="menu"] [role="menuitemradio"], [role="listbox"] [role="option"]');
      for (const item of menuItems) {
        const kind = classifyModel(item.textContent || '');
        item.querySelectorAll('[data-wl-model]').forEach((el) => el.removeAttribute('data-wl-model'));
        if (kind) {
          const labelEl = findModelLabelSpan(item, item);
          labelEl.setAttribute('data-wl-model', kind);
        }
      }
    } catch {}
  }

  if (document.body && typeof MutationObserver !== 'undefined') {
    const modelObserver = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (
            (n.matches && n.matches('[role="menu"], [role="listbox"]')) ||
            (n.querySelector && n.querySelector('[role="menu"], [role="listbox"], [data-testid="model-selector-trigger"]'))
          ) {
            tagModelElements();
            return;
          }
        }
      }
    });
    modelObserver.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => modelObserver.disconnect());
  }

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

  // 2. Escape closes metrics popover
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
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

  function findComposerFooterRow(inputBox, modelTrigger) {
    let row = modelTrigger.parentElement;
    for (let i = 0; i < 8 && row && row !== inputBox; i++, row = row.parentElement) {
      try {
        const cs = window.getComputedStyle(row);
        const isRow = cs && cs.display.includes('flex') && cs.flexDirection.startsWith('row');
        if (isRow && row.children.length >= 2) {
          const leftGroup = row.children[0];
          if (leftGroup && leftGroup.contains(modelTrigger)) {
            const leftCs = window.getComputedStyle(leftGroup);
            if (leftCs && leftCs.display.includes('flex') && leftCs.flexDirection.startsWith('row')) {
              return leftGroup;
            }
          }
          return row;
        }
      } catch {}
    }
    return modelTrigger.parentElement;
  }

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

    const hostRow = findComposerFooterRow(inputBox, modelTrigger);
    if (hostRow && pill.parentElement !== hostRow) {
      if (hostRow.children.length >= 2 && !hostRow.contains(modelTrigger.closest('button') === hostRow.lastElementChild ? null : null)) {
        const refRight = hostRow.lastElementChild;
        if (refRight && !refRight.contains(modelTrigger) && hostRow.children.length >= 2 && refRight !== pill) {
          hostRow.insertBefore(pill, refRight);
        } else {
          hostRow.appendChild(pill);
        }
      } else {
        hostRow.appendChild(pill);
      }
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
          '<span class="wl-accent-dot" style="background:' + (a.color || 'var(--wl-accent)') + '"></span>' +
          '<span>' + a.label + '</span></button>'
      )
      .join('');

    const toggleRow = (key, title, desc, isOn) =>
      '<div class="wl-toggle-row">' +
      '<div><div class="wl-toggle-title">' + title + '</div><div class="wl-toggle-desc">' + desc + '</div></div>' +
      '<button type="button" class="wl-switch" data-wl-toggle="' + key + '" data-on="' + (isOn ? '1' : '0') + '"></button>' +
      '</div>';

    const sliderRow = (key, title, desc, value, min, max, unit) =>
      '<div class="wl-slider-row">' +
      '<div class="wl-slider-top">' +
      '<div><div class="wl-toggle-title">' + title + '</div><div class="wl-toggle-desc">' + desc + '</div></div>' +
      '<span class="wl-slider-val" data-wl-val-for="' + key + '">' + value + ' ' + unit + '</span>' +
      '</div>' +
      '<input type="range" class="wl-range" data-wl-range="' + key + '" data-wl-unit="' + unit + '" min="' + min + '" max="' + max + '" step="1" value="' + value + '" />' +
      '</div>';

    const activeWl = boot.worldlines.find((w) => w.id === cfg.preset) || boot.worldlines[0];
    const blurPx = Number.isFinite(Number(cfg.blurPx)) ? Number(cfg.blurPx) : 18;
    const panelOpacity = Number.isFinite(Number(cfg.panelOpacity)) ? Number(cfg.panelOpacity) : 72;

    return (
      '<h2 class="wl-sp-title"><span class="wl-dot"></span><span>Worldline</span> <span class="wl-div-badge">' + activeWl.divergence + '</span></h2>' +
      '<p class="wl-sp-sub">Cambia la apariencia de Antigravity y el medidor de tokens Gemini al instante.</p>' +
      '<div class="wl-sp-section">Línea de mundo (Tema)</div>' +
      '<div class="wl-preset-grid">' + presetCards + '</div>' +
      '<div class="wl-sp-section">Color de acento</div>' +
      '<div class="wl-accent-row">' + accentBtns + '</div>' +
      '<div class="wl-sp-section">Cristal y fondo</div>' +
      '<div class="wl-toggle-list">' +
      sliderRow('blurPx', 'Desenfoque (Blur)', 'Intensidad del efecto cristal esmerilado en paneles y barra lateral.', blurPx, 0, 32, 'px') +
      sliderRow('panelOpacity', 'Opacidad del panel', 'Baja el porcentaje para dejar ver más el degradado de fondo.', panelOpacity, 40, 95, '%') +
      '</div>' +
      '<div class="wl-sp-section">Opciones</div>' +
      '<div class="wl-toggle-list">' +
      toggleRow('showMetrics', 'Barra de tokens Gemini', 'Muestra memoria libre del chat y gráfica semanal de los modelos Gemini.', cfg.showMetrics) +
      toggleRow('cleanFont', 'Tipografía limpia', 'Usa Inter / JetBrains Mono para texto y bloques de código.', cfg.cleanFont) +
      '</div>'
    );
  }

  function findSettingsColumns(dialog, anchorBtn) {
    let cur = anchorBtn.parentElement;
    while (cur && cur !== dialog) {
      const parent = cur.parentElement;
      if (!parent || parent === document.body) break;
      const curRect = cur.getBoundingClientRect();
      const kids = Array.from(parent.children).filter((el) => el.nodeType === 1 && el.id !== 'wl-settings-pane');
      const idx = kids.indexOf(cur);
      if (idx >= 0 && kids.length >= 2) {
        const rightCol = kids.find((k, i) => {
          if (i <= idx) return false;
          const r = k.getBoundingClientRect();
          return r.width >= 300 && r.width >= curRect.width * 1.2;
        });
        if (rightCol) {
          return { leftCol: cur, rightCol };
        }
      }
      cur = parent;
    }
    return null;
  }

  function isDialogCloseBtn(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.tagName === 'BUTTON') {
      const lbl = String(el.getAttribute('aria-label') || '').toLowerCase();
      const rect = el.getBoundingClientRect();
      if (lbl.includes('close') || lbl.includes('cerrar') || (rect.width > 0 && rect.width <= 44 && rect.height <= 44)) {
        return true;
      }
    }
    return false;
  }

  function mountSettingsEntry() {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return;

    const navButtons = Array.from(dialog.querySelectorAll('button, a'));
    const appearanceBtn = navButtons.find((b) => /^Appearance$/i.test((b.textContent || '').trim()));
    if (!appearanceBtn || !appearanceBtn.parentElement) return;

    const layout = findSettingsColumns(dialog, appearanceBtn);
    if (!layout) return;
    const { leftCol, rightCol } = layout;

    // Place the Worldline button cleanly right after "Browser" (or "Appearance" if not found)
    const browserBtn = navButtons.find((b) => /^Browser$/i.test((b.textContent || '').trim()));
    const navList = (browserBtn && browserBtn.parentElement) || appearanceBtn.parentElement;

    let btn = document.getElementById('wl-settings-nav-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'wl-settings-nav-btn';
      btn.type = 'button';
      btn.innerHTML = '<span>✦</span><span>Worldline</span>';
      navList.appendChild(btn);

      const closeWorldlinePane = () => {
        btn.removeAttribute('data-active');
        const pane = document.getElementById('wl-settings-pane');
        if (pane) pane.style.display = 'none';
        Array.from(rightCol.children).forEach((ch) => {
          if (ch.id !== 'wl-settings-pane' && ch.getAttribute('data-wl-hidden') === '1') {
            ch.style.display = '';
            ch.removeAttribute('data-wl-hidden');
          }
        });
      };

      const openWorldlinePane = () => {
        btn.setAttribute('data-active', '1');
        Array.from(rightCol.children).forEach((ch) => {
          if (ch.id === 'wl-settings-pane' || isDialogCloseBtn(ch)) return;
          if (ch.style.display !== 'none') {
            ch.setAttribute('data-wl-hidden', '1');
            ch.style.display = 'none';
          }
        });
        let pane = document.getElementById('wl-settings-pane');
        if (!pane || pane.parentElement !== rightCol) {
          if (pane) pane.remove();
          pane = document.createElement('div');
          pane.id = 'wl-settings-pane';
          rightCol.appendChild(pane);
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
          pane.addEventListener('input', (ev) => {
            const range = ev.target.closest('[data-wl-range]');
            if (!range) return;
            const key = range.getAttribute('data-wl-range');
            const unit = range.getAttribute('data-wl-unit') || '';
            const val = Number(range.value);
            cfg[key] = val;
            const lbl = pane.querySelector('[data-wl-val-for="' + key + '"]');
            if (lbl) lbl.textContent = val + ' ' + unit;
            if (key === 'blurPx') {
              root.style.setProperty('--wl-blur', val + 'px');
            } else if (key === 'panelOpacity') {
              root.style.setProperty('--wl-panel-alpha', (val / 100).toFixed(2));
            }
          });
          pane.addEventListener('change', (ev) => {
            const range = ev.target.closest('[data-wl-range]');
            if (!range) return;
            const key = range.getAttribute('data-wl-range');
            const val = Number(range.value);
            cfg[key] = val;
            sendConfigPatch({ [key]: val });
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

      if (!leftCol.getAttribute('data-wl-nav-bound')) {
        leftCol.setAttribute('data-wl-nav-bound', '1');
        leftCol.addEventListener('click', (e) => {
          if (e.target && e.target.closest && e.target.closest('#wl-settings-nav-btn')) return;
          if (e.target && e.target.closest && e.target.closest('button, a')) {
            closeWorldlinePane();
          }
        });
      }
    }
  }

  // 6. Lightweight periodic sync for SPA navigation & Settings modal
  const tick = () => {
    tagModelElements();
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
