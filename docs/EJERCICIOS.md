# Ejercicios, rutas de aprendizaje y XP — documentación

Archivos: `js/exercises.js` (ejercicios y exámenes), `js/v-routes.js` (rutas), `data/exercises.js` (generado),
`tools/build-exercises.js` (generador), `js/v-games.js` (XP y niveles).

## 1. Ejercicios de cada lección

Todas las lecciones tienen ejercicios. Se abren desde la lección (**🧩 Hacer los ejercicios**) o desde la ruta.
Ruta en la app: `#ejercicios-<idLección>`.

### 1.00 Nivel de exigencia (`S.settings.exigencia`)
Se elige en **Ajustes** o en **Rutas y XP** y cambia todas las sesiones, los repasos y los exámenes. Por defecto es
**Gran maestro**. Tabla `EXIG` de `js/exercises.js`:

| Nivel | Preguntas de teoría | Puzles por sesión (con/sin posiciones) | Rating de los puzles | Pistas | Estrellas ★★★ / ★★ | Examen |
|---|---|---|---|---|---|---|
| Normal | 4 básicas | 3 / 5 | tu rating ± ajuste por nivel | 0 puntos | 90 % / 70 % | 8 puzles, 75 % |
| Alta | 8 (básicas y profesionales) | 4 / 6 | tu rating + 250 | 0 puntos | 92 % / 80 % | 10 puzles, 80 % |
| Gran maestro | 8 (básicas y profesionales) | 6 / 8 | entre 2200 y 2750 (tu rating + 400 si es mayor), se prefieren puzles de 4+ jugadas | 0 puntos | 95 % / 85 % | 12 puzles, 80 % |

En *Aprender a jugar* el rating de los puzles tiene tope (850 normal, 1100 alta, 1400 gran maestro) porque el tema
es la regla, no el cálculo.

### 1.01 La app explica la lección mientras la haces
- **Al empezar**: una pantalla con el resumen de la lección y sus puntos clave, antes de la primera pregunta.
- **En la teoría**: tras cada respuesta, la explicación de por qué es correcta (o por qué no).
- **Entre teoría y práctica**: un repaso con las ideas que se van a practicar.
- **En la práctica**: el búho (la mascota) comenta **cada jugada** de las posiciones de la lección con el texto de la
  propia lección (campo `cm` de `data/exercises.js`), y en los puzles muestra al resolver la línea completa y sus
  motivos tácticos.

### 1.02 Ejercicios ilimitados
Al terminar una lección, el botón **∞ Ejercicios ilimitados** (también en «Todas las lecciones» y en la ficha de la
lección) abre una sesión sin fin de puzles del tema de esa lección, con la dificultad del nivel de exigencia elegido.
Un contador muestra los resueltos y el acierto; **■ Terminar** cierra la sesión y suma XP según el acierto.
Ruta: `#ejercicios-<id>~mas`.

Una sesión tiene dos partes: **Parte 1 · Teoría** (las preguntas) y **Parte 2 · Práctica** (el tablero). Entre ambas, una
pantalla muestra cuántas preguntas acertaste y permite releer la lección antes de practicar. En orden:

| Parte | Contenido | Cuántos |
|---|---|---|
| **Teoría** | Preguntas de triple elección sobre las ideas de la lección (`data/quiz-*.js`), con explicación tras responder. Las opciones se mezclan cada vez. Hay 8 por lección (4 básicas y 4 profesionales; 1.064 en total). | 4 (normal) u 8 (alta y gran maestro) |
| **Ejercicios nuevos** | Posiciones que **no salen en la lección** (`drills`, marcadas `d:1` en `data/exercises.js`), escritas para practicar la idea y verificadas con Stockfish: juegas un bando y el rival responde con su mejor defensa. Las posiciones de la lección solo se usan en *Partidas magistrales* («¿qué jugó el maestro?») o si una lección no tiene ejercicios propios. | Los de `data/exercises.js` |
| **Puzles del tema** | Puzles de `data/puzzles.js` con los temas de la lección. | 3 si hay 3+ posiciones; si no, 5 |
| **Práctica contra el motor** | La posición de práctica de la lección (si la tiene), como remate opcional. | 0 o 1 |

### 1.0 Preguntas de teoría (`data/quiz-*.js`)
`window.LESSON_QUIZ = { idLección: [{ q, opts: [3 opciones], ok: 0|1|2, why, lvl? }] }`.
Hay dos niveles: las **básicas** (`data/quiz-<sección>.js`) y las **profesionales** (`lvl: 'pro'`,
`data/quiz-pro-<sección>.js`), que piden cálculo concreto, excepciones y matices de nivel maestro. En exigencia normal
solo salen las básicas; en alta y gran maestro salen las 8 (las profesionales llevan la etiqueta «NIVEL PROFESIONAL»). Los archivos se combinan
(cada archivo añade preguntas a las de la misma lección, no las reemplaza), así que el orden de carga no importa. Se validan con
`node tools/validate-quiz.js`: al menos 3 preguntas por lección, exactamente 3 opciones distintas, índice de la correcta
válido, explicación presente, solo etiquetas `<b>`, `<i>` y `<span class="mv">`, y español latinoamericano. Puntúan
1 si se aciertan a la primera y 0 si no.

### 1.1 Cómo se generan las posiciones (`tools/build-exercises.js`)

```
node tools/build-exercises.js [profundidad=11] [procesos=4]
```

- Recorre todas las lecciones (`data/lessons*.js`) y analiza cada jugada con Stockfish (`js/sf19.js`).
- **Lecciones con línea**: se pregunta el bando que mueve; solo las jugadas **buenas** (pierden ≤ 4 puntos de
  probabilidad de ganar frente a la mejor del motor). Las jugadas que la lección muestra como error se juegan solas.
  Si ninguna jugada de ese bando es buena, se prueba con el otro (por ejemplo, la captura al paso: la clave es `exd6`).
- **Partidas magistrales**: se preguntan hasta 6 jugadas comentadas («¿qué jugó el blanco?»).
- **Posiciones sin línea**: se pregunta la mejor jugada solo si es claramente la mejor (mate, o 12+ puntos más que la
  segunda opción del motor) y la posición no está perdida.
- Hay que volver a ejecutarlo cada vez que se añaden o cambian lecciones (tarda unos segundos).

Resultado actual: **las 133 lecciones tienen ejercicios de posición**: 359 ejercicios con 875 jugadas a encontrar.
Las lecciones cuyas posiciones son solo ilustrativas (estructuras, mates básicos) tienen además ejercicios propios
(`drills`) en `data/lessons-drills-estrategia.js` y `data/lessons-drills-finales.js`, escritos para practicar la idea de
la lección y verificados con Stockfish a profundidad 16 (cada jugada del alumno es la mejor o pierde ≤ 4 puntos).

### 1.1b Ejercicios propios (`drills`)
Una lección puede tener `drills: [{ fen, caption, line, comments }]`: posiciones pensadas solo como ejercicio. El
generador las trata igual que las posiciones de la lección y el validador las comprueba (deben tener `line`).

### 1.2 Cómo se corrige una jugada (`QuizRunner`)

- Correcta si coincide con la de la línea o da jaque mate.
- **Alternativa igual de buena** (todas las secciones salvo *Aprender a jugar* y *Partidas magistrales*): Stockfish
  (profundidad 10) compara tu jugada con la de la lección; si pierde ≤ 3 puntos, se acepta sin penalizar, se muestra la
  de la lección y se continúa con ella.
- En *Aprender a jugar* y *Partidas magistrales* solo vale la jugada exacta: el ejercicio trata de la regla o de lo que
  se jugó, no de la evaluación.
- **Pista**: ilumina la pieza que hay que mover. **Solución**: dibuja la flecha.

### 1.2b Pistas y puntos (todas las exigencias)
| Cómo lo resuelves | Puntos del ejercicio (y XP) | Rating de puzles |
|---|---|---|
| Sin errores ni ayudas | 1 | sube |
| Con algún error, sin pista | 0,5 | baja (contó como fallo) |
| Con pista y sin fallar | 0: no da XP | no cambia |
| Con pista y fallando alguna jugada | 0 | baja |
| Viendo la solución | 0 | baja |

En **Puzles** pasa lo mismo: con pista el puzle ya no sube el rating ni da XP; si además fallas una jugada, cuenta
como error y baja. Un puzle resuelto con pista queda en «Repasar errores».

### 1.3 Puzles del tema

- Temas: tabla `RULES` de `js/exercises.js` (por id de lección; p. ej. `horquilla` → `horquilla`, finales de torres →
  `finalTorres`). Si ninguna regla coincide, se usan los temas por defecto de su área (`AREA_DEF`).
- Dificultad: tu rating de puzles + ajuste por nivel (principiante −100, intermedio +50, avanzado +200);
  en *Aprender a jugar* como mucho 850. Se prefieren los no resueltos. Cuentan para tu rating y tus estadísticas.

### 1.3b Practicar más (tandas de 10; el modo ilimitado de 1.02 es la versión sin fin)
Al terminar la sesión (o desde la lección) el botón **🧩 Practicar más** abre tandas de **10 puzles del tema**, sin
límite, primero los no resueltos (`#ejercicios-<id>~mas`). Cada lección tiene al menos 25 puzles de su tema (mediana
844; por ejemplo, Lucena 542 de finales de torres). Cada tanda da XP según el acierto (2 por cada 10 %).

### 1.3c Repetir por partes
Al terminar una sesión (y en la ficha de la lección ya completada) se puede **repetir todo**, **solo la teoría**
(`#ejercicios-<id>~teoria`) o **solo la práctica** (`#ejercicios-<id>~practica`, con puzles nuevos). Los repasos dan
XP según el acierto (2 por cada 10 %) y no cambian la nota guardada de la lección. En la pantalla entre teoría y
práctica también se puede repetir la teoría.

### 1.4 Puntuación, estrellas y finalización

- Por ejercicio: **1** sin errores ni ayudas, **0,5** con algún error o pista, **0** si se ve la solución.
- Estrellas: ≥ 90 % ★★★, ≥ 70 % ★★, si no ★.
- Al terminar la sesión la lección queda **completada** (se guarda en `S.lessons`). El resultado se guarda en
  `S.lessonEx[id] = { best, stars, xp, t }`; al repetir se conserva el mejor.

## 1.5 Clase paso a paso y examen de cada apertura
Antes de la práctica, cada lección y cada apertura tiene su **clase guiada** y cada apertura su **examen** (teoría
generada de sus datos + jugar las líneas de memoria). Ver [`docs/CLASES.md`](CLASES.md).

## 2. Exámenes de nivel

Al final de cada nivel (principiante, intermedio, avanzado) de cada ruta hay un examen: **8 puzles** con los temas de las
lecciones de ese nivel. Se aprueba con **75 %**. Se guarda en `S.exams['<sección>~<nivel>'] = { best, stars, t }`.
Ruta en la app: `#examen-<sección>~<nivel>`.

## 3. Rutas de aprendizaje (`js/v-routes.js`)

Hay una ruta por sección: Aprender a jugar, Principios de apertura, Aperturas, Táctica, Estrategia y medio juego,
Ataque, Finales y Partidas magistrales. Se ven en cada sección (pestañas **Ruta / Lista**) y todas juntas en
**Rutas y XP** (`#rutas`).

- Orden: lecciones por nivel (principiante → intermedio → avanzado) y, dentro de cada nivel, en el orden de los datos.
- Cada nivel termina con su examen (salvo *Partidas magistrales*).
- Nodo verde ✓: completado (con sus estrellas). Nodo azul ▶: el siguiente recomendado. No hay bloqueos: puedes abrir
  cualquier lección.
- **Aperturas**: un nodo por apertura, ordenadas por nivel. Se supera al llegar a la caja 2 en «Entrenar»
  (★ caja 2, ★★ cajas 3-4, ★★★ caja 5).

## 4. XP y niveles (`js/v-games.js`)

- Nivel: el 1.º pide 100 XP y cada nivel pide un 18 % más que el anterior.
- El nivel y la barra de XP se ven en la barra lateral; cada ganancia muestra un aviso «+N XP».

| Acción | XP |
|---|---|
| Completar los ejercicios de una lección (primera vez) | 40 + 20 + hasta 30 según el acierto |
| Repetir y mejorar las estrellas de una lección | 20 por estrella nueva |
| Aprobar un examen de nivel | 100 (30 por estrella nueva al repetir); suspender da 10 |
| Partida contra el motor | 30 si ganas, 10 si no |
| Contrarreloj | 3 por puzle |
| Batalla | 40 si ganas, 10 si no |
| Ruta de temas (estrella) | 25 |
| Apertura entrenada | 15 |
| Duelo | 15 |
| Visión | 5 |
| Misiones diarias y logros | lo que indique cada una |

## 5. Sincronización

`S.lessonEx` y `S.exams` se combinan entre dispositivos quedándose con el mejor resultado y las estrellas más altas
(`js/cloud.js`). `S.xp` se combina con el máximo.
