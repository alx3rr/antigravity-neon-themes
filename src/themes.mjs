/**
 * src/themes.mjs — 3 curated Future Gadget presets + clean CSS generator for Antigravity · Neon Themes
 */

export const WORLDLINES = {
  'border-translucent': {
    id: 'border-translucent',
    code: 'FG-009',
    name: 'FG-009 · Obsidian Border',
    divergence: 'FG-009',
    tagline: 'Cristal esmerilado con fondo degradado rosa, morado y azul estilo neón',
    swatches: ['#111328', '#3b82f6', '#a855f7', '#ec4899'],
    vars: {
      '--wl-bg': '#111328',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 68% 62% at 6% 88%, rgba(59, 130, 246, 0.72), transparent 64%), radial-gradient(ellipse 58% 54% at 18% 44%, rgba(168, 85, 247, 0.62), transparent 62%), radial-gradient(ellipse 64% 56% at 88% 16%, rgba(236, 72, 153, 0.48), transparent 60%), radial-gradient(ellipse 55% 48% at 86% 88%, rgba(56, 189, 248, 0.34), transparent 58%), linear-gradient(135deg, #111328 0%, #1a1333 52%, #0f172a 100%)',
      '--wl-pane-rgb': '18, 20, 34',
      '--wl-pane-border': 'rgba(255, 255, 255, 0.13)',
      '--wl-sidebar-tint': 'rgba(14, 16, 28, 0.30)',
      '--wl-popover-bg': 'rgba(18, 20, 34, 0.92)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(24, 27, 46, 0.72)',
      '--wl-surface-2': 'rgba(34, 38, 62, 0.80)',
      '--wl-surface-hover': 'rgba(48, 54, 86, 0.88)',
      '--wl-border': 'rgba(255, 255, 255, 0.12)',
      '--wl-border-strong': 'rgba(168, 85, 247, 0.52)',
      '--wl-text': '#f1f4fc',
      '--wl-text-muted': '#a3add0',
      '--wl-accent': '#a855f7',
      '--wl-accent-2': '#38bdf8',
      '--wl-accent-soft': 'rgba(168, 85, 247, 0.24)',
      '--wl-row-active-bg': 'linear-gradient(90deg, rgba(168, 85, 247, 0.34), rgba(59, 130, 246, 0.22))',
      '--wl-row-active-border': 'rgba(192, 132, 252, 0.42)',
      '--wl-heading-bar': '#e0a458',
      '--wl-link': '#818cf8',
      '--wl-glow': '0 8px 30px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
      '--wl-code-bg': 'rgba(14, 16, 28, 0.76)',
      '--wl-radius': '16px',
      '--wl-ok': '#4ade80',
      '--wl-warn': '#e0a458',
      '--wl-crit': '#fb7185',
      // Native Antigravity CSS variables
      '--background': 'transparent',
      '--color-background': 'transparent',
      '--body-background': 'transparent',
      '--shell-canvas': 'transparent',
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(18, 20, 34, 0.74)',
      '--card-border': 'rgba(255, 255, 255, 0.13)',
      '--border': 'rgba(255, 255, 255, 0.12)',
      '--primary': '#a855f7',
      '--muted': 'rgba(255, 255, 255, 0.06)',
      '--sidebar-secondary': 'rgba(168, 85, 247, 0.22)',
      '--sidebar-muted': 'rgba(255, 255, 255, 0.06)',
      '--glass-border': 'rgba(255, 255, 255, 0.14)'
    }
  },
  cyberpunk: {
    id: 'cyberpunk',
    code: 'FG-010',
    name: 'FG-010 · Cyberpunk',
    divergence: 'FG-010',
    tagline: 'Lienzo índigo-violeta unificado sin bordes con brillo neón magenta y cian',
    swatches: ['#1b1836', '#8b5cf6', '#d946ef', '#00f0ff'],
    vars: {
      '--wl-bg': '#1b1836',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 65% 55% at 12% 18%, rgba(139, 92, 246, 0.36), transparent 62%), radial-gradient(ellipse 60% 50% at 86% 86%, rgba(217, 70, 239, 0.32), transparent 60%), radial-gradient(ellipse 45% 40% at 82% 15%, rgba(0, 240, 255, 0.18), transparent 58%), linear-gradient(180deg, #1b1836 0%, #241f46 100%)',
      '--wl-pane-rgb': '26, 23, 52',
      '--wl-pane-border': 'transparent',
      '--wl-sidebar-tint': 'transparent',
      '--wl-popover-bg': 'rgba(26, 23, 52, 0.94)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(30, 26, 58, 0.84)',
      '--wl-surface-2': 'rgba(42, 37, 78, 0.90)',
      '--wl-surface-hover': 'rgba(56, 50, 102, 0.94)',
      '--wl-border': 'rgba(155, 135, 245, 0.22)',
      '--wl-border-strong': 'rgba(217, 70, 239, 0.65)',
      '--wl-text': '#f2eeff',
      '--wl-text-muted': '#a99fd6',
      '--wl-accent': '#d946ef',
      '--wl-accent-2': '#00f0ff',
      '--wl-accent-soft': 'rgba(217, 70, 239, 0.22)',
      '--wl-row-active-bg': 'linear-gradient(90deg, rgba(192, 38, 211, 0.42) 0%, rgba(139, 92, 246, 0.16) 75%, transparent 100%)',
      '--wl-row-active-border': 'transparent',
      '--wl-heading-bar': '#e5a94c',
      '--wl-link': '#9b87f5',
      '--wl-glow': '0 0 24px rgba(217, 70, 239, 0.30), 0 0 12px rgba(0, 240, 255, 0.18)',
      '--wl-code-bg': 'rgba(18, 15, 38, 0.84)',
      '--wl-radius': '14px',
      '--wl-ok': '#36f9b3',
      '--wl-warn': '#e5a94c',
      '--wl-crit': '#ff2e97',
      // Native Antigravity CSS variables
      '--background': 'transparent',
      '--color-background': 'transparent',
      '--body-background': 'transparent',
      '--shell-canvas': 'transparent',
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(26, 23, 52, 0.70)',
      '--card-border': 'rgba(155, 135, 245, 0.16)',
      '--border': 'rgba(155, 135, 245, 0.16)',
      '--primary': '#9b87f5',
      '--muted': 'rgba(155, 135, 245, 0.08)',
      '--sidebar-secondary': 'rgba(192, 38, 211, 0.24)',
      '--sidebar-muted': 'rgba(155, 135, 245, 0.08)',
      '--glass-border': 'rgba(155, 135, 245, 0.18)'
    }
  },
  'border-sunset': {
    id: 'border-sunset',
    code: 'FG-011',
    name: 'FG-011 · Sunset',
    divergence: 'FG-011',
    tagline: 'Lienzo espresso con resplandor cálido dorado, ámbar y rosa de atardecer',
    swatches: ['#1d1519', '#e85d75', '#f59e42', '#e2a155'],
    vars: {
      '--wl-bg': '#1d1519',
      '--wl-bg-gradient':
        'radial-gradient(ellipse 95% 48% at 50% 104%, rgba(245, 158, 66, 0.68), rgba(224, 102, 72, 0.36) 44%, transparent 74%), radial-gradient(ellipse 60% 45% at 10% 72%, rgba(232, 93, 117, 0.38), transparent 65%), radial-gradient(ellipse 55% 40% at 88% 20%, rgba(168, 85, 122, 0.24), transparent 60%), linear-gradient(180deg, #1d1519 0%, #2a1b1d 60%, #3a221d 100%)',
      '--wl-pane-rgb': '31, 23, 24',
      '--wl-pane-border': 'rgba(255, 196, 155, 0.20)',
      '--wl-sidebar-tint': 'rgba(26, 19, 20, 0.34)',
      '--wl-popover-bg': 'rgba(31, 23, 24, 0.93)',
      '--wl-sidebar': 'transparent',
      '--wl-surface': 'rgba(36, 26, 27, 0.76)',
      '--wl-surface-2': 'rgba(48, 35, 36, 0.84)',
      '--wl-surface-hover': 'rgba(64, 46, 46, 0.88)',
      '--wl-border': 'rgba(255, 196, 155, 0.18)',
      '--wl-border-strong': 'rgba(245, 158, 66, 0.52)',
      '--wl-text': '#f7ede8',
      '--wl-text-muted': '#bea39d',
      '--wl-accent': '#f59e42',
      '--wl-accent-2': '#e85d75',
      '--wl-accent-soft': 'rgba(245, 158, 66, 0.22)',
      '--wl-row-active-bg': 'linear-gradient(90deg, rgba(245, 158, 66, 0.28), rgba(232, 93, 117, 0.16))',
      '--wl-row-active-border': 'rgba(245, 158, 66, 0.38)',
      '--wl-heading-bar': '#f59e42',
      '--wl-link': '#f29f74',
      '--wl-glow': '0 8px 28px rgba(0, 0, 0, 0.35), 0 0 24px rgba(245, 158, 66, 0.20)',
      '--wl-code-bg': 'rgba(20, 15, 16, 0.80)',
      '--wl-radius': '16px',
      '--wl-ok': '#8fd18b',
      '--wl-warn': '#f59e42',
      '--wl-crit': '#e85d75',
      // Native Antigravity CSS variables
      '--background': 'transparent',
      '--color-background': 'transparent',
      '--body-background': 'transparent',
      '--shell-canvas': 'transparent',
      '--sidebar': 'transparent',
      '--color-sidebar': 'transparent',
      '--card': 'rgba(31, 23, 24, 0.76)',
      '--card-border': 'rgba(255, 196, 155, 0.20)',
      '--border': 'rgba(255, 196, 155, 0.18)',
      '--primary': '#f59e42',
      '--muted': 'rgba(255, 196, 155, 0.07)',
      '--sidebar-secondary': 'rgba(245, 158, 66, 0.22)',
      '--sidebar-muted': 'rgba(255, 196, 155, 0.07)',
      '--glass-border': 'rgba(255, 196, 155, 0.20)'
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
  showMetrics: true,
  blurPx: 18,
  panelOpacity: 72,
  animatedBg: false
};

function clampInt(val, min, max, fallback) {
  const n = Math.round(Number(val));
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export function normalizeConfig(raw = {}) {
  const preset = WORLDLINES[raw.preset] ? raw.preset : DEFAULT_CONFIG.preset;
  const accentValid = ACCENT_SWATCHES.some((a) => a.id === raw.accent);
  return {
    enabled: raw.enabled !== false,
    preset,
    accent: accentValid ? raw.accent : DEFAULT_CONFIG.accent,
    cleanFont: raw.cleanFont !== false,
    showMetrics: raw.showMetrics !== false,
    blurPx: clampInt(raw.blurPx, 0, 32, DEFAULT_CONFIG.blurPx),
    panelOpacity: clampInt(raw.panelOpacity, 40, 95, DEFAULT_CONFIG.panelOpacity),
    animatedBg: Boolean(raw.animatedBg)
  };
}

export function buildThemeCss(config) {
  const cfg = normalizeConfig(config);
  const wl = WORLDLINES[cfg.preset] || WORLDLINES[DEFAULT_CONFIG.preset];
  const vars = {
    ...wl.vars,
    '--wl-blur': `${cfg.blurPx}px`,
    '--wl-panel-alpha': (cfg.panelOpacity / 100).toFixed(2)
  };

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
    cfg.preset === 'border-translucent' || cfg.preset === 'border-sunset'
      ? `
html[data-wl-active="1"] [data-testid="overview-panel-host"] {
  background: rgba(var(--wl-pane-rgb), var(--wl-panel-alpha)) !important;
  border: 1px solid var(--wl-pane-border) !important;
  border-radius: var(--wl-radius) !important;
  backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
}
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] {
  backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
}
`
      : `
html[data-wl-preset="cyberpunk"] aside,
html[data-wl-preset="cyberpunk"] [data-testid="sidebar"],
html[data-wl-preset="cyberpunk"] .bg-sidebar {
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
  background: linear-gradient(90deg, rgba(192, 38, 211, 0.42) 0%, rgba(139, 92, 246, 0.16) 75%, transparent 100%) !important;
  border: none !important;
  border-radius: 10px !important;
  box-shadow: inset 0 -2px 0 var(--wl-accent), 0 6px 18px var(--wl-accent-soft) !important;
}
html[data-wl-preset="cyberpunk"] [id="antigravity.agentSidePanelInputBox"] {
  border-color: var(--wl-accent) !important;
  border-radius: 21px !important;
  box-shadow: 0 0 0 1px var(--wl-accent-soft), 0 0 22px var(--wl-accent-soft), 0 0 14px rgba(0, 240, 255, 0.16) !important;
}
html[data-wl-preset="cyberpunk"] [id="antigravity.agentSidePanelInputBox"]:focus-within {
  border-color: var(--wl-accent) !important;
  border-radius: 21px !important;
  box-shadow: 0 0 0 1px var(--wl-accent), 0 0 28px var(--wl-accent-soft), 0 0 16px rgba(0, 240, 255, 0.24) !important;
}
`;

  return `/* Antigravity · Neon Themes · ${wl.name} */
:root,
html[data-wl-active="1"],
html[data-wl-active="1"] body,
html[data-wl-active="1"] body[data-agy-theme],
html[data-wl-active="1"] .agy-shell,
html[data-wl-active="1"] .agy-inset-shell {
${varDecls}
}

${fontCss}

/* Base Wallpaper Gradient — unblock Antigravity's opaque shell layers */
@keyframes wl-bg-drift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

html[data-wl-active="1"],
html[data-wl-active="1"] body,
html[data-wl-active="1"] #root,
html[data-wl-active="1"] .agy-shell {
  background: var(--wl-bg-gradient) fixed !important;
  color: var(--wl-text) !important;
}

html[data-wl-active="1"][data-wl-animated-bg="1"],
html[data-wl-active="1"][data-wl-animated-bg="1"] body,
html[data-wl-active="1"][data-wl-animated-bg="1"] #root,
html[data-wl-active="1"][data-wl-animated-bg="1"] .agy-shell {
  background-size: 165% 165% !important;
  animation: wl-bg-drift 22s ease-in-out infinite !important;
}

html[data-wl-active="1"] .agy-inset-shell,
html[data-wl-active="1"] .agy-inset-shell > div:not(.bg-sidebar),
html[data-wl-active="1"] [data-testid="conversation-view"],
html[data-wl-active="1"] [class*="shell-canvas"],
html[data-wl-active="1"] div:has(> [data-testid="toggle-aux-sidebar"]) {
  background: transparent !important;
}

/* Sidebar — glass tint only on outer sidebar container */
html[data-wl-active="1"] aside,
html[data-wl-active="1"] [data-testid="sidebar"],
html[data-wl-active="1"] .agy-inset-shell > div > .bg-sidebar,
html[data-wl-active="1"] .bg-sidebar:has([data-testid="conversation-list-sidebar"]) {
  background: var(--wl-sidebar-tint, transparent) !important;
  border-color: var(--wl-border) !important;
  backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.25) !important;
}

/* Remove stacked dark boxes behind Projects, FSO, Conversations */
html[data-wl-active="1"] [data-testid="section-header"],
html[data-wl-active="1"] [data-testid="section-header"] .bg-sidebar,
html[data-wl-active="1"] .bg-sidebar:has(> [data-testid="section-header"]),
html[data-wl-active="1"] [data-testid="conversation-list-sidebar"] .bg-sidebar,
html[data-wl-active="1"] [data-testid="project-header"],
html[data-wl-active="1"] .shrink-0.flex.bg-sidebar {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Smooth fade into Windows native caption overlay (- [] X) */
html[data-wl-active="1"] [data-testid="title-menu-bar"] {
  background: linear-gradient(
    to right,
    transparent 0%,
    transparent calc(100% - 260px),
    rgba(17, 17, 20, 0.45) calc(100% - 190px),
    rgba(17, 17, 20, 0.88) calc(100% - 148px),
    #111114 calc(100% - 134px)
  ) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-wl-active="1"] [data-testid="app-icon-new-conversation-button"] svg[data-wl-logo-enhanced="1"] {
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.38));
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

/* Remove sidebar hover action popup */
html[data-wl-active="1"] .agy-sidebar-row .agy-row-actions,
html[data-wl-active="1"] [data-testid="conversation-row-sidebar"] .agy-row-actions,
html[data-wl-active="1"] .agy-sidebar-row .agy-row-shortcut-badge {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Remove dark fade bar right above the chat composer */
html[data-wl-active="1"] [data-testid="conversation-view"] .pointer-events-none[class*="bottom-0"],
html[data-wl-active="1"] [data-testid="overview-panel-host"] .pointer-events-none[class*="bottom-0"],
html[data-wl-active="1"] .pointer-events-none.bottom-0[class*="left-"] {
  background: transparent !important;
  background-image: none !important;
}

/* Keep modals, dropdown menus & popovers crisp and readable */
html[data-wl-active="1"] [role="dialog"],
html[data-wl-active="1"] [role="menu"],
html[data-wl-active="1"] [role="listbox"] {
  background: var(--wl-popover-bg) !important;
  backdrop-filter: blur(var(--wl-blur)) saturate(1.3) !important;
  -webkit-backdrop-filter: blur(var(--wl-blur)) saturate(1.3) !important;
  border: 1px solid var(--wl-border-strong) !important;
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

/* Diffs, tool cards & code blocks harmonized with active theme */
html[data-wl-active="1"] .monaco-diff-editor,
html[data-wl-active="1"] [data-testid="tool-call-card"],
html[data-wl-active="1"] pre {
  background: var(--wl-code-bg) !important;
  border: 1px solid var(--wl-border) !important;
  border-radius: 12px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}

/* Markdown headings & links */
html[data-wl-active="1"] [data-testid="conversation-view"] h2:not(.wl-sp-title),
html[data-wl-active="1"] [data-testid="overview-panel-host"] h2:not(.wl-sp-title),
html[data-wl-active="1"] .prose h2:not(.wl-sp-title) {
  border-left: 3px solid var(--wl-heading-bar) !important;
  padding-left: 8px !important;
}

html[data-wl-active="1"] a {
  color: var(--wl-link, var(--wl-accent)) !important;
}

/* Model colors + lightweight GPU-animated fluorescent Gemini 4 Neon */
@keyframes wl-neon-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

html[data-wl-active="1"] [data-wl-model="neon"] {
  background: linear-gradient(90deg, #00f5ff 0%, #ff2e97 35%, #a855f7 68%, #00f5ff 100%) !important;
  background-size: 200% auto !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 700 !important;
  filter: drop-shadow(0 0 6px rgba(0, 245, 255, 0.42));
  animation: wl-neon-flow 4s linear infinite;
}
html[data-wl-active="1"] [data-wl-model="carbon"] {
  background: linear-gradient(90deg, #94a3b8 0%, #f1f5f9 50%, #5eead4 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 600 !important;
  filter: drop-shadow(0 0 4px rgba(94, 234, 212, 0.28));
}
html[data-wl-active="1"] [data-wl-model="argon"] { color: #818cf8 !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-model="hydrogen"] { color: #38bdf8 !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-model="flash"] { color: #fbbf24 !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-model="claude"] { color: #fb923c !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-model="gpt"] { color: #34d399 !important; font-weight: 600 !important; }

/* Reasoning Effort Colors (Low / Medium / High / Extra High) */
html[data-wl-active="1"] [data-wl-effort="low"] { color: #4ade80 !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-effort="medium"] { color: #60a5fa !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-effort="high"] { color: #f59e0b !important; font-weight: 600 !important; }
html[data-wl-active="1"] [data-wl-effort="extra-high"] {
  color: #f43f5e !important;
  font-weight: 700 !important;
  filter: drop-shadow(0 0 5px rgba(244, 63, 94, 0.35));
}

/* View Usage menu item highlight */
html[data-wl-active="1"] [data-wl-view-usage="1"] {
  border-top: 1px solid var(--wl-border) !important;
  margin-top: 2px;
}
html[data-wl-active="1"] [data-wl-view-usage="1"]:hover {
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.16), rgba(168, 85, 247, 0.14)) !important;
}
html[data-wl-active="1"] [data-wl-view-usage="1"] svg {
  color: #38bdf8 !important;
  filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.45));
}
html[data-wl-active="1"] [data-wl-view-usage-label="1"] {
  background: linear-gradient(90deg, #38bdf8 0%, #a855f7 55%, #ec4899 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 600 !important;
}

/* Neon Send & Stop buttons (Voice buttons explicitly untouched) */
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[data-testid="input-send-button"],
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[aria-label^="Send"]:not([data-testid="voice-start-button"]) {
  background: linear-gradient(135deg, var(--wl-accent), var(--wl-accent-2)) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.28) !important;
  box-shadow: 0 0 14px var(--wl-accent-soft), 0 0 4px var(--wl-accent) !important;
  transition: transform 0.16s ease, box-shadow 0.2s ease, opacity 0.16s ease !important;
}
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[data-testid="input-send-button"]:not(:disabled):hover,
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[aria-label^="Send"]:not([data-testid="voice-start-button"]):not(:disabled):hover {
  transform: scale(1.08);
  box-shadow: 0 0 22px var(--wl-accent), 0 0 10px var(--wl-accent-2) !important;
}
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[data-testid="input-send-button"]:disabled,
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[aria-label^="Send"]:not([data-testid="voice-start-button"]):disabled {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: var(--wl-border) !important;
  box-shadow: none !important;
  opacity: 0.6;
}
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[data-testid="input-cancel-button"] {
  background: rgba(244, 63, 94, 0.18) !important;
  border: 1px solid rgba(244, 63, 94, 0.65) !important;
  color: #fb7185 !important;
  box-shadow: 0 0 12px rgba(244, 63, 94, 0.30) !important;
}
html[data-wl-active="1"] [id="antigravity.agentSidePanelInputBox"] button[data-testid="input-cancel-button"]:hover {
  background: rgba(244, 63, 94, 0.30) !important;
  box-shadow: 0 0 18px rgba(244, 63, 94, 0.48) !important;
}

/* Color-coded Permissions Pill & Menu Options (Turbo / Auto / Default / Strict) */
html[data-wl-active="1"] [data-testid="permissions-selector-trigger"][data-wl-perm] {
  border-radius: 9999px !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  transition: box-shadow 0.2s ease, background 0.2s ease !important;
}
html[data-wl-active="1"] [data-wl-perm="turbo"] {
  color: #fbbf24 !important;
  background: rgba(245, 158, 11, 0.13) !important;
  border: 1px solid rgba(245, 158, 11, 0.42) !important;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.20) !important;
}
html[data-wl-active="1"] [data-wl-perm="auto"] {
  color: #34d399 !important;
  background: rgba(52, 211, 153, 0.12) !important;
  border: 1px solid rgba(52, 211, 153, 0.38) !important;
}
html[data-wl-active="1"] [data-wl-perm="default"] {
  color: var(--wl-accent) !important;
  background: var(--wl-accent-soft) !important;
  border: 1px solid var(--wl-border-strong) !important;
}
html[data-wl-active="1"] [data-wl-perm="strict"] {
  color: #38bdf8 !important;
  background: rgba(56, 189, 248, 0.12) !important;
  border: 1px solid rgba(56, 189, 248, 0.38) !important;
}
html[data-wl-active="1"] [role="menuitem"][data-wl-perm],
html[data-wl-active="1"] [role="menuitemradio"][data-wl-perm] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-weight: 600 !important;
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
  gap: 4px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--wl-border);
}
.wl-model-item {
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
  text-align: left;
  color: inherit;
  transition: background 0.14s ease, border-color 0.14s ease;
}
.wl-model-item:hover,
.wl-model-item[data-open="1"] {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--wl-border);
}
.wl-model-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: var(--wl-text-muted);
}
.wl-model-row strong { color: var(--wl-text); font-weight: 600; }
.wl-model-detail {
  display: none;
  margin-top: 3px;
  font-size: 10.5px;
  color: var(--wl-accent-2);
}
.wl-model-item[data-open="1"] .wl-model-detail {
  display: block;
}

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

.wl-slider-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--wl-surface-2);
  border: 1px solid var(--wl-border);
  border-radius: 12px;
  padding: 11px 14px;
}
.wl-slider-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.wl-slider-val {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--wl-accent);
}
.wl-range {
  width: 100%;
  accent-color: var(--wl-accent);
  cursor: pointer;
}
`;
}
