/* Teoría ampliada y ejercicios nuevos: finales2. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
 "f2-rey-peon-rey": {
  "html": "<h4>Las casillas clave cuando el peón avanza</h4><p>La teoría anterior dio la regla para un peón que todavía no pasó de la cuarta fila: sus casillas clave son las tres que están dos filas por delante. Hay que completarla. Cuando el peón llega a la <b>quinta</b> fila, son clave las tres casillas de la fila siguiente y también las tres de la que viene después: con un peón en e5, las casillas d6, e6, f6, d7, e7 y f7. Con el peón en <b>sexta</b>, basta con que el rey atacante pise una casilla de la séptima delante o al lado del peón (d7, e7 o f7 para un peón en e6). La conclusión práctica es clara: cuanto más avanzado está el peón, más casillas ganadoras hay, siempre que el rey lo acompañe. Y el rey no necesita estar exactamente delante: puede llegar a una casilla clave desde el costado.</p><h4>La oposición: directa, a distancia y en diagonal</h4><p>Dos reyes están en <b>oposición</b> cuando se encuentran en la misma columna o fila con un número impar de casillas entre ellos. Tiene la oposición el bando que <b>no</b> tiene que mover. Con una sola casilla de separación (reyes en d3 y d5) se habla de oposición directa; con tres o cinco casillas, de oposición a distancia; y si los reyes están en la misma diagonal con un número impar de casillas entre ellos, de oposición diagonal. Las tres son la misma idea: quien tiene la oposición responde a cada paso del rival con el paso simétrico y no le cede terreno. Por eso un rey defensor lejano puede salvarse si toma la oposición a distancia a tiempo, y por eso el atacante a veces da un rodeo, o simplemente se coloca frente al rey rival, para que sea el otro quien tenga que apartarse.</p><p>La oposición es un medio, no un fin. El objetivo del atacante es ocupar una casilla clave; el del defensor, impedirlo. Si tu rey ya está en una casilla clave, no importa quién tenga la oposición.</p><h4>Primero el rey, después el peón</h4><p>El error más frecuente del principiante es empujar el peón enseguida. El peón no retrocede y cada paso suyo acerca las casillas clave a la zona que controla el rey defensor; el rey, en cambio, avanza, retrocede y da rodeos. La técnica correcta es llevar el rey por delante del peón y moverlo solo cuando ya no hay otra forma de progresar. Un peón que todavía puede elegir entre avanzar una o dos casillas guarda además un recurso valioso: la <b>jugada de reserva</b>. Si los reyes están enfrentados y te toca mover, un paso de peón cambia el turno y le pasa el problema al rival. No gastes esos pasos antes de tiempo.</p><h4>Errores típicos del defensor</h4><ul><li>Apartarse a un costado cuando el rey atacante llega a la sexta: deja libre la casilla de delante del peón.</li><li>Retroceder en diagonal en vez de en línea recta: cuando el atacante avanza, ya no hay tiempo de tomar la oposición.</li><li>Quedarse quieto delante del peón cuando el rey atacante se acerca por el costado: hay que tomar la oposición en el momento justo, no antes.</li><li>Dar por perdida una posición con peón de torre sin contar si el rey llega a la esquina o a la columna del alfil.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Es peón de torre? Entonces cuenta si el rey defensor llega a la esquina.</li><li>¿Cuáles son las casillas clave? ¿Mi rey llega a una antes de que el rival la defienda?</li><li>Si los reyes están enfrentados, ¿a quién le toca mover? ¿Tengo una jugada de peón para ceder el turno?</li><li>Antes de cada avance del peón en la séptima, ¿le queda alguna jugada al rey rival o es ahogado?</li></ol>",
  "keyPoints": [
   "Con el peón en quinta, también son clave las casillas de la sexta y la séptima delante de él.",
   "La oposición sirve para ocupar (o defender) una casilla clave; no es un fin en sí misma.",
   "Primero el rey, después el peón: los pasos de peón son tiempos de reserva."
  ],
  "positions": [
   {
    "fen": "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
    "orientation": "white",
    "caption": "Primero el rey: las blancas llevan el rey a la cuarta fila sin tocar el peón.",
    "line": [
     "Kd2",
     "Kd7",
     "Kd3",
     "Kd6",
     "Ke4",
     "Ke6",
     "e3"
    ],
    "comments": [
     "El rey sale por delante del peón. El peón se queda en e2: así conserva la opción de avanzar una o dos casillas cuando convenga.",
     "El negro también acerca su rey al centro.",
     "El rey sigue su camino hacia d4, e4 o f4, las casillas clave de un peón en e2.",
     "El rey negro controla d5 y e5, pero no puede vigilar a la vez d4 y e4.",
     "El rey blanco pisa e4, una casilla clave. Desde este momento la partida está ganada, mueva quien mueva.",
     "El negro toma la oposición: le toca mover a las blancas y, sin el peón, no podrían avanzar.",
     "¡La jugada de reserva! El peón avanza una sola casilla y le pasa el turno al negro, que tiene que apartarse y dejar entrar al rey blanco en d5 o f5."
    ]
   },
   {
    "fen": "4k3/8/8/8/8/8/4P3/4K3 b - - 0 1",
    "orientation": "black",
    "caption": "La misma posición con el negro al turno: la oposición a distancia salva al defensor.",
    "line": [
     "Ke7",
     "Kd2",
     "Kd6",
     "Kd3",
     "Kd5"
    ],
    "comments": [
     "Los reyes quedan en la misma columna con cinco casillas entre ellos y les toca mover a las blancas: el negro tiene la oposición a distancia.",
     "El rey blanco avanza en diagonal para intentar ganar terreno.",
     "El negro responde en la misma columna que el rey blanco y conserva la oposición (tres casillas entre ellos).",
     "Las blancas siguen avanzando.",
     "Oposición directa con las blancas al turno. Si e3, el rey negro se mantiene delante (por ejemplo Ke5) y vuelve a tomar la oposición: tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/4k3/8/3PK3/8/8/8/8 b - - 0 1",
    "caption": "Juegan negras: el peón está en quinta y el rey blanco amenaza entrar. Encuentra las dos jugadas que salvan la partida.",
    "line": [
     "Kd7",
     "Kf6",
     "Kd6"
    ],
    "comments": [
     "El rey se coloca delante del peón, en d7. Kf7? o Ke8? pierden: el rey blanco llega a d6, una casilla clave de un peón en quinta, y el peón corona.",
     "Las blancas intentan rodear por el flanco para llegar a e7 o e6 y apoyar el avance del peón.",
     "¡Ataque al peón! Desde f6 el rey blanco ya no protege d5, así que el negro lo captura en la jugada siguiente. Ke8? o Kc7? pierden: el rey blanco vuelve a e6 y el peón avanza protegido."
    ]
   },
   {
    "fen": "k7/2P5/8/3K4/8/8/8/8 b - - 0 1",
    "caption": "Juegan negras: el peón está a un paso de coronar. Encuentra la defensa exacta (dos jugadas).",
    "line": [
     "Kb7",
     "Kd6",
     "Kc8"
    ],
    "comments": [
     "El rey ataca el peón y vigila c8. Ka7?? se aleja y permite c8=D de inmediato.",
     "El rey blanco protege el peón.",
     "El rey se coloca en la casilla de coronación, delante del peón. Kb6? o Ka7? permiten Kd7 y el peón corona. Ahora, si Kc6, es ahogado; y si el rey blanco se aparta, el negro captura el peón: tablas."
    ]
   },
   {
    "fen": "8/8/8/3k4/8/8/2KP4/8 w - - 0 1",
    "caption": "Juegan blancas y ganan. ¿Con qué jugada de rey empiezas?",
    "line": [
     "Kd3"
    ],
    "comments": [
     "Kd3 toma la oposición frente al rey negro (una casilla entre d3 y d5) y le toca mover al negro, que tiene que ceder: si Ke5, Kc4; si Kc5, Ke4. En ambos casos el rey blanco ocupa una casilla clave del peón de d2 (c4, d4 o e4). Kc3? o Kb3? permiten que el negro tome la oposición y son tablas."
    ]
   },
   {
    "fen": "8/4k3/6K1/8/7P/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: peón de torre. ¿Puedes impedir que el rey negro llegue a la esquina?",
    "line": [
     "Kg7"
    ],
    "comments": [
     "Kg7 controla g8 y h8: el rey negro ya no puede llegar a la esquina y el peón corre libre hasta coronar. En cambio, h5? Kf8! (o Kf7) y el rey negro alcanza g8 o h8: tablas, como dice la regla del peón de torre."
    ]
   }
  ]
 },
 "f2-peones-contra-rey": {
  "html": "<h4>Dos cuadrados a la vez</h4><p>Con un solo peón basta la regla del cuadrado. Con dos peones, el rey defensor debe vigilar dos cuadrados al mismo tiempo, y su casilla ideal es la que está dentro de ambos. Si en algún momento uno de los peones sale de su cuadrado, corona. Por eso el atacante no debe empujar los peones al azar: cada avance cambia los dos cuadrados. La pregunta correcta antes de mover un peón es «¿qué casillas le quedan al rey para seguir dentro de los dos cuadrados?».</p><h4>Peones unidos sin su rey</h4><p>Dos peones unidos que avanzan solos tienen una debilidad: si los dos están en la misma fila, ninguno protege al otro. Si uno avanza, el de atrás pasa a protegerlo, pero el de atrás queda desprotegido. El rey defensor busca precisamente ese momento: se coloca delante del peón más avanzado y espera. Si el bando atacante tiene jugadas libres con su rey, los peones pueden quedarse quietos y el rey propio llega; si no las tiene, los peones tendrán que avanzar y uno de ellos caerá. Recuerda la regla práctica: <b>el rey defensor no puede capturar el peón de atrás si el de delante corona antes de que lo alcance</b>, así que su única opción es bloquear el de delante.</p><h4>Peones separados: la distancia decide</h4><p>Cuando hay columnas libres entre los peones, el rey defensor queda entre ambos. Si los peones están cerca (una columna de separación) y avanzados, se defienden de forma indirecta: cuando el rey captura uno, el otro corona. Si están lejos, el rey no puede atender a los dos. En ambos casos la defensa depende del conteo exacto: ¿cuántas jugadas necesita el rey para capturar un peón y volver al cuadrado del otro? Un rey en el centro suele bastar contra peones atrasados, pero contra peones en quinta o sexta casi nunca alcanza.</p><h4>El rey que persigue dos objetivos</h4><p>Un rey que avanza en diagonal se acerca a la vez a dos zonas del tablero. Esa geometría, que el famoso estudio de Réti (1921) muestra de forma sorprendente, es la base de muchas defensas: el rey defensor puede atacar un peón y, al mismo tiempo, entrar en el cuadrado del otro. El atacante, a su vez, usa la misma idea para acompañar sus peones con el rey mientras vigila el contrajuego.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Empujar el peón equivocado: el que deja al otro sin protección o fuera de su cuadrado no sirve.</li><li>Capturar con el rey el peón de atrás de una pareja unida: el de delante corona.</li><li>Olvidar las jugadas de reserva del rey propio: muchas veces basta con pasar el turno y obligar al rey rival a ceder.</li></ul><p>Lista de comprobación: ¿se protegen los peones? ¿Dónde está la casilla que vigila los dos cuadrados? ¿Cuántos tiempos libres tiene cada bando? ¿Llega mi rey a apoyar antes de que el rival capture algo?</p>",
  "keyPoints": [
   "El rey defensor busca la casilla que está dentro de los dos cuadrados.",
   "Contra peones unidos, el rey bloquea el de delante; capturar el de atrás deja coronar al otro.",
   "El rey en diagonal persigue dos objetivos a la vez."
  ],
  "positions": [
   {
    "fen": "8/p7/1K6/5P1p/2k4P/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "El rey blanco hace dos trabajos a la vez: corta al rey negro y vigila el peón de a.",
    "line": [
     "Kc6",
     "a5",
     "f6",
     "a4",
     "f7",
     "Kd3",
     "f8=Q"
    ],
    "comments": [
     "¡No Kxa7? Kd5 y el rey negro alcanza el peón de f! En c6 el rey blanco le quita d5 y d6 al rey negro, que ya no puede entrar en el cuadrado del peón de f5.",
     "El negro intenta su propia carrera con el peón de a.",
     "El peón de f avanza: el rey negro está fuera de su cuadrado.",
     "El peón de a sigue, pero va un tiempo atrasado.",
     "El peón llega a la séptima.",
     "El rey negro llega tarde.",
     "Corona el peón, y la dama detendrá sin problemas el peón de a."
    ]
   },
   {
    "fen": "8/8/8/6P1/6Pk/1K6/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Peones doblados: casi siempre débiles, pero aquí el de atrás desvía al rey.",
    "line": [
     "g6",
     "Kg5",
     "g7",
     "Kh6",
     "g8=R"
    ],
    "comments": [
     "El peón de delante avanza. El rey negro tiene que elegir entre perseguirlo o capturar el de g4.",
     "El rey se coloca entre los dos peones y ataca a ambos.",
     "El peón de delante sigue: desde g5 el rey no puede alcanzar g8 a tiempo.",
     "El negro ataca el peón de g7, pero ya es tarde.",
     "¡Atención! g8=D?? sería ahogado: el rey negro no tendría casillas (h5 la controla el peón de g4). Por eso se corona en torre, que gana igual. Recuerda que esto es una excepción: normalmente un rey bien colocado delante de los peones doblados se los come."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/8/2Pk4/8/7P/7K/8 w - - 0 1",
    "caption": "Juegan blancas: el rey negro ataca el peón de c5. ¿Cuál es el plan ganador?",
    "line": [
     "h4",
     "Kxc5",
     "h5",
     "Kd5",
     "h6",
     "Ke6",
     "h7"
    ],
    "comments": [
     "¡El peón de h corre! El de c5 está perdido, pero sirve de señuelo: mientras el rey negro lo captura, el de h sale de su alcance. Kg3? Kxc5 y el rey negro vuelve a tiempo: tablas.",
     "El negro captura el peón; si en cambio persigue el de h, el de c avanza.",
     "Con el rey en c5, el negro está fuera del cuadrado del peón de h5 (e5-h5-h8-e8).",
     "El rey corre, pero no entra en el cuadrado.",
     "El peón sigue avanzando.",
     "El rey sigue un paso por detrás.",
     "El peón coronará en la jugada siguiente: el rey negro no alcanza h8."
    ]
   },
   {
    "fen": "8/7k/K4P2/8/8/6P1/8/8 w - - 0 1",
    "caption": "Juegan blancas: el rey negro está junto a los peones y el rey blanco, lejos. Encuentra cómo coronar.",
    "line": [
     "g4",
     "Kg6",
     "g5",
     "Kxg5",
     "f7"
    ],
    "comments": [
     "El peón de g se acerca al de f para protegerlo. f7? Kg7 y el rey captura el peón; Kb6? Kg6 y el rey negro gana el peón de f6.",
     "El rey negro ataca el peón de f6.",
     "¡Ahora g5 protege a f6! El rey negro no puede capturar f6, y si captura g5 el peón de f queda libre.",
     "No hay nada mejor: esperar permite que el rey blanco se acerque.",
     "El peón corona: desde g5 el rey negro no llega a f8."
    ]
   },
   {
    "fen": "8/8/8/5P1P/7k/2K5/8/8 b - - 0 1",
    "caption": "Juegan negras: el rey blanco está lejos, pero los dos peones son peligrosos. Defiende con precisión.",
    "line": [
     "Kg5",
     "h6",
     "Kxh6",
     "Kd4",
     "Kg7",
     "Ke5",
     "Kf7"
    ],
    "comments": [
     "El rey se coloca entre los dos peones y vigila ambos cuadrados. Kxh5? f6 y el peón de f se escapa.",
     "Las blancas intentan desviar al rey con el peón de h.",
     "El rey captura el peón de h; Kxf5? permitiría h7 y el peón corona.",
     "El rey blanco llega para apoyar el peón de f.",
     "El rey negro va directo hacia la casilla de coronación del peón de f.",
     "El rey blanco escolta el peón.",
     "El rey negro se planta delante del peón: con el rey en f7 o f8 y la oposición bien tomada, es tablas."
    ]
   }
  ]
 },
 "f2-dos-alfiles": {
  "html": "<h4>Por qué los alfiles necesitan al rey</h4><p>Dos alfiles de distinto color controlan casillas de los dos colores, pero ninguno puede dar jaque de cerca sin quedar expuesto. Por eso el rey atacante cumple dos funciones: quita casillas al rey rival (siempre las tres que tiene enfrente) y protege a los alfiles cuando estos se acercan. La posición ideal del rey atacante es a un salto de caballo o en oposición del rey defensor, para que este no pueda avanzar.</p><h4>La caja y cómo reducirla</h4><p>Los dos alfiles juntos (en casillas vecinas de la misma fila, o una delante de otra) forman una barrera de dos diagonales que el rey rival no puede atravesar. El espacio que le queda al rey defensor es la <b>caja</b>. El plan consiste en reducir la caja paso a paso: cuando el rey rival se aleja de la barrera, un alfil avanza una casilla; cuando se acerca, es el rey atacante quien se adelanta para sostener a los alfiles. Cada jugada debe cumplir una de estas condiciones: quitar una casilla, acercar el rey o conservar la barrera. Si ninguna jugada útil está disponible, un alfil puede hacer una <b>jugada de espera</b> sobre la misma diagonal, sin abrir la barrera, para obligar al rey rival a mover y ceder terreno.</p><h4>La fase final: rey enfrente y jaques alternados</h4><p>Cuando el rey defensor llega al borde, el atacante coloca su rey enfrente, en la segunda fila (por ejemplo, rey blanco en f6 contra rey negro en f8 o g8). Entonces los alfiles empujan al rey hacia la esquina con jaques alternados: uno da jaque y el otro cubre la casilla de escape. El mate siempre se produce en la esquina o en la casilla vecina del borde. Si el rey rival vuelve hacia el centro, no lo persigas con jaques: restablece la barrera y vuelve a empezar desde una caja más pequeña.</p><h4>Errores comunes</h4><ul><li><b>Ahogado</b>: con el rey rival en la esquina y una sola casilla libre, una jugada de alfil que le quita esa casilla sin dar jaque lo deja sin movimientos.</li><li><b>Alfil al alcance del rey</b>: un alfil sin protección al lado del rey rival se pierde y con él el mate.</li><li><b>Jaques sin plan</b>: cada jaque que no reduce la caja le devuelve espacio al defensor.</li><li><b>Rey propio lejos</b>: los alfiles solos solo empujan; el rey es quien cierra la puerta.</li></ul><h4>Cómo pensarlo</h4><ol><li>¿Qué casillas tiene el rey rival ahora? Cuéntalas.</li><li>¿Mi rey está enfrente de él, a una casilla de distancia en la fila o columna?</li><li>¿La jugada que pienso quita casillas sin dejar ninguna pieza colgando?</li><li>En la esquina: ¿mi jugada da jaque o le deja al menos una casilla?</li></ol>",
  "keyPoints": [
   "El rey atacante se coloca enfrente del rey rival; los alfiles hacen el resto.",
   "Si no hay jugada útil, un alfil espera en su diagonal sin romper la barrera.",
   "En la esquina, cuenta las casillas libres antes de cada jugada: evita el ahogado."
  ],
  "positions": [
   {
    "fen": "7k/8/5K2/8/8/3BB3/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Cuidado con el ahogado: con el rey negro en el rincón, cada jugada debe dejarle una casilla o darle jaque.",
    "line": [
     "Kg6",
     "Kg8",
     "Bh6",
     "Kh8",
     "Bg7+",
     "Kg8",
     "Bc4#"
    ],
    "comments": [
     "El rey se coloca enfrente del rey negro. ¡Kf7?? sería ahogado: g8 y g7 los controla el rey y h7 el alfil de d3!",
     "Única casilla.",
     "El alfil quita f8 y deja al rey negro solo h8: como tiene una jugada, no es ahogado.",
     "Forzada.",
     "Jaque que devuelve el rey a g8.",
     "Forzada.",
     "Mate: el alfil de c4 da jaque por la diagonal a2-g8, g7 lo cubre el alfil y f7, h7 y f8 el rey y el alfil de g7."
    ]
   },
   {
    "fen": "k7/8/8/3K3B/8/8/7B/8 w - - 0 1",
    "orientation": "white",
    "caption": "La jugada de espera: si no hay nada útil, un alfil pierde un tiempo sin abrir la barrera.",
    "line": [
     "Kc6",
     "Ka7",
     "Be2",
     "Ka8",
     "Kc7",
     "Ka7",
     "Bg1+",
     "Ka8",
     "Bf3#"
    ],
    "comments": [
     "El rey se acerca y quita b7.",
     "El rey negro va y viene entre a7 y a8.",
     "¡Jugada de espera! El alfil sigue en la misma diagonal y no cambia nada importante; solo pasa el turno.",
     "El negro tiene que volver a a8.",
     "Ahora el rey blanco se coloca enfrente: el rey negro solo tiene a7.",
     "Única jugada.",
     "Jaque por la diagonal g1-a7: el rey vuelve al rincón.",
     "Forzada.",
     "Mate por la gran diagonal: b7 y b8 los cubre el rey blanco y a7 el alfil de g1."
    ]
   }
  ],
  "drills": [
   {
    "fen": "7k/8/8/5K2/8/B7/8/7B w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres.",
    "line": [
     "Kg6",
     "Kg8",
     "Bd5+",
     "Kh8",
     "Bb2#"
    ],
    "comments": [
     "El rey se coloca enfrente del rey negro y le quita g7, h7 y f7. Si empiezas con un alfil, el rey negro sale por g7 o g8 y la caja se agranda.",
     "Única casilla.",
     "Jaque por la diagonal a2-g8 que devuelve el rey a la esquina.",
     "Forzada: f8 la controla el alfil de a3.",
     "Mate por la gran diagonal; g8 la cubre el alfil de d5."
    ]
   },
   {
    "fen": "8/8/8/1B2B3/4K3/8/8/6k1 w - - 0 1",
    "caption": "Juegan blancas: mate en cuatro. El rey negro ya está en la primera fila.",
    "line": [
     "Kf3",
     "Kh1",
     "Kg3",
     "Kg1",
     "Bd4+",
     "Kh1",
     "Bc6#"
    ],
    "comments": [
     "El rey se acerca y quita g2 y f2; h2 la controla el alfil de e5 y f1 el de b5. Al negro solo le queda h1.",
     "Única jugada.",
     "El rey se coloca enfrente: al rey negro solo le queda g1, así que no hay ahogado.",
     "Forzada.",
     "Jaque por la diagonal a7-g1 que devuelve el rey al rincón.",
     "Forzada.",
     "Mate por la gran diagonal: g1 lo cubre el alfil de d4, y g2 y h2 el rey."
    ]
   },
   {
    "fen": "1k6/8/K7/6B1/2B5/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: mate en cuatro en la esquina a8.",
    "line": [
     "Kb6",
     "Kc8",
     "Be6+",
     "Kb8",
     "Bf4+",
     "Ka8",
     "Bd5#"
    ],
    "comments": [
     "El rey se coloca enfrente del rey negro y le quita a7, b7 y c7: el negro solo puede moverse por la octava fila.",
     "La mejor defensa: alejarse de la esquina hacia el centro.",
     "Jaque que le quita d7 y obliga al rey a volver.",
     "Única: d8 la controla el alfil de g5.",
     "Jaque por la diagonal h2-b8.",
     "Forzada.",
     "Mate por la diagonal a8-h1: el resto de las casillas las cubren el rey y el alfil de f4."
    ]
   },
   {
    "fen": "8/8/8/6B1/2K5/7B/8/k7 w - - 0 1",
    "caption": "Juegan blancas: mate en tres.",
    "line": [
     "Kb3",
     "Kb1",
     "Bf5+",
     "Ka1",
     "Bf6#"
    ],
    "comments": [
     "El rey se coloca enfrente y quita a2, b2 y c2. El negro solo tiene b1, así que no hay riesgo de ahogado.",
     "Única jugada.",
     "Jaque por la diagonal b1-h7: c1 la cubre el alfil de g5.",
     "Forzada.",
     "Mate por la gran diagonal."
    ]
   }
  ]
 },
 "f2-dos-torres": {
  "html": "<h4>Cortar primero, dar jaque después</h4><p>La escalera funciona porque cada torre tiene una tarea fija: una <b>corta</b> (impide que el rey vuelva hacia atrás) y la otra <b>da jaque</b> en la fila siguiente. Antes de cada jugada pregúntate cuál de las dos torres está cortando. Esa torre no se mueve; la que se mueve es la otra, y siempre avanza a la fila (o columna) que está justo delante del rey rival. Si mueves la torre que corta, el rey se escapa hacia el centro y hay que empezar de nuevo.</p><h4>Cuando el rey ataca una torre</h4><p>El rey defensor solo tiene una forma de resistir: acercarse a la torre que debe dar el siguiente jaque. Si esa torre está a su lado, no puede saltar a la fila siguiente porque quedaría capturada. La solución no es defenderla con la otra torre, sino <b>alejarla</b>: llévala al otro extremo de la misma fila, a tres o más columnas del rey. Desde allí sigue cortando exactamente igual, y el rey ya no la alcanza. Este paso cuesta un tiempo, pero no importa: mientras una torre corta, el rey rival no gana nada.</p><p>A veces conviene, en lugar de alejar la torre, cambiar el orden: dar el jaque con la otra torre desde una columna lejana. Cualquiera de las dos ideas sirve si respetas la regla de oro: <b>ninguna torre al alcance del rey rival</b>.</p><h4>El mate en columnas y la ayuda del rey</h4><p>La escalera no tiene por qué ir hacia la octava fila: puedes empujar al rey hacia cualquier borde, por filas o por columnas. Elige el borde más cercano al rey rival; así ahorras jugadas. Y aunque el rey propio no es necesario, a veces una sola jugada de rey simplifica el problema: si el rey rival está pegado a una torre y no hay forma cómoda de alejarla, el rey propio puede protegerla y el mate llega igual. En la partida, el objetivo no es la elegancia sino dar mate rápido y sin riesgos.</p><h4>Errores comunes</h4><ul><li>Poner las dos torres en la misma columna: una tapa a la otra y no pueden alternarse.</li><li>Dar jaques desde cerca: el rey se acerca, ataca la torre y hay que perder tiempo.</li><li>Ahogado: con el rey rival en el borde, cortar dos filas sin dar jaque puede dejarlo sin jugadas. Si el rey no tiene casillas, la jugada siguiente debe ser jaque.</li><li>Olvidar que el rey rival puede capturar una torre sin protección en diagonal.</li></ul><h4>Cómo pensarlo</h4><ol><li>¿Qué torre corta y cuál da el próximo jaque?</li><li>¿La casilla a la que va la torre está al alcance del rey rival?</li><li>Si lo está, ¿puedo llevarla al otro lado de la misma fila?</li><li>Cuando el rey llega al borde: ¿mi jugada es jaque mate o, al menos, le deja una casilla?</li></ol>",
  "keyPoints": [
   "Una torre corta y no se mueve; la otra avanza con jaque.",
   "Si el rey se acerca a una torre, aléjala por la misma fila al otro extremo.",
   "Ninguna torre al alcance del rey rival."
  ],
  "positions": [
   {
    "fen": "8/8/8/8/8/2k5/8/K5RR w - - 0 1",
    "orientation": "white",
    "caption": "La escalera por filas, con una jugada de espera al final.",
    "line": [
     "Rh4",
     "Kd3",
     "Rg3+",
     "Ke2",
     "Rh2+",
     "Kf1",
     "Ra2",
     "Ke1",
     "Rg1#"
    ],
    "comments": [
     "Una torre corta la cuarta fila: el rey negro ya no puede subir.",
     "El rey intenta acercarse a las torres.",
     "Jaque en la tercera fila: el rey tiene que bajar a la segunda.",
     "El rey se acerca a la torre de g3.",
     "Jaque en la segunda fila con la otra torre, lejos del rey.",
     "El rey baja a la primera fila, pegado a la torre de g3 por si puede atacarla.",
     "Rg1+?? no es posible porque el rey captura. La torre de h2 se aleja al otro extremo de la misma fila: sigue cortando la segunda y le pasa el turno al negro.",
     "Única jugada: g1, g2, f2 y e2 están controladas.",
     "Mate en la primera fila."
    ]
   },
   {
    "fen": "7k/8/8/8/8/8/1R6/R5K1 w - - 0 1",
    "orientation": "white",
    "caption": "Corta y luego da jaque: el último paso de la escalera.",
    "line": [
     "Rb7",
     "Kg8",
     "Ra8#"
    ],
    "comments": [
     "La torre corta la séptima fila: al rey negro solo le queda g8. Es importante que tenga una casilla: si las torres le quitaran todas sin dar jaque, sería ahogado.",
     "Única casilla.",
     "Mate: la torre de a8 da jaque en la octava y la de b7 corta la séptima."
    ]
   }
  ],
  "drills": [
   {
    "fen": "4K3/8/5k2/8/8/8/1R4R1/8 w - - 0 1",
    "caption": "Juegan blancas: mate en dos.",
    "line": [
     "Rb5",
     "Ke6",
     "Rg6#"
    ],
    "comments": [
     "La torre de b2 corta la quinta fila y la de g2 la columna g. El rey negro queda encerrado: solo le queda e6 (e7 y f7 las controla el rey blanco).",
     "Única jugada.",
     "Mate en la sexta fila: d7 la cubre el rey blanco y la quinta fila, la torre de b5."
    ]
   },
   {
    "fen": "4RR2/8/8/3k4/1K6/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: mate en dos.",
    "line": [
     "Rf6",
     "Kd4",
     "Rd6#"
    ],
    "comments": [
     "La torre baja a la sexta y corta esa fila; la de e8 vigila la columna e y el rey blanco cubre la columna c. Al rey negro solo le queda d4.",
     "Única jugada.",
     "Mate por la columna d: c3, c4 y c5 las cubre el rey blanco y la columna e, la torre de e8."
    ]
   },
   {
    "fen": "8/8/1R6/2k5/8/8/2K5/1R6 w - - 0 1",
    "caption": "Juegan blancas: mate en dos. Esta vez el rey propio colabora.",
    "line": [
     "Kd3",
     "Kd5",
     "R1b5#"
    ],
    "comments": [
     "El rey quita c4 y d4. El rey negro, encerrado entre la columna b y la sexta fila, solo puede ir a d5.",
     "Única jugada.",
     "Mate en la quinta fila: el rey blanco cubre c4, d4 y e4 y la torre de b6, la sexta fila."
    ]
   },
   {
    "fen": "8/8/8/6k1/R7/8/8/1K5R w - - 0 1",
    "caption": "Juegan blancas: mate en cuatro. Corta primero y no dejes ninguna torre al alcance del rey.",
    "line": [
     "Rf1"
    ],
    "comments": [
     "La torre de h1 se aparta del rey negro y corta la columna f: el rey queda encerrado en las columnas g y h, entre la torre de a4 y la de f1. Ahora la escalera va por columnas: si Kg6, Rg4+ Kh5 y la torre se aleja con Rg8 (ninguna torre al alcance del rey) antes de dar mate en la columna h. Rh8? o Re1? alargan el mate varias jugadas."
    ]
   }
  ]
 },
 "f2-dos-caballos": {
  "html": "<h4>El problema de los tiempos, visto de cerca</h4><p>Imagina el rey negro en h8 y el rey blanco en g6. Para dar mate, un caballo debe cubrir g8 y el otro dar jaque en h8 desde f7. Si el caballo que cubre g8 llega primero sin dar jaque, el rey negro no tiene ninguna jugada: es <b>ahogado</b>. Si el caballo que da jaque llega primero, g8 está libre y el rey sale de la esquina. Para que el mate funcione, el caballo que cubre la casilla de escape debe estar ya colocado y el rey defensor debe entrar en la esquina por su cuenta. Ningún rey bien defendido lo hace: siempre tiene otra casilla.</p><h4>La técnica del defensor</h4><p>Defender este final no exige cálculo profundo, solo una regla: <b>ante cada jaque, elige la casilla que no esté en la esquina</b> y, si puedes, vuelve hacia el centro. El rey defensor nunca está obligado a entrar en el rincón, porque los dos caballos y el rey no pueden quitarle a la vez todas las casillas de la banda sin ahogarlo. El peligro aparece cuando el defensor se mueve sin mirar: una jugada automática hacia la esquina, con un caballo ya preparado para el jaque, termina la partida.</p><h4>Qué dice el reglamento</h4><p>Hay una diferencia importante entre este final y el de rey y alfil (o rey y caballo) contra rey. Con un solo alfil o un solo caballo no existe ninguna posición de mate, y la partida termina en tablas automáticamente. Con dos caballos el mate es posible, aunque no se pueda forzar, así que <b>la partida continúa</b>. El defensor puede proponer tablas, reclamar por la regla de las cincuenta jugadas o, en partidas rápidas, esperar a que el árbitro o el reglamento del torneo decidan. Mientras tanto, debe seguir jugando con cuidado.</p><h4>Cuando el defensor tiene un peón</h4><p>Si el bando débil conserva un peón, el ahogado deja de ser un problema: el peón tiene jugadas. Entonces un caballo puede bloquear el peón mientras el rey y el otro caballo construyen la red de mate. Troitzky estudió este final y estableció una línea de referencia: si el peón del defensor está bloqueado por un caballo en una casilla suficientemente atrasada, los caballos ganan. Es un final muy largo, pero la idea práctica sirve: <b>no captures el último peón del rival si eso deja un final sin posibilidades de mate</b>.</p><h4>Cómo pensarlo</h4><ul><li>Defensor: antes de mover el rey, mira si en la casilla elegida un caballo puede darte jaque mientras el otro cubre todas tus salidas.</li><li>Atacante: no busques forzar el mate; busca el error. Lleva al rey rival al borde y ofrece una casilla de esquina tentadora.</li><li>Con material extra, evita cambiar hacia rey y dos caballos contra rey solo: es tablas.</li></ul>",
  "keyPoints": [
   "Con dos caballos la partida no termina automáticamente: el mate es posible, aunque no forzado.",
   "Si el defensor tiene un peón, el ahogado desaparece y a veces los caballos ganan."
  ],
  "positions": [
   {
    "fen": "7k/5K2/8/4N3/4N3/8/8/8 b - - 0 1",
    "orientation": "black",
    "caption": "El defensor mira antes de mover: una sola casilla equivocada permite el mate.",
    "line": [
     "Kh7",
     "Ng5+",
     "Kh6"
    ],
    "comments": [
     "Única jugada: g8 y g7 las controla el rey blanco.",
     "Jaque desde g5, que además vigila h7.",
     "¡Kh6! se aleja de la esquina. Kh8?? permitiría Ng6#: el caballo de g5 cubre h7 y el rey blanco, g7 y g8. Desde h6 el rey vuelve hacia el centro y no hay mate."
    ]
   },
   {
    "fen": "7k/8/6K1/4N3/3N4/8/8/8 b - - 0 1",
    "orientation": "black",
    "caption": "El defensor sale de la esquina en cuanto puede: los caballos no pueden forzar el mate.",
    "line": [
     "Kg8",
     "Ne6",
     "Kh8",
     "Nf7+",
     "Kg8"
    ],
    "comments": [
     "El rey sale del rincón hacia g8.",
     "Las blancas preparan un caballo para cubrir g7 y f8.",
     "Kh8 es posible aquí porque ningún caballo puede dar mate en una jugada; el defensor siempre comprueba eso antes.",
     "Jaque, pero sin mate.",
     "El rey vuelve a g8 y la historia se repite: tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "1k6/3N4/1K2N3/8/8/8/8/8 b - - 0 1",
    "caption": "Juegan negras: estás en jaque. Elige bien la casilla.",
    "line": [
     "Kc8",
     "Ndc5",
     "Kb8"
    ],
    "comments": [
     "¡Kc8 sale hacia el centro! Ka8?? permite Nc7#: el caballo de d7 cubre b8 y el rey blanco, a7 y b7.",
     "Las blancas reorganizan los caballos.",
     "Única jugada: d8 y d7 están controladas. Ningún caballo puede dar mate en b8 porque el rey sigue teniendo casillas: tablas."
    ]
   },
   {
    "fen": "7k/5K2/8/3NN3/p7/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: el negro conserva un peón. Da mate en dos.",
    "line": [
     "Nf6",
     "a3",
     "Ng6#"
    ],
    "comments": [
     "El caballo cubre g8 y h7. Sin peón negro sería ahogado, pero el negro tiene que mover el peón.",
     "Única jugada.",
     "Mate: el caballo de g6 da jaque y el de f6 y el rey cubren todas las salidas."
    ]
   },
   {
    "fen": "8/8/8/8/8/1K6/3N4/1k2N3 b - - 0 1",
    "caption": "Juegan negras: estás en jaque cerca del rincón. ¿Dónde va el rey?",
    "line": [
     "Kc1"
    ],
    "comments": [
     "Kc1 se aleja de la esquina. Ka1?? permite Nc2#: el caballo de d2 cubre b1 y el rey blanco, a2 y b2. Desde c1 el rey sigue hacia el centro y no hay mate posible."
    ]
   },
   {
    "fen": "k7/2K5/8/3NN3/7p/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: mate en dos en la esquina a8.",
    "line": [
     "Nc6",
     "h3",
     "Nb6#"
    ],
    "comments": [
     "El caballo cubre a7 y b8: el rey negro se queda sin jugadas y el negro tiene que mover el peón.",
     "Única jugada.",
     "Mate: el caballo de d5 salta a b6 con jaque."
    ]
   }
  ]
 },
 "f2-torre-activa": {
  "html": "<h4>Cómo medir la actividad de una torre</h4><p>Para comparar dos torres, hazte cuatro preguntas: ¿ataca algo (un peón, el rey)? ¿Corta al rey rival? ¿Apoya un peón pasado desde atrás? ¿Puede dar jaques que molesten al rey contrario? Una torre que responde «sí» a dos o más de estas preguntas es activa. Una torre que solo defiende un peón, colocada delante o al lado de él, es pasiva, y su dueño suele estar a la defensiva aunque tenga el mismo material.</p><h4>Devolver un peón para activar la torre</h4><p>Uno de los principios más útiles de los finales de torres es que la actividad vale más que un peón. Si tu torre está atada a la defensa, muchas veces lo mejor es <b>abandonar el peón</b> y llevar la torre a la séptima o detrás de los peones del rival. Lo habitual es recuperar el material enseguida, porque la torre activa captura peones mientras la del rival está ocupada. Lo contrario también vale: cuando estás ganando un peón, pregúntate qué hará la torre rival mientras tu torre está ocupada en capturarlo.</p><h4>El rey también se activa</h4><p>En los finales de torres el rey es una pieza de ataque. La combinación ideal es torre que corta y rey que avanza: la torre impide que el rey rival se acerque y el rey propio escolta los peones o ataca los del contrario. Al revés, un rey cortado lejos de la acción es una desventaja tan grande como una pieza menos. Por eso la jugada que corta al rey rival una columna más, o una fila más, suele ser la más fuerte aunque no capture nada.</p><h4>Excepciones a la regla de Tarrasch</h4><p>La torre detrás del peón pasado es la regla general, pero hay casos en que conviene otra cosa: si el rey propio llega antes delante del peón rival, la torre puede atacar de lado; si la torre rival está delante de su peón y el rey defensor está cerca, a veces es más fuerte cortar al rey atacante que ponerse detrás. La pregunta de fondo es siempre la misma: ¿qué colocación da más jugadas útiles a la torre?</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Defender un peón con la torre en la octava fila cuando se puede contraatacar.</li><li>Capturar un peón lejano con la torre y permitir que la torre rival llegue a la séptima.</li><li>Dejar el rey atrás «por seguridad» en un final sin damas.</li></ul><p>Un detalle práctico: cuando dudes entre dos jugadas de torre, elige la que deja a tu torre con más casillas disponibles y a la del rival con menos. Antes de cada jugada de torre: ¿mi torre queda más activa que antes? ¿Qué hace la torre rival si capturo este peón? ¿Puedo cortar al rey contrario una columna más?</p>",
  "keyPoints": [
   "Activa: ataca, corta, apoya desde atrás o da jaques útiles.",
   "Muchas veces conviene devolver un peón para activar la torre.",
   "Torre que corta y rey que avanza: la pareja ganadora."
  ],
  "positions": [
   {
    "fen": "r7/8/1k6/8/4P3/4K3/8/7R w - - 0 1",
    "orientation": "white",
    "caption": "Cortar al rey lejos del peón: la torre vale tanto como una pieza extra.",
    "line": [
     "Rc1",
     "Kb7",
     "Kf4",
     "Rf8+",
     "Ke5",
     "Re8+",
     "Kf5",
     "Rf8+",
     "Kg6"
    ],
    "comments": [
     "La torre corta la columna c: el rey negro queda dos columnas lejos del peón de e. Rd1? solo lo cortaría a una columna.",
     "El rey negro no puede cruzar la columna c.",
     "El rey blanco avanza junto al peón.",
     "La torre negra da jaques desde atrás.",
     "El rey se acerca a la torre.",
     "Más jaques.",
     "El rey sigue subiendo.",
     "El negro sigue con jaques.",
     "El rey se acerca a la torre y los jaques se acaban pronto; el peón avanzará con el rey delante."
    ]
   },
   {
    "fen": "r7/8/8/8/4P1k1/4K3/8/7R w - - 0 1",
    "orientation": "white",
    "caption": "Un jaque que corta: el rey defensor queda en la banda.",
    "line": [
     "Rg1+",
     "Kh5",
     "e5",
     "Kh6",
     "Ke4",
     "Ra4+",
     "Kf5"
    ],
    "comments": [
     "Jaque por la columna g: el rey negro tiene que ir a la columna h y queda cortado del peón.",
     "El rey negro queda en la banda, cortado del peón por la columna g.",
     "El peón avanza mientras el rey negro está lejos.",
     "El rey negro intenta acercarse por la sexta fila.",
     "El rey blanco acompaña al peón.",
     "Jaque lateral.",
     "El rey se esconde delante del peón; el rey negro sigue cortado por la columna g."
    ]
   }
  ],
  "drills": [
   {
    "fen": "7r/8/5k2/8/2P5/2K5/8/R7 w - - 0 1",
    "caption": "Juegan blancas: torre y peón contra torre. ¿Dónde colocas tu torre?",
    "line": [
     "Re1"
    ],
    "comments": [
     "Re1 corta al rey negro por la columna e, a dos columnas del peón de c: el rey blanco podrá escoltar el peón sin que el rey negro se acerque. Rd1? lo corta a una sola columna y el negro se defiende: el motor lo valora como tablas."
    ]
   },
   {
    "fen": "8/3k4/7p/2p2r2/1R2P3/7P/4K3/8 w - - 0 1",
    "caption": "Juegan blancas: tu torre está atacada por el peón de c5, pero tu peón de e4 ataca la torre negra. ¿Cómo aprovechas las dos cosas?",
    "line": [
     "Rb7+"
    ],
    "comments": [
     "La torre sale de la amenaza con jaque y gana un tiempo: después de que el rey negro se mueva, exf5 gana la torre. En cambio exf5? cxb4 y el final de peones es tablas, y cualquier otra jugada de torre deja escapar la torre negra."
    ]
   },
   {
    "fen": "8/8/8/8/kP6/r1P5/8/K6R w - - 0 1",
    "caption": "Juegan blancas: el rey negro está muy activo y amenaza tus peones. ¿Qué pieza tiene que activarse?",
    "line": [
     "Kb2",
     "Rb3+",
     "Kc2"
    ],
    "comments": [
     "El rey ataca la torre. Kb1? Rxc3 y el negro elimina un peón: tablas.",
     "La mejor defensa del negro: jaque.",
     "El rey sigue atacando la torre y protege c3. El negro tiene que entregar la torre por un peón (Rxb4 cxb4) o perder los dos peones de todos modos: en ambos casos las blancas ganan."
    ]
   },
   {
    "fen": "4k3/7R/4PK2/8/8/8/8/r7 b - - 0 1",
    "caption": "Juegan negras: las blancas amenazan Rh8 mate. ¿Cómo salva la partida tu torre?",
    "line": [
     "Rf1+"
    ],
    "comments": [
     "La torre activa da jaque desde atrás: el rey blanco tiene que dejar f6 y ya no hay mate. Después siguen los jaques. En cambio Kd8? Rh8+ y el peón avanza; y una torre pasiva en la octava no llega a tiempo."
    ]
   }
  ]
 },
 "f2-defensa-lateral": {
  "html": "<h4>Por qué hacen falta tres columnas</h4><p>La distancia de tres columnas no es un capricho. Cuando la torre defensora da jaques laterales, el rey atacante intenta acercarse a ella para que los jaques se terminen. Si la torre está a solo una o dos columnas, el rey la alcanza en una o dos jugadas y la torre tiene que apartarse, perdiendo el control de la fila; entonces el peón avanza con el rey delante. Con tres columnas o más, cada vez que el rey se acerca la torre se aleja dentro de la misma fila y el rey tiene que volver a proteger el peón. En la práctica, si el peón es de alfil o de caballo, el lado largo ofrece cinco columnas o más y la defensa funciona con holgura; con un peón central el margen es menor y el rey defensor debe elegir con cuidado el lado correcto.</p><h4>El rey al lado corto</h4><p>El rey defensor va al lado corto por dos razones: deja libre el lado largo para que la torre tenga distancia, y se mantiene cerca de la casilla de coronación para volver delante del peón si el atacante se descuida. Si el rey se va al lado largo, ocurre lo contrario: tapa a su propia torre, que queda en el lado corto sin espacio para dar jaques. La regla práctica: en cuanto pierdes la posición de Philidor, <b>decide el lado del rey según la columna del peón</b>, no según la comodidad.</p><h4>La defensa frontal y el rey cortado</h4><p>Cuando el rey defensor está cortado a una columna del peón y el peón aún no llegó a la quinta fila, la torre puede defender desde delante: se coloca en la fila de coronación (o en la primera fila del defensor) y vigila el avance. Cada vez que el rey atacante se pone delante del peón, la torre da jaques desde lejos; cuando el peón avanza, el rey defensor gana un tiempo para acercarse. Si el rey defensor está cortado a dos columnas o más, esta defensa casi nunca alcanza.</p><h4>Errores comunes</h4><ul><li>Dar jaques laterales desde una columna cercana: el rey atacante se acerca y la torre se queda sin jaques.</li><li>Llevar el rey al lado largo «para estar más cerca del centro».</li><li>Pasar a la defensa pasiva en la octava fila con el rey atacante en sexta: suele terminar en la posición de Lucena.</li><li>Perder tiempo con la torre cuando el rey atacante amenaza mate en la octava.</li></ul><h4>Cómo pensarlo</h4><ol><li>¿Puedo llegar a la posición de Philidor? Si sí, hazlo.</li><li>Si no: ¿cuál es el lado corto? Mi rey va allí.</li><li>¿Mi torre está a tres columnas o más del peón, en el lado largo?</li><li>Si el atacante amenaza algo concreto, ¿un jaque lateral lo impide?</li></ol>",
  "keyPoints": [
   "Con tres columnas de distancia, la torre se aleja cada vez que el rey se acerca.",
   "El rey al lado corto deja el lado largo libre para la torre."
  ],
  "positions": [
   {
    "fen": "5k2/7R/4K3/4P3/8/8/8/r7 b - - 0 1",
    "orientation": "black",
    "caption": "Rey en el lado corto, torre en el lado largo: los jaques laterales funcionan.",
    "line": [
     "Ra6+",
     "Kf5",
     "Ke8",
     "Rh8+",
     "Kf7",
     "Rh1",
     "Ke7"
    ],
    "comments": [
     "Jaque lateral desde la columna a, a cuatro columnas del peón. El rey blanco tiene que apartarse.",
     "Si el rey se acerca a la torre (Kd5), la torre sigue dando jaques desde lejos.",
     "Con el rey blanco fuera de la sexta, el rey negro vuelve delante del peón.",
     "Jaque, pero sin consecuencias.",
     "El rey sigue cerca del peón.",
     "La torre blanca se aleja.",
     "El rey negro bloquea el peón: tablas."
    ]
   },
   {
    "fen": "3k4/7R/4K3/4P3/8/8/8/r7 b - - 0 1",
    "orientation": "black",
    "caption": "Con el peón todavía en quinta, el jaque lateral inmediato permite volver delante del peón.",
    "line": [
     "Ra6+",
     "Kf5",
     "Ke8",
     "Rg7",
     "Rb6"
    ],
    "comments": [
     "Jaque lateral desde la columna a: el rey blanco tiene que dejar la sexta fila.",
     "El rey blanco se aparta hacia el lado del peón.",
     "El rey negro vuelve delante del peón, a la casilla de coronación.",
     "La torre blanca busca actividad.",
     "La torre negra vuelve a la sexta fila, a distancia: si el rey blanco regresa a e6 o f6, recibe jaques laterales. Tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r5k1/8/4K3/4P3/8/8/8/3R4 b - - 0 1",
    "caption": "Juegan negras: las blancas amenazan Rd8+. Elige bien el lado del rey (dos jugadas).",
    "line": [
     "Kg7",
     "Rd7+",
     "Kg6"
    ],
    "comments": [
     "El rey sale de la octava fila por el lado corto (columnas f, g y h) y deja la torre libre en el lado largo. Ra2? Rd8+ y el rey queda atrapado en la octava fila; Re8+? Kf6 tampoco sirve: el negro pierde.",
     "Jaque en la séptima: las blancas intentan devolver al rey negro a la octava fila.",
     "¡Kg6! El rey se queda en el lado corto y en la sexta fila, desde donde molesta al rey blanco. Kf8? o Kg8? vuelven a la octava: Kf6 y el rey negro queda encerrado."
    ]
   },
   {
    "fen": "5k2/R7/4K3/4P3/8/8/8/7r w - - 0 1",
    "caption": "Juegan blancas: la torre negra está en el lado corto, demasiado cerca del peón. Aprovéchalo.",
    "line": [
     "Ra8+"
    ],
    "comments": [
     "Ra8+ aleja al rey negro de la casilla de coronación (Kg7) y después el rey blanco sube a e7 o d7: la torre negra, a solo tres columnas y en el lado corto, no tiene espacio para dar jaques eficaces y el peón avanza. Ra2? permite que el negro reorganice la defensa."
    ]
   },
   {
    "fen": "5k2/8/3P4/4K3/r7/8/4R3/8 b - - 0 1",
    "caption": "Juegan negras: el peón de d6 avanza con el rey cerca. ¿Qué jugada mantiene las tablas?",
    "line": [
     "Ke8"
    ],
    "comments": [
     "Ke8 coloca el rey frente al peón y cubre d7 y d8. Kf7? Kd5 y d7; Ra1? Kd5 y el peón llega a d7 con el rey detrás: en ambos casos el negro pierde."
    ]
   },
   {
    "fen": "5r2/1R1k4/8/3K4/2P5/8/8/8 b - - 0 1",
    "caption": "Juegan negras: la torre blanca en la séptima molesta. ¿Dónde va el rey?",
    "line": [
     "Kc8"
    ],
    "comments": [
     "Kc8 ataca la torre y se coloca delante del peón. Kd8? Rb8+ y Rxf8, y Ke8? Rb8+ igual: un ensarte en la octava pierde la torre."
    ]
   }
  ]
 },
 "f2-peon-torre-torres": {
  "html": "<h4>Por qué el peón de torre es tan difícil</h4><p>Un peón de caballo, alfil o central se puede ganar con la posición de Lucena: el rey sale de delante del peón protegido por un «puente» de torre. Con el peón de torre esa salida no existe por un lado (está el borde) y por el otro el rey atacante queda lejos de la acción. Además, el rey defensor solo necesita llegar a la zona de coronación, porque el atacante no puede expulsarlo con jaques laterales: el tablero se termina. Por eso los finales de torre y peón de torre contra torre son tablas con mucha más frecuencia que los demás.</p><h4>El escondite del rey y los jaques</h4><p>En la posición típica (peón en séptima, torre atacante delante en la casilla de coronación, torre defensora detrás) el rey atacante intenta acercarse al peón para liberar su torre. Pero si se acerca por la columna b, la torre defensora le da jaques desde el lado o desde atrás; si se esconde en b7, el peón ya no puede avanzar y la torre atacante debe salir, con lo que la torre defensora vuelve a atacar el peón. El defensor no tiene que hacer nada especial: <b>torre detrás del peón, rey en g7 o h7, y jaques cuando el rey atacante se aleja del peón</b>.</p><h4>El peón en sexta y la posición de Vancura</h4><p>Si el peón todavía está en sexta, la defensa cambia. La torre defensora debe atacar el peón <b>de lado</b>, desde la sexta fila (por ejemplo, desde f6 contra un peón en a6), y el rey defensor se queda cerca de g7. Así, si el rey atacante se acerca para proteger el peón, recibe jaques desde atrás; y si el peón avanza a séptima, la torre se coloca detrás de él y estamos en la posición de tablas de la lección. Lo que no debe hacer el defensor es dejar la torre pasiva delante del peón.</p><h4>Con más peones: el peón de torre extra</h4><p>En las partidas reales el caso más frecuente es un peón de torre extra con el resto de los peones en el otro flanco. Aquí el defensor dispone de un plan claro: torre detrás del peón pasado, rey en el flanco del rey, y peones colocados de forma que el rey atacante no tenga refugio. Si el atacante lleva su rey hacia el peón, el defensor activa el suyo contra los peones del otro flanco. Muchas de estas posiciones son tablas aunque el material diga otra cosa.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Defensor: alejar el rey de g7/h7 sin motivo, o poner la torre delante del peón.</li><li>Atacante: no comprobar si la jugada de torre que despeja la casilla de coronación gana la torre rival por un ensarte.</li><li>Atacante: llevar el rey a la columna b esperando ganar sin ver que, con el rey en b7, el peón no puede avanzar.</li></ul><p>Preguntas útiles: ¿dónde está el rey defensor exactamente? ¿Existe un jaque en la séptima que ensarte rey y torre? ¿Puede mi rey esconderse de los jaques sin tapar el peón?</p>",
  "keyPoints": [
   "Con el peón en séptima: torre detrás del peón y rey en g7/h7 (contra peón de a).",
   "Con el peón en sexta: torre atacando de lado desde la sexta fila."
  ],
  "positions": [
   {
    "fen": "8/R7/P4k2/8/8/8/r7/6K1 b - - 0 1",
    "orientation": "black",
    "caption": "Peón en sexta con la torre delante: el rey defensor puede ir hacia el peón.",
    "line": [
     "Ke5",
     "Ra8",
     "Ra1+",
     "Kg2",
     "Kd6",
     "a7",
     "Kc7"
    ],
    "comments": [
     "Con la torre blanca delante del peón, el rey negro no corre peligro de ensarte en la sexta y puede acercarse al peón.",
     "La torre blanca deja libre a7 para el peón.",
     "Jaque intermedio que aleja al rey blanco.",
     "El rey blanco se esconde.",
     "El rey negro sigue hacia b7.",
     "El peón llega a séptima, pero ya no hay truco de ensarte.",
     "El rey ataca la torre de a8 y bloquea la casilla b7: el peón no puede coronar. Tablas."
    ]
   },
   {
    "fen": "R7/5pk1/P5p1/7p/7P/6P1/r4PK1/8 b - - 0 1",
    "orientation": "black",
    "caption": "El caso práctico: peón de torre extra con los demás peones en un flanco.",
    "line": [
     "Ra3",
     "Ra7",
     "Kf6",
     "Kf1",
     "Ra2",
     "f3"
    ],
    "comments": [
     "La torre negra vigila el peón desde atrás y mantiene la tercera fila bajo control.",
     "La torre blanca se coloca en la séptima, protegiendo el peón desde el costado.",
     "El rey negro se activa y vigila los peones del flanco de rey.",
     "El rey blanco intenta acercarse al peón de a.",
     "La torre corta al rey blanco por la segunda fila: no puede cruzar hacia el peón.",
     "Las blancas no tienen un plan claro: si el rey va hacia a7, los peones del flanco de rey quedan solos. El motor lo valora como tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "7R/2k4P/8/8/8/8/7r/1K6 w - - 0 1",
    "caption": "Juegan blancas: el rey negro no está en a7 ni en b7. ¿Cómo lo castigas?",
    "line": [
     "Ra8",
     "Rxh7",
     "Ra7+",
     "Kd6",
     "Rxh7"
    ],
    "comments": [
     "La torre despeja h8 con la amenaza h8=D. Si el negro captura el peón, el rey en la séptima fila queda expuesto a un ensarte.",
     "El negro no tiene nada mejor: si da jaques, el rey blanco se acerca a la torre y el peón corona.",
     "Jaque en la séptima: rey y torre en la misma fila.",
     "El rey se aparta.",
     "La torre negra cae: final ganado."
    ]
   },
   {
    "fen": "R7/P5k1/1K6/8/8/8/8/r7 b - - 0 1",
    "caption": "Juegan negras: el rey blanco amenaza ir a b7 para liberar su torre. Encuentra la defensa (dos jugadas).",
    "line": [
     "Rb1+",
     "Ka5",
     "Ra1+"
    ],
    "comments": [
     "Jaque desde la columna b: el rey blanco no puede llegar a b7. Kf7? Rh8 y Rh7+ ganan; jugadas pasivas de torre permiten Kb7.",
     "El rey blanco se acerca al peón por otro camino.",
     "De nuevo jaque, ahora desde atrás por la columna a. Kf7? o Kf6? perderían por el ensarte con Rh8/Re8. La torre detrás del peón y el rey en g7 sostienen las tablas."
    ]
   },
   {
    "fen": "R7/P7/5k2/8/8/8/r7/2K5 b - - 0 1",
    "caption": "Juegan negras: ¿a qué casilla debe ir el rey?",
    "line": [
     "Kg7"
    ],
    "comments": [
     "Kg7 cubre h7 y h8. Kf7? Rh8 y a8=D; Ke5? Re8+ y a8=D. En g7 (o h7) el rey neutraliza el truco y la torre detrás del peón hace el resto: tablas."
    ]
   },
   {
    "fen": "R2k4/P7/8/8/8/8/r7/2K5 b - - 0 1",
    "caption": "Juegan negras: el rey negro está cerca del peón. ¿Cómo lo aprovechas?",
    "line": [
     "Kc7"
    ],
    "comments": [
     "El rey va hacia b7: desde allí atacará la torre de a8 y bloqueará el peón. Ke7? se aleja y el atacante gana con la maniobra de la torre (Rh8 y a8=D)."
    ]
   }
  ]
 },
 "f2-torre-dos-peones": {
  "html": "<h4>Cómo avanzan dos peones unidos</h4><p>Dos peones unidos son más fuertes cuando están <b>uno al lado del otro</b>: controlan cuatro casillas por delante y ninguna pieza puede bloquearlos con comodidad. Cuando hay que avanzar, se adelanta uno y el otro lo alcanza en la jugada siguiente, de modo que el de delante siempre está protegido. El rey camina delante o al lado de los peones para protegerlos de los jaques y para ocupar las casillas por las que pasarán. La torre, mientras tanto, corta al rey rival en una columna o en una fila; si no lo corta, el rey defensor se coloca delante de los peones y la tarea se complica.</p><h4>Esconder el rey de los jaques</h4><p>La torre defensora casi nunca puede detener dos peones unidos por sí sola, así que su recurso principal son los jaques. Por eso el atacante debe prever dónde se esconderá su rey: detrás de los peones, o delante de ellos si la torre rival da jaques desde atrás. Un recurso muy útil es interponer la torre propia, cuando la torre rival da jaque desde una fila, se tapa con la torre y se ofrece el cambio. Cambiar las torres con dos peones de ventaja deja un final de peones trivialmente ganado.</p><h4>Entregar un peón para ganar</h4><p>A veces lo más sencillo es devolver uno de los peones. Si con ello se llega a una posición de Lucena, o a un final de peones ganado, no hay ninguna razón para conservarlo. Lo mismo ocurre con dos peones separados: el atacante puede sacrificar uno para desviar al rey o a la torre rival y coronar el otro. Lo importante es saber a qué final teórico se llega después del sacrificio.</p><h4>Las excepciones, con más detalle</h4><p>Los peones de <b>f y h</b> son famosos por sus tablas: el rey defensor se coloca delante del peón de h y la torre da jaques; si el atacante avanza el peón de f, deja casillas débiles para el rey. Los <b>peones doblados</b> casi siempre equivalen a un solo peón. Y con <b>un peón de torre y otro de caballo</b> en el mismo flanco, también hay muchas posiciones de tablas si el rey defensor está delante. Fuera de estos casos, dos peones de ventaja deben ganar, y el defensor necesita algo concreto: un rey atacante encerrado, una torre atacante pasiva o jaques que no terminan.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Avanzar un peón solo, lejos del otro, y dejarlo a merced de la torre rival.</li><li>Dejar al rey sin refugio contra los jaques.</li><li>Rechazar un cambio de torres que deja un final de peones ganado.</li></ul><p>Antes de mover: ¿mis peones quedan protegidos? ¿El rey rival sigue cortado? ¿Dónde se esconderá mi rey de los jaques? ¿Puedo forzar el cambio de torres?</p>",
  "keyPoints": [
   "Los peones unidos avanzan de a uno y el otro lo alcanza enseguida.",
   "Interponer la torre y forzar el cambio suele ser la forma más simple de ganar.",
   "Devolver un peón está bien si lleva a un final teórico ganado."
  ],
  "positions": [
   {
    "fen": "8/8/4k3/8/3PP3/3K4/r7/7R w - - 0 1",
    "orientation": "white",
    "caption": "Técnica con peones unidos: cortar, avanzar juntos y esconder el rey.",
    "line": [
     "Rh6+",
     "Ke7",
     "d5",
     "Rg2",
     "Kd4",
     "Rg4",
     "d6+"
    ],
    "comments": [
     "Jaque que empuja al rey negro a la séptima: ahora queda detrás de los peones.",
     "El rey se queda cerca de los peones.",
     "El peón avanza protegido por su compañero.",
     "La torre negra busca jaques desde atrás.",
     "El rey protege el peón de e4 y se coloca delante de los jaques.",
     "La torre negra ataca el peón de e4.",
     "El peón de d avanza con jaque: los peones ganan terreno juntos y la torre negra no puede detenerlos."
    ]
   },
   {
    "fen": "8/8/3k3r/R7/6P1/1K5P/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Atención a la geometría: rey y torre en la misma línea.",
    "line": [
     "Ra6+",
     "Kd5",
     "Rxh6"
    ],
    "comments": [
     "Jaque en la sexta, la fila donde está la torre negra.",
     "El rey tiene que apartarse.",
     "Ensarte: la torre negra cae y queda un final de torre y dos peones contra rey."
    ]
   }
  ],
  "drills": [
   {
    "fen": "5r2/6R1/5PPk/8/8/8/4K3/8 w - - 0 1",
    "caption": "Juegan blancas: dos peones unidos en sexta. ¿Cómo los llevas a coronar?",
    "line": [
     "Rf7",
     "Re8+",
     "Re7",
     "Ra8",
     "g7"
    ],
    "comments": [
     "La torre protege el peón de f6 desde atrás y deja libre g7 para el otro peón. Otras jugadas, como Rc7, permiten que el negro se reorganice y el motor lo valora como tablas.",
     "El negro empieza con jaques.",
     "¡Interponer la torre! Ofrece el cambio y corta los jaques. Si Rxe7, fxe7 y un peón corona.",
     "La torre negra se va para evitar el cambio.",
     "El peón de g avanza protegido por el de f: la coronación es inminente."
    ]
   },
   {
    "fen": "3R4/8/8/1PP5/2r2K2/8/k7/8 w - - 0 1",
    "caption": "Juegan blancas: los peones están atacados. Busca el camino más simple.",
    "line": [
     "Ke5",
     "Rxc5+",
     "Rd5"
    ],
    "comments": [
     "El rey se acerca a los peones y entrega el de c5 a cambio de algo mejor.",
     "El negro captura con jaque.",
     "¡Interposición! La torre se ofrece: si Rxd5, Kxd5 y el peón de b corona; si la torre negra se aparta, el peón de b avanza con apoyo."
    ]
   },
   {
    "fen": "4R3/8/8/3r1PP1/5k2/8/5K2/8 w - - 0 1",
    "caption": "Juegan blancas: el rey negro ataca tus peones. ¿Cuál debes entregar?",
    "line": [
     "g6"
    ],
    "comments": [
     "El peón de g avanza y deja caer el de f: lo importante es que el de g quede lejos del rey negro y apoyado por la torre desde g8. Si Kxf5, g7 y el peón corona; si Rd2+, el rey blanco se aparta (Kf1) y la amenaza g7 sigue en pie. f6? o Rg8? permiten que el negro se defienda."
    ]
   },
   {
    "fen": "8/8/8/8/PP6/8/rk6/5K1R w - - 0 1",
    "caption": "Juegan blancas: la torre negra ataca tu peón de a4. ¿Hay algo mejor que defenderlo?",
    "line": [
     "Rh2+",
     "Kc3",
     "Rxa2"
    ],
    "comments": [
     "Jaque en la segunda fila, donde está la torre negra.",
     "El rey tiene que apartarse.",
     "Ensarte: con la torre negra fuera, los dos peones coronan sin problemas."
    ]
   }
  ]
 },
 "f2-caballo-peones": {
  "html": "<h4>Contar saltos con precisión</h4><p>La distancia de caballo no se parece a la del rey. Algunas referencias que conviene memorizar: dos casillas en línea recta (de c3 a c5) o tres en diagonal (de c3 a f6) están a <b>dos</b> saltos; la casilla vecina en diagonal (de c3 a d4) también está a dos, salvo en la esquina: del rincón a1 a b2 hacen falta <b>cuatro</b> saltos; la casilla vecina en la misma fila o columna (de c3 a d3) está a <b>tres</b>; y, curiosamente, dos casillas en diagonal (de c3 a e5) están a <b>cuatro</b>. Esto explica por qué el caballo es tan torpe en los bordes. Antes de confiar en que tu caballo llega a tiempo, cuenta los saltos hasta una casilla desde la que controle la casilla de coronación, y compáralos con las jugadas que le faltan al peón.</p><h4>Controlar o bloquear</h4><p>El caballo puede detener un peón de dos formas: <b>controlando</b> una casilla por la que el peón tiene que pasar, o <b>bloqueándolo</b>, colocándose delante. Bloquear es lo más seguro, porque el peón ya no avanza aunque el rey rival lo apoye; pero si el rey rival ataca al caballo bloqueador, este tiene que irse y conviene que tenga otra casilla desde la que siga vigilando. Controlar la casilla de coronación desde lejos es más flexible, aunque el caballo puede ser expulsado. Un recurso clave son los <b>jaques</b>: un salto con jaque gana un tiempo y a menudo permite al caballo llegar a una casilla que, contando de forma normal, estaba fuera de alcance.</p><h4>El caballo contra dos peones</h4><p>Contra dos peones unidos y avanzados, el caballo solo casi siempre pierde: cuando bloquea uno, el otro avanza protegido. Contra peones separados, depende de si el rey propio puede ocuparse de uno mientras el caballo frena al otro. Un buen principio: el caballo se encarga del peón más lejano del rey propio, y el rey del más cercano.</p><h4>El bando de los peones</h4><p>Si tienes el peón, busca las debilidades del caballo y recuerda que cada jugada de rey que le quita una casilla vale tanto como un avance del peón: llévalo al borde, avanza el peón de torre, y usa el rey para quitarle al caballo las casillas desde las que vigila la coronación. Con el peón en séptima y el rey cerca, un caballo que controla la casilla de coronación desde una sola casilla puede ser expulsado con una jugada de rey.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Mover el caballo hacia el peón en línea recta: a veces el camino más corto es el que parece más largo.</li><li>Olvidar los jaques que ganan tiempo.</li><li>Dejar que el rey rival expulse al caballo de la única casilla que controla la coronación.</li></ul><p>Preguntas: ¿cuántas jugadas le faltan al peón? ¿Cuántos saltos necesito para controlar una casilla de su camino? ¿Puedo ganar un tiempo con un jaque? ¿Qué hace el rey rival cuando llego?</p>",
  "keyPoints": [
   "Cuenta saltos: de a1 a b2, o de c3 a e5, hacen falta cuatro.",
   "Un jaque de caballo gana el tiempo que faltaba.",
   "Bloquear es más seguro que controlar desde lejos."
  ],
  "positions": [
   {
    "fen": "8/8/4K3/8/4k3/p4N2/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "El caballo bloquea un peón de torre justo a tiempo.",
    "line": [
     "Ne1",
     "a2",
     "Nc2",
     "Kd3",
     "Nb4+",
     "Ke4",
     "Nxa2"
    ],
    "comments": [
     "El caballo va hacia c2, la casilla desde la que controla a1. Nd2+? pierde un tiempo y el peón corre.",
     "El peón llega a séptima.",
     "Desde c2 el caballo vigila a1.",
     "El rey negro ataca al caballo.",
     "¡Jaque! Na1? sería un error: el rey negro lo encerraría con Kc2 y Kb2, y el peón coronaría. El salto con jaque gana el tiempo necesario.",
     "El rey tiene que apartarse.",
     "El caballo captura el peón: tablas."
    ]
   },
   {
    "fen": "8/3K4/8/8/8/6k1/3p2N1/8 w - - 0 1",
    "orientation": "white",
    "caption": "Bloquear delante del peón es lo más seguro.",
    "line": [
     "Ne3",
     "Kf3",
     "Nd1"
    ],
    "comments": [
     "El caballo controla d1, la casilla de coronación.",
     "El rey negro ataca al caballo.",
     "El caballo bloquea el peón en la casilla de coronación: si el rey negro lo rodea, el rey blanco ya está en camino."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/8/8/7K/3p1kN1/8/8 w - - 0 1",
    "caption": "Juegan blancas: el peón de d3 está a dos pasos de coronar. Encuentra la ruta del caballo (tres jugadas).",
    "line": [
     "Nf1",
     "Ke2",
     "Ng3+",
     "Ke1",
     "Ne4"
    ],
    "comments": [
     "El caballo vigila d2 desde f1. Nf5? o Nh5? no llegan a controlar d2 a tiempo.",
     "El rey negro ataca al caballo.",
     "¡Jaque que gana un tiempo! El caballo vuelve con tempo.",
     "El rey se aparta.",
     "Desde e4 el caballo controla d2: el peón no puede avanzar sin perderse."
    ]
   },
   {
    "fen": "8/8/8/8/1K1N4/8/5p2/4k3 w - - 0 1",
    "caption": "Juegan blancas: el peón de f2 está a punto de coronar. ¿Puede el caballo detenerlo?",
    "line": [
     "Nf3+",
     "Ke2",
     "Nh2"
    ],
    "comments": [
     "Jaque: el rey negro tiene que moverse y el peón no corona todavía.",
     "El rey protege la casilla f1.",
     "El caballo controla f1 desde h2. Si el rey ataca el caballo, este puede saltar a g4 o volver a vigilar f2: el rey blanco llega a tiempo."
    ]
   },
   {
    "fen": "8/8/1k6/8/5N2/p7/8/6K1 w - - 0 1",
    "caption": "Juegan blancas: el peón de torre está lejos de tu caballo. ¿Llega a tiempo? (cuatro jugadas)",
    "line": [
     "Nd5+",
     "Kb5",
     "Nc3+",
     "Kb4",
     "Na2+",
     "Kb3",
     "Nc1+"
    ],
    "comments": [
     "Jaque: el caballo gana un tiempo y se acerca a b4 o c3.",
     "El rey se acerca al peón.",
     "Otro jaque, y ahora el caballo controla a2 y b1.",
     "El rey sigue persiguiendo al caballo.",
     "El caballo se coloca delante del peón con jaque.",
     "El rey ataca al caballo.",
     "El caballo escapa con jaque y sigue vigilando a2: el peón no avanza y el rey blanco se acerca."
    ]
   },
   {
    "fen": "8/8/2k5/8/8/p6K/5N2/8 w - - 0 1",
    "caption": "Juegan blancas: el peón de a3 avanza. Encuentra la casilla correcta para el caballo.",
    "line": [
     "Nd3",
     "Kb5",
     "Nc1"
    ],
    "comments": [
     "El caballo se dirige a c1 o b4. Kg4? llega demasiado tarde.",
     "El rey negro va a apoyar el peón.",
     "Desde c1 el caballo controla a2 y b3: el peón no puede avanzar sin perderse."
    ]
   }
  ]
 },
 "f2-alfil-caballo": {
  "html": "<h4>Juego en dos flancos: la gran baza del alfil</h4><p>La ventaja más concreta del alfil es la distancia. Cuando hay peones en los dos flancos, el bando del alfil puede atacar en uno mientras su pieza vigila el otro desde lejos. El caballo, en cambio, tiene que elegir: si va a defender un flanco, abandona el otro. El plan típico del alfil es crear un <b>peón pasado</b> (a ser posible alejado) para desviar al rey o al caballo rival, y entonces entrar con el rey por el lado contrario. Un peón pasado alejado contra un caballo es especialmente fuerte, porque el caballo necesita muchas jugadas para cambiar de flanco.</p><h4>Dominación: cuando el caballo no tiene casillas</h4><p>En el borde, o en posiciones con peones fijos, el caballo puede quedarse sin casillas seguras. El alfil, desde lejos, controla todas las casillas a las que el caballo podría saltar: es la <b>dominación</b>. Si además el rey se acerca, el caballo se pierde. Para el defensor, la lección es clara: un caballo en el borde, lejos de su rey, es un candidato a quedar atrapado. Para el atacante, vale la pena preguntarse en cada jugada qué casillas le quedan al caballo rival.</p><h4>El caballo y las casillas fuertes</h4><p>El caballo brilla cuando tiene una casilla central que no puede ser atacada por peones, y cuando los peones rivales están fijos en el color del alfil. Desde su casilla fuerte ataca peones que el alfil no puede defender sin quedarse pasivo, y el rey propio entra por las casillas del color que el alfil no controla. El plan con caballo contra alfil malo es casi siempre el mismo: fijar los peones rivales en el color del alfil, cambiar las piezas pesadas y llevar el rey a las casillas débiles.</p><h4>Tiempos y zugzwang</h4><p>El alfil puede hacer jugadas de espera sin cambiar lo que controla, moviéndose sobre la misma diagonal; el caballo no puede perder un tiempo, porque cada salto cambia el color de su casilla y todas las casillas que domina. En finales de rey, alfil y peones contra rey, caballo y peones, esto decide a menudo: el bando del alfil coloca su rey en la mejor casilla, hace una jugada de espera y el rival, sin jugadas útiles, tiene que ceder terreno.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Colocar los propios peones en casillas del color del alfil: lo vuelve malo y le da objetivos al caballo.</li><li>Mandar el caballo a una aventura en el borde, lejos de su rey.</li><li>Cambiar piezas sin preguntarse si el final que queda favorece al alfil o al caballo.</li><li>Con el alfil, cerrar la posición con peones en un solo flanco.</li></ul><p>Antes de decidir un plan: ¿hay peones en los dos flancos? ¿Mis peones están en el color de mi alfil? ¿Tiene el caballo una casilla fuerte? ¿Puedo crear un peón pasado alejado? ¿Quién tiene más jugadas de espera?</p>",
  "keyPoints": [
   "El alfil vigila un flanco desde lejos mientras el rey ataca en el otro.",
   "Un caballo en el borde puede quedar dominado por el alfil.",
   "El alfil puede perder un tiempo; el caballo no."
  ],
  "positions": [
   {
    "fen": "8/8/1b2k3/p1p1p3/PKP1P3/5N2/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Caballo contra alfil malo: el rey entra por las casillas que el alfil no controla.",
    "line": [
     "Kb5",
     "Bd8",
     "Kxc5",
     "Be7+",
     "Kc6",
     "Bb4",
     "c5"
    ],
    "comments": [
     "El rey ataca el peón de c5 por b5, una casilla blanca que el alfil de casillas negras nunca podrá disputar.",
     "El alfil intenta defender desde atrás.",
     "Cae el primer peón: los peones negros, fijos en casillas negras, eran objetivos indefendibles.",
     "Jaque desde atrás.",
     "El rey sigue avanzando por las casillas blancas.",
     "El alfil ataca el peón de a4.",
     "El peón de c avanza y se convierte en pasado: la ventaja blanca es decisiva."
    ]
   },
   {
    "fen": "B7/4k2p/6p1/n7/8/2K3P1/7P/8 w - - 0 1",
    "orientation": "white",
    "caption": "Dominación: un caballo en el borde sin casillas seguras.",
    "line": [
     "Kb4",
     "Kd6",
     "Kxa5"
    ],
    "comments": [
     "El caballo de a5 tiene cuatro casillas: b3 y c4 las controla ahora el rey, y b7 y c6 el alfil de a8. No puede moverse sin perderse.",
     "El rey negro llega demasiado tarde para ayudar.",
     "Cae el caballo: alfil y peones contra peones, final ganado."
    ]
   }
  ],
  "drills": [
   {
    "fen": "B7/5k1p/6p1/n7/8/8/2K3PP/8 w - - 0 1",
    "caption": "Juegan blancas: el caballo negro está en el borde. ¿Puedes atraparlo?",
    "line": [
     "Kc3",
     "g5",
     "Kb4"
    ],
    "comments": [
     "El rey quita b3 y c4, y el alfil de a8 ya controla b7 y c6: el caballo no tiene ninguna casilla. Bd5+? o Kd3? le dan tiempo al caballo para salir por c6 o c4.",
     "El negro no puede salvar el caballo e intenta crear contrajuego en el flanco de rey (Ke6 tampoco ayuda).",
     "El rey ataca el caballo, que sigue sin casillas: en la jugada siguiente cae. El alfil detendrá los peones negros y el final está ganado."
    ]
   },
   {
    "fen": "8/8/2b1k3/1p1p1p2/1PKP1P2/4N3/8/8 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil malo. ¿Por dónde entra el rey?",
    "line": [
     "Kc5"
    ],
    "comments": [
     "Kc5 entra por una casilla negra que el alfil no puede controlar y ataca b5 y d5 a la vez. Los peones negros, fijos en casillas blancas, son objetivos permanentes. Kd3? o Kc3? dejan escapar la oportunidad: el rey negro se reorganiza."
    ]
   },
   {
    "fen": "8/p4k2/6p1/8/2n2PK1/8/P5B1/8 w - - 0 1",
    "caption": "Juegan blancas: el caballo negro está lejos de su rey. Aprovecha el alcance del alfil.",
    "line": [
     "Bd5+",
     "Ke7",
     "Bxc4"
    ],
    "comments": [
     "Jaque doble del alfil: ataca al rey y al caballo de c4 a la vez. Otras jugadas, como Kf3, dejan que el caballo vuelva junto a su rey.",
     "El rey tiene que moverse y no puede proteger el caballo.",
     "El alfil captura el caballo. Un caballo lejos de su rey es vulnerable ante una pieza de largo alcance; ahora el final de alfil contra peones está ganado."
    ]
   },
   {
    "fen": "8/3k4/5K2/1p1p1p2/pP1P1P2/P3b3/8/2N5 w - - 0 1",
    "caption": "Juegan blancas: los peones negros están fijos. ¿Qué ruta debe seguir el caballo?",
    "line": [
     "Ne2",
     "Bf2",
     "Kxf5"
    ],
    "comments": [
     "Ne2 ataca el alfil y se dirige a c3, desde donde atacará b5 y d5. Nd3? permite que el alfil se coloque mejor y la presión se diluye.",
     "El alfil se aparta y vigila d4.",
     "El rey captura el peón de f5: los peones negros fijos en casillas blancas no pueden ser defendidos por el alfil de casillas negras. Después el rey seguirá hacia e5 y el caballo hacia c3. Ke5? es menos preciso."
    ]
   }
  ]
 },
 "f2-centurini": {
  "html": "<h4>Contar las casillas de las diagonales</h4><p>Todo este final gira alrededor de la casilla que está justo delante del peón (o de la casilla de coronación, si el peón ya está en séptima). Por esa casilla pasan dos diagonales del color de los alfiles. El alfil defensor necesita controlarla desde alguna de las dos. Si una de esas diagonales es muy corta, por ejemplo de dos casillas, el atacante puede quitársela con el rey o con el alfil y obligar al defensor a usar la otra; entonces interpone su alfil en la otra diagonal y el defensor se queda sin ninguna. Si las dos diagonales son suficientemente largas, el alfil defensor siempre encuentra una casilla lejos del rey atacante y la posición es tablas.</p><h4>La maniobra típica del atacante</h4><p>El plan ganador tiene dos fases. Primero, el rey atacante se coloca de forma que proteja una casilla de la diagonal larga del defensor. Después, el alfil atacante se interpone en esa casilla: si el alfil defensor lo captura, el rey recaptura y el peón avanza; si no lo captura, tiene que irse a la diagonal corta. Segundo, el alfil atacante llega a la diagonal corta con tempo, atacando al alfil defensor o cortándola, y el peón corona. El orden de las jugadas es todo: si el alfil atacante llega a la diagonal corta antes de tiempo, el defensor vuelve a la larga.</p><h4>El rey defensor, siempre hacia delante del peón</h4><p>Para el defensor la regla principal es sencilla: el rey debe correr hacia las casillas que están delante del peón. Si llega, el alfil atacante no puede expulsarlo y el final es tablas. Si el rey defensor está cerca pero no delante, todavía puede ayudar: quitándole al rey atacante las casillas desde las que protege su alfil interpuesto. Por eso el atacante debe actuar rápido, antes de que el rey defensor llegue.</p><h4>El peón de torre</h4><p>Con un peón de torre la casilla de coronación está en una sola diagonal. Si los alfiles son de otro color que esa casilla, el atacante tiene el «alfil equivocado»: si el rey defensor llega a la esquina, es tablas pase lo que pase con los alfiles. Si son del mismo color que la casilla de coronación, el alfil defensor solo dispone de esa diagonal, y el atacante puede intentar cortarla con su propio alfil. En cualquier caso, el defensor debe tener siempre presente su recurso final: <b>entregar el alfil por el peón</b> cuando eso deja un final sin peones.</p><h4>Cómo pensarlo</h4><ol><li>¿Cuál es la casilla crítica delante del peón? ¿Qué dos diagonales pasan por ella?</li><li>¿Cuántas casillas tiene cada diagonal? ¿Cuál es la corta?</li><li>Atacante: ¿mi rey protege una casilla de interposición en la diagonal larga?</li><li>Defensor: ¿llega mi rey delante del peón? Si no, ¿puedo molestar al rey atacante?</li></ol>",
  "keyPoints": [
   "Cuenta las dos diagonales que pasan por la casilla delante del peón.",
   "El atacante primero interpone en la diagonal larga y luego desvía de la corta."
  ],
  "positions": [
   {
    "fen": "2k5/8/8/1PK5/8/8/3B4/6b1 w - - 0 1",
    "orientation": "white",
    "caption": "El rey defensor está cerca del peón: entregar el alfil asegura las tablas.",
    "line": [
     "Kc6",
     "Kb8",
     "Ba5",
     "Ka7",
     "b6+",
     "Bxb6",
     "Bxb6+"
    ],
    "comments": [
     "El rey blanco intenta apoyar el peón.",
     "El rey negro se coloca delante del peón.",
     "El alfil intenta preparar b6.",
     "El rey defensor vigila b6 y b7.",
     "El peón avanza con jaque.",
     "El negro entrega el alfil por el peón: es el recurso de las tablas cuando el rey defensor está cerca.",
     "Sin peones, el alfil solo no puede ganar: tablas."
    ]
   },
   {
    "fen": "8/3K4/1P6/2k5/4b3/8/8/5B2 w - - 0 1",
    "orientation": "white",
    "caption": "La maniobra ganadora: rey en c7 e interposición del alfil en la diagonal larga.",
    "line": [
     "Kc7",
     "Ba8",
     "Ba6",
     "Bf3",
     "Bb7"
    ],
    "comments": [
     "El rey protege b7 y b8 y prepara la interposición. El alfil negro controla b7 desde la diagonal larga.",
     "El alfil negro se refugia en a8, en la misma diagonal.",
     "El alfil blanco se dirige a b7.",
     "El alfil negro sigue en la diagonal larga.",
     "Interposición en b7, protegida por el rey: si el alfil negro captura, el rey recaptura y el peón avanza. El alfil negro ya no puede impedir b7 y b8."
    ]
   }
  ],
  "drills": [
   {
    "fen": "5B2/8/8/7P/8/2k4K/8/2b5 w - - 0 1",
    "caption": "Juegan blancas: el rey negro corre hacia el peón. ¿Gana tu rey la carrera? (dos jugadas)",
    "line": [
     "Kg4",
     "Kd4",
     "Kf5"
    ],
    "comments": [
     "El rey se acerca al peón. Bg7+? o h6? permiten que el negro entregue el alfil o llegue a tiempo con el rey.",
     "El rey negro se acerca.",
     "El rey blanco apoya el peón y le quita al rey negro las casillas e5 y e6: el peón avanzará con el apoyo de rey y alfil."
    ]
   },
   {
    "fen": "8/8/4K3/k1P5/8/8/B7/7b w - - 0 1",
    "caption": "Juegan blancas: alfiles del mismo color. Busca la forma más simple de ganar.",
    "line": [
     "Bd5"
    ],
    "comments": [
     "El alfil se ofrece en d5, protegido por el rey, y corta la diagonal larga del alfil negro. Si Bxd5+, Kxd5 y el final de rey y peón está ganado; si el negro evita el cambio (Kb5), Kd6 o c6 y el peón avanza. Kd6? permite que el alfil negro se coloque en la diagonal larga y es tablas."
    ]
   },
   {
    "fen": "8/3B2K1/8/3k1P2/6b1/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: el alfil negro ataca tu peón. ¿Cómo coronas?",
    "line": [
     "f6",
     "Bxd7",
     "f7"
    ],
    "comments": [
     "¡El peón avanza y deja el alfil! Si el negro captura el alfil, el peón corona; si captura el peón... ya no puede. Bc8? o Kg6? permiten Bxf5.",
     "El negro captura el alfil.",
     "El alfil negro está en d7, en la otra diagonal: no controla f8 y el peón corona."
    ]
   },
   {
    "fen": "8/8/KP6/8/8/8/8/3kB1b1 w - - 0 1",
    "caption": "Juegan blancas: el rey negro ataca tu alfil. ¿Qué es más importante?",
    "line": [
     "b7",
     "Kxe1",
     "b8=Q"
    ],
    "comments": [
     "El peón avanza: el alfil negro de g1 no controla b8 (está en la diagonal a7-g1). Ba5? defiende el alfil, pero el negro lleva su alfil a la diagonal h2-b8 y es tablas.",
     "El negro captura el alfil, pero no puede detener el peón.",
     "Corona: dama contra alfil, final ganado."
    ]
   }
  ]
 },
 "f2-fortaleza": {
  "html": "<h4>Cómo reconocer una fortaleza a tiempo</h4><p>Las fortalezas no aparecen solas: hay que verlas venir varias jugadas antes, cuando todavía se puede elegir qué peones cambiar y dónde colocar el rey. Una buena costumbre en posiciones inferiores es preguntarse: «si se cambian las piezas que el rival quiere cambiar, ¿qué queda?». Si la respuesta es un final con peón de torre y alfil del color equivocado, un bloqueo total o una pieza sin objetivos, vale la pena dirigir la partida hacia allí aunque cueste material.</p><h4>Entregar material para levantar la muralla</h4><p>Muchas fortalezas se consiguen con un sacrificio. Entregar una pieza por los últimos peones del rival, o dar la calidad para eliminar la pieza que podía romper, convierte un final perdido en uno sin posibilidades de victoria para el contrario. El criterio es frío: no importa cuánto material quede en el tablero, sino si el rival puede crear un peón pasado o atacar algo. Un ejemplo típico: un rey en la esquina contra un peón de torre y un alfil que no controla la casilla de coronación; cualquier cantidad de jugadas no cambia nada.</p><h4>Fortalezas con piezas</h4><p>No todas las fortalezas son de peones. Una torre puede sostener tablas contra una dama si se apoya en un peón y el rey defensor no puede ser atacado desde atrás; un alfil puede bloquear un peón pasado en una casilla que el rey rival no alcanza; dos peones unidos protegidos por el rey pueden frenar a una torre. Lo común en todos los casos es que las piezas del defensor se protegen entre sí, no dejan objetivos sueltos y el rey atacante no encuentra una casilla de entrada.</p><h4>Cómo se rompe una fortaleza</h4><p>El bando fuerte tiene tres herramientas: <b>zugzwang</b> (obligar al defensor a mover algo que no quería mover), <b>rupturas de peón</b> (abrir una línea de entrada aunque cueste un peón) y <b>sacrificios de pieza</b> (devolver material para conseguir un peón pasado). Si ninguna funciona, la fortaleza resiste. Por eso el defensor debe mantener siempre una jugada neutral disponible, normalmente con el rey o con una pieza que va y viene, y no mover peones sin necesidad: cada peón que avanza puede regalar una ruptura.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Defensor: abrir la posición con un peón «para tener juego», regalando una línea de entrada.</li><li>Defensor: alejar el rey de la casilla clave por un objetivo menor.</li><li>Atacante: cambiar los peones equivocados y quedarse con un peón de torre y el alfil del color equivocado.</li><li>Atacante: cerrar la posición cuando tiene una pieza de más.</li></ul><p>Preguntas: ¿tiene el rival un peón pasado posible? ¿Hay una casilla por la que su rey pueda entrar? ¿Me queda siempre una jugada neutral? ¿Qué cambio me deja una fortaleza?</p>",
  "keyPoints": [
   "Las fortalezas se planifican antes del cambio decisivo, no después.",
   "Entregar material para eliminar el último peón o la pieza que rompe suele valer la pena.",
   "Contra una fortaleza: zugzwang, rupturas o sacrificios."
  ],
  "positions": [
   {
    "fen": "8/4k3/8/3P1P2/4K3/8/2B5/6b1 w - - 0 1",
    "orientation": "white",
    "caption": "Alfiles de distinto color: dos peones de ventaja que no ganan.",
    "line": [
     "Kd3",
     "Bb6",
     "Kc4",
     "Bc7",
     "Kb5",
     "Bd6"
    ],
    "comments": [
     "El rey blanco busca un camino hacia la casilla de coronación de uno de los peones.",
     "El alfil negro se coloca en la diagonal a5-d8 para vigilar d8.",
     "El rey sigue su camino por el flanco de dama.",
     "El alfil sigue controlando las casillas críticas del color oscuro.",
     "El rey blanco se acerca a c6.",
     "El alfil se coloca en d6 y, junto con el rey en e7, bloquea los dos peones: el alfil blanco no puede disputar las casillas oscuras. Fortaleza."
    ]
   },
   {
    "fen": "8/6k1/6p1/5r2/8/8/8/3Q2K1 w - - 0 1",
    "orientation": "white",
    "caption": "Una fortaleza con piezas: torre y peón contra dama.",
    "line": [
     "Qd4+",
     "Kg8",
     "Kh2",
     "Kh7"
    ],
    "comments": [
     "La dama da jaque, pero el rey negro tiene refugio.",
     "El rey se queda junto a su peón.",
     "Las blancas acercan el rey, pero no hay casillas de entrada: la torre en f5, protegida por el peón de g6, corta la quinta fila.",
     "El negro solo necesita mover el rey entre g7, g8 y h7 sin soltar la torre: el motor lo valora como tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/5k2/8/8/4K3/5B1P/6n1 b - - 0 1",
    "caption": "Juegan negras: tu caballo está en apuros. ¿Cómo salvas la partida?",
    "line": [
     "Nh3"
    ],
    "comments": [
     "El caballo escapa por h3 con la idea de entregarse por el peón de h (por ejemplo con Ng5+ y Nf3). Con un rey contra rey y alfil, el resultado es tablas. Kg5? o Kg6? permiten Bxg1 y el peón de h, con el rey blanco cerca, gana."
    ]
   },
   {
    "fen": "8/8/8/8/P4k2/8/3B4/4K3 b - - 0 1",
    "caption": "Juegan negras: peón de torre y alfil del color equivocado. ¿Dónde está la salvación?",
    "line": [
     "Ke5",
     "a5",
     "Kd6"
    ],
    "comments": [
     "El rey corre hacia a8 por el camino más corto: d6, c7, b8. El alfil de casillas negras no controla a8, así que si el rey llega a la esquina es tablas. Ke4? pierde un tiempo decisivo y Kf5? se aleja.",
     "El peón avanza.",
     "El rey sigue hacia c7. Kd5? llega tarde: el peón avanza a a6 y a7 y el rey ya no alcanza la esquina. Desde c7 el rey negro llega a b8 o b7 y la fortaleza está asegurada."
    ]
   },
   {
    "fen": "8/8/3k4/6K1/7P/8/8/8 b - - 0 1",
    "caption": "Juegan negras: peón de torre. ¿Hacia dónde va el rey?",
    "line": [
     "Ke7",
     "Kg6",
     "Kf8",
     "Kf6",
     "Kg8"
    ],
    "comments": [
     "El rey se dirige a f8: desde la columna del alfil vuelve a la esquina o encierra al rey blanco. Ke6? o Ke5? permiten Kg6 y el peón avanza con el rey blanco controlando g7 y g8.",
     "El rey blanco ocupa g6 para controlar g7 y g8.",
     "¡Kf8! El rey se queda en la columna del alfil, enfrente del rey blanco. Ke8? Kg7 y el peón corre.",
     "El rey blanco intenta otra vez.",
     "El rey negro vuelve a g8: el rey blanco no puede expulsarlo de la zona de la esquina. Ke8? Kg7 y el peón corona. Fortaleza: tablas."
    ]
   },
   {
    "fen": "8/8/8/6pk/6P1/7P/5K2/8 b - - 0 1",
    "caption": "Juegan negras: encuentra la casilla donde tu rey es inexpugnable.",
    "line": [
     "Kh4"
    ],
    "comments": [
     "Kh4 bloquea los peones: el rey negro ataca h3 y el rey blanco tiene que quedarse defendiéndolo. Nadie puede progresar: fortaleza. Kg6? deja entrar al rey blanco y las blancas ganan el peón de g5."
    ]
   }
  ]
 },
 "f2-zugzwang": {
  "html": "<h4>Casillas correspondientes</h4><p>La oposición es el caso más sencillo de una idea más general: las <b>casillas correspondientes</b>. En muchos finales de reyes y peones, a cada casilla de un rey le corresponde una casilla del otro: si el defensor ocupa la casilla correspondiente cada vez que el atacante mueve, aguanta; si llega tarde una sola vez, pierde. El método para encontrarlas es empezar por las casillas que se disputan (las que permiten entrar o capturar un peón) y retroceder: «si mi rey está aquí, ¿dónde debe estar el suyo para frenarme?». Con práctica se ve que esas parejas forman un dibujo regular.</p><h4>Triangulación, paso a paso</h4><p>Si los reyes están en una posición de zugzwang recíproco pero te toca mover a ti, necesitas perder un tiempo. El rey atacante lo consigue con un triángulo: tres jugadas por casillas vecinas que vuelven al punto de partida, mientras el rey defensor, que tiene menos espacio, no puede imitarlo en dos. Para que funcione hacen falta dos condiciones: que el atacante tenga casillas libres para el triángulo, y que el defensor esté limitado (por un peón, el borde o la necesidad de vigilar una casilla).</p><h4>Tiempos de reserva</h4><p>En finales con peones de ambos bandos, el zugzwang se decide muchas veces por los tiempos de peón disponibles. Cuenta cuántas jugadas de peón puede hacer cada bando sin perder nada. Un peón que puede avanzar una o dos casillas es especialmente valioso, porque permite ajustar la cuenta. Por eso, cuando no hay prisa, no muevas peones del flanco donde no pasa nada: esos tiempos pueden decidir la partida veinte jugadas después.</p><h4>Zugzwang con piezas</h4><p>También las piezas sufren el zugzwang. Un caballo no puede perder un tiempo; un alfil sí, moviéndose sobre su diagonal; una torre también, desplazándose por la misma columna o fila. En finales de torre contra alfil o de dama contra torre, la técnica ganadora consiste muchas veces en llegar a una posición de zugzwang y entregar el turno con una jugada de espera, para que la pieza defensora tenga que separarse de su rey.</p><h4>Errores comunes y cómo pensarlo</h4><ul><li>Mover un peón «por mover» y perder un tiempo de reserva decisivo.</li><li>Ir directo hacia el objetivo con el rey cuando había que esperar una jugada.</li><li>No darse cuenta de que el rival está en zugzwang y liberarlo con un jaque innecesario.</li></ul><p>En la práctica, el zugzwang casi nunca aparece por casualidad: hay que provocarlo colocando las piezas en sus mejores casillas y luego entregando el turno. Pregunta clave: «si me tocara pasar, ¿quién estaría en problemas?». Si la respuesta es «el rival», busca la jugada que deja la misma posición con él al turno: una jugada de espera, un triángulo o un tiempo de peón.</p>",
  "keyPoints": [
   "Casillas correspondientes: a cada casilla de un rey le responde una del otro.",
   "Cuenta los tiempos de peón de ambos bandos antes de entrar en un final de peones.",
   "Si el rival estaría en zugzwang, busca cómo pasarle el turno."
  ],
  "positions": [
   {
    "fen": "8/8/8/2pK4/1kP5/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "El trébuchet: quien mueve, pierde.",
    "line": [
     "Ke4",
     "Kxc4",
     "Ke3",
     "Kc3"
    ],
    "comments": [
     "Las blancas tienen que mover y no pueden mantener la defensa de c4 y el ataque a c5.",
     "El negro captura el peón.",
     "El rey blanco intenta frenar el peón.",
     "El rey negro se coloca delante de su peón y gana. Con el negro al turno en la posición inicial, el resultado sería el contrario."
    ]
   },
   {
    "fen": "8/p7/4k3/4p3/4P3/3K4/P7/8 w - - 0 1",
    "orientation": "white",
    "caption": "Rodear con el rey y usar el tiempo de reserva del peón de a.",
    "line": [
     "Kc4",
     "Kd6",
     "Kb5",
     "Kc7",
     "Kc5",
     "Kb7",
     "Kd5"
    ],
    "comments": [
     "El rey va por el flanco de dama hacia d5 y b5.",
     "El rey negro intenta tomar la oposición.",
     "El rey sigue rodeando.",
     "El negro impide Kb6 o Kc6.",
     "El rey se coloca para entrar en d5.",
     "El negro no puede vigilar d6 y c6 a la vez.",
     "El rey entra en d5 y el peón de e5 caerá. Los peones de a están en reserva para cualquier zugzwang."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3k4/8/2K2R2/8/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: mate en dos. Hace falta una jugada de espera.",
    "line": [
     "Re6",
     "Kc8",
     "Re8#"
    ],
    "comments": [
     "La torre corta la columna e y no da jaque: el rey negro solo puede ir a c8. Otras jugadas solo alargan el mate.",
     "Única jugada.",
     "Mate en la octava fila: b7, c7 y d7 los controla el rey blanco."
    ]
   },
   {
    "fen": "8/8/8/2p1K3/k1P5/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: los dos reyes van a por el peón contrario. ¿Quién llega primero?",
    "line": [
     "Kd6"
    ],
    "comments": [
     "El rey va directo hacia c5 por d6 y llega antes: si Kb3, Kxc5 y el rey blanco defiende c4 mientras ataca; el negro queda en zugzwang. Ke4? llega tarde (tablas) y Kf4? se aleja y pierde."
    ]
   },
   {
    "fen": "8/8/8/3k2p1/4p3/4PK2/5P2/8 w - - 0 1",
    "caption": "Juegan blancas: ¿cuál es el peón débil del negro?",
    "line": [
     "Kg4",
     "Ke5",
     "Kxg5"
    ],
    "comments": [
     "El rey ataca el peón de g5, que no puede ser defendido. Kg3? o Kg2? permiten Ke5 y el negro mantiene todo.",
     "El rey negro protege e4 y vigila f6 y f5.",
     "Cae el peón de g5. Después el rey volverá al centro para atacar e4: el negro, sin jugadas útiles, terminará perdiéndolo. f3? era un error: abre la posición y es tablas."
    ]
   },
   {
    "fen": "8/1p6/1p1K4/1P6/k1P5/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: carrera de reyes en el flanco de dama. ¿Cuál es el camino correcto?",
    "line": [
     "Kc7",
     "Kb4",
     "Kxb7"
    ],
    "comments": [
     "Kc7 ataca el peón de b7. Ke5? o Ke6? solo hacen tablas: el rey negro captura c4 y defiende sus peones.",
     "El rey negro va a por el peón de c4.",
     "El rey captura b7 y luego b6: los dos peones negros caen y el peón de b5 coronará. En cambio Kxb6? solo hace tablas."
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
