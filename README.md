# Antigravity Worldline `1.048596`

> Cambia de *línea de mundo* en **Google Antigravity** — 4 temas curados (**Tokyo Night**, **Cyberpunk**, **Border Sunset** y **Border Translucent**) + monitor de tokens y actividad semanal **solo para modelos Gemini**.

Sin dependencias externas (`npm install` no es necesario), 100 % en español, ligero y sin modificar los binarios de Antigravity.

---

## Qué incluye

### 4 líneas de mundo (temas)
| Tema | Inspiración | Estética |
| :--- | :--- | :--- |
| **Tokyo Night** | Tokyo Night (VS Code) | Azul noche limpio, bordes finos y contraste cómodo para horas de uso. |
| **Cyberpunk** | SynthWave '84 | Fondo oscuro violáceo con acentos cian/magenta y brillo neón en la caja activa. |
| **Border Sunset** | Obsidian Border (*Sunset*) | Tarjetas nítidas con paleta oscura cálida y tonos atardecer ámbar/coral. |
| **Border Translucent** | Obsidian Border (*Translucent*) | Paneles estilo cristal esmerilado (`backdrop-filter: blur`) sobre fondo degradado profundo. |

### Medidor de Divergencia (solo modelos Gemini)
Pasa el ratón (o haz clic para fijarlo) sobre la barra inferior del chat para ver:
* **Memoria restante del chat actual** (`% libre` + barra verde → amarilla → roja).
* **Resumen humano del último turno:** velocidad (`tok/s`), tokens generados y `%` de caché reutilizada.
* **Gráfica semanal Gemini (`L M X J V S D`):** consumo diario de los últimos 7 días con línea de ritmo proyectado y desglose por modelo Gemini.

### Ajustes simples en `Settings → Worldline`
* Cambio de tema en vivo con 1 clic.
* Selector de **color de acento** (o automático del tema).
* **Tipografía limpia** (estilo Inter + JetBrains Mono).
* **Modo Zen** (`Ctrl + Shift + Z`) para ocultar la barra lateral.
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
