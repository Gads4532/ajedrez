/* Aprender: aperturas, lecciones (principios, táctica, medio juego, finales), metodologías, plan y enciclopedia. */
(function () {
  const { $, $$, h, esc, rnd, shuffle, save, bump, san, fixMv, lineText, toast, VIEWS, boardBox, playSound, moveList, proscons, statBar, IC, pIc } = App;
  const S = () => App.S;
  const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const lvlTag = (l) => l ? `<span class="tag ${l === 'principiante' ? 'g' : l === 'intermedio' ? 'y' : 'r'}">${esc(l)}</span>` : '';
  const ul = (a) => a && a.length ? `<ul>${a.map(x => `<li>${fixMv(x)}</li>`).join('')}</ul>` : '';

  /* ---------- Visor de líneas: tablero + navegación ---------- */
  function LineViewer(board, startFen, moves, comments, onStep, ctx) {
    const g = new Chess(startFen || START); const fens = [g.fen()], sans = [], last = [null];
    const tags = []; let prev = null;
    for (const m of moves || []) { const f0 = g.fen(); const r = g.move(m, { sloppy: true }); if (!r) break; tags.push(window.Purpose ? Purpose.of(f0, r, prev, ctx) : []); prev = r; fens.push(g.fen()); sans.push(r.san); last.push([r.from, r.to, r]); }
    let i = 0;
    const lv = {
      fens, sans, tags, get i() { return i; },
      go(k, sound = true) {
        k = Math.max(0, Math.min(fens.length - 1, k)); const fwd = k === i + 1; i = k;
        board.setPosition(fens[i], true);
        board.setLastMove(last[i] ? [last[i][0], last[i][1]] : null);
        const t = new Chess(fens[i]); board.setCheck(t.in_check() ? findKing(t, t.turn()) : null);
        if (sound && fwd && last[i]) playSound(last[i][2]);
        onStep && onStep(i, comments ? comments[i - 1] : null);
      }
    };
    return lv;
  }
  function navButtons(lv) {
    const d = h(`<div class="nav-btns"><button class="btn sm" data-a="0" title="Inicio">⏮</button><button class="btn sm" data-a="-1" title="Anterior">◀</button><button class="btn sm" data-a="1" title="Siguiente">▶</button><button class="btn sm" data-a="9" title="Final">⏭</button></div>`);
    $$('[data-a]', d).forEach(b => b.onclick = () => { const a = +b.dataset.a; lv().go(a === 0 ? 0 : a === 9 ? lv().fens.length - 1 : lv().i + a); });
    return d;
  }
  function keyNav(lv) {
    const f = (e) => { if (e.target.closest('input,textarea,select')) return; if (e.key === 'ArrowRight') { lv().go(lv().i + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { lv().go(lv().i - 1); e.preventDefault(); } };
    document.addEventListener('keydown', f); return () => document.removeEventListener('keydown', f);
  }

  /* ======================= APERTURAS ======================= */
  VIEWS.aperturas = (v) => {
    let grp = 'todas', side = 'todas', q = '';
    v.appendChild(h(`<div>
      <div class="page-h"><div><h1>Aperturas</h1><p>${OPENINGS.length} aperturas con su línea principal comentada, estadísticas aproximadas de bases magistrales, ideas y planes de ambos bandos, pros y contras, variantes y trampas. Cada una tiene un modo de entrenamiento con repetición espaciada.</p></div></div>
      <details class="acc" style="margin-bottom:16px" ${S().settings.opRoute === false ? '' : 'open'} id="opRt"><summary>🗺 Ruta de aperturas: de las sencillas a la teoría avanzada</summary><div>${App.routeHTML ? App.routeHTML('aperturas') : ''}<p class="dim" style="font-size:12.5px;margin:8px 0 0">Una apertura cuenta como superada al llegar a la caja 2 en «Entrenar» (★ caja 2, ★★ caja 3-4, ★★★ caja 5).</p></div></details>
      <div class="card" style="display:grid;gap:10px;margin-bottom:16px">
        <input type="text" id="oq" placeholder="Buscar por nombre o código ECO…" style="width:100%">
        <div style="display:flex;gap:16px;flex-wrap:wrap"><div class="chips" id="og">${[['todas', 'Todas'], ['e4', '1.e4'], ['d4', '1.d4'], ['flancos', 'Flancos']].map(([k, t]) => `<button class="chip" data-v="${k}">${t}</button>`).join('')}</div>
        <div class="chips" id="os">${[['todas', 'Ambos bandos'], ['blancas', 'Para blancas'], ['negras', 'Para negras']].map(([k, t]) => `<button class="chip" data-v="${k}">${t}</button>`).join('')}</div></div>
      </div>
      <div class="grid g3" id="ol"></div>
      <div class="card" style="margin-top:20px"><h3 style="font-size:17px;font-weight:900;margin-bottom:6px">Cómo construir tu repertorio</h3><div class="prose">
        <p>Los entrenadores profesionales coinciden en que el repertorio debe <b>encajar con tu estilo y con el tipo de posiciones que quieres entender</b>, no con la moda. Para principiantes: aperturas abiertas (1.e4 e5) donde se aprende desarrollo, ataque y táctica. A partir de nivel intermedio: un repertorio estable con una respuesta a 1.e4, otra a 1.d4 y un sistema con blancas.</p>
        <p>Estudia <b>ideas y estructuras de peones</b> antes que memorizar jugadas; revisa tus partidas para ver dónde salías de la teoría y amplía solo allí. Usa la repetición espaciada (modo “Entrenar” de cada apertura) para fijar las líneas.</p></div></div>
    </div>`));
    const paint = () => {
      $$('#og .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === grp)); $$('#os .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === side));
      const list = OPENINGS.filter(o => (grp === 'todas' || o.group === grp) && (side === 'todas' || o.side === side) && (!q || (o.name + ' ' + o.eco).toLowerCase().includes(q)));
      $('#ol', v).innerHTML = list.map(o => {
        const sr = S().open[o.id];
        return `<a class="tile" href="#ap-${o.id}"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span class="eco">${esc(o.eco)}</span><span class="tags">${lvlTag(o.level)}${sr ? `<span class="tag b">Caja ${sr.box}</span>` : ''}</span></div><h3>${esc(o.name)}</h3><p>${esc(lineText(o.moves.slice(0, 6)))}</p>${statBar(o.stats)}<p style="font-size:12.5px">${esc(o.type || '')} · para ${esc(o.side)}</p></a>`;
      }).join('') || '<p class="muted">Sin resultados.</p>';
    };
    $$('#og .chip', v).forEach(c => c.onclick = () => { grp = c.dataset.v; paint(); });
    $$('#os .chip', v).forEach(c => c.onclick = () => { side = c.dataset.v; paint(); });
    $('#oq', v).oninput = (e) => { q = e.target.value.toLowerCase(); paint(); };
    paint();
  };

  VIEWS.ap = (v, id) => {
    const o = OPENINGS.find(x => x.id === id); if (!o) { location.hash = '#aperturas'; return; }
    const bb = boardBox({ interactive: false, orientation: o.side === 'negras' ? 'black' : 'white' });
    const board = bb.board; board.opts.interactive = false;
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const panel = h(`<div class="side-panel">
      <div class="sp-head" style="flex-direction:column;align-items:flex-start;gap:4px"><a href="#aperturas" class="dim" style="font-size:13px;text-decoration:none">← Aperturas</a><span>${esc(o.name)}</span><span class="eco">${esc(o.eco)} · ${esc(o.type || '')}</span></div>
      <div class="sp-tabs" id="tabs"><button data-t="linea">Línea</button><button data-t="aprender">Aprender</button><button data-t="ideas">Ideas</button><button data-t="var">Variantes</button><button data-t="trampas">Trampas</button><button data-t="entrenar">Entrenar</button></div>
      <div class="sp-body" id="body"></div>
      <div class="sp-foot" id="foot"></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    let lv = null, tab = 'linea', drillStop = null;
    const loadLine = (moves, comments) => {
      lv = LineViewer(board, START, moves, comments, (i, c) => {
        const ml = $('#ml', v); if (ml) moveList(ml, lv.sans, i - 1, (k) => lv.go(k + 1), null, 'w', 1, lv.tags);
        const cb = $('#cm', v); if (cb) { if (i === 0) App.coach(cb, null, esc(o.name), `${(o.style || []).length ? `<div class="ptags">Estilo: ${o.style.map(s => `<span class="ptag" style="--pc:#5c8bb0">${esc(s)}</span>`).join('')}</div>` : ''}${fixMv(esc(o.goal || o.summary || ''))}`); else App.coach(cb, 'ok', `${esc(san(lv.sans[i - 1]))} es la jugada`, `<div class="ptags">${Purpose.chips(lv.tags[i - 1] || [])}</div>` + (c ? fixMv(esc(c)) : '') + Purpose.chips(lv.tags[i - 1] || [], true).replace(/^.*?(<div class="pdesc">)/, '$1')); }
      });
      lv.go(0, false);
    };
    const tabs = {
      linea() {
        $('#body', v).innerHTML = `<div>${statBar(o.stats)}<div style="display:flex;justify-content:space-between;font-size:12px;margin-top:4px" class="dim"><span>Blancas ganan</span><span>Tablas</span><span>Negras ganan</span></div><div class="dim" style="font-size:12px;margin-top:4px">${esc(o.stats && o.stats.note || '')}${o.stats && o.stats.popularity ? ' · Popularidad: ' + esc(o.stats.popularity) : ''}</div></div>
          <div id="cm"></div><div id="ml"></div>`;
        $('#foot', v).innerHTML = ''; $('#foot', v).appendChild(navButtons(() => lv)); $('.nav-btns', v).style.flex = '1';
        loadLine(o.moves, o.comments); lv.go(lv.fens.length - 1, false); lv.go(0, false);
      },
      ideas() {
        const dots = (n, c) => `<span style="letter-spacing:2px;color:${c}">${'●'.repeat(n || 0)}<span style="color:var(--line)">${'●'.repeat(5 - (n || 0))}</span></span>`;
        $('#body', v).innerHTML = `${o.style ? `<div class="tags">${o.style.map(s => `<span class="tag g">${esc(s)}</span>`).join('')}</div>` : ''}
          ${o.goal ? `<div class="comment-box"><b>El fin de esta apertura:</b> ${fixMv(esc(o.goal))}</div>` : ''}
          <div class="grid g2" style="gap:8px"><div class="kv"><span>Riesgo</span>${dots(o.riskLevel, 'var(--red)')}</div><div class="kv"><span>Teoría</span>${dots(o.theoryLoad, 'var(--yellow)')}</div></div>
          <div class="prose">
          <p>${fixMv(esc(o.summary || ''))}</p>
          ${o.profile ? `<h4>¿Para quién?</h4><p>${esc(o.profile)}</p>` : ''}
          ${o.keyPieces ? `<h4>Piezas clave</h4><p>${fixMv(esc(o.keyPieces))}</p>` : ''}
          ${o.middlegame ? `<h4>Medio juego típico</h4>${ul(o.middlegame)}` : ''}
          ${o.endgames ? `<h4>Finales a los que tiende</h4>${ul(o.endgames)}` : ''}
          ${o.ideas ? `<h4>Ideas clave</h4>${ul(o.ideas)}` : ''}
          ${o.plansWhite ? `<h4>Planes de las blancas</h4>${ul(o.plansWhite)}` : ''}
          ${o.plansBlack ? `<h4>Planes de las negras</h4>${ul(o.plansBlack)}` : ''}
          ${o.structures ? `<h4>Estructura de peones</h4><p>${fixMv(esc(o.structures))}</p>` : ''}</div>
          ${proscons(o.pros, o.cons)}
          <div class="kv"><span>Nivel recomendado</span><b>${esc(o.level || '')}</b></div><div class="kv"><span>Rating típico</span><b>${esc(o.stats && o.stats.elo || '')}</b></div>
          ${o.players ? `<div><div class="sec-t">Jugadores de referencia</div><div class="tags" style="margin-top:6px">${o.players.map(p => `<span class="tag">${esc(p)}</span>`).join('')}</div></div>` : ''}`;
        $('#foot', v).innerHTML = '';
      },
      var() {
        const vs = o.variations || [];
        $('#body', v).innerHTML = vs.length ? vs.map((x, i) => `<div class="list-row" data-i="${i}"><div class="grow"><h3>${esc(x.name)}</h3><p>${esc(lineText(x.moves))}</p>${x.note ? `<p style="margin-top:4px">${fixMv(esc(x.note))}</p>` : ''}</div></div>`).join('') + '<div id="ml"></div><div id="cm" hidden></div>' : '<p class="muted">Sin variantes registradas.</p>';
        $('#foot', v).innerHTML = ''; $('#foot', v).appendChild(navButtons(() => lv));
        $$('[data-i]', v).forEach(r => r.onclick = () => { $$('[data-i]', v).forEach(x => x.style.outline = ''); r.style.outline = '2px solid var(--green)'; const x = vs[+r.dataset.i]; loadLine(x.moves, null); lv.go(lv.fens.length - 1); });
        if (vs.length) $('[data-i]', v).click();
      },
      trampas() {
        const ts = o.traps || [];
        $('#body', v).innerHTML = ts.length ? ts.map((x, i) => `<div class="list-row" data-i="${i}" style="flex-direction:column;align-items:stretch"><h3>⚠ ${esc(x.name)}</h3><p>${esc(lineText(x.moves))}</p><p style="margin-top:4px">${fixMv(esc(x.explanation))}</p></div>`).join('') + '<div id="ml"></div>' : '<p class="muted">No hay trampas célebres registradas en esta apertura.</p>';
        $('#foot', v).innerHTML = ''; $('#foot', v).appendChild(navButtons(() => lv));
        $$('[data-i]', v).forEach(r => r.onclick = () => { $$('[data-i]', v).forEach(x => x.style.outline = ''); r.style.outline = '2px solid var(--red)'; const x = ts[+r.dataset.i]; loadLine(x.moves, null); lv.go(0, false); let k = 0; const step = () => { if (!lv || k >= lv.fens.length - 1 || tab !== 'trampas') return; lv.go(++k); setTimeout(step, 650); }; setTimeout(step, 300); });
      },
      aprender() {
        // Aprender moviendo: el usuario juega las jugadas de ambos bandos guiado por nombre de pieza y coordenadas.
        const lines = [o.moves, ...(o.variations || []).map(x => x.moves)];
        const PN = { p: 'Peón', n: 'Caballo', b: 'Alfil', r: 'Torre', q: 'Dama', k: 'Rey' };
        const say = (m) => {
          if (m.flags.includes('k')) return `Enroque corto: rey de <span class="mv">${m.from}</span> a <span class="mv">${m.to}</span> y la torre salta al otro lado`;
          if (m.flags.includes('q')) return `Enroque largo: rey de <span class="mv">${m.from}</span> a <span class="mv">${m.to}</span> y la torre salta al otro lado`;
          return `${PN[m.piece]} de <span class="mv">${m.from}</span> ${m.captured ? 'captura en' : 'a'} <span class="mv">${m.to}</span>${m.flags.includes('e') ? ' (captura al paso)' : ''}${m.promotion ? ' y corona' : ''}${m.san.includes('#') ? ' — jaque mate' : m.san.includes('+') ? ' con jaque' : ''}`;
        };
        let level = (S().settings.learnLvl) || 'guia', coords = S().settings.learnCoords !== false, side = S().settings.learnSide || 'both';
        $('#body', v).innerHTML = `<p class="muted" style="margin:0">Aprende la apertura moviendo tú las piezas de <b>los dos bandos</b>. Cada jugada se indica con la pieza y sus casillas (de dónde sale y a dónde va), y el entrenador explica por qué se juega.</p>
          <div><div class="sec-t" style="margin-bottom:6px">Qué bando mueves</div><div class="chips" id="lside"><button class="chip" data-s="both">Ambos bandos</button><button class="chip" data-s="w">Solo blancas</button><button class="chip" data-s="b">Solo negras</button></div></div>
          <div><div class="sec-t" style="margin-bottom:6px">Ayuda</div><div class="chips" id="lvl"><button class="chip" data-l="guia">Flecha + coordenadas</button><button class="chip" data-l="coord">Solo coordenadas</button><button class="chip" data-l="nada">Sin ayuda</button></div></div>
          <label class="ck"><input type="checkbox" id="lco" ${coords ? 'checked' : ''}> Mostrar el nombre de todas las casillas</label>
          <div class="chal"><div class="t"><span>Jugada <span id="lk">1</span> de <span id="ln">${o.moves.length}</span></span><span id="lerr" class="dim"></span></div><div class="bar"><div id="lbar" style="width:0"></div></div></div>
          <div id="lco2"></div><div id="ml"></div>`;
        $('#foot', v).innerHTML = '<button class="btn pri" id="lgo">Empezar de nuevo</button><select id="lline">' + lines.map((l, i) => `<option value="${i}">${i === 0 ? 'Línea principal' : esc(o.variations[i - 1].name)}</option>`).join('') + '</select>';
        const paintL = () => { $$('#lvl .chip', v).forEach(c => c.classList.toggle('on', c.dataset.l === level)); $$('#lside .chip', v).forEach(c => c.classList.toggle('on', c.dataset.s === side)); };
        let autoT = null;
        // Con un solo bando, la app juega las jugadas del rival (con una pausa para verlas) y luego te toca.
        const autoOpp = () => {
          clearTimeout(autoT);
          if (side === 'both' || k >= line.length || g.turn() === side) { prompt(); return; }
          board.setArrows([]); App.coach($('#lco2', v), null, 'Juega el rival', 'Fíjate en su jugada…');
          autoT = setTimeout(() => { const f0 = g.fen(); const r = g.move(line[k], { sloppy: true }); ltags.push(Purpose.of(f0, r, lastMv, Purpose.ctxOf(o))); lastMv = r; played.push(r.san); playSound(r); board.sync(); k++; moveList($('#ml', v), played, played.length - 1, () => { }, null, 'w', 1, ltags); autoOpp(); }, 650);
        };
        let g, line, k, errors, played, lastMv = null, ltags = [];
        const prompt = () => {
          board.setArrows([]);
          $('#lk', v).textContent = Math.min(k + 1, line.length); $('#ln', v).textContent = line.length; $('#lbar', v).style.width = (k / line.length * 100) + '%';
          $('#lerr', v).textContent = errors ? errors + ' error(es)' : '';
          if (k >= line.length) {
            board.opts.interactive = false; Sound.end(); App.track('open');
            App.coach($('#lco2', v), 'ok', '¡Línea completada!', `Jugaste las ${line.length} jugadas${errors ? ` con ${errors} error(es)` : ' sin errores'}. Prueba ahora con menos ayuda, y cuando la domines pasa a <b>Entrenar</b> para fijarla con repetición espaciada.`);
            return;
          }
          const m = new Chess(g.fen()).move(line[k], { sloppy: true });
          const who = g.turn() === 'w' ? 'Blancas' : 'Negras';
          const tg = Purpose.of(g.fen(), m, lastMv, Purpose.ctxOf(o));
          const txt = level === 'nada' ? `Juegan ${who.toLowerCase()}. ¿Recuerdas la jugada ${Math.floor(k / 2) + 1} de la línea?` : `<div class="ptags">${Purpose.chips(tg)}</div>` + say(m) + ` (<span class="mv">${esc(san(m.san))}</span>).` + Purpose.chips(tg, true).replace(/^.*?(<div class="pdesc">)/, '$1');
          App.coach($('#lco2', v), null, `${who}: jugada ${Math.floor(k / 2) + 1}`, txt);
          if (level === 'guia') board.setArrows([[m.from, m.to, 'g']]);
        };
        const start = () => {
          line = lines[+$('#lline', v).value]; g = new Chess(); k = 0; errors = 0; played = []; lastMv = null; ltags = [];
          clearTimeout(autoT);
          board.game = g; board.setOrientation(side === 'b' ? 'black' : side === 'w' ? 'white' : (o.side === 'negras' ? 'black' : 'white')); board.setPosition(START, false); board.setLastMove(null); board.badge(null);
          board.opts.interactive = true; board.opts.movable = side; board.setAllCoords(coords);
          moveList($('#ml', v), [], -1, () => { });
          board.opts.onUserMove = async ({ from, to }) => {
            const exp = new Chess(g.fen()).move(line[k], { sloppy: true });
            if (exp && exp.from === from && exp.to === to) {
              const f0 = g.fen(); const r = g.move(line[k], { sloppy: true }); const tg = Purpose.of(f0, r, lastMv, Purpose.ctxOf(o)); ltags.push(tg); lastMv = r; played.push(r.san); playSound(r); board.sync(); board.badge(to, 'book');
              const why = (lines.indexOf(line) === 0 && o.comments) ? o.comments[k] : '';
              k++; moveList($('#ml', v), played, played.length - 1, () => { }, null, 'w', 1, ltags);
              if (why) App.coach($('#lco2', v), 'ok', `${esc(san(r.san))} es la jugada`, `<div class="ptags">${Purpose.chips(tg)}</div>` + fixMv(esc(why)));
              setTimeout(() => { board.badge(null); autoOpp(); }, why ? 1300 : 450);
              return true;
            }
            errors++; Sound.bad();
            App.coach($('#lco2', v), 'ko', 'Esa no es la jugada de la línea', say(exp) + '. Inténtalo otra vez.');
            board.setArrows([[exp.from, exp.to, 'g']]); board.flashSquare(exp.from, 'flash-good');
            return false;
          };
          autoOpp();
        };
        $$('#lside .chip', v).forEach(c => c.onclick = () => { side = c.dataset.s; S().settings.learnSide = side; save(); paintL(); start(); });
        $$('#lvl .chip', v).forEach(c => c.onclick = () => { level = c.dataset.l; S().settings.learnLvl = level; save(); paintL(); if (g) prompt(); });
        $('#lco', v).onchange = (e) => { coords = e.target.checked; S().settings.learnCoords = coords; save(); board.setAllCoords(coords); };
        $('#lgo', v).onclick = start; $('#lline', v).onchange = start;
        paintL(); start();
      },
      entrenar() {
        // Repetición espaciada (sistema de cajas de Leitner)
        const me = o.side === 'negras' ? 'b' : 'w';
        const sr = S().open[o.id] || { box: 0, due: 0, reps: 0 };
        const lines = [o.moves, ...(o.variations || []).map(x => x.moves)];
        $('#body', v).innerHTML = `<p class="muted" style="margin:0">Juega las jugadas de las <b>${me === 'w' ? 'blancas' : 'negras'}</b> de memoria; la app responde con las del rival. Sistema de cajas de Leitner: cada acierto completo sube una caja y espacia el repaso (1, 3, 7, 14, 30 días).</p>
          <div class="kv"><span>Caja actual</span><b>${sr.box} / 5</b></div><div class="kv"><span>Próximo repaso</span><b>${sr.due ? new Date(sr.due).toLocaleDateString('es') : 'hoy'}</b></div>
          <div id="dfb"></div><div id="ml"></div>`;
        $('#foot', v).innerHTML = '<button class="btn pri" id="dgo">Empezar repaso</button><select id="dline">' + lines.map((l, i) => `<option value="${i}">${i === 0 ? 'Línea principal' : esc(o.variations[i - 1].name)}</option>`).join('') + '</select>';
        $('#dgo', v).onclick = () => {
          const line = lines[+$('#dline', v).value]; const g = new Chess(); board.game = g; board.setOrientation(me === 'w' ? 'white' : 'black'); board.setPosition(START, false); board.setLastMove(null); board.setArrows([]);
          let k = 0, errors = 0; const played = [];
          const fb = (c, i, t, s) => $('#dfb', v).innerHTML = `<div class="fb ${c}"><span class="dot">${i}</span><div>${t}<small>${s}</small></div></div>`;
          const auto = () => { while (k < line.length && g.turn() !== me) { const r = g.move(line[k], { sloppy: true }); played.push(r.san); playSound(r); k++; board.sync(); } moveList($('#ml', v), played, played.length - 1, () => { }); if (k >= line.length) finish(); else fb('info', '?', 'Tu jugada', `Jugada ${Math.floor(k / 2) + 1}`); };
          const finish = () => {
            board.opts.interactive = false; const ok = errors === 0; const st = S().open[o.id] || { box: 0, reps: 0 };
            st.box = ok ? Math.min(5, st.box + 1) : Math.max(0, st.box - 1); st.reps++; st.due = Date.now() + [1, 1, 3, 7, 14, 30][st.box] * 864e5; S().open[o.id] = st; save(); bump(); App.track('open');
            fb(ok ? 'win' : 'ok', ok ? '★' : '✓', ok ? 'Línea perfecta' : `Línea completada con ${errors} error(es)`, `Caja ${st.box}. Próximo repaso: ${new Date(st.due).toLocaleDateString('es')}`); Sound.end();
          };
          board.opts.interactive = true; board.opts.movable = me;
          board.opts.onUserMove = async ({ from, to, promotion }) => {
            const exp = new Chess(g.fen()).move(line[k], { sloppy: true });
            if (exp && exp.from === from && exp.to === to) { const r = g.move(line[k], { sloppy: true }); played.push(r.san); playSound(r); k++; board.sync(); board.badge(to, 'book'); setTimeout(() => { board.badge(null); auto(); }, 380); return true; }
            errors++; Sound.bad(); board.badge(null); fb('bad', '✕', 'No es la jugada de la línea', `La correcta: ${san(exp.san)}`); board.setArrows([[exp.from, exp.to, 'g']]); setTimeout(() => board.setArrows([]), 1600); return false;
          };
          auto();
        };
      }
    };
    const open = (t) => { tab = t; board.game = null; board.opts.interactive = false; board.opts.movable = null; if (t !== 'aprender' && board.opts.allCoords) board.setAllCoords(false); board.badge(null); board.setArrows([]); $$('#tabs button', v).forEach(b => b.classList.toggle('on', b.dataset.t === t)); tabs[t](); };
    $$('#tabs button', v).forEach(b => b.onclick = () => open(b.dataset.t));
    open('linea');
    return keyNav(() => lv);
  };

  /* ======================= LECCIONES ======================= */
  const AREA_INFO = {
    basico: { areas: ['basico'], t: 'Aprender a jugar', d: 'Desde cero: el tablero, cómo se mueve cada pieza, las reglas especiales, cómo termina una partida y tus primeros pasos.' },
    principios: { areas: ['apertura-principios'], t: 'Principios de apertura', d: 'Lo que hay que saber antes de memorizar ninguna línea: desarrollo, centro, seguridad del rey y cómo construir un repertorio.' },
    tactica: { areas: ['tactica'], t: 'Táctica', d: 'Cada motivo táctico explicado con ejemplos, y los patrones de mate clásicos. Después, entrénalos en Puzles por tema.' },
    medio: { areas: ['estrategia', 'medio'], t: 'Medio juego', d: 'Estrategia profesional: estructuras de peones, desequilibrios, casillas débiles, profilaxis, planes y ataque al rey.' },
    finales: { areas: ['final'], t: 'Finales', d: 'Las posiciones teóricas que todo jugador debe dominar, con práctica contra el motor desde cada posición.' },
    ataque: { areas: ['ataque'], t: 'Ataque', d: 'Cómo atacar al rey: cuándo se puede, los sacrificios típicos, cómo romper cada tipo de enroque, los patrones de mate de ataque y cómo defenderse.' },
    partidas: { areas: ['partidas'], t: 'Partidas magistrales', d: 'Las partidas más célebres de la historia, jugada a jugada y comentadas: de la época romántica a la era de los motores.' }
  };
  const lessonList = (key) => (v) => {
    const A = AREA_INFO[key]; const ls = LESSONS.filter(l => A.areas.includes(l.area));
    const cats = [...new Set(ls.map(l => l.category || 'General'))];
    const done = ls.filter(l => S().lessons[l.id]).length;
    v.appendChild(h(`<div><div class="page-h"><div><h1>${A.t}</h1><p>${A.d}</p></div><div style="min-width:200px"><div class="dim" style="font-size:13px;font-weight:800">${done}/${ls.length} completadas</div><div class="meter" style="margin-top:6px"><div style="width:${ls.length ? done / ls.length * 100 : 0}%"></div></div></div></div>
      <div class="chips" id="secTab" style="margin-bottom:14px"><button class="chip" data-v="ruta">🗺 Ruta</button><button class="chip" data-v="lista">☰ Lista</button></div>
      <div id="secRoute">${App.routeHTML ? App.routeHTML(key) : ''}</div><div id="secList">
      ${cats.map(c => `<h2 class="sec-t" style="margin:18px 0 10px;font-size:13px">${esc(c)}</h2><div class="grid g3">${ls.filter(l => (l.category || 'General') === c).map(l => `<a class="tile" href="#lec-${l.id}"><div style="display:flex;justify-content:space-between;gap:8px">${lvlTag(l.level)}${S().lessons[l.id] ? `<span class="tag g">${'★'.repeat(((S().lessonEx || {})[l.id] || {}).stars || 1)}</span>` : ''}<span class="tag b">🧩 Ejercicios</span></div><h3>${esc(l.title)}</h3><p>${fixMv(esc(l.summary || ''))}</p></a>`).join('')}</div>`).join('')}
      </div>${key === 'tactica' ? '<div class="card" style="margin-top:20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="grow" style="flex:1;min-width:200px"><h3 style="font-weight:900">Teoría + práctica</h3><p class="muted" style="margin:4px 0 0">Después de cada lección, resuelve 10-20 puzles del mismo tema. Es la base de la práctica deliberada.</p></div><a class="btn pri" href="#puzles">Ir a Puzles</a></div>' : ''}
    </div>`));
    const tab = (t) => { $('#secRoute', v).hidden = t !== 'ruta'; $('#secList', v).hidden = t !== 'lista'; $$('#secTab .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === t)); S().settings.secView = t; };
    $$('#secTab .chip', v).forEach(c => c.onclick = () => { tab(c.dataset.v); save(); }); tab(S().settings.secView || 'ruta');
  };
  VIEWS.principios = lessonList('principios'); VIEWS.tactica = lessonList('tactica'); VIEWS.medio = lessonList('medio'); VIEWS.finales = lessonList('finales'); VIEWS.basico = lessonList('basico'); VIEWS.ataque = lessonList('ataque'); VIEWS.partidas = lessonList('partidas');

  VIEWS.lec = (v, id) => {
    const L = LESSONS.find(l => l.id === id); if (!L) { location.hash = '#medio'; return; }
    const back = App.areaRoute(L.area);
    const bb = boardBox({ interactive: false });
    const board = bb.board; board.opts.interactive = false;
    const layout = h('<div class="play"></div>'); layout.appendChild(bb.el);
    const ps = L.positions || [];
    const panel = h(`<div class="side-panel">
      <div class="sp-head" style="flex-direction:column;align-items:flex-start;gap:4px"><a href="#${back}" class="dim" style="font-size:13px;text-decoration:none">← ${esc(AREA_INFO[back] ? AREA_INFO[back].t : 'Lecciones')}</a><span>${esc(L.title)}</span><span class="tags">${lvlTag(L.level)}<span class="tag">${esc(L.category || '')}</span></span></div>
      <div class="sp-body">
        ${ps.length > 1 ? `<div class="chips" id="pp">${ps.map((p, i) => `<button class="chip" data-i="${i}">Posición ${i + 1}</button>`).join('')}</div>` : ''}
        <div id="cap"></div><div id="ml"></div>
        <div class="prose">${fixMv(L.html || '')}</div>
        ${L.keyPoints && L.keyPoints.length ? `<div><div class="sec-t">Puntos clave</div><div class="prose">${ul(L.keyPoints)}</div></div>` : ''}
        ${proscons(L.pros, L.cons)}
        ${(() => { const E = App.lessonExercises ? App.lessonExercises(L) : null; if (!E) return ''; const ex = (S().lessonEx || {})[L.id]; return `<div class="card ex-card"><div class="sec-t">🧩 Ejercicios de esta lección</div><p class="muted" style="margin:6px 0 10px">${E.mc ? `${E.mc} preguntas de teoría + ` : ''}${E.quiz ? `${E.quiz} ${E.quiz > 1 ? 'posiciones' : 'posición'} de la lección + ` : ''}${E.puzzles} puzles del tema${E.practice ? ' + práctica contra el motor' : ''}. Complétalos para terminar la lección y ganar XP.${E.pool > 10 ? ` Después puedes seguir con <b>${E.pool} puzles más</b> de este tema, en tandas de 10.` : ''}</p>${ex ? `<div style="margin-bottom:8px"><span class="tag g">${'★'.repeat(ex.stars)}${'☆'.repeat(3 - ex.stars)}</span> <span class="dim" style="font-size:13px">Mejor resultado: ${ex.best}%</span></div>` : ''}<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#ejercicios-${L.id}">${ex ? '↻ Repetir ejercicios' : '▶ Hacer los ejercicios'}</a>${E.pool > 10 ? `<a class="btn" href="#ejercicios-${L.id}~mas">🧩 Practicar más</a>` : ''}</div></div>`; })()}
        ${L.practice ? `<div class="card" style="background:var(--bg3)"><div class="sec-t">Práctica contra el motor</div><p class="muted" style="margin:6px 0 10px">${fixMv(esc(L.practice.text || ''))}</p><a class="btn pri sm" href="#jugar" id="prac">Jugar esta posición (${L.practice.goal})</a></div>` : ''}
      </div>
      <div class="sp-foot" id="foot"><a class="btn sm ${S().lessons[L.id] ? '' : 'pri'}" id="done" href="#ejercicios-${L.id}">${S().lessons[L.id] ? '✓ Completada · repetir ejercicios' : '🧩 Ir a los ejercicios'}</a></div></div>`);
    layout.appendChild(panel); v.appendChild(layout);
    let lv = null;
    const loadPos = (i) => {
      const p = ps[i]; if (!p) return; $$('#pp .chip', v).forEach(c => c.classList.toggle('on', +c.dataset.i === i));
      board.setOrientation(p.orientation || 'white');
      lv = LineViewer(board, p.fen, p.line || [], p.comments, (k, c) => {
        board.setArrows(k === 0 ? (p.arrows || []) : []);
        $$('.hl', board.el).forEach(e => e.classList.remove('hl')); if (k === 0) (p.highlights || []).forEach(s => board.squares[s] && board.squares[s].classList.add('hl'));
        if (p.line && p.line.length) moveList($('#ml', v), lv.sans, k - 1, (j) => lv.go(j + 1), null, new Chess(p.fen).turn(), +p.fen.split(' ')[5] || 1, lv.tags);
        if (k === 0) App.coach($('#cap', v), null, esc(L.title), fixMv(esc(p.caption || ''))); else App.coach($('#cap', v), 'ok', `${esc(san(lv.sans[k - 1]))}`, `<div class="ptags">${Purpose.chips(lv.tags[k - 1] || [])}</div>` + (c ? fixMv(esc(c)) : ''));
      });
      lv.go(0, false);
      const nb = $('.nav-btns', v); if (nb) nb.remove();
      if (p.line && p.line.length) $('#foot', v).prepend(navButtons(() => lv));
    };
    $$('#pp .chip', v).forEach(c => c.onclick = () => loadPos(+c.dataset.i));
    if (ps.length) loadPos(0); else board.setPosition(START, false);
    if (false) $('#done', v).onclick = (e) => { const first = !S().lessons[L.id]; S().lessons[L.id] = Date.now(); save(); bump(); if (first) App.track('lesson'); e.target.textContent = '✓ Completada'; e.target.classList.remove('pri'); toast('Lección completada'); };
    if (L.practice) $('#prac', v).onclick = (e) => { e.preventDefault(); App.pendingGame = { fen: L.practice.fen, side: L.practice.side, goal: L.practice.goal, text: L.practice.text, title: L.title, back: '#lec-' + L.id }; location.hash = '#jugar'; };
    return keyNav(() => lv);
  };

  /* ======================= METODOLOGÍAS ======================= */
  const TOOL = { puzles: ['#puzles', 'Puzles'], woodpecker: ['#woodpecker', 'Woodpecker'], vision: ['#vision', 'Visión'], ciega: ['#vision-memoria', 'Memoria y ciegas'], calculo: ['#vision-calculo', 'Cálculo a ciegas'], jugar: ['#jugar', 'Jugar'], finales: ['#finales', 'Finales'], aperturas: ['#aperturas', 'Aperturas'], analisis: ['#analisis', 'Análisis'] };
  VIEWS.metodos = (v) => {
    let tag = 'todas';
    const tags = [...new Set(METHODS.flatMap(m => m.tags || []))].sort();
    v.appendChild(h(`<div><div class="page-h"><div><h1>Metodologías de entrenamiento</h1><p>Los sistemas que usan entrenadores y escuelas profesionales, con sus pros, contras, a quién le sirven y qué dice la evidencia. Cada uno enlaza con la herramienta de la app que lo pone en práctica.</p></div></div>
      <div class="chips" id="mt" style="margin-bottom:16px"><button class="chip" data-v="todas">Todas</button>${tags.map(t => `<button class="chip" data-v="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <div class="grid g3" id="ml"></div></div>`));
    const paint = () => {
      $$('#mt .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === tag));
      $('#ml', v).innerHTML = METHODS.filter(m => tag === 'todas' || (m.tags || []).includes(tag)).map(m => `<a class="tile" href="#met-${m.id}"><span class="dim" style="font-size:12.5px;font-weight:700">${esc(m.author || '')}${m.era ? ' · ' + esc(m.era) : ''}</span><h3>${esc(m.name)}</h3><p>${esc(m.summary || '')}</p><div class="tags">${(m.tags || []).slice(0, 4).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></a>`).join('');
    };
    $$('#mt .chip', v).forEach(c => c.onclick = () => { tag = c.dataset.v; paint(); }); paint();
  };
  VIEWS.met = (v, id) => {
    const m = METHODS.find(x => x.id === id); if (!m) { location.hash = '#metodos'; return; }
    const tool = TOOL[m.appTool];
    v.appendChild(h(`<div style="max-width:900px;margin:0 auto">
      <a href="#metodos" class="dim" style="font-size:13px;text-decoration:none">← Metodologías</a>
      <div class="page-h" style="margin-top:6px"><div><h1>${esc(m.name)}</h1><p>${esc(m.author || '')}${m.era ? ' · ' + esc(m.era) : ''}</p></div>${tool ? `<a class="btn pri" href="${tool[0]}">Practicar: ${tool[1]}</a>` : ''}</div>
      <div class="grid g3" style="margin-bottom:16px"><div class="card"><div class="sec-t">Ideal para</div><div style="font-weight:800;margin-top:4px">${esc(m.bestFor || '')}</div></div><div class="card"><div class="sec-t">Dedicación</div><div style="font-weight:800;margin-top:4px">${esc(m.timePerWeek || '')}</div></div><div class="card"><div class="sec-t">Etiquetas</div><div class="tags" style="margin-top:6px">${(m.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></div></div>
      <div class="card"><div class="prose">${fixMv(m.html || '')}</div></div>
      ${m.steps && m.steps.length ? `<div class="card" style="margin-top:16px"><h3 style="font-weight:900;margin-bottom:8px">Cómo aplicarlo, paso a paso</h3><ol class="prose" style="padding-left:1.3em">${m.steps.map(s => `<li style="margin:.4em 0">${fixMv(esc(s))}</li>`).join('')}</ol></div>` : ''}
      <div class="card" style="margin-top:16px">${proscons(m.pros, m.cons)}</div>
      ${m.evidence ? `<div class="card" style="margin-top:16px"><h3 style="font-weight:900;margin-bottom:6px">Qué dice la evidencia</h3><p class="prose" style="margin:0">${esc(m.evidence)}</p></div>` : ''}
      ${m.resources && m.resources.length ? `<div class="card" style="margin-top:16px"><h3 style="font-weight:900;margin-bottom:6px">Recursos de referencia</h3><div class="prose">${ul(m.resources.map(esc))}</div></div>` : ''}
    </div>`));
  };

  /* ======================= MI PLAN ======================= */
  VIEWS.plan = (v) => {
    let sel = S().settings.level || (PLANS[0] && PLANS[0].id);
    v.appendChild(h(`<div><div class="page-h"><div><h1>Mi plan de entrenamiento</h1><p>Elige tu nivel. Cada plan reparte el tiempo según la etapa en la que estás: los principiantes necesitan sobre todo táctica y finales básicos; los avanzados, análisis propio, cálculo profundo y preparación de aperturas.</p></div></div>
      <div class="chips" id="pl" style="margin-bottom:16px">${PLANS.map(p => `<button class="chip" data-v="${p.id}">${esc(p.level)}</button>`).join('')}</div><div id="pd"></div></div>`));
    const COLORS = ['#629924', '#3692e7', '#f0c15c', '#e58f2a', '#c983d8', '#1baca6', '#ca3431', '#a88865', '#8b8987'];
    const paint = () => {
      $$('#pl .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === sel));
      const p = PLANS.find(x => x.id === sel); if (!p) return;
      const mine = S().settings.level === p.id;
      $('#pd', v).innerHTML = `<div class="grid g2"><div class="card"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><h3 style="font-weight:900;font-size:19px">${esc(p.level)}</h3><button class="btn ${mine ? '' : 'pri'} sm" id="pset">${mine ? '✓ Es mi plan' : 'Usar este plan'}</button></div>
          <p class="muted">${esc(p.focus || '')}</p><div class="kv"><span>Horas por semana</span><b>${esc(p.hoursPerWeek)}</b></div>
          <div class="sec-t" style="margin:12px 0 6px">Reparto del tiempo</div>
          <div class="statbar" style="height:28px">${(p.distribution || []).map((d, i) => `<div style="flex-grow:${d.pct};background:${COLORS[i % COLORS.length]};color:#fff">${d.pct}%</div>`).join('')}</div>
          <div style="display:grid;gap:4px;margin-top:10px">${(p.distribution || []).map((d, i) => `<div style="display:flex;gap:8px;align-items:center;font-size:14px"><span style="width:12px;height:12px;border-radius:3px;background:${COLORS[i % COLORS.length]}"></span><span class="muted" style="flex:1">${esc(d.area)}</span><b>${d.pct}%</b></div>`).join('')}</div></div>
        <div class="card"><h3 style="font-weight:900;margin-bottom:8px">Objetivos</h3><div class="prose">${ul((p.milestones || []).map(esc))}</div></div></div>
        <h2 style="font-size:19px;font-weight:900;margin:20px 0 10px">Semana tipo</h2>
        <div class="grid g4">${(p.weekly || []).map(d => `<div class="card"><div style="font-weight:900;margin-bottom:6px">${esc(d.day)}</div><ul class="prose" style="margin:0;padding-left:1.1em;font-size:14px">${d.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('')}</div>`;
      $('#pset', v).onclick = () => { S().settings.level = p.id; save(); toast('Plan guardado. Lo verás en Inicio.'); paint(); };
    };
    $$('#pl .chip', v).forEach(c => c.onclick = () => { sel = c.dataset.v; paint(); }); paint();
  };

  /* ======================= ENCICLOPEDIA ======================= */
  VIEWS.teoria = (v, arg) => {
    const tabs = [['pensar', 'Proceso de pensamiento'], ['reglas', 'Reglas'], ['historia', 'Historia'], ['stats', 'Estadísticas'], ['psico', 'Psicología y torneos'], ['glosario', 'Glosario']];
    let tab = tabs.some(t => t[0] === arg) ? arg : 'pensar';
    v.appendChild(h(`<div><div class="page-h"><div><h1>Enciclopedia</h1><p>Todo el conocimiento de referencia: cómo pensar en una partida, el reglamento, la historia del juego, los datos y estadísticas, la preparación psicológica y un glosario.</p></div></div>
      <div class="chips" id="tt" style="margin-bottom:16px">${tabs.map(([k, t]) => `<button class="chip" data-v="${k}">${t}</button>`).join('')}</div><div id="tb"></div></div>`));
    const acc = (items) => items.map((x, i) => `<details class="acc" ${i === 0 ? 'open' : ''}><summary>${esc(x.title)}</summary><div><div class="prose">${fixMv(x.html || '')}</div>${x.table ? `<div class="tscroll"><table class="t"><tr>${x.table.head.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${x.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>` : ''}</div></details>`).join('');
    const R = {
      pensar() { const T = THINKING; return T ? `<div class="grid g2"><div class="card"><h3 style="font-weight:900;margin-bottom:8px">${esc(T.title)}</h3><div class="prose">${fixMv(T.html)}</div></div><div class="card"><h3 style="font-weight:900;margin-bottom:8px">Lista de comprobación antes de cada jugada</h3><div style="display:grid;gap:8px">${(T.checklist || []).map((c, i) => `<label class="ck" style="align-items:flex-start;background:var(--bg3);padding:10px;border-radius:6px"><input type="checkbox"> <span><b style="color:var(--fg)">${i + 1}.</b> ${fixMv(esc(c))}</span></label>`).join('')}</div></div></div>` : ''; },
      reglas() { return acc(RULES); },
      historia() {
        const H = HISTORY;
        return `<div class="card" style="margin-bottom:16px"><h3 style="font-weight:900;margin-bottom:8px">Campeones del mundo</h3><div class="tscroll"><table class="t"><tr><th>#</th><th>Campeón</th><th>País</th><th>Años</th><th>Estilo</th></tr>${(H.champions || []).map((c, i) => `<tr><td>${i + 1}</td><td style="color:var(--fg);font-weight:800">${esc(c.name)}</td><td>${esc(c.country)}</td><td style="white-space:nowrap">${esc(c.years)}</td><td>${esc(c.style)}</td></tr>`).join('')}</table></div>${H.note ? `<p class="dim" style="font-size:13px">${esc(H.note)}</p>` : ''}</div>` + acc((H.eras || []).map(e => ({ title: e.name, html: e.html })));
      },
      stats() { return acc(STATS); },
      psico() { return acc(PSYCHOLOGY); },
      glosario() {
        return `<input type="text" id="gq" placeholder="Buscar término…" style="width:100%;margin-bottom:12px"><div class="grid g2" id="gl"></div>`;
      }
    };
    const paint = () => {
      $$('#tt .chip', v).forEach(c => c.classList.toggle('on', c.dataset.v === tab)); $('#tb', v).innerHTML = R[tab]();
      if (tab === 'glosario') {
        const draw = (q) => { $('#gl', v).innerHTML = GLOSSARY.filter(g => !q || (g.term + ' ' + g.def).toLowerCase().includes(q)).sort((a, b) => a.term.localeCompare(b.term, 'es')).map(g => `<div class="card" style="padding:12px 14px"><div style="font-weight:900">${esc(g.term)}</div><div class="muted" style="font-size:14px">${fixMv(esc(g.def))}</div></div>`).join(''); };
        draw(''); $('#gq', v).oninput = (e) => draw(e.target.value.toLowerCase());
      }
    };
    $$('#tt .chip', v).forEach(c => c.onclick = () => { tab = c.dataset.v; paint(); }); paint();
  };
})();
