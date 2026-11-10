/* Táctica II: fundamentos, motivos avanzados, recursos defensivos y cálculo — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(

  /* ───────────── Fundamentos tácticos ───────────── */
  {
    id: 't2-sueltas', area: 'tactica', category: 'Fundamentos tácticos',
    title: 'Piezas sin defender: las piezas sueltas caen', level: 'principiante',
    summary: 'Casi toda combinación nace de una pieza que nadie protege. Aprende a detectarlas en las dos mitades del tablero y a castigarlas con un doble ataque.',
    html: '<h4>Por qué importan las piezas sueltas</h4><p>Una pieza <b>suelta</b> es la que no está defendida por ninguna otra. Mientras nadie la ataque no pasa nada, pero basta una jugada que la amenace <i>a la vez que crea otra amenaza</i> para que se pierda: el rival solo puede atender un problema por turno. Por eso los entrenadores repiten que las piezas sueltas caen. La horquilla, el ataque doble de dama o el jaque con captura posterior funcionan casi siempre contra piezas sin protección.</p>' +
      '<h4>El inventario rápido</h4><p>Antes de cada jugada, haz una lista mental muy breve: ¿qué piezas mías están sin defender? ¿Y cuáles del rival? Fíjate especialmente en:</p><ul><li>Caballos y alfiles adelantados en la mitad contraria del tablero.</li><li>Torres que aún no se han conectado (una torre en a8 con el alfil de c8 movido suele estar suelta).</li><li>Piezas que defendían algo y acaban de moverse, dejando a otra sin cobertura.</li></ul>' +
      '<h4>Cómo castigarlas</h4><p>La dama es la pieza ideal para atacar dos cosas a la vez porque se mueve en ocho direcciones. Si encuentras dos piezas sueltas del rival, busca una casilla desde la que la dama (o un caballo) las ataque a ambas. Si además la jugada es jaque, el rival ni siquiera tiene tiempo de salvar una de ellas.</p>' +
      '<h4>Y en tu propio campo</h4><p>La regla también funciona al revés: procura que tus piezas se defiendan entre sí. No hace falta que todo esté protegido siempre, pero cuantas menos piezas sueltas tengas, menos tácticas tendrá tu rival. Una buena costumbre es preguntarse después de cada jugada del contrario: «¿ha quedado algo mío sin defensa?».</p>',
    keyPoints: [
      'Una pieza suelta no está protegida por nada: es el blanco natural de los ataques dobles.',
      'Haz un inventario de piezas sueltas propias y ajenas antes de cada jugada.',
      'La dama, con sus ocho direcciones, es la mejor pieza para atacar dos objetivos a la vez.',
      'Si el ataque doble llega con jaque, el rival no puede salvar la segunda pieza.'
    ],
    positions: [
      {
        fen: 'r5k1/p1r2ppp/8/5n2/8/8/PP3PPP/3Q1RK1 w - - 0 1', orientation: 'white',
        caption: 'La torre de a8 y el caballo de f5 están sueltos. ¿Qué casilla ataca a los dos?',
        line: ['Qf3', 'Rb8', 'Qxf5'],
        comments: ['Desde f3 la dama ataca f5 por la columna y a8 por la gran diagonal. (Qd5 logra lo mismo.)', 'Las negras salvan la torre…', '…y el caballo cae: ninguna pieza negra lo defendía.'],
        arrows: [['f3', 'f5', 'r'], ['f3', 'a8', 'r']], highlights: ['a8', 'f5']
      },
      {
        fen: 'r5k1/p1qnb1pp/8/8/8/2N5/PP3PPP/3Q1RK1 w - - 0 1', orientation: 'white',
        caption: 'Las negras tienen un alfil de más, pero su torre de a8 está suelta y el rey, expuesto en la diagonal a2-g8.',
        line: ['Qd5+', 'Kh8', 'Qxa8+'],
        comments: ['Jaque y, a la vez, ataque a la torre por la diagonal d5-a8.', 'No hay forma de tapar el jaque en e6 o f7.', 'La torre cae con jaque: las blancas recuperan el material con creces.'],
        arrows: [['d5', 'g8', 'r'], ['d5', 'a8', 'r']]
      }
    ]
  },

  {
    id: 't2-ccj', area: 'tactica', category: 'Fundamentos tácticos',
    title: 'Jaques, capturas y amenazas: el método para encontrar tácticas', level: 'principiante',
    summary: 'Un orden fijo para revisar las jugadas forzadas antes que las tranquilas. Así no se te escapan las combinaciones ni las del rival.',
    html: '<h4>Por qué empezar por lo forzado</h4><p>Las jugadas <b>forzadas</b> (jaques, capturas y amenazas) limitan las respuestas del rival. Cuantas menos respuestas tenga, más fácil es calcular hasta el final y más probable que exista una combinación. Por eso los jugadores fuertes las miran primero, siempre, aunque parezcan absurdas: un sacrificio de dama con jaque se descarta en dos segundos, pero si funciona gana la partida.</p>' +
      '<h4>El orden de revisión</h4><ol><li><b>Jaques</b>: todos, incluidos los que entregan material. Pregúntate a dónde puede ir el rey y qué pasa después.</li><li><b>Capturas</b>: cualquier captura, sobre todo las que eliminan defensores o abren líneas hacia el rey.</li><li><b>Amenazas</b>: jugadas que crean un ataque nuevo (de mate, a una pieza suelta, de coronar). Una amenaza doble suele valer tanto como una captura.</li></ol><p>Solo cuando has revisado estas tres familias pasas a las jugadas de mejora (desarrollar, colocar una torre, mover un peón).</p>' +
      '<h4>Jugadas candidatas</h4><p>De esa revisión salen dos o tres <b>candidatas</b>. No calcules una sola jugada en profundidad sin haber hecho antes la lista: es la forma más común de pasar por alto la mejor opción. Escribe mentalmente «Rd8+, Qxb7, Nf5» y compáralas.</p>' +
      '<h4>Aplica el método también al rival</h4><p>Antes de jugar, mira los jaques, capturas y amenazas que tendrá tu oponente después de tu jugada. Muchas partidas se pierden no por falta de ideas propias, sino por no ver una sencilla captura del contrario.</p>',
    keyPoints: [
      'Revisa siempre en este orden: jaques, capturas y amenazas.',
      'Incluye las jugadas «imposibles» (sacrificios): se descartan rápido y a veces ganan.',
      'Haz una lista de 2-3 candidatas antes de calcular a fondo.',
      'Repite el proceso desde el punto de vista del rival antes de soltar la pieza.'
    ],
    positions: [
      {
        fen: '2r3k1/5ppp/8/8/8/8/1q1R1PPP/3Q2K1 w - - 0 1', orientation: 'white',
        caption: 'Primer paso del método: ¿qué jaques tienen las blancas?',
        line: ['Rd8+', 'Rxd8', 'Qxd8#'],
        comments: ['El único jaque es entregar la torre… y es el mejor. El rey negro no tiene casilla de escape.', 'Forzado: el rey no puede moverse y la única defensa es capturar.', 'La dama entra por la columna abierta: mate del pasillo.'],
        arrows: [['d2', 'd8', 'r']]
      },
      {
        fen: 'rnbqkb1r/p1ppnppp/1p6/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 0 1', orientation: 'white',
        caption: 'Tercer paso: amenazas. Una sola jugada de dama crea dos a la vez.',
        line: ['Qf3', 'd5', 'exd5'],
        comments: ['Amenaza Qxf7# (el alfil de c4 apoya) y también Qxa8 por la gran diagonal, que la jugada b6 dejó abierta.', 'La única defensa que tapa las dos líneas a la vez: el peón se interpone en d5.', 'Las blancas ganan un peón y mantienen la iniciativa.'],
        arrows: [['f3', 'f7', 'r'], ['f3', 'a8', 'r']]
      }
    ]
  },

  {
    id: 't2-conteo', area: 'tactica', category: 'Fundamentos tácticos',
    title: 'Contar atacantes y defensores: el conteo de capturas', level: 'principiante',
    summary: 'Antes de capturar en una casilla disputada, cuenta cuántas piezas la atacan y cuántas la defienden, y en qué orden entrarán.',
    html: '<h4>La regla básica</h4><p>Cuando varias piezas apuntan a la misma casilla se produce una <b>secuencia de capturas</b>. La regla inicial es sencilla: si tienes más atacantes que defensores tiene el rival, normalmente puedes ganar lo que hay en esa casilla. Si tienes los mismos o menos, capturar suele costarte material.</p>' +
      '<h4>El valor de las piezas cambia el resultado</h4><p>Contar no basta: también importa <i>quién</i> captura. Si un peón defiende una pieza, atacarla con un caballo es mala idea aunque tengas tres atacantes, porque al primer intercambio entregas tres puntos por uno. Por eso hay que simular la secuencia completa:</p><ul><li>Captura primero con la pieza de <b>menor valor</b>.</li><li>Después de cada captura, comprueba si al rival le conviene seguir o detenerse.</li><li>Suma lo que entregas y lo que recibes al final, no a mitad de camino.</li></ul>' +
      '<h4>Atacantes que no cuentan</h4><p>Un atacante clavado, una pieza que tapa a otra que está detrás (batería) o un defensor sobrecargado modifican el recuento. Una torre detrás de otra torre en la misma columna cuenta como segundo atacante; una pieza clavada contra el rey no cuenta como defensor porque no puede capturar.</p>' +
      '<h4>Cómo practicarlo</h4><p>Elige en tus partidas una casilla central disputada (d5, e5, d4…) y haz la lista: atacantes ordenados de menor a mayor valor, defensores igual. Repite el ejercicio hasta que lo hagas de forma automática; te evitará muchas «capturas que parecían ganar un peón».</p>',
    keyPoints: [
      'Más atacantes que defensores suele significar que ganas la casilla.',
      'Captura primero con la pieza de menos valor.',
      'Simula la secuencia completa y haz el balance al final.',
      'Las piezas clavadas no defienden; las baterías suman atacantes.'
    ],
    positions: [
      {
        fen: '3r2k1/pp3ppp/5n2/3p4/8/2N2B2/PP3PPP/3R2K1 w - - 0 1', orientation: 'white',
        caption: 'El peón de d5: tres atacantes (caballo, alfil, torre) contra dos defensores (caballo y torre).',
        line: ['Nxd5', 'Nxd5', 'Bxd5'],
        comments: ['Primero la pieza de menor valor.', 'Las negras recapturan con su caballo.', 'Las negras ya no deben seguir: Rxd5 Rxd5 les costaría la calidad. Las blancas ganan un peón limpio.'],
        arrows: [['c3', 'd5', 'g'], ['f3', 'd5', 'g'], ['d1', 'd5', 'g'], ['f6', 'd5', 'r'], ['d8', 'd5', 'r']]
      },
      {
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 1', orientation: 'white',
        caption: 'Gambito de dama: d5 está defendido por el peón e6, el caballo f6 y la dama. ¿Se puede capturar con el caballo?',
        line: ['Nxd5', 'exd5'],
        comments: ['Un error de conteo: el primer defensor es un peón.', 'Las blancas han dado un caballo por un peón. Lo correcto era cxd5: peón por peón.'],
        arrows: [['e6', 'd5', 'r'], ['f6', 'd5', 'r'], ['d8', 'd5', 'r']]
      }
    ]
  },

  /* ───────────── Motivos avanzados ───────────── */
  {
    id: 't2-atrapada', area: 'tactica', category: 'Motivos avanzados',
    title: 'La pieza atrapada', level: 'intermedio',
    summary: 'Una pieza sin casillas de retirada puede perderse aunque nadie la esté atacando todavía. Aprende a encerrar piezas rivales y a no dejar que encierren las tuyas.',
    html: '<h4>Qué es una pieza atrapada</h4><p>Una pieza está <b>atrapada</b> cuando todas sus casillas de huida están ocupadas por piezas propias o controladas por el rival. Si a continuación llega un ataque, no hay escapatoria y se pierde. A diferencia de la horquilla, aquí la clave no es atacar dos cosas, sino quitar casillas.</p>' +
      '<h4>Las víctimas habituales</h4><ul><li><b>Alfiles que capturan peones de borde</b> (a7, h2, a2, h7): tras <span class="mv">b6</span> o <span class="mv">g3</span> la diagonal de vuelta queda cortada.</li><li><b>Alfiles encerrados por peones</b>, como en la trampa del Arca de Noé de la Ruy López, donde una cadena negra a6-b5-c4 encierra al alfil de b3.</li><li><b>Caballos en el borde</b>: en a5 o h5 tienen pocas casillas y un peón puede quitárselas todas.</li><li><b>Damas golosas</b> que entran a comer peones en el flanco de dama (el famoso «peón envenenado»).</li></ul>' +
      '<h4>Cómo atrapar</h4><p>Cuenta las casillas de la pieza rival. Si solo tiene una o dos, busca un peón o una pieza que las cubra con ganancia de tiempo. Muchas veces la jugada que atrapa es tranquila; el ataque definitivo llega después, cuando ya no hay huida.</p>' +
      '<h4>Cómo evitarlo</h4><p>Antes de capturar un peón con una pieza menor en el borde, pregúntate: «¿Por dónde vuelve esta pieza?». Si la respuesta depende de una sola casilla que el rival puede cerrar con un peón, la captura probablemente es un error, por muy gratis que parezca.</p>',
    keyPoints: [
      'Atrapar consiste en quitar casillas, no en atacar.',
      'Los alfiles que comen peones de borde y los caballos en el borde son víctimas frecuentes.',
      'La jugada que atrapa suele ser tranquila; el ataque llega después.',
      'Antes de capturar con una pieza, comprueba su camino de vuelta.'
    ],
    positions: [
      {
        fen: 'r1bqkbnr/2p2ppp/p2p4/1p6/3QP3/1B6/PPP2PPP/RNB1K2R b KQkq - 0 8', orientation: 'black',
        caption: 'La trampa del Arca de Noé (Ruy López). Las blancas acaban de capturar en d4 con la dama.',
        line: ['c5', 'Qd5', 'Be6', 'Qc6+', 'Bd7', 'Qd5', 'c4'],
        comments: ['Ataca la dama con ganancia de tiempo.', 'La dama busca actividad atacando la torre de a8.', 'Tapa la diagonal y amenaza a la dama.', 'La dama sigue molestando con jaque…', '…pero las negras simplemente interponen.', 'Vuelve a d5.', '¡Encerrado! El alfil de b3 no tiene casillas: c4 está ocupada por un peón protegido por b5, a4 la controla ese mismo peón, y c2 y a2 las ocupan peones blancos. Caerá con ...cxb3.'],
        highlights: ['b3', 'a4', 'c4'], arrows: [['b5', 'c4', 'r'], ['b5', 'a4', 'r']]
      },
      {
        fen: '8/4kppp/p2bp3/1p6/1P6/P3P3/1B3PPP/5K2 b - - 0 1', orientation: 'black',
        caption: 'Material igualado. ¿Es buena idea comer el peón de h2?',
        line: ['Bxh2', 'g3', 'h5', 'Kg2', 'h4', 'Kxh2', 'hxg3+', 'fxg3'],
        comments: ['Parece un peón gratis…', '¡El alfil queda encerrado! g3 está ocupada y g1 la controla el rey blanco (Bg1 se responde con Kxg1).', 'Intento de rescate abriendo la columna.', 'El rey se acerca para comerse el alfil.', 'Última esperanza.', 'El alfil cae.', 'Las negras recuperan un segundo peón…', '…pero dos peones no compensan una pieza: las blancas ganan.'],
        highlights: ['h2', 'g1', 'g3']
      }
    ]
  },

  {
    id: 't2-despeje', area: 'tactica', category: 'Motivos avanzados',
    title: 'El despeje de casilla o de línea', level: 'avanzado',
    summary: 'A veces una pieza propia estorba: ocupa la casilla o tapa la línea que necesita otra. El despeje la quita de en medio, a ser posible con tempo o con sacrificio.',
    html: '<h4>La idea</h4><p>En el <b>despeje</b> el obstáculo no es una pieza enemiga sino una tuya. Puede ocupar la casilla donde otra pieza daría mate (despeje de casilla) o tapar la diagonal, columna o fila de una pieza de largo alcance (despeje de línea). La jugada que la retira es la clave de la combinación.</p>' +
      '<h4>Despejar con tempo</h4><p>Lo ideal es que la pieza que se aparta cree además una amenaza: un jaque, un ataque a la dama o una segunda amenaza de mate. Así el rival no tiene tiempo de reaccionar ante la línea que acaba de abrirse. Si la pieza que se aparta da jaque y la que queda detrás también, tenemos un <b>jaque doble</b>, el más fuerte de todos.</p>' +
      '<h4>Despejar con sacrificio</h4><p>Cuando no hay una jugada con tempo, se puede entregar la pieza que estorba: si el rival la captura, la línea queda libre; si no la captura, la pieza sacrificada suele hacer daño por sí misma. Este tipo de despeje se combina a menudo con la atracción (el rival captura y su pieza queda mal colocada).</p>' +
      '<h4>Cómo reconocerlo</h4><ul><li>Ves un mate o una ganancia «casi posible» que solo falla porque una pieza tuya está en medio.</li><li>Tienes una batería (dama y alfil, torre y dama) con la pieza delantera mal colocada.</li><li>Un caballo o un peón propio bloquea la gran diagonal de tu alfil fianchettado.</li></ul><p>Cuando lo detectes, pregúntate: ¿a dónde puede ir la pieza que estorba para que, además, amenace algo?</p>',
    keyPoints: [
      'El obstáculo es una pieza propia que ocupa una casilla o tapa una línea.',
      'El mejor despeje llega con tempo: jaque, amenaza de mate o ataque a una pieza.',
      'Si no hay tempo, se puede despejar sacrificando la pieza que estorba.',
      'Busca baterías propias con la pieza delantera mal situada.'
    ],
    positions: [
      {
        fen: 'r2q1rk1/pp3p1p/6pQ/8/3N4/7P/PB3PP1/6K1 w - - 0 1', orientation: 'white',
        caption: 'El caballo de d4 tapa la diagonal b2-g7. Sin él, Qg7 sería mate.',
        line: ['Nf5', 'Qf6', 'Bxf6', 'gxf5', 'Qg7#'],
        comments: ['Despeje con tempo: la diagonal se abre y el caballo, desde f5, también apoya g7. Amenaza Qg7#. Si ...gxf5 o ...f6, Qg7# igualmente.', 'La dama se interpone en la diagonal.', 'Se elimina el bloqueo.', 'Las negras ganan el caballo, pero…', '…la dama, apoyada por el alfil, da mate.'],
        arrows: [['d4', 'f5', 'g'], ['b2', 'g7', 'r']]
      },
      {
        fen: 'r2q1rk1/pp3p1p/6pQ/8/3N4/7P/PB3PP1/6K1 w - - 0 1', orientation: 'white',
        caption: 'La misma posición: hay un camino todavía más rápido combinando despeje y sacrificio.',
        line: ['Qg7+', 'Kxg7', 'Nf5+', 'Kg8', 'Nh6#'],
        comments: ['¡Sacrificio de dama! Atrae al rey a la diagonal del alfil.', 'Forzado.', 'El caballo se aparta con jaque doble (caballo y alfil): el rey debe moverse.', 'Única casilla: f6 la cubre el alfil y h6 el caballo.', 'Mate: f8, f7 y h7 están ocupadas por piezas negras, y g7 y h8 las cubre el alfil.'],
        arrows: [['b2', 'g7', 'r']]
      }
    ]
  },

  {
    id: 't2-bloqueo', area: 'tactica', category: 'Motivos avanzados',
    title: 'El sacrificio de bloqueo', level: 'avanzado',
    summary: 'Sacrificar para que la pieza que captura quede en una casilla que su propio rey necesitaba. El defensor se convierte en el muro de su prisión.',
    html: '<h4>La idea del autobloqueo</h4><p>En el <b>sacrificio de bloqueo</b> entregamos material en una casilla vecina al rey rival. Si la captura es forzada, la pieza que captura queda ocupando precisamente una casilla de escape de su propio rey. Después, una pieza menor o incluso un peón puede dar mate porque el rey ya no tiene adónde ir. El mate de la coz (Philidor) es el ejemplo más famoso, pero el mecanismo aparece en muchas formas.</p>' +
      '<h4>Las condiciones</h4><ul><li><b>La captura debe ser obligada</b>: lo mejor es que el sacrificio sea con jaque y que solo haya una forma de responder (otras capturas imposibles, piezas clavadas, rey sin casillas).</li><li><b>La casilla bloqueada debe ser vital</b>: tiene que ser la última salida del rey o la que deja libre el golpe final.</li><li><b>El remate debe estar preparado</b>: el jaque final ha de llegar inmediatamente, antes de que el rival pueda deshacer el bloqueo.</li></ul>' +
      '<h4>Cómo encontrarlo</h4><p>Cuando un rey tenga una sola casilla de escape, pregúntate si puedes obligar a una pieza enemiga a ocuparla. Mira también qué piezas del rival están clavadas: una clavada suele eliminar las capturas alternativas y deja una única recaptura, la que bloquea.</p>' +
      '<h4>En defensa</h4><p>El mismo recurso existe para el defensor: interponer y entregar una pieza en una línea crítica para cortar un ataque o frenar un peón pasado. Es un sacrificio de bloqueo defensivo, y a menudo es la única forma de ganar el tiempo necesario.</p>',
    keyPoints: [
      'Se sacrifica en una casilla vecina al rey para que la pieza que captura la bloquee.',
      'La captura debe ser forzada: jaque, piezas clavadas y una sola respuesta legal.',
      'Después llega un jaque con una pieza pequeña que es mate.',
      'Busca reyes con una sola casilla de escape.'
    ],
    positions: [
      {
        fen: '6k1/5ppp/8/8/4q2n/4N1P1/5P1P/1r3BK1 b - - 0 1', orientation: 'black',
        caption: 'Juegan las negras. El alfil de f1 está clavado por la torre de b1.',
        line: ['Qg2+', 'Nxg2', 'Nf3+', 'Kh1', 'Rxf1#'],
        comments: ['¡Sacrificio en g2! El rey no puede capturar (el caballo de h4 protege g2) y el alfil está clavado: solo queda Nxg2.', 'El caballo blanco ocupa g2, la casilla que el rey necesitaba.', 'Jaque de caballo: f1, f2, g2 y h2 están ocupadas por piezas blancas.', 'Única casilla.', 'Mate: el caballo de g2 no defiende f1 y el rey no tiene salida.'],
        highlights: ['g2']
      },
      {
        fen: '4r1k1/ppq2p2/Q7/6p1/7p/5KPb/PP3P2/R7 b - - 0 1', orientation: 'black',
        caption: 'El rey blanco en f3 tiene pocas casillas. ¿Cómo tapar la última?',
        line: ['Qf4+', 'gxf4', 'g4#'],
        comments: ['¡La dama se entrega! f4 está protegida por el peón de g5, así que el rey no puede capturar, y la torre de e8 y el alfil de h3 cubren el resto de casillas.', 'Única respuesta legal: el peón blanco queda en f4 y bloquea a su propio rey.', 'Mate de peón: g4 está protegido por el alfil, g3 la cubre el peón de h4, la columna e la domina la torre y g2 el alfil.'],
        highlights: ['f4']
      }
    ],
    practice: { fen: '6k1/5ppp/8/8/4q2n/4N1P1/5P1P/1r3BK1 b - - 0 1', goal: 'mate', side: 'b', text: 'Juegas con negras: obliga a una pieza blanca a bloquear a su rey y da mate.' }
  },

  {
    id: 't2-red-mate', area: 'tactica', category: 'Motivos avanzados',
    title: 'La red de mate: rodear al rey antes del jaque final', level: 'avanzado',
    summary: 'No todos los mates empiezan con jaque. Primero se quitan las casillas al rey con jugadas tranquilas; el jaque llega cuando ya no hay escapatoria.',
    html: '<h4>Qué es una red de mate</h4><p>Una <b>red de mate</b> es un conjunto de piezas que controlan todas las casillas alrededor del rey rival, de modo que cualquier jaque posterior será mate. Lo característico es que se construye con <b>jugadas tranquilas</b>: un rey que se acerca, una dama que se coloca en h6, un alfil que se instala en f6. El rival ve venir el golpe pero no puede impedirlo.</p>' +
      '<h4>Por qué cuesta verla</h4><p>Estamos entrenados para buscar jaques y capturas, y es correcto. Pero cuando no hay un jaque que funcione inmediatamente, conviene preguntarse: «¿Qué casillas tiene el rey? ¿Puedo quitarle la última con una jugada tranquila y amenazar mate?». Si la amenaza es imparable, la jugada tranquila es más fuerte que cualquier jaque.</p>' +
      '<h4>Ingredientes típicos</h4><ul><li>Un <b>alfil o un peón avanzado</b> (en f6 o h6) que corta casillas al rey enrocado.</li><li>La <b>dama</b> que llega a h6 o g7 con amenaza de mate.</li><li>En los finales, el <b>propio rey</b> que se acerca para quitar casillas mientras la torre espera el momento del jaque.</li></ul>' +
      '<h4>Comprobaciones antes de jugar</h4><p>Una jugada tranquila da un tiempo al rival. Antes de hacerla, revisa sus jaques y sus capturas: si tiene un jaque perpetuo, una defensa de la casilla de mate o un contraataque más rápido, la red no funciona. Si no tiene nada de eso, la red está cerrada.</p>',
    keyPoints: [
      'La red se construye con jugadas tranquilas que quitan casillas al rey.',
      'El jaque final solo llega cuando el rey ya no tiene salida.',
      'Antes de una jugada tranquila, revisa los jaques y las defensas del rival.',
      'En los finales el rey propio es una pieza clave para tejer la red.'
    ],
    positions: [
      {
        fen: '2r2rk1/pp3p1p/5Bp1/8/8/7P/PP1Q1PP1/6K1 w - - 0 1', orientation: 'white',
        caption: 'El alfil de f6 ya domina g7 y h8. Falta una pieza que llegue a g7.',
        line: ['Qh6', 'Rc1+', 'Kh2', 'Rh1+', 'Kxh1', 'Rc8', 'Qg7#'],
        comments: ['Jugada tranquila: amenaza Qg7# y no hay defensa.', 'A las negras solo les quedan jaques de consuelo.', 'Gracias a h3, el rey tiene una salida.', 'Un último jaque desesperado.', 'Se captura la torre.', 'Nada sirve ya.', 'Mate: la red estaba cerrada desde Qh6.'],
        arrows: [['d2', 'h6', 'g'], ['f6', 'g7', 'r']]
      },
      {
        fen: '7k/1R5p/4K3/8/8/8/8/8 w - - 0 1', orientation: 'white',
        caption: 'Torre contra peón: el rey blanco teje la red con jugadas tranquilas.',
        line: ['Kf6', 'h5', 'Kg6', 'h4', 'Rb8#'],
        comments: ['Quita g7 y f7 al rey negro. Si 1...Kg8, 2.Rb8# inmediatamente.', 'Las negras solo pueden mover el peón.', 'Otra jugada tranquila: ahora el rey cubre h7 y g7. Si 2...Kg8, 3.Rb8# igualmente.', 'Ya no hay defensa.', 'Mate en la octava fila.'],
        arrows: [['e6', 'f6', 'g'], ['b7', 'b8', 'r']]
      }
    ],
    practice: { fen: '2r2rk1/pp3p1p/5Bp1/8/8/7P/PP1Q1PP1/6K1 w - - 0 1', goal: 'mate', side: 'w', text: 'Encuentra la jugada tranquila que cierra la red y da mate.' }
  },

  {
    id: 't2-septima', area: 'tactica', category: 'Motivos avanzados',
    title: 'El peón en séptima y la coronación táctica', level: 'intermedio',
    summary: 'Un peón a un paso de coronar crea amenazas constantes: rupturas, desviaciones del defensor y, a veces, la subcoronación como única forma de ganar.',
    html: '<h4>El peón que está a punto de coronar</h4><p>Un peón en séptima (o en segunda, para las negras) vale casi tanto como una pieza: obliga al rival a vigilar la casilla de coronación en todo momento. Muchas combinaciones consisten en <b>quitar al único defensor</b> de esa casilla: desviarlo, cambiarlo o sobrecargarlo. En cuanto el defensor desaparece, el peón corona.</p>' +
      '<h4>La ruptura</h4><p>Cuando los peones están enfrentados, un sacrificio de peón puede abrir paso a otro. El caso clásico es el de tres peones contra tres en el mismo flanco: el peón central se entrega, otro lo sigue y uno de ellos acaba coronando porque el rey rival está lejos. Antes de lanzar la ruptura comprueba siempre que tu rey no está en el cuadrado de los peones rivales y que el suyo no llega a tiempo.</p>' +
      '<h4>La subcoronación</h4><p>Lo normal es coronar dama, pero hay dos situaciones en que conviene otra pieza:</p><ul><li><b>Caballo</b>: cuando coronar caballo da jaque o crea una horquilla que la dama no podría crear.</li><li><b>Torre o alfil</b>: cuando coronar dama permitiría al rival un recurso de <i>ahogado</i>. La torre tiene el mismo poder en la línea concreta, pero deja una casilla libre al rey y evita las tablas.</li></ul><p>El estudio de Saavedra (1895) es el ejemplo más célebre: coronar dama solo empata y coronar torre gana.</p>' +
      '<h4>Consejo práctico</h4><p>Cuando estés a punto de coronar, haz una pausa: revisa si la dama permite un ahogado o un jaque perpetuo, y si otra pieza te da un jaque con ganancia.</p>',
    keyPoints: [
      'El peón en séptima obliga al rival a vigilar una casilla: ataca a ese defensor.',
      'La ruptura con sacrificio de peones funciona si el rey rival está lejos.',
      'Corona caballo si da jaque o horquilla decisiva.',
      'Corona torre o alfil si la dama permitiría un ahogado.'
    ],
    positions: [
      {
        fen: '7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', orientation: 'white',
        caption: 'Tres contra tres y los reyes lejos: la ruptura clásica.',
        line: ['b6', 'axb6', 'c6', 'bxc6', 'a6'],
        comments: ['Se entrega el peón central. (Si 1...cxb6, 2.a6! bxa6 3.c6 y corona el peón de c.)', 'Captura con el peón de a.', '¡Segundo sacrificio!', 'Si 2...b5, 3.cxb7 y corona igualmente.', 'Nadie puede detener el peón de a: el rey negro está demasiado lejos.'],
        arrows: [['b5', 'b6', 'g'], ['a6', 'a8', 'g']]
      },
      {
        fen: '3r2k1/3P1ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1', orientation: 'white',
        caption: 'La torre de d8 es el único guardián del peón de d7. ¿Cómo apartarla?',
        line: ['Rc8', 'Rxc8', 'dxc8=Q#'],
        comments: ['Desviación: la torre se ofrece en la casilla vecina. Si 1...Kf8, 2.Rxd8+ y las blancas quedan con una torre de más.', 'Si captura, el peón queda libre…', '…y corona con mate del pasillo.'],
        arrows: [['c1', 'c8', 'r'], ['d7', 'd8', 'g']]
      },
      {
        fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1', orientation: 'white',
        caption: 'Estudio de Saavedra (1895): la subcoronación más famosa de la historia.',
        line: ['c7', 'Rd6+', 'Kb5', 'Rd5+', 'Kb4', 'Rd4+', 'Kb3', 'Rd3+', 'Kc2', 'Rd4', 'c8=R', 'Ra4', 'Kb3'],
        comments: ['El peón amenaza coronar.', 'La torre empieza a dar jaques.', '', '', '', '', '', '', 'Ya no hay más jaques.', '¡Trampa! Si 6.c8=Q, Rc4+ 7.Qxc4 y es ahogado.', 'Subcoronación: la torre controla la columna c sin ahogar al rey.', 'Única defensa contra Ra8#: la torre tapa la columna a.', 'Doble amenaza: Kxa4 y Rc1#. Las blancas ganan.'],
        arrows: [['c8', 'c1', 'r']]
      }
    ],
    practice: { fen: '7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', goal: 'ganar', side: 'w', text: 'Rompe con los peones y corona antes de que llegue el rey negro.' }
  },

  /* ───────────── Recursos defensivos ───────────── */
  {
    id: 't2-perpetuo', area: 'tactica', category: 'Recursos defensivos',
    title: 'El jaque perpetuo', level: 'intermedio',
    summary: 'Cuando vas perdiendo, una serie infinita de jaques puede salvar la partida. Aprende a reconocer los reyes que no pueden escapar de ellos.',
    html: '<h4>Qué es</h4><p>Hay <b>jaque perpetuo</b> cuando un bando puede dar jaque indefinidamente y el rey rival no puede evitarlo. La partida termina en tablas por triple repetición (o por acuerdo). Es el recurso defensivo más importante del medio juego: permite salvar posiciones con mucho material de menos.</p>' +
      '<h4>Cuándo buscarlo</h4><ul><li>Cuando vas perdiendo material y el rey rival tiene <b>poca protección</b>: pocos peones delante o piezas lejos.</li><li>Cuando tu rival amenaza mate y tú no tienes defensa: el perpetuo es la forma de no dejarle jugar.</li><li>Cuando tu dama puede alternar entre dos casillas que dan jaque (h5 y e8, g5 y f6…).</li></ul>' +
      '<h4>Cómo comprobar que funciona</h4><p>Para cada jaque, revisa las respuestas del rival: ¿a qué casillas puede ir el rey? ¿Puede <b>interponer</b> una pieza? ¿Puede capturar la dama? Si en cada ciclo el rey solo tiene casillas desde las que vuelve a recibir jaque y ninguna interposición es posible, el perpetuo es real. Una sola casilla de escape (por ejemplo, f8 libre) basta para que el rey se esconda y el perpetuo fracase.</p>' +
      '<h4>La otra cara</h4><p>Cuando eres tú quien va ganando, piensa en el perpetuo del rival antes de lanzarte a por material. Hacer «luft» con un peón, mantener una pieza cerca del rey o cambiar damas son formas de quitar esa posibilidad.</p>',
    keyPoints: [
      'El perpetuo salva partidas con mucho material de menos.',
      'Revisa en cada jaque las casillas del rey, las interposiciones y las capturas.',
      'Una sola casilla de escape rompe el perpetuo.',
      'Si vas ganando, quita al rival la posibilidad antes de comer material.'
    ],
    positions: [
      {
        fen: '8/6pk/8/3Q4/8/8/qr1r1PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Las negras tienen dama y dos torres contra dama y amenazan ...Rd1+. Juegan blancas.',
        line: ['Qh5+', 'Kg8', 'Qe8+', 'Kh7', 'Qh5+'],
        comments: ['El rey negro no puede ir a g6 (la dama controla la diagonal) ni a h6.', 'Única casilla.', 'f8 y f7 están cubiertas, g7 está ocupada y ninguna pieza negra llega a f8 para interponerse.', 'Única casilla.', 'Y la posición se repite: tablas.'],
        arrows: [['h5', 'h7', 'r'], ['e8', 'g8', 'r']]
      },
      {
        fen: '5rk1/5p1p/8/3Q4/8/8/qr3PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Sin peón en g7, el enroque es vulnerable. La torre de f8 quita al rey su escape.',
        line: ['Qg5+', 'Kh8', 'Qf6+', 'Kg8', 'Qg5+'],
        comments: ['Jaque por la columna g.', 'Única: f8 está ocupada por la propia torre negra.', 'Jaque por la diagonal; g7 no se puede tapar.', 'Única.', 'Repetición: tablas.'],
        arrows: [['g5', 'g8', 'r'], ['f6', 'h8', 'r']]
      }
    ],
    practice: { fen: '8/6pk/8/3Q4/8/8/qr1r1PPP/6K1 w - - 0 1', goal: 'tablas', side: 'w', text: 'Estás perdido en material: salva la partida con jaque perpetuo.' }
  },

  {
    id: 't2-ahogado', area: 'tactica', category: 'Recursos defensivos',
    title: 'El ahogado como recurso de salvación', level: 'intermedio',
    summary: 'Si tu rey no tiene jugadas, puedes intentar quedarte sin ninguna jugada legal: entrega tus últimas piezas y el ahogado te da medio punto.',
    html: '<h4>La regla</h4><p>Hay <b>ahogado</b> cuando el bando que mueve no está en jaque y no tiene ninguna jugada legal. La partida termina en tablas inmediatamente. Para el bando que va perdiendo es una tabla de salvación; para el que va ganando, una pesadilla que hay que vigilar en todos los finales.</p>' +
      '<h4>Las condiciones del recurso</h4><p>Para buscar un ahogado necesitas que tu rey esté <b>inmovilizado</b>: todas sus casillas ocupadas por piezas propias o controladas por el rival, y tus peones bloqueados. Una vez que el rey está encerrado, el plan consiste en deshacerte de las piezas que aún pueden moverse:</p><ul><li><b>La dama kamikaze</b>: se ofrece con jaque de forma que la captura sea obligada.</li><li><b>La torre loca</b>: da jaques continuos; si el rey la captura, ahogado; si no la captura, los jaques siguen.</li></ul>' +
      '<h4>Cómo detectarlo</h4><p>Cuando estés perdiendo, cuenta las jugadas legales de tu rey y de tus peones. Si son cero o casi cero, busca cómo quitarte de encima las piezas restantes. Muchos jugadores abandonan posiciones en las que había un ahogado disponible.</p>' +
      '<h4>Para el que gana</h4><p>Antes de cada jugada en un final ganado, comprueba que el rival tiene al menos una jugada legal después. Coronar dama cuando una torre basta, o quitar la última casilla al rey sin dar jaque, son los errores típicos.</p>',
    keyPoints: [
      'Ahogado: sin jaque y sin jugadas legales. Son tablas.',
      'Primero el rey propio debe estar inmovilizado y los peones bloqueados.',
      'Luego entrega las piezas restantes con jaque: dama kamikaze o torre loca.',
      'El que gana debe comprobar siempre que deja una jugada legal al rival.'
    ],
    positions: [
      {
        fen: '7k/6p1/8/2q5/8/3Q3p/r6P/7K w - - 0 1', orientation: 'white',
        caption: 'Las negras amenazan mate. El rey blanco no tiene casillas y el peón de h2 está bloqueado.',
        line: ['Qh7+', 'Kxh7'],
        comments: ['¡La dama se entrega con jaque! g8 está controlada por la propia dama, así que la captura es obligada.', 'Ahogado: g1 la controla la dama negra, g2 el peón de h3 y la torre, y h2 no puede avanzar. Tablas.'],
        highlights: ['g1', 'g2']
      },
      {
        fen: '7k/6R1/8/2q5/8/7p/r6P/7K w - - 0 1', orientation: 'white',
        caption: 'La «torre loca»: la última pieza blanca da jaques sin descanso.',
        line: ['Rg8+', 'Kh7', 'Rg7+', 'Kh6', 'Rg6+', 'Kh5', 'Rg5+', 'Qxg5'],
        comments: ['Capturar la torre sería ahogado inmediato.', 'El rey intenta huir.', 'La torre lo persigue por la columna g.', '', '', 'El rey sigue escapando…', '', 'Si la dama captura, la columna g sigue controlada: el rey blanco no tiene jugadas. Ahogado.'],
        arrows: [['g7', 'g8', 'r']]
      }
    ],
    practice: { fen: '7k/6R1/8/2q5/8/7p/r6P/7K w - - 0 1', goal: 'tablas', side: 'w', text: 'Tu rey está inmovilizado. Usa la torre loca para forzar las tablas.' }
  },

  {
    id: 't2-contraataque', area: 'tactica', category: 'Recursos defensivos',
    title: 'La fortaleza táctica y el contraataque: defender con amenazas', level: 'avanzado',
    summary: 'La mejor defensa no siempre es tapar la amenaza: a veces es crear una mayor. Y cuando falta material, una fortaleza bien construida puede ser inexpugnable.',
    html: '<h4>Defender con amenazas</h4><p>Ante un ataque, la reacción instintiva es defender: tapar, proteger, retirar. Pero si el rival ha lanzado sus piezas hacia tu rey, muchas veces ha dejado el suyo desguarnecido. El <b>contraataque</b> consiste en responder con una amenaza más fuerte o más rápida (un jaque, una amenaza de mate, una clavada) que obligue al rival a ocuparse de ella. El tiempo que gana el defensor se convierte en ventaja.</p>' +
      '<h4>Cómo encontrar el contraataque</h4><ul><li>Aplica el método de jaques, capturas y amenazas <b>también cuando estás defendiendo</b>.</li><li>Revisa la primera fila del rival: si su rey no tiene «luft», un jaque de torre puede ser decisivo.</li><li>Busca piezas atacantes que han quedado sueltas o clavadas.</li></ul>' +
      '<h4>La fortaleza</h4><p>Una <b>fortaleza</b> es una posición en la que el bando débil no puede ser vencido aunque tenga menos material, porque el rival no consigue romper sus defensas. Ejemplos clásicos: alfil y peón de torre con el alfil del color equivocado, torre contra alfil con el rey en la esquina adecuada, o un bloqueo de peones con casillas inaccesibles para el rey rival. A veces vale la pena devolver material para construir una.</p>' +
      '<h4>Torre contra alfil</h4><p>En este final teórico el defensor debe llevar su rey a la esquina del color <b>contrario</b> al de su alfil. Allí el alfil puede interponerse ante los jaques en la última fila, y el atacante debe cuidar de no ahogar al rey negro.</p>',
    keyPoints: [
      'Ante un ataque, busca primero una amenaza propia más fuerte.',
      'Un rey atacante sin luft es vulnerable a los jaques en la primera fila.',
      'Una fortaleza puede compensar mucho material: a veces conviene devolverlo para construirla.',
      'Torre contra alfil: rey defensor en la esquina del color contrario a su alfil.'
    ],
    positions: [
      {
        fen: '4r1k1/ppq2ppp/8/6NQ/8/3B4/PP3PPP/6K1 b - - 0 1', orientation: 'black',
        caption: 'Las blancas amenazan Qxh7+ y mate. Defenderse con ...h6 aguanta, pero hay algo mucho mejor.',
        line: ['Re1+', 'Bf1', 'Qc4', 'Qxf7+', 'Qxf7', 'Nxf7', 'Kxf7'],
        comments: ['¡Contraataque! Jaque en la primera fila: el rey blanco no tiene luft.', 'Única defensa: el alfil abandona la diagonal hacia h7 y queda clavado.', 'Amenaza Qxf1#. Las blancas ya no tienen tiempo para su ataque.', 'Intento desesperado de cambiar damas.', '', '', 'Las negras quedan con torre contra alfil y una posición ganada.'],
        arrows: [['e8', 'e1', 'r'], ['c4', 'f1', 'r']]
      },
      {
        fen: '7k/R7/5K2/8/8/1b6/8/8 w - - 0 1', orientation: 'white',
        caption: 'Fortaleza de torre contra alfil: el rey negro está en h8 (casilla oscura) y su alfil es de casillas claras.',
        line: ['Ra8+', 'Bg8', 'Kg6'],
        comments: ['Clava el alfil contra el rey.', 'El alfil se interpone: por eso la esquina debe ser del color contrario al del alfil.', 'Un error típico del atacante: las negras no tienen jugadas legales. Ahogado.'],
        highlights: ['h8', 'g8']
      }
    ]
  },

  /* ───────────── Cálculo ───────────── */
  {
    id: 't2-calculo', area: 'tactica', category: 'Cálculo',
    title: 'Cómo calcular variantes: árbol, visualización y evaluación final', level: 'avanzado',
    summary: 'Un método ordenado para calcular: elegir candidatas, recorrer el árbol de variantes rama por rama, visualizar la posición final y evaluarla con criterio.',
    html: '<h4>El árbol de variantes</h4><p>Calcular es imaginar jugadas futuras sin mover las piezas. La estructura natural es un <b>árbol</b>: el tronco es la posición actual, cada candidata es una rama y cada respuesta del rival abre ramas nuevas. El error más común es saltar de una rama a otra sin terminar ninguna. Disciplina: elige una candidata, recórrela hasta el final, evalúa, y solo entonces pasa a la siguiente.</p>' +
      '<h4>Paso 1: candidatas</h4><p>Empieza con jaques, capturas y amenazas, y añade una o dos jugadas tranquilas importantes. Limita la lista a dos o tres jugadas; calcular diez candidatas a poca profundidad sirve de poco.</p>' +
      '<h4>Paso 2: respuestas del rival</h4><p>Para cada candidata, busca la <b>mejor defensa</b> del rival, no la que te gustaría que jugara. Las jugadas forzadas (recapturas, respuestas a un jaque) hacen el árbol estrecho y fácil de recorrer; por eso las combinaciones con jaques se calculan con más seguridad.</p>' +
      '<h4>Paso 3: visualizar</h4><p>Al final de cada rama debes «ver» la posición: dónde está cada pieza y qué casillas controla. Un truco útil es nombrar en voz baja las piezas que se han movido y las líneas que se han abierto. La visualización se entrena con ejercicios a ciegas y resolviendo problemas sin mover las piezas.</p>' +
      '<h4>Paso 4: evaluar</h4><p>Cuando la rama termina (no quedan jugadas forzadas), evalúa: material, seguridad del rey, actividad de las piezas. No hace falta calcular hasta el mate: basta con llegar a una posición tranquila que puedas juzgar con criterio.</p>' +
      '<h4>Comprobación final</h4><p>Antes de jugar, repasa la variante principal buscando un jaque o una jugada intermedia del rival que se te haya escapado. Es el momento en que se detectan la mayoría de errores.</p>',
    keyPoints: [
      'Recorre cada rama hasta el final antes de saltar a otra.',
      'Busca siempre la mejor defensa del rival, no la que te conviene.',
      'Las jugadas forzadas estrechan el árbol: por eso se calculan mejor.',
      'Termina el cálculo en una posición tranquila y evalúala; luego repasa la línea.'
    ],
    positions: [
      {
        fen: '3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13', orientation: 'white',
        caption: 'Morphy contra el duque de Brunswick y el conde Isouard (París, 1858). Una variante forzada de nueve jugadas hasta el mate.',
        line: ['Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#'],
        comments: ['Captura el caballo, que estaba clavado por el alfil de b5.', 'La torre recaptura y queda clavada a su vez.', 'Otra pieza a la columna d: ahora d7 está atacada dos veces.', 'La dama sale de la clavada del alfil de g5 y ofrece el cambio en b3.', 'Se cambia el atacante; el caballo debe recapturar.', 'El caballo de d7 es ahora lo único que tapa la columna d.', '¡Sacrificio de dama para desviar al caballo!', 'Forzado.', 'Mate: el alfil de g5 protege la torre y cubre e7; f7 y f8 están ocupadas por piezas negras. Hay que visualizar este final desde la jugada 13.'],
        arrows: [['d1', 'd8', 'r'], ['b3', 'b8', 'r']]
      },
      {
        fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9', orientation: 'white',
        caption: 'Réti contra Tartakower (Viena, 1910). El árbol tiene dos ramas tras el jaque doble.',
        line: ['Qd8+', 'Kxd8', 'Bg5+', 'Kc7', 'Bd8#'],
        comments: ['¡Sacrificio de dama! El rey debe capturar.', 'Forzado.', 'Jaque doble del alfil y la torre de d1. Rama A: 10...Ke8 11.Rd8#. Rama B: la jugada de la partida.', 'El rey escapa a c7…', '…y el alfil da mate: b8, c8, b7 y c6 están ocupadas por piezas negras, b6 queda en la diagonal del alfil y d6 y d7 las cubre la torre.'],
        arrows: [['d1', 'd8', 'r'], ['g5', 'd8', 'g']]
      }
    ]
  }
);
