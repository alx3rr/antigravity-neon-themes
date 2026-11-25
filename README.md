# Antigravity Worldline `0.571024`

> Cambia de *línea de mundo* en **Google Antigravity** — 3 temas curados (**Border Translucent**, **Border Sunset** y **Cyberpunk Borderless**) + monitor de tokens y actividad semanal **solo para modelos Gemini**.

Sin dependencias externas (`npm install` no es necesario), 100 % en español, ligero y sin modificar los binarios de Antigravity.

---

## Qué incluye

### 3 líneas de mundo (temas)
| Tema | Inspiración | Estética |
| :--- | :--- | :--- |
| **Border Translucent** | Obsidian Border (*Translucent*) | Resplandor azul real a violeta en la barra lateral y tarjeta principal translúcida esmerilada. |
| **Border Sunset** | Obsidian Border (*Sunset*) | Lienzo espresso-ciruela oscuro con brillo cálido dorado y terracota desde la parte inferior. |
| **Cyberpunk Borderless** | SynthWave '84 | Lienzo índigo-violeta unificado sin bordes con acento neón magenta y cian. |

### Medidor de Divergencia (solo modelos Gemini)
Pasa el ratón (o haz clic para fijarlo) sobre la barra inferior del chat para ver:
* **Memoria restante del chat actual** (`% libre` + barra verde → amarilla → roja).
* **Resumen humano del último turno:** velocidad (`tok/s`), tokens generados y `%` de caché reutilizada.
* **Gráfica semanal Gemini (`L M X J V S D`):** consumo diario de los últimos 7 días con línea de ritmo proyectado y desglose por modelo Gemini.

### Ajustes simples en `Settings → Worldline`
* Cambio de tema en vivo con 1 clic.
* Selector de **color de acento** (o automático del tema).
* Controles de **desenfoque (Blur)** y **opacidad del panel** en tiempo real.
* Colores diferenciados en el selector de modelos (con efecto neón animado en **Gemini 4 Neon**).
* **Tipografía limpia** (estilo Inter + JetBrains Mono).
* Activar/desactivar la barra de tokens Gemini.

---

## Requisitos
* **Google Antigravity** (app de escritorio).
* **Node.js ≥ 22.13.0** (usa `node:sqlite` y `WebSocket` nativos, cero dependencias).

## Instalación

```bash
git clone https://github.com/alx3rr/antigravity-worldline.git
cd antigravity-worldline
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
