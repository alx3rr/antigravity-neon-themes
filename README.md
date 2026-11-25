# Antigravity · Neon Themes

> Personaliza **Google Antigravity** con 3 temas estilo **Future Gadgets** (**FG-009 · Obsidian Border**, **FG-010 · Cyberpunk** y **FG-011 · Sunset**) + monitor de tokens y actividad semanal **solo para modelos Gemini**.

Sin dependencias externas (`npm install` no es necesario), 100 % en español, ligero y sin modificar los binarios de Antigravity.

---

## Qué incluye

### Future Gadgets (Temas)
| Tema | Inspiración | Estética |
| :--- | :--- | :--- |
| **FG-009 · Obsidian Border** | Obsidian Border (*Translucent*) | Cristal esmerilado con fondo degradado rosa, morado y azul estilo neón. |
| **FG-010 · Cyberpunk** | SynthWave '84 | Lienzo índigo-violeta unificado sin bordes con acento neón magenta y cian. |
| **FG-011 · Sunset** | Obsidian Border (*Sunset*) | Lienzo espresso oscuro con brillo cálido dorado, ámbar y rosa desde la parte inferior. |

### Medidor Gemini (solo modelos Gemini)
Pasa el ratón (o haz clic para fijarlo) sobre la barra inferior del chat para ver:
* **Memoria restante del chat actual** (`% libre` + barra verde → amarilla → roja).
* **Resumen humano del último turno:** velocidad (`tok/s`), tokens generados y `%` de caché reutilizada.
* **Gráfica semanal Gemini (`D L M X J V S`):** consumo diario de los últimos 7 días con línea de ritmo proyectado y desglose por modelo Gemini.

### Ajustes simples en `Settings → Neon Themes`
* Selector rápido de **Future Gadgets** con 1 clic.
* Selector de **color de acento** (o automático del tema).
* Controles de **desenfoque (Blur)** y **opacidad del panel** en tiempo real.
* Colores diferenciados en el selector de modelos y niveles de esfuerzo (con efecto neón animado en **Gemini 4 Neon**).
* **Tipografía limpia** (estilo Inter + JetBrains Mono).
* Activar/desactivar la barra de tokens Gemini.

---

## Requisitos
* **Google Antigravity** (app de escritorio).
* **Node.js ≥ 22.13.0** (usa `node:sqlite` y `WebSocket` nativos, cero dependencias).

## Instalación

```bash
git clone https://github.com/alx3rr/antigravity-neon-themes.git
cd antigravity-neon-themes
node cli.mjs install
node cli.mjs relaunch
```

## Comandos

```bash
node cli.mjs install     # Instala y activa el tema en vivo
node cli.mjs relaunch    # Relanza Antigravity con soporte CDP local
node cli.mjs status      # Comprueba el estado del demonio y la ventana
node cli.mjs uninstall   # Desinstala todo y restaura Antigravity original
```

---

## Licencia
[MIT](./LICENSE)
