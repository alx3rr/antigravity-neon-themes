/**
 * src/themes.mjs — 4 curated Worldline presets + clean CSS generator for Google Antigravity
 */

export const WORLDLINES = {
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    divergence: '1.048596',
    tagline: 'Azul noche limpio y contraste relajado',
    swatches: ['#1a1b26', '#24283b', '#7aa2f7', '#bb9af7'],
    vars: {
      '--wl-bg': '#16161e',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(122, 162, 247, 0.12), transparent 65%), linear-gradient(180deg, #16161e 0%, #1a1b26 100%)',
      '--wl-sidebar': '#16161e',
      '--wl-surface': '#1f2335',
      '--wl-surface-2': '#24283b',
      '--wl-surface-hover': '#292e42',
      '--wl-border': 'rgba(122, 162, 247, 0.16)',
      '--wl-border-strong': 'rgba(122, 162, 247, 0.34)',
      '--wl-text': '#c0caf5',
      '--wl-text-muted': '#7982a9',
      '--wl-accent': '#7aa2f7',
      '--wl-accent-2': '#bb9af7',
      '--wl-accent-soft': 'rgba(122, 162, 247, 0.16)',
      '--wl-glow': '0 0 22px rgba(122, 162, 247, 0.22)',
      '--wl-code-bg': '#13141c',
      '--wl-blur': '12px',
      '--wl-radius': '14px',
      '--wl-ok': '#9ece6a',
      '--wl-warn': '#e0af68',
      '--wl-crit': '#f7768e'
    }
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    divergence: '0.571024',
    tagline: 'Oscuro neón cian y magenta con brillo activo',
    swatches: ['#0c0a16', '#161129', '#00f0ff', '#ff2e97'],
    vars: {
      '--wl-bg': '#0c0a16',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 70% 45% at 15% 0%, rgba(255, 46, 151, 0.16), transparent 60%), radial-gradient(ellipse 70% 45% at 85% 100%, rgba(0, 240, 255, 0.14), transparent 60%), linear-gradient(180deg, #0b0914 0%, #120e24 100%)',
      '--wl-sidebar': 'rgba(14, 11, 28, 0.92)',
      '--wl-surface': 'rgba(22, 17, 42, 0.88)',
      '--wl-surface-2': 'rgba(31, 24, 58, 0.92)',
      '--wl-surface-hover': 'rgba(42, 32, 78, 0.95)',
      '--wl-border': 'rgba(0, 240, 255, 0.22)',
      '--wl-border-strong': 'rgba(255, 46, 151, 0.55)',
      '--wl-text': '#f2eeff',
      '--wl-text-muted': '#9c92c4',
      '--wl-accent': '#ff2e97',
      '--wl-accent-2': '#00f0ff',
      '--wl-accent-soft': 'rgba(255, 46, 151, 0.18)',
      '--wl-glow': '0 0 26px rgba(255, 46, 151, 0.34), 0 0 12px rgba(0, 240, 255, 0.18)',
      '--wl-code-bg': '#080612',
      '--wl-blur': '16px',
      '--wl-radius': '14px',
      '--wl-ok': '#36f9b3',
      '--wl-warn': '#fede5d',
      '--wl-crit': '#ff2e97'
    }
  },
  'border-sunset': {
    id: 'border-sunset',
    name: 'Border Sunset',
    divergence: '0.337187',
    tagline: 'Tarjetas nítidas y paleta cálida de atardecer',
    swatches: ['#151214', '#211c1f', '#f28f52', '#e86a7c'],
    vars: {
      '--wl-bg': '#141113',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 85% 50% at 50% -15%, rgba(242, 143, 82, 0.15), transparent 62%), radial-gradient(ellipse 60% 40% at 90% 95%, rgba(232, 106, 124, 0.10), transparent 60%), #141113',
      '--wl-sidebar': '#181417',
      '--wl-surface': '#1f1a1d',
      '--wl-surface-2': '#272024',
      '--wl-surface-hover': '#31282d',
      '--wl-border': 'rgba(242, 175, 130, 0.16)',
      '--wl-border-strong': 'rgba(242, 143, 82, 0.42)',
      '--wl-text': '#f4eae6',
      '--wl-text-muted': '#a69398',
      '--wl-accent': '#f28f52',
      '--wl-accent-2': '#e86a7c',
      '--wl-accent-soft': 'rgba(242, 143, 82, 0.17)',
      '--wl-glow': '0 0 22px rgba(242, 143, 82, 0.24)',
      '--wl-code-bg': '#110e10',
      '--wl-blur': '14px',
      '--wl-radius': '16px',
      '--wl-ok': '#8fd18b',
      '--wl-warn': '#f4b860',
      '--wl-crit': '#e86a7c'
    }
  },
  'border-translucent': {
    id: 'border-translucent',
    name: 'Border Translucent',
    divergence: '1.130205',
    tagline: 'Cristal esmerilado y bordes luminosos estilo Obsidian Border',
    swatches: ['#0e1118', '#1b2230', '#6ecbff', '#a78bfa'],
    vars: {
      '--wl-bg': '#0c0f16',
      '--wl-bg-gradient':
        'radial-gradient(circle at 18% 15%, rgba(110, 203, 255, 0.16), transparent 45%), radial-gradient(circle at 82% 20%, rgba(167, 139, 250, 0.15), transparent 45%), radial-gradient(circle at 50% 95%, rgba(56, 189, 248, 0.10), transparent 50%), linear-gradient(145deg, #0b0e15 0%, #121826 55%, #0e121c 100%)',
      '--wl-sidebar': 'rgba(20, 26, 38, 0.54)',
      '--wl-surface': 'rgba(24, 31, 46, 0.56)',
      '--wl-surface-2': 'rgba(33, 42, 62, 0.62)',
      '--wl-surface-hover': 'rgba(46, 58, 84, 0.68)',
      '--wl-border': 'rgba(255, 255, 255, 0.10)',
      '--wl-border-strong': 'rgba(255, 255, 255, 0.22)',
      '--wl-text': '#edf2fb',
      '--wl-text-muted': '#96a5be',
      '--wl-accent': '#6ecbff',
      '--wl-accent-2': '#a78bfa',
      '--wl-accent-soft': 'rgba(110, 203, 255, 0.16)',
      '--wl-glow': '0 8px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
      '--wl-code-bg': 'rgba(10, 13, 20, 0.68)',
      '--wl-blur': '20px',
      '--wl-radius': '16px',
      '--wl-ok': '#4ade80',
      '--wl-warn': '#fbbf24',
      '--wl-crit': '#fb7185'
    }
  }
};

export const ACCENT_SWATCHES = [
  { id: 'auto', label: 'Del tema', color: null },
  { id: 'cyan', label: 'Cian neón', color: '#00f0ff' },
  { id: 'magenta', label: 'Magenta', color: '#ff2e97' },
  { id: 'blue', label: 'Azul Tokyo', color: '#7aa2f7' },
  { id: 'sunset', label: 'Atardecer', color: '#f28f52' },
  { id: 'violet', label: 'Lavanda', color: '#a78bfa' },
  { id: 'emerald', label: 'Esmeralda', color: '#36f9b3' }
];

export const DEFAULT_CONFIG = {
  enabled: true,
  preset: 'tokyo-night',
  accent: 'auto',
  cleanFont: true,
  zenMode: false,
  showMetrics: true
};

export function normalizeConfig(raw = {}) {
  const preset = WORLDLINES[raw.preset] ? raw.preset : DEFAULT_CONFIG.preset;
  const accentValid = ACCENT_SWATCHES.some((a) => a.id === raw.accent);
  return {
    enabled: raw.enabled !== false,
    preset,
    accent: accentValid ? raw.accent : DEFAULT_CONFIG.accent,
    cleanFont: raw.cleanFont !== false,
    zenMode: Boolean(raw.zenMode),
    showMetrics: raw.showMetrics !== false
  };
}

export function buildThemeCss(config) {
  const cfg = normalizeConfig(config);
  const wl = WORLDLINES[cfg.preset] || WORLDLINES['tokyo-night'];
  const vars = { ...wl.vars };

  if (cfg.accent !== 'auto') {
    const picked = ACCENT_SWATCHES.find((a) => a.id === cfg.accent);
    if (picked && picked.color) {
      vars['--wl-accent'] = picked.color;
      vars['--wl-border-strong'] = picked.color;
      vars['--wl-accent-soft'] = `${picked.color}29`;
    }
  }

  const varDecls = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');

  const fontCss = cfg.cleanFont
    ? `
html[data-wl-active="1"],
html[data-wl-active="1"] body {
  font-family: 'Inter', 'Segoe UI Variable Text', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
html[data-wl-active="1"] code,
html[data-wl-active="1"] pre,
html[data-wl-active="1"] .font-mono {
  font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace !important;
}
`
    : '';

  const cyberpunkExtra =
    cfg.preset === 'cyberpunk'
      ? `
html[data-wl-preset="cyberpunk"] [id="antigravity.agentSidePanelInputBox"]:focus-within {
  box-shadow: 0 0 0 1px var(--wl-accent), 0 0 28px rgba(255, 46, 151, 0.28), 0 0 14px rgba(0, 240, 255, 0.16) !important;
}
html[data-wl-preset="cyberpunk"] h1,
html[data-wl-preset="cyberpunk"] h2 {
  text-shadow: 0 0 16px rgba(0, 240, 255, 0.25);
}
`
      : '';

  const translucentExtra =
    cfg.preset === 'border-translucent'
      ? `
html[data-wl-preset="border-translucent"] aside,
html[data-wl-preset="border-translucent"] [data-testid="conversation-view"],
html[data-wl-preset="border-translucent"] [id="antigravity.agentSidePanelInputBox"] {
  backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
}
`
      : '';

  return `/* Antigravity Worldline · ${wl.name} (${wl.divergence}) */
:root,
html[data-wl-active="1"],
html[data-wl-active="1"] body {
${varDecls}
}

${fontCss}

/* Base Canvas & Ambient Gradient */
html[data-wl-active="1"],
html[data-wl-active="1"] body,
html[data-wl-active="1"] #root {
  background: var(--wl-bg-gradient) !important;
  color: var(--wl-text) !important;
}

/* Sidebar — Obsidian Border inspired crisp separation */
html[data-wl-active="1"] aside,
html[data-wl-active="1"] [data-testid="sidebar"],
html[data-wl-active="1"] nav[aria-label] {
  background: var(--wl-sidebar) !important;
  border-color: var(--wl-border) !important;
}

html[data-wl-active="1"] [data-testid="conversation-row-sidebar"][data-selected="true"] {
  background: var(--wl-accent-soft) !important;
  border: 1px solid var(--wl-border-strong) !important;
  border-radius: 10px !important;
}

/* Main Chat Composer Box */
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] {
  background: var(--wl-surface) !important;
  border: 1px solid var(--wl-border) !important;
  border-radius: var(--wl-radius) !important;
  box-shadow: var(--wl-glow) !important;
  transition: border-color 0.2s ease, box-shadow 0.25s ease !important;
}

html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"]:focus-within {
  border-color: var(--wl-border-strong) !important;
}

@keyframes wl-border-pulse {
  0%, 100% {
    box-shadow: 0 0 0 1px var(--wl-accent), 0 0 14px var(--wl-accent-soft);
  }
  50% {
    box-shadow: 0 0 0 1.5px var(--wl-accent-2), 0 0 26px var(--wl-accent-soft);
  }
}

html[data-wl-active="1"][data-wl-running="1"] [id="antigravity.agentSidePanelInputBox"] {
  border-color: var(--wl-accent) !important;
  animation: wl-border-pulse 2.2s ease-in-out infinite !important;
}

/* User Message Bubbles & Code Blocks */
html[data-wl-active="1"] .agy-user-bubble,
html[data-wl-active="1"] [data-testid="user-message-content"] {
  background: var(--wl-surface-2) !important;
  border: 1px solid var(--wl-border) !important;
  border-radius: var(--wl-radius) !important;
}

html[data-wl-active="1"] pre {
  background: var(--wl-code-bg) !important;
  border: 1px solid var(--wl-border) !important;
  border-radius: 12px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}

html[data-wl-active="1"] a {
  color: var(--wl-accent) !important;
}

/* Sleek Scrollbars */
html[data-wl-active="1"] ::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
html[data-wl-active="1"] ::-webkit-scrollbar-track {
  background: transparent;
}
html[data-wl-active="1"] ::-webkit-scrollbar-thumb {
  background: var(--wl-border);
  border-radius: 999px;
}
html[data-wl-active="1"] ::-webkit-scrollbar-thumb:hover {
  background: var(--wl-accent);
}

/* Zen Mode — hides sidebar cleanly */
html[data-wl-active="1"][data-wl-zen="1"] aside {
  display: none !important;
}

${cyberpunkExtra}
${translucentExtra}

/* =====================================================================
 * Worldline Gemini Telemetry Pill & Hover Divergence Card
 * ===================================================================== */
.wl-metrics-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 3px 10px;
  margin-left: 8px;
  border-radius: 999px;
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  color: var(--wl-text-muted);
  font-size: 11.5px;
  line-height: 1.3;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}
.wl-metrics-pill:hover {
  border-color: var(--wl-border-strong);
  color: var(--wl-text);
  background: var(--wl-surface-hover);
}
.wl-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--wl-accent);
  box-shadow: 0 0 8px var(--wl-accent);
  flex-shrink: 0;
}
.wl-dot.is-running {
  background: var(--wl-accent-2);
  box-shadow: 0 0 10px var(--wl-accent-2);
  animation: wl-dot-blink 1.2s ease-in-out infinite;
}
.wl-dot.is-warn { background: var(--wl-warn); box-shadow: 0 0 8px var(--wl-warn); }
.wl-dot.is-crit { background: var(--wl-crit); box-shadow: 0 0 8px var(--wl-crit); }

@keyframes wl-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
}

.wl-sep { opacity: 0.45; }
.wl-val-ok { color: var(--wl-ok); font-weight: 600; }
.wl-val-warn { color: var(--wl-warn); font-weight: 600; }
.wl-val-crit { color: var(--wl-crit); font-weight: 600; }

#wl-metrics-popover {
  position: fixed;
  z-index: 999999;
  width: 356px;
  max-width: calc(100vw - 24px);
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: opacity 0.16s ease, transform 0.16s ease;
}
#wl-metrics-popover[data-visible="1"] {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.wl-card {
  background: var(--wl-surface);
  backdrop-filter: blur(22px) saturate(1.3);
  -webkit-backdrop-filter: blur(22px) saturate(1.3);
  border: 1px solid var(--wl-border-strong);
  border-radius: 16px;
  padding: 14px 16px;
  color: var(--wl-text);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55), var(--wl-glow);
  font-size: 12px;
}

.wl-card-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.wl-card-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.01em;
}
.wl-div-badge {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 10.5px;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--wl-accent-soft);
  color: var(--wl-accent);
  border: 1px solid var(--wl-border);
}

.wl-hero-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}
.wl-hero-pct {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}
.wl-hero-sub {
  color: var(--wl-text-muted);
  font-size: 12.5px;
}

.wl-bar-track {
  width: 100%;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  overflow: hidden;
  margin-bottom: 6px;
}
.wl-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.25s ease;
}
.wl-bar-fill.is-ok { background: linear-gradient(90deg, var(--wl-ok), var(--wl-accent)); }
.wl-bar-fill.is-warn { background: linear-gradient(90deg, var(--wl-warn), #f97316); }
.wl-bar-fill.is-crit { background: linear-gradient(90deg, var(--wl-crit), #ef4444); }

.wl-meta-row {
  display: flex;
  justify-content: space-between;
  color: var(--wl-text-muted);
  font-size: 11px;
  margin-bottom: 12px;
}

.wl-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.wl-stat-box {
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  border-radius: 10px;
  padding: 8px 9px;
}
.wl-stat-lbl {
  font-size: 10.5px;
  color: var(--wl-text-muted);
  margin-bottom: 3px;
}
.wl-stat-val {
  font-size: 14px;
  font-weight: 700;
  color: var(--wl-text);
}

.wl-chart-box {
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  border-radius: 12px;
  padding: 10px 11px 8px;
  margin-bottom: 10px;
}
.wl-chart-hdr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 11px;
}
.wl-chart-hdr strong { color: var(--wl-text); font-weight: 600; }
.wl-chart-hdr span { color: var(--wl-text-muted); }

.wl-chart-svg {
  width: 100%;
  height: 76px;
  display: block;
}
.wl-chart-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 10px;
  color: var(--wl-text-muted);
  margin-top: 4px;
}
.wl-chart-days .is-today {
  color: var(--wl-text);
  font-weight: 700;
}

.wl-pace-note {
  font-size: 11px;
  color: var(--wl-accent-2);
  margin-top: 6px;
}

.wl-models-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--wl-border);
}
.wl-model-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--wl-text-muted);
}
.wl-model-row strong { color: var(--wl-text); font-weight: 600; }

.wl-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10.5px;
  color: var(--wl-text-muted);
  padding-top: 6px;
  border-top: 1px solid var(--wl-border);
}

/* =====================================================================
 * Worldline Settings Panel (Settings -> Worldline)
 * ===================================================================== */
#wl-settings-nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  margin-top: 4px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--wl-text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
}
#wl-settings-nav-btn:hover,
#wl-settings-nav-btn[data-active="1"] {
  background: var(--wl-accent-soft);
  border-color: var(--wl-border-strong);
  color: var(--wl-text);
}

#wl-settings-pane {
  padding: 24px 28px;
  color: var(--wl-text);
  max-width: 680px;
}
.wl-sp-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.wl-sp-sub {
  color: var(--wl-text-muted);
  font-size: 13px;
  margin: 0 0 20px;
}
.wl-sp-section {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wl-text-muted);
  margin: 18px 0 10px;
}
.wl-preset-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.wl-preset-card {
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  text-align: left;
  color: var(--wl-text);
  transition: border-color 0.16s ease, transform 0.14s ease;
}
.wl-preset-card:hover {
  border-color: var(--wl-border-strong);
  transform: translateY(-1px);
}
.wl-preset-card[data-selected="1"] {
  border-color: var(--wl-accent);
  box-shadow: 0 0 0 1px var(--wl-accent), var(--wl-glow);
}
.wl-preset-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.wl-preset-name { font-weight: 700; font-size: 13.5px; }
.wl-preset-div {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 10px;
  color: var(--wl-accent);
}
.wl-preset-desc {
  font-size: 11.5px;
  color: var(--wl-text-muted);
  margin-bottom: 8px;
}
.wl-swatches {
  display: flex;
  gap: 6px;
}
.wl-swatch {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.wl-accent-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.wl-accent-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border-radius: 999px;
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  color: var(--wl-text);
  font-size: 12px;
  cursor: pointer;
}
.wl-accent-btn[data-selected="1"] {
  border-color: var(--wl-accent);
  background: var(--wl-accent-soft);
}
.wl-accent-dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
}

.wl-toggle-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wl-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  border-radius: 12px;
  padding: 11px 14px;
}
.wl-toggle-title { font-weight: 600; font-size: 13px; }
.wl-toggle-desc { font-size: 11.5px; color: var(--wl-text-muted); margin-top: 2px; }
.wl-switch {
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.18s ease;
}
.wl-switch[data-on="1"] {
  background: var(--wl-accent);
}
.wl-switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #ffffff;
  transition: transform 0.18s ease;
}
.wl-switch[data-on="1"]::after {
  transform: translateX(18px);
}
`;
}
