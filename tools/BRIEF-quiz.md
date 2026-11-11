# Encargo: preguntas teóricas de opción múltiple para las lecciones de Ajedrez Pro (repo /home/user/ajedrez)

App de ajedrez en **español latinoamericano** (tú/ustedes, nunca vosotros; computadora, celular). Cada lección tendrá una
**parte teórica**: preguntas de **triple elección** (3 opciones, 1 correcta) que el alumno responde antes de los
ejercicios con tablero. No modifiques ningún archivo salvo el tuyo. No uses git.

## Qué hacer
1. Lee cada lección que te toca (los archivos `data/lessons*.js`; busca su `id:`): `title`, `summary`, `html`,
   `keyPoints`, `pros`, `cons`, captions y comments de sus posiciones.
2. Escribe **4 preguntas por lección** que comprueben si se entendieron las ideas de ESA lección (conceptos, reglas,
   planes, cuándo aplicar la idea, errores típicos). Nada de preguntas triviales («¿cómo se llama esta lección?»).
3. Las preguntas deben poder responderse **leyendo la lección** (no exijas datos que la lección no da) y deben ser
   **correctas como ajedrez** (si dudas de un dato, no lo preguntes).

## Formato de tu archivo
```js
/* Preguntas teóricas (triple elección) de las lecciones de <tema>. Redacción propia. */
window.LESSON_QUIZ = Object.assign(window.LESSON_QUIZ || {}, {
  'id-leccion': [
    { q: '¿Pregunta clara y concreta?', opts: ['Opción A', 'Opción B', 'Opción C'], ok: 1, why: 'Por qué la correcta es correcta (y, si ayuda, por qué las otras no).' },
    ...
  ],
  ...
});
```
- `opts`: exactamente 3, distintas, de longitud parecida, todas plausibles (los distractores deben ser errores
  típicos o ideas parecidas, no tonterías). Evita «todas las anteriores» / «ninguna».
- `ok`: índice de la correcta (0, 1 o 2). **Reparte la posición de la correcta** de forma equilibrada entre 0, 1 y 2.
- `why`: 1-2 frases que expliquen la respuesta (se muestra después de responder).
- Jugadas dentro del texto en SAN inglés dentro de `<span class="mv">Nf3</span>` (la app lo traduce a C, A, T, D, R).
  Solo se permiten las etiquetas `<b>`, `<i>` y `<span class="mv">`.
- Redacción 100 % propia (no copies textos de libros ni webs).

## Verificación
`node tools/validate-quiz.js` debe terminar con 0 errores para tus lecciones (las de los demás agentes pueden faltar
mientras trabajan: ignora solo los errores «solo 0 preguntas» de lecciones que no son tuyas).

## Entrega
Ruta del archivo, número de lecciones y preguntas, reparto de la posición de la correcta y salida del validador.
