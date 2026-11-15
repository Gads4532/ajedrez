/* Ejercicios de cada lección y exámenes de nivel.
   - «Practica lo aprendido»: las posiciones de la lección (data/exercises.js, comprobadas con Stockfish).
   - «Puzles del tema»: 5 puzles de data/puzzles.js con los temas de la lección, ajustados a tu nivel.
   - «Práctica contra el motor»: la posición de práctica de la lección, si la tiene (paso opcional).
   Puntuación por paso: 1 sin errores ni ayudas, 0,5 con errores o pista, 0 si se ve la solución.
   Estrellas: ≥ 90 % ★★★, ≥ 70 % ★★, si no ★. Documentación: docs/EJERCICIOS.md */
(function () {
  const { VIEWS, $, $$, h, esc, toast, save, bump, san, uciToMove, playSound, boardBox, fixMv, themeName } = App;
  const S = () => App.S;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const norm = (s) => String(s || '').replace(/[+#?!]/g, '');

  /* ---------- Temas de puzles de cada lección ---------- */
  const RULES = [
    [/horquilla/, ['horquilla']], [/clavada/, ['clavada']], [/enfilada/, ['enfilada']], [/descubierto/, ['ataqueDescubierto', 'jaqueDoble']],
    [/desviacion/, ['desviacion']], [/atraccion/, ['atraccion']], [/sobrecarga/, ['sobrecarga']], [/eliminacion/, ['eliminacionDefensor']],
    [/intermedia/, ['intermedia']], [/rayosx/, ['rayosX']], [/molino/, ['molino']], [/interferencia/, ['interferencia']],
    [/t-mates1/, ['mateCorredor', 'mateArabe', 'mateAhogado']], [/t-mates2/, ['mateAnastasia', 'mateBoden']], [/legal/, ['mateLegal']],
    [/griego|sac-g7|doble-alfiles|enroque-h6|fianchetto|sac-f7/, ['sacrificio', 'mateIn2', 'mateIn3']],
    [/greco/, ['mateGreco', 'mateLolli', 'mateDamiano']], [/morphy/, ['mateColaGolondrina', 'mateEpaulette', 'mateMorphy', 'mateOpera']],
    [/sueltas|b-valor/, ['piezaColgada']], [/ccj|conteo/, ['ventajaMaterial', 'piezaColgada']], [/atrapada/, ['ventajaMaterial']],
    [/despeje|bloqueo|red-mate/, ['mateIn3', 'sacrificio']], [/septima|coronacion/, ['coronacion', 'subpromocion']],
    [/perpetuo|contraataque|a-defensa/, ['defensa']], [/ahogado/, ['ahogado', 'defensa']], [/calculo/, ['largo', 'muyLargo']],
    [/zugzwang|triangulacion|oposicion|casillas-clave|cuadrado|ruptura|alejado|rey-activo|rey-peon|peones-contra/, ['finalPeones', 'zugzwang']],
    [/lucena|philidor|vancura|tarrasch|torre-activa|defensa-lateral|peon-torre|torre-dos/, ['finalTorres']],
    [/alfil-caballo|alfil-equivocado|distinto-color|centurini|dos-alfiles/, ['finalAlfiles']], [/caballo-peones|dos-caballos/, ['finalCaballos']],
    [/dama-peon|dama-rey/, ['finalDamas', 'mateIn2']], [/torre-rey|dos-torres/, ['mateIn2', 'finalTorres']], [/torre-vs-pieza|fortaleza/, ['final', 'defensa']],
    [/b-al-paso/, ['alPaso']], [/b-enroque|ap-enroque/, ['enroque', 'apertura']], [/b-mate|b-jaque|b-dama|b-torre/, ['mateIn1']],
    [/b-primeras|b-notacion|b-tablero|b-rey|b-alfil|b-caballo|b-peon|b-tablas/, ['mateIn1', 'piezaColgada']]
  ];
  const AREA_DEF = { tactica: ['ventajaMaterial', 'mateIn2'], estrategia: ['medioJuego', 'quietMove'], medio: ['medioJuego', 'quietMove'], final: ['final'], 'apertura-principios': ['apertura', 'enroque'], basico: ['mateIn1', 'piezaColgada'], ataque: ['sacrificio', 'mateIn2', 'mateIn3'], partidas: ['sacrificio', 'medioJuego', 'mate'] };
  function themesFor(L) { for (const [re, t] of RULES) if (re.test(L.id)) return t; return AREA_DEF[L.area] || ['ventajaMaterial']; }

  // Nivel de exigencia (Ajustes / Rutas): 'normal', 'alta' o 'gm' (gran maestro, por defecto).
  const LEVEL = () => (S().settings && S().settings.exigencia) || 'gm';
  const EXIG = {
    normal: { t: 'Normal', d: 'Puzles cerca de tu rating, 4 preguntas básicas, pistas sin castigo.', pz: [5, 3], stars: [90, 70], exam: [8, 75] },
    alta: { t: 'Alta', d: 'Puzles 250 puntos por encima de tu rating, 8 preguntas (básicas y profesionales).', pz: [6, 4], stars: [92, 80], exam: [10, 80] },
    gm: { t: 'Gran maestro', d: 'Puzles de 2200 a 2750 y largos, 8 preguntas (básicas y profesionales), la pista cuenta como fallo y las estrellas exigen casi la perfección.', pz: [8, 6], stars: [95, 85], exam: [12, 80] }
  };
  App.EXIG = EXIG; App.exigencia = LEVEL;
  // Puzles de unos temas, cerca del nivel del alumno; primero los no resueltos.
  function pickPuzzles(themes, n, level, area, seed) {
    const R = S().pz.rating || 800, adj = { principiante: -100, intermedio: 50, avanzado: 200 }[level] || 0;
    const lv = LEVEL(); let target = R + adj;
    if (lv === 'alta') target = R + 250;
    if (lv === 'gm') target = Math.min(2750, Math.max(R + 400, 2200));
    if (area === 'basico') target = Math.min(target, lv === 'gm' ? 1400 : lv === 'alta' ? 1100 : 850);
    const solved = S().pz.solved || {};
    let pool = (window.PUZZLES || []).filter(p => (p.themes || []).some(t => themes.includes(t)));
    if (pool.length < n) pool = pool.concat((window.PUZZLES || []).filter(p => (p.themes || []).includes(AREA_DEF[area] ? AREA_DEF[area][0] : 'ventajaMaterial')));
    const score = (p) => Math.abs(p.rating - target) + (solved[p.id] && solved[p.id].ok ? 600 : 0) + (lv === 'gm' && p.moves.length < 4 ? 150 : 0);
    pool.sort((a, b) => score(a) - score(b));
    const top = pool.slice(0, Math.max(n * 3, 12)); let s = seed || Date.now();
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const out = []; while (out.length < n && top.length) out.push(top.splice(Math.floor(rnd() * Math.min(top.length, n + 4)), 1)[0]);
    return out;
  }

  /* ---------- Ejercicio de posición: el alumno juega las jugadas marcadas ---------- */
  function QuizRunner(board, item, cb) {
    const g = new Chess(item.fen); board.game = g; board.setOrientation(item.o === 'w' ? 'white' : 'black');
    board.setPosition(item.fen, false); board.setLastMove(null); board.setArrows([]); board.badge(null); board.opts.interactive = false;
    let idx = 0, errors = 0, helped = false, shown = false, done = false;
    const asks = new Set(item.ask);
    const lineMove = () => { const t = new Chess(g.fen()); return t.move(item.line[idx], { sloppy: true }); };
    const say = (m) => { const c = (item.cm || [])[idx]; if (cb.onComment) cb.onComment(m, c || ''); };
    const advance = async () => {
      while (idx < item.line.length && !asks.has(idx)) { await wait(650); const m = g.move(item.line[idx], { sloppy: true }); if (!m) break; playSound(m); board.sync(); say(m); idx++; }
      if (idx >= item.line.length) { done = true; board.opts.interactive = false; cb.onDone(shown ? 0 : helped && LEVEL() === 'gm' ? 0 : (errors || helped) ? 0.5 : 1); return; }
      board.opts.movable = g.turn(); board.opts.interactive = true; cb.onTurn && cb.onTurn(idx);
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      if (done || !asks.has(idx)) return false;
      const before = g.fen(); const exp = lineMove(); const t = new Chess(before); const um = t.move({ from, to, promotion: promotion || 'q' }); if (!um) return false;
      const ok = exp && (norm(um.san) === norm(exp.san) || t.in_checkmate());
      if (ok) { g.move(um.san); playSound(um); board.sync(); board.setArrows([]); board.badge(to, 'correct'); say(um); idx++; board.opts.interactive = false; await wait(350); board.badge(null); cb.onGood && cb.onGood(); return advance().then(() => true); }
      // ¿Alternativa igual de buena? Se compara con la jugada de la lección usando el motor.
      board.opts.interactive = false; g.move(um.san); board.sync();
      let alt = false;
      if (!cb.strict) try {
        const eng = App.getEngine(), sg = um.color === 'w' ? 1 : -1;
        const tl = new Chess(before); if (!tl.move(exp.san)) throw new Error('línea');
        const [a, b] = [await eng.analyze(t.fen(), { depth: 10 }), await eng.analyze(tl.fen(), { depth: 10 })];
        if (a && b && a.lines[0] && b.lines[0]) alt = EvalUtil.winPct(sg * EvalUtil.toCp(b.lines[0])) - EvalUtil.winPct(sg * EvalUtil.toCp(a.lines[0])) <= 3;
      } catch (e) { alt = false; }
      g.undo(); board.sync();
      if (alt) {
        cb.onAlt && cb.onAlt(um.san, exp.san);
        await wait(300); g.move(exp.san); playSound(exp); board.sync(); board.setLastMove([exp.from, exp.to]); say(exp); idx++; return advance().then(() => true);
      }
      errors++; board.badge(to, 'wrong'); Sound.bad(); cb.onWrong && cb.onWrong(errors); await wait(600); board.badge(null);
      board.opts.interactive = true; return true;
    };
    advance();
    return {
      hint() { if (done) return; const m = lineMove(); if (!m) return; helped = true; board.flashSquare(m.from, 'flash-good'); },
      solution() { if (done) return; const m = lineMove(); if (!m) return; shown = true; board.setArrows([[m.from, m.to, 'g']]); }
    };
  }

  /* ---------- Sesión de ejercicios (lección o examen) ---------- */
  function session(v, opt) {
    const bb = boardBox({ interactive: true }); const board = bb.board;
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const steps = opt.steps; let i = 0; const scores = []; let runner = null;
    const panel = h(`<div class="side-panel"><div class="sp-head" style="flex-direction:column;align-items:flex-start;gap:4px"><a href="${esc(opt.back)}" class="dim" style="font-size:13px;text-decoration:none">← ${esc(opt.backT)}</a><span>${esc(opt.title)}</span></div>
      <div class="sp-body"><div class="ex-dots" id="exDots"></div><div id="exHead"></div><div id="exExp"></div><div id="exFb"></div></div>
      <div class="sp-foot" id="exFoot"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const dots = () => { if (opt.endless) { const ok = scores.filter(x => x === 1).length; $('#exDots', v).innerHTML = `<div class="ex-endless"><span>∞ Modo ilimitado · ${scores.length} resueltos · <b>${ok}</b> perfectos</span><button class="btn sm" id="exStop">■ Terminar</button></div>`; $('#exStop', v).onclick = finish; return; } $('#exDots', v).innerHTML = steps.map((s, k) => `${k && s.kind !== 'mc' && steps[k - 1].kind === 'mc' ? '<i class="sep"></i>' : ''}<span class="${k < scores.length ? (scores[k] === 1 ? 'ok' : scores[k] > 0 ? 'half' : 'bad') : k === i ? 'cur' : ''}" title="${esc(s.kind === 'mc' ? 'Teoría' : s.kind === 'quiz' ? 'Posición' : 'Puzle')}"></span>`).join(''); };
    const exp = (html) => { $('#exExp', v).innerHTML = html ? `<div class="ex-exp">${App.COACH_SVG || ''}<div>${html}</div></div>` : ''; };
    const fb = (cls, ic, t, sub) => { $('#exFb', v).innerHTML = `<div class="fb ${cls}" style="animation:none"><span class="dot">${ic}</span><div>${t}${sub ? `<small>${sub}</small>` : ''}</div></div>`; };
    const foot = (html) => { $('#exFoot', v).innerHTML = html; };
    const nMc = steps.filter(x => x.kind === 'mc').length, nPr = steps.length - nMc;
    const label = (kind) => kind === 'mc' ? `PARTE 1 · TEORÍA · PREGUNTA ${i + 1} DE ${nMc}` : `${nMc ? 'PARTE 2 · ' : ''}PRÁCTICA · EJERCICIO ${i - nMc + 1} DE ${nPr} · ${kind === 'quiz' ? 'POSICIÓN DE LA LECCIÓN' : 'PUZLE DEL TEMA'}`;
    // Al pasar de la teoría a la práctica, una pantalla intermedia con el resultado de la teoría.
    const next = () => {
      i++;
      if (i < steps.length && nMc && i === nMc && steps[i - 1].kind === 'mc') {
        const ok = scores.slice(0, nMc).reduce((a, b) => a + b, 0);
        exp(opt.recap ? `<b>Antes de practicar, recuerda:</b>${opt.recap}` : '');
        $('#exHead', v).innerHTML = `<div class="ex-res"><h3>Teoría terminada: ${ok} de ${nMc}</h3><div class="dim">${ok === nMc ? '¡Todas correctas!' : ok >= nMc / 2 ? 'Bien. Repasa en la lección las que fallaste.' : 'Conviene releer la lección antes de seguir.'}</div><p class="muted" style="margin:10px 0 0">Ahora la <b>parte práctica</b>: ${nPr} ejercicios en el tablero.</p></div>`;
        $('#exFb', v).innerHTML = '';
        foot(`<a class="btn" href="${esc(opt.back)}">📖 Releer la lección</a>${opt.lessonId ? `<a class="btn" href="#ejercicios-${opt.lessonId}~teoria">↻ Repetir teoría</a>` : ''}<button class="btn pri" id="exGo" style="margin-left:auto">Empezar la práctica →</button>`);
        $('#exGo', v).onclick = load; return;
      }
      if (i >= steps.length && opt.endless) { steps.push(...opt.endless()); }
      if (i < steps.length) load(); else finish();
    };
    const stepDone = (sc) => { scores.push(sc); dots(); fb(sc === 1 ? 'win' : sc > 0 ? 'ok' : 'info', sc === 1 ? '★' : '✓', sc === 1 ? '¡Perfecto!' : sc > 0 ? 'Resuelto' : 'Solución vista', sc === 1 ? 'Sin errores ni ayudas.' : sc > 0 ? 'Con algún error o pista.' : 'Repasa la idea y vuelve a intentarlo más tarde.'); foot(`<button class="btn pri" id="exNext" style="margin-left:auto">${i + 1 < steps.length ? 'Siguiente →' : 'Ver resultado'}</button>`); $('#exNext', v).onclick = next; };
    const load = () => {
      dots(); $('#exFb', v).innerHTML = ''; exp(''); const st = steps[i];
      if (st.kind === 'mc') {
        // Pregunta teórica de triple elección: 1 punto si se acierta a la primera, 0 si no.
        const q = st.q, order = [0, 1, 2].sort(() => Math.random() - 0.5);
        board.game = null; board.opts.interactive = false; board.setArrows([]); board.badge(null); board.setLastMove(null);
        if (st.fen) { board.setOrientation(st.o || 'white'); board.setPosition(st.fen, false); }
        $('#exHead', v).innerHTML = `<div class="dim k">${label('mc')}${q.lvl === 'pro' ? ' · <span style="color:var(--yellow)">NIVEL PROFESIONAL</span>' : ''}</div><h3 class="ex-t">${fixMv(q.q)}</h3><div class="mc-opts">${order.map((k, j) => `<button class="mc-opt" data-k="${k}"><span class="mc-l">${'ABC'[j]}</span><span>${fixMv(q.opts[k])}</span></button>`).join('')}</div>`;
        foot('');
        $$('.mc-opt', v).forEach(b => b.onclick = () => {
          const k = +b.dataset.k, ok = k === q.ok;
          $$('.mc-opt', v).forEach(x => { x.disabled = true; if (+x.dataset.k === q.ok) x.classList.add('right'); });
          if (!ok) { b.classList.add('wrong'); Sound.bad(); } else Sound.good();
          scores.push(ok ? 1 : 0); dots();
          fb(ok ? 'win' : 'bad', ok ? '✓' : '✕', ok ? '¡Correcto!' : 'No es correcta', fixMv(q.why));
          foot(`<button class="btn pri" id="exNext" style="margin-left:auto">${i + 1 < steps.length ? 'Siguiente →' : 'Ver resultado'}</button>`); $('#exNext', v).onclick = next;
        });
      } else if (st.kind === 'quiz') {
        const it = st.item, nAsk = it.ask.length;
        $('#exHead', v).innerHTML = `<div class="dim k">${label('quiz')}</div><h3 class="ex-t">${esc(it.title)}</h3><p class="muted" style="margin:0">${it.find ? 'Encuentra la mejor jugada.' : `Juegas con <b>${it.o === 'w' ? 'blancas' : 'negras'}</b>. Encuentra ${nAsk > 1 ? `las ${nAsk} jugadas de la idea; el rival responde solo` : 'la jugada clave'}.`}</p>`;
        foot('<button class="btn sm" id="exHint">💡 Pista</button><button class="btn sm" id="exSol">Solución</button>');
        runner = QuizRunner(board, it, {
          strict: st.strict, onDone: stepDone, onWrong: (n) => fb('bad', '✕', 'No es esa', n >= 2 ? 'Usa la pista si te atascas.' : 'Piensa en la idea de la lección.'),
          onGood: () => { $('#exFb', v).innerHTML = ''; },
          onComment: (m, c) => { exp(`<b>${esc(san(m.san))}</b> ${c ? fixMv(esc(c)) : (m.captured ? 'Captura.' : '')}`); }, onAlt: (u, e) => fb('ok', '👍', `${esc(san(u))} también es buena`, `La de la lección es ${esc(san(e))}: seguimos con ella.`)
        });
        $('#exHint', v).onclick = () => runner.hint(); $('#exSol', v).onclick = () => runner.solution();
      } else {
        const p = st.p;
        $('#exHead', v).innerHTML = `<div class="dim k">${label('puzzle')}</div><h3 class="ex-t">${esc((p.themes || []).filter(t => !['corto', 'largo', 'muyLargo', 'final', 'medioJuego', 'apertura'].includes(t)).slice(0, 2).map(themeName).join(' · ') || 'Puzle')}</h3><p class="muted" style="margin:0">Juegas con <b>${new Chess(p.fen).turn() === 'w' ? 'blancas' : 'negras'}</b> · dificultad ${p.rating}</p>`;
        foot('<button class="btn sm" id="exHint">💡 Pista</button><button class="btn sm" id="exSol">Solución</button>');
        let wrong = 0, helped = false;
        runner = PuzzleRunner(board, p, {
          onWrong: () => { wrong++; fb('bad', '✕', 'No es esa', 'Busca jaques, capturas y amenazas.'); },
          onProgress: () => { $('#exFb', v).innerHTML = ''; },
          onDone: (clean) => {
            const sc = helped === 'sol' ? 0 : clean ? 1 : (helped && LEVEL() === 'gm') ? 0 : 0.5; App.ratePuzzle(p, !!clean); save(); stepDone(sc);
            // Explicación: la línea completa de la solución y los motivos del puzle
            const t = new Chess(p.fen), line = []; for (const u of p.moves) { const m = t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] || 'q' }); if (!m) break; line.push(m.san); }
            const th = (p.themes || []).filter(x => !['corto', 'largo', 'muyLargo'].includes(x)).map(themeName);
            exp(`<b>Solución:</b> ${line.map(x => esc(san(x))).join(' ')}${th.length ? `<br><b>Motivos:</b> ${esc(th.join(', '))}.` : ''}${t.in_checkmate() ? ' Termina en jaque mate.' : ''}`);
          }
        });
        $('#exHint', v).onclick = () => { helped = true; runner.hint(); }; $('#exSol', v).onclick = () => { helped = 'sol'; runner.solution(); };
      }
    };
    const finish = () => {
      const n = opt.endless ? scores.length : steps.length; if (opt.endless) { $('#exDots', v).innerHTML = ''; }
      const pct = n ? scores.reduce((a, b) => a + b, 0) / n * 100 : 100;
      const res = opt.onFinish(pct, scores);
      $('#exHead', v).innerHTML = `<div class="ex-res"><div class="stars">${[1, 2, 3].map(k => `<span class="${k <= res.stars ? 'on' : ''}">★</span>`).join('')}</div><h3>${esc(res.title)}</h3><div class="dim">${pct.toFixed(0)}% de acierto · <b style="color:var(--green)">+${res.xp} XP</b></div></div>`;
      $('#exFb', v).innerHTML = res.msg ? `<p class="muted">${res.msg}</p>` : '';
      foot(`<button class="btn" id="exAgain">↻ Repetir todo</button>${opt.lessonId ? `<a class="btn" href="#ejercicios-${opt.lessonId}~teoria">↻ Solo teoría</a><a class="btn" href="#ejercicios-${opt.lessonId}~practica">↻ Solo práctica</a>` : ''}${opt.lessonId ? `<a class="btn" href="#ejercicios-${opt.lessonId}~mas">∞ Ejercicios ilimitados</a>` : ''}${res.nextHref ? `<a class="btn pri" href="${esc(res.nextHref)}" style="margin-left:auto">${esc(res.nextT)}</a>` : `<a class="btn pri" href="${esc(opt.back)}" style="margin-left:auto">Volver</a>`}`);
      $('#exAgain', v).onclick = () => { if (opt.lessonId && location.hash !== '#ejercicios-' + opt.lessonId) location.hash = '#ejercicios-' + opt.lessonId; else App.route(); };
      board.opts.interactive = false; Sound.end();
    };
    if (opt.intro) {
      dots(); exp('');
      $('#exHead', v).innerHTML = `<div class="dim k">REPASO DE LA LECCIÓN</div><h3 class="ex-t">${esc(opt.introT || '')}</h3><div class="prose" style="font-size:14px">${opt.intro}</div>`;
      foot(`<a class="btn" href="${esc(opt.back)}">📖 Leer la lección completa</a><button class="btn pri" id="exStart" style="margin-left:auto">${nMc ? 'Empezar la teoría →' : 'Empezar la práctica →'}</button>`);
      $('#exStart', v).onclick = load;
    } else load();
    return () => { board.opts.onUserMove = null; };
  }

  const starsOf = (pct) => { const [a, b] = EXIG[LEVEL()].stars; return pct >= a ? 3 : pct >= b ? 2 : 1; };
  const lessonSteps = (L, mode) => {
    const quiz = (window.EXERCISES && EXERCISES[L.id]) || [];
    const [nA, nB] = EXIG[LEVEL()].pz; const nPz = quiz.length >= 3 ? nB : nA;
    const seed = Math.floor(Date.now() / 864e5) + L.id.length * 31;
    const strict = L.area === 'basico' || L.area === 'partidas';
    const mc = ((window.LESSON_QUIZ || {})[L.id] || []).filter(q => LEVEL() !== 'normal' || q.lvl !== 'pro').map(q => ({ kind: 'mc', q, fen: (L.positions && L.positions[0] && L.positions[0].fen) || null, o: L.positions && L.positions[0] && L.positions[0].orientation }));
    if (mode === 'teoria') return mc;
    const practica = [...quiz.map(item => ({ kind: 'quiz', item, strict })), ...pickPuzzles(themesFor(L), nPz, L.level, L.area, mode === 'practica' ? Date.now() : seed).map(p => ({ kind: 'puzzle', p }))];
    return mode === 'practica' ? practica : [...mc, ...practica];
  };
  const poolSize = (L) => { const th = themesFor(L); return (window.PUZZLES || []).filter(p => (p.themes || []).some(t => th.includes(t))).length; };
  App.lessonExercises = (L) => { const q = (window.EXERCISES && EXERCISES[L.id]) || [], [nA, nB] = EXIG[LEVEL()].pz; return { mc: ((window.LESSON_QUIZ || {})[L.id] || []).filter(x => LEVEL() !== 'normal' || x.lvl !== 'pro').length, quiz: q.length, puzzles: q.length >= 3 ? nB : nA, level: EXIG[LEVEL()].t, practice: !!L.practice, pool: poolSize(L) }; };

  const introOf = (L) => `<p>${fixMv(esc(L.summary || ''))}</p>${(L.keyPoints || []).length ? `<ul>${L.keyPoints.map(k => `<li>${fixMv(esc(k))}</li>`).join('')}</ul>` : ''}`;
  const recapOf = (L) => (L.keyPoints || []).length ? `<ul>${L.keyPoints.slice(0, 4).map(k => `<li>${fixMv(esc(k))}</li>`).join('')}</ul>` : '';
  VIEWS.ejercicios = (v, arg) => {
    const mode = (/~(mas|teoria|practica)$/.exec(arg || '') || [])[1] || '', more = mode === 'mas', id = String(arg || '').replace(/~(mas|teoria|practica)$/, '');
    const L = (window.LESSONS || []).find(l => l.id === id); if (!L) { location.hash = '#rutas'; return; }
    if (more) {
      // Tanda extra: 10 puzles del tema (primero los no resueltos), sin límite de tandas.
      return session(v, {
        title: 'Ejercicios ilimitados: ' + L.title, back: '#lec-' + L.id, backT: L.title, lessonId: L.id,
        steps: pickPuzzles(themesFor(L), 10, L.level, L.area, Date.now()).map(p => ({ kind: 'puzzle', p })),
        endless: () => pickPuzzles(themesFor(L), 10, L.level, L.area, Date.now()).map(p => ({ kind: 'puzzle', p })),
        onFinish(pct, sc) { const xp = Math.round(pct / 10) * Math.max(1, Math.round((sc || []).length / 5)); if (xp) App.addXP(xp); save(); return { stars: starsOf(pct), xp, title: `${(sc || []).length} ejercicios resueltos`, msg: '', nextHref: '#lec-' + L.id, nextT: 'Volver a la lección' }; }
      });
    }
    if (mode === 'teoria' || mode === 'practica') {
      const steps = lessonSteps(L, mode);
      if (!steps.length) { location.hash = '#ejercicios-' + L.id; return; }
      return session(v, {
        title: (mode === 'teoria' ? 'Repaso de teoría: ' : 'Repaso de práctica: ') + L.title, back: '#lec-' + L.id, backT: L.title, lessonId: L.id, moreHref: '#ejercicios-' + L.id + '~mas', steps,
        onFinish(pct) { const xp = Math.round(pct / 10) * 2; if (xp) App.addXP(xp); save(); return { stars: starsOf(pct), xp, title: pct >= 90 ? '¡Repaso perfecto!' : 'Repaso completado', msg: '', nextHref: '#lec-' + L.id, nextT: 'Volver a la lección' }; }
      });
    }
    return session(v, {
      title: 'Ejercicios: ' + L.title, back: '#lec-' + L.id, backT: L.title, lessonId: L.id, steps: lessonSteps(L), intro: introOf(L), introT: L.title, recap: recapOf(L), moreHref: '#ejercicios-' + L.id + '~mas',
      onFinish(pct) {
        const ex = S().lessonEx = S().lessonEx || {}; const prev = ex[L.id] || { best: 0, stars: 0, xp: 0 }; const stars = starsOf(pct);
        let xp = Math.round(pct / 10) * 3; if (!prev.stars) xp += 20; else xp = Math.max(0, stars - prev.stars) * 20;
        ex[L.id] = { best: Math.max(prev.best, Math.round(pct)), stars: Math.max(prev.stars, stars), xp: (prev.xp || 0) + xp, t: Date.now() };
        const first = !S().lessons[L.id]; if (first) { S().lessons[L.id] = Date.now(); App.track && App.track('lesson'); }
        if (xp) App.addXP(xp); save(); bump();
        const nx = App.nextInRoute ? App.nextInRoute(L) : null;
        return { stars, xp: xp + (first ? 40 : 0), title: stars === 3 ? '¡Lección dominada!' : stars === 2 ? '¡Muy bien!' : 'Lección completada', msg: L.practice ? 'Para rematar, juega la <b>práctica contra el motor</b> desde la lección.' : '', nextHref: nx ? nx.href : null, nextT: nx ? 'Siguiente: ' + nx.t : '' };
      }
    });
  };

  /* ---------- Examen de nivel: 8 puzles de los temas de esas lecciones ---------- */
  VIEWS.examen = (v, arg) => {
    const [sec, lvl] = String(arg || '').split('~'); const info = App.routeSection ? App.routeSection(sec) : null;
    if (!info) { location.hash = '#rutas'; return; }
    const ls = info.lessons.filter(l => l.level === lvl); const themes = [...new Set(ls.flatMap(themesFor))];
    const [nEx, passPct] = EXIG[LEVEL()].exam;
    const steps = pickPuzzles(themes, nEx, lvl, ls[0] ? ls[0].area : 'tactica', Date.now()).map(p => ({ kind: 'puzzle', p }));
    const LV = { principiante: 'principiante', intermedio: 'intermedio', avanzado: 'avanzado' };
    return session(v, {
      title: `Examen ${LV[lvl] || ''} · ${info.t}`, back: '#' + info.route, backT: info.t, steps,
      onFinish(pct) {
        const key = sec + '~' + lvl, E = S().exams = S().exams || {}, prev = E[key] || { best: 0, stars: 0 };
        const pass = pct >= passPct, stars = pass ? starsOf(pct) : 0;
        let xp = pass ? (prev.stars ? Math.max(0, stars - prev.stars) * 30 : 100) : 10;
        E[key] = { best: Math.max(prev.best, Math.round(pct)), stars: Math.max(prev.stars, stars), t: Date.now() }; App.addXP(xp); save(); bump();
        return { stars, xp, title: pass ? '¡Examen aprobado!' : `Aún no: necesitas el ${passPct} %`, msg: pass ? '' : 'Repasa las lecciones de este nivel y vuelve a intentarlo.', nextHref: '#' + info.route, nextT: 'Volver a la ruta' };
      }
    });
  };

  /* ---------- Examen de una apertura (#apexamen-<id>) ----------
     Teoría: preguntas generadas a partir de los datos de la apertura (siguiente jugada de la línea, nombre de una
     variante, objetivo, ventajas e inconvenientes, planes, trampas). Práctica: jugar de memoria la línea principal y
     las variantes con el bando de la apertura (solo vale la jugada de la teoría). */
  const PL = { p: 0, n: 3, b: 3, r: 1, q: 1, k: 0 };
  function openingQuiz(o, rnd) {
    const pick = (a) => a[Math.floor(rnd() * a.length)];
    const shuf = (a) => a.map(x => [rnd(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
    const OP = (window.OPENINGS || []).filter(x => x.id !== o.id);
    const mk = (q, ok, bad, why) => { bad = [...new Set(bad.filter(b => b && b !== ok))].slice(0, 2); if (bad.length < 2) return null; const opts = shuf([ok, ...bad]); return { q, opts, ok: opts.indexOf(ok), why }; };
    const line = (ms, upto) => { const g = new Chess(); return ms.slice(0, upto).map((m, k) => { const r = g.move(m, { sloppy: true }); return (k % 2 === 0 ? `${k / 2 + 1}.` : '') + `<span class="mv">${r.san}</span>`; }).join(' '); };
    const out = [];
    // 1-3. ¿Qué jugada sigue en la línea principal? (los distractores son jugadas legales que no son teoría en esa posición)
    const ks = shuf([...Array(o.moves.length).keys()].filter(k => k >= 2)).slice(0, 3).sort((a, b) => a - b);
    ks.forEach(k => {
      const g = new Chess(); o.moves.slice(0, k).forEach(m => g.move(m, { sloppy: true }));
      const theo = new Set([o.moves[k], ...(o.variations || []).filter(va => va.moves.slice(0, k).join(' ') === o.moves.slice(0, k).join(' ')).map(va => va.moves[k])].filter(Boolean));
      const ok = g.move(o.moves[k], { sloppy: true }); if (!ok) return; g.undo();
      const cand = g.moves({ verbose: true }).filter(m => !theo.has(m.san) && (PL[m.piece] > 0 || m.piece === 'p' && 'cdef'.includes(m.from[0]) || m.san.startsWith('O-O')) && !m.san.includes('x') === !ok.san.includes('x'));
      const alt = g.moves({ verbose: true }).filter(m => !theo.has(m.san) && m.piece !== 'k');
      const bad = shuf(cand).concat(shuf(alt)).map(m => m.san);
      const q = mk(`En la <b>${esc(o.name)}</b>, tras ${line(o.moves, k)}, ¿qué jugada sigue en la línea principal?`, `<span class="mv">${ok.san}</span>`, bad.map(s => `<span class="mv">${s}</span>`), (o.comments && o.comments[k] ? esc(o.comments[k]) : 'Es la jugada de la línea principal.'));
      if (q) { q.fen = g.fen(); out.push(q); }
    });
    // 4. Nombre de una variante
    const vs = o.variations || [];
    if (vs.length) {
      const va = pick(vs); const others = vs.filter(x => x !== va).map(x => x.name).concat(shuf(OP.flatMap(x => (x.variations || []).map(y => y.name))));
      const q = mk(`¿Cómo se llama esta línea de la ${esc(o.name)}? ${line(va.moves, va.moves.length)}`, esc(va.name), others.map(esc), esc(va.note || 'Es el nombre de la variante.')); if (q) out.push(q);
    }
    // 5. Objetivo (frente al de otras aperturas del mismo bando)
    if (o.goal) { const q = mk(`¿Cuál es el objetivo de la ${esc(o.name)}?`, esc(o.goal), shuf(OP.filter(x => x.side === o.side && x.goal && x.group !== o.group)).map(x => esc(x.goal)), 'Es la idea general que guía todas las jugadas de la apertura.'); if (q) out.push(q); }
    // 6-7. Ventaja e inconveniente (los distractores son del tipo contrario de la misma apertura)
    if ((o.pros || []).length && (o.cons || []).length >= 2) { const q = mk(`¿Cuál de estas es una <b>ventaja</b> de la ${esc(o.name)}?`, esc(pick(o.pros)), shuf(o.cons).map(esc), 'Las otras dos opciones son inconvenientes de esta apertura.'); if (q) out.push(q); }
    if ((o.cons || []).length && (o.pros || []).length >= 2) { const q = mk(`¿Cuál de estas es un <b>inconveniente</b> de la ${esc(o.name)}?`, esc(pick(o.cons)), shuf(o.pros).map(esc), 'Las otras dos opciones son ventajas de esta apertura.'); if (q) out.push(q); }
    // 8. Plan de un bando (distractores: planes del otro bando)
    const me = o.side === 'negras' ? ['plansBlack', 'plansWhite', 'negras'] : ['plansWhite', 'plansBlack', 'blancas'];
    if ((o[me[0]] || []).length && (o[me[1]] || []).length >= 2) { const q = mk(`En la ${esc(o.name)}, ¿cuál es un plan típico de las <b>${me[2]}</b>?`, fixMv(esc(pick(o[me[0]]))), shuf(o[me[1]]).map(x => fixMv(esc(x))), 'Las otras opciones son planes del rival.'); if (q) out.push(q); }
    // 9. Trampa
    if ((o.traps || []).length) { const tr = pick(o.traps); const q = mk(`En la trampa «${esc(tr.name)}» (${line(tr.moves, tr.moves.length)}), ¿qué ocurre?`, fixMv(esc(tr.explanation)), shuf(OP.flatMap(x => x.traps || [])).map(t => fixMv(esc(t.explanation))), 'Es la explicación de esta trampa.'); if (q) out.push(q); }
    return out.map(q => Object.assign(q, { q: q.q }));
  }
  App.openingQuiz = openingQuiz;

  VIEWS.apexamen = (v, id) => {
    const o = (window.OPENINGS || []).find(x => x.id === id); if (!o) { location.hash = '#aperturas'; return; }
    let seed = Date.now() % 2147483647; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    const lv = LEVEL(), [, passPct] = EXIG[lv].exam;
    const nMc = { normal: 5, alta: 7, gm: 9 }[lv], nLines = { normal: 1, alta: 2, gm: 4 }[lv];
    const mc = openingQuiz(o, rnd).slice(0, nMc).map(q => ({ kind: 'mc', q, fen: q.fen || null, o: o.side === 'negras' ? 'black' : 'white' }));
    const side = o.side === 'negras' ? 'b' : 'w';
    const lines = [{ name: 'Línea principal', moves: o.moves, cm: o.comments }].concat((o.variations || []).map(x => ({ name: x.name, moves: x.moves })));
    const prac = lines.slice(0, nLines).map(L => {
      const ask = L.moves.map((_, k) => k).filter(k => (k % 2 === 0) === (side === 'w'));
      return { kind: 'quiz', strict: true, item: { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', line: L.moves, ask, o: side, title: `${o.name}: ${L.name}. Juega las jugadas de las ${o.side} de memoria.`, cm: L.cm || null } };
    });
    return session(v, {
      title: `Examen · ${o.name}`, back: '#ap-' + o.id, backT: o.name, steps: mc.concat(prac),
      intro: `<p>${fixMv(esc(o.summary || ''))}</p><ul><li><b>Teoría:</b> ${mc.length} preguntas sobre la línea, las variantes, los planes y las trampas.</li><li><b>Práctica:</b> ${prac.length} línea${prac.length > 1 ? 's' : ''} para jugar de memoria con las ${esc(o.side)} (solo vale la jugada de la teoría).</li><li>Se aprueba con el ${passPct} %.</li></ul><p class="dim">¿Aún no la conoces? Mira primero la <a href="#claseap-${o.id}">clase paso a paso</a>.</p>`,
      introT: `Examen de la ${o.name}`,
      onFinish(pct) {
        const key = 'ap~' + o.id, E = S().exams = S().exams || {}, prev = E[key] || { best: 0, stars: 0 };
        const pass = pct >= passPct, stars = pass ? starsOf(pct) : 0;
        const xp = pass ? (prev.stars ? Math.max(0, stars - prev.stars) * 20 : 60) : 10;
        E[key] = { best: Math.max(prev.best, Math.round(pct)), stars: Math.max(prev.stars, stars), t: Date.now() }; App.addXP(xp); save(); bump();
        return { stars, xp, title: pass ? '¡Examen aprobado!' : `Aún no: necesitas el ${passPct} %`, msg: pass ? 'Mantén la línea fresca con <b>Entrenar</b> (repetición espaciada).' : 'Repasa la clase paso a paso y vuelve a intentarlo.', nextHref: '#claseap-' + o.id, nextT: 'Repasar la clase' };
      }
    });
  };

  window.Exercises = { themesFor, pickPuzzles, QuizRunner };
})();
