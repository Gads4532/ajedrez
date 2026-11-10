/* Lecciones básicas "Aprender a jugar": tablero, piezas, reglas especiales, final de la partida y primeros pasos — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(

  /* ───────────── El tablero y las piezas ───────────── */
  {
    id: 'b-tablero', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'El tablero: filas, columnas, diagonales y posición inicial',
    summary: 'Conoce el campo de batalla: sus 64 casillas, cómo se nombran y dónde se coloca cada pieza al empezar.',
    html: '<h4>Un tablero de 64 casillas</h4><p>El ajedrez se juega en un tablero cuadrado de <b>8 × 8 = 64 casillas</b> que alternan entre claras y oscuras. Se coloca siempre de modo que cada jugador tenga una <b>casilla clara en su esquina derecha</b>. Si al montar el tablero ves una casilla oscura a tu derecha, gíralo: es el error más habitual de quien empieza.</p>' +
      '<h4>Filas, columnas y diagonales</h4><ul><li>Las <b>columnas</b> son las líneas verticales y se nombran con letras de la <b>a</b> a la <b>h</b>, de izquierda a derecha desde el lado de las blancas.</li><li>Las <b>filas</b> son las líneas horizontales y se numeran del <b>1</b> al <b>8</b>; la fila 1 es la más cercana a las blancas y la 8 la más cercana a las negras.</li><li>Las <b>diagonales</b> son líneas de casillas del mismo color que se tocan por las esquinas, como a1-h8 o h1-a8 (las dos diagonales mayores, de ocho casillas).</li></ul>' +
      '<h4>Coordenadas</h4><p>Cada casilla tiene un nombre único que combina columna y fila: primero la letra y después el número. Así, <b>e4</b> es la casilla donde se cruzan la columna e y la fila 4. Aprender a localizar las casillas de memoria te permitirá leer libros, seguir partidas y entender las explicaciones de esta app.</p>' +
      '<h4>La posición inicial</h4><p>En la fila 1 las blancas colocan, de a a h: torre, caballo, alfil, dama, rey, alfil, caballo y torre. En la fila 2 van sus ocho peones. Las negras hacen lo mismo en las filas 8 y 7, como en un espejo. Truco para no equivocarse: <b>la dama va en su color</b> (dama blanca en casilla clara, d1; dama negra en casilla oscura, d8), y los reyes quedan uno frente al otro en la columna e. Mueven siempre primero las blancas y después se alterna un movimiento cada uno.</p>',
    keyPoints: ['Casilla clara en la esquina derecha de cada jugador.', 'Columnas a-h, filas 1-8: cada casilla se nombra letra + número (e4).', 'La dama va en su color; los reyes en la columna e.', 'Las blancas mueven primero.'],
    positions: [
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'La posición inicial. Observa la dama blanca en d1 (clara) y la negra en d8 (oscura).',
        highlights: ['d1', 'd8', 'e1', 'e8'],
        line: ['e4', 'e5', 'Nf3', 'Nc6'],
        comments: ['El peón blanco de la columna e avanza hasta la casilla e4 (columna e, fila 4).', 'Las negras responden llevando su peón a e5.', 'El caballo de g1 salta a f3.', 'El caballo negro de b8 salta a c6.'] },
      { fen: '4k3/8/8/8/8/8/8/4K3 w - - 0 1', orientation: 'white',
        caption: 'Una columna (la e, en verde), una fila (la 4, en azul) y la gran diagonal a1-h8 (en amarillo).',
        arrows: [['e1', 'e8', 'g'], ['a4', 'h4', 'b'], ['a1', 'h8', 'y']],
        line: ['Kd2', 'Kd7'],
        comments: ['El rey blanco pasa de e1 a d2: una casilla en diagonal.', 'El rey negro hace lo mismo, de e8 a d7.'] }
    ]
  },

  {
    id: 'b-rey', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'El rey: la pieza más importante',
    summary: 'El rey se mueve una casilla en cualquier dirección y nunca puede quedar atacado. Si lo pierdes, pierdes la partida.',
    html: '<h4>Cómo se mueve</h4><p>El rey avanza, retrocede o se desplaza de lado <b>una sola casilla</b> en cualquiera de las ocho direcciones: arriba, abajo, izquierda, derecha y las cuatro diagonales. Desde el centro del tablero controla ocho casillas; desde una esquina, solo tres. Tiene además un movimiento especial, el <b>enroque</b>, que veremos en otra lección.</p>' +
      '<h4>La regla de oro: nunca en peligro</h4><p>El rey no se captura nunca: la partida termina antes. Por eso existe una norma que lo condiciona todo: <b>está prohibido hacer una jugada que deje a tu propio rey atacado</b>. El rey no puede entrar en una casilla controlada por una pieza rival, y tampoco puedes mover otra pieza si con ello expones a tu rey.</p>' +
      '<h4>Los reyes no se tocan</h4><p>Como consecuencia, los dos reyes <b>nunca pueden estar en casillas vecinas</b>: siempre debe quedar al menos una casilla entre ellos. Cuando los reyes están enfrentados con una casilla de por medio, esa casilla intermedia es "tierra de nadie" para ambos.</p>' +
      '<h4>El rey también ataca</h4><p>El rey puede capturar una pieza rival situada en una casilla vecina, <b>siempre que esa pieza no esté protegida</b>. Si está defendida por otra pieza enemiga, capturarla significaría meterse en jaque, y eso es ilegal.</p>' +
      '<h4>Un papel que cambia</h4><p>Al principio de la partida el rey debe esconderse detrás de sus peones, porque hay muchas piezas rivales que podrían atacarlo. En cambio, cuando quedan pocas piezas (el final), el rey se convierte en una pieza fuerte y activa que debe ir al centro a pelear. Su valor en combate equivale aproximadamente a algo más que un alfil.</p>',
    keyPoints: ['Se mueve una casilla en cualquier dirección.', 'Nunca puede quedar atacado: es ilegal ponerlo en peligro.', 'Los reyes no pueden estar en casillas vecinas.', 'Puede capturar piezas vecinas que no estén protegidas.'],
    positions: [
      { fen: '8/8/4k3/8/8/3K4/8/8 w - - 0 1', orientation: 'white',
        caption: 'Los reyes avanzan casilla a casilla, pero nunca pueden quedar pegados.',
        line: ['Kd4', 'Kd6', 'Ke4', 'Ke6'],
        comments: ['El rey blanco sube una casilla. Ahora d5 y e5 están vigiladas por los dos reyes: ninguno puede pisarlas.', 'El rey negro se desplaza de lado.', 'El blanco vuelve a moverse de lado. Los reyes quedan frente a frente con una casilla de por medio.', 'Ninguno puede ir a d5, e5 ni f5: estaría junto al otro rey.'] },
      { fen: '4k3/8/8/8/8/8/r7/4K3 w - - 0 1', orientation: 'white',
        caption: 'La torre negra controla toda la fila 2: el rey blanco no puede subir.',
        arrows: [['a2', 'h2', 'r']],
        line: ['Kf1', 'Ke7'],
        comments: ['Las únicas jugadas legales son Kd1 y Kf1: d2, e2 y f2 están atacadas por la torre.', 'El rey negro, libre, se acerca.'] },
      { fen: '4k3/8/8/8/8/8/3r4/4K3 w - - 0 1', orientation: 'white',
        caption: 'Una torre sin defensa junto al rey es una presa fácil.',
        line: ['Kxd2'],
        comments: ['El rey captura la torre porque ninguna pieza negra la protege. Si estuviera defendida, la captura sería ilegal.'] }
    ]
  },

  {
    id: 'b-dama', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'La dama: la pieza más poderosa',
    summary: 'La dama combina los movimientos de la torre y del alfil: recorre filas, columnas y diagonales tantas casillas como quiera.',
    html: '<h4>Cómo se mueve</h4><p>La dama se desplaza en línea recta en <b>cualquiera de las ocho direcciones</b> (horizontal, vertical y diagonal) y puede recorrer <b>tantas casillas como quiera</b>, siempre que el camino esté libre. Es como tener una torre y un alfil en una sola pieza. No puede saltar: si una pieza propia está en medio, se detiene antes; si es una pieza rival, puede capturarla ocupando su casilla.</p>' +
      '<h4>Su valor</h4><p>Por su enorme alcance, la dama vale unos <b>9 peones</b>, casi lo mismo que dos torres. Desde el centro de un tablero vacío llega a controlar hasta 27 casillas. Perderla a cambio de poco suele decidir la partida, así que trátala con cuidado.</p>' +
      '<h4>El error del principiante: sacarla pronto</h4><p>Precisamente porque es tan valiosa, la dama es un mal "explorador" en la apertura. Si la sacas al centro en las primeras jugadas, el rival la atacará con peones y piezas menores, desarrollándose con ganancia de tiempo mientras tú la vas retirando. Lo normal es mover primero peones centrales, caballos y alfiles, y dejar que la dama entre en juego después.</p>' +
      '<h4>Ataques dobles</h4><p>La gran especialidad de la dama es atacar <b>dos cosas a la vez</b>: por ejemplo, dar jaque al rey por una columna y, al mismo tiempo, amenazar una pieza por una diagonal. El rival solo puede atender una de las dos amenazas. Fíjate en la segunda posición: un solo movimiento de dama da jaque y ataca una torre indefensa.</p>' +
      '<h4>Dama y rey dan mate</h4><p>Con rey y dama contra rey solo se puede dar jaque mate fácilmente: la dama encierra al rey rival contra un borde y el rey propio se acerca para ayudar. Lo practicarás en la lección de jaque mate.</p>',
    keyPoints: ['Se mueve como torre + alfil, sin saltar piezas.', 'Vale unos 9 peones.', 'No la saques demasiado pronto en la apertura.', 'Es experta en ataques dobles.'],
    positions: [
      { fen: '4k3/8/8/8/3Q4/8/8/4K3 w - - 0 1', orientation: 'white',
        caption: 'La dama da jaques por diagonales, filas y columnas.',
        line: ['Qh8+', 'Kd7', 'Qh3+', 'Kd6', 'Qd3+'],
        comments: ['Movimiento en diagonal (d4-h8) y jaque por la fila 8.', 'El rey sale de la fila 8.', 'Movimiento vertical por la columna h y jaque por la diagonal h3-d7.', 'El rey se aparta otra vez.', 'Movimiento horizontal por la fila 3 y jaque por la columna d.'] },
      { fen: 'r3k3/8/8/8/8/8/8/4K2Q w - - 0 1', orientation: 'white',
        caption: 'Ataque doble: jaque al rey y amenaza a la torre de a8.',
        arrows: [['e4', 'e8', 'r'], ['e4', 'a8', 'r']],
        line: ['Qe4+', 'Kd7', 'Qxa8'],
        comments: ['Desde e4 la dama ataca al rey por la columna e y a la torre por la diagonal e4-a8.', 'Las negras deben salir del jaque y no pueden salvar la torre.', 'La dama captura la torre: una ganancia decisiva.'] }
    ]
  },

  {
    id: 'b-torre', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'La torre: dueña de filas y columnas',
    summary: 'La torre se mueve en línea recta por filas y columnas. Brilla en columnas abiertas y en los finales.',
    html: '<h4>Cómo se mueve</h4><p>La torre se desplaza en línea recta, <b>horizontal o verticalmente</b>, tantas casillas como quiera mientras no encuentre obstáculos. No puede moverse en diagonal ni saltar piezas. Captura igual que se mueve: ocupando la casilla de la pieza rival.</p>' +
      '<h4>Su valor</h4><p>Una torre vale unos <b>5 peones</b>: más que un caballo o un alfil (3), menos que una dama (9). Por eso se dice que ganar una torre a cambio de un caballo o alfil es "ganar la calidad". Desde cualquier casilla de un tablero vacío una torre controla siempre 14 casillas, esté donde esté.</p>' +
      '<h4>Necesita líneas abiertas</h4><p>Al principio las torres están encerradas en las esquinas detrás de sus peones y no hacen casi nada. Para activarlas hay que desarrollar las demás piezas, enrocar (el enroque acerca una torre al centro) y buscar <b>columnas abiertas</b>, es decir, sin peones. Una torre en una columna abierta presiona todo el tablero; si además llega a la séptima fila del rival (segunda para las negras), suele atacar peones y encerrar al rey.</p>' +
      '<h4>Dos torres: la escalera</h4><p>Dos torres juntas son una fuerza terrible. Una de ellas corta al rey rival en una fila (por ejemplo, la séptima) y la otra da jaque en la fila siguiente: el rey queda contra el borde sin escapatoria. Este patrón, llamado <b>mate de la escalera</b> o "del pasillo", es uno de los primeros mates que debes dominar. Las torres se van turnando: una corta y la otra empuja, siempre lejos del rey rival para que no pueda atacarlas.</p>' +
      '<h4>Consejo</h4><p>Conecta tus torres: cuando no haya piezas entre ellas en la primera fila, se protegen mutuamente y pueden doblarse en una misma columna.</p>',
    keyPoints: ['Se mueve en horizontal y vertical, sin saltar.', 'Vale unos 5 peones.', 'Busca columnas abiertas y la séptima fila.', 'Dos torres dan mate con la "escalera".'],
    positions: [
      { fen: '4k3/8/8/8/8/8/8/R3K3 w - - 0 1', orientation: 'white',
        caption: 'La torre recorre filas y columnas enteras.',
        line: ['Ra7', 'Kf8', 'Rb7', 'Kg8', 'Rb8+'],
        comments: ['La torre sube por la columna a hasta la séptima fila y encierra al rey en la octava.', 'El rey negro se mueve por la última fila.', 'Movimiento horizontal: la torre sigue controlando toda la séptima.', 'El rey sigue atrapado en la octava fila.', 'Jaque por la fila 8. Sin la ayuda del rey blanco aún no es mate: el rey negro puede escapar por h7.'] },
      { fen: '4k3/8/8/8/8/8/R7/1R4K1 w - - 0 1', orientation: 'white',
        caption: 'El mate de la escalera con dos torres.',
        arrows: [['a7', 'h7', 'g'], ['b1', 'b8', 'r']],
        line: ['Ra7', 'Kf8', 'Rb8#'],
        comments: ['Una torre corta la séptima fila: el rey negro solo puede moverse por la octava.', 'Al rey solo le quedan d8 y f8.', 'La otra torre da jaque en la octava. Ninguna casilla está libre: jaque mate.'] }
    ],
    practice: { fen: '8/8/4k3/8/8/8/R7/1R4K1 w - - 0 1', goal: 'mate', side: 'w', text: 'Da jaque mate con las dos torres usando la escalera: una torre corta y la otra da jaque, empujando al rey hasta el borde.' }
  },

  {
    id: 'b-alfil', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'El alfil: el corredor de las diagonales',
    summary: 'El alfil se mueve en diagonal y nunca cambia de color de casilla. Cada bando tiene uno de casillas claras y otro de oscuras.',
    html: '<h4>Cómo se mueve</h4><p>El alfil se desplaza <b>en diagonal</b>, hacia delante o hacia atrás, tantas casillas como quiera mientras el camino esté libre. No puede saltar piezas. Como las diagonales están formadas por casillas de un mismo color, <b>un alfil nunca cambia de color</b>: el que empieza en una casilla oscura (c1 para las blancas, f8 para las negras) pasará toda la partida en casillas oscuras.</p>' +
      '<h4>Alfil de casillas claras y de casillas oscuras</h4><p>Cada jugador tiene dos alfiles, uno para cada color. Juntos cubren todo el tablero y se complementan muy bien; por eso la llamada <b>pareja de alfiles</b> se considera una pequeña ventaja, sobre todo en posiciones abiertas. Si pierdes uno de ellos, las casillas de ese color pueden quedar débiles.</p>' +
      '<h4>Su valor</h4><p>Un alfil vale unos <b>3 peones</b>, aproximadamente lo mismo que un caballo. La diferencia está en el tipo de posición: el alfil prefiere tableros abiertos, con diagonales largas y libres, donde puede actuar de un extremo a otro; en posiciones cerradas, bloqueado por sus propios peones, pierde mucha fuerza.</p>' +
      '<h4>Cómo desarrollarlo</h4><p>Al comienzo los alfiles están encerrados por los peones de d y e (o de b y g). Para sacarlos hay que mover antes esos peones: por ejemplo, <span class="mv">e4</span> abre la diagonal del alfil de f1, que puede salir a <span class="mv">Bc4</span> o <span class="mv">Bb5</span>. Evita colocar todos tus peones en casillas del mismo color que tu alfil, porque le quitarás espacio.</p>' +
      '<h4>Ataques a distancia</h4><p>Como el caballo es lento y el alfil es de largo alcance, este puede atacar piezas desde lejos, como en la segunda posición, donde captura una torre y da jaque al mismo tiempo.</p>',
    keyPoints: ['Se mueve en diagonal, sin saltar.', 'Siempre permanece en casillas del mismo color.', 'Vale unos 3 peones; le gustan las posiciones abiertas.', 'La pareja de alfiles es una pequeña ventaja.'],
    positions: [
      { fen: '4k3/8/8/8/8/8/8/2B1K3 w - - 0 1', orientation: 'white',
        caption: 'El alfil de c1 viaja siempre por casillas oscuras.',
        line: ['Bf4', 'Kd7', 'Bb8', 'Kc6', 'Ba7'],
        comments: ['Diagonal c1-f4: tres casillas de golpe.', 'El rey negro se acerca.', 'Ahora recorre la diagonal f4-b8. El alfil puede moverse hacia delante o hacia atrás.', 'El rey intenta atrapar al alfil.', 'El alfil se aleja. Fíjate: c1, f4, b8 y a7 son todas casillas oscuras.'] },
      { fen: '4k3/8/8/1r6/8/8/8/4KB2 w - - 0 1', orientation: 'white',
        caption: 'Ataque a larga distancia: el alfil gana la torre con jaque.',
        arrows: [['f1', 'b5', 'g'], ['b5', 'e8', 'r']],
        line: ['Bxb5+', 'Kd8'],
        comments: ['El alfil cruza el tablero, captura la torre indefensa de b5 y además da jaque por la diagonal b5-e8.', 'Las negras salen del jaque, pero ya han perdido la torre.'] }
    ]
  },

  {
    id: 'b-caballo', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'El caballo: el único que salta',
    summary: 'El caballo se mueve en forma de "L" y puede saltar por encima de cualquier pieza. Es el rey de las horquillas.',
    html: '<h4>Cómo se mueve</h4><p>El caballo se mueve en forma de <b>"L"</b>: dos casillas en una dirección (horizontal o vertical) y después una casilla en perpendicular. Otra forma de verlo: va a la casilla más cercana que <b>no esté en su misma fila, columna ni diagonal</b>. Desde el centro puede alcanzar ocho casillas; desde una esquina, solo dos.</p>' +
      '<h4>Salta por encima</h4><p>Es la <b>única pieza que puede saltar</b> sobre otras, propias o rivales. Lo que haya en medio no le afecta: solo importa la casilla de llegada. Por eso puede salir al comienzo de la partida sin mover ningún peón (<span class="mv">Nf3</span>, <span class="mv">Nc3</span>), y por eso sus jaques no se pueden tapar: hay que mover el rey o capturar al caballo.</p>' +
      '<h4>Siempre cambia de color</h4><p>Un detalle útil: cada salto del caballo lo lleva <b>a una casilla de color distinto</b>. Si está en una casilla clara, su siguiente movimiento terminará en una oscura, y viceversa.</p>' +
      '<h4>Su valor y su casa ideal</h4><p>Vale unos <b>3 peones</b>, como el alfil. Es una pieza de corto alcance que rinde mejor en el centro y en posiciones cerradas, donde los alfiles sufren. Un refrán del ajedrez dice que "caballo en el borde, caballo pobre": en la banda controla muy pocas casillas.</p>' +
      '<h4>La horquilla</h4><p>El caballo es el especialista en el <b>ataque doble</b> o <b>horquilla</b>: desde una sola casilla puede atacar al rey y a otra pieza, o a dos piezas valiosas, sin que ninguna de ellas pueda devolverle el ataque (ni la dama ni la torre atacan en forma de L). Busca siempre las casillas desde las que tu caballo amenaza dos cosas a la vez y vigila las del caballo rival.</p>',
    keyPoints: ['Se mueve en L: dos casillas y una en perpendicular.', 'Es la única pieza que salta.', 'En cada movimiento cambia de color de casilla.', 'Vale unos 3 peones; experto en horquillas.'],
    positions: [
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Los caballos salen saltando por encima de los peones.',
        line: ['Nf3', 'Nc6', 'Nc3', 'Nf6'],
        comments: ['El caballo de g1 salta por encima del peón de g2 y aterriza en f3 (de casilla oscura a clara).', 'El caballo negro de b8 hace lo mismo hacia c6.', 'Segundo caballo blanco al juego: desde c3 vigila e4 y d5.', 'Los cuatro caballos han salido sin mover ni un peón.'] },
      { fen: 'r3k3/8/8/1N6/8/8/8/4K3 w - - 0 1', orientation: 'white',
        caption: 'Horquilla: el caballo ataca a la vez al rey y a la torre.',
        arrows: [['c7', 'e8', 'r'], ['c7', 'a8', 'r']],
        line: ['Nc7+', 'Kd7', 'Nxa8'],
        comments: ['Desde c7 el caballo da jaque al rey de e8 y ataca la torre de a8. El jaque de caballo no se puede tapar.', 'El rey tiene que moverse; nadie puede defender la torre.', 'El caballo captura la torre.'] }
    ]
  },

  {
    id: 'b-peon', area: 'basico', category: 'El tablero y las piezas', level: 'principiante',
    title: 'El peón: avance, doble paso y captura',
    summary: 'El peón avanza una casilla hacia delante (dos en su primer movimiento) y captura en diagonal. Nunca retrocede.',
    html: '<h4>Cómo avanza</h4><p>El peón es la única pieza que <b>no puede retroceder</b>. Avanza <b>una casilla recta hacia delante</b>, siempre que esa casilla esté vacía. Si delante tiene cualquier pieza, propia o rival, queda <b>bloqueado</b> y no puede avanzar.</p>' +
      '<h4>El doble paso</h4><p>En su <b>primer movimiento</b>, cada peón puede elegir entre avanzar una o <b>dos casillas</b>, siempre que ambas estén libres. Es lo que ocurre en la jugada más popular del ajedrez, <span class="mv">e4</span>: el peón de e2 salta directamente a e4. Una vez movido, el peón ya solo podrá avanzar de una en una.</p>' +
      '<h4>Captura en diagonal</h4><p>Aquí está la gran peculiaridad: el peón <b>no captura como se mueve</b>. Captura <b>una casilla en diagonal hacia delante</b>. Por eso un peón bloqueado de frente puede, sin embargo, tener capturas disponibles a los lados. Y por eso un peón ataca dos casillas (las dos diagonales de delante), lo que lo convierte en un excelente guardián.</p>' +
      '<h4>Pequeño pero importante</h4><p>El peón vale <b>1 punto</b>, la unidad con la que se mide a las demás piezas. Sin embargo, el gran jugador francés Philidor ya afirmaba en el siglo XVIII que los peones son "el alma del ajedrez": su estructura decide dónde estarán bien tus piezas y qué planes tiene sentido seguir. Además, un peón que logra llegar a la última fila se transforma en otra pieza, normalmente en dama (lo verás en la lección de coronación).</p>' +
      '<h4>Reglas especiales del peón</h4><p>El peón tiene dos reglas propias que estudiaremos aparte: la <b>captura al paso</b> y la <b>coronación</b>.</p>',
    keyPoints: ['Avanza una casilla; dos en su primer movimiento.', 'Captura en diagonal hacia delante, no de frente.', 'Nunca retrocede y queda bloqueado si tiene algo delante.', 'Vale 1 punto, pero puede coronarse.'],
    positions: [
      { fen: '4k3/3p4/8/8/8/8/4P3/4K3 w - - 0 1', orientation: 'white',
        caption: 'Doble paso y captura en diagonal.',
        line: ['e4', 'd5', 'exd5', 'Kd7'],
        comments: ['Primer movimiento del peón: puede avanzar dos casillas, de e2 a e4.', 'El peón negro también usa su doble paso, de d7 a d5. Ahora los dos peones se atacan en diagonal.', 'El peón blanco captura en diagonal: deja la columna e y pasa a la d.', 'El rey negro se acerca para frenar al peón.'] },
      { fen: '4k3/8/8/4p3/4P3/8/8/4K3 w - - 0 1', orientation: 'white',
        caption: 'Peones bloqueados: uno frente al otro, ninguno puede avanzar ni capturar.',
        highlights: ['e4', 'e5'],
        line: ['Kd2', 'Kd7', 'Kd3', 'Kc6'],
        comments: ['El peón de e4 tiene delante el de e5: no puede avanzar. Como no hay nada en sus diagonales, tampoco captura. Solo se pueden mover los reyes.', 'Lo mismo ocurre con el peón negro.', 'El rey blanco se acerca a proteger su peón.', 'Los reyes maniobran: los peones bloqueados ya no se moverán.'] }
    ]
  },

  /* ───────────── Reglas especiales ───────────── */
  {
    id: 'b-enroque', area: 'basico', category: 'Reglas especiales', level: 'principiante',
    title: 'El enroque: corto, largo y sus condiciones',
    summary: 'El enroque es la única jugada en la que mueves dos piezas a la vez: pone al rey a salvo y activa una torre.',
    html: '<h4>Qué es</h4><p>El enroque es un movimiento especial de <b>rey y torre</b> a la vez, y cuenta como una sola jugada. El rey se desplaza <b>dos casillas</b> hacia una torre y esa torre salta por encima del rey y se coloca en la casilla inmediatamente a su lado.</p>' +
      '<h4>Enroque corto y largo</h4><ul><li><b>Enroque corto</b> (<span class="mv">O-O</span>): con la torre del flanco de rey. Las blancas pasan el rey de e1 a g1 y la torre de h1 a f1 (las negras, de e8 a g8 y de h8 a f8).</li><li><b>Enroque largo</b> (<span class="mv">O-O-O</span>): con la torre del flanco de dama. El rey va de e1 a c1 y la torre de a1 a d1 (las negras, de e8 a c8 y de a8 a d8).</li></ul>' +
      '<h4>Las condiciones</h4><p>Solo se puede enrocar si se cumplen <b>todas</b> estas condiciones:</p><ol><li>Ni el rey ni esa torre se han movido antes en la partida (aunque hayan vuelto a su casilla).</li><li>No hay ninguna pieza entre el rey y la torre.</li><li>El rey <b>no está en jaque</b> en ese momento.</li><li>El rey <b>no pasa</b> por una casilla atacada por el rival.</li><li>El rey <b>no termina</b> en una casilla atacada (eso sería meterse en jaque).</li></ol><p>Ojo: la torre sí puede estar atacada o pasar por una casilla atacada; las restricciones son solo para el rey. En el enroque largo, la casilla b1 (o b8) debe estar vacía, pero puede estar atacada, porque el rey no pasa por ella.</p>' +
      '<h4>Por qué es tan importante</h4><p>El enroque cumple dos objetivos de golpe: <b>esconde al rey</b> detrás de una fila de peones, lejos del centro, que es donde se abren las líneas primero, y <b>saca la torre</b> de la esquina hacia el centro. Un buen consejo para principiantes: intenta enrocar en las primeras diez jugadas.</p>' +
      '<h4>Cómo se ejecuta</h4><p>En un tablero real, toca primero el rey y muévelo dos casillas; después mueve la torre. En esta app basta con arrastrar el rey dos casillas hacia el lado elegido.</p>',
    keyPoints: ['Rey dos casillas hacia la torre; la torre salta a su lado.', 'O-O es el corto; O-O-O es el largo.', 'Ni rey ni torre movidos, sin piezas en medio, sin jaque.', 'El rey no puede pasar ni terminar en una casilla atacada.'],
    positions: [
      { fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1', orientation: 'white',
        caption: 'Los dos tipos de enroque.',
        line: ['O-O', 'O-O-O'],
        comments: ['Enroque corto blanco: el rey pasa de e1 a g1 y la torre de h1 a f1.', 'Enroque largo negro: el rey pasa de e8 a c8 y la torre de a8 a d8.'] },
      { fen: '4k3/8/8/8/2b5/8/8/R3K2R w KQ - 0 1', orientation: 'white',
        caption: 'El alfil negro ataca f1: el enroque corto está prohibido, pero el largo no.',
        arrows: [['c4', 'f1', 'r']],
        highlights: ['f1'],
        line: ['O-O-O'],
        comments: ['El rey tendría que pasar por f1, atacada por el alfil, así que no puede enrocar corto. El enroque largo (d1 y c1 libres de ataques) sí es legal.'] },
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Preparar el enroque en una partida real.',
        line: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O'],
        comments: ['Peón al centro.', '', 'Sale el caballo: una pieza menos entre el rey y la torre.', '', 'Sale el alfil: el camino ya está libre.', '', 'En la quinta jugada las blancas enrocan: rey a salvo y torre en f1.'] }
    ]
  },

  {
    id: 'b-al-paso', area: 'basico', category: 'Reglas especiales', level: 'principiante',
    title: 'La captura al paso',
    summary: 'Un peón que avanza dos casillas y queda al lado de un peón rival puede ser capturado como si solo hubiera avanzado una.',
    html: '<h4>La regla</h4><p>La captura al paso (en francés, <i>en passant</i>) es la regla que más sorprende a quien empieza. Funciona así: si un peón avanza <b>dos casillas</b> desde su posición inicial y termina <b>justo al lado</b> de un peón rival, ese peón rival puede capturarlo <b>como si el primero solo hubiera avanzado una casilla</b>. El peón que captura se mueve en diagonal a la casilla que el otro "saltó", y el peón capturado desaparece del tablero.</p>' +
      '<h4>Cuándo se da</h4><ul><li>El peón que captura debe estar en su <b>quinta fila</b> (fila 5 para las blancas, fila 4 para las negras).</li><li>El peón rival debe avanzar <b>dos casillas de golpe</b> y quedar en una columna vecina, en la misma fila.</li><li>La captura debe hacerse <b>inmediatamente</b>, en la jugada siguiente. Si no la haces en ese momento, pierdes el derecho a hacerla después.</li></ul>' +
      '<h4>Por qué existe</h4><p>El doble paso del peón se introdujo para acelerar el juego. Pero permitía que un peón "se escapara" pasando por delante de un peón rival sin darle la oportunidad de capturarlo. La captura al paso corrige eso: el doble paso no puede usarse para esquivar la captura que habría sido posible con un avance normal.</p>' +
      '<h4>Cómo se anota</h4><p>Se escribe como una captura normal de peón, indicando la casilla de llegada (por ejemplo, <span class="mv">exd6</span>). A veces se añade "a.p." o "e.p." para aclararlo. Fíjate en que el peón capturado no estaba en d6, sino en d5.</p>' +
      '<h4>Es opcional</h4><p>Como cualquier captura, la captura al paso no es obligatoria (salvo que sea la única jugada legal). Pero conviene conocerla: muchos principiantes se llevan una sorpresa cuando un peón suyo desaparece "por arte de magia".</p>',
    keyPoints: ['Solo contra un peón que acaba de avanzar dos casillas.', 'El peón que captura debe estar en su quinta fila, en columna vecina.', 'Se captura en diagonal a la casilla que el peón saltó.', 'Hay que hacerlo en la jugada inmediata o se pierde el derecho.'],
    positions: [
      { fen: '4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1', orientation: 'white',
        caption: 'El peón blanco de e5 está en su quinta fila. Si el peón negro de d7 avanza dos casillas...',
        line: ['d5', 'exd6'],
        comments: ['El peón negro avanza dos casillas y se coloca al lado del peón blanco, intentando pasar por delante de él.', '¡Captura al paso! El peón blanco va a d6, la casilla que el peón negro saltó, y el peón de d5 desaparece.'] },
      { fen: '4k3/8/8/8/5p2/8/6P1/4K3 w - - 0 1', orientation: 'white',
        caption: 'Las negras también pueden capturar al paso, en su cuarta fila.',
        line: ['g4', 'fxg3'],
        comments: ['El peón blanco avanza dos casillas y queda junto al peón negro de f4.', 'El peón negro captura al paso: va a g3 y el peón de g4 se retira del tablero.'] }
    ]
  },

  {
    id: 'b-coronacion', area: 'basico', category: 'Reglas especiales', level: 'principiante',
    title: 'La coronación: el peón que se convierte en dama',
    summary: 'Cuando un peón llega a la última fila se transforma en dama, torre, alfil o caballo, a elección de su dueño.',
    html: '<h4>La regla</h4><p>Cuando un peón alcanza la <b>última fila</b> (la 8 para las blancas, la 1 para las negras), debe transformarse en ese mismo momento en <b>dama, torre, alfil o caballo</b> del mismo color. La elección es libre y no depende de las piezas que se hayan perdido: puedes tener dos o más damas a la vez. No se puede quedar como peón ni convertirse en rey.</p>' +
      '<h4>Casi siempre, dama</h4><p>Como la dama es la pieza más fuerte, en la gran mayoría de los casos se elige dama. Por eso es habitual hablar de "coronar" o "hacer dama". Ganar 8 puntos de golpe (de peón a dama) suele decidir la partida, y por eso en los finales cada peón cuenta tanto: un <b>peón pasado</b>, es decir, uno al que ningún peón rival puede frenar, es una amenaza constante.</p>' +
      '<h4>Subpromoción</h4><p>Elegir una pieza distinta de la dama se llama <b>subpromoción</b>. Ocurre muy de vez en cuando, en dos situaciones típicas: coronar en <b>caballo</b> para dar un jaque con horquilla que la dama no podría dar (lo ves en la segunda posición), o coronar en torre o alfil para <b>evitar un ahogado</b> que daría tablas.</p>' +
      '<h4>Cómo se anota</h4><p>Se escribe la casilla de llegada seguida de "=" y la letra de la pieza elegida: <span class="mv">e8=Q</span> (dama), <span class="mv">e8=N</span> (caballo). Si además captura, se indica como siempre: <span class="mv">dxe8=Q</span>.</p>' +
      '<h4>Rey y peón contra rey</h4><p>Con rey y peón contra rey, la clave es que tu <b>rey vaya delante de su peón</b>, abriéndole paso. Si tu rey llega a la sexta fila delante del peón (por ejemplo, rey en e6 con peón en e5), la victoria está asegurada, sea quien sea el que mueva (salvo con los peones de las columnas a y h). En la práctica de esta lección lo comprobarás: avanza el rey, gana espacio y corona.</p>',
    keyPoints: ['En la última fila el peón se convierte en dama, torre, alfil o caballo.', 'Puedes tener varias damas.', 'Casi siempre se elige dama; la subpromoción es rara.', 'Se anota así: e8=Q.'],
    positions: [
      { fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1', orientation: 'white',
        caption: 'Rey delante del peón en la sexta fila: el peón corona.',
        line: ['Kd6', 'Kd8', 'e6', 'Ke8', 'e7', 'Kf7', 'Kd7', 'Kf6', 'e8=Q'],
        comments: ['El rey blanco se coloca al lado de la casilla de coronación.', 'El rey negro se pone delante.', 'El peón avanza protegido por su rey.', '', 'El peón llega a la séptima.', 'El rey negro tiene que apartarse.', 'El rey blanco controla e8.', '', '¡Coronación! El peón se convierte en dama y las blancas ganarán fácilmente.'] },
      { fen: '8/4P1q1/3k4/8/8/8/7P/4K3 w - - 0 1', orientation: 'white',
        caption: 'Subpromoción: coronar en caballo para dar una horquilla.',
        arrows: [['e8', 'd6', 'r'], ['e8', 'g7', 'r']],
        line: ['e8=N+', 'Ke6', 'Nxg7+'],
        comments: ['Una dama nueva no daría jaque y la dama negra seguiría viva. El caballo, en cambio, da jaque al rey de d6 y ataca a la vez la dama de g7.', 'El rey debe moverse y la dama queda perdida.', 'El caballo captura la dama, de nuevo con jaque. Las blancas quedan con ventaja decisiva.'] }
    ],
    practice: { fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1', goal: 'ganar', side: 'w', text: 'Corona el peón y gana la partida. Mantén tu rey delante del peón y no permitas el ahogado.' }
  },

  /* ───────────── Cómo termina la partida ───────────── */
  {
    id: 'b-jaque', area: 'basico', category: 'Cómo termina la partida', level: 'principiante',
    title: 'El jaque y las tres formas de salir de él',
    summary: 'Un rey atacado está en jaque. Hay que salir de él inmediatamente: moviendo el rey, tapando o capturando la pieza atacante.',
    html: '<h4>Qué es el jaque</h4><p>Decimos que un rey está <b>en jaque</b> cuando una pieza rival lo ataca, es decir, cuando podría "capturarlo" en la siguiente jugada. En una partida amistosa se suele avisar diciendo "jaque", aunque no es obligatorio. En la notación se marca con el signo <b>+</b> (por ejemplo, <span class="mv">Qh5+</span>).</p>' +
      '<h4>Obligación de responder</h4><p>Cuando tu rey está en jaque, <b>tu siguiente jugada tiene que quitarlo del jaque</b>. No puedes hacer otra cosa, por buena que sea. Y, como vimos en la lección del rey, nunca puedes hacer una jugada que deje a tu rey en jaque.</p>' +
      '<h4>Las tres salidas</h4><ol><li><b>Mover el rey</b> a una casilla que no esté atacada.</li><li><b>Interponer</b> (tapar) una pieza entre el atacante y tu rey. Esto solo es posible si el jaque viene de lejos (dama, torre o alfil); los jaques de caballo y de peón no se pueden tapar.</li><li><b>Capturar</b> la pieza que da jaque, con cualquier pieza (también con el rey, si la pieza atacante no está protegida).</li></ol>' +
      '<h4>Elegir la mejor salida</h4><p>Antes de responder a un jaque, repasa las tres opciones: muchas veces solo una es buena. Capturar la pieza atacante suele ser lo ideal si se gana material. Tapar con una pieza de poco valor es razonable, pero cuidado con tapar con una pieza que el rival pueda capturar gratis. Mover el rey puede dejarlo más expuesto, o hacerte perder el derecho a enrocar.</p>' +
      '<h4>Jaque doble y jaque a la descubierta</h4><p>Hay jaques especialmente peligrosos. En el <b>jaque doble</b> dos piezas dan jaque a la vez: como no se puede tapar ni capturar a las dos, la única salida es mover el rey. En el <b>jaque a la descubierta</b> una pieza se aparta y deja que otra, situada detrás, dé el jaque; la pieza que se movió queda libre para hacer daño en otro lugar.</p>' +
      '<h4>Y si no hay salida...</h4><p>Si un rey está en jaque y ninguna de las tres salidas es posible, es <b>jaque mate</b> y la partida termina.</p>',
    keyPoints: ['Jaque = el rey está atacado; se anota con +.', 'Hay que salir del jaque en la jugada siguiente.', 'Tres salidas: mover el rey, tapar, capturar.', 'Los jaques de caballo y peón no se pueden tapar.'],
    positions: [
      { fen: '4k3/8/8/8/8/8/8/r3K3 w - - 0 1', orientation: 'white',
        caption: 'Primera salida: mover el rey.',
        arrows: [['a1', 'e1', 'r']],
        line: ['Ke2'],
        comments: ['La torre da jaque por la primera fila. d1 y f1 siguen atacadas, así que el rey sube a la segunda fila (también valían Kd2 y Kf2).'] },
      { fen: '4k3/8/8/8/8/2N5/3PPP2/r3K3 w - - 0 1', orientation: 'white',
        caption: 'Segunda salida: tapar el jaque.',
        arrows: [['a1', 'e1', 'r']],
        line: ['Nd1'],
        comments: ['El rey no tiene casillas libres (d1 y f1 atacadas, la segunda fila llena de peones propios). El caballo se interpone en d1 y corta la línea de la torre.'] },
      { fen: '4k3/8/8/8/3Q4/8/3PPP2/r3K3 w - - 0 1', orientation: 'white',
        caption: 'Tercera salida: capturar a la pieza que da jaque.',
        arrows: [['d4', 'a1', 'g']],
        line: ['Qxa1'],
        comments: ['La dama captura la torre por la diagonal d4-a1. Es la única jugada legal y, además, gana una torre.'] }
    ]
  },

  {
    id: 'b-mate', area: 'basico', category: 'Cómo termina la partida', level: 'principiante',
    title: 'El jaque mate: el objetivo del juego',
    summary: 'Jaque mate es un jaque del que no hay salida. Quien da mate gana la partida, sin importar el material.',
    html: '<h4>Definición</h4><p>Se produce <b>jaque mate</b> cuando un rey está en jaque y su dueño <b>no tiene ninguna forma legal de salir de él</b>: el rey no tiene casillas libres, no se puede tapar el jaque y no se puede capturar a la pieza atacante. En ese momento la partida termina y gana quien ha dado el mate. Se anota con el signo <b>#</b> (por ejemplo, <span class="mv">Re8#</span>).</p>' +
      '<h4>El material no importa</h4><p>Da igual cuántas piezas tenga cada uno: un jugador con una dama de menos que consigue dar mate gana la partida. Por eso siempre hay que vigilar la seguridad del propio rey, aunque se vaya ganando.</p>' +
      '<h4>Cómo reconocer un mate</h4><p>Para comprobar si un jaque es mate, hazte tres preguntas: ¿puede moverse el rey a alguna casilla segura?, ¿se puede interponer una pieza?, ¿se puede capturar al atacante? Si las tres respuestas son "no", es mate.</p>' +
      '<h4>El mate del pasillo</h4><p>Uno de los mates más frecuentes entre principiantes (¡y no tan principiantes!) es el <b>mate del pasillo</b>: el rey está enrocado detrás de sus tres peones sin mover, y una torre o la dama da jaque en la última fila. Los propios peones le impiden escapar. Para prevenirlo se suele mover uno de esos peones (por ejemplo, <span class="mv">h3</span>) en un momento tranquilo, creando una "ventana" para el rey.</p>' +
      '<h4>Rey y dama contra rey</h4><p>Es el mate básico que todo jugador debe saber dar. El método: usa la dama para <b>reducir el espacio</b> del rey rival, siempre a un salto de caballo de él, hasta empujarlo al borde. Después acerca tu rey y da el mate con la dama, protegida por el rey o en la fila del borde. Mucho cuidado: si dejas al rey rival sin jugadas pero sin darle jaque, es <b>ahogado</b> y la partida es tablas.</p>',
    keyPoints: ['Mate = jaque sin ninguna salida legal.', 'Quien da mate gana, tenga el material que tenga.', 'Se anota con #.', 'Vigila la última fila: el mate del pasillo es muy frecuente.'],
    positions: [
      { fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', orientation: 'white',
        caption: 'El mate del pasillo.',
        arrows: [['e1', 'e8', 'g']],
        line: ['Re8#'],
        comments: ['La torre da jaque en la octava fila. El rey no puede ir a f8 ni h8 (fila atacada) ni subir, porque lo encierran sus propios peones. Nadie puede tapar ni capturar: jaque mate.'] },
      { fen: '7k/8/6K1/8/8/8/8/1Q6 w - - 0 1', orientation: 'white',
        caption: 'Rey y dama: el mate en el borde.',
        line: ['Qb8#'],
        comments: ['La dama da jaque por la octava fila. El rey blanco cubre g7 y h7, y la dama cubre g8: no hay salida.'] }
    ],
    practice: { fen: '6k1/8/5K2/8/8/8/8/1Q6 w - - 0 1', goal: 'mate', side: 'w', text: 'Da jaque mate con rey y dama. Busca el jaque en el borde con el apoyo de tu rey y evita el ahogado.' }
  },

  {
    id: 'b-tablas', area: 'basico', category: 'Cómo termina la partida', level: 'principiante',
    title: 'Las tablas: cuando nadie gana',
    summary: 'Una partida puede terminar empatada por ahogado, repetición triple, regla de las 50 jugadas, material insuficiente o acuerdo.',
    html: '<h4>Qué son las tablas</h4><p>Cuando una partida termina en empate decimos que son <b>tablas</b>. En un torneo cada jugador suma medio punto. Conocer las formas de llegar a ellas es útil por dos motivos: para no regalar medio punto cuando vas ganando y para salvar posiciones perdidas.</p>' +
      '<h4>1. El ahogado</h4><p>El jugador al que le toca mover <b>no tiene ninguna jugada legal</b> y su rey <b>no está en jaque</b>. Es la gran trampa de los finales: en la primera posición, las blancas tienen dama de ventaja, pero si juegan <span class="mv">Qf7</span> el rey negro no puede moverse sin meterse en jaque y la partida es tablas. En cambio, <span class="mv">Qb8#</span> habría sido mate. Cuando tengas mucha ventaja, comprueba siempre que el rival tiene al menos una jugada.</p>' +
      '<h4>2. Repetición triple</h4><p>Si la <b>misma posición</b> se repite <b>tres veces</b> (mismas piezas en las mismas casillas, mismo jugador al turno y mismos derechos de enroque y de captura al paso), se pueden reclamar tablas. No hace falta que las jugadas sean consecutivas. El caso típico es el <b>jaque continuo</b>: un bando da jaques sin parar y el rival no puede evitarlos.</p>' +
      '<h4>3. La regla de las 50 jugadas</h4><p>Si se juegan <b>50 jugadas seguidas de cada bando</b> sin ninguna captura ni ningún movimiento de peón, se pueden reclamar tablas. Evita que un jugador alargue eternamente una posición que no sabe ganar.</p>' +
      '<h4>4. Material insuficiente</h4><p>Si a ningún bando le queda material para dar mate, la partida es tablas automáticamente. Ocurre con <b>rey contra rey</b>, rey y alfil contra rey, y rey y caballo contra rey. Atención: rey y dos caballos contra rey tampoco permite forzar el mate, pero no se declaran tablas automáticas.</p>' +
      '<h4>5. Acuerdo mutuo</h4><p>Los jugadores pueden acordar tablas en cualquier momento: uno las ofrece después de hacer su jugada y el otro acepta o sigue jugando. Algunos torneos limitan esta opción en las primeras jugadas.</p>',
    keyPoints: ['Ahogado: sin jugadas legales y sin estar en jaque.', 'Repetición triple de la misma posición.', '50 jugadas sin capturas ni movimientos de peón.', 'Material insuficiente (rey solo, rey y pieza menor) o acuerdo.'],
    positions: [
      { fen: '7k/1Q6/6K1/8/8/8/8/8 w - - 0 1', orientation: 'white',
        caption: 'Cuidado con el ahogado: Qb8# gana, pero Qf7 regala las tablas.',
        line: ['Qf7'],
        comments: ['¡Error! El rey negro no está en jaque, pero g8 la cubre la dama, y g7 y h7 el rey blanco. Las negras no tienen ninguna jugada legal: ahogado y tablas.'] },
      { fen: '4Q3/6pk/5p2/8/8/8/1rr2PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Jaque continuo: las blancas, con material de menos, salvan la partida por repetición.',
        line: ['Qh5+', 'Kg8', 'Qe8+', 'Kh7', 'Qh5+', 'Kg8', 'Qe8+', 'Kh7'],
        comments: ['Jaque por la columna h.', 'Única casilla: g6 y h8 están atacadas.', 'Jaque por la octava fila.', 'Única respuesta. La posición inicial se ha repetido por segunda vez.', 'Y vuelta a empezar...', '', '', 'Tercera repetición de la misma posición: tablas.'] },
      { fen: '8/8/3k4/8/4p3/3K4/8/8 w - - 0 1', orientation: 'white',
        caption: 'Material insuficiente.',
        line: ['Kxe4'],
        comments: ['El rey blanco captura el último peón. Con rey contra rey nadie puede dar mate: tablas automáticas.'] }
    ]
  },

  /* ───────────── Primeros pasos ───────────── */
  {
    id: 'b-valor', area: 'basico', category: 'Primeros pasos', level: 'principiante',
    title: 'El valor de las piezas y los cambios favorables',
    summary: 'Peón 1, caballo 3, alfil 3, torre 5 y dama 9: con esta escala sabrás qué cambios te convienen y cuáles no.',
    html: '<h4>La escala clásica</h4><ul><li><b>Peón</b>: 1 punto.</li><li><b>Caballo</b>: 3 puntos.</li><li><b>Alfil</b>: 3 puntos (algunos jugadores le dan un poco más, 3,25).</li><li><b>Torre</b>: 5 puntos.</li><li><b>Dama</b>: 9 puntos.</li><li><b>Rey</b>: no tiene valor numérico, porque perderlo es perder la partida.</li></ul>' +
      '<h4>Para qué sirve</h4><p>Durante la partida las piezas se capturan unas a otras constantemente. Esta escala te ayuda a decidir si un cambio es bueno: si das una pieza de 3 puntos y recibes una de 5, has ganado 2 puntos. Sumando el valor de las piezas de cada bando sabes quién tiene <b>ventaja material</b>, y con ventaja material, en igualdad de condiciones, se gana.</p>' +
      '<h4>Algunas equivalencias útiles</h4><ul><li>Caballo y alfil son más o menos iguales: cambiar uno por otro suele ser un cambio neutro.</li><li>Una torre por un caballo o un alfil es <b>ganar la calidad</b> (unos 2 puntos).</li><li>Una dama equivale aproximadamente a dos torres, o a una torre, una pieza menor y un peón.</li><li>Dos piezas menores (6) suelen ser mejores que una torre y un peón (6), sobre todo en el medio juego.</li></ul>' +
      '<h4>Antes de capturar, cuenta</h4><p>Cuando una pieza rival está atacada, cuenta cuántas veces la atacas tú y cuántas veces la defiende el rival. Y fíjate en <b>qué piezas</b> intervienen: capturar un peón con la dama es mala idea si ese peón está defendido por otro peón, porque perderías 9 puntos por 1. La pieza que captura primero debe ser, idealmente, la de menos valor.</p>' +
      '<h4>Los números son una guía</h4><p>El valor real de una pieza depende de la posición: un caballo bien situado en el centro puede valer más que una torre encerrada, y un peón a punto de coronar puede valer casi una dama. Pero mientras aprendes, respeta la escala: no regales material y aprovecha cuando el rival lo haga.</p>',
    keyPoints: ['Peón 1, caballo 3, alfil 3, torre 5, dama 9.', 'Torre por pieza menor = ganar la calidad.', 'Antes de capturar, cuenta atacantes y defensores.', 'El valor depende también de la posición.'],
    positions: [
      { fen: '4k3/8/2p5/3r4/8/8/6B1/4K3 w - - 0 1', orientation: 'white',
        caption: 'Un buen cambio: alfil (3) por torre (5).',
        arrows: [['g2', 'd5', 'g']],
        line: ['Bxd5', 'cxd5'],
        comments: ['El alfil captura la torre, aunque está defendida por el peón de c6.', 'El peón recupera el alfil, pero el balance es favorable: las blancas dieron 3 puntos y ganaron 5. Han ganado la calidad.'] },
      { fen: '4k3/4p3/3p4/8/8/8/8/3QK3 w - - 0 1', orientation: 'white',
        caption: 'Un cambio desastroso: dama (9) por peón (1).',
        arrows: [['e7', 'd6', 'r']],
        line: ['Qxd6', 'exd6'],
        comments: ['La dama "gana" un peón... sin fijarse en que d6 está protegida por el peón de e7.', 'El peón captura la dama: las blancas han perdido 9 puntos a cambio de 1.'] }
    ]
  },

  {
    id: 'b-notacion', area: 'basico', category: 'Primeros pasos', level: 'principiante',
    title: 'La notación algebraica: leer y escribir jugadas',
    summary: 'Aprende a anotar y leer partidas: inicial de la pieza, casilla de llegada y unos pocos símbolos.',
    html: '<h4>Para qué sirve</h4><p>La notación algebraica es el idioma universal para escribir partidas de ajedrez. Con ella puedes anotar tus partidas en un torneo, repasarlas después, leer libros y seguir las explicaciones de esta app.</p>' +
      '<h4>La regla básica: pieza + casilla</h4><p>Cada jugada se escribe con la <b>inicial de la pieza</b> seguida de la <b>casilla de llegada</b>. En español las iniciales son: <b>R</b> rey, <b>D</b> dama, <b>T</b> torre, <b>A</b> alfil y <b>C</b> caballo. En inglés, que es como se escribe internacionalmente, son K, Q, R, B y N; esta app te las muestra en español. El <b>peón no lleva letra</b>: <span class="mv">e4</span> significa "un peón va a e4", y <span class="mv">Nf3</span> significa "un caballo va a f3".</p>' +
      '<h4>Los símbolos</h4><ul><li><b>x</b>: captura. <span class="mv">Bxc6</span> = el alfil captura en c6. Cuando captura un peón se indica su columna de salida: <span class="mv">dxc6</span>.</li><li><b>+</b>: jaque. <b>#</b>: jaque mate.</li><li><b>O-O</b>: enroque corto. <b>O-O-O</b>: enroque largo.</li><li><b>=</b>: coronación, por ejemplo <span class="mv">e8=Q</span>.</li><li>Comentarios habituales: <b>!</b> buena jugada, <b>?</b> error, <b>!!</b> jugada brillante, <b>??</b> error grave.</li></ul>' +
      '<h4>Jugadas ambiguas</h4><p>Si dos piezas iguales pueden ir a la misma casilla, se añade la <b>columna</b> de salida (<span class="mv">Nbd2</span>: el caballo de la columna b va a d2) o, si están en la misma columna, la <b>fila</b> (<span class="mv">R1a3</span>: la torre de la fila 1 va a a3).</p>' +
      '<h4>Cómo se escribe una partida</h4><p>Las jugadas se numeran por parejas: primero la de las blancas y después la de las negras. Por ejemplo: 1. e4 e5 2. Nf3 Nc6 3. Bb5. Si se quiere indicar solo una jugada de las negras se usan puntos suspensivos: 3...a6.</p>' +
      '<h4>Practica</h4><p>La mejor forma de aprender es leer en voz alta las jugadas de las posiciones de esta lección mientras las ves en el tablero, y anotar tus propias partidas desde el primer día.</p>',
    keyPoints: ['Inicial de la pieza + casilla de llegada; el peón no lleva letra.', 'x captura, + jaque, # mate, O-O y O-O-O enroques.', 'En ambigüedades se añade la columna o la fila de salida.', 'Las jugadas se numeran por parejas (blancas y negras).'],
    positions: [
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Leyendo una apertura jugada a jugada.',
        line: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bxc6', 'dxc6', 'O-O'],
        comments: ['1. e4: el peón (sin letra) va a e4.', '1...e5: respuesta de las negras, peón a e5.', '2. Nf3: caballo a f3.', '2...Nc6: caballo negro a c6.', '3. Bb5: alfil a b5.', '3...a6: el peón de a7 avanza una casilla.', '4. Bxc6: el alfil captura (x) en c6.', '4...dxc6: el peón de la columna d captura en c6.', '5. O-O: enroque corto.'] },
      { fen: '4k3/8/8/R7/8/8/8/RN2KN2 w - - 0 1', orientation: 'white',
        caption: 'Jugadas ambiguas: hay que indicar qué pieza se mueve.',
        line: ['Nbd2', 'Kd7', 'R1a3', 'Kc6'],
        comments: ['Los dos caballos (b1 y f1) pueden ir a d2; se indica la columna: es el caballo de b.', '', 'Las dos torres (a1 y a5) pueden ir a a3 y están en la misma columna; se indica la fila: es la torre de la fila 1.', ''] }
    ]
  },

  {
    id: 'b-primeras', area: 'basico', category: 'Primeros pasos', level: 'principiante',
    title: 'Tus primeras jugadas y el mate del pastor',
    summary: 'Cómo empezar una partida con buen pie: centro, desarrollo y enroque. Y cómo no caer en el famoso mate del pastor.',
    html: '<h4>Tres ideas para empezar</h4><ol><li><b>Ocupa el centro</b>. Las casillas e4, d4, e5 y d5 son las más importantes del tablero: las piezas situadas allí controlan más casillas. Empezar con <span class="mv">e4</span> o <span class="mv">d4</span> es la forma más natural.</li><li><b>Desarrolla las piezas</b>. Saca caballos y alfiles hacia el centro en las primeras jugadas. Como regla general, mueve cada pieza una sola vez en la apertura y no muevas demasiados peones.</li><li><b>Enroca pronto</b> para poner a salvo al rey y conectar las torres.</li></ol>' +
      '<h4>El mate del pastor</h4><p>Es la trampa más famosa para principiantes: las blancas sacan muy pronto el alfil a <span class="mv">Bc4</span> y la dama a <span class="mv">Qh5</span> (o <span class="mv">Qf3</span>), y ambos apuntan al punto <b>f7</b>, que al comienzo de la partida solo está defendido por el rey. Si las negras no prestan atención, <span class="mv">Qxf7#</span> termina la partida en cuatro jugadas.</p>' +
      '<h4>Cómo evitarlo</h4><p>Cuando veas que la dama y el alfil rivales apuntan a f7 (o a f2, si juegas con blancas), defiende ese punto: por ejemplo, con <span class="mv">g6</span>, que además ataca a la dama, seguido de <span class="mv">Nf6</span>, que tapa la diagonal de la dama, o con <span class="mv">Qe7</span>. La clave es <b>preguntarte en cada jugada qué amenaza el rival</b>.</p>' +
      '<h4>¿Y si lo intento yo?</h4><p>Contra un rival atento, sacar la dama tan pronto es mala idea: será atacada por caballos y peones y perderás tiempo retirándola mientras el rival se desarrolla. Es mejor aprender a jugar con buenos principios, como en la tercera posición, donde las dos partes sacan sus piezas de forma armoniosa y las blancas enrocan.</p>' +
      '<h4>Un hábito para siempre</h4><p>Antes de cada jugada, haz tres comprobaciones: ¿qué ha hecho mi rival y qué amenaza?, ¿mi jugada deja alguna pieza sin defender?, ¿puedo dar algún jaque o capturar algo? Este pequeño ritual te evitará la mayoría de los disgustos en tus primeras partidas.</p>',
    keyPoints: ['Ocupa el centro, desarrolla las piezas y enroca pronto.', 'El mate del pastor ataca f7 con dama y alfil.', 'Defiende f7 con g6, Nf6 o Qe7 cuando veas la amenaza.', 'Pregúntate siempre qué amenaza el rival.'],
    positions: [
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'El mate del pastor: así no hay que defenderse.',
        arrows: [['c4', 'f7', 'r'], ['h5', 'f7', 'r']],
        line: ['e4', 'e5', 'Bc4', 'Nc6', 'Qh5', 'Nf6', 'Qxf7#'],
        comments: ['Peón al centro.', 'Las negras responden igual.', 'El alfil apunta a f7.', 'Jugada natural, pero no atiende a la amenaza que viene.', 'La dama ataca f7 (y también e5). Ya son dos piezas contra f7.', '¿Atacar a la dama? ¡Error grave! No defiende f7.', 'La dama captura en f7 protegida por el alfil: jaque mate.'] },
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Cómo defenderse del mate del pastor.',
        line: ['e4', 'e5', 'Bc4', 'Nc6', 'Qh5', 'g6', 'Qf3', 'Nf6'],
        comments: ['', '', '', '', 'Amenaza Qxf7#.', '¡Bien! El peón ataca a la dama y le cierra el camino a f7.', 'La dama se retira y vuelve a apuntar a f7.', 'El caballo tapa la diagonal de la dama y se desarrolla. Las negras están bien y la dama blanca ha perdido tiempo.'] },
      { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Una apertura sana: centro, desarrollo y enroque.',
        line: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O', 'Nf6', 'd3', 'd6'],
        comments: ['Ocupa el centro y abre paso a la dama y al alfil.', '', 'El caballo se desarrolla atacando el peón de e5.', 'Defiende el peón con desarrollo.', 'El alfil a una buena diagonal, mirando a f7.', 'Las negras hacen lo mismo.', 'Rey a salvo.', 'Otra pieza al juego, atacando e4.', 'Defiende e4 y abre la diagonal del otro alfil.', 'Ambos bandos tienen una posición sólida y bien desarrollada.'] }
    ]
  }
);
