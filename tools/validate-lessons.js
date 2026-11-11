/* Valida archivos de lecciones: node tools/validate-lessons.js data/lessons.js data/lessons-ataque.js ...
   Comprueba campos obligatorios, ids únicos, FEN válidas, jugadas legales (SAN), longitudes de comments,
   flechas/casillas válidas y etiquetas HTML permitidas. Sale con código 1 si hay errores. */
const path = require('path');
const { Chess } = require(path.join(__dirname, '..', 'js', 'chess.js'));
global.window = {};
// lessons.js reasigna window.LESSONS: debe cargarse antes que los archivos que añaden lecciones.
const files = process.argv.slice(2).sort((a, b) => (path.basename(b) === 'lessons.js') - (path.basename(a) === 'lessons.js'));
if (!files.length) { console.error('Uso: node tools/validate-lessons.js <archivo.js>...'); process.exit(2); }
for (const f of files) require(path.resolve(f));
const L = window.LESSONS || [];
const AREAS = ['basico', 'apertura-principios', 'tactica', 'estrategia', 'medio', 'ataque', 'final', 'partidas'];
const LEVELS = ['principiante', 'intermedio', 'avanzado'];
const SQ = /^[a-h][1-8]$/;
const TAGS = /<\/?([a-z0-9]+)[^>]*>/gi, OK_TAGS = new Set(['p', 'b', 'i', 'ul', 'ol', 'li', 'h4', 'span', 'br']);
let errs = 0; const err = (id, m) => { errs++; console.log(`✗ [${id}] ${m}`); };
const ids = new Set();
const checkLine = (id, where, fen, line, comments) => {
  let c; try { c = new Chess(fen); const v = c.validate_fen(fen); if (!v.valid) return err(id, `${where}: FEN inválida (${v.error}) ${fen}`); } catch (e) { return err(id, `${where}: FEN inválida ${fen}`); }
  (line || []).forEach((m, i) => { if (c && !c.move(m, { sloppy: true })) { err(id, `${where}: jugada ilegal #${i + 1} "${m}" en ${c.fen()}`); c = null; } });
  if (comments && line && comments.length !== line.length) err(id, `${where}: comments (${comments.length}) ≠ line (${line.length})`);
};
for (const l of L) {
  const id = l.id || '(sin id)';
  if (!l.id) err(id, 'falta id'); else if (ids.has(l.id)) err(id, 'id repetido'); else ids.add(l.id);
  for (const k of ['area', 'category', 'title', 'level', 'summary', 'html']) if (!l[k]) err(id, `falta ${k}`);
  if (l.area && !AREAS.includes(l.area)) err(id, `area desconocida ${l.area}`);
  if (l.level && !LEVELS.includes(l.level)) err(id, `level desconocido ${l.level}`);
  let m; const html = String(l.html || ''); TAGS.lastIndex = 0;
  while ((m = TAGS.exec(html))) if (!OK_TAGS.has(m[1].toLowerCase())) err(id, `etiqueta HTML no permitida <${m[1]}>`);
  (l.positions || []).forEach((p, i) => {
    const w = `posición ${i + 1}`;
    if (!p.caption) err(id, `${w}: falta caption`);
    checkLine(id, w, p.fen, p.line, p.comments);
    (p.arrows || []).forEach(a => { if (!SQ.test(a[0]) || !SQ.test(a[1])) err(id, `${w}: flecha inválida ${a}`); });
    (p.highlights || []).forEach(s => { if (!SQ.test(s)) err(id, `${w}: casilla inválida ${s}`); });
  });
  (l.drills || []).forEach((p, i) => {
    const w = `ejercicio ${i + 1}`;
    if (!p.caption) err(id, `${w}: falta caption`);
    if (!p.line || !p.line.length) err(id, `${w}: un ejercicio necesita line`);
    checkLine(id, w, p.fen, p.line, p.comments);
  });
  if (l.practice) {
    const p = l.practice; checkLine(id, 'practice', p.fen, [], null);
    if (!['ganar', 'tablas', 'mate'].includes(p.goal)) err(id, `practice.goal inválido ${p.goal}`);
    if (!['w', 'b'].includes(p.side)) err(id, 'practice.side inválido');
    // side puede no coincidir con el turno: entonces el motor mueve primero (intencionado en algunas lecciones).
  }
}
console.log(`${L.length} lecciones revisadas, ${errs} error(es).`);
process.exit(errs ? 1 : 0);
