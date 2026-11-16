#!/usr/bin/env node
/* Genera data/puzzles.js a partir de la base de datos pública de puzles de Lichess (licencia CC0), cuyos ratings
   salen de millones de intentos de jugadores reales.

   Uso:  node tools/build-puzzles.js <lichess_db_puzzle.csv> [porTemaYTramo=6]

   - El CSV es el de https://database.lichess.org/#puzzles (descomprimido) o cualquier copia con las mismas columnas:
     PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
   - Solo se aceptan puzles fiables: desviación del rating ≤ 80, popularidad ≥ 85 y ≥ 300 partidas jugadas (desde 2200:
     desviación ≤ 100, popularidad ≥ 80 y ≥ 100 partidas, porque hay pocos). Desde 2200 se toman el triple por tramo.
   - Formato de Lichess: el FEN es la posición ANTES de la jugada del rival y Moves[0] es esa jugada. En la app el
     FEN es la posición en la que juega el alumno, así que se aplica Moves[0] y se guardan las demás.
   - Selección estratificada: para cada tema de la app y cada tramo de 100 puntos (400-3000) se toman hasta N puzles
     (los más populares), más una muestra general por tramo, para que haya puzles de todos los temas y niveles.
   - Los temas que Lichess no etiqueta (mates del Pasillo, Greco, Ópera, Morphy, Lolli, Damiano, Legal, epaulette,
     molino, sobrecarga y ahogado) se conservan de la colección anterior de la app, con su rating recalibrado: se
     sustituye por el rating de Lichess del mismo percentil entre los puzles con el mismo número de jugadas.
   Documentado en docs/PUZLES.md. */
const fs = require('fs'), path = require('path'), readline = require('readline');
const { Chess } = require(path.join(__dirname, '..', 'js', 'chess.js'));
const [, , CSV, NARG] = process.argv;
if (!CSV) { console.error('Uso: node tools/build-puzzles.js <lichess_db_puzzle.csv> [porTemaYTramo]'); process.exit(1); }
const PER = +(NARG || 6);

// Temas de Lichess → temas de la app (los nombres que usan las lecciones, la ruta y los filtros)
const MAP = {
  fork: 'horquilla', pin: 'clavada', skewer: 'enfilada', discoveredAttack: 'ataqueDescubierto', discoveredCheck: 'ataqueDescubierto',
  doubleCheck: 'jaqueDoble', deflection: 'desviacion', attraction: 'atraccion', capturingDefender: 'eliminacionDefensor',
  intermezzo: 'intermedia', xRayAttack: 'rayosX', sacrifice: 'sacrificio', promotion: 'coronacion', advancedPawn: 'coronacion',
  underPromotion: 'subpromocion', enPassant: 'alPaso', castling: 'enroque', hangingPiece: 'piezaColgada',
  advantage: 'ventajaMaterial', crushing: 'ventajaMaterial', defensiveMove: 'defensa', equality: 'defensa',
  quietMove: 'quietMove', zugzwang: 'zugzwang', interference: 'interferencia',
  mate: 'mate', mateIn1: 'mateIn1', mateIn2: 'mateIn2', mateIn3: 'mateIn3', mateIn4: 'mateIn4', mateIn5: 'mateIn4',
  backRankMate: 'mateCorredor', smotheredMate: 'mateAhogado', bodenMate: 'mateBoden', arabianMate: 'mateArabe',
  anastasiaMate: 'mateAnastasia', dovetailMate: 'mateColaGolondrina',
  endgame: 'final', rookEndgame: 'finalTorres', bishopEndgame: 'finalAlfiles', knightEndgame: 'finalCaballos',
  queenEndgame: 'finalDamas', queenRookEndgame: 'finalDamas', pawnEndgame: 'finalPeones',
  opening: 'apertura', middlegame: 'medioJuego', short: 'corto', oneMove: 'corto', long: 'largo', veryLong: 'muyLargo'
};
const LEGACY_ONLY = ['mateEpaulette', 'mateGreco', 'mateOpera', 'mateMorphy', 'mateLolli', 'mateDamiano', 'mateLegal', 'molino', 'sobrecarga', 'ahogado'];
const bucket = (r) => Math.max(4, Math.min(29, Math.floor(r / 100)));
const goalOf = (th) => { const m = th.find(t => /^mateIn\d$/.test(t)); if (m) return m === 'mateIn4' ? 'Mate en 4 o más' : 'Mate en ' + m.slice(-1); if (th.includes('mate')) return 'Da mate'; if (th.includes('defensa')) return 'Defiéndete'; if (th.includes('coronacion')) return 'Corona'; return 'Gana material'; };

(async () => {
  // 1. Leer y filtrar
  const rl = readline.createInterface({ input: fs.createReadStream(CSV), crlfDelay: Infinity });
  const pool = []; let n = 0, head = true;
  for await (const line of rl) {
    if (head) { head = false; continue; }
    n++;
    const c = line.split(','); if (c.length < 8) continue;
    const [id, fen, moves, rating, rd, pop, plays, themes] = c;
    // Por encima de 2200 hay pocos puzles con mucha muestra: se acepta algo más de desviación.
    if (+rating >= 2200 ? (+rd > 100 || +pop < 80 || +plays < 100) : (+rd > 80 || +pop < 85 || +plays < 300)) continue;
    const ms = moves.split(' '); if (ms.length < 2 || ms.length % 2) continue;
    const th = [...new Set(themes.split(' ').map(t => MAP[t]).filter(Boolean))];
    pool.push({ id, fen, ms, rating: +rating, pop: +pop, th });
  }
  console.log(`${n} puzles leídos, ${pool.length} fiables`);
  // 2. Selección estratificada por tema y tramo (primero los más populares)
  pool.sort((a, b) => b.pop - a.pop || a.id.localeCompare(b.id));
  const chosen = new Map(), cnt = {};
  const take = (p) => { if (!chosen.has(p.id)) chosen.set(p.id, p); };
  const themesAll = [...new Set(Object.values(MAP))];
  for (const p of pool) {
    const b = bucket(p.rating);
    for (const t of p.th) { const k = t + '|' + b; const lim = (['corto', 'largo', 'final', 'medioJuego', 'ventajaMaterial', 'mate'].includes(t) ? PER * 2 : PER) * (b >= 22 ? 3 : 1); if ((cnt[k] || 0) < lim) { cnt[k] = (cnt[k] || 0) + 1; take(p); } }
    const g = 'all|' + b; if ((cnt[g] || 0) < PER * 4) { cnt[g] = (cnt[g] || 0) + 1; take(p); }
  }
  // 3. Convertir al formato de la app (aplicando la jugada del rival) y comprobar legalidad
  const out = [];
  for (const p of chosen.values()) {
    const g = new Chess(p.fen); const u0 = p.ms[0];
    if (!g.move({ from: u0.slice(0, 2), to: u0.slice(2, 4), promotion: u0[4] })) continue;
    const fen = g.fen(); let ok = true;
    for (const u of p.ms.slice(1)) if (!g.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] })) { ok = false; break; }
    if (!ok) continue;
    if (!p.th.some(t => ['corto', 'largo', 'muyLargo'].includes(t))) p.th.push(p.ms.length - 1 === 1 ? 'corto' : p.ms.length - 1 <= 3 ? 'corto' : p.ms.length - 1 <= 5 ? 'largo' : 'muyLargo');
    out.push({ id: 'L' + p.id, fen, moves: p.ms.slice(1), rating: p.rating, themes: p.th, goal: goalOf(p.th), source: 'lichess' });
  }
  // 4. Temas que Lichess no tiene: se conservan de la colección anterior con rating recalibrado por percentil
  const old = (() => { try { const w = {}; new Function('window', fs.readFileSync(path.join(__dirname, '..', 'data', 'puzzles.js'), 'utf8'))(w); return w.PUZZLES || []; } catch (e) { return []; } })();
  const legacy = old.filter(p => p.source !== 'lichess' && p.themes.some(t => LEGACY_ONLY.includes(t)));
  const byLen = {}; for (const p of out) (byLen[p.moves.length] = byLen[p.moves.length] || []).push(p.rating); for (const k in byLen) byLen[k].sort((a, b) => a - b);
  const oldLen = {}; for (const p of old) (oldLen[p.moves.length] = oldLen[p.moves.length] || []).push(p.oldRating || p.rating); for (const k in oldLen) oldLen[k].sort((a, b) => a - b);
  for (const p of legacy) {
    const r0 = p.oldRating || p.rating, L = p.moves.length, src = oldLen[L] || [r0], dst = byLen[Math.min(L, 9)] || byLen[1];
    const q = src.filter(x => x <= r0).length / src.length; const r = dst[Math.min(dst.length - 1, Math.floor(q * (dst.length - 1)))];
    out.push(Object.assign({}, p, { rating: Math.round(r / 10) * 10, oldRating: r0, source: 'clasico' }));
  }
  out.sort((a, b) => a.rating - b.rating || a.id.localeCompare(b.id));
  const head2 = '/* Puzles: base de datos pública de Lichess (CC0, https://database.lichess.org), con el rating real medido por millones de intentos;\n   más los patrones clásicos que Lichess no etiqueta, con rating recalibrado. Generado con tools/build-puzzles.js (ver docs/PUZLES.md). */\n';
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'puzzles.js'), head2 + 'window.PUZZLES=' + JSON.stringify(out) + ';\n');
  const tc = {}; for (const p of out) for (const t of p.themes) tc[t] = (tc[t] || 0) + 1;
  const rb = {}; for (const p of out) { const k = Math.floor(p.rating / 400) * 400; rb[k] = (rb[k] || 0) + 1; }
  console.log(`${out.length} puzles (${legacy.length} clásicos recalibrados)`); console.log('por rating', JSON.stringify(rb)); console.log('por tema', JSON.stringify(tc));
})();
