/* Estrategia II: estructuras de peones, actividad de piezas y transformaciones — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(

  /* ───────────── Estructuras de peones ───────────── */
  {
    id: 'm2-carlsbad', area: 'estrategia', category: 'Estructuras de peones',
    title: 'Estructura Carlsbad y ataque de minorías', level: 'intermedio',
    summary: 'La estructura del Gambito de Dama Cambio: las blancas avanzan dos peones contra tres en el flanco de dama para crear una debilidad fija en c6.',
    html: '<p>La <b>estructura Carlsbad</b> nace del Gambito de Dama cuando las blancas cambian <span class="mv">cxd5</span> y las negras recapturan con el peón e: blancas con peones en <b>d4 y e3</b>, negras en <b>d5 y c6</b>. La columna c queda semiabierta para las blancas y la columna e para las negras. Es una de las estructuras más instructivas del ajedrez porque los planes de cada bando están muy definidos.</p>' +
      '<h4>El ataque de minorías</h4>' +
      '<p>Las blancas tienen dos peones (a y b) contra tres (a, b y c) en el flanco de dama. Parece absurdo atacar con menos peones, pero el objetivo no es abrir paso a un peón pasado sino <b>crear una debilidad</b>. El plan típico es <span class="mv">Rab1</span>, <span class="mv">b4</span> y <span class="mv">b5</span>. Cuando el peón llega a b5, las negras tienen que elegir: si cambian <span class="mv">cxb5</span>, el peón d5 queda aislado; si permiten <span class="mv">bxc6</span> y recapturan con el peón b, queda un peón <b>c6 retrasado</b> en una columna semiabierta. En ambos casos las blancas tendrán un blanco fijo para sus torres, la dama y un caballo que salte a c5 o a4.</p>' +
      '<h4>El contrajuego negro</h4>' +
      '<ul><li><b>Flanco de rey:</b> las negras no tienen un peón en e para mover, pero sí piezas: caballo a e4, …<span class="mv">Ng6</span>, alfil en d6 apuntando a h2, torre levantada por e6. El ataque de minorías tarda varias jugadas y las negras deben usarlas.</li>' +
      '<li><b>Frenar con …a5 o …b5:</b> fijar el flanco antes de que llegue <span class="mv">b5</span>, a costa de dejar casillas como c5 o b6.</li>' +
      '<li><b>El puesto e4:</b> un caballo apoyado por el peón d5 y por …f5 es una pieza magnífica.</li></ul>' +
      '<h4>El otro plan blanco: e3-e4</h4>' +
      '<p>Con el caballo en e2 en lugar de f3, las blancas pueden jugar <span class="mv">f3</span> y <span class="mv">e4</span> para ganar el centro (plan que popularizó Botvinnik). Es más ambicioso y abre el juego en el centro; requiere que el rey blanco esté seguro y las piezas preparadas antes de la ruptura.</p>',
    keyPoints: [
      'Estructura: blancas d4-e3, negras d5-c6; columna c semiabierta para las blancas.',
      'El ataque de minorías (b4-b5) busca dejar un peón débil en c6 o un peón aislado en d5.',
      'Las negras responden con piezas en el flanco de rey y el puesto e4.',
      'Con Ne2 aparece el plan alternativo f3 y e4 para dominar el centro.'
    ],
    pros: ['Plan claro y de bajo riesgo para las blancas.', 'La debilidad creada es permanente.'],
    cons: ['El ataque de minorías es lento y da tiempo al contraataque negro.', 'La casilla e4 queda como puesto para un caballo negro.'],
    positions: [
      {
        fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/R4RK1 w - - 8 11', orientation: 'white',
        caption: 'Carlsbad clásica: las blancas ponen en marcha el ataque de minorías.',
        line: ['Rab1', 'a5', 'a3', 'Ng6', 'b4', 'axb4', 'axb4', 'Bd6', 'b5', 'Bd7', 'bxc6', 'bxc6'],
        comments: [
          'La torre se coloca detrás del peón b antes de avanzarlo.',
          'Las negras intentan frenar el avance de b4.',
          'Prepara b4 de todos modos: si …axb4, recaptura el peón a.',
          'El caballo busca el flanco de rey; las negras quieren contrajuego allí.',
          'Ahora sí: empieza el ataque de minorías.',
          '',
          'Se abre la columna a y el peón b sigue avanzando.',
          'El alfil apunta a h2: el típico contrajuego en el flanco de rey.',
          'El golpe clave: presiona c6.',
          '',
          'Las blancas cambian y dejan un peón débil.',
          'Resultado: un peón c6 retrasado en una columna semiabierta, objetivo para Rc1, Qa4 y Na4-c5.'
        ],
        arrows: [['b2', 'b4', 'g'], ['b4', 'b5', 'g']], highlights: ['c6']
      },
      {
        fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPP2/PPQ1N1PP/R4RK1 b - - 0 11', orientation: 'white',
        caption: 'Con el caballo en e2 y el peón en f3, el plan blanco es la ruptura central e3-e4.',
        line: ['Be6', 'Rae1', 'N6d7', 'Bxe7', 'Rxe7', 'Kh1', 'Rc8', 'Ng3'],
        comments: [
          'Desarrolla y vigila la casilla d5 y la diagonal hacia h3.',
          'La torre se coloca en la columna e, detrás del futuro peón e4.',
          'Las negras cambian piezas para aliviar la falta de espacio.',
          '',
          '',
          'Profilaxis: el rey sale de la diagonal g1-a7 antes de abrir el centro.',
          'Las negras preparan …c5 para atacar d4 en cuanto las blancas jueguen e4.',
          'El caballo vigila e4 y f5. Todo está listo para e3-e4 con ventaja de espacio.'
        ],
        arrows: [['e3', 'e4', 'g'], ['f3', 'e4', 'b']]
      }
    ]
  },

  {
    id: 'm2-stonewall', area: 'estrategia', category: 'Estructuras de peones',
    title: 'La estructura Stonewall', level: 'intermedio',
    summary: 'Peones en c6-d5-e6-f5 (o c3-d4-e3-f4): un muro sólido que da control de e4, pero deja un agujero en e5 y un alfil de casillas blancas encerrado.',
    html: '<p>La <b>Stonewall</b> (muro de piedra) es una cadena de peones en <b>c6, d5, e6 y f5</b> para las negras (típica de la Defensa Holandesa) o en <b>c3, d4, e3 y f4</b> para las blancas (el Sistema Stonewall o algunas líneas del Colle). Todos los peones están en casillas blancas, y eso define sus virtudes y sus defectos.</p>' +
      '<h4>Ventajas</h4>' +
      '<ul><li>Control férreo de la casilla <b>e4</b>: un caballo allí, apoyado por d5 y f5, es muy difícil de desalojar.</li>' +
      '<li>Posibilidades de <b>ataque en el flanco de rey</b>: …<span class="mv">Ne4</span>, la dama a h5 o h6, la torre levantada por f6 y h6, e incluso …g5.</li>' +
      '<li>El centro es casi indestructible, así que el rey propio está a salvo de rupturas.</li></ul>' +
      '<h4>Desventajas</h4>' +
      '<ul><li>El <b>agujero en e5</b>: ningún peón negro podrá controlarlo jamás. Un caballo blanco en e5 es la pieza emblemática contra la Stonewall.</li>' +
      '<li>El <b>alfil de c8</b> queda encerrado detrás de sus propios peones. Hay tres soluciones clásicas: el fianchetto …b6 y …Bb7, la maniobra …<span class="mv">Bd7</span>-e8-h5 para sacarlo por fuera de la cadena, o cambiarlo.</li>' +
      '<li>Las casillas negras en general (e5, c5, d6) son débiles, de modo que el <b>alfil de casillas negras</b> es la pieza más valiosa de las negras.</li></ul>' +
      '<h4>El plan del rival</h4>' +
      '<p>Contra la Stonewall, el plan más recomendado es <b>cambiar los alfiles de casillas negras</b> (con <span class="mv">b3</span> y <span class="mv">Ba3</span>, o con <span class="mv">Bf4</span>) y después ocupar e5 con un caballo apoyado por otro caballo desde d3 o f3. Sin su alfil bueno, al bando de la Stonewall le quedan peones fijos en casillas blancas y un alfil malo: si se cambian muchas piezas, el final suele ser incómodo. Los módulos modernos valoran la Stonewall como algo pasiva, pero su solidez la mantiene viva en la práctica.</p>',
    keyPoints: [
      'Peones en casillas blancas: control de e4, agujero permanente en e5.',
      'El alfil de c8 es el problema: fianchetto, maniobra Bd7-e8-h5 o cambio.',
      'El rival busca cambiar los alfiles de casillas negras y ocupar e5.',
      'El bando de la Stonewall busca ataque en el flanco de rey con Ne4, dama y torre.'
    ],
    pros: ['Centro sólido y casilla e4 para un caballo.', 'Planes de ataque sencillos en el flanco de rey.'],
    cons: ['Agujero permanente en e5.', 'Alfil de casillas blancas malo.', 'Los finales suelen favorecer al rival.'],
    positions: [
      {
        fen: 'rnb1k2r/pp2q1pp/2pbpn2/3p1p2/2PP4/1P3NP1/P3PPBP/RNBQ1RK1 w kq - 1 8', orientation: 'white',
        caption: 'Holandesa Stonewall. Las blancas aplican el plan principal: cambiar el alfil de casillas negras.',
        line: ['Ba3', 'Bxa3', 'Nxa3', 'O-O', 'Nc2', 'Nbd7', 'Qc1', 'Ne4', 'Qa3'],
        comments: [
          'Ofrece el cambio del alfil bueno de las negras, el que defiende e5.',
          '',
          'El caballo de a3 parece mal colocado, pero irá a c2 y luego a e1-d3 rumbo a e5.',
          '',
          'Reorganización: el caballo vigila e3 y d4 y puede seguir a e1 y d3.',
          '',
          'La dama va a la diagonal a3-f8, la que ha perdido su alfil.',
          'Las negras ocupan su gran casilla.',
          'Propone cambiar damas: sin damas quedarían el agujero de e5 y el alfil de c8 encerrado.'
        ],
        arrows: [['c1', 'a3', 'g']], highlights: ['e5', 'e4']
      },
      {
        fen: 'rnbq1rk1/pp4pp/2pbpn2/3p1p2/2PP4/2N2NP1/PPQ1PPBP/R1B2RK1 b - - 3 8', orientation: 'black',
        caption: 'El problema del alfil de c8 y una solución típica: sacarlo por fuera de la cadena.',
        line: ['Bd7', 'Bf4', 'Be8', 'Bxd6', 'Qxd6', 'Ne5', 'Bh5'],
        comments: [
          'Primer paso de la maniobra Bd7-e8-h5.',
          'Las blancas buscan cambiar el alfil de casillas negras.',
          'El alfil retrocede para salir por h5.',
          'Cambio conseguido: las negras pierden su mejor pieza menor.',
          '',
          'El caballo ocupa el agujero de e5, la pieza ideal contra la Stonewall.',
          'El alfil ya está fuera de la cadena y activo. Las blancas conservan una pequeña ventaja gracias a e5.'
        ],
        arrows: [['c8', 'd7', 'y'], ['d7', 'e8', 'y'], ['e8', 'h5', 'y']], highlights: ['e5']
      }
    ]
  },

  {
    id: 'm2-mayoria', area: 'estrategia', category: 'Estructuras de peones',
    title: 'La mayoría en el flanco de dama', level: 'intermedio',
    summary: 'Tener más peones en un flanco permite crear un peón pasado; si está lejos de los reyes, suele decidir el final.',
    html: '<p>Cuando en un flanco tienes más peones que el rival (por ejemplo, tres contra dos), tienes una <b>mayoría</b>. Su valor principal es que, avanzada correctamente, produce un <b>peón pasado</b>. La mayoría en el <b>flanco de dama</b> es especialmente apreciada porque, con los dos reyes enrocados en el flanco de rey, el peón pasado que nace de ella está <b>lejos de los reyes</b>.</p>' +
      '<h4>Medio juego: centro contra mayoría</h4>' +
      '<p>Muchas aperturas producen el mismo intercambio: un bando obtiene un <b>centro de peones</b> (por ejemplo, d4 y e4) y el otro una mayoría en el flanco de dama. Es lo que ocurre en la Grünfeld Cambio o en algunas líneas de la Catalana. En el medio juego el centro suele pesar más, porque da espacio y posibilidades de ataque. Pero cada cambio de piezas acerca el final, donde la mayoría se vuelve decisiva. Por eso el bando con la mayoría <b>busca cambios</b>, presiona el centro para que no avance y prepara el avance de los peones del flanco.</p>' +
      '<h4>Cómo avanzar la mayoría</h4>' +
      '<ul><li><b>Primero el peón sin oposición</b> (el candidato): en una mayoría a-b-c contra a-b, el peón c es el que acabará pasado; los otros lo escoltan.</li>' +
      '<li>Avanza los peones <b>juntos</b>, sin dejar huecos que el rival pueda bloquear con una pieza.</li>' +
      '<li>Centraliza el rey antes de avanzar en el final: el rey apoya el avance.</li></ul>' +
      '<h4>En el final de peones</h4>' +
      '<p>Con reyes centralizados y una mayoría sana, el bando que la posee crea un peón pasado y lo usa como <b>señuelo</b>: el rey rival tiene que ir a pararlo y abandona el otro flanco, donde el rey propio entra a comer peones. Es el mismo mecanismo del peón pasado alejado.</p>',
    keyPoints: [
      'Una mayoría sana produce un peón pasado.',
      'En el flanco de dama, ese peón pasado estará lejos de los reyes enrocados.',
      'Centro contra mayoría: el centro manda en el medio juego, la mayoría en el final.',
      'Avanza primero el peón candidato y mantén los peones unidos.'
    ],
    positions: [
      {
        fen: 'rnb2rk1/pp2ppbp/6p1/8/3PP3/3BBN2/P2K1PPP/R6R b - - 2 12', orientation: 'black',
        caption: 'Grünfeld Cambio sin damas: centro blanco (d4-e4) contra mayoría negra en el flanco de dama (a7-b7 contra a2).',
        line: ['Nc6', 'Rab1', 'Rd8', 'Ke2', 'b6', 'Rhc1', 'Bb7', 'Rc4', 'e6'],
        comments: [
          'Presiona d4, el punto que sostiene el centro blanco.',
          'La torre controla la columna b y molesta al peón b7.',
          'Más presión sobre d4.',
          'El rey blanco está bien en el centro: ya no hay damas.',
          'Protege el flanco de dama y prepara el fianchetto.',
          '',
          'El alfil se une al ataque contra e4 y d5.',
          'Activa la torre por la cuarta fila.',
          'Freno al avance d4-d5. Las blancas tienen algo más de juego por su centro; a largo plazo, las negras confían en su mayoría.'
        ],
        arrows: [['a7', 'a5', 'y'], ['b7', 'b5', 'y']], highlights: ['d4', 'e4']
      },
      {
        fen: '6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Final de peones con mayoría blanca tres contra dos en el flanco de dama: las blancas tienen una ventaja ganadora.',
        line: ['Kf1', 'Kf8', 'Ke2', 'Ke7', 'Kd3', 'Kd6', 'Kc4', 'Kc6', 'b4', 'b6', 'a4', 'a6', 'Kd4', 'Kd6', 'c4'],
        comments: [
          'Primero, centralizar el rey.',
          '',
          '',
          '',
          '',
          '',
          'El rey se acerca a la mayoría para apoyarla.',
          '',
          'Los peones avanzan juntos.',
          '',
          '',
          '',
          'El rey vuelve al centro: amenaza tanto apoyar los peones como ir al flanco de rey.',
          '',
          'El peón candidato avanza. Pronto saldrá un peón pasado que arrastrará al rey negro, y el rey blanco entrará en el flanco de rey.'
        ],
        arrows: [['c2', 'c4', 'g']]
      }
    ]
  },

  {
    id: 'm2-doblados', area: 'estrategia', category: 'Estructuras de peones',
    title: 'Peones doblados: cuándo son buenos y cuándo malos', level: 'intermedio',
    summary: 'Los peones doblados no son siempre una debilidad: depende de si están aislados, de qué columnas abren y de qué se ha obtenido a cambio.',
    html: '<p>Un peón doblado aparece cuando un peón captura hacia una columna donde ya hay otro peón propio. La regla de principiante dice que son malos, pero la realidad es más rica: hay que preguntarse <b>qué se ha recibido a cambio</b> y <b>si se pueden atacar</b>.</p>' +
      '<h4>Cuándo son una debilidad</h4>' +
      '<ul><li><b>Doblados y aislados</b> (por ejemplo, c3 y c4 sin peones en b ni d): ningún peón puede defenderlos y son un blanco fijo.</li>' +
      '<li>Cuando <b>restan movilidad a una mayoría</b>: tres peones con dos doblados no pueden crear un peón pasado frente a dos peones sanos.</li>' +
      '<li>En el <b>final</b>, donde el rey y las torres pueden atacarlos con calma.</li></ul>' +
      '<h4>Cuándo compensan o incluso son buenos</h4>' +
      '<ul><li>Si al doblarse se <b>abre una columna</b> para las torres (por ejemplo, la columna g tras …gxf6 o la columna b tras bxc3).</li>' +
      '<li>Si refuerzan el <b>centro</b>: un peón doblado en c3 controla d4 y puede apoyar e4 o d4.</li>' +
      '<li>Si a cambio se obtiene la <b>pareja de alfiles</b> o una ventaja de desarrollo.</li></ul>' +
      '<h4>Dos ejemplos clásicos</h4>' +
      '<p>En la <b>Nimzoindia Sämisch</b> las blancas aceptan peones doblados en c3 y c4 a cambio de la pareja de alfiles y un centro móvil; su plan es avanzar e4 y f4-f5 para atacar. Las negras, en cambio, bloquean y atacan el peón c4 con …Ba6, …Na5 y …Rc8. En la <b>Española del Cambio</b> las negras quedan con peones doblados en la columna c; las blancas tienen una mayoría sana en el flanco de rey (cuatro contra tres) y su plan a largo plazo es llegar a un final de peones o de torres. Las negras compensan con la pareja de alfiles y juego activo.</p>' +
      '<p>Conclusión: valora los peones doblados por lo que <b>hacen</b> y por lo que <b>costaron</b>, no por su aspecto.</p>',
    keyPoints: [
      'Doblados y aislados: casi siempre débiles.',
      'Pueden compensar con una columna abierta, más control central o la pareja de alfiles.',
      'Una mayoría con peones doblados no crea peón pasado.',
      'El bando con peones doblados suele buscar actividad y evitar los finales.'
    ],
    positions: [
      {
        fen: 'r2qnrk1/p2p1ppp/bpn1p3/2p5/2PPP3/P1PB4/4NPPP/R1BQ1RK1 w - - 3 11', orientation: 'white',
        caption: 'Nimzoindia Sämisch: peones doblados en c3-c4 a cambio de la pareja de alfiles y el centro.',
        line: ['f4', 'f5', 'Ng3', 'g6', 'Be3', 'cxd4', 'cxd4', 'Rc8'],
        comments: [
          'El plan blanco: f4-f5 para abrir líneas contra el rey negro.',
          'Las negras bloquean el avance f4-f5 de inmediato.',
          'Presión sobre f5.',
          'Refuerza f5.',
          'Las blancas completan su desarrollo.',
          'Las negras eliminan el peón c3: el peón c4 queda más expuesto.',
          '',
          'La torre se une al asedio de c4, junto al alfil de a6 y el futuro …Na5.'
        ],
        arrows: [['a6', 'c4', 'r']], highlights: ['c4']
      },
      {
        fen: 'r1b1kbnr/1pp3pp/p4p2/2p5/4P3/1N6/PPP2PPP/RNBR2K1 b kq - 0 9', orientation: 'black',
        caption: 'Española del Cambio sin damas: las negras tienen peones doblados en c7-c5 y la pareja de alfiles.',
        line: ['Bg4', 'f3', 'Be6', 'Nc3', 'Bd6', 'Be3', 'b6', 'a4'],
        comments: [
          'Usa los alfiles con tempo: obliga a f3, que quita casillas al caballo blanco.',
          '',
          'El alfil vuelve a una buena diagonal.',
          '',
          'Desarrolla y controla e5.',
          '',
          'Refuerza c5: la mayoría negra del flanco de dama no puede crear un peón pasado por los peones doblados, así que conviene mantenerla sólida.',
          'Las blancas buscan a5 para fijar el flanco. Su baza a largo plazo es la mayoría sana en el flanco de rey; la de las negras, los dos alfiles.'
        ],
        highlights: ['c7', 'c5']
      }
    ]
  },

  {
    id: 'm2-retrasados', area: 'estrategia', category: 'Estructuras de peones',
    title: 'Peones retrasados y columnas semiabiertas', level: 'avanzado',
    summary: 'Un peón retrasado no puede ser defendido por otros peones y la casilla delante de él se convierte en un puesto ideal para el rival.',
    html: '<p>Un <b>peón retrasado</b> es el que se ha quedado atrás respecto a sus vecinos y no puede avanzar con seguridad porque la casilla de delante está controlada por un peón enemigo. Ningún peón propio puede defenderlo. Si además está en una <b>columna semiabierta</b> para el rival, se convierte en un objetivo para torres y dama.</p>' +
      '<h4>Las dos caras del problema</h4>' +
      '<ul><li><b>El peón en sí:</b> hay que defenderlo con piezas, que quedan atadas.</li>' +
      '<li><b>La casilla de delante:</b> es un agujero. En la Siciliana con …e5 (Najdorf, Sveshnikov, Boleslavsky) el peón d6 es retrasado y la casilla <b>d5</b> es la clave de toda la partida.</li></ul>' +
      '<h4>Plan del bando que ataca</h4>' +
      '<ol><li><b>Controlar y ocupar la casilla</b> de delante (d5) con piezas, idealmente un caballo. Cambiar las piezas que la defienden: el caballo de f6 y el alfil de e6.</li>' +
      '<li>Doblar torres en la columna semiabierta contra el peón.</li>' +
      '<li>Evitar que el rival haga la <b>ruptura liberadora</b> (…d5): si la consigue, el peón retrasado desaparece y con él la debilidad.</li></ol>' +
      '<h4>Plan del bando con el peón retrasado</h4>' +
      '<ul><li>Preparar la ruptura …d5 con todas las piezas; es la solución radical.</li>' +
      '<li>Buscar contrajuego dinámico en otro sector (en la Siciliana, la columna c y el avance …b5-b4).</li>' +
      '<li>Recordar que el peón retrasado también <b>controla casillas</b> (c5 y e5) y da solidez.</li></ul>' +
      '<h4>Cuidado con la transformación</h4>' +
      '<p>Ocupar d5 con un caballo es fuerte, pero si el rival lo cambia y hay que recapturar con un peón, la estructura cambia: el peón retrasado deja de estar en una columna semiabierta y puede aparecer un peón pasado. Decide la recaptura pensando en la estructura que quedará.</p>',
    keyPoints: [
      'Un peón retrasado no puede ser defendido por peones y deja un agujero delante.',
      'Plan: dominar la casilla de delante, cambiar a sus defensores y presionar por la columna.',
      'El defensor busca la ruptura liberadora (…d5 en la Siciliana).',
      'Los cambios en la casilla clave transforman la estructura: evalúa la recaptura.'
    ],
    positions: [
      {
        fen: 'rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 w - - 6 10', orientation: 'white',
        caption: 'Najdorf con …e5: el peón d6 es retrasado y d5 es la casilla clave.',
        line: ['Qd2', 'Nbd7', 'a4', 'Rc8', 'a5', 'Qc7', 'Rfd1'],
        comments: [
          'Conecta torres y prepara Rfd1 contra d6.',
          'El caballo puede ir a c5 o b6, desde donde vigila d5.',
          'Impide …b5, que daría a las negras espacio y la amenaza …b4 contra el defensor de d5.',
          'La torre a la columna c semiabierta: contrajuego negro.',
          'Gana espacio y quita la casilla b6 al caballo negro.',
          'Conecta torres y presiona c2.',
          'Columna d semiabierta: el peón d6 ya es un objetivo, y d5 está bajo control blanco.'
        ],
        highlights: ['d6', 'd5'], arrows: [['d1', 'd6', 'r']]
      },
      {
        fen: '2r2rk1/1pqnbppp/p2pbn2/P3p3/4P3/1NN1B3/1PPQBPPP/R2R2K1 b - - 2 13', orientation: 'white',
        caption: 'La ocupación de d5 y sus consecuencias: tras Nd5 y la recaptura con peón, la estructura se transforma.',
        line: ['Rfd8', 'Bf3', 'h6', 'Nd5', 'Bxd5', 'exd5', 'Nc5', 'Nxc5', 'dxc5'],
        comments: [
          'Defiende d6 una vez más.',
          'El alfil también apunta a d5.',
          'Jugada útil: da aire al rey.',
          'El caballo ocupa la casilla de bloqueo.',
          'Las negras eliminan el caballo: no pueden tolerarlo en d5.',
          'Recaptura con peón: d6 deja de estar en columna semiabierta.',
          'El caballo busca actividad y ofrece cambios.',
          '',
          'Nueva estructura: el peón d6 ha desaparecido y las blancas tienen un peón pasado en d5 apoyado por el alfil. Las blancas mantienen una ligera ventaja.'
        ],
        highlights: ['d5']
      }
    ]
  },

  {
    id: 'm2-centro', area: 'estrategia', category: 'Estructuras de peones',
    title: 'Centro cerrado y centro abierto: cómo cambia el plan', level: 'intermedio',
    summary: 'El tipo de centro decide dónde se juega: con centro cerrado se ataca con peones en los flancos; con centro abierto mandan el desarrollo, las piezas y la seguridad del rey.',
    html: '<p>Antes de elegir un plan, mira el centro. Su estructura determina qué piezas son buenas, dónde se jugará y con qué velocidad.</p>' +
      '<h4>Centro cerrado</h4>' +
      '<p>Cadenas de peones bloqueadas (por ejemplo, blancas en d5 y e4, negras en d6 y e5). Las piezas no pueden atravesar el centro, así que el juego se traslada a los <b>flancos</b>:</p>' +
      '<ul><li>Se ataca con <b>peones</b> en el flanco hacia el que apuntan tus peones centrales: en la India de Rey, las blancas juegan c4-c5 en el flanco de dama y las negras …f5-f4 y …g5-g4 en el de rey.</li>' +
      '<li>Los <b>caballos</b> ganan valor y los alfiles detrás de sus propios peones pierden fuerza.</li>' +
      '<li>Es posible <b>atacar con peones delante del propio rey</b>, porque el rival no puede abrir el centro para castigarlo.</li>' +
      '<li>Hay tiempo: el juego es más lento y lo que cuenta es la carrera de rupturas.</li></ul>' +
      '<h4>Centro abierto</h4>' +
      '<p>Pocos o ningún peón central; líneas abiertas por todas partes.</p>' +
      '<ul><li>Mandan el <b>desarrollo</b> y la <b>actividad</b>: cada tempo cuenta.</li>' +
      '<li>El <b>rey en el centro</b> es un peligro grave: hay que enrocar pronto.</li>' +
      '<li>Los <b>alfiles</b> y las torres son más fuertes; la pareja de alfiles brilla.</li>' +
      '<li>Atacar con peones en el flanco es arriesgado: el rival responde en el centro.</li></ul>' +
      '<h4>Centros intermedios</h4>' +
      '<p>El <b>centro móvil</b> (peones que pueden avanzar, como d4 y e4 sin oposición) da espacio y amenaza con avanzar; hay que atacarlo con piezas y rupturas. El <b>centro tenso</b> (peones enfrentados que pueden capturarse) exige calcular quién gana con el cambio. Pregúntate siempre: ¿se va a cerrar, se va a abrir, quién decide cuándo?</p>',
    keyPoints: [
      'Centro cerrado: juego en los flancos con rupturas de peón, el valor de los caballos sube.',
      'Ataca en el flanco hacia el que apuntan tus peones centrales.',
      'Centro abierto: desarrollo, actividad y seguridad del rey ante todo.',
      'Con centro abierto, los ataques de peones en el flanco suelen ser castigados en el centro.'
    ],
    positions: [
      {
        fen: 'r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P3/2NN4/PP2BPPP/R1BQ1RK1 w - f6 0 11', orientation: 'white',
        caption: 'India de Rey, variante clásica: centro cerrado. Cada bando ataca en el flanco hacia donde apunta su cadena.',
        line: ['Bd2', 'Nf6', 'f3', 'f4', 'c5', 'g5', 'Rc1', 'Ng6', 'cxd6', 'cxd6'],
        comments: [
          'Desarrolla y apoya el futuro c5.',
          'El caballo vuelve a f6 para apoyar el ataque en el flanco de rey.',
          'Refuerza e4 y prepara un muro defensivo.',
          'Las negras cierran el flanco de rey y preparan …g5-g4.',
          'La ruptura blanca en el flanco de dama.',
          'Cada bando avanza en su flanco: es una carrera.',
          'La torre se prepara para la columna c.',
          'El caballo se acerca a h4 y f4 para el ataque.',
          'Abre la columna c.',
          'Las blancas invadirán por c7; las negras seguirán con …h5 y …g4. El centro cerrado decide dónde se juega.'
        ],
        arrows: [['c4', 'c5', 'g'], ['g5', 'g4', 'r']]
      },
      {
        fen: 'r2qk2r/ppp2ppp/2n1bP2/2b3N1/2pp4/8/PPP2PPP/RNBQR1K1 b kq - 3 9', orientation: 'white',
        caption: 'Ataque Max Lange: centro abierto. El rey negro sigue en e8 y cada tempo cuenta.',
        line: ['Qd5', 'Nc3', 'Qf5', 'Nce4', 'O-O-O'],
        comments: [
          'Defiende e6 y g7 de golpe; la dama es la única pieza que puede hacerlo.',
          'Desarrollo con ataque a la dama: en posiciones abiertas, el desarrollo con tempo es oro.',
          'La dama mantiene la defensa de e6 y g7.',
          'Los caballos blancos dominan el centro.',
          'El rey abandona la columna e abierta: con centro abierto no puede quedarse en el centro.'
        ],
        arrows: [['e1', 'e6', 'r']]
      }
    ]
  },

  /* ───────────── Piezas y actividad ───────────── */
  {
    id: 'm2-peor-pieza', area: 'estrategia', category: 'Piezas y actividad',
    title: 'Mejora tu peor pieza', level: 'intermedio',
    summary: 'Cuando no hay nada concreto que hacer, busca la pieza que menos trabaja y llévala a una casilla mejor.',
    html: '<p>Un consejo atribuido a muchos maestros y muy usado en la enseñanza: <b>cuando no sepas qué hacer, mejora tu peor pieza</b>. Una partida suele decidirse no por lo que hacen tus mejores piezas, sino por lo que no hacen las peores. Un caballo en el borde o un alfil encerrado es, en la práctica, una pieza de menos.</p>' +
      '<h4>Cómo identificarla</h4>' +
      '<ul><li>Cuenta las casillas útiles que controla cada pieza.</li>' +
      '<li>Pregúntate qué pieza no participa en el plan (ni en el ataque ni en la defensa).</li>' +
      '<li>Busca piezas mordiendo sus propios peones (alfil malo), caballos sin puestos y torres en columnas cerradas.</li></ul>' +
      '<h4>Cómo mejorarla</h4>' +
      '<ol><li><b>Define la casilla ideal</b>: un puesto avanzado, una columna abierta, una diagonal larga.</li>' +
      '<li><b>Traza la ruta</b>, aunque sea larga (la maniobra Nb1-d2-f1-g3 de la Española recorre cuatro casillas para llegar a un buen sitio).</li>' +
      '<li>Comprueba que el rival no puede castigar la lentitud: en posiciones cerradas hay tiempo, en abiertas no siempre.</li></ol>' +
      '<h4>La otra cara: empeora la pieza del rival</h4>' +
      '<p>También es estrategia mantener mala la peor pieza contraria: fijar peones en el color de su alfil malo, quitar casillas a su caballo o cambiar su pieza buena y dejarle la mala. Muchos jugadores fuertes piensan en términos de <b>la peor pieza de cada bando</b> en cada momento.</p>' +
      '<p>En los ejemplos verás a los dos bandos haciendo exactamente esto: en la Española, las blancas llevan su caballo de b1 al flanco de rey mientras las negras rescatan su caballo de a5; en la Francesa del Avance, las negras llevan el caballo de g8, que no tiene la casilla f6, a la estupenda casilla f5.</p>',
    keyPoints: [
      'Identifica la pieza con menos casillas útiles o que no participa.',
      'Define su casilla ideal y traza la ruta, aunque sea larga.',
      'En posiciones cerradas hay tiempo para maniobras lentas.',
      'Intenta también mantener mala la peor pieza del rival.'
    ],
    positions: [
      {
        fen: 'r4rk1/2qbbppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1 w - - 3 13', orientation: 'white',
        caption: 'Española cerrada (Chigorin): el caballo blanco de d2 y el caballo negro de a5 son las peores piezas de cada bando.',
        line: ['Nf1', 'cxd4', 'cxd4', 'Nc6', 'Ng3', 'Rac8', 'Bd3', 'Nb4'],
        comments: [
          'La maniobra típica: el caballo va camino de g3 o e3.',
          'Las negras abren la columna c.',
          '',
          'El caballo del borde vuelve al juego presionando d4.',
          'Desde g3 el caballo mira f5 y h5, casillas cercanas al rey negro.',
          'La torre ocupa la columna abierta.',
          'El alfil protege b1 y e4 desde otra casilla.',
          'El antiguo caballo de a5 es ahora una pieza activa que obliga al alfil a decidir. Ambos bandos han mejorado su peor pieza.'
        ],
        arrows: [['d2', 'f1', 'g'], ['f1', 'g3', 'g'], ['a5', 'c6', 'y']]
      },
      {
        fen: 'r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6', orientation: 'black',
        caption: 'Francesa del Avance: el caballo de g8 no tiene la casilla f6 por el peón e5. Su mejor destino es f5.',
        line: ['Nh6', 'b4', 'cxd4', 'cxd4', 'Nf5', 'Bb2', 'Be7'],
        comments: [
          'Camino de f5, desde donde atacará d4.',
          'Las blancas ganan espacio en el flanco de dama.',
          '',
          '',
          'El caballo llega a su casilla ideal: presiona d4 y no puede ser expulsado con g4 sin debilitar el flanco de rey.',
          'El alfil defiende d4.',
          'Desarrollo y enroque. El caballo de f5 es ahora una de las mejores piezas negras.'
        ],
        arrows: [['g8', 'h6', 'g'], ['h6', 'f5', 'g'], ['f5', 'd4', 'r']]
      }
    ]
  },

  {
    id: 'm2-espacio', area: 'estrategia', category: 'Piezas y actividad',
    title: 'La ventaja de espacio y cómo jugar con menos espacio', level: 'avanzado',
    summary: 'Más espacio da libertad de maniobra; el bando apretado debe cambiar piezas y preparar rupturas para liberarse.',
    html: '<p>Tener <b>más espacio</b> significa que tus peones controlan más casillas del campo rival, de modo que tus piezas se mueven con libertad detrás de ellos y las del rival se estorban. Se mide aproximadamente por las casillas controladas en la mitad del tablero rival y por lo avanzados que están los peones.</p>' +
      '<h4>Cómo usar la ventaja de espacio</h4>' +
      '<ul><li><b>Evita los cambios</b>: con menos piezas, el bando apretado deja de estar incómodo.</li>' +
      '<li><b>Impide las rupturas</b> liberadoras del rival (en el Erizo, …b5 y …d5; en la Philidor, …d5 o …exd4 con …c5).</li>' +
      '<li>Usa el espacio para <b>trasladar piezas</b> rápidamente de un flanco a otro: tú tienes carreteras, el rival caminos.</li>' +
      '<li>No avances los peones sin motivo: cada avance deja casillas detrás.</li></ul>' +
      '<h4>Cómo jugar con menos espacio</h4>' +
      '<ul><li><b>Cambia piezas</b>, sobre todo las que más se estorban entre sí.</li>' +
      '<li><b>Prepara una ruptura</b> de peón con todas tus fuerzas, y ejecútala solo cuando funcione.</li>' +
      '<li>Mantén una <b>estructura compacta</b> sin debilidades: posiciones como el Erizo son elásticas, aceptan la falta de espacio y esperan el momento de golpear.</li>' +
      '<li>Busca casillas para cada pieza aunque sean modestas (alfil en f8, torre en e8, dama en b8).</li></ul>' +
      '<h4>Un equilibrio delicado</h4>' +
      '<p>El espacio es una ventaja, pero también una responsabilidad: los peones avanzados son objetivos. Si el bando con espacio se relaja, la ruptura del rival suele llegar con fuerza, porque todas las piezas negras llevan tiempo preparándola. En el Erizo, por ejemplo, las rupturas …b5 o …d5 llegan a menudo cuando las blancas han sobreextendido.</p>',
    keyPoints: [
      'Con más espacio: evita cambios, impide rupturas y traslada piezas de flanco.',
      'Con menos espacio: cambia piezas, mantén una estructura compacta y prepara una ruptura.',
      'Los peones avanzados son objetivos si el bando con espacio se descuida.',
      'El Erizo es el ejemplo clásico de posición con poco espacio pero elástica.'
    ],
    positions: [
      {
        fen: 'r1bq1rk1/pp1nbppp/2pp1n2/4p3/P1BPP3/2N2N2/1PP2PPP/R1BQR1K1 b - a3 0 8', orientation: 'black',
        caption: 'Philidor (sistema Hanham): las blancas tienen más espacio. Las negras liberan su juego cediendo el centro a cambio de actividad.',
        line: ['exd4', 'Nxd4', 'Re8', 'h3', 'Bf8', 'Bf4', 'Nb6', 'Bb3'],
        comments: [
          'Las negras ceden el punto fuerte e5 a cambio de líneas abiertas y casillas para sus piezas.',
          '',
          'Presión sobre e4 por la columna e semiabierta.',
          'Las blancas evitan …Ng4 y …Bg4.',
          'El alfil se reubica en f8 y deja e7 libre para la torre o la dama.',
          'El alfil presiona d6.',
          'El caballo gana tiempo atacando el alfil de c4.',
          'Las negras ya no están ahogadas: tienen casillas y presión sobre e4. Las blancas mantienen algo de espacio.'
        ],
        arrows: [['e5', 'd4', 'y']]
      },
      {
        fen: 'r4rk1/1bqnbppp/pp1ppn2/8/2PQP3/1PN2NP1/PB3PBP/R2R2K1 w - - 3 13', orientation: 'white',
        caption: 'El Erizo: las negras aceptan menos espacio con una estructura compacta y esperan las rupturas …b5 o …d5.',
        line: ['Nd2', 'Rfe8', 'Rac1', 'Rac8', 'Qe3', 'Bf8', 'h3', 'Qb8'],
        comments: [
          'El caballo refuerza c4 y e4 y deja libre la diagonal del alfil de g2.',
          'Desde e8 la torre apoya …e5 o …d5 en el futuro.',
          'Las blancas también maniobran: vigilan c4 y la columna c.',
          'La torre va detrás del peón c para apoyar …b5.',
          'La dama sale de la diagonal del alfil de f6 y protege e4.',
          'Típico del Erizo: el alfil se coloca en f8 para defender d6.',
          'Las blancas ganan una casilla de escape y vigilan g4.',
          'La dama va a b8 para apoyar …b5. Con poco espacio, cada pieza tiene una casilla útil y las rupturas están preparadas.'
        ],
        arrows: [['b6', 'b5', 'y'], ['d6', 'd5', 'y']]
      }
    ]
  },

  {
    id: 'm2-pasado-medio', area: 'estrategia', category: 'Piezas y actividad',
    title: 'El peón pasado en el medio juego: el bloqueo', level: 'avanzado',
    summary: 'Un peón pasado se combate bloqueándolo con una pieza, idealmente un caballo; si el bloqueo falla, el peón avanza arrastrando al rival.',
    html: '<p>Un <b>peón pasado</b> es el que no tiene peones rivales delante ni en las columnas vecinas. En el final suele ser decisivo, pero también es una fuerza enorme en el medio juego: avanza amenazando coronar, gana espacio y ata las piezas del rival.</p>' +
      '<h4>La teoría del bloqueo (Nimzowitsch)</h4>' +
      '<p>Nimzowitsch formuló la idea de que un peón pasado debe ser <b>bloqueado</b>, es decir, detenido con una pieza en la casilla de delante. Sus argumentos siguen siendo válidos:</p>' +
      '<ul><li>El peón tiene un <b>afán de expansión</b>: si se le deja avanzar, cada paso lo hace más peligroso.</li>' +
      '<li>El bloqueo inmoviliza también a las piezas que apoyan el peón, que pierden sus objetivos.</li>' +
      '<li>La casilla de bloqueo es segura para el bloqueador, porque el propio peón la protege de los ataques frontales.</li></ul>' +
      '<h4>El mejor bloqueador</h4>' +
      '<ul><li>El <b>caballo</b> es el bloqueador ideal: desde la casilla de bloqueo sigue controlando casillas útiles en todas las direcciones.</li>' +
      '<li>El <b>alfil</b> es aceptable si controla la casilla de delante del peón.</li>' +
      '<li>La <b>dama</b> es un mal bloqueador: es demasiado valiosa, cualquier pieza menor la desaloja con tempo y el peón avanza.</li></ul>' +
      '<h4>Plan con el peón pasado</h4>' +
      '<p>El bando con el peón quiere <b>expulsar o cambiar al bloqueador</b> y luego empujar con todas sus piezas detrás. Las torres deben ir <b>detrás</b> del peón pasado. El bando que bloquea busca cambiar piezas para llegar a un final donde el peón, bloqueado y sin apoyo, sea una debilidad, o usar la casilla de bloqueo como base para su contrajuego.</p>',
    keyPoints: [
      'Primero bloquear, luego atacar: detén el peón con una pieza en la casilla de delante.',
      'El caballo es el mejor bloqueador; la dama, el peor.',
      'El bando con el peón pasado intenta expulsar o cambiar al bloqueador.',
      'Las torres van detrás del peón pasado.'
    ],
    positions: [
      {
        fen: '2r1r1k1/pp3pbp/3n1qp1/3P4/8/2NQ1B2/PP3PPP/2R1R1K1 b - - 0 1', orientation: 'black',
        caption: 'Bloqueo modélico: el caballo negro de d6 detiene el peón pasado de d5 y controla b5, c4, e4 y f5.',
        line: ['Qf4', 'Rxe8+', 'Rxe8', 'Rd1', 'Qb4', 'Qc2', 'Rc8'],
        comments: [
          'La dama se activa atacando la torre de c1 y el peón h2.',
          'Las blancas cambian una pareja de torres.',
          '',
          'La torre se coloca detrás del peón pasado, como manda la regla.',
          'La dama presiona b2 y c3.',
          '',
          'Las negras presionan c3 apoyadas en el caballo de bloqueo. La posición está equilibrada: el peón está bien detenido.'
        ],
        highlights: ['d6', 'd5']
      },
      {
        fen: '2r1r1k1/pp3pbp/3q2p1/3P4/8/2N2B2/PP1Q1PPP/2R1R1K1 w - - 0 1', orientation: 'white',
        caption: 'Mismo peón, mal bloqueador: con la dama en d6, el caballo blanco la desaloja con tempo y el peón avanza.',
        line: ['Rxe8+', 'Rxe8', 'Ne4', 'Qe5', 'd6', 'Rd8', 'd7'],
        comments: [
          'Primero cambia una torre para debilitar el control negro de la octava fila.',
          '',
          'El caballo ataca a la dama bloqueadora.',
          'La dama debe apartarse y la casilla d6 queda libre.',
          'El peón avanza con fuerza.',
          'La torre negra tiene que bloquear en d8.',
          'El peón en d7, apoyado por el caballo (Nf6+) y por la torre (Rc8), deja a las blancas con ventaja decisiva.'
        ],
        arrows: [['c3', 'e4', 'g'], ['d5', 'd7', 'g']]
      }
    ]
  },

  {
    id: 'm2-color', area: 'estrategia', category: 'Piezas y actividad',
    title: 'El dominio de las casillas de un color', level: 'avanzado',
    summary: 'Cuando un bando pierde el alfil de un color y tiene sus peones en el otro, las casillas de ese color quedan a merced del rival.',
    html: '<p>Los peones y los alfiles controlan casillas de un color determinado. Cuando un bando ha cambiado su alfil de casillas negras y además tiene sus peones en casillas blancas, las casillas negras de su campo quedan sin defensa: es una <b>debilidad de color</b>. El rival puede instalar sus piezas en ellas sin que nadie las moleste.</p>' +
      '<h4>Cómo se crea un complejo de casillas débiles</h4>' +
      '<ul><li>Cambiando el alfil que protegía ese color (por ejemplo, …Bxc3 en la Nimzoindia o Bxf6 en la Sveshnikov).</li>' +
      '<li>Fijando los peones del rival en el color contrario, de forma que no puedan volver a controlar esas casillas.</li>' +
      '<li>Debilitando el enroque: tras …g6 y la desaparición del alfil de g7, f6 y h6 son agujeros.</li></ul>' +
      '<h4>Cómo explotarlo</h4>' +
      '<ul><li>Coloca tus <b>peones en el color contrario</b> al de las casillas débiles del rival: así no estorban a tus piezas y limitan al alfil enemigo que queda.</li>' +
      '<li>Lleva <b>caballos</b> a las casillas débiles: no pueden ser expulsados por peones.</li>' +
      '<li>Conserva tu alfil de ese color y la dama; juntos son devastadores en las casillas sin defensa.</li></ul>' +
      '<h4>Ejemplos</h4>' +
      '<p>En la <b>Nimzoindia Hübner</b> las negras entregan su alfil de b4 por el caballo de c3, colocan los peones en c5, d6 y e5 (casillas negras) y dejan a las blancas con dos alfiles que tienen poco que hacer: el de casillas blancas tropieza con sus propios peones de c4, d5 y e4, y el de casillas negras choca contra la cadena negra. Las casillas d4 y f4 son puestos para los caballos negros. Una partida célebre con esta idea es la quinta del match Spassky-Fischer de 1972. En la <b>Sveshnikov</b> las blancas hacen lo contrario: entregan su alfil de casillas negras por el caballo de f6 para dominar las casillas blancas, sobre todo d5, y las negras a cambio obtienen la pareja de alfiles.</p>',
    keyPoints: [
      'Debilidad de color: falta el alfil de ese color y los peones están en el otro.',
      'Pon tus peones en el color contrario a las casillas débiles del rival.',
      'Los caballos son ideales para ocupar casillas débiles.',
      'Ceder un alfil para dominar un color es un intercambio estratégico frecuente.'
    ],
    positions: [
      {
        fen: 'r1bqk2r/pp2nppp/3p1n2/2pPp3/2P1P3/2PB1N2/P4PPP/R1BQK2R w KQkq - 1 10', orientation: 'black',
        caption: 'Nimzoindia Hübner: peones negros en casillas negras (c5, d6, e5); peones blancos fijos en casillas blancas (c4, d5, e4).',
        line: ['Nh4', 'h6', 'f4', 'Ng6', 'Nxg6', 'fxg6', 'fxe5', 'dxe5', 'Be3', 'b6', 'O-O', 'O-O'],
        comments: [
          'Las blancas preparan f4 para abrir el juego a sus alfiles.',
          'Impide Bg5 y prepara …Ng6.',
          'La ruptura blanca.',
          'El caballo desafía al de h4.',
          '',
          'Recapturar con el peón f abre la columna f para la torre negra.',
          '',
          'Ahora las negras tienen peones en c5 y e5: la casilla d4 está bajo su control para siempre.',
          'El alfil choca contra la cadena c5-e5.',
          'Refuerza c5 en casilla negra.',
          '',
          'Las blancas tienen dos alfiles pero ambos tienen poco alcance; las negras planean …Nh5-f4 o …Ng4 sobre las casillas negras. La posición está equilibrada.'
        ],
        highlights: ['d4', 'f4']
      },
      {
        fen: 'r1bqkb1r/5p1p/p1np1p2/1p1Np3/4P3/N7/PPP2PPP/R2QKB1R b KQkq - 1 10', orientation: 'white',
        caption: 'Sveshnikov: las blancas han dado su alfil de casillas negras por el caballo de f6 para dominar d5, una casilla blanca.',
        line: ['f5', 'c3', 'Bg7', 'exf5', 'Bxf5', 'Nc2', 'O-O'],
        comments: [
          'Las negras atacan el centro blanco para que d5 no sea eterno.',
          'Prepara Nc2-e3 para reforzar el control de d5.',
          'El alfil de casillas negras, sin rival, es la gran baza negra.',
          '',
          'Las negras ganan actividad y el control de e4.',
          'El caballo del borde vuelve camino de e3, otra pieza más sobre d5.',
          'Lucha de colores: las blancas dominan las casillas blancas del centro; las negras tienen la pareja de alfiles y el control de las casillas negras.'
        ],
        highlights: ['d5'], arrows: [['c2', 'e3', 'g']]
      }
    ]
  },

  /* ───────────── Transformaciones ───────────── */
  {
    id: 'm2-transformar', area: 'estrategia', category: 'Transformaciones',
    title: 'Transformar ventajas', level: 'avanzado',
    summary: 'Las ventajas no son eternas: saber cambiar una ventaja por otra más fácil de convertir, o liquidar a un final ganado, es una habilidad clave.',
    html: '<p>Una ventaja casi nunca gana por sí sola. Hay que <b>transformarla</b>: convertir el espacio en un ataque, el ataque en material, el material en un final ganado. Los jugadores fuertes no se aferran a una ventaja concreta, sino que la cambian por otra cuando la nueva es <b>más duradera o más fácil de convertir</b>.</p>' +
      '<h4>Ventajas temporales y permanentes</h4>' +
      '<ul><li><b>Temporales:</b> ventaja de desarrollo, iniciativa, rey rival en el centro. Desaparecen si no se usan: hay que actuar rápido.</li>' +
      '<li><b>Permanentes:</b> material, estructura de peones, peón pasado, pareja de alfiles. Permiten jugar con calma.</li></ul>' +
      '<p>Regla práctica: <b>usa las ventajas temporales para conseguir ventajas permanentes</b>. Por ejemplo, con el peón aislado de dama (debilidad estática pero piezas activas), la ruptura d4-d5 transforma la estructura en líneas abiertas y ataque antes de que el rival complete su bloqueo.</p>' +
      '<h4>Liquidar a un final ganado</h4>' +
      '<p>Con ventaja material, cambiar piezas suele favorecer al bando que va por delante. El caso más claro es <b>cambiar a un final de peones ganado</b>: en un final de torres con un peón de más, ganar puede ser largo e incierto (los finales de torres tienen fama de tablas), mientras que el final de peones resultante puede ser una victoria trivial. Antes de cambiar la última pieza, <b>calcula el final de peones con cuidado</b>: es irreversible.</p>' +
      '<h4>Preguntas para decidir</h4>' +
      '<ul><li>¿Mi ventaja actual va a durar o se está agotando?</li>' +
      '<li>¿Qué ventaja obtengo a cambio y es más fácil de convertir?</li>' +
      '<li>¿Qué contrajuego le quito al rival con la transformación?</li></ul>',
    keyPoints: [
      'Usa las ventajas temporales para conseguir ventajas permanentes.',
      'Cambia una ventaja por otra cuando la nueva sea más duradera o más fácil de convertir.',
      'Con material de más, liquidar a un final de peones ganado es la conversión más segura.',
      'Calcula siempre el final de peones antes del último cambio: no hay vuelta atrás.'
    ],
    positions: [
      {
        fen: '3rk3/5ppp/8/8/1P6/8/5PPP/3R2K1 w - - 0 1', orientation: 'white',
        caption: 'Peón de más en un final de torres. Con torres, ganar es difícil; el cambio de torres lleva a un final de peones ganado.',
        line: ['Rxd8+', 'Kxd8', 'Kf1', 'Kc7', 'Ke2', 'Kb6', 'Kd3', 'Kb5', 'Kc3'],
        comments: [
          'La transformación: de final de torres dudoso a final de peones ganado.',
          '',
          'El rey blanco se centraliza.',
          'El rey negro tiene que ir a por el peón b.',
          '',
          '',
          '',
          '',
          'El peón b ata al rey negro en el flanco de dama. Cuando el rey blanco se vaya al flanco de rey, ganará los peones negros allí: es el mecanismo del peón pasado alejado.'
        ],
        highlights: ['b4']
      },
      {
        fen: 'r2q1rk1/pb2bppp/1pn1pn2/8/3P4/P1NQ1N2/1PB2PPP/R1B1R1K1 b - - 3 13', orientation: 'white',
        caption: 'Peón aislado de dama: la debilidad estática se transforma en ataque con la ruptura d4-d5.',
        line: ['Rc8', 'd5', 'exd5', 'Bg5'],
        comments: [
          'Natural, pero descuida el flanco de rey.',
          'La ruptura: el peón aislado desaparece y se abren líneas para las piezas blancas.',
          '',
          'Amenaza Bxf6 seguido de Qxh7 mate, con la batería dama-alfil en la diagonal b1-h7. Las blancas tienen una ventaja clara.'
        ],
        arrows: [['d4', 'd5', 'g'], ['d3', 'h7', 'r']]
      }
    ],
    practice: {
      fen: '3k4/5ppp/8/8/1P6/8/5PPP/6K1 w - - 0 2', goal: 'ganar', side: 'w',
      text: 'Gana el final de peones: usa el peón b como señuelo y lleva tu rey a comer los peones del flanco de rey.'
    }
  },

  {
    id: 'm2-dos-flancos', area: 'estrategia', category: 'Transformaciones',
    title: 'El juego en ambos flancos', level: 'avanzado',
    summary: 'Una defensa puede aguantar en un solo sector; amenazar en los dos flancos y cambiar el frente de ataque en el momento justo desborda al rival.',
    html: '<p>Las posiciones cerradas suelen ofrecer <b>dos rupturas posibles</b>, una en cada flanco. El bando que sabe preparar ambas y elegir cuál ejecutar obliga al rival a repartir sus fuerzas. La idea es sencilla: si el rival concentra sus piezas en defender un flanco, el otro queda debilitado.</p>' +
      '<h4>Por qué funciona</h4>' +
      '<ul><li>El bando con <b>más espacio</b> traslada sus piezas de un flanco a otro más deprisa que el defensor.</li>' +
      '<li>Una amenaza en un flanco obliga a hacer concesiones (movimientos de peones, piezas pasivas) que se pagan luego en el otro.</li>' +
      '<li>El defensor no puede saber dónde llegará el golpe y tiene que cubrirlo todo.</li></ul>' +
      '<h4>Cómo hacerlo en la práctica</h4>' +
      '<ol><li><b>Gana espacio primero en un flanco</b> (por ejemplo, a4 en la Española o b4 en la Benoni Checa), para fijar la atención del rival y crear objetivos.</li>' +
      '<li><b>No te comprometas</b> del todo: deja tus piezas en casillas desde las que puedan ir a ambos lados.</li>' +
      '<li><b>Cambia el frente</b> cuando el rival haya llevado sus piezas al primer flanco. En la Española Breyer, las blancas presionan con a4 y luego dirigen alfil, dama y caballos hacia el flanco de rey.</li>' +
      '<li>El centro cerrado es tu aliado: impide que el rival contraataque por el medio mientras maniobras.</li></ol>' +
      '<h4>Error típico</h4>' +
      '<p>Lanzar todos los peones de un flanco de golpe. Cada avance de peón es irreversible: si el primer flanco se cierra por completo, ya no queda nada que amenazar allí. Prepara las rupturas, pero ejecuta solo la que funcione en cada momento y mantén la otra como amenaza.</p>',
    keyPoints: [
      'Las posiciones cerradas suelen ofrecer dos rupturas: prepara las dos.',
      'Gana espacio en un flanco para fijar la atención del rival y luego cambia el frente.',
      'Coloca las piezas en casillas desde las que puedan ir a ambos flancos.',
      'No lances todos los peones de un flanco: mantén amenazas en reserva.'
    ],
    positions: [
      {
        fen: 'r2qrbk1/1b1n1p1p/p2p1np1/1p1Pp3/P1p1P3/2P2NNP/1PB2PP1/R1BQR1K1 w - - 0 17', orientation: 'white',
        caption: 'Española Breyer: tras presionar en el flanco de dama con a4, las blancas trasladan sus piezas al flanco de rey.',
        line: ['Bg5', 'h6', 'Be3', 'Nc5', 'Qd2', 'h5', 'Bg5', 'Be7'],
        comments: [
          'Primera pieza hacia el flanco de rey: clava el caballo de f6.',
          'Las negras expulsan al alfil.',
          'El alfil vuelve a la diagonal c1-h6, desde donde amenaza Bxh6.',
          'El caballo negro ocupa una buena casilla en el flanco de dama.',
          'Dama y alfil apuntan a h6, donde el peón ha quedado débil.',
          'Las negras defienden h6 avanzando el peón, pero debilitan g5.',
          'El alfil aprovecha g5.',
          'Las negras han tenido que hacer concesiones en el flanco de rey, mientras la presión blanca en el de dama (a4) sigue ahí. Las blancas mantienen la ventaja.'
        ],
        arrows: [['a4', 'b5', 'y'], ['d2', 'h6', 'g']]
      },
      {
        fen: 'rnbqnrk1/pp2bppp/3p4/2pPp3/2P1P3/2NB4/PP2NPPP/R1BQ1RK1 b - - 6 8', orientation: 'white',
        caption: 'Benoni Checa: centro cerrado con dos rupturas posibles para las blancas, b4 en el flanco de dama y f4 en el de rey.',
        line: ['Na6', 'a3', 'Nac7', 'Rb1', 'a6', 'b4', 'b6', 'f4'],
        comments: [
          'El caballo va a c7 para vigilar b5 y apoyar …b5.',
          'Prepara b4.',
          '',
          'La torre se pone detrás del peón b.',
          'Las negras preparan …b5.',
          'Primera ruptura: presión en el flanco de dama.',
          'Las negras refuerzan c5.',
          'Y ahora la segunda ruptura en el otro flanco: las negras tienen que atender los dos sectores a la vez.'
        ],
        arrows: [['b2', 'b4', 'g'], ['f2', 'f4', 'g']]
      }
    ]
  }
);
