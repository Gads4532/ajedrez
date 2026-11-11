/* Vista «Mi análisis»: recoge el análisis de todas las partidas, detecta tendencias y propone un plan
   de mejora con lecciones y ejercicios. Cálculos en js/insights.js; documentación en docs/ANALISIS.md. */
(function () {
  const { VIEWS, $, $$, h, esc, toast, fixMv, themeName } = App;
  const S = () => App.S;
  const f1 = (x) => (x == null ? '—' : x.toFixed(1));
  const f0 = (x) => (x == null ? '—' : x.toFixed(0));
  const delta = (a, b, inv) => { if (a == null || b == null) return ''; const d = a - b; if (Math.abs(d) < 0.05) return '<span class="dim">＝</span>'; const good = inv ? d < 0 : d > 0; return `<span style="color:var(--${good ? 'green' : 'red'});font-weight:800">${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}</span>`; };
  const bar = (pct, col) => `<div class="meter" style="height:8px"><div style="width:${Math.max(0, Math.min(100, pct || 0))}%;background:${col || 'var(--green)'}"></div></div>`;

  VIEWS.mianalisis = (v) => {
    let cancelled = false, running = false;
    const root = h('<div></div>'); v.appendChild(root);

    const runQueue = async () => {
      if (running) return; running = true; cancelled = false;
      const eng = App.getEngine();
      while (!cancelled) {
        const q = Insights.pending(); if (!q.length) break;
        const gm = q[0], total = q.length;
        const st = $('#iaQ', root); if (st) st.innerHTML = `<div class="fb info" style="animation:none"><span class="dot">⏳</span><div>Analizando tus partidas: quedan ${total}<small id="iaP">preparando…</small></div><button class="btn sm" id="iaStop" style="margin-left:auto">Pausar</button></div>`;
        const sb = $('#iaStop', root); if (sb) sb.onclick = () => { cancelled = true; eng.stop(); };
        const r = await Insights.analyzeGame(gm, eng, { depth: 12, isCancelled: () => cancelled, onStep: (i, n) => { const p = $('#iaP', root); if (p) p.textContent = `posición ${i} de ${n}`; } });
        if (!r) break;
        App.save(); paint();
      }
      running = false; if (!cancelled) paint(); else paintQueue();
    };
    const paintQueue = () => {
      const st = $('#iaQ', root); if (!st) return; const q = Insights.pending().length;
      st.innerHTML = q ? `<div class="fb info" style="animation:none"><span class="dot">▶</span><div>${q} ${q > 1 ? 'partidas' : 'partida'} sin analizar<small>El análisis se hace en tu dispositivo con Stockfish.</small></div><button class="btn pri sm" id="iaGo" style="margin-left:auto">Analizar</button></div>` : '';
      const gb = $('#iaGo', root); if (gb) gb.onclick = runQueue;
    };

    const chart = (accs) => {
      if (accs.length < 2) return '<p class="dim" style="margin:0">Necesitas al menos 2 partidas analizadas para ver la evolución.</p>';
      const W = 600, H = 150, lo = Math.max(0, Math.min(...accs) - 8), hi = Math.min(100, Math.max(...accs) + 5);
      const x = (i) => 10 + i / (accs.length - 1) * (W - 20), y = (a) => H - 14 - (a - lo) / (hi - lo || 1) * (H - 28);
      const ma = accs.map((_, i) => { const w = accs.slice(Math.max(0, i - 4), i + 1); return w.reduce((p, q) => p + q, 0) / w.length; });
      const line = (arr) => arr.map((a, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(a).toFixed(1)}`).join(' ');
      return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;background:var(--bg3);border-radius:6px"><path d="${line(accs)}" fill="none" stroke="#8b8987" stroke-width="1.5"/>${accs.map((a, i) => `<circle cx="${x(i)}" cy="${y(a)}" r="2.5" fill="#c3c2c1"/>`).join('')}<path d="${line(ma)}" fill="none" stroke="#81b64c" stroke-width="3" stroke-linecap="round"/><text x="12" y="14" fill="#8b8987" font-size="11">${hi.toFixed(0)}%</text><text x="12" y="${H - 4}" fill="#8b8987" font-size="11">${lo.toFixed(0)}%</text></svg><div class="dim" style="font-size:12.5px;margin-top:4px">Gris: precisión de cada partida · Verde: media móvil de 5 partidas</div>`;
    };

    const paint = () => {
      const st = Insights.stats(), dg = Insights.diagnose(st), M = Insights.MOTIF;
      const sec = (t) => `<h2 class="sec-t" style="margin:22px 0 10px;font-size:13px">${t}</h2>`;
      let body = '';
      if (st.n < 1) body = `<div class="card"><h3 style="font-weight:900;margin-bottom:6px">Aún no hay partidas analizadas</h3><p class="muted" style="margin:0">Juega una partida en <a href="#jugar">Jugar</a> o importa las tuyas aquí abajo. Cada partida se analiza con Stockfish y se guarda su resumen para detectar tus tendencias.</p></div>`;
      else {
        const top = dg.filter(d => d.href).slice(0, 3);
        body = `
        <div class="grid g4 ia-kpi">
          <div class="card"><div class="dim k">PARTIDAS ANALIZADAS</div><div class="big-num">${st.n}</div><div class="dim s">${f0(st.score)}% de los puntos</div></div>
          <div class="card"><div class="dim k">PRECISIÓN (ÚLT. 10)</div><div class="big-num">${f1(st.meanLast)}</div><div class="s">${delta(st.meanLast, st.meanPrev)} <span class="dim">vs. 10 anteriores</span></div></div>
          <div class="card"><div class="dim k">RENDIMIENTO ESTIMADO</div><div class="big-num">${st.eloLast ? Math.round(st.eloLast / 25) * 25 : '—'}</div><div class="dim s">orientativo, por precisión</div></div>
          <div class="card"><div class="dim k">ERRORES GRAVES / PARTIDA</div><div class="big-num">${f1(st.blLast)}</div><div class="s">${delta(st.blLast, st.blPrev, true)} <span class="dim">vs. 10 anteriores</span></div></div>
        </div>

        ${sec('Diagnóstico: lo que dicen tus partidas')}
        <div class="card">${dg.length ? `<ol class="ia-diag">${dg.map(d => `<li>${fixMv(d.t)}</li>`).join('')}</ol>` : '<p class="muted" style="margin:0">Con 3 o más partidas analizadas aparecerán aquí tus patrones: fase más débil, errores repetidos, aperturas problemáticas…</p>'}</div>

        ${top.length ? `${sec('Tu plan de mejora: aprender y practicar')}
        <div class="grid g3">${top.map((d, i) => { const lid = /^#lec-(.+)$/.exec(d.href); const done = lid && S().lessons[lid[1]]; const th = d.ex && S().pz.theme[d.ex]; return `<div class="card ia-plan"><div class="dim k">PRIORIDAD ${i + 1}</div><div class="prose" style="font-size:14px">${fixMv(d.t)}</div>
            <a class="btn sm" href="${esc(d.href)}">📖 Aprender: ${esc(d.lbl)}${done ? ' ✓' : ''}</a>
            ${d.ex ? `<a class="btn pri sm" href="#puzles-tema_${esc(d.ex)}">🧩 Practicar: 10 puzles de ${esc(themeName(d.ex))}</a><div class="dim" style="font-size:12.5px">${th ? `Llevas ${th.n} resueltos de este tema (${Math.round(th.ok / th.n * 100)}% de acierto).` : 'Aún no has hecho puzles de este tema.'}</div>` : ''}${d.ex === 'piezaColgada' ? '<a class="btn sm" href="#vision-captura">👁 Visión: ejercicio de Captura</a>' : ''}</div>`; }).join('')}</div>
        <p class="muted" style="font-size:13px;margin:8px 0 0">El plan se recalcula con cada partida nueva: cuando un error deja de repetirse, baja de prioridad y entra el siguiente.</p>` : ''}

        ${sec('Evolución de tu precisión')}<div class="card">${chart(st.accs)}</div>

        ${sec('Informe de la semana')}
        <div class="card"><div class="prose">${st.week.n ? `<p>Esta semana: <b>${st.week.n}</b> ${st.week.n > 1 ? 'partidas' : 'partida'}, precisión media <b>${f1(st.week.acc)}</b> y <b>${f0(st.week.score)}%</b> de los puntos. ${st.week.prevN ? `La semana anterior: ${st.week.prevN} partidas con ${f1(st.week.prevAcc)} de precisión ${delta(st.week.acc, st.week.prevAcc)}.` : 'No hay partidas de la semana anterior para comparar.'}</p>` : '<p>Esta semana aún no has jugado partidas analizadas.</p>'}${st.best ? `<p>Tu mejor partida hasta ahora: <b>${f1(st.best.rev.acc)}</b> de precisión${st.best.rev.opening ? ` (${esc(st.best.rev.opening)})` : ''}, el ${new Date(st.best.d).toLocaleDateString('es')}.</p>` : ''}</div></div>

        ${sec('Por fase de la partida')}
        <div class="grid g3">${[['o', 'Apertura'], ['m', 'Medio juego'], ['e', 'Final']].map(([k, t]) => `<div class="card"><div style="display:flex;justify-content:space-between"><b>${t}</b><span>${f0(st.phase[k].all)}%</span></div>${bar(st.phase[k].all)}<div class="dim" style="font-size:12.5px;margin-top:6px">Últimas 10: ${f0(st.phase[k].last)}% ${delta(st.phase[k].last, st.phase[k].prev)}</div><div class="dim" style="font-size:12.5px">Errores serios aquí: ${st.byPhase[k]}</div></div>`).join('')}</div>

        ${sec('Cuándo llegan tus errores serios (por número de jugada)')}
        <div class="card"><div class="ia-bars">${st.byMove.map(b => { const mx = Math.max(1, ...st.byMove.map(x => x.n)); return `<div><div class="b" style="height:${b.n / mx * 100}%"></div><span>${b.n}</span><small>${b.l}</small></div>`; }).join('')}</div></div>

        ${sec('Tipos de error que repites')}
        <div class="card"><div class="tscroll"><table class="t"><tr><th>Patrón</th><th>Total</th><th>Por partida</th><th>Últimas 10</th><th>Tendencia</th><th></th></tr>${Object.keys(M).map(k => { const m = st.motifs[k]; return `<tr><td><b>${M[k].t}</b></td><td>${m.total}</td><td>${f1(m.all)}</td><td>${f1(m.last)}</td><td>${delta(m.last, m.prev, true)}</td><td><a href="${M[k].href}">Lección</a></td></tr>`; }).join('')}</table></div>
          ${Object.keys(st.pieces).length ? `<p class="muted" style="font-size:13.5px;margin:10px 0 0">Piezas que más dejas sin defensa: ${Object.entries(st.pieces).sort((a, b) => b[1] - a[1]).map(([p, n]) => `${Insights.PIECE[p]} (${n})`).join(', ')}.</p>` : ''}</div>

        ${sec('Aperturas')}
        <div class="card"><div class="tscroll"><table class="t"><tr><th>Apertura</th><th>Partidas</th><th>Puntos</th><th>Precisión</th><th>Errores graves</th></tr>${st.openings.slice(0, 12).map(o => `<tr><td><b>${esc(o.name)}</b></td><td>${o.n}</td><td>${f0(o.score)}%</td><td>${f1(o.acc)}</td><td>${f1(o.bl)}</td></tr>`).join('')}</table></div></div>

        ${sec('Por color, ritmo y gestión de la ventaja')}
        <div class="grid g3">
          <div class="card"><b>Por color</b><div class="tscroll"><table class="t"><tr><th></th><th>Partidas</th><th>Puntos</th><th>Precisión</th></tr><tr><td>Blancas</td><td>${st.color.w.n}</td><td>${f0(st.color.w.score)}%</td><td>${f1(st.color.w.acc)}</td></tr><tr><td>Negras</td><td>${st.color.b.n}</td><td>${f0(st.color.b.score)}%</td><td>${f1(st.color.b.acc)}</td></tr></table></div></div>
          <div class="card"><b>Gestión de la ventaja</b><div class="prose" style="font-size:14px"><p>Posiciones ganadoras convertidas: <b>${st.converted} de ${st.winning}</b>${st.winning ? ` (${f0(st.converted / st.winning * 100)}%)` : ''}.</p><p>Posiciones perdidas salvadas: <b>${st.saved} de ${st.losing}</b>.</p></div></div>
          <div class="card"><b>Por ritmo</b>${st.byTc.length ? `<div class="tscroll"><table class="t"><tr><th></th><th>Partidas</th><th>Puntos</th><th>Precisión</th></tr>${st.byTc.map(t => `<tr><td>${esc(t.k)}</td><td>${t.n}</td><td>${f0(t.score)}%</td><td>${f1(t.acc)}</td></tr>`).join('')}</table></div>` : '<p class="muted" style="font-size:14px;margin:6px 0 0">Aparece al importar partidas con control de tiempo (chess.com, Lichess).</p>'}</div>
        </div>`;
      }
      root.innerHTML = `
        <div class="page-h"><div><h1>Mi análisis</h1><p>Todas tus partidas analizadas en un solo sitio: tendencias, errores que se repiten y un plan de mejora con lecciones y ejercicios, recalculado con cada partida.</p></div></div>
        <div id="iaQ" style="margin-bottom:14px"></div>
        ${body}
        <h2 class="sec-t" style="margin:22px 0 10px;font-size:13px">Añadir partidas</h2>
        <div class="grid g2">
          <div class="card"><b>Desde chess.com o Lichess</b><p class="muted" style="font-size:13.5px;margin:6px 0 10px">Escribe tu nombre de usuario y se traen tus últimas 40 partidas públicas.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" id="iaUser" placeholder="Tu usuario" value="${esc(S().settings.importUser || '')}" style="flex:1;min-width:140px"><button class="btn sm" id="iaCC">chess.com</button><button class="btn sm" id="iaLi">Lichess</button></div></div>
          <div class="card"><b>Desde un archivo PGN</b><p class="muted" style="font-size:13.5px;margin:6px 0 10px">Indica arriba tu usuario (como aparece en el PGN) para saber con qué color jugabas.</p>
            <label class="btn sm" style="cursor:pointer">📂 Elegir archivo .pgn<input type="file" id="iaFile" accept=".pgn,.txt" hidden></label></div>
        </div>
        <details class="acc" style="margin-top:22px"><summary>Cómo se calcula todo esto</summary><div><div class="prose" style="font-size:14px">
          <p><b>Qué se guarda.</b> De cada partida analizada se guarda un resumen: precisión total y por fase, cuántas jugadas de cada tipo, la apertura, el resultado, tu color, y cada error con su número de jugada, fase, gravedad y motivo. Va con tu progreso (y a tu cuenta si la usas).</p>
          <p><b>Análisis.</b> Stockfish evalúa cada posición (profundidad 12 en segundo plano, 14 en la revisión manual). Una jugada se clasifica por la probabilidad de ganar que pierde: menos de 2 puntos, excelente; menos de 5, buena; menos de 10, imprecisión; menos de 20, error; 20 o más, error grave.</p>
          <p><b>Precisión.</b> Media de la precisión de tus jugadas con la fórmula pública de Lichess. El rendimiento estimado es una conversión orientativa de esa precisión, no un Elo oficial.</p>
          <p><b>Tendencias.</b> Se comparan tus últimas 10 partidas con las 10 anteriores. «Errores serios» son errores, errores graves y oportunidades perdidas. Una posición cuenta como ganadora si llegaste al 85% de probabilidad de ganar, y como perdida si bajaste al 15%.</p>
          <p><b>Diagnóstico y plan.</b> Cada patrón recibe un peso según su frecuencia y su gravedad; los tres de más peso forman el plan, cada uno con una lección y un tema de puzles.</p>
          <p>La documentación completa está en el archivo <b>docs/ANALISIS.md</b> del repositorio.</p></div></div></details>`;
      paintQueue();
      const user = () => { const u = $('#iaUser', root).value.trim(); if (!u) toast('Escribe tu usuario primero'); else { S().settings.importUser = u; App.save(); } return u; };
      const done = (r) => { toast(r.added ? `${r.added} partidas nuevas añadidas` : r.found ? 'Esas partidas ya estaban' : 'No encontré partidas tuyas con ese usuario'); paint(); if (r.added) runQueue(); };
      const net = async (fn, btn) => { const u = user(); if (!u) return; btn.disabled = true; const t = btn.textContent; btn.textContent = 'Trayendo…'; try { done(await fn(u)); } catch (e) { toast(/fetch|network/i.test(e.message) ? 'Sin conexión con el servidor' : e.message); btn.disabled = false; btn.textContent = t; } };
      $('#iaCC', root).onclick = (e) => net(Insights.importChessCom, e.currentTarget);
      $('#iaLi', root).onclick = (e) => net(Insights.importLichess, e.currentTarget);
      $('#iaFile', root).onchange = (e) => { const f = e.target.files[0], u = user(); if (!f || !u) return; const rd = new FileReader(); rd.onload = () => done(Insights.importPgnText(String(rd.result), u)); rd.readAsText(f); };
    };
    paint();
    if (Insights.pending().length) setTimeout(runQueue, 600);
    return () => { cancelled = true; if (running) App.getEngine().stop(); };
  };
})();
