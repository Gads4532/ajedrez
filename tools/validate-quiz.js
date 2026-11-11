/* Valida las preguntas teóricas de las lecciones: node tools/validate-quiz.js
   Cada lección debe tener al menos 3 preguntas; cada pregunta, 3 opciones distintas, una correcta (ok: 0-2) y su explicación. */
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
global.window = {};
const data = (f) => path.join(ROOT, 'data', f);
fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^lessons.*\.js$/.test(f)).sort((a, b) => (b === 'lessons.js') - (a === 'lessons.js')).forEach(f => require(data(f)));
fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^quiz.*\.js$/.test(f)).forEach(f => require(data(f)));
const Q = window.LESSON_QUIZ || {}, ids = new Set(window.LESSONS.map(l => l.id));
const TAGS = /<\/?([a-z0-9]+)[^>]*>/gi, OK_TAGS = new Set(['b', 'i', 'span']);
let errs = 0, total = 0; const err = (id, m) => { errs++; console.log(`✗ [${id}] ${m}`); };
for (const id in Q) if (!ids.has(id)) err(id, 'id de lección inexistente');
for (const L of window.LESSONS) {
  const qs = Q[L.id] || [];
  if (qs.length < 3) err(L.id, `solo ${qs.length} preguntas (mínimo 3)`);
  qs.forEach((q, i) => {
    total++; const w = `pregunta ${i + 1}`;
    if (!q.q || q.q.length < 10) err(L.id, `${w}: enunciado vacío o muy corto`);
    if (!Array.isArray(q.opts) || q.opts.length !== 3) err(L.id, `${w}: debe tener exactamente 3 opciones`);
    else if (new Set(q.opts.map(o => String(o).trim().toLowerCase())).size !== 3) err(L.id, `${w}: opciones repetidas`);
    if (![0, 1, 2].includes(q.ok)) err(L.id, `${w}: ok debe ser 0, 1 o 2`);
    if (!q.why || q.why.length < 15) err(L.id, `${w}: falta la explicación (why)`);
    for (const t of [q.q, ...(q.opts || []), q.why]) { let m; TAGS.lastIndex = 0; while ((m = TAGS.exec(String(t || '')))) if (!OK_TAGS.has(m[1].toLowerCase())) err(L.id, `${w}: etiqueta no permitida <${m[1]}>`); }
    if (/(^|[^\p{L}])(vosotr|os (turn|ha)|\p{L}+[áé]is(?![\p{L}]))/iu.test([q.q, ...(q.opts || []), q.why].join(' '))) err(L.id, `${w}: usa español latinoamericano (ustedes, no vosotros)`);
  });
}
const pos = Object.values(Q).flat().reduce((a, q) => { a[q.ok] = (a[q.ok] || 0) + 1; return a; }, {});
console.log(`${window.LESSONS.length} lecciones · ${total} preguntas · posición de la correcta ${JSON.stringify(pos)} · ${errs} error(es).`);
process.exit(errs ? 1 : 0);
