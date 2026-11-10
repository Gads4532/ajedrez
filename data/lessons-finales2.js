/* Finales II: peones contra rey, mates con dos piezas, finales de torres prácticos, piezas menores, fortalezas y zugzwang — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(
  {
    id: 'f2-rey-peon-rey', area: 'final', category: 'Finales de peones',
    title: 'Rey y peón contra rey: la regla completa', level: 'principiante',
    summary: 'Cuándo gana y cuándo es tablas el final más básico de todos, incluido el caso especial del peón de torre.',
    html: '<p>Rey y peón contra rey es el ladrillo con el que se construyen todos los finales de peones. Si dominas sus reglas, sabrás de antemano si un cambio de piezas te lleva a una victoria o a unas tablas.</p>' +
      '<h4>La regla para peones de caballo, alfil, dama y rey</h4>' +
      '<ul><li><b>Rey en sexta delante de su peón</b> (o al lado): gana siempre, mueva quien mueva. Si tu rey está en la sexta fila por delante del peón, el rival no puede impedir que llegues a la séptima.</li>' +
      '<li>Con el rey en quinta o más atrás, decide la <b>oposición</b>: el rey atacante debe ganar una de las casillas clave (las tres casillas dos filas por delante del peón, mientras este no pase de la cuarta fila).</li>' +
      '<li>El rey defensor que se coloca delante del peón y mantiene la oposición hace tablas: el final termina en ahogado con el peón en séptima.</li></ul>' +
      '<h4>Cómo defiende el bando débil</h4>' +
      '<p>El defensor retrocede <b>en línea recta</b> delante del peón (por ejemplo <span class="mv">Ke8</span> y no <span class="mv">Kf8</span>), y cuando el rey atacante llega a la sexta toma la oposición frente a él. Si se va hacia un lado, el atacante gana la oposición y corona.</p>' +
      '<h4>El peón de torre: la gran excepción</h4>' +
      '<p>Con un peón de torre basta con que el rey defensor llegue a la esquina de coronación: no hay manera de expulsarlo y todo termina en ahogado. Incluso es suficiente que el rey defensor alcance la columna del alfil (f8 contra un peón de h, c8 contra uno de a), porque desde allí encierra al rey atacante o vuelve a la esquina. El atacante solo gana si su rey controla la casilla de coronación antes de que llegue el defensor, por ejemplo con el rey en g7 contra un peón de h.</p>' +
      '<p>Consejo práctico: antes de cambiar la última pieza, cuenta si tu rey llega a la sexta delante del peón o si el rival puede tomar la oposición.</p>',
    keyPoints: ['Rey en sexta delante del peón (no de torre): gana siempre.', 'El defensor retrocede en línea recta y toma la oposición en el último momento.', 'Peón de torre: si el rey defensor llega a la esquina, tablas.', 'Con peón de torre el atacante necesita controlar la casilla de coronación con su rey.'],
    positions: [
      { fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1', orientation: 'white', caption: 'Rey en sexta delante del peón: gana aunque no tenga la oposición.',
        line: ['Kd6', 'Kd8', 'e6', 'Ke8', 'e7', 'Kf7', 'Kd7'],
        comments: ['El rey se coloca al lado del peón.', 'El negro intenta tomar la oposición.', 'El peón avanza con el rey protegiendo d7 y f7.', '', 'El peón llega a séptima con jaque imposible de evitar.', 'Única jugada.', 'El rey controla e8: el peón corona.'],
        highlights: ['e6'] },
      { fen: '8/4k3/8/4K3/4P3/8/8/8 w - - 0 1', orientation: 'white', caption: 'El defensor mantiene la oposición y retrocede en línea recta: tablas.',
        line: ['Kd5', 'Kd7', 'e5', 'Ke7', 'e6', 'Ke8', 'Kd6', 'Kd8', 'e7+', 'Ke8', 'Ke6'],
        comments: ['', 'Oposición: frente al rey blanco.', '', 'Delante del peón.', '', '¡Recto hacia atrás! Kd8 o Kf8 perderían.', '', 'Toma la oposición.', '', '', 'Ahogado: tablas.'] },
      { fen: '7k/8/6K1/7P/8/8/8/8 w - - 0 1', orientation: 'white', caption: 'Peón de torre con el rey negro en la esquina: no hay forma de ganar.',
        line: ['h6', 'Kg8', 'h7+', 'Kh8', 'Kh6'],
        comments: ['', 'El rey vuelve a g8 y h8 sin cesar.', '', '', 'Ahogado. Cualquier otra jugada permite al negro seguir oscilando.'],
        highlights: ['h8'] }
    ],
    practice: { fen: '8/8/3k4/8/3K4/8/3P4/8 w - - 0 1', goal: 'ganar', side: 'w', text: 'Tu rey ya ocupa una casilla clave (d4). Corona el peón sin permitir el ahogado.' }
  },
  {
    id: 'f2-peones-contra-rey', area: 'final', category: 'Finales de peones',
    title: 'Peones contra el rey: cuándo el rey puede pararlos', level: 'intermedio',
    summary: 'Los peones conectados y los peones muy separados se defienden solos; los peones doblados, no.',
    html: '<p>Un rey solo frente a dos peones tiene una tarea más difícil de lo que parece. La clave es entender cuándo los peones <b>se defienden a sí mismos</b> y cuándo el rey puede comérselos uno a uno.</p>' +
      '<h4>Peones conectados</h4>' +
      '<p>Si un peón protege al otro, el rey no puede capturar el de delante. Y si intenta capturar el de atrás, el delantero sale corriendo y escapa de su cuadrado. Por ejemplo, con peones en e6 y f5 el rey negro no puede tomar en f5: tras <span class="mv">Kxf5</span>, <span class="mv">e7</span> corona. Mientras tanto, el rey propio, que tiene jugadas libres, se acerca tranquilamente y decide.</p>' +
      '<h4>Peones separados</h4>' +
      '<p>Si los peones están lejos uno del otro (tres columnas o más de separación), el rey defensor no puede vigilar los dos a la vez: cuando captura uno, el otro ya está fuera de su alcance. Esta es la idea del peón pasado alejado aplicada a dos peones.</p>' +
      '<h4>Peones doblados</h4>' +
      '<p>Los peones doblados no se protegen entre sí. Un rey bien colocado delante de ellos suele comérselos, o al menos bloquearlos sin dificultad.</p>' +
      '<h4>El factor tiempo</h4>' +
      '<p>Casi siempre el bando de los peones tiene jugadas de rey de reserva, y el rey defensor no puede esperar indefinidamente. Si los peones estuvieran obligados a moverse (sin otras jugadas), la historia cambiaría: avanzarían y quedarían desprotegidos. Por eso, en estos finales, conviene contar los tiempos de reserva de ambos bandos.</p>' +
      '<p>Resumen práctico: antes de entrar en un final así, pregúntate si tus peones se protegen solos y si tu rey puede llegar a tiempo para apoyarlos.</p>',
    keyPoints: ['Peones conectados: el rey no puede tomar el de atrás porque el delantero corona.', 'Peones muy separados: el rey no puede vigilarlos a la vez.', 'Peones doblados: son presa fácil para el rey.', 'Las jugadas de reserva del rey propio deciden.'],
    positions: [
      { fen: '8/4k3/4P3/5P2/8/8/8/K7 w - - 0 1', orientation: 'white', caption: 'Los peones e6-f5 se defienden solos mientras el rey blanco viaja desde a1.',
        line: ['Kb2', 'Kd6', 'Kc3', 'Ke7', 'Kd4', 'Kd6', 'Ke4', 'Ke7', 'Ke5', 'Ke8', 'f6', 'Kf8', 'Kd6', 'Ke8', 'f7+', 'Kf8', 'Kd7', 'Kg7', 'e7', 'Kxf7', 'e8=Q+'],
        comments: ['El rey blanco se pone en marcha.', 'El rey negro no puede capturar nada: si alguna vez toma en f5, e7 corona.', '', '', '', '', '', '', 'El rey llega a apoyar a sus peones.', '', '', '', '', '', '', '', 'El rey protege e8.', '', '', '', 'Corona con jaque.'],
        arrows: [['e6', 'e8', 'g']] },
      { fen: '8/8/4k3/8/2P3P1/8/8/K7 b - - 0 1', orientation: 'white', caption: 'Peones separados por tres columnas: el rey negro no puede con los dos.',
        line: ['Kf6', 'c5', 'Ke6', 'g5', 'Kd5', 'c6', 'Kd6', 'g6', 'Kc7', 'g7', 'Kxc6', 'g8=Q'],
        comments: ['', '', '', '', '', '', '', '', 'Va por el peón de c...', '', '...pero el de g ya está fuera de su alcance.', 'Corona.'] },
      { fen: '8/8/8/5k2/5P2/5P2/8/K7 b - - 0 1', orientation: 'white', caption: 'Peones doblados: no se protegen entre sí y el rey negro los captura.',
        line: ['Kxf4', 'Kb2', 'Kxf3'],
        comments: ['f4 no tenía protección.', '', 'Y cae el segundo: tablas.'] }
    ],
    practice: { fen: '8/4k3/4P3/5P2/8/8/8/K7 w - - 0 1', goal: 'ganar', side: 'w', text: 'Tus peones se defienden solos. Trae el rey y corona.' }
  },
  {
    id: 'f2-dos-alfiles', area: 'final', category: 'Mates básicos',
    title: 'Mate con dos alfiles', level: 'intermedio',
    summary: 'Los dos alfiles juntos forman una barrera diagonal que empuja al rey a cualquier esquina.',
    html: '<p>Rey y dos alfiles contra rey es un mate forzado en menos de veinte jugadas desde cualquier posición. Es menos frecuente que el de torre o dama, pero enseña algo valioso: cómo coordinar piezas de alcance largo con el rey.</p>' +
      '<h4>La barrera de los alfiles</h4>' +
      '<p>Dos alfiles colocados uno al lado del otro (por ejemplo en d3 y e3, o en e4 y f4) controlan dos diagonales vecinas y forman una <b>pared</b> que el rey contrario no puede cruzar. A diferencia del mate de alfil y caballo, aquí sirve cualquier esquina.</p>' +
      '<h4>El método en tres pasos</h4>' +
      '<ol><li><b>Centraliza el rey y los alfiles</b> juntos. El rey propio es imprescindible: los alfiles solos no pueden dar mate.</li>' +
      '<li><b>Reduce la caja</b>: cada vez que el rey rival retrocede, avanza un alfil o tu rey para quitarle más espacio, siempre manteniendo los alfiles protegidos o fuera del alcance del rey.</li>' +
      '<li><b>Mate en la esquina</b>: con el rey rival en la esquina, tu rey en diagonal a dos casillas (por ejemplo rey en g6 contra rey en h8), un alfil cubre la casilla de escape y el otro da el jaque final.</li></ol>' +
      '<h4>Cuidado con el ahogado</h4>' +
      '<p>En la fase final, el rey defensor suele tener una o dos casillas. Si un alfil quita la última sin dar jaque, es ahogado. Antes de cada jugada en la esquina, cuenta qué casillas le quedan al rey rival.</p>' +
      '<h4>Patrón final</h4>' +
      '<p>El mate típico: rey negro en h8, rey blanco en g6, un alfil en la diagonal a2-g8 controlando g8 y el otro dando jaque por la gran diagonal a1-h8.</p>',
    keyPoints: ['Los alfiles juntos forman una pared diagonal.', 'Sirve cualquier esquina.', 'El rey propio colabora siempre.', 'Atención al ahogado en la fase final.'],
    positions: [
      { fen: '5k2/8/4K3/8/4BB2/8/8/8 w - - 0 1', orientation: 'white', caption: 'El rey negro ya está en la última fila: los alfiles lo llevan a la esquina.',
        line: ['Bg5', 'Ke8', 'Bc6+', 'Kf8', 'Bh6+', 'Kg8', 'Be4', 'Kh8', 'Kf6', 'Kg8', 'Kg6', 'Kh8', 'Bg7+', 'Kg8', 'Bd5#'],
        comments: ['Quita e7 y prepara la red.', '', 'Jaque que expulsa al rey de la columna e.', '', '', 'El rey ya está casi en la esquina.', 'Jugada tranquila: el alfil vigila h7 y deja una casilla libre para evitar el ahogado.', '', 'El rey blanco se acerca.', '', 'Rey en g6: la posición de mate.', '', 'Jaque que obliga a volver a g8.', '', 'Mate: d5 cubre g8 y f7, el otro alfil controla f8 y h8.'] },
      { fen: '6k1/8/5K2/8/8/3BB3/8/8 w - - 0 1', orientation: 'white', caption: 'Patrón de mate: rey a distancia de salto de caballo y los alfiles rematan.',
        line: ['Bc5', 'Kh8', 'Kg6', 'Kg8', 'Bc4+', 'Kh8', 'Bd4#'],
        comments: ['El alfil quita f8.', 'Única casilla.', 'El rey se coloca en g6.', '', 'Jaque desde la diagonal a2-g8.', '', 'Mate por la gran diagonal.'] }
    ],
    practice: { fen: '8/8/5k2/8/8/3BB3/8/5K2 w - - 0 1', goal: 'mate', side: 'w', text: 'Da mate con los dos alfiles: forma la barrera, reduce la caja y evita el ahogado.' }
  },
  {
    id: 'f2-dos-torres', area: 'final', category: 'Mates básicos',
    title: 'Mate con dos torres: la escalera', level: 'principiante',
    summary: 'Una torre corta una fila y la otra da jaque en la siguiente: el rey sube peldaño a peldaño hasta el borde.',
    html: '<p>El mate con dos torres (o con dama y torre) es el más sencillo de todos y no necesita la ayuda del rey. Se le llama <b>la escalera</b> o el mate del <b>rodillo</b>, porque las torres avanzan alternándose como si subieran peldaños.</p>' +
      '<h4>El mecanismo</h4>' +
      '<ol><li>Una torre <b>corta</b> al rey en una fila (o columna), impidiéndole retroceder.</li>' +
      '<li>La otra torre da <b>jaque en la fila siguiente</b>: el rey tiene que avanzar hacia el borde.</li>' +
      '<li>Ahora la torre que daba jaque corta, y la primera salta a la fila siguiente con jaque. Se repite hasta la última fila.</li></ol>' +
      '<h4>El único peligro: que el rey ataque una torre</h4>' +
      '<p>Si el rey rival se acerca a la torre que va a moverse, no la pongas a su alcance. La solución es llevarla al <b>extremo opuesto</b> del tablero (por ejemplo, de la columna h a la columna a o c), donde sigue controlando la misma fila pero el rey no puede tocarla. Las torres deben estar en columnas distintas para no estorbarse.</p>' +
      '<h4>Consejos</h4>' +
      '<ul><li>Antes de empezar, coloca las torres lejos del rey rival.</li>' +
      '<li>Comprueba siempre que el rey no puede capturar la torre que da jaque.</li>' +
      '<li>El mismo método sirve con dama y torre, e incluso con dos damas.</li></ul>' +
      '<p>Este patrón aparece con frecuencia en el medio juego: dos piezas pesadas que se alternan en filas consecutivas contra un rey en el borde son un motivo táctico muy común.</p>',
    keyPoints: ['Una torre corta y la otra da jaque en la fila siguiente.', 'Las torres se alternan como peldaños.', 'Si el rey se acerca, lleva la torre al otro lado.', 'No hace falta el rey propio.'],
    positions: [
      { fen: '8/8/8/6k1/R7/8/8/1R5K w - - 0 1', orientation: 'white', caption: 'La torre de a4 corta la cuarta fila; la de b1 sube con jaque.',
        line: ['Rb5+', 'Kf6', 'Ra6+', 'Ke7', 'Rb7+', 'Kd8', 'Ra8#'],
        comments: ['Primer peldaño: jaque en la quinta.', '', 'Segundo peldaño: la torre de a4 salta a la sexta.', '', 'Tercer peldaño.', '', 'Mate en la última fila.'],
        arrows: [['b1', 'b5', 'g'], ['a4', 'a6', 'g']] },
      { fen: '8/8/8/4k3/8/8/8/R3K2R w - - 0 1', orientation: 'white', caption: 'Cuando el rey amenaza una torre, esta se va al otro extremo.',
        line: ['Rh5+', 'Kf6', 'Ra6+', 'Kg7', 'Rc5', 'Kg8', 'Rc7', 'Kf8', 'Ra8#'],
        comments: ['', '', '', 'El rey se acerca a la torre de h5.', 'La torre cambia de lado: sigue cortando la quinta fila, lejos del rey.', '', 'Corta la séptima.', '', 'Mate.'] }
    ],
    practice: { fen: '8/8/8/4k3/8/8/8/R3K2R w - - 0 1', goal: 'mate', side: 'w', text: 'Da mate con la escalera de torres sin dejar que el rey negro alcance ninguna.' }
  },
  {
    id: 'f2-dos-caballos', area: 'final', category: 'Mates básicos',
    title: 'Material insuficiente: por qué dos caballos no fuerzan el mate', level: 'intermedio',
    summary: 'Con rey y dos caballos el mate existe, pero el defensor siempre puede evitarlo: el último jaque llega tarde o provoca ahogado.',
    html: '<p>Rey y dos caballos contra rey solo es una de las curiosidades más instructivas del ajedrez: hay posiciones de mate, pero <b>no se pueden forzar</b> contra una defensa correcta. Por eso, en la práctica, es tablas.</p>' +
      '<h4>Por qué falla</h4>' +
      '<p>Para dar mate en la esquina, un caballo debe cubrir la casilla de escape y el otro dar el jaque final. El problema es de tiempos: si el caballo que cubre la escapatoria llega <b>antes</b> que el que da jaque, el rey defensor se queda sin jugadas y es <b>ahogado</b>. Si llega <b>después</b>, el rey tiene tiempo de salir de la esquina. No hay jugada de espera que arregle esto, porque el rey defensor nunca está obligado a meterse en la esquina equivocada.</p>' +
      '<h4>El error del defensor</h4>' +
      '<p>El mate solo llega si el defensor colabora, eligiendo la casilla del rincón cuando tenía otra disponible. Ante un jaque de caballo, busca siempre la casilla que te aleje de la esquina.</p>' +
      '<h4>Otros finales sin mate forzado</h4>' +
      '<ul><li><b>Rey y alfil</b> o <b>rey y caballo</b> contra rey: no existe ninguna posición de mate; el reglamento declara tablas.</li>' +
      '<li><b>Torre y alfil contra torre</b>: aunque hay posiciones ganadoras concretas, con una defensa precisa suele ser tablas, y en partidas de torneo muchas veces se llega al límite de las cincuenta jugadas.</li></ul>' +
      '<h4>La paradoja de los dos caballos</h4>' +
      '<p>Curiosamente, si el bando débil tiene un peón, a veces los dos caballos <b>sí</b> ganan: el peón da al defensor jugadas que evitan el ahogado. Es un final avanzado (estudiado por Troitzky) que basta conocer de oídas.</p>',
    keyPoints: ['Dos caballos no pueden forzar el mate.', 'El último jaque o llega tarde o provoca ahogado.', 'El defensor evita siempre la casilla de la esquina.', 'Torre y alfil contra torre también suele ser tablas.'],
    positions: [
      { fen: '7k/8/6K1/4NN2/8/8/8/8 w - - 0 1', orientation: 'white', caption: 'Si el caballo cubre g8 antes del jaque, el negro queda ahogado.',
        line: ['Ne7'],
        comments: ['¡Ahogado! El rey negro no tiene jugadas y no está en jaque.'],
        highlights: ['g8', 'g7', 'h7'] },
      { fen: '6k1/8/6K1/4NN2/8/8/8/8 w - - 0 1', orientation: 'white', caption: 'Solo hay mate si el defensor elige mal.',
        line: ['Ne7+', 'Kh8', 'Nf7#'],
        comments: ['Jaque. El negro debe elegir entre f8 y h8.', 'Grave error: Kf8 mantenía las tablas sin problemas.', 'Mate: f7 da jaque y e7 cubre g8.'] }
    ],
    practice: { fen: '8/8/8/4k3/8/8/8/1N2KN2 b - - 0 1', goal: 'tablas', side: 'b', text: 'Defiende con el rey solo: mantente lejos de las esquinas y no caigas en el mate.' }
  },
  {
    id: 'f2-torre-activa', area: 'final', category: 'Finales de torres',
    title: 'La torre activa: la regla de Tarrasch en la práctica', level: 'intermedio',
    summary: 'En los finales de torres la actividad vale tanto como un peón: torre en séptima, torre que corta al rey y torre detrás del pasado.',
    html: '<p>La regla de Tarrasch (las torres van detrás de los peones pasados) es solo una cara de un principio más amplio: <b>la torre necesita actividad</b>. Una torre que ataca, corta o presiona vale casi siempre más que un peón; una torre pasiva, atada a defender, pierde partidas.</p>' +
      '<h4>Tres formas de activar la torre</h4>' +
      '<ul><li><b>La séptima fila</b>: desde allí la torre ataca los peones que aún no han avanzado y encierra al rey en la octava.</li>' +
      '<li><b>Cortar al rey</b>: una torre en una columna (o fila) que el rey rival no puede cruzar vale tanto como una pieza extra. Con el rey defensor cortado dos columnas o más del peón, rey, torre y peón suelen ganar.</li>' +
      '<li><b>Detrás del peón pasado</b>: detrás del propio, la torre apoya cada avance; detrás del rival, lo frena sin perder movilidad.</li></ul>' +
      '<h4>Cómo aplicarla en tus partidas</h4>' +
      '<ol><li>Antes de defender un peón con la torre, pregúntate si puedes contraatacar otro.</li>' +
      '<li>Si vas a perder un peón, que sea a cambio de activar la torre: muchas veces lo recuperas enseguida.</li>' +
      '<li>Activa la torre <b>antes</b> que el rey cuando el rey rival esté a punto de entrar; luego el rey.</li></ol>' +
      '<h4>El error típico</h4>' +
      '<p>Defender pasivamente en la octava fila con la torre mirando un peón. El rival activa su rey, crea un segundo objetivo y la defensa se desmorona por falta de piezas libres.</p>',
    keyPoints: ['La actividad de la torre vale tanto como un peón.', 'Séptima fila, cortar al rey y torre detrás del pasado.', 'Prefiere contraatacar a defender pasivamente.', 'Con el rey rival cortado dos columnas, el peón suele coronar.'],
    positions: [
      { fen: '5rk1/R4ppp/1p6/8/8/6P1/5P1P/6K1 w - - 0 1', orientation: 'white', caption: 'Con un peón de menos, la torre activa en séptima recupera el material.',
        line: ['Rb7', 'g6', 'Rxb6', 'Ra8', 'Kg2', 'Kg7'],
        comments: ['La torre ataca b6 desde la séptima.', 'El negro prefiere dar aire a su rey.', 'Material igualado; la torre blanca sigue activa.', 'La torre negra busca actividad.', '', 'Posición igualada: la actividad compensó el peón.'] },
      { fen: '7r/8/8/1k6/4P3/4K3/8/3R4 w - - 0 1', orientation: 'white', caption: 'La torre de d1 corta al rey negro: el peón avanza sin oposición.',
        line: ['e5', 'Rf8', 'Rc1', 'Ka4', 'Ke4', 'Kb5', 'e6'],
        comments: ['El peón avanza.', 'La torre negra intenta molestar desde f8.', 'La torre corta ahora por la columna c, más cerca del rey negro.', '', 'El rey acompaña al peón.', '', 'El rey negro sigue cortado y el peón progresa.'],
        arrows: [['d1', 'd8', 'b']] }
    ]
  },
  {
    id: 'f2-defensa-lateral', area: 'final', category: 'Finales de torres',
    title: 'Defensa corta y defensa larga: jaques laterales y frontales', level: 'avanzado',
    summary: 'El rey defensor va al lado corto y la torre al lado largo para dar jaques laterales desde lejos.',
    html: '<p>Cuando el rey defensor ya no puede ponerse delante del peón y la posición de Philidor no es posible, aún queda una defensa muy práctica: los <b>jaques laterales</b>. Su éxito depende de una idea geométrica sencilla.</p>' +
      '<h4>Lado corto y lado largo</h4>' +
      '<p>El peón divide el tablero en dos lados. Con un peón de f, el lado corto es el de las columnas g y h; el lado largo, el de las columnas a a e. La regla es: <b>el rey defensor al lado corto, la torre al lado largo</b>.</p>' +
      '<h4>La distancia de jaque</h4>' +
      '<p>Para que los jaques laterales funcionen, la torre debe estar al menos a <b>tres columnas</b> del peón. Si está más cerca, el rey atacante se acerca a la torre, la ataca y los jaques se acaban. Desde el lado largo hay espacio suficiente; desde el lado corto, casi nunca.</p>' +
      '<h4>La defensa frontal</h4>' +
      '<p>Otra opción es la torre <b>delante</b> del peón, dando jaques desde la fila de coronación o vigilando su avance desde lejos. Funciona bien cuando el peón está todavía en la mitad del tablero y el rey defensor está cortado por solo una columna; en cambio, cuando el peón llega a la quinta o sexta con su rey delante, la defensa frontal suele quedarse corta y hay que pasar a los jaques laterales.</p>' +
      '<h4>Resumen</h4>' +
      '<ul><li>Si puedes, Philidor (tercera fila).</li><li>Si no, rey al lado corto y torre al lado largo.</li><li>Jaques laterales desde tres columnas o más.</li><li>Si el rey defensor está en el lado largo, la torre no tiene espacio y suele perderse.</li></ul>',
    keyPoints: ['Rey defensor al lado corto, torre al lado largo.', 'Distancia mínima de tres columnas entre torre y peón.', 'Una torre demasiado cerca es atacada por el rey.', 'La defensa frontal sirve sobre todo con el peón aún atrasado.'],
    positions: [
      { fen: '6k1/4R3/5K2/5P2/8/8/8/r7 b - - 0 1', orientation: 'white', caption: 'Defensa correcta: rey en el lado corto (g8) y torre en el lado largo (columna a).',
        line: ['Ra6+', 'Re6', 'Ra2', 'Re8+', 'Kh7', 'Re5', 'Kg8'],
        comments: ['Jaque lateral desde lejos: el rey blanco no puede acercarse a la torre.', 'El blanco interpone la torre para frenar los jaques.', 'La torre vuelve a la columna a, lista para seguir dando jaques.', '', '', '', 'El negro mantiene la defensa: tablas con juego correcto.'] },
      { fen: '4k3/R7/5K2/5P2/8/8/8/7r b - - 0 1', orientation: 'white', caption: 'Defensa equivocada: el rey está en el lado largo y la torre no tiene distancia.',
        line: ['Rh6+', 'Kg7', 'Rh3', 'Ra8+', 'Kd7', 'f6'],
        comments: ['El jaque desde la columna h está demasiado cerca...', '...y el rey blanco ataca la torre: se acabaron los jaques.', '', 'Jaque desde atrás para alejar al rey negro.', '', 'El peón avanza: el blanco gana.'] }
    ]
  },
  {
    id: 'f2-peon-torre-torres', area: 'final', category: 'Finales de torres',
    title: 'El peón de torre en los finales de torres', level: 'intermedio',
    summary: 'Con el peón de torre en séptima y la torre atacante delante, el defensor hace tablas con el rey en g7/h7 y su torre detrás del peón.',
    html: '<p>El peón de torre es el más difícil de convertir en los finales de torres. La posición más típica es esta: peón en séptima, la torre atacante <b>delante</b> de él (en la casilla de coronación) y la torre defensora <b>detrás</b>, en la columna del peón.</p>' +
      '<h4>Por qué es tablas</h4>' +
      '<ul><li>La torre atacante no puede moverse sin dejar el peón indefenso, porque la torre rival lo captura.</li>' +
      '<li>El rey atacante tampoco encuentra refugio: si se acerca al peón, recibe jaques desde atrás o desde el lado; si se esconde en b7, el peón ya no puede avanzar y la torre se libera para hostigarlo.</li></ul>' +
      '<h4>Las casillas exactas del rey defensor</h4>' +
      '<p>El rey defensor debe estar en <b>g7 o h7</b> (contra un peón de a). Ahí cubre la casilla h7 o h8 que necesita el truco atacante. En cualquier otra casilla de la séptima fila, como f7 o e7, existe una celada: la torre se aparta a h8, y si el defensor captura el peón, un jaque en la séptima <b>ensarta</b> al rey y la torre.</p>' +
      '<h4>Consejos prácticos</h4>' +
      '<ul><li>Defensor: torre detrás del peón y rey en g7/h7; no te muevas de ahí sin motivo.</li>' +
      '<li>Atacante: si el rey rival está mal colocado, busca la jugada de torre que deja paso al peón con la amenaza de ensarte.</li>' +
      '<li>Si el peón aún está en sexta, el defensor puede usar la posición de Vancura (torre atacando de lado).</li></ul>',
    keyPoints: ['Peón de a en séptima con la torre delante: tablas si el rey defensor está en g7/h7.', 'La torre defensora va detrás del peón.', 'Con el rey en otra casilla, el truco del ensarte gana.', 'El peón de torre es el más difícil de convertir.'],
    positions: [
      { fen: 'R7/P5k1/8/8/8/8/r7/6K1 w - - 0 1', orientation: 'white', caption: 'Rey negro en g7, torre detrás del peón: tablas.',
        line: ['Kf1', 'Kh7', 'Ke1', 'Kg7', 'Kd1', 'Kh7', 'Kc1', 'Kg7', 'Kb1', 'Ra6', 'Kc2', 'Ra2+'],
        comments: ['El rey blanco se acerca al peón.', 'El negro se limita a oscilar entre g7 y h7.', '', '', '', '', '', '', 'El rey ataca la torre...', '...que se retira sin dejar la columna a.', '', 'Y los jaques empiezan: el rey blanco no tiene refugio.'] },
      { fen: 'R7/P4k2/8/8/8/8/r7/6K1 w - - 0 1', orientation: 'white', caption: 'Rey negro en f7: la celada del ensarte gana.',
        line: ['Rh8', 'Rxa7', 'Rh7+', 'Ke6', 'Rxa7'],
        comments: ['La torre se aparta: amenaza a8=Q.', 'Si el negro captura...', '...el jaque en la séptima ensarta rey y torre.', '', 'El blanco gana la torre. Los jaques del negro en lugar de 1...Rxa7 solo retrasan el final.'],
        arrows: [['h7', 'a7', 'r']] }
    ]
  },
  {
    id: 'f2-torre-dos-peones', area: 'final', category: 'Finales de torres',
    title: 'Torre y dos peones contra torre: ideas básicas', level: 'intermedio',
    summary: 'Dos peones conectados casi siempre ganan; los peones de f y h o los doblados pueden ser tablas.',
    html: '<p>Con dos peones de ventaja en un final de torres, la victoria suele ser cuestión de técnica, pero no siempre. La estructura de los peones decide.</p>' +
      '<h4>Peones conectados</h4>' +
      '<p>Dos peones conectados ganan casi siempre. Se protegen mutuamente, el rey los escolta y la torre corta al rey rival. El plan es sencillo: <b>corta al rey contrario</b> con la torre, acerca el rey y avanza los peones juntos, de modo que nunca queden atacados sin protección. Si se llega a la sexta fila con ambos peones, a menudo ganan incluso contra una torre sola, porque la torre no puede detener a los dos a la vez.</p>' +
      '<h4>Peones separados</h4>' +
      '<p>Dos peones separados también suelen ganar, porque obligan al defensor a vigilar dos frentes. El atacante puede incluso sacrificar uno para llegar a una posición de Lucena con el otro.</p>' +
      '<h4>Las excepciones</h4>' +
      '<ul><li><b>Peones de f y h</b>: son la pareja más famosa por sus tablas. Con el rey defensor delante del peón de h y la torre activa, el atacante a menudo no puede progresar.</li>' +
      '<li><b>Peones doblados</b>: con frecuencia equivalen a un solo peón.</li>' +
      '<li><b>Torre defensora muy activa</b>: si el atacante tiene la torre pasiva y el rey expuesto, los jaques pueden durar para siempre.</li></ul>' +
      '<h4>Consejo práctico</h4>' +
      '<p>Antes de capturar un segundo peón, mira qué estructura quedará: a veces es mejor mantener la presión que conseguir un par de peones de f y h.</p>',
    keyPoints: ['Dos peones conectados ganan casi siempre.', 'Corta al rey contrario y avanza los peones juntos.', 'Dos peones conectados en sexta pueden vencer a la torre sola.', 'Peones de f y h y peones doblados: riesgo de tablas.'],
    positions: [
      { fen: 'r7/8/8/2k5/4PP2/4K3/8/5R2 w - - 0 1', orientation: 'white', caption: 'Peones conectados: la torre corta al rey negro y los peones avanzan.',
        line: ['Rd1', 'Ra3+', 'Rd3', 'Ra1', 'e5', 'Re1+', 'Kf2', 'Rh1', 'e6', 'Rh2+', 'Kg3', 'Re2', 'f5'],
        comments: ['La torre corta al rey por la columna d.', '', 'La torre se interpone y sigue cortando.', '', 'Los peones avanzan.', '', '', '', '', '', 'El rey ataca la torre.', '', 'Los peones, juntos, son imparables.'] },
      { fen: '8/k7/5PP1/8/8/2K5/8/7r b - - 0 1', orientation: 'white', caption: 'Dos peones conectados en sexta vencen a la torre sola.',
        line: ['Kb7', 'g7', 'Rg1', 'f7', 'Rxg7', 'f8=Q'],
        comments: ['El rey negro está demasiado lejos.', '', 'La torre detiene un peón...', '...pero el otro avanza.', '', 'Corona: dama contra torre gana.'] }
    ]
  },
  {
    id: 'f2-caballo-peones', area: 'final', category: 'Finales de piezas menores',
    title: 'Caballo contra peones', level: 'intermedio',
    summary: 'El caballo para bien los peones desde delante, pero es lento a distancia y sufre contra el peón de torre.',
    html: '<p>El caballo es la pieza de corto alcance por excelencia: muy eficaz de cerca y muy lento de lejos. Contra peones pasados conviene saber cuándo llega a tiempo.</p>' +
      '<h4>La mejor forma de parar un peón</h4>' +
      '<p>El caballo detiene un peón cuando controla una casilla <b>delante</b> de él, idealmente la casilla de coronación. Una vez allí, aunque el rey rival se acerque, el caballo puede seguir vigilando la casilla o, en el peor caso, entregarse por el peón: un final sin peones con solo un rey y un caballo es tablas.</p>' +
      '<h4>El problema de la distancia</h4>' +
      '<p>Para recorrer el tablero, el caballo necesita muchas jugadas y no puede "perder tiempos". Un peón que está a dos casillas de coronar puede ser imparable si el caballo necesita tres saltos para llegar. Cuenta siempre los saltos necesarios.</p>' +
      '<h4>El peón de torre</h4>' +
      '<p>El peón de torre es el enemigo natural del caballo. En el borde, el caballo tiene menos casillas para controlar la línea del peón: para cubrir a1 debe estar en b3 o c2, y no hay muchas maneras de llegar a esas casillas a tiempo. Por eso los peones de torre muy avanzados suelen pasar a pesar del caballo.</p>' +
      '<h4>Rey y caballo juntos</h4>' +
      '<p>Con su rey cerca, el caballo detiene casi cualquier peón: el rey se coloca delante y el caballo controla las casillas de su color complementario.</p>' +
      '<ul><li>Coloca el caballo delante del peón.</li><li>Cuenta los saltos antes de confiar en que llega a tiempo.</li><li>Ten mucho cuidado con el peón de torre.</li></ul>',
    keyPoints: ['El caballo para el peón controlando una casilla delante de él.', 'Es lento: cuenta los saltos.', 'Contra el peón de torre tiene pocas casillas útiles.', 'Con el rey propio cerca, para casi cualquier peón.'],
    positions: [
      { fen: 'K7/8/8/8/4N3/7p/8/k7 b - - 0 1', orientation: 'white', caption: 'El caballo llega a g3 y controla h1: el peón no corona.',
        line: ['h2', 'Ng3', 'Kb2', 'Kb7', 'Kc3', 'Kc6'],
        comments: ['', 'Desde g3 el caballo vigila h1.', 'El rey negro acude en ayuda del peón...', '...y el blanco también trae su rey.', '', 'Tablas: el caballo resiste o se entrega por el peón.'],
        highlights: ['h1'] },
      { fen: '7K/8/8/6N1/8/p7/8/7k b - - 0 1', orientation: 'white', caption: 'Peón de torre y caballo lejano: no llega.',
        line: ['a2', 'Ne4', 'a1=Q'],
        comments: ['', 'Para controlar a1 el caballo tendría que estar en b3 o c2: le faltan saltos.', 'Corona.'],
        highlights: ['b3', 'c2'] }
    ]
  },
  {
    id: 'f2-alfil-caballo', area: 'final', category: 'Finales de piezas menores',
    title: 'Alfil contra caballo en el final: cuándo es mejor cada uno', level: 'intermedio',
    summary: 'Posición abierta y peones en ambos flancos favorecen al alfil; estructura cerrada y alfil malo favorecen al caballo.',
    html: '<p>El alfil y el caballo valen más o menos lo mismo, pero en el final la estructura de peones suele inclinar la balanza con claridad hacia uno de ellos.</p>' +
      '<h4>Cuándo es mejor el alfil</h4>' +
      '<ul><li><b>Peones en los dos flancos</b>: el alfil cambia de flanco en una jugada; el caballo necesita varias.</li>' +
      '<li><b>Posición abierta</b>: el alfil controla diagonales largas y puede vigilar un peón pasado a distancia.</li>' +
      '<li><b>Peones pasados</b>: el alfil detiene un peón desde lejos, mientras que el caballo debe acercarse.</li>' +
      '<li><b>Tiempos de espera</b>: el alfil puede mover sin cambiar lo que controla, algo muy útil en posiciones de zugzwang.</li></ul>' +
      '<h4>Cuándo es mejor el caballo</h4>' +
      '<ul><li><b>Estructura cerrada</b> con cadenas de peones bloqueadas.</li>' +
      '<li><b>Alfil malo</b>: el rival tiene sus peones en casillas del color de su alfil; el caballo ataca esos peones y el alfil no puede defenderlos sin quedar pasivo.</li>' +
      '<li><b>Todos los peones en un solo flanco</b>: la ventaja de alcance del alfil desaparece.</li>' +
      '<li><b>Casillas fuertes</b>: un caballo en una casilla que no puede ser atacada por peones es una pieza dominante.</li></ul>' +
      '<h4>Consejos prácticos</h4>' +
      '<p>Con el alfil, coloca tus peones en casillas del color contrario al de tu alfil y crea juego en ambos flancos. Con el caballo, fija los peones rivales en casillas del color del alfil y busca casillas fuertes.</p>',
    keyPoints: ['Peones en ambos flancos y posición abierta: alfil.', 'Estructura cerrada, alfil malo o un solo flanco: caballo.', 'Pon tus peones en casillas del color contrario a tu alfil.', 'El caballo ama las casillas fuertes.'],
    positions: [
      { fen: '8/p4ppk/1p2n2p/8/8/1P3BPP/P4PK1/8 w - - 0 1', orientation: 'white', caption: 'Peones en los dos flancos y posición abierta: el alfil es superior.',
        line: ['Bd5', 'Nd8', 'Kf3', 'Kg6', 'Ke3', 'Kf6'],
        comments: ['El alfil se centraliza con ganancia de tiempo: ataca al caballo.', 'El caballo retrocede a una casilla pasiva.', 'El rey blanco se centraliza.', '', '', ''] },
      { fen: '2b1k3/1p3p2/p3p1p1/3pP2p/3P3P/P1N3P1/1P3P2/4K3 w - - 0 1', orientation: 'white', caption: 'Alfil malo: todos los peones negros están en casillas claras y no tiene objetivos.',
        line: ['Kd2', 'Bd7', 'Ke3', 'Ke7'],
        comments: ['El rey blanco va al centro.', 'El alfil solo puede moverse detrás de sus propios peones.', '', 'Los peones blancos están en casillas oscuras: el alfil negro no tiene nada que atacar.'] }
    ]
  },
  {
    id: 'f2-centurini', area: 'final', category: 'Finales de piezas menores',
    title: 'Alfil y peón contra alfil del mismo color: ideas de Centurini', level: 'avanzado',
    summary: 'Si el rey defensor está delante del peón, es tablas; si no, el atacante intenta interponer su alfil y desviar al rival.',
    html: '<p>Con alfiles del <b>mismo color</b>, la ventaja de un peón tiene muchas más posibilidades que con alfiles de distinto color, porque el alfil atacante puede disputar las casillas que controla el defensor. Luigi Centurini estudió este final en el siglo XIX; sus ideas se resumen en pocas reglas.</p>' +
      '<h4>Regla 1: el rey defensor delante del peón</h4>' +
      '<p>Si el rey defensor llega a una casilla delante del peón de la que no puede ser expulsado, es tablas. El defensor puede incluso entregar su alfil por el peón cuando le convenga.</p>' +
      '<h4>Regla 2: el alfil defensor solo</h4>' +
      '<p>Si el rey defensor está lejos, todo depende de las <b>diagonales</b> que pasan por la casilla delante del peón. El defensor controla esa casilla con su alfil; el atacante intenta <b>interponer</b> su propio alfil en esa diagonal (normalmente protegido por el rey) para obligar al alfil defensor a cambiar a la otra diagonal.</p>' +
      '<p>Si la otra diagonal es muy <b>corta</b> (como a7-b8 para un peón de caballo que corona en b8), el atacante puede desviar también al alfil de allí: lo ataca con su alfil o su rey y el peón corona. Si ambas diagonales son largas, el defensor siempre encuentra una casilla y la posición es tablas.</p>' +
      '<h4>Consejos prácticos</h4>' +
      '<ul><li>Defensor: la prioridad es llevar el rey delante del peón.</li>' +
      '<li>Atacante: interpón tu alfil en la diagonal larga del defensor y luego desvíalo de la corta.</li>' +
      '<li>Los peones de caballo y de torre son los más peligrosos para el defensor por culpa de las diagonales cortas.</li></ul>',
    keyPoints: ['Rey defensor delante del peón: tablas.', 'El atacante interpone su alfil en la diagonal del defensor.', 'Diagonal corta: el alfil defensor puede ser desviado.', 'Peones de caballo y de torre, los más peligrosos.'],
    positions: [
      { fen: '8/1k6/1P6/2K5/8/8/3B4/6b1 w - - 0 1', orientation: 'white', caption: 'El rey negro bloquea b7: tablas sin discusión.',
        line: ['Kd5', 'Bxb6'],
        comments: ['Si el rey blanco se aparta para buscar otro plan...', '...el alfil negro simplemente captura el peón.'],
        highlights: ['b7'] },
      { fen: '8/7k/1PK5/8/8/4B1b1/8/8 w - - 0 1', orientation: 'white', caption: 'El rey negro está lejos: el blanco interpone su alfil y luego desvía.',
        line: ['Bc5', 'Kg6', 'Bd6', 'Bf2', 'b7', 'Ba7', 'Kc7', 'Kf5', 'Bc5', 'Bxc5', 'b8=Q'],
        comments: ['El alfil se dirige a la diagonal h2-b8.', '', 'Interposición: el alfil negro pierde la diagonal larga.', 'Busca la diagonal corta a7-b8.', '', 'Solo a7 controla b8.', '', '', '¡Desviación! Ataca a7.', 'Si no captura, Bxa7 igualmente.', 'Corona.'],
        arrows: [['c5', 'a7', 'r']] }
    ]
  },
  {
    id: 'f2-fortaleza', area: 'final', category: 'Conceptos',
    title: 'La fortaleza: tablas con menos material', level: 'intermedio',
    summary: 'Una posición en la que el bando superior no puede entrar ni crear objetivos es tablas, aunque tenga una pieza de más.',
    html: '<p>Una <b>fortaleza</b> es una posición defensiva que el rival no puede romper aunque tenga más material. Saber reconocerlas salva muchos medios puntos: cuando la partida parece perdida, buscar una fortaleza es a menudo la mejor esperanza.</p>' +
      '<h4>Los ingredientes</h4>' +
      '<ul><li><b>Sin puntos de entrada</b>: el rey atacante no tiene casillas por las que penetrar.</li>' +
      '<li><b>Sin objetivos</b>: la pieza extra no tiene peones ni casillas que atacar (por ejemplo, un alfil frente a peones fijos en casillas del otro color).</li>' +
      '<li><b>Sin rupturas</b>: el atacante no puede abrir líneas con peones.</li>' +
      '<li><b>Sin zugzwang</b>: el defensor siempre tiene una jugada inofensiva disponible.</li></ul>' +
      '<h4>Fortalezas típicas</h4>' +
      '<ul><li>El rey en la esquina contra un peón de torre (con o sin alfil del color equivocado).</li>' +
      '<li>Alfiles de distinto color con bloqueo de los peones.</li>' +
      '<li>Torre contra alfil con el rey en la esquina buena.</li>' +
      '<li>Cadenas de peones totalmente bloqueadas, donde ningún rey puede cruzar.</li></ul>' +
      '<h4>Cómo construirlas</h4>' +
      '<p>El defensor debe pensar en <b>estructuras</b>, no en jugadas: fijar los peones en el color que no controla la pieza rival, cerrar líneas, y mantener el rey en las casillas clave. A veces vale la pena entregar material para llegar a una fortaleza.</p>' +
      '<p>El atacante, por su parte, debe evitar cerrar la posición cuando tiene ventaja material, conservar posibles rupturas y no cambiar peones que le darían una fortaleza al rival.</p>',
    keyPoints: ['Fortaleza: sin entradas, sin objetivos, sin rupturas y sin zugzwang.', 'Piensa en estructuras, no solo en jugadas.', 'Bloquea peones en el color que no controla la pieza rival.', 'Con ventaja, no cierres la posición.'],
    positions: [
      { fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/3B4/8/4K3 w - - 0 1', orientation: 'white', caption: 'Cadena totalmente bloqueada: el alfil de más no sirve para nada.',
        line: ['Kd2', 'Kd8', 'Be2', 'Kd7', 'Bd1', 'Ke7'],
        comments: ['Ningún rey puede cruzar: todas las casillas libres de la cuarta fila están controladas por peones negros.', '', 'Los peones negros están en casillas oscuras y el alfil blanco es de casillas claras.', '', 'El blanco puede mover eternamente sin progresar.', 'Tablas.'] },
      { fen: '7k/8/8/7P/7P/8/8/6K1 w - - 0 1', orientation: 'white', caption: 'Peones de torre doblados contra el rey en la esquina: tablas.',
        line: ['Kf2', 'Kh7', 'Kg3', 'Kh6', 'Kg4', 'Kh7', 'Kg5', 'Kg7', 'h6+', 'Kh7', 'Kh5', 'Kh8', 'Kg6', 'Kg8', 'h7+', 'Kh8', 'Kh6'],
        comments: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Ahogado. Dos peones de torre doblados no valen más que uno.'] }
    ]
  },
  {
    id: 'f2-zugzwang', area: 'final', category: 'Conceptos',
    title: 'El zugzwang en los finales', level: 'intermedio',
    summary: 'Cuando cualquier jugada empeora la posición, la obligación de mover se convierte en el arma decisiva.',
    html: '<p><b>Zugzwang</b> (palabra alemana: "obligación de mover") describe una posición en la que el bando al que le toca jugar estaría mejor si pudiera pasar. En el medio juego es raro, pero en los finales, con poco material, es uno de los recursos más importantes.</p>' +
      '<h4>Zugzwang simple y recíproco</h4>' +
      '<ul><li><b>Simple</b>: solo uno de los bandos sufre la obligación de mover; el otro puede hacer una jugada de espera.</li>' +
      '<li><b>Recíproco</b>: quien mueva, pierde (o empata en lugar de ganar). La oposición en los finales de peones es el ejemplo más conocido.</li></ul>' +
      '<h4>El trébuchet</h4>' +
      '<p>El caso extremo de zugzwang recíproco: dos peones bloqueados, cada rey atacando el peón rival y defendiendo el propio. El que mueve tiene que abandonar su peón y pierde la partida.</p>' +
      '<h4>Cómo usar el zugzwang</h4>' +
      '<ol><li><b>Jugadas de espera</b>: una torre que se desplaza por la misma columna, un alfil que cambia de casilla en su diagonal o un peón con dos pasos disponibles pueden "pasar el turno".</li>' +
      '<li><b>Triangulación</b>: el rey pierde un tiempo dando un rodeo para que la misma posición se repita con el rival al turno.</li>' +
      '<li><b>Reservar tiempos de peón</b>: en los finales de peones, no muevas los peones sin necesidad; cada tiempo de reserva puede decidir un zugzwang.</li></ol>' +
      '<h4>En los mates básicos</h4>' +
      '<p>Incluso en el mate de rey y torre, a menudo la torre tiene que hacer una jugada de espera para que el rey rival se vea obligado a ponerse frente al rey atacante, donde recibe el mate.</p>',
    keyPoints: ['Zugzwang: cualquier jugada empeora la posición.', 'En el trébuchet, quien mueve pierde.', 'Las jugadas de espera y la triangulación crean zugzwang.', 'Guarda tiempos de peón en los finales.'],
    positions: [
      { fen: '8/8/8/2Kp4/3Pk3/8/8/8 w - - 0 1', orientation: 'white', caption: 'Trébuchet: quien mueve pierde. Aquí le toca al blanco.',
        line: ['Kb4', 'Kxd4', 'Kb3', 'Kd3', 'Ka4', 'Kc3', 'Ka5', 'd4', 'Kb5', 'd3', 'Kc6', 'd2'],
        comments: ['El rey blanco tiene que abandonar d4.', 'Cae el peón.', '', 'El rey negro escolta a su peón.', '', '', '', '', '', '', '', 'El peón corona. Con el negro al turno, el resultado sería el inverso.'] },
      { fen: '4k3/8/3K4/8/8/8/8/5R2 w - - 0 1', orientation: 'white', caption: 'Jugada de espera de la torre: el rey negro se ve obligado a ponerse en oposición.',
        line: ['Rf2', 'Kd8', 'Rf8#'],
        comments: ['La torre sigue controlando la columna f: es solo una jugada de espera.', 'Única jugada: el rey se coloca frente al rey blanco.', 'Mate.'] }
    ],
    practice: { fen: '4k3/8/3K4/8/8/8/8/5R2 w - - 0 1', goal: 'mate', side: 'w', text: 'Encuentra la jugada de espera y da mate en dos.' }
  }
);
