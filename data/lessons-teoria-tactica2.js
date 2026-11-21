/* Teoría ampliada y ejercicios nuevos: tactica2. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
    "t2-sueltas": {
      "html": "<h4>El principio de las piezas sueltas, con matices</h4><p>El gran maestro John Nunn popularizó una regla de tres letras en inglés que se suele traducir como «las piezas sueltas se caen». No es una ley absoluta: una pieza sin defensa no se pierde por sí sola. Lo que ocurre es que <b>cada pieza suelta es un objetivo gratuito</b> para cualquier ataque doble, y en una partida real aparecen ataques dobles con mucha más frecuencia de lo que parece. Hay excepciones razonables: un caballo bien centralizado que ninguna pieza rival puede alcanzar, o una torre en su casilla inicial cuando el rival no tiene diagonales ni columnas abiertas hacia ella. La pregunta correcta no es «¿está defendida?», sino «¿puede el rival atacarla <i>con ganancia de tiempo</i>?».</p><h4>Las cinco formas de castigar una pieza suelta</h4><ul><li><b>Doble ataque de dama</b>, sobre todo si uno de los dos ataques es jaque o amenaza de mate: el rival atiende lo urgente y pierde lo otro.</li><li><b>Horquilla de caballo</b>: las torres sin conectar en la primera fila son la presa favorita, porque el caballo ataca casillas del mismo color separadas por dos columnas.</li><li><b>Jaque a la descubierta</b>: una pieza se aparta con captura o con amenaza y descubre un jaque de la pieza de atrás. El rival responde al jaque y la segunda amenaza se cumple.</li><li><b>Ataque de peón</b>: un peón que avanza atacando dos piezas a la vez gana material casi siempre.</li><li><b>Cambio que deja una pieza sin protección</b>: a veces la combinación empieza con un cambio que elimina al único defensor o que obliga a recapturar con la pieza que defendía otra.</li></ul><h4>Errores típicos de los aficionados</h4><p>El más frecuente es <b>mover la pieza que defendía otra</b> sin darse cuenta: el caballo de f6 sale a buscar actividad y el peón de h7, o el alfil de d5, quedan solos. El segundo es <b>capturar un peón con una pieza que queda suelta en territorio rival</b>, sobre todo con la dama. El tercero, muy típico en la apertura, es cambiar damas cuando las propias torres no están conectadas: tras el cambio en d8, un caballo que salta a f7 o c7 ataca dos torres a la vez. Y el cuarto es mirar solo las piezas, olvidando que una torre en a8 se queda suelta en cuanto el alfil de b7 o el caballo de b8 abandonan su puesto.</p><h4>Cómo pensarlo en la partida</h4><ol><li>Después de cada jugada del rival, repasa en dos segundos: ¿qué piezas mías han quedado sin defensa? ¿Y cuáles suyas?</li><li>Si hay dos piezas rivales sueltas, busca la casilla desde la que una dama, un caballo o un peón las ataque a la vez.</li><li>Si solo hay una, busca un <b>jaque</b> o una <b>amenaza de mate</b> que la acompañe: el segundo objetivo puede ser el rey.</li><li>Antes de jugar tu candidata, comprueba que la pieza que mueves no deja otra pieza tuya suelta.</li></ol><p>Con la práctica este inventario se vuelve automático y deja de costar tiempo en el reloj.</p>",
      "keyPoints": [
        "Una pieza suelta no se pierde sola: se pierde cuando el rival encuentra un ataque doble con ganancia de tiempo.",
        "Tras cada jugada del rival, repasa qué piezas tuyas y suyas han quedado sin defensa.",
        "Las torres sin conectar son presa fácil de horquillas y jaques a la descubierta."
      ],
      "positions": [
        {
          "fen": "r2qk2r/pp2pppp/8/8/1b6/2N5/PP2QPPP/R4RK1 w kq - 0 1",
          "orientation": "white",
          "caption": "El alfil de b4 está suelto y el rey negro sigue en el centro. Una sola jugada de dama ataca las dos cosas.",
          "line": [
            "Qb5+",
            "Qd7",
            "Qxb4"
          ],
          "comments": [
            "Jaque por la diagonal b5-e8 y, a la vez, ataque al alfil por la fila. El alfil clavaba al caballo, pero nadie lo protegía.",
            "Tapar con la dama es lo más sólido; si 1...Nd7 o 1...Kf8, la dama también captura en b4.",
            "Las blancas ganan una pieza limpia. El inventario de piezas sueltas lo habría previsto: el alfil de b4 no tenía ningún defensor."
          ],
          "arrows": [
            [
              "b5",
              "e8",
              "r"
            ],
            [
              "b5",
              "b4",
              "r"
            ]
          ]
        },
        {
          "fen": "3r2k1/pp1n1p1p/6p1/8/4N3/8/PP3PPP/3R2K1 w - - 0 1",
          "orientation": "white",
          "caption": "El caballo de d7 solo lo defiende la torre. Si la torre recaptura, quedará ella suelta en la casilla de una horquilla.",
          "line": [
            "Rxd7",
            "Rxd7",
            "Nf6+",
            "Kf8",
            "Nxd7+"
          ],
          "comments": [
            "Las blancas cambian torre por caballo: parece igualar material, pero prepara el golpe. Si las negras no recapturan (1...Rc8), simplemente quedan con una pieza menos.",
            "Si la torre recaptura, queda en d7 sin ninguna defensa.",
            "Horquilla con jaque: el caballo ataca g8 y d7. Por eso faltaba el peón de g7: con él, gxf6 eliminaría al caballo.",
            "El rey debe salir del jaque.",
            "El caballo captura la torre suelta con jaque. Balance: las blancas quedan con una pieza de más."
          ],
          "arrows": [
            [
              "f6",
              "g8",
              "r"
            ],
            [
              "f6",
              "d7",
              "r"
            ]
          ]
        }
      ],
      "drills": [
        {
          "fen": "r2n1rk1/p1p2ppp/8/2b3N1/8/8/PPP1QPPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: hay una pieza negra sin defensa y un punto débil cerca del rey. Encuentra la jugada que amenaza las dos cosas.",
          "line": [
            "Qe4",
            "g6",
            "Qxa8"
          ],
          "comments": [
            "Doble amenaza: Qxh7# (el caballo de g5 apoya y la torre de f8 tapa la huida) y Qxa8, porque la torre de a8 está suelta: el caballo de d8 la separa de la torre de f8.",
            "Lo único contra el mate: el peón tapa la diagonal e4-h7. También 1...f5 o 1...h6 pierden la torre (tras 1...h6, Qh7# sigue siendo mate).",
            "La torre cae. El ataque de mate era la primera amenaza; la pieza suelta, la segunda."
          ]
        },
        {
          "fen": "3q1rk1/pb3ppp/1p6/8/N3P3/3B4/PP2Q1PP/4R1K1 b - - 0 1",
          "caption": "Juegan negras: van con una pieza menos, pero un caballo blanco está suelto en el borde. Recupera el material.",
          "line": [
            "Qd4+",
            "Kh1",
            "Qxa4"
          ],
          "comments": [
            "Jaque por la diagonal d4-g1 (el peón de f2 ya no está) y ataque al caballo de a4 por la cuarta fila.",
            "Tapar con 2.Qf2 o 2.Be3 no cambia nada: la dama captura igualmente en a4.",
            "Las negras recuperan la pieza y el material queda igualado. El caballo en el borde y sin defensa era el objetivo natural."
          ]
        },
        {
          "fen": "r3k2r/pp1n1ppp/3b4/8/4B3/2N5/PPP2PPP/4R1K1 w - - 0 1",
          "caption": "Juegan blancas: el rey negro está en la columna de tu torre y la torre de a8 no tiene protección. ¿Cómo aprovechas las dos cosas?",
          "line": [
            "Bxb7+",
            "Kd8",
            "Bxa8"
          ],
          "comments": [
            "El alfil se aparta de la columna e capturando un peón: jaque a la descubierta de la torre de e1 y, a la vez, ataque a la torre de a8.",
            "Las negras deben atender el jaque (también 1...Kf8, 1...Be7 o 1...Ne5); ninguna de esas jugadas salva la torre.",
            "La torre de a8 cae. Las blancas recuperan la calidad que tenían de menos y quedan con un peón de ventaja."
          ]
        },
        {
          "fen": "rnbqkb1r/ppp3pp/4pn2/6N1/8/8/PPP2PPP/RNBQKB1R w KQkq - 0 1",
          "caption": "Juegan blancas: las torres negras no están conectadas y la casilla f7 quedó libre. Busca la secuencia que gana material.",
          "line": [
            "Qxd8+",
            "Kxd8",
            "Nf7+",
            "Ke8",
            "Nxh8"
          ],
          "comments": [
            "Cambio de damas con jaque: obliga a recapturar y fija las piezas negras en la octava fila.",
            "Única jugada legal: e7 y f7 están controladas por la dama y el caballo, así que el rey debe recapturar.",
            "El caballo ataca el rey de d8 y la torre de h8 a la vez.",
            "El rey sale del jaque; la torre no tiene defensa.",
            "Las blancas ganan la calidad. Lección práctica: no cambies damas en d8 si tu torre de h8 queda suelta y f7 es accesible para un caballo."
          ]
        }
      ]
    },
    "t2-ccj": {
      "html": "<h4>Por qué el método funciona</h4><p>El cálculo humano es limitado: cuantas más respuestas tiene el rival, menos lejos podemos ver. Las jugadas forzadas reducen ese abanico a una o dos respuestas, y por eso permiten calcular con seguridad tres o cuatro jugadas. Un jaque deja al rival, a lo sumo, tres tipos de respuesta (mover el rey, tapar o capturar la pieza que da jaque); una captura obliga casi siempre a recapturar; una amenaza seria (de mate o de dama) obliga a defenderse. Revisar estas tres familias en orden no es una manía de principiante: es lo que hacen los jugadores fuertes en cada posición tensa, aunque lo hagan en segundos. Un buen hábito de entrenamiento es resolver ejercicios diciendo en voz alta la lista completa antes de mover: al principio parece lento, pero en pocas semanas la revisión se hace en segundos y deja de olvidarse el jaque decisivo.</p><h4>Los jaques «imposibles» primero</h4><p>Los mejores tácticos se obligan a mirar incluso los jaques que entregan la dama. La razón es práctica: un sacrificio de dama con jaque se descarta en un instante si no funciona, pero cuando funciona suele dar mate. Pregúntate en cada jaque: ¿adónde puede ir el rey?, ¿qué casillas le quitan sus propias piezas?, ¿quién puede capturar? Muchas combinaciones célebres (el mate de Anastasia, el mate de Boden, el mate ahogado) empiezan con un jaque que parece absurdo y que el método obliga a considerar.</p><h4>Las amenazas: el escalón más difícil de ver</h4><p>Una amenaza no da jaque ni captura nada, y por eso pasa desapercibida. Las más fuertes son las <b>amenazas dobles</b>: una jugada de dama que amenaza mate en una esquina y, a la vez, una pieza suelta en la otra. El rival solo puede atender una de las dos. Al buscarlas, pregúntate qué casillas cercanas al rey rival están defendidas una sola vez y qué piezas rivales no tienen protección: la jugada que apunta a ambas cosas suele ser la candidata ganadora.</p><h4>Errores comunes</h4><ul><li>Calcular a fondo la primera idea que se nos ocurre y no revisar las demás. Antes de profundizar, haz la lista completa.</li><li>Detenerse en la primera respuesta del rival que nos gusta. Para cada candidata, busca la defensa que más te molesta.</li><li>Olvidar las jugadas forzadas del rival después de nuestra jugada. Una captura «gratis» que permite un jaque en la primera fila puede costar la partida.</li><li>Confundir «jugada forzada» con «jugada buena»: el método indica qué mirar primero, no qué jugar sin pensar.</li></ul><h4>Una rutina de treinta segundos</h4><ol><li>Escribe mentalmente todos los jaques (incluidos los sacrificios).</li><li>Añade todas las capturas, empezando por las que eliminan defensores.</li><li>Añade las amenazas de mate y los ataques a piezas sueltas.</li><li>Elige dos o tres candidatas y calcula cada una hasta una posición tranquila.</li><li>Antes de soltar la pieza, repite los pasos 1-3 desde el lado del rival.</li></ol>",
      "keyPoints": [
        "Revisa primero incluso los jaques que entregan la dama: se descartan rápido y a veces dan mate.",
        "Las amenazas dobles (mate en un lado, pieza suelta en el otro) son la familia más difícil de ver.",
        "Después de elegir tu jugada, repite el método desde el lado del rival."
      ],
      "positions": [
        {
          "fen": "3qr1k1/pp3ppp/8/2b5/8/8/PP2QPPP/4R1K1 w - - 0 1",
          "orientation": "white",
          "caption": "Paso 2 del método: capturas. La torre de e8 está defendida una vez; las blancas la atacan dos veces en batería.",
          "line": [
            "Qxe8+",
            "Qxe8",
            "Rxe8+",
            "Bf8"
          ],
          "comments": [
            "La captura que elimina al defensor de la primera fila. La dama entrega su vida por la torre…",
            "…y la dama negra recaptura, pero ahora queda en la columna de la torre blanca.",
            "Segunda captura con jaque: las blancas han cambiado dama por dama y torre.",
            "El alfil tapa. Balance: las blancas ganan una torre limpia. Las capturas en batería deben empezar por la pieza que está delante."
          ],
          "arrows": [
            [
              "e2",
              "e8",
              "r"
            ],
            [
              "e1",
              "e8",
              "r"
            ]
          ]
        },
        {
          "fen": "4r1k1/1p3ppp/8/3Q4/1q6/8/PP3PPP/2R3K1 w - - 0 1",
          "orientation": "white",
          "caption": "Aplica el método también al rival: ¿qué pasa si las blancas comen el peón de b7?",
          "line": [
            "Qxb7",
            "Re1+",
            "Rxe1",
            "Qxe1#"
          ],
          "comments": [
            "Una captura «gratis» que olvida revisar los jaques del rival. Había jugadas tranquilas mejores, como g3 o h4, que dan luft.",
            "Jaque en la primera fila: el rey no tiene casillas porque los peones f2, g2 y h2 siguen en su sitio.",
            "Forzado: capturar con la torre es la única forma de salir del jaque.",
            "Mate. La dama de b4 llega a e1 por la diagonal. Antes de capturar, pregunta siempre: ¿qué jaques tendrá mi rival después?"
          ],
          "arrows": [
            [
              "e8",
              "e1",
              "r"
            ],
            [
              "b4",
              "e1",
              "r"
            ]
          ]
        }
      ],
      "drills": [
        {
          "fen": "rq3rk1/pp3ppp/8/3N4/8/3Q1R2/PPP2PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: revisa todos los jaques, incluso los que parecen absurdos. Hay mate forzado.",
          "line": [
            "Ne7+",
            "Kh8",
            "Qxh7+",
            "Kxh7",
            "Rh3#"
          ],
          "comments": [
            "El caballo da jaque y controla g8 y g6. La torre de f8 impide que el rey huya a f8.",
            "Única casilla.",
            "¡Sacrificio de dama con jaque! Abre la columna h para la torre.",
            "Forzado: el rey debe capturar.",
            "Mate de Anastasia: el caballo de e7 cubre g8 y g6, el peón de g7 tapa la otra salida y la torre da jaque por la columna abierta."
          ]
        },
        {
          "fen": "2kr1b1r/pp1n1ppp/2n1p3/8/5B1q/5Q2/PPP1BPPP/R4RK1 w - - 0 1",
          "caption": "Juegan blancas: el rey negro está rodeado de sus propias piezas. Empieza por el jaque más «imposible».",
          "line": [
            "Qxc6+",
            "bxc6",
            "Ba6#"
          ],
          "comments": [
            "¡La dama se entrega con jaque! El caballo de c6 solo lo defiende el peón de b7, y capturarlo abre la diagonal a6-c8.",
            "Forzado: no hay otra forma de responder al jaque.",
            "Mate de Boden: el alfil de f4 controla b8 y c7, el de a6 da jaque por b7, y d7 y d8 están ocupadas por piezas negras."
          ]
        },
        {
          "fen": "4r1k1/pp3ppp/8/4n3/8/2P2N2/PQ3PPP/4K2R b K - 0 1",
          "caption": "Juegan negras: el rey blanco está en la columna de tu torre. Busca el jaque más fuerte posible.",
          "line": [
            "Nd3+",
            "Kd2",
            "Nxb2"
          ],
          "comments": [
            "Jaque doble: la torre de e8 da jaque al descubierto y el caballo, desde d3, también ataca e1. Contra un jaque doble solo vale mover el rey. Además el caballo ataca la dama de b2.",
            "El rey debe moverse (2.Kf1 o 2.Kd1 tampoco salvan la dama).",
            "Las negras ganan la dama. Compara con 1...Nxf3+, que también es jaque doble pero solo gana un caballo: revisa todos los jaques y elige el que gana más."
          ]
        },
        {
          "fen": "2r3k1/pp3ppp/q2b4/8/8/8/PB3PPP/3QR1K1 w - - 0 1",
          "caption": "Juegan blancas: no hay jaques que funcionen ni capturas que ganen. Busca una amenaza doble.",
          "line": [
            "Qg4",
            "Bf8",
            "Qxc8"
          ],
          "comments": [
            "La dama amenaza Qxg7# (con el apoyo del alfil de b2) y, por la diagonal g4-c8, la torre de c8, que está suelta.",
            "La única defensa del mate que no pierde de inmediato: el alfil protege g7. Pero la torre queda sin defensa.",
            "Las blancas ganan una torre. La amenaza de mate fue el tempo que hizo caer la pieza suelta."
          ]
        }
      ]
    },
    "t2-conteo": {
      "html": "<h4>Contar no es solo sumar</h4><p>El recuento de atacantes y defensores es la primera aproximación, pero el resultado de una secuencia de capturas depende de tres cosas: <b>cuántas</b> piezas participan, <b>en qué orden</b> capturan y <b>cuándo conviene detenerse</b>. Cualquiera de los dos bandos puede interrumpir la secuencia en el momento que más le convenga. Por eso no basta con llegar al final de todas las capturas: en cada paso hay que preguntarse si al bando que va a capturar le conviene seguir o quedarse como está. Un ejemplo sencillo: si un peón está atacado por caballo y torre y defendido por caballo y dama, la cuenta dice dos contra dos; pero si capturas con el caballo y el rival recaptura con el suyo, tu torre ya no debe seguir, porque la dama recapturaría la torre. La secuencia se detiene en el momento en que continuar cuesta más de lo que se gana.</p><h4>Los factores que cambian la cuenta</h4><ul><li><b>Las baterías</b>: una torre detrás de otra torre o de la dama cuenta como atacante adicional (ataque en rayos X), pero solo entra en juego cuando la de delante ya ha capturado.</li><li><b>Las piezas clavadas</b>: un caballo clavado contra la dama o contra el rey no defiende de verdad. Si recaptura, pierde la pieza de atrás.</li><li><b>La eliminación del defensor</b>: si una casilla está igualada (dos contra dos), capturar antes a uno de los defensores en otra parte del tablero inclina la balanza.</li><li><b>Los defensores sobrecargados</b>: una pieza que defiende dos cosas solo puede recapturar en una de ellas.</li><li><b>El valor del primer capturador</b>: cuando la pieza objetivo vale más que el atacante más barato, la captura gana aunque haya más defensores que atacantes. Un peón que ataca un caballo lo gana siempre.</li></ul><h4>El orden correcto de las capturas</h4><p>La regla general es capturar primero con la pieza de <b>menor valor</b>, porque así, si el rival recaptura, lo que entregas vale poco. La excepción aparece cuando una pieza de más valor está en una batería por delante de otra (una torre delante de la dama, por ejemplo): entonces el orden lo marca la geometría. Otra excepción es la captura que da jaque o que elimina a un defensor de otra casilla: a veces conviene capturar con la pieza grande para no dar tiempo al rival.</p><h4>Errores típicos</h4><ul><li>Contar las piezas pero no su valor: atacar tres veces un caballo defendido por un peón no gana nada.</li><li>Olvidar que el rival puede no recapturar y usar ese tiempo para otra cosa.</li><li>No ver las baterías del rival detrás de sus piezas.</li><li>Contar como defensor a una pieza clavada, o no ver que la propia pieza atacante está clavada.</li></ul><h4>Lista de comprobación</h4><ol><li>Escribe los atacantes de menor a mayor valor y lo mismo con los defensores.</li><li>Descarta los clavados y suma los que están en batería.</li><li>Simula la secuencia y, en cada paso, decide si el bando que mueve se detiene.</li><li>Si la cuenta está igualada, busca cómo eliminar o desviar a un defensor antes de empezar.</li></ol>",
      "keyPoints": [
        "En cada paso de la secuencia, el bando que va a capturar puede detenerse: simula decidiendo en cada jugada.",
        "Una pieza clavada no defiende, y eliminar a un defensor antes de capturar cambia la cuenta.",
        "Si el objetivo vale más que tu atacante más barato, la captura gana aunque haya más defensores."
      ],
      "positions": [
        {
          "fen": "r1bq1rk1/ppp2ppp/2n5/4n3/8/2N2N2/PPP1QPPP/R3R1K1 w - - 0 1",
          "orientation": "white",
          "caption": "El caballo de e5 está atacado dos veces (caballo y dama en batería con la torre) y defendido una vez. ¿Seguro?",
          "line": [
            "Nxe5",
            "Nxe5",
            "Qxe5",
            "Re8"
          ],
          "comments": [
            "Primer paso correcto: capturar con la pieza de menos valor.",
            "Las negras recapturan con su segundo caballo.",
            "Ahora la dama captura en e5, con la torre de e1 detrás como apoyo en rayos X.",
            "Las negras atacan la dama, pero no tienen más capturas en e5. Balance: las blancas ganan una pieza."
          ]
        },
        {
          "fen": "2r3k1/p4ppp/1p2bn2/3p4/8/1Q3N2/PP3PPP/3R2K1 w - - 0 1",
          "orientation": "white",
          "caption": "Dos atacantes (dama y torre) contra dos defensores (caballo y alfil) sobre d5. ¿Conviene capturar?",
          "line": [
            "Rxd5",
            "Nxd5",
            "Qxd5",
            "Bxd5"
          ],
          "comments": [
            "Un error de conteo. Con la cuenta igualada, el primero que captura suele perder material. Lo correcto era una jugada de mejora como Nd4.",
            "El caballo recaptura la torre.",
            "La dama sigue la secuencia hasta el final…",
            "…y el alfil la captura. Las blancas han dado dama y torre por peón y caballo. Con igualdad de atacantes y defensores, no se empieza a capturar."
          ]
        }
      ],
      "drills": [
        {
          "fen": "2rq1rk1/pp2bppp/5n2/3p2B1/8/1PN1P3/P3QPPP/3R1RK1 w - - 0 1",
          "caption": "Juegan blancas: el peón de d5 tiene dos atacantes y dos defensores. Cambia la cuenta a tu favor.",
          "line": [
            "Bxf6",
            "Bxf6",
            "Nxd5"
          ],
          "comments": [
            "Eliminación del defensor: el caballo de f6 era uno de los dos guardianes de d5. Si 1...gxf6, las blancas también capturan en d5 y el enroque negro queda roto.",
            "La mejor recaptura. Ahora d5 solo lo defiende la dama.",
            "El peón cae: dos atacantes (caballo y torre) contra un defensor. Las blancas ganan un peón sano."
          ]
        },
        {
          "fen": "r2q1rk1/pp3ppp/5b2/8/3n4/4QN2/PPP2PPP/3R1RK1 w - - 0 1",
          "caption": "Juegan blancas: el caballo de d4 está atacado tres veces y defendido dos. ¿Con qué pieza capturas?",
          "line": [
            "Nxd4",
            "Qb6"
          ],
          "comments": [
            "Con la pieza de menos valor. Si 1.Rxd4? Bxd4 y la torre se pierde por un alfil; si 1.Qxd4?? Bxd4, la dama. Tras 1.Nxd4, si 1...Bxd4 2.Rxd4 y las blancas quedan con una pieza de más.",
            "Las negras no recapturan: la cuenta les es desfavorable. Las blancas han recuperado la pieza y la posición queda equilibrada."
          ]
        },
        {
          "fen": "r2q1rk1/ppp2ppp/1b1p1n2/6B1/4b3/2N5/PPP1BPPP/R2Q1RK1 w - - 0 1",
          "caption": "Juegan blancas: el alfil de e4 parece defendido por el caballo de f6. Cuenta de verdad.",
          "line": [
            "Nxe4",
            "Nxe4",
            "Bxd8",
            "Raxd8"
          ],
          "comments": [
            "El caballo de f6 está clavado contra la dama de d8 por el alfil de g5: no defiende de verdad.",
            "Si recaptura, deja la dama al descubierto. (Si no recaptura, las blancas simplemente se quedan con el alfil.)",
            "La dama cae.",
            "Las negras tienen caballo y alfil por la dama: las blancas quedan con ventaja decisiva."
          ]
        },
        {
          "fen": "r2q1rk1/ppp2ppp/2n2b2/8/3P2b1/4BN2/PPP1BPPP/R2Q1RK1 b - - 0 1",
          "caption": "Juegan negras: d4 tiene tres atacantes y tres defensores. Haz que la cuenta te favorezca.",
          "line": [
            "Bxf3",
            "Bxf3",
            "Nxd4"
          ],
          "comments": [
            "Eliminación del defensor: el caballo de f3 era uno de los tres protectores de d4.",
            "Recapturar con el alfil es lo natural (2.gxf3 rompe el enroque).",
            "Ahora son tres atacantes contra dos defensores y el peón cae. Las negras recuperan el material."
          ]
        }
      ]
    },
    "t2-atrapada": {
      "html": "<h4>Contar las casillas de la víctima</h4><p>La técnica para atrapar una pieza es siempre la misma: contar sus casillas de huida y quitárselas una a una. Conviene hacerlo con método: para un alfil, mira sus dos diagonales en ambos sentidos; para un caballo, sus ocho saltos posibles (en el borde son cuatro, en la esquina solo dos); para una dama, las ocho direcciones. Una casilla está «quitada» si está ocupada por una pieza de su propio bando o controlada por una pieza o un peón del rival. Cuando las casillas libres son una o ninguna, la pieza está en peligro aunque todavía nadie la ataque. Recuerda que las piezas de largo alcance también pueden quedar atrapadas en el centro si sus diagonales o columnas están bloqueadas por sus propios peones: un alfil «malo» encerrado detrás de su cadena es, en la práctica, una pieza atrapada que no se puede capturar.</p><h4>Planes típicos paso a paso</h4><ul><li><b>Alfil que come un peón de torre</b> (a7, h7, a2, h2): primero se cierra la diagonal de salida con un peón (por ejemplo <span class=\"mv\">b6</span> o <span class=\"mv\">g6</span>), luego se controla la casilla del borde que le queda y por último se ataca con el rey o una torre.</li><li><b>Alfil que se adentra con jaques</b> (de b4 a a5): un avance de peón con ganancia de tiempo (<span class=\"mv\">b4</span>) lo empuja a una casilla donde otro peón (<span class=\"mv\">c5</span>) le cierra la última salida.</li><li><b>Caballo en el borde</b>: basta con controlar sus tres o cuatro casillas y atacarlo con un peón.</li><li><b>Dama que come el peón de b2</b>: las torres y los caballos le cortan la retirada por la columna y la diagonal.</li></ul><h4>La excepción: cuando la pieza atrapada se vende cara</h4><p>Una pieza atrapada no siempre está perdida a cambio de nada. Antes de caer puede capturar un peón (convirtiéndose en <i>desperado</i>), dar un jaque o llevarse por delante a otra pieza. También puede ocurrir que el rival rompa la jaula con un avance de peón, como <span class=\"mv\">a4</span>-<span class=\"mv\">a5</span> contra un alfil encerrado en a7. Por eso, al atrapar una pieza, calcula también qué puede hacer ella en sus últimas jugadas y cómo puede el rival abrirle una salida.</p><h4>Errores comunes</h4><ul><li>Lanzarse a atacar la pieza antes de cerrarle las casillas: la pieza simplemente se va. Primero la jaula, después el ataque.</li><li>Capturar un peón de borde con un alfil «porque no hay peligro inmediato»: el peligro llega una jugada después, con un avance de peón.</li><li>Olvidar las jugadas intermedias del rival: una pieza atrapada puede salvarse si su dueño consigue dar un jaque a tiempo.</li></ul><h4>Preguntas para la partida</h4><ol><li>¿Qué pieza rival tiene menos de tres casillas libres?</li><li>¿Puedo quitarle una con un peón ganando tiempo?</li><li>¿Qué hace esa pieza si la ataco ahora? ¿Puede venderse cara?</li><li>Y en defensa: antes de capturar con una pieza en el borde, ¿por dónde vuelve?</li></ol>",
      "keyPoints": [
        "Primero la jaula, después el ataque: cierra las casillas de la pieza antes de atacarla.",
        "Una pieza atrapada puede venderse cara (desperado) o ser rescatada por un avance de peón: calcúlalo.",
        "Antes de capturar en el borde, pregúntate por dónde vuelve la pieza."
      ],
      "positions": [
        {
          "fen": "2r3k1/Bpp2ppp/5n2/8/8/8/PPP2PPP/3R2K1 b - - 0 1",
          "orientation": "black",
          "caption": "La excepción: el alfil de a7 parece encerrado tras ...b6, pero las blancas tienen un peón para abrirle la jaula.",
          "line": [
            "b6",
            "a4",
            "h5",
            "a5",
            "bxa5"
          ],
          "comments": [
            "Cierra la diagonal a7-b6; la casilla b8 la controla la torre de c8.",
            "El rescate: el peón de a amenaza a5 para atacar el peón de b6.",
            "Las negras no pueden impedir el plan y juegan en otro sitio. Si 2...Ra8, 3.a5 y la jaula se rompe igualmente.",
            "El peón ataca b6.",
            "Tras la captura, la casilla b6 queda libre y el alfil saldrá por b6 o se defenderá desde a7. La posición está igualada: la jaula tenía una puerta."
          ],
          "highlights": [
            "a7",
            "b6",
            "a4"
          ]
        },
        {
          "fen": "4r1k1/p4ppp/1p6/n2B4/8/8/PPP2PPP/3R2K1 w - - 0 1",
          "orientation": "white",
          "caption": "Caballo en el borde: cuenta sus casillas. El alfil de d5 controla b3, c4, c6 y b7.",
          "line": [
            "b4",
            "Kf8",
            "bxa5",
            "bxa5"
          ],
          "comments": [
            "El peón ataca al caballo, que no tiene ninguna casilla segura: b3 y c4 las cubre el alfil, igual que c6 y b7.",
            "Las negras no pueden salvarlo y juegan otra cosa.",
            "El caballo cae.",
            "Las negras recuperan un peón, pero quedan con una pieza menos. La jaula se construyó con una sola pieza bien colocada."
          ],
          "highlights": [
            "a5",
            "b3",
            "c4",
            "c6",
            "b7"
          ]
        }
      ],
      "drills": [
        {
          "fen": "2r3k1/Bpp2ppp/5n2/8/8/8/1P3PPP/3R2K1 b - - 0 1",
          "caption": "Juegan negras: el alfil blanco acaba de comer en a7. Ciérrale la salida (aquí las blancas no tienen peón de a para rescatarlo).",
          "line": [
            "b6"
          ],
          "comments": [
            "El peón, defendido por c7, cierra la diagonal a7-b6-c5. La única otra salida, b8, la domina la torre de c8. El alfil está perdido: las negras lo capturarán con ...Ra8 o con el rey. En cambio, 1...Ra8? permite 2.Bc5 o 2.Be3, porque la diagonal sigue abierta."
          ]
        },
        {
          "fen": "r1bqk2r/pppp1ppp/2n2n2/b3p3/2P1P3/P1N2N2/1P1P1PPP/R1BQKB1R w KQkq - 0 1",
          "caption": "Juegan blancas: el alfil de a5 está en el borde y los peones negros de a7 y c7 le quitan casillas. Atrápalo.",
          "line": [
            "b4",
            "Bb6",
            "c5"
          ],
          "comments": [
            "El peón expulsa al alfil con ganancia de tiempo y, apoyado por a3, le quita a5.",
            "Única retirada: a7 y c7 están ocupadas por peones negros.",
            "Encerrado: b6 queda atacada y el alfil no tiene casillas (a5 la controla el peón de b4, a7 y c7 son suyas). Las negras solo pueden sacar algo a cambio, por ejemplo con ...d5."
          ]
        },
        {
          "fen": "4rk2/5ppB/1np5/8/8/6P1/5P1P/3R2K1 b - - 0 1",
          "caption": "Juegan negras: el alfil blanco comió en h7 y parece a salvo. Ciérrale la salida.",
          "line": [
            "g6",
            "Bxg6",
            "fxg6"
          ],
          "comments": [
            "El peón corta la diagonal h7-b1; g8 la controla el rey de f8. Si las blancas no hacen nada, ...Kg7 captura el alfil.",
            "Las blancas prefieren entregar el alfil por dos peones antes que perderlo por nada.",
            "Las negras quedan con una pieza por dos peones y una posición ganadora."
          ]
        },
        {
          "fen": "3r2k1/pp3ppp/8/8/8/5N2/bPP2PPP/2K1R3 w - - 0 1",
          "caption": "Juegan blancas: el alfil negro comió en a2. ¿Cómo lo dejas sin salida?",
          "line": [
            "b3",
            "Kf8",
            "Kb2",
            "Bxb3",
            "cxb3"
          ],
          "comments": [
            "El peón, defendido por c2, cierra la diagonal a2-b3. La otra salida, b1, la controla el rey.",
            "Las negras no tienen forma de rescatarlo.",
            "El rey ataca el alfil.",
            "El alfil se vende por un peón…",
            "…y las blancas quedan con una pieza por un peón."
          ]
        }
      ]
    },
    "t2-despeje": {
      "html": "<h4>Despeje de casilla y despeje de línea</h4><p>Conviene distinguir dos tipos. En el <b>despeje de línea</b> la pieza propia tapa una columna, una fila o una diagonal por la que debería actuar otra pieza de largo alcance; al apartarla, la línea se abre. En el <b>despeje de casilla</b> la pieza ocupa justo el punto al que otra necesita llegar (normalmente para dar mate). En ambos casos el defensor suele estar tranquilo porque «ve» que la línea está cerrada: el despeje es eficaz precisamente porque cambia la geometría en una sola jugada. Los manuales de combinaciones lo clasifican junto a la desviación y la atracción, pero con una diferencia importante: en el despeje no se mueve una pieza del rival, sino una propia. Por eso es tan fácil pasarlo por alto: buscamos debilidades en el campo contrario y no miramos qué estorba en el nuestro. Un buen ejercicio es preguntarse, en cada posición de ataque, «si esta pieza mía desapareciera del tablero, ¿qué ganaría?».</p><h4>Las tres maneras de apartarse</h4><ul><li><b>Con jaque</b>: es la más fuerte. Si además la pieza de atrás también da jaque, se trata de un jaque doble y el rey debe moverse.</li><li><b>Con una amenaza</b>: la pieza que se aparta ataca la dama, una torre o una pieza suelta. El rival no puede atender a la vez la amenaza y la línea abierta.</li><li><b>Con sacrificio</b>: cuando no hay tempo, la pieza se entrega. Si el rival la captura, la línea queda libre; si no la captura, la pieza sacrificada suele hacer daño por sí misma.</li></ul><p>Un caso muy útil es el <b>avance de peón</b>: un peón en e5 o d5 que tapa la diagonal de un alfil puede avanzar con amenaza (<span class=\"mv\">e6</span>, <span class=\"mv\">d6</span>) y abrir de golpe la diagonal hacia el enroque.</p><h4>Cómo reconocer la oportunidad</h4><p>La señal más clara es una <b>batería mal ordenada</b>: dama detrás de alfil, torre detrás de caballo, alfil detrás de peón. Otra señal es un mate «casi posible» que falla por una sola pieza propia. Cuando la detectes, recorre todas las casillas a las que puede ir la pieza que estorba y elige la que crea la amenaza más fuerte. A menudo hay varias jugadas que despejan la línea, pero solo una lo hace con tempo.</p><h4>Errores típicos</h4><ul><li>Despejar sin tempo y dejar al rival una jugada para tapar la línea o retirar el rey.</li><li>Elegir la casilla equivocada para la pieza que se aparta: debe atacar algo o, al menos, no quedar colgada.</li><li>No calcular la defensa de interposición: después del despeje, ¿puede el rival poner una pieza en medio?</li></ul><h4>Lista de comprobación</h4><ol><li>¿Tengo una pieza de largo alcance tapada por una pieza propia?</li><li>¿Qué amenaza aparecería si la línea estuviera abierta?</li><li>¿A qué casilla puede ir la pieza que estorba dando jaque o atacando algo?</li><li>¿Qué puede interponer el rival?</li></ol>",
      "keyPoints": [
        "Despeje de línea: una pieza propia tapa la línea de otra. Despeje de casilla: ocupa el punto que otra necesita.",
        "Un peón que tapa la diagonal de tu alfil puede apartarse avanzando con amenaza.",
        "De todas las casillas a las que puede ir la pieza que estorba, elige la que ataca algo."
      ],
      "positions": [
        {
          "fen": "5r1k/5ppB/8/q5NQ/8/8/5PPP/6K1 w - - 0 1",
          "orientation": "white",
          "caption": "La dama de h5 quiere llegar a h7, pero su propio alfil ocupa esa casilla. Despeje de casilla.",
          "line": [
            "Bg8",
            "Kxg8",
            "Qh7#"
          ],
          "comments": [
            "El alfil deja libre h7 y además controla f7. Amenaza Qh7#. (Los jaques descubiertos como Bg6+ también ganan; esta jugada muestra la idea en su forma pura.)",
            "Si 1...Rxg8, 2.Qxh7#: el caballo de g5 protege h7.",
            "Mate: el caballo apoya a la dama, f8 la ocupa la torre negra y g7 y f7 tienen peones negros."
          ],
          "arrows": [
            [
              "h7",
              "g8",
              "g"
            ],
            [
              "h5",
              "h7",
              "r"
            ]
          ]
        },
        {
          "fen": "3r1rk1/ppqb1ppp/8/4P3/6Q1/1P6/PB1N1PPP/4R1K1 w - - 0 1",
          "orientation": "white",
          "caption": "El peón de e5 tapa la gran diagonal del alfil de b2. Si avanza, aparece la amenaza Qxg7#.",
          "line": [
            "e6",
            "f6",
            "exd7",
            "Qxd7",
            "Qxd7",
            "Rxd7"
          ],
          "comments": [
            "Despeje de línea con tempo: el peón ataca d7 y f7 y abre la diagonal b2-g7. Amenaza Qxg7#.",
            "La mejor defensa: tapa la diagonal en f6.",
            "El peón captura el alfil.",
            "Las negras recuperan el peón…",
            "…y tras el cambio de damas…",
            "…las blancas quedan con una pieza por un peón. Sin el despeje, el alfil de b2 no hacía nada."
          ],
          "arrows": [
            [
              "e5",
              "e6",
              "g"
            ],
            [
              "b2",
              "g7",
              "r"
            ]
          ]
        }
      ],
      "drills": [
        {
          "fen": "3r1rk1/ppqb1ppp/8/4P3/6Q1/1P6/PB1N1PPP/4R1K1 w - - 0 1",
          "caption": "Juegan blancas: tu alfil de b2 está tapado por tu propio peón. Ábrele la línea con una amenaza.",
          "line": [
            "e6",
            "f6",
            "exd7"
          ],
          "comments": [
            "El peón avanza atacando el alfil de d7 y el peón de f7, y la diagonal b2-g7 queda abierta: amenaza Qxg7#.",
            "Única defensa del mate: tapar en f6. (Si 1...Bxe6, 2.Qxg7#.)",
            "El peón captura el alfil. Las blancas ganan una pieza por un peón."
          ]
        },
        {
          "fen": "6k1/2r1q1pp/5p2/3P4/8/1B6/5PPP/3R2K1 w - - 0 1",
          "caption": "Juegan blancas: tu alfil de b3 apunta al rey negro, pero tu peón de d5 está en medio. ¿Cómo lo apartas con la mayor amenaza?",
          "line": [
            "d6+",
            "Kf8",
            "dxe7+"
          ],
          "comments": [
            "El peón avanza y descubre el jaque del alfil por la diagonal b3-g8. Además ataca la dama de e7 y la torre de c7.",
            "Las negras deben atender el jaque (1...Kh8 es lo mismo).",
            "El peón captura la dama con jaque. Las blancas quedan con material de sobra."
          ]
        },
        {
          "fen": "2rq1rk1/pp3ppp/8/3B4/8/8/PP2QPPP/3R2K1 w - - 0 1",
          "caption": "Juegan blancas: vas con material de menos. Tu alfil tapa la columna d, donde está la dama negra. Despéjala con tempo.",
          "line": [
            "Bxf7+",
            "Rxf7",
            "Rxd8+",
            "Rxd8"
          ],
          "comments": [
            "El alfil se aparta capturando con jaque, y la torre de d1 ataca de repente a la dama de d8.",
            "Las negras deben responder al jaque; capturar es lo mejor (si 1...Kh8, 2.Rxd8 y la torre de f8 no puede recapturar porque el alfil la ataca).",
            "La torre captura la dama.",
            "Las negras recuperan la torre. Las blancas han dado torre y alfil por dama y peón y la posición queda igualada."
          ]
        },
        {
          "fen": "5rk1/pp3pp1/8/q7/4N3/7R/PP3PPP/1Q4K1 w - - 0 1",
          "caption": "Juegan blancas: tu dama de b1 apunta a h7, pero tu caballo de e4 tapa la diagonal. Apártalo de la forma más fuerte.",
          "line": [
            "Nf6+",
            "gxf6",
            "Qh7#"
          ],
          "comments": [
            "El caballo se aparta dando jaque: la diagonal b1-h7 queda abierta y el rey no tiene tiempo de huir.",
            "Si 1...Kh8, 2.Qh7# igualmente: el caballo de f6 protege h7.",
            "Mate: la torre de h3 apoya a la dama y la torre de f8 tapa la salida del rey."
          ]
        }
      ]
    },
    "t2-bloqueo": {
      "html": "<h4>El mecanismo: obligar a una pieza a estorbar</h4><p>Todo rey necesita casillas de escape, y las más peligrosas para el defensor son las que ocupan sus propias piezas. El sacrificio de bloqueo convierte una casilla libre en una casilla ocupada: se entrega material de forma que la única respuesta del rival sea capturar (o interponer) <b>en la casilla que su rey necesitaba</b>. Después llega un jaque que, con esa casilla tapada, resulta ser mate. En el mate ahogado clásico el caballo da el golpe final porque es la única pieza cuyo jaque no se puede tapar. Este recurso tiene una parte psicológica: el defensor suele confiar en que sus piezas protegen al rey, y no imagina que la misma pieza que lo defiende será la que lo encierre. Por eso conviene mirar con desconfianza las casillas vecinas al rey rival ocupadas o accesibles para sus propias piezas, sobre todo torres en la octava fila y caballos que pueden interponerse. Cuantas más piezas rodean al rey, más candidato es a un mate de este tipo. El ejemplo más antiguo y conocido se atribuye a la tradición clásica y lleva el nombre de Philidor.</p><h4>Tres variantes del recurso</h4><ul><li><b>Bloqueo por captura</b>: la dama se entrega en g8 o g1 y una torre la captura, tapando la salida de su rey (patrón de Philidor).</li><li><b>Bloqueo por interposición</b>: un jaque en la última fila solo se puede tapar con una pieza que, al interponerse, ocupa la casilla de escape. Si esa pieza es un caballo, no defiende la casilla desde la que llega el siguiente jaque.</li><li><b>Bloqueo con pieza clavada</b>: cuando las demás capturas son imposibles porque las piezas están clavadas, la única recaptura legal es justamente la que bloquea.</li></ul><h4>El orden de las jugadas importa</h4><p>En el patrón de Philidor el orden es rígido: primero un jaque de caballo que lleve al rey a la esquina, luego un jaque doble (caballo y dama) que lo devuelva, después el sacrificio de dama y por último el mate. Si se altera el orden, el rey encuentra una casilla libre o una torre puede capturar al caballo. Calcula siempre la secuencia completa antes del primer jaque.</p><h4>Errores comunes</h4><ul><li>Sacrificar sin comprobar que la captura es obligada: si el rey puede escapar o hay otra recaptura, el sacrificio solo pierde material.</li><li>No ver que la pieza que captura también defiende la casilla del mate final.</li><li>Olvidar los jaques del rival: un jaque intermedio del defensor deshace todo el plan.</li></ul><h4>Cómo detectarlo</h4><ol><li>¿Cuántas casillas libres tiene el rey rival? Si tiene una, ¿qué pieza suya podría ocuparla?</li><li>¿Puedo dar un jaque o hacer una amenaza en esa casilla de modo que la única respuesta sea capturar o interponer allí?</li><li>¿Tengo preparado el jaque siguiente, sobre todo con caballo?</li></ol>",
      "keyPoints": [
        "El sacrificio obliga a una pieza rival a ocupar la casilla de escape de su propio rey.",
        "Si la interposición es con caballo, no defiende la casilla desde la que llega el jaque siguiente.",
        "En el patrón de Philidor el orden de los jaques es rígido: calcula la secuencia completa antes de empezar."
      ],
      "positions": [
        {
          "fen": "7k/pp2n1pp/8/6N1/8/1r6/PP1Q1PPP/6K1 w - - 0 1",
          "orientation": "white",
          "caption": "Bloqueo por interposición: el único modo de tapar un jaque en la octava fila es con el caballo… que bloquea a su rey.",
          "line": [
            "Qd8+",
            "Ng8",
            "Nf7#"
          ],
          "comments": [
            "La dama da jaque por la octava fila. El rey no tiene casillas: g7 y h7 tienen peones.",
            "Forzado: solo el caballo puede interponerse, y lo hace en g8, la última casilla libre junto al rey.",
            "Mate ahogado: nadie puede capturar al caballo de f7 (el de g8 no lo ataca) y el rey está rodeado de sus propias piezas."
          ],
          "highlights": [
            "g8"
          ]
        },
        {
          "fen": "r4r1k/pp4pp/1q6/6N1/2Q5/8/PP3PPP/6K1 w - - 0 1",
          "orientation": "white",
          "caption": "Las condiciones importan: con la torre en f8 el patrón de Philidor no funciona, porque la torre puede capturar en f7.",
          "line": [
            "Nf7+",
            "Rxf7",
            "Qxf7"
          ],
          "comments": [
            "Parece el comienzo del mate ahogado…",
            "…pero la torre de f8 captura el caballo.",
            "La dama recupera la torre, pero el ataque ha desaparecido y las negras conservan su ventaja material. Antes de un sacrificio de bloqueo, comprueba que cada captura sea realmente obligada."
          ],
          "highlights": [
            "f7",
            "f8"
          ]
        }
      ],
      "drills": [
        {
          "fen": "r3r2k/pp4pp/1q6/6N1/2Q5/8/PP3PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: el rey negro está en la esquina y las torres no defienden f7. Encuentra el mate.",
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
            "Jaque de caballo; f7 está protegido por la dama de c4.",
            "Única casilla.",
            "Jaque doble: el caballo y la dama (por la diagonal c4-g8) atacan al rey.",
            "Contra un jaque doble solo vale mover el rey. Si 2...Kf8, 3.Qf7# (el caballo de h6 protege f7). Por eso el rey vuelve a la esquina.",
            "¡Sacrificio de bloqueo! El rey no puede capturar porque el caballo de h6 protege g8.",
            "Forzado: una torre captura y ocupa g8.",
            "Mate de Philidor (mate ahogado): el rey está encerrado por sus propias piezas."
          ]
        },
        {
          "fen": "k7/pp1n2pp/7q/1N6/5r2/8/PP2QPPP/5RK1 w - - 0 1",
          "caption": "Juegan blancas: el rey negro de a8 no tiene casillas libres salvo b8. Obliga a una pieza negra a taparla.",
          "line": [
            "Qe8+",
            "Nb8",
            "Nc7#"
          ],
          "comments": [
            "Jaque por la octava fila. La única defensa es interponer.",
            "El caballo se interpone en b8 y bloquea la última salida de su rey.",
            "Mate ahogado: el caballo de c7 ataca a8 y nadie puede capturarlo; b7 y a7 son peones negros y b8 está ocupada."
          ]
        },
        {
          "fen": "6k1/5ppp/1b6/8/3q2n1/8/6PP/5R1K b - - 0 1",
          "caption": "Juegan negras: la torre blanca defiende f2. Haz que esa torre bloquee a su propio rey.",
          "line": [
            "Qg1+",
            "Rxg1",
            "Nf2#"
          ],
          "comments": [
            "¡Sacrificio de dama en g1! El rey no puede capturar porque el alfil de b6 protege g1 por la diagonal.",
            "Forzado: la torre captura y ocupa g1, la única casilla de escape del rey.",
            "Mate ahogado: f2 ya no está defendida por la torre y el rey de h1 está rodeado por su torre y sus peones."
          ]
        }
      ]
    },
    "t2-red-mate": {
      "html": "<h4>Pensar en casillas, no en jaques</h4><p>Para tejer una red de mate hay que cambiar la pregunta habitual. En lugar de «¿qué jaques tengo?», se pregunta: <b>«¿qué casillas tiene el rey rival y cuáles controlo ya?»</b>. Dibuja mentalmente el cuadrado de 3×3 alrededor del rey y marca cada casilla como ocupada por una pieza suya, controlada por una pieza tuya o libre. Si solo queda una o dos libres, busca una jugada tranquila que las cubra y que, a la vez, prepare el jaque final. Esa jugada tranquila suele ser más fuerte que cualquier jaque, porque no da al rey ninguna casilla nueva. Esta forma de pensar es típica de los problemistas y de los jugadores que han estudiado finales: el mate no se busca, se construye. Es útil comparar la red con un cerco militar: primero se cortan las vías de escape y solo al final se da el asalto, cuando el enemigo ya no puede retirarse.</p><h4>Parejas de piezas que tejen redes</h4><ul><li><b>Dama y alfil</b>: el alfil en e5 o f6 controla g7 y h8; la dama solo tiene que llegar a g7, h6 o f6.</li><li><b>Torre y caballo</b> (mate árabe): el caballo en f6 protege h7 y cubre g8; la torre en la séptima da mate en h7.</li><li><b>Dama y caballo</b>: el caballo en g5 o f6 apoya la llegada de la dama a h7 o g7.</li><li><b>Rey y torre</b> en el final: el rey propio quita las casillas de escape y la torre da el jaque final en la fila del borde.</li></ul><h4>La jugada tranquila y el contrajuego</h4><p>Una jugada tranquila regala un tiempo al rival. Antes de hacerla hay que verificar tres cosas: que el rival no tenga <b>jaques</b> que cambien la situación (o que tu rey pueda esquivarlos), que no pueda <b>defender la casilla del mate</b> con una pieza o un peón, y que no tenga un <b>ataque más rápido</b>. Muchas veces el rival dará una serie de jaques de consuelo; si tu rey tiene refugio, la red sigue cerrada. Si no lo tiene, quizá convenga primero dar luft al propio rey.</p><h4>Errores comunes</h4><ul><li>Dar jaques sin plan: cada jaque inútil suele abrir una casilla nueva al rey rival.</li><li>Hacer la jugada tranquila sin revisar los jaques del rival y caer en un perpetuo o en un mate en la primera fila.</li><li>Olvidar al propio rey en los finales: muchas redes solo se cierran cuando el rey se acerca.</li></ul><h4>Lista de comprobación</h4><ol><li>Cuenta las casillas libres del rey rival.</li><li>Busca la jugada que cubre la última sin dar jaque.</li><li>Revisa los jaques, capturas y defensas del rival tras esa jugada.</li><li>Si todo falla para él, la red está cerrada: no hay prisa por dar jaque.</li></ol>",
      "keyPoints": [
        "Marca las casillas del rey rival: ocupadas por sus piezas, controladas por las tuyas o libres.",
        "La jugada tranquila que cubre la última casilla suele ser más fuerte que cualquier jaque.",
        "Antes de la jugada tranquila, comprueba los jaques de consuelo del rival y si tu rey puede esquivarlos."
      ],
      "positions": [
        {
          "fen": "4k3/7P/8/8/3pp3/1K6/R7/8 w - - 0 1",
          "orientation": "white",
          "caption": "Coronar ya con jaque deja escapar al rey. Primero hay que cerrarle la séptima fila.",
          "line": [
            "Ra7",
            "d3",
            "h8=Q#"
          ],
          "comments": [
            "Jugada tranquila: la torre corta la séptima fila. Ahora el rey negro solo tiene casillas en la octava, que la nueva dama controlará. (1.h8=Q+? Kd7 y el rey se escapa.)",
            "Las negras no tienen defensa: cualquier jugada permite el mate.",
            "Mate: la dama domina la octava fila y la torre la séptima."
          ],
          "arrows": [
            [
              "a2",
              "a7",
              "g"
            ],
            [
              "h7",
              "h8",
              "r"
            ]
          ]
        },
        {
          "fen": "r4rk1/5p1p/6p1/4B3/7Q/8/q4PPP/4R1K1 w - - 0 1",
          "orientation": "white",
          "caption": "La jugada tranquila Qf6 amenaza Qg7#. Las negras solo tienen jaques de consuelo y entregas de material.",
          "line": [
            "Qf6",
            "Qxf2+",
            "Kxf2",
            "Ra2+",
            "Kg1",
            "Rxg2+",
            "Kxg2",
            "Rc8",
            "Qg7#"
          ],
          "comments": [
            "La red: la dama junto al rey, protegida por el alfil que controla g7. Antes de jugarla, las blancas comprobaron que su rey sobrevive a los jaques.",
            "Primer recurso desesperado: la dama se entrega con jaque.",
            "Se captura.",
            "Otro jaque.",
            "El rey vuelve a g1; en h1 o g3 tampoco había peligro.",
            "La torre se entrega también.",
            "Se captura.",
            "Ya no quedan jaques.",
            "Mate. La red estaba cerrada desde la primera jugada."
          ]
        }
      ],
      "drills": [
        {
          "fen": "r4rk1/p4p1p/6p1/4B3/7Q/8/5PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: el alfil de e5 ya controla g7. No hace falta dar jaque: busca la jugada tranquila decisiva.",
          "line": [
            "Qf6",
            "h6",
            "Qg7#"
          ],
          "comments": [
            "La dama se instala junto al rey y amenaza Qg7#, protegida por el alfil. Las negras no pueden tapar ni defender g7.",
            "Nada sirve: si 1...h5, 2.Qg7# igualmente.",
            "Mate: f8 la ocupa la torre negra y la dama domina h8, h7 y f8."
          ]
        },
        {
          "fen": "7k/5R2/6p1/3N4/8/6P1/1r5P/6K1 w - - 0 1",
          "caption": "Juegan blancas: la torre ya está en la séptima. Una jugada tranquila de caballo amenaza un mate imparable (mate árabe).",
          "line": [
            "Nf6",
            "Rb1+",
            "Kg2",
            "Rb2+",
            "Kh3",
            "Rxh2+",
            "Kxh2",
            "g5",
            "Rh7#"
          ],
          "comments": [
            "El caballo protege h7 y cubre g8. Amenaza Rh7#.",
            "Las negras solo pueden dar jaques.",
            "El rey se acerca a sus peones para refugiarse.",
            "Otro jaque.",
            "El rey avanza: en h3 ya no hay jaques útiles.",
            "Último recurso: la torre se entrega.",
            "Se captura.",
            "Nada impide el mate.",
            "Mate árabe: la torre en h7 protegida por el caballo, que además cubre g8."
          ]
        },
        {
          "fen": "8/8/3p3k/8/2Q3K1/p7/8/8 w - - 0 1",
          "caption": "Juegan blancas: el peón negro de a3 corre a coronar. No lo persigas: teje la red alrededor del rey.",
          "line": [
            "Qf7",
            "a2",
            "Kf5",
            "a1=Q",
            "Qg6#"
          ],
          "comments": [
            "Jugada tranquila: la dama quita al rey g6, g7 y h7, y el rey blanco ya cubre g5 y h5. El rey negro no tiene ninguna casilla: solo puede mover peones.",
            "Las negras corren con el peón.",
            "El rey blanco se acerca y cubre g5 y g6: la red está casi cerrada.",
            "Las negras coronan, pero es tarde.",
            "Mate: la dama protegida por el rey controla h5, h7 y g7."
          ]
        }
      ]
    },
    "t2-septima": {
      "html": "<h4>La casilla de coronación como centro del cálculo</h4><p>Cuando un peón llega a la séptima, la partida gira alrededor de una sola casilla. El defensor necesita al menos una pieza que la controle o que bloquee el peón, y esa pieza queda <b>atada</b>: no puede alejarse, no puede capturar en otra parte y suele ser el blanco de desviaciones, interferencias y ataques dobles. Por eso, con un peón en séptima, el primer paso es identificar al guardián y preguntarse cómo apartarlo, cambiarlo o cortarlo. El valor práctico de un peón en séptima es enorme incluso en el medio juego: obliga a mantener una pieza pegada a la casilla de coronación, y una pieza pegada es una pieza que no defiende al rey ni participa en el juego. Muchas partidas se ganan no coronando, sino aprovechando que el rival tiene una pieza atada al peón.</p><h4>Recursos tácticos típicos</h4><ul><li><b>Desviación</b>: se ofrece una pieza en una casilla que el guardián debe atender.</li><li><b>Enfilada</b>: con el peón en séptima y la torre delante (en la octava), la torre se aparta lateralmente; si la torre rival captura el peón, un jaque en la séptima la gana por enfilada.</li><li><b>Subcoronación a caballo</b>: cuando la coronación da jaque y crea una horquilla.</li><li><b>Subcoronación a torre</b>: cuando la dama dejaría al rey rival sin jugadas.</li><li><b>Ruptura</b>: varios peones contra varios, con el rey rival lejos.</li></ul><h4>El final de torre con peón en séptima</h4><p>Un caso que todo jugador debe conocer: torre en a8, peón en a7 y la torre rival detrás del peón. Si el rey defensor está en g7 o h7, las casillas que controla impiden el truco y la posición suele ser tablas. Pero si el rey está en otra casilla, la jugada lateral <span class=\"mv\">Rh8</span> amenaza coronar y, si la torre rival captura en a7, el jaque <span class=\"mv\">Rh7+</span> la gana. Es el ejemplo perfecto de cómo el peón en séptima crea dos amenazas a la vez. La defensa ideal contra un peón en séptima es una torre situada detrás de él, en su misma columna: desde allí vigila el peón sin quedar expuesta y puede dar jaques laterales cuando el rey rival se acerca. Si el defensor la tiene, los trucos tácticos son mucho más escasos.</p><h4>Errores comunes</h4><ul><li>Coronar dama por reflejo sin mirar si el rival queda ahogado.</li><li>Empujar el peón a séptima sin apoyo, de modo que el rey rival lo captura.</li><li>No ver la defensa por detrás: una torre en la columna del peón, por detrás, es el mejor defensor y el más molesto.</li><li>En la ruptura, olvidar contar si el rey rival llega al cuadrado del peón.</li></ul><h4>Antes de coronar, tres preguntas</h4><ol><li>¿Qué pieza rival controla la casilla de coronación y cómo la desvío?</li><li>¿Corona con jaque alguna pieza? ¿Hay horquilla de caballo?</li><li>Después de coronar, ¿tiene el rival al menos una jugada legal?</li></ol>",
      "keyPoints": [
        "Con un peón en séptima, identifica al guardián de la casilla de coronación y busca cómo desviarlo o cortarlo.",
        "Torre delante del peón en la octava: la jugada lateral amenaza coronar y prepara una enfilada.",
        "Antes de coronar, revisa si otra pieza da jaque con ganancia o si la dama ahogaría al rival."
      ],
      "positions": [
        {
          "fen": "8/k1P5/2K5/8/8/8/8/8 w - - 0 1",
          "orientation": "white",
          "caption": "Coronar dama sería tablas: el rey negro quedaría sin jugadas. La torre hace el mismo trabajo sin ahogar.",
          "line": [
            "c8=R",
            "Ka6",
            "Ra8#"
          ],
          "comments": [
            "Subcoronación. Con 1.c8=Q?? el rey de a7 no tendría casillas (a6, a8, b6, b7 y b8 controladas) y sería ahogado.",
            "Única jugada: el rey sale a a6.",
            "Mate: la torre da jaque por la columna a y el rey blanco cubre b5, b6 y b7."
          ]
        },
        {
          "fen": "8/r7/5PP1/8/k7/8/8/K7 w - - 0 1",
          "orientation": "white",
          "caption": "Dos peones unidos en sexta contra una torre: con los reyes lejos, los peones ganan.",
          "line": [
            "g7",
            "Kb3",
            "Kb1",
            "Ra8",
            "f7"
          ],
          "comments": [
            "Un peón amenaza coronar y obliga a la torre a reaccionar. (1.f7 también gana.)",
            "El rey negro busca dar mate o jaques, pero está lejos de los peones.",
            "El rey blanco se esconde de los jaques.",
            "La torre vigila la octava fila…",
            "…pero no puede detener a dos peones en séptima: uno de los dos coronará."
          ]
        }
      ],
      "drills": [
        {
          "fen": "8/3q1P1k/6p1/8/8/8/6PK/8 w - - 0 1",
          "caption": "Juegan blancas: si coronas dama, la dama negra da jaques sin fin a tu rey desprotegido. Encuentra la coronación que gana.",
          "line": [
            "f8=N+",
            "Kh6",
            "Nxd7"
          ],
          "comments": [
            "Subcoronación a caballo con jaque: el caballo ataca h7 y d7 a la vez. (1.f8=Q? Qd6+ y las negras se salvan con jaques.)",
            "El rey debe salir del jaque.",
            "El caballo captura la dama: final ganado de peón de más."
          ]
        },
        {
          "fen": "R7/P4k2/8/8/8/r7/6K1/8 w - - 0 1",
          "caption": "Juegan blancas: torre delante del peón y la torre negra detrás. El rey negro está en f7, no en g7 ni h7. Aprovéchalo.",
          "line": [
            "Rh8",
            "Rxa7",
            "Rh7+",
            "Ke6",
            "Rxa7"
          ],
          "comments": [
            "La torre se aparta y amenaza a8=Q. Si la torre negra no captura, el peón corona.",
            "Si captura, queda en la séptima fila…",
            "…y el jaque la gana por enfilada.",
            "El rey debe moverse.",
            "Final de torre contra rey: ganado. Con el rey negro en g7 o h7 el truco no existiría."
          ]
        },
        {
          "fen": "8/3P3K/k7/4p3/8/1p3R2/8/8 w - - 0 1",
          "caption": "Juegan blancas: coronar ya gana, pero el peón negro de b3 da contrajuego. Calcula la forma más rápida y limpia.",
          "line": [
            "Rxb3",
            "Ka5",
            "d8=Q+",
            "Ka4",
            "Qd3",
            "e4",
            "Qb5#"
          ],
          "comments": [
            "Primero se elimina el peón pasado rival; el peón de d7 no se escapa.",
            "El rey negro no puede hacer nada contra la coronación.",
            "Ahora sí: la dama corona con jaque.",
            "Única casilla.",
            "Jugada tranquila: la dama corta al rey y amenaza Qb5# y Qa3#.",
            "El peón no cambia nada.",
            "Mate: la torre de b3 controla a3 y la columna b."
          ]
        },
        {
          "fen": "8/1P6/8/8/8/8/5K2/7k w - - 0 1",
          "caption": "Juegan blancas: el rey negro no tiene casillas salvo h2. Corona sin regalar las tablas.",
          "line": [
            "b8=R",
            "Kh2",
            "Rh8#"
          ],
          "comments": [
            "La torre no controla la diagonal b8-h2 y deja respirar al rey. 1.b8=Q?? (o 1.b8=B??) sería ahogado: la dama cubriría h2.",
            "Única jugada.",
            "Mate: la torre da jaque por la columna h y el rey de f2 cubre g1, g2 y g3."
          ]
        }
      ]
    },
    "t2-perpetuo": {
      "html": "<h4>Los ingredientes de un perpetuo</h4><p>Un jaque perpetuo necesita tres cosas: un rey rival <b>expuesto</b> (pocos peones o casillas cubiertas por sus propias piezas), una pieza que dé jaque desde <b>dos casillas</b> que se alternan, y que en cada ciclo el rey no tenga ni escape ni interposición posible. La dama es la pieza ideal, pero también existen perpetuos de torre y alfil (el «molino»), de caballo y dama, y de torre sola contra un rey encerrado por sus peones. Lo que importa no es la pieza, sino la geometría: el rey debe quedar atrapado en un circuito de dos o tres casillas. También hay que tener en cuenta la regla de la triple repetición: no hace falta que los jaques sean infinitos, basta con que la misma posición se repita tres veces con el mismo bando al turno. En la práctica, cuando el rival ve que no puede escapar, suele aceptar las tablas antes.</p><h4>Abrir el refugio para conseguirlo</h4><p>A veces el perpetuo no existe todavía y hay que crearlo con un sacrificio: entregar una torre o un alfil en g7 o h7 para arrancar los peones del enroque. Es un recurso típico cuando se va perdiendo material: tras <span class=\"mv\">Rxg7+</span> el rey rival queda desnudo y la dama encuentra dos casillas de jaque. Antes de sacrificar, comprueba que el rey no pueda escapar hacia el centro ni esconderse detrás de una pieza que se interponga con jaque. Recuerda además que el perpetuo no exige que el rey rival esté completamente desnudo: basta con que sus casillas de escape estén ocupadas por sus propias piezas.</p><h4>El molino de torre y alfil</h4><p>Con un alfil en la gran diagonal y una torre en la séptima, la torre puede alternar entre g7 y f7 (o h7) dando jaques descubiertos. Si la torre rival tapa la casilla f8, el rey solo puede oscilar entre g8 y h8. Según lo que haya en la séptima, el molino gana material o, como mínimo, asegura las tablas.</p><h4>Errores típicos</h4><ul><li>Dar el primer jaque sin haber comprobado el segundo: el rey se escapa y el defensor se queda sin nada.</li><li>Olvidar las interposiciones: una torre o un alfil que puede tapar con jaque rompe el ciclo.</li><li>Jugar por ganar cuando la posición solo da para tablas: si el rival amenaza mate, el perpetuo es el resultado correcto.</li><li>Desde el lado ganador: comer material sin dejar al rey una casilla de refugio (luft) o una pieza cerca para interponer.</li></ul><h4>Lista de comprobación</h4><ol><li>¿Mi posición está perdida si no hago nada? Entonces busca el perpetuo.</li><li>Dibuja el circuito del rey: casilla A, casilla B y las respuestas posibles en cada una.</li><li>Comprueba interposiciones, capturas de la pieza que da jaque y casillas de escape.</li><li>Si hace falta, sacrifica primero para abrir el rey, pero calcula el ciclo completo antes.</li></ol>",
      "keyPoints": [
        "Un perpetuo necesita un rey expuesto y dos casillas de jaque que se alternen sin escape ni interposición.",
        "Si el refugio del rey está intacto, a veces hay que sacrificar una pieza para crear el perpetuo.",
        "El molino de torre y alfil puede ganar material o, como mínimo, forzar las tablas."
      ],
      "positions": [
        {
          "fen": "5rk1/5p2/6p1/8/6Q1/3B4/q4PPP/6K1 w - - 0 1",
          "orientation": "white",
          "caption": "Las blancas tienen una pieza menos de lo que parece: la dama negra amenaza entrar. Un sacrificio abre el rey negro para el perpetuo.",
          "line": [
            "Bxg6",
            "fxg6",
            "Qxg6+",
            "Kh8",
            "Qh6+",
            "Kg8",
            "Qg6+"
          ],
          "comments": [
            "El alfil se entrega para destruir el refugio de peones.",
            "Aceptar es lo más seguro para las negras.",
            "La dama entra con jaque.",
            "Única casilla: f8 la ocupa la torre y g7 la controla la dama.",
            "Jaque por la columna h.",
            "Vuelve a g8.",
            "Y la posición se repite: tablas. Las blancas no tienen más, pero las negras tampoco pueden evitar los jaques."
          ]
        },
        {
          "fen": "6k1/R4ppp/1q6/8/3Q4/8/5PPP/6K1 w - - 0 1",
          "orientation": "white",
          "caption": "La otra cara del perpetuo: cuando vas ganando, dale una salida a tu rey antes de que la dama rival empiece a dar jaques.",
          "line": [
            "h3",
            "Qb1+",
            "Kh2"
          ],
          "comments": [
            "Luft. Antes de buscar más material, las blancas quitan al rival cualquier esperanza de jaques en la primera fila.",
            "El jaque ya no molesta…",
            "…porque el rey encuentra refugio en h2 y no hay más jaques útiles. Las blancas conservan su ventaja."
          ]
        }
      ],
      "drills": [
        {
          "fen": "1q3rk1/p4ppp/8/3Q4/8/6R1/r4PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: las negras tienen mucho más material y amenazan Ra1+. Fuerza las tablas.",
          "line": [
            "Rxg7+",
            "Kh8",
            "Rxh7+",
            "Kg8",
            "Qg5+"
          ],
          "comments": [
            "La torre se sacrifica para abrir el rey. Si 1...Kxg7, 2.Qg5+ Kh8 3.Qf6+ Kg8 4.Qg5+ y perpetuo.",
            "El rey evita la captura, pero la torre sigue haciendo daño.",
            "Segundo sacrificio: ahora el rey negro queda sin ningún peón.",
            "Si 3...Kxh7, 4.Qh5+ y la dama da jaques en h5 y g5 sin descanso.",
            "Jaque. El rey negro no tiene refugio: tras 4...Kxh7, Qh5+ y Qg5+ (o Qf5+) aseguran el perpetuo."
          ]
        },
        {
          "fen": "5r1k/6Rp/5B2/8/8/1q6/3r1PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: las negras amenazan mate en la primera fila. Tu torre y tu alfil pueden formar un molino.",
          "line": [
            "Rf7+",
            "Kg8",
            "Rg7+",
            "Kh8",
            "Rf7+"
          ],
          "comments": [
            "La torre se aparta y descubre el jaque del alfil por la diagonal f6-h8. Además ataca la torre de f8, que no puede capturar porque el rey está en jaque.",
            "Única casilla.",
            "Jaque de torre; la torre está protegida por el alfil.",
            "Única casilla: f8 la ocupa su propia torre.",
            "Y se repite. Tablas por jaque perpetuo."
          ]
        },
        {
          "fen": "1Q5q/5pkp/5p1p/8/7r/8/5PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: las negras amenazan Rxh2 con mate. Salva la partida.",
          "line": [
            "Qg3+",
            "Kf8",
            "Qb8+",
            "Kg7",
            "Qg3+"
          ],
          "comments": [
            "Jaque por la columna g. El rey no puede ir a h8 (la ocupa su dama) ni a h7 o h6 (sus peones): debe ir hacia el centro.",
            "El rey intenta escapar hacia el centro.",
            "La dama lo persigue por la octava fila. Si 2...Ke7, 3.Qc7+ y los jaques siguen.",
            "Vuelve.",
            "Repetición: tablas."
          ]
        },
        {
          "fen": "6k1/4p2q/6pp/8/8/6Q1/r4PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: las negras van con una torre de más. Encuentra el perpetuo.",
          "line": [
            "Qb8+",
            "Kg7",
            "Qe5+",
            "Kf8",
            "Qb8+"
          ],
          "comments": [
            "Jaque en la octava fila.",
            "Si 1...Kf7, 2.Qf4+ y los jaques continúan.",
            "Jaque por la diagonal e5-h8.",
            "El rey no encuentra refugio: h7 la ocupa su dama y en el centro le esperan más jaques.",
            "Repetición: tablas."
          ]
        }
      ]
    },
    "t2-ahogado": {
      "html": "<h4>Las dos caras del ahogado</h4><p>El ahogado es un arma para el que defiende y una trampa para el que ataca. Para el defensor, el objetivo es llegar a una posición en la que su rey no tenga casillas y sus peones estén bloqueados, y después <b>deshacerse de las piezas que aún pueden moverse</b>. Para el atacante, la tarea es la contraria: en cada jugada de un final ganado debe asegurarse de que el rival conserva al menos una jugada legal, salvo que la suya sea mate. Los finales de peón de torre y los de dama contra peón en séptima son los que más ahogados producen, porque el rey defensor se encuentra a menudo en la esquina, con pocas casillas. En cualquier final en el que el rey de uno de los bandos esté en el borde, la palabra «ahogado» debería estar presente en el cálculo.</p><h4>Recursos del defensor</h4><ul><li><b>La dama kamikaze</b>: se ofrece con jaque en una casilla donde capturarla sea obligatorio. A veces hace falta un jaque previo para llevar al rey rival a la casilla adecuada.</li><li><b>La torre loca</b>: si el rey rival la captura, ahogado; si no la captura, la torre sigue dando jaques o gana algo por enfilada.</li><li><b>La esquina salvadora</b>: en el final de dama contra peón de alfil o de torre en séptima, el rey defensor se refugia en la esquina y deja el peón «colgado»: si la dama lo captura, el rey queda ahogado.</li></ul><h4>Recursos del que gana</h4><p>El error clásico es quitar al rey rival su última casilla con una jugada que no da jaque. En los finales de peón contra rey, la subcoronación a torre resuelve muchos casos: la torre controla la fila y la columna, pero no las diagonales, y deja respirar al rey rival el tiempo justo para dar mate en la jugada siguiente. En los finales de dama, conviene acercar el propio rey antes de estrechar el cerco con la dama. Un detalle a menudo olvidado: los peones propios bloqueados por peones rivales no cuentan como jugadas, pero un peón que puede capturar sí. Antes de sacrificar, comprueba también eso.</p><h4>Errores comunes</h4><ul><li>Defensor: abandonar sin contar las jugadas legales de su rey; muchas posiciones «perdidas» esconden un ahogado.</li><li>Defensor: ofrecer la dama sin jaque; el rival simplemente no la captura.</li><li>Atacante: coronar dama por reflejo o jugar la jugada «natural» de dama sin mirar qué casillas le quedan al rey.</li><li>Atacante: olvidar que un peón propio bloqueado no cuenta como jugada disponible del rival.</li></ul><h4>Lista de comprobación</h4><ol><li>Si defiendes: ¿mi rey está inmovilizado? ¿Mis peones están bloqueados? ¿Qué pieza me falta eliminar y puedo hacerlo con jaque?</li><li>Si atacas: después de mi jugada, ¿qué jugadas legales tiene el rival? Si son cero y no es jaque, busca otra jugada.</li></ol>",
      "keyPoints": [
        "Defensor: inmoviliza tu rey, bloquea tus peones y entrega con jaque las piezas que aún se mueven.",
        "Un jaque previo puede llevar al rey rival a la casilla donde la captura de tu dama es obligada.",
        "Atacante: después de tu jugada, el rival debe tener al menos una jugada legal (salvo que sea mate)."
      ],
      "positions": [
        {
          "fen": "8/5P1k/5K2/8/8/8/8/8 w - - 0 1",
          "orientation": "white",
          "caption": "Otro caso de subcoronación: la dama en f8 controlaría g7 y h6 y el rey negro quedaría ahogado.",
          "line": [
            "f8=R",
            "Kh6",
            "Rh8#"
          ],
          "comments": [
            "La torre no controla las diagonales: el rey negro conserva h6. 1.f8=Q?? sería ahogado.",
            "Única jugada.",
            "Mate: el rey de f6 cubre g5, g6 y g7, y la torre da jaque por la columna h."
          ]
        },
        {
          "fen": "7k/7p/7P/8/2Q5/8/6K1/r7 b - - 0 1",
          "orientation": "black",
          "caption": "La torre loca: el rey negro no tiene jugadas y la torre se ofrece en cada jaque.",
          "line": [
            "Rg1+",
            "Kh2",
            "Rg2+",
            "Kh3",
            "Rg3+",
            "Kh4",
            "Rg4+",
            "Kxg4"
          ],
          "comments": [
            "Si 2.Kxg1, ahogado: g8 la cubre la dama y g7 el peón de h6.",
            "El rey intenta huir.",
            "La torre lo sigue.",
            "",
            "",
            "",
            "Si 5.Qxg4 también es ahogado: la dama sigue cubriendo g8.",
            "Ahogado. Tablas."
          ]
        }
      ],
      "drills": [
        {
          "fen": "7k/5p1p/5pp1/2b5/8/1Q5p/4q2P/7K w - - 0 1",
          "caption": "Juegan blancas: las negras amenazan mate. Tu rey no tiene jugadas y tu peón está bloqueado. Busca las tablas.",
          "line": [
            "Qb8+",
            "Kg7",
            "Qg8+",
            "Kh6",
            "Qxg6+",
            "hxg6"
          ],
          "comments": [
            "Primero un jaque para colocar al rey negro donde convenga.",
            "Única casilla.",
            "¡La dama se ofrece! Si 2...Kxg8, ahogado.",
            "El rey escapa…",
            "…pero la dama se entrega de nuevo con jaque. Capturarla es obligatorio.",
            "Ahogado: g1 la controla el alfil de c5, g2 el peón de h3 y la dama de e2, y el peón de h2 está bloqueado. Tablas."
          ]
        },
        {
          "fen": "8/q6k/8/8/8/6Rp/7P/7K w - - 0 1",
          "caption": "Juegan blancas: la dama negra amenaza Qg1#. Tu única pieza móvil es la torre. Úsala.",
          "line": [
            "Rg7+",
            "Qxg7"
          ],
          "comments": [
            "Jaque por la séptima. Si el rey negro se aparta de la fila, Rxa7 gana la dama por enfilada; si captura, el rey blanco queda sin jugadas.",
            "Ahogado: la dama en g7 controla g1 y g2 por la columna, y el peón de h2 está bloqueado. Si 1...Kxg7 sucede lo mismo, porque la dama de a7 sigue cubriendo g1."
          ]
        },
        {
          "fen": "8/8/8/5K2/8/1Q6/p7/1k6 b - - 0 1",
          "caption": "Juegan negras: dama contra peón de torre en séptima y el rey blanco lejos. Elige bien la casilla del rey.",
          "line": [
            "Ka1",
            "Qd3",
            "Kb2",
            "Qd4+",
            "Kb1"
          ],
          "comments": [
            "¡Al rincón! El peón queda «colgado», pero si 2.Qxa2 el rey negro no tiene jugadas: ahogado. (1...Kc1? 2.Qxa2 y las blancas ganan.)",
            "Las blancas intentan acercar el rey ganando tiempo.",
            "El rey sale del rincón para amenazar a1=Q.",
            "Jaque.",
            "El rey vuelve junto al peón. Sin la ayuda del rey blanco, que está demasiado lejos, la dama no puede ganar: tablas."
          ]
        },
        {
          "fen": "8/5P1k/5K2/8/8/8/8/8 w - - 0 1",
          "caption": "Juegan blancas: estás a un paso de coronar. Hazlo sin regalar las tablas.",
          "line": [
            "f8=R",
            "Kh6",
            "Rh8#"
          ],
          "comments": [
            "La torre deja al rey negro la casilla h6. Con 1.f8=Q?? o 1.f8=B?? el rey quedaría sin jugadas: ahogado.",
            "Única jugada.",
            "Mate: la torre en la columna h y el rey en f6."
          ]
        }
      ]
    },
    "t2-contraataque": {
      "html": "<h4>La lógica del contraataque</h4><p>Un ataque consume piezas y tiempo. Mientras el atacante amontona fuerzas cerca de nuestro rey, su propio rey suele quedarse con menos defensores, su primera fila sin luft o alguna de sus piezas sin protección. El contraataque aprovecha ese desequilibrio: en lugar de responder a la amenaza con una defensa pasiva, se responde con una amenaza <b>más fuerte</b> (jaque, mate, captura de dama) o <b>más rápida</b> (que llegue antes). La regla práctica es contar tiempos: si tú das mate en dos y el rival en uno, solo vale si tus dos jugadas son jaques. Los grandes defensores (Lasker, Petrosián, Kárpov) se distinguían precisamente por esto: no esperaban pasivamente, sino que buscaban en cada momento la amenaza propia que obligara al rival a cambiar de planes. La defensa activa casi siempre es más eficaz que la pasiva.</p><h4>Cuándo funciona y cuándo no</h4><ul><li>Funciona si tus jugadas son <b>forzadas</b>: jaques o amenazas que el rival no puede ignorar.</li><li>Funciona si la primera fila rival está débil, si su rey no tiene luft o si sus piezas atacantes están sueltas.</li><li>No funciona si tu amenaza es más lenta que la suya: una amenaza de mate en dos no sirve contra un mate en uno.</li><li>No funciona si, tras tus jaques, el rival se cubre con ganancia de tiempo.</li></ul><h4>La fortaleza: cuando defender es construir</h4><p>Una fortaleza es una posición que el bando fuerte no puede romper aunque tenga más material. Los ejemplos más útiles son: rey defensor en la esquina contra alfil y peón de torre del color «equivocado» (el alfil no controla la casilla de coronación); torre contra alfil con el rey en la esquina de color contrario al alfil; y bloqueos de peones con casillas de entrada inaccesibles. A menudo vale la pena <b>devolver material</b> (entregar la calidad o una pieza) para llegar a una de estas posiciones: se cambia una desventaja grande por una posición sin riesgo. Una forma útil de pensarlo es preguntarse «¿qué pasa si ignoro su amenaza?». Si la respuesta es que tu jugada obliga al rival a responder antes de ejecutarla, el contraataque está justificado; si no, toca defender.</p><h4>Errores comunes</h4><ul><li>Defenderse por reflejo sin mirar los jaques propios: muchas partidas se pierden con una defensa correcta pero lenta.</li><li>Lanzar un contraataque sin contar tiempos y llegar una jugada tarde.</li><li>Aferrarse al material en vez de buscar una fortaleza: a veces las tablas exigen devolver lo que se tiene de más.</li></ul><h4>Preguntas cuando te atacan</h4><ol><li>¿Cuál es exactamente la amenaza del rival y en cuántas jugadas llega?</li><li>¿Tengo jaques o amenazas de mate que lleguen antes?</li><li>¿Qué piezas del rival han quedado sueltas o mal protegidas por el ataque?</li><li>Si nada de eso funciona, ¿qué fortaleza puedo construir y qué material debo devolver para lograrla?</li></ol>",
      "keyPoints": [
        "Cuenta tiempos: tu contraataque solo vale si llega antes, es decir, si tus jugadas son jaques o amenazas mayores.",
        "Un rey atacante sin luft es el blanco natural del contraataque en la primera fila.",
        "A veces la mejor defensa es devolver material para llegar a una fortaleza."
      ],
      "positions": [
        {
          "fen": "6k1/4Q3/6p1/3q4/7r/5R2/5PPP/6K1 b - - 0 1",
          "orientation": "black",
          "caption": "Las blancas amenazan Qe8+ y Rf8#. Defenderse es inútil: las negras llegan antes.",
          "line": [
            "Qd1+",
            "Qe1",
            "Qxe1#"
          ],
          "comments": [
            "Jaque en la primera fila, la debilidad del rey blanco sin luft.",
            "Tapar con la dama es lo único (2.Rf1 Qxf1#).",
            "Mate. El contraataque funcionó porque cada jugada fue un jaque."
          ]
        },
        {
          "fen": "7k/8/6K1/7P/8/3B4/8/8 w - - 0 1",
          "orientation": "white",
          "caption": "Fortaleza: alfil del color «equivocado» (no controla h8) y peón de torre. Con el rey negro en la esquina, es tablas.",
          "line": [
            "h6",
            "Kg8",
            "h7+",
            "Kh8",
            "Kh6"
          ],
          "comments": [
            "Las blancas intentan avanzar.",
            "El rey negro se mantiene junto a la esquina.",
            "El peón da jaque…",
            "…y el rey vuelve a h8, donde el alfil de casillas claras nunca podrá echarlo.",
            "Ahogado. Si las blancas no avanzan, tampoco progresan: el bando débil ha construido una fortaleza."
          ]
        }
      ],
      "drills": [
        {
          "fen": "4r1k1/5p1p/4qBpQ/8/8/8/5PPP/3R2K1 b - - 0 1",
          "caption": "Juegan negras: las blancas amenazan Qg7#. No te defiendas: el rey blanco no tiene luft.",
          "line": [
            "Qe1+",
            "Rxe1",
            "Rxe1#"
          ],
          "comments": [
            "¡La dama se entrega con jaque! (Defender con 1...Qxf6 solo iguala.)",
            "Forzado: la torre debe capturar.",
            "Mate en la primera fila: la torre de e8 llega a e1 y los peones blancos encierran a su rey."
          ]
        },
        {
          "fen": "6k1/q4ppp/6p1/8/8/5r2/5PPP/2NQ2K1 b - - 0 1",
          "caption": "Juegan negras: las blancas amenazan Qd8#. ¿Tienes algo más rápido?",
          "line": [
            "Qxf2+",
            "Kh1",
            "Qf1+",
            "Qxf1",
            "Rxf1#"
          ],
          "comments": [
            "Captura con jaque: la torre de f3 la protege, así que el rey no puede recapturar.",
            "Única casilla.",
            "¡Otro sacrificio! La dama se entrega en f1 para que la torre llegue con mate.",
            "Forzado.",
            "Mate: el rey blanco está encerrado por sus peones de g2 y h2."
          ]
        },
        {
          "fen": "6k1/5ppp/6pq/5R2/8/6r1/4QPPP/6K1 b - - 0 1",
          "caption": "Juegan negras: la torre de f5 amenaza Rxf7 y tu torre de g3 está atacada. Busca un contraataque con jaque.",
          "line": [
            "Qc1+",
            "Qf1",
            "Rxg2+",
            "Kxg2",
            "Qxf1+",
            "Kxf1",
            "gxf5"
          ],
          "comments": [
            "Jaque en la primera fila: obliga a la dama a interponerse.",
            "Única defensa.",
            "La torre se entrega para atraer al rey y desclavar…",
            "Forzado.",
            "…y la dama captura la dama blanca con jaque.",
            "El rey recaptura.",
            "Y el peón gana la torre. Final de peones ganado para las negras."
          ]
        },
        {
          "fen": "7k/8/6K1/3BN2P/8/8/4r3/8 b - - 0 1",
          "caption": "Juegan negras: las blancas amenazan Nf7#. Encuentra la única defensa que salva la partida.",
          "line": [
            "Rxe5"
          ],
          "comments": [
            "La torre elimina al caballo, la pieza que tejía la red. Queda torre contra alfil y peón de h, con el rey negro en el rincón y un alfil que no controla h8: las negras no corren peligro. Defender f7 con 1...Re7 o 1...Rf2 deja a las blancas con caballo, alfil y peón contra torre y muchas posibilidades de ganar."
          ]
        }
      ]
    },
    "t2-calculo": {
      "html": "<h4>Profundidad frente a amplitud</h4><p>Calcular bien no es ver muchas jugadas en una línea, sino ver las <b>correctas</b> en las ramas que importan. En posiciones forzadas (jaques, capturas, amenazas de mate) el árbol es estrecho y conviene ir en profundidad: cinco o seis jugadas por una rama con respuestas únicas son más fáciles de lo que parecen. En posiciones abiertas, con muchas respuestas, conviene más amplitud y menos profundidad: dos jugadas por cada candidata y una evaluación sensata. Los entrenadores rusos (Kótov, Dvoretsky) insistían en que la disciplina consiste en decidir de antemano qué tipo de árbol tenemos delante. Un error frecuente es pensar que calcular más rápido significa calcular peor: en realidad, la mayor parte del tiempo perdido se debe a volver una y otra vez sobre las mismas ramas sin método. Saber qué tipo de árbol tenemos delante ahorra más tiempo que cualquier truco.</p><h4>Las jugadas que más se escapan</h4><ul><li><b>Las jugadas tranquilas</b> en mitad de una combinación (como un alfil que vuelve a casa o una torre que se coloca en la tercera fila): no son jaques ni capturas y por eso el ojo las salta.</li><li><b>Las jugadas intermedias del rival</b>: un jaque o una captura que el rival inserta antes de recapturar.</li><li><b>Los movimientos hacia atrás</b>, para ambos bandos: retirar una pieza a la primera fila suele ser la mejor defensa y casi nunca la imaginamos.</li><li><b>Las defensas con contraataque</b>: el rival no tiene por qué defenderse; puede atacar.</li></ul><h4>Calcular también en los finales</h4><p>En los finales con pocas piezas el cálculo es más limpio, pero exige precisión geométrica. El estudio de Réti (1921) es el ejemplo clásico: un rey que parece demasiado lejos persigue dos objetivos a la vez avanzando en diagonal, porque en el tablero el camino diagonal mide lo mismo que el recto. Contar jugadas (quién llega primero, quién corona con jaque) es una forma de cálculo tan importante como ver una combinación. Conviene, además, reservar unos segundos para la evaluación final de cada rama: es el momento en que se decide la jugada.</p><h4>Errores típicos</h4><ul><li>Calcular una sola rama a gran profundidad sin haber comparado candidatas.</li><li>Volver a calcular la misma línea tres veces por inseguridad: decide y avanza.</li><li>Evaluar mal el final de la línea: llegar a «una posición con más material» que en realidad pierde por un mate o un peón imparable.</li><li>No escribir (mentalmente) la posición final: si no puedes describir dónde está cada pieza, no la has visto.</li></ul><h4>Método de trabajo</h4><ol><li>Clasifica la posición: ¿forzada (profundidad) o abierta (amplitud)?</li><li>Haz la lista de candidatas, incluidas las tranquilas.</li><li>Recorre cada rama hasta una posición estable y evalúala con criterios concretos (material, rey, actividad).</li><li>Revisa la línea elegida buscando la mejor jugada del rival en cada paso, en especial las intermedias y las retiradas.</li></ol>",
      "keyPoints": [
        "Clasifica la posición: forzada (calcula en profundidad) o abierta (calcula en amplitud).",
        "Las jugadas tranquilas, las intermedias y las retiradas son las que más se escapan.",
        "En los finales, contar tiempos es también calcular."
      ],
      "positions": [
        {
          "fen": "1r2k1r1/pbppnp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3RR1K1 w - - 0 20",
          "orientation": "white",
          "caption": "Anderssen contra Dufresne (Berlín, 1852), la «Siempreviva». Las blancas, con la dama negra en f3, ven una cadena de jaques hasta el mate.",
          "line": [
            "Rxe7+",
            "Nxe7",
            "Qxd7+",
            "Kxd7",
            "Bf5+",
            "Ke8",
            "Bd7+",
            "Kf8",
            "Bxe7#"
          ],
          "comments": [
            "Primer jaque: la torre captura en e7.",
            "El error de la partida. Con 20...Kd8 las negras resistían más, aunque las blancas seguían con ventaja.",
            "¡Sacrificio de dama! Atrae al rey a d7.",
            "Forzado.",
            "Jaque doble del alfil y la torre de d1.",
            "Si 22...Kc6, 23.Bd7#.",
            "El alfil sigue dando jaque.",
            "Única casilla.",
            "Mate: el alfil de a3 y el peón de f6 completan la red."
          ]
        },
        {
          "fen": "8/1k1pK3/8/8/5p2/8/8/4Q3 w - - 0 1",
          "orientation": "white",
          "caption": "Calcular también es contar tiempos: el peón negro corre, pero el rey blanco llega antes a tejer la red con la dama.",
          "line": [
            "Kd6",
            "f3",
            "Qb4+",
            "Ka6",
            "Kc7",
            "f2",
            "Qb6#"
          ],
          "comments": [
            "El rey se acerca al enemigo en vez de dar jaques. (Kxd7 también funciona: lo importante es la idea.)",
            "Las negras corren con su peón, demasiado lento.",
            "La dama empuja al rey hacia el borde.",
            "Única casilla: a8 y c8 quedarían también en la red.",
            "Otra jugada tranquila: el rey quita b7 y b8.",
            "El peón llega a la segunda fila, pero ya es tarde.",
            "Mate: la dama controla a5, a7 y b-file, y el rey blanco cubre b7."
          ]
        }
      ],
      "drills": [
        {
          "fen": "7K/8/k1P5/7p/8/8/8/8 w - - 0 1",
          "caption": "Juegan blancas (estudio de Réti, 1921): tu rey parece demasiado lejos de todo. Salva la partida.",
          "line": [
            "Kg7",
            "h4",
            "Kf6",
            "Kb6",
            "Ke5",
            "Kxc6",
            "Kf4"
          ],
          "comments": [
            "La diagonal: el rey se acerca al peón negro sin alejarse del suyo. (1.Kh7? h4 y el peón corona.)",
            "Las negras corren.",
            "El rey persigue el peón y, a la vez, se acerca a c6. Si 2...h3, 3.Ke7 h2 4.c7 y ambos coronan.",
            "Las negras eliminan primero el peón blanco…",
            "…y el rey blanco sigue con su doble objetivo: ahora entra en el cuadrado del peón de h.",
            "El peón de c cae, pero…",
            "…el rey alcanza el peón de h. Tablas."
          ]
        },
        {
          "fen": "r4rk1/ppq2p1p/6p1/8/7Q/1P2R3/PB3PPP/6K1 w - - 0 1",
          "caption": "Juegan blancas: hay mate en tres. Calcula hasta el final antes del primer sacrificio.",
          "line": [
            "Qxh7+",
            "Kxh7",
            "Rh3+",
            "Kg8",
            "Rh8#"
          ],
          "comments": [
            "¡Sacrificio de dama! Abre la columna h.",
            "Forzado.",
            "La torre entra con jaque. h6 la controla la torre y g7 el alfil de b2.",
            "Única casilla.",
            "Mate: el alfil protege h8 a través de la gran diagonal y la torre de f8 tapa la huida."
          ]
        },
        {
          "fen": "r4rk1/1b2bppp/ppq1p3/2ppB2n/5P2/1P1BP3/P1PPQ1PP/R4RK1 w - - 0 15",
          "caption": "Juegan blancas: el caballo de h5 cuelga, pero hay algo mucho más fuerte. Calcula el doble sacrificio.",
          "line": [
            "Bxh7+",
            "Kxh7",
            "Qxh5+",
            "Kg8",
            "Bxg7",
            "Kxg7",
            "Qg4+",
            "Kh7",
            "Rf3"
          ],
          "comments": [
            "El primer alfil se entrega para abrir el enroque.",
            "Forzado.",
            "La dama recupera la pieza con jaque.",
            "Única casilla.",
            "El segundo alfil: sin el peón de g7, el rey queda desnudo. Amenaza Qh8#.",
            "Si 17...f6, 18.Rf3 con ataque decisivo.",
            "Jaque para expulsar al rey hacia h7.",
            "Si 18...Kf6, 19.Qg5#.",
            "La torre amenaza Rh3+ y mate. Las negras tendrán que dar la dama para evitarlo."
          ]
        },
        {
          "fen": "8/k5P1/2R5/2p5/8/6p1/2K5/8 w - - 0 1",
          "caption": "Juegan blancas: ambos bandos van a coronar. Calcula qué pasa después de la coronación negra.",
          "line": [
            "g8=Q",
            "g2",
            "Qc8",
            "g1=R",
            "Ra6#"
          ],
          "comments": [
            "Las blancas coronan primero.",
            "El peón negro también corre.",
            "Jugada tranquila: la dama domina la octava fila y amenaza Qb7# y Ra6#. (2.Qxg2? deja escapar al rey.)",
            "Si 3...g1=Q, 4.Qb7# o Ra6#. Nada salva a las negras.",
            "Mate: la torre en a6 y la dama en c8 encierran al rey."
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
