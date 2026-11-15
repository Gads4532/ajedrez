# Coordenadas a ciegas — documentación

Archivo: `js/v-coords.js`. Ruta: `#coordenadas` (menú **Jugar → Coordenadas a ciegas**).

Partida completa contra Stockfish **sin ver las piezas**: escribes (o dictas) tus jugadas y la app anuncia la del
rival con la pieza y sus casillas («Caballo de b8 a c6»), en grande sobre un tablero oculto y, si se activa, en voz
alta. Entrena la visualización y el dominio de las coordenadas.

## 1. Opciones
- **Qué ves**: *A ciegas total* (solo la última jugada), *Solo la lista* (lista de jugadas sin tablero), *Tablero
  vacío* (casillas con todas las coordenadas, sin piezas) o *Tablero visible* (para empezar).
- **Nivel del motor**: 1 a 10, los mismos niveles que en Jugar (≈400 Elo a fuerza máxima).
- **Color**: blancas, negras o aleatorio.
- **Leer en voz alta** las jugadas del rival (síntesis de voz del navegador, español latinoamericano).

## 2. Cómo se escriben las jugadas
| Forma | Ejemplos |
|---|---|
| Coordenadas de origen y destino | `e2e4`, `e2-e4`, `g1f3`, `Cg1f3`; coronación `e7e8d` (d/t/a/c o q/r/b/n) |
| Notación algebraica en español | `e4`, `Cf3`, `Axc6`, `exd5`, `Dh5+`, `e8=D` |
| Notación algebraica en inglés | `Nf3`, `Bxc6`, `Qh5` |
| Enroques | `O-O`, `0-0`, `O-O-O`, `0-0-0` |
| Por voz (si el navegador lo permite, botón 🎤) | «caballo f3», «peón e cuatro», «caballo de ge uno a efe tres», «enroque corto», «corona dama» |

Se aceptan mayúsculas o minúsculas (si hay ambigüedad, primero se respeta la mayúscula: `Bc3` es alfil y `bc3` es
captura de peón). Si una jugada no es válida, se explica por qué: no hay pieza en esa casilla, la pieza es del
rival, esa pieza no puede ir ahí, no se puede enrocar o hay varias jugadas posibles (y se pide la casilla de
origen). La lectura está en `parse()` y la de la voz en `fromSpeech()`.

## 3. Ayudas (se cuentan)
- **👁 Ver tablero 3 s**: muestra la posición 3 segundos (vistazo).
- **📋 Mis piezas**: lista las casillas de tus piezas y las del rival.
- **📜 Jugadas**: muestra u oculta la lista de jugadas (en *A ciegas total* cuenta como ayuda).
- **🔊 Repetir**: vuelve a leer la última jugada del rival.

## 4. Final de la partida
Se detectan mate, ahogado, triple repetición, material insuficiente y regla de las 50 jugadas; también se puede
abandonar. Al terminar se muestra el tablero final con las estadísticas (jugadas, vistazos, ayudas y jugadas no
válidas) y el botón **Revisar partida** abre la revisión con el búho en Análisis.

- La partida se guarda en `S.games` con `blind: <vista>`, así que entra en **Mi análisis**.
- XP: 40 si ganas (+20 si ganas sin vistazos ni ayudas) y 10 si no.
- `S.coordStats = { games, wins, clean }` (partidas, victorias y partidas sin ayudas).
- Opciones guardadas en `S.settings.coord`.
