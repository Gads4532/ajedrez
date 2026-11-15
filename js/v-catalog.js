/* «Todas las lecciones»: cada lección (y cada apertura) por separado, sin orden obligatorio, con buscador y filtros
   por parte, nivel y estado. El Roadmap y las Rutas siguen igual; esta página es para ir directo a cualquier tema. */
(function () {
  const { VIEWS, $, $$, h, esc, fixMv } = App;
  const S = () => App.S;
  const PARTS = [
    ['basico', 'Aprender a jugar', ['basico']], ['principios', 'Principios de apertura', ['apertura-principios']], ['aperturas', 'Aperturas', null],
    ['tactica', 'Táctica', ['tactica']], ['medio', 'Estrategia y medio juego', ['estrategia', 'medio']], ['ataque', 'Ataque', ['ataque']],
    ['finales', 'Finales', ['final']], ['partidas', 'Partidas magistrales', ['partidas']]
  ];
  const LV = { principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado' };
  const lvlTag = (l) => l ? `<span class="tag ${l === 'principiante' ? 'g' : l === 'intermedio' ? 'y' : 'r'}">${LV[l] || l}</span>` : '';

  // Todos los elementos de estudio, uno por fila
  const items = () => {
    const out = [];
    for (const [key, name, areas] of PARTS) {
      if (!areas) {
        (window.OPENINGS || []).forEach(o => { const b = (S().open[o.id] || {}).box || 0, ex = (S().exams || {})['ap~' + o.id] || {}; out.push({ part: key, partT: name, id: o.id, t: o.name, sub: `${o.eco || ''} · ${o.summary || ''}`, lvl: o.level, done: b >= 2 || ex.stars > 0, stars: Math.max(ex.stars || 0, b >= 5 ? 3 : b >= 3 ? 2 : b >= 2 ? 1 : 0), cls: '#claseap-' + o.id, exam: '#apexamen-' + o.id, href: '#ap-' + o.id, ex: '#ap-' + o.id, exT: 'Aprender y entrenar' }); });
        continue;
      }
      (window.LESSONS || []).filter(l => areas.includes(l.area)).forEach(l => { const e = (S().lessonEx || {})[l.id]; out.push({ part: key, partT: name, id: l.id, t: l.title, sub: l.summary || '', lvl: l.level, done: !!S().lessons[l.id], stars: e ? e.stars : S().lessons[l.id] ? 1 : 0, href: '#lec-' + l.id, cls: '#clase-' + l.id, ex: '#ejercicios-' + l.id, exT: 'Ejercicios', more: '#ejercicios-' + l.id + '~mas' }); });
    }
    return out;
  };

  VIEWS.lecciones = (v) => {
    const st = Object.assign({ part: 'todas', lvl: 'todos', state: 'todas', q: '' }, S().settings.catalog || {});
    v.appendChild(h(`<div><div class="page-h"><div><h1>Todas las lecciones</h1><p>Cada tema por separado: abre cualquier lección o apertura cuando quieras, sin tener que hacer antes las anteriores. Cada tema tiene su clase paso a paso, su práctica y su examen (las lecciones, además, ejercicios ilimitados).</p></div></div>
      <div class="card" style="display:grid;gap:10px;margin-bottom:16px">
        <input type="text" id="cq" placeholder="Buscar un tema: horquilla, Lucena, Siciliana, peón aislado…" style="width:100%" value="${esc(st.q)}">
        <div class="chips" id="cpart"><button class="chip" data-v="todas">Todas las partes</button>${PARTS.map(p => `<button class="chip" data-v="${p[0]}">${p[1]}</button>`).join('')}</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap"><div class="chips" id="clvl"><button class="chip" data-v="todos">Todos los niveles</button>${Object.entries(LV).map(([k, t]) => `<button class="chip" data-v="${k}">${t}</button>`).join('')}</div>
        <div class="chips" id="cstate"><button class="chip" data-v="todas">Todas</button><button class="chip" data-v="pendientes">Pendientes</button><button class="chip" data-v="hechas">Completadas</button></div></div>
      </div><div id="clist"></div></div>`));
    const paint = () => {
      S().settings.catalog = st; App.save();
      [['#cpart', 'part'], ['#clvl', 'lvl'], ['#cstate', 'state']].forEach(([sel, k]) => $$(sel + ' .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === st[k])));
      const q = st.q.toLowerCase();
      const list = items().filter(x => (st.part === 'todas' || x.part === st.part) && (st.lvl === 'todos' || x.lvl === st.lvl) && (st.state === 'todas' || (st.state === 'hechas' ? x.done : !x.done)) && (!q || (x.t + ' ' + x.sub).toLowerCase().includes(q)));
      const groups = PARTS.map(p => [p, list.filter(x => x.part === p[0])]).filter(g => g[1].length);
      $('#clist', v).innerHTML = list.length ? groups.map(([p, xs]) => `<h2 class="sec-t" style="margin:18px 0 10px;font-size:13px">${esc(p[1])} · ${xs.filter(x => x.done).length}/${xs.length}</h2><div class="cat-list">${xs.map(x => `
        <div class="cat-row ${x.done ? 'done' : ''}"><a class="cat-main" href="${x.href}"><span class="cat-st">${x.done ? '✓' : ''}</span><span class="cat-tx"><b>${esc(x.t)}</b><small>${fixMv(esc(x.sub.length > 120 ? x.sub.slice(0, 118) + '…' : x.sub))}</small></span></a>
          <span class="cat-meta">${lvlTag(x.lvl)}${x.stars ? `<span class="cat-stars">${'★'.repeat(x.stars)}${'☆'.repeat(3 - x.stars)}</span>` : ''}</span>
          <span class="cat-acts"><a class="btn sm" href="${x.cls}" title="Clase paso a paso">▶ Clase</a><a class="btn sm" href="${x.href}">${x.part === 'aperturas' ? 'Abrir' : 'Lección'}</a>${x.part === 'aperturas' ? `<a class="btn sm pri" href="${x.exam}">Examen</a>` : `<a class="btn sm pri" href="${x.ex}">${x.exT}</a><a class="btn sm" href="${x.more}" title="Ejercicios ilimitados">∞</a>`}</span></div>`).join('')}</div>`).join('') : '<p class="muted">Ningún tema coincide con la búsqueda.</p>';
    };
    $('#cq', v).oninput = (e) => { st.q = e.target.value; paint(); };
    [['#cpart', 'part'], ['#clvl', 'lvl'], ['#cstate', 'state']].forEach(([sel, k]) => $$(sel + ' .chip', v).forEach(c => c.onclick = () => { st[k] = c.dataset.v; paint(); }));
    paint();
  };
})();
