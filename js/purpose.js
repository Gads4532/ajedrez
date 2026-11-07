/* Para qué sirve cada jugada: etiquetas sencillas (con explicación para principiantes) calculadas a partir de la posición. */
(function () {
  const FILES = 'abcdefgh';
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
  // Etiquetas: título corto, color y explicación en lenguaje llano.
  const TAGS = {
    centro: { t: 'Centro', c: '#81b64c', d: 'Ocupa o controla las casillas centrales (d4, e4, d5, e5). Quien domina el centro mueve sus piezas con más libertad.' },
    desarrollo: { t: 'Desarrollo', c: '#5c8bb0', d: 'Saca una pieza de su casilla inicial para que participe en el juego. En la apertura, cada jugada debería poner en juego una pieza nueva.' },
    enroque: { t: 'Rey seguro', c: '#1baca6', d: 'El enroque esconde al rey detrás de sus peones y conecta las torres. Es una de las prioridades de la apertura.' },
    espacio: { t: 'Gana espacio', c: '#a88865', d: 'Avanza un peón para quitarle casillas al rival y tener más sitio para tus piezas.' },
    flanco: { t: 'Ataque al centro desde un lado', c: '#c983d8', d: 'Un peón de los lados (c o f) presiona el centro rival sin ocuparlo directamente. Es la idea de las aperturas modernas.' },
    fianchetto: { t: 'Fianchetto', c: '#c983d8', d: 'El alfil se coloca en la gran diagonal (g2, b2, g7 o b7) detrás de un peón adelantado una casilla. Desde ahí vigila el centro de lejos.' },
    gambito: { t: 'Gambito', c: '#e58f2a', d: 'Se ofrece un peón (o más) a cambio de desarrollo rápido, iniciativa o control del centro.' },
    captura: { t: 'Captura', c: '#ca3431', d: 'Toma una pieza o peón del rival.' },
    cambio: { t: 'Cambio', c: '#8b8987', d: 'Recupera el material que se acaba de perder: las dos partes cambian piezas de igual valor.' },
    jaque: { t: 'Jaque', c: '#ca3431', d: 'Ataca directamente al rey, que debe salir del ataque. Obliga al rival a responder.' },
    mate: { t: 'Jaque mate', c: '#ca3431', d: 'El rey está atacado y no tiene escapatoria: la partida termina.' },
    clavada: { t: 'Clavada', c: '#f0c15c', d: 'Una pieza rival no puede moverse (o no le conviene) porque dejaría expuesta otra más valiosa detrás, como el rey o la dama.' },
    f7: { t: 'Apunta a f7/f2', c: '#f0c15c', d: 'Al principio, f7 (o f2) solo lo defiende el rey: es el punto débil favorito de los ataques rápidos.' },
    amenaza: { t: 'Amenaza', c: '#e58f2a', d: 'Ataca una pieza rival que no está bien defendida: el rival tiene que reaccionar.' },
    profilaxis: { t: 'Prevención', c: '#8b8987', d: 'Un pequeño movimiento de peón que impide un plan rival, por ejemplo que te claven un caballo con un alfil.' },
    dama: { t: 'Salida de dama', c: '#e58f2a', d: 'Mover la dama pronto puede ser fuerte, pero es arriesgado: el rival puede atacarla y ganar tiempo desarrollando piezas.' },
    torre: { t: 'Activa la torre', c: '#5c8bb0', d: 'Lleva la torre a una columna central o abierta, donde tendrá más fuerza.' },
    preparacion: { t: 'Preparación', c: '#8b8987', d: 'Jugada tranquila que prepara un plan: abrir paso a una pieza, sostener un peón o preparar el enroque.' },
    defensa: { t: 'Defensa', c: '#5c8bb0', d: 'Protege una pieza o casilla que el rival estaba atacando.' },
    corona: { t: 'Corona', c: '#81b64c', d: 'El peón llega a la última fila y se convierte en otra pieza (normalmente dama).' }
  };

  const attacks = (g, sq) => { // ¿qué piezas ataca la pieza situada en sq? (moviendo como si fuera su turno)
    const fen = g.fen().split(' '); const p = g.get(sq); if (!p) return [];
    fen[1] = p.color; fen[3] = '-';
    const t = new Chess(); if (!t.load(fen.join(' '))) return [];
    return t.moves({ square: sq, verbose: true }).filter(m => m.captured).map(m => ({ to: m.to, piece: m.captured }));
  };
  const defended = (g, sq, color) => { // ¿la casilla sq está defendida por color?
    const fen = g.fen().split(' '); fen[1] = color === 'w' ? 'b' : 'w'; fen[3] = '-';
    const t = new Chess(); if (!t.load(fen.join(' '))) return false;
    const p = t.get(sq); if (!p) return false;
    t.remove(sq); t.put({ type: 'p', color: color === 'w' ? 'b' : 'w' }, sq);
    const f2 = t.fen().split(' '); f2[1] = color; const u = new Chess(); if (!u.load(f2.join(' '))) return false;
    return u.moves({ verbose: true }).some(m => m.to === sq && m.captured);
  };

  function purpose(fenBefore, m, prev, ctx) {
    const tags = []; const add = (k) => { if (!tags.includes(k)) tags.push(k); };
    const g = new Chess(fenBefore); g.move(m.san);
    const me = m.color, opp = me === 'w' ? 'b' : 'w', moveNo = +fenBefore.split(' ')[5];
    const rank = (sq) => +sq[1], file = (sq) => sq[0];
    const home = me === 'w' ? 1 : 8;
    if (m.san.includes('#')) add('mate'); else if (m.san.includes('+')) add('jaque');
    if (m.flags.includes('k') || m.flags.includes('q')) add('enroque');
    if (m.promotion) add('corona');
    // Capturas y cambios
    if (m.captured) add(prev && prev.captured && prev.to === m.to ? 'cambio' : 'captura');
    // Peones
    if (m.piece === 'p' && !m.captured && !m.promotion) {
      const center = ['d4', 'e4', 'd5', 'e5'].includes(m.to);
      if (center) add('centro');
      else if (['c', 'f'].includes(file(m.to)) && moveNo <= 12) add('flanco');
      if ((me === 'w' && ['g3', 'b3'].includes(m.to)) || (me === 'b' && ['g6', 'b6'].includes(m.to))) add('fianchetto');
      if (['a3', 'h3', 'a6', 'h6'].includes(m.to) && moveNo <= 15) add('profilaxis');
      const adv = me === 'w' ? rank(m.to) >= 5 : rank(m.to) <= 4;
      if (adv && !center) add('espacio');
      if (center && (me === 'w' ? rank(m.to) === 5 : rank(m.to) === 4)) add('espacio');
      // Gambito: el peón queda colgando (capturable y sin defensa suficiente)
      // Gambito: el peón se ofrece a un peón rival sin defensa, en una apertura que es un gambito
      const offered = g.moves({ verbose: true }).some(x => x.captured && x.to === m.to && x.piece === 'p') && !defended(g, m.to, me);
      if (moveNo <= 10 && offered && ctx && ctx.gambit) add('gambito');
    }
    // Piezas
    if (['n', 'b'].includes(m.piece) && rank(m.from) === home) add('desarrollo');
    if (m.piece === 'b' && ['g2', 'b2', 'g7', 'b7'].includes(m.to)) add('fianchetto');
    if (m.piece === 'q' && moveNo <= 8 && !m.captured) add('dama');
    if (m.piece === 'r' && !m.flags.includes('k') && ['c', 'd', 'e'].includes(file(m.to))) add('torre');
    // Lo que ataca la pieza movida
    const att = attacks(g, m.to);
    if (att.some(a => a.to === (me === 'w' ? 'f7' : 'f2')) && moveNo <= 10) add('f7');
    if (att.some(a => a.piece !== 'p' && a.piece !== 'k' && (VAL[a.piece] > VAL[m.piece] || !defended(g, a.to, opp)))) add('amenaza');
    // Clavada: alfil/torre/dama atacan una pieza con el rey o la dama detrás en la misma línea
    if (['b', 'r', 'q'].includes(m.piece)) {
      const dirs = m.piece === 'b' ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : m.piece === 'r' ? [[1, 0], [-1, 0], [0, 1], [0, -1]] : [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [dx, dy] of dirs) {
        let x = FILES.indexOf(m.to[0]), y = rank(m.to), first = null;
        for (; ;) { x += dx; y += dy; if (x < 0 || x > 7 || y < 1 || y > 8) break; const p = g.get(FILES[x] + y); if (!p) continue; if (!first) { if (p.color !== opp || p.type === 'p') break; first = p; continue; } if (p.color === opp && (p.type === 'k' || p.type === 'q') && VAL[p.type] > VAL[first.type]) add('clavada'); break; }
      }
    }
    // Defensa: la pieza movida se aparta de un ataque o protege una pieza atacada
    const fenB = fenBefore.split(' '); fenB[1] = opp; fenB[3] = '-';
    const tb = new Chess(); if (tb.load(fenB.join(' ')) && tb.moves({ verbose: true }).some(x => x.to === m.from && x.captured && VAL[x.captured] >= 3)) add('defensa');
    if (!tags.length || (tags.length === 1 && tags[0] === 'espacio' && m.piece !== 'p')) add('preparacion');
    return tags.slice(0, 3);
  }

  // Jugadas con su etiqueta principal para la lista; caché por FEN+jugada.
  const cache = new Map();
  const ctxOf = (o) => ({ gambit: !!o && (/gambit/i.test(o.name || '') || (o.style || []).includes('gambito')) });
  window.Purpose = {
    ctxOf,
    TAGS,
    of(fenBefore, m, prev, ctx) { const k = fenBefore + m.san + (prev ? prev.to : '') + (ctx && ctx.gambit ? 'G' : ''); if (!cache.has(k)) { let r = []; try { r = purpose(fenBefore, m, prev, ctx); } catch (e) { r = []; } cache.set(k, r); } return cache.get(k); },
    chips(tags, withDesc) { return tags.map(k => TAGS[k] ? `<span class="ptag" style="--pc:${TAGS[k].c}" title="${TAGS[k].d}">${TAGS[k].t}</span>` : '').join('') + (withDesc && tags.length ? `<div class="pdesc">${tags.map(k => TAGS[k] ? `<div><b>${TAGS[k].t}:</b> ${TAGS[k].d}</div>` : '').join('')}</div>` : ''); }
  };
})();
