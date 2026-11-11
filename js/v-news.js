/* Vista «Actualidad»: campeones vigentes, próximos títulos, ranking FIDE y tendencias (datos en data/actualidad.js). */
(function () {
  const { VIEWS, h, esc, fixMv } = App;
  VIEWS.actualidad = (v) => {
    const A = window.ACTUALIDAD;
    if (!A) { v.appendChild(h('<div class="card">Sin datos de actualidad.</div>')); return; }
    const table = (rows) => `<div class="tscroll"><table class="t"><tr><th>#</th><th>Jugador</th><th>País</th><th>Elo</th></tr>${rows.map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td>${esc(r[2])}</td><td>${r[3]}</td></tr>`).join('')}</table></div>`;
    v.appendChild(h(`<div>
      <div class="page-h"><div><h1>Actualidad</h1><p>El ajedrez de hoy: quién tiene cada título, qué se juega ahora, el ranking mundial y las tendencias que están cambiando el juego.</p></div><span class="tag">Actualizado: ${esc(A.updated)}</span></div>

      <h2 class="sec-t" style="margin:6px 0 10px;font-size:13px">Próximos títulos en juego</h2>
      <div class="grid g2">${A.next.map(n => `<div class="card"><h3 style="font-weight:900;margin-bottom:4px">${esc(n.title)}</h3>
        <div class="dim" style="font-size:13px;margin-bottom:8px">📅 ${esc(n.when)} · 📍 ${esc(n.where)}</div><div class="prose">${fixMv(n.html)}</div></div>`).join('')}</div>

      <h2 class="sec-t" style="margin:22px 0 10px;font-size:13px">Campeones vigentes</h2>
      <div class="grid g3">${A.champions.map(c => `<div class="card" style="padding:14px 16px"><div class="dim" style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.5px">${esc(c.title)}</div>
        <div style="font-size:18px;font-weight:900;margin:4px 0 2px">🏆 ${esc(c.who)}</div><div class="dim" style="font-size:13px;margin-bottom:6px">${esc(c.flag)}</div><div class="muted" style="font-size:13.5px">${esc(c.note)}</div></div>`).join('')}</div>

      <h2 class="sec-t" style="margin:22px 0 10px;font-size:13px">${esc(A.ranking.title)}</h2>
      <div class="grid g2"><div class="card"><h3 style="font-weight:900;margin-bottom:8px">Absoluto</h3>${table(A.ranking.open)}</div>
        <div class="card"><h3 style="font-weight:900;margin-bottom:8px">Femenino</h3>${table(A.ranking.women)}</div></div>
      <p class="muted" style="font-size:13px;margin:8px 0 0">${esc(A.ranking.note)}</p>

      <h2 class="sec-t" style="margin:22px 0 10px;font-size:13px">Tendencias del ajedrez actual</h2>
      <div class="grid g2">${A.trends.map(t => `<div class="card"><h3 style="font-weight:900;margin-bottom:8px">${esc(t.title)}</h3><div class="prose">${fixMv(t.html)}</div></div>`).join('')}</div>

      <details class="acc" style="margin-top:22px"><summary>Fuentes</summary><div><ul class="prose">${A.sources.map(s => `<li><a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a></li>`).join('')}</ul></div></details>
    </div>`));
  };
})();
