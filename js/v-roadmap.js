/* Roadmap: camino completo desde cero hasta gran maestro, con progreso detectado automáticamente. */
(function () {
  const { $, $$, h, esc, save, toast, VIEWS, themeName } = App;
  const S = () => App.S;

  // Tipos de paso: lesson, theme (puzles resueltos de un tema), rating, win (ganar a Stockfish nivel N), open (apertura en caja N),
  // rush, wood (ciclos Woodpecker), stars (estrellas de Ruta), vision, journal, method / read / manual (marcado a mano)
  const L = (id) => ({ k: 'lesson', id }); const TH = (t, n) => ({ k: 'theme', t, n }); const R = (r) => ({ k: 'rating', r });
  const W = (lvl) => ({ k: 'win', lvl }); const O = (id, box) => ({ k: 'open', id, box }); const M = (id) => ({ k: 'method', id });
  const RD = (txt, href) => ({ k: 'read', txt, href }); const MAN = (txt, href) => ({ k: 'manual', txt, href });
  const STAGES = [
    { n: 'Etapa 0 · Desde cero', elo: '0', goal: 'Conocer el tablero, cómo se mueven las piezas, cómo se gana y cómo se escriben las jugadas.', steps: [
      RD('Reglas: tablero y movimiento de las piezas', '#teoria-reglas'), RD('Reglas especiales: enroque, captura al paso, coronación', '#teoria-reglas'), RD('Jaque, jaque mate, ahogado y tablas', '#teoria-reglas'),
      RD('Notación algebraica', '#teoria-reglas'), { k: 'vision', key: 'coord', n: 8, txt: 'Encuentra 8 casillas en 30 s (Coordenadas)', href: '#vision-coord' },
      L('f-dama-rey'), L('f-torre-rey'), TH('mateIn1', 10)] },
    { n: 'Etapa 1 · Principiante', elo: '400–800', goal: 'Desarrollar las piezas, no regalar material y dar mates sencillos.', steps: [
      L('ap-desarrollo'), L('ap-centro'), L('ap-enroque'), L('ap-errores'), L('t-legal'), L('t-mates1'), L('t-horquilla'), L('t-clavada'),
      TH('mateIn1', 40), TH('piezaColgada', 25), O('italiana', 2), W(2), R(800), M('heisman')] },
    { n: 'Etapa 2 · Novato', elo: '800–1100', goal: 'Ver tácticas de una y dos jugadas y conocer los finales de rey y peón básicos.', steps: [
      L('t-enfilada'), L('t-descubierto'), L('f-cuadrado'), L('f-oposicion'), L('f-rey-activo'), L('m-iniciativa'), L('m-columnas'), L('m-alfil-malo'),
      TH('mateIn2', 30), TH('horquilla', 20), { k: 'rush', n: 10 }, { k: 'stars', n: 5 }, O('caro-kann', 2), O('londres', 2), W(3), R(1000), M('steps')] },
    { n: 'Etapa 3 · Club', elo: '1100–1400', goal: 'Dominar los motivos tácticos, tener un repertorio estable y pensar con método.', steps: [
      L('t-desviacion'), L('t-atraccion'), L('t-sobrecarga'), L('t-eliminacion'), L('t-intermedia'), L('f-alejado'), L('f-ruptura'), L('f-casillas-clave'), L('ap-repertorio'),
      RD('Proceso de pensamiento y lista de comprobación', '#teoria-pensar'), MAN('Elige tu estilo y repertorio en Estrategia', '#estrategia'),
      { k: 'wood', n: 1 }, TH('defensa', 15), W(4), R(1300), M('kotov'), M('woodpecker')] },
    { n: 'Etapa 4 · Intermedio', elo: '1400–1700', goal: 'Entender la estrategia: estructuras de peones, planes y los finales de torres teóricos.', steps: [
      L('m-imbalances'), L('m-iqp'), L('m-cadenas'), L('m-puestos'), L('m-alfiles'), L('m-caballo-alfil'), L('m-cambios'), L('m-planificacion'), L('m-enroques'),
      L('f-lucena'), L('f-philidor'), L('f-tarrasch'), L('f-dama-peon'), L('f-alfil-equivocado'), L('t-rayosx'), L('t-mates2'),
      TH('mateIn3', 15), { k: 'journal', n: 5 }, { k: 'stars', n: 15 }, W(5), R(1600), M('silman'), M('diario')] },
    { n: 'Etapa 5 · Avanzado', elo: '1700–2000', goal: 'Profilaxis, sacrificios posicionales, finales complejos y cálculo de variantes largas.', steps: [
      L('t-molino'), L('t-interferencia'), L('t-griego'), L('m-profilaxis'), L('m-sac-calidad'), L('m-dos-debilidades'), L('m-colgantes'), L('m-maroczy'),
      L('f-triangulacion'), L('f-distinto-color'), L('f-torre-vs-pieza'), L('f-vancura'), L('f-alfil-caballo'),
      TH('sacrificio', 15), TH('quietMove', 10), { k: 'wood', n: 3 }, { k: 'rush', n: 20 }, { k: 'stars', n: 30 }, W(6), R(1900), M('aagaard'), M('nimzowitsch')] },
    { n: 'Etapa 6 · Experto', elo: '2000–2200', goal: 'Teoría de aperturas profunda, análisis propio riguroso y cálculo a ciegas.', steps: [
      O('siciliana-najdorf', 3), O('india-rey', 3), O('gambito-dama-rehusado', 3), O('espanola', 3), { k: 'vision', key: 'calc', n: 20, txt: 'Resuelve 20 ejercicios de Cálculo a ciegas', href: '#vision-calculo' },
      MAN('Revisa con el motor 10 partidas tuyas (Análisis → Cargar)', '#analisis'), TH('mateIn4', 10), W(7), R(2100), M('dvoretsky'), M('calculo'), M('visualizacion')] },
    { n: 'Etapa 7 · Candidato a maestro / Maestro FIDE', elo: '2200–2300', goal: 'Completar todo el temario y competir de forma regular con preparación específica.', steps: [
      { k: 'allLessons' }, { k: 'stars', n: 45 }, O('grunfeld', 4), O('catalana', 4), O('nimzo-india', 4), W(8), R(2300),
      RD('Psicología, gestión del tiempo y preparación de torneos', '#teoria-psico'), M('sovietica'), M('sparring'), M('fisico')] },
    { n: 'Etapa 8 · Maestro Internacional', elo: '2300–2450', goal: 'Precisión cercana a la de un profesional, repertorio amplio con ambos colores.', steps: [
      { k: 'openAll', box: 3, n: 15 }, { k: 'wood', n: 5 }, { k: 'rush', n: 30 }, W(9), R(2400), M('estudios'), M('coaching')] },
    { n: 'Etapa 9 · Gran Maestro', elo: '2450+', goal: 'Dominio total: vencer a la máxima fuerza del motor en posiciones prácticas y mantener la forma.', steps: [
      R(2500), W(10), { k: 'ach', n: 22 }, MAN('Juega torneos con norma y analiza cada partida con tu entrenador') ] }
  ];
  App.ROADMAP = STAGES;

  const lesson = (id) => (window.LESSONS || []).find(l => l.id === id);
  const op = (id) => (window.OPENINGS || []).find(o => o.id === id);
  const met = (id) => (window.METHODS || []).find(m => m.id === id);
  const key = (s, i, j) => `${i}.${j}`;
  function evalStep(st, i, j) {
    const T = S().totals || {}; const man = (S().rm || {})[key(st, i, j)];
    switch (st.k) {
      case 'lesson': { const l = lesson(st.id); return { txt: l ? 'Lección: ' + l.title : st.id, href: '#lec-' + st.id, done: !!S().lessons[st.id] }; }
      case 'theme': { const t = S().pz.theme[st.t] || { ok: 0 }; return { txt: `Resuelve ${st.n} puzles de ${themeName(st.t)}`, href: '#puzles-tema_' + st.t, done: t.ok >= st.n, prog: [t.ok, st.n] }; }
      case 'rating': return { txt: `Alcanza ${st.r} de rating de puzles`, href: '#puzles', done: S().pz.rating >= st.r, prog: [S().pz.rating, st.r] };
      case 'win': { const n = (S().games || []).filter(g => g.res === 'win' && g.lvl >= st.lvl && !g.fen).length; return { txt: `Gana a Stockfish en nivel ${st.lvl} o superior`, href: '#jugar', done: n > 0 }; }
      case 'open': { const o = op(st.id); const b = (S().open[st.id] || {}).box || 0; return { txt: `Apertura ${o ? o.name : st.id}: llega a la caja ${st.box} en Entrenar`, href: '#ap-' + st.id, done: b >= st.box, prog: [b, st.box] }; }
      case 'rush': { const b = Math.max(0, ...Object.values(S().rush.best || {})); return { txt: `Consigue ${st.n} en Contrarreloj`, href: '#contrarreloj', done: b >= st.n, prog: [b, st.n] }; }
      case 'wood': { const c = Math.max(0, ...(S().wood.sets || []).map(s => s.cycles.filter(x => x.end).length)); return { txt: `Completa ${st.n} ciclo(s) Woodpecker con el mismo conjunto`, href: '#woodpecker', done: c >= st.n, prog: [c, st.n] }; }
      case 'stars': { const s = Object.values(S().route || {}).reduce((a, x) => a + x, 0); return { txt: `Consigue ${st.n} estrellas en la Ruta de puzles`, href: '#ruta', done: s >= st.n, prog: [s, st.n] }; }
      case 'vision': { const v = (S().vision || {})[st.key] || 0; return { txt: st.txt, href: st.href, done: v >= st.n, prog: [v, st.n] }; }
      case 'journal': { const n = (S().journal || []).length; return { txt: `Anota ${st.n} errores en tu diario`, href: '#progreso', done: n >= st.n, prog: [n, st.n] }; }
      case 'allLessons': { const n = Object.keys(S().lessons).length, t = (window.LESSONS || []).length; return { txt: 'Completa todas las lecciones', href: '#medio', done: n >= t, prog: [n, t] }; }
      case 'openAll': { const n = Object.values(S().open).filter(o => o.box >= st.box).length; return { txt: `Ten ${st.n} aperturas en caja ${st.box} o más`, href: '#aperturas', done: n >= st.n, prog: [n, st.n] }; }
      case 'ach': { const n = Object.keys(S().ach || {}).length; return { txt: `Desbloquea ${st.n} logros`, href: '#desafios', done: n >= st.n, prog: [n, st.n] }; }
      case 'method': { const m = met(st.id); return { txt: 'Estudia y aplica: ' + (m ? m.name : st.id), href: '#met-' + st.id, done: !!man, manual: true }; }
      default: return { txt: st.txt, href: st.href, done: !!man, manual: true };
    }
  }
  App.roadmapProgress = () => { let d = 0, t = 0, cur = 0; STAGES.forEach((s, i) => { const r = s.steps.map((x, j) => evalStep(x, i, j)); const k = r.filter(x => x.done).length; d += k; t += r.length; if (k === r.length && cur === i) cur = i + 1; }); return { d, t, cur: Math.min(cur, STAGES.length - 1) }; };

  VIEWS.roadmap = (v) => {
    const P = App.roadmapProgress();
    let open = P.cur;
    v.appendChild(h(`<div style="max-width:980px;margin:0 auto"><div class="page-h"><div><h1>Roadmap: de cero a Gran Maestro</h1><p>Todo el temario en orden: reglas, táctica, aperturas, estrategia, finales, cálculo, metodologías y juego práctico. El progreso se detecta solo a partir de lo que haces en la app; los pasos de estudio se marcan a mano.</p></div></div>
      <div class="card" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><b style="color:var(--fg)">Estás en: ${esc(STAGES[P.cur].n)}</b><span class="dim">${P.d} / ${P.t} pasos</span></div><div class="meter" style="margin-top:10px;height:12px"><div style="width:${P.d / P.t * 100}%"></div></div></div>
      <div id="stages" style="display:grid;gap:10px"></div></div>`));
    const draw = () => {
      $('#stages', v).innerHTML = STAGES.map((s, i) => {
        const r = s.steps.map((x, j) => evalStep(x, i, j)); const k = r.filter(x => x.done).length; const full = k === r.length;
        return `<div class="card" style="padding:0;overflow:hidden;${i === P.cur ? 'outline:2px solid var(--accent)' : ''}">
          <button data-s="${i}" style="all:unset;cursor:pointer;display:flex;align-items:center;gap:14px;padding:14px 18px;width:100%;box-sizing:border-box">
            <span style="width:38px;height:38px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:900;color:#fff;background:${full ? 'var(--green)' : i === P.cur ? 'var(--accent)' : 'var(--bg3)'}">${full ? '✓' : i}</span>
            <span style="flex:1;min-width:0"><b style="color:var(--fg);font-size:16px">${esc(s.n)}</b><span class="dim" style="display:block;font-size:13px">Elo ${esc(s.elo)} · ${k}/${r.length} pasos</span></span>
            <span class="dim">${open === i ? '－' : '＋'}</span></button>
          ${open === i ? `<div style="padding:0 18px 16px"><p class="muted" style="margin:0 0 10px">${esc(s.goal)}</p><div style="display:grid;gap:6px">${r.map((x, j) => `<div style="display:flex;align-items:center;gap:10px;background:var(--bg3);padding:8px 10px;border-radius:6px">
              <span style="width:22px;height:22px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:12px;color:#fff;background:${x.done ? 'var(--green)' : 'var(--hover)'}">${x.done ? '✓' : ''}</span>
              <a href="${x.href || '#roadmap'}" style="flex:1;min-width:0;color:${x.done ? 'var(--fg3)' : 'var(--fg)'};text-decoration:${x.done ? 'line-through' : 'none'}">${esc(x.txt)}</a>
              ${x.prog && !x.done ? `<span class="dim" style="font-size:12.5px;white-space:nowrap">${x.prog[0]} / ${x.prog[1]}</span>` : ''}
              ${x.manual ? `<button class="btn sm ${x.done ? 'ghost' : ''}" data-m="${i}.${j}">${x.done ? 'Desmarcar' : 'Hecho'}</button>` : ''}</div>`).join('')}</div></div>` : ''}</div>`;
      }).join('');
      $$('[data-s]', v).forEach(b => b.onclick = () => { open = open === +b.dataset.s ? -1 : +b.dataset.s; draw(); });
      $$('[data-m]', v).forEach(b => b.onclick = () => { S().rm = S().rm || {}; const k = b.dataset.m; if (S().rm[k]) delete S().rm[k]; else { S().rm[k] = Date.now(); App.addXP && App.addXP(20); } save(); draw(); });
    };
    draw();
  };
})();
