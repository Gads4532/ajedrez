# Clases paso a paso y exámenes de aperturas — documentación

Archivos: `js/v-guide.js` (clases), `js/exercises.js` (examen de aperturas, `VIEWS.apexamen`).

## 1. Clase paso a paso

Cada lección (133) y cada apertura (38) se puede ver como una **clase guiada**: el tablero muestra la posición o la
jugada y el panel explica la teoría de ese paso. Se avanza con **Siguiente ▶** (o la flecha → del teclado), se
retrocede con **◀ Anterior** (o ←), **▶ Auto** la reproduce sola (las jugadas cada ~2 s y la teoría según la
longitud del texto) y el selector salta a cualquier apartado.

- Rutas: `#clase-<idLección>` y `#claseap-<idApertura>`.
- Dónde se abre: botón verde **▶ Clase paso a paso** al principio de cada lección; botones **▶ Clase paso a paso** y
  **📝 Examen** en la cabecera de cada apertura; botón **▶ Clase** en cada fila de **Todas las lecciones**.
- En el teléfono el tablero queda fijo arriba y los botones abajo, para leer la explicación sin perder la posición.

### 1.1 Pasos de una lección (`lessonClass`)
1. **Portada**: resumen y qué incluye la clase.
2. Para cada apartado de la teoría (cada `<h4>` del HTML de la lección) un paso de **teoría**, intercalado con las
   **posiciones** de la lección: primero el enunciado de la posición (con sus flechas y casillas marcadas) y después
   **cada jugada** de su línea con: número y jugada en notación española, la descripción con la pieza y sus casillas
   («Caballo de g1 a f3»), las etiquetas de propósito (Desarrollo, Centro, Clavada…), el comentario de la lección y
   la explicación de la etiqueta.
3. Hasta 2 **ejemplos prácticos** (`drills`) si la lección los tiene.
4. **Puntos clave** (y pros y contras si los hay).
5. **Final**: botones a la práctica (`#ejercicios-<id>`), a los ejercicios ilimitados, a la lección completa y al
   examen del nivel de su ruta.

### 1.2 Pasos de una apertura (`openingClass`)
1. **Portada**: estilo, resumen, bando, riesgo y carga teórica.
2. **El objetivo**: fin de la apertura, para quién es y piezas clave.
3. **Línea principal**, jugada a jugada con el comentario de cada jugada.
4. **Ideas**: estructura de peones, ideas clave, planes de cada bando, medio juego y finales típicos (sobre la
   posición final de la línea).
5. **Variantes**: dónde se separan de la línea principal (las jugadas comunes no se repiten), su nota y sus jugadas.
6. **Trampas**: la secuencia jugada a jugada y al final su explicación.
7. **Ventajas e inconvenientes** y jugadores de referencia.
8. **Final**: examen de la apertura y modo Aprender/Entrenar.

### 1.3 Progreso
`S.clases[clave] = { max, n, done }` (clave = id de la lección o `ap:<idApertura>`): el paso más avanzado visto, el
total de pasos y la fecha en que se terminó. Si una clase quedó a medias, al abrirla continúa donde se dejó. En la
lección, el botón indica «Continuar (paso N de M)» o «✓ Vista». Se sincroniza quedándose con el máximo
(`js/cloud.js`).

## 2. Examen de una apertura (`#apexamen-<id>`)

Igual que los ejercicios de las lecciones: primero **teoría** y después **práctica**, con estrellas y XP.

### 2.1 Teoría: preguntas generadas de los datos de la apertura (`openingQuiz`)
Se generan al momento a partir de `data/openings.js`, así que siempre coinciden con lo que enseña la clase:

| Pregunta | Respuesta correcta | Opciones incorrectas |
|---|---|---|
| ¿Qué jugada sigue en la línea principal tras …? (3, en puntos distintos de la línea) | La jugada de la línea | Jugadas legales de esa posición que no son teoría ni de la línea ni de sus variantes |
| ¿Cómo se llama esta línea? | El nombre de la variante | Nombres de otras variantes |
| ¿Cuál es el objetivo de la apertura? | Su objetivo | Objetivos de otras aperturas del mismo bando y de otra familia |
| ¿Cuál es una ventaja? / ¿un inconveniente? | Una ventaja / un inconveniente | Inconvenientes / ventajas de la misma apertura |
| ¿Cuál es un plan típico de tu bando? | Un plan de tu bando | Planes del bando rival |
| En la trampa «…», ¿qué ocurre? | Su explicación | Explicaciones de trampas de otras aperturas |

Las 38 aperturas generan entre 8 y 9 preguntas. Cuántas salen depende de la exigencia: 5 (normal), 7 (alta) o 9
(gran maestro).

### 2.2 Práctica: jugar las líneas de memoria
Juegas el bando de la apertura y la app responde con las jugadas del rival. Solo vale la jugada de la teoría (modo
estricto). Líneas: la principal (normal), + 1 variante (alta) o + 3 variantes (gran maestro). En la línea principal
el búho comenta cada jugada.

### 2.3 Resultado
Se aprueba con el porcentaje del examen de la exigencia (75 % normal, 80 % alta y gran maestro). Se guarda en
`S.exams['ap~<id>'] = { best, stars, t }`. XP: 60 la primera vez que se aprueba, 20 por cada estrella nueva al
repetir y 10 si no se aprueba. Aprobar el examen marca la apertura como completada en **Todas las lecciones**.
