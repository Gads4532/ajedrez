/* Entrenamiento: puzles, contrarreloj, woodpecker, visión y cálculo. */
(function () {
  const { $, $$, h, esc, rnd, shuffle, fmtTime, save, bump, san, uciToMove, toast, VIEWS, boardBox, playSound, ratePuzzle, themeName, THEME_ES, PZ_BY_ID, IC, pIc } = App;
  const S = () => App.S;
  const colorOf = (p) => p.fen.split(' ')[1];

  /* ---------- Motor de resolución de un puzle (reutilizable) ---------- */
  function PuzzleRunner(board, p, cb) {
    const g = new Chess(p.fen); board.game = g; board.setOrientation(colorOf(p) === 'w' ? 'white' : 'black');
    board.opts.movable = colorOf(p); board.opts.interactive = true;
    board.setPosition(p.fen, false); board.setLastMove(null); board.setCheck(g.in_check() ? findKing(g, g.turn()) : null); board.setArrows([]); board.badge(null);
    let idx = 0, failed = false, done = false;
    const r = {
      g, get idx() { return idx; }, get failed() { return failed; }, get done() { return done; },
      expected() { return p.moves[idx]; },
      hint() { if (done) return; failed = true; board.setArrows([]); board.flashSquare(p.moves[idx].slice(0, 2), 'flash-good'); board.squares[p.moves[idx].slice(0, 2)].classList.add('hl'); setTimeout(() => board.squares[p.moves[idx] ? p.moves[idx].slice(0, 2) : 'a1'] && $$('.hl', board.el).forEach(e => e.classList.remove('hl')), 2500); },
      solution() { if (done) return; failed = true; const u = p.moves[idx]; board.setArrows([[u.slice(0, 2), u.slice(2, 4), 'g']]); },
      async playAll() { failed = true; while (idx < p.moves.length) { const m = g.move(uciToMove(p.moves[idx])); playSound(m); board.sync(); idx++; await wait(550); } done = true; cb.onDone && cb.onDone(false); },
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      if (done) return false;
      const exp = p.moves[idx]; const uci = from + to + (promotion || '');
      const test = new Chess(g.fen()); const tm = test.move({ from, to, promotion: promotion || 'q' });
      const isLast = idx === p.moves.length - 1;
      const ok = uci === exp || (exp && exp.length === 5 && uci.slice(0, 4) === exp.slice(0, 4) && !promotion && exp[4] === 'q') || (tm && test.in_checkmate());
      if (!ok) {
        failed = true; const m = g.move({ from, to, promotion: promotion || 'q' }); board.sync(); board.badge(to, 'wrong'); Sound.bad();
        cb.onWrong && cb.onWrong();
        await wait(650); g.undo(); board.sync(); board.badge(null); return true;
      }
      const m = g.move({ from, to, promotion: promotion || 'q' }); playSound(m); board.sync(); board.setArrows([]);
      idx++;
      if (isLast || test.in_checkmate()) { done = true; board.badge(to, failed ? 'good' : 'correct'); Sound.good(); cb.onDone && cb.onDone(!failed); return true; }
      board.badge(to, 'correct'); cb.onProgress && cb.onProgress();
      await wait(420);
      const reply = g.move(uciToMove(p.moves[idx])); playSound(reply); board.badge(null); board.sync(); idx++;
      return true;
    };
    return r;
  }
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  window.PuzzleRunner = PuzzleRunner;

  function pickPuzzle(filter, around) {
    const s = S().pz.solved;
    let pool = PUZZLES.filter(filter || (() => true));
    if (!pool.length) return null;
    const unsolved = pool.filter(p => !(s[p.id] && s[p.id].ok));
    if (unsolved.length) pool = unsolved;
    if (around != null) {
      for (const w of [120, 220, 350, 600, 5000]) { const c = pool.filter(p => Math.abs(p.rating - around) <= w); if (c.length >= 3 || w === 5000) { pool = c.length ? c : pool; break; } }
    }
    return rnd(pool);
  }

  /* ======================= PUZLES ======================= */
  VIEWS.puzles = (v, arg) => {
    let theme = null, blind = false, mode = 'adapt';
    if (arg && arg.startsWith('tema_')) { theme = arg.slice(5); mode = 'theme'; }
    const bb = boardBox({ players: false });
    const layout = h(`<div class="play"></div>`); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel">
      <div class="sp-head">${pIc('wn')}<span>Puzles</span><span style="margin-left:auto" class="tag g" id="rt"></span></div>
      <div class="sp-body">
        <div id="fb"></div>
        <div id="info" class="muted" style="font-size:14px"></div>
        <div><div class="sec-t" style="margin-bottom:6px">Modo</div><div class="chips" id="modes"><button class="chip" data-m="adapt">Adaptativo</button><button class="chip" data-m="theme">Por tema</button><button class="chip" data-m="review">Repasar fallos</button></div></div>
        <div id="themeBox" hidden><select id="themeSel" style="width:100%"></select></div>
        <label class="ck"><input type="checkbox" id="blind"> Modo a ciegas (las piezas desaparecen a los 6 s)</label>
        <div id="themesOut"></div>
      </div>
      <div class="sp-foot"><button class="btn sm" id="hintB">💡 Pista</button><button class="btn sm" id="solB">Solución</button><button class="btn sm" id="retryB">↺ Reintentar</button><button class="btn pri sm" id="nextB" style="margin-left:auto">Siguiente →</button></div>
    </div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board;
    // selector de temas
    const counts = {}; PUZZLES.forEach(p => (p.themes || []).forEach(t => counts[t] = (counts[t] || 0) + 1));
    $('#themeSel', v).innerHTML = Object.keys(counts).sort((a, b) => themeName(a).localeCompare(themeName(b))).map(t => `<option value="${t}">${esc(themeName(t))} (${counts[t]})</option>`).join('');
    if (theme) $('#themeSel', v).value = theme;
    let cur = null, runner = null, blindT = null, rated = false;
    const fb = (cls, icon, title, sub) => { $('#fb', v).innerHTML = `<div class="fb ${cls}"><span class="dot">${icon}</span><div>${title}<small>${sub || ''}</small></div></div>`; };
    const paintModes = () => { $$('#modes .chip', v).forEach(c => c.classList.toggle('on', c.dataset.m === mode)); $('#themeBox', v).hidden = mode !== 'theme'; $('#rt', v).textContent = S().pz.rating; };
    const load = (p) => {
      if (!p) { fb('info', 'ℹ', 'No hay puzles para este filtro', 'Prueba otro tema o modo.'); return; }
      cur = p; rated = false; clearTimeout(blindT); board.setBlind(false);
      runner = PuzzleRunner(board, p, {
        onWrong() { if (!rated) { rated = true; const d = ratePuzzle(p, false); fb('bad', '✕', 'Incorrecto', `Rating ${S().pz.rating} (${d})  ·  Inténtalo de nuevo o mira la solución`); $('#rt', v).textContent = S().pz.rating; } else fb('bad', '✕', 'Esa no es', 'Sigue buscando.'); },
        onProgress() { fb('ok', '✓', '¡Bien! Sigue…', 'Encuentra la siguiente jugada.'); },
        onDone(ok) {
          board.setBlind(false);
          if (!rated) { rated = true; const d = ratePuzzle(p, ok); fb(ok ? 'win' : 'ok', ok ? '★' : '✓', ok ? '¡Resuelto!' : 'Completado', `Rating ${S().pz.rating} (${d >= 0 ? '+' : ''}${d})`); }
          else fb('ok', '✓', 'Completado', 'Este puzle ya contó como fallo.');
          $('#rt', v).textContent = S().pz.rating; showThemes(p);
        }
      });
      const turn = colorOf(p) === 'w' ? 'blancas' : 'negras';
      fb('info', colorOf(p) === 'w' ? '♔' : '♚', `Juegan ${turn}`, [p.goal, p.title].filter(Boolean).map(esc).join(' · ') || 'Encuentra la mejor jugada.');
      $('#info', v).innerHTML = `Puzle <b>${esc(p.id)}</b> · rating <b>${p.rating}</b> · ${Math.ceil(p.moves.length / 2)} jugada(s)`;
      $('#themesOut', v).innerHTML = '';
      if (blind) blindT = setTimeout(() => board.setBlind(true), 6000);
      if (location.hash !== '#puzles') history.replaceState(null, '', '#puzles');
    };
    const showThemes = (p) => { $('#themesOut', v).innerHTML = `<div class="sec-t" style="margin-bottom:6px">Temas</div><div class="tags">${(p.themes || []).map(t => `<span class="tag b">${esc(themeName(t))}</span>`).join('')}</div>`; };
    const next = () => {
      const R = S().pz.rating;
      if (mode === 'theme') { const t = $('#themeSel', v).value; load(pickPuzzle(p => (p.themes || []).includes(t), R)); }
      else if (mode === 'review') { const f = Object.entries(S().pz.solved).filter(([, r]) => r.fail > 0 && r.ok === 0).map(([id]) => PZ_BY_ID[id]).filter(Boolean); if (!f.length) { toast('No tienes puzles fallados pendientes'); mode = 'adapt'; paintModes(); next(); return; } load(rnd(f)); }
      else load(pickPuzzle(null, R));
    };
    $$('#modes .chip', v).forEach(c => c.onclick = () => { mode = c.dataset.m; paintModes(); next(); });
    $('#themeSel', v).onchange = next;
    $('#blind', v).onchange = (e) => { blind = e.target.checked; if (!blind) { clearTimeout(blindT); board.setBlind(false); } else if (cur && !runner.done) blindT = setTimeout(() => board.setBlind(true), 6000); };
    $('#hintB', v).onclick = () => { if (!runner || runner.done) return; if (!rated) { rated = true; ratePuzzle(cur, false); $('#rt', v).textContent = S().pz.rating; } runner.hint(); fb('info', '💡', 'Pista', 'Se ilumina la pieza que debes mover.'); };
    $('#solB', v).onclick = () => { if (!runner || runner.done) return; if (!rated) { rated = true; ratePuzzle(cur, false); $('#rt', v).textContent = S().pz.rating; } board.setBlind(false); runner.playAll(); };
    $('#retryB', v).onclick = () => { if (cur) { const keep = rated; load(cur); rated = keep; } };
    $('#nextB', v).onclick = next;
    paintModes();
    if (arg && PZ_BY_ID[arg]) load(PZ_BY_ID[arg]); else next();
    return () => clearTimeout(blindT);
  };

  /* ======================= CONTRARRELOJ ======================= */
  VIEWS.contrarreloj = (v) => {
    const bb = boardBox({});
    const layout = h(`<div class="play"></div>`); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head">${IC.lightning}<span>Contrarreloj</span></div><div class="sp-body" id="rb"></div><div class="sp-foot" id="rf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board; board.opts.interactive = false;
    if (PUZZLES[0]) board.setPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', false);
    let timer = null, run = null;
    const intro = () => {
      const best = S().rush.best || {};
      $('#rb', v).innerHTML = `<p class="muted" style="margin:0">Resuelve el máximo de puzles. La dificultad sube con cada acierto. Tres fallos y se acaba. Entrena la <b>velocidad de reconocimiento de patrones</b>, que es lo que decide las partidas rápidas y los apuros de tiempo.</p>
        <div><div class="sec-t" style="margin-bottom:6px">Tema</div><select id="rth" style="width:100%"><option value="">Todos los temas</option>${Object.keys(THEME_ES).filter(t => PUZZLES.filter(p => (p.themes || []).includes(t)).length >= 15).map(t => `<option value="${t}">${esc(themeName(t))}</option>`).join('')}</select></div>
        <div class="grid" style="gap:10px">${[['3', '3 minutos'], ['5', '5 minutos'], ['surv', 'Supervivencia (sin reloj)']].map(([k, t]) => `<button class="btn ${k === '3' ? 'pri' : ''} big" data-k="${k}">${t}<span style="font-size:13px;opacity:.8;margin-left:auto">Récord ${best[k] || 0}</span></button>`).join('')}</div>`;
      $('#rf', v).innerHTML = '';
      $$('#rb [data-k]', v).forEach(b => b.onclick = () => start(b.dataset.k, $('#rth', v).value));
    };
    const start = (k, theme) => {
      const secs = k === 'surv' ? null : +k * 60;
      run = { k, theme, score: 0, strikes: 0, t: secs, results: [], level: 450, used: new Set() };
      $('#rb', v).innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between"><div class="big-num" id="rs">0</div><div class="big-num" id="rtm" style="font-size:28px">${secs ? fmtTime(secs) : '∞'}</div></div>
        <div class="rush-strikes" id="rx"><span>✕</span><span>✕</span><span>✕</span></div><div id="rfb"></div><div class="rush-list" id="rl"></div>`;
      $('#rf', v).innerHTML = '<button class="btn sm" id="rq">Terminar</button>';
      $('#rq', v).onclick = end;
      if (secs) timer = setInterval(() => { run.t--; $('#rtm', v).textContent = fmtTime(run.t); if (run.t <= 10) Sound.tick(); if (run.t <= 0) end(); }, 1000);
      nextP();
    };
    const nextP = () => {
      const base = PUZZLES.filter(p => !run.used.has(p.id) && (!run.theme || (p.themes || []).includes(run.theme)));
      const pool = base.filter(p => Math.abs(p.rating - run.level) < 150);
      const near = base.slice().sort((a, b) => Math.abs(a.rating - run.level) - Math.abs(b.rating - run.level)).slice(0, 5);
      const p = pool.length ? rnd(pool) : near.length ? rnd(near) : null;
      if (!p) { end(); return; }
      run.used.add(p.id); run.cur = p;
      $('#rfb', v).innerHTML = `<div class="fb info"><span class="dot">${colorOf(p) === 'w' ? '♔' : '♚'}</span><div>Juegan ${colorOf(p) === 'w' ? 'blancas' : 'negras'}<small>${p.goal ? esc(p.goal) + ' · ' : ''}Puzle ${run.score + run.strikes + 1} · ${p.rating}</small></div></div>`;
      PuzzleRunner(board, p, {
        onWrong() { mark(false); }, onDone(ok) { if (ok) mark(true); }
      });
    };
    const mark = (ok) => {
      if (!run || run.over) return;
      const p = run.cur;
      run.results.push(ok); $('#rl', v).appendChild(h(`<span class="${ok ? 'ok' : 'ko'}">${p.rating}</span>`));
      if (ok) { run.score++; run.level += 55; $('#rs', v).textContent = run.score; }
      else { run.strikes++; $$('#rx span', v)[run.strikes - 1].classList.add('x'); }
      const rec = S().pz.solved[p.id] || { ok: 0, fail: 0 }; ok ? rec.ok++ : rec.fail++; S().pz.solved[p.id] = rec;
      if (run.strikes >= 3) { setTimeout(end, 500); return; }
      setTimeout(nextP, ok ? 350 : 700);
    };
    const end = () => {
      if (!run || run.over) return; run.over = true; clearInterval(timer); board.opts.interactive = false;
      const best = S().rush.best || {}; const rec = run.score > (best[run.k] || 0);
      if (rec) best[run.k] = run.score; S().rush.best = best; S().rush.runs.push({ k: run.k, s: run.score, d: Date.now() }); bump(run.results.length); App.track('rush', { score: run.score });
      Sound.end();
      $('#rb', v).innerHTML = `<div class="fb ${rec ? 'win' : 'ok'}"><span class="dot">${rec ? '🏆' : '✓'}</span><div>${run.score} puzles resueltos<small>${rec ? '¡Nuevo récord personal!' : 'Récord: ' + best[run.k]}</small></div></div><div class="rush-list">${run.results.map(r => `<span class="${r ? 'ok' : 'ko'}">${r ? '✓' : '✕'}</span>`).join('')}</div>
        <p class="muted" style="font-size:14px">Consejo: los puzles que fallas aquí quedan en “Repasar fallos” del modo Puzles. Resuélvelos despacio, sin reloj.</p>`;
      $('#rf', v).innerHTML = '<button class="btn pri" id="ag">Jugar otra vez</button>'; $('#ag', v).onclick = intro;
    };
    intro();
    return () => clearInterval(timer);
  };

  /* ======================= WOODPECKER ======================= */
  VIEWS.woodpecker = (v) => {
    const sets = () => S().wood.sets;
    const bb = boardBox({});
    const layout = h(`<div class="play"></div>`); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head">${IC.loop}<span>Método Woodpecker</span></div><div class="sp-body" id="wb"></div><div class="sp-foot" id="wf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board; board.opts.interactive = false; board.setPosition('8/8/8/8/8/8/8/8 w - - 0 1', false);
    let timer = null, st = null;
    const home = () => {
      clearInterval(timer);
      $('#wb', v).innerHTML = `<p class="muted" style="margin:0">Basado en el método de Axel Smith y Hans Tikkanen: resuelve <b>el mismo conjunto</b> de puzles en ciclos sucesivos, intentando hacerlo cada vez en la mitad de tiempo. La repetición convierte los patrones en reconocimiento automático.</p>
        <div class="sec-t">Tus conjuntos</div>
        <div id="wl" style="display:grid;gap:8px"></div>
        <div class="sec-t">Crear conjunto nuevo</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><select id="wsz"><option value="20">20 puzles</option><option value="50" selected>50 puzles</option><option value="100">100 puzles</option><option value="200">200 puzles</option></select>
        <select id="wlv"><option value="600-1100">Fácil (600-1100)</option><option value="1000-1500" selected>Medio (1000-1500)</option><option value="1400-1900">Difícil (1400-1900)</option><option value="1800-3000">Experto (1800+)</option></select>
        <button class="btn pri sm" id="wnew">Crear</button></div>`;
      $('#wf', v).innerHTML = '';
      $('#wl', v).innerHTML = sets().length ? sets().map((s, i) => {
        const c = s.cycles.filter(c => c.end);
        return `<div class="list-row" data-i="${i}"><div class="grow"><h3>${esc(s.name)}</h3><p>${s.ids.length} puzles · ${c.length} ciclo(s) completado(s)${c.length ? ` · último: ${fmtTime(c[c.length - 1].time)} · ${Math.round(c[c.length - 1].ok / s.ids.length * 100)}%` : ''}</p>
          ${c.length ? `<div style="display:flex;gap:4px;margin-top:6px;align-items:flex-end;height:34px">${c.map(x => `<div title="${fmtTime(x.time)}" style="width:14px;background:var(--blue);border-radius:2px;height:${Math.max(10, x.time / Math.max(...c.map(y => y.time)) * 100)}%"></div>`).join('')}</div>` : ''}</div>
          <button class="btn pri sm" data-go="${i}">${s.cycles.length && !s.cycles[s.cycles.length - 1].end ? 'Continuar' : 'Ciclo ' + (c.length + 1)}</button></div>`;
      }).join('') : '<p class="dim" style="margin:0">Aún no tienes conjuntos.</p>';
      $$('[data-go]', v).forEach(b => b.onclick = (e) => { e.stopPropagation(); begin(+b.dataset.go); });
      $('#wnew', v).onclick = () => {
        const [a, b] = $('#wlv', v).value.split('-').map(Number), n = +$('#wsz', v).value;
        const pool = shuffle(PUZZLES.filter(p => p.rating >= a && p.rating <= b)).slice(0, n);
        if (pool.length < 5) { toast('No hay suficientes puzles en ese rango'); return; }
        sets().push({ name: `Conjunto ${sets().length + 1} · ${$('#wlv', v).selectedOptions[0].text.split(' ')[0]}`, ids: pool.map(p => p.id), cycles: [] }); save(); home();
      };
    };
    const begin = (i) => {
      const s = sets()[i]; let cyc = s.cycles[s.cycles.length - 1];
      if (!cyc || cyc.end) { cyc = { start: Date.now(), pos: 0, ok: 0, time: 0 }; s.cycles.push(cyc); save(); }
      st = { s, cyc, t0: Date.now() };
      const prev = s.cycles.filter(c => c.end); const target = prev.length ? prev[prev.length - 1].time / 2 : null;
      $('#wb', v).innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><div class="dim" style="font-size:13px;font-weight:800">CICLO ${s.cycles.length}</div><div class="big-num" id="wp"></div></div><div style="text-align:right"><div class="dim" style="font-size:13px;font-weight:800">TIEMPO</div><div class="big-num" id="wt">0:00</div>${target ? `<div class="dim" style="font-size:12px">Objetivo: ${fmtTime(target)}</div>` : ''}</div></div>
        <div class="meter"><div id="wm" style="width:0"></div></div><div id="wfb"></div>`;
      $('#wf', v).innerHTML = '<button class="btn sm" id="wpause">Pausar y salir</button><button class="btn sm" id="wskip">Ver solución</button>';
      $('#wpause', v).onclick = () => { cyc.time += (Date.now() - st.t0) / 1000; save(); home(); };
      timer = setInterval(() => { $('#wt', v).textContent = fmtTime(cyc.time + (Date.now() - st.t0) / 1000); }, 500);
      nextW();
    };
    const nextW = () => {
      const { s, cyc } = st;
      if (cyc.pos >= s.ids.length) {
        cyc.time += (Date.now() - st.t0) / 1000; cyc.end = Date.now(); save(); clearInterval(timer); Sound.end();
        $('#wb', v).innerHTML = `<div class="fb win"><span class="dot">★</span><div>Ciclo completado<small>${fmtTime(cyc.time)} · ${cyc.ok}/${s.ids.length} correctos (${Math.round(cyc.ok / s.ids.length * 100)}%)</small></div></div><p class="muted">Descansa al menos un día antes del siguiente ciclo. Los autores recomiendan entre 4 y 7 ciclos, reduciendo el tiempo a la mitad cada vez.</p>`;
        $('#wf', v).innerHTML = '<button class="btn pri" id="wh">Volver</button>'; $('#wh', v).onclick = home; return;
      }
      const p = PZ_BY_ID[s.ids[cyc.pos]];
      if (!p) { cyc.pos++; nextW(); return; }
      $('#wp', v).textContent = `${cyc.pos + 1}/${s.ids.length}`; $('#wm', v).style.width = (cyc.pos / s.ids.length * 100) + '%';
      $('#wfb', v).innerHTML = `<div class="fb info"><span class="dot">${colorOf(p) === 'w' ? '♔' : '♚'}</span><div>Juegan ${colorOf(p) === 'w' ? 'blancas' : 'negras'}<small>rating ${p.rating}</small></div></div>`;
      let failed = false;
      const run = PuzzleRunner(board, p, {
        onWrong() { failed = true; $('#wfb', v).innerHTML = '<div class="fb bad"><span class="dot">✕</span><div>Incorrecto<small>Cuenta como fallo; sigue intentándolo.</small></div></div>'; },
        onDone(ok) { if (ok && !failed) cyc.ok++; cyc.pos++; save(); bump(); setTimeout(nextW, 600); }
      });
      $('#wskip', v).onclick = () => { failed = true; run.playAll(); };
    };
    home();
    return () => { clearInterval(timer); if (st && st.cyc && !st.cyc.end) { st.cyc.time += (Date.now() - st.t0) / 1000; save(); } };
  };

  /* ======================= VISIÓN Y CÁLCULO ======================= */
  VIEWS.vision = (v, arg) => {
    const tabs = [['coord', 'Coordenadas'], ['nombre', 'Nombra casilla'], ['color', 'Color de casilla'], ['caballo', 'Rutas de caballo'], ['memoria', 'Memoria'], ['calculo', 'Cálculo a ciegas']];
    let tab = tabs.some(t => t[0] === arg) ? arg : 'coord';
    const bb = boardBox({ showCoords: true });
    const layout = h(`<div class="play"></div>`); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head">${IC.eye}<span>Visión y cálculo</span></div>
      <div class="chips" style="padding:12px 16px 0" id="vt">${tabs.map(([k, t]) => `<button class="chip" data-t="${k}">${t}</button>`).join('')}</div>
      <div class="sp-body" id="vb"></div><div class="sp-foot" id="vf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    let board = bb.board; let timers = [];
    const clear = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; board.opts.onUserMove = null; board.setArrows([]); board.badge(null); board.setBlind(false); board.setLastMove(null); board.setCheck(null); board.el.onclick = null; $$('.hl', board.el).forEach(e => e.classList.remove('hl')); };
    const resetBoard = (coords) => { const box = $('.board-box', bb.el); box.innerHTML = '<div class="bd"></div>'; board = new Board($('.bd', box), { showCoords: coords }); };
    const FILES = 'abcdefgh'; const rsq = () => FILES[Math.floor(Math.random() * 8)] + (1 + Math.floor(Math.random() * 8));
    const paint = () => $$('#vt .chip', v).forEach(c => c.classList.toggle('on', c.dataset.t === tab));
    const best = (k, val) => { App.track('vision'); const b = S().vision; if (val != null && val > (b[k] || 0)) { b[k] = val; save(); return true; } return false; };
    const modes = {
      coord() {
        resetBoard(false); board.opts.interactive = false; board.setPosition('8/8/8/8/8/8/8/8 w - - 0 1', false);
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Haz clic en la casilla que aparece. 30 segundos. Sin coordenadas en el tablero: así se interioriza el mapa mental, base de la visualización y el ajedrez a ciegas.</p><label class="ck"><input type="checkbox" id="vflip"> Ver desde negras</label><div class="vision-target" id="vtg">—</div><div style="display:flex;justify-content:space-between"><b id="vsc">0 aciertos</b><b id="vtm">0:30</b></div><div class="dim" style="font-size:13px">Récord: ${S().vision.coord || 0}</div>`;
        $('#vf', v).innerHTML = '<button class="btn pri" id="vgo">Empezar</button>';
        $('#vflip', v).onchange = (e) => board.setOrientation(e.target.checked ? 'black' : 'white');
        $('#vgo', v).onclick = () => {
          clear(); let sc = 0, t = 30, target = rsq(); $('#vtg', v).textContent = target; $('#vsc', v).textContent = '0 aciertos';
          timers.push(setInterval(() => { t--; $('#vtm', v).textContent = fmtTime(t); if (t <= 0) { clear(); board.el.onpointerup = null; const r = best('coord', sc); $('#vtg', v).textContent = sc; toast(r ? '¡Nuevo récord!' : `Resultado: ${sc}`); Sound.end(); } }, 1000));
          board.el.onpointerup = (e) => { if (t <= 0) return; const sq = board._sqFromPoint(e.clientX, e.clientY); if (!sq) return; if (sq === target) { sc++; Sound.move(); board.flashSquare(sq, 'flash-good'); target = rsq(); $('#vtg', v).textContent = target; $('#vsc', v).textContent = sc + ' aciertos'; } else { Sound.bad(); board.flashSquare(sq, 'flash-bad'); } };
        };
      },
      nombre() {
        resetBoard(false); board.opts.interactive = false; board.setPosition('8/8/8/8/8/8/8/8 w - - 0 1', false);
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Se ilumina una casilla: elige su nombre. Es el ejercicio inverso al anterior.</p><div id="vq" class="grid g2" style="gap:8px"></div><b id="vsc">0 / 0</b>`; $('#vf', v).innerHTML = '';
        let ok = 0, n = 0;
        const q = () => {
          $$('.hl', board.el).forEach(e => e.classList.remove('hl'));
          const s = rsq(); board.squares[s].classList.add('hl');
          const opts = shuffle([s, ...shuffle(Array.from({ length: 64 }, (_, i) => FILES[i % 8] + (1 + (i >> 3))).filter(x => x !== s && (x[0] === s[0] || x[1] === s[1]))).slice(0, 3)]);
          $('#vq', v).innerHTML = opts.map(o => `<button class="btn" data-o="${o}" style="font-size:20px">${o}</button>`).join('');
          $$('#vq [data-o]', v).forEach(b => b.onclick = () => { n++; if (b.dataset.o === s) { ok++; Sound.move(); } else { Sound.bad(); toast('Era ' + s); } $('#vsc', v).textContent = `${ok} / ${n}`; q(); });
        }; q();
      },
      color() {
        resetBoard(true); board.opts.interactive = false; board.setPosition('8/8/8/8/8/8/8/8 w - - 0 1', false); board.setBlind(true);
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Sin mirar el tablero: ¿la casilla es clara u oscura? Imprescindible para calcular diagonales de alfil y jugar a ciegas. Truco: si la letra (a=1…h=8) y el número tienen la misma paridad, la casilla es oscura.</p><div class="vision-target" id="vtg"></div><div class="grid g2" style="gap:8px"><button class="btn big" id="cl" style="background:#f0d9b5;color:#333">Clara</button><button class="btn big" id="cd" style="background:#b58863">Oscura</button></div><div style="display:flex;justify-content:space-between"><b id="vsc">0 / 0</b><b id="vtm">0:30</b></div><div class="dim" style="font-size:13px">Récord: ${S().vision.color || 0}</div>`;
        $('#vf', v).innerHTML = ''; board.el.style.visibility = 'hidden';
        let ok = 0, n = 0, t = 30, s = rsq(), running = false; $('#vtg', v).textContent = s;
        const ans = (dark) => {
          if (!running) { running = true; timers.push(setInterval(() => { t--; $('#vtm', v).textContent = fmtTime(t); if (t <= 0) { clear(); running = false; const r = best('color', ok); toast(r ? '¡Nuevo récord! ' + ok : `Resultado: ${ok}/${n}`); board.el.style.visibility = ''; Sound.end(); } }, 1000)); }
          if (t <= 0) return;
          const isDark = (FILES.indexOf(s[0]) + (+s[1])) % 2 === 1 ? false : true; n++;
          if (dark === isDark) { ok++; Sound.move(); } else Sound.bad();
          $('#vsc', v).textContent = `${ok} / ${n}`; s = rsq(); $('#vtg', v).textContent = s;
        };
        $('#cl', v).onclick = () => ans(false); $('#cd', v).onclick = () => ans(true);
        return () => { board.el.style.visibility = ''; };
      },
      caballo() {
        resetBoard(true);
        const dist = (a, b) => { const q = [[a, 0]], seen = new Set([a]); while (q.length) { const [s, d] = q.shift(); if (s === b) return d; for (const n of kn(s)) if (!seen.has(n)) { seen.add(n); q.push([n, d + 1]); } } return -1; };
        const kn = (s) => { const f = FILES.indexOf(s[0]), r = +s[1], o = []; for (const [a, b] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) { const nf = f + a, nr = r + b; if (nf >= 0 && nf < 8 && nr >= 1 && nr <= 8) o.push(FILES[nf] + nr); } return o; };
        let pos, target, moves, minD, solved = 0;
        const fake = { get: (sq) => sq === pos ? { type: 'n', color: 'w' } : null, moves: ({ square }) => square === pos ? kn(pos).map(t => ({ from: pos, to: t, captured: null })) : [], turn: () => 'w', in_check: () => false, fen: () => '' };
        const setup = () => {
          do { pos = rsq(); target = rsq(); minD = dist(pos, target); } while (minD < 2);
          moves = 0; board.game = fake; board.opts.movable = 'w'; board.opts.interactive = true;
          board.setPosition(fenWith(pos), false); $$('.hl', board.el).forEach(e => e.classList.remove('hl')); board.squares[target].classList.add('hl');
          $('#vtg', v).innerHTML = `${pos} → ${target}`; $('#vmv', v).textContent = `Saltos: 0 · mínimo posible: ${minD}`;
        };
        const fenWith = (sq) => { const rows = []; for (let r = 8; r >= 1; r--) { let row = '', e = 0; for (let f = 0; f < 8; f++) { if (FILES[f] + r === sq) { if (e) row += e; e = 0; row += 'N'; } else e++; } if (e) row += e; rows.push(row); } return rows.join('/') + ' w - - 0 1'; };
        board.opts.onUserMove = async ({ from, to }) => {
          moves++; pos = to; board.setPosition(fenWith(pos)); board.setLastMove([from, to]); Sound.move();
          $('#vmv', v).textContent = `Saltos: ${moves} · mínimo posible: ${minD}`;
          if (pos === target) { const perfect = moves === minD; if (perfect) { solved++; Sound.good(); board.badge(to, 'best'); } else { Sound.bad(); board.badge(to, 'inaccuracy'); } $('#vsc', v).textContent = `Rutas perfectas: ${solved}`; setTimeout(() => { board.badge(null); setup(); }, 900); }
          return true;
        };
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Lleva el caballo a la casilla iluminada con el menor número de saltos. Calcúlalo de memoria antes de mover: el caballo es la pieza más difícil de visualizar.</p><div class="vision-target" id="vtg" style="font-size:40px"></div><div id="vmv" class="muted"></div><b id="vsc">Rutas perfectas: 0</b>`;
        $('#vf', v).innerHTML = '<button class="btn sm" id="vnew">Nueva ruta</button>'; $('#vnew', v).onclick = setup;
        setup();
      },
      memoria() {
        resetBoard(true); board.opts.interactive = false;
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Memoriza la posición durante 10 segundos. Luego las piezas desaparecen y respondes 5 preguntas. Los maestros recuerdan posiciones porque las agrupan en “bloques” con sentido (chunking, De Groot y Chase & Simon).</p><div id="vq"></div>`;
        $('#vf', v).innerHTML = '<button class="btn pri" id="vgo">Nueva posición</button>';
        $('#vgo', v).onclick = () => {
          clear(); const p = rnd(PUZZLES); board.setOrientation(colorOf(p) === 'w' ? 'white' : 'black'); board.setPosition(p.fen, false); board.setBlind(false);
          let t = 10; $('#vq', v).innerHTML = `<div class="vision-target" id="vc">10</div>`;
          timers.push(setInterval(() => { t--; $('#vc', v) && ($('#vc', v).textContent = t); if (t <= 0) { clear(); board.setBlind(true); ask(p); } }, 1000));
        };
        const ask = (p) => {
          const bd = parseFen(p.fen); const occ = Object.keys(bd); let qn = 0, ok = 0;
          const NM = { wp: 'Peón blanco', wn: 'Caballo blanco', wb: 'Alfil blanco', wr: 'Torre blanca', wq: 'Dama blanca', wk: 'Rey blanco', bp: 'Peón negro', bn: 'Caballo negro', bb: 'Alfil negro', br: 'Torre negra', bq: 'Dama negra', bk: 'Rey negro', '': 'Vacía' };
          const q = () => {
            if (qn >= 5) { board.setBlind(false); $('#vq', v).innerHTML = `<div class="fb ${ok >= 4 ? 'win' : 'ok'}"><span class="dot">${ok}</span><div>${ok}/5 correctas<small>${ok === 5 ? 'Memoria fotográfica.' : 'Repite: fíjate en estructuras y relaciones entre piezas, no en casillas sueltas.'}</small></div></div>`; best('memoria', ok); bump(); return; }
            const sq = Math.random() < .7 ? rnd(occ) : rsq(); const right = bd[sq] || '';
            const opts = shuffle([right, ...shuffle(Object.keys(NM).filter(k => k !== right)).slice(0, 3)]);
            $$('.hl', board.el).forEach(e => e.classList.remove('hl')); board.squares[sq].classList.add('hl');
            $('#vq', v).innerHTML = `<div style="font-weight:800;margin-bottom:8px">Pregunta ${qn + 1}/5: ¿qué hay en <span class="mv">${sq}</span>?</div><div class="grid g2" style="gap:8px">${opts.map(o => `<button class="btn sm" data-o="${o}">${NM[o]}</button>`).join('')}</div>`;
            $$('#vq [data-o]', v).forEach(b => b.onclick = () => { qn++; if (b.dataset.o === right) { ok++; Sound.move(); } else { Sound.bad(); toast('Era: ' + NM[right]); } q(); });
          }; q();
        };
      },
      calculo() {
        resetBoard(true);
        $('#vb', v).innerHTML = `<p class="muted" style="margin:0">Ves la posición inicial y una secuencia de jugadas escrita que <b>no</b> se mueve en el tablero. Visualízala y juega la jugada final correcta en el tablero (las piezas siguen en su sitio original, pero el tablero ya está en la posición final). Es el ejercicio clásico de la escuela soviética para entrenar el cálculo.</p><div id="vq"></div>`;
        $('#vf', v).innerHTML = '<button class="btn pri" id="vgo">Nuevo ejercicio</button><label class="ck" style="margin-left:auto"><input type="checkbox" id="vbl"> Ocultar piezas</label>';
        $('#vgo', v).onclick = () => {
          clear(); const pool = PUZZLES.filter(p => p.moves.length >= 3); if (!pool.length) return; const p = rnd(pool);
          const g = new Chess(p.fen); const pre = p.moves.slice(0, p.moves.length - 1); const sans = [];
          pre.forEach(u => { const m = g.move(uciToMove(u)); sans.push(m.san); });
          board.game = g; board.setOrientation(colorOf(p) === 'w' ? 'white' : 'black'); board.setPosition(p.fen, false); board.opts.movable = g.turn(); board.opts.interactive = true;
          board.setBlind($('#vbl', v).checked);
          // el tablero muestra la posición inicial, pero la partida interna está en la final
          const text = App.lineText(pre.map(u => u), p.fen);
          $('#vq', v).innerHTML = `<div class="comment-box"><b>Secuencia:</b> ${esc(text)}<br><span class="dim">Ahora juegan ${g.turn() === 'w' ? 'blancas' : 'negras'}. ¿Cuál es la jugada ganadora?</span></div><div id="vr"></div>`;
          const last = p.moves[p.moves.length - 1];
          board.opts.onUserMove = async ({ from, to, promotion }) => {
            const t = new Chess(g.fen()); const mm = t.move({ from, to, promotion: promotion || 'q' });
            const ok = (from + to) === last.slice(0, 4) || (mm && t.in_checkmate());
            board.setBlind(false); board.setPosition(g.fen(), true); board.setArrows([[last.slice(0, 2), last.slice(2, 4), 'g']]);
            if (ok) { Sound.good(); $('#vr', v).innerHTML = '<div class="fb win"><span class="dot">★</span><div>¡Correcto!<small>Visualizaste bien la secuencia.</small></div></div>'; S().vision.calc = (S().vision.calc || 0) + 1; save(); bump(); }
            else { Sound.bad(); $('#vr', v).innerHTML = `<div class="fb bad"><span class="dot">✕</span><div>No era esa<small>La correcta era ${esc(san(new Chess(g.fen()).move(uciToMove(last)).san))}. Mira la posición final real en el tablero.</small></div></div>`; }
            board.opts.interactive = false; return true;
          };
        };
        $('#vgo', v).click();
      }
    };
    let sub = null;
    const open = (k) => { tab = k; paint(); clear(); if (sub) sub(); board.el.style.visibility = ''; board.el.onpointerup = null; sub = modes[k]() || null; };
    $$('#vt .chip', v).forEach(c => c.onclick = () => open(c.dataset.t));
    open(tab);
    return () => { clear(); if (sub) sub(); };
  };
})();
