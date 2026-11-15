/* Coordenadas a ciegas: jugar contra Stockfish escribiendo (o dictando) las jugadas, sin ver el tablero.
   Acepta coordenadas (e2e4, e2-e4), notación algebraica en inglés (Nf3) o en español (Cf3), enroques (O-O, 0-0) y,
   por voz, frases como «caballo f3» o «peón e cuatro». La app anuncia la jugada del rival con la pieza y sus
   casillas, y puede leerla en voz alta. Ruta: #coordenadas. Documentado en docs/COORDENADAS.md. */
(function () {
  const { $, $$, h, esc, save, bump, san, toast, VIEWS, boardBox, playSound, uciToMove } = App;
  const S = () => App.S;
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const EMPTY = '8/8/8/8/8/8/8/8 w - - 0 1';
  const LV = [
    { elo: 400, skill: 0, depth: 1, mt: 60 }, { elo: 650, skill: 1, depth: 2, mt: 100 }, { elo: 850, skill: 3, depth: 3, mt: 150 }, { elo: 1050, skill: 5, depth: 4, mt: 200 },
    { elo: 1250, skill: 7, depth: 6, mt: 300 }, { elo: 1500, skill: 9, depth: 8, mt: 400 }, { elo: 1750, skill: 12, depth: 10, mt: 600 }, { elo: 2000, skill: 15, depth: 12, mt: 800 },
    { elo: 2400, skill: 18, depth: 16, mt: 1200 }, { elo: 3000, skill: 20, depth: 22, mt: 2000 }
  ];
  const VISTAS = {
    ciega: ['A ciegas total', 'Sin tablero ni lista: solo oyes y lees la última jugada del rival.'],
    lista: ['Solo la lista', 'Sin tablero, pero ves la lista de jugadas.'],
    vacio: ['Tablero vacío', 'Ves un tablero sin piezas con todas las coordenadas: te orienta, pero las piezas las llevas en la cabeza.'],
    visible: ['Tablero visible', 'Para empezar: ves las piezas, pero mueves escribiendo las coordenadas.']
  };
  const PN = { p: 'peón', n: 'caballo', b: 'alfil', r: 'torre', q: 'dama', k: 'rey' };
  const ES = { N: 'C', B: 'A', R: 'T', Q: 'D', K: 'R' };
  const toEs = (s) => s.replace(/^[NBRQK]/, x => ES[x]).replace(/=([NBRQ])/, (_, x) => '=' + ES[x]);
  const say = (m) => {
    if (m.flags.includes('k')) return 'enroque corto';
    if (m.flags.includes('q')) return 'enroque largo';
    return `${PN[m.piece]} de ${m.from} ${m.captured ? `captura ${PN[m.captured]} en` : 'a'} ${m.to}${m.flags.includes('e') ? ' al paso' : ''}${m.promotion ? ` y corona ${PN[m.promotion]}` : ''}${m.san.includes('#') ? ', jaque mate' : m.san.includes('+') ? ', jaque' : ''}`;
  };
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  // ---------- Lectura de la jugada escrita ----------
  const norm = (t) => String(t).replace(/[\s\-x:+#!?=().]/gi, '').replace(/^0/, 'O').replace(/0/g, 'O');
  function parse(g, raw) {
    let t = String(raw || '').trim(); if (!t) return { err: 'Escribe una jugada.' };
    const ms = g.moves({ verbose: true });
    const tl = t.toLowerCase().replace(/\s+/g, '');
    if (/^(o-?o-?o|0-?0-?0)$/.test(tl)) { const m = ms.find(x => x.flags.includes('q')); return m ? { m } : { err: 'Ahora no puedes enrocar largo.' }; }
    if (/^(o-?o|0-?0)$/.test(tl)) { const m = ms.find(x => x.flags.includes('k')); return m ? { m } : { err: 'Ahora no puedes enrocar corto.' }; }
    // Coordenadas de origen y destino: e2e4, e2-e4, e7e8q (coronación con q/r/b/n o d/t/a/c)
    const c = tl.replace(/[-x]/g, '').match(/^[nbrqkcatd]?([a-h][1-8])([a-h][1-8])([qrbndtac])?$/);
    if (c) {
      const pr = c[3] ? ({ d: 'q', t: 'r', a: 'b', c: 'n' }[c[3]] || c[3]) : null;
      const cand = ms.filter(x => x.from === c[1] && x.to === c[2]);
      if (!cand.length) { const p = g.get(c[1]); return { err: !p ? `No hay ninguna pieza en ${c[1]}.` : p.color !== g.turn() ? `En ${c[1]} hay una pieza del rival.` : `Tu ${PN[p.type]} de ${c[1]} no puede ir a ${c[2]}.` }; }
      return { m: cand.find(x => (x.promotion || null) === (pr || (x.promotion ? 'q' : null))) || cand[0] };
    }
    // Notación algebraica (inglés o español), primero respetando mayúsculas y después sin distinguirlas
    const n = norm(t);
    const keys = (m) => [norm(m.san), norm(toEs(m.san))];
    let hit = ms.filter(m => keys(m).includes(n));
    if (!hit.length) { const nl = n.toLowerCase(); hit = ms.filter(m => keys(m).some(k => k.toLowerCase() === nl)); }
    if (hit.length === 1) return { m: hit[0] };
    if (hit.length > 1) return { err: `Hay varias jugadas posibles (${hit.map(m => toEs(m.san)).join(', ')}). Indica la casilla de origen, por ejemplo ${hit[0].from}${hit[0].to}.` };
    const dest = (t.match(/[a-h][1-8]/gi) || []).pop();
    return { err: dest ? `Esa jugada no es legal ahora. Revisa qué pieza puede llegar a ${dest.toLowerCase()}.` : 'No entendí la jugada. Usa coordenadas (e2e4) o notación (Cf3, exd5, O-O).' };
  }
  // ---------- Lectura de una frase dictada ----------
  function fromSpeech(t) {
    let s = ' ' + String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + ' ';
    if (/enroque largo/.test(s)) return 'O-O-O'; if (/enroque( corto)?/.test(s)) return 'O-O';
    const W = { caballo: 'C', alfil: 'A', torre: 'T', dama: 'D', reina: 'D', rey: 'R', peon: '' };
    const F = { a: 'a', be: 'b', b: 'b', ce: 'c', c: 'c', de: 'd', d: 'd', e: 'e', efe: 'f', f: 'f', ge: 'g', g: 'g', hache: 'h', h: 'h', ache: 'h' };
    const N = { uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8 };
    let out = '', prom = '';
    s.replace(/corona(r)? (a )?(caballo|alfil|torre|dama|reina)/, (_, a, b, p) => { prom = '=' + W[p]; return ''; })
      .replace(/\b(en|por|captura|come|toma|al|la|el|jaque|mate|y)\b/g, ' ')
      .split(/\s+/).filter(Boolean).forEach((w, k, all) => {
        const nx = all[k + 1], isNum = nx && (nx in N || /^[1-8]$/.test(nx));
        if ((w === 'de' || w === 'a') && !isNum) return; // «de» y «a» son letras solo si sigue un número
        if (w in W && !out) out += W[w];
        else if (/^[a-h][1-8]$/.test(w)) out += w;
        else if (w in F) out += F[w];
        else if (w in N) out += N[w];
        else if (/^[1-8]$/.test(w)) out += w;
      });
    return out + prom;
  }

  VIEWS.coordenadas = (v) => {
    const eng = App.getEngine();
    const cfg = Object.assign({ lvl: 3, color: 'w', vista: 'ciega', voz: true }, S().settings.coord || {});
    const bb = boardBox({ interactive: false }); const board = bb.board; board.opts.interactive = false;
    const layout = h('<div class="play"></div>');
    const stage = h('<div class="co-stage"></div>'); stage.appendChild(bb.el);
    const blind = h(`<div class="co-blind"><div class="co-eye">${App.LINE_IC && App.LINE_IC.coordenadas || ''}</div><div class="co-last" id="coLast">Tablero oculto</div><div class="co-sub" id="coSub">Juega escribiendo las coordenadas</div></div>`);
    stage.appendChild(blind); layout.appendChild(stage);
    const panel = h(`<div class="side-panel"><div class="sp-head"><span>Coordenadas a ciegas</span><span class="tag" style="margin-left:auto" id="coEng"></span></div><div class="sp-body" id="coB"></div><div class="sp-foot" id="coF"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    const engTag = () => { const t = $('#coEng', v); if (t) t.textContent = eng.ready ? eng.name : eng.failed ? 'Motor JS básico' : 'Cargando motor…'; };
    engTag(); window.addEventListener('engine-ready', engTag);
    let g, me, over = false, thinking = false, peeks = 0, helps = 0, bad = 0, peekT = null, rec = null;
    const speak = (t) => { if (!cfg.voz || !window.speechSynthesis) return; try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'es-MX'; u.rate = 0.95; speechSynthesis.speak(u); } catch (e) { } };
    const showBoard = (on) => { bb.el.style.display = on ? '' : 'none'; blind.style.display = on ? 'none' : ''; };
    const paintBoard = () => {
      if (cfg.vista === 'visible') { showBoard(true); board.setPosition(g.fen(), true); }
      else if (cfg.vista === 'vacio') { showBoard(true); board.setPosition(EMPTY, false); board.setAllCoords(true); }
      else showBoard(false);
    };

    const setup = () => {
      over = false; showBoard(false); $('#coLast', v).textContent = 'Tablero oculto'; $('#coSub', v).textContent = 'Juega escribiendo las coordenadas';
      $('#coB', v).innerHTML = `<p class="muted" style="margin:0">Juega una partida completa contra Stockfish <b>sin ver las piezas</b>: escribe tus jugadas con coordenadas y la app te dice la del rival. Es el mejor entrenamiento de visualización y de las coordenadas del tablero.</p>
        <div><div class="sec-t" style="margin-bottom:6px">Qué ves</div><div class="chips" id="coV">${Object.entries(VISTAS).map(([k, x]) => `<button class="chip" data-v="${k}">${x[0]}</button>`).join('')}</div><div class="dim" id="coVd" style="font-size:13px;margin-top:6px"></div></div>
        <div><div class="sec-t" style="margin-bottom:6px">Nivel del motor</div><input type="range" id="coL" min="1" max="10" value="${cfg.lvl}" style="width:100%;accent-color:#3692e7"><div style="display:flex;justify-content:space-between"><b id="coLt"></b><span class="dim" id="coLe"></span></div></div>
        <div><div class="sec-t" style="margin-bottom:6px">Juegas con</div><div class="chips" id="coC"><button class="chip" data-v="w">Blancas</button><button class="chip" data-v="r">Aleatorio</button><button class="chip" data-v="b">Negras</button></div></div>
        <label class="ck"><input type="checkbox" id="coVoz" ${cfg.voz ? 'checked' : ''}> Leer en voz alta las jugadas del rival</label>
        <div class="co-help"><b>Cómo escribir las jugadas</b><ul><li>Coordenadas: <code>e2e4</code>, <code>g1f3</code>, <code>e7e8d</code> (corona dama).</li><li>Notación: <code>e4</code>, <code>Cf3</code> o <code>Nf3</code>, <code>exd5</code>, <code>O-O</code> o <code>0-0</code>.</li><li>Por voz (si tu navegador lo permite): «caballo f3», «peón e cuatro», «enroque corto».</li></ul></div>
        <p class="dim" style="font-size:13px;margin:0">¿Antes quieres practicar las casillas? Prueba <a href="#vision">Visión y cálculo</a>: coordenadas, color de casilla y memoria.</p>`;
      $('#coF', v).innerHTML = '<button class="btn pri big" id="coGo">Empezar partida</button>';
      const paint = () => { $$('#coV .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === cfg.vista)); $('#coVd', v).textContent = VISTAS[cfg.vista][1]; $$('#coC .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === cfg.color)); const l = LV[cfg.lvl - 1]; $('#coLt', v).textContent = 'Nivel ' + cfg.lvl; $('#coLe', v).textContent = cfg.lvl === 10 ? 'Fuerza máxima' : '≈ ' + l.elo + ' Elo'; };
      $$('#coV .chip', v).forEach(c => c.onclick = () => { cfg.vista = c.dataset.v; paint(); });
      $$('#coC .chip', v).forEach(c => c.onclick = () => { cfg.color = c.dataset.v; paint(); });
      $('#coL', v).oninput = (e) => { cfg.lvl = +e.target.value; paint(); };
      $('#coVoz', v).onchange = (e) => { cfg.voz = e.target.checked; };
      $('#coGo', v).onclick = start; paint();
    };

    const hist = () => { const hs = g.history(); let s = ''; hs.forEach((m, k) => { if (k % 2 === 0) s += `<b>${k / 2 + 1}.</b> `; s += `<span class="mv">${esc(m)}</span> `; }); return App.fixMv(s) || '<span class="dim">Aún no hay jugadas.</span>'; };
    const PL = { p: 'Peones', n: 'Caballos', b: 'Alfiles', r: 'Torres', q: 'Damas', k: 'Rey' };
    const listPieces = (col) => { const out = {}; g.board().forEach((r, ri) => r.forEach((p, fi) => { if (p && p.color === col) (out[p.type] = out[p.type] || []).push('abcdefgh'[fi] + (8 - ri)); })); return ['k', 'q', 'r', 'b', 'n', 'p'].filter(t => out[t]).map(t => `<b>${out[t].length > 1 ? PL[t] : cap(PN[t])}:</b> ${out[t].sort().join(', ')}`).join('<br>'); };
    const status = (html, cls) => { $('#coMsg', v).innerHTML = html ? `<div class="fb ${cls || 'info'}" style="animation:none"><span class="dot">${cls === 'bad' ? '✕' : cls === 'win' ? '✓' : '♟'}</span><div>${html}</div></div>` : ''; };

    const start = () => {
      S().settings.coord = cfg; save();
      me = cfg.color === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : cfg.color;
      g = new Chess(); over = false; peeks = 0; helps = 0; bad = 0; eng.newGame && eng.newGame();
      board.setOrientation(me === 'w' ? 'white' : 'black'); board.setAllCoords(cfg.vista === 'vacio'); board.setArrows([]); board.setLastMove(null);
      $('#coB', v).innerHTML = `<div class="co-turn" id="coTurn"></div>
        <div class="co-in"><input type="text" id="coIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Tu jugada: e2e4, Cf3, O-O…"><button class="btn pri" id="coPlay">Jugar</button>${(window.SpeechRecognition || window.webkitSpeechRecognition) ? '<button class="btn" id="coMic" title="Dictar la jugada">🎤</button>' : ''}</div>
        <div id="coMsg"></div>
        <div class="co-tools"><button class="btn sm" id="coPeek">👁 Ver tablero 3 s</button><button class="btn sm" id="coMine">📋 Mis piezas</button><button class="btn sm" id="coHis">📜 Jugadas</button><button class="btn sm" id="coRep">🔊 Repetir</button></div>
        <div id="coExtra"></div>
        <div class="co-stats dim" id="coSt"></div>
        <div id="coList" ${cfg.vista === 'lista' || cfg.vista === 'visible' ? '' : 'hidden'}><div class="sec-t" style="margin:8px 0 4px">Jugadas</div><div class="co-hist" id="coH"></div></div>`;
      $('#coF', v).innerHTML = '<button class="btn" id="coRes">🏳 Rendirse</button><button class="btn ghost" id="coNew">Configurar</button>';
      paintBoard(); refresh();
      const inp = $('#coIn', v);
      const submit = () => { if (over || thinking || g.turn() !== me) return; const r = parse(g, inp.value); if (r.err) { bad++; Sound.bad(); status(esc(r.err), 'bad'); refresh(); inp.select(); return; } inp.value = ''; play(r.m); };
      $('#coPlay', v).onclick = submit; inp.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
      $('#coPeek', v).onclick = () => { if (cfg.vista === 'visible') return; peeks++; clearTimeout(peekT); showBoard(true); board.setAllCoords(true); board.setPosition(g.fen(), false); refresh(); peekT = setTimeout(() => { board.setAllCoords(cfg.vista === 'vacio'); paintBoard(); }, 3000); };
      $('#coMine', v).onclick = () => { helps++; $('#coExtra', v).innerHTML = `<div class="co-box"><div class="sec-t">Tus piezas (${me === 'w' ? 'blancas' : 'negras'})</div><div>${listPieces(me)}</div><div class="sec-t" style="margin-top:8px">Piezas del rival</div><div>${listPieces(me === 'w' ? 'b' : 'w')}</div></div>`; refresh(); };
      $('#coHis', v).onclick = () => { if (cfg.vista === 'ciega') helps++; $('#coList', v).hidden = !$('#coList', v).hidden; refresh(); };
      $('#coRep', v).onclick = () => { const lm = g.history({ verbose: true }).filter(m => m.color !== me).pop(); if (lm) speak(say(lm)); };
      $('#coRes', v).onclick = () => { if (!over && confirm('¿Rendirte?')) finish('loss', 'por abandono'); };
      $('#coNew', v).onclick = () => { if (over || confirm('¿Abandonar esta partida?')) { over = true; setup(); } };
      if ($('#coMic', v)) $('#coMic', v).onclick = () => {
        try {
          const R = window.SpeechRecognition || window.webkitSpeechRecognition; rec = new R(); rec.lang = 'es-MX'; rec.interimResults = false; rec.maxAlternatives = 3;
          $('#coMic', v).classList.add('pri'); status('Escuchando… di tu jugada, por ejemplo «caballo f3».');
          rec.onresult = (e) => { const alts = [...e.results[0]].map(x => x.transcript); let ok = null; for (const a of alts) { const r = parse(g, fromSpeech(a)); if (r.m) { ok = r.m; break; } } if (ok) { inp.value = ''; play(ok); } else { bad++; status(`Entendí «${esc(alts[0])}», pero no es una jugada legal. Prueba otra vez o escríbela.`, 'bad'); refresh(); } };
          rec.onend = () => { const b = $('#coMic', v); if (b) b.classList.remove('pri'); };
          rec.onerror = () => status('No se pudo usar el micrófono. Escribe la jugada.', 'bad');
          rec.start();
        } catch (e) { status('Tu navegador no permite dictar. Escribe la jugada.', 'bad'); }
      };
      if (g.turn() !== me) engineMove(); else { status(`Juegas con <b>${me === 'w' ? 'blancas' : 'negras'}</b>. Escribe tu primera jugada.`); inp.focus(); }
    };
    const refresh = () => {
      if (!g) return;
      const t = $('#coTurn', v); if (t) t.innerHTML = over ? 'Partida terminada' : thinking ? 'Stockfish piensa…' : g.turn() === me ? `Te toca · jugada ${Math.floor(g.history().length / 2) + 1}${g.in_check() ? ' · <b style="color:var(--red)">¡estás en jaque!</b>' : ''}` : 'Turno del rival';
      const st = $('#coSt', v); if (st) st.textContent = `Vistazos al tablero: ${peeks} · ayudas: ${helps} · jugadas no válidas: ${bad}`;
      const hh = $('#coH', v); if (hh) hh.innerHTML = hist();
    };
    const play = (m) => {
      const r = g.move({ from: m.from, to: m.to, promotion: m.promotion }); if (!r) return; playSound(r);
      $('#coExtra', v).innerHTML = ''; board.setLastMove([r.from, r.to]);
      $('#coLast', v).textContent = `Tú: ${toEs(r.san)}`; $('#coSub', v).textContent = cap(say(r));
      status(`Jugaste <b>${esc(toEs(r.san))}</b>: ${esc(say(r))}.`, 'win'); paintBoard(); refresh();
      if (!checkEnd()) engineMove();
    };
    const engineMove = async () => {
      thinking = true; refresh(); const L = LV[cfg.lvl - 1], t0 = Date.now();
      const r = await eng.analyze(g.fen(), { skill: L.skill, depth: L.depth, movetime: L.mt });
      if (over || !App.isView('coordenadas')) { thinking = false; return; }
      await new Promise(res => setTimeout(res, Math.max(0, 500 - (Date.now() - t0))));
      const m = r && r.bestmove ? g.move(uciToMove(r.bestmove)) : null; thinking = false;
      if (!m) { const ms = g.moves(); if (!ms.length) { checkEnd(); return; } g.move(ms[0]); }
      const lm = g.history({ verbose: true }).pop(); playSound(lm); board.setLastMove([lm.from, lm.to]);
      const who = lm.color === 'w' ? 'Blancas' : 'Negras';
      $('#coLast', v).textContent = `${who}: ${toEs(lm.san)}`; $('#coSub', v).textContent = cap(say(lm));
      status(`<b>${who}: ${esc(toEs(lm.san))}</b><small>${esc(cap(say(lm)))}</small>`); speak(say(lm));
      paintBoard(); refresh(); if (!checkEnd()) { const i = $('#coIn', v); if (i) i.focus(); }
    };
    const checkEnd = () => {
      if (!g.game_over()) return false;
      if (g.in_checkmate()) finish(g.turn() === me ? 'loss' : 'win', 'por jaque mate');
      else finish('draw', g.in_stalemate() ? 'por ahogado' : g.in_threefold_repetition() ? 'por triple repetición' : g.insufficient_material() ? 'por material insuficiente' : 'por la regla de las 50 jugadas');
      return true;
    };
    const finish = (res, why) => {
      if (over) return; over = true; clearTimeout(peekT);
      const pgn = g.pgn(), d = Date.now();
      S().games.push({ pgn, res, why, me, lvl: cfg.lvl, d, blind: cfg.vista }); if (S().games.length > 200) S().games.shift();
      const xp = (res === 'win' ? 40 : 10) + (res === 'win' && !peeks && !helps ? 20 : 0); App.addXP && App.addXP(xp);
      const C = S().coordStats = S().coordStats || { games: 0, wins: 0, clean: 0 }; C.games++; if (res === 'win') C.wins++; if (!peeks && !helps) C.clean++;
      save(); bump(); App.track && App.track('game', { res });
      showBoard(true); board.setAllCoords(false); board.setPosition(g.fen(), false);
      const title = res === 'win' ? '¡Ganaste a ciegas!' : res === 'loss' ? 'Perdiste' : 'Tablas';
      status(`<b>${title}</b> ${esc(why)}.<small>${g.history().length} jugadas · ${peeks} vistazos · ${helps} ayudas · ${bad} jugadas no válidas · +${xp} XP</small>`, res === 'win' ? 'win' : res === 'loss' ? 'bad' : 'info');
      speak(`${title} ${why}`);
      $('#coF', v).innerHTML = '<button class="btn pri" id="coRev">Revisar partida</button><button class="btn" id="coAgain">Nueva partida</button>';
      $('#coRev', v).onclick = () => { App.reviewGame = { pgn, fen: null, me, res, d }; location.hash = '#analisis'; };
      $('#coAgain', v).onclick = setup; refresh();
    };
    setup();
    return () => { over = true; clearTimeout(peekT); try { rec && rec.abort(); window.speechSynthesis && speechSynthesis.cancel(); } catch (e) { } window.removeEventListener('engine-ready', engTag); };
  };
  App.coordParse = { parse, fromSpeech };
})();
