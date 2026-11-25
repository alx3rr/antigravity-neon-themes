/**
 * src/themes.mjs — 3 curated Worldline presets + clean CSS generator for Google Antigravity
 */

export const WORLDLINES = {
  'border-translucent': {
    id: 'border-translucent',
    name: 'Border Translucent',
    divergence: '1.130205',
    tagline: 'Cristal esmerilado con resplandor azul real y violeta en la barra lateral',
    swatches: ['#161822', '#26293a', '#7e92f8', '#e0a458'],
    vars: {
      '--wl-bg': '#161822',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 65% 55% at 0% 88%, rgba(56, 86, 210, 0.52), transparent 65%), radial-gradient(ellipse 55% 45% at 6% 42%, rgba(124, 58, 168, 0.34), transparent 62%), linear-gradient(180deg, #1b1d26 0%, #161822 100%)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(26, 28, 38, 0.78)',
      '--wl-surface-2': 'rgba(34, 37, 50, 0.84)',
      '--wl-surface-hover': 'rgba(46, 50, 68, 0.88)',
      '--wl-border': 'rgba(255, 255, 255, 0.10)',
      '--wl-border-strong': 'rgba(139, 132, 245, 0.45)',
      '--wl-text': '#edf0f9',
      '--wl-text-muted': '#949cb8',
      '--wl-accent': '#7e92f8',
      '--wl-accent-2': '#a78bfa',
      '--wl-accent-soft': 'rgba(116, 108, 224, 0.28)',
      '--wl-row-active-bg': 'rgba(116, 108, 224, 0.28)',
      '--wl-row-active-border': 'rgba(139, 132, 245, 0.35)',
      '--wl-heading-bar': '#e0a458',
      '--wl-link': '#7e92f8',
      '--wl-glow': '0 8px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      '--wl-code-bg': 'rgba(16, 18, 26, 0.76)',
      '--wl-blur': '18px',
      '--wl-radius': '16px',
      '--wl-ok': '#4ade80',
      '--wl-warn': '#e0a458',
      '--wl-crit': '#fb7185',
      // Native Antigravity CSS variables
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(26, 28, 38, 0.78)',
      '--card-border': 'rgba(255, 255, 255, 0.10)',
      '--border': 'rgba(255, 255, 255, 0.10)',
      '--primary': '#7e92f8',
      '--muted': '#949cb8',
      '--sidebar-secondary': 'rgba(116, 108, 224, 0.22)',
      '--sidebar-muted': '#949cb8',
      '--glass-border': 'rgba(255, 255, 255, 0.10)'
    }
  },
  'border-sunset': {
    id: 'border-sunset',
    name: 'Border Sunset',
    divergence: '0.337187',
    tagline: 'Lienzo espresso oscuro con brillo cálido dorado y terracota de atardecer',
    swatches: ['#1f191a', '#2b2121', '#d98245', '#e2a155'],
    vars: {
      '--wl-bg': '#1f191a',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 85% 42% at 50% 105%, rgba(217, 130, 69, 0.45), rgba(180, 92, 62, 0.20) 45%, transparent 72%), radial-gradient(ellipse 50% 45% at 15% 75%, rgba(138, 74, 72, 0.25), transparent 65%), linear-gradient(180deg, #1f191a 0%, #261d1d 100%)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(34, 27, 27, 0.78)',
      '--wl-surface-2': 'rgba(45, 35, 35, 0.84)',
      '--wl-surface-hover': 'rgba(58, 44, 44, 0.88)',
      '--wl-border': 'rgba(255, 196, 155, 0.16)',
      '--wl-border-strong': 'rgba(242, 162, 118, 0.45)',
      '--wl-text': '#f5ebe6',
      '--wl-text-muted': '#b39b96',
      '--wl-accent': '#dc926e',
      '--wl-accent-2': '#e2a155',
      '--wl-accent-soft': 'rgba(205, 128, 98, 0.22)',
      '--wl-row-active-bg': 'rgba(205, 128, 98, 0.22)',
      '--wl-row-active-border': 'rgba(242, 162, 118, 0.28)',
      '--wl-heading-bar': '#e2a155',
      '--wl-link': '#dc926e',
      '--wl-glow': '0 8px 28px rgba(0, 0, 0, 0.35), 0 0 22px rgba(217, 130, 69, 0.18)',
      '--wl-code-bg': 'rgba(22, 17, 17, 0.82)',
      '--wl-blur': '16px',
      '--wl-radius': '16px',
      '--wl-ok': '#8fd18b',
      '--wl-warn': '#e2a155',
      '--wl-crit': '#e86a7c',
      // Native Antigravity CSS variables
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(34, 27, 27, 0.78)',
      '--card-border': 'rgba(255, 196, 155, 0.16)',
      '--border': 'rgba(255, 196, 155, 0.16)',
      '--primary': '#dc926e',
      '--muted': '#b39b96',
      '--sidebar-secondary': 'rgba(205, 128, 98, 0.22)',
      '--sidebar-muted': '#b39b96',
      '--glass-border': 'rgba(255, 196, 155, 0.16)'
    }
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Borderless',
    divergence: '0.571024',
    tagline: 'Lienzo índigo-violeta unificado sin bordes con brillo neón magenta y cian',
    swatches: ['#22203e', '#262447', '#d946ef', '#00f0ff'],
    vars: {
      '--wl-bg': '#22203e',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 65% 50% at 15% 15%, rgba(139, 92, 246, 0.18), transparent 65%), radial-gradient(ellipse 60% 45% at 85% 90%, rgba(217, 70, 239, 0.12), transparent 62%), linear-gradient(180deg, #22203e 0%, #262447 100%)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(34, 32, 62, 0.86)',
      '--wl-surface-2': 'rgba(44, 41, 78, 0.90)',
      '--wl-surface-hover': 'rgba(58, 54, 102, 0.94)',
      '--wl-border': 'rgba(155, 135, 245, 0.20)',
      '--wl-border-strong': 'rgba(217, 70, 239, 0.65)',
      '--wl-text': '#f2eeff',
      '--wl-text-muted': '#a298ce',
      '--wl-accent': '#d946ef',
      '--wl-accent-2': '#00f0ff',
      '--wl-accent-soft': 'rgba(217, 70, 239, 0.20)',
      '--wl-row-active-bg': 'linear-gradient(90deg, rgba(192, 38, 211, 0.38) 0%, rgba(139, 92, 246, 0.14) 75%, transparent 100%)',
      '--wl-row-active-border': 'transparent',
      '--wl-heading-bar': '#e5a94c',
      '--wl-link': '#9b87f5',
      '--wl-glow': '0 0 24px rgba(217, 70, 239, 0.30), 0 0 12px rgba(0, 240, 255, 0.18)',
      '--wl-code-bg': 'rgba(20, 18, 40, 0.85)',
      '--wl-blur': '16px',
      '--wl-radius': '14px',
      '--wl-ok': '#36f9b3',
      '--wl-warn': '#e5a94c',
      '--wl-crit': '#ff2e97',
      // Native Antigravity CSS variables
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(34, 32, 62, 0.68)',
      '--card-border': 'rgba(155, 135, 245, 0.14)',
      '--border': 'rgba(155, 135, 245, 0.14)',
      '--primary': '#9b87f5',
      '--muted': '#a298ce',
      '--sidebar-secondary': 'rgba(192, 38, 211, 0.24)',
      '--sidebar-muted': '#a298ce',
      '--glass-border': 'rgba(155, 135, 245, 0.16)'
    }
  }
};

export const ACCENT_SWATCHES = [
  { id: 'auto', label: 'Del tema', color: null },
  { id: 'cyan', label: 'Cian neón', color: '#00f0ff' },
  { id: 'magenta', label: 'Magenta', color: '#ff2e97' },
  { id: 'indigo', label: 'Índigo', color: '#7e92f8' },
  { id: 'sunset', label: 'Atardecer', color: '#f28f52' },
  { id: 'violet', label: 'Lavanda', color: '#a78bfa' },
  { id: 'emerald', label: 'Esmeralda', color: '#36f9b3' }
];

export const DEFAULT_CONFIG = {
  enabled: true,
  preset: 'cyberpunk',
  accent: 'auto',
  cleanFont: true,
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
    showMetrics: raw.showMetrics !== false
  };
}

export function buildThemeCss(config) {
  const cfg = normalizeConfig(config);
  const wl = WORLDLINES[cfg.preset] || WORLDLINES[DEFAULT_CONFIG.preset];
  const vars = { ...wl.vars };

  if (cfg.accent !== 'auto') {
    const picked = ACCENT_SWATCHES.find((a) => a.id === cfg.accent);
    if (picked && picked.color) {
      vars['--wl-accent'] = picked.color;
      vars['--wl-border-strong'] = picked.color;
      vars['--wl-accent-soft'] = `${picked.color}29`;
      vars['--wl-link'] = picked.color;
      vars['--primary'] = picked.color;
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

  const presetExtra =
    cfg.preset === 'border-translucent'
      ? `
html[data-wl-preset="border-translucent"] aside,
html[data-wl-preset="border-translucent"] [data-testid="sidebar"],
html[data-wl-preset="border-translucent"] [data-testid="overview-panel-host"],
html[data-wl-preset="border-translucent"] [id="antigravity.agentSidePanelInputBox"] {
  backdrop-filter: blur(18px) saturate(1.25) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.25) !important;
}
html[data-wl-preset="border-translucent"] [data-testid="overview-panel-host"] {
  background: rgba(26, 28, 38, 0.78) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: var(--wl-radius) !important;
}
`
      : cfg.preset === 'border-sunset'
      ? `
html[data-wl-preset="border-sunset"] [data-testid="overview-panel-host"] {
  background: rgba(34, 27, 27, 0.78) !important;
  border: 1px solid rgba(255, 196, 155, 0.16) !important;
  border-radius: var(--wl-radius) !important;
  backdrop-filter: blur(var(--wl-blur)) saturate(1.2) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.2) !important;
}
`
      : `
html[data-wl-preset="cyberpunk"] aside,
html[data-wl-preset="cyberpunk"] [data-testid="sidebar"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
html[data-wl-preset="cyberpunk"] [data-testid="overview-panel-host"],
html[data-wl-preset="cyberpunk"] [data-testid="conversation-view"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
html[data-wl-preset="cyberpunk"] [data-testid="conversation-row-sidebar"][data-selected="true"] {
  background: linear-gradient(90deg, rgba(192, 38, 211, 0.38) 0%, rgba(139, 92, 246, 0.14) 75%, transparent 100%) !important;
  border: none !important;
  border-radius: 10px !important;
  box-shadow: inset 0 -2px 0 rgba(217, 70, 239, 0.85), 0 6px 18px rgba(192, 38, 211, 0.35) !important;
}
html[data-wl-preset="cyberpunk"] [id="antigravity.agentSidePanelInputBox"] {
  border-color: rgba(217, 70, 239, 0.72) !important;
  border-radius: 21px !important;
  box-shadow: 0 0 0 1px rgba(217, 70, 239, 0.45), 0 0 22px rgba(217, 70, 239, 0.28), 0 0 14px rgba(0, 240, 255, 0.16) !important;
}
html[data-wl-preset="cyberpunk"] [id="antigravity.agentSidePanelInputBox"]:focus-within {
  border-color: #d946ef !important;
  border-radius: 21px !important;
  box-shadow: 0 0 0 1px #d946ef, 0 0 28px rgba(217, 70, 239, 0.36), 0 0 16px rgba(0, 240, 255, 0.24) !important;
}
`;

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

/* Sidebar — clean integration without touching conversation navigator or breadcrumb */
html[data-wl-active="1"] aside,
html[data-wl-active="1"] [data-testid="sidebar"] {
  background: var(--wl-sidebar) !important;
  border-color: var(--wl-border) !important;
}

html[data-wl-active="1"] nav[data-testid="conversation-navigator"],
html[data-wl-active="1"] nav[aria-label="Breadcrumb"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

html[data-wl-active="1"] nav[aria-label="Breadcrumb"] [data-testid="breadcrumb-segment"] {
  border-radius: 9999px !important;
  box-shadow: none !important;
}

html[data-wl-active="1"] [data-testid="conversation-row-sidebar"][data-selected="true"] {
  background: var(--wl-row-active-bg) !important;
  border: 1px solid var(--wl-row-active-border) !important;
  border-radius: 10px !important;
}

/* Main Chat Composer Box — concentric frame around .surface-composer-card */
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] {
  background: transparent !important;
  border: 1px solid var(--wl-border-strong) !important;
  border-radius: 21px !important;
  padding: 1px !important;
  box-shadow: var(--wl-glow) !important;
  overflow: visible !important;
  transition: border-color 0.2s ease, box-shadow 0.25s ease !important;
}

html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] > .surface-composer-card {
  background: var(--wl-surface) !important;
  border-radius: 20px !important;
  border: none !important;
}

html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"]:focus-within {
  border-color: var(--wl-border-strong) !important;
  border-radius: 21px !important;
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
  border-radius: 21px !important;
  animation: wl-border-pulse 2.2s ease-in-out infinite !important;
}

/* User Message Bubbles — clean single surface, no inner text outline */
html[data-wl-active="1"] .agy-user-bubble {
  background: var(--wl-surface-2) !important;
  border: 1px solid transparent !important;
  border-radius: var(--wl-radius) !important;
  box-shadow: none !important;
}

html[data-wl-active="1"] [data-testid="user-message-content"],
html[data-wl-active="1"] .agy-user-bubble [data-testid="user-message-content"] {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Markdown headings & links */
html[data-wl-active="1"] [data-testid="conversation-view"] h2:not(.wl-sp-title),
html[data-wl-active="1"] [data-testid="overview-panel-host"] h2:not(.wl-sp-title),
html[data-wl-active="1"] .prose h2:not(.wl-sp-title) {
  border-left: 3px solid var(--wl-heading-bar) !important;
  padding-left: 8px !important;
}

html[data-wl-active="1"] pre {
  background: var(--wl-code-bg) !important;
  border: 1px solid var(--wl-border) !important;
  border-radius: 12px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}

html[data-wl-active="1"] a {
  color: var(--wl-link, var(--wl-accent)) !important;
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

${presetExtra}

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
.wl-dot,
.wl-card-title .wl-dot,
.wl-sp-title .wl-dot {
  width: 7px;
  height: 7px;
  border-radius: 50% !important;
  display: inline-block;
  flex-shrink: 0;
  background: var(--wl-accent);
  box-shadow: 0 0 8px var(--wl-accent);
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
  padding: 24px 28px 36px;
  color: var(--wl-text);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  gap: 6px;
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
  align-items: center;
  gap: 6px;
}
.wl-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50% !important;
  display: inline-block;
  flex-shrink: 0;
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
  border-radius: 50% !important;
  display: inline-block;
  flex-shrink: 0;
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
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.18s ease;
}
.wl-switch[data-on="1"]::after {
  transform: translateX(18px);
}
`;
}
