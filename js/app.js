/* Núcleo: almacenamiento, utilidades, navegación y vistas de Inicio/Progreso. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); };

  /* ---------- Datos (con valores por defecto si faltan) ---------- */
  window.OPENINGS = window.OPENINGS || []; window.LESSONS = window.LESSONS || []; window.PUZZLES = window.PUZZLES || [];
  window.METHODS = window.METHODS || []; window.PLANS = window.PLANS || []; window.RULES = window.RULES || [];
  window.HISTORY = window.HISTORY || { champions: [], eras: [] }; window.GLOSSARY = window.GLOSSARY || []; window.STATS = window.STATS || [];
  window.PSYCHOLOGY = window.PSYCHOLOGY || []; window.THINKING = window.THINKING || null;
  const PZ_BY_ID = {}; PUZZLES.forEach(p => PZ_BY_ID[p.id] = p);

  /* ---------- Almacenamiento local ---------- */
  const KEY = 'ajedrezpro_v1';
  const DEF = () => ({
    settings: { notation: 'es', sound: true, level: null },
    pz: { rating: 800, n: 0, hist: [], solved: {}, theme: {}, streak: 0, best: 0, day: null, dayStreak: 0 },
    rush: { best: {}, runs: [] }, wood: { sets: [] }, open: {}, lessons: {}, games: [], activity: {}, journal: [], vision: {}
  });
  let S = DEF();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
  const bump = (n = 1) => { const d = today(); S.activity[d] = (S.activity[d] || 0) + n;
    if (S.pz.day !== d) { const y = new Date(Date.now() - 864e5); const yd = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0'); S.pz.dayStreak = S.pz.day === yd ? (S.pz.dayStreak || 0) + 1 : 1; S.pz.day = d; }
    save(); };
  Sound.enabled = S.settings.sound !== false;

  /* ---------- Notación ---------- */
  const ES = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };
  const san = (m) => S.settings.notation === 'es' ? String(m).replace(/[KQRBN]/g, c => ES[c]) : m;
  const PNAME = { p: 'peón', n: 'caballo', b: 'alfil', r: 'torre', q: 'dama', k: 'rey' };
  const fixMv = (html) => S.settings.notation === 'es' ? String(html || '').replace(/<span class="mv">([^<]*)<\/span>/g, (_, m) => `<span class="mv">${san(m)}</span>`) : (html || '');
  const lineText = (moves, startFen) => {
    const g = new Chess(startFen || undefined); let out = '', num = +(g.fen().split(' ')[5]), black = g.turn() === 'b';
    moves.forEach((m, i) => { const b = g.turn() === 'b'; if (!b) out += num + '.'; else if (i === 0) out += num + '...'; const r = g.move(m, { sloppy: true }); out += san(r ? r.san : m) + ' '; if (b) num++; });
    return out.trim();
  };
  const uciToMove = (u) => ({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] });

  /* ---------- Toast ---------- */
  let toastT; const toast = (msg) => { $$('.toast').forEach(e => e.remove()); const t = h(`<div class="toast">${esc(msg)}</div>`); document.body.appendChild(t); clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 2200); };

  /* ---------- Iconos de navegación ---------- */
  const IC = {
    lightning: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#f0c15c"/></svg>',
    loop: '<svg viewBox="0 0 24 24" fill="none" stroke="#5c8bb0" stroke-width="2.6" stroke-linecap="round"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 4v4.7h-4.7M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 20v-4.7h4.7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="#c3c2c1" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" fill="#a88865"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5A2.5 2.5 0 0 1 4 21.5z" fill="#e8d9c3"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12z" fill="#1baca6"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#1f1e1b"/></svg>',
    cap: '<svg viewBox="0 0 24 24"><path d="M12 3 1 8.5 12 14l11-5.5z" fill="#c983d8"/><path d="M5.5 11v5c2 2.4 11 2.4 13 0v-5L12 14.3z" fill="#9b5cab"/><path d="M21.5 9v6" stroke="#c983d8" stroke-width="2"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="17" rx="2.5" fill="#e58f2a"/><rect x="3" y="9" width="18" height="12.5" fill="#f6dcb8"/><path d="M7 2.5v4M17 2.5v4" stroke="#e58f2a" stroke-width="2.4" stroke-linecap="round"/><path d="M7 13h3M14 13h3M7 17h3" stroke="#e58f2a" stroke-width="2.4"/></svg>',
    scroll: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="#d6d6d6"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="#6b6966" stroke-width="2" stroke-linecap="round"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M7 3h10v6a5 5 0 0 1-10 0z" fill="#f0c15c"/><path d="M7 5H3.5a3.5 3.5 0 0 0 3.8 4M17 5h3.5a3.5 3.5 0 0 1-3.8 4" fill="none" stroke="#f0c15c" stroke-width="2"/><rect x="10.5" y="13" width="3" height="4" fill="#d59120"/><rect x="7" y="17" width="10" height="3.5" rx="1" fill="#d59120"/></svg>',
    swords: '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-width="2.6"><path d="M4 4l12 12M20 4L8 16" stroke="#c3c2c1"/><path d="M14 18l4-4M6 14l4 4" stroke="#ca3431"/><path d="M17 17l3 3M7 17l-3 3" stroke="#8b8987"/></svg>',
    map: '<svg viewBox="0 0 24 24"><path d="M2 5l6-2 8 3 6-2v15l-6 2-8-3-6 2z" fill="#81b64c"/><path d="M8 3v15M16 6v15" stroke="#45753c" stroke-width="1.5"/><circle cx="12" cy="11" r="2.2" fill="#ca3431"/></svg>',
    duel: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3.5" fill="#5c8bb0"/><circle cx="16" cy="8" r="3.5" fill="#e58f2a"/><path d="M2 20a6 6 0 0 1 12 0zM10 20a6 6 0 0 1 12 0z" fill="#c3c2c1"/></svg>',
    road: '<svg viewBox="0 0 24 24"><path d="M9 2h6l5 20H4z" fill="#6b6966"/><path d="M12 4v3M12 10v4M12 17v4" stroke="#f0c15c" stroke-width="2"/></svg>',
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#5c8bb0"/><path d="m15.5 8.5-2 5-5 2 2-5z" fill="#fff"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="9" rx="1" fill="#81b64c"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#95c95f"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#b2dc84"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b8987" stroke-width="2.2"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>'
  };
  const pIc = (c) => window.PIECE_SVG ? PIECE_SVG[c] : '';
  const NAV = [
    { lbl: 'Jugar', items: [
      { id: 'jugar', t: 'Jugar', ic: pIc('wp') },
      { id: 'analisis', t: 'Análisis', ic: IC.search },
      { id: 'inicio', t: 'Inicio', ic: pIc('wk') }] },
    { lbl: 'Puzles', items: [
      { id: 'puzles', t: 'Puzles', ic: pIc('wn') },
      { id: 'contrarreloj', t: 'Contrarreloj', ic: IC.lightning },
      { id: 'woodpecker', t: 'Woodpecker', ic: IC.loop },
      { id: 'vision', t: 'Visión y cálculo', ic: IC.eye },
      { id: 'desafios', t: 'Desafíos', ic: IC.trophy },
      { id: 'batalla', t: 'Batalla', ic: IC.swords },
      { id: 'ruta', t: 'Ruta', ic: IC.map },
      { id: 'duelo', t: 'Duelo local', ic: IC.duel }] },
    { lbl: 'Aprender', items: [
      { id: 'aperturas', t: 'Aperturas', ic: IC.book },
      { id: 'estrategia', t: 'Estrategia', ic: IC.compass },
      { id: 'principios', t: 'Principios', ic: pIc('wb') },
      { id: 'tactica', t: 'Táctica', ic: pIc('bn') },
      { id: 'medio', t: 'Medio juego', ic: pIc('wq') },
      { id: 'finales', t: 'Finales', ic: pIc('wr') }] },
    { lbl: 'Método', items: [
      { id: 'roadmap', t: 'Roadmap', ic: IC.road },
      { id: 'metodos', t: 'Metodologías', ic: IC.cap },
      { id: 'plan', t: 'Mi plan', ic: IC.cal },
      { id: 'teoria', t: 'Enciclopedia', ic: IC.scroll },
      { id: 'progreso', t: 'Progreso', ic: IC.chart },
      { id: 'ajustes', t: 'Ajustes', ic: IC.gear }] }
  ];
  const ROUTE_PARENT = { ap: 'aperturas', met: 'metodos' };

  function renderNav(cur) {
    const nav = $('#nav'); nav.innerHTML = '';
    for (const g of NAV) {
      nav.appendChild(h(`<div class="lbl">${g.lbl}</div>`));
      for (const n of g.items) nav.appendChild(h(`<a href="#${n.id}" class="${n.id === cur ? 'on' : ''}"><span class="ic">${n.ic}</span>${n.t}</a>`));
    }
    const rt = $('#hdrRt'); if (rt) rt.innerHTML = `Puzles <b>${S.pz.rating}</b> · Nivel <b>${App.level ? App.level().lvl : 1}</b><br>Racha de días <b>${S.pz.dayStreak || 0}</b>`;
  }
  /* Entrenador: búho original con globo de diálogo */
  const COACH_SVG = '<svg viewBox="0 0 52 52"><rect width="52" height="52" fill="#3a5a7a"/><ellipse cx="26" cy="34" rx="17" ry="18" fill="#8a6a4a"/><ellipse cx="26" cy="38" rx="10" ry="11" fill="#d9c3a0"/><path d="M10 14l7 8M42 14l-7 8" stroke="#8a6a4a" stroke-width="5" stroke-linecap="round"/><circle cx="19" cy="25" r="7.5" fill="#fff"/><circle cx="33" cy="25" r="7.5" fill="#fff"/><circle cx="19" cy="25" r="7.5" fill="none" stroke="#1f1e1b" stroke-width="1.6"/><circle cx="33" cy="25" r="7.5" fill="none" stroke="#1f1e1b" stroke-width="1.6"/><path d="M26.5 25h-1" stroke="#1f1e1b" stroke-width="1.6"/><circle cx="20" cy="25.5" r="3" fill="#1f1e1b"/><circle cx="32" cy="25.5" r="3" fill="#1f1e1b"/><path d="M23.5 31l2.5 4 2.5-4z" fill="#e8a33a"/></svg>';
  function coach(el, kind, title, text) {
    if (!el) return;
    const icon = kind === 'ok' ? '<span class="ok">✓</span>' : kind === 'ko' ? '<span class="ko">✕</span>' : '';
    const show = S.settings.coach !== false;
    el.innerHTML = `<div class="coach ${show ? '' : 'nofc'}">${show ? `<div class="face" title="Ocultar el búho">${COACH_SVG}<button class="hide" aria-label="Ocultar el búho">✕</button></div>` : ''}`;
    el.firstChild.insertAdjacentHTML('beforeend', `<div class="bub">${title ? `<div class="hd">${icon}${title}</div>` : ''}<div>${text || ''}</div></div>`);
    const hb = el.querySelector('.hide'); if (hb) hb.onclick = (e) => { e.stopPropagation(); S.settings.coach = false; save(); toast('Búho oculto. Puedes volver a mostrarlo en Ajustes.'); coach(el, kind, title, text); };
  }

  /* ---------- Router ---------- */
  const VIEWS = {};
  let cleanup = null;
  function route() {
    const raw = (location.hash || '#inicio').slice(1);
    const i = raw.indexOf('-'); const key = i > 0 ? raw.slice(0, i) : raw; const arg = i > 0 ? raw.slice(i + 1) : null;
    let fn = VIEWS[raw] || VIEWS[key]; let navKey = VIEWS[raw] ? raw : key;
    if (!fn) { fn = VIEWS.inicio; navKey = 'inicio'; }
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    if (App.engine) App.engine.stop();
    const v = $('#view'); v.innerHTML = '';
    let parent = ROUTE_PARENT[key] || navKey;
    if (key === 'lec' && arg) { const L = LESSONS.find(l => l.id === arg); parent = L ? areaRoute(L.area) : 'medio'; }
    renderNav(parent);
    $('#side').classList.remove('open');
    window.scrollTo(0, 0);
    try { cleanup = fn(v, VIEWS[raw] ? null : arg) || null; } catch (e) { console.error(e); v.innerHTML = `<div class="card">Error al cargar la vista: ${esc(e.message)}</div>`; }
  }
  const areaRoute = (a) => ({ final: 'finales', 'apertura-principios': 'principios', tactica: 'tactica', estrategia: 'medio', medio: 'medio' }[a] || 'medio');

  /* ---------- Componente: tablero con barras de jugador ---------- */
  function boardBox(opts = {}) {
    const wrap = h(`<div class="board-col">
      ${opts.players ? '<div class="player" data-top></div>' : ''}
      <div class="board-row">${opts.evalbar ? '<div class="evalbar"><div class="w" style="height:50%"></div><span class="t top"></span><span class="t bot">0.0</span></div>' : ''}<div class="board-box"><div class="bd"></div></div></div>
      ${opts.players ? '<div class="player" data-bot></div>' : ''}
    </div>`);
    const board = new Board($('.bd', wrap), opts);
    return { el: wrap, board, evalbar: $('.evalbar', wrap), top: $('[data-top]', wrap), bot: $('[data-bot]', wrap) };
  }
  function setEval(bar, line, orientation) {
    if (!bar) return;
    const cp = EvalUtil.toCp(line); const wp = line && line.mate != null ? (line.mate > 0 ? 100 : 0) : Math.max(3, Math.min(97, EvalUtil.winPct(cp)));
    bar.classList.toggle('flip', orientation === 'black');
    $('.w', bar).style.height = wp + '%';
    const txt = line ? EvalUtil.fmt(line).replace('+', '') : '0.0';
    const whiteAhead = cp >= 0;
    const top = $('.t.top', bar), bot = $('.t.bot', bar);
    const flip = orientation === 'black';
    // texto en el lado del bando que va mejor
    const showBottom = flip ? !whiteAhead : whiteAhead;
    top.textContent = showBottom ? '' : txt.replace('-', ''); bot.textContent = showBottom ? txt.replace('-', '') : '';
    top.style.color = flip ? '#403d39' : '#fff'; bot.style.color = flip ? '#fff' : '#403d39';
  }
  function playerBar(el, name, sub, piece) { if (!el) return; el.innerHTML = `<span class="av">${pIc(piece)}</span><span>${esc(name)} <span class="dim" style="font-weight:600">${esc(sub || '')}</span></span><span class="clock" hidden>0:00</span>`; }
  function playSound(r) { if (!r) return; if (r.san.includes('#')) Sound.end(); else if (r.san.includes('+')) Sound.check(); else if (r.flags.includes('k') || r.flags.includes('q')) Sound.castle(); else if (r.captured) Sound.capture(); else Sound.move(); }

  /* Lista de jugadas navegable */
  function moveList(container, sans, cur, onClick, badges, startTurn = 'w', startNum = 1) {
    container.innerHTML = '';
    const g = h('<div class="moves"></div>');
    let i = 0, num = startNum;
    if (startTurn === 'b' && sans.length) { g.append(h(`<div class="n">${num}.</div>`), h('<div class="m dim">…</div>')); }
    const cell = (k) => { const b = badges && badges[k] ? BADGES[badges[k]] : null; const d = h(`<div class="m ${k === cur ? 'cur' : ''}">${b ? `<span class="bd" style="background:${b.c}">${b.t}</span>` : ''}${esc(san(sans[k]))}</div>`); d.onclick = () => onClick(k); return d; };
    if (startTurn === 'b' && sans.length) { g.append(cell(0)); i = 1; num++; }
    for (; i < sans.length; i += 2) { g.append(h(`<div class="n">${num++}.</div>`), cell(i)); g.append(i + 1 < sans.length ? cell(i + 1) : h('<div></div>')); }
    container.appendChild(g);
    const c = $('.cur', g); if (c) c.scrollIntoView({ block: 'nearest' });
  }
  function proscons(pros, cons) {
    if (!(pros && pros.length) && !(cons && cons.length)) return '';
    return `<div class="pc-list"><div class="pros"><h4>✔ Pros</h4><ul>${(pros || []).map(p => `<li>${fixMv(p)}</li>`).join('')}</ul></div><div class="cons"><h4>✖ Contras</h4><ul>${(cons || []).map(p => `<li>${fixMv(p)}</li>`).join('')}</ul></div></div>`;
  }
  function statBar(st) {
    if (!st) return '';
    return `<div class="statbar"><div class="sw" style="flex-grow:${st.white}">${st.white}%</div><div class="sd" style="flex-grow:${st.draw}">${st.draw}%</div><div class="sb" style="flex-grow:${st.black}">${st.black}%</div></div>`;
  }

  /* ---------- Rating de puzles ---------- */
  function ratePuzzle(p, ok) {
    const R = S.pz.rating, exp = 1 / (1 + Math.pow(10, (p.rating - R) / 400));
    const K = S.pz.n < 20 ? 40 : S.pz.n < 80 ? 24 : 16;
    const delta = Math.round(K * ((ok ? 1 : 0) - exp));
    S.pz.rating = Math.max(100, R + delta); S.pz.n++;
    if (App.track) App.track('puzzle', { ok, themes: p.themes, rating: p.rating });
    S.pz.hist.push([Date.now(), S.pz.rating]); if (S.pz.hist.length > 1500) S.pz.hist.shift();
    const rec = S.pz.solved[p.id] || { ok: 0, fail: 0 }; ok ? rec.ok++ : rec.fail++; rec.t = Date.now(); S.pz.solved[p.id] = rec;
    for (const th of p.themes || []) { const t = S.pz.theme[th] || { ok: 0, n: 0 }; t.n++; if (ok) t.ok++; S.pz.theme[th] = t; }
    if (ok) { S.pz.streak++; S.pz.best = Math.max(S.pz.best, S.pz.streak); } else S.pz.streak = 0;
    bump(); return delta;
  }

  const THEME_ES = {
    mateIn1: 'Mate en 1', mateIn2: 'Mate en 2', mateIn3: 'Mate en 3', mateIn4: 'Mate en 4+', mate: 'Mate', horquilla: 'Horquilla', clavada: 'Clavada', enfilada: 'Enfilada',
    ataqueDescubierto: 'Ataque descubierto', jaqueDoble: 'Jaque doble', desviacion: 'Desviación', atraccion: 'Atracción', sobrecarga: 'Sobrecarga', eliminacionDefensor: 'Eliminar defensor',
    intermedia: 'Jugada intermedia', rayosX: 'Rayos X', molino: 'Molino', sacrificio: 'Sacrificio', coronacion: 'Coronación', final: 'Final', finalPeones: 'Final de peones',
    finalTorres: 'Final de torres', ahogado: 'Ahogado', defensa: 'Defensa', ventajaMaterial: 'Ventaja material', piezaColgada: 'Pieza colgada', mateCorredor: 'Mate del pasillo',
    mateAhogado: 'Mate asfixiado', mateAnastasia: 'Mate de Anastasia', mateArabe: 'Mate árabe', mateBoden: 'Mate de Boden', mateEpaulette: 'Mate de charreteras',
    sacrificioGriego: 'Sacrificio griego', quietMove: 'Jugada tranquila', zugzwang: 'Zugzwang', apertura: 'Apertura', medioJuego: 'Medio juego', interferencia: 'Interferencia', subpromocion: 'Subpromoción', alPaso: 'Captura al paso', enroque: 'Enroque', finalAlfiles: 'Final de alfiles', finalCaballos: 'Final de caballos', finalDamas: 'Final de damas', mateGreco: 'Mate de Greco', mateDamiano: 'Mate de Damiano', mateLolli: 'Mate de Lolli', mateMorphy: 'Mate de Morphy', mateOpera: 'Mate de la Ópera', mateLegal: 'Mate de Légal', mateColaGolondrina: 'Mate cola de golondrina', corto: 'Corto', largo: 'Largo', muyLargo: 'Muy largo'
  };
  const themeName = (t) => THEME_ES[t] || t;

  /* ======================= INICIO ======================= */
  VIEWS.inicio = (v) => {
    const pzDaily = PUZZLES.length ? PUZZLES[(Math.floor(Date.now() / 864e5) * 7919) % PUZZLES.length] : null;
    const solvedN = Object.values(S.pz.solved).filter(r => r.ok).length;
    const lessonsN = Object.keys(S.lessons).length;
    const plan = PLANS.find(p => p.id === S.settings.level) || null;
    const dow = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][new Date().getDay()];
    const todayPlan = plan && plan.weekly ? plan.weekly.find(w => w.day === dow) : null;
    const weak = Object.entries(S.pz.theme).filter(([k, t]) => t.n >= 3 && !['corto', 'largo', 'muyLargo', 'medioJuego', 'apertura', 'final'].includes(k)).map(([k, t]) => ({ k, acc: t.ok / t.n, n: t.n })).sort((a, b) => a.acc - b.acc).slice(0, 4);
    v.appendChild(h(`<div>
      <div class="hero">
        <div class="hero-main">
          <div class="bgk">${pIc('wn')}</div>
          <span class="tag g" style="align-self:flex-start">Academia de ajedrez</span>
          <h1>Entrena como un profesional, una sesión cada día.</h1>
          <p class="muted" style="margin:0;max-width:52ch">Puzles con rating, aperturas con estadísticas, lecciones de medio juego y finales, las metodologías de los grandes entrenadores y un motor para jugar y revisar tus partidas.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:auto">
            <a class="btn pri" href="#puzles">${pIc('wn').replace('<svg', '<svg width="22" height="22"')} Resolver puzles</a>
            <a class="btn" href="#jugar">Jugar contra el motor</a>
            <a class="btn" href="#plan">${plan ? 'Ver mi plan' : 'Crear mi plan'}</a>
          </div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px" id="daily">
          <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-size:17px;font-weight:900">Puzle del día</h3>${pzDaily ? `<span class="tag">${pzDaily.rating}</span>` : ''}</div>
          <div class="mini-board" style="margin:0 auto" id="dailyB"></div>
          ${pzDaily ? `<a class="btn pri sm" href="#puzles-${pzDaily.id}">Resolver · juegan ${pzDaily.fen.split(' ')[1] === 'w' ? 'blancas' : 'negras'}</a>` : '<p class="muted">Cargando puzles…</p>'}
        </div>
      </div>
      <div class="grid g4" style="margin-top:16px">
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">RATING DE PUZLES</div><div class="big-num">${S.pz.rating}</div><div class="dim" style="font-size:13px">${S.pz.n} intentos</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">RACHA DE DÍAS</div><div class="big-num">🔥 ${S.pz.dayStreak || 0}</div><div class="dim" style="font-size:13px">Mejor racha de aciertos: ${S.pz.best}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">PUZLES RESUELTOS</div><div class="big-num">${solvedN}</div><div class="dim" style="font-size:13px">de ${PUZZLES.length} disponibles</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">LECCIONES COMPLETADAS</div><div class="big-num">${lessonsN}</div><div class="dim" style="font-size:13px">de ${LESSONS.length} lecciones</div></div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card">
          <h3 style="font-size:17px;font-weight:900;margin-bottom:10px">${plan ? `Tu sesión de hoy · ${dow}` : 'Elige tu nivel'}</h3>
          ${todayPlan ? `<ul class="prose" style="margin:0;padding-left:1.2em">${todayPlan.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul><p class="dim" style="font-size:13px;margin:10px 0 0">Plan: ${esc(plan.level)}</p>` :
        `<p class="muted" style="margin-top:0">Selecciona tu nivel y la app te propondrá un plan semanal basado en las metodologías profesionales (reparto de táctica, finales, estrategia, aperturas y partidas).</p><a class="btn pri sm" href="#plan">Elegir nivel</a>`}
        </div>
        <div class="card">
          <h3 style="font-size:17px;font-weight:900;margin-bottom:10px">Tus puntos débiles</h3>
          ${weak.length ? weak.map(w => `<div class="kv"><span>${esc(themeName(w.k))}</span><span style="display:flex;gap:10px;align-items:center"><b>${Math.round(w.acc * 100)}%</b><a class="btn sm" href="#puzles-tema_${w.k}">Entrenar</a></span></div>`).join('') :
        '<p class="muted" style="margin-top:0">Resuelve al menos unos cuantos puzles de cada tema y aquí verás los motivos tácticos donde más fallas, para entrenarlos de forma específica (práctica deliberada).</p><a class="btn sm" href="#puzles">Empezar</a>'}
        </div>
      </div>
      <h2 style="font-size:20px;font-weight:900;margin:24px 0 12px">Explora</h2>
      <div class="grid g4">
        ${[['aperturas', 'Aperturas', `${OPENINGS.length} aperturas con estadísticas, ideas, pros, contras y trampas.`, IC.book],
        ['medio', 'Medio juego', 'Estructuras de peones, planes, ataque, profilaxis.', pIc('wq')],
        ['finales', 'Finales', 'Lucena, Philidor, oposición y práctica contra el motor.', pIc('wr')],
        ['metodos', 'Metodologías', `${METHODS.length} métodos de entrenamiento profesionales.`, IC.cap],
        ['contrarreloj', 'Contrarreloj', 'Resuelve tantos puzles como puedas en 3 o 5 minutos.', IC.lightning],
        ['woodpecker', 'Woodpecker', 'Ciclos de repetición para automatizar patrones.', IC.loop],
        ['vision', 'Visión y cálculo', 'Coordenadas, memoria, rutas de caballo y cálculo a ciegas.', IC.eye],
        ['teoria', 'Enciclopedia', 'Reglas, historia, estadísticas, psicología y glosario.', IC.scroll],
        ['roadmap', 'Roadmap 0 → GM', 'El camino completo, etapa por etapa, con tu progreso.', IC.road],
        ['desafios', 'Desafíos y logros', 'Misiones diarias, XP, niveles y medallas.', IC.trophy],
        ['batalla', 'Batalla de puzles', 'Compite contra bots de 600 a 2500 de Elo.', IC.swords],
        ['ruta', 'Ruta de puzles', 'Tema a tema: bronce, plata y oro.', IC.map]]
        .map(([id, t, d, ic]) => `<a class="tile" href="#${id}"><span style="width:34px;height:34px;display:block">${ic}</span><h3>${t}</h3><p>${d}</p></a>`).join('')}
      </div></div>`));
    if (pzDaily) { const b = new Board($('#dailyB', v), { interactive: false, orientation: pzDaily.fen.split(' ')[1] === 'w' ? 'white' : 'black' }); b.setPosition(pzDaily.fen, false); }
  };

  /* ======================= PROGRESO ======================= */
  VIEWS.progreso = (v) => {
    const themes = Object.entries(S.pz.theme).filter(([, t]) => t.n > 0).sort((a, b) => b[1].n - a[1].n);
    const games = S.games || [];
    const W = games.filter(g => g.res === 'win').length, D = games.filter(g => g.res === 'draw').length, L = games.filter(g => g.res === 'loss').length;
    v.appendChild(h(`<div>
      <div class="page-h"><div><h1>Progreso</h1><p>Lo que no se mide no se mejora. Revisa tu evolución, tus temas débiles y lleva un diario de errores.</p></div></div>
      <div class="grid g4">
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">RATING PUZLES</div><div class="big-num">${S.pz.rating}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">PRECISIÓN GLOBAL</div><div class="big-num">${(() => { const r = Object.values(S.pz.solved); const ok = r.reduce((a, x) => a + x.ok, 0), n = r.reduce((a, x) => a + x.ok + x.fail, 0); return n ? Math.round(ok / n * 100) + '%' : '—'; })()}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">CONTRARRELOJ (mejor)</div><div class="big-num">${Math.max(0, ...Object.values(S.rush.best || {}))}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">PARTIDAS vs MOTOR</div><div class="big-num">${games.length}</div><div class="dim" style="font-size:13px">+${W} =${D} −${L}</div></div>
      </div>
      <div class="card" style="margin-top:16px"><h3 style="font-size:17px;font-weight:900;margin-bottom:8px">Evolución del rating de puzles</h3><div id="chart"></div></div>
      <div class="card" style="margin-top:16px"><h3 style="font-size:17px;font-weight:900;margin-bottom:8px">Actividad del último año</h3><div class="heat" id="heat"></div></div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h3 style="font-size:17px;font-weight:900;margin-bottom:8px">Precisión por tema</h3>
          ${themes.length ? `<div class="tscroll"><table class="t"><tr><th>Tema</th><th>Intentos</th><th>Precisión</th><th></th></tr>${themes.map(([k, t]) => `<tr><td>${esc(themeName(k))}</td><td>${t.n}</td><td style="min-width:110px"><div class="meter"><div style="width:${Math.round(t.ok / t.n * 100)}%;background:${t.ok / t.n > .75 ? 'var(--green)' : t.ok / t.n > .5 ? 'var(--yellow)' : 'var(--red)'}"></div></div></td><td><b>${Math.round(t.ok / t.n * 100)}%</b></td></tr>`).join('')}</table></div>` : '<p class="muted">Aún no hay datos. Resuelve puzles para ver tus estadísticas por tema.</p>'}
        </div>
        <div class="card"><h3 style="font-size:17px;font-weight:900;margin-bottom:4px">Diario de errores</h3>
          <p class="muted" style="margin-top:0;font-size:14px">Método de la escuela soviética: anota cada error de tus partidas, clasifícalo y busca patrones. Repasa el diario antes de cada torneo.</p>
          <div style="display:grid;gap:8px">
            <select id="jType"><option>Táctica no vista (mía)</option><option>Táctica no vista (rival)</option><option>Error de cálculo</option><option>Error estratégico / plan</option><option>Apertura: no conocía la línea</option><option>Final mal jugado</option><option>Apuro de tiempo</option><option>Psicológico (exceso de confianza, miedo, tilt)</option></select>
            <textarea id="jText" placeholder="Describe el error: posición, qué jugaste, qué debías jugar y qué lección sacas." style="font-family:inherit"></textarea>
            <button class="btn pri sm" id="jAdd" style="justify-self:start">Añadir al diario</button>
          </div>
          <div id="jList" style="margin-top:12px;display:grid;gap:8px"></div>
          <div id="jStats" style="margin-top:10px"></div>
        </div>
      </div>
      <div class="card" style="margin-top:16px"><h3 style="font-size:17px;font-weight:900;margin-bottom:8px">Copia de seguridad</h3>
        <p class="muted" style="margin-top:0;font-size:14px">Tus datos se guardan solo en este navegador. Copia este texto para llevarlos a otro dispositivo, o pega uno para restaurarlos.</p>
        <textarea id="bk"></textarea><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn sm" id="bkCopy">Copiar mis datos</button><button class="btn sm" id="bkLoad">Restaurar desde el texto</button><button class="btn sm ghost" id="bkReset">Borrar todo</button></div>
      </div></div>`));
    // gráfica de rating
    const hist = S.pz.hist.length ? S.pz.hist : [[Date.now(), S.pz.rating]];
    const pts = hist.map(x => x[1]); const mn = Math.min(...pts) - 30, mx = Math.max(...pts) + 30, Wd = 900, Ht = 220;
    const X = (i) => 40 + (pts.length === 1 ? Wd - 60 : i / (pts.length - 1) * (Wd - 60)), Y = (r) => 10 + (1 - (r - mn) / (mx - mn)) * (Ht - 40);
    let ticks = ''; for (let k = 0; k <= 4; k++) { const r = Math.round(mn + (mx - mn) * k / 4); ticks += `<line x1="40" x2="${Wd - 20}" y1="${Y(r)}" y2="${Y(r)}" stroke="#3c3a37"/><text x="34" y="${Y(r) + 4}" fill="#8b8987" font-size="12" text-anchor="end">${r}</text>`; }
    const path = pts.map((r, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(r).toFixed(1)}`).join(' ');
    $('#chart', v).innerHTML = `<svg class="chart" viewBox="0 0 ${Wd} ${Ht}">${ticks}<path d="${path} L${X(pts.length - 1)},${Ht - 30} L${X(0)},${Ht - 30} Z" fill="rgba(54,146,231,.15)"/><path d="${path}" fill="none" stroke="#3692e7" stroke-width="2.5"/><circle cx="${X(pts.length - 1)}" cy="${Y(pts[pts.length - 1])}" r="5" fill="#56a7f0"/><text x="${Wd - 20}" y="${Ht - 8}" fill="#8b8987" font-size="12" text-anchor="end">${pts.length} intentos</text></svg>`;
    // mapa de calor
    const heat = $('#heat', v); const now = new Date(); const start = new Date(now.getTime() - 370 * 864e5); start.setDate(start.getDate() - start.getDay());
    heat.style.gridTemplateRows = 'repeat(7,1fr)'; heat.style.gridAutoFlow = 'column';
    for (let d = new Date(start); d <= now; d = new Date(d.getTime() + 864e5)) {
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); const n = S.activity[k] || 0;
      const c = n === 0 ? '' : n < 5 ? 'background:#3f5a2a' : n < 15 ? 'background:#5c8a3a' : n < 30 ? 'background:#81b64c' : 'background:#b2dc84';
      heat.appendChild(h(`<div style="${c}" title="${k}: ${n}"></div>`));
    }
    heat.style.gridTemplateColumns = ''; heat.style.display = 'grid'; heat.style.gridAutoColumns = '1fr';
    // diario
    const renderJ = () => {
      $('#jList', v).innerHTML = (S.journal || []).slice().reverse().slice(0, 30).map((j, i) => `<div style="background:var(--bg3);padding:10px 12px;border-radius:6px;font-size:14px"><div style="display:flex;justify-content:space-between;gap:8px"><span class="tag y">${esc(j.type)}</span><span class="dim" style="font-size:12px">${esc(j.date)}</span></div><div class="muted" style="margin-top:6px">${esc(j.text)}</div></div>`).join('');
      const c = {}; (S.journal || []).forEach(j => c[j.type] = (c[j.type] || 0) + 1);
      $('#jStats', v).innerHTML = Object.keys(c).length ? '<div class="sec-t">Errores por tipo</div>' + Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<div class="kv"><span>${esc(k)}</span><b>${n}</b></div>`).join('') : '';
    };
    renderJ();
    $('#jAdd', v).onclick = () => { const t = $('#jText', v).value.trim(); if (!t) { toast('Escribe una descripción del error'); return; } S.journal.push({ type: $('#jType', v).value, text: t, date: today() }); save(); $('#jText', v).value = ''; renderJ(); toast('Error añadido al diario'); };
    $('#bk', v).value = JSON.stringify(S);
    $('#bkCopy', v).onclick = () => { const ta = $('#bk', v); ta.value = JSON.stringify(S); (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(() => toast('Datos copiados'), () => { ta.select(); toast('Selecciona y copia el texto'); }); };
    $('#bkLoad', v).onclick = () => { try { const d = JSON.parse($('#bk', v).value); S = Object.assign(DEF(), d); save(); App.S = S; toast('Datos restaurados'); route(); } catch (e) { toast('El texto no es una copia válida'); } };
    let resetArm = false; $('#bkReset', v).onclick = (e) => { if (!resetArm) { resetArm = true; e.target.textContent = 'Pulsa otra vez para confirmar'; return; } S = DEF(); save(); App.S = S; toast('Datos borrados'); route(); };
  };

  /* ======================= AJUSTES ======================= */
  VIEWS.ajustes = (v) => {
    v.appendChild(h(`<div><div class="page-h"><div><h1>Ajustes</h1></div></div>
      <div class="card" style="display:grid;gap:14px;max-width:640px">
        <div><div class="sec-t">Notación</div><div class="chips" id="not"><button class="chip" data-v="es">Española (R D T A C)</button><button class="chip" data-v="en">Inglesa (K Q R B N)</button></div></div>
        <div><div class="sec-t">Sonido</div><label class="ck"><input type="checkbox" id="snd" ${S.settings.sound !== false ? 'checked' : ''}> Sonidos de movimiento y aciertos</label></div>
        <div><div class="sec-t">Entrenador</div><label class="ck"><input type="checkbox" id="coachT" ${S.settings.coach !== false ? 'checked' : ''}> Mostrar el búho entrenador en lecciones, aperturas y la ruta</label></div>
        <div><div class="sec-t">Créditos</div><p class="muted" style="font-size:13.5px;margin:4px 0 0">Motor: Stockfish 10 (GPLv3, compilado a JavaScript por nmrugg/stockfish.js). Reglas: chess.js (BSD-2). Piezas: Cburnett, Wikimedia Commons (CC BY-SA 3.0), vía cm-chessboard. Las estadísticas de aperturas son aproximaciones de bases magistrales y los puzles generados se verificaron con Stockfish.</p></div>
      </div></div>`));
    const paint = () => $$('#not .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === S.settings.notation));
    paint(); $$('#not .chip', v).forEach(c => c.onclick = () => { S.settings.notation = c.dataset.v; save(); paint(); toast('Notación actualizada'); });
    $('#coachT', v).onchange = (e) => { S.settings.coach = e.target.checked; save(); toast(e.target.checked ? 'Búho visible' : 'Búho oculto'); };
    $('#snd', v).onchange = (e) => { S.settings.sound = e.target.checked; Sound.enabled = e.target.checked; save(); };
  };

  /* ---------- Exportar API para otros módulos ---------- */
  const App = window.App = { coach, COACH_SVG, $, $$, h, esc, rnd, shuffle, fmtTime, today, S, save, bump, san, fixMv, lineText, uciToMove, toast, VIEWS, boardBox, setEval, playerBar, playSound, moveList, proscons, statBar, ratePuzzle, themeName, THEME_ES, PZ_BY_ID, IC, pIc, route, areaRoute, engine: null,
    getEngine() { if (!App.engine) App.engine = new Engine(); return App.engine; }, setCleanup(fn) { cleanup = fn; },
    isView(k) { return (location.hash || '#inicio').slice(1).split('-')[0] === k; } };
  Object.defineProperty(App, 'S', { get: () => S, set: (x) => { S = x; } });

  window.addEventListener('DOMContentLoaded', () => {
    $('#logoIc').innerHTML = pIc('wn');
    $('#menuBtn').onclick = (e) => { e.stopPropagation(); $('#nav').classList.toggle('open'); };
    document.addEventListener('click', (e) => { if (!e.target.closest('#nav')) $('#side').classList.remove('open'); });
    window.addEventListener('hashchange', route);
    route();
  });
})();

/* Instalación como app (PWA): solo cuando se sirve desde un sitio propio (GitHub Pages o local). */
(function () {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol) || /claude\.ai|claudeusercontent/.test(location.host)) return;
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { }); });
  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferred = e;
    const foot = document.getElementById('hdrRt'); if (!foot || document.getElementById('instBtn')) return;
    const b = document.createElement('button'); b.id = 'instBtn'; b.className = 'btn pri sm'; b.style.marginTop = '8px'; b.textContent = '⬇ Instalar app';
    b.onclick = async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; b.remove(); };
    foot.after(b);
  });
})();
