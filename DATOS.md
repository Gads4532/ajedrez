# Esquemas de datos — Ajedrez Pro (todo el contenido en ESPAÑOL)

Cada archivo de datos en `data/` es un script de navegador que asigna una global en `window`.
Nada de `import/export`. Texto en español; las jugadas en SAN inglés (chess.js: N,B,R,Q,K) porque el
motor las necesita así — la UI las traduce a notación española (C,A,T,D,R) al mostrarlas.
Campos HTML: usar solo <p>, <b>, <i>, <ul>, <li>, <h4>, <span class="mv">e4</span> (para jugadas en texto).
Validar TODA FEN y TODA secuencia de jugadas con chess.js 0.10.3 en Node:
  `const {Chess}=require('/tmp/claude-0/-home-user/7319dc67-825e-5776-865b-21441cb2c63d/scratchpad/tools/node_modules/chess.js')`
Stockfish 10 en Node: `require('/tmp/claude-0/-home-user/7319dc67-825e-5776-865b-21441cb2c63d/scratchpad/tools/node_modules/stockfish')()`
(ver scratchpad/tools/sftest.js). Scripts auxiliares → scratchpad, no en /home/user/ajedrez-pro.

## data/openings.js → `window.OPENINGS = [...]`
{ id:'italiana', name:'Apertura Italiana', eco:'C50-C54', group:'e4'|'d4'|'flancos',
  type:'abierta'|'semiabierta'|'cerrada'|'semicerrada'|'flanco'|'gambito',
  side:'blancas'|'negras',            // quién la "elige"
  level:'principiante'|'intermedio'|'avanzado',
  summary:'1-2 frases',
  moves:['e4','e5','Nf3','Nc6','Bc4','Bc5'],   // línea principal desde la posición inicial
  comments:['texto por jugada o ""', ...],      // MISMA longitud que moves
  stats:{ white:38, draw:34, black:28, popularity:'Muy alta', elo:'Todos los niveles',
          note:'Aprox. bases de partidas magistrales' },
  ideas:['...'], plansWhite:['...'], plansBlack:['...'],
  pros:['...'], cons:['...'],
  structures:'texto: estructura de peones típica',
  variations:[{ name:'Giuoco Pianissimo', moves:[...línea completa desde inicio...], note:'...' }],
  traps:[{ name:'Trampa ...', moves:[...completa desde inicio...], explanation:'...' }],
  players:['Carlsen','...'] }

## data/lessons.js → `window.LESSONS = [...]`
{ id, area:'medio'|'final'|'apertura-principios'|'tactica'|'estrategia',
  category:'Estructuras de peones' (subgrupo libre), title, level, summary,
  html:'<p>...</p> explicación profunda',
  keyPoints:['...'], pros:['...'] (opcional), cons:['...'] (opcional),
  positions:[{ fen, orientation:'white'|'black', caption:'...',
               line:['SAN',...] (opcional, desde fen), comments:['...'] (misma longitud que line, opcional),
               arrows:[['e2','e4','g'|'r'|'b'|'y']] (opcional), highlights:['d5'] (opcional) }],
  practice:{ fen, goal:'ganar'|'tablas'|'mate', side:'w'|'b', text:'objetivo' } (opcional; el usuario
           juega contra Stockfish desde ahí; Stockfish confirma que el objetivo es alcanzable) }

## data/knowledge.js → varias globales
window.METHODS = [{ id, name, author, era, tags:['táctica','visualización',...], summary,
   html:'descripción profunda', steps:['...'], pros:['...'], cons:['...'],
   bestFor:'nivel/elo', timePerWeek:'...', evidence:'qué dice la investigación/experiencia',
   resources:['libros/autores reales'], appTool:'puzzles'|'woodpecker'|'vision'|'ciega'|'jugar'|'finales'|'aperturas'|'analisis'|null }]
window.PLANS = [{ id, level:'Principiante (0-1000)', hoursPerWeek, focus:'...',
   distribution:[{area:'Táctica',pct:40}, ...], weekly:[{day:'Lunes', tasks:['...']}], milestones:['...'] }]
window.THINKING = { title, html, checklist:['...'] }  // proceso de pensamiento (Kotov, Heisman, Aagaard...)
window.RULES = [{ title, html }]   // reglas completas, notación, reglamento FIDE (tablas, 50 jugadas...)
window.HISTORY = { champions:[{name, country, years, style}], eras:[{name, html}] }
window.GLOSSARY = [{ term, def }]
window.STATS = [{ title, html, table:{head:[...], rows:[[...]]} (opcional) }] // valores de piezas,
   estadísticas de resultados, % de tablas por nivel, ventaja de blancas, finales teóricos (Nalimov/Syzygy), etc.
window.PSYCHOLOGY = [{ title, html }] // gestión del tiempo, preparación de torneos, físico, tilt...

## data/puzzles.js → `window.PUZZLES = [...]`
{ id:'p0001', fen,                      // FEN con el bando que RESUELVE al turno
  moves:['e2e4','d7d5',...],            // UCI. índices pares = jugador, impares = respuesta forzada
  rating:1200, themes:['mate','mateIn2','horquilla','clavada',...], title:'opcional', source:'clásico'|'generado' }
Temas permitidos (claves): mateIn1, mateIn2, mateIn3, mateIn4, mate, horquilla, clavada, enfilada, ataqueDescubierto,
jaqueDoble, desviacion, atraccion, sobrecarga, eliminacionDefensor, intermedia, rayosX, molino, sacrificio,
coronacion, final, finalPeones, finalTorres, ahogado, defensa, ventajaMaterial, piezaColgada, mateCorredor,
mateAhogado(asfixia de Philidor), mateAnastasia, mateArabe, mateBoden, mateEpaulette, sacrificioGriego, quietMove(jugada tranquila),
zugzwang, apertura, medioJuego, corto, largo, muyLargo

## Lecciones en varios archivos
`data/lessons.js` asigna `window.LESSONS`; los archivos `data/lessons-*.js` **añaden** lecciones con
`(window.LESSONS = window.LESSONS || []).push(...)` y deben cargarse después. Áreas (`area`) y sección donde aparecen:
`basico` → Aprender a jugar · `apertura-principios` → Principios · `tactica` → Táctica · `estrategia`/`medio` → Medio juego ·
`ataque` → Ataque · `final` → Finales · `partidas` → Partidas magistrales.
Validar siempre: `node tools/validate-lessons.js data/lessons*.js` (FEN, legalidad de cada jugada, longitudes y etiquetas HTML).

## data/actualidad.js → `window.ACTUALIDAD`
{ updated:'fecha en texto', next:[{ title, when, where, html }], champions:[{ title, who, flag, note }],
  ranking:{ title, note, open:[[puesto, jugador, país, elo]], women:[...] }, trends:[{ title, html }], sources:[[título, url]] }
Se edita a mano cuando hay novedades (ver `docs/ANALISIS.md`, apartado Mantenimiento).

## Partidas y su análisis → `S.games[]`
El formato de cada partida guardada y del resumen de su revisión (`rev`) está en `docs/ANALISIS.md`, apartado 3.

## Idioma
Todos los textos van en **español latinoamericano**: «ustedes» en lugar de «vosotros» (se turnan, resuelven), computadora, celular,
presionar en lugar de pulsar, error en lugar de fallo, y pretérito simple en los mensajes (¡Ganaste!, Perdiste).

## data/exercises.js → `window.EXERCISES` (generado)
{ idLección: [{ fen, line:[SAN…], ask:[índices de line que juega el alumno], o:'w'|'b', title, find?:1 }] }
No se edita a mano: `node tools/build-exercises.js` (ver `docs/EJERCICIOS.md`). Volver a generarlo tras cambiar lecciones.
