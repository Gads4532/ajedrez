/* Genera data/exercises.js: los ejercicios «Practica lo aprendido» de cada lección.
   Uso: node tools/build-exercises.js [profundidad=11] [procesos=4]

   Para cada posición de una lección con línea de jugadas, el alumno juega el bando que mueve en la posición inicial
   y el rival responde siguiendo la línea. Cada jugada del alumno se comprueba con Stockfish (js/sf19.js):
   solo se pregunta si es buena (pierde ≤ 4 puntos de probabilidad de ganar respecto a la mejor). Las jugadas que la
   lección muestra como error se juegan solas. En las partidas magistrales se preguntan las jugadas comentadas.
   Resultado: window.EXERCISES = { idLección: [{ fen, line, ask: [índices], o: 'w'|'b', title }] } */
const path = require('path'), fs = require('fs');
const { spawn } = require('child_process');
const ROOT = path.join(__dirname, '..');
const { Chess } = require(path.join(ROOT, 'js', 'chess.js'));
const DEPTH = +process.argv[2] || 11, PROCS = +process.argv[3] || 4;

global.window = {};
const files = fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^lessons.*\.js$/.test(f)).sort((a, b) => (b === 'lessons.js') - (a === 'lessons.js'));
for (const f of files) require(path.join(ROOT, 'data', f));
const LESSONS = window.LESSONS;

/* ---------- Pool de procesos de Stockfish ---------- */
function makeEngine() {
  const p = spawn('node', [path.join(ROOT, 'js', 'sf19.js')], { cwd: path.join(ROOT, 'js') });
  let buf = '', last = null, job = null; const q = [];
  let l2 = null;
  const run = () => { if (job || !q.length) return; job = q.shift(); last = null; l2 = null; p.stdin.write(`setoption name MultiPV value ${job.mpv || 1}\nposition fen ${job.fen}\ngo depth ${DEPTH}\n`); };
  p.stdout.on('data', d => {
    buf += d; const ls = buf.split('\n'); buf = ls.pop();
    for (const l of ls) {
      if (l.startsWith('info depth') && / score /.test(l)) { if (/ multipv 2 /.test(l)) l2 = l; else last = l; }
      if (l.startsWith('bestmove') && job) {
        const cpOf = (x) => { const sc = x && x.match(/score (cp|mate) (-?\d+)/); return sc ? (sc[1] === 'cp' ? +sc[2] : (+sc[2] > 0 ? 10000 - +sc[2] * 10 : -10000 - +sc[2] * 10)) : null; };
        const best = l.split(' ')[1]; const j = job; job = null; j.res({ cp: cpOf(last) || 0, cp2: cpOf(l2), mate: /score mate [1-9]/.test(last || ''), best }); run();
      }
    }
  });
  p.stdin.write('uci\nsetoption name Threads value 1\nisready\n');
  return { eval: (fen, mpv) => new Promise(res => { q.push({ fen, res, mpv }); run(); }), quit: () => p.stdin.write('quit\n') };
}
const engines = [...Array(PROCS)].map(makeEngine); let rr = 0;
const evalFen = (fen, mpv) => engines[rr++ % PROCS].eval(fen, mpv);
// cp desde el bando que mueve -> probabilidad de ganar (misma fórmula que EvalUtil.winPct)
const wp = (cp) => { const c = Math.max(-1000, Math.min(1000, cp)); return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1); };

// ¿Es buena la jugada «san» en «fen»? Compara con la mejor del motor.
async function goodMove(fen, san) {
  const c = new Chess(fen); const m = c.move(san, { sloppy: true }); if (!m) return false;
  if (c.in_checkmate()) return true;
  const [b, a] = await Promise.all([evalFen(fen), c.game_over() ? Promise.resolve({ cp: 0 }) : evalFen(c.fen())]);
  if (b.best === m.from + m.to + (m.promotion || '')) return true;
  return wp(b.cp) - wp(-a.cp) <= 4;
}

async function buildLesson(L) {
  const items = [];
  // drills: posiciones pensadas solo como ejercicio (se tratan igual que las de la lección)
  for (const [pi, P] of [...(L.positions || []), ...(L.drills || [])].entries()) {
    if (!P.line || !P.line.length) {
      // Posición sin línea: se pregunta la mejor jugada solo si es claramente la mejor (mate, o 12+ puntos sobre la segunda).
      const c0 = new Chess(P.fen); if (c0.game_over()) continue;
      const r = await evalFen(P.fen, 2); if (!r.best || r.best === '(none)') continue;
      const clear = r.mate || r.cp2 == null || wp(r.cp) - wp(r.cp2) >= 12;
      if (!clear || wp(r.cp) < 40) continue;
      const m = c0.move({ from: r.best.slice(0, 2), to: r.best.slice(2, 4), promotion: r.best[4] || 'q' }); if (!m) continue;
      items.push({ fen: P.fen, line: [m.san], ask: [0], o: new Chess(P.fen).turn(), title: P.caption || `Posición ${pi + 1}`, find: 1 });
      continue;
    }
    const g = new Chess(P.fen), side = g.turn(), fens = [g.fen()];
    for (const s of P.line) { if (!g.move(s, { sloppy: true })) break; fens.push(g.fen()); }
    const n = fens.length - 1; if (!n) continue;
    let ask, me = side;
    if (L.area === 'partidas') {
      const cand = P.line.map((_, k) => k).filter(k => k < n && (P.comments || [])[k]);
      const checks = await Promise.all(cand.map(k => goodMove(fens[k], P.line[k])));
      ask = cand.filter((k, i) => checks[i]);
    } else {
      // Se elige el bando cuyas jugadas son instructivas: primero el que mueve; si ninguna suya es buena, el rival.
      const pick = async (col) => { const cand = P.line.map((_, k) => k).filter(k => k < n && new Chess(fens[k]).turn() === col); const ch = await Promise.all(cand.map(k => goodMove(fens[k], P.line[k]))); return cand.filter((k, i) => ch[i]); };
      ask = await pick(side);
      if (!ask.length && n > 1) { const other = side === 'w' ? 'b' : 'w'; const a2 = await pick(other); if (a2.length) { ask = a2; me = other; } }
    }
    if (L.area === 'partidas') {
      // jugadas clave de la partida: preguntas sueltas (cada una desde su posición), como mucho 6
      ask.slice(0, 6).forEach(k => items.push({ fen: fens[k], line: [P.line[k]], ask: [0], o: new Chess(fens[k]).turn(), title: `Jugada ${fens[k].split(' ')[5]}: ¿qué jugó ${new Chess(fens[k]).turn() === 'w' ? 'el blanco' : 'el negro'}?` }));
      continue;
    }
    if (!ask.length) continue;
    const last = ask[ask.length - 1];
    items.push({ fen: P.fen, line: P.line.slice(0, last + 1), ask, o: me, title: P.caption || `Posición ${pi + 1}` });
  }
  return items;
}

(async () => {
  const out = {}; let done = 0, totalItems = 0, totalAsk = 0; const t0 = Date.now();
  const queue = LESSONS.slice();
  const worker = async () => { while (queue.length) { const L = queue.shift(); const it = await buildLesson(L); out[L.id] = it; done++; totalItems += it.length; totalAsk += it.reduce((s, x) => s + x.ask.length, 0); if (done % 10 === 0) console.error(`${done}/${LESSONS.length} lecciones (${Math.round((Date.now() - t0) / 1000)} s)`); } };
  await Promise.all([...Array(PROCS)].map(worker));
  engines.forEach(e => e.quit());
  const ordered = {}; LESSONS.forEach(L => { ordered[L.id] = out[L.id] || []; });
  const empty = LESSONS.filter(L => !ordered[L.id].length).map(L => L.id);
  fs.writeFileSync(path.join(ROOT, 'data', 'exercises.js'),
    `/* Generado por tools/build-exercises.js (Stockfish, profundidad ${DEPTH}). No editar a mano: vuelve a ejecutar el script.\n` +
    `   «Practica lo aprendido» de cada lección: el alumno juega el bando «o»; se le preguntan las jugadas de «ask» (índices de «line»). */\n` +
    `window.EXERCISES = ${JSON.stringify(ordered)};\n`);
  console.log(`${LESSONS.length} lecciones · ${totalItems} ejercicios · ${totalAsk} jugadas a encontrar · sin ejercicio de posiciones: ${empty.length} (${empty.join(', ')})`);
  process.exit(0);
})();
