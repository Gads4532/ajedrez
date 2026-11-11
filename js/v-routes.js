/* Rutas de aprendizaje: una ruta por sección (como un camino de niveles), con lecciones en orden de dificultad,
   estrellas según los ejercicios y un examen al final de cada nivel. Centro de rutas en #rutas.
   Documentación: docs/EJERCICIOS.md */
(function () {
  const { VIEWS, $, $$, h, esc } = App;
  const S = () => App.S;
  const LEVELS = ['principiante', 'intermedio', 'avanzado'];
  const LVL_T = { principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado' };
  const SECTIONS = [
    { key: 'basico', route: 'basico', t: 'Aprender a jugar', ic: '♟', areas: ['basico'], d: 'Desde cero: piezas, reglas y primeras jugadas.' },
    { key: 'principios', route: 'principios', t: 'Principios de apertura', ic: '🚀', areas: ['apertura-principios'], d: 'Desarrollo, centro y rey seguro.' },
    { key: 'aperturas', route: 'aperturas', t: 'Aperturas', ic: '📖', openings: true, d: 'Tu repertorio, de las aperturas sencillas a la teoría avanzada.' },
    { key: 'tactica', route: 'tactica', t: 'Táctica', ic: '⚔️', areas: ['tactica'], d: 'Todos los motivos tácticos y patrones de mate.' },
    { key: 'medio', route: 'medio', t: 'Estrategia y medio juego', ic: '🧭', areas: ['estrategia', 'medio'], d: 'Estructuras, planes y casillas.' },
    { key: 'ataque', route: 'ataque', t: 'Ataque', ic: '🔥', areas: ['ataque'], d: 'Sacrificios y ataque al rey.' },
    { key: 'finales', route: 'finales', t: 'Finales', ic: '♜', areas: ['final'], d: 'De los mates básicos a los finales de torres.' },
    { key: 'partidas', route: 'partidas', t: 'Partidas magistrales', ic: '🏛', areas: ['partidas'], d: 'Las grandes partidas, jugada a jugada.' }
  ];
  const lvlIdx = (l) => Math.max(0, LEVELS.indexOf(l));
  const lessonsOf = (sec) => (window.LESSONS || []).filter(l => sec.areas.includes(l.area)).map((l, i) => ({ l, i })).sort((a, b) => lvlIdx(a.l.level) - lvlIdx(b.l.level) || a.i - b.i).map(x => x.l);
  const openingsOf = () => (window.OPENINGS || []).map((o, i) => ({ o, i })).sort((a, b) => lvlIdx(a.o.level) - lvlIdx(b.o.level) || a.i - b.i).map(x => x.o);

  // Nodos de una sección: lecciones (o aperturas) por nivel y un examen al final de cada nivel.
  function nodes(sec) {
    const out = [];
    if (sec.openings) {
      openingsOf().forEach(o => { const b = (S().open[o.id] || {}).box || 0; out.push({ kind: 'open', id: o.id, t: o.name, lvl: o.level || 'intermedio', href: '#ap-' + o.id, done: b >= 2, stars: b >= 5 ? 3 : b >= 3 ? 2 : b >= 2 ? 1 : 0 }); });
      return out;
    }
    const ls = lessonsOf(sec);
    LEVELS.forEach(lv => {
      const g = ls.filter(l => (l.level || 'intermedio') === lv); if (!g.length) return;
      g.forEach(l => { const ex = (S().lessonEx || {})[l.id]; out.push({ kind: 'lesson', id: l.id, t: l.title, lvl: lv, href: '#lec-' + l.id, done: !!S().lessons[l.id], stars: ex ? ex.stars : S().lessons[l.id] ? 1 : 0 }); });
      if (sec.key !== 'partidas' && g.length >= 2) { const e = (S().exams || {})[sec.key + '~' + lv]; out.push({ kind: 'exam', id: sec.key + '~' + lv, t: `Examen de nivel ${LVL_T[lv].toLowerCase()}`, lvl: lv, href: `#examen-${sec.key}~${lv}`, done: !!(e && e.stars), stars: e ? e.stars : 0 }); }
    });
    return out;
  }
  const progress = (sec) => { const ns = nodes(sec), d = ns.filter(n => n.done).length; return { n: ns.length, done: d, pct: ns.length ? d / ns.length * 100 : 0, stars: ns.reduce((s, x) => s + (x.stars || 0), 0), next: ns.find(n => !n.done) }; };

  App.routeSection = (key) => { const s = SECTIONS.find(x => x.key === key); return s ? Object.assign({ lessons: s.areas ? lessonsOf(s) : [] }, s) : null; };
  App.nextInRoute = (L) => { const sec = SECTIONS.find(s => s.areas && s.areas.includes(L.area)); if (!sec) return null; const ns = nodes(sec); const k = ns.findIndex(n => n.id === L.id); const nx = ns.slice(k + 1).find(n => !n.done) || ns.find(n => !n.done); return nx ? { href: nx.href, t: nx.t } : null; };

  // Ruta en forma de camino (zigzag) con los nodos de cada nivel.
  const ZZ = [0, 34, 56, 34, 0, -34, -56, -34];
  App.routeHTML = (key) => {
    const sec = SECTIONS.find(s => s.key === key); if (!sec) return '';
    const ns = nodes(sec), cur = ns.find(n => !n.done), P = progress(sec);
    let html = `<div class="rt-head"><div><b>${P.done} de ${P.n}</b> pasos · ${P.stars} ★</div><div class="meter" style="flex:1;max-width:320px"><div style="width:${P.pct}%"></div></div>${cur ? `<a class="btn pri sm" href="${cur.href}">${cur.done ? 'Repasar' : 'Continuar'}: ${esc(cur.t.length > 34 ? cur.t.slice(0, 32) + '…' : cur.t)}</a>` : '<span class="tag g">¡Ruta completada!</span>'}</div><div class="rt">`;
    let k = 0, lastLvl = null;
    ns.forEach(n => {
      if (n.lvl !== lastLvl) { const g = ns.filter(x => x.lvl === n.lvl); html += `<div class="rt-lvl"><span>${LVL_T[n.lvl] || n.lvl}</span><small>${g.filter(x => x.done).length}/${g.length}</small></div>`; lastLvl = n.lvl; k = 0; }
      const st = n.done ? 'done' : n === cur ? 'cur' : 'todo';
      const icon = n.kind === 'exam' ? '🏆' : n.done ? '✓' : n === cur ? '▶' : (n.kind === 'open' ? '📖' : '•');
      html += `<a class="rt-node ${st} ${n.kind}" href="${n.href}" style="--x:${ZZ[k++ % ZZ.length]}px" title="${esc(n.t)}"><span class="c">${icon}</span><span class="lb">${esc(n.t)}${n.stars ? `<span class="st">${'★'.repeat(n.stars)}${'☆'.repeat(3 - n.stars)}</span>` : ''}</span></a>`;
    });
    return html + '</div>';
  };

  VIEWS.rutas = (v) => {
    const L = App.level ? App.level() : { lvl: 1, into: 0, need: 100 };
    v.appendChild(h(`<div><div class="page-h"><div><h1>Rutas de aprendizaje</h1><p>Un camino para cada parte del ajedrez. Cada lección tiene ejercicios: complétalos para avanzar, ganar estrellas y XP. Al final de cada nivel, un examen.</p></div></div>
      <div class="card xp-card"><div class="xp-lvl">${L.lvl}</div><div style="flex:1"><b>Nivel ${L.lvl}</b> · ${S().xp || 0} XP en total<div class="meter" style="margin-top:6px"><div style="width:${L.into / L.need * 100}%"></div></div><div class="dim" style="font-size:12.5px;margin-top:4px">${L.need - L.into} XP para el nivel ${L.lvl + 1}</div></div></div>
      <div class="grid g2" style="margin-top:16px">${SECTIONS.map(s => { const P = progress(s); return `<a class="tile rt-card" href="#${s.route}"><div style="display:flex;gap:12px;align-items:center"><span class="rt-ic">${(App.LINE_IC || {})[s.route] || ''}</span><div style="flex:1;min-width:0"><b>${esc(s.t)}</b><div class="dim" style="font-size:13px">${esc(s.d)}</div></div><span class="dim" style="font-weight:800">${P.pct.toFixed(0)}%</span></div><div class="meter" style="margin-top:10px"><div style="width:${P.pct}%"></div></div><div class="dim" style="font-size:12.5px;margin-top:6px">${P.done}/${P.n} pasos · ${P.stars} ★${P.next ? ` · Siguiente: ${esc(P.next.t)}` : ' · ¡Completada!'}</div></a>`; }).join('')}</div>
      <div class="card" style="margin-top:16px"><h3 style="font-weight:900;margin-bottom:6px">Cómo se gana XP</h3><div class="prose" style="font-size:14px"><ul><li>Completar los ejercicios de una lección: <b>40 XP</b> la primera vez + hasta <b>30 XP</b> según el acierto + <b>20 XP</b> por cada estrella nueva al repetir.</li><li>Aprobar un examen de nivel: <b>100 XP</b> (y <b>30 XP</b> por estrella nueva).</li><li>Puzles, partidas, aperturas entrenadas, visión y misiones diarias también dan XP.</li></ul></div></div></div>`));
  };

  window.Routes = { SECTIONS, nodes, progress };
})();
