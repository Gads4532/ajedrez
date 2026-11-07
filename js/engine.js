/* Envoltorio de Stockfish (Web Worker) con cola de peticiones y motor de respaldo. */
(function () {
  class Engine {
    constructor() {
      this.ready = false; this.busy = false; this.queue = []; this.cur = null; this.failed = false;
      this.name = 'cargando…';
      // 1º Stockfish 19 (WASM NNUE, el más reciente), 2º Stockfish 10 (asm.js), 3º motor JS propio
      this.candidates = [['js/sf19.js', 'Stockfish 19 NNUE'], ['js/stockfish.js', 'Stockfish 10 (compatibilidad)']];
      this._readyP = new Promise(res => { this._res = res; });
      this._boot();
    }
    _boot() {
      const c = this.candidates.shift();
      if (!c) { this.failed = true; this.name = 'Motor JS básico'; this._res(false); this._flushFail(); window.dispatchEvent(new Event('engine-ready')); return; }
      clearTimeout(this._to);
      try {
        if (this.w) this.w.terminate();
        this.w = new Worker(c[0]);
        this.w.onmessage = (e) => this._on(typeof e === 'string' ? e : e.data);
        this.w.onerror = () => { if (!this.ready) this._boot(); else { this.failed = true; this._flushFail(); } };
        this.w.postMessage('uci');
        this.w.postMessage('setoption name Hash value 64');
        this.w.postMessage('isready');
        this._cand = c[1];
        this._to = setTimeout(() => { if (!this.ready) this._boot(); }, 20000);
      } catch (err) { this._boot(); }
    }
    _flushFail() { const q = this.queue.splice(0); if (this.cur) q.unshift(this.cur); this.cur = null; q.forEach(j => j.resolve(fallbackAnalyze(j))); }
    _on(line) {
      if (line === 'readyok' && !this.ready) { clearTimeout(this._to); this.ready = true; this.name = this._cand; this._res(true); window.dispatchEvent(new Event('engine-ready')); this._next(); return; }
      const j = this.cur; if (!j) return;
      if (line.startsWith('info') && line.includes(' pv ')) {
        const depth = +(/ depth (\d+)/.exec(line) || [])[1];
        const mpv = +((/ multipv (\d+)/.exec(line) || [])[1] || 1);
        const sc = / score (cp|mate) (-?\d+)/.exec(line); if (!sc) return;
        const pv = line.split(' pv ')[1].trim().split(' ');
        const sign = j.turn === 'w' ? 1 : -1; // normalizado a perspectiva de blancas
        const ln = { depth, cp: sc[1] === 'cp' ? sign * +sc[2] : null, mate: sc[1] === 'mate' ? sign * +sc[2] : null, pv };
        if (/ (lowerbound|upperbound)/.test(line)) return;
        j.lines[mpv - 1] = ln; j.depth = depth;
        if (j.onInfo) j.onInfo(j.lines.slice(), depth);
      } else if (line.startsWith('bestmove')) {
        const bm = line.split(' ')[1];
        this.cur = null; this.busy = false;
        if (!j.cancelled) j.resolve({ bestmove: bm, lines: j.lines.filter(Boolean), depth: j.depth });
        this._next();
      }
    }
    _next() {
      if (this.busy || !this.ready) return;
      const j = this.queue.shift(); if (!j) return;
      this.cur = j; this.busy = true;
      this.w.postMessage('setoption name MultiPV value ' + (j.multipv || 1));
      this.w.postMessage('setoption name Skill Level value ' + (j.skill == null ? 20 : j.skill));
      this.w.postMessage('position fen ' + j.fen);
      if (j.movetime) this.w.postMessage('go movetime ' + j.movetime + (j.depth ? ' depth ' + j.depth : ''));
      else this.w.postMessage('go depth ' + (j.depth || 14));
    }
    /* opciones: depth, movetime, multipv, skill, onInfo */
    analyze(fen, o = {}) {
      return new Promise(resolve => {
        const job = Object.assign({ fen, lines: [], resolve, turn: fen.split(' ')[1] }, o);
        if (this.failed) { resolve(fallbackAnalyze(job)); return; }
        this.queue.push(job); this._next();
      });
    }
    stop() { // cancela todo lo pendiente
      this.queue.forEach(j => { j.cancelled = true; j.resolve(null); }); this.queue = [];
      if (this.cur) { this.cur.cancelled = true; const c = this.cur; c.resolve(null); this.w && this.w.postMessage('stop'); }
    }
    newGame() { if (this.w && !this.failed) { this.w.postMessage('ucinewgame'); } }
  }

  /* ---------- Respaldo: alfa-beta sencillo (si el worker no carga) ---------- */
  const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  const PST_P = [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0];
  const PST_N = [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50];
  function evalBoard(g) {
    const b = g.board(); let s = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const p = b[r][c]; if (!p) continue;
      const idx = p.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
      let v = VAL[p.type] + (p.type === 'p' ? PST_P[idx] : p.type === 'n' || p.type === 'b' ? PST_N[idx] / 2 : 0);
      s += p.color === 'w' ? v : -v;
    }
    return s;
  }
  function search(g, d, a, b, color) {
    if (g.in_checkmate()) return -100000 - d;
    if (g.in_draw() || g.in_stalemate()) return 0;
    if (d === 0) return color * evalBoard(g);
    const ms = g.moves({ verbose: true }).sort((x, y) => (y.captured ? VAL[y.captured] : 0) - (x.captured ? VAL[x.captured] : 0));
    let best = -Infinity;
    for (const m of ms) { g.move(m); const v = -search(g, d - 1, -b, -a, -color); g.undo(); if (v > best) best = v; if (v > a) a = v; if (a >= b) break; }
    return best;
  }
  function fallbackAnalyze(job) {
    const g = new Chess(job.fen); const color = g.turn() === 'w' ? 1 : -1;
    const ms = g.moves({ verbose: true }); if (!ms.length) return { bestmove: '(none)', lines: [] };
    let best = null, bv = -Infinity; const depth = job.skill != null && job.skill < 5 ? 1 : 2;
    for (const m of ms) { g.move(m); let v = -search(g, depth, -Infinity, Infinity, -color); g.undo(); v += Math.random() * (job.skill != null ? (20 - job.skill) * 4 : 1); if (v > bv) { bv = v; best = m; } }
    const uci = best.from + best.to + (best.promotion || '');
    return { bestmove: uci, lines: [{ cp: color * Math.round(bv), mate: null, pv: [uci], depth }], depth, fallback: true };
  }
  window.Engine = Engine;

  /* ---------- Utilidades de evaluación ---------- */
  window.EvalUtil = {
    toCp(l) { if (!l) return 0; if (l.mate != null) return l.mate > 0 ? 10000 - l.mate * 10 : -10000 - l.mate * 10; return l.cp; },
    winPct(cp) { const c = Math.max(-1000, Math.min(1000, cp)); return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1); },
    fmt(l) { if (!l) return '0.0'; if (l.mate != null) return (l.mate > 0 ? '' : '-') + 'M' + Math.abs(l.mate); const v = l.cp / 100; return (v > 0 ? '+' : '') + v.toFixed(1); },
    moveAccuracy(wpBefore, wpAfter) { const d = Math.max(0, wpBefore - wpAfter); return Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * d) - 3.1669)); }
  };
})();
