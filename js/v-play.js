/* Jugar contra Stockfish y tablero de análisis con revisión de partida. */
(function () {
  const { $, $$, h, esc, fmtTime, save, bump, san, toast, VIEWS, boardBox, setEval, playerBar, playSound, moveList, uciToMove, IC, pIc } = App;
  const S = () => App.S;
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const LV = [
    { elo: 400, skill: 0, depth: 1, mt: 60 }, { elo: 650, skill: 1, depth: 2, mt: 100 }, { elo: 850, skill: 3, depth: 3, mt: 150 }, { elo: 1050, skill: 5, depth: 4, mt: 200 },
    { elo: 1250, skill: 7, depth: 6, mt: 300 }, { elo: 1500, skill: 9, depth: 8, mt: 400 }, { elo: 1750, skill: 12, depth: 10, mt: 600 }, { elo: 2000, skill: 15, depth: 12, mt: 800 },
    { elo: 2400, skill: 18, depth: 16, mt: 1200 }, { elo: 3000, skill: 20, depth: 22, mt: 2000 }
  ];
  const engineLabel = () => { const e = App.getEngine(); return e.ready ? e.name : e.failed ? 'Motor JS básico' : 'Cargando motor…'; };

  /* ---------- Libro: detectar apertura ---------- */
  const BOOK = []; (window.OPENINGS || []).forEach(o => { BOOK.push({ name: o.name, moves: o.moves }); (o.variations || []).forEach(v => BOOK.push({ name: o.name + ': ' + v.name, moves: v.moves })); });
  const normSan = (s) => s.replace(/[+#?!]/g, '');
  function bookInfo(sans) {
    let best = null, len = 0;
    for (const b of BOOK) { let k = 0; while (k < sans.length && k < b.moves.length && normSan(sans[k]) === normSan(b.moves[k])) k++; if (k > len && k === Math.min(b.moves.length, k)) { len = k; best = b; } }
    return { name: best ? best.name : null, len };
  }
  App.bookInfo = bookInfo;

  /* ======================= JUGAR ======================= */
  VIEWS.jugar = (v) => {
    const eng = App.getEngine();
    const cfg = Object.assign({ lvl: 4, color: 'w', time: 0, inc: 0 }, S().playCfg || {});
    const bb = boardBox({ players: true });
    const board = bb.board;
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head">${pIc('wp')}<span>Jugar</span><span class="tag" style="margin-left:auto" id="engn"></span></div><div class="sp-body" id="pb"></div><div class="sp-foot" id="pf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const engTag = () => { const t = $('#engn', v); if (t) t.textContent = engineLabel(); };
    engTag(); window.addEventListener('engine-ready', engTag);
    let g = null, me = 'w', over = false, clocks = null, tick = null, thinking = false, practice = null, startFen = START;
    board.setPosition(START, false); board.opts.interactive = false;
    playerBar(bb.top, 'Stockfish', '', 'bk'); playerBar(bb.bot, 'Tú', '', 'wk');

    const setup = () => {
      $('#pb', v).innerHTML = `
        <div><div class="sec-t" style="margin-bottom:8px">Nivel del motor</div>
          <input type="range" id="lvl" min="1" max="10" value="${cfg.lvl}" style="width:100%;accent-color:#3692e7">
          <div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:20px" id="lvlT"></b><span class="dim" id="lvlE"></span></div></div>
        <div><div class="sec-t" style="margin-bottom:8px">Juegas con</div><div class="chips" id="col"><button class="chip" data-v="w">Blancas</button><button class="chip" data-v="r">Aleatorio</button><button class="chip" data-v="b">Negras</button></div></div>
        <div><div class="sec-t" style="margin-bottom:8px">Ritmo</div><div class="chips" id="tc">${[[0, 0, 'Sin reloj'], [3, 2, '3+2'], [5, 0, '5 min'], [10, 0, '10 min'], [15, 10, '15+10'], [30, 0, '30 min']].map(([m, i, t]) => `<button class="chip" data-m="${m}" data-i="${i}">${t}</button>`).join('')}</div></div>
        <div><div class="sec-t" style="margin-bottom:8px">Posición inicial (FEN opcional)</div><input type="text" id="fen" placeholder="Vacío = posición inicial" style="width:100%"></div>
        <p class="dim" style="font-size:13px;margin:0">Las partidas lentas contra un rival algo más fuerte son la mejor forma de practicar lo aprendido. Al terminar, revisa la partida con el motor y anota tus errores en el diario.</p>`;
      $('#pf', v).innerHTML = '<button class="btn pri big" id="go">Jugar</button>';
      const paintL = () => { const l = LV[cfg.lvl - 1]; $('#lvlT', v).textContent = 'Nivel ' + cfg.lvl; $('#lvlE', v).textContent = cfg.lvl === 10 ? 'Fuerza máxima' : '≈ ' + l.elo + ' Elo'; };
      $('#lvl', v).oninput = (e) => { cfg.lvl = +e.target.value; paintL(); }; paintL();
      const paintC = () => { $$('#col .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === cfg.color)); $$('#tc .chip', v).forEach(c => c.classList.toggle('on', +c.dataset.m === cfg.time && +c.dataset.i === cfg.inc)); };
      $$('#col .chip', v).forEach(c => c.onclick = () => { cfg.color = c.dataset.v; paintC(); });
      $$('#tc .chip', v).forEach(c => c.onclick = () => { cfg.time = +c.dataset.m; cfg.inc = +c.dataset.i; paintC(); }); paintC();
      $('#go', v).onclick = () => {
        S().playCfg = cfg; save();
        const f = $('#fen', v).value.trim(); if (f) { const t = new Chess(); if (!t.load(f)) { toast('FEN no válido'); return; } }
        start(f || START, cfg.color === 'r' ? (Math.random() < .5 ? 'w' : 'b') : cfg.color);
      };
    };

    const start = (fen, color, prac) => {
      practice = prac || null; startFen = fen;
      g = new Chess(fen); me = color; over = false; eng.newGame();
      board.game = g; board.opts.movable = me; board.opts.interactive = true;
      board.setOrientation(me === 'w' ? 'white' : 'black'); board.setArrows([]); board.badge(null); board.sync(false);
      const L = LV[cfg.lvl - 1];
      playerBar(bb.top, practice ? 'Stockfish' : 'Stockfish', practice ? '(defensa máxima)' : `nivel ${cfg.lvl}${cfg.lvl < 10 ? ' · ≈' + L.elo : ''}`, me === 'w' ? 'bk' : 'wk');
      playerBar(bb.bot, 'Tú', '', me === 'w' ? 'wk' : 'bk');
      clocks = cfg.time && !practice ? { w: cfg.time * 60, b: cfg.time * 60 } : null;
      if (clocks) { $('.clock', bb.top).hidden = false; $('.clock', bb.bot).hidden = false; paintClocks(); clearInterval(tick); let last = Date.now(); tick = setInterval(() => { if (over) return; const now = Date.now(); clocks[g.turn()] -= (now - last) / 1000; last = now; paintClocks(); if (clocks[g.turn()] <= 0) finish(g.turn() === me ? 'loss' : 'win', 'por tiempo'); }, 200); }
      $('#pb', v).innerHTML = `${practice ? `<div class="fb info"><span class="dot">🎯</span><div>Objetivo: ${esc(practice.goal)}<small>${esc(practice.text || '')}</small></div></div>` : ''}<div id="op" class="dim" style="font-size:13px;font-weight:700"></div><div id="ml"></div><div id="pmsg"></div>`;
      $('#pf', v).innerHTML = '<button class="btn sm" id="undo" title="Deshacer">↶ Deshacer</button><button class="btn sm" id="hint">💡 Pista</button><button class="btn sm" id="flip" title="Girar">⇅</button><button class="btn sm" id="draw">½ Tablas</button><button class="btn sm" id="resign">🏳 Abandonar</button>';
      $('#undo', v).onclick = () => { if (thinking || over) return; g.undo(); if (g.turn() !== me) g.undo(); board.sync(); board.setArrows([]); refresh(); };
      $('#hint', v).onclick = async () => { if (over || g.turn() !== me) return; const r = await eng.analyze(g.fen(), { depth: 16 }); if (r && r.bestmove) board.setArrows([[r.bestmove.slice(0, 2), r.bestmove.slice(2, 4), 'g']]); };
      $('#flip', v).onclick = () => board.flip();
      $('#resign', v).onclick = () => { if (!over) finish('loss', 'por abandono'); };
      $('#draw', v).onclick = async () => { if (over) return; const r = await eng.analyze(g.fen(), { depth: 12 }); const cp = r && r.lines[0] ? EvalUtil.toCp(r.lines[0]) * (me === 'w' ? 1 : -1) : 0; if (g.history().length > 30 && cp > -40) finish('draw', 'por acuerdo'); else toast('Stockfish rechaza las tablas'); };
      refresh();
      if (g.turn() !== me) engineMove();
    };
    const paintClocks = () => { if (!clocks) return; const top = me === 'w' ? 'b' : 'w'; const ct = $('.clock', bb.top), cb = $('.clock', bb.bot); ct.textContent = fmtTime(clocks[top]); cb.textContent = fmtTime(clocks[me]); ct.classList.toggle('on', g.turn() === top && !over); cb.classList.toggle('on', g.turn() === me && !over); cb.classList.toggle('low', clocks[me] < 20); };
    const refresh = () => {
      const sans = g.history(); const st = new Chess(startFen);
      moveList($('#ml', v), sans, sans.length - 1, () => { }, null, st.turn(), +startFen.split(' ')[5] || 1);
      if (startFen === START) { const b = bookInfo(sans); $('#op', v).textContent = b.name ? 'Apertura: ' + b.name : ''; }
      paintClocks();
    };
    const checkEnd = () => {
      if (g.in_checkmate()) { finish(g.turn() === me ? 'loss' : 'win', 'por jaque mate'); return true; }
      if (g.in_stalemate()) { finish('draw', 'por ahogado'); return true; }
      if (g.in_threefold_repetition()) { finish('draw', 'por triple repetición'); return true; }
      if (g.insufficient_material()) { finish('draw', 'por material insuficiente'); return true; }
      if (g.in_draw()) { finish('draw', 'por la regla de 50 jugadas'); return true; }
      return false;
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      if (over || g.turn() !== me || thinking) return false;
      const r = g.move({ from, to, promotion: promotion || 'q' }); if (!r) return false;
      if (clocks) clocks[me] += cfg.inc;
      playSound(r); board.sync(); board.setArrows([]); refresh();
      if (!checkEnd()) engineMove();
      return true;
    };
    const engineMove = async () => {
      thinking = true; const L = practice ? { skill: 20, depth: 18, mt: 1200 } : LV[cfg.lvl - 1];
      const t0 = Date.now();
      const r = await eng.analyze(g.fen(), { skill: L.skill, depth: L.depth, movetime: L.mt });
      if (!r || over || !App.isView('jugar')) { thinking = false; return; }
      const wait = Math.max(0, 350 - (Date.now() - t0)); await new Promise(res => setTimeout(res, wait));
      if (over) { thinking = false; return; }
      const m = g.move(uciToMove(r.bestmove)); thinking = false;
      if (!m) return;
      if (clocks) clocks[m.color] += cfg.inc;
      playSound(m); board.sync(); refresh(); checkEnd();
    };
    const finish = (res, why) => {
      if (over) return; over = true; clearInterval(tick); board.opts.interactive = false; paintClocks(); Sound.end();
      const pgn = g.pgn(); S().games.push({ pgn, res, why, lvl: practice ? 0 : cfg.lvl, d: Date.now(), fen: startFen !== START ? startFen : null }); if (S().games.length > 200) S().games.shift(); save(); bump(); App.track('game', { res });
      let title = res === 'win' ? '¡Has ganado!' : res === 'loss' ? 'Has perdido' : 'Tablas', icon = res === 'win' ? '🏆' : res === 'loss' ? '✕' : '½';
      let sub = why;
      if (practice) { const goal = practice.goal; const okGoal = (goal === 'tablas' && res !== 'loss') || ((goal === 'ganar' || goal === 'mate') && res === 'win'); title = okGoal ? 'Objetivo cumplido' : 'Objetivo no cumplido'; icon = okGoal ? '★' : '✕'; sub = `${why}. ${okGoal ? 'Has demostrado la técnica.' : 'Repasa la lección y vuelve a intentarlo.'}`; }
      $('#pmsg', v).innerHTML = `<div class="fb ${res === 'win' || icon === '★' ? 'win' : res === 'loss' ? 'bad' : 'info'}"><span class="dot">${icon}</span><div>${title}<small>${esc(sub)}</small></div></div>`;
      $('#pf', v).innerHTML = `<button class="btn pri" id="rev">Revisar partida</button><button class="btn" id="again">${practice ? 'Reintentar' : 'Nueva partida'}</button>${practice && practice.back ? `<a class="btn ghost" href="${practice.back}">Volver a la lección</a>` : ''}`;
      $('#rev', v).onclick = () => { App.reviewGame = { pgn, fen: startFen, me }; location.hash = '#analisis'; };
      $('#again', v).onclick = () => practice ? start(practice.fen, practice.side, practice) : setup();
    };
    const pg = App.pendingGame; App.pendingGame = null;
    if (pg) start(pg.fen, pg.side || new Chess(pg.fen).turn(), pg); else setup();
    return () => { clearInterval(tick); over = true; window.removeEventListener('engine-ready', engTag); };
  };

  /* ======================= ANÁLISIS ======================= */
  const CLS = { brilliant: 'Brillante', great: 'Gran jugada', best: 'Mejor', excellent: 'Excelente', good: 'Buena', book: 'Teoría', inaccuracy: 'Imprecisión', mistake: 'Error', blunder: 'Error grave' };
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

  VIEWS.analisis = (v) => {
    const eng = App.getEngine();
    const bb = boardBox({ evalbar: true });
    const board = bb.board;
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head">${IC.search}<span>Análisis</span><label class="ck" style="margin-left:auto;font-size:13px"><input type="checkbox" id="eon" checked> Motor</label></div>
      <div class="sp-tabs" id="at"><button data-t="an" class="on">Análisis</button><button data-t="rev">Revisión</button><button data-t="imp">Cargar</button></div>
      <div class="sp-body" id="ab"></div><div class="sp-foot" id="af"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    let startFen = START, sans = [], fens = [START], moves = [], cur = 0, review = null, engineOn = true, tab = 'an', headers = {};
    const g = new Chess();
    board.game = g; board.opts.movable = 'both'; board.opts.interactive = true;

    const load = (fen, mvList) => {
      startFen = fen; const t = new Chess(fen); fens = [t.fen()]; sans = []; moves = [];
      for (const m of mvList || []) { const r = t.move(m, { sloppy: true }); if (!r) break; fens.push(t.fen()); sans.push(r.san); moves.push(r); }
      review = null; go(fens.length - 1);
    };
    const go = (k) => {
      cur = Math.max(0, Math.min(fens.length - 1, k)); g.load(fens[cur]);
      board.setPosition(fens[cur], true); board.setLastMove(cur ? [moves[cur - 1].from, moves[cur - 1].to] : null);
      board.setCheck(g.in_check() ? findKing(g, g.turn()) : null); board.setArrows([]);
      board.badge(review && cur && review.cls[cur - 1] ? moves[cur - 1].to : null, review && cur ? review.cls[cur - 1] : null);
      paint();
      if (review && review.evals[cur]) setEval(bb.evalbar, review.evals[cur], board.opts.orientation);
      analyzeLive();
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      const r = g.move({ from, to, promotion: promotion || 'q' }); if (!r) return false;
      // si coincide con la siguiente jugada, solo avanzar; si no, crear nueva línea
      if (cur < sans.length && sans[cur] === r.san) { go(cur + 1); playSound(r); return true; }
      fens = fens.slice(0, cur + 1); sans = sans.slice(0, cur); moves = moves.slice(0, cur); review = null;
      fens.push(g.fen()); sans.push(r.san); moves.push(r); playSound(r); go(cur + 1); return true;
    };
    let liveId = 0;
    const analyzeLive = async () => {
      const id = ++liveId; eng.stop();
      const box = $('#lines', v);
      if (!engineOn) { if (box) box.innerHTML = '<span class="dim">Motor desactivado</span>'; return; }
      if (g.game_over()) { if (box) box.innerHTML = `<span class="dim">${g.in_checkmate() ? 'Jaque mate' : 'Tablas'}</span>`; setEval(bb.evalbar, g.in_checkmate() ? { mate: g.turn() === 'w' ? -0.001 : 0.001, cp: null } : { cp: 0, mate: null }, board.opts.orientation); return; }
      const fen = fens[cur];
      await eng.analyze(fen, {
        depth: 20, multipv: 3, onInfo: (lines, d) => {
          if (id !== liveId) return;
          setEval(bb.evalbar, lines[0], board.opts.orientation);
          const b = $('#lines', v); if (!b) return;
          b.innerHTML = `<div class="dim" style="font-size:12px;font-weight:700">${esc(engineLabel())} · profundidad ${d}</div>` + lines.filter(Boolean).map(l => { const t = new Chess(fen); const ss = []; for (const u of l.pv.slice(0, 10)) { const m = t.move(uciToMove(u)); if (!m) break; ss.push(san(m.san)); } const pos = EvalUtil.toCp(l) >= 0; return `<div><b class="${pos ? 'pw' : 'pb'}">${EvalUtil.fmt(l)}</b><span>${esc(ss.join(' '))}</span></div>`; }).join('');
          if (lines[0] && lines[0].pv[0]) board.setArrows([[lines[0].pv[0].slice(0, 2), lines[0].pv[0].slice(2, 4), 'b']]);
        }
      });
    };
    const paint = () => {
      if (tab === 'an') {
        if (!$('#ml', v)) {
          $('#ab', v).innerHTML = `<div class="lines" id="lines"></div><div id="opn" class="dim" style="font-size:13px;font-weight:700"></div><div id="cmt"></div><div id="ml"></div>`;
        }
        const b = startFen === START ? bookInfo(sans.slice(0, cur)) : { name: null };
        $('#opn', v).textContent = (headers && headers.White ? `${headers.White}${headers.WhiteElo ? ' (' + headers.WhiteElo + ')' : ''} – ${headers.Black}${headers.BlackElo ? ' (' + headers.BlackElo + ')' : ''} · ${headers.Result || ''}  ` : '') + (b.name ? '📖 ' + b.name : '');
        $('#cmt', v).innerHTML = review && cur ? reviewComment(cur - 1) : '';
        moveList($('#ml', v), sans, cur - 1, (k) => go(k + 1), review ? review.cls : null, new Chess(startFen).turn(), +startFen.split(' ')[5] || 1);
      }
    };
    const reviewComment = (i) => {
      const c = review.cls[i]; if (!c) return '';
      const best = review.best[i]; const B = BADGES[c];
      const txt = { brilliant: 'es una jugada brillante: un sacrificio correcto.', great: 'es una gran jugada: la única buena en la posición.', best: 'es la mejor jugada.', excellent: 'es una jugada excelente.', good: 'es una buena jugada.', book: 'es una jugada de teoría.', inaccuracy: 'es una imprecisión.', mistake: 'es un error.', blunder: 'es un error grave.' }[c];
      return `<div class="fb info" style="animation:none"><span class="dot" style="background:${B.c}">${B.t}</span><div>${esc(san(sans[i]))} ${txt}${best && ['inaccuracy', 'mistake', 'blunder'].includes(c) ? `<small>La mejor era ${esc(san(best))}</small>` : ''}</div></div>`;
    };
    const runReview = async () => {
      if (!sans.length) { toast('Carga o juega una partida primero'); return; }
      tab = 'rev'; paintTabs();
      const n = fens.length; const evals = [], bests = [], second = [];
      $('#ab', v).innerHTML = `<div class="fb info"><span class="dot">⏳</span><div>Analizando con ${esc(engineLabel())}<small id="rp">0 / ${n}</small></div></div><div class="meter"><div id="rm" style="width:0"></div></div>`;
      liveId++; eng.stop();
      for (let i = 0; i < n; i++) {
        const t = new Chess(fens[i]);
        if (t.in_checkmate()) { evals[i] = { mate: t.turn() === 'w' ? -0 - 0.001 : 0.001, cp: null }; evals[i] = { cp: t.turn() === 'w' ? -10000 : 10000, mate: null }; bests[i] = null; continue; }
        if (t.game_over()) { evals[i] = { cp: 0, mate: null }; bests[i] = null; continue; }
        const r = await eng.analyze(fens[i], { depth: 14, multipv: 2 });
        if (!r) { toast('Revisión interrumpida'); return; }
        evals[i] = r.lines[0] || { cp: 0, mate: null }; second[i] = r.lines[1] || null;
        bests[i] = r.lines[0] && r.lines[0].pv[0] ? r.lines[0].pv[0] : r.bestmove;
        const rp = $('#rp', v); if (!rp) return; rp.textContent = `${i + 1} / ${n}`; $('#rm', v).style.width = ((i + 1) / n * 100) + '%';
      }
      const cls = [], acc = { w: [], b: [] }, bestSan = [];
      const book = startFen === START ? bookInfo(sans).len : 0;
      for (let i = 0; i < sans.length; i++) {
        const mover = new Chess(fens[i]).turn(), sg = mover === 'w' ? 1 : -1;
        const wpB = EvalUtil.winPct(sg * EvalUtil.toCp(evals[i])), wpA = EvalUtil.winPct(sg * EvalUtil.toCp(evals[i + 1]));
        const loss = Math.max(0, wpB - wpA); acc[mover].push(EvalUtil.moveAccuracy(wpB, wpA));
        const m = moves[i]; const uci = m.from + m.to + (m.promotion || '');
        const bm = bests[i]; let bs = null; if (bm) { const t = new Chess(fens[i]); const mm = t.move(uciToMove(bm)); bs = mm ? mm.san : null; } bestSan.push(bs);
        let c;
        if (i < book) c = 'book';
        else if (uci === bm || loss < 0.6) {
          c = 'best';
          // ¿sacrificio? la pieza queda atacada y vale más que lo capturado
          const t = new Chess(fens[i + 1]); const attacked = t.moves({ verbose: true }).some(x => x.to === m.to);
          const sac = attacked && VAL[m.piece] - (m.captured ? VAL[m.captured] : 0) >= 2 && m.piece !== 'p';
          const gap = second[i] ? wpB - EvalUtil.winPct(sg * EvalUtil.toCp(second[i])) : 0;
          if (sac && wpA >= 45 && wpB < 97) c = 'brilliant'; else if (gap >= 18 && wpB < 95) c = 'great';
        }
        else if (loss < 2) c = 'excellent'; else if (loss < 5) c = 'good'; else if (loss < 10) c = 'inaccuracy'; else if (loss < 20) c = 'mistake'; else c = 'blunder';
        cls.push(c);
      }
      const avg = (a) => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
      review = { evals, cls, best: bestSan, acc: { w: avg(acc.w), b: avg(acc.b) } };
      showReview(); Sound.good();
    };
    const showReview = () => {
      const R = review; const cnt = (c, col) => R.cls.filter((x, i) => x === c && (new Chess(fens[i]).turn() === col)).length;
      const W = 400, H = 90, n = R.evals.length;
      const pts = R.evals.map((e, i) => [n === 1 ? 0 : i / (n - 1) * W, H - EvalUtil.winPct(EvalUtil.toCp(e)) / 100 * H]);
      const area = `M0,${H} ` + pts.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ` L${W},${H} Z`;
      const dots = R.cls.map((c, i) => ['blunder', 'mistake', 'brilliant', 'great'].includes(c) ? `<circle cx="${pts[i + 1][0]}" cy="${pts[i + 1][1]}" r="3.5" fill="${BADGES[c].c}"/>` : '').join('');
      $('#ab', v).innerHTML = `
        <div class="acc-big"><div><div class="dim" style="font-size:12px;font-weight:800">PRECISIÓN BLANCAS</div><div class="v vw">${R.acc.w.toFixed(1)}</div></div><div><div class="dim" style="font-size:12px;font-weight:800">PRECISIÓN NEGRAS</div><div class="v vb">${R.acc.b.toFixed(1)}</div></div></div>
        <svg class="chart" viewBox="0 0 ${W} ${H}" style="background:#403d39;border-radius:4px;cursor:pointer" id="eg"><path d="${area}" fill="#fff"/><line x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}" stroke="#8b8987" stroke-dasharray="3 3"/>${dots}</svg>
        <div class="acc-grid">${Object.keys(CLS).map(c => `<div class="lbl"><span class="bd" style="background:${BADGES[c].c}">${BADGES[c].t}</span>${CLS[c]}</div><b style="text-align:center;min-width:28px">${cnt(c, 'w')}</b><b style="text-align:center;min-width:28px">${cnt(c, 'b')}</b>`).join('')}</div>
        <button class="btn pri" id="toAn">Ver jugada a jugada</button>
        <p class="dim" style="font-size:12.5px;margin:0">Clasificación según la pérdida de probabilidad de ganar de cada jugada (Stockfish, profundidad 14). La precisión usa la fórmula pública de Lichess. Anota tus errores graves en el diario de errores (Progreso).</p>`;
      $('#eg', v).onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); const k = Math.round((e.clientX - r.left) / r.width * (n - 1)); tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); go(k); };
      $('#toAn', v).onclick = () => { tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); go(1); };
    };
    const showImport = () => {
      $('#ab', v).innerHTML = `<div class="sec-t">Importar partidas (chess.com, Lichess, ChessBase…)</div>
        <p class="dim" style="font-size:13px;margin:0">En chess.com: abre una partida → <b>Compartir</b> → <b>PGN</b> → copiar, o descarga tu archivo de partidas (.pgn). Pega el texto aquí o elige el archivo; si contiene varias partidas verás la lista.</p>
        <textarea id="imp" placeholder="[Event &quot;Live Chess&quot;] … 1. e4 e5 2. Nf3 Nc6 …  o una posición FEN"></textarea>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn pri sm" id="ld">Cargar</button><label class="btn sm" style="cursor:pointer">📂 Archivo .pgn<input type="file" id="pgnf" accept=".pgn,.txt" hidden></label><button class="btn sm" id="nw">Tablero inicial</button></div>
        <div id="multi" style="display:grid;gap:6px"></div>
        <div class="sec-t" style="margin-top:6px">Exportar (para chess.com u otra web)</div>
        <p class="dim" style="font-size:13px;margin:0">Copia el PGN o el FEN y pégalo en chess.com → <b>Analizar</b> → <b>Cargar PGN/FEN</b>.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="cp">Copiar PGN</button><button class="btn sm" id="cf">Copiar FEN</button></div>
        ${S().games.length ? `<div class="sec-t" style="margin-top:8px">Tus partidas contra el motor</div>${S().games.slice().reverse().slice(0, 15).map((gm, i) => `<div class="list-row" data-g="${S().games.length - 1 - i}"><div class="grow"><h3>${gm.res === 'win' ? '✓ Victoria' : gm.res === 'loss' ? '✕ Derrota' : '½ Tablas'} · nivel ${gm.lvl}</h3><p>${new Date(gm.d).toLocaleString('es')} · ${esc(gm.why || '')}</p></div></div>`).join('')}` : ''}`;
      const openOne = (pg) => {
        const t = new Chess(); const clean = pg.replace(/\{[^}]*\}/g, ' ').replace(/\$\d+/g, ' ');
        if (!t.load_pgn(clean, { sloppy: true })) return false;
        const hist = t.history(); const hdr = t.header(); const f = hdr.FEN || START; headers = hdr; load(f, hist);
        tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); toast(`${hist.length} jugadas cargadas`); return true;
      };
      const parseMany = (txt) => txt.replace(/\r/g, '').split(/\n\s*\n(?=\[Event )/).map(s => s.trim()).filter(Boolean);
      const handle = (txt) => {
        txt = txt.trim(); if (!txt) return;
        const t = new Chess();
        if (!txt.includes('[') && !/\d\./.test(txt) && t.load(txt)) { headers = {}; load(t.fen(), []); tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); return; }
        const games = parseMany(txt);
        if (games.length === 1) { if (!openOne(games[0])) toast('No se reconoce el PGN ni el FEN'); return; }
        const tag = (pg, k) => (new RegExp('\\[' + k + ' "([^"]*)"\\]').exec(pg) || [])[1] || '?';
        $('#multi', v).innerHTML = `<div class="sec-t">${games.length} partidas encontradas</div>` + games.slice(0, 300).map((pg, i) => `<div class="list-row" data-m="${i}"><div class="grow"><h3>${esc(tag(pg, 'White'))} (${esc(tag(pg, 'WhiteElo'))}) – ${esc(tag(pg, 'Black'))} (${esc(tag(pg, 'BlackElo'))})</h3><p>${esc(tag(pg, 'Result'))} · ${esc(tag(pg, 'Date'))} · ${esc(tag(pg, 'TimeControl'))}${tag(pg, 'ECO') !== '?' ? ' · ' + esc(tag(pg, 'ECO')) : ''}</p></div></div>`).join('');
        $$('[data-m]', v).forEach(r => r.onclick = () => { if (!openOne(games[+r.dataset.m])) toast('Esa partida no se pudo leer'); });
      };
      $('#ld', v).onclick = () => handle($('#imp', v).value);
      $('#pgnf', v).onchange = (e) => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => handle(String(rd.result)); rd.readAsText(f); };
      $('#nw', v).onclick = () => { headers = {}; load(START, []); tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); };
      const copy = (txt, what) => (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(what + ' copiado'), () => { $('#imp', v).value = txt; $('#imp', v).select(); toast('Selecciona y copia el texto'); });
      $('#cp', v).onclick = () => {
        const t = new Chess(startFen); sans.forEach(s => t.move(s));
        const d = new Date(); const hdr = Object.assign({ Event: 'Ajedrez Pro', Site: 'Ajedrez Pro Academia', Date: d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0'), White: '?', Black: '?', Result: t.in_checkmate() ? (t.turn() === 'w' ? '0-1' : '1-0') : t.in_draw() ? '1/2-1/2' : '*' }, headers || {});
        if (startFen !== START) { hdr.SetUp = '1'; hdr.FEN = startFen; }
        const args = []; for (const k in hdr) args.push(k, hdr[k]); t.header.apply(t, args);
        copy(t.pgn(), 'PGN');
      };
      $('#cf', v).onclick = () => copy(fens[cur], 'FEN');
      $$('[data-g]', v).forEach(r => r.onclick = () => { const gm = S().games[+r.dataset.g]; const t = new Chess(); t.load_pgn(gm.pgn); load(gm.fen || START, t.history()); tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); });
    };
    const paintTabs = () => {
      $$('#at button', v).forEach(b => b.classList.toggle('on', b.dataset.t === tab));
      $('#af', v).innerHTML = '';
      const nb = h(`<div class="nav-btns" style="flex:1"><button class="btn sm" data-a="0">⏮</button><button class="btn sm" data-a="-1">◀</button><button class="btn sm" data-a="1">▶</button><button class="btn sm" data-a="9">⏭</button><button class="btn sm" data-a="f" title="Girar tablero">⇅</button></div>`);
      $$('[data-a]', nb).forEach(b => b.onclick = () => { const a = b.dataset.a; if (a === 'f') { board.flip(); setEval(bb.evalbar, review && review.evals[cur], board.opts.orientation); return; } go(a === '0' ? 0 : a === '9' ? fens.length - 1 : cur + +a); });
      $('#af', v).appendChild(nb);
      if (tab === 'an') $('#af', v).appendChild(h('<button class="btn pri sm" id="rvb">★ Revisar partida</button>'));
      const rb = $('#rvb', v); if (rb) rb.onclick = runReview;
    };
    $$('#at button', v).forEach(b => b.onclick = () => { tab = b.dataset.t; paintTabs(); $('#ab', v).innerHTML = ''; if (tab === 'an') { paint(); analyzeLive(); } else if (tab === 'rev') { review ? showReview() : ($('#ab', v).innerHTML = '<p class="muted">Pulsa “Revisar partida” para que Stockfish clasifique cada jugada (mejor, excelente, imprecisión, error, error grave…) y calcule la precisión de cada bando.</p><button class="btn pri" id="rv2">★ Revisar partida</button>', $('#rv2', v).onclick = runReview); } else showImport(); });
    $('#eon', v).onchange = (e) => { engineOn = e.target.checked; if (!engineOn) { liveId++; eng.stop(); board.setArrows([]); } analyzeLive(); };
    const kf = (e) => { if (e.target.closest('input,textarea,select')) return; if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); };
    document.addEventListener('keydown', kf);
    const rg = App.reviewGame; App.reviewGame = null;
    paintTabs();
    if (rg) { const t = new Chess(); t.load_pgn(rg.pgn); load(rg.fen || START, t.history()); if (rg.me === 'b') board.setOrientation('black'); setTimeout(runReview, 300); }
    else load(START, []);
    const er = () => analyzeLive(); window.addEventListener('engine-ready', er);
    return () => { document.removeEventListener('keydown', kf); liveId++; window.removeEventListener('engine-ready', er); };
  };
})();
