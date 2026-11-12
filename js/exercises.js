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

  // Puzles de unos temas, cerca del nivel del alumno; primero los no resueltos.
  function pickPuzzles(themes, n, level, area, seed) {
    const R = S().pz.rating || 800, adj = { principiante: -100, intermedio: 50, avanzado: 200 }[level] || 0;
    let target = R + adj; if (area === 'basico') target = Math.min(target, 850);
    const solved = S().pz.solved || {};
    let pool = (window.PUZZLES || []).filter(p => (p.themes || []).some(t => themes.includes(t)));
    if (pool.length < n) pool = pool.concat((window.PUZZLES || []).filter(p => (p.themes || []).includes(AREA_DEF[area] ? AREA_DEF[area][0] : 'ventajaMaterial')));
    const score = (p) => Math.abs(p.rating - target) + (solved[p.id] && solved[p.id].ok ? 600 : 0);
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
    const advance = async () => {
      while (idx < item.line.length && !asks.has(idx)) { await wait(550); const m = g.move(item.line[idx], { sloppy: true }); if (!m) break; playSound(m); board.sync(); idx++; }
      if (idx >= item.line.length) { done = true; board.opts.interactive = false; cb.onDone(shown ? 0 : (errors || helped) ? 0.5 : 1); return; }
      board.opts.movable = g.turn(); board.opts.interactive = true; cb.onTurn && cb.onTurn(idx);
    };
    board.opts.onUserMove = async ({ from, to, promotion }) => {
      if (done || !asks.has(idx)) return false;
      const before = g.fen(); const exp = lineMove(); const t = new Chess(before); const um = t.move({ from, to, promotion: promotion || 'q' }); if (!um) return false;
      const ok = exp && (norm(um.san) === norm(exp.san) || t.in_checkmate());
      if (ok) { g.move(um.san); playSound(um); board.sync(); board.setArrows([]); board.badge(to, 'correct'); idx++; board.opts.interactive = false; await wait(350); board.badge(null); cb.onGood && cb.onGood(); return advance().then(() => true); }
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
        await wait(300); g.move(exp.san); playSound(exp); board.sync(); board.setLastMove([exp.from, exp.to]); idx++; return advance().then(() => true);
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
      <div class="sp-body"><div class="ex-dots" id="exDots"></div><div id="exHead"></div><div id="exFb"></div></div>
      <div class="sp-foot" id="exFoot"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const dots = () => { $('#exDots', v).innerHTML = steps.map((s, k) => `${k && s.kind !== 'mc' && steps[k - 1].kind === 'mc' ? '<i class="sep"></i>' : ''}<span class="${k < scores.length ? (scores[k] === 1 ? 'ok' : scores[k] > 0 ? 'half' : 'bad') : k === i ? 'cur' : ''}" title="${esc(s.kind === 'mc' ? 'Teoría' : s.kind === 'quiz' ? 'Posición' : 'Puzle')}"></span>`).join(''); };
    const fb = (cls, ic, t, sub) => { $('#exFb', v).innerHTML = `<div class="fb ${cls}" style="animation:none"><span class="dot">${ic}</span><div>${t}${sub ? `<small>${sub}</small>` : ''}</div></div>`; };
    const foot = (html) => { $('#exFoot', v).innerHTML = html; };
    const nMc = steps.filter(x => x.kind === 'mc').length, nPr = steps.length - nMc;
    const label = (kind) => kind === 'mc' ? `PARTE 1 · TEORÍA · PREGUNTA ${i + 1} DE ${nMc}` : `${nMc ? 'PARTE 2 · ' : ''}PRÁCTICA · EJERCICIO ${i - nMc + 1} DE ${nPr} · ${kind === 'quiz' ? 'POSICIÓN DE LA LECCIÓN' : 'PUZLE DEL TEMA'}`;
    // Al pasar de la teoría a la práctica, una pantalla intermedia con el resultado de la teoría.
    const next = () => {
      i++;
      if (i < steps.length && nMc && i === nMc && steps[i - 1].kind === 'mc') {
        const ok = scores.slice(0, nMc).reduce((a, b) => a + b, 0);
        $('#exHead', v).innerHTML = `<div class="ex-res"><div style="font-size:40px">📖</div><h3>Teoría terminada: ${ok} de ${nMc}</h3><div class="dim">${ok === nMc ? '¡Todas correctas!' : ok >= nMc / 2 ? 'Bien. Repasa en la lección las que fallaste.' : 'Conviene releer la lección antes de seguir.'}</div><p class="muted" style="margin:10px 0 0">Ahora la <b>parte práctica</b>: ${nPr} ejercicios en el tablero.</p></div>`;
        $('#exFb', v).innerHTML = '';
        foot(`<a class="btn" href="${esc(opt.back)}">📖 Releer la lección</a>${opt.lessonId ? `<a class="btn" href="#ejercicios-${opt.lessonId}~teoria">↻ Repetir teoría</a>` : ''}<button class="btn pri" id="exGo" style="margin-left:auto">Empezar la práctica →</button>`);
        $('#exGo', v).onclick = load; return;
      }
      if (i < steps.length) load(); else finish();
    };
    const stepDone = (sc) => { scores.push(sc); dots(); fb(sc === 1 ? 'win' : sc > 0 ? 'ok' : 'info', sc === 1 ? '★' : '✓', sc === 1 ? '¡Perfecto!' : sc > 0 ? 'Resuelto' : 'Solución vista', sc === 1 ? 'Sin errores ni ayudas.' : sc > 0 ? 'Con algún error o pista.' : 'Repasa la idea y vuelve a intentarlo más tarde.'); foot(`<button class="btn pri" id="exNext" style="margin-left:auto">${i + 1 < steps.length ? 'Siguiente →' : 'Ver resultado'}</button>`); $('#exNext', v).onclick = next; };
    const load = () => {
      dots(); $('#exFb', v).innerHTML = ''; const st = steps[i];
      if (st.kind === 'mc') {
        // Pregunta teórica de triple elección: 1 punto si se acierta a la primera, 0 si no.
        const q = st.q, order = [0, 1, 2].sort(() => Math.random() - 0.5);
        board.game = null; board.opts.interactive = false; board.setArrows([]); board.badge(null); board.setLastMove(null);
        if (st.fen) { board.setOrientation(st.o || 'white'); board.setPosition(st.fen, false); }
        $('#exHead', v).innerHTML = `<div class="dim k">${label('mc')}</div><h3 class="ex-t">${fixMv(q.q)}</h3><div class="mc-opts">${order.map((k, j) => `<button class="mc-opt" data-k="${k}"><span class="mc-l">${'ABC'[j]}</span><span>${fixMv(q.opts[k])}</span></button>`).join('')}</div>`;
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
          onGood: () => { $('#exFb', v).innerHTML = ''; }, onAlt: (u, e) => fb('ok', '👍', `${esc(san(u))} también es buena`, `La de la lección es ${esc(san(e))}: seguimos con ella.`)
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
          onDone: (clean) => { const sc = runner && runner.failed && helped === 'sol' ? 0 : clean ? 1 : 0.5; App.ratePuzzle(p, !!clean); save(); stepDone(sc); }
        });
        $('#exHint', v).onclick = () => { helped = true; runner.hint(); }; $('#exSol', v).onclick = () => { helped = 'sol'; runner.solution(); };
      }
    };
    const finish = () => {
      const pct = steps.length ? scores.reduce((a, b) => a + b, 0) / steps.length * 100 : 100;
      const res = opt.onFinish(pct, scores);
      $('#exHead', v).innerHTML = `<div class="ex-res"><div class="stars">${[1, 2, 3].map(k => `<span class="${k <= res.stars ? 'on' : ''}">★</span>`).join('')}</div><h3>${esc(res.title)}</h3><div class="dim">${pct.toFixed(0)}% de acierto · <b style="color:var(--green)">+${res.xp} XP</b></div></div>`;
      $('#exFb', v).innerHTML = res.msg ? `<p class="muted">${res.msg}</p>` : '';
      foot(`<button class="btn" id="exAgain">↻ Repetir todo</button>${opt.lessonId ? `<a class="btn" href="#ejercicios-${opt.lessonId}~teoria">↻ Solo teoría</a><a class="btn" href="#ejercicios-${opt.lessonId}~practica">↻ Solo práctica</a>` : ''}${opt.moreHref ? `<a class="btn" href="${esc(opt.moreHref)}">🧩 Practicar más (10 puzles)</a>` : ''}${res.nextHref ? `<a class="btn pri" href="${esc(res.nextHref)}" style="margin-left:auto">${esc(res.nextT)}</a>` : `<a class="btn pri" href="${esc(opt.back)}" style="margin-left:auto">Volver</a>`}`);
      $('#exAgain', v).onclick = () => { if (opt.lessonId && location.hash !== '#ejercicios-' + opt.lessonId) location.hash = '#ejercicios-' + opt.lessonId; else App.route(); };
      board.opts.interactive = false; Sound.end();
    };
    load();
    return () => { board.opts.onUserMove = null; };
  }

  const starsOf = (pct) => (pct >= 90 ? 3 : pct >= 70 ? 2 : 1);
  const lessonSteps = (L, mode) => {
    const quiz = (window.EXERCISES && EXERCISES[L.id]) || [];
    const nPz = quiz.length >= 3 ? 3 : 5;
    const seed = Math.floor(Date.now() / 864e5) + L.id.length * 31;
    const strict = L.area === 'basico' || L.area === 'partidas';
    const mc = ((window.LESSON_QUIZ || {})[L.id] || []).map(q => ({ kind: 'mc', q, fen: (L.positions && L.positions[0] && L.positions[0].fen) || null, o: L.positions && L.positions[0] && L.positions[0].orientation }));
    if (mode === 'teoria') return mc;
    const practica = [...quiz.map(item => ({ kind: 'quiz', item, strict })), ...pickPuzzles(themesFor(L), nPz, L.level, L.area, mode === 'practica' ? Date.now() : seed).map(p => ({ kind: 'puzzle', p }))];
    return mode === 'practica' ? practica : [...mc, ...practica];
  };
  const poolSize = (L) => { const th = themesFor(L); return (window.PUZZLES || []).filter(p => (p.themes || []).some(t => th.includes(t))).length; };
  App.lessonExercises = (L) => { const q = (window.EXERCISES && EXERCISES[L.id]) || []; return { mc: ((window.LESSON_QUIZ || {})[L.id] || []).length, quiz: q.length, puzzles: q.length >= 3 ? 3 : 5, practice: !!L.practice, pool: poolSize(L) }; };

  VIEWS.ejercicios = (v, arg) => {
    const mode = (/~(mas|teoria|practica)$/.exec(arg || '') || [])[1] || '', more = mode === 'mas', id = String(arg || '').replace(/~(mas|teoria|practica)$/, '');
    const L = (window.LESSONS || []).find(l => l.id === id); if (!L) { location.hash = '#rutas'; return; }
    if (more) {
      // Tanda extra: 10 puzles del tema (primero los no resueltos), sin límite de tandas.
      return session(v, {
        title: 'Más práctica: ' + L.title, back: '#lec-' + L.id, backT: L.title, moreHref: '#ejercicios-' + L.id + '~mas',
        steps: pickPuzzles(themesFor(L), 10, L.level, L.area, Date.now()).map(p => ({ kind: 'puzzle', p })),
        onFinish(pct) { const xp = Math.round(pct / 10) * 2; if (xp) App.addXP(xp); save(); return { stars: starsOf(pct), xp, title: pct >= 90 ? '¡Excelente tanda!' : 'Tanda completada', msg: '', nextHref: '#lec-' + L.id, nextT: 'Volver a la lección' }; }
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
      title: 'Ejercicios: ' + L.title, back: '#lec-' + L.id, backT: L.title, lessonId: L.id, steps: lessonSteps(L), moreHref: '#ejercicios-' + L.id + '~mas',
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
    const steps = pickPuzzles(themes, 8, lvl, ls[0] ? ls[0].area : 'tactica', Date.now()).map(p => ({ kind: 'puzzle', p }));
    const LV = { principiante: 'principiante', intermedio: 'intermedio', avanzado: 'avanzado' };
    return session(v, {
      title: `Examen ${LV[lvl] || ''} · ${info.t}`, back: '#' + info.route, backT: info.t, steps,
      onFinish(pct) {
        const key = sec + '~' + lvl, E = S().exams = S().exams || {}, prev = E[key] || { best: 0, stars: 0 };
        const pass = pct >= 75, stars = pass ? starsOf(pct) : 0;
        let xp = pass ? (prev.stars ? Math.max(0, stars - prev.stars) * 30 : 100) : 10;
        E[key] = { best: Math.max(prev.best, Math.round(pct)), stars: Math.max(prev.stars, stars), t: Date.now() }; App.addXP(xp); save(); bump();
        return { stars, xp, title: pass ? '¡Examen aprobado!' : 'Aún no: necesitas el 75 %', msg: pass ? '' : 'Repasa las lecciones de este nivel y vuelve a intentarlo.', nextHref: '#' + info.route, nextT: 'Volver a la ruta' };
      }
    });
  };

  window.Exercises = { themesFor, pickPuzzles, QuizRunner };
})();
