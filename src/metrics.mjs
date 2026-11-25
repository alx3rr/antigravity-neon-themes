/**
 * src/metrics.mjs — Local Gemini-only token reader & 7-day chart renderer (node:sqlite)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseGenMetadataRow, isGeminiModel, extractStepTimestampMs } from './protobuf.mjs';

const require = createRequire(import.meta.url);
let _DatabaseSync = null;
function getDatabaseSync() {
  if (!_DatabaseSync) {
    try {
      ({ DatabaseSync: _DatabaseSync } = require('node:sqlite'));
    } catch {
      return null;
    }
  }
  return _DatabaseSync;
}

const DAY_LABELS_ES = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

function fmtTok(n) {
  if (!n || n <= 0) return '0';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 10_000) return Math.round(n / 1000) + 'k';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(Math.round(n));
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getLocalDayKey(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildLast7DaysMeta(nowMs) {
  const days = [];
  const base = new Date(nowMs);
  base.setHours(12, 0, 0, 0);
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(base.getTime() - offset * 86_400_000);
    days.push({
      key: getLocalDayKey(d.getTime()),
      label: DAY_LABELS_ES[d.getDay()],
      isToday: offset === 0,
      tokens: 0
    });
  }
  return days;
}

export function createGeminiMetricsService(conversationsDir) {
  let weeklyCache = { ts: 0, data: null };

  function readWeeklySummary() {
    const now = Date.now();
    if (weeklyCache.data && now - weeklyCache.ts < 20_000) {
      return weeklyCache.data;
    }

    const DatabaseSync = getDatabaseSync();
    const days = buildLast7DaysMeta(now);
    const dayIndex = new Map(days.map((d, idx) => [d.key, idx]));
    const byModel = new Map();
    let totalTokens = 0;
    let totalGenerations = 0;

    if (DatabaseSync && conversationsDir && fs.existsSync(conversationsDir)) {
      const cutoffMs = now - 7 * 86_400_000;
      let entries = [];
      try {
        entries = fs.readdirSync(conversationsDir);
      } catch {
        entries = [];
      }

      for (const name of entries) {
        if (!name.endsWith('.db')) continue;
        const dbPath = path.join(conversationsDir, name);
        let st;
        try {
          st = fs.statSync(dbPath);
        } catch {
          continue;
        }
        if (!st || st.mtimeMs < cutoffMs) continue;

        const fallbackBucketIdx = dayIndex.get(getLocalDayKey(st.mtimeMs));
        let db;
        try {
          db = new DatabaseSync(dbPath, { readOnly: true, timeout: 120 });
          const stepRows = db.prepare('SELECT idx, metadata FROM steps ORDER BY idx ASC').all();
          const stepTsByIdx = new Map();
          const stepIdxs = [];
          for (const sr of stepRows) {
            const ts = extractStepTimestampMs(sr.metadata);
            if (ts > 0) {
              stepTsByIdx.set(sr.idx, ts);
              stepIdxs.push(sr.idx);
            }
          }
          const resolveBucketIdx = (maxStepIdx) => {
            if (maxStepIdx >= 0) {
              if (stepTsByIdx.has(maxStepIdx)) {
                return dayIndex.get(getLocalDayKey(stepTsByIdx.get(maxStepIdx)));
              }
              for (let j = stepIdxs.length - 1; j >= 0; j--) {
                if (stepIdxs[j] <= maxStepIdx) {
                  return dayIndex.get(getLocalDayKey(stepTsByIdx.get(stepIdxs[j])));
                }
              }
            }
            return fallbackBucketIdx;
          };

          const rows = db.prepare('SELECT idx, data FROM gen_metadata ORDER BY idx ASC').all();
          for (const row of rows) {
            const p = parseGenMetadataRow(row);
            if (!isGeminiModel(p.modelName)) continue;
            const billed = p.inTok + p.outTok;
            if (billed <= 0 && p.ctx <= 0) continue;
            const tokCount = billed > 0 ? billed : p.outTok;
            const bucketIdx = resolveBucketIdx(p.maxStepIdx);
            if (bucketIdx === undefined) continue;
            totalTokens += tokCount;
            totalGenerations++;
            const cur = byModel.get(p.modelName) || { tokens: 0, calls: 0, tpsSum: 0, tpsCount: 0 };
            cur.tokens += tokCount;
            cur.calls++;
            const sTps = p.stream >= 0.12 ? p.outTok / p.stream : 0;
            const eTps = p.totDur > 0 ? p.outTok / p.totDur : 0;
            const rowTps = sTps > 0 && sTps <= 3000 ? sTps : eTps;
            if (rowTps > 0) {
              cur.tpsSum += rowTps;
              cur.tpsCount++;
            }
            byModel.set(p.modelName, cur);
            days[bucketIdx].tokens += tokCount;
          }
        } catch {
          // Skip locked or unreadable DB files safely
        } finally {
          try {
            db?.close();
          } catch {}
        }
      }
    }

    const topModels = Array.from(byModel.entries())
      .sort((a, b) => b[1].tokens - a[1].tokens)
      .slice(0, 4)
      .map(([model, stats]) => ({
        model,
        tokens: stats.tokens,
        calls: stats.calls,
        avgTps: stats.tpsCount > 0 ? Math.round(stats.tpsSum / stats.tpsCount) : 0,
        sharePct: totalTokens > 0 ? Math.round((stats.tokens / totalTokens) * 100) : 0
      }));

    const activeDays = days.filter((d) => d.tokens > 0).length || 1;
    const avgPerDay = Math.round(totalTokens / activeDays);
    const todayTokens = days[days.length - 1].tokens;

    const summary = {
      days,
      topModels,
      totalTokens,
      totalGenerations,
      avgPerDay,
      todayTokens
    };
    weeklyCache = { ts: now, data: summary };
    return summary;
  }

  function readCurrentChat(cascadeId) {
    const DatabaseSync = getDatabaseSync();
    if (!DatabaseSync || !cascadeId || !/^[0-9a-f-]{36}$/i.test(cascadeId)) {
      return { hasData: false, isRunning: false };
    }
    const dbPath = path.join(conversationsDir, `${cascadeId}.db`);
    if (!fs.existsSync(dbPath)) {
      return { hasData: false, isRunning: false };
    }

    let db;
    try {
      db = new DatabaseSync(dbPath, { readOnly: true, timeout: 150 });
      const activeRow = db
        .prepare('SELECT idx FROM steps WHERE status IN (1, 2, 8, 9, 11) LIMIT 1')
        .get();
      const isRunning = Boolean(activeRow);

      const rows = db.prepare('SELECT idx, data FROM gen_metadata ORDER BY idx ASC').all();
      const geminiItems = [];
      let totalIn = 0;
      let totalCacheRead = 0;
      let totalPrompt = 0;
      let totalOut = 0;

      for (const row of rows) {
        const p = parseGenMetadataRow(row);
        if (!isGeminiModel(p.modelName)) continue;
        if (p.ctx <= 0 && p.outTok <= 0) continue;
        geminiItems.push(p);
        totalIn += p.inTok;
        totalCacheRead += p.cacheRead;
        totalPrompt += p.ctx;
        totalOut += p.outTok;
      }

      if (geminiItems.length === 0) {
        return { hasData: false, isRunning };
      }

      const last = geminiItems[geminiItems.length - 1];
      let contextLimit = 0;
      for (let i = geminiItems.length - 1; i >= 0; i--) {
        if (geminiItems[i].maxCtx > 0) {
          contextLimit = geminiItems[i].maxCtx;
          break;
        }
      }
      if (!contextLimit) contextLimit = 512_000;

      const streamTps = last.stream >= 0.12 ? last.outTok / last.stream : 0;
      const e2eTps = last.totDur > 0 ? last.outTok / last.totDur : 0;
      const tps = Math.round(streamTps > 0 && streamTps <= 3000 ? streamTps : e2eTps);
      const usedPct = Math.min(100, Math.round((last.ctx / contextLimit) * 100));
      const freePct = Math.max(0, 100 - usedPct);
      const remainCtx = Math.max(0, contextLimit - last.ctx);
      const cacheRate = totalPrompt > 0 ? ((totalCacheRead / totalPrompt) * 100).toFixed(1) : '0.0';

      return {
        hasData: true,
        isRunning,
        modelName: last.modelName,
        tps,
        lastOut: last.outTok,
        totalOut,
        totalIn,
        ctxUsed: last.ctx,
        contextLimit,
        remainCtx,
        usedPct,
        freePct,
        cacheRate,
        calls: geminiItems.length
      };
    } catch {
      return { hasData: false, isRunning: false };
    } finally {
      try {
        db?.close();
      } catch {}
    }
  }

  function buildWeeklyChartSvg(days) {
    const W = 300;
    const H = 72;
    const padX = 12;
    const padTop = 10;
    const padBot = 6;
    const innerH = H - padTop - padBot;

    // Cumulative curve across the 7 days, matching the burn-rate style
    const cumulative = [];
    let acc = 0;
    for (const d of days) {
      acc += d.tokens;
      cumulative.push(acc);
    }

    const currentTotal = cumulative[cumulative.length - 1] || 0;
    const projectedNext = currentTotal > 0 ? Math.round(currentTotal * 1.25) : 1000;
    const maxVal = Math.max(projectedNext, 1);

    const stepX = (W - padX * 2) / 6;
    const pts = cumulative.map((val, idx) => {
      const x = padX + idx * stepX;
      const y = padTop + innerH - (val / maxVal) * innerH;
      return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
    });

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const lastPt = pts[pts.length - 1];
    const firstPt = pts[0];
    const areaPath = `${linePath} L${lastPt.x},${H - padBot} L${firstPt.x},${H - padBot} Z`;

    // Dotted projection from day 5 -> projected cap at right edge
    const projY = Number((padTop + innerH - (projectedNext / maxVal) * innerH).toFixed(1));
    const guideY = padTop;

    const vLines = pts
      .map(
        (p) =>
          `<line x1="${p.x}" y1="${guideY}" x2="${p.x}" y2="${H - padBot}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`
      )
      .join('');

    return `<svg class="wl-chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <line x1="${padX}" y1="${guideY}" x2="${W - padX}" y2="${guideY}" stroke="rgba(255,255,255,0.14)" stroke-dasharray="4 3" stroke-width="1"/>
      ${vLines}
      <path d="${areaPath}" fill="var(--wl-ok)" fill-opacity="0.16"/>
      <path d="${linePath}" fill="none" stroke="var(--wl-ok)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="${pts[pts.length - 2].x}" y1="${pts[pts.length - 2].y}" x2="${lastPt.x}" y2="${projY}" stroke="var(--wl-crit)" stroke-dasharray="2.5 4" stroke-width="2" opacity="0.85"/>
      <circle cx="${lastPt.x}" cy="${lastPt.y}" r="3.6" fill="var(--wl-ok)"/>
      <circle cx="${lastPt.x}" cy="${projY}" r="3" fill="var(--wl-crit)" opacity="0.85"/>
    </svg>`;
  }

  function buildPayload(cascadeId, gadgetCode = 'FG-010') {
    const chat = readCurrentChat(cascadeId);
    const weekly = readWeeklySummary();

    const level = !chat.hasData
      ? 'ok'
      : chat.usedPct >= 90
      ? 'crit'
      : chat.usedPct >= 75
      ? 'warn'
      : 'ok';

    const dotClass = chat.isRunning
      ? 'wl-dot is-running'
      : level === 'crit'
      ? 'wl-dot is-crit'
      : level === 'warn'
      ? 'wl-dot is-warn'
      : 'wl-dot';

    const pillHtml = chat.hasData
      ? `<span class="${dotClass}"></span>` +
        `<span>${chat.tps} tok/s</span>` +
        `<span class="wl-sep">·</span>` +
        `<span class="wl-val-${level}">${chat.freePct}% libre</span>` +
        `<span class="wl-sep">·</span>` +
        `<span>Gemini</span>`
      : `<span class="${dotClass}"></span><span>${chat.isRunning ? 'Generando…' : 'Gemini listo'}</span>`;

    const daysHtml = weekly.days
      .map((d) => `<span class="${d.isToday ? 'is-today' : ''}">${d.label}</span>`)
      .join('');

    const modelsHtml =
      weekly.topModels.length > 0
        ? `<div class="wl-models-list">${weekly.topModels
            .map(
              (m) =>
                `<button type="button" class="wl-model-item" data-wl-model-key="${escapeHtml(m.model)}">` +
                `<div class="wl-model-row"><span>${escapeHtml(m.model)} ▾</span><strong>${fmtTok(m.tokens)} tok</strong></div>` +
                `<div class="wl-model-detail">${m.calls} llamadas · Media ${m.avgTps} tok/s · ${m.sharePct}% semanal</div>` +
                `</button>`
            )
            .join('')}</div>`
        : '';

    const heroHtml = chat.hasData
      ? `<div class="wl-hero-row">
           <span class="wl-hero-pct wl-val-${level}">${chat.freePct}%</span>
           <span class="wl-hero-sub">memoria libre en este chat</span>
         </div>
         <div class="wl-bar-track">
           <div class="wl-bar-fill is-${level}" style="width:${Math.max(4, chat.freePct)}%"></div>
         </div>
         <div class="wl-meta-row">
           <span>${chat.usedPct}% usado (${fmtTok(chat.ctxUsed)})</span>
           <span>Quedan ${fmtTok(chat.remainCtx)} / ${fmtTok(chat.contextLimit)}</span>
         </div>
         <div class="wl-stats-grid">
           <div class="wl-stat-box">
             <div class="wl-stat-lbl">Velocidad</div>
             <div class="wl-stat-val">${chat.tps} t/s</div>
           </div>
           <div class="wl-stat-box">
             <div class="wl-stat-lbl">Generado</div>
             <div class="wl-stat-val">${fmtTok(chat.lastOut)}</div>
           </div>
           <div class="wl-stat-box">
             <div class="wl-stat-lbl">Caché</div>
             <div class="wl-stat-val wl-val-ok">${chat.cacheRate}%</div>
           </div>
         </div>`
      : `<div class="wl-hero-row">
           <span class="wl-hero-pct wl-val-ok">100%</span>
           <span class="wl-hero-sub">chat nuevo · sin consumo aún</span>
         </div>
         <div class="wl-bar-track"><div class="wl-bar-fill is-ok" style="width:100%"></div></div>
         <div class="wl-meta-row"><span>Solo modelos Gemini</span><span>Envía un mensaje para medir</span></div>`;

    const popoverHtml = `<div class="wl-card">
      <div class="wl-card-hdr">
        <span class="wl-card-title">
          <span class="${dotClass}"></span>
          <span>${escapeHtml(chat.hasData ? chat.modelName : 'Antigravity · Gemini')}</span>
        </span>
        <span class="wl-div-badge">${escapeHtml(gadgetCode)}</span>
      </div>
      ${heroHtml}
      <div class="wl-chart-box">
        <div class="wl-chart-hdr">
          <strong>Actividad Gemini (7 días)</strong>
          <span>Total: ${fmtTok(weekly.totalTokens)} tok</span>
        </div>
        ${buildWeeklyChartSvg(weekly.days)}
        <div class="wl-chart-days">${daysHtml}</div>
        <div class="wl-pace-note">Hoy: ${fmtTok(weekly.todayTokens)} tok · Media: ${fmtTok(weekly.avgPerDay)} tok/día</div>
        ${modelsHtml}
      </div>
      <div class="wl-card-footer">
        <span>Solo modelos Gemini</span>
        <span>Clic para fijar</span>
      </div>
    </div>`;

    return {
      cid: cascadeId || '',
      isRunning: chat.isRunning,
      pillHtml,
      popoverHtml
    };
  }

  return { buildPayload };
}
