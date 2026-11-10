# Encargo: lecciones nuevas para Ajedrez Pro (repo /home/user/ajedrez)

App de ajedrez en español (HTML/JS puro). Las lecciones viven en archivos de datos que **añaden** objetos a `window.LESSONS`.
Lee `DATOS.md` (sección `data/lessons.js`) y mira 2-3 lecciones de `data/lessons.js` como modelo de tono y profundidad
(por ejemplo `t-mates1`, `m-iqp`, `f-lucena`). No modifiques ningún archivo salvo el tuyo.

## Tu archivo
Crea SOLO el archivo indicado en tu tarea, con esta forma exacta:

```js
/* <descripción breve> — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(
  { id: '...', area: '...', category: '...', title: '...', level: 'principiante'|'intermedio'|'avanzado',
    summary: '1-2 frases', html: '<p>…</p>', keyPoints: ['…'], pros: [...]?, cons: [...]?,
    positions: [{ fen, orientation: 'white'|'black', caption, line?: ['SAN',…], comments?: [...misma longitud...],
                  arrows?: [['e2','e4','g'|'r'|'b'|'y']], highlights?: ['d5'] }],
    practice?: { fen, goal: 'ganar'|'tablas'|'mate', side: 'w'|'b', text } },
  ...
);
```

## Reglas
- **Todo el texto en español**, claro, para jugadores de club, con profundidad real (cada `html` de 150-400 palabras, con `<h4>` por apartado).
  Jugadas dentro del texto así: `<span class="mv">Nf3</span>` (SAN inglés; la app lo traduce). HTML permitido: p, b, i, ul, ol, li, h4, span, br.
- **Redacción 100 % propia.** No copies ni parafrasees texto de chess.com, libros ni webs. Los nombres de temas, aperturas y
  posiciones teóricas son conocimiento general; las partidas históricas (sus jugadas) son hechos y se pueden usar.
- Las jugadas en `line` y en el texto van en SAN inglés (N, B, R, Q, K). `line` empieza desde la `fen` de esa posición.
- Cada lección: 2-4 `positions`, cada una con `caption`; casi todas con `line` + `comments` (misma longitud; "" si no hay comentario).
- `practice` solo cuando la posición sea teoría clara (mate básico, final teórico conocido, táctica forzada). `side` es el bando
  del usuario y **debe coincidir con el turno de la FEN**. Si dudas de que el objetivo sea alcanzable con juego perfecto, no pongas `practice`.
- ids con el prefijo indicado en tu tarea, en minúsculas con guiones, sin repetir ninguno existente
  (lista actual: `node -e "global.window={};require('./data/lessons.js');console.log(window.LESSONS.map(l=>l.id).join(' '))"`).
- **Verifica cada posición**: piensa la línea jugada a jugada; asegúrate de que lo que dice el comentario es verdad en la posición
  (que el mate es mate, que la pieza realmente queda colgada, etc.). Las FEN deben ser posiciones legales y sensatas.
- Valida hasta 0 errores: `node tools/validate-lessons.js data/lessons.js <tu-archivo>`
  (comprueba FEN, legalidad de cada jugada, longitudes y etiquetas). Para comprobar mates/posiciones puedes usar chess.js:
  `const {Chess}=require('/home/user/ajedrez/js/chess.js')` (API 0.10.3: `in_checkmate()`, `moves()`, `fen()`…).
- No hagas commits ni toques git.

## Entrega
Responde con: ruta del archivo, número de lecciones, lista de ids + títulos, y la salida final del validador.
