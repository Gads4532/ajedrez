/* Análisis de tendencias: analiza en segundo plano las partidas sin revisión, importa partidas
   (PGN, chess.com, Lichess) y calcula estadísticas agregadas para la vista «Mi análisis». */
(function () {
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const S = () => App.S;
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const needs = (g) => !g.rev || !g.rev.v || g.rev.v < 2;

  /* ---------- Análisis de una partida (mismo cálculo que la revisión, a menor profundidad) ---------- */
  async function analyzeGame(gm, eng, { depth = 12, onStep, isCancelled } = {}) {
    const t = new Chess(gm.fen || START);
    const tmp = new Chess(); if (!tmp.load_pgn(gm.pgn, { sloppy: true })) return null;
    const fens = [t.fen()], moves = [], sans = [];
    for (const s of tmp.history()) { const m = t.move(s, { sloppy: true }); if (!m) break; fens.push(t.fen()); moves.push(m); sans.push(m.san); }
    if (moves.length < 6) { gm.rev = { v: 2, skip: true, me: gm.me || 'w', res: gm.res || null, plies: moves.length }; return gm.rev; }
    const evals = [], bests = [], second = [], pv = [];
    for (let i = 0; i < fens.length; i++) {
      if (isCancelled && isCancelled()) return null;
      const c = new Chess(fens[i]);
      if (c.in_checkmate()) { evals[i] = { cp: c.turn() === 'w' ? -10000 : 10000, mate: null }; bests[i] = null; pv[i] = []; continue; }
      if (c.game_over()) { evals[i] = { cp: 0, mate: null }; bests[i] = null; pv[i] = []; continue; }
      const r = await eng.analyze(fens[i], { depth, multipv: 2 });
      if (!r) return null;
      evals[i] = r.lines[0] || { cp: 0, mate: null }; second[i] = r.lines[1] || null;
      bests[i] = r.lines[0] && r.lines[0].pv[0] ? r.lines[0].pv[0] : r.bestmove; pv[i] = (r.lines[0] && r.lines[0].pv) || [];
      if (onStep) onStep(i + 1, fens.length);
    }
    const bk = !gm.fen && App.bookInfo ? App.bookInfo(sans) : { len: 0, name: null };
    const R = GameReport.build({ startFen: gm.fen || START, fens, moves, sans, evals, bests, second, pv, book: bk.len, opening: bk.name || gm.opening || null, me: gm.me || 'w', result: gm.res || null });
    gm.rev = R.summary; return gm.rev;
  }

  /* ---------- Importación ---------- */
  const tag = (pg, k) => (new RegExp('\\[' + k + ' "([^"]*)"\\]').exec(pg) || [])[1] || '';
  const splitPgn = (txt) => txt.replace(/\r/g, '').split(/\n\s*\n(?=\[Event )/).map(s => s.trim()).filter(s => /\d\./.test(s));
  const tcClass = (tc) => { const m = /^(\d+)(?:\+(\d+))?/.exec(tc || ''); if (!m) return null; const s = +m[1] + 40 * (+m[2] || 0); return s < 180 ? 'bala' : s < 600 ? 'blitz' : s < 1800 ? 'rápidas' : 'clásicas'; };
  // Convierte un PGN en partida guardada, desde el punto de vista del usuario «user».
  function fromPgn(pg, user, idx) {
    const w = tag(pg, 'White'), b = tag(pg, 'Black'), u = (user || '').toLowerCase();
    const me = u && w.toLowerCase() === u ? 'w' : u && b.toLowerCase() === u ? 'b' : null;
    if (!me) return null;
    const r = tag(pg, 'Result');
    const res = r === '1/2-1/2' ? 'draw' : r === '1-0' ? (me === 'w' ? 'win' : 'loss') : r === '0-1' ? (me === 'b' ? 'win' : 'loss') : null;
    const date = (tag(pg, 'UTCDate') || tag(pg, 'Date')).replace(/\./g, '-'), time = tag(pg, 'UTCTime') || tag(pg, 'StartTime') || '12:00:00';
    let d = Date.parse(`${date}T${time}Z`); if (isNaN(d)) d = Date.now() - 1e6 + idx;
    const clean = pg.replace(/\{[^}]*\}/g, ' ').replace(/\$\d+/g, ' ');
    const t = new Chess(); if (!t.load_pgn(clean, { sloppy: true })) return null;
    const fen = tag(pg, 'FEN') || null;
    return { pgn: t.pgn(), res, me, d: d + (idx % 1000), fen, src: 'import', site: tag(pg, 'Site').replace(/^https?:\/\//, '').split('/')[0].replace(/[<>&"']/g, '') || 'PGN', tc: tcClass(tag(pg, 'TimeControl')), opp: me === 'w' ? b : w, oppElo: +(me === 'w' ? tag(pg, 'BlackElo') : tag(pg, 'WhiteElo')) || null, myElo: +(me === 'w' ? tag(pg, 'WhiteElo') : tag(pg, 'BlackElo')) || null, opening: tag(pg, 'Opening').replace(/[<>&"']/g, '') || null };
  }
  function addGames(list) {
    const G = S().games, sig = new Set(G.map(g => g.d));
    let added = 0;
    for (const g of list) { if (!g || sig.has(g.d)) continue; G.push(g); sig.add(g.d); added++; }
    G.sort((a, b) => a.d - b.d); while (G.length > 200) G.shift();
    App.save(); return added;
  }
  function importPgnText(txt, user) { const games = splitPgn(txt).map((pg, i) => fromPgn(pg, user, i)).filter(Boolean); return { found: games.length, added: addGames(games) }; }
  async function importChessCom(user, max = 40) {
    const base = `https://api.chess.com/pub/player/${encodeURIComponent(user.toLowerCase())}/games/archives`;
    const a = await fetch(base); if (!a.ok) throw new Error(a.status === 404 ? 'Ese usuario no existe en chess.com' : 'chess.com no respondió (' + a.status + ')');
    const arch = (await a.json()).archives || []; const pgns = [];
    for (const url of arch.slice().reverse()) { if (pgns.length >= max) break; const r = await fetch(url); if (!r.ok) continue; const js = await r.json(); (js.games || []).slice().reverse().forEach(g => { if (g.pgn && g.rules === 'chess' && pgns.length < max) pgns.push(g.pgn); }); }
    return importPgnText(pgns.join('\n\n'), user);
  }
  async function importLichess(user, max = 40) {
    const r = await fetch(`https://lichess.org/api/games/user/${encodeURIComponent(user)}?max=${max}&clocks=false&evals=false&opening=true`, { headers: { Accept: 'application/x-chess-pgn' } });
    if (!r.ok) throw new Error(r.status === 404 ? 'Ese usuario no existe en Lichess' : 'Lichess no respondió (' + r.status + ')');
    return importPgnText(await r.text(), user);
  }

  /* ---------- Estadísticas agregadas ---------- */
  const PH = { o: 'la apertura', m: 'el medio juego', e: 'el final' };
  const PIECE = { p: 'peones', n: 'caballos', b: 'alfiles', r: 'torres', q: 'la dama', k: 'el rey' };
  const MOTIF = {
    hung: { t: 'Piezas sin defender', fix: 'Antes de mover, repasa qué piezas quedan atacadas y sin defensa.', href: '#lec-t2-sueltas', lbl: 'Piezas sin defender' },
    missWin: { t: 'Ganancias de material que no viste', fix: 'Busca siempre jaques, capturas y amenazas del rival y tuyas.', href: '#lec-t2-ccj', lbl: 'Jaques, capturas y amenazas' },
    missMate: { t: 'Mates que se escaparon', fix: 'Entrena los patrones de mate hasta reconocerlos al instante.', href: '#lec-t-mates1', lbl: 'Patrones de mate' },
    allowMate: { t: 'Mates permitidos', fix: 'Pregúntate en cada jugada: ¿qué jaques tiene mi rival?', href: '#lec-a-defensa', lbl: 'Cómo defenderse de un ataque' },
    miss: { t: 'Errores del rival sin aprovechar', fix: 'Cuando el rival se equivoca, para y calcula: suele haber premio.', href: '#lec-t2-calculo', lbl: 'Cómo calcular variantes' }
  };
  // Ejercicio (tema de puzles) que acompaña a cada lección recomendada.
  const EX = { '#lec-t2-sueltas': 'piezaColgada', '#lec-t2-ccj': 'ventajaMaterial', '#lec-t-mates1': 'mateIn2', '#lec-a-defensa': 'defensa', '#lec-t2-calculo': 'largo', '#principios': 'apertura', '#medio': 'medioJuego', '#finales': 'final', '#lec-m2-transformar': 'final', '#aperturas': 'apertura', '#lec-ap-enroque': 'enroque' };
  const BUCKETS = [[1, 10, '1-10'], [11, 20, '11-20'], [21, 30, '21-30'], [31, 40, '31-40'], [41, 999, '41+']];

  function stats() {
    const all = S().games.filter(g => g.rev && g.rev.v >= 2 && !g.rev.skip).sort((a, b) => a.d - b.d);
    const n = all.length;
    const accs = all.map(g => g.rev.acc).filter(x => x != null);
    const last = all.slice(-10), prev = all.slice(-20, -10);
    const meanAcc = (gs) => avg(gs.map(g => g.rev.acc).filter(x => x != null));
    const score = (gs) => gs.length ? gs.reduce((s, g) => s + (g.rev.res === 'win' || g.res === 'win' ? 1 : (g.rev.res || g.res) === 'draw' ? 0.5 : 0), 0) / gs.length * 100 : null;
    const resOf = (g) => g.rev.res || g.res;
    const perGame = (gs, f) => gs.length ? gs.reduce((s, g) => s + f(g), 0) / gs.length : null;
    const blunders = (g) => (g.rev.cnt.blunder || 0) + (g.rev.cnt.mistake || 0) * 0.5;
    const phase = {}; for (const k of ['o', 'm', 'e']) { phase[k] = { all: avg(all.map(g => g.rev.ph[k]).filter(x => x != null)), last: avg(last.map(g => g.rev.ph[k]).filter(x => x != null)), prev: avg(prev.map(g => g.rev.ph[k]).filter(x => x != null)) }; }
    const color = {}; for (const c of ['w', 'b']) { const gs = all.filter(g => g.rev.me === c); color[c] = { n: gs.length, acc: meanAcc(gs), score: score(gs) }; }
    const ops = {}; all.forEach(g => { const k = (g.rev.opening || g.opening || 'Sin identificar').split(':')[0]; (ops[k] = ops[k] || []).push(g); });
    const openings = Object.entries(ops).map(([name, gs]) => ({ name, n: gs.length, score: score(gs), acc: meanAcc(gs), bl: perGame(gs, blunders), w: gs.filter(g => g.rev.me === 'w').length })).sort((a, b) => b.n - a.n);
    const motifs = {}; for (const k in MOTIF) motifs[k] = { all: perGame(all, g => g.rev.motifs[k] || 0), last: perGame(last, g => g.rev.motifs[k] || 0), prev: perGame(prev, g => g.rev.motifs[k] || 0), total: all.reduce((s, g) => s + (g.rev.motifs[k] || 0), 0) };
    const errs = all.flatMap(g => g.rev.errs.map(e => Object.assign({ d: g.d }, e)));
    const serious = errs.filter(e => ['blunder', 'mistake', 'miss'].includes(e.c));
    const byMove = BUCKETS.map(([a, b, l]) => ({ l, n: serious.filter(e => e.m >= a && e.m <= b).length }));
    const byPhase = { o: serious.filter(e => e.ph === 'o').length, m: serious.filter(e => e.ph === 'm').length, e: serious.filter(e => e.ph === 'e').length };
    const pieces = {}; errs.filter(e => e.t.includes('hung')).forEach(e => { pieces[e.p] = (pieces[e.p] || 0) + 1; });
    const winning = all.filter(g => g.rev.peak >= 85), converted = winning.filter(g => resOf(g) === 'win');
    const losing = all.filter(g => g.rev.low <= 15), saved = losing.filter(g => resOf(g) && resOf(g) !== 'loss');
    const tcs = {}; all.forEach(g => { if (g.tc) (tcs[g.tc] = tcs[g.tc] || []).push(g); });
    const byTc = Object.entries(tcs).map(([k, gs]) => ({ k, n: gs.length, acc: meanAcc(gs), score: score(gs) }));
    const castleLate = perGame(all.filter(g => g.rev.plies >= 30), g => (g.rev.castle == null || g.rev.castle > 10) ? 1 : 0);
    const week = 7 * 864e5, now = Date.now();
    const thisW = all.filter(g => g.d > now - week), lastW = all.filter(g => g.d <= now - week && g.d > now - 2 * week);
    const best = all.slice().sort((a, b) => (b.rev.acc || 0) - (a.rev.acc || 0))[0];
    return { n, all, accs, meanLast: meanAcc(last), meanPrev: meanAcc(prev), eloLast: avg(last.map(g => g.rev.elo).filter(Boolean)), score: score(all), scoreLast: score(last), blLast: perGame(last, blunders), blPrev: perGame(prev, blunders), phase, color, openings, motifs, byMove, byPhase, serious: serious.length, pieces, winning: winning.length, converted: converted.length, losing: losing.length, saved: saved.length, byTc, castleLate, week: { n: thisW.length, acc: meanAcc(thisW), prevN: lastW.length, prevAcc: meanAcc(lastW), score: score(thisW) }, best };
  }

  // Diagnóstico: conclusiones ordenadas por importancia, con la acción recomendada.
  function diagnose(st) {
    const out = [], add = (w, t, href, lbl) => out.push({ w, t, href, lbl, ex: EX[href] || null });
    if (st.n < 3) return out;
    const ph = st.phase, ks = ['o', 'm', 'e'].filter(k => ph[k].all != null);
    if (ks.length >= 2) {
      const worst = ks.reduce((a, b) => (ph[a].all < ph[b].all ? a : b)), bestP = ks.reduce((a, b) => (ph[a].all > ph[b].all ? a : b));
      if (ph[bestP].all - ph[worst].all >= 6) add(ph[bestP].all - ph[worst].all, `Tu fase más débil es <b>${PH[worst]}</b>: ${ph[worst].all.toFixed(0)}% de precisión frente a ${ph[bestP].all.toFixed(0)}% en ${PH[bestP]}.`, { o: '#principios', m: '#medio', e: '#finales' }[worst], { o: 'Principios de apertura', m: 'Medio juego', e: 'Finales' }[worst]);
    }
    if (st.serious >= 4) {
      const top = st.byMove.slice().sort((a, b) => b.n - a.n)[0], pct = top.n / st.serious * 100;
      if (pct >= 35) add(pct / 3, `El <b>${pct.toFixed(0)}%</b> de tus errores serios llega entre las jugadas <b>${top.l}</b>.${top.l === '1-10' ? ' Repasa los principios de apertura.' : top.l === '21-30' || top.l === '11-20' ? ' Es el momento de más tensión: tómate más tiempo en esas jugadas.' : ' Cuida la técnica y el cansancio en la parte final.'}`, top.l === '1-10' ? '#principios' : top.l === '41+' || top.l === '31-40' ? '#finales' : '#lec-t2-calculo', top.l === '1-10' ? 'Principios de apertura' : top.l === '41+' || top.l === '31-40' ? 'Finales' : 'Cómo calcular variantes');
    }
    const ms = Object.entries(st.motifs).filter(([, v]) => v.all >= 0.3).sort((a, b) => b[1].all - a[1].all);
    ms.slice(0, 2).forEach(([k, v]) => add(v.all * 20, `<b>${MOTIF[k].t}</b>: ${v.all.toFixed(1)} por partida. ${MOTIF[k].fix}`, MOTIF[k].href, MOTIF[k].lbl));
    const pc = Object.entries(st.pieces).sort((a, b) => b[1] - a[1])[0];
    if (pc && pc[1] >= 3) add(pc[1] * 2, `La pieza que más pierdes son <b>${PIECE[pc[0]]}</b> (${pc[1]} veces sin defensa).`, '#lec-t2-sueltas', 'Piezas sin defender');
    if (st.winning >= 3) { const r = st.converted / st.winning * 100; if (r < 70) add((70 - r) / 3, `Conviertes solo el <b>${r.toFixed(0)}%</b> de tus posiciones ganadoras (${st.converted} de ${st.winning}).`, '#lec-m2-transformar', 'Transformar ventajas'); }
    const c = st.color; if (c.w.n >= 3 && c.b.n >= 3 && Math.abs(c.w.acc - c.b.acc) >= 5) { const wk = c.w.acc < c.b.acc ? 'blancas' : 'negras'; add(Math.abs(c.w.acc - c.b.acc), `Juegas peor con <b>${wk}</b>: ${Math.min(c.w.acc, c.b.acc).toFixed(0)}% frente a ${Math.max(c.w.acc, c.b.acc).toFixed(0)}%. Revisa tu repertorio con ese color.`, '#aperturas', 'Aperturas'); }
    const badOp = st.openings.filter(o => o.n >= 3 && o.name !== 'Sin identificar').sort((a, b) => a.score - b.score)[0];
    if (badOp && badOp.score < 40) add((40 - badOp.score) / 4, `Tu apertura más problemática es <b>${badOp.name}</b>: ${badOp.score.toFixed(0)}% de los puntos en ${badOp.n} partidas.`, '#aperturas', 'Aperturas');
    if (st.castleLate != null && st.castleLate >= 0.4) add(st.castleLate * 10, `En el <b>${(st.castleLate * 100).toFixed(0)}%</b> de tus partidas enrocas tarde o no enrocas.`, '#lec-ap-enroque', 'Seguridad del rey y el enroque');
    if (st.meanPrev != null && st.meanLast != null) { const d = st.meanLast - st.meanPrev; if (d >= 2) add(1, `Vas a mejor: tu precisión subió <b>${d.toFixed(1)}</b> puntos en las últimas 10 partidas.`, null, null); else if (d <= -2) add(4, `Tu precisión bajó <b>${(-d).toFixed(1)}</b> puntos en las últimas 10 partidas: juega más lento y descansa entre partidas.`, '#metodos', 'Metodologías'); }
    return out.sort((a, b) => b.w - a.w);
  }

  window.Insights = { analyzeGame, pending: () => S().games.filter(needs).sort((a, b) => b.d - a.d), stats, diagnose, importPgnText, importChessCom, importLichess, MOTIF, PIECE, PH };
})();
