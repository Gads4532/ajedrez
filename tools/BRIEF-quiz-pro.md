# Encargo: preguntas teóricas de NIVEL PROFESIONAL para las lecciones de Ajedrez Pro (repo /home/user/ajedrez)

App de ajedrez en **español latinoamericano** (tú/ustedes, nunca vosotros). Cada lección ya tiene 4 preguntas básicas de
triple elección (`data/quiz-*.js`). El alumno pide **mucha más exigencia: nivel profesional / gran maestro**. Tu trabajo:
añadir **4 preguntas avanzadas por lección**. No modifiques ningún archivo salvo el tuyo. No uses git.

## Qué hacer
1. Lee cada lección (archivos `data/lessons*.js`, busca su `id:`): `html`, `keyPoints`, posiciones, líneas y comentarios.
   Lee también sus 4 preguntas actuales (`data/quiz-*.js`) para NO repetirlas.
2. Escribe 4 preguntas **difíciles** por lección, del tipo que le harías a un jugador de 2200+:
   - excepciones y matices («¿cuándo NO funciona…?», «¿qué cambia si el peón está en la columna a?»),
   - elección de plan en una situación concreta y por qué,
   - cálculo/razonamiento sobre las posiciones de la lección (qué pasa tras una jugada, cuál es la defensa correcta),
   - conexiones con otros conceptos (estructura ↔ plan ↔ final), errores típicos de jugadores fuertes.
   Los distractores deben ser **muy plausibles** (lo que respondería un jugador de club).
3. Todo debe ser **correcto como ajedrez** y defendible con la lección o con teoría estándar indiscutible. Si dudas, no lo preguntes.

## Formato de tu archivo
```js
/* Preguntas teóricas avanzadas (nivel profesional) de las lecciones de <tema>. Redacción propia. */
(function () {
  const Q = {
    'id-leccion': [
      { q: '…', opts: ['…', '…', '…'], ok: 2, why: '2-3 frases que expliquen la respuesta y por qué las otras fallan.', lvl: 'pro' },
      ...
    ],
  };
  window.LESSON_QUIZ = window.LESSON_QUIZ || {};
  for (const k in Q) window.LESSON_QUIZ[k] = (window.LESSON_QUIZ[k] || []).concat(Q[k]);
})();
```
- `opts`: exactamente 3, distintas, de longitud parecida. `ok`: 0, 1 o 2, **repartido** entre las tres posiciones.
- `why`: explicación de calidad (2-3 frases). `lvl: 'pro'` en todas.
- Jugadas en SAN inglés dentro de `<span class="mv">Nf3</span>`. Solo etiquetas `<b>`, `<i>`, `<span class="mv">`.
- Redacción 100 % propia.

## Verificación
`node tools/validate-quiz.js` → 0 errores. Tus lecciones deben pasar a tener 8 preguntas.

## Entrega
Ruta del archivo, lecciones y preguntas añadidas, reparto de la correcta y salida del validador.
