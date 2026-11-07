# ♞ Ajedrez Pro Academia

Academia de ajedrez completa que funciona en el navegador, se instala como app en el móvil o el ordenador y sigue funcionando sin conexión.

**▶ Usar la app:** https://gads4532.github.io/ajedrez/

## Qué incluye

| Sección | Contenido |
|---|---|
| **Jugar** | Partidas contra Stockfish 19 NNUE en 10 niveles (≈400 a fuerza máxima), con reloj, pistas y deshacer |
| **Análisis** | Barra de evaluación, 3 mejores líneas y revisión de la partida jugada a jugada (brillante, mejor, imprecisión, error, error grave) con la precisión de cada bando |
| **Importar y exportar** | Pega o abre archivos PGN de chess.com, Lichess o ChessBase (con varias partidas); copia el PGN o el FEN para llevarlos a otra web |
| **Puzles** | Más de 3.400 puzles verificados con Stockfish, de 400 a 2800 de Elo y de más de 50 temas, con rating propio, pistas, modo a ciegas y repaso de fallos |
| **Juegos con puzles** | Contrarreloj (también por tema), batalla contra 7 bots, ruta de temas con estrellas, duelo para dos jugadores y método Woodpecker |
| **Desafíos** | Misiones diarias, 25 logros, experiencia y niveles |
| **Visión y cálculo** | Coordenadas, nombrar casillas, color de casilla, rutas de caballo, memoria de posiciones y cálculo a ciegas |
| **Aperturas** | 38 aperturas con estilo, objetivo, estadísticas aproximadas, ideas, planes, pros y contras, variantes y trampas. Modo **Aprender** (mueves las piezas de ambos bandos, solo blancas o solo negras, guiado por coordenadas: «Caballo de g1 a f3», con flecha opcional y el nombre de cada casilla en el tablero) y modo **Entrenar** con repetición espaciada |
| **Para qué sirve cada jugada** | Cada jugada de aperturas y lecciones lleva etiquetas sencillas (Centro, Desarrollo, Rey seguro, Gambito, Clavada, Fianchetto…) con una explicación para principiantes, y cada apertura muestra su estilo |
| **Tablero** | Piezas modernas (o clásicas, en Ajustes) con animaciones suaves: deslizamiento según la distancia, pieza que se levanta al arrastrar, capturas que se desvanecen y jaque con pulso |
| **Cuenta** | Crea una cuenta con correo y contraseña (la misma de Organización Personal) y tu progreso se sincroniza entre el teléfono y el ordenador |
| **Estrategia** | Test de estilo, repertorio por perfil, familias de aperturas, 17 elementos del juego y comparador de aperturas |
| **Lecciones** | 56 lecciones de principios, táctica, medio juego y finales, con un entrenador (que se puede ocultar) y práctica contra el motor |
| **Metodologías** | 25 métodos de entrenamiento profesionales (escuela soviética, Dvoretsky, Steps, Woodpecker, Kotov, Heisman, Aagaard, Silman…) con pros, contras y evidencia |
| **Roadmap** | Camino de 10 etapas, de cero a Gran Maestro, con el progreso detectado automáticamente |
| **Enciclopedia** | Reglas FIDE, historia y campeones, estadísticas, psicología y glosario |
| **Progreso** | Gráfica de rating, mapa de actividad, precisión por tema, diario de errores y copia de seguridad |

## Cuenta y sincronización

En la barra lateral, **Crear cuenta / Entrar**. Con la sesión iniciada, cada cambio se sube a la nube a los pocos segundos y los demás dispositivos lo traen cada 30 segundos o al volver a la app. Nunca se elige entre un dispositivo y otro: se combinan.

**Preparación (una sola vez):** en Supabase → SQL Editor → New query, pega el contenido de `supabase.sql` y pulsa **Run**. Crea la tabla `ajedrez_estados`, separada de la de Organización Personal.

## Actualizaciones

Cada vez que se sube una versión nueva a este repositorio, GitHub Pages la publica y la app instalada la descarga sola y se recarga, sin perder tu progreso. Si estás en mitad de una partida o un reto, aparece un botón **Actualizar** para hacerlo cuando termines. En **Ajustes → Buscar actualización** puedes forzarlo.

## Instalar como app

Al entrar en la página aparece el aviso **Instala Ajedrez Pro**.


- **Móvil (Android/Chrome):** abre el enlace, pulsa ⋮ y luego **Instalar app** (o **Añadir a pantalla de inicio**).
- **iPhone/iPad (Safari):** abre el enlace, pulsa **Compartir** y luego **Añadir a pantalla de inicio**.
- **Ordenador (Chrome/Edge):** pulsa el icono de instalar de la barra de direcciones, o el botón **⬇ Instalar app** de la barra lateral.

Después de abrirla una vez con conexión, funciona sin internet.

## Descargar y usar en tu ordenador

1. Pulsa **Code → Download ZIP** en esta página y descomprímelo.
2. Necesitas [Python 3](https://www.python.org/downloads/), porque el motor no se puede cargar abriendo el archivo con doble clic.
3. Windows: haz doble clic en `iniciar-windows.bat`. Mac/Linux: ejecuta `./iniciar-mac-linux.sh`.
4. Se abrirá `http://localhost:8080` en tu navegador.

Tu progreso se guarda en el navegador. En **Progreso → Copia de seguridad** puedes copiarlo para llevarlo a otro dispositivo.

## Estructura

```
index.html            interfaz y estilos
js/                   tablero, motor, vistas y Stockfish (sf19.js + sf19.wasm; stockfish.js de respaldo)
data/                 aperturas, lecciones, metodologías/enciclopedia y puzles
icons/, manifest.webmanifest, sw.js   instalación como app y uso sin conexión
```

## Créditos y licencias

- **Motor:** [Stockfish](https://stockfishchess.org) 19 (versión lite NNUE) y Stockfish 10 de respaldo, compilados a WebAssembly/JavaScript por [nmrugg/stockfish.js](https://github.com/nmrugg/stockfish.js). Licencia GPLv3.
- **Reglas:** [chess.js](https://github.com/jhlywa/chess.js) 0.10.3, licencia BSD-2-Clause.
- **Piezas:** Cburnett, [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces/Standard), licencia CC BY-SA 3.0, vía [cm-chessboard](https://github.com/shaack/cm-chessboard).
- **Contenido:** todo el texto (lecciones, aperturas y metodologías) es de redacción propia. Las estadísticas de aperturas son aproximaciones de bases de partidas magistrales. Los puzles se generaron y verificaron con Stockfish.
- Este proyecto se distribuye bajo la **GNU GPL v3** (ver `LICENSE`), por incluir Stockfish.

Proyecto independiente, sin relación con chess.com ni Lichess.
