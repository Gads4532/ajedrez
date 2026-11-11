# Ejercicios, rutas de aprendizaje y XP — documentación

Archivos: `js/exercises.js` (ejercicios y exámenes), `js/v-routes.js` (rutas), `data/exercises.js` (generado),
`tools/build-exercises.js` (generador), `js/v-games.js` (XP y niveles).

## 1. Ejercicios de cada lección

Todas las lecciones tienen ejercicios. Se abren desde la lección (**🧩 Hacer los ejercicios**) o desde la ruta.
Ruta en la app: `#ejercicios-<idLección>`.

Una sesión tiene, en este orden:

| Parte | Contenido | Cuántos |
|---|---|---|
| **Posiciones de la lección** | Las posiciones de la propia lección: juegas un bando y el rival responde siguiendo la línea. | Las que haya en `data/exercises.js` |
| **Puzles del tema** | Puzles de `data/puzzles.js` con los temas de la lección. | 3 si hay 3+ posiciones; si no, 5 |
| **Práctica contra el motor** | La posición de práctica de la lección (si la tiene), como remate opcional. | 0 o 1 |

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

Resultado actual: 133 lecciones, 304 ejercicios de posición, 727 jugadas a encontrar. 22 lecciones (las de posiciones
ilustrativas sin una jugada única, como estructuras de peones o mates básicos) no tienen ejercicio de posición: tienen
5 puzles del tema y, si existe, su práctica contra el motor.

### 1.2 Cómo se corrige una jugada (`QuizRunner`)

- Correcta si coincide con la de la línea o da jaque mate.
- **Alternativa igual de buena** (todas las secciones salvo *Aprender a jugar* y *Partidas magistrales*): Stockfish
  (profundidad 10) compara tu jugada con la de la lección; si pierde ≤ 3 puntos, se acepta sin penalizar, se muestra la
  de la lección y se continúa con ella.
- En *Aprender a jugar* y *Partidas magistrales* solo vale la jugada exacta: el ejercicio trata de la regla o de lo que
  se jugó, no de la evaluación.
- **Pista**: ilumina la pieza que hay que mover. **Solución**: dibuja la flecha.

### 1.3 Puzles del tema

- Temas: tabla `RULES` de `js/exercises.js` (por id de lección; p. ej. `horquilla` → `horquilla`, finales de torres →
  `finalTorres`). Si ninguna regla coincide, se usan los temas por defecto de su área (`AREA_DEF`).
- Dificultad: tu rating de puzles + ajuste por nivel (principiante −100, intermedio +50, avanzado +200);
  en *Aprender a jugar* como mucho 850. Se prefieren los no resueltos. Cuentan para tu rating y tus estadísticas.

### 1.4 Puntuación, estrellas y finalización

- Por ejercicio: **1** sin errores ni ayudas, **0,5** con algún error o pista, **0** si se ve la solución.
- Estrellas: ≥ 90 % ★★★, ≥ 70 % ★★, si no ★.
- Al terminar la sesión la lección queda **completada** (se guarda en `S.lessons`). El resultado se guarda en
  `S.lessonEx[id] = { best, stars, xp, t }`; al repetir se conserva el mejor.

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
