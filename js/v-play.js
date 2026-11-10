/* Jugar contra Stockfish y tablero de análisis con revisión de partida. */
(function () {
  const { $, $$, h, esc, fmtTime, save, bump, san, toast, VIEWS, boardBox, setEval, playerBar, playSound, moveList, uciToMove, IC, pIc, fixMv } = App;
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
  const GENERIC = { 'e4 e5': 'Apertura abierta (1.e4 e5)', 'e4 e5 Nf3 Nc6': 'Apertura abierta (2.Cf3 Cc6)', 'd4 d5': 'Apertura cerrada (1.d4 d5)', 'd4 d5 c4': 'Gambito de Dama', 'd4 Nf6': 'Defensa india', 'd4 Nf6 c4 g6': 'India de Rey / Grünfeld', 'd4 Nf6 c4 e6': 'Defensas indias con ...e6' };
  const normSan = (s) => s.replace(/[+#?!]/g, '');
  function bookInfo(sans) {
    let best = null, len = 0;
    for (const b of BOOK) { let k = 0; while (k < sans.length && k < b.moves.length && normSan(sans[k]) === normSan(b.moves[k])) k++; if (k > len && k === Math.min(b.moves.length, k)) { len = k; best = b; } }
    // El nombre solo vale si las jugadas coincidentes identifican una única apertura (p. ej. 1.d4 a secas no).
    if (best) { const pre = sans.slice(0, len).map(normSan).join(' '); const fam = new Set(BOOK.filter(b => b.moves.length >= len && b.moves.slice(0, len).map(normSan).join(' ') === pre).map(b => b.name.split(':')[0])); if (fam.size > 1) {
        // Varias aperturas comparten estas jugadas: usa las palabras iniciales comunes (p. ej. «Siciliana») o un nombre genérico.
        const ws = [...fam].map(x => x.split(' ')); let k = 0; while (ws.every(w => w[k] && w[k] === ws[0][k])) k++;
        const common = ws[0].slice(0, k).join(' ').replace(/\s+(de|del|la|el)$/, '');
        let gen = null; for (let j = len; j > 0 && !gen; j--) gen = GENERIC[sans.slice(0, j).map(normSan).join(' ')] || null;
        best = k && !/^(Defensa|Apertura|Gambito|Sistema|Ataque|Contragambito)$/.test(common) ? { name: common } : gen ? { name: gen } : null;
      } }
    return { name: best ? best.name : null, len };
  }
  App.bookInfo = bookInfo;
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
      const pgn = g.pgn(), gd = Date.now(); S().games.push({ pgn, res, why, me, lvl: practice ? 0 : cfg.lvl, d: gd, fen: startFen !== START ? startFen : null }); if (S().games.length > 200) S().games.shift(); save(); bump(); App.track('game', { res });
      let title = res === 'win' ? '¡Has ganado!' : res === 'loss' ? 'Has perdido' : 'Tablas', icon = res === 'win' ? '🏆' : res === 'loss' ? '✕' : '½';
      let sub = why;
      if (practice) { const goal = practice.goal; const okGoal = (goal === 'tablas' && res !== 'loss') || ((goal === 'ganar' || goal === 'mate') && res === 'win'); title = okGoal ? 'Objetivo cumplido' : 'Objetivo no cumplido'; icon = okGoal ? '★' : '✕'; sub = `${why}. ${okGoal ? 'Has demostrado la técnica.' : 'Repasa la lección y vuelve a intentarlo.'}`; }
      $('#pmsg', v).innerHTML = `<div class="fb ${res === 'win' || icon === '★' ? 'win' : res === 'loss' ? 'bad' : 'info'}"><span class="dot">${icon}</span><div>${title}<small>${esc(sub)}</small></div></div>`;
      $('#pf', v).innerHTML = `<button class="btn pri" id="rev">Revisar partida</button><button class="btn" id="again">${practice ? 'Reintentar' : 'Nueva partida'}</button>${practice && practice.back ? `<a class="btn ghost" href="${practice.back}">Volver a la lección</a>` : ''}`;
      $('#rev', v).onclick = () => { App.reviewGame = { pgn, fen: startFen, me, res, d: gd }; location.hash = '#analisis'; };
      $('#again', v).onclick = () => practice ? start(practice.fen, practice.side, practice) : setup();
    };
    const pg = App.pendingGame; App.pendingGame = null;
    if (pg) start(pg.fen, pg.side || new Chess(pg.fen).turn(), pg); else setup();
    return () => { clearInterval(tick); over = true; window.removeEventListener('engine-ready', engTag); };
  };

  /* ======================= ANÁLISIS ======================= */
  const CLS = { brilliant: 'Brillante', great: 'Genial', best: 'Mejor', excellent: 'Excelente', good: 'Buena', book: 'Teoría', inaccuracy: 'Imprecisión', mistake: 'Error', miss: 'Oportunidad perdida', blunder: 'Error grave' };
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
    let startFen = START, sans = [], fens = [START], moves = [], cur = 0, review = null, engineOn = true, tab = 'an', headers = {}, reviewMe = null, reviewRes = null, reviewGameD = null;
    const g = new Chess();
    board.game = g; board.opts.movable = 'both'; board.opts.interactive = true;

    const load = (fen, mvList) => {
      startFen = fen; const t = new Chess(fen); fens = [t.fen()]; sans = []; moves = [];
      for (const m of mvList || []) { const r = t.move(m, { sloppy: true }); if (!r) break; fens.push(t.fen()); sans.push(r.san); moves.push(r); }
      review = null; reviewRes = null; reviewGameD = null; go(fens.length - 1);
    };
    const go = (k) => {
      retry = null;
      cur = Math.max(0, Math.min(fens.length - 1, k)); g.load(fens[cur]);
      board.setPosition(fens[cur], true); board.setLastMove(cur ? [moves[cur - 1].from, moves[cur - 1].to] : null);
      board.setCheck(g.in_check() ? findKing(g, g.turn()) : null); board.setArrows([]);
      board.badge(review && cur && review.cls[cur - 1] ? moves[cur - 1].to : null, review && cur ? review.cls[cur - 1] : null);
      paint();
      if (review && review.evals[cur]) setEval(bb.evalbar, review.evals[cur], board.opts.orientation);
      analyzeLive();
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      if (retry) {
        const rt = retry; const r = g.move({ from, to, promotion: promotion || 'q' }); if (!r) return false; playSound(r);
        const uci = r.from + r.to + (r.promotion || ''); const fenAfter = g.fen();
        const show = (ok, msg) => { $('#cmt', v).innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}" style="animation:none"><span class="dot">${ok ? '✓' : '✕'}</span><div>${msg}<small>${ok ? '' : 'Inténtalo otra vez o pulsa «Ver la mejor».'}</small></div></div><div class="rv-acts"><button class="btn sm" id="rtAgain">↻ Otra vez</button><button class="btn sm ghost" id="rtBack">Volver a la partida</button></div>`;
          $('#rtAgain', v).onclick = () => { g.load(fens[rt.i]); board.setPosition(fens[rt.i], true); board.setArrows([]); retry = rt; $('#cmt', v).innerHTML = '<div class="fb info" style="animation:none"><span class="dot">↻</span><div>Busca la mejor jugada</div></div>'; };
          $('#rtBack', v).onclick = () => { retry = null; go(rt.i + 1); }; };
        retry = null;
        if (uci === rt.best) { show(true, `¡Correcto! ${esc(san(r.san))} es la mejor jugada.`); Sound.good(); return true; }
        const res = new Chess(fenAfter).in_checkmate() ? { lines: [{ cp: r.color === 'w' ? 10000 : -10000, mate: null }] } : await eng.analyze(fenAfter, { depth: 12 });
        const e = res && res.lines[0]; const sg = r.color === 'w' ? 1 : -1;
        const loss = EvalUtil.winPct(sg * EvalUtil.toCp(review.evals[rt.i])) - EvalUtil.winPct(sg * EvalUtil.toCp(e));
        if (loss < 3) { show(true, `¡Bien! ${esc(san(r.san))} es tan buena como la del motor.`); Sound.good(); } else { show(false, `${esc(san(r.san))} tampoco es la mejor.`); Sound.bad(); }
        return true;
      }
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
        $('#cmt', v).innerHTML = review && cur && !retry ? reviewComment(cur - 1) : '';
        if (review && cur && !retry && review.cls[cur - 1]) bindComment(cur - 1);
        moveList($('#ml', v), sans, cur - 1, (k) => go(k + 1), review ? review.cls : null, new Chess(startFen).turn(), +startFen.split(' ')[5] || 1);
      }
    };
    const reviewComment = (i) => {
      const c = review.cls[i]; if (!c) return '';
      const B = BADGES[c], x = review.R.explain(i);
      const line = (arr, fen) => arr.length ? arr.map(s => esc(san(s))).join(' ') : '';
      const bad = ['inaccuracy', 'mistake', 'miss', 'blunder'].includes(c);
      return `<div class="rv-move"><div class="rv-head"><span class="bd big" style="background:${B.c}">${B.t}</span><div><b>${esc(san(sans[i]))}</b> ${esc(CLS_TXT[c])}</div></div>
        <ul class="rv-why">${x.why.map(w => `<li>${fixMv(esc(w))}</li>`).join('')}</ul>
        ${bad && x.best ? `<div class="rv-best"><span class="bd" style="background:${BADGES.best.c}">${BADGES.best.t}</span><div>La mejor era <b>${esc(san(x.best))}</b>${x.bestLine.length > 1 ? `<small>Línea: ${line(x.bestLine)}</small>` : ''}</div></div>` : ''}
        ${bad && x.reply && x.replyLine.length ? `<div class="dim" style="font-size:12.5px">Respuesta del rival: ${line(x.replyLine.slice(0, 5))}</div>` : ''}
        <div class="rv-acts">${bad && x.best ? `<button class="btn sm" id="rvShow">${BADGES.best.t} Ver la mejor</button><button class="btn sm" id="rvRetry">↻ Reintentar</button>` : ''}<button class="btn sm ghost" id="rvNext">Siguiente error ⏭</button></div></div>`;
    };
    const bindComment = (i) => {
      const x = review.R.explain(i);
      const s = $('#rvShow', v); if (s) s.onclick = () => { const u = review.bestUci[i]; if (u) { g.load(fens[i]); board.setPosition(fens[i], true); board.setLastMove(null); board.badge(null); board.setArrows([[u.slice(0, 2), u.slice(2, 4), 'g']]); } };
      const r = $('#rvRetry', v); if (r) r.onclick = () => {
        g.load(fens[i]); board.setPosition(fens[i], true); board.setLastMove(null); board.badge(null); board.setArrows([]);
        retry = { i, best: review.bestUci[i] };
        $('#cmt', v).innerHTML = `<div class="fb info" style="animation:none"><span class="dot">↻</span><div>Busca una jugada mejor que ${esc(san(sans[i]))}<small>Mueve una pieza en el tablero.</small></div></div>`;
      };
      const nx = $('#rvNext', v); if (nx) nx.onclick = () => { const k = review.cls.findIndex((c, j) => j > i && ['inaccuracy', 'mistake', 'miss', 'blunder'].includes(c) && moves[j].color === review.me); if (k >= 0) go(k + 1); else toast('No hay más errores tuyos'); };
      return x;
    };
    let retry = null;
    const CLS_TXT = { brilliant: 'es brillante (!!)', great: 'es genial (!)', best: 'es la mejor', excellent: 'es excelente', good: 'es buena', book: 'es teoría', inaccuracy: 'es una imprecisión (?!)', mistake: 'es un error (?)', miss: 'es una oportunidad perdida', blunder: 'es un error grave (??)' };
    const runReview = async () => {
      if (!sans.length) { toast('Carga o juega una partida primero'); return; }
      tab = 'rev'; paintTabs();
      const n = fens.length; const evals = [], bests = [], second = [], pv = [];
      $('#ab', v).innerHTML = `<div class="fb info"><span class="dot">⏳</span><div>Analizando con ${esc(engineLabel())}<small id="rp">0 / ${n}</small></div></div><div class="meter"><div id="rm" style="width:0"></div></div>`;
      liveId++; eng.stop();
      for (let i = 0; i < n; i++) {
        const t = new Chess(fens[i]);
        if (t.in_checkmate()) { evals[i] = { cp: t.turn() === 'w' ? -10000 : 10000, mate: null }; bests[i] = null; pv[i] = []; continue; }
        if (t.game_over()) { evals[i] = { cp: 0, mate: null }; bests[i] = null; pv[i] = []; continue; }
        const r = await eng.analyze(fens[i], { depth: 14, multipv: 2 });
        if (!r) { toast('Revisión interrumpida'); return; }
        evals[i] = r.lines[0] || { cp: 0, mate: null }; second[i] = r.lines[1] || null;
        bests[i] = r.lines[0] && r.lines[0].pv[0] ? r.lines[0].pv[0] : r.bestmove; pv[i] = (r.lines[0] && r.lines[0].pv) || [];
        const rp = $('#rp', v); if (!rp) return; rp.textContent = `${i + 1} / ${n}`; $('#rm', v).style.width = ((i + 1) / n * 100) + '%';
      }
      const bk = startFen === START ? bookInfo(sans) : { len: 0, name: null };
      const me = reviewMe || (board.opts.orientation === 'black' ? 'b' : 'w');
      const last = new Chess(fens[n - 1]);
      let result = reviewRes || null;
      if (!result && last.game_over()) result = last.in_checkmate() ? (last.turn() === me ? 'loss' : 'win') : 'draw';
      if (!result && headers && headers.Result) result = headers.Result === '1/2-1/2' ? 'draw' : headers.Result === '1-0' ? (me === 'w' ? 'win' : 'loss') : headers.Result === '0-1' ? (me === 'b' ? 'win' : 'loss') : null;
      const D = { startFen, fens, moves, sans, evals, bests, second, pv, book: bk.len, opening: bk.name, me, result };
      const R = GameReport.build(D);
      review = { evals, cls: R.cls, R, me, bestUci: bests, acc: R.acc, second, pv, result };
      if (reviewGameD) { const gm = S().games.find(x => x.d === reviewGameD); if (gm) { gm.rev = R.summary; save(); } }
      showReview(); Sound.good();
    };
    const coachTitle = (acc, res) => res === 'win' ? (acc >= 85 ? '¡Gran victoria, muy bien jugada!' : 'Has ganado, aunque hay cosas que pulir.') : res === 'loss' ? (acc >= 85 ? 'Has perdido, pero jugaste a buen nivel.' : 'Partida para aprender: vamos a ver qué pasó.') : res === 'draw' ? 'Tablas: veamos dónde había más.' : (acc >= 85 ? '¡Gran partida!' : acc >= 70 ? 'Buena partida, con cosas que pulir.' : 'Partida para aprender: vamos a ver qué pasó.');
    const showReview = () => {
      const R = review.R, rep = R.report, me = review.me, n = R.items.length + 1;
      const W = 400, H = 90;
      const pts = review.evals.map((e, i) => [n === 1 ? 0 : i / (n - 1) * W, H - EvalUtil.winPct(EvalUtil.toCp(e)) / 100 * H]);
      const area = `M0,${H} ` + pts.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ` L${W},${H} Z`;
      const dots = R.cls.map((c, i) => ['blunder', 'mistake', 'miss', 'brilliant', 'great'].includes(c) ? `<circle cx="${pts[i + 1][0]}" cy="${pts[i + 1][1]}" r="3.5" fill="${BADGES[c].c}"/>` : '').join('');
      const grade = (a) => { const k = R.grade(a); return k ? `<span class="bd" style="background:${BADGES[k].c}" title="${a.toFixed(0)}%">${BADGES[k].t}</span>` : '<span class="dim">—</span>'; };
      const sec = (t, ic, arr) => `<details class="acc rv-sec" open><summary>${ic} ${t}</summary><div><ul class="rv-list">${arr.map(x => `<li class="${x.k}">${fixMv(x.t)}</li>`).join('')}</ul></div></details>`;
      const prev = S().games.filter(x => x.rev && x.d !== reviewGameD).slice(-10);
      const prevAcc = prev.length ? prev.reduce((s, x) => s + (x.rev.acc || 0), 0) / prev.length : null;
      $('#ab', v).innerHTML = `
        <div class="rv-coach">${App.COACH_SVG || ''}<div><b>${coachTitle(R.summary.acc, review.result)}</b><small>${rep.fix.length ? 'Lo más importante: ' + fixMv(rep.fix[0]).replace(/<[^>]+>/g, '') : 'Sin errores graves: sigue así.'}</small></div></div>
        <div class="chips" id="rvMe" style="justify-content:center"><span class="dim" style="font-size:13px;align-self:center">Tú juegas con</span><button class="chip ${me === 'w' ? 'on' : ''}" data-c="w">Blancas</button><button class="chip ${me === 'b' ? 'on' : ''}" data-c="b">Negras</button></div>
        <div class="acc-big"><div><div class="dim" style="font-size:12px;font-weight:800">PRECISIÓN BLANCAS</div><div class="v vw">${(R.acc.w || 0).toFixed(1)}</div><div class="dim" style="font-size:12px;margin-top:4px">Rendimiento ≈ ${R.elo.w || '—'}</div></div><div><div class="dim" style="font-size:12px;font-weight:800">PRECISIÓN NEGRAS</div><div class="v vb">${(R.acc.b || 0).toFixed(1)}</div><div class="dim" style="font-size:12px;margin-top:4px">Rendimiento ≈ ${R.elo.b || '—'}</div></div></div>
        ${prevAcc != null ? `<div class="dim" style="font-size:12.5px;text-align:center">Tu precisión media en las últimas ${prev.length} revisiones: <b>${prevAcc.toFixed(1)}</b></div>` : ''}
        <svg class="chart" viewBox="0 0 ${W} ${H}" style="background:#403d39;border-radius:4px;cursor:pointer" id="eg"><path d="${area}" fill="#fff"/><line x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}" stroke="#8b8987" stroke-dasharray="3 3"/>${dots}</svg>
        <div class="acc-grid"><div class="lbl dim" style="font-size:12px">Jugadas</div><b class="dim" style="font-size:12px;text-align:center">Blancas</b><b class="dim" style="font-size:12px;text-align:center">Negras</b>${Object.keys(CLS).map(c => `<div class="lbl"><span class="bd" style="background:${BADGES[c].c}">${BADGES[c].t}</span>${CLS[c]}</div><b style="text-align:center;min-width:28px">${R.count(c, 'w')}</b><b style="text-align:center;min-width:28px">${R.count(c, 'b')}</b>`).join('')}
          <div class="lbl" style="margin-top:6px">Apertura</div><div style="text-align:center;margin-top:6px">${R.ph.o.w != null ? grade(R.ph.o.w) : '—'}</div><div style="text-align:center;margin-top:6px">${R.ph.o.b != null ? grade(R.ph.o.b) : '—'}</div>
          <div class="lbl">Medio juego</div><div style="text-align:center">${R.ph.m.w != null ? grade(R.ph.m.w) : '—'}</div><div style="text-align:center">${R.ph.m.b != null ? grade(R.ph.m.b) : '—'}</div>
          <div class="lbl">Final</div><div style="text-align:center">${R.ph.e.w != null ? grade(R.ph.e.w) : '—'}</div><div style="text-align:center">${R.ph.e.b != null ? grade(R.ph.e.b) : '—'}</div></div>
        ${rep.keys.length ? `<div><div class="sec-t">Momentos clave</div><div class="rv-keys">${rep.keys.map(i => `<button class="rv-key" data-k="${i + 1}"><span class="bd" style="background:${BADGES[R.cls[i]].c}">${BADGES[R.cls[i]].t}</span>${esc(fens[i].split(' ')[5] + (moves[i].color === 'w' ? '.' : '...') + ' ' + san(sans[i]))}</button>`).join('')}</div></div>` : ''}
        <div class="grid g2 rv-gb"><div class="card rv-good"><div class="sec-t">✓ Aciertos</div><ul class="rv-list">${(rep.good.length ? rep.good : ['Revisa los momentos clave para encontrar tus mejores ideas.']).map(t => `<li class="good">${fixMv(t)}</li>`).join('')}</ul></div>
          <div class="card rv-fix"><div class="sec-t">✕ A corregir</div><ul class="rv-list">${(rep.fix.length ? rep.fix : ['Nada importante: ¡bien jugado!']).map(t => `<li class="fix">${fixMv(t)}</li>`).join('')}</ul></div></div>
        ${sec('Apertura', '📖', rep.opening)}${sec('Estrategia usada', '🧭', rep.strategy)}${sec('Táctica', '⚔️', rep.tactics)}${sec('Finales', '♜', rep.endgame)}${sec('Gestión de la ventaja', '📈', rep.advantage)}
        <div class="card" style="background:var(--bg3)"><div class="sec-t">Para mejorar: estudia esto</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">${rep.suggest.map(s => `<a class="btn sm" href="${esc(s.href)}">${esc(s.t)}</a>`).join('')}</div></div>
        <button class="btn pri" id="toAn">Ver jugada a jugada</button>
        <p class="dim" style="font-size:12.5px;margin:0">Clasificación según la pérdida de probabilidad de ganar de cada jugada (Stockfish, profundidad 14). La precisión usa la fórmula pública de Lichess; el rendimiento es una estimación orientativa a partir de la precisión.</p>`;
      const toMove = (k) => { tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); go(k); };
      $('#eg', v).onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); toMove(Math.round((e.clientX - r.left) / r.width * (n - 1))); };
      $$('.rv-key', v).forEach(b => b.onclick = () => toMove(+b.dataset.k));
      $$('#rvMe .chip', v).forEach(b => b.onclick = () => { reviewMe = b.dataset.c; runRebuild(); });
      $('#toAn', v).onclick = () => { const k = review.R.report.keys[0]; toMove(k != null ? k + 1 : 1); };
    };
    // Recalcula el informe para el otro bando sin volver a analizar.
    const runRebuild = () => {
      const bk = startFen === START ? bookInfo(sans) : { len: 0, name: null };
      const r0 = review; const D = { startFen, fens, moves, sans, evals: r0.evals, bests: r0.bestUci, second: r0.second, pv: r0.pv, book: bk.len, opening: bk.name, me: reviewMe, result: r0.me === reviewMe ? r0.result : (r0.result === 'win' ? 'loss' : r0.result === 'loss' ? 'win' : r0.result) };
      const R = GameReport.build(D); review = Object.assign({}, r0, { R, cls: R.cls, me: reviewMe, result: D.result }); showReview();
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
      $$('[data-g]', v).forEach(r => r.onclick = () => { const gm = S().games[+r.dataset.g]; const t = new Chess(); t.load_pgn(gm.pgn); load(gm.fen || START, t.history()); reviewGameD = gm.d; reviewRes = gm.res; reviewMe = gm.me || null; if (gm.me === 'b') board.setOrientation('black'); tab = 'an'; paintTabs(); $('#ab', v).innerHTML = ''; paint(); });
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
    if (rg) { const t = new Chess(); t.load_pgn(rg.pgn); load(rg.fen || START, t.history()); reviewMe = rg.me || null; reviewRes = rg.res || null; reviewGameD = rg.d || null; if (rg.me === 'b') board.setOrientation('black'); setTimeout(runReview, 300); }
    else load(START, []);
    const er = () => analyzeLive(); window.addEventListener('engine-ready', er);
    return () => { document.removeEventListener('keydown', kf); liveId++; window.removeEventListener('engine-ready', er); };
  };
})();
