# Puzles: origen, rating y puntuación — documentación

Archivos: `data/puzzles.js` (generado), `tools/build-puzzles.js` (generador), `js/v-train.js` (Puzles),
`js/app.js` (`ratePuzzle`).

## 1. De dónde salen los puzles
Desde la versión 2.1.1 los puzles vienen de la **base de datos pública de Lichess** (licencia CC0,
https://database.lichess.org/#puzles). Su rating es **real**: lo calculó Lichess con millones de intentos de jugadores,
así que un puzle de 1500 es tan difícil como uno de 1500 en Lichess. (Antes los ratings se estimaban por la
búsqueda que necesitaba el motor y salían inflados: había 40 mates en 1 por encima de 2000.)

- Total: **10.346 puzles**, de ~400 a ~2900: 10.037 de Lichess y 309 patrones clásicos.
- Solo puzles fiables: desviación del rating ≤ 80, popularidad ≥ 85 % y ≥ 300 intentos (desde 2200, que hay pocos:
  desviación ≤ 100, popularidad ≥ 80 % y ≥ 100 intentos).
- Selección por **tema y tramo de 100 puntos**: hasta 12 por tema y tramo (24 en los temas generales, el triple
  desde 2200), más una muestra general, para que haya de todos los temas y niveles (incluido el modo gran maestro).
- Cada puzle se comprueba con `js/chess.js` (todas las jugadas legales).
- **Patrones clásicos** que Lichess no etiqueta (mate del pasillo/epaulette, Greco, Ópera, Morphy, Lolli, Damiano,
  Legal, molino, sobrecarga y ahogado): se conservan de la colección anterior y su rating se **recalibra** al rating
  de Lichess del mismo percentil entre los puzles con el mismo número de jugadas (`oldRating` guarda el anterior).

### 1.1 Formato
`{ id, fen, moves:[uci…], rating, themes:[…], goal, source:'lichess'|'clasico' }`. El FEN es la posición en la que
juegas; `moves[0]` es tu primera jugada y después alternan con las del rival. En el CSV de Lichess el FEN es anterior
a la jugada del rival, así que el generador aplica esa jugada. Los ids de Lichess llevan el prefijo `L`.

### 1.2 Temas
Los temas de Lichess se traducen a los de la app (tabla `MAP` del generador): fork → horquilla, pin → clavada,
skewer → enfilada, discoveredAttack → ataqueDescubierto, deflection → desviación, attraction → atracción,
capturingDefender → eliminar defensor, backRankMate → mate del pasillo, smotheredMate → mate ahogado,
rookEndgame → final de torres, etc. Así siguen funcionando las lecciones, la Ruta, la Contrarreloj por tema y las
misiones.

### 1.3 Regenerar
```
node tools/build-puzzles.js lichess_db_puzzle.csv 12
```
El CSV descomprimido de Lichess (o cualquier copia con sus columnas). El segundo número es cuántos puzles se toman
por tema y tramo.

## 2. Rating y XP en Puzles
| Cómo lo resuelves | Rating | XP |
|---|---|---|
| Sin errores ni ayudas | sube (Elo con K 40/24/16) | 8 + rating/200 |
| Con **pista** y sin fallar | **no cambia** | **0** |
| Con pista y fallando alguna jugada | baja | 0 |
| Fallando sin pista | baja | 0 |
| Viendo la solución | baja | 0 |

Un puzle con pista, fallado o con la solución vista queda en **Repasar errores**. Las mismas reglas se aplican en los
ejercicios de las lecciones (ver `docs/EJERCICIOS.md`, apartado 1.2b).

## 3. Partidas antiguas
Los puzles anteriores que no se conservaron dejan de aparecer: su historial se mantiene en el rating, pero ya no se
muestran en «Repasar errores» ni en los conjuntos de Woodpecker (que saltan los que falten).
