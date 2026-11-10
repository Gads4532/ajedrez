/* Informe de partida («revisión»): a partir de las evaluaciones de Stockfish de cada posición construye
   la clasificación de cada jugada, la explicación de por qué es buena o mala, la nota por fases, el rendimiento
   estimado, la apertura, la estrategia usada y las correcciones por áreas con enlaces a lecciones.
   Las evaluaciones (evals) están siempre desde el punto de vista de las blancas. */
(function () {
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const NAME = { p: 'el peón', n: 'el caballo', b: 'el alfil', r: 'la torre', q: 'la dama', k: 'el rey' };
  const PIECE = { p: 'peón', n: 'caballo', b: 'alfil', r: 'torre', q: 'dama', k: 'rey' };
  const E = () => window.EvalUtil;
  const sgOf = (c) => (c === 'w' ? 1 : -1);
  const wp = (e, col) => E().winPct(sgOf(col) * E().toCp(e));
  const mateFor = (e, col) => (e && e.mate != null && e.mate !== 0 && Math.sign(e.mate) === sgOf(col) ? Math.abs(e.mate) : 0);
  const sanOf = (fen, uci) => { if (!uci) return null; const t = new Chess(fen); const m = t.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] || 'q' }); return m || null; };
  const pvSan = (fen, pv, n = 6) => { const t = new Chess(fen), out = []; for (const u of (pv || []).slice(0, n)) { const m = t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] || 'q' }); if (!m) break; out.push(m.san); } return out; };
  const moveNo = (fen) => { const p = fen.split(' '); return `${p[5]}${p[1] === 'w' ? '.' : '...'}`; };
  const pieces = (fen) => { const t = new Chess(fen), out = []; t.board().forEach((r, ri) => r.forEach((p, ci) => { if (p) out.push({ ...p, sq: 'abcdefgh'[ci] + (8 - ri) }); })); return out; };
  const isEndgame = (fen) => pieces(fen).filter(p => p.type !== 'p' && p.type !== 'k').length <= 6;

  // Clasificación según la pérdida de probabilidad de ganar (en puntos de %).
  function classify(D, i, book) {
    const mover = new Chess(D.fens[i]).turn();
    const wpB = wp(D.evals[i], mover), wpA = wp(D.evals[i + 1], mover), loss = Math.max(0, wpB - wpA);
    const m = D.moves[i], uci = m.from + m.to + (m.promotion || ''), bm = D.bests[i];
    if (i < book) return { c: 'book', loss, wpB, wpA };
    if (uci === bm || loss < 0.6) {
      const t = new Chess(D.fens[i + 1]); const attacked = t.moves({ verbose: true }).some(x => x.to === m.to);
      const sac = attacked && VAL[m.piece] - (m.captured ? VAL[m.captured] : 0) >= 2 && m.piece !== 'p';
      const gap = D.second[i] ? wpB - wp(D.second[i], mover) : 0;
      if (sac && wpA >= 45 && wpB < 97) return { c: 'brilliant', loss, wpB, wpA };
      if (gap >= 18 && wpB < 95) return { c: 'great', loss, wpB, wpA };
      return { c: 'best', loss, wpB, wpA };
    }
    if (loss < 2) return { c: 'excellent', loss, wpB, wpA };
    if (loss < 5) return { c: 'good', loss, wpB, wpA };
    // Oportunidad perdida: el rival acababa de fallar y no se aprovechó (sin llegar a perder la partida).
    const prevBad = i > 0 && D._cls && ['mistake', 'blunder'].includes(D._cls[i - 1]);
    if (loss >= 10 && wpB >= 65 && wpA >= 30 && (prevBad || mateFor(D.evals[i], mover))) return { c: 'miss', loss, wpB, wpA };
    if (loss < 10) return { c: 'inaccuracy', loss, wpB, wpA };
    if (loss < 20) return { c: 'mistake', loss, wpB, wpA };
    return { c: 'blunder', loss, wpB, wpA };
  }

  // Por qué: motivo concreto de la jugada (texto en español) y la mejor alternativa.
  function explain(D, i) {
    const R = D.report, c = R.cls[i], m = D.moves[i], fen = D.fens[i], mover = m.color, opp = mover === 'w' ? 'b' : 'w';
    const best = sanOf(fen, D.bests[i]), bestLine = pvSan(fen, D.pv[i]);
    const reply = sanOf(D.fens[i + 1], D.bests[i + 1]), replyLine = pvSan(D.fens[i + 1], D.pv[i + 1]);
    const why = [];
    const after = new Chess(D.fens[i + 1]);
    if (after.in_checkmate()) why.push('¡Jaque mate!');
    const mateMissed = mateFor(D.evals[i], mover), mateAllowed = mateFor(D.evals[i + 1], opp);
    const good = ['brilliant', 'great', 'best', 'excellent', 'good', 'book'].includes(c);
    if (good) {
      if (c === 'book') why.push('Es teoría: la jugada que recomiendan los libros de aperturas en esta posición.');
      if (c === 'brilliant') why.push(`Sacrificas ${NAME[m.piece]} y la posición lo justifica: el rival no puede aprovechar la pieza de más.`);
      if (c === 'great') why.push('Era la única jugada que mantenía la ventaja (o salvaba la posición): cualquier otra empeoraba mucho.');
      if (m.captured && !after.in_checkmate()) {
        const back = reply && reply.to === m.to;
        why.push(back ? `Cambias ${NAME[m.captured]}.` : `Capturas ${NAME[m.captured]} y ganas material.`);
      }
      if (m.flags.includes('k') || m.flags.includes('q')) why.push('Enrocas: el rey queda a salvo y la torre entra en juego.');
      if (m.promotion) why.push(`Coronas el peón: nueva ${PIECE[m.promotion]}.`);
      if (!why.length && mateFor(D.evals[i + 1], mover)) why.push(`Mantienes el ataque decisivo: hay mate en ${mateFor(D.evals[i + 1], mover)}.`);
      if (!why.length && after.in_check()) why.push('Das jaque y conservas la iniciativa.');
      if (!why.length) why.push(c === 'best' ? 'Es la jugada que elige el motor.' : 'Mantiene la evaluación de la posición.');
      return { why, best: null, bestLine: [], reply: null, replyLine: [] };
    }
    if (mateAllowed) why.push(`Permite mate en ${mateAllowed}${replyLine.length ? `: ${replyLine.join(' ')}` : ''}.`);
    else if (mateMissed && !mateFor(D.evals[i + 1], mover)) why.push(`Había mate en ${mateMissed} y se escapó.`);
    if (!mateAllowed && reply && reply.captured && VAL[reply.captured] >= 3) {
      const defended = new Chess(D.fens[i + 2] || D.fens[i + 1]);
      why.push(`Deja ${NAME[reply.captured]} de ${reply.to} sin defensa suficiente: el rival lo captura con ${reply.san}.`);
      if (defended) { /* el comentario basta */ }
    }
    if (!mateAllowed && reply && reply.captured === 'p' && !(m.captured)) why.push(`Permite ganar un peón con ${reply.san}.`);
    if (!mateMissed && best) { const bm = sanOf(fen, D.bests[i]); if (bm && bm.captured && VAL[bm.captured] >= 3 && !(m.captured && VAL[m.captured] >= VAL[bm.captured])) why.push(`Se podía ganar ${NAME[bm.captured]} con ${bm.san}.`); }
    if (c === 'miss') why.push('El rival acababa de equivocarse y no lo aprovechaste.');
    if (!why.length) {
      if (R.items[i].wpB >= 70 && R.items[i].wpA < 60) why.push('Desperdicia una posición ganadora.');
      else if (R.items[i].wpB >= 40 && R.items[i].wpA < 30) why.push('La posición pasa de igualada a perdida.');
      else why.push('Empeora la posición: había una continuación más precisa.');
    }
    return { why, best: best ? best.san : null, bestLine, reply: reply ? reply.san : null, replyLine };
  }

  const PHASE_GRADE = (a) => a == null ? null : a >= 90 ? 'best' : a >= 80 ? 'excellent' : a >= 70 ? 'good' : a >= 60 ? 'inaccuracy' : a >= 50 ? 'mistake' : 'blunder';
  // Rendimiento estimado a partir de la precisión (aproximación propia, orientativa).
  const ELO_PTS = [[0, 250], [40, 400], [50, 600], [60, 850], [70, 1150], [80, 1550], [85, 1800], [90, 2100], [95, 2500], [98, 2800], [100, 3000]];
  const estElo = (acc) => { for (let k = 1; k < ELO_PTS.length; k++) { const [a1, e1] = ELO_PTS[k - 1], [a2, e2] = ELO_PTS[k]; if (acc <= a2) return Math.round((e1 + (e2 - e1) * (acc - a1) / (a2 - a1)) / 25) * 25; } return 3000; };
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);

  function build(D) {
    // D: { startFen, fens, moves, sans, evals, bests, second, pv, book, opening, me, result }
    const n = D.moves.length; D._cls = [];
    const items = [];
    for (let i = 0; i < n; i++) { const it = classify(D, i, D.book); D._cls.push(it.c); items.push(it); }
    const cls = D._cls;
    const accOf = (filter) => { const r = { w: [], b: [] }; for (let i = 0; i < n; i++) if (filter(i)) r[D.moves[i].color].push(E().moveAccuracy(items[i].wpB, items[i].wpA)); return { w: avg(r.w), b: avg(r.b) }; };
    // Fases
    const phase = []; let inEnd = false;
    for (let i = 0; i < n; i++) { inEnd = inEnd || isEndgame(D.fens[i]); phase.push(inEnd ? 'e' : (i < Math.max(D.book, 20) ? 'o' : 'm')); }
    const acc = accOf(() => true);
    const ph = { o: accOf(i => phase[i] === 'o'), m: accOf(i => phase[i] === 'm'), e: accOf(i => phase[i] === 'e') };
    const count = (c, col) => cls.filter((x, i) => x === c && D.moves[i].color === col).length;
    const R = { items, cls, acc, ph, phase, elo: { w: acc.w != null ? estElo(acc.w) : null, b: acc.b != null ? estElo(acc.b) : null }, count };
    D.report = R;
    R.explain = (i) => explain(D, i);
    R.grade = (a) => PHASE_GRADE(a);

    /* ----- Informe para el jugador «me» ----- */
    const me = D.me || 'w', opp = me === 'w' ? 'b' : 'w';
    const mine = [...Array(n).keys()].filter(i => D.moves[i].color === me);
    const mv = (x) => `<span class="mv">${x}</span>`;
    const at = (i) => `${moveNo(D.fens[i])} ${mv(D.sans[i])}`;
    const report = { opening: [], strategy: [], tactics: [], endgame: [], advantage: [], good: [], fix: [], suggest: [], keys: [] };
    const sug = new Map(); const addSug = (k, t, href) => { if (!sug.has(k)) sug.set(k, { t, href }); };

    // Momentos clave: los peores errores propios y las mejores jugadas
    const bad = mine.filter(i => ['blunder', 'mistake', 'miss'].includes(cls[i])).sort((a, b) => items[b].loss - items[a].loss);
    const top = mine.filter(i => ['brilliant', 'great'].includes(cls[i]));
    report.keys = [...top.slice(0, 3), ...bad.slice(0, 4)].sort((a, b) => a - b);

    // Apertura
    if (D.opening) report.opening.push({ t: `Apertura: <b>${D.opening}</b>.`, k: 'info' });
    if (D.book > 0 && D.book < n) report.opening.push({ t: `Seguisteis la teoría hasta la jugada ${moveNo(D.fens[D.book])} ${mv(D.sans[D.book])}.`, k: 'info' });
    const myOpen = mine.filter(i => phase[i] === 'o');
    const castle = mine.find(i => D.moves[i].flags.includes('k') || D.moves[i].flags.includes('q'));
    const castleMove = castle != null ? +D.fens[castle].split(' ')[5] : null;
    if (castle != null && castleMove <= 10) report.opening.push({ t: `Enrocaste pronto (${at(castle)}): rey seguro.`, k: 'good' });
    else if (castle != null) report.opening.push({ t: `Enrocaste tarde (${at(castle)}). Intenta enrocar antes de la jugada 10.`, k: 'fix' }), addSug('enroque', 'Seguridad del rey y el enroque', '#lec-ap-enroque');
    else if (n >= 24) report.opening.push({ t: 'No enrocaste en toda la partida: tu rey quedó expuesto en el centro.', k: 'fix' }), addSug('enroque', 'Seguridad del rey y el enroque', '#lec-ap-enroque');
    const earlyQ = myOpen.filter(i => D.moves[i].piece === 'q' && +D.fens[i].split(' ')[5] <= 6 && !D.moves[i].captured);
    if (earlyQ.length) report.opening.push({ t: `Sacaste la dama muy pronto (${at(earlyQ[0])}): el rival puede ganar tiempos atacándola.`, k: 'fix' }), addSug('apert', 'Errores típicos en la apertura', '#lec-ap-errores');
    const moved = {}; let twice = 0;
    myOpen.forEach(i => { const m = D.moves[i]; if ('nb'.includes(m.piece)) { if (moved[m.from]) twice++; moved[m.to] = true; } });
    if (twice >= 2) report.opening.push({ t: `Moviste la misma pieza menor varias veces en la apertura (${twice} veces) en lugar de desarrollar otras.`, k: 'fix' }), addSug('des', 'Desarrollo rápido y armónico', '#lec-ap-desarrollo');
    const at10 = D.fens[Math.min(n, me === 'w' ? 20 : 21)] || D.fens[n];
    if (at10 && n >= 20) {
      const back = me === 'w' ? '1' : '8';
      const undeveloped = pieces(at10).filter(p => p.color === me && 'nb'.includes(p.type) && p.sq[1] === back).length;
      if (undeveloped >= 2) report.opening.push({ t: `En la jugada 10 aún tenías ${undeveloped} piezas menores sin desarrollar.`, k: 'fix' }), addSug('des', 'Desarrollo rápido y armónico', '#lec-ap-desarrollo');
      else report.opening.push({ t: 'Desarrollaste tus piezas menores a tiempo.', k: 'good' });
    }
    const centre = myOpen.some(i => D.moves[i].piece === 'p' && /^[de][45]$/.test(D.moves[i].to));
    if (myOpen.length >= 4) report.opening.push(centre ? { t: 'Luchaste por el centro con tus peones centrales.', k: 'good' } : { t: 'No ocupaste el centro con peones (d4/e4 o d5/e5): cedes espacio al rival.', k: 'fix' });
    if (!centre && myOpen.length >= 4) addSug('centro', 'La lucha por el centro', '#lec-ap-centro');
    if (ph.o[me] != null) report.opening.push({ t: `Precisión en la apertura: <b>${ph.o[me].toFixed(0)}%</b>.`, k: ph.o[me] >= 80 ? 'good' : 'info' });

    // Estrategia usada (observaciones de estructura y planes)
    const oppCastle = [...Array(n).keys()].find(i => D.moves[i].color === opp && (D.moves[i].flags.includes('k') || D.moves[i].flags.includes('q')));
    if (castle != null && oppCastle != null) {
      const side = (i) => (D.moves[i].flags.includes('k') ? 'k' : 'q');
      if (side(castle) !== side(oppCastle)) report.strategy.push({ t: 'Enroques opuestos: una partida de ataques mutuos donde manda la velocidad (tormenta de peones contra el rey rival).', k: 'info' }), addSug('opuestos', 'Enroques opuestos: carrera de ataques', '#lec-m-enroques');
      else report.strategy.push({ t: `Ambos enrocasteis ${side(castle) === 'k' ? 'corto' : 'largo'}: partida de maniobras, donde cuentan la estructura y las casillas.`, k: 'info' });
    }
    const midEnd = D.fens[Math.min(n, phase.indexOf('e') > 0 ? phase.indexOf('e') : n)];
    const struct = (fen, col) => {
      const ps = pieces(fen), my = ps.filter(p => p.color === col && p.type === 'p'), th = ps.filter(p => p.color !== col && p.type === 'p');
      const files = my.map(p => p.sq[0]), uniq = [...new Set(files)];
      const doubled = uniq.filter(f => files.filter(x => x === f).length > 1);
      const isolated = uniq.filter(f => { const k = 'abcdefgh'.indexOf(f); return !files.includes('abcdefgh'[k - 1]) && !files.includes('abcdefgh'[k + 1]); });
      const passed = my.filter(p => { const k = 'abcdefgh'.indexOf(p.sq[0]), r = +p.sq[1]; return !th.some(q => Math.abs('abcdefgh'.indexOf(q.sq[0]) - k) <= 1 && (col === 'w' ? +q.sq[1] > r : +q.sq[1] < r)); });
      const bishops = ps.filter(p => p.color === col && p.type === 'b').length, oppB = ps.filter(p => p.color !== col && p.type === 'b').length;
      return { doubled, isolated, passed, bishops, oppB };
    };
    if (midEnd) {
      const s = struct(midEnd, me);
      if (s.bishops === 2 && s.oppB < 2) report.strategy.push({ t: 'Conservaste la pareja de alfiles frente a un rival que la había perdido: una ventaja a largo plazo.', k: 'good' });
      if (s.bishops < 2 && s.oppB === 2) report.strategy.push({ t: 'Cediste la pareja de alfiles: en posiciones abiertas suele ser una desventaja.', k: 'fix' }), addSug('alfiles', 'La pareja de alfiles', '#lec-m-alfiles');
      if (s.isolated.includes('d')) report.strategy.push({ t: 'Jugaste con peón aislado en d: actividad y ataque a cambio de una debilidad para el final.', k: 'info' }), addSug('iqp', 'El peón aislado de dama', '#lec-m-iqp');
      if (s.doubled.length) report.strategy.push({ t: `Tenías peones doblados (columna ${s.doubled.join(', ')}).`, k: 'info' });
      if (s.passed.length) report.strategy.push({ t: `Creaste ${s.passed.length > 1 ? 'peones pasados' : 'un peón pasado'} (${s.passed.map(p => p.sq).join(', ')}): avánzalo con apoyo de las piezas.`, k: 'good' });
    }
    const rookOpen = mine.some(i => { if (D.moves[i].piece !== 'r') return false; const f = D.moves[i].to[0]; return !pieces(D.fens[i + 1]).some(p => p.type === 'p' && p.sq[0] === f); });
    if (rookOpen) report.strategy.push({ t: 'Llevaste tus torres a columnas abiertas.', k: 'good' });
    const trades = mine.filter(i => D.moves[i].captured && VAL[D.moves[i].captured] >= 3).length;
    const aheadTrades = mine.filter(i => D.moves[i].captured && items[i].wpB >= 70).length;
    if (aheadTrades >= 2) report.strategy.push({ t: 'Con ventaja, simplificaste cambiando piezas: buena técnica para convertir.', k: 'good' });
    else if (trades >= 4) report.strategy.push({ t: 'Partida con muchos cambios de piezas: la estructura de peones decide el final.', k: 'info' });
    if (!report.strategy.length) report.strategy.push({ t: 'Partida de maniobras sin desequilibrios grandes de estructura.', k: 'info' });

    // Táctica
    let hung = 0, mates = 0, missedMate = 0, allowedMate = 0, missedWin = 0;
    mine.forEach(i => {
      const x = explain(D, i);
      const bad = ['blunder', 'mistake', 'miss', 'inaccuracy'].includes(cls[i]);
      if (!bad) return;
      x.why.forEach(w => { if (/^Deja /.test(w)) hung++; if (/^Permite mate/.test(w)) allowedMate++; if (/^Había mate/.test(w)) missedMate++; if (/^Se podía ganar/.test(w)) missedWin++; });
    });
    mine.forEach(i => { if (new Chess(D.fens[i + 1]).in_checkmate()) mates++; });
    if (mates) report.tactics.push({ t: '¡Diste jaque mate!', k: 'good' });
    if (top.length) report.tactics.push({ t: `Encontraste ${top.length} ${top.length > 1 ? 'jugadas brillantes o geniales' : 'jugada brillante o genial'}: ${top.slice(0, 3).map(at).join(', ')}.`, k: 'good' });
    if (hung) report.tactics.push({ t: `Dejaste piezas sin defender ${hung} ${hung > 1 ? 'veces' : 'vez'}. Antes de cada jugada, comprueba qué piezas quedan atacadas.`, k: 'fix' }), addSug('sueltas', 'Táctica: piezas sin defender', '#tactica');
    if (missedWin) report.tactics.push({ t: `No viste ${missedWin} ${missedWin > 1 ? 'ocasiones' : 'ocasión'} de ganar material.`, k: 'fix' }), addSug('ccr', 'Puzles: jaques, capturas y amenazas', '#puzles');
    if (missedMate) report.tactics.push({ t: `Se te escaparon ${missedMate} ${missedMate > 1 ? 'mates' : 'mate'}.`, k: 'fix' }), addSug('mates', 'Patrones de mate', '#lec-t-mates1');
    if (allowedMate) report.tactics.push({ t: `Permitiste mate ${allowedMate} ${allowedMate > 1 ? 'veces' : 'vez'}: revisa siempre los jaques del rival.`, k: 'fix' }), addSug('defensa', 'Ataque y defensa del rey', '#ataque');
    if (!report.tactics.length) report.tactics.push({ t: 'Sin errores tácticos importantes.', k: 'good' });

    // Finales
    const myEnd = mine.filter(i => phase[i] === 'e');
    if (myEnd.length >= 4) {
      const a = ph.e[me];
      report.endgame.push({ t: `Precisión en el final: <b>${a.toFixed(0)}%</b>.`, k: a >= 80 ? 'good' : a < 65 ? 'fix' : 'info' });
      if (a < 70) addSug('finales', 'Finales teóricos', '#finales');
      const kingAct = myEnd.filter(i => D.moves[i].piece === 'k').length;
      report.endgame.push(kingAct >= 2 ? { t: 'Activaste el rey en el final.', k: 'good' } : { t: 'En el final el rey es una pieza de ataque: acércalo al centro y a los peones.', k: 'fix' });
      if (kingAct < 2) addSug('reyact', 'El rey activo', '#lec-f-rey-activo');
    } else report.endgame.push({ t: 'La partida no llegó a un final.', k: 'info' });

    // Gestión de la ventaja
    const peak = Math.max(...mine.map(i => items[i].wpB), 0);
    const res = D.result; // 'win' | 'loss' | 'draw' | null (desde el punto de vista de me)
    if (peak >= 85 && res && res !== 'win') report.advantage.push({ t: 'Llegaste a tener una posición ganadora y se te escapó. Con ventaja: simplifica, elimina contrajuego y no te precipites.', k: 'fix' }), addSug('conv', 'Transformar ventajas y cuándo cambiar', '#lec-m-cambios');
    else if (peak >= 85 && res === 'win') report.advantage.push({ t: 'Convertiste tu ventaja en victoria.', k: 'good' });
    const low = Math.min(...mine.map(i => items[i].wpB), 100);
    if (low <= 15 && res && res !== 'loss') report.advantage.push({ t: 'Te salvaste de una posición perdida: buena resistencia.', k: 'good' });
    if (bad.length) report.advantage.push({ t: `Momento decisivo: ${at(bad[0])} (${window.BADGES && BADGES[cls[bad[0]]] ? BADGES[cls[bad[0]]].t : ''}).`, k: 'fix' });
    if (!report.advantage.length) report.advantage.push({ t: 'La evaluación se mantuvo equilibrada durante la partida.', k: 'info' });

    // Resumen de aciertos / correcciones y sugerencias
    const all = [...report.opening, ...report.strategy, ...report.tactics, ...report.endgame, ...report.advantage];
    report.good = all.filter(x => x.k === 'good').map(x => x.t);
    report.fix = all.filter(x => x.k === 'fix').map(x => x.t);
    report.suggest = [...sug.values()];
    if (!report.suggest.length) report.suggest.push({ t: 'Sigue con puzles diarios para mantener la vista táctica', href: '#puzles' });
    report.me = me;
    R.report = report;
    R.summary = { acc: acc[me], elo: R.elo[me], ph: { o: ph.o[me], m: ph.m[me], e: ph.e[me] }, cnt: Object.fromEntries(['brilliant', 'great', 'best', 'excellent', 'good', 'book', 'inaccuracy', 'mistake', 'miss', 'blunder'].map(c => [c, count(c, me)])), issues: [...sug.keys()] };
    return R;
  }

  window.GameReport = { build, estElo, PHASE_GRADE, pvSan };
})();
