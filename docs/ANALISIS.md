# Análisis de partidas y tendencias — documentación

Este documento explica cómo funcionan la **revisión de partida** (`js/review.js`), el **análisis de tendencias**
(`js/insights.js`) y la vista **Mi análisis** (`js/v-insights.js`): qué se calcula, con qué reglas y qué se guarda.

## 1. Flujo general

1. Juegas una partida en **Jugar** (o importas partidas en **Mi análisis** o en **Análisis → Cargar**).
2. Stockfish evalúa todas las posiciones de la partida, en tu dispositivo.
3. `GameReport.build()` clasifica cada jugada, explica los fallos y genera el informe de esa partida.
4. Se guarda un **resumen** de la revisión dentro de la partida (`game.rev`).
5. `Insights.stats()` reúne los resúmenes de todas las partidas y `Insights.diagnose()` saca conclusiones.
6. **Mi análisis** muestra las tendencias y un plan de mejora con una lección y un ejercicio por cada punto débil.

Nada sale de tu dispositivo, salvo tu progreso si has iniciado sesión (se sincroniza con tu cuenta) y las peticiones
a chess.com o Lichess cuando tú pulsas importar.

## 2. Revisión de una partida (`js/review.js`)

### 2.1 Evaluación
- Cada posición se analiza con Stockfish con 2 líneas (`multipv: 2`).
  Profundidad **14** en la revisión manual y **12** en el análisis en segundo plano.
- La evaluación se convierte en **probabilidad de ganar** (0–100 %) con `EvalUtil.winPct` (`js/engine.js`).
- La **pérdida** de una jugada es la probabilidad de ganar antes de mover menos la de después, desde el bando que mueve.

### 2.2 Clasificación de cada jugada
| Símbolo | Tipo | Regla |
|---|---|---|
| 📖 | Teoría | La jugada sigue una línea de `data/openings.js`. |
| !! | Brillante | Es la mejor (o pierde < 0,6), sacrifica una pieza (queda atacada y vale al menos 2 puntos más que lo capturado) y tras ella sigues con ≥ 45 %; no cuenta si ya ganabas con ≥ 97 %. |
| ! | Genial | Es la mejor y la segunda opción del motor es ≥ 18 puntos peor (era la única buena); no cuenta con ≥ 95 %. |
| ★ | Mejor | Coincide con la primera línea del motor o pierde < 0,6. |
| 👍 | Excelente | Pierde < 2. |
| ✓ | Buena | Pierde < 5. |
| ?! | Imprecisión | Pierde < 10. |
| ? | Error | Pierde < 20. |
| ✕ | Oportunidad perdida | Pierde ≥ 10 con ventaja clara (≥ 65 %) justo después de un error del rival (o con mate disponible) y sin quedar perdido (≥ 30 % después). |
| ?? | Error grave | Pierde ≥ 20. |

Los símbolos y colores son de diseño propio (`BADGES` en `js/board.js`).

### 2.3 Explicación de cada fallo
`explain()` busca, por este orden, el motivo concreto:
- **Permite mate en N** (la evaluación posterior es mate para el rival).
- **Había mate en N y se escapó.**
- **Deja una pieza sin defensa suficiente**: la mejor respuesta del rival captura una pieza de valor ≥ 3.
- **Permite ganar un peón.**
- **Se podía ganar material** con la mejor jugada.
- Si no hay motivo táctico: «desperdicia una posición ganadora», «pasa de igualada a perdida» o «había una continuación más precisa».

Además muestra la mejor jugada, su línea y la respuesta del rival. Los botones **Ver la mejor**, **Reintentar** y
**Siguiente error** están en `js/v-play.js`. En «Reintentar», tu jugada se acepta si es la del motor o pierde < 3.

### 2.4 Fases, precisión y rendimiento
- **Fases**: apertura = jugadas de teoría o las 10 primeras de cada bando; final = desde que quedan 6 piezas o
  menos (sin contar reyes ni peones); el resto es medio juego.
- **Precisión**: media de la precisión de tus jugadas (`EvalUtil.moveAccuracy`, fórmula pública de Lichess).
- **Nota por fase**: ≥ 90 ★, ≥ 80 👍, ≥ 70 ✓, ≥ 60 ?!, ≥ 50 ?, menos ??.
- **Rendimiento estimado**: conversión orientativa de la precisión (tabla `ELO_PTS`: 50 → 600, 70 → 1150, 80 → 1550,
  90 → 2100, 95 → 2500…). No es un Elo oficial ni tiene en cuenta la fuerza del rival.

### 2.5 Secciones del informe
| Sección | Qué comprueba |
|---|---|
| Apertura | Nombre de la apertura, hasta dónde seguiste la teoría, enroque (antes o después de la jugada 10), dama antes de la jugada 6, misma pieza menor movida varias veces, piezas menores sin desarrollar en la jugada 10, peones en el centro, precisión de la fase. |
| Estrategia usada | Enroques al mismo lado u opuestos, pareja de alfiles, peón aislado en d, peones doblados, peones pasados, torres en columnas abiertas, simplificación con ventaja. |
| Táctica | Mates dados, jugadas brillantes o geniales, piezas sin defender, material no ganado, mates escapados y mates permitidos. |
| Finales | Precisión del final (si hubo al menos 4 jugadas tuyas) y actividad del rey. |
| Gestión de la ventaja | Posición ganadora (≥ 85 %) no convertida o convertida, posición perdida (≤ 15 %) salvada, momento decisivo. |

Cada observación es un acierto, una corrección o un dato, y las correcciones añaden una lección recomendada.

## 3. Datos guardados por partida

`S.games[]` (máximo 200 partidas, las más recientes). Campos:

```js
{ pgn, res: 'win'|'loss'|'draw', why, me: 'w'|'b', lvl, d /* fecha en ms: identifica la partida */, fen /* si no empezó desde el inicio */,
  // solo en partidas importadas:
  src: 'import', site, tc: 'bala'|'blitz'|'rápidas'|'clásicas', opp, oppElo, myElo, opening,
  rev: {                      // resumen de la revisión
    v: 2,                     // versión del formato; las de versión menor se vuelven a analizar
    me, res, opening, plies,  // color, resultado, apertura y medias jugadas
    acc, elo,                 // precisión y rendimiento estimado
    ph: { o, m, e },          // precisión por fase (null si no hubo)
    cnt: { brilliant, great, best, excellent, good, book, inaccuracy, mistake, miss, blunder },
    castle,                   // jugada en la que enrocaste (null si no)
    peak, low,                // máxima y mínima probabilidad de ganar que tuviste
    mates,                    // mates que diste
    motifs: { hung, missWin, missMate, allowMate, miss },
    errs: [{ m /* nº de jugada */, ph /* fase */, c /* tipo */, t /* motivos */, p /* pieza */, l /* pérdida */ }],
    issues: [...]             // claves de las lecciones recomendadas
  } }
```

Las partidas de menos de 6 medias jugadas se marcan con `rev.skip` y no cuentan en las estadísticas.
Al sincronizar entre dispositivos (`js/cloud.js`), si solo una copia de la partida tiene `rev`, se conserva esa.

## 4. Tendencias (`js/insights.js`)

`Insights.stats()` usa las partidas con `rev.v >= 2`, ordenadas por fecha:

| Dato | Cálculo |
|---|---|
| Precisión (últ. 10) y tendencia | Media de las 10 últimas frente a las 10 anteriores. |
| Errores graves por partida | Errores graves + ½ por cada error. |
| Por fase | Precisión media de cada fase y número de errores serios en ella. |
| Cuándo fallas | Errores serios (error, error grave, oportunidad perdida) por tramo de jugadas: 1-10, 11-20, 21-30, 31-40, 41+. |
| Tipos de error | Media por partida de cada motivo y su tendencia. |
| Piezas | Qué pieza dejas más veces sin defensa. |
| Aperturas | Partidas, % de puntos, precisión y errores graves por apertura (agrupa las variantes). |
| Por color y por ritmo | Partidas, % de puntos y precisión. |
| Gestión de la ventaja | Posiciones ganadoras (pico ≥ 85 %) convertidas y posiciones perdidas (mínimo ≤ 15 %) salvadas. |
| Informe de la semana | Últimos 7 días frente a los 7 anteriores, y tu mejor partida. |

### 4.1 Diagnóstico
`Insights.diagnose()` necesita al menos 3 partidas. Cada regla que se cumple genera una conclusión con un **peso**;
se ordenan de mayor a menor:

| Regla | Se activa cuando | Peso |
|---|---|---|
| Fase más débil | La mejor y la peor fase difieren ≥ 6 puntos | la diferencia |
| Tramo de jugadas | Un tramo concentra ≥ 35 % de los errores serios (con al menos 4) | % ÷ 3 |
| Tipo de error | Un motivo aparece ≥ 0,3 veces por partida (los 2 más frecuentes) | media × 20 |
| Pieza | Una misma pieza quedó sin defensa ≥ 3 veces | veces × 2 |
| Conversión | Conviertes < 70 % de las posiciones ganadoras (con al menos 3) | (70 − %) ÷ 3 |
| Color | ≥ 5 puntos de diferencia de precisión entre colores (3+ partidas con cada uno) | la diferencia |
| Apertura | Una apertura con 3+ partidas da < 40 % de los puntos | (40 − %) ÷ 4 |
| Enroque | Enrocas tarde o no enrocas en ≥ 40 % de las partidas largas | fracción × 10 |
| Evolución | La precisión sube o baja ≥ 2 puntos frente a las 10 anteriores | 1 (sube) o 4 (baja) |

### 4.2 Plan de mejora: aprender y practicar
Las 3 conclusiones de más peso forman el plan. Cada una tiene una **lección** y un **ejercicio** (tema de puzles):

| Problema | Lección | Ejercicio (tema de puzles) |
|---|---|---|
| Piezas sin defender | `t2-sueltas` | `piezaColgada` |
| Material no ganado | `t2-ccj` | `ventajaMaterial` |
| Mates escapados | `t-mates1` | `mateIn2` |
| Mates permitidos | `a-defensa` | `defensa` |
| Errores del rival sin aprovechar / errores en el medio juego | `t2-calculo` | `largo` |
| Apertura débil | sección Principios | `apertura` |
| Medio juego débil | sección Medio juego | `medioJuego` |
| Final débil o ventaja no convertida | sección Finales / `m2-transformar` | `final` |
| Enroque tardío | `ap-enroque` | `enroque` |

El plan muestra si ya completaste la lección y cuántos puzles llevas de ese tema con tu porcentaje de acierto.
Se recalcula con cada partida: cuando un fallo deja de repetirse, pierde peso y entra el siguiente.

## 5. Recogida de partidas

- **Partidas jugadas en la app**: se guardan al terminar. Al abrir **Mi análisis**, las que no tienen revisión se
  analizan solas, una a una (se puede pausar). Si sales de la vista, el análisis se detiene y continúa al volver.
- **Importar de chess.com**: API pública `api.chess.com/pub/player/<usuario>/games/archives` (últimas 40 partidas de ajedrez estándar).
- **Importar de Lichess**: `lichess.org/api/games/user/<usuario>?max=40`.
- **Archivo PGN**: se usan las partidas en las que tu usuario aparece como blancas o negras.

En las partidas importadas se deduce tu color por el nombre de usuario, el resultado por la etiqueta `Result` y el
ritmo por `TimeControl` (tiempo base + 40 × incremento: < 3 min bala, < 10 blitz, < 30 rápidas, resto clásicas).

## 6. Límites conocidos

- El análisis usa el procesador de tu dispositivo: una partida de 40 jugadas tarda del orden de un minuto.
- Con pocas partidas las tendencias son poco fiables; el diagnóstico pide un mínimo de 3 y cada regla sus propios mínimos.
- Las observaciones de estrategia se basan en reglas sobre la estructura (peones, alfiles, columnas), no en una
  comprensión completa del plan de la partida.
- Solo se conservan las 200 partidas más recientes.
- El rendimiento estimado es orientativo.

## 7. Mantenimiento

- Si cambian las reglas de clasificación o el formato de `rev`, sube `v` en `R.summary` (`js/review.js`) y el mínimo
  en `needs()` y `stats()` (`js/insights.js`): las partidas se volverán a analizar solas.
- Lecciones nuevas: añádelas a un archivo `data/lessons-*.js` y valida con
  `node tools/validate-lessons.js data/lessons*.js`.
- Actualidad: edita `data/actualidad.js` (campo `updated` y los bloques) y sube `VERSION` en `sw.js` y `APP_VERSION` en `js/cloud.js`.
