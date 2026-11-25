/**
 * src/protobuf.mjs — Minimal zero-dependency protobuf decoder for Antigravity SQLite metadata
 */

export function parseProto(buf) {
  const out = new Map();
  if (!buf || !buf.length) return out;
  let i = 0;
  while (i < buf.length) {
    let tag = 0;
    let shift = 0;
    while (i < buf.length) {
      const b = buf[i++];
      tag |= (b & 0x7f) << shift;
      if (!(b & 0x80)) break;
      shift += 7;
    }
    const fn = tag >>> 3;
    const wt = tag & 7;
    if (fn <= 0 || fn > 10000) break;

    if (wt === 0) {
      let val = 0;
      let s = 0;
      while (i < buf.length) {
        const b = buf[i++];
        val += (b & 0x7f) * Math.pow(2, s);
        if (!(b & 0x80)) break;
        s += 7;
      }
      out.set(fn, val);
    } else if (wt === 2) {
      let len = 0;
      let s = 0;
      while (i < buf.length) {
        const b = buf[i++];
        len |= (b & 0x7f) << s;
        if (!(b & 0x80)) break;
        s += 7;
      }
      if (len < 0 || i + len > buf.length) break;
      out.set(fn, buf.subarray(i, i + len));
      i += len;
    } else if (wt === 1) {
      if (i + 8 > buf.length) break;
      out.set(fn, buf.subarray(i, i + 8));
      i += 8;
    } else if (wt === 5) {
      if (i + 4 > buf.length) break;
      out.set(fn, buf.subarray(i, i + 4));
      i += 4;
    } else {
      break;
    }
  }
  return out;
}

export function cleanModelName(raw) {
  return String(raw || '')
    .trim()
    .replace(/\(\s*(?:x[\s_-]*high|extra[\s_-]*high)\s*\)/gi, '(Extra High)')
    .replace(/\bx[\s_-]*high\b/gi, 'Extra High');
}

export function isGeminiModel(name) {
  return /gemini/i.test(String(name || ''));
}

export function parseGenMetadataRow(row) {
  const top = parseProto(row.data);
  const chat = top.has(1) ? parseProto(top.get(1)) : new Map();
  const usage = chat.has(4) ? parseProto(chat.get(4)) : new Map();
  const chatStart = chat.has(9) ? parseProto(chat.get(9)) : new Map();
  const ctxMeta = chatStart.has(10) ? parseProto(chatStart.get(10)) : new Map();
  const ttftMap = chat.has(11) ? parseProto(chat.get(11)) : new Map();
  const streamMap = chat.has(12) ? parseProto(chat.get(12)) : new Map();
  const planner = top.has(3) ? parseProto(top.get(3)) : new Map();

  const inTok = usage.get(2) || 0;
  const outTok = usage.get(3) || 0;
  const cacheWrite = usage.get(4) || 0;
  const cacheRead = usage.get(5) || 0;
  const maxCtx = ctxMeta.get(4) || 0;
  const ttft = (ttftMap.get(1) || 0) + (ttftMap.get(2) || 0) / 1e9;
  const stream = (streamMap.get(1) || 0) + (streamMap.get(2) || 0) / 1e9;

  const rawModel =
    (chat.has(21) ? Buffer.from(chat.get(21)).toString('utf8').trim() : '') ||
    (chat.has(19) ? Buffer.from(chat.get(19)).toString('utf8').trim() : '') ||
    (planner.has(28) ? Buffer.from(planner.get(28)).toString('utf8').trim() : '');

  return {
    idx: row.idx,
    inTok,
    outTok,
    cacheWrite,
    cacheRead,
    ctx: inTok + cacheWrite + cacheRead,
    maxCtx,
    modelName: cleanModelName(rawModel),
    ttft,
    stream,
    totDur: ttft + stream
  };
}

export function extractStepTimestampMs(metaBuf) {
  if (!metaBuf) return 0;
  const meta = parseProto(metaBuf);
  const ts = meta.has(1) ? parseProto(meta.get(1)) : null;
  if (!ts) return 0;
  const sec = ts.get(1) || 0;
  const nanos = ts.get(2) || 0;
  return sec > 0 ? sec * 1000 + Math.floor(nanos / 1e6) : 0;
}
