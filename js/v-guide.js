/* Clase guiada paso a paso: cada lección y cada apertura se presenta como una clase. En cada paso el tablero muestra
   la posición o la jugada y el panel explica la teoría; se avanza con «Siguiente» (o las flechas del teclado) y se
   puede reproducir sola. Al final lleva a la práctica (ejercicios) y al examen.
   Rutas: #clase-<idLección> y #claseap-<idApertura>. Documentado en docs/CLASES.md. */
(function () {
  const { $, $$, h, esc, fixMv, san, save, VIEWS, boardBox, playSound, proscons } = App;
  const S = () => App.S;
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const ul = (a) => a && a.length ? `<ul>${a.map(x => `<li>${fixMv(esc(x))}</li>`).join('')}</ul>` : '';
  const dots = (n) => `<span style="letter-spacing:2px;color:var(--yellow)">${'●'.repeat(n || 0)}<span style="color:var(--line)">${'●'.repeat(5 - (n || 0))}</span></span>`;
  const PN = { p: 'Peón', n: 'Caballo', b: 'Alfil', r: 'Torre', q: 'Dama', k: 'Rey' };
  // Descripción de una jugada con pieza y coordenadas: «Caballo de g1 a f3».
  const sayMove = (m) => m.flags.includes('k') ? 'Enroque corto' : m.flags.includes('q') ? 'Enroque largo'
    : `${PN[m.piece]} de <span class="mv">${m.from}</span> ${m.captured ? 'captura en' : 'a'} <span class="mv">${m.to}</span>${m.promotion ? ' y corona' : ''}`;
  const moveNo = (fen, sanTxt) => { const [, turn, , , , n] = fen.split(' '); return `${n}.${turn === 'b' ? '..' : ''} ${san(sanTxt)}`; };

  // Recorre una línea y devuelve un paso por jugada. Cada paso guarda la posición, la última jugada y su explicación.
  function lineSteps(fen, moves, comments, opt = {}) {
    const g = new Chess(fen || START), out = []; let prev = null;
    (moves || []).forEach((mv, k) => {
      if (k < (opt.skip || 0)) { const r = g.move(mv, { sloppy: true }); prev = r; return; }
      const f0 = g.fen(), r = g.move(mv, { sloppy: true }); if (!r) return;
      const tags = window.Purpose ? Purpose.of(f0, r, prev, opt.ctx) : []; prev = r;
      const c = comments ? comments[k] : '';
      out.push({
        fen: g.fen(), last: [r.from, r.to], m: r, kind: 'move', sec: opt.sec,
        title: `${opt.label ? opt.label + ' · ' : ''}${esc(moveNo(f0, r.san))}`,
        html: `<div class="cl-say">${sayMove(r)}${r.san.includes('#') ? ' — <b>jaque mate</b>' : r.san.includes('+') ? ' con jaque' : ''}.</div>${tags.length ? `<div class="ptags">${Purpose.chips(tags)}</div>` : ''}${c ? `<p>${fixMv(esc(c))}</p>` : ''}${tags.length ? Purpose.chips(tags, true).replace(/^.*?(<div class="pdesc">)/, '$1') : ''}${!c && !tags.length ? '<p class="dim">Jugada de la línea: fíjate en qué casillas controla ahora la pieza.</p>' : ''}`
      });
    });
    return { steps: out, fen: g.fen() };
  }

  // Divide el HTML de una lección en apartados por cada <h4>.
  function sections(html) {
    const parts = String(html || '').split(/<h4>/i); const out = [];
    if (parts[0].replace(/<[^>]+>/g, '').trim()) out.push({ t: 'Introducción', body: parts[0] });
    parts.slice(1).forEach(p => { const i = p.search(/<\/h4>/i); out.push({ t: p.slice(0, i).replace(/<[^>]+>/g, ''), body: p.slice(i + 5) }); });
    return out;
  }

  /* ---------- Pasos de una lección ---------- */
  function lessonClass(L) {
    const ps = L.positions || [], secs = sections(L.html), st = [];
    const first = ps[0] ? ps[0].fen : START, o0 = ps[0] && ps[0].orientation || 'white';
    const E = App.lessonExercises ? App.lessonExercises(L) : null;
    st.push({ fen: first, o: o0, kind: 'intro', sec: 'Inicio', title: esc(L.title), html: `<p>${fixMv(esc(L.summary || ''))}</p><div class="cl-plan"><b>En esta clase:</b><ul>${secs.length ? `<li>${secs.length} apartado${secs.length > 1 ? 's' : ''} de teoría</li>` : ''}${ps.length ? `<li>${ps.length} posici${ps.length > 1 ? 'ones' : 'ón'} explicada${ps.length > 1 ? 's' : ''} jugada a jugada</li>` : ''}${L.keyPoints && L.keyPoints.length ? '<li>Resumen de los puntos clave</li>' : ''}<li>Después: práctica${E ? ` (${E.mc} preguntas y ${E.quiz + E.puzzles} ejercicios)` : ''} y examen</li></ul></div><p class="dim">Avanza con <b>Siguiente</b> o con la flecha → del teclado.</p>` });
    let curFen = first, curO = o0;
    const n = Math.max(secs.length, ps.length);
    for (let i = 0; i < n; i++) {
      const s = secs[i];
      if (s) st.push({ fen: curFen, o: curO, kind: 'theory', sec: s.t, title: esc(s.t), html: `<div class="prose">${fixMv(s.body)}</div>` });
      const p = ps[i];
      if (p) {
        curO = p.orientation || 'white';
        const turn = new Chess(p.fen).turn();
        st.push({ fen: p.fen, o: curO, arrows: p.arrows || [], hl: p.highlights || [], kind: 'pos', sec: `Posición ${i + 1}`, title: `Posición ${i + 1}`, html: `<p>${fixMv(esc(p.caption || ''))}</p>${p.line && p.line.length ? `<p class="dim">Juegan las <b>${turn === 'w' ? 'blancas' : 'negras'}</b>. Antes de avanzar, piensa qué jugarías tú.</p>` : ''}` });
        if (p.line && p.line.length) { const r = lineSteps(p.fen, p.line, p.comments, { sec: `Posición ${i + 1}` }); r.steps.forEach(x => x.o = curO); st.push(...r.steps); curFen = r.fen; } else curFen = p.fen;
      }
    }
    (L.drills || []).slice(0, 2).forEach((d, j) => {
      const turn = new Chess(d.fen).turn();
      st.push({ fen: d.fen, o: turn === 'w' ? 'white' : 'black', kind: 'pos', sec: `Ejemplo práctico ${j + 1}`, title: `Ejemplo práctico ${j + 1}`, html: `<p>${fixMv(esc(d.caption || ''))}</p><p class="dim">Juegan las <b>${turn === 'w' ? 'blancas' : 'negras'}</b>.</p>` });
      if (d.line) st.push(...lineSteps(d.fen, d.line, d.comments, { sec: `Ejemplo práctico ${j + 1}` }).steps.map(x => Object.assign(x, { o: turn === 'w' ? 'white' : 'black' })));
    });
    if (L.keyPoints && L.keyPoints.length) st.push({ fen: curFen, o: curO, kind: 'theory', sec: 'Resumen', title: 'Puntos clave', html: `<div class="prose">${ul(L.keyPoints)}</div>${proscons(L.pros, L.cons)}` });
    const ex = `#ejercicios-${L.id}`, route = App.areaRoute ? App.areaRoute(L.area) : 'lecciones';
    st.push({ fen: curFen, o: curO, kind: 'end', sec: 'Práctica', title: 'Clase terminada', html: `<p>Ya viste toda la teoría. Ahora toca <b>practicar</b>: primero las preguntas de teoría y después los ejercicios en el tablero.</p><div class="cl-acts"><a class="btn pri" href="${ex}">▶ Ir a la práctica</a><a class="btn" href="${ex}~mas">∞ Ejercicios ilimitados</a><a class="btn" href="#lec-${L.id}">📖 Ver la lección completa</a>${L.level && L.area !== 'partidas' ? `<a class="btn" href="#examen-${route}~${L.level}">📝 Examen del nivel</a>` : ''}</div>` });
    return { title: L.title, back: '#lec-' + L.id, backT: 'Lección', steps: st, key: L.id };
  }

  /* ---------- Pasos de una apertura ---------- */
  function openingClass(o) {
    const ctx = window.Purpose && Purpose.ctxOf ? Purpose.ctxOf(o) : null, or = o.side === 'negras' ? 'black' : 'white', st = [];
    st.push({ fen: START, o: or, kind: 'intro', sec: 'Inicio', title: `${esc(o.name)} <span class="dim">${esc(o.eco || '')}</span>`, html: `${o.style ? `<div class="tags">${o.style.map(s => `<span class="tag g">${esc(s)}</span>`).join('')}</div>` : ''}<p>${fixMv(esc(o.summary || ''))}</p><div class="cl-plan"><b>En esta clase:</b><ul><li>La línea principal, jugada a jugada (${o.moves.length} jugadas)</li><li>Ideas, planes y estructura</li>${(o.variations || []).length ? `<li>${o.variations.length} variante${o.variations.length > 1 ? 's' : ''}</li>` : ''}${(o.traps || []).length ? `<li>${o.traps.length} trampa${o.traps.length > 1 ? 's' : ''}</li>` : ''}<li>Después: entrenamiento y examen de la apertura</li></ul></div><div class="kv"><span>Juegas con</span><b>${esc(o.side || '')}</b></div><div class="kv"><span>Riesgo</span>${dots(o.riskLevel)}</div><div class="kv"><span>Teoría</span>${dots(o.theoryLoad)}</div>` });
    if (o.goal || o.profile) st.push({ fen: START, o: or, kind: 'theory', sec: 'La idea', title: 'El objetivo de la apertura', html: `${o.goal ? `<p><b>${fixMv(esc(o.goal))}</b></p>` : ''}${o.profile ? `<p><b>¿Para quién?</b> ${esc(o.profile)}</p>` : ''}${o.keyPieces ? `<p><b>Piezas clave:</b> ${fixMv(esc(o.keyPieces))}</p>` : ''}` });
    const main = lineSteps(START, o.moves, o.comments, { ctx, sec: 'Línea principal', label: 'Línea principal' });
    main.steps.forEach(x => x.o = or); st.push(...main.steps);
    const endFen = main.fen;
    if (o.structures) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Ideas', title: 'La estructura de peones', html: `<p>${fixMv(esc(o.structures))}</p>` });
    if (o.ideas && o.ideas.length) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Ideas', title: 'Ideas clave', html: ul(o.ideas) });
    if (o.plansWhite && o.plansWhite.length) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Ideas', title: 'Planes de las blancas', html: ul(o.plansWhite) });
    if (o.plansBlack && o.plansBlack.length) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Ideas', title: 'Planes de las negras', html: ul(o.plansBlack) });
    if ((o.middlegame && o.middlegame.length) || (o.endgames && o.endgames.length)) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Ideas', title: 'Medio juego y finales típicos', html: `${o.middlegame ? `<h4>Medio juego</h4>${ul(o.middlegame)}` : ''}${o.endgames ? `<h4>Finales</h4>${ul(o.endgames)}` : ''}` });
    (o.variations || []).forEach((va, j) => {
      let k = 0; while (k < va.moves.length && k < o.moves.length && va.moves[k] === o.moves[k]) k++;
      const g = new Chess(); va.moves.slice(0, k).forEach(m => g.move(m, { sloppy: true }));
      st.push({ fen: g.fen(), o: or, kind: 'theory', sec: `Variante ${j + 1}`, title: `Variante: ${esc(va.name)}`, html: `${k ? `<p class="dim">Las primeras ${k} jugadas son las de la línea principal; la variante se separa aquí.</p>` : ''}${va.note ? `<p>${fixMv(esc(va.note))}</p>` : ''}` });
      st.push(...lineSteps(START, va.moves, null, { ctx, skip: k, sec: `Variante ${j + 1}`, label: esc(va.name) }).steps.map(x => Object.assign(x, { o: or })));
    });
    (o.traps || []).forEach((tr, j) => {
      st.push({ fen: START, o: or, kind: 'theory', sec: `Trampa ${j + 1}`, title: `⚠ Trampa: ${esc(tr.name)}`, html: '<p>Mira la secuencia jugada a jugada y busca dónde está el error.</p>' });
      const r = lineSteps(START, tr.moves, null, { ctx, sec: `Trampa ${j + 1}`, label: 'Trampa' }); r.steps.forEach(x => x.o = or); st.push(...r.steps);
      st.push({ fen: r.fen, o: or, kind: 'theory', sec: `Trampa ${j + 1}`, title: `La explicación: ${esc(tr.name)}`, html: `<p>${fixMv(esc(tr.explanation || ''))}</p>` });
    });
    if ((o.pros && o.pros.length) || (o.cons && o.cons.length)) st.push({ fen: endFen, o: or, kind: 'theory', sec: 'Balance', title: 'Ventajas e inconvenientes', html: proscons(o.pros, o.cons) + (o.players ? `<p><b>Jugadores de referencia:</b> ${esc(o.players.join(', '))}</p>` : '') });
    st.push({ fen: endFen, o: or, kind: 'end', sec: 'Práctica', title: 'Clase terminada', html: `<p>Ya conoces la teoría de la <b>${esc(o.name)}</b>. Ahora practícala moviendo tú las piezas y, cuando la domines, haz el examen: preguntas de teoría y jugar las líneas de memoria.</p><div class="cl-acts"><a class="btn pri" href="#apexamen-${o.id}">📝 Examen de la apertura</a><a class="btn" href="#ap-${o.id}">♟ Aprender y entrenar</a></div>` });
    return { title: o.name, back: '#ap-' + o.id, backT: 'Apertura', steps: st, key: 'ap:' + o.id };
  }

  /* ---------- Visor de la clase ---------- */
  function classView(v, C) {
    const bb = boardBox({ interactive: false }); const board = bb.board; board.opts.interactive = false;
    const layout = h('<div class="play cl-view"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head" style="flex-direction:column;align-items:flex-start;gap:4px"><a href="${C.back}" class="dim" style="font-size:13px;text-decoration:none">← ${esc(C.backT)}</a><span>Clase: ${esc(C.title)}</span></div>
      <div class="sp-body"><div class="cl-prog"><div class="t"><span id="clSec"></span><span id="clN" class="dim"></span></div><div class="bar"><div id="clBar"></div></div></div><select id="clIdx" class="cl-idx"></select><div id="clBox"></div></div>
      <div class="sp-foot"><button class="btn" id="clPrev">◀ Anterior</button><button class="btn" id="clAuto" title="Reproducir sola">▶ Auto</button><button class="btn pri" id="clNext" style="margin-left:auto">Siguiente ▶</button></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const st = C.steps, P = S().clases = S().clases || {};
    // Índice: el primer paso de cada apartado
    const idx = []; st.forEach((x, k) => { if (!idx.length || idx[idx.length - 1].sec !== x.sec) idx.push({ sec: x.sec, k }); });
    $('#clIdx', v).innerHTML = idx.map(x => `<option value="${x.k}">${esc(x.sec)}</option>`).join('');
    let i = 0, auto = null;
    const go = (k, anim) => {
      k = Math.max(0, Math.min(st.length - 1, k)); const fwd = k === i + 1; i = k; const s = st[i];
      if (board.opts.orientation !== (s.o || 'white')) board.setOrientation(s.o || 'white');
      board.setPosition(s.fen, !!anim && fwd); board.setLastMove(s.last || null); board.setArrows(s.arrows || []);
      $$('.hl', board.el).forEach(e => e.classList.remove('hl')); (s.hl || []).forEach(q => board.squares[q] && board.squares[q].classList.add('hl'));
      const t = new Chess(s.fen); board.setCheck && board.setCheck(t.in_check() ? (() => { for (const r of t.board()) for (const p of r) if (p && p.type === 'k' && p.color === t.turn()) return p.square; return null; })() : null);
      if (fwd && s.m) playSound(s.m);
      $('#clSec', v).textContent = s.sec; $('#clN', v).textContent = `Paso ${i + 1} de ${st.length}`; $('#clBar', v).style.width = ((i + 1) / st.length * 100) + '%';
      let cur = idx[0].k; for (const x of idx) if (x.k <= i) cur = x.k; $('#clIdx', v).value = cur;
      $('#clBox', v).innerHTML = `<div class="cl-step cl-${s.kind}">${s.kind === 'move' ? '' : `<div class="cl-owl">${App.COACH_SVG || ''}</div>`}<div class="cl-txt"><h3>${s.title}</h3>${s.html}</div></div>`;
      $('#clPrev', v).disabled = i === 0; $('#clNext', v).textContent = i === st.length - 1 ? '✓ Terminada' : 'Siguiente ▶'; $('#clNext', v).disabled = i === st.length - 1;
      const pr = P[C.key] || { max: 0 }; if (i > (pr.max || 0)) { pr.max = i; pr.n = st.length; if (i === st.length - 1) pr.done = Date.now(); P[C.key] = pr; save(); }
    };
    const stopAuto = () => { clearTimeout(auto); auto = null; $('#clAuto', v).textContent = '▶ Auto'; };
    const tick = () => { if (i >= st.length - 1 || !document.body.contains(panel)) { stopAuto(); return; } go(i + 1, true); const s = st[i]; const len = $('#clBox', v).innerText.length; auto = setTimeout(tick, s.kind === 'move' ? Math.max(1800, len * 35) : Math.max(4000, len * 45)); };
    $('#clPrev', v).onclick = () => { stopAuto(); go(i - 1); };
    $('#clNext', v).onclick = () => { stopAuto(); go(i + 1, true); };
    $('#clAuto', v).onclick = () => { if (auto) stopAuto(); else { $('#clAuto', v).textContent = '■ Pausa'; tick(); } };
    $('#clIdx', v).onchange = (e) => { stopAuto(); go(+e.target.value); };
    const key = (e) => { if (e.target.closest('input,textarea,select')) return; if (e.key === 'ArrowRight') { stopAuto(); go(i + 1, true); e.preventDefault(); } if (e.key === 'ArrowLeft') { stopAuto(); go(i - 1); e.preventDefault(); } };
    document.addEventListener('keydown', key);
    const pr = P[C.key]; go(pr && pr.max && !pr.done && pr.max < st.length - 1 ? pr.max : 0);
    if (pr && pr.max && !pr.done && pr.max < st.length - 1) App.toast(`Continúas donde lo dejaste (paso ${pr.max + 1}).`);
    return () => { stopAuto(); document.removeEventListener('keydown', key); };
  }

  VIEWS.clase = (v, id) => { const L = (window.LESSONS || []).find(l => l.id === id); if (!L) { location.hash = '#lecciones'; return; } return classView(v, lessonClass(L)); };
  VIEWS.claseap = (v, id) => { const o = (window.OPENINGS || []).find(x => x.id === id); if (!o) { location.hash = '#aperturas'; return; } return classView(v, openingClass(o)); };
  App.classSteps = { lesson: lessonClass, opening: openingClass };
})();
