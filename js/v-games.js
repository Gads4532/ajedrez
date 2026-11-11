/* Juegos y desafíos con puzles: misiones, logros, XP, batalla contra bots, ruta de temas, duelo local. */
(function () {
  const { $, $$, h, esc, rnd, shuffle, fmtTime, save, bump, toast, VIEWS, boardBox, themeName, PZ_BY_ID, IC, pIc } = App;
  const S = () => App.S;
  const colorOf = (p) => p.fen.split(' ')[1];
  const todayKey = () => App.today();

  /* ---------- XP y niveles ---------- */
  const lvlFor = (xp) => { let l = 1, need = 100, acc = 0; while (xp >= acc + need) { acc += need; l++; need = Math.round(need * 1.18); } return { lvl: l, into: xp - acc, need }; };
  App.level = () => lvlFor(S().xp || 0);
  // Aviso flotante «+N XP» (se agrupan los que llegan seguidos).
  let popN = 0, popT = null; const xpPop = (n) => { popN += n; let el = document.getElementById('xpPop'); if (!el) { el = document.createElement('div'); el.id = 'xpPop'; el.className = 'xp-pop'; document.body.appendChild(el); } el.textContent = `+${popN} XP`; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); clearTimeout(popT); popT = setTimeout(() => { popN = 0; el.classList.remove('show'); }, 1800); };
  App.addXP = (n) => { if (!n) return; const before = lvlFor(S().xp || 0).lvl; S().xp = (S().xp || 0) + Math.round(n); const after = lvlFor(S().xp).lvl; save(); xpPop(Math.round(n)); if (after > before) { toast(`¡Subes al nivel ${after}!`); Sound.end(); } };

  /* ---------- Seguimiento de eventos para misiones y logros ---------- */
  const day = () => { const d = S().daily; if (!d || d.date !== todayKey()) S().daily = { date: todayKey(), solved: 0, theme: {}, maxRating: 0, rush: 0, lessons: 0, games: 0, wins: 0, battles: 0, bwins: 0, route: 0, streak: 0, best: 0, vision: 0, open: 0 }; return S().daily; };
  App.track = (ev, x = {}) => {
    const d = day(); const T = S().totals || (S().totals = { solved: 0, rushBest: 0, lessons: 0, wins: 0, bwins: 0, stars: 0, games: 0, opens: 0, duel: 0 });
    if (ev === 'puzzle') { if (x.ok) { d.solved++; T.solved++; d.streak++; d.best = Math.max(d.best, d.streak); d.maxRating = Math.max(d.maxRating, x.rating || 0); (x.themes || []).forEach(t => d.theme[t] = (d.theme[t] || 0) + 1); App.addXP(8 + (x.rating || 800) / 200); } else d.streak = 0; }
    if (ev === 'rush') { d.rush = Math.max(d.rush, x.score); T.rushBest = Math.max(T.rushBest, x.score); App.addXP(x.score * 3); }
    if (ev === 'lesson') { d.lessons++; T.lessons++; App.addXP(40); }
    if (ev === 'game') { d.games++; T.games++; if (x.res === 'win') { d.wins++; T.wins++; App.addXP(30); } else App.addXP(10); }
    if (ev === 'battle') { d.battles++; if (x.win) { d.bwins++; T.bwins++; App.addXP(40); } else App.addXP(10); }
    if (ev === 'route') { d.route++; T.stars = x.stars; App.addXP(25); }
    if (ev === 'vision') { d.vision++; App.addXP(5); }
    if (ev === 'open') { d.open++; T.opens++; App.addXP(15); }
    if (ev === 'duel') { T.duel++; App.addXP(15); }
    checkMissions(); checkAch(); save();
  };

  /* ---------- Misiones diarias (3 por día, deterministas por fecha) ---------- */
  const MISSIONS = [
    { id: 's10', t: 'Resuelve 10 puzles', f: d => [d.solved, 10], xp: 60 },
    { id: 's25', t: 'Resuelve 25 puzles', f: d => [d.solved, 25], xp: 120 },
    { id: 'st5', t: 'Racha de 5 puzles sin fallar', f: d => [d.best, 5], xp: 80 },
    { id: 'st10', t: 'Racha de 10 puzles sin fallar', f: d => [d.best, 10], xp: 150 },
    { id: 'm2', t: 'Resuelve 5 mates en 2', f: d => [d.theme.mateIn2 || 0, 5], xp: 70 },
    { id: 'm3', t: 'Resuelve 3 mates en 3', f: d => [d.theme.mateIn3 || 0, 3], xp: 90 },
    { id: 'fork', t: 'Resuelve 3 puzles de horquilla', f: d => [d.theme.horquilla || 0, 3], xp: 70 },
    { id: 'end', t: 'Resuelve 5 puzles de finales', f: d => [d.theme.final || 0, 5], xp: 70 },
    { id: 'sac', t: 'Resuelve 2 puzles con sacrificio', f: d => [d.theme.sacrificio || 0, 2], xp: 80 },
    { id: 'hard', t: 'Resuelve un puzle de 400 puntos por encima de tu rating', f: d => [d.maxRating >= S().pz.rating + 400 ? 1 : 0, 1], xp: 120 },
    { id: 'r10', t: 'Consigue 10 en Contrarreloj', f: d => [d.rush, 10], xp: 90 },
    { id: 'r20', t: 'Consigue 20 en Contrarreloj', f: d => [d.rush, 20], xp: 150 },
    { id: 'les', t: 'Completa una lección', f: d => [d.lessons, 1], xp: 60 },
    { id: 'gm', t: 'Juega una partida contra Stockfish', f: d => [d.games, 1], xp: 50 },
    { id: 'bt', t: 'Gana una batalla de puzles', f: d => [d.bwins, 1], xp: 90 },
    { id: 'rt', t: 'Supera un nivel de la Ruta de puzles', f: d => [d.route, 1], xp: 70 },
    { id: 'vi', t: 'Haz 3 ejercicios de visión', f: d => [d.vision, 3], xp: 50 },
    { id: 'op', t: 'Repasa una apertura en modo Entrenar', f: d => [d.open, 1], xp: 60 }
  ];
  const todaysMissions = () => { const seed = todayKey().split('-').reduce((a, x) => a * 31 + +x, 7); const out = []; let k = seed; while (out.length < 3) { k = (k * 1103515245 + 12345) % 2147483648; const m = MISSIONS[k % MISSIONS.length]; if (!out.includes(m)) out.push(m); } return out; };
  const checkMissions = () => {
    const d = day(); d.done = d.done || {};
    for (const m of todaysMissions()) { const [a, b] = m.f(d); if (a >= b && !d.done[m.id]) { d.done[m.id] = 1; toast('Misión cumplida: ' + m.t + ` (+${m.xp} XP)`); S().xp = (S().xp || 0) + m.xp; } }
  };

  /* ---------- Logros ---------- */
  const ACH = [
    ['p1', 'Primer paso', 'Resuelve tu primer puzle', T => T.solved >= 1], ['p50', 'Aprendiz táctico', 'Resuelve 50 puzles', T => T.solved >= 50],
    ['p200', 'Cazador de patrones', 'Resuelve 200 puzles', T => T.solved >= 200], ['p500', 'Máquina táctica', 'Resuelve 500 puzles', T => T.solved >= 500],
    ['p1000', 'Leyenda de los puzles', 'Resuelve 1000 puzles', T => T.solved >= 1000],
    ['r1000', 'Club 1000', 'Alcanza 1000 de rating de puzles', () => S().pz.rating >= 1000], ['r1500', 'Club 1500', 'Alcanza 1500 de rating', () => S().pz.rating >= 1500],
    ['r2000', 'Club 2000', 'Alcanza 2000 de rating', () => S().pz.rating >= 2000], ['r2500', 'Nivel GM', 'Alcanza 2500 de rating', () => S().pz.rating >= 2500],
    ['st10', 'En racha', 'Racha de 10 aciertos', () => S().pz.best >= 10], ['st25', 'Imparable', 'Racha de 25 aciertos', () => S().pz.best >= 25],
    ['rush15', 'Velocista', '15 puntos en Contrarreloj', T => T.rushBest >= 15], ['rush30', 'Relámpago', '30 puntos en Contrarreloj', T => T.rushBest >= 30],
    ['l1', 'Estudiante', 'Completa una lección', T => T.lessons >= 1], ['l20', 'Erudito', 'Completa 20 lecciones', T => T.lessons >= 20],
    ['w1', 'Primera victoria', 'Gana a Stockfish en cualquier nivel', T => T.wins >= 1], ['w10', 'Matagigantes', 'Gana 10 partidas a Stockfish', T => T.wins >= 10],
    ['b1', 'Gladiador', 'Gana una batalla de puzles', T => T.bwins >= 1], ['b10', 'Campeón de la arena', 'Gana 10 batallas', T => T.bwins >= 10],
    ['s10', 'Explorador', 'Consigue 10 estrellas en la Ruta', T => T.stars >= 10], ['s45', 'Conquistador', 'Consigue 45 estrellas en la Ruta', T => T.stars >= 45],
    ['o5', 'Teórico', 'Repasa 5 veces aperturas', T => T.opens >= 5], ['d1', 'Duelista', 'Juega un duelo local', T => T.duel >= 1],
    ['ds7', 'Constancia', 'Entrena 7 días seguidos', () => (S().pz.dayStreak || 0) >= 7], ['ds30', 'Disciplina de hierro', 'Entrena 30 días seguidos', () => (S().pz.dayStreak || 0) >= 30]
  ];
  const checkAch = () => { const T = S().totals || {}; S().ach = S().ach || {}; for (const [id, t, , f] of ACH) if (!S().ach[id] && f(T)) { S().ach[id] = Date.now(); toast('🏅 Logro: ' + t); } };

  /* ======================= DESAFÍOS ======================= */
  VIEWS.desafios = (v) => {
    checkAch(); const d = day(); const L = lvlFor(S().xp || 0); S().ach = S().ach || {};
    const got = Object.keys(S().ach).length;
    v.appendChild(h(`<div><div class="page-h"><div><h1>Desafíos</h1><p>Misiones diarias, logros y tu nivel de experiencia. Cada puzle, lección, partida y batalla suma XP.</p></div></div>
      <div class="grid g3">
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">NIVEL</div><div class="big-num">${L.lvl}</div><div class="meter" style="margin:8px 0 4px"><div style="width:${L.into / L.need * 100}%"></div></div><div class="dim" style="font-size:13px">${L.into} / ${L.need} XP para el nivel ${L.lvl + 1}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">LOGROS</div><div class="big-num">${got} / ${ACH.length}</div></div>
        <div class="card"><div class="dim" style="font-weight:800;font-size:13px">HOY</div><div class="big-num">${d.solved}</div><div class="dim" style="font-size:13px">puzles resueltos · mejor racha ${d.best}</div></div>
      </div>
      <h2 style="font-size:20px;font-weight:900;margin:22px 0 10px">Misiones de hoy</h2>
      <div class="grid g3">${todaysMissions().map(m => { const [a, b] = m.f(d); const done = d.done && d.done[m.id]; return `<div class="card" style="${done ? 'outline:2px solid var(--green)' : ''}"><div style="display:flex;justify-content:space-between;gap:8px"><b style="color:var(--fg)">${esc(m.t)}</b><span class="tag ${done ? 'g' : 'y'}">${done ? '✓' : '+' + m.xp + ' XP'}</span></div><div class="meter" style="margin-top:10px"><div style="width:${Math.min(100, a / b * 100)}%"></div></div><div class="dim" style="font-size:13px;margin-top:4px">${Math.min(a, b)} / ${b}</div></div>`; }).join('')}</div>
      <h2 style="font-size:20px;font-weight:900;margin:22px 0 10px">Juegos con puzles</h2>
      <div class="grid g4">
        <a class="tile" href="#batalla"><span style="font-size:30px">⚔️</span><h3>Batalla de puzles</h3><p>Compite contra bots de distinto Elo: quien resuelva más en 3 minutos gana.</p></a>
        <a class="tile" href="#ruta"><span style="font-size:30px">🗺️</span><h3>Ruta de puzles</h3><p>Avanza tema a tema y gana estrellas de bronce, plata y oro.</p></a>
        <a class="tile" href="#contrarreloj"><span style="font-size:30px">⚡</span><h3>Contrarreloj</h3><p>3 o 5 minutos, o supervivencia con 3 vidas. Ahora también por tema.</p></a>
        <a class="tile" href="#duelo"><span style="font-size:30px">🤝</span><h3>Duelo local</h3><p>Dos jugadores en el mismo dispositivo, por turnos y con 3 vidas.</p></a>
        <a class="tile" href="#woodpecker"><span style="font-size:30px">🔁</span><h3>Woodpecker</h3><p>Ciclos de repetición contra tu propio tiempo.</p></a>
        <a class="tile" href="#vision-calculo"><span style="font-size:30px">🧠</span><h3>Cálculo a ciegas</h3><p>Visualiza la secuencia y encuentra la jugada final.</p></a>
        <a class="tile" href="#vision-coord"><span style="font-size:30px">🎯</span><h3>Coordenadas</h3><p>¿Cuántas casillas encuentras en 30 segundos?</p></a>
        <a class="tile" href="#puzles-tema_mateIn1"><span style="font-size:30px">♚</span><h3>Mate en 1</h3><p>Calentamiento: patrones de mate básicos.</p></a>
      </div>
      <h2 style="font-size:20px;font-weight:900;margin:22px 0 10px">Logros</h2>
      <div class="grid g4">${ACH.map(([id, t, desc]) => { const g = S().ach[id]; return `<div class="card" style="display:flex;gap:12px;align-items:center;${g ? '' : 'opacity:.45'}"><span style="font-size:30px">${g ? '🏅' : '🔒'}</span><div><b style="color:var(--fg)">${esc(t)}</b><div class="dim" style="font-size:13px">${esc(desc)}</div></div></div>`; }).join('')}</div></div>`));
  };

  /* ======================= BATALLA CONTRA BOTS ======================= */
  const BOTS = [
    { n: 'Peoncito', elo: 600, c: '#a88865', s: 'Acaba de aprender a mover las piezas.' }, { n: 'Lucía', elo: 900, c: '#5c8bb0', s: 'Conoce los mates básicos.' },
    { n: 'Don Tomás', elo: 1200, c: '#81b64c', s: 'Jugador de club, buen ojo táctico.' }, { n: 'Valkiria', elo: 1500, c: '#c983d8', s: 'Rápida y agresiva.' },
    { n: 'El Profesor', elo: 1800, c: '#e58f2a', s: 'Calcula con calma, rara vez falla.' }, { n: 'Kaiser', elo: 2100, c: '#ca3431', s: 'Maestro FIDE de reflejos fulminantes.' },
    { n: 'Titán', elo: 2500, c: '#1baca6', s: 'Nivel gran maestro. Suerte.' }
  ];
  const botFace = (b) => `<span style="width:40px;height:40px;border-radius:6px;background:${b.c};display:grid;place-items:center;flex:none">${pIc('wk').replace('<svg', '<svg width="32" height="32"')}</span>`;
  VIEWS.batalla = (v) => {
    const bb = boardBox({});
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head"><span style="font-size:24px">⚔️</span><span>Batalla de puzles</span></div><div class="sp-body" id="bb"></div><div class="sp-foot" id="bf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board; board.opts.interactive = false; board.setPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', false);
    let timers = [], st = null;
    const stopAll = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; };
    const pick = () => {
      stopAll();
      $('#bb', v).innerHTML = `<p class="muted" style="margin:0">Elige rival. Ambos resuelven puzles de dificultad creciente durante 3 minutos; el bot acierta o falla según su Elo. Tres errores y quedas eliminado.</p>
        <div style="display:grid;gap:8px">${BOTS.map((b, i) => `<div class="list-row" data-b="${i}">${botFace(b)}<div class="grow"><h3>${esc(b.n)} <span class="dim" style="font-weight:600">(${b.elo})</span></h3><p>${esc(b.s)}</p></div>${(S().battles || {})[b.n] ? '<span class="tag g">Vencido</span>' : ''}</div>`).join('')}</div>`;
      $('#bf', v).innerHTML = '';
      $$('[data-b]', v).forEach(r => r.onclick = () => start(BOTS[+r.dataset.b]));
    };
    const start = (bot) => {
      st = { bot, me: 0, botS: 0, strikes: 0, t: 180, lvl: Math.max(400, Math.min(S().pz.rating, bot.elo) - 300), used: new Set(), over: false };
      $('#bb', v).innerHTML = `<div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;text-align:center">
          <div><div class="dim" style="font-size:12px;font-weight:800">TÚ</div><div class="big-num" id="bme">0</div></div>
          <div class="big-num" id="btm" style="font-size:24px">3:00</div>
          <div><div style="display:flex;justify-content:center">${botFace(bot)}</div><div class="big-num" id="bbot">0</div></div></div>
        <div class="rush-strikes" id="bx" style="justify-content:center"><span>✕</span><span>✕</span><span>✕</span></div><div id="bfb"></div>`;
      $('#bf', v).innerHTML = '<button class="btn sm" id="bq">Rendirse</button>'; $('#bq', v).onclick = () => end();
      timers.push(setInterval(() => { st.t--; $('#btm', v).textContent = fmtTime(st.t); if (st.t <= 10) Sound.tick(); if (st.t <= 0) end(); }, 1000));
      // el bot "resuelve": tiempo por puzle según Elo; probabilidad de acierto según Elo vs dificultad
      const botLoop = () => {
        if (st.over) return; const diff = st.lvl + st.botS * 40; const pOk = 1 / (1 + Math.pow(10, (diff - bot.elo) / 400));
        const wait = 4000 + Math.random() * 9000 * (1400 / (bot.elo + 400));
        timers.push(setTimeout(() => { if (st.over) return; if (Math.random() < pOk) { st.botS++; $('#bbot', v).textContent = st.botS; $('#bbot', v).animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], 250); } botLoop(); }, wait));
      };
      botLoop(); next();
    };
    const next = () => {
      const target = st.lvl + st.me * 45;
      const pool = PUZZLES.filter(p => !st.used.has(p.id) && Math.abs(p.rating - target) < 160);
      const p = pool.length ? rnd(pool) : rnd(PUZZLES); st.used.add(p.id);
      $('#bfb', v).innerHTML = `<div class="fb info"><span class="dot">${colorOf(p) === 'w' ? '♔' : '♚'}</span><div>Juegan ${colorOf(p) === 'w' ? 'blancas' : 'negras'}<small>${p.goal ? esc(p.goal) + ' · ' : ''}${p.rating}</small></div></div>`;
      let failed = false;
      PuzzleRunner(board, p, {
        onWrong() { if (failed || st.over) return; failed = true; st.strikes++; $$('#bx span', v)[st.strikes - 1].classList.add('x'); App.track('puzzle', { ok: false }); if (st.strikes >= 3) setTimeout(end, 500); else setTimeout(next, 700); },
        onDone(ok) { if (st.over || failed) return; st.me++; $('#bme', v).textContent = st.me; App.track('puzzle', { ok: true, themes: p.themes, rating: p.rating }); setTimeout(next, 350); }
      });
    };
    const end = () => {
      if (!st || st.over) return; st.over = true; stopAll(); board.opts.interactive = false;
      const win = st.me > st.botS; if (win) { S().battles = S().battles || {}; S().battles[st.bot.n] = (S().battles[st.bot.n] || 0) + 1; }
      App.track('battle', { win }); win ? Sound.good() : Sound.end();
      $('#bb', v).innerHTML = `<div class="fb ${win ? 'win' : st.me === st.botS ? 'info' : 'bad'}"><span class="dot">${win ? '🏆' : st.me === st.botS ? '½' : '✕'}</span><div>${win ? '¡Victoria!' : st.me === st.botS ? 'Empate' : 'Derrota'} · ${st.me} – ${st.botS}<small>Contra ${esc(st.bot.n)} (${st.bot.elo})</small></div></div>`;
      $('#bf', v).innerHTML = `<button class="btn pri" id="ba">Revancha</button><button class="btn" id="bo">Otro rival</button>`;
      const bot = st.bot; $('#ba', v).onclick = () => start(bot); $('#bo', v).onclick = pick;
    };
    pick();
    return () => { stopAll(); if (st) st.over = true; };
  };

  /* ======================= RUTA DE PUZLES ======================= */
  const ROUTE = [
    ['mateIn1', 'Mate en 1'], ['piezaColgada', 'Piezas colgadas'], ['horquilla', 'Horquillas'], ['clavada', 'Clavadas'], ['enfilada', 'Enfiladas'], ['ataqueDescubierto', 'Ataques descubiertos'],
    ['mateIn2', 'Mate en 2'], ['mateCorredor', 'Mate del pasillo'], ['desviacion', 'Desviación'], ['atraccion', 'Atracción'], ['sobrecarga', 'Sobrecarga'], ['eliminacionDefensor', 'Eliminar al defensor'],
    ['intermedia', 'Jugada intermedia'], ['coronacion', 'Coronación'], ['finalPeones', 'Finales de peones'], ['finalTorres', 'Finales de torres'], ['sacrificio', 'Sacrificios'], ['defensa', 'Defensa'],
    ['quietMove', 'Jugadas tranquilas'], ['mateIn3', 'Mate en 3'], ['zugzwang', 'Zugzwang'], ['molino', 'Molino'], ['rayosX', 'Rayos X'], ['mateIn4', 'Mate en 4+']
  ];
  const TIERS = [['Bronce', '#cd7f32', 0], ['Plata', '#c0c0c0', 350], ['Oro', '#f0c15c', 700]];
  VIEWS.ruta = (v) => {
    S().route = S().route || {};
    const avail = ROUTE.filter(([t]) => PUZZLES.filter(p => (p.themes || []).includes(t)).length >= 8);
    const stars = () => Object.values(S().route).reduce((a, x) => a + x, 0);
    const bb = boardBox({});
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head"><span style="font-size:24px">🗺️</span><span>Ruta de puzles</span><span class="tag y" style="margin-left:auto" id="rst"></span></div><div class="sp-body" id="rb"></div><div class="sp-foot" id="rf"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board; board.opts.interactive = false; board.setPosition('8/8/8/8/8/8/8/8 w - - 0 1', false);
    const map = () => {
      $('#rst', v).textContent = `★ ${stars()} / ${avail.length * 3}`;
      $('#rb', v).innerHTML = `<p class="muted" style="margin:0">Cada tema tiene 3 niveles: <b style="color:#cd7f32">bronce</b>, <b style="color:#c0c0c0">plata</b> y <b style="color:#f0c15c">oro</b>. Acierta 8 de 10 para ganar la estrella y desbloquear el siguiente tema.</p>
        <div style="display:grid;gap:6px">${avail.map(([t, name], i) => { const s = S().route[t] || 0; const locked = i > 0 && !(S().route[avail[i - 1][0]] >= 1); return `<div class="list-row" data-t="${t}" style="${locked ? 'opacity:.45;cursor:default' : ''}"><span style="width:32px;height:32px;border-radius:50%;background:${locked ? 'var(--bg3)' : 'var(--green)'};display:grid;place-items:center;font-weight:900;color:#fff;flex:none">${locked ? '🔒' : i + 1}</span><div class="grow"><h3>${esc(name)}</h3></div><span style="font-size:18px;letter-spacing:2px">${TIERS.map(([, c], k) => `<span style="color:${k < s ? c : 'var(--line)'}">★</span>`).join('')}</span></div>`; }).join('')}</div>`;
      $('#rf', v).innerHTML = '';
      $$('[data-t]', v).forEach((r, i) => r.onclick = () => { if (i > 0 && !(S().route[avail[i - 1][0]] >= 1)) { toast('Consigue al menos el bronce del tema anterior'); return; } play(avail[i]); });
    };
    const play = ([t, name]) => {
      const tier = Math.min(2, S().route[t] || 0); const [tn, tc, off] = TIERS[tier];
      const all = PUZZLES.filter(p => (p.themes || []).includes(t)).sort((a, b) => a.rating - b.rating);
      const base = all[Math.floor(all.length * off / 1000)] ? all[Math.floor(all.length * off / 1000)].rating : 800;
      const set = shuffle(all.filter(p => p.rating >= base - 100)).slice(0, 10);
      while (set.length < 10 && all.length) set.push(rnd(all));
      let i = 0, ok = 0, res = [];
      $('#rb', v).innerHTML = `<div class="chal"><div class="t"><span>${esc(name)} · <span style="color:${tc}">${tn}</span></span><span id="rn">1/10</span></div><div class="bar"><div id="rbar" style="width:0"></div></div></div><div id="rco"></div><div class="rush-list" id="rl"></div>`;
      $('#rf', v).innerHTML = '<button class="btn sm" id="rx">Abandonar</button>'; $('#rx', v).onclick = map;
      const nxt = () => {
        if (i >= set.length) return fin();
        const p = set[i]; $('#rn', v).textContent = `${i + 1}/10`; $('#rbar', v).style.width = (i * 10) + '%';
        App.coach($('#rco', v), null, `Juegan ${colorOf(p) === 'w' ? 'blancas' : 'negras'}`, `${p.goal ? esc(p.goal) + '. ' : ''}Busca el tema: <b>${esc(name)}</b>.`);
        let failed = false;
        PuzzleRunner(board, p, {
          onWrong() { if (failed) return; failed = true; res.push(0); $('#rl', v).appendChild(h('<span class="ko">✕</span>')); App.coach($('#rco', v), 'ko', 'No es la jugada', 'La respuesta era otra. Vamos con el siguiente.'); App.track('puzzle', { ok: false }); i++; setTimeout(nxt, 900); },
          onDone() { if (failed) return; ok++; res.push(1); $('#rl', v).appendChild(h('<span class="ok">✓</span>')); App.coach($('#rco', v), 'ok', '¡Correcto!', 'Patrón encontrado.'); App.track('puzzle', { ok: true, themes: p.themes, rating: p.rating }); i++; setTimeout(nxt, 700); }
        });
      };
      const fin = () => {
        $('#rbar', v).style.width = '100%'; const pass = ok >= 8;
        if (pass && (S().route[t] || 0) <= tier) { S().route[t] = tier + 1; App.track('route', { stars: stars() }); Sound.end(); }
        App.coach($('#rco', v), pass ? 'ok' : 'ko', pass ? `¡Estrella de ${tn}!` : `${ok}/10: necesitas 8`, pass ? 'Dominaste este nivel. Prueba el siguiente o pasa a otro tema.' : 'Repasa la lección de este tema en Táctica y vuelve a intentarlo.');
        $('#rf', v).innerHTML = `<button class="btn pri" id="ra">${pass && tier < 2 ? 'Siguiente nivel' : 'Repetir'}</button><button class="btn" id="rm">Mapa</button>`;
        $('#ra', v).onclick = () => play([t, name]); $('#rm', v).onclick = map;
      };
      nxt();
    };
    map();
  };

  /* ======================= DUELO LOCAL ======================= */
  VIEWS.duelo = (v) => {
    const bb = boardBox({});
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel"><div class="sp-head"><span style="font-size:24px">🤝</span><span>Duelo local</span></div><div class="sp-body" id="db"></div><div class="sp-foot" id="df"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const board = bb.board; board.opts.interactive = false; board.setPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', false);
    let st = null, tmr = null;
    const setup = () => {
      $('#db', v).innerHTML = `<p class="muted" style="margin:0">Dos jugadores, un dispositivo. Se turnan puzles de la misma dificultad, que sube cada ronda. Cada uno tiene 3 vidas y 45 segundos por puzle.</p>
        <input type="text" id="n1" value="Jugador 1"><input type="text" id="n2" value="Jugador 2">
        <div class="chips" id="dl">${[[600, 'Fácil'], [1100, 'Medio'], [1600, 'Difícil'], [2000, 'Experto']].map(([r, t], i) => `<button class="chip ${i === 1 ? 'on' : ''}" data-r="${r}">${t}</button>`).join('')}</div>`;
      $$('#dl .chip', v).forEach(c => c.onclick = () => { $$('#dl .chip', v).forEach(x => x.classList.remove('on')); c.classList.add('on'); });
      $('#df', v).innerHTML = '<button class="btn pri big" id="dgo">Empezar duelo</button>';
      $('#dgo', v).onclick = () => { st = { names: [$('#n1', v).value || 'Jugador 1', $('#n2', v).value || 'Jugador 2'], lives: [3, 3], pts: [0, 0], turn: 0, lvl: +$('#dl .chip.on', v).dataset.r, used: new Set(), round: 0 }; App.track('duel'); turn(); };
    };
    const turn = () => {
      clearInterval(tmr);
      if (st.lives[0] <= 0 || st.lives[1] <= 0) return fin();
      const who = st.turn; const target = st.lvl + Math.floor(st.round / 2) * 60;
      const pool = PUZZLES.filter(p => !st.used.has(p.id) && Math.abs(p.rating - target) < 150); const p = pool.length ? rnd(pool) : rnd(PUZZLES); st.used.add(p.id);
      let t = 45, done = false;
      $('#db', v).innerHTML = `<div class="grid g2" style="gap:8px">${[0, 1].map(k => `<div class="card" style="padding:10px;background:var(--bg3);${k === who ? 'outline:2px solid var(--green)' : ''}"><b style="color:var(--fg)">${esc(st.names[k])}</b><div style="display:flex;justify-content:space-between"><span>${'❤'.repeat(st.lives[k])}<span class="dim">${'❤'.repeat(3 - st.lives[k])}</span></span><b>${st.pts[k]}</b></div></div>`).join('')}</div>
        <div class="fb info"><span class="dot">${colorOf(p) === 'w' ? '♔' : '♚'}</span><div>Turno de ${esc(st.names[who])}<small>Juegan ${colorOf(p) === 'w' ? 'blancas' : 'negras'} · ${p.rating}</small></div></div><div class="vision-target" id="dt" style="font-size:40px">45</div>`;
      const fail = () => { if (done) return; done = true; clearInterval(tmr); st.lives[who]--; Sound.bad(); st.turn = 1 - who; st.round++; setTimeout(turn, 900); };
      tmr = setInterval(() => { t--; const e = $('#dt', v); if (e) e.textContent = t; if (t <= 5) Sound.tick(); if (t <= 0) fail(); }, 1000);
      PuzzleRunner(board, p, { onWrong: fail, onDone() { if (done) return; done = true; clearInterval(tmr); st.pts[who]++; st.turn = 1 - who; st.round++; setTimeout(turn, 700); } });
    };
    const fin = () => {
      clearInterval(tmr); board.opts.interactive = false; const w = st.lives[0] > 0 ? 0 : 1; Sound.end();
      $('#db', v).innerHTML = `<div class="fb win"><span class="dot">🏆</span><div>¡Gana ${esc(st.names[w])}!<small>${st.pts[0]} – ${st.pts[1]} puzles resueltos</small></div></div>`;
      $('#df', v).innerHTML = '<button class="btn pri" id="dr">Otro duelo</button>'; $('#dr', v).onclick = setup;
    };
    setup();
    return () => clearInterval(tmr);
  };
})();
