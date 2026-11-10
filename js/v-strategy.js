/* Estrategia: constructor de repertorio por estilo, familias de aperturas, elementos del juego y comparador. */
(function () {
  const { $, $$, h, esc, save, fixMv, toast, VIEWS, statBar, lineText } = App;
  const S = () => App.S;
  const OP = (id) => OPENINGS.find(o => o.id === id);
  const dots = (n, c) => `<span title="${n}/5" style="letter-spacing:2px;color:${c}">${'●'.repeat(n || 0)}<span style="color:var(--line)">${'●'.repeat(5 - (n || 0))}</span></span>`;
  const opCard = (o) => o ? `<a class="tile" href="#ap-${o.id}"><div style="display:flex;justify-content:space-between;gap:8px"><span class="eco">${esc(o.eco)}</span><span class="tags">${(o.style || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</span></div><h3>${esc(o.name)}</h3><p>${esc(o.goal || o.summary || '')}</p>${statBar(o.stats)}<div style="display:flex;justify-content:space-between;font-size:12.5px" class="dim"><span>Riesgo ${dots(o.riskLevel, 'var(--red)')}</span><span>Teoría ${dots(o.theoryLoad, 'var(--yellow)')}</span></div></a>` : '';
  const ul = (a) => a && a.length ? `<ul>${a.map(x => `<li>${fixMv(esc(x))}</li>`).join('')}</ul>` : '';

  const QUIZ = [
    { q: '¿Qué tipo de posición disfrutas más?', a: [['Ataques al rey con sacrificios', { agresivo: 2, tactico: 1 }], ['Maniobras lentas y mejoras pequeñas', { posicional: 2, solido: 1 }], ['Posiciones seguras donde casi no pueda perder', { solido: 2 }], ['Desequilibrios y contraataque', { contraatacante: 2, tactico: 1 }]] },
    { q: 'Cuando tu rival te ataca, tú…', a: [['Contraataco en el otro flanco', { contraatacante: 2, agresivo: 1 }], ['Defiendo con precisión y espero su error', { solido: 2, posicional: 1 }], ['Busco una táctica que lo cambie todo', { tactico: 2 }], ['Simplifico hacia un final', { posicional: 1, solido: 1, universal: 1 }]] },
    { q: '¿Cuánto tiempo quieres dedicar a memorizar teoría?', a: [['Poco: prefiero ideas y sistemas', { universal: 2, solido: 1 }], ['Lo necesario', { posicional: 1, contraatacante: 1 }], ['Mucho: me gusta la teoría afilada', { agresivo: 1, tactico: 1, contraatacante: 1 }]] },
    { q: '¿Con qué te sientes más cómodo en los finales?', a: [['Los evito: quiero decidir antes', { agresivo: 2, tactico: 1 }], ['Me encantan: ahí gano partidas', { posicional: 2, solido: 1 }], ['Depende de la posición', { universal: 2 }]] },
    { q: '¿Qué jugador admiras más?', a: [['Tal / Kaspárov', { agresivo: 2, tactico: 1 }], ['Capablanca / Carlsen', { posicional: 2, universal: 1 }], ['Petrosián / Kramnik', { solido: 2, posicional: 1 }], ['Fischer / Korchnói', { contraatacante: 2, universal: 1 }]] }
  ];

  VIEWS.estrategia = (v, arg) => {
    const tabs = [['constructor', 'Constructor de estrategia'], ['estilos', 'Estilos de apertura'], ['elementos', 'Elementos del juego'], ['comparador', 'Comparador']];
    let tab = tabs.some(t => t[0] === arg) ? arg : 'constructor';
    v.appendChild(h(`<div><div class="page-h"><div><h1>Estrategia</h1><p>Arma tu estrategia completa: elige un estilo, obtén un repertorio coherente (blancas, contra 1.e4 y contra 1.d4), entiende el objetivo de cada familia de aperturas y cómo conectar la apertura con los planes de medio juego y los finales a los que lleva.</p></div></div>
      <div class="chips" id="st" style="margin-bottom:16px">${tabs.map(([k, t]) => `<button class="chip" data-v="${k}">${t}</button>`).join('')}</div><div id="sb"></div></div>`));
    const R = {
      constructor() {
        const B = window.STRATEGY_BUILDER || []; let sel = S().settings.style || (B[0] && B[0].id);
        $('#sb', v).innerHTML = `<div class="card" style="margin-bottom:16px"><h3 style="font-weight:900;margin-bottom:6px">¿No sabes cuál es tu estilo? Test rápido</h3><div id="quiz"></div></div>
          <div class="chips" id="bp" style="margin-bottom:16px">${B.map(b => `<button class="chip" data-v="${b.id}">${esc(b.name)}</button>`).join('')}</div><div id="bd"></div>`;
        // test
        const score = {}; let qi = 0;
        const q = () => {
          if (qi >= QUIZ.length) { const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0]; if (best) { sel = best[0]; paint(); const b = B.find(x => x.id === sel); $('#quiz', v).innerHTML = `<div class="fb win"><span class="dot">★</span><div>Tu perfil: ${esc(b ? b.name : sel)}<small>Abajo tienes tu repertorio recomendado. Puedes cambiar de perfil cuando quieras.</small></div></div><button class="btn sm" id="qr" style="margin-top:8px">Repetir test</button>`; $('#qr', v).onclick = () => { qi = 0; for (const k in score) delete score[k]; q(); }; } return; }
          const Q = QUIZ[qi];
          $('#quiz', v).innerHTML = `<div class="dim" style="font-size:13px;font-weight:800">PREGUNTA ${qi + 1}/${QUIZ.length}</div><div style="font-weight:800;margin:4px 0 10px">${esc(Q.q)}</div><div class="grid g2" style="gap:8px">${Q.a.map((a, i) => `<button class="btn sm" data-a="${i}" style="white-space:normal;text-align:left;justify-content:flex-start">${esc(a[0])}</button>`).join('')}</div>`;
          $$('[data-a]', $('#quiz', v)).forEach(b => b.onclick = () => { const w = Q.a[+b.dataset.a][1]; for (const k in w) score[k] = (score[k] || 0) + w[k]; qi++; q(); });
        }; q();
        const paint = () => {
          $$('#bp .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === sel));
          const b = B.find(x => x.id === sel); if (!b) return; const mine = S().settings.style === b.id;
          $('#bd', v).innerHTML = `<div class="card" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><h2 style="font-size:22px;font-weight:900">Estilo ${esc(b.name)}</h2><button class="btn ${mine ? '' : 'pri'} sm" id="sset">${mine ? '✓ Es mi estilo' : 'Adoptar este estilo'}</button></div>
              <p class="muted">${esc(b.description)}</p>
              <div class="grid g3"><div><div class="sec-t">Plan de medio juego</div><div class="prose" style="font-size:14px">${ul(b.plans)}</div></div><div><div class="sec-t">Actitud en los finales</div><p class="muted" style="font-size:14px">${esc(b.endgameAttitude || '')}</p><div class="sec-t">Referentes</div><div class="tags" style="margin-top:6px">${(b.famous || []).map(f => `<span class="tag">${esc(f)}</span>`).join('')}</div></div><div><div class="sec-t">Qué entrenar más</div><div class="prose" style="font-size:14px">${ul(b.training)}</div></div></div></div>
            ${[['Con blancas', b.white], ['Contra 1.e4', b.vsE4], ['Contra 1.d4', b.vsD4]].map(([t, ids]) => `<h3 class="sec-t" style="margin:18px 0 10px;font-size:13px">${t}</h3><div class="grid g3">${(ids || []).map(id => opCard(OP(id))).join('')}</div>`).join('')}
            <div class="card" style="margin-top:18px"><h3 style="font-weight:900;margin-bottom:6px">Cómo conectar las fases de la partida</h3><div class="prose" style="font-size:14.5px"><p><b>1. Apertura:</b> no memorices jugadas sueltas; aprende el <b>objetivo</b> de cada línea (ver la ficha de cada apertura) y la estructura de peones que deja.</p><p><b>2. Medio juego:</b> la estructura de peones dicta el plan. Repasa los “planes típicos” de cada apertura de tu repertorio y las lecciones de Medio juego relacionadas (peón aislado, Carlsbad, cadenas de peones, enroques opuestos…).</p><p><b>3. Final:</b> conoce a qué finales tiende tu repertorio y qué bando suele estar mejor; así sabrás cuándo cambiar piezas. Practica esos finales contra el motor en la sección Finales.</p><p><b>4. Evaluación continua:</b> en cada momento compara los elementos del juego (pestaña “Elementos del juego”): quien tenga más elementos a favor debe actuar; quien tenga menos, buscar compensación o defenderse con profilaxis.</p></div></div>`;
          $('#sset', v).onclick = () => { S().settings.style = b.id; save(); toast('Estilo guardado'); paint(); };
        };
        $$('#bp .chip', v).forEach(c => c.onclick = () => { sel = c.dataset.v; paint(); }); paint();
      },
      estilos() {
        const L = window.OPENING_STYLES || [];
        $('#sb', v).innerHTML = L.map((s, i) => `<details class="acc" ${i === 0 ? 'open' : ''}><summary>${esc(s.name)}</summary><div>
          <div class="comment-box" style="margin-bottom:12px"><b>Objetivo:</b> ${fixMv(esc(s.purpose || ''))}</div>
          <div class="prose">${fixMv(s.html || '')}</div>
          ${s.forWhom ? `<p class="muted"><b style="color:var(--fg)">Para quién:</b> ${esc(s.forWhom)}</p>` : ''}
          ${App.proscons(s.pros, s.cons)}
          <div class="sec-t" style="margin:12px 0 8px">Aperturas de esta familia</div><div class="grid g3">${(s.examples || []).map(id => opCard(OP(id))).join('')}</div></div></details>`).join('');
      },
      elementos() {
        const E = window.STRATEGY_ELEMENTS || [];
        $('#sb', v).innerHTML = `<p class="muted" style="margin-top:0">Steinitz enseñó que la ventaja se compone de pequeños elementos y Silman lo sistematizó como “desequilibrios”. Antes de hacer un plan, haz inventario: ¿qué elementos tengo a favor y cuáles mi rival? Tu plan debe <b>potenciar los tuyos y neutralizar los suyos</b>.</p>
          <div class="grid g2">${E.map(e => `<div class="card"><h3 style="font-weight:900;font-size:17px;margin-bottom:6px">${esc(e.name)}</h3><div class="prose" style="font-size:14.5px">${fixMv(e.html || '')}</div>
            <div class="pc-list"><div class="pros"><h4>Si lo tienes a favor</h4>${ul(e.exploit)}</div><div class="cons"><h4>Si lo tienes en contra</h4>${ul(e.defend)}</div></div>
            ${e.tip ? `<div class="comment-box" style="margin-top:10px;min-height:0">💡 ${fixMv(esc(e.tip))}</div>` : ''}
            ${(e.openings || []).length ? `<div class="tags" style="margin-top:10px">${e.openings.map(id => OP(id) ? `<a class="tag b" href="#ap-${id}" style="text-decoration:none">${esc(OP(id).name)}</a>` : '').join('')}</div>` : ''}</div>`).join('')}</div>`;
      },
      comparador() {
        let key = 'name', dir = 1;
        const cols = [['name', 'Apertura'], ['side', 'Bando'], ['style', 'Estilo'], ['white', 'Blancas %'], ['draw', 'Tablas %'], ['black', 'Negras %'], ['riskLevel', 'Riesgo'], ['theoryLoad', 'Teoría']];
        const val = (o, k) => k === 'white' || k === 'draw' || k === 'black' ? (o.stats || {})[k] : k === 'style' ? (o.style || []).join(', ') : o[k];
        const draw = () => {
          const rows = OPENINGS.slice().sort((a, b) => { const x = val(a, key), y = val(b, key); return (x > y ? 1 : x < y ? -1 : 0) * dir; });
          $('#sb', v).innerHTML = `<p class="muted" style="margin-top:0">Presiona en una columna para ordenar. Las estadísticas son aproximaciones de bases de partidas magistrales.</p><div class="card tscroll" style="padding:0"><table class="t"><tr>${cols.map(([k, t]) => `<th style="cursor:pointer;white-space:nowrap" data-k="${k}">${t}${key === k ? (dir > 0 ? ' ▲' : ' ▼') : ''}</th>`).join('')}</tr>${rows.map(o => `<tr><td><a href="#ap-${o.id}" style="color:var(--fg);font-weight:800;text-decoration:none">${esc(o.name)}</a><div class="eco">${esc(o.eco)}</div></td><td>${esc(o.side)}</td><td>${esc((o.style || []).join(', '))}</td><td>${(o.stats || {}).white}</td><td>${(o.stats || {}).draw}</td><td>${(o.stats || {}).black}</td><td>${dots(o.riskLevel, 'var(--red)')}</td><td>${dots(o.theoryLoad, 'var(--yellow)')}</td></tr>`).join('')}</table></div>`;
          $$('th[data-k]', v).forEach(th => th.onclick = () => { if (key === th.dataset.k) dir = -dir; else { key = th.dataset.k; dir = 1; } draw(); });
        };
        draw();
      }
    };
    const paint = () => { $$('#st .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === tab)); R[tab](); };
    $$('#st .chip', v).forEach(c => c.onclick = () => { tab = c.dataset.v; paint(); }); paint();
  };
})();
