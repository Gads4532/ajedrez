/* Teoría ampliada y ejercicios nuevos: tactica1. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
   "t-horquilla": {
    "html": "<h4>Anatomía de una horquilla: tres condiciones</h4><p>Una horquilla funciona cuando se cumplen tres condiciones a la vez: (1) la pieza que ataca llega a la casilla sin ser capturada, o su captura cuesta más de lo que vale; (2) los dos objetivos no pueden salvarse con una sola jugada; y (3) el rival no tiene una respuesta con tempo (un jaque, una captura mayor o una amenaza de mate) que le permita ignorar el doble ataque. La tercera condición es la que más olvidan los aficionados: una horquilla a la dama y a la torre no sirve si el rival puede dar jaque y después cubrir ambas piezas, o si una de ellas puede capturar algo con jaque.</p><p>Por eso los dobles ataques más fuertes son los que llevan <b>jaque</b>: el rey tiene que atender el jaque y la segunda pieza cae sin remedio. Cuando no hay jaque, comprueba que el segundo objetivo no esté defendido y que el rival no pueda defender los dos con una sola jugada (por ejemplo, moviendo una pieza atacada a una casilla desde la que defiende a la otra).</p><h4>Los objetivos: piezas sueltas y piezas «mal alineadas»</h4><p>John Nunn popularizó la regla «las piezas sueltas se caen». Una pieza sin defensa es un blanco natural de cualquier doble ataque, sobre todo de la dama, que ataca en ocho direcciones. Antes de cada jugada haz el inventario: ¿qué piezas del rival están sin defensa? ¿Hay dos piezas en casillas del mismo color que un caballo pueda atacar a la vez desde una casilla segura? ¿Hay dos piezas en la misma diagonal o columna que una dama pueda atacar desde una casilla segura?</p><p>Cada pieza tiene su geometría. El <b>caballo</b> ataca casillas del color contrario al que ocupa: el rey y la dama solo pueden quedar bifurcados por un caballo si están en casillas del mismo color. El <b>peón</b> ataca dos casillas vecinas en diagonal: busca dos piezas en la fila siguiente separadas por una columna. La <b>dama</b> combina ataques en línea y en diagonal y es la reina de los dobles ataques con jaque. El <b>rey</b> también da horquillas, sobre todo en los finales, cuando ataca dos peones o dos piezas sueltas a la vez.</p><h4>Cómo se prepara una horquilla</h4><p>En las partidas reales la horquilla rara vez está lista: hay que fabricarla. Las tres preparaciones típicas son:</p><ol><li><b>Atracción</b>: un sacrificio obliga al rey o a la dama a ir a una casilla bifurcable (<span class=\"mv\">Rxf2</span> <span class=\"mv\">Kxf2</span> y después un salto de caballo con jaque).</li><li><b>Eliminación o desviación del guardián</b>: se cambia la pieza que controla la casilla de la horquilla. Si un alfil rival vigila e7, primero se cambia ese alfil y después el caballo salta a e7.</li><li><b>Clavada previa</b>: una pieza clavada no puede capturar al caballo que llega a la casilla de la horquilla.</li></ol><h4>Errores comunes y lista de comprobación</h4><p>El error clásico es «ganar» la calidad con una horquilla y dejar atrapado al caballo en la esquina (por ejemplo en a8 o h8), donde el rival lo recupera. Otro es calcular solo la jugada del caballo y no la respuesta del rival: muchas horquillas fallan por un jaque intermedio. Antes de jugar, repasa:</p><ul><li>¿La casilla de la horquilla está defendida por el rival? ¿Puedo eliminar o desviar a ese defensor?</li><li>¿Tiene el rival un jaque, una captura o una amenaza que le permita ganar tiempo?</li><li>Después de cobrar, ¿mi pieza puede volver, o queda encerrada?</li><li>¿Puedo llevar al rey o a la dama rival a la casilla adecuada con un sacrificio?</li></ul><p>Y piensa también a la defensiva: antes de cada jugada, mira qué casillas puede alcanzar el caballo rival en dos saltos. Muchas horquillas se evitan simplemente no dejando el rey y la dama en casillas del mismo color al alcance de un caballo.</p>",
    "keyPoints": [
     "Una horquilla necesita que el rival no tenga una respuesta con tempo (jaque, captura mayor o amenaza).",
     "Las horquillas se fabrican: atracción, eliminación del guardián de la casilla o clavada previa."
    ],
    "positions": [
     {
      "fen": "3r1rk1/pp3bbp/3p4/3npN2/1P3p2/1B5P/P2B1PP1/3RR1K1 w - - 3 28",
      "orientation": "white",
      "caption": "Preparar la horquilla eliminando al guardián: el caballo negro de d5 controla e7, la casilla desde la que el caballo blanco atacaría al rey y al alfil.",
      "line": [
       "Bxd5",
       "Bxd5",
       "Ne7+",
       "Kf7",
       "Nxd5"
      ],
      "comments": [
       "Primero se elimina la pieza que vigila e7. Un cambio «neutral» de alfil por caballo prepara el golpe.",
       "El negro recaptura con el alfil, que ahora queda en d5, justo en una casilla atacable desde e7.",
       "Jaque y ataque al alfil de d5 a la vez: la horquilla ya funciona porque nadie controla e7.",
       "El rey tiene que apartarse; no hay jaque intermedio ni forma de defender el alfil.",
       "El blanco cobra el alfil y queda con una pieza de más. Sin el cambio previo, Ne7+ habría sido imposible."
      ],
      "arrows": [
       [
        "f5",
        "e7",
        "g"
       ]
      ],
      "highlights": [
       "e7"
      ]
     },
     {
      "fen": "6k1/2p5/5ppp/p2Pn3/4RNP1/7P/1r4N1/6K1 b - - 0 31",
      "orientation": "black",
      "caption": "Juegan negras. El caballo llega a la casilla de la horquilla a base de jaques: cada salto gana el tiempo necesario para el siguiente.",
      "line": [
       "Nf3+",
       "Kf1",
       "Nd2+",
       "Kf2",
       "Nxe4+"
      ],
      "comments": [
       "Primer jaque: el rey blanco no puede quedarse en g1 y el caballo se acerca a la torre de e4.",
       "El rey se aparta (si va a h1, el negro también gana material con ...Rb1+).",
       "Segundo jaque, y ahora el caballo ataca también a la torre de e4: ya es una horquilla.",
       "El rey sale del jaque, pero no puede proteger la torre.",
       "El caballo captura la torre con jaque. La lección: si la horquilla está a dos saltos, busca un primer salto con jaque."
      ],
      "arrows": [
       [
        "e5",
        "f3",
        "r"
       ],
       [
        "f3",
        "d2",
        "r"
       ],
       [
        "d2",
        "e4",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r5k1/p6p/6p1/2N5/2p5/4nN1P/PRP1rRP1/6K1 b - - 4 23",
      "caption": "Juegan negras: el blanco acaba de ofrecer el cambio de torres en f2. Aprovecha para ganar material.",
      "line": [
       "Rxf2",
       "Kxf2",
       "Nd1+",
       "Ke2",
       "Nxb2"
      ],
      "comments": [
       "Se acepta el cambio de una forma concreta: la captura obliga al rey blanco a ir a f2, una casilla que el caballo puede atacar con jaque.",
       "Forzado: si el blanco no recaptura, queda con una torre de menos.",
       "¡Horquilla! Desde d1 el caballo da jaque al rey de f2 y ataca a la torre de b2.",
       "El rey debe atender el jaque y no puede proteger la torre.",
       "El negro gana la torre y queda con una pieza de más. Fíjate en la atracción previa: sin Rxf2 el rey no estaba en la casilla bifurcable."
      ]
     },
     {
      "fen": "r4rk1/pp3pp1/2pq1n1p/3pnb2/3P4/1Q2PN1P/PP3PP1/R3KB1R w KQ - 0 13",
      "caption": "Juegan blancas: el negro acaba de capturar en e5 con el caballo. ¿Cómo recuperas el material con intereses?",
      "line": [
       "dxe5",
       "Qe6",
       "exf6"
      ],
      "comments": [
       "El peón recaptura el caballo y, desde e5, ataca a la vez a la dama de d6 y al caballo de f6: el «truco de la horquilla» de peón.",
       "La dama tiene que salvarse; el caballo de f6 se queda sin defensa suficiente.",
       "El peón captura el caballo: el blanco gana una pieza limpia."
      ]
     },
     {
      "fen": "r5k1/1b1p3p/1pn1q1p1/pBp5/4N3/3P4/PPP3PP/R3Q1K1 w - - 2 20",
      "caption": "Juegan blancas: el caballo de e4 está clavado contra tu dama. Encuentra la combinación que gana material.",
      "line": [
       "Bc4",
       "d5",
       "Bxd5",
       "Qxd5",
       "Nf6+",
       "Kg7",
       "Nxd5"
      ],
      "comments": [
       "El alfil clava a la dama contra el rey por la diagonal c4-g8 y, de paso, el caballo de e4 deja de estar en peligro.",
       "El negro tapa la diagonal con el peón: es la única forma de no perder la dama.",
       "El alfil captura el peón y vuelve a clavar: el negro tiene que tomar en d5.",
       "Si captura el alfil de b7, la misma horquilla gana ese alfil; con la dama, pierde la dama.",
       "Horquilla de caballo al rey de g8 y a la dama de d5: el sacrificio previo llevó la dama a la casilla bifurcable.",
       "El rey sale del jaque.",
       "El caballo captura la dama y el blanco queda con ventaja decisiva."
      ]
     },
     {
      "fen": "3k4/pb3Q1N/1pq1p1p1/8/2Pr4/P4P2/1P4PP/6K1 w - - 1 29",
      "caption": "Juegan blancas: el rey y la torre negros están sin protección. Encuentra el doble ataque.",
      "line": [
       "Qf6+",
       "Kc8",
       "Qxd4"
      ],
      "comments": [
       "Jaque al rey de d8 por la diagonal f6-d8 y, a la vez, ataque a la torre de d4 por la diagonal f6-d4. Es una horquilla de dama.",
       "El rey tiene que moverse y la torre queda sin defensa.",
       "La dama captura la torre y el blanco queda con ventaja decisiva."
      ]
     }
    ]
   },
   "t-clavada": {
    "html": "<h4>Por qué una clavada es una debilidad duradera</h4><p>La mayoría de los motivos tácticos son instantáneos: o funcionan en esta jugada o desaparecen. La clavada, en cambio, puede durar muchas jugadas. Mientras dure, la pieza clavada no defiende de verdad, no puede escapar y obliga al rival a gastar tiempo en sostenerla. Por eso la regla práctica es doble: <b>«ataca lo que está clavado»</b> y <b>«no tengas prisa en cobrar»</b>. Muchas veces conviene sumar un atacante más (un peón, una torre a la columna) antes que capturar enseguida.</p><p>Distingue con cuidado los dos tipos. En la clavada <b>absoluta</b> (detrás está el rey) la pieza clavada no puede moverse fuera de la línea: es ilegal. En la clavada <b>relativa</b> (detrás hay una dama o una torre) sí puede moverse, y a veces lo hace con un golpe, como en el mate de Légal. Una pieza clavada de forma relativa sigue «amenazando» sus casillas, aunque moverla cueste material.</p><h4>Cómo explotar una clavada, paso a paso</h4><ol><li><b>Inmovilizar</b>: asegúrate de que la clavada no se pueda romper fácilmente (por ejemplo, impidiendo que el rey se aparte de la línea o que se interponga otra pieza).</li><li><b>Atacar con piezas de menos valor</b>: un peón que ataca a un caballo clavado gana material, porque el caballo no puede huir.</li><li><b>Acumular presión</b>: si la pieza clavada está defendida una vez, atácala dos veces. Cuenta atacantes y defensores, sin contar como defensor a otra pieza que también esté clavada.</li><li><b>Aprovechar lo que la pieza clavada ya no defiende</b>: un caballo clavado en f6 no vigila h7 ni g4; un peón g7 clavado en la columna g no puede capturar en f6 ni en h6. Esto abre la puerta a saltos de caballo, jaques y mates que parecían imposibles.</li></ol><h4>Clavadas que se rompen: las excepciones</h4><p>La clavada no es invencible. Se rompe cuando la pieza clavada se mueve <b>con jaque</b> o con una amenaza mayor (si la clavada es relativa), cuando el rival puede <b>interponer</b> una pieza con ganancia de tiempo, cuando puede <b>contraatacar a la pieza que clava</b> (el clásico <span class=\"mv\">h6</span> y <span class=\"mv\">g5</span> contra el alfil de g5) o cuando la pieza de detrás se aparta con tempo. Antes de basar un plan en una clavada, busca estas cuatro salidas desde el punto de vista del rival.</p><p>Un caso especial es la <b>clavada cruzada</b>: la pieza que clava también está clavada o atacada. Y otro, muy frecuente, es la <b>contraclavada</b>: el defensor interpone una pieza que a su vez clava a la nuestra en otra línea.</p><h4>Errores típicos y cómo pensarlo en la partida</h4><p>Los aficionados suelen cometer dos errores opuestos: o capturan la pieza clavada demasiado pronto, cuando con una jugada más de preparación ganaban más, o se olvidan de que <b>sus propias piezas</b> están clavadas y las cuentan como defensoras. Cada vez que tu rey o tu dama queden en la misma línea que una torre, un alfil o la dama rival, aunque haya piezas en medio, pregúntate qué pasaría si esas piezas se apartaran.</p><ul><li>¿Hay alguna pieza rival en línea con su rey o su dama? ¿Puedo ponerme detrás con un alfil, torre o dama?</li><li>¿La pieza clavada defiende algo importante? Entonces esa defensa es ficticia.</li><li>¿Puedo atacarla con un peón? ¿Puedo sumar un atacante más?</li><li>¿Qué recursos tiene el rival para romperla: jaque, interposición, ataque a la pieza que clava?</li></ul>",
    "keyPoints": [
     "La clavada es duradera: suma atacantes antes de cobrar y no cuentes como defensora a una pieza clavada.",
     "Antes de confiar en una clavada, busca las salidas del rival: jaque, interposición o ataque a la pieza que clava."
    ],
    "positions": [
     {
      "fen": "1r1q1rk1/5ppp/b2p4/p7/2B1P1PP/2Q2P2/PP6/2KR3R b - - 0 20",
      "orientation": "black",
      "caption": "Juegan negras. Un cambio previo lleva a la dama blanca a la columna c, donde también está su rey.",
      "line": [
       "Bxc4",
       "Qxc4",
       "Rc8",
       "Qxc8",
       "Qxc8+"
      ],
      "comments": [
       "El negro cambia alfiles. La recaptura con la dama es la natural, pero coloca a la dama en la columna del rey.",
       "La dama recaptura; ahora dama y rey blancos están en la misma columna.",
       "Clavada absoluta: la torre ataca a la dama, que no puede apartarse porque detrás está el rey.",
       "Lo único que puede hacer la dama es capturar a la torre que la clava.",
       "La dama negra recaptura con jaque: el negro cambió torre por dama y queda con ventaja decisiva."
      ],
      "arrows": [
       [
        "c8",
        "c1",
        "r"
       ]
      ]
     },
     {
      "fen": "1r4k1/p3Pp1p/2n3p1/3P1b2/8/2P5/P2R2PP/5K2 w - - 0 27",
      "orientation": "white",
      "caption": "Juegan blancas. El peón de e7 está a un paso de coronar; una clavada en la octava fila decide.",
      "line": [
       "dxc6",
       "Re8",
       "Rd8"
      ],
      "comments": [
       "Se recupera la pieza. Ahora el negro debe vigilar e8 sin descuidar su última fila.",
       "El negro bloquea con la torre delante del peón (tampoco salva la partida ...Kg7, por Rd8 y el peón corona).",
       "La torre ataca a la torre de e8, que está clavada contra el rey de g8: no puede salir de la octava, y si captura en d8, el peón corona. El negro pierde la torre."
      ],
      "arrows": [
       [
        "d8",
        "g8",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r4kr1/pp1n3p/2p1b3/2q1Pn1B/5Q2/2B4P/PP4P1/R3K2R w KQ - 0 21",
      "caption": "Juegan blancas: la dama negra acaba de capturar en c5. ¿Cómo se gana la dama?",
      "line": [
       "Bb4",
       "Kg7",
       "Bxc5"
      ],
      "comments": [
       "El alfil clava a la dama contra el rey de f8 por la diagonal b4-f8. La dama no puede salir de esa línea.",
       "Si la dama captura el alfil, la dama blanca la captura en b4 con jaque. El negro aparta el rey para romper la clavada, pero la dama sigue atacada.",
       "El alfil captura la dama: dama por alfil."
      ]
     },
     {
      "fen": "1R2r1k1/4npbp/p3p1p1/2Q5/q3p3/2P4P/5PP1/1R4K1 w - - 0 27",
      "caption": "Juegan blancas: la torre de b8 ya presiona la octava fila. Gana material aprovechando una pieza paralizada.",
      "line": [
       "Qxe7",
       "Qd1+",
       "Rxd1"
      ],
      "comments": [
       "La dama captura el caballo de e7 porque la torre de e8 está clavada contra el rey por la torre de b8: no puede recapturar.",
       "El negro intenta un contraataque con jaque en la primera fila.",
       "La torre de b1 captura la dama. El blanco ganó una pieza y conserva la presión contra la torre clavada."
      ]
     },
     {
      "fen": "3bnkr1/3b1pp1/p3p2p/1qQp4/N7/1B3P2/PPP3PP/3RR1K1 b - - 7 22",
      "caption": "Juegan negras: la dama blanca te da jaque en c5. Responde de forma que ganes una pieza.",
      "line": [
       "Qxc5+",
       "Nxc5",
       "Bb6",
       "Kh1",
       "Bxc5"
      ],
      "comments": [
       "Se cambian las damas con jaque; la recaptura del caballo lo lleva a c5.",
       "El caballo recaptura y queda en la diagonal que lleva al rey de g1.",
       "El alfil clava al caballo contra el rey: c5, d4, e3, f2 y g1 están en la misma diagonal.",
       "El blanco aparta el rey para que el caballo pueda moverse, pero ya es tarde.",
       "El alfil captura el caballo. Una clavada absoluta + un ataque más = pieza ganada."
      ]
     },
     {
      "fen": "r1b2rk1/pp3pp1/3p3p/3N3q/2n1P3/1P4Q1/P1P3PP/R4R1K w - - 0 18",
      "caption": "Juegan blancas: la dama negra de h5 parece segura. Busca el salto que gana la dama.",
      "line": [
       "Nf6+",
       "Kh8",
       "Nxh5"
      ],
      "comments": [
       "El caballo da jaque desde f6 y ataca a la dama de h5. El peón g7 no puede capturarlo porque está clavado por la dama de g3 en la columna g.",
       "El rey tiene que apartarse.",
       "El caballo captura la dama. La pieza clavada (el peón g7) no defendía de verdad la casilla f6."
      ]
     }
    ]
   },
   "t-enfilada": {
    "html": "<h4>La geometría de la enfilada</h4><p>En la enfilada atacamos a una pieza valiosa que tiene detrás, en la misma línea, otra pieza. Cuando la de delante se aparta, capturamos la de detrás. Solo la producen las piezas de largo alcance: el alfil por las diagonales, la torre por filas y columnas, y la dama por ambas. La enfilada más fuerte es la que se da <b>con jaque</b>, porque el rey no tiene elección: debe moverse y deja la pieza de detrás a merced del atacante.</p><p>Hay también enfiladas <b>relativas</b>: atacamos a la dama y detrás hay una torre o un caballo sin defensa. Aquí el rival puede interponer o defender la pieza de detrás, así que hay que comprobar que la segunda pieza no esté protegida y que la de delante no pueda apartarse defendiendo a la de atrás (por ejemplo, una dama que se mueve por la misma línea y sigue defendiendo a su torre).</p><h4>Dónde aparece: finales de torres y reyes al descubierto</h4><p>La enfilada es el motivo táctico por excelencia de los <b>finales</b>, porque los reyes están activos en el centro del tablero y las piezas pesadas recorren filas y columnas abiertas. Tres situaciones se repiten constantemente:</p><ul><li><b>Torre contra torre con peón en séptima</b>: si el rey defensor está en la misma fila o columna que la torre rival, un jaque lateral gana la torre (por ejemplo, la torre en la octava que vigila un peón y el rey en la séptima).</li><li><b>Peón a punto de coronar</b>: el bando débil captura la nueva dama con su torre... y un jaque en la línea del rey gana esa torre. A la inversa, un defensor puede coronar sabiendo que la enfilada le devuelve el material.</li><li><b>Alfil contra rey y pieza en la misma diagonal</b>: muy frecuente en finales de alfiles y en posiciones con reyes que avanzan por casillas del color del alfil rival.</li></ul><h4>Cómo se fabrica una enfilada</h4><p>Como la horquilla, la enfilada muchas veces hay que prepararla. Las técnicas típicas son: <b>cambiar primero</b> la pieza que defiende o bloquea la línea; <b>dar un jaque previo</b> que obligue al rey a ponerse en línea con su pieza; o una <b>jugada tranquila</b> que lleve nuestra torre o alfil a la línea correcta sin que el rival pueda deshacer la alineación (por ejemplo, doblar torres en una columna para que el jaque final llegue con apoyo). La jugada tranquila es la más difícil de ver, porque no da jaque ni captura nada.</p><h4>Errores frecuentes y lista de comprobación</h4><p>El error más común es dar el jaque de enfilada cuando la pieza de detrás está defendida: el rey se aparta, cambiamos la pieza y no ganamos nada. Otro es no ver que el rey rival puede apartarse <b>defendiendo</b> a su pieza (por ejemplo, el rey va al lado de su torre). Y a la defensiva, el error es dejar el rey en la misma línea que nuestra dama o torre sin necesidad: en los finales, piensa antes de cada jugada de rey si queda alineado con alguna de tus piezas y con una pieza rival de largo alcance.</p><ul><li>¿Están el rey o la dama rival en la misma fila, columna o diagonal que otra de sus piezas?</li><li>¿La pieza de detrás está defendida? ¿Puedo cambiar o desviar a su defensor primero?</li><li>¿Puedo dar el jaque desde una casilla segura, y el rey puede apartarse defendiendo a su pieza?</li><li>Si no hay enfilada ahora, ¿hay un jaque o una jugada tranquila que la cree?</li></ul>",
    "keyPoints": [
     "La enfilada con jaque es la más fuerte; en la relativa, comprueba que la pieza de detrás no esté defendida.",
     "En los finales, revisa siempre si tu rey queda en línea con una de tus piezas."
    ],
    "positions": [
     {
      "fen": "2k2r2/R7/8/pR6/8/5p1P/r5PK/8 w - - 0 41",
      "orientation": "white",
      "caption": "Juegan blancas. El rey y la torre negros están en la misma fila: la enfilada clásica de los finales de torres.",
      "line": [
       "Ra8+",
       "Kd7",
       "Rxf8"
      ],
      "comments": [
       "Jaque por la octava fila: el rey de c8 está delante y la torre de f8 detrás, en la misma línea.",
       "El rey tiene que salir de la fila (también ...Kc7 o ...Kb7 pierden la torre).",
       "La torre captura en f8 y el blanco queda con una torre de más."
      ],
      "arrows": [
       [
        "a8",
        "f8",
        "r"
       ]
      ]
     },
     {
      "fen": "r2q1rk1/pp3ppp/2bp1b2/8/4PQ2/1BP5/PP1N1PPP/R4RK1 b - - 0 15",
      "orientation": "black",
      "caption": "Juegan negras. Enfilada relativa: la dama blanca está delante y el caballo de d2, sin defensa, detrás.",
      "line": [
       "Bg5",
       "Qg3",
       "Bxd2"
      ],
      "comments": [
       "El alfil ataca a la dama de f4; detrás, en la misma diagonal, está el caballo de d2.",
       "La dama tiene que apartarse y no puede hacerlo defendiendo el caballo.",
       "El alfil captura el caballo: la pieza de detrás cae al apartarse la de delante."
      ],
      "arrows": [
       [
        "g5",
        "d2",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "1r4k1/1pp2pp1/p7/8/1PP1r3/7R/5PK1/R7 w - - 2 31",
      "caption": "Juegan blancas: no hay jaque inmediato que gane material. Prepara la enfilada con una jugada tranquila.",
      "line": [
       "Rah1",
       "Kf8",
       "Rh8+",
       "Ke7",
       "Rxb8"
      ],
      "comments": [
       "Las torres se doblan en la columna h. Amenaza Rh8+, protegida por la otra torre, seguida de la captura de la torre de b8.",
       "El rey intenta escapar hacia el centro; nada impide el jaque.",
       "Jaque en la octava fila: el rey debe apartarse y la torre de b8 queda detrás, en la misma fila.",
       "El rey sale del jaque.",
       "La torre captura en b8. La jugada clave fue la tranquila Rah1."
      ]
     },
     {
      "fen": "4r1k1/pp3p1p/2pb2p1/8/8/P4BqP/1PQB2P1/R5K1 b - - 4 26",
      "caption": "Juegan negras: la dama ya está cerca del rey blanco. Busca la serie de jaques que gana material.",
      "line": [
       "Qh2+",
       "Kf1",
       "Qh1+",
       "Kf2",
       "Qxa1"
      ],
      "comments": [
       "Primer jaque: obliga al rey a ir a f1.",
       "Es la única casilla del rey.",
       "Jaque por la primera fila: el rey de f1 está delante y la torre de a1 detrás, en la misma fila.",
       "El rey tiene que salir de la fila.",
       "La dama captura la torre de a1."
      ]
     },
     {
      "fen": "4k2r/5ppp/pR1b1n2/3p1p2/P7/r5P1/2P1PPBP/R5K1 w k - 0 23",
      "caption": "Juegan blancas: el negro acaba de capturar en a3. Recaptura y gana material en la octava fila.",
      "line": [
       "Rxa3",
       "Bxa3",
       "Rb8+",
       "Kd7",
       "Rxh8"
      ],
      "comments": [
       "Se cambian las torres. El alfil de d6, que vigilaba b8, tiene que recapturar en a3.",
       "El alfil abandona la diagonal que controlaba b8.",
       "Ahora la torre entra con jaque en b8: el rey de e8 está delante y la torre de h8 detrás.",
       "El rey sale del jaque.",
       "La torre captura en h8: enfilada preparada con un cambio que desvía al defensor de b8."
      ]
     },
     {
      "fen": "8/1p3r2/pkp4R/5P2/PP6/3BK3/1b6/8 b - - 1 58",
      "caption": "Juegan negras: la torre blanca de h6 parece bien colocada. Aprovecha la posición del rey blanco.",
      "line": [
       "Bc1+",
       "Ke4",
       "Bxh6"
      ],
      "comments": [
       "Jaque de alfil por la diagonal c1-h6: el rey de e3 está delante y la torre de h6 detrás.",
       "El rey tiene que apartarse.",
       "El alfil captura la torre."
      ]
     }
    ]
   },
   "t-descubierto": {
    "html": "<h4>La pieza delantera manda</h4><p>En el ataque descubierto la clave no es la pieza de detrás, que ya está apuntando, sino la <b>pieza delantera</b>: ella decide con qué segunda amenaza acompañar al ataque que se descubre. Por eso, cuando encuentres una alineación (tu alfil, torre o dama apuntando al rey o a la dama rival con una pieza propia en medio), recorre todas las jugadas posibles de la pieza delantera y pregúntate cuál crea la amenaza más fuerte: capturar una pieza, atacar a la dama, amenazar mate o dar jaque ella misma.</p><p>El jaque descubierto es casi siempre devastador, porque el rival debe atender el jaque y la pieza delantera puede capturar <b>lo que quiera</b>, incluso algo defendido, siempre que no quede atrapada después. Una pieza delantera muy útil es el <b>peón</b>: un avance de peón con jaque descubierto que además ataca una pieza, o que captura algo, gana material con frecuencia.</p><h4>El jaque doble: la única respuesta es mover el rey</h4><p>Si la pieza delantera también da jaque, tenemos un jaque doble. No se puede capturar a las dos piezas que dan jaque ni interponer en dos líneas a la vez: solo se puede mover el rey. Por eso el jaque doble es la base de muchos mates sorprendentes, incluso con poco material: dama y alfil, torre y caballo, o caballo y alfil pueden dar mate a un rey rodeado de defensores, porque esos defensores no sirven contra un jaque doble. Cuando calcules, si una pieza tuya puede dar jaque y a la vez descubrir otro jaque, revisa esa jugada antes que cualquier otra.</p><h4>Cómo se prepara</h4><p>Las alineaciones no siempre están listas. Las formas típicas de crearlas son:</p><ol><li><b>Llevar la pieza de largo alcance detrás</b>: una torre a la columna del rey, un alfil a la diagonal de la dama.</li><li><b>Obligar al rey o a la dama a ponerse en línea</b> con un sacrificio o un jaque previo.</li><li><b>Abrir la línea</b> con un cambio: a veces la pieza delantera es del rival y basta con eliminarla.</li></ol><p>A la inversa, el defensor debe desconfiar de cualquier alineación de su rey o su dama con una pieza rival de largo alcance, aunque haya dos o tres piezas en medio. La pregunta defensiva es: «si esas piezas desaparecen, ¿qué queda atacado?».</p><h4>Errores comunes y lista de comprobación</h4><p>El error más habitual es mover la pieza delantera a una casilla que no crea ninguna amenaza nueva: el rival simplemente atiende el ataque descubierto y todo queda en nada. Otro es elegir una captura vistosa con la pieza delantera y que luego esa pieza quede atrapada o se pueda recuperar con un jaque. Y un tercero, más sutil: olvidar que el rival también puede tener piezas alineadas con nuestro rey, y que su respuesta al jaque puede ser un contrajaque descubierto.</p><ul><li>¿Hay piezas mías alineadas con el rey o la dama rival, con algo en medio?</li><li>¿A qué casillas puede ir la pieza delantera? ¿Cuál crea la segunda amenaza más fuerte?</li><li>¿Puede la pieza delantera dar jaque ella misma (jaque doble)?</li><li>Después de cobrar, ¿mi pieza queda segura o atrapada?</li></ul>",
    "keyPoints": [
     "La pieza delantera decide: elige la jugada que cree la segunda amenaza más fuerte.",
     "Contra el jaque doble no hay interposición ni captura posible: solo mover el rey."
    ],
    "positions": [
     {
      "fen": "2kr1bnr/pp3ppp/1np5/4P3/3QB2q/8/PPP2PPP/R1B2RK1 w - - 4 12",
      "orientation": "white",
      "caption": "Juegan blancas. El alfil de e4 tapa la cuarta fila entre las dos damas: al apartarse con jaque, descubre el ataque a la dama de h4.",
      "line": [
       "Bf5+",
       "Kb8",
       "Qxh4"
      ],
      "comments": [
       "El alfil da jaque al rey de c8 y, al salir de e4, la dama de d4 ataca a la dama negra por la cuarta fila. Dos amenazas en una jugada.",
       "El negro debe atender el jaque y no tiene tiempo de salvar la dama.",
       "La dama blanca captura la dama negra: la pieza delantera eligió la casilla que creaba la segunda amenaza más fuerte, el jaque."
      ],
      "arrows": [
       [
        "e4",
        "f5",
        "g"
       ],
       [
        "d4",
        "h4",
        "r"
       ]
      ]
     },
     {
      "fen": "8/p2rk2p/1p3pp1/4P3/2r5/6P1/P2R3P/4R1K1 w - - 0 30",
      "orientation": "white",
      "caption": "Juegan blancas. Un jaque doble en pleno final: el peón captura con jaque y, a la vez, abre la columna e para la torre.",
      "line": [
       "exf6+",
       "Kxf6",
       "Rxd7"
      ],
      "comments": [
       "El peón captura en f6 dando jaque y descubre el jaque de la torre de e1: jaque doble. El negro no puede capturar ni interponer, solo mover el rey.",
       "El rey tiene que moverse y abandona la defensa de su torre de d7.",
       "La torre de d2 captura la torre de d7: el jaque doble alejó al único defensor."
      ],
      "arrows": [
       [
        "e1",
        "e7",
        "r"
       ],
       [
        "e5",
        "f6",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1b1kb1r/pp2pppp/2np4/qBpP4/4n3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 7",
      "caption": "Juegan blancas: el caballo negro acaba de capturar en e4 y amenaza en c3. Calcula la secuencia de jaques descubiertos.",
      "line": [
       "dxc6",
       "Nxc3",
       "cxb7+",
       "Nxb5+",
       "Bd2"
      ],
      "comments": [
       "El peón captura el caballo de c6 sin preocuparse por c3: lo importante es el peón que avanza hacia b7, delante del alfil de b5.",
       "El negro captura en c3 y amenaza a la dama de d1.",
       "El peón captura en b7 y descubre el jaque del alfil de b5 sobre el rey de e8. Además amenaza coronar en a8 o en c8.",
       "El negro responde con su propio jaque descubierto: el caballo captura el alfil y la dama de a5 da jaque al rey blanco.",
       "El alfil tapa el jaque atacando a la dama de a5. El negro no puede atender a la vez la dama y la coronación del peón de b7: el blanco gana material."
      ]
     },
     {
      "fen": "r3kb1r/pp1n1ppp/q1p1p3/3pPn2/3P2P1/1QN2N2/PPPB1P1P/2KR3R b kq g3 0 11",
      "caption": "Juegan negras: el blanco acaba de avanzar g4 contra tu caballo. Busca un ataque descubierto contra la dama blanca.",
      "line": [
       "Nxd4",
       "Nxd4",
       "Nc5",
       "Qa3",
       "Nd3+",
       "cxd3",
       "Bxa3"
      ],
      "comments": [
       "El caballo captura el peón de d4 en lugar de retirarse: la recaptura aleja al caballo blanco de f3.",
       "El blanco recupera la pieza.",
       "El caballo de d7 ataca a la dama de b3 y prepara un salto a d3 con jaque.",
       "La dama se aparta a a3 ofreciendo el cambio de damas.",
       "Jaque de caballo desde d3: al salir de c5, el caballo descubre la diagonal f8-a3 del alfil, que ahora ataca a la dama blanca.",
       "El blanco tiene que capturar el caballo para salir del jaque.",
       "El alfil captura la dama: el caballo que daba jaque era la pieza delantera de un ataque descubierto."
      ]
     },
     {
      "fen": "6r1/1kpn1q2/1p3p1p/2pPpr2/1B6/1Q3B2/5RPP/5K2 w - - 0 31",
      "caption": "Juegan blancas: tu alfil de f3 apunta al rey de b7, pero tu propio peón de d5 tapa la diagonal. Aprovéchalo.",
      "line": [
       "d6+",
       "Rxf3",
       "Qxf7",
       "Rxf2+",
       "Kxf2"
      ],
      "comments": [
       "El peón avanza y descubre el jaque del alfil de f3 sobre el rey de b7.",
       "El negro elimina la pieza que da jaque, pero la torre abandona la defensa de su dama.",
       "La dama blanca captura la dama de f7, que se quedó sin defensa.",
       "El negro recupera algo de material con jaque.",
       "El rey recaptura y el blanco queda con dama contra torre."
      ]
     },
     {
      "fen": "r4rk1/pp1b1p1p/3b1Pp1/B3n1P1/2pP3N/7P/P1P1n1BK/R2Q1R2 b - - 0 21",
      "caption": "Juegan negras: tu alfil de d6 apunta al rey de h2 y el caballo de e5 está en medio. Encuentra el mate.",
      "line": [
       "Nf3+",
       "Kh1",
       "Ng3#"
      ],
      "comments": [
       "Jaque doble: el caballo da jaque desde f3 y descubre el jaque del alfil de d6. El rey blanco solo puede moverse.",
       "Es la única casilla: g1 lo controla el caballo de e2 y g3 el alfil.",
       "El otro caballo da jaque desde g3 y el rey no tiene casillas: jaque mate."
      ]
     }
    ]
   },
   "t-desviacion": {
    "html": "<h4>El concepto con precisión</h4><p>Desviar es obligar a una pieza rival a abandonar una tarea defensiva. La pieza puede estar defendiendo una casilla de mate, una casilla de coronación, otra pieza o una línea (una fila, una columna, una diagonal). El medio para desviarla tiene que ser <b>forzante</b>: un jaque, una captura que hay que recuperar, una oferta de material que no se puede rechazar sin perder otra cosa, o una amenaza mayor. Si el rival puede ignorar nuestra oferta, no hay desviación.</p><p>Fíjate en la diferencia con la atracción: en la desviación nos interesa la casilla que la pieza <b>abandona</b>; en la atracción, la casilla a la que la <b>llevamos</b>. Muchas combinaciones mezclan ambas ideas, y no hace falta clasificarlas con exactitud: lo importante es ver qué tarea cumple cada pieza defensora.</p><h4>Los blancos clásicos de la desviación</h4><ul><li><b>El defensor de la última fila</b>: una torre o dama que impide el mate del pasillo. Un jaque o una captura que la obligue a dejar la fila abre la puerta al mate.</li><li><b>El guardián de la casilla de coronación</b>: la torre que vigila la columna del peón pasado. Se la desvía con un sacrificio en su línea o con un jaque que la obligue a capturar.</li><li><b>El defensor de una pieza</b>: si una pieza sostiene a otra, un jaque que la obligue a moverse deja colgada a la protegida.</li><li><b>El rey como defensor</b>: en los finales, el rey suele ser el único que frena un peón. Un sacrificio o un peón que lo obliga a ir a un flanco deja libre el otro (la idea de los peones pasados alejados).</li></ul><h4>Cómo encontrarla: el inventario de tareas</h4><p>El método es sistemático. Para cada pieza defensora del rival, escribe mentalmente su lista de tareas: «la torre de d8 vigila la octava y defiende al caballo de d4», «el rey de c7 frena el peón de h y protege b7». Después, para cada tarea vital, pregúntate: ¿qué jugada forzante obliga a esa pieza a hacer otra cosa? Los jaques primero, luego las capturas y por último las amenazas. A menudo la jugada desviadora es un sacrificio en una casilla que la pieza <b>debe</b> capturar, o una entrada de nuestra torre en la misma línea que defiende la pieza rival.</p><h4>Errores frecuentes</h4><p>El primer error es ofrecer material que el rival no está obligado a aceptar: si puede declinar la oferta y seguir defendiendo, perdimos un tiempo o una pieza. El segundo es no comprobar que, una vez desviada la pieza, la amenaza realmente funciona: quizá otra pieza rival cubre la misma casilla, o el rey puede escapar. El tercero es elegir mal el orden: cuando hay dos desviaciones posibles, la que lleva jaque suele ser la correcta porque no da tiempo al rival.</p><ul><li>¿Qué defiende cada pieza rival? ¿Alguna es la única defensora de algo vital?</li><li>¿Tengo un jaque, una captura o una oferta que la obligue a moverse?</li><li>Si la acepta, ¿qué gano? Si la rechaza, ¿qué gano?</li><li>¿Hay otra pieza rival que pueda asumir la tarea del defensor desviado?</li></ul>",
    "keyPoints": [
     "La desviación debe ser forzante: si el rival puede ignorar la oferta, no hay combinación.",
     "Calcula las dos ramas: qué ganas si acepta y qué ganas si rechaza."
    ],
    "positions": [
     {
      "fen": "2r2rk1/pp4b1/3p1np1/q2Pp3/4P3/2N4Q/PP3P2/2KR3R w - - 2 20",
      "orientation": "white",
      "caption": "Juegan blancas. La torre de f8 defiende a la torre de c8 por la octava fila. Un jaque la desvía de esa tarea.",
      "line": [
       "Qe6+",
       "Rf7",
       "Qxc8+"
      ],
      "comments": [
       "Jaque en la diagonal e6-g8. El rey no tiene casillas (h8 y h7 las controla la torre de h1, f7 la dama, y en g7 está su alfil), así que la única jugada es interponer la torre de f8.",
       "La torre tapa el jaque, pero ya no defiende la octava fila.",
       "La dama captura la torre de c8 con jaque. La desviación funcionó porque el jaque obligaba a responder."
      ],
      "arrows": [
       [
        "h3",
        "e6",
        "g"
       ],
       [
        "f8",
        "c8",
        "r"
       ]
      ]
     },
     {
      "fen": "7r/2p5/3b1p2/5kp1/3BR3/6P1/PPP2P1r/4RK2 b - - 5 25",
      "orientation": "black",
      "caption": "Juegan negras. La torre blanca de e4 defiende a la de e1. Las torres negras empujan al rey y un peón desvía al defensor.",
      "line": [
       "Rh1+",
       "Kg2",
       "R8h2+",
       "Kf3",
       "g4+",
       "Rxg4",
       "Rxe1"
      ],
      "comments": [
       "Jaque en la primera fila: el rey blanco tiene que salir de la esquina.",
       "El rey va a g2.",
       "Segundo jaque: el rey se ve empujado hacia f3, delante de su torre de e4.",
       "El rey sube a f3.",
       "El peón da jaque. Si la torre de e4 lo captura, deja de defender a la torre de e1; si el rey se aparta, la torre de e1 sigue colgando.",
       "La torre captura el peón y abandona la columna e.",
       "La torre negra captura en e1: el negro gana una torre."
      ],
      "arrows": [
       [
        "g5",
        "g4",
        "g"
       ],
       [
        "e4",
        "e1",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "6k1/Q2p1p2/P5pb/4P2p/3N1q2/2P5/1r3PPP/5RK1 b - - 0 35",
      "caption": "Juegan negras: la torre de f1 defiende la primera fila. Desvíala y da mate.",
      "line": [
       "Qxf2+",
       "Rxf2",
       "Rb1+",
       "Rf1",
       "Be3+",
       "Kh1",
       "Rxf1#"
      ],
      "comments": [
       "Sacrificio de dama con jaque: la torre de f1 es la única que puede capturarla (el rey no, porque la torre de b2 protege f2).",
       "La torre captura y abandona la primera fila.",
       "Jaque en la primera fila: ahora no hay quien la defienda con comodidad.",
       "La torre vuelve a tapar en f1.",
       "El alfil da jaque por la diagonal e3-g1, ya libre de la torre de f2.",
       "El rey solo puede ir a la esquina.",
       "La torre captura en f1 con mate: la torre blanca había sido desviada dos veces."
      ]
     },
     {
      "fen": "3r4/R4P1p/8/1p4P1/2k4P/P1p5/2Kp4/8 w - - 1 55",
      "caption": "Juegan blancas: tu peón de f7 quiere coronar, pero la torre de d8 vigila la octava fila y el peón de d2 amenaza coronar también.",
      "line": [
       "Rc7+",
       "Kd5",
       "Rd7+",
       "Rxd7",
       "f8=Q"
      ],
      "comments": [
       "Primer jaque: obliga al rey negro a colocarse en la columna d, en la línea de su torre.",
       "El rey se acerca a su peón de d2.",
       "Jaque de torre en d7: si la torre de d8 captura, abandona la octava fila.",
       "El negro captura, porque el rey no tiene otra forma de salir del jaque sin perder la torre.",
       "El peón corona. La torre negra fue desviada de su tarea de vigilar f8."
      ]
     },
     {
      "fen": "r1b2nk1/pp3p1n/2pb1q1Q/3p4/3P4/2NB1N1P/PPP2PP1/4R1K1 w - - 1 16",
      "caption": "Juegan blancas: la dama negra de f6 está defendida por el caballo de h7 y la octava fila por el caballo de f8. Encuentra la combinación.",
      "line": [
       "Bxh7+",
       "Nxh7",
       "Re8+",
       "Bf8",
       "Rxf8+",
       "Nxf8",
       "Qxf6"
      ],
      "comments": [
       "El alfil captura el caballo de h7 con jaque: el caballo de f8 tiene que recapturar y deja libre la octava fila.",
       "El caballo de f8 recaptura; ahora es el único defensor de la dama de f6.",
       "Jaque en la octava fila: el negro tiene que tapar con el alfil.",
       "El alfil tapa en f8.",
       "La torre captura el alfil con jaque: el caballo de h7 tiene que recapturar y abandonar la defensa de la dama.",
       "El caballo captura en f8.",
       "La dama captura la dama de f6, que se quedó sin defensores. Dos desviaciones seguidas."
      ]
     },
     {
      "fen": "8/2k5/6pp/pP3p2/P2KpPPP/8/8/8 w - - 1 48",
      "caption": "Juegan blancas: final de peones. El peón de g6 frena tus peones del flanco de rey. Desvíalo.",
      "line": [
       "h5",
       "gxh5",
       "gxf5"
      ],
      "comments": [
       "El peón de h se ofrece: si el peón de g6 lo captura, deja de proteger f5.",
       "El negro captura (si no, h5xg6 crea un peón pasado imparable).",
       "El peón captura en f5 y queda pasado: el rey negro está lejos y no podrá detener a los peones blancos."
      ]
     }
    ]
   },
   "t-atraccion": {
    "html": "<h4>Llevar la pieza a la casilla equivocada</h4><p>La atracción consiste en obligar a una pieza rival, casi siempre el rey o la dama, a ocupar una casilla concreta donde quedará expuesta a otro golpe: una horquilla, una clavada, una enfilada, un jaque descubierto o un mate. El instrumento suele ser un <b>sacrificio que hay que aceptar</b>: si no se acepta, el rival pierde material o queda en una posición peor. Por eso la atracción casi nunca aparece sola: es la primera mitad de una combinación, y la segunda mitad es el motivo que remata.</p><p>La pregunta que hay que hacerse es al revés de lo habitual. No preguntes «¿qué puedo atacar?», sino «<b>¿en qué casilla quisiera tener al rey (o a la dama) rival?</b>». Si en esa casilla tendría una horquilla de caballo, un jaque doble o un mate, busca la forma de obligarlo a ir allí.</p><h4>Las atracciones más frecuentes</h4><ul><li><b>Al rey, para la horquilla</b>: un sacrificio de torre en f2/f7 o en la primera/última fila obliga al rey a capturar y un caballo salta con jaque a la casilla bifurcadora.</li><li><b>Al rey, para el mate</b>: el sacrificio en h7/h2 (como en el sacrificio griego) o en g7/g2 saca al rey de su refugio para darle mate con dama y torre o con dama y caballo.</li><li><b>A la dama, para la clavada o la enfilada</b>: se sacrifica una pieza en una casilla donde, al capturarla, la dama queda en línea con su rey.</li><li><b>Al rey, para un jaque descubierto</b>: se lo lleva a una línea donde una pieza nuestra puede descubrir un ataque con ganancia de tiempo.</li></ul><h4>Cómo calcular una atracción</h4><p>Una atracción con sacrificio exige calcular hasta el final, porque si el golpe posterior falla nos quedamos con material de menos. El procedimiento: (1) identifica la casilla objetivo y el motivo que funcionaría allí; (2) busca un sacrificio forzante en esa casilla; (3) revisa <b>todas</b> las respuestas del rival, incluido no aceptar el sacrificio; (4) cuenta el material al final de la variante. Si el rival puede declinar el sacrificio sin perder nada, la idea es mala.</p><p>Una buena señal de que hay una atracción es ver una casilla clave controlada por nosotros y por el rey rival a la vez, o una pieza nuestra que podría dar una horquilla si el rey estuviera solo un paso más allá.</p><h4>Errores típicos</h4><p>El aficionado suele quedarse a mitad de camino: ve el sacrificio, pero no la horquilla o el mate posterior, o los ve sin comprobar que el rey tiene otra casilla de escape. Otro error es sacrificar cuando el rival puede capturar con otra pieza distinta de la que queremos atraer (por ejemplo, con un peón en lugar del rey). Verifica siempre quién puede capturar el material ofrecido.</p><ul><li>¿En qué casilla me gustaría tener al rey o a la dama rival?</li><li>¿Hay un sacrificio en esa casilla que deban aceptar? ¿Quién puede capturar?</li><li>Tras la captura, ¿funciona el golpe final contra todas las defensas?</li><li>¿Qué pasa si el rival no acepta el sacrificio?</li></ul>",
    "keyPoints": [
     "Pregunta al revés: ¿en qué casilla quiero al rey o a la dama rival?",
     "Comprueba quién puede capturar el sacrificio y qué pasa si el rival lo rechaza."
    ],
    "positions": [
     {
      "fen": "8/p4qk1/2pN4/3p2pp/3P2n1/2Q3P1/PP1N1rP1/2R3K1 b - - 0 30",
      "orientation": "black",
      "caption": "Juegan negras. El caballo de g4 controla h2: si el rey blanco es llevado a g2, la dama da mate allí.",
      "line": [
       "Rxg2+",
       "Kxg2",
       "Qf2+",
       "Kh3",
       "Qh2#"
      ],
      "comments": [
       "Sacrificio de torre: el rey es atraído a g2.",
       "El rey captura; si no, el negro sigue con ...Qf2+ y mate.",
       "Jaque de dama: el rey solo puede ir a h3 o h1.",
       "Si va a h1, también hay mate en h2.",
       "Mate en h2, con la dama protegida por el caballo de g4."
      ],
      "arrows": [
       [
        "f2",
        "g2",
        "r"
       ]
      ]
     },
     {
      "fen": "r4rk1/3n1ppp/b2qpn2/3p4/Np1P4/4PNP1/PP3P1P/R1RQ1BK1 b - - 0 18",
      "orientation": "black",
      "caption": "Juegan negras. Si el rey blanco estuviera en f1, la dama daría un jaque que ataca también al caballo de a4.",
      "line": [
       "Bxf1",
       "Kxf1",
       "Qa6+",
       "Kg2",
       "Qxa4",
       "Qxa4",
       "Rxa4"
      ],
      "comments": [
       "El negro cambia el alfil por el de f1 para obligar al rey a recapturar.",
       "El rey recaptura y queda en la diagonal a6-f1.",
       "Jaque de dama que ataca a la vez al caballo de a4: la atracción preparó el doble ataque.",
       "El rey sale del jaque.",
       "La dama captura el caballo.",
       "El blanco cambia damas para reducir daños.",
       "La torre recaptura: el negro gana una pieza."
      ],
      "arrows": [
       [
        "a6",
        "f1",
        "r"
       ],
       [
        "d6",
        "a6",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "1kr5/pp3P2/n3Q3/8/3Pp3/5P2/PP2q3/2KR4 w - - 1 37",
      "caption": "Juegan blancas: tu peón de f7 está a un paso de coronar, pero la dama negra amenaza tu rey. Encuentra la forma de coronar con ganancia de tiempo.",
      "line": [
       "Qxc8+",
       "Kxc8",
       "f8=Q+"
      ],
      "comments": [
       "La dama se sacrifica en c8 con jaque: el rey negro es atraído a c8, en la misma fila que la casilla de coronación.",
       "Captura forzada: el rey es la única pieza que puede tomar la dama.",
       "El peón corona con jaque. El negro no tiene tiempo para atacar al rey blanco y queda con una torre de menos."
      ]
     },
     {
      "fen": "r1b1r3/1p3p1k/2p1qPp1/3pP1Qp/3P4/7R/6PP/q4RK1 w - - 0 40",
      "caption": "Juegan blancas: el negro acaba de coronar y amenaza tu torre de f1. Encuentra el mate.",
      "line": [
       "Rxh5+",
       "Kg8",
       "Rh8+",
       "Kxh8",
       "Qh6+",
       "Kg8",
       "Qg7#"
      ],
      "comments": [
       "Sacrificio de torre con jaque: abre la columna h y empieza a atraer al rey.",
       "Si el negro captura con el peón de g6, la dama entra por la columna g; el rey a g8 parece más seguro.",
       "Segundo sacrificio: el rey es atraído a h8, donde la dama le dará jaque.",
       "Captura forzada.",
       "Jaque de dama por la columna h.",
       "El rey vuelve a g8.",
       "Mate en g7, con la dama protegida por el peón de f6."
      ]
     },
     {
      "fen": "2r1k2r/1p1bqpb1/p3p2p/3pP1pQ/1P1P4/P2B2P1/3N2PP/R4RK1 w k - 5 21",
      "caption": "Juegan blancas: la columna f está abierta y la dama negra defiende f7. Atrae a la dama a una clavada.",
      "line": [
       "Rxf7",
       "Qxf7",
       "Bg6",
       "O-O",
       "Bxf7+"
      ],
      "comments": [
       "La torre se sacrifica en f7: la dama negra es atraída a esa casilla.",
       "La dama captura la torre (si no, el blanco gana material).",
       "El alfil clava a la dama contra el rey de e8 por la diagonal g6-e8.",
       "El negro se enroca para sacar al rey de la línea, pero la dama sigue atacada.",
       "El alfil captura la dama con jaque: dama por torre."
      ]
     },
     {
      "fen": "2b1r1k1/r2n2bp/p3N1p1/1p1p4/3P4/4B2B/P1P3PP/4RRK1 w - - 2 23",
      "caption": "Juegan blancas: tu caballo de e6 tapa la columna e entre tu torre de e1 y la torre negra de e8. Busca la combinación.",
      "line": [
       "Nxg7",
       "Kxg7",
       "Bh6+",
       "Kxh6",
       "Rxe8"
      ],
      "comments": [
       "El caballo captura el alfil de g7, abre la columna e y atrae al rey a g7.",
       "El rey recaptura.",
       "Jaque de alfil: el rey es atraído a h6.",
       "El rey captura el alfil.",
       "La torre captura en e8 y el blanco queda con material de más."
      ]
     }
    ]
   },
   "t-sobrecarga": {
    "html": "<h4>Una pieza, dos tareas</h4><p>Una pieza está sobrecargada cuando tiene que cumplir dos o más tareas defensivas que no puede atender a la vez: proteger dos piezas, vigilar una casilla de mate y defender otra pieza, cubrir la última fila y una columna. Mientras nadie la pone a prueba, la sobrecarga es invisible; en cuanto la obligamos a cumplir una de sus funciones, abandona la otra. La sobrecarga es pariente de la desviación, pero el matiz es importante: aquí no hace falta un sacrificio, basta con <b>capturar o amenazar uno de los objetos</b> que defiende la pieza sobrecargada.</p><p>La forma más típica es la secuencia «captura, recaptura, captura»: tomamos algo defendido por la pieza sobrecargada; ella recaptura y deja de defender su segundo objetivo, que capturamos a continuación. El orden es fundamental: casi siempre hay que empezar por el objetivo que la pieza <b>está obligada</b> a recapturar (por ejemplo, porque si no recaptura hay mate o pierde mucho material).</p><h4>Detectarla: el inventario de defensores</h4><p>El método es contable. Para cada pieza rival que esté defendida <b>una sola vez</b>, anota quién la defiende. Haz lo mismo con las casillas críticas: casillas de mate, de coronación, de entrada en la última fila. Si el mismo defensor aparece dos veces en la lista, ya encontraste la sobrecarga. Las piezas que más se sobrecargan son la <b>dama</b> (porque los jugadores le confían muchas tareas), las <b>torres de la última fila</b> (que vigilan la fila y además una columna) y el <b>rey</b> en los finales (que debe frenar un peón y defender otro).</p><h4>Variantes del motivo</h4><ul><li><b>Sobrecarga con jaque</b>: la captura inicial es con jaque y obliga a la recaptura inmediata.</li><li><b>Sobrecarga de la casilla</b>: una casilla está defendida una vez y atacada una vez; si añadimos un segundo atacante o eliminamos un defensor, cae.</li><li><b>Sobrecarga del rey en los finales</b>: el rey no puede frenar dos peones pasados separados; ni defender un peón propio y a la vez impedir la coronación de otro rival.</li></ul><h4>Errores comunes y lista de comprobación</h4><p>El error más frecuente es empezar por el objetivo equivocado: si capturamos primero la pieza que la sobrecargada no necesita recapturar, el rival elige qué salvar y la combinación se esfuma. Otro error es no ver que el rival puede recapturar con <b>otra</b> pieza distinta de la sobrecargada, o intercalar un jaque. Y a la defensiva, el error es construir posiciones donde una sola pieza sostiene todo: cuando tu dama defiende dos piezas sueltas, ya estás a una jugada de perder material.</p><ul><li>¿Qué piezas y casillas del rival están defendidas una sola vez? ¿Por quién?</li><li>¿Algún defensor aparece dos veces en mi lista?</li><li>¿Con qué objetivo empiezo, para que la recaptura sea obligada?</li><li>¿Hay otra pieza rival que pueda recapturar en lugar de la sobrecargada?</li></ul>",
    "keyPoints": [
     "Si el mismo defensor aparece dos veces en tu lista de tareas, está sobrecargado.",
     "Empieza por el objetivo que el rival está obligado a recapturar."
    ],
    "positions": [
     {
      "fen": "r1bqr3/1p3pkp/p5p1/2pn4/P7/2NB3P/1P3PP1/R2QR1K1 w - - 0 18",
      "orientation": "white",
      "caption": "Juegan blancas. La dama negra de d8 defiende a la vez la torre de e8 y el caballo de d5: está sobrecargada.",
      "line": [
       "Rxe8",
       "Qxe8",
       "Nxd5"
      ],
      "comments": [
       "Se cambia la torre de e8, uno de los dos objetos que defiende la dama.",
       "La dama recaptura y abandona la columna d.",
       "El caballo captura en d5: ya nadie lo defiende."
      ],
      "arrows": [
       [
        "d8",
        "e8",
        "r"
       ],
       [
        "d8",
        "d5",
        "r"
       ]
      ]
     },
     {
      "fen": "r2qr1k1/2p2p1p/pp4p1/5n2/3n1B2/1N6/PP3PPP/1Q1RR1K1 w - - 0 22",
      "orientation": "white",
      "caption": "Juegan blancas. La dama negra defiende la torre de e8 y el caballo de d4. Primero se la obliga a recapturar.",
      "line": [
       "Rxe8+",
       "Qxe8",
       "Nxd4",
       "Nxd4",
       "Rxd4"
      ],
      "comments": [
       "Cambio con jaque: la dama está obligada a recapturar.",
       "La dama abandona la columna d.",
       "Ahora el caballo de d4 está atacado dos veces y defendido una.",
       "El negro recaptura.",
       "La torre captura en d4: el blanco gana una pieza."
      ],
      "arrows": [
       [
        "d8",
        "e8",
        "r"
       ],
       [
        "d8",
        "d4",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r7/ppp1qr1k/4b1p1/7p/3P1Q2/2P5/PP4P1/4RRK1 w - - 0 29",
      "caption": "Juegan blancas: la dama negra de e7 defiende al alfil de e6 y a la torre de f7. Explótalo.",
      "line": [
       "Rxe6",
       "Qxe6",
       "Qxf7+",
       "Qxf7",
       "Rxf7+"
      ],
      "comments": [
       "La torre captura el alfil: la dama de e7 debe recapturar.",
       "La dama recaptura y deja de defender la torre de f7.",
       "La dama blanca captura en f7 con jaque.",
       "El negro cambia damas.",
       "La torre recaptura con jaque: el blanco gana una pieza."
      ]
     },
     {
      "fen": "2k5/1b3p2/3p4/p1pPpP2/2P1Prr1/P2BQ2q/5RRP/5NK1 b - - 11 38",
      "caption": "Juegan negras: tienes las torres dobladas y la dama en h3. Encuentra la secuencia que gana la dama blanca.",
      "line": [
       "Rxg2+",
       "Rxg2",
       "Rxf1+",
       "Kxf1",
       "Qxe3"
      ],
      "comments": [
       "La torre captura en g2 con jaque. La torre de f2 tiene que recapturar.",
       "La torre de f2 recaptura y deja de defender el caballo de f1.",
       "La segunda torre captura el caballo con jaque: el caballo era el defensor de la dama de e3.",
       "El rey recaptura.",
       "La dama negra captura la dama de e3, que se quedó sin defensa."
      ]
     },
     {
      "fen": "r4rk1/1p1qnppp/p2b1n2/3P4/4BP2/7Q/PP1B2P1/2R1R2K w - - 3 21",
      "caption": "Juegan blancas: el caballo de f6 defiende h7 y la dama de d7. Explota la doble tarea.",
      "line": [
       "Bxh7+",
       "Nxh7",
       "Qxd7"
      ],
      "comments": [
       "El alfil captura en h7 con jaque: el caballo de f6 tiene que recapturar.",
       "El caballo recaptura y abandona la defensa de d7.",
       "La dama captura la dama negra: el caballo no podía cubrir las dos casillas."
      ]
     },
     {
      "fen": "3q4/5pkp/1p6/1P1rr1p1/R4p2/2Q2P2/5PK1/3R4 w - - 0 35",
      "caption": "Juegan blancas: la torre de d5 defiende la torre de e5 y la dama de d8. Explota la sobrecarga.",
      "line": [
       "Qxe5+",
       "Rxe5",
       "Rxd8"
      ],
      "comments": [
       "La dama captura la torre de e5 con jaque. La torre de d5 está obligada a recapturar.",
       "La torre recaptura y abandona la columna d.",
       "La torre de d1 captura la dama: el blanco gana material decisivo."
      ]
     }
    ]
   },
   "t-eliminacion": {
    "html": "<h4>Cambiar no es neutral</h4><p>Muchos aficionados ven los cambios como jugadas «neutras»: una pieza por otra del mismo valor. Pero un cambio modifica qué casillas y piezas quedan defendidas. Si capturamos al único defensor de algo valioso, aunque sea entregando una pieza de igual o mayor valor, ese algo queda indefenso. La eliminación del defensor consiste precisamente en eso: <b>identificar quién sostiene la posición rival y quitarlo de en medio</b>.</p><p>El defensor puede eliminarse de tres formas: capturándolo directamente, cambiándolo por una pieza nuestra o sacrificando material por él. La última es la más espectacular: el sacrificio de calidad <span class=\"mv\">Rxf6</span> contra el caballo que defiende h7, o el sacrificio de un alfil por el caballo que protege al rey.</p><h4>Defensores típicos que conviene eliminar</h4><ul><li><b>El caballo de f6 (o f3)</b>: protege h7, defiende d5 y e4, y bloquea ataques en la diagonal. Sin él, el enroque corto queda muy débil.</li><li><b>El alfil de casillas oscuras del enroque fianchettado</b>: cuando se cambia, f6 y h6 se convierten en agujeros.</li><li><b>La pieza que vigila una casilla de horquilla</b>: si un alfil controla e7, se cambia el alfil y después el caballo salta a e7 con horquilla.</li><li><b>La pieza que defiende la última fila</b> o que bloquea una columna abierta.</li></ul><h4>Cómo encontrarla y en qué orden jugar</h4><p>La pregunta es: <b>«¿quién defiende el objetivo?»</b>. Cuando el objetivo está defendido una sola vez, elimina al defensor. Cuando lo defienden dos piezas, a veces hay que eliminar una y desviar la otra. El orden importa: primero se elimina al defensor y <b>después</b> se ataca o captura el objetivo; si lo hacemos al revés, el defensor recaptura. Además, la eliminación muchas veces abre una segunda ventaja: la pieza que recaptura queda mal colocada y da pie a una horquilla, o se abre una línea para un jaque descubierto.</p><p>Otra idea clave es la <b>captura con tempo</b>: si al eliminar al defensor damos jaque o atacamos la dama, el rival no tiene tiempo de traer otro defensor. En cambio, si nuestra captura es tranquila, el rival puede reorganizarse.</p><h4>Errores comunes y lista de comprobación</h4><p>El error clásico es capturar el objetivo antes de eliminar al defensor. Otro, contar mal: eliminar a un defensor cuando el objetivo tiene un segundo defensor oculto (por ejemplo, una pieza en rayos X detrás de otra). Y a la defensiva: cuando una pieza tuya es la única que sostiene algo importante, protégela o duplica la defensa, porque el rival buscará cambiarla.</p><ul><li>¿Qué objetivo quiero atacar (casilla de mate, pieza, casilla de horquilla)?</li><li>¿Quién lo defiende? ¿Es el único defensor?</li><li>¿Puedo capturarlo, cambiarlo o sacrificar por él, preferiblemente con tempo?</li><li>Después de la recaptura, ¿qué piezas rivales quedan mal colocadas?</li></ul>",
    "keyPoints": [
     "Un cambio nunca es neutral: puede dejar indefenso lo que el defensor protegía.",
     "Primero se elimina al defensor y después se ataca el objetivo, mejor si es con tempo."
    ],
    "positions": [
     {
      "fen": "3rr1k1/3bRp2/p2p1pp1/1p1P4/8/3B3P/P1P2KP1/4R3 w - - 6 26",
      "orientation": "white",
      "caption": "Juegan blancas. La torre de e8 está defendida por el alfil de d7 y por la torre de d8. Se elimina a uno y el otro queda desviado.",
      "line": [
       "Rxd7",
       "Rxd7",
       "Rxe8+"
      ],
      "comments": [
       "La torre captura el alfil, uno de los dos defensores de e8.",
       "La torre de d8 recaptura y abandona la octava fila (si ...Kg7, el blanco se queda con la pieza de más).",
       "La torre de e1 captura en e8 con jaque: ya no queda ningún defensor."
      ],
      "arrows": [
       [
        "e7",
        "d7",
        "g"
       ],
       [
        "e1",
        "e8",
        "r"
       ]
      ]
     },
     {
      "fen": "3rr1k1/p1p2ppp/3b2q1/2B1pb2/4N3/2PP4/PP1Q1PPP/R3R1K1 b - - 0 19",
      "orientation": "black",
      "caption": "Juegan negras. El alfil blanco de c5 ataca a tu alfil de d6 y está defendido solo por el caballo de e4.",
      "line": [
       "Bxe4",
       "Rxe4",
       "Bxc5"
      ],
      "comments": [
       "El alfil captura al único defensor del alfil de c5.",
       "El blanco recupera la pieza.",
       "El alfil captura el alfil de c5, que se quedó sin defensa: el negro gana una pieza."
      ],
      "arrows": [
       [
        "f5",
        "e4",
        "g"
       ],
       [
        "d6",
        "c5",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r2q1rk1/pbpnnpbp/1p2pPp1/6N1/3P4/2PpB3/PP1N2PP/R2Q1RK1 w - - 0 13",
      "caption": "Juegan blancas: el peón de e6 está defendido solo por el peón de f7. Prepara un salto de caballo decisivo.",
      "line": [
       "fxg7",
       "Kxg7",
       "Rxf7+",
       "Rxf7",
       "Nxe6+",
       "Kg8",
       "Nxd8"
      ],
      "comments": [
       "El peón captura el alfil de g7 y obliga al rey a ponerse en g7, en el radio de acción de un caballo en e6.",
       "El rey recaptura.",
       "Sacrificio de calidad: la torre elimina el peón de f7, el único defensor de e6.",
       "La torre de f8 recaptura.",
       "Ahora el caballo captura en e6 con jaque y ataca a la dama de d8.",
       "El rey sale del jaque.",
       "El caballo captura la dama. La eliminación del peón de f7 abrió la casilla de la horquilla."
      ]
     },
     {
      "fen": "r1q2rk1/p1p1b1pp/3p4/3Npn2/2P5/4BQ2/PP3PPP/R4RK1 w - - 7 17",
      "caption": "Juegan blancas: el caballo de f5 vigila e7, la casilla ideal para tu caballo. Elimínalo aunque cueste caro.",
      "line": [
       "Qxf5",
       "Rxf5",
       "Nxe7+",
       "Kf7",
       "Nxc8"
      ],
      "comments": [
       "Sacrificio de dama: se elimina el caballo de f5, el que controlaba e7.",
       "El negro recaptura con la torre.",
       "El caballo captura el alfil de e7 con jaque y ataca a la dama de c8.",
       "El rey sale del jaque.",
       "El caballo captura la dama: el blanco recupera con creces el material."
      ]
     },
     {
      "fen": "r2r4/2p2ppk/1b5p/p1pN1R2/4P1n1/P2PB3/1PP3PP/3R2K1 b - - 2 21",
      "caption": "Juegan negras: el caballo blanco de d5 es una pieza fuerte. ¿Cómo aprovechas las torres blancas de d1 y f5?",
      "line": [
       "Rxd5",
       "exd5",
       "Nxe3"
      ],
      "comments": [
       "Sacrificio de calidad: la torre elimina el caballo de d5.",
       "El blanco recaptura con el peón.",
       "El caballo captura el alfil de e3 y ataca a la vez a las torres de d1 y f5: el negro recupera la calidad con ganancia."
      ]
     },
     {
      "fen": "r2q1rk1/pp2b1pp/4b3/2pnN3/Q2n4/2NP2P1/PP1BPPB1/2R2RK1 b - - 0 15",
      "caption": "Juegan negras: el caballo blanco de c3 defiende e2. Busca la forma de ganar material.",
      "line": [
       "Nxc3",
       "Bxc3",
       "Nxe2+"
      ],
      "comments": [
       "El caballo elimina al defensor de e2.",
       "El blanco recaptura.",
       "El caballo entra en e2 con jaque y ataca a la torre de c1 y al alfil de c3: el negro gana material."
      ]
     }
    ]
   },
   "t-intermedia": {
    "html": "<h4>Por qué fallan los cálculos «obvios»</h4><p>Cuando calculamos, tendemos a pensar en secuencias automáticas: «él captura, yo recapturo». La jugada intermedia rompe ese automatismo: en lugar de recapturar, se juega primero otra jugada que el rival <b>debe</b> atender (un jaque, una captura, una amenaza de mate o de ganar material grande) y solo después se recaptura, en mejores condiciones. El efecto puede ser ganar material, cambiar el orden de una combinación o neutralizar la del rival.</p><p>La jugada intermedia funciona porque el rival no puede ignorarla. Por eso los mejores candidatos son, en este orden: <b>jaques</b>, <b>capturas</b> (sobre todo de piezas de más valor) y <b>amenazas fuertes</b> (de mate o de ganar la dama). Una amenaza tranquila solo sirve si es más grave que lo que nosotros perdemos al no recapturar.</p><h4>Situaciones típicas</h4><ul><li><b>Jaque antes de recapturar</b>: el rival captura una pieza nuestra; antes de recuperarla, damos un jaque que gana un tiempo, mejora una pieza o coloca al rey rival en una casilla peor.</li><li><b>Captura de una pieza mayor</b>: el rival captura nuestro caballo; en vez de recapturar, capturamos su dama o una torre que quedó suelta, y la recaptura queda para después.</li><li><b>Contraamenaza en la combinación del rival</b>: el rival sacrifica esperando una respuesta concreta; con una jugada intermedia salimos de la secuencia forzada.</li><li><b>Escape con jaque de una pieza atacada</b>: nuestra pieza atacada se mueve dando jaque y después se recupera el material.</li></ul><h4>Cómo incorporarla a tu cálculo</h4><p>La regla práctica es revisar, <b>en cada jugada de la variante</b> y no solo en la primera, los jaques, capturas y amenazas de ambos bandos. Es lento al principio, pero se vuelve un hábito. Pregúntate en cada paso: «¿estoy obligado a recapturar ya?». Si la pieza que el rival tomó no se escapa (porque quedó atrapada o porque la recaptura seguirá disponible), tenemos libertad para insertar una jugada mejor.</p><p>También hay que mirarla al revés: cuando seas tú quien inicia una combinación, revisa si el rival tiene un jaque intermedio o una captura que desbarate tu plan. Muchas combinaciones «ganadoras» fallan porque el rival responde con una jugada intermedia y no con la recaptura esperada.</p><h4>Errores comunes</h4><p>El error más frecuente es la recaptura refleja, sin mirar alrededor. El segundo es jugar una «jugada intermedia» que no es forzante: si el rival puede ignorarla y salvar su pieza, solo perdimos material. Un tercero, más sutil, es dar un jaque intermedio que empeora nuestra posición: el rey rival se refugia en una casilla mejor, o nuestra pieza queda descolocada. Toda jugada intermedia debe <b>mejorar</b> el resultado de la recaptura posterior.</p><ul><li>¿Debo recapturar ya, o la pieza capturada no puede escapar?</li><li>¿Tengo un jaque, una captura mayor o una amenaza de mate antes de recapturar?</li><li>Después de esa jugada, ¿la recaptura sigue disponible y es mejor que antes?</li><li>¿Tiene el rival una jugada intermedia en mi combinación?</li></ul>",
    "keyPoints": [
     "En cada jugada de la variante pregunta: ¿estoy obligado a recapturar ya?",
     "La jugada intermedia debe ser forzante y mejorar el resultado de la recaptura posterior."
    ],
    "positions": [
     {
      "fen": "r1b4r/1p2kpp1/p2Np3/3pPn1p/3q1Q2/8/PP3PPP/R3KB1R w KQ - 0 16",
      "orientation": "white",
      "caption": "Juegan blancas. Las damas se atacan en d4. La recaptura automática ¿es la mejor?",
      "line": [
       "Nxf5+",
       "exf5",
       "Qxd4"
      ],
      "comments": [
       "En lugar de cambiar damas, el caballo captura el caballo de f5 con jaque: ese caballo era el que defendía a la dama negra.",
       "El negro debe recapturar o mover el rey; en ambos casos, su dama queda sin defensa.",
       "La dama captura la dama de d4 sin que el negro pueda recapturar."
      ],
      "arrows": [
       [
        "d6",
        "f5",
        "g"
       ],
       [
        "f4",
        "d4",
        "r"
       ]
      ]
     },
     {
      "fen": "3r4/8/rk5p/p2pPP1P/P1R3K1/3R4/8/8 b - - 0 45",
      "orientation": "black",
      "caption": "Juegan negras. La torre blanca acaba de capturar en c4. Si el peón recaptura de inmediato, la torre de d3 toma en d8.",
      "line": [
       "Rg8+",
       "Kf4",
       "dxc4"
      ],
      "comments": [
       "Jaque intermedio: la torre sale de la columna d con ganancia de tiempo.",
       "El rey sale del jaque.",
       "Ahora sí el peón captura en c4 y además ataca a la torre de d3: el negro queda con una torre de más."
      ],
      "arrows": [
       [
        "d8",
        "g8",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "2r5/1p2n1kp/pq1rR1p1/3P4/2P3n1/1P6/P5PP/2RQ3K w - - 0 26",
      "caption": "Juegan blancas: el caballo negro acaba de capturar en g4. Antes de recapturar, busca algo mejor.",
      "line": [
       "Rxe7+",
       "Kf6",
       "Qxg4",
       "Kxe7",
       "Qxc8"
      ],
      "comments": [
       "La torre captura el caballo de e7 con jaque: es una captura intermedia.",
       "El rey ataca a la torre.",
       "Ahora la dama recupera el caballo de g4. La torre de e7 cuelga, pero...",
       "El rey captura la torre.",
       "...la dama captura la torre de c8. El blanco ganó una pieza."
      ]
     },
     {
      "fen": "r4r1k/3n1ppp/4p3/2qpP3/5BQ1/4R3/5PPP/2R3K1 w - - 0 25",
      "caption": "Juegan blancas: la dama negra acaba de capturar en c5 y parece que solo queda recapturar. ¿Hay algo antes?",
      "line": [
       "Rg3",
       "g6",
       "Rxc5"
      ],
      "comments": [
       "Antes de recapturar, la torre amenaza mate en g7 con la dama.",
       "El negro tapa la columna con ...g6 (devolver la dama con ...Qxc1+ no es mejor).",
       "Ahora sí la torre recaptura la dama, con las casillas oscuras del enroque negro debilitadas."
      ]
     },
     {
      "fen": "r5k1/ppp3pp/2n1p3/1BP5/3Ppb1q/4BP1P/PP3P2/R2Q1RK1 b - - 0 15",
      "caption": "Juegan negras: el peón blanco acaba de capturar en f3. Antes de recapturar, busca una jugada más fuerte.",
      "line": [
       "Qxh3",
       "Bxf4",
       "exf3",
       "Qxf3",
       "Qxf3"
      ],
      "comments": [
       "La dama captura en h3 y amenaza mate en g2 o h2.",
       "El blanco captura el alfil, pero...",
       "...el peón recaptura en f3 con amenaza de mate en g2.",
       "La dama blanca tiene que capturar en f3.",
       "La dama negra captura la dama: el negro sale con ventaja material."
      ]
     },
     {
      "fen": "r2q1rk1/p4pp1/3p3p/nN1P4/2p1Pn2/P1B4P/2B2P2/R2QR1K1 b - - 0 20",
      "caption": "Juegan negras: el blanco acaba de capturar en h3. ¿Recapturas enseguida?",
      "line": [
       "Qg5+",
       "Qg4",
       "Nxh3+",
       "Kh2",
       "Qxg4"
      ],
      "comments": [
       "Jaque intermedio de dama por la columna g.",
       "El blanco tapa con la dama.",
       "El caballo recaptura en h3 con jaque y deja a la dama de g4 atacada por la dama negra.",
       "El rey sale del jaque.",
       "La dama captura la dama blanca."
      ]
     }
    ]
   },
   "t-rayosx": {
    "html": "<h4>Contar bien: atacantes y defensores en rayos X</h4><p>Cuando hay intercambios en una casilla, la forma correcta de evaluarlos es contar atacantes y defensores, y empezar siempre las capturas con la pieza de menor valor. Pero muchas piezas actúan <b>a través de otras</b>: una torre detrás de otra torre en la misma columna, una dama detrás de un alfil en la misma diagonal. Esas piezas en rayos X entran en juego en cuanto desaparece la de delante, y quien las olvida al contar comete errores de cálculo graves.</p><p>Un ejemplo típico: un caballo negro en d5 está atacado por dos torres blancas dobladas en d2 y d1, y defendido solo por la torre de d8. La torre de d1 no «ve» d5 porque la tapa la de d2, pero cuenta como segundo atacante: tras <span class=\"mv\">Rxd5</span> <span class=\"mv\">Rxd5</span> <span class=\"mv\">Rxd5</span> el blanco gana una pieza. Si el negro tuviera también una torre en d7 (dobladas en d7 y d8), habría dos defensores contra dos atacantes y la captura no ganaría nada. El orden de las piezas en la línea decide quién se queda con la última captura.</p><h4>Baterías: cómo se construyen y para qué sirven</h4><p>Una batería es una alineación de dos o más piezas de largo alcance en la misma línea. Las más habituales son: <b>torres dobladas</b> en una columna abierta, <b>dama y torre</b> en una columna o fila, y <b>dama y alfil</b> en una diagonal apuntando a h7 o h2. La batería multiplica la presión sobre una casilla: si el rival tiene un solo defensor, la segunda pieza decide. Al construirla hay que decidir el orden: delante va la pieza que queremos que capture primero (normalmente la menos valiosa), detrás la que debe rematar. La dama delante del alfil, por ejemplo, sirve para dar mate en h7 apoyada por el alfil; el alfil delante de la dama sirve para sacrificarse en h7 y que la dama entre después.</p><h4>El rayo X como arma táctica</h4><p>Además de contar, el rayo X crea golpes concretos:</p><ul><li><b>Ataque a través de la pieza rival</b>: nuestra torre ataca una torre rival defendida por la dama; al cambiar, la dama recaptura y queda expuesta a nuestra segunda pieza en la misma línea.</li><li><b>Defensa en rayos X</b>: una pieza defiende una casilla «a través» de una pieza rival. Si esa pieza rival captura algo y se aparta, nuestra defensa aparece de golpe.</li><li><b>Mate del pasillo con batería</b>: dama y torre en la misma columna rematan en la última fila aunque el rival defienda una vez.</li></ul><h4>Errores comunes y lista de comprobación</h4><p>El error más común es iniciar un intercambio contando solo las piezas que atacan directamente, sin las de detrás. El segundo es construir la batería en el orden equivocado (la dama delante cuando debería ir detrás, y acaba cambiada por una torre). Y el tercero es olvidar que el rival también puede tener piezas en rayos X sobre nuestras casillas débiles.</p><ul><li>En cada casilla disputada, ¿cuántos atacantes y defensores hay, incluyendo los que están detrás?</li><li>¿En qué orden conviene capturar para quedarme con la última captura?</li><li>¿Puedo doblar torres o alinear dama y torre en una columna abierta?</li><li>¿Hay alguna pieza del rival que defienda solo «a través» de otra?</li></ul>",
    "keyPoints": [
     "Al contar un intercambio incluye las piezas en rayos X y empieza con la de menor valor.",
     "En una batería, delante va la pieza que debe capturar primero; detrás, la que remata."
    ],
    "positions": [
     {
      "fen": "6k1/1rRb3p/1r4p1/8/3b1B2/5P1P/6PK/1R6 w - - 0 39",
      "orientation": "white",
      "caption": "Juegan blancas. Cuenta: la torre de b7 está defendida por la torre de b6, pero la torre de b1 ataca en rayos X por la columna b.",
      "line": [
       "Rxb7",
       "Rxb7",
       "Rxb7"
      ],
      "comments": [
       "La torre de c7 captura en b7.",
       "La torre de b6 recaptura y la columna b queda abierta (si ...Rxb1, Rxb1 y el blanco también queda con una torre de más).",
       "La torre de b1, que actuaba en rayos X, captura en b7: el blanco gana una torre."
      ],
      "arrows": [
       [
        "b1",
        "b7",
        "r"
       ]
      ]
     },
     {
      "fen": "3Qr2k/p3P1p1/4R2p/7q/PP5P/8/6PK/8 b - - 4 41",
      "orientation": "black",
      "caption": "Juegan negras. La dama blanca de d8 ataca a tu torre. La defensa está en rayos X, a través del peón de e7.",
      "line": [
       "Qxh4+",
       "Kg1",
       "Rxd8",
       "exd8=Q+",
       "Qxd8"
      ],
      "comments": [
       "La dama captura el peón con jaque y se coloca en la diagonal h4-d8.",
       "El rey sale del jaque.",
       "La torre captura la dama.",
       "El peón captura y corona con jaque, pero la diagonal queda abierta.",
       "La dama negra captura la nueva dama: la defensa en rayos X a través del peón decidió."
      ],
      "arrows": [
       [
        "h4",
        "d8",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "3r2k1/1b4qp/p2r2p1/1p3pQ1/1Pp2P2/P1NR3R/2P4P/6K1 w - - 0 30",
      "caption": "Juegan blancas: tus torre y dama apuntan a la columna d. Cuenta atacantes y defensores y gana material.",
      "line": [
       "Qxd8+",
       "Rxd8",
       "Rxd8+",
       "Kf7",
       "Rd7+"
      ],
      "comments": [
       "La dama captura la torre de d8 con jaque.",
       "La torre de d6 recaptura y abre la columna para la torre de d3, que actuaba en rayos X.",
       "La torre captura en d8 con jaque.",
       "El rey sale hacia f7.",
       "Jaque en la séptima fila: el rey de f7 y la dama de g7 están en la misma fila. El blanco gana la dama."
      ]
     },
     {
      "fen": "7k/2p3p1/5pnp/3P4/1Q1qP3/6B1/1R3PPP/rR4K1 b - - 5 36",
      "caption": "Juegan negras: tu dama y tu torre de a1 apuntan a la primera fila. Da mate.",
      "line": [
       "Qd1+",
       "Rxd1",
       "Rxd1+",
       "Qe1",
       "Rxe1#"
      ],
      "comments": [
       "La dama se sacrifica en d1 con jaque.",
       "La torre de b1 captura.",
       "La torre de a1, en rayos X a través de b1, captura en d1 con jaque.",
       "El blanco tapa con la dama.",
       "La torre captura en e1: jaque mate."
      ]
     },
     {
      "fen": "6k1/1b3rp1/pbB1Q3/8/3q1P2/1P4P1/P4R1P/2R3K1 b - - 0 40",
      "caption": "Juegan negras: tus dos alfiles apuntan al rey blanco. Encuentra el mate.",
      "line": [
       "Qxf2+",
       "Kh1",
       "Qf3+",
       "Bxf3",
       "Bxf3#"
      ],
      "comments": [
       "La dama captura en f2 con jaque. El rey no puede capturarla porque el alfil de b6 la defiende.",
       "El rey va a la esquina.",
       "Segundo sacrificio de dama: el alfil de c6 tiene que capturarla.",
       "El alfil captura y abandona la diagonal...",
       "...y el alfil de b7, que actuaba en rayos X detrás de él, captura en f3 con mate."
      ]
     },
     {
      "fen": "N1bk1b1r/pp1p1ppp/5n2/4q3/3B4/8/P1P1PPPP/R2QKB1R b KQ - 3 12",
      "caption": "Juegan negras: el alfil blanco de d4 ataca a tu dama. Fíjate en lo que hay detrás de él.",
      "line": [
       "Bb4+",
       "c3",
       "Bxc3+",
       "Bxc3",
       "Qxc3+",
       "Qd2",
       "Qxa1+"
      ],
      "comments": [
       "Jaque de alfil: el rey blanco no tiene buena casilla.",
       "El blanco tapa con el peón.",
       "El alfil captura en c3 con jaque.",
       "El alfil de d4 recaptura y abandona la diagonal a1-h8.",
       "La dama, que actuaba en rayos X a través de d4, captura en c3 con jaque y apunta a a1.",
       "El blanco tapa con la dama.",
       "La dama captura la torre de a1 con jaque."
      ]
     }
    ]
   },
   "t-molino": {
    "html": "<h4>El mecanismo del molino, pieza por pieza</h4><p>El molino es una cadena de jaques descubiertos alternados con jaques directos. Tiene tres componentes: una <b>pieza de largo alcance fija</b> (normalmente un alfil en la gran diagonal, a veces una torre o la dama) que apunta a una casilla del rey rival; una <b>pieza móvil</b> (casi siempre una torre en la séptima fila) que se aparta para descubrir el jaque y captura algo; y un <b>rey encerrado</b> que solo puede oscilar entre dos casillas, por ejemplo g8 y h8. Cada vuelta del molino funciona así: la torre captura con jaque descubierto, el rey va a la otra casilla, la torre vuelve con jaque directo a su casilla protegida (g7, defendida por el alfil), el rey regresa y el ciclo se repite.</p><p>Para que funcione deben cumplirse condiciones muy concretas: (1) el rey rival no tiene una tercera casilla de escape; (2) la casilla de retorno de la torre (g7) está protegida, de modo que el rey no puede capturarla; (3) el rival no puede interponer una pieza en la diagonal del alfil ni capturar a la torre cuando vuelve; y (4) en la línea por la que viaja la torre hay material que capturar.</p><h4>Cómo se monta: el sacrificio previo</h4><p>Casi nunca el molino aparece listo: se prepara con un sacrificio que fuerza la estructura. El patrón más conocido es la captura en g7 con la torre (<span class=\"mv\">Rxg7+</span>), apoyada por un alfil en la gran diagonal o en f6: el rey queda en h8 y empieza la serie. Otra preparación clásica es sacrificar la dama para desviar a la dama rival o para abrir la columna, como en la célebre partida Torre - Lasker (Moscú 1925). El jugador que monta un molino debe calcular hasta el final: cuántas vueltas puede dar, qué captura en cada una y cómo termina.</p><h4>El orden de las capturas y el final de la serie</h4><p>Dentro del molino el orden importa. Reglas prácticas:</p><ul><li>Primero captura las piezas que <b>podrían romper el molino</b>: la que puede interponerse en la diagonal, la que podría capturar a la torre en g7, o la que amenaza mate a tu rey.</li><li>Después, las piezas de más valor. Los peones al final, si sobra tiempo.</li><li>Calcula cómo <b>cierras</b>: a veces la última vuelta termina con un jaque descubierto que ataca a la dama desde otra fila (por ejemplo, la torre baja por la columna g y ataca a la dama), otras con un mate directo.</li></ul><p>Y no olvides la posibilidad del mate: si el rey está totalmente encerrado, un jaque descubierto a lo largo de la columna puede ser mate, y entonces no hace falta cobrar nada.</p><h4>Errores comunes y lista de comprobación</h4><p>El error clásico es dar la primera vuelta y descubrir que el rey tiene una casilla extra (por ejemplo h7, porque falta el peón) o que una pieza rival puede capturar a la torre en g7 desde la séptima fila. Otro error es «comerse» peones mientras el rival conserva una amenaza de mate contra nuestro rey: el molino no es eterno si el rival puede salir con un contrajaque.</p><ul><li>¿Tiene el rey rival exactamente dos casillas? ¿La casilla de retorno de mi torre está protegida?</li><li>¿Puede el rival interponer en la línea del jaque descubierto o capturar a mi torre?</li><li>¿Qué material hay en la línea de la torre? ¿En qué orden lo cobro?</li><li>¿Cómo termino: mate, captura de la dama o vuelta a una posición segura?</li></ul>",
    "keyPoints": [
     "Molino: pieza fija en rayos X + torre móvil + rey limitado a dos casillas, con la casilla de retorno protegida.",
     "Cobra primero lo que podría romper el molino; después, lo más valioso."
    ],
    "positions": [
     {
      "fen": "r4rk1/pp3pp1/5B1p/7q/8/6R1/PP3PPP/4R1K1 w - - 0 1",
      "orientation": "white",
      "caption": "Juegan blancas. Estructura de molino como en Torre - Lasker: alfil en f6 que protege g7 y apunta a h8, torre en la columna g y la dama negra lejos, en h5.",
      "line": [
       "Rxg7+",
       "Kh8",
       "Rxf7+",
       "Kg8",
       "Rg7+",
       "Kh8",
       "Rg5+",
       "Rxf6",
       "Rxh5"
      ],
      "comments": [
       "La torre captura en g7 con jaque. No se puede capturar porque el alfil de f6 la protege.",
       "El rey solo tiene h8.",
       "Primera vuelta: la torre se aparta capturando el peón de f7 y el alfil da jaque descubierto.",
       "El rey vuelve a g8: h7 está controlada por la torre.",
       "La torre regresa a g7 con jaque, protegida por el alfil.",
       "El rey vuelve a h8.",
       "Jaque descubierto: la torre baja por la columna g y ataca a la dama de h5. No vale dar otra vuelta con Rxb7+?, porque la columna f ya está abierta y la torre de f8 capturaría el alfil (...Rxf6).",
       "El negro captura la pieza que da jaque, pero su dama sigue atacada.",
       "La torre captura la dama: el blanco queda con ventaja decisiva."
      ],
      "arrows": [
       [
        "f6",
        "h8",
        "g"
       ],
       [
        "g3",
        "g7",
        "r"
       ]
      ]
     },
     {
      "fen": "6k1/pb3ppp/1p4r1/8/8/8/PP1BNPPP/Q4RK1 b - - 0 1",
      "orientation": "black",
      "caption": "Juegan negras. El mismo mecanismo con colores cambiados: alfil en b7 en la gran diagonal y torre contra g2. Aquí el molino termina en mate.",
      "line": [
       "Rxg2+",
       "Kh1",
       "Rxf2+",
       "Kg1",
       "Rg2+",
       "Kh1",
       "Rg4+",
       "Rf3",
       "Bxf3#"
      ],
      "comments": [
       "La torre captura en g2 con jaque, protegida por el alfil de b7.",
       "El rey solo tiene h1.",
       "La torre captura en f2 con jaque descubierto del alfil.",
       "El rey vuelve a g1.",
       "La torre regresa a g2 con jaque.",
       "El rey vuelve a h1.",
       "Jaque descubierto bajando por la columna g: el rey no tiene casillas y el blanco solo puede tapar la diagonal.",
       "La torre blanca se interpone en f3.",
       "El alfil captura en f3: jaque mate. Si el rey está totalmente encerrado, el molino puede terminar en mate."
      ],
      "arrows": [
       [
        "b7",
        "h1",
        "g"
       ],
       [
        "g6",
        "g2",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "q4rk1/pp1bnppp/8/8/8/1P4R1/PB3PPP/6K1 w - - 0 1",
      "caption": "Juegan blancas: torre en g3 y alfil en b2 contra el enroque negro. Monta el molino.",
      "line": [
       "Rxg7+",
       "Kh8",
       "Rxf7+",
       "Kg8",
       "Rg7+"
      ],
      "comments": [
       "La torre captura en g7 con jaque. El alfil de b2 la protege, así que el rey no puede capturarla.",
       "El rey tiene que ir a h8.",
       "La torre captura en f7 y el alfil da jaque descubierto por la gran diagonal.",
       "El rey vuelve a g8; nada negro puede interponerse en la diagonal.",
       "La torre vuelve a g7 con jaque. El rey irá a h8 y el siguiente jaque descubierto por la columna g es mate (solo se puede retrasar tapando con la torre en f6, que el alfil captura)."
      ]
     },
     {
      "fen": "6k1/pb3ppp/1p4r1/8/8/8/PP1Q1PPP/5RK1 b - - 0 1",
      "caption": "Juegan negras: tu torre de g6 y tu alfil de b7 apuntan al rey blanco. La dama blanca está en d2.",
      "line": [
       "Rxg2+",
       "Kh1",
       "Rxf2+",
       "Kg1",
       "Rxd2"
      ],
      "comments": [
       "La torre captura en g2 con jaque, protegida por el alfil de b7.",
       "El rey tiene que ir a h1.",
       "La torre captura en f2 con jaque descubierto del alfil.",
       "El rey vuelve a g1 y ahora ataca a la torre, igual que la torre de f1 y la dama.",
       "La torre captura la dama por la segunda fila. El molino sirve para acercar la torre a lo que se quiere cobrar: aquí es más fuerte cobrar la dama que repetir el jaque en g2."
      ]
     },
     {
      "fen": "6r1/2q1pp1k/p7/2r5/6R1/1BNP3P/1PP3K1/5R2 w - - 3 27",
      "caption": "Juegan blancas: tus torres y el alfil de b3 apuntan al flanco de rey negro. La dama negra está en c7.",
      "line": [
       "Rxf7+",
       "Kh8",
       "Rxg8+",
       "Kxg8",
       "Rxe7+",
       "Kf8",
       "Rxc7"
      ],
      "comments": [
       "La torre de f1 captura en f7 con jaque por la séptima fila.",
       "El rey se aparta (...Kh6 tampoco ayuda).",
       "La otra torre captura la torre de g8 con jaque: el rey es atraído a g8, en la diagonal del alfil de b3.",
       "El rey captura.",
       "La torre captura en e7 y el alfil da jaque descubierto desde b3.",
       "El rey sale del jaque.",
       "La torre captura la dama de c7 por la séptima fila."
      ]
     },
     {
      "fen": "6k1/1p2R2p/5pp1/p1Br4/2n5/1rP5/b1K3PP/4R3 w - - 0 34",
      "caption": "Juegan blancas: torres en la columna e y alfil en c5 contra el rey de g8. Encuentra la serie de jaques que lleva al mate.",
      "line": [
       "Re8+",
       "Kg7",
       "Bf8+",
       "Kf7",
       "R1e7+"
      ],
      "comments": [
       "Jaque en la octava fila.",
       "El rey sale a g7 (en f7 recibe mate en seguida).",
       "El alfil da jaque en f8: el rey no puede capturarlo porque la torre de e8 lo protege.",
       "El rey va a f7.",
       "La segunda torre entra en e7 con jaque. El rey irá a g8 y el alfil, al apartarse de f8, dará mate con jaque descubierto de la torre de e8 (Bh6# o Bg7#)."
      ]
     }
    ]
   },
   "t-interferencia": {
    "html": "<h4>Cortar la línea de defensa</h4><p>Las piezas de largo alcance defienden a distancia: una torre en la octava fila vigila la casilla de coronación desde lejos, una dama defiende una pieza en el otro extremo de una diagonal, un alfil controla una casilla de mate a cinco casillas de distancia. Esa fuerza es también su debilidad: basta con <b>colocar una pieza en medio</b> para cortar la defensa. La interferencia consiste en eso, y casi siempre la pieza que interfiere se ofrece como sacrificio: si el rival la captura, la pieza que la captura suele quedar mal colocada o la defensa se corta de todos modos.</p><h4>El punto de intersección (el «corte de Novotny» y sus parientes)</h4><p>Los compositores de problemas estudiaron a fondo las casillas donde se cruzan las líneas de dos piezas defensoras. Si una torre y un alfil rivales defienden casillas distintas pasando ambos por la misma casilla, una pieza nuestra colocada justo allí corta las dos líneas: si la captura la torre, el alfil queda bloqueado por ella; si la captura el alfil, el bloqueado es la torre. En la partida práctica no hace falta conocer los nombres técnicos, pero sí la idea: <b>busca casillas por donde pasen las líneas de defensa del rival</b>, sobre todo si por ellas pasan dos líneas a la vez.</p><h4>Situaciones típicas</h4><ul><li><b>Peón a punto de coronar</b>: la torre rival vigila la casilla de coronación desde lejos; una pieza nuestra se coloca en esa columna o fila y el peón corona.</li><li><b>Defensa de la dama a distancia</b>: la dama rival defiende una pieza o una casilla en la otra punta del tablero; un avance de peón o una pieza en medio la desconecta.</li><li><b>Interferencia con tempo</b>: la pieza que interfiere da jaque o ataca algo, de modo que el rival no tiene tiempo de restablecer la defensa.</li><li><b>Jugada tranquila de interferencia</b>: sin jaque ni captura, una pieza ocupa la casilla de cruce y crea dos amenazas a la vez. Es la más difícil de ver.</li></ul><h4>Cómo encontrarla y errores comunes</h4><p>El método consiste en <b>trazar las líneas de defensa</b> del rival. Para cada pieza rival de largo alcance que cumpla una tarea vital, dibuja mentalmente la línea entre ella y lo que defiende. Después pregúntate: ¿alguna pieza mía puede llegar a una casilla de esa línea, con tempo o de forma que capturarla no resuelva el problema? Los errores típicos son colocar la pieza en una casilla donde el rival la captura con una pieza que <b>no</b> es la defensora (y la defensa sigue intacta), o no ver que el rival puede defender lo mismo por otra línea.</p><ul><li>¿Qué piezas rivales defienden a distancia algo vital?</li><li>¿Por qué casillas pasa esa línea de defensa? ¿Se cruzan dos líneas en alguna?</li><li>¿Puedo ocupar esa casilla con tempo? Si capturan mi pieza, ¿quién la captura y qué pasa con la defensa?</li><li>¿Puede el rival restablecer la defensa por otra línea?</li></ul>",
    "keyPoints": [
     "Traza las líneas de defensa del rival y busca dónde cortarlas, mejor en una casilla de cruce.",
     "Comprueba quién puede capturar la pieza que interfiere y si la defensa queda cortada igualmente."
    ],
    "positions": [
     {
      "fen": "4Q3/6k1/3q3p/p1pP2r1/1pP1Bb2/1P1R3P/P4P2/5K2 b - - 2 40",
      "orientation": "black",
      "caption": "Juegan negras. La dama blanca de e8 defiende al alfil de e4 por la columna e. Una torre en medio corta esa defensa.",
      "line": [
       "Re5",
       "Qc8",
       "Rxe4"
      ],
      "comments": [
       "La torre se interpone en e5, entre la dama de e8 y el alfil de e4, y además ataca al alfil.",
       "La dama no puede restablecer la defensa del alfil y se aparta.",
       "La torre captura el alfil: el negro gana una pieza."
      ],
      "arrows": [
       [
        "e8",
        "e4",
        "r"
       ],
       [
        "g5",
        "e5",
        "g"
       ]
      ]
     },
     {
      "fen": "r3r1k1/1pp1bppp/p1n1q3/4p3/4B1n1/2P1B1N1/PP3PPP/R1QR2K1 w - - 6 17",
      "orientation": "white",
      "caption": "Juegan blancas. La dama negra de e6 defiende al caballo de g4 por la diagonal e6-g4. El alfil corta la diagonal con tempo.",
      "line": [
       "Bf5",
       "Qf6",
       "Bxg4"
      ],
      "comments": [
       "El alfil se coloca en f5, en la diagonal entre la dama y el caballo, y ataca a la dama.",
       "La dama se aparta y deja de defender g4 (con ...Qc4 el negro intenta complicar, pero tras b3 también pierde material).",
       "El alfil captura el caballo de g4, que ya no tenía defensa."
      ],
      "arrows": [
       [
        "e6",
        "g4",
        "r"
       ],
       [
        "e4",
        "f5",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1b2rk1/ppp2ppp/8/2b3q1/2pBR3/2P5/PP3PPP/RN1Q2K1 w - - 1 12",
      "caption": "Juegan blancas: la dama negra de g5 defiende al alfil de c5 por la quinta fila. Corta esa línea.",
      "line": [
       "Re5",
       "Qd8",
       "Rxc5"
      ],
      "comments": [
       "La torre se interpone en e5, entre la dama y el alfil, y además ataca a la dama.",
       "La dama tiene que apartarse: si el alfil captura en d4, la torre captura la dama.",
       "La torre captura el alfil de c5, que se quedó sin defensa."
      ]
     },
     {
      "fen": "8/5p1k/5qpb/4p2p/PR1pP3/3P4/6PP/4Q1K1 b - - 0 32",
      "caption": "Juegan negras: la dama blanca de e1 defiende a la torre de b4 por la diagonal. Encuentra la interferencia con tempo.",
      "line": [
       "Be3+",
       "Kh1",
       "Bd2",
       "Qe2",
       "Bxb4"
      ],
      "comments": [
       "Primero un jaque: el alfil llega a la diagonal e3-g1 y obliga al rey a ir a la esquina.",
       "El rey va a h1.",
       "El alfil se coloca en d2, en la diagonal entre la dama de e1 y la torre de b4, y además ataca a la dama.",
       "La dama se aparta.",
       "El alfil captura la torre de b4: el negro gana material."
      ]
     },
     {
      "fen": "3q1knQ/3bb3/p7/1p1P2p1/3rN3/1P6/P1P2PPP/R3R1K1 b - - 2 22",
      "caption": "Juegan negras: la dama blanca de h8 defiende la torre de a1 por la gran diagonal. ¿Cómo lo aprovechas?",
      "line": [
       "Rxe4",
       "Rxe4",
       "Bf6",
       "Qh5",
       "Bxa1"
      ],
      "comments": [
       "La torre se cambia por el caballo de e4, la pieza que tapaba el juego negro.",
       "El blanco recaptura.",
       "El alfil se interpone en f6 en la gran diagonal: corta la defensa de la dama sobre a1 y ataca a la torre.",
       "La dama se aparta.",
       "El alfil captura la torre de a1."
      ]
     },
     {
      "fen": "r3k3/pppnbpp1/4q1p1/3pP3/3B1P2/1PP3Pr/P1QN4/2KR3R w q - 0 21",
      "caption": "Juegan blancas: la torre negra acaba de capturar en h3 y está defendida por la dama de e6. Corta la defensa.",
      "line": [
       "f5",
       "gxf5",
       "Rxh3"
      ],
      "comments": [
       "El peón avanza a f5, en la diagonal entre la dama de e6 y la torre de h3, y además ataca a la dama.",
       "El negro captura el peón, pero la diagonal sigue cortada por su propio peón en f5.",
       "La torre captura en h3: el blanco gana una torre."
      ]
     }
    ]
   },
   "t-mates1": {
    "html": "<h4>Mate del pasillo: cuándo funciona y cuándo no</h4><p>El mate del pasillo exige tres cosas: el rey encerrado en la última fila por sus propios peones, una pieza nuestra (torre o dama) que llegue a esa fila con jaque, y que el rival no pueda capturar ni interponer. Por eso la técnica consiste casi siempre en <b>eliminar o desviar a los defensores de la última fila</b>: si el rival tiene una torre en la octava, se la cambia o se la obliga a dejar la fila con un sacrificio (por ejemplo, un sacrificio de dama que la torre debe capturar). Cuando el rival tiene dos defensores, a veces hace falta sacrificar dos veces: la primera pieza se entrega para atraer o desviar, la segunda da el mate.</p><p>La excepción más importante es la <b>casilla de escape</b>: un peón movido (h6, g6) o una casilla sin controlar en la segunda fila arruina el mate. Antes de lanzarte, comprueba que el rey no tenga «luft». Y a la defensiva, crear luft a tiempo es una de las jugadas profilácticas más útiles del medio juego, pero hazlo en el momento oportuno: un avance de peón en el enroque también puede debilitarlo.</p><h4>Mate árabe: torre y caballo</h4><p>En el mate árabe el caballo cumple dos funciones a la vez: protege a la torre que da jaque y quita al rey la casilla de escape. La configuración típica es rey en h8, torre en h7 (o en la octava) y caballo en f6 o en g5/f7. Este patrón aparece a menudo después de que el caballo llegue a f6 con jaque: el rey se va a h8 y la torre entra por la séptima o por la columna e. Fíjate en que el caballo en f6 controla g8 y h7 a la vez: por eso es tan eficaz.</p><h4>Mate asfixiado: el caballo contra el rey rodeado</h4><p>El mate asfixiado se da cuando las propias piezas del rival ocupan todas las casillas de escape de su rey y un caballo da el jaque, que no se puede bloquear. La secuencia clásica tiene cuatro tiempos: jaque de caballo (a menudo con jaque doble o descubierto), el rey se refugia en la esquina, sacrificio de dama en g8 que la torre debe capturar (así la torre tapa la última salida) y salto final del caballo a f7. Esta combinación se conoce desde hace siglos y sigue apareciendo en partidas actuales, incluso en la apertura, cuando el rey rival no tiene espacio.</p><h4>Cómo reconocerlos en la partida</h4><p>Los tres patrones comparten una idea: el rey está <b>encerrado por sus propias piezas</b>. Por eso, cada vez que el rey rival tenga pocas casillas libres, busca primero jaques, después sacrificios que eliminen o desvíen a los defensores. Lista de comprobación:</p><ul><li>¿Cuántas casillas de escape tiene el rey rival? ¿Quién las ocupa?</li><li>¿Puedo llegar con torre o dama a la última fila? ¿Quién la defiende y cómo lo desvío?</li><li>¿Hay un caballo que llegue a f6/f7/g6 (o f3/f2/g3) con jaque?</li><li>¿Un sacrificio de dama podría obligar a una pieza a bloquear la última salida del rey?</li></ul><p>Y aplica la misma lista a tu propio rey: muchos mates del pasillo se sufren por no haber hecho una jugada de luft a tiempo.</p>",
    "keyPoints": [
     "El mate del pasillo casi siempre requiere desviar o eliminar al defensor de la última fila.",
     "Si el rey rival está rodeado de sus propias piezas, piensa en el caballo: jaque doble y sacrificio de dama."
    ],
    "positions": [
     {
      "fen": "5kr1/8/p2pQ3/1p2n3/2p1RP1B/P1P4P/1P5K/8 b - - 0 39",
      "orientation": "black",
      "caption": "Juegan negras. Mate árabe con los colores cambiados: el caballo llega a f3 con jaque y la torre baja por la columna g.",
      "line": [
       "Nf3+",
       "Kh1",
       "Rg1#"
      ],
      "comments": [
       "El caballo da jaque desde f3 y controla g1 y h2.",
       "El rey solo tiene h1.",
       "La torre da jaque en g1, protegida por el caballo: el rey no tiene casillas. Mate árabe."
      ],
      "arrows": [
       [
        "e5",
        "f3",
        "g"
       ],
       [
        "g8",
        "g1",
        "r"
       ]
      ]
     },
     {
      "fen": "r1b1k2r/2pp1ppp/p7/1pb1p3/4P1nq/1B3N2/PPP2PPP/RNBQR1K1 b kq - 2 10",
      "orientation": "black",
      "caption": "Juegan negras. Un mate asfixiado en plena apertura: el rey blanco está rodeado por sus propias piezas.",
      "line": [
       "Qxf2+",
       "Kh1",
       "Qg1+",
       "Rxg1",
       "Nf2#"
      ],
      "comments": [
       "La dama captura en f2 con jaque, protegida por el alfil de c5 y el caballo de g4.",
       "El rey tiene que ir a la esquina.",
       "Sacrificio de dama en g1: la torre (o el caballo de f3) tiene que capturar y tapa la última casilla libre del rey.",
       "La torre captura.",
       "El caballo da jaque desde f2: el rey está rodeado por su torre y sus peones. Mate asfixiado."
      ],
      "arrows": [
       [
        "g4",
        "f2",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "1Q6/5ppk/3r3p/P3p3/2q5/8/3r1PPP/R1R3K1 b - - 4 36",
      "caption": "Juegan negras: el blanco amenaza tu dama con la torre de c1. ¿Qué ves en la primera fila?",
      "line": [
       "Qxc1+",
       "Rxc1",
       "Rd1+",
       "Rxd1",
       "Rxd1#"
      ],
      "comments": [
       "La dama captura la torre con jaque: un sacrificio para desviar a la torre de a1.",
       "La torre recaptura.",
       "Las torres dobladas entran por la columna d con jaque.",
       "La torre tapa en d1.",
       "La torre captura en d1: mate del pasillo."
      ]
     },
     {
      "fen": "2r1rbk1/pp1R3p/6p1/1P3p2/P1b1Np1n/5P1P/5KB1/1N5R w - f6 0 32",
      "caption": "Juegan blancas: tu torre ya está en la séptima fila y tu caballo está cerca. Da mate en dos.",
      "line": [
       "Nf6+",
       "Kh8",
       "Rxh7#"
      ],
      "comments": [
       "El caballo da jaque desde f6: desde allí controla g8 y h7.",
       "El rey solo puede ir a la esquina.",
       "La torre captura en h7, protegida por el caballo, que también cubre g8: mate árabe."
      ]
     },
     {
      "fen": "r3r2k/ppp3pp/1b1N4/3QPn2/7q/2N5/PPP3PP/2KR4 w - - 6 22",
      "caption": "Juegan blancas: el rey negro está en la esquina y tu caballo y tu dama están cerca. Da mate.",
      "line": [
       "Nf7+",
       "Kg8",
       "Nh6+",
       "Kh8",
       "Qg8+",
       "Rxg8",
       "Nf7#"
      ],
      "comments": [
       "Jaque de caballo desde f7.",
       "El rey vuelve a g8.",
       "Jaque doble: el caballo desde h6 y la dama desde d5. El rey solo puede moverse.",
       "El rey va a h8.",
       "Sacrificio de dama en g8: la torre tiene que capturar y tapar la última salida.",
       "La torre captura.",
       "El caballo da jaque desde f7 y el rey está encerrado por sus piezas: mate asfixiado."
      ]
     },
     {
      "fen": "r5k1/p4ppp/1nQ5/4qpB1/8/8/P4KPP/3R4 w - - 1 26",
      "caption": "Juegan blancas: la última fila negra está defendida por la torre de a8. Encuentra el mate.",
      "line": [
       "Qxa8+",
       "Nxa8",
       "Rd8+",
       "Qe8",
       "Rxe8#"
      ],
      "comments": [
       "La dama captura la torre de a8 con jaque: el caballo tiene que recapturar.",
       "El caballo recaptura y la octava fila queda sin torre.",
       "La torre entra en d8 con jaque.",
       "El negro solo puede tapar con la dama.",
       "La torre captura la dama en e8: mate del pasillo."
      ]
     }
    ]
   },
   "t-mates2": {
    "html": "<h4>Anastasia: las piezas y las condiciones</h4><p>El mate de Anastasia se apoya en un caballo en e7 (o e2) y en el peón g7 del propio rival. El caballo cubre g8 y g6; el peón g7 tapa la otra salida; y una torre o la dama dan mate por la columna h. Para que funcione hacen falta: (1) un caballo que llegue a e7 con jaque, normalmente desde d5 o f5; (2) la columna h abierta o fácil de abrir; y (3) una pieza pesada que llegue a la columna h, a menudo con un sacrificio de dama en h7 para abrirla o para atraer al rey.</p><p>La secuencia típica es: <span class=\"mv\">Ne7+</span>, el rey se va a h8 o h7, y entonces la dama se sacrifica en h7 o la torre se traslada a la columna h (por ejemplo, a h3 o a h5). Variantes frecuentes: si el rey tiene la casilla h6 libre, el patrón cambia (puede bastar con un jaque en h4 o con la torre en la columna h); si el rival puede interponer en la columna, hay que calcular si la interposición solo retrasa el mate.</p><h4>Boden: dos alfiles cruzados</h4><p>El mate de Boden lo dan dos alfiles que atacan en diagonales cruzadas a un rey cuyas casillas vecinas están ocupadas por sus propias piezas. Es típico contra el enroque largo: rey en c8 (o b8), con peones o piezas en b7, d7 y d8. Un alfil da jaque por la diagonal a6-c8 y el otro controla c7 y b8 desde la diagonal h2-b8: el rey no tiene escapatoria (contra el enroque largo blanco, las diagonales equivalentes son a3-c1 y h7-b1). Casi siempre va precedido de un <b>sacrificio de dama o de torre en c6 o c3</b>: el peón b7 (o b2) captura y la diagonal queda abierta para que el alfil entre con mate.</p><p>El patrón no es exclusivo del enroque largo: también aparece contra el rey en el centro o en el flanco de rey, siempre con la misma lógica de dos diagonales que se cruzan. La versión con un alfil de cada color en posiciones paralelas, apuntando a casillas vecinas, se llama a veces mate de los dos alfiles.</p><h4>Señales de alarma: cuándo buscar estos mates</h4><ul><li><b>Anastasia</b>: el rival está enrocado corto, tiene la columna h abierta o semiabierta, y tienes un caballo que puede saltar a e7 con jaque. Si además tu torre está en la tercera fila (lista para ir a h3), la combinación suele estar cerca.</li><li><b>Boden</b>: el rival se enrocó largo, tiene un alfil o un caballo en d7 y un peón en b7, y tienes un alfil en la diagonal h2-b8 y otro que podría entrar en a6. Busca un sacrificio en c6 que obligue al peón b7 a capturar.</li></ul><h4>Errores comunes y lista de comprobación</h4><p>En el Anastasia, el error típico es dar el jaque de caballo cuando el rey tiene la casilla f8 o h6 libre, o cuando una pieza rival puede interponerse en la columna h. En el Boden, sacrificar en c6 cuando el rival puede capturar con otra pieza (no con el peón b7) o cuando su rey puede escapar por d7 o b8. Revisa siempre las casillas de escape antes de entregar material.</p><ul><li>¿Qué casillas de escape tiene el rey? ¿Cuáles están tapadas por sus propias piezas?</li><li>¿Puedo cubrir las demás con un caballo en e7 o con dos alfiles cruzados?</li><li>¿Qué sacrificio abre la línea final (h7 para Anastasia, c6/c3 para Boden)?</li><li>¿Puede el rival capturar el sacrificio con una pieza distinta de la que quiero atraer?</li></ul>",
    "keyPoints": [
     "Anastasia: caballo en e7, peón g7 propio bloqueando y una pieza pesada que llegue a la columna h.",
     "Boden: sacrificio en c6 o c3 para abrir la diagonal y dos alfiles cruzados contra un rey encerrado."
    ],
    "positions": [
     {
      "fen": "2kr3r/pp1np3/2b2p1p/1B4p1/4p3/4P1B1/PP1K1PPP/R1R5 w - - 4 19",
      "orientation": "white",
      "caption": "Juegan blancas. El rey negro está enrocado largo con el caballo en d7: patrón de Boden.",
      "line": [
       "Rxc6+",
       "bxc6",
       "Ba6#"
      ],
      "comments": [
       "Sacrificio de calidad en c6: el peón b7 tiene que capturar y abre la diagonal a6-c8.",
       "El peón captura.",
       "El alfil entra en a6 con jaque. El alfil de g3 controla b8 y d6, el caballo tapa d7: mate de Boden."
      ],
      "arrows": [
       [
        "c1",
        "c6",
        "r"
       ],
       [
        "b5",
        "a6",
        "g"
       ]
      ]
     },
     {
      "fen": "2r2rk1/bp3pp1/p7/3N2p1/3pP3/1P1B2R1/1PP3PP/5nK1 w - - 0 27",
      "orientation": "white",
      "caption": "Juegan blancas. Caballo que llega a e7, peón g7 propio del negro y torre lista para ir a la columna h: mate de Anastasia.",
      "line": [
       "Ne7+",
       "Kh7",
       "Rh3#"
      ],
      "comments": [
       "Jaque de caballo desde e7: cubre g8 y g6.",
       "El rey va a h7 (en h8 también recibe mate en la columna h).",
       "La torre da jaque en h3: el peón g7 tapa la última salida. Mate de Anastasia."
      ],
      "arrows": [
       [
        "d5",
        "e7",
        "g"
       ],
       [
        "g3",
        "h3",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r4rk1/5pp1/p2p3p/2p1pNq1/PpP1P1Q1/1P1PR3/5P2/nN4K1 w - - 2 22",
      "caption": "Juegan blancas: las damas están frente a frente. ¿Cómo aprovechas el caballo de f5 y la torre de e3?",
      "line": [
       "Qxg5",
       "hxg5",
       "Ne7+",
       "Kh7",
       "Rh3#"
      ],
      "comments": [
       "Cambio de damas: si el peón recaptura, la columna h queda despejada para la torre.",
       "El peón recaptura (otras jugadas también pierden).",
       "Jaque de caballo desde e7: cubre g8 y g6.",
       "El rey va a h7 (en h8 llega el mismo mate).",
       "La torre da mate en h3: el peón g7 tapa la otra salida. Mate de Anastasia."
      ]
     },
     {
      "fen": "rr6/p3p2k/3pNpp1/1pp5/2q1P3/5R2/P2Q2PP/6K1 w - - 0 27",
      "caption": "Juegan blancas: el caballo de e6 controla g7 y g5. Encuentra el mate en dos.",
      "line": [
       "Qh6+",
       "Kxh6",
       "Rh3#"
      ],
      "comments": [
       "Sacrificio de dama en h6: el rey tiene que capturar.",
       "El rey captura y queda en la columna h.",
       "La torre da jaque en h3: el caballo cubre g5 y g7, y los peones negros tapan el resto. Mate."
      ]
     },
     {
      "fen": "3rk3/1p1n1p2/4p2p/p1Bb2p1/6PP/1P1BRP2/r7/4R1K1 w - - 2 30",
      "caption": "Juegan blancas: el rey negro está en e8 con la torre en d8 y el caballo en d7. Tus alfiles hacen el resto.",
      "line": [
       "Rxe6+",
       "Bxe6",
       "Rxe6+",
       "fxe6",
       "Bg6#"
      ],
      "comments": [
       "Sacrificio de calidad en e6.",
       "El alfil captura.",
       "Segundo sacrificio: obliga al peón de f7 a capturar y abre la diagonal h5-e8.",
       "El peón captura.",
       "El alfil da mate en g6: el alfil de c5 controla e7 y f8, y el caballo y la torre negros tapan d7 y d8."
      ]
     },
     {
      "fen": "r3r1k1/pp2n1pp/2pb4/q2pNpPP/3Pb3/P1P1B3/1P1NQP2/2KR3R b - - 0 18",
      "caption": "Juegan negras: el rey blanco está en c1, con la torre en d1 y el caballo en d2. Tus dos alfiles apuntan hacia allí.",
      "line": [
       "Qxc3+",
       "bxc3",
       "Bxa3#"
      ],
      "comments": [
       "Sacrificio de dama en c3 con jaque: el peón b2 tiene que capturar y abre la diagonal a3-c1.",
       "Captura forzada.",
       "El alfil da mate en a3: el alfil de e4 controla b1, y la torre y el caballo blancos tapan d1 y d2. Mate de Boden."
      ]
     }
    ]
   },
   "t-legal": {
    "html": "<h4>Por qué funciona la combinación</h4><p>El mate de Légal reúne tres ideas en una sola: una <b>clavada relativa</b> que no es tal (el caballo de f3 está clavado contra la dama, no contra el rey, así que puede moverse), un <b>sacrificio de dama</b> que el rival acepta por codicia, y un <b>mate de piezas menores</b> contra un rey cuyas casillas de escape están tapadas por sus propias piezas (el alfil de f8, el peón de d6, a veces el caballo de c6 o d7). Las tres condiciones tienen que darse a la vez: si falta alguna, el golpe se convierte en una simple pérdida de pieza.</p><p>Las condiciones típicas son: alfil del atacante en c4 apuntando a f7; caballo que pueda saltar a d5 (por eso el caballo de c3 es imprescindible); rey rival en e8 sin la casilla e7 libre de control o con el alfil de f8 y el peón de d6 tapando salidas; y el alfil rival que clava al caballo de f3 desde g4 (o desde h5 tras <span class=\"mv\">h3</span>).</p><h4>Qué pasa si el rival no acepta la dama</h4><p>Esta es la parte que los libros de trampas suelen omitir. Contra un rival atento, <span class=\"mv\">Nxe5</span> no da mate: el rival rechaza la dama y recupera la pieza. Pero en muchas versiones el atacante <b>sigue ganando material</b>. Por ejemplo, con el caballo negro en c6 y el alfil en h5, después de <span class=\"mv\">Nxe5</span> <span class=\"mv\">Nxe5</span> llega <span class=\"mv\">Qxh5</span>, y si el caballo negro captura en c4, el jaque de dama en b5 recupera la pieza: el balance es un peón de más. En otras versiones, en cambio, <span class=\"mv\">Nxe5</span> es simplemente un error: el rival responde <span class=\"mv\">dxe5</span> o <span class=\"mv\">Nxe5</span> y el atacante pierde una pieza. Por eso no hay que jugarlo «de memoria»: hay que calcular la respuesta correcta del rival.</p><h4>La lección para el defensor</h4><p>Desde el lado del defensor, el mate de Légal enseña dos hábitos. El primero: <b>una clavada relativa no inmoviliza</b>; antes de confiar en ella, pregúntate qué pasa si la pieza clavada se mueve igualmente. El segundo: <b>desconfía de los regalos</b>; si el rival deja la dama en prise sin motivo aparente, busca qué gana él a cambio. En el caso concreto, la defensa correcta tras <span class=\"mv\">Nxe5</span> suele ser capturar el caballo (si se puede) o retirar el alfil, nunca capturar la dama.</p><h4>El patrón de mate fuera de la trampa</h4><p>El mate final (alfil en f7 con jaque, rey en e7 y caballo en d5) aparece también en partidas que no tienen nada que ver con la apertura original: siempre que el rey rival esté en e7 con el alfil de f8 y el peón de d6 en sus casillas, y tengamos alfil y dos caballos activos. Del mismo modo, el bando negro puede montar la versión simétrica contra el enroque blanco (alfil en c5 contra f2, caballo hacia d4). Lista de comprobación antes de jugar <span class=\"mv\">Nxe5</span>:</p><ul><li>¿Qué pasa si el rival captura la dama? ¿Hay mate con todas las respuestas del rey?</li><li>¿Qué pasa si no la captura? ¿Recupero la pieza o pierdo material?</li><li>¿Hay una jugada intermedia del rival (un jaque, una captura) que lo desbarate todo?</li></ul>",
    "keyPoints": [
     "Antes de jugar Nxe5 calcula también la respuesta correcta del rival: no capturar la dama.",
     "Para el defensor: una clavada relativa no inmoviliza y los regalos se examinan antes de aceptarlos."
    ],
    "positions": [
     {
      "fen": "r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5",
      "orientation": "white",
      "caption": "Juegan blancas. El mate de Légal en otro orden de jugadas: el alfil negro se retira a h5 tras h3 y mantiene la clavada.",
      "line": [
       "h3",
       "Bh5",
       "Nxe5",
       "Bxd1",
       "Bxf7+",
       "Ke7",
       "Nd5#"
      ],
      "comments": [
       "El blanco pregunta al alfil. Lo sano para el negro sería cambiar en f3.",
       "El alfil mantiene la clavada desde h5: ahora la trampa es posible.",
       "El caballo se mueve aunque esté clavado contra la dama: la clavada era solo relativa.",
       "El negro cae en la tentación y captura la dama.",
       "Jaque de alfil en f7: el rey solo tiene e7.",
       "Forzado.",
       "El caballo da mate en d5: los dos caballos y el alfil bastan, porque el rey está encerrado por su alfil de f8 y su peón de d6."
      ],
      "arrows": [
       [
        "f3",
        "e5",
        "g"
       ],
       [
        "g4",
        "d1",
        "r"
       ]
      ]
     },
     {
      "fen": "r2qkb1r/pp1npppp/3p4/1Bp1n3/4P1b1/2PP1N2/PP1N1PPP/R1BQK2R w KQkq - 3 8",
      "orientation": "white",
      "caption": "Juegan blancas. La idea de Légal en una posición moderna: el caballo de f3 está clavado contra la dama, pero el caballo de d7 también está clavado.",
      "line": [
       "Nxe5",
       "Bxd1",
       "Bxd7+",
       "Qxd7",
       "Nxd7"
      ],
      "comments": [
       "El caballo captura en e5 rompiendo la clavada: si el negro toma la dama, hay recuperación con jaque.",
       "El negro captura la dama.",
       "El alfil captura en d7 con jaque.",
       "La dama recaptura.",
       "El caballo captura la dama. El alfil negro de d1 está atacado por el rey y el blanco queda con ventaja material decisiva."
      ],
      "arrows": [
       [
        "f3",
        "e5",
        "g"
       ],
       [
        "b5",
        "d7",
        "g"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r2q1k1r/pp3p1p/1n4p1/1BpP4/3b2b1/2N2N2/PP4PP/R2Q1RK1 w - - 4 16",
      "caption": "Juegan blancas: el alfil negro de d4 te da jaque y tu caballo de f3 está clavado contra la dama. Responde con la idea de Légal.",
      "line": [
       "Nxd4",
       "Bxd1",
       "Ne6+",
       "Kg8",
       "Nxd8"
      ],
      "comments": [
       "El caballo captura el alfil que da jaque, aunque así deja la dama a merced del alfil de g4.",
       "El negro captura la dama.",
       "Jaque de caballo desde e6 que ataca a la dama de d8.",
       "El rey sale del jaque.",
       "El caballo captura la dama. El negro recupera el caballo, pero el blanco también recupera el alfil de d1 y queda con una pieza de más."
      ]
     },
     {
      "fen": "r2qkbnr/ppp2ppp/2np4/4p2b/2B1P3/2N2N1P/PPPP1PP1/R1BQK2R w KQkq - 1 6",
      "caption": "Juegan blancas: el alfil de h5 clava tu caballo contra la dama. Gana material aunque el negro no caiga en la trampa.",
      "line": [
       "Nxe5",
       "Nxe5",
       "Qxh5",
       "Nxc4",
       "Qb5+",
       "c6",
       "Qxc4"
      ],
      "comments": [
       "El caballo captura en e5 a pesar de la clavada. Si ...Bxd1, sigue Bxf7+ Ke7 Nd5#.",
       "La mejor defensa: el negro captura el caballo y no toca la dama.",
       "La dama captura el alfil de h5, que había quedado sin defensa.",
       "El negro ataca el alfil de c4 (también ...Nf6 o ...g6 dejan al blanco con un peón de más).",
       "Jaque de dama que ataca a la vez al caballo de c4.",
       "El negro tapa el jaque.",
       "La dama recupera la pieza: el blanco gana un peón limpio."
      ]
     },
     {
      "fen": "r1bqr1k1/p1p2pp1/2pp1n1p/2b5/4PP1B/2NB3P/PPP3P1/R2QK2R b KQ - 0 11",
      "caption": "Juegan negras: el alfil de h4 clava tu caballo de f6 contra la dama. ¿Puedes mover el caballo igualmente?",
      "line": [
       "Nxe4",
       "Bxd8",
       "Nxc3+",
       "Kd2",
       "Nxd1"
      ],
      "comments": [
       "El caballo captura en e4 ignorando la clavada relativa.",
       "El blanco captura la dama.",
       "El caballo captura en c3 y descubre el jaque de la torre de e8 por la columna e; además ataca a la dama de d1.",
       "El rey sale del jaque.",
       "El caballo recupera la dama: el negro queda con una pieza y un peón de más."
      ]
     },
     {
      "fen": "r2qkb1r/ppp3pp/2n5/4pp1b/2p5/2N2N1P/PPPP1PP1/R1BQR1K1 w kq f6 0 10",
      "caption": "Juegan blancas: tu caballo de f3 está clavado contra la dama por el alfil de h5. Busca el golpe.",
      "line": [
       "Nxe5",
       "Bxd1",
       "Nxc6+",
       "Be7",
       "Nxd8"
      ],
      "comments": [
       "El caballo captura en e5 a pesar de la clavada.",
       "El negro captura la dama.",
       "El caballo captura en c6 con jaque descubierto de la torre de e1 y ataca a la dama de d8.",
       "El negro tapa el jaque.",
       "El caballo captura la dama: el blanco recupera el material con ventaja decisiva."
      ]
     }
    ]
   },
   "t-griego": {
    "html": "<h4>Las tres respuestas del rey, una por una</h4><p>Después de <span class=\"mv\">Bxh7+</span> <span class=\"mv\">Kxh7</span> <span class=\"mv\">Ng5+</span> el defensor elige entre tres casillas, y el atacante debe tener preparada una respuesta para cada una:</p><ul><li><b>...Kg8</b>: llega <span class=\"mv\">Qh5</span> (o <span class=\"mv\">Qh3</span> si la diagonal está libre) amenazando <span class=\"mv\">Qh7#</span>. El negro suele tener que entregar material (...Qxg5, ...Re8 con la idea ...Kf8, o ...Nf6 si es posible). Si el negro puede jugar ...Re8 y ...Kf8, el atacante necesita una pieza más: un peón en e5 que quite f6, una torre que llegue a la tercera fila o el caballo que capture en e6.</li><li><b>...Kg6</b>: el rey sale al frente. Aquí funcionan <span class=\"mv\">Qg4</span> (con amenazas de descubierta con el caballo), <span class=\"mv\">h4</span>-<span class=\"mv\">h5+</span> y jaques de caballo. Es la defensa más difícil de refutar y exige cálculo concreto.</li><li><b>...Kh6</b>: el rey queda en la línea del alfil de c1; los jaques descubiertos del caballo (por ejemplo <span class=\"mv\">Nxe6+</span> o <span class=\"mv\">Nxf7+</span>) ganan material, sobre todo la dama.</li></ul><h4>Cuándo el sacrificio falla: las excepciones</h4><p>El sacrificio griego suele fallar cuando el negro puede <b>capturar el caballo en g5</b> sin pérdida: un alfil en e7, un peón en f6 o la dama en d8 con la diagonal libre (...Qxg5). Aun así, conviene mirar si el atacante tiene un recurso: si el alfil de c1 (o un peón en f4) defiende g5, la captura ...Qxg5 se responde recuperando la dama con ventaja. También falla cuando el negro puede llevar un caballo a f6 o f8 a tiempo, cuando el rey puede huir por f8 hacia e7, o cuando la dama blanca no llega a h5/h3 porque la diagonal está tapada. Antes de sacrificar, recorre estas preguntas: ¿quién controla g5? ¿quién puede ir a f6? ¿puede el rey escapar por f8? ¿mi dama llega a la columna h?</p><h4>Las piezas de refuerzo</h4><p>El sacrificio griego rara vez gana con alfil, caballo y dama solos contra una defensa precisa. Las piezas que convierten un ataque dudoso en decisivo son: el <b>peón en e5</b> (expulsa al caballo de f6 y le quita esa casilla), la <b>torre en la tercera fila</b> (<span class=\"mv\">Re3</span>-<span class=\"mv\">h3</span> o la torre f1 por f3), el <b>alfil de c1</b> en la diagonal c1-h6 y el <b>peón de h</b>, que puede avanzar para abrir la columna. Cuantos más refuerzos lleguen a tiempo, más seguro es el sacrificio.</p><h4>Cómo decidir en la partida</h4><p>Un método práctico es contar <b>atacantes y defensores</b> en el flanco de rey después del sacrificio: si tras <span class=\"mv\">Ng5+</span> y <span class=\"mv\">Qh5</span> tienes tres piezas atacando y el negro solo puede traer una defensora, el sacrificio suele funcionar; si el negro puede traer dos o tres, hace falta cálculo exacto. Y recuerda que el sacrificio es <b>reversible</b> para el defensor: el negro también puede jugar <span class=\"mv\">Bxh2+</span> contra el enroque blanco con la misma lógica, cambiando colores.</p><ul><li>¿Hay alfil en d3, caballo que llegue a g5 y dama que llegue a h5/h3?</li><li>¿Puede el negro capturar en g5 o traer un caballo a f6/f8?</li><li>¿Tengo respuesta a ...Kg8, ...Kg6 y ...Kh6?</li><li>¿Qué refuerzos (peón e5, torre en la tercera, alfil c1, peón h) llegan a tiempo?</li></ul>",
    "keyPoints": [
     "Antes de Bxh7+ prepara una respuesta para ...Kg8, ...Kg6 y ...Kh6.",
     "El sacrificio suele fallar si el negro puede capturar en g5 o traer un caballo a f6/f8 a tiempo."
    ],
    "positions": [
     {
      "fen": "rn1q1rk1/ppp2ppp/2bbp3/8/3P4/3B1N2/PP3PPP/R1BQR1K1 w - - 4 12",
      "orientation": "white",
      "caption": "Juegan blancas. Sacrificio griego con un refuerzo clave: el alfil de c1 defiende g5.",
      "line": [
       "Bxh7+",
       "Kxh7",
       "Ng5+",
       "Qxg5",
       "Bxg5"
      ],
      "comments": [
       "Sacrificio en h7 con jaque.",
       "El rey captura (declinar con ...Kh8 tampoco evita que el blanco quede con ventaja clara).",
       "Jaque de caballo desde g5.",
       "El negro elimina el caballo con la dama para evitar Qh5.",
       "El alfil de c1 recaptura en g5: el blanco ganó dama por alfil y caballo. Sin el alfil en la diagonal c1-g5, ...Qxg5 habría refutado el sacrificio."
      ],
      "arrows": [
       [
        "d3",
        "h7",
        "g"
       ],
       [
        "c1",
        "g5",
        "g"
       ]
      ]
     },
     {
      "fen": "r1bq1rk1/pp1nbppp/2n1p3/3pP3/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 1",
      "orientation": "white",
      "caption": "Cuando el sacrificio falla: el alfil negro de e7 controla g5. Mira qué ocurre si el blanco juega Bxh7+ igualmente.",
      "line": [
       "Bxh7+",
       "Kxh7",
       "Ng5+",
       "Bxg5"
      ],
      "comments": [
       "El sacrificio parece natural: alfil en d3, caballo en f3, peón en e5.",
       "El rey captura.",
       "Jaque de caballo, pero la casilla g5 está controlada.",
       "El alfil de e7 captura el caballo: el blanco perdió dos piezas y no tiene ataque. Antes de Bxh7+ pregunta siempre quién controla g5."
      ],
      "arrows": [
       [
        "e7",
        "g5",
        "r"
       ]
      ]
     }
    ],
    "drills": [
     {
      "fen": "r4rk1/p4ppp/1q2p3/3pP3/1bbP4/4QN2/2B2PPP/1R2R1K1 w - - 4 24",
      "caption": "Juegan blancas: alfil en c2, caballo en f3, dama en e3 y peón en e5. ¿Funciona el sacrificio?",
      "line": [
       "Bxh7+",
       "Kxh7",
       "Ng5+",
       "Kg8",
       "Qh3"
      ],
      "comments": [
       "Sacrificio griego con jaque.",
       "El rey captura.",
       "Jaque de caballo desde g5.",
       "El rey vuelve a g8 (las otras casillas son peores).",
       "La dama llega a h3 por la tercera fila y amenaza mate en h7: el negro tiene que entregar material."
      ]
     },
     {
      "fen": "r1bqnrk1/pp3ppp/2nbp3/2pp4/5P2/1P1BPN2/PBPP2PP/RN2QRK1 w - - 6 9",
      "caption": "Juegan blancas: el caballo negro de f6 se fue a e8. El peón de f4 controla g5. Aprovéchalo.",
      "line": [
       "Bxh7+",
       "Kxh7",
       "Ng5+",
       "Qxg5",
       "fxg5"
      ],
      "comments": [
       "Sacrificio en h7 con jaque.",
       "El rey captura.",
       "Jaque de caballo desde g5, defendido por el peón de f4.",
       "Si el rey vuelve a g8, llega Qh4 con mate imparable en h7; el negro prefiere entregar la dama.",
       "El peón captura la dama: el blanco gana dama por alfil y caballo."
      ]
     },
     {
      "fen": "r1b2rk1/p1p2ppp/1p2q3/2b1P3/1n1n4/2NB1NQ1/PPPB2PP/2K1R2R w - - 3 15",
      "caption": "Juegan blancas: la dama negra está en e6. Busca un sacrificio que termine con un ataque doble.",
      "line": [
       "Bxh7+",
       "Kxh7",
       "Ng5+",
       "Kg8",
       "Nxe6"
      ],
      "comments": [
       "Sacrificio en h7 con jaque.",
       "El rey captura.",
       "Jaque de caballo desde g5, que además ataca a la dama de e6.",
       "El rey vuelve a g8.",
       "El caballo captura la dama: el sacrificio sirvió para ganar el tiempo del jaque."
      ]
     },
     {
      "fen": "r1bq1rk1/ppp3pp/2pb1n2/5p2/2N1P3/2N5/PPPPQPPP/R1B2RK1 b - - 2 9",
      "caption": "Juegan negras: el sacrificio griego también funciona contra el enroque blanco. Alfil en d6, caballo en f6 y dama lista para entrar por h4.",
      "line": [
       "Bxh2+",
       "Kxh2",
       "Ng4+",
       "Kg1",
       "Qh4"
      ],
      "comments": [
       "Sacrificio en h2 con jaque.",
       "El rey captura.",
       "Jaque de caballo desde g4: el rey no puede quedarse en h2.",
       "El rey vuelve a g1 (en g3 o h3 queda todavía más expuesto; entregar la dama con Qxg4 tampoco salva).",
       "La dama llega a h4 y amenaza mate en h2: el blanco tendrá que entregar la dama por el caballo de g4."
      ]
     }
    ]
   }
  };
  (window.LESSONS || []).forEach(l => { const x = X[l.id]; if (!x) return;
    if (x.html) l.html = (l.html || '') + x.html;
    if (x.keyPoints) l.keyPoints = (l.keyPoints || []).concat(x.keyPoints);
    if (x.positions) l.positions = (l.positions || []).concat(x.positions);
    if (x.drills) l.drills = (l.drills || []).concat(x.drills); });
})();
