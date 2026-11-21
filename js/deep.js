/* Análisis profundo: funciones puras que completan la revisión de partida (js/review.js).
   - motifs(fen, pvUci): motivos tácticos de una línea (horquilla, clavada, enfilada, ataque descubierto, jaque doble,
     mate del pasillo, pieza colgada, sobrecarga simple…).
   - factors(fen): factores posicionales de cada bando (material, seguridad del rey, actividad, centro, estructura, espacio).
   - clocks(pgnText): tiempos de reloj por jugada a partir de los comentarios [%clk h:mm:ss] de chess.com y Lichess.
   - timeReport(clk, cls, me, startSec): uso del tiempo (apuros, jugadas demasiado rápidas antes de un error, pensadas largas).
   - narrative(evals, cls, sans, fens, me): resumen por tramos de cómo fue la partida.
   Todo en español; las jugadas van en <span class="mv"> para que la app las traduzca. Documentado en docs/ANALISIS.md. */
(function () {
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
  const NAME = { p: 'peón', n: 'caballo', b: 'alfil', r: 'torre', q: 'dama', k: 'rey' };
  const ART = { p: 'el', n: 'el', b: 'el', r: 'la', q: 'la', k: 'el' };
  const nm = (t) => `${ART[t]} ${NAME[t]}`;
  const FILES = 'abcdefgh';
  const sq = (f, r) => FILES[f] + (r + 1);
  const xy = (s) => [FILES.indexOf(s[0]), +s[1] - 1];
  const mv = (s) => `<span class="mv">${s}</span>`;
  const board = (c) => { const B = {}; c.board().forEach((row, ri) => row.forEach((p, fi) => { if (p) B[sq(fi, 7 - ri)] = p; })); return B; };
  const uciMove = (c, u) => c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] || 'q' });

  // Casillas que ataca una pieza (sin importar a quién le toque mover)
  function attacksFrom(B, s) {
    const p = B[s]; if (!p) return []; const [f, r] = xy(s), out = [];
    const add = (df, dr, slide) => { let x = f + df, y = r + dr; while (x >= 0 && x < 8 && y >= 0 && y < 8) { const t = sq(x, y); out.push(t); if (!slide || B[t]) break; x += df; y += dr; } };
    if (p.type === 'p') { const d = p.color === 'w' ? 1 : -1; add(-1, d, false); add(1, d, false); }
    if (p.type === 'n') [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]].forEach(([a, b]) => add(a, b, false));
    if (p.type === 'k') [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => add(a, b, false));
    if ('bq'.includes(p.type)) [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => add(a, b, true));
    if ('rq'.includes(p.type)) [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => add(a, b, true));
    return out;
  }
  const attackers = (B, target, col) => Object.keys(B).filter(s => B[s].color === col && attacksFrom(B, s).includes(target));

  // Rayo desde una pieza de largo alcance: primera y segunda pieza encontradas en una dirección
  function rays(B, s) {
    const p = B[s]; const out = []; if (!p || !'bqr'.includes(p.type)) return out;
    const dirs = []; if ('bq'.includes(p.type)) dirs.push([1, 1], [1, -1], [-1, 1], [-1, -1]); if ('rq'.includes(p.type)) dirs.push([1, 0], [-1, 0], [0, 1], [0, -1]);
    const [f, r] = xy(s);
    for (const [df, dr] of dirs) { let x = f + df, y = r + dr; const hit = []; while (x >= 0 && x < 8 && y >= 0 && y < 8 && hit.length < 2) { const t = sq(x, y); if (B[t]) hit.push(t); x += df; y += dr; } if (hit.length) out.push(hit); }
    return out;
  }

  /* ---------- Motivos tácticos tras una jugada ---------- */
  // m: jugada recién hecha (verbose de chess.js), c: posición después. Devuelve textos.
  function motifsAfter(c, m) {
    const out = [], B = board(c), me = m.color, opp = me === 'w' ? 'b' : 'w', to = m.to, P = B[to];
    if (!P) return out;
    if (c.in_checkmate()) {
      const [kf, kr] = (() => { const k = Object.keys(B).find(s => B[s].type === 'k' && B[s].color === opp); return xy(k); })();
      const backRank = (opp === 'w' ? kr === 0 : kr === 7) && ['r', 'q'].includes(P.type) && xy(to)[1] === kr;
      if (backRank) out.push('mate del pasillo (el rey no tiene salida por sus propios peones)');
      else if (P.type === 'n' && Object.values(attacksFrom(B, Object.keys(B).find(s => B[s].type === 'k' && B[s].color === opp))).every(s => B[s] && B[s].color === opp)) out.push('mate ahogado: el rey está rodeado por sus propias piezas');
      return out;
    }
    // Jaque doble y ataque descubierto
    if (c.in_check()) {
      const k = Object.keys(B).find(s => B[s].type === 'k' && B[s].color === opp);
      const checkers = attackers(B, k, me);
      if (checkers.length >= 2) out.push('jaque doble: dos piezas dan jaque a la vez y solo puede mover el rey');
      else if (checkers.length === 1 && checkers[0] !== to) out.push(`jaque a la descubierta: al mover ${nm(m.piece)}, ${nm(B[checkers[0]].type)} de ${checkers[0]} da jaque`);
    } else {
      // descubierto (sin jaque): una pieza de largo alcance propia ataca ahora algo valioso que antes tapaba la pieza movida
      for (const s of Object.keys(B)) { if (B[s].color !== me || !'bqr'.includes(B[s].type) || s === to) continue;
        for (const [a] of rays(B, s)) if (B[a].color === opp && VAL[B[a].type] >= 3 && attacksFrom(B, s).includes(a)) {
          const [sf, sr] = xy(s), [af, ar] = xy(a), [ff, fr] = xy(m.from);
          const between = (Math.sign(ff - sf) === Math.sign(af - sf) || af === sf) && (Math.sign(fr - sr) === Math.sign(ar - sr) || ar === sr) && ((ff - sf) * (ar - sr) === (fr - sr) * (af - sf)) && Math.abs(ff - sf) <= Math.abs(af - sf) && Math.abs(fr - sr) <= Math.abs(ar - sr);
          if (between) { out.push(`ataque descubierto: al apartarse ${nm(m.piece)}, ${nm(B[s].type)} de ${s} ataca ${nm(B[a].type)} de ${a}`); break; }
        } }
    }
    // Horquilla / ataque doble: la pieza movida ataca dos o más objetivos valiosos o sin defensa
    const targets = attacksFrom(B, to).filter(s => B[s] && B[s].color === opp && (B[s].type === 'k' || VAL[B[s].type] > VAL[P.type] || attackers(B, s, opp).length === 0) && B[s].type !== 'p');
    if (targets.length >= 2) out.push(`${P.type === 'n' ? 'horquilla de caballo' : P.type === 'p' ? 'horquilla de peón' : 'ataque doble'} en ${to}: ataca ${targets.map(s => `${nm(B[s].type)} de ${s}`).join(' y ')}`);
    // Clavada y enfilada creadas por la pieza movida
    for (const hit of rays(B, to)) {
      if (hit.length < 2) continue; const [a, b] = hit; if (B[a].color !== opp || B[b].color !== opp) continue;
      if (VAL[B[b].type] > VAL[B[a].type] && B[a].type !== 'k') out.push(`clavada: ${nm(B[a].type)} de ${a} no puede moverse sin dejar ${B[b].type === 'k' ? 'al rey en jaque' : `${nm(B[b].type)} de ${b} expuesta`}`);
      else if (VAL[B[a].type] > VAL[B[b].type] && VAL[B[a].type] >= 5) out.push(`enfilada: ${nm(B[a].type)} de ${a} debe apartarse y queda ${nm(B[b].type)} de ${b}`);
    }
    // Captura de una pieza que defendía otra (eliminación del defensor)
    if (m.captured && VAL[m.captured] >= 3) {
      const undefended = Object.keys(B).filter(s => B[s].color === opp && VAL[B[s].type] >= 3 && B[s].type !== 'k' && attackers(B, s, me).length && !attackers(B, s, opp).length);
      if (undefended.length) out.push(`tras la captura queda sin defensa ${nm(B[undefended[0]].type)} de ${undefended[0]}`);
    }
    return out;
  }
  // Motivos a lo largo de una línea (solo las jugadas del bando que la inicia)
  function motifs(fen, pv, maxPly = 6) {
    const c = new Chess(fen), side = c.turn(), out = [];
    for (const u of (pv || []).slice(0, maxPly)) { const m = uciMove(c, u); if (!m) break; if (m.color === side) motifsAfter(c, m).forEach(t => { if (!out.some(x => x.t === t)) out.push({ t, san: m.san, ply: out.length }); }); }
    return out;
  }

  /* ---------- Factores posicionales ---------- */
  function factors(fen) {
    const c = new Chess(fen), B = board(c), out = {};
    for (const col of ['w', 'b']) {
      const opp = col === 'w' ? 'b' : 'w', mine = Object.keys(B).filter(s => B[s].color === col);
      const material = mine.reduce((s, x) => s + (B[x].type === 'k' ? 0 : VAL[B[x].type]), 0);
      // Actividad: casillas atacadas por piezas (sin peones ni rey)
      const activity = mine.filter(s => !'pk'.includes(B[s].type)).reduce((s, x) => s + attacksFrom(B, x).filter(t => !B[t] || B[t].color === opp).length, 0);
      // Centro: ataques y ocupación de d4 e4 d5 e5
      const center = ['d4', 'e4', 'd5', 'e5'].reduce((s, t) => s + attackers(B, t, col).length + (B[t] && B[t].color === col ? 1 : 0), 0);
      // Espacio: casillas de la mitad rival atacadas por peones o piezas
      const space = new Set(mine.flatMap(s => attacksFrom(B, s)).filter(t => col === 'w' ? +t[1] >= 5 : +t[1] <= 4)).size;
      // Seguridad del rey: escudo de peones, columnas abiertas cerca y atacantes rivales alrededor
      const k = mine.find(s => B[s].type === 'k'); let shield = 0, open = 0, att = 0;
      if (k) { const [kf, kr] = xy(k), d = col === 'w' ? 1 : -1;
        for (let df = -1; df <= 1; df++) { const f = kf + df; if (f < 0 || f > 7) continue;
          if ([1, 2].some(n => { const t = sq(f, kr + d * n); return kr + d * n >= 0 && kr + d * n < 8 && B[t] && B[t].type === 'p' && B[t].color === col; })) shield++;
          if (![...Array(8).keys()].some(r => B[sq(f, r)] && B[sq(f, r)].type === 'p' && B[sq(f, r)].color === col)) open++; }
        const zone = attacksFrom({ [k]: { type: 'k', color: col } }, k).concat(k);
        att = new Set(zone.flatMap(t => attackers(B, t, opp).filter(s => B[s].type !== 'p'))).size; }
      const kingSafety = Math.max(0, Math.min(10, 4 + shield * 2 - open * 2 - att * 1.5 + (c.in_check() && c.turn() === col ? -2 : 0)));
      // Estructura de peones
      const pf = mine.filter(s => B[s].type === 'p').map(s => s[0]);
      const opf = Object.keys(B).filter(s => B[s].color === opp && B[s].type === 'p');
      const doubled = [...new Set(pf)].filter(f => pf.filter(x => x === f).length > 1).length;
      const isolated = [...new Set(pf)].filter(f => { const i = FILES.indexOf(f); return !pf.includes(FILES[i - 1]) && !pf.includes(FILES[i + 1]); }).length;
      const passed = mine.filter(s => B[s].type === 'p').filter(s => { const [f, r] = xy(s); return !opf.some(o => { const [of, or] = xy(o); return Math.abs(of - f) <= 1 && (col === 'w' ? or > r : or < r); }); }).length;
      out[col] = { material, activity, center, space, kingSafety: Math.round(kingSafety * 10) / 10, doubled, isolated, passed, bishops: mine.filter(s => B[s].type === 'b').length };
    }
    return out;
  }
  // Compara factores antes/después de una jugada desde el punto de vista del que mueve: textos de lo que cambió
  function factorChanges(fenA, fenB, col) {
    const A = factors(fenA)[col], Bf = factors(fenB)[col], opp = col === 'w' ? 'b' : 'w', oA = factors(fenA)[opp], oB = factors(fenB)[opp], out = [];
    if (Bf.kingSafety <= A.kingSafety - 2) out.push({ k: 'fix', t: 'Debilita la seguridad de tu rey (menos peones delante o más piezas rivales cerca).' });
    if (oB.kingSafety <= oA.kingSafety - 2) out.push({ k: 'good', t: 'Debilita el refugio del rey rival.' });
    if (Bf.activity >= A.activity + 4) out.push({ k: 'good', t: 'Activa tus piezas: controlan más casillas.' });
    if (Bf.activity <= A.activity - 5) out.push({ k: 'fix', t: 'Tus piezas pierden actividad.' });
    if (Bf.center >= A.center + 2) out.push({ k: 'good', t: 'Refuerza tu control del centro.' });
    if (Bf.doubled > A.doubled) out.push({ k: 'fix', t: 'Te deja con peones doblados.' });
    if (Bf.isolated > A.isolated) out.push({ k: 'fix', t: 'Crea un peón aislado en tu estructura.' });
    if (Bf.passed > A.passed) out.push({ k: 'good', t: 'Crea un peón pasado.' });
    if (oB.passed > oA.passed) out.push({ k: 'fix', t: 'Le da un peón pasado al rival.' });
    if (Bf.space >= A.space + 4) out.push({ k: 'good', t: 'Gana espacio en el campo rival.' });
    return out;
  }

  /* ---------- Reloj ---------- */
  // Devuelve los segundos restantes tras cada jugada (o null si el PGN no trae reloj)
  function clocks(pgn) {
    const t = String(pgn || ''); const m = [...t.matchAll(/\[%clk\s+(\d+):(\d{1,2}):(\d{1,2}(?:\.\d+)?)\]/g)];
    if (!m.length) return null; return m.map(x => +x[1] * 3600 + +x[2] * 60 + +x[3]);
  }
  function timeReport(clk, cls, me, tc) {
    if (!clk || clk.length < 4) return null;
    const startSec = (() => { const r = /^(\d+)/.exec(tc || ''); return r ? +r[1] : Math.max(clk[0], clk[1] || 0); })();
    const inc = (() => { const r = /\+(\d+)/.exec(tc || ''); return r ? +r[1] : 0; })();
    const used = clk.map((s, i) => { const prev = i < 2 ? startSec : clk[i - 2]; return Math.max(0, prev - s + inc); });
    const mine = used.map((u, i) => ({ u, i, left: clk[i] })).filter(x => (x.i % 2 === 0) === (me === 'w'));
    if (!mine.length) return null;
    const total = mine.reduce((s, x) => s + x.u, 0), avg = total / mine.length;
    const out = { avg, total, longest: mine.slice().sort((a, b) => b.u - a.u).slice(0, 3), trouble: null, fastErrors: [], used, startSec };
    const tr = mine.find(x => x.left < Math.max(30, startSec * 0.1)); if (tr) out.trouble = tr.i;
    mine.forEach(x => { if (['mistake', 'blunder', 'miss'].includes(cls[x.i]) && x.u < Math.max(3, avg * 0.35)) out.fastErrors.push(x.i); });
    out.errorsInTrouble = tr ? mine.filter(x => x.i >= tr.i && ['mistake', 'blunder'].includes(cls[x.i])).length : 0;
    return out;
  }

  /* ---------- Narrativa por tramos ---------- */
  function narrative(evals, cls, sans, fens, me, winPct) {
    const sg = me === 'w' ? 1 : -1, wpMe = (e) => winPct(sg * window.EvalUtil.toCp(e));
    const n = sans.length; if (n < 6) return [];
    const st = (w) => w >= 85 ? 'ganadora' : w >= 65 ? 'mejor' : w > 35 ? 'igualada' : w > 15 ? 'peor' : 'perdida';
    const seg = []; let cur = null;
    for (let i = 0; i <= n; i++) { const s = st(wpMe(evals[i])); if (!cur || cur.s !== s) { if (cur) cur.to = i - 1; cur = { s, from: i, to: i }; seg.push(cur); } }
    cur.to = n;
    // Une tramos muy cortos (menos de 3 medias jugadas) con el anterior
    const merged = []; for (const x of seg) { if (merged.length && x.to - x.from < 2) { merged[merged.length - 1].to = x.to; continue; } merged.push(x); }
    const no = (i) => { const f = fens[Math.min(i, fens.length - 1)].split(' '); return `${f[5]}${f[1] === 'w' ? '.' : '...'}`; };
    const TXT = { ganadora: 'tenías una posición ganadora', mejor: 'estabas mejor', igualada: 'la posición estaba igualada', peor: 'estabas peor', perdida: 'tu posición estaba perdida' };
    const out = merged.map((x, k) => {
      const turn = k > 0 ? (() => { const i = x.from - 1; const c = cls[i]; return i >= 0 && sans[i] ? ` tras ${no(i)} ${mv(sans[i])}${c && ['blunder', 'mistake', 'miss', 'brilliant', 'great'].includes(c) ? ' (' + ({ blunder: 'error grave', mistake: 'error', miss: 'oportunidad perdida', brilliant: 'jugada brillante', great: 'jugada genial' })[c] + ')' : ''}` : ''; })() : '';
      return `Jugadas ${Math.floor(x.from / 2) + 1}-${Math.floor(x.to / 2) + 1}: ${TXT[x.s]}${turn}.`;
    });
    return out.slice(0, 8);
  }

  window.Deep = { motifs, motifsAfter, factors, factorChanges, clocks, timeReport, narrative, attackersOf: (fen, s, col) => attackers(board(new Chess(fen)), s, col) };
})();
