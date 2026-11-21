/* Teoría ampliada y ejercicios nuevos: estrategia1. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
 "m-imbalances": {
  "html": "<h4>Estáticos contra dinámicos</h4><p>No todos los desequilibrios duran lo mismo. Los <b>estáticos</b> (estructura de peones, casillas débiles, pareja de alfiles, material) siguen ahí dentro de veinte jugadas. Los <b>dinámicos</b> (ventaja de desarrollo, iniciativa, rey en el centro, piezas mejor coordinadas en este momento) se evaporan si no se usan. Esta distinción decide el ritmo de la partida: quien tiene ventajas dinámicas debe actuar <i>ya</i>, aunque eso cueste un peón o empeore su estructura; quien tiene ventajas estáticas puede permitirse jugadas lentas, consolidar y esperar a que el rival se quede sin ideas.</p><p>Un error típico es «cobrar» una ventaja dinámica cambiándola por otra estática peor. Por ejemplo, con mucho más desarrollo, cambiar damas para ganar un peón doblado suele ser un mal negocio: el rival termina su desarrollo y la ventaja desaparece. Al revés, con una estructura claramente mejor no hace falta lanzarse al ataque: basta con impedir el contrajuego.</p><h4>Convertir un desequilibrio en otro</h4><p>Los buenos jugadores transforman ventajas. Una ventaja de desarrollo se convierte en una debilidad permanente (obligar al rival a jugar <span class=\"mv\">f6</span> o <span class=\"mv\">g6</span>); una iniciativa en el flanco de rey se convierte en un final con mejor estructura; la pareja de alfiles se convierte en un peón pasado cuando la posición se abre. La pregunta correcta no es «¿cómo gano?», sino «¿qué ventaja tengo y en qué otra ventaja, más fácil de explotar, puedo transformarla?».</p><h4>Ventajas del rival: neutralizar antes que imitar</h4><p>El inventario incluye las bazas del adversario. Si el rival tiene la pareja de alfiles, una jugada que cierre el centro puede valer más que cualquier plan propio. Si tiene una mayoría de peones en el flanco de dama, el ataque de minorías (<span class=\"mv\">b4</span>-<span class=\"mv\">b5</span>) no solo crea una debilidad: también le quita la mayoría. Un plan bueno suele hacer dos cosas a la vez: mejora tus desequilibrios y empeora los suyos.</p><h4>Errores frecuentes</h4><ul><li>Evaluar solo el material y olvidar que un peón de más con el rey expuesto puede valer menos que nada.</li><li>Elegir el plan por gusto («me gusta atacar») y no por la estructura.</li><li>Ver la ventaja pero jugar en el flanco equivocado: el ataque va donde se tienen más espacio o más piezas, no donde está el rey rival por costumbre.</li><li>Olvidar el tiempo: un plan que necesita diez jugadas no sirve si el rival rompe en tres.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Hay algo forzado (jaques, capturas, amenazas)? Si lo hay, se calcula primero.</li><li>Escriban mentalmente dos columnas: mis desequilibrios y los suyos. Marquen cuáles son estáticos y cuáles dinámicos.</li><li>Si mis bazas son dinámicas: ¿qué ruptura o sacrificio las aprovecha ahora?</li><li>Si mis bazas son estáticas: ¿qué contrajuego tiene el rival y cómo lo impido?</li><li>Busquen la jugada que sirva a la vez a su plan y estorbe el del rival.</li></ol>",
  "keyPoints": [
   "Desequilibrios dinámicos: úsenlos ya. Estáticos: consoliden e impidan el contrajuego.",
   "Un buen plan transforma una ventaja en otra más fácil de explotar."
  ],
  "positions": [
   {
    "fen": "r1bq1rk1/pp2nppp/2n1p3/2ppP3/3P2Q1/P1PB4/2P2PPP/R1B1K1NR w KQ - 5 9",
    "orientation": "white",
    "caption": "Winawer: las blancas tienen la pareja de alfiles, espacio en el flanco de rey y casillas negras débiles en el campo negro; las negras, mejor estructura y juego en el flanco de dama.",
    "line": [
     "Bg5",
     "Qa5",
     "Ne2",
     "Ng6",
     "O-O",
     "Qa4",
     "Qg3",
     "c4"
    ],
    "comments": [
     "El alfil de casillas negras ocupa la diagonal que ya nadie disputa (el alfil negro de casillas negras se cambió en c3).",
     "Las negras atacan el peón débil de c3.",
     "El caballo defiende c3 y se prepara para f4.",
     "El caballo negro defiende el enroque.",
     "Las blancas enrocan: su ventaja es dinámica y deben usarla.",
     "La dama negra presiona c2 y a3.",
     "La dama se coloca frente al rey negro.",
     "Las negras cierran el flanco de dama. Pequeña ventaja blanca (menos de un peón): cada bando juega en el flanco donde tiene sus desequilibrios a favor."
    ]
   },
   {
    "fen": "rq3rk1/1b1nbppp/pp1ppn2/8/2PQP3/1PN3P1/PB1N1PBP/R2R2K1 b - - 4 13",
    "orientation": "black",
    "caption": "El erizo: las negras aceptan menos espacio a cambio de una estructura sin debilidades y de las rupturas …b5 y …d5. Juegan negras.",
    "line": [
     "h6",
     "Qe3",
     "Ra7",
     "Qe2",
     "Rc8",
     "Nf3",
     "Ba8",
     "a4"
    ],
    "comments": [
     "Una jugada útil que quita g5 a las piezas blancas.",
     "La dama blanca se aparta de posibles ataques de las piezas menores negras.",
     "La torre se prepara para ir a c7 o d7: en el erizo, las piezas negras maniobran detrás de los peones.",
     "La dama se retira otra vez.",
     "La torre ocupa la columna c, apuntando a c4.",
     "El caballo vuelve a f3.",
     "El alfil se retira a a8 para dejar b7 a la dama o a la torre.",
     "Las blancas frenan …b5. Ligera ventaja blanca (menos de medio peón): el espacio contra la flexibilidad, desequilibrios estáticos de ambos lados."
    ]
   }
  ],
  "drills": [
   {
    "fen": "4k3/pp3pp1/2n1pn2/7p/8/1P2P3/PB3PPP/3B2K1 w - h6 0 2",
    "caption": "Juegan blancas: tienen la pareja de alfiles, y las negras acaban de jugar …h5. ¿Hay que conservar los dos alfiles a toda costa?",
    "line": [
     "Bxf6",
     "gxf6"
    ],
    "comments": [
     "No. Bxf6 entrega la pareja, pero rompe la estructura negra (peones doblados en la columna f) y deja el peón de h5 sin defensa: el desequilibrio «dos alfiles» se transforma en otro más concreto, un peón de más y mejor estructura. Las jugadas «de principio» (Bf3, g3) dan bastante menos.",
     "Hay que recuperar la pieza. Ahora sigue Bxh5 y las blancas tienen un peón de más con el alfil contra el caballo y peones en ambos flancos: alrededor de tres peones de ventaja según el motor."
    ]
   },
   {
    "fen": "rq3rk1/1b1nbppp/pp2pn2/3p4/2PQP3/1PN3P1/PB1N1PBP/R2R2K1 w - - 0 14",
    "caption": "Juegan blancas (estructura erizo): las negras rompieron con …d5. Hay dos capturas posibles. ¿Cuál aprovecha mejor los desequilibrios?",
    "line": [
     "exd5",
     "Bc5"
    ],
    "comments": [
     "exd5 abre la diagonal del alfil de g2 contra b7, deja el peón de e6 bajo presión y mantiene el peón de c4 controlando d5. Con cxd5 la posición se simplifica y la ventaja baja a la mitad. Elegir la captura es elegir qué desequilibrio queda en el tablero.",
     "Las negras ganan un tiempo sobre la dama, pero tras Qh4 su posición sigue llena de problemas: el alfil de b7 choca contra d5 y el centro blanco manda."
    ]
   },
   {
    "fen": "rq3rk1/1b1nbppp/pp1pp3/8/2PQP1n1/1PN3P1/PB1N1PBP/R2R2K1 w - - 5 14",
    "caption": "Juegan blancas (estructura erizo): el caballo negro salió a g4. ¿Qué desequilibrio pueden crear las blancas?",
    "line": [
     "Nd5",
     "Bf6",
     "Nxf6+",
     "Ngxf6"
    ],
    "comments": [
     "El caballo salta a d5, amenaza el alfil de e7 y la dama de b8 queda incómoda; si …exd5, cxd5 o exd5 abren líneas contra el rey y el caballo de g4 queda colgando. Las jugadas normales (Qd3, Nf1) dan poca ventaja.",
     "Las negras intentan cambiar sus problemas por el alfil.",
     "Las blancas cambian el caballo por el alfil de casillas negras, el gran defensor del peón de d6.",
     "Resultado: las negras se quedaron sin su alfil de casillas negras y el peón de d6 será un blanco permanente; las blancas tienen más de un peón de ventaja según el motor."
    ]
   },
   {
    "fen": "r1bqrnk1/pp2bppp/2p5/3p2Bn/3P4/2NBPP2/PPQ1N1PP/R4RK1 w - - 1 12",
    "caption": "Juegan blancas (estructura Carlsbad): los peones blancos d4 y e3 están en casillas negras, como el alfil de g5. El caballo negro acaba de ir a h5. ¿Qué cambio conviene?",
    "line": [
     "Bxe7",
     "Rxe7"
    ],
    "comments": [
     "Bxe7 cambia el alfil «malo» de las blancas (sus peones están en casillas negras) por el alfil «bueno» de las negras. Además evita …Nxg3 o …Bd6. Si Bf4, …Nxf4 y las negras se quedan con la pareja. Un cambio que mejora el balance de piezas menores.",
     "Las negras recuperan. Las blancas seguirán con Qd2 y el ataque de minorías (b4-b5), con una ligera ventaja."
    ]
   }
  ]
 },
 "m-iqp": {
  "html": "<h4>Cuándo romper con d4-d5</h4><p>La ruptura <span class=\"mv\">d5</span> es el momento culminante de las posiciones con peón aislado. Funciona cuando se cumplen tres condiciones: las piezas blancas están desarrolladas y apuntan al centro (torre en <span class=\"mv\">e1</span> o <span class=\"mv\">d1</span>, caballo en <span class=\"mv\">c3</span>), alguna pieza negra está mal defendida o clavada, y tras <span class=\"mv\">exd5</span> las líneas que se abren (columna e, diagonales <span class=\"mv\">c2</span>-<span class=\"mv\">h7</span> y <span class=\"mv\">g5</span>-<span class=\"mv\">d8</span>) favorecen a las blancas. El peón aislado desaparece, pero a cambio aparecen ataques concretos: el caballo de <span class=\"mv\">f6</span> queda sin apoyo, el alfil de <span class=\"mv\">e7</span> queda clavado en la columna e o la dama negra queda en la diagonal del alfil de <span class=\"mv\">g5</span>. Si ninguna de esas tácticas existe, la ruptura solo libera a las negras.</p><h4>El ataque con el peón aislado</h4><p>La otra gran idea es el ataque al rey. El esquema clásico: alfil en <span class=\"mv\">c2</span> o <span class=\"mv\">b1</span>, dama en <span class=\"mv\">d3</span> (amenazando <span class=\"mv\">h7</span>), caballo en <span class=\"mv\">e5</span> apoyado por el propio peón aislado, y una torre que se levanta por la tercera fila (<span class=\"mv\">Re3</span>-<span class=\"mv\">h3</span> o <span class=\"mv\">g3</span>). La jugada <span class=\"mv\">Bg5</span> clava o cambia al caballo de <span class=\"mv\">f6</span>, el defensor más importante del enroque. Fíjense en que el peón de <span class=\"mv\">d4</span> es el que permite todo esto: controla <span class=\"mv\">e5</span> y <span class=\"mv\">c5</span> y da a las piezas blancas casillas estables en el centro.</p><h4>El final con peón aislado</h4><p>Cada cambio de piezas acerca al bando del aislado a un final peor, porque desaparece su actividad y queda solo la debilidad. En los finales el defensor coloca un caballo o el rey en la casilla de bloqueo y ataca el peón con torres y alfil. Con torres y una pieza menor por bando, el peón aislado suele perderse si su dueño no tiene contrajuego; en un final de peones, el rey que llega a la casilla de bloqueo es casi siempre decisivo. Por eso el bando que juega contra el aislado debe <b>buscar cambios</b>, sobre todo de piezas menores, y el dueño del aislado debe evitarlos o, si no puede, cambiar el peón (con <span class=\"mv\">d5</span>) antes de llegar al final.</p><h4>Errores frecuentes</h4><ul><li>Con el aislado: jugar pasivo, defendiendo el peón con todas las piezas. El peón aislado se juega con iniciativa o no se juega.</li><li>Romper con <span class=\"mv\">d5</span> sin preparación, solo para «quitarse el problema»: suele dejar a las negras con mejor juego.</li><li>Contra el aislado: atacarlo antes de bloquearlo. Primero la pieza en <span class=\"mv\">d5</span>, después la presión.</li><li>Contra el aislado: olvidar el rey. Si el atacante logra <span class=\"mv\">Bxh7+</span> o <span class=\"mv\">Ng5</span>, la debilidad de <span class=\"mv\">d4</span> ya no importa.</li></ul><h4>Lista de comprobación</h4><ol><li>¿Mis piezas están mejor que en una posición normal? Si no, el aislado es solo una debilidad.</li><li>¿Hay una táctica que justifique <span class=\"mv\">d5</span> ahora (clavada, pieza descubierta, dama expuesta)?</li><li>¿Puedo llevar dama, alfil y caballo contra el enroque antes de que el rival cambie piezas?</li><li>Si defiendo: ¿qué pieza puedo cambiar para acercarme al final?</li></ol>",
  "keyPoints": [
   "La ruptura d5 necesita piezas listas y una táctica concreta que la justifique.",
   "Contra el aislado: primero bloquear, luego cambiar piezas y por último atacar el peón."
  ],
  "positions": [
   {
    "fen": "2rq1rk1/pb2bppp/1pn1pn2/8/3P4/P1NQ1N2/1PB2PPP/R1B1R1K1 w - - 4 14",
    "orientation": "white",
    "caption": "La ruptura d5 cuando las piezas están listas: con la torre negra en c8, la táctica cambia, pero la idea es la misma.",
    "line": [
     "d5",
     "Na5",
     "Bg5",
     "Rxc3",
     "Qxc3",
     "Qxd5",
     "Rad1",
     "Qc4"
    ],
    "comments": [
     "Las blancas rompen con todas las piezas desarrolladas: amenazan dxc6 y abrir las diagonales hacia el rey.",
     "El caballo se aparta del ataque; si …exd5, Bg5 y la presión sobre f6 y la columna e es muy fuerte.",
     "Clava al caballo de f6 contra el alfil de e7 y amenaza Bxf6 y Qxh7+.",
     "Las negras entregan la calidad para quitar el caballo de c3 y aliviar la presión.",
     "Las blancas recuperan con la dama, que ahora mira a la gran diagonal.",
     "Las negras recuperan el peón, pero siguen con una calidad de menos.",
     "La torre entra en la columna d con tempo sobre la dama.",
     "La dama se retira. Las blancas tienen calidad por peón y piezas muy activas: ventaja clara, alrededor de un peón y medio según el motor. La ruptura d5 transformó el aislado en material."
    ]
   },
   {
    "fen": "3r2k1/pp3ppp/4bn2/8/3P4/2N2N2/PP3PPP/3R2K1 b - - 0 1",
    "orientation": "black",
    "caption": "El aislado en el final: si su dueño reacciona a tiempo, puede cambiarlo o convertirlo en peón pasado con d5 antes de que sea un blanco. Juegan negras.",
    "line": [
     "Bg4",
     "d5",
     "Bxf3",
     "gxf3",
     "Kf8",
     "Kf1",
     "Rd6",
     "b3"
    ],
    "comments": [
     "El alfil va a cambiar al caballo de f3, uno de los defensores de d4.",
     "¡A tiempo! Las blancas avanzan el peón antes de que pierda sus defensores: la debilidad se convierte en un peón pasado.",
     "Las negras cambian igualmente y dañan la estructura blanca del flanco de rey.",
     "Forzado.",
     "El rey se acerca al centro: en el final, el rey es una pieza más de bloqueo.",
     "Las blancas hacen lo mismo.",
     "La torre presiona el peón de d5.",
     "Ventaja blanca de medio peón según el motor: el avance d5 a tiempo convirtió la debilidad en un peón pasado, aunque los peones del flanco de rey quedaron doblados."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2qr1k1/pb2bppp/1pn1pn2/8/3P4/P1NQ1N2/1PB2PPP/R1B1R1K1 w - - 4 14",
    "caption": "Juegan blancas: las negras acaban de jugar …Re8. Las piezas blancas están listas (Re1, Bc2, Qd3, Nc3). ¿Cómo se aprovecha ahora el peón aislado?",
    "line": [
     "d5",
     "exd5",
     "Bg5",
     "Ne4",
     "Nxe4",
     "dxe4",
     "Qxe4"
    ],
    "comments": [
     "¡La ruptura temática en el momento justo! Abre la columna e (Re1 contra el alfil de e7) y la diagonal c2-h7. Jugadas lentas como Bg5 o h4 dan solo una ventaja pequeña; d5 da más de tres peones según el motor.",
     "Lo más natural. Si …Na5 o …Nb8, igualmente Bg5 con presión enorme sobre f6, e7 y h7.",
     "Ataca al caballo de f6, el único defensor de h7: amenaza Bxf6 y Qxh7+. Además, el alfil de e7 queda sobrecargado en la columna e.",
     "Las negras devuelven el peón para tapar la diagonal y cambiar piezas. Si …Kf8, Bxf6 Bxf6 Qxh7 y el rey negro queda desnudo.",
     "Elimina al caballo que bloqueaba la diagonal. Fíjense: el peón aislado ya no existe, pero las piezas blancas siguen siendo mucho más activas.",
     "Forzado: si …g6, las blancas siguen con Bxe7 o Nf6+ y ganan material.",
     "Las blancas recuperan el peón con amenazas sobre h7 y e7. El peón aislado cumplió su misión: abrió las líneas para unas piezas mejor colocadas."
    ]
   },
   {
    "fen": "r1bq1rk1/1p1nbppp/p1n1p3/8/3P1B2/1BN2N2/PP3PPP/R2QR1K1 w - - 7 12",
    "caption": "Juegan blancas: las negras retiraron el caballo de f6 a d7. ¿Qué cambió en el centro y cómo lo aprovechan?",
    "line": [
     "d5",
     "Na5"
    ],
    "comments": [
     "Sin el caballo de f6, nadie controla bien d5: la ruptura llega con fuerza. Amenaza dxc6 y, si …exd5, Nxd5 con el alfil de b3 y el caballo apuntando a f7, c7 y e7. Las jugadas tranquilas (Qe2, a3) dan bastante menos.",
     "La mejor defensa: el caballo ataca al alfil de b3. Ahora las blancas siguen con dxe6 (o Bc2) y el peón negro de e6 cae o queda muy débil; el aislado se transformó en iniciativa."
    ]
   },
   {
    "fen": "2r3k1/pp3ppp/4bn2/8/1P1P4/2NB4/P4PPP/2R3K1 b - b3 0 1",
    "caption": "Juegan negras: final con peón aislado blanco en d4. Las blancas acaban de jugar b4 para ganar espacio. ¿Cómo responden las negras?",
    "line": [
     "Nd5",
     "Ne2"
    ],
    "comments": [
     "El caballo ocupa la casilla de bloqueo delante del peón aislado y, de paso, ataca a c3 y b4. Es la idea de Nimzowitsch: primero bloquear. Las demás jugadas dejan a las negras peor.",
     "El caballo de c3 no podía quedarse clavado contra la torre de c1. Ahora las negras cambian torres con …Rxc1+ y, tras Nxc1, toman en b4: ganan un peón y el de d4 sigue aislado y bloqueado."
    ]
   },
   {
    "fen": "r2q1rk1/pb2bppp/1pn1pn2/4N3/3P4/P1N5/1PB2PPP/R1BQR1K1 b - - 3 13",
    "caption": "Juegan negras: las blancas acaban de llevar el caballo a e5, su casilla favorita. ¿Qué descuidaron?",
    "line": [
     "Nxd4",
     "Bd3"
    ],
    "comments": [
     "El caballo de f3 era el que defendía el peón aislado. Al irse a e5, d4 queda con un solo defensor (la dama) contra el caballo y la dama negros. Las negras ganan un peón limpio; las demás jugadas devuelven la iniciativa a las blancas.",
     "Las blancas no pueden recuperar nada: si Qxd4?? Qxd4 y la dama se pierde. El peón aislado necesita protección constante; cada pieza que lo abandona puede costarlo."
    ]
   }
  ]
 },
 "m-colgantes": {
  "html": "<h4>Qué son exactamente y por qué valen</h4><p>Los peones colgantes (típicamente <span class=\"mv\">c5</span> y <span class=\"mv\">d5</span> en el bando negro, o <span class=\"mv\">c4</span> y <span class=\"mv\">d4</span> en el blanco) son una pareja de peones unidos en columnas semiabiertas, sin peones vecinos en las columnas b y e. Mientras estén uno al lado del otro, controlan cuatro casillas centrales (<span class=\"mv\">b4</span>, <span class=\"mv\">c4</span>, <span class=\"mv\">d4</span> y <span class=\"mv\">e4</span> en el caso negro) y amenazan avanzar. Su dueño suele tener más espacio y piezas activas detrás de ellos: torres en c y d, alfil en <span class=\"mv\">b7</span>, caballo en <span class=\"mv\">f6</span>. El precio es que ninguno de los dos puede ser defendido por otro peón desde atrás: si uno avanza, el otro se queda solo.</p><h4>El avance en el momento justo</h4><p>El dueño de los colgantes gana cuando uno de los dos avanza y abre líneas con efecto inmediato. <span class=\"mv\">d4</span> abre la gran diagonal del alfil de <span class=\"mv\">b7</span>, ataca un caballo en <span class=\"mv\">c3</span> o <span class=\"mv\">e3</span> y puede romper la cadena del rival; <span class=\"mv\">c4</span> gana espacio y expulsa un alfil de <span class=\"mv\">d3</span> o <span class=\"mv\">b3</span>, pero entrega para siempre la casilla <span class=\"mv\">d4</span>. Regla práctica: el avance es bueno si crea una amenaza concreta (pieza atacada, diagonal abierta hacia el rey, peón pasado protegido); si solo «gana espacio», lo más probable es que deje una casilla fuerte al rival.</p><h4>Cómo jugar contra ellos, paso a paso</h4><ol><li><b>Presión frontal</b>: torres en las columnas c y d, alfil en fianchetto o en <span class=\"mv\">f3</span> mirando a <span class=\"mv\">d5</span>, caballo que ataque <span class=\"mv\">d5</span> o <span class=\"mv\">c5</span>.</li><li><b>Golpes laterales</b>: <span class=\"mv\">b4</span> o <span class=\"mv\">e4</span> obligan a uno de los peones a cambiar o avanzar.</li><li><b>Provocar el avance</b>: cuando uno avanza, ocupar con una pieza la casilla que queda delante del otro (si avanza <span class=\"mv\">c4</span>, la casilla <span class=\"mv\">d4</span>; si avanza <span class=\"mv\">d4</span>, la casilla <span class=\"mv\">c4</span>).</li><li><b>Cambiar piezas</b>: igual que con el peón aislado, cada cambio reduce el dinamismo y deja a los peones como blancos.</li></ol><h4>Errores frecuentes</h4><ul><li>Avanzar uno de los colgantes «para no perderlo» cuando todavía estaban bien defendidos: el resultado es un peón aislado o un agujero permanente.</li><li>Contra los colgantes, cambiar el caballo que bloqueaba: la pieza bloqueadora es la más valiosa del defensor.</li><li>Olvidar que la transformación <span class=\"mv\">cxd4</span> o <span class=\"mv\">dxc4</span> convierte los colgantes en un peón aislado, lo que cambia los planes de ambos bandos.</li></ul><h4>Preguntas para la partida</h4><ul><li>Si tengo los colgantes: ¿cuál de los dos avances crea una amenaza concreta ahora? ¿Qué casilla entrego si avanzo?</li><li>Si juego contra ellos: ¿puedo atacar uno de los dos con dos piezas a la vez? ¿Qué pieza ocuparía la casilla de bloqueo?</li></ul><h4>Una idea para recordar</h4><p>Los colgantes se parecen a una pareja de bailarines: mientras se mueven juntos son peligrosos; cuando uno se adelanta, el otro queda solo. Por eso, en cada jugada, quien los tiene pregunta «¿puedo avanzar con amenaza?» y quien los combate pregunta «¿puedo obligar a uno a avanzar sin amenaza?».</p>",
  "keyPoints": [
   "El avance de un colgante es bueno solo si crea una amenaza concreta.",
   "Contra los colgantes: presión frontal, golpes laterales con b4 o e4 y bloqueo de la casilla que queda libre."
  ],
  "positions": [
   {
    "fen": "r1r3k1/3nqpp1/4b2p/p1p5/3p4/Q3PN2/PP2BPPP/2RR2K1 w - - 0 18",
    "orientation": "white",
    "caption": "El avance prematuro: las negras jugaron …d4 sin preparación. Juegan blancas.",
    "line": [
     "Nxd4",
     "Bh3",
     "Bf3",
     "Qg5",
     "Ne2",
     "Rab8",
     "Rd5",
     "Qf6"
    ],
    "comments": [
     "El peón de d4 no estaba defendido lo suficiente: las blancas lo capturan y el caballo ocupa una casilla central.",
     "Las negras buscan contrajuego contra el rey.",
     "El alfil vuelve para defender g2 y mirar a la gran diagonal.",
     "La dama negra se activa, pero no hay amenazas reales.",
     "El caballo se retira a una casilla segura.",
     "Las negras usan la columna b.",
     "La torre se instala en d5, la casilla central que dejó el colgante al avanzar, y ataca el peón aislado de c5.",
     "Las blancas tienen casi tres peones de ventaja según el motor: el avance de un colgante sin amenaza concreta solo entregó una casilla y un peón."
    ]
   },
   {
    "fen": "rnr3k1/4qpp1/4b2p/p1pp4/8/Q3PN2/PP2BPPP/2R2RK1 b - - 1 16",
    "orientation": "white",
    "caption": "Peones colgantes en la práctica (Gambito de Dama, variante Tartakower): las blancas presionan c5 y d5; las negras deben mantenerlos unidos. Juegan negras.",
    "line": [
     "Qf8",
     "Ne5",
     "Nc6",
     "Nxc6",
     "Rxc6",
     "Rfd1",
     "c4",
     "Qc3"
    ],
    "comments": [
     "La dama deja la clavada en la diagonal a3-f8 y defiende c5 desde f8.",
     "El caballo blanco salta a e5, rumbo a c6 o d7.",
     "Las negras desarrollan el caballo y desafían al de e5.",
     "Las blancas cambian: con menos piezas, los colgantes son más débiles.",
     "La torre recaptura y defiende la sexta fila.",
     "La torre presiona el peón de d5.",
     "Las negras avanzan c4: ganan espacio, pero entregan para siempre la casilla d4.",
     "La dama blanca se instala en c3, mirando a d4 y a la gran diagonal. Posición igualada según el motor, pero el plan blanco (Nd4 o Bf3 contra d5) es más fácil de jugar."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2q1rk1/pb2bppp/n4n2/2pp4/8/2N1BNP1/PP2PPBP/2RQ1RK1 b - - 1 12",
    "caption": "Juegan negras: tienen los peones colgantes c5 y d5. Las blancas acaban de jugar Be3 para presionar c5. ¿Es momento de avanzar?",
    "line": [
     "d4",
     "Nxd4",
     "Bxg2",
     "Kxg2",
     "cxd4"
    ],
    "comments": [
     "¡Sí! El avance gana un tiempo contra el alfil de e3 y, sobre todo, abre la gran diagonal del alfil de b7 contra g2. Es el ejemplo perfecto de avance con amenaza concreta. Las jugadas lentas (…Re8, …Rc8) dejan a las negras solo un poco mejor.",
     "Las blancas capturan el peón, pero el alfil de g2 queda atacado por el de b7.",
     "Primero se cambia el alfil de g2: el rey blanco queda expuesto y el caballo de d4 se queda sin apoyo.",
     "Forzado.",
     "Las negras ganan una pieza por un peón: el caballo y el alfil se cambiaron, y ahora el peón de d4 ataca al alfil de e3 y al caballo de c3. El avance de un colgante fue decisivo porque abrió una línea hacia el rey."
    ]
   },
   {
    "fen": "r1r3k1/3nq1p1/4bp1p/p1pp4/8/Q3PN2/PP2BPPP/2RR2K1 w - - 0 18",
    "caption": "Juegan blancas contra los colgantes c5 y d5. Las negras acaban de jugar …f6. ¿Cuál es la casilla clave y qué pieza debe ocuparla?",
    "line": [
     "Nd4",
     "Bf7",
     "Bg4"
    ],
    "comments": [
     "El caballo se instala en d4, justo delante del peón de d5: es la casilla de bloqueo, que ningún peón negro puede atacar. Desde allí ataca al alfil de e6, defensor de d5, y presiona c6, b5 y f5. Las jugadas generales (Bb5, h3) dan mucho menos.",
     "El alfil se aparta para seguir defendiendo d5.",
     "Ahora el alfil de e2 se cambia por el caballo de d7, defensor de c5: tras Bxd7 el peón de c5 cae. Primero bloquear, luego eliminar a los defensores."
    ]
   },
   {
    "fen": "rnr3k1/3q1pp1/4b2p/p1pp4/8/Q3PN2/PP2BPPP/2R2RK1 w - - 2 17",
    "caption": "Juegan blancas: las negras acaban de jugar …Qd7. Cuenten atacantes y defensores del peón de c5.",
    "line": [
     "Rxc5",
     "Rxc5",
     "Qxc5"
    ],
    "comments": [
     "El peón de c5 estaba atacado dos veces (torre de c1 y dama de a3) y defendido una sola (torre de c8): la dama de e7 lo defendía y se fue a d7. Las blancas ganan un peón limpio. Presión frontal más un descuido del rival: así caen los colgantes.",
     "Si no recaptura, las negras quedan simplemente con un peón menos.",
     "Las blancas tienen un peón más y el peón de d5 queda aislado: la pareja de colgantes desapareció."
    ]
   },
   {
    "fen": "r2q1rk1/pb2bppp/n4n2/2pp4/1P3B2/2N2NP1/P3PPBP/2RQ1RK1 b - b3 0 12",
    "caption": "Juegan negras con los colgantes c5 y d5: las blancas golpean de lado con b4. ¿Cómo responden?",
    "line": [
     "cxb4",
     "Nb5"
    ],
    "comments": [
     "Hay que capturar con el peón: …Nxb4 deja al caballo en el aire y los colgantes sin la pareja; …d4 abandona c5. Tras …cxb4, las negras ganan un peón (b4) a cambio de quedarse con un peón aislado en d5.",
     "El caballo busca la casilla d4 y presiona d6 y c7. Las negras siguen con …Nc5 y …Nfe4, y su peón de más compensa el aislado de d5."
    ]
   }
  ]
 },
 "m-maroczy": {
  "html": "<h4>Por qué el cerrojo es tan incómodo</h4><p>Con peones en <span class=\"mv\">c4</span> y <span class=\"mv\">e4</span>, las blancas controlan <span class=\"mv\">d5</span> con dos peones y suelen añadir un caballo en <span class=\"mv\">c3</span>. Las negras tienen una posición sin debilidades reales, pero les falta espacio: sus piezas se estorban, y las rupturas habituales de la Siciliana (<span class=\"mv\">d5</span>) no son posibles. A cambio, las casillas oscuras <span class=\"mv\">d4</span> y <span class=\"mv\">c5</span> quedaron debilitadas por el avance <span class=\"mv\">c4</span>, y el alfil de <span class=\"mv\">g7</span> apunta a la gran diagonal. Toda la lucha gira en torno a esas casillas oscuras y a las rupturas laterales <span class=\"mv\">b5</span> y <span class=\"mv\">f5</span>.</p><h4>El plan blanco, paso a paso</h4><ol><li>Completar el desarrollo con <span class=\"mv\">Be2</span>, <span class=\"mv\">O-O</span>, <span class=\"mv\">Be3</span> y la dama en <span class=\"mv\">d2</span>.</li><li>Neutralizar el alfil de <span class=\"mv\">g7</span>: a menudo con <span class=\"mv\">Bd4</span> para cambiarlo. La jugada <span class=\"mv\">f3</span>, por su parte, sostiene <span class=\"mv\">e4</span> y quita la casilla <span class=\"mv\">g4</span> al caballo negro.</li><li>Impedir las rupturas: <span class=\"mv\">a4</span> o <span class=\"mv\">b3</span> contra <span class=\"mv\">b5</span>; <span class=\"mv\">f3</span> o un caballo que controle <span class=\"mv\">f5</span> contra <span class=\"mv\">f5</span>.</li><li>Llevar torres a c1 y d1 y presionar el peón de <span class=\"mv\">d6</span>, que es la única debilidad estática negra.</li><li>Evitar cambios de caballos: las negras los necesitan para respirar.</li></ol><h4>El plan negro, paso a paso</h4><ol><li>Cambiar piezas menores, sobre todo con <span class=\"mv\">Ng4</span> (contra el alfil de <span class=\"mv\">e3</span>) o <span class=\"mv\">Nxd4</span> seguido de <span class=\"mv\">Be6</span>.</li><li>Ocupar casillas oscuras: caballo en <span class=\"mv\">c5</span> o <span class=\"mv\">d7</span>, alfil en <span class=\"mv\">g7</span>, dama en <span class=\"mv\">a5</span>.</li><li>Preparar <span class=\"mv\">b5</span> con <span class=\"mv\">a6</span> y <span class=\"mv\">Rb8</span>, o <span class=\"mv\">f5</span> tras mover el caballo de <span class=\"mv\">f6</span>.</li><li>Si la ruptura llega en buen momento, el peón de <span class=\"mv\">c4</span> o de <span class=\"mv\">e4</span> se convierte en un blanco y la posición se abre a favor del alfil de <span class=\"mv\">g7</span>.</li></ol><h4>Errores frecuentes</h4><ul><li>Blancas: jugar <span class=\"mv\">f4</span> demasiado pronto y dejar <span class=\"mv\">e4</span> y la diagonal <span class=\"mv\">g7</span>-<span class=\"mv\">a1</span> sin defensa.</li><li>Blancas: cambiar el caballo de <span class=\"mv\">d4</span> sin necesidad; cada cambio alivia a las negras.</li><li>Negras: esperar pasivamente. El cerrojo no se rompe solo: sin <span class=\"mv\">b5</span> o <span class=\"mv\">f5</span> el espacio blanco crece.</li><li>Negras: romper con <span class=\"mv\">b5</span> o <span class=\"mv\">f5</span> sin preparación, dejando un peón débil y casillas libres para los caballos blancos.</li></ul><h4>Cómo pensarlo</h4><p>Con blancas, la pregunta es «¿qué ruptura prepara el rival y qué jugada la impide sin crear una debilidad nueva?». Con negras, «¿qué pieza blanca controla mi casilla de ruptura y puedo cambiarla?». En el cerrojo, la mitad de las buenas jugadas son profilácticas.</p><h4>El momento de las rupturas</h4><p>Una ruptura en el cerrojo se juzga igual que cualquier otra: ¿quedan las piezas propias más activas después del cambio? Si …b5 o …f5 dejan un peón débil (el de e7 o el de d6) y una casilla libre para los caballos blancos (e4, d5), la ruptura fue prematura. Si en cambio abren la diagonal del alfil de g7 o la columna c contra un peón blanco fijo, las negras igualan. Por eso las negras preparan la ruptura con varias jugadas (…a6, …Rb8, …Nd7) y las blancas, mientras tanto, colocan sus piezas justo donde la ruptura les daría ventaja.</p>",
  "keyPoints": [
   "En el Maroczy las blancas impiden b5 y f5; las negras cambian piezas y preparan esas rupturas.",
   "Las casillas oscuras d4 y c5 son la compensación negra por la falta de espacio."
  ],
  "positions": [
   {
    "fen": "r2q1rk1/4ppbp/2bp2p1/ppn5/2P1P3/1PN1BP2/P2QB1PP/1R3RK1 w - b6 0 16",
    "orientation": "white",
    "caption": "La ruptura …b5 sin preparación: las negras la jugaron con el peón de c4 todavía bien defendido. Juegan blancas.",
    "line": [
     "cxb5",
     "Bb7",
     "Rbc1",
     "Rc8",
     "Rfd1",
     "Be5",
     "Bc4",
     "e6"
    ],
    "comments": [
     "Las blancas ganan un peón: la ruptura solo funciona si las negras pueden recuperar el material con actividad.",
     "El alfil se retira; no hay compensación inmediata.",
     "Las torres ocupan la columna c, que la propia ruptura negra abrió.",
     "Las negras se oponen en la columna c.",
     "La otra torre presiona el peón de d6.",
     "El alfil busca actividad en la gran diagonal.",
     "El alfil blanco se coloca en c4 y controla d5, la casilla clave del cerrojo.",
     "Las blancas tienen un peón de más y la posición bajo control: el motor da alrededor de cuatro peones de ventaja. La ruptura correcta en el momento equivocado es un error grave."
    ]
   },
   {
    "fen": "r1bq1rk1/pp2ppbp/2np1np1/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 b - - 1 9",
    "orientation": "black",
    "caption": "El plan de las negras en el cerrojo: cambiar caballos y buscar casillas oscuras. Juegan negras.",
    "line": [
     "Nd7",
     "b3",
     "Nc5",
     "Rc1",
     "Bd7",
     "Qd2",
     "Qa5",
     "Rfd1"
    ],
    "comments": [
     "El caballo de f6 va a c5 y despeja la diagonal del alfil de g7 hacia d4 y b2.",
     "Las blancas protegen c4 y evitan …Nxd4 con ganancia de tiempo sobre b2.",
     "El caballo llega a c5, la casilla oscura más importante.",
     "La torre defiende c4 y se prepara para presionar la columna c.",
     "Las negras completan el desarrollo.",
     "La dama defiende y conecta las torres.",
     "La dama negra apunta a a2 y a la casilla c3, y prepara …Rfc8 o …a5.",
     "Las blancas mantienen una pequeña ventaja de espacio (alrededor de medio peón según el motor), pero las negras están sólidas: así se juega el cerrojo con negras."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2q1rk1/1p2ppbp/2bp2p1/2n5/p1P1P3/1PN1BP2/P2QB1PP/1R3RK1 w - - 0 16",
    "caption": "Juegan blancas (cerrojo Maroczy): las negras acaban de jugar …a4, buscando abrir la columna a y asentar el caballo de c5. ¿Cómo reaccionan?",
    "line": [
     "b4",
     "Ne6"
    ],
    "comments": [
     "b4 expulsa al caballo de c5, su mejor casilla oscura, gana espacio y deja al peón de a4 aislado y lejos de su apoyo. Las jugadas de espera (Rfc1, Nb5) permiten a las negras consolidarse en las casillas oscuras.",
     "El caballo se retira a e6. Las blancas siguen con Nd5 o Rfd1: tienen más espacio, el peón de a4 es un blanco a largo plazo y las rupturas negras siguen lejos."
    ]
   },
   {
    "fen": "3q1rk1/1p1nppbp/r1bp2p1/p7/2P1P3/1PN1BP2/P2QB1PP/R4RK1 w - - 3 15",
    "caption": "Juegan blancas: la torre negra salió a a6 para actuar por la sexta fila. ¿Qué ruptura castiga esa colocación?",
    "line": [
     "c5",
     "Ra8",
     "cxd6",
     "exd6"
    ],
    "comments": [
     "c5 abre la diagonal del alfil de e2 hacia a6 (amenaza Bxa6) y ataca el peón de d6. Es una de las pocas veces en que el bando del cerrojo abre el juego: lo hace porque las piezas negras están descoordinadas. Las jugadas lentas (h4, Rad1) dan mucho menos.",
     "La torre tiene que volver; si …dxc5, Bxa6 y las blancas ganan la calidad.",
     "Las blancas cambian para dejar al rival con un peón débil en d6 (o en e7).",
     "Ahora el peón de d6 está aislado en una columna abierta y las blancas lo atacarán con Rfd1, Nb5 y Bf4. El motor da casi dos peones de ventaja a las blancas."
    ]
   },
   {
    "fen": "r2q1rk1/1p2p1bp/2bp2p1/p1n2p2/2P1P3/1PN1BP2/P2QB1PP/1R3RK1 w - f6 0 16",
    "caption": "Juegan blancas: las negras rompieron con …f5 contra el cerrojo. ¿Cómo se responde?",
    "line": [
     "exf5",
     "Rxf5"
    ],
    "comments": [
     "Hay que capturar: si se permite …fxe4, el alfil de g7 y el caballo de c5 cobran vida. Tras exf5 la casilla e4 queda para un caballo blanco y el peón negro de e7 queda retrasado en una columna semiabierta. Las jugadas tranquilas (Bd3, h3) llevan a la igualdad.",
     "Si …gxf5, el enroque negro queda debilitado. Tras …Rxf5 las blancas mantienen una ventaja pequeña pero clara: la ruptura negra dejó la casilla e6 débil y el peón de e7 como blanco."
    ]
   },
   {
    "fen": "r1bq1rk1/pp2ppbp/3p1np1/8/2PnP3/2N1B3/PP2BPPP/R2Q1RK1 w - - 0 10",
    "caption": "Juegan blancas: las negras cambiaron en d4 para aliviar su falta de espacio. ¿Con qué pieza recapturan?",
    "line": [
     "Bxd4",
     "Bd7"
    ],
    "comments": [
     "Con el alfil: así las blancas pueden cambiar el alfil de g7, la mejor pieza negra, y quedarse con el control de las casillas oscuras. Tras Qxd4 la dama queda expuesta a …Ng4 o …Be6 con …Nd7, y las negras igualan con facilidad.",
     "Las negras siguen el plan habitual (…Bc6, …a5, …Nd7). Las blancas responden con Qd3 o f3 y mantienen el cerrojo: más espacio y ninguna ruptura negra a la vista."
    ]
   }
  ]
 },
 "m-cadenas": {
  "html": "<h4>Base, cabeza y el momento de la ruptura</h4><p>En una cadena como <span class=\"mv\">d4</span>-<span class=\"mv\">e5</span> la <b>base</b> es <span class=\"mv\">d4</span> y la <b>cabeza</b> es <span class=\"mv\">e5</span>. Atacar la base es lo normal porque es el único eslabón que no está protegido por otro peón; si cae o se cambia, la cabeza queda colgando. Pero hay una excepción importante: cuando la base está muy bien defendida (por ejemplo por <span class=\"mv\">c3</span> y varias piezas), puede ser mejor atacar la <b>cabeza</b> con <span class=\"mv\">f6</span>. En la Francesa ambas rupturas, <span class=\"mv\">c5</span> y <span class=\"mv\">f6</span>, son temas centrales; los buenos jugadores alternan la presión entre ellas.</p><p>Otro matiz: el bando que tiene la cadena no está obligado a sostenerla a cualquier precio. A veces conviene cambiar en <span class=\"mv\">c5</span> (<span class=\"mv\">dxc5</span>) para ganar la casilla <span class=\"mv\">d4</span> para una pieza: la cadena desaparece, pero se obtiene un puesto central sólido.</p><h4>Bloqueo y casillas detrás de la cadena</h4><p>Cuando una cadena queda totalmente bloqueada, cada bando tiene un flanco de juego y las casillas que están <i>delante</i> de los peones rivales se vuelven clave. En la India de Rey con <span class=\"mv\">d5</span>, la casilla <span class=\"mv\">c5</span> es el objetivo blanco (para abrir la columna c) y <span class=\"mv\">f4</span> o <span class=\"mv\">g4</span> el objetivo negro. Una pieza instalada justo delante de un peón bloqueado no puede ser expulsada por él: es el principio del bloqueo de Nimzowitsch.</p><h4>Planes típicos</h4><ul><li><b>Socavar la base</b>: <span class=\"mv\">c5</span> y <span class=\"mv\">Qb6</span> contra <span class=\"mv\">d4</span>; <span class=\"mv\">f5</span> contra <span class=\"mv\">e4</span> en la India de Rey.</li><li><b>Golpear la cabeza</b>: <span class=\"mv\">f6</span> contra <span class=\"mv\">e5</span> cuando la base es inexpugnable.</li><li><b>Cerrar el flanco del rival</b>: <span class=\"mv\">c4</span> en la Francesa quita presión sobre <span class=\"mv\">d4</span> pero gana espacio en el flanco de dama; es un cambio de plan, no una mejora automática.</li><li><b>Carrera de flancos</b>: si el centro está cerrado, cada tempo cuenta; el que llega primero con sus peones a la cadena rival suele mandar.</li></ul><h4>Errores frecuentes</h4><ul><li>Avanzar la cadena sin motivo (por ejemplo <span class=\"mv\">c4</span> en la Francesa) y quedarse sin rupturas: la posición se cierra y el que tenía más espacio pierde su juego.</li><li>Atacar la base con piezas solas, sin el peón: una ruptura de peón es mucho más fuerte que la presión de piezas.</li><li>Abrir el flanco donde el rival es más fuerte. Abrir líneas es bueno solo si las piezas propias llegan antes.</li><li>Defender la cadena con piezas que quedan pasivas: un caballo atado a <span class=\"mv\">d4</span> no ataca nada.</li></ul><h4>Preguntas para la partida</h4><ol><li>¿Hacia qué flanco apunta cada cadena? Ese es el flanco de cada bando.</li><li>¿Cuál es la base rival y qué ruptura de peón la ataca? ¿Cuántas piezas la defienden?</li><li>¿Me conviene mantener la tensión, cambiar o avanzar? Avanzar cierra la posición para siempre.</li><li>¿Quién llega primero en la carrera de flancos? Cuenten los tempos.</li></ol>",
  "keyPoints": [
   "Ataquen la base; si está sobreprotegida, golpeen la cabeza (f6 contra e5).",
   "Avanzar la cadena cierra la posición para siempre: háganlo solo con un plan claro."
  ],
  "positions": [
   {
    "fen": "r3kbnr/pp1b1ppp/1qn1p3/3pP3/2pP4/P1P2N2/1P1N1PPP/R1BQKB1R w KQkq - 2 8",
    "orientation": "white",
    "caption": "Cuando las negras cierran con …c4, la cadena cambia: ahora la base del flanco de dama es c4, y las blancas la golpean.",
    "line": [
     "b3",
     "Qa5",
     "Qc2",
     "b5",
     "Be2",
     "Nh6",
     "O-O",
     "Be7"
    ],
    "comments": [
     "b3 ataca el peón de c4, la nueva base de la cadena negra en el flanco de dama.",
     "La dama clava el peón de c3 y presiona.",
     "La dama defiende c3 y apunta a la diagonal b1-h7.",
     "Las negras sostienen c4 con otro peón.",
     "Las blancas completan el desarrollo.",
     "El caballo va a f5 por h6, la ruta típica cuando e7 está ocupado.",
     "El rey se pone a salvo.",
     "Ventaja pequeña blanca (algo más de medio peón). Las blancas mantienen la presión sobre c4 y conservan su espacio en el flanco de rey."
    ]
   },
   {
    "fen": "r1bq1rk1/ppp1n1bp/3p1np1/3Pp3/2P1Pp2/2NN1P2/PP1BB1PP/R2Q1RK1 w - - 0 13",
    "orientation": "white",
    "caption": "India de Rey con el centro cerrado: cada bando ataca en el flanco hacia el que apunta su cadena.",
    "line": [
     "a4",
     "g5",
     "a5",
     "h5",
     "c5",
     "Rf7",
     "a6",
     "b6"
    ],
    "comments": [
     "Las blancas juegan en el flanco de dama, hacia donde apunta su cadena d5-e4.",
     "Las negras en el flanco de rey: …g5-g4 contra la base f3 de la cadena blanca.",
     "El peón a sigue avanzando para abrir líneas.",
     "Las negras preparan …g4.",
     "La ruptura principal: c5 contra el peón de d6.",
     "La torre defiende la segunda fila y puede ir a g7.",
     "Las blancas fijan el flanco de dama.",
     "Una carrera típica de flancos opuestos: el ataque blanco llegó antes y el motor le da una ventaja clara (unos dos peones). Cada tempo cuenta."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2qrbk1/1b1n1pp1/p2p3p/1ppP4/Pn2P3/5N1P/1P3PP1/RBBQRNK1 b - - 2 17",
    "caption": "Juegan negras (Española cerrada): el centro blanco es la cadena d5-e4. Las blancas acaban de llevar el caballo de d2 a f1. ¿Dónde golpean las negras?",
    "line": [
     "f5",
     "Bd2",
     "fxe4",
     "Bxe4"
    ],
    "comments": [
     "f5 ataca la base de la cadena, e4, justo cuando perdió un defensor (el caballo que estaba en d2). Las alternativas (…bxa4, …Nb6) dejan a las negras pasivas y con desventaja.",
     "Las blancas desarrollan; si exf5, …Rxe1 y …Bxd5 recuperan el peón con juego activo.",
     "Se cambia la base: la cadena desaparece y el peón de d5 queda sin apoyo de peones.",
     "Recaptura natural. Ahora …Nf6 ataca al alfil de e4 y presiona d5: las negras igualaron por completo, porque atacar la base liberó todo su juego."
    ]
   },
   {
    "fen": "r2qkb1r/pp1b1ppp/2n1p1n1/2ppP3/3P4/2P5/PP1NBPPP/RNBQ1RK1 b kq - 8 8",
    "caption": "Juegan negras (Francesa del avance): las blancas acaban de retirar el caballo de f3 a d2. ¿Qué cambió en la cadena d4-e5?",
    "line": [
     "cxd4",
     "f4"
    ],
    "comments": [
     "El caballo de f3 defendía a la vez d4 (la base) y e5 (la cabeza). Sin él, …cxd4 ataca la base y las blancas no pueden sostener las dos casillas. Las otras jugadas (…f6, …Nf4) dan bastante menos.",
     "Las blancas defienden la cabeza con f4 y renuncian a la base: tras …dxc3 las negras quedan con un peón de más y la cadena blanca rota."
    ]
   },
   {
    "fen": "r2qkb1r/pp1b1ppp/2n1p1n1/1BppP3/3P4/2P2N2/PP3PPP/RNBQ1RK1 b kq - 8 8",
    "caption": "Juegan negras: las blancas acaban de jugar Bb5, clavando el caballo de c6 para sostener la cadena. Miren la cabeza, e5: ¿está bien defendida?",
    "line": [
     "Ncxe5",
     "Bxd7+",
     "Nxd7"
    ],
    "comments": [
     "No: al saltar el caballo de c6 a e5, el alfil de d7 ataca al de b5. Si Nxe5, …Bxb5 y las negras ganan un peón y quedan mejor. La «clavada» no sostenía nada.",
     "Lo mejor que tienen las blancas: cambiar los alfiles con jaque.",
     "Las negras se quedan con un peón de más y la cadena blanca perdió la cabeza: el peón de d4 queda como blanco."
    ]
   },
   {
    "fen": "r1bq1rk1/pp2n1pp/2n1p3/2ppPp1Q/3P4/P1PB4/2P2PPP/R1B1K1NR w KQ f6 0 10",
    "caption": "Juegan blancas (Winawer): las negras quisieron bloquear el flanco de rey con …f5, junto a la cabeza de la cadena e5. ¿Qué recurso tienen las blancas?",
    "line": [
     "exf6",
     "Nf5",
     "fxg7"
    ],
    "comments": [
     "La captura al paso deshace el bloqueo: el peón de e5 se cambia por el de f y el enroque negro queda abierto (amenaza fxg7 y Qxh7). Con cualquier otra jugada (Nf3) las negras consolidan.",
     "El caballo tapa las diagonales, pero no puede evitar el siguiente golpe.",
     "El peón llega a g7 y desarma el enroque: las blancas tienen casi cuatro peones de ventaja según el motor. Lección: avanzar el peón f hasta f5 al lado de un peón enemigo en e5 permite la captura al paso."
    ]
   }
  ]
 },
 "m-puestos": {
  "html": "<h4>Cómo se detecta una casilla débil</h4><p>Una casilla es débil cuando ningún peón propio puede ya defenderla: los peones de las columnas vecinas avanzaron, se cambiaron o desaparecieron. La prueba es sencilla: miren las dos columnas adyacentes y pregunten si algún peón puede llegar a atacar esa casilla. Si la respuesta es no, la casilla es permanente. Un <b>puesto avanzado</b> es una casilla débil del rival, en su mitad del tablero (filas 4 a 6 para las blancas), protegida por un peón propio. Allí una pieza solo puede ser cambiada, nunca expulsada.</p><h4>Quién debe ocuparlo</h4><p>El ocupante ideal es el <b>caballo</b>: desde un puesto central controla ocho casillas y su corto alcance deja de ser un problema. Un alfil en un puesto avanzado suele ser menos útil porque el alfil trabaja a distancia y no necesita estar cerca. Una torre en un puesto (por ejemplo en <span class=\"mv\">d6</span>) puede ser fuerte, pero es vulnerable a los ataques de piezas menores. Regla práctica: ocupen el puesto con el caballo y mantengan detrás una pieza mayor que lo apoye en la columna.</p><h4>Plan típico en tres pasos</h4><ol><li><b>Crear o fijar la casilla</b>: provocar el avance de un peón vecino (por ejemplo, atacar un caballo para que el rival juegue <span class=\"mv\">e5</span> o <span class=\"mv\">f6</span>).</li><li><b>Eliminar a los defensores</b>: cambiar el caballo o el alfil rival que podría disputar o cambiar la pieza que ocupe el puesto. En la Sveshnikov, <span class=\"mv\">Bxf6</span> elimina el caballo que controla <span class=\"mv\">d5</span>.</li><li><b>Llevar la pieza por la ruta más corta</b>: un caballo de <span class=\"mv\">b1</span> puede ir a <span class=\"mv\">d5</span> vía <span class=\"mv\">c3</span>, o vía <span class=\"mv\">a3</span>-<span class=\"mv\">c2</span>-<span class=\"mv\">e3</span> si <span class=\"mv\">c3</span> está ocupada. Planificar la ruta antes de empezar ahorra tempos.</li></ol><h4>Excepciones y errores frecuentes</h4><ul><li>Un puesto avanzado que no influye en nada (lejos del rey, sin peones que atacar) es solo decorativo. Pregunten qué ataca la pieza desde allí.</li><li>Ocupar el puesto con la pieza equivocada y permitir que el rival la cambie por su pieza mala.</li><li>Olvidar que el rival puede cambiar la pieza instalada: si el rival tiene un caballo o un alfil del color de la casilla, el puesto puede neutralizarse con un cambio; a veces hay que preparar dos ocupantes, para que tras el cambio entre el segundo.</li><li>Crear agujeros en el propio campo con avances de peones «para atacar»: cada peón que avanza deja casillas detrás para siempre.</li></ul><h4>Preguntas para la partida</h4><ul><li>¿Qué casillas del rival ya no pueden ser defendidas por peones? ¿Cuál está protegida por un peón mío?</li><li>¿Qué pieza rival puede disputar esa casilla? ¿Puedo cambiarla primero?</li><li>¿Cuál es la ruta más corta de mi caballo hasta allí?</li><li>Y en defensa: ¿cuál de mis casillas acaba de quedar débil con mi última jugada de peón?</li></ul>",
  "keyPoints": [
   "Primero eliminen al defensor de la casilla; luego instalen el caballo.",
   "Un puesto avanzado vale solo si la pieza ataca algo desde allí."
  ],
  "positions": [
   {
    "fen": "r1bq1rk1/5ppp/p1np4/1p1Np1b1/4P3/2P5/PPN2PPP/R2QKB1R w KQ - 3 13",
    "orientation": "white",
    "caption": "Sveshnikov, línea principal: el caballo de d5 es la pieza estrella. Las blancas atacan el peón de b5 para asegurar también c4.",
    "line": [
     "a4",
     "bxa4",
     "Rxa4",
     "Ne7",
     "Bc4",
     "Be6",
     "O-O",
     "a5"
    ],
    "comments": [
     "a4 golpea el peón de b5, que defendía c4.",
     "Las negras cambian.",
     "La torre se activa por la cuarta fila.",
     "Las negras quieren cambiar el caballo de d5, el mejor de las blancas.",
     "El alfil apoya d5: si el caballo se cambia, el alfil o un peón ocuparán la casilla.",
     "Las negras desafían d5 con el alfil.",
     "El rey se pone a salvo.",
     "Ligera ventaja blanca (alrededor de medio peón según el motor). La lucha gira alrededor de d5."
    ]
   },
   {
    "fen": "6k1/3b1p2/4p1p1/1p1pP2p/1P1P1P1P/2N3P1/6K1/8 w - - 0 1",
    "orientation": "white",
    "caption": "Caballo contra alfil malo… pero sin puesto ni entrada para el rey: aquí la mejor pieza no basta.",
    "line": [
     "Ne2",
     "Kg7",
     "Nc1",
     "f6",
     "exf6+",
     "Kf7",
     "Nd3",
     "Kxf6"
    ],
    "comments": [
     "El caballo busca una ruta hacia c5 (vía c1-d3).",
     "El rey negro se activa.",
     "El caballo sigue su camino.",
     "Las negras rompen con …f6 a tiempo: el alfil malo se libera en cuanto cambia un peón.",
     "Las blancas cambian.",
     "El rey se acerca para recuperar el peón de f6.",
     "El caballo llega a d3, pero c5 ya no tiene objetivos claros.",
     "Tablas según el motor: sin un puesto que ataque algo y sin entrada para el rey, el caballo no puede ganar."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2qkb1r/5p2/p1npb2p/1p1Npp2/4P3/N2B4/PPP2PPP/R2Q1RK1 w kq - 0 13",
    "caption": "Juegan blancas (Sveshnikov): el caballo de d5 es magnífico, pero el de a3 está fuera de juego porque el peón de b5 le quita c4. ¿Cuál es el plan?",
    "line": [
     "c4",
     "fxe4",
     "Bxe4",
     "Bg7"
    ],
    "comments": [
     "c4 socava el peón de b5: el caballo de a3 volverá al juego por c4 o c2 y el puesto de d5 quedará asegurado para siempre. Las jugadas lentas (c3, f3) dan bastante menos.",
     "Las negras abren la columna f.",
     "El alfil recaptura centralizado.",
     "Las negras desarrollan. Las blancas siguen con cxb5: el bloqueo de d5 y el caballo recuperado son la base de su ventaja (unos dos peones según el motor)."
    ]
   },
   {
    "fen": "r2qkb1r/5p1p/p2pb3/1p1Npp2/3nP3/N2B4/PPP2PPP/R2Q1RK1 w kq - 4 13",
    "caption": "Juegan blancas: el caballo negro acaba de saltar a d4. ¿Es un puesto avanzado?",
    "line": [
     "c3",
     "Nc6",
     "Nc2"
    ],
    "comments": [
     "No, porque un peón puede expulsarlo: c3 gana un tiempo. Un puesto solo lo es si ningún peón rival puede atacarlo. El caballo blanco de d5, en cambio, sí es intocable.",
     "El caballo vuelve; si …Bxd5, exd5 y el caballo de d4 sigue atacado.",
     "El caballo del borde se dirige a e3, desde donde apoya d5 y f5: dos caballos para una casilla, por si las negras cambian el primero."
    ]
   },
   {
    "fen": "rq2kb1r/5p1p/p1npb3/1p1Npp2/4P3/N2B4/PPP2PPP/R2Q1RK1 w kq - 4 13",
    "caption": "Juegan blancas: la dama negra se fue a b8. Desde su puesto en d5, ¿qué puede hacer el caballo?",
    "line": [
     "Nf6+",
     "Ke7",
     "exf5"
    ],
    "comments": [
     "Un caballo en un puesto central no es solo estratégico: también crea tácticas. El jaque en f6 deja al rey negro en el centro y prepara exf5. Jugar «solo posicional» (c4) da mucho menos.",
     "La mejor; tras …Kd8 el rey también queda expuesto.",
     "Ataca al alfil de e6. Tras …Kxf6 fxe6, el rey negro queda desnudo y las blancas tienen una ventaja decisiva (más de cuatro peones según el motor)."
    ]
   },
   {
    "fen": "6k1/3b1p2/4p1p1/1pPpP2p/1P3P1P/2N3PK/8/8 w - - 0 1",
    "caption": "Juegan blancas: final de caballo contra alfil. La casilla d4 no puede ser atacada por ningún peón negro. ¿Cómo llega el caballo allí?",
    "line": [
     "Ne2",
     "Kf8"
    ],
    "comments": [
     "Ne2 y luego Nd4: desde el puesto, el caballo atacará b5 y e6 y saltará a c6 o b5. Las jugadas de rey (Kg2, Kh2) dejan escapar gran parte de la ventaja (el motor da casi cinco peones con Ne2 y apenas dos con Kg2).",
     "El rey negro se acerca. Las blancas siguen con Nd4 y el peón de b5 no puede defenderse a la vez que se vigila c6."
    ]
   }
  ]
 },
 "m-columnas": {
  "html": "<h4>Columna abierta y columna semiabierta</h4><p>Una columna <b>abierta</b> no tiene peones; una <b>semiabierta</b> tiene solo peones del rival. Las dos sirven para las torres, pero de forma distinta. En una columna abierta la lucha es por el control: quien la domine puede entrar en el campo enemigo. En una semiabierta la torre presiona un peón rival fijo (por ejemplo el de <span class=\"mv\">c6</span> en el ataque de minorías o el de <span class=\"mv\">d6</span> en la Siciliana); el objetivo no es entrar, sino atacar ese peón con varias piezas.</p><h4>Cómo se gana el control de una columna</h4><ol><li><b>Llegar primero</b>: la primera torre que ocupa la columna obliga al rival a oponerse o a ceder.</li><li><b>Doblar</b>: dos torres (o torre y dama) en la misma columna vencen a una sola. Si el rival se opone con una torre, la cambian y la segunda torre queda dueña de la columna.</li><li><b>Controlar las casillas de entrada</b>: aunque la columna esté disputada, si las casillas de la sexta, séptima y octava fila están cubiertas por sus piezas menores, el rival no puede entrar.</li><li><b>Entrar en el momento justo</b>: la torre debe penetrar cuando haya algo que atacar (peones sin mover, el rey en la octava). Entrar «porque sí» y dejarse expulsar pierde tiempo.</li></ol><h4>La séptima fila en el final</h4><p>Una torre en la séptima hace tres trabajos a la vez: ataca los peones que no se movieron, encierra al rey rival en la octava y amenaza combinarse con otra pieza para dar mate. En los finales de torres, una torre activa en la séptima suele valer más que un peón. Con dos torres en la séptima, las amenazas de mate en <span class=\"mv\">g7</span> o <span class=\"mv\">h7</span> suelen ser decisivas aunque falten varios peones.</p><h4>Errores frecuentes</h4><ul><li>Poner la torre en una columna que se va a cerrar: miren qué peones pueden avanzar y taparla.</li><li>Olvidar la propia primera fila: antes de lanzar las torres, den una salida al rey (un «respiro» con <span class=\"mv\">h3</span> o <span class=\"mv\">g3</span>) para no sufrir un mate del pasillo.</li><li>Cambiar la torre activa por la pasiva del rival: si su torre domina la columna, no la ofrezcan sin necesidad.</li><li>Ir a la séptima cuando el rival puede cerrarla o expulsar la torre con ganancia de tiempo.</li></ul><h4>Preguntas para la partida</h4><ul><li>¿Qué columnas están abiertas o se pueden abrir con un cambio de peones?</li><li>¿Quién llega primero? ¿Puedo doblar antes de que el rival se oponga?</li><li>¿Qué hay para atacar en la séptima? ¿Mi rey está a salvo de un mate en la primera?</li></ul><h4>Torres y peones pasados</h4><p>Una regla relacionada, de los finales: la torre va <b>detrás</b> de los peones pasados, tanto de los propios (los empuja) como de los del rival (los frena desde atrás, y cada avance le da más alcance). Una torre delante del peón queda pasiva y atada.</p>",
  "keyPoints": [
   "Primero den aire al rey; después lancen las torres.",
   "Doblen las torres para ganar una columna disputada."
  ],
  "positions": [
   {
    "fen": "1r4k1/5ppp/p3p3/1p6/8/P3P3/1P3PPP/2R3K1 w - - 0 1",
    "orientation": "white",
    "caption": "Dueño de la columna c: antes de entrar con la torre, las blancas acercan el rey.",
    "line": [
     "Kf1",
     "h5",
     "Rc6",
     "a5",
     "b3",
     "Kh7",
     "Rc5",
     "h4"
    ],
    "comments": [
     "Primero el rey: se acerca al centro y deja la primera fila a salvo de jaques.",
     "Las negras ganan espacio en el flanco de rey.",
     "La torre entra en la sexta fila y ataca e6 y a6.",
     "El peón se aleja del ataque.",
     "Se asegura el peón de b.",
     "El rey negro busca actividad.",
     "La torre ataca los peones de a5 y b5 desde la quinta fila.",
     "Ligera ventaja blanca (menos de medio peón según el motor): dominar la columna no gana por sí solo, pero obliga al rival a defenderse."
    ]
   },
   {
    "fen": "2rr2k1/pp3ppp/4p3/8/6n1/4PN2/PP3PPP/2RR2K1 w - - 1 2",
    "orientation": "white",
    "caption": "Ganar la columna con un cambio y entrar en la séptima solo después de dar aire al rey.",
    "line": [
     "Rxd8+",
     "Rxd8",
     "Kf1",
     "h6",
     "Rc7",
     "b5",
     "Ke2",
     "a6"
    ],
    "comments": [
     "El cambio en d8 desvía la torre de c8.",
     "Forzado.",
     "Antes de ir a la séptima, el rey se acerca al centro: si …Rd1+, tiene la casilla e2 y ya no hay mate del pasillo.",
     "Las negras dan aire a su rey.",
     "Ahora sí: la torre en la séptima ataca a7 y f7.",
     "Las negras defienden con los peones.",
     "El rey se centraliza.",
     "Ventaja blanca de algo más de un peón según el motor: la torre en la séptima ata a las negras."
    ]
   }
  ],
  "drills": [
   {
    "fen": "2rr2k1/pp3ppp/4p3/7n/8/4PN2/PP3PPP/2RR2K1 w - - 1 2",
    "caption": "Juegan blancas: las torres están enfrentadas en las columnas c y d. El caballo negro se fue al borde. ¿Cómo se quedan con una columna?",
    "line": [
     "Rxd8+",
     "Rxd8"
    ],
    "comments": [
     "El cambio en d8 obliga a recapturar con la torre de c8, y la columna c queda en manos de la torre de c1. Si las blancas cambian en c8, es al revés: las negras se quedan con la columna d. Las demás jugadas permiten a las negras cambiar primero.",
     "Forzado. Ojo: ahora no se juega Rc7 de inmediato, porque …Rd1+ sería mate del pasillo. Primero Kf1 (si …Rd1+, el rey sale a e2) y después Rc7, con la torre en la séptima y ventaja clara."
    ]
   },
   {
    "fen": "8/6kp/4ppp1/p7/r7/2R3P1/5PKP/8 w - - 0 2",
    "caption": "Juegan blancas: tienen dos peones menos en este final de torres. ¿Dónde debe ir su torre?",
    "line": [
     "Rc7+",
     "Kh6"
    ],
    "comments": [
     "A la séptima, con jaque: la torre empuja al rey negro al borde, ataca h7 y queda lista para atacar los peones desde atrás. Las jugadas pasivas (h4, f4) dejan un final mucho peor.",
     "El rey se esconde en h6. Las blancas siguen con Rc6 (o Rf7), atacando los peones desde el costado. La torre activa reduce la desventaja casi a la mitad según el motor."
    ]
   },
   {
    "fen": "1r4k1/1p3ppp/4p3/1p6/8/P3PP2/1P3P1P/2R3K1 w - - 0 1",
    "caption": "Juegan blancas: la columna c es suya. Las negras tienen peones doblados en b7 y b5. ¿Cómo se aprovecha la columna?",
    "line": [
     "Rc5",
     "b4",
     "a4"
    ],
    "comments": [
     "La torre entra en la quinta fila por la columna abierta y ataca el peón de b5, que no puede ser defendido por otro peón. Las jugadas tranquilas (f4, Rc3) dan bastante menos.",
     "Las negras avanzan el peón para no perderlo enseguida.",
     "Ahora no hay que capturar (axb4 deja al rival respirar): a4 deja al peón de b4 aislado y bloqueado, y la torre lo recogerá con Rb5. Más de dos peones de ventaja según el motor."
    ]
   },
   {
    "fen": "r4rk1/1p3ppp/p1p1p3/8/8/2P1P3/PP3PPP/3R1RK1 w - - 0 1",
    "caption": "Juegan blancas: la columna d está abierta y ninguna torre negra la vigila. ¿Cuál es la jugada?",
    "line": [
     "Rd7",
     "Rab8"
    ],
    "comments": [
     "La torre entra en la séptima antes de que las negras puedan oponerse: ataca b7 y encierra al rey en la octava fila. Ir solo a d6 o d4 permite a las negras disputar la columna con …Rfd8.",
     "Las negras defienden b7. Las blancas doblan con Rfd1 y dominan la columna y la séptima fila: alrededor de un peón de ventaja según el motor."
    ]
   }
  ]
 },
 "m-alfiles": {
  "html": "<h4>Por qué la pareja vale más que la suma</h4><p>Un alfil solo controla casillas de un color; el rival puede colocar sus peones y su rey en el otro color y escapar de él. Dos alfiles juntos controlan todo el tablero: no hay casilla donde esconderse. Además, se complementan en el ataque y en la defensa, y en el final apoyan peones pasados de cualquier color. Su fuerza crece cuando la posición está <b>abierta</b> (pocos peones en el centro) y cuando hay <b>peones en ambos flancos</b>, porque las piezas de corto alcance no pueden atender las dos alas a la vez.</p><h4>Cómo se juega con la pareja</h4><ol><li><b>Abrir la posición</b>: rupturas de peones que eliminen las cadenas centrales. Cada peón cambiado aumenta el alcance de los alfiles.</li><li><b>Quitar casillas a los caballos</b>: avanzar peones (a menudo en la cuarta fila) para que los caballos rivales no encuentren puestos estables. Es la técnica clásica de Steinitz: restringir antes de atacar.</li><li><b>No cambiar un alfil sin motivo</b>: a menudo basta mantener la tensión y obligar al rival a cambiar en malas condiciones. Si hay que cambiar, normalmente se entrega el alfil menos activo, no la pareja entera.</li><li><b>Llevar la partida al final</b>: con menos piezas, la ventaja de los alfiles se hace más pura. Un final de dos alfiles contra alfil y caballo con peones en ambos flancos es una ventaja seria.</li></ol><h4>Cómo jugar contra la pareja</h4><ul><li>Mantener el centro cerrado y los peones fijos.</li><li>Conseguir un puesto avanzado permanente para un caballo.</li><li>Cambiar uno de los alfiles, aunque cueste una pequeña concesión: el alfil restante ya no es tan temible.</li><li>Crear amenazas concretas: la pareja es una ventaja a largo plazo; si el poseedor tiene que defenderse, sus alfiles valen poco.</li></ul><h4>Excepciones y errores frecuentes</h4><ul><li>Con la posición bloqueada, dos alfiles pueden ser peores que alfil y caballo: un alfil que choca contra sus propios peones es malo aunque tenga compañero.</li><li>Abrir la posición cuando el rival está mejor desarrollado: los alfiles necesitan tiempo para colocarse.</li><li>Conservar la pareja a toda costa y perder tempos: «tener la pareja» no es un plan, es una ventaja que hay que usar.</li></ul><h4>Preguntas para la partida</h4><ul><li>¿Qué ruptura abre la posición a favor de mis alfiles?</li><li>¿Dónde querría poner el rival sus caballos? ¿Puedo quitarles esas casillas con peones?</li><li>¿Me conviene cambiar damas y torres para ir a un final?</li></ul><h4>Una pregunta de control</h4><p>Antes de cada cambio, quien tiene la pareja debe preguntarse: «¿pierdo la pareja con esta jugada? ¿Qué recibo a cambio?». A veces la respuesta es un peón o una estructura mejor, y entonces el cambio es correcto: la pareja es una ventaja, no un tesoro que se guarda para siempre.</p>",
  "keyPoints": [
   "Con la pareja: abran la posición y quiten casillas a los caballos con peones.",
   "Contra la pareja: cierren el centro y busquen un puesto fijo para el caballo."
  ],
  "positions": [
   {
    "fen": "rnbqk2r/pp3ppp/4p3/2Pn4/8/P1P2P2/4P1PP/R1BQKBNR b KQkq - 0 8",
    "orientation": "white",
    "caption": "Pareja de alfiles contra estructura: las blancas tienen dos alfiles y peones doblados; las negras, desarrollo y casillas.",
    "line": [
     "Qa5",
     "e4",
     "Nf6",
     "Be3",
     "O-O",
     "Qb3",
     "Qc7",
     "Rd1"
    ],
    "comments": [
     "La dama ataca los peones débiles de c3 y c5.",
     "Las blancas ocupan el centro y expulsan al caballo.",
     "El caballo se retira.",
     "El alfil defiende c5 y se coloca en una diagonal útil.",
     "Las negras enrocan.",
     "La dama defiende c3 por la tercera fila y presiona b7.",
     "La dama negra apunta a c5 y e5.",
     "Posición equilibrada según el motor: los alfiles compensan la estructura, pero las blancas deben abrir el juego antes de que los peones de c caigan."
    ]
   },
   {
    "fen": "4k3/pp3ppp/2n1p3/3n4/8/1P2PB2/PB3PPP/6K1 b - - 0 1",
    "orientation": "white",
    "caption": "Final de dos alfiles contra dos caballos con peones en ambos flancos. Juegan negras.",
    "line": [
     "g6",
     "g4",
     "Ncb4",
     "a3",
     "Nd3",
     "Bd4",
     "b6",
     "Kf1"
    ],
    "comments": [
     "Las negras evitan que la gran diagonal ataque g7 y quitan casillas al alfil de f3.",
     "Las blancas avanzan un peón para quitar f5 a los caballos.",
     "El caballo busca casillas en el campo blanco.",
     "Un peón lo expulsa.",
     "El caballo se instala en d3, pero sin apoyo de peones no es un puesto estable.",
     "El alfil se centraliza y controla casillas en ambos flancos.",
     "Las negras protegen sus peones.",
     "El rey se acerca para expulsar al caballo de d3. Ventaja blanca de casi medio peón: con dos alfiles y peones en ambos flancos, el tiempo juega a su favor."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r2qrbk1/1b1n1pp1/p2p3p/1ppP4/Pn2P3/5N1P/1PBN1PP1/R1BQR1K1 b - - 2 17",
    "caption": "Juegan negras (Española cerrada): las blancas acaban de jugar Bc2. ¿Qué desequilibrio pueden conseguir las negras y cómo lo aprovechan después?",
    "line": [
     "Nxc2",
     "Qxc2"
    ],
    "comments": [
     "El caballo de b4 se cambia por el alfil de c2, el mejor alfil blanco: las negras se quedan con la pareja de alfiles. Las alternativas (…Nb6, …c4) llevan a una posición igualada.",
     "Forzado. Ahora el plan es abrir la posición para los alfiles con …f5, que golpea la base e4: con la pareja, abrir es la regla. Ventaja negra de más de un peón según el motor."
    ]
   },
   {
    "fen": "4k3/pp3ppp/2n1p3/5n2/8/1P2P3/PB3PPP/3BK3 w - - 0 1",
    "caption": "Juegan blancas: dos alfiles contra dos caballos. El caballo de f5 está bien colocado. ¿Cómo se lo quitan y qué se gana?",
    "line": [
     "g4",
     "Nd6",
     "Bxg7"
    ],
    "comments": [
     "Un peón expulsa al caballo: es la técnica clásica contra los caballos, quitarles las casillas estables con peones. Y el caballo de f5 era el que defendía g7.",
     "El caballo se retira al centro (en h4 o h6 estaría peor aún).",
     "El alfil de b2 aprovecha la gran diagonal abierta: un peón de más y los alfiles dominando. Más de tres peones de ventaja según el motor."
    ]
   },
   {
    "fen": "rnbqk2r/pp4pp/4p3/2Pn1p2/5B2/P1P2P2/4P1PP/R2QKBNR b KQkq - 1 9",
    "caption": "Juegan negras (Nimzoindia, variante Sämisch): las blancas tienen la pareja de alfiles a cambio de su estructura. Acaban de jugar Bf4. ¿Qué hacen las negras?",
    "line": [
     "Nxf4",
     "Qa4+"
    ],
    "comments": [
     "Se cambia uno de los alfiles: contra la pareja, eliminar uno de los dos es casi siempre buena idea, y además las negras ganan tiempo. Las alternativas (…Qa5, …Qf6) permiten a las blancas conservar su pareja.",
     "La dama da jaque y recuperará el caballo de f4. Tras …Nc6 Qxf4 e5 las negras tienen buen juego: el alfil blanco que queda no es tan temible y los peones de c3 y c5 son débiles."
    ]
   },
   {
    "fen": "rnbqk1nr/ppp1bppp/3p4/8/2B1P3/8/PB2NPPP/RN1QK2R w KQkq - 2 7",
    "caption": "Juegan blancas (Gambito Danés): entregaron dos peones a cambio de dos alfiles activos. Las negras acaban de jugar …Be7. ¿Qué alfil manda en el tablero?",
    "line": [
     "Bxg7",
     "Bf6",
     "Bxh8",
     "Bxh8"
    ],
    "comments": [
     "El alfil de b2, en la gran diagonal abierta: Bxg7 gana un peón y ataca la torre de h8. Qb3 contra f7 también es buena, pero da bastante menos.",
     "La mejor: el alfil negro ataca al de g7.",
     "Las blancas toman la torre: alfil por torre.",
     "Las negras recuperan el alfil, pero las blancas ganaron la calidad y su alfil de c4 sigue apuntando a f7 (unos dos peones y medio de ventaja según el motor)."
    ]
   }
  ]
 },
 "m-alfil-malo": {
  "html": "<h4>Malo no siempre quiere decir inútil</h4><p>Un alfil es <b>malo</b> cuando sus propios peones centrales están fijos en casillas de su color. Pero «malo» describe su movilidad, no su valor: un alfil malo puede defender peones débiles, sostener la estructura o salir por fuera de la cadena y ser muy activo. La frase clásica es que «los alfiles malos protegen a los peones buenos». El problema serio aparece en el final, cuando ese alfil tiene que defender peones que están en su mismo color y el rey rival entra por las casillas del otro color, que nadie controla.</p><h4>Cómo se aprovecha el alfil malo del rival</h4><ol><li><b>Fijar sus peones</b> en el color de su alfil: si el rival tiene peones en casillas oscuras y alfil de casillas oscuras, no le permitan cambiarlos.</li><li><b>Cambiar las piezas buenas del rival</b>: si se cambian sus caballos y su alfil bueno, queda solo el malo.</li><li><b>Entrar por las casillas del otro color</b>: el rey o el caballo atacan desde casillas que el alfil malo nunca podrá controlar.</li><li><b>Ir al final</b>: en un final de caballo contra alfil malo, o de alfil bueno contra alfil malo, el bando del alfil malo suele sufrir mucho.</li></ol><h4>Cómo se arregla el propio alfil malo</h4><ul><li>Cambiarlo por una pieza rival activa, a veces por un caballo bien situado.</li><li>Sacarlo fuera de la cadena antes de cerrarla (<span class=\"mv\">Bf5</span> o <span class=\"mv\">Bg4</span> antes de <span class=\"mv\">e6</span>).</li><li>Cambiar la estructura con una ruptura que ponga los peones en el otro color.</li><li>Colocarlo detrás de la cadena para defender los peones y no perder material.</li></ul><h4>La regla de los peones en el final</h4><p>En los finales con alfil, la regla general es colocar los peones en casillas del color <b>contrario</b> al del propio alfil: así el alfil controla las casillas que los peones no cubren y el rey rival no encuentra entrada. Hay una excepción práctica: si el rival tiene un alfil del mismo color que sus peones, esos peones quedan expuestos a sus ataques; en ese caso deben estar bien defendidos o fuera de su alcance. Y si ustedes tienen caballo contra alfil, conviene colocar los peones en casillas del color contrario al del alfil rival: así el alfil no encuentra objetivos y el caballo tiene casillas de apoyo.</p><h4>Errores frecuentes</h4><ul><li>Cerrar la cadena en el color del propio alfil sin haberlo sacado antes.</li><li>Cambiar el alfil bueno y quedarse con el malo.</li><li>En el final, avanzar peones al color del propio alfil «para ganar espacio», regalando casillas al rey rival.</li></ul><h4>Un ejemplo sencillo</h4><p>En la Francesa, las negras pueden cambiar su alfil malo con <span class=\"mv\">b6</span> y <span class=\"mv\">Ba6</span>, aunque eso cueste un par de tiempos. Es una inversión típica: un problema estratégico duradero vale más que un tiempo de desarrollo.</p>",
  "keyPoints": [
   "En el final, pongan sus peones en casillas del color contrario al de su alfil.",
   "Contra un alfil malo, cambien las piezas buenas del rival y entren por el otro color."
  ],
  "positions": [
   {
    "fen": "r3kbnr/p1pq1ppp/np2p3/3pP3/3P4/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 7",
    "orientation": "black",
    "caption": "Francesa del avance: las negras cambiaron su alfil malo de c8 por el alfil bueno de las blancas con …b6 y …Ba6.",
    "line": [
     "Qe2",
     "Nb8",
     "O-O",
     "Ne7",
     "Rd1",
     "h6",
     "a4",
     "a5"
    ],
    "comments": [
     "La dama recupera el control de las casillas blancas.",
     "El caballo vuelve desde a6 hacia c6.",
     "Las blancas enrocan.",
     "El otro caballo se desarrolla.",
     "La torre se coloca detrás del peón de d4.",
     "Las negras preparan …Nf5 sin temer Ng5.",
     "Las blancas ganan espacio en el flanco de dama.",
     "Pequeña ventaja blanca (algo menos de un peón): las negras resolvieron el problema de su alfil malo, aunque lo pagaron con tiempo."
    ]
   },
   {
    "fen": "4k3/4b3/1p1p4/pP1Pp1p1/P3P1P1/3K4/8/4N3 w - - 0 1",
    "orientation": "white",
    "caption": "Alfil malo, pero sin entrada para el rey blanco: los peones de e4 y g4 no dejan pasar al rey por f5. El alfil malo defiende y el final es tablas.",
    "line": [
     "Nc2",
     "Bf6",
     "Na3",
     "Bd8",
     "Ke3",
     "Kd7",
     "Nc4",
     "Kc7"
    ],
    "comments": [
     "El caballo busca la casilla c4 para atacar b6 y d6.",
     "El alfil se prepara para defender desde d8.",
     "El caballo sigue su ruta.",
     "Ahora el alfil defiende b6 y está listo para cubrir d6 desde c7.",
     "El rey blanco busca una entrada.",
     "El rey negro se acerca para defender d6.",
     "El caballo llega a c4.",
     "Todo defendido: tablas según el motor. Un alfil malo que protege a sus peones puede bastar si el rey rival no tiene por dónde entrar."
    ]
   }
  ],
  "drills": [
   {
    "fen": "6k1/3b1p2/4p3/1p1pPp1p/1P1P1P1P/3B2P1/6K1/8 w - - 0 1",
    "caption": "Juegan blancas: final de alfiles del mismo color. Todos los peones negros están en casillas blancas, como su alfil. ¿Qué peón atacan?",
    "line": [
     "Be2",
     "Kg7",
     "Bxh5"
    ],
    "comments": [
     "Be2 ataca h5, y el alfil negro no puede defenderlo: sus propios peones de f7 y e6 le cierran el camino hacia h5 y g4. Los peones en el color del propio alfil son blancos fijos. Las demás jugadas no consiguen nada (el motor da cerca de un peón y medio con Be2 y cero con las otras).",
     "Las negras no tienen una defensa cómoda.",
     "Bxh5 gana un peón. Las blancas quedan con ventaja y las negras siguen con su alfil malo."
    ]
   },
   {
    "fen": "8/3b1p1k/4p1p1/1p1pP2p/1P3P1P/3P2P1/4B1K1/8 w - - 0 1",
    "caption": "Juegan blancas: el alfil negro es malo (los peones b5, d5, e6, g6 y h5 están en casillas blancas). ¿Qué pieza blanca debe ponerse en marcha?",
    "line": [
     "Kf3",
     "Kg7"
    ],
    "comments": [
     "El rey. Kf3 y luego Ke3-d4-c5: el rey entra por las casillas negras, que el alfil de d7 nunca podrá controlar. Las jugadas de alfil (Bf3) o de peón (g4) no consiguen nada.",
     "El rey negro se acerca, pero no puede vigilar las casillas negras del flanco de dama. Las blancas siguen con Ke3, Kd4 y Kc5: el rey entra por donde el alfil nunca llega. El motor da casi cinco peones de ventaja."
    ]
   },
   {
    "fen": "4k3/4b3/1p1p4/pP1Pp1p1/P5P1/3K1P2/8/4N3 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil malo (los peones negros a5, b6, d6, e5 y g5 están en casillas negras, como el alfil). ¿Por dónde entra el rey blanco?",
    "line": [
     "Ke4",
     "Kf7"
    ],
    "comments": [
     "Ke4 y luego Kf5: el rey entra por las casillas blancas, que el alfil no puede vigilar, y atacará g5. Las otras jugadas (f4, Nc2) dan mucho menos.",
     "Las negras no pueden impedirlo: tras Kf5 el peón de g5 cae y el final está ganado."
    ]
   }
  ]
 },
 "m-caballo-alfil": {
  "html": "<h4>La pregunta correcta: ¿hay casillas fijas?</h4><p>El caballo es una pieza de corto alcance que salta: no lo bloquean los peones, pero tarda mucho en ir de un flanco a otro (de <span class=\"mv\">a4</span> a <span class=\"mv\">h4</span> necesita al menos cuatro jugadas). El alfil es rápido y de largo alcance, pero solo ve un color. De ahí sale todo: el caballo es fuerte cuando hay <b>casillas fijas</b> (puestos avanzados, peones bloqueados que atacar) y el juego está concentrado en <b>una zona</b>; el alfil es fuerte cuando la posición es <b>abierta</b>, hay <b>peones en ambos flancos</b> o hay un <b>peón pasado</b> que apoyar o detener a distancia.</p><h4>Final de caballo contra alfil malo</h4><p>Es el ideal del caballo. Los peones rivales están fijos en el color de su alfil, que solo puede defenderlos. El método:</p><ol><li>Fijar los peones rivales en el color de su alfil (no los dejen moverse al otro color).</li><li>Llevar el rey por las casillas del color que el alfil no controla.</li><li>Usar el caballo para atacar los peones fijos y obligar al alfil o al rey rival a quedarse atados.</li><li>Buscar el zugzwang: cuando el rival solo puede mover el alfil entre dos casillas, una jugada de espera del caballo o del rey puede obligarlo a soltar un peón.</li></ol><h4>Final de alfil contra caballo con peones en ambos flancos</h4><p>Aquí manda el alfil. El plan es crear un peón pasado en un flanco (o tenerlo ya) y atacar en el otro: el caballo no puede atender ambos. El alfil detiene un peón pasado desde lejos, sin necesidad de estar delante, mientras el rey trabaja en el otro lado. Un recurso típico es la <b>dominación</b>: el alfil, a distancia, le quita al caballo todas sus casillas de salida.</p><h4>Cambiar hacia la pieza buena</h4><p>Muchas decisiones del medio juego son elegir qué pieza menor conservar. Si la estructura va a quedar cerrada y con puestos fijos, conviene cambiar el alfil por un caballo y quedarse con el propio caballo; si la posición se va a abrir o habrá peones en ambos flancos, conviene conservar el alfil. Antes de cambiar, imaginen la posición con solo esas piezas y los peones: muchas veces la respuesta salta a la vista.</p><h4>Errores frecuentes</h4><ul><li>Con caballo: poner los peones propios en casillas del color del alfil rival, dándole objetivos.</li><li>Con alfil: cerrar la posición con avances de peones «para ganar espacio».</li><li>Con caballo: alejarlo hacia el borde para ganar un peón y no poder volver a tiempo al otro flanco.</li><li>Con alfil: olvidar que el caballo es muy bueno contra peones pasados bloqueados, porque desde la casilla de bloqueo ataca casillas de los dos colores.</li></ul><h4>Preguntas para la partida</h4><ul><li>¿La posición se va a abrir o a cerrar? ¿Hay peones en un solo flanco o en ambos?</li><li>¿De qué color son las casillas donde están fijos los peones de cada bando?</li><li>¿Mi caballo tiene un puesto fijo desde donde ataque algo?</li></ul>",
  "keyPoints": [
   "Caballo: casillas fijas y juego en un solo flanco. Alfil: posición abierta y peones en ambos flancos.",
   "Antes de cambiar una pieza menor, imaginen el final resultante."
  ],
  "positions": [
   {
    "fen": "r1bqk2r/pp3ppp/2np1n2/2p1p3/2PP4/2PBPN2/P4PPP/R1BQ1RK1 w kq - 0 9",
    "orientation": "black",
    "caption": "Nimzoindia, sistema Hübner: las negras cambiaron su alfil por caballo y cerraron el centro para que sus caballos valgan más que los alfiles blancos.",
    "line": [
     "Nd2",
     "O-O",
     "Ne4",
     "Nxe4",
     "Bxe4",
     "Ne7",
     "dxe5",
     "dxe5"
    ],
    "comments": [
     "Las blancas buscan cambiar un par de caballos para que sus alfiles tengan más espacio.",
     "Las negras enrocan.",
     "El caballo ofrece el cambio.",
     "Las negras aceptan.",
     "El alfil recaptura en el centro.",
     "El caballo se reorganiza hacia g6 o c6.",
     "Las blancas abren la columna d.",
     "Posición equilibrada según el motor: los alfiles blancos tienen algo más de espacio, pero los peones de c3 y c4 son débiles."
    ]
   },
   {
    "fen": "8/p4pk1/1p2p1p1/8/P1B5/1P2P1P1/5PK1/1n6 w - - 0 1",
    "orientation": "white",
    "caption": "Alfil contra caballo sin dominación: si el caballo encuentra casillas, el final se iguala.",
    "line": [
     "Bd3",
     "Nc3",
     "f4",
     "Kf6",
     "e4",
     "e5",
     "Kf3",
     "g5"
    ],
    "comments": [
     "El alfil vigila b1 y a2, pero no le quita al caballo la casilla c3.",
     "El caballo sale del borde y ataca a4.",
     "Las blancas ganan espacio en el flanco de rey.",
     "El rey negro se centraliza.",
     "Las blancas siguen avanzando.",
     "Las negras se oponen en el centro.",
     "El rey blanco se activa.",
     "Tablas según el motor: con peones en un solo bloque y el caballo activo, el alfil no tiene objetivos."
    ]
   }
  ],
  "drills": [
   {
    "fen": "4k3/4b3/1p1p4/pP1Pp1p1/P3P1P1/3K4/3N4/8 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil malo. ¿Cuál es la mejor casilla para el caballo?",
    "line": [
     "Nc4",
     "Bd8",
     "Nxd6+"
    ],
    "comments": [
     "Nc4 ataca a la vez d6 y b6, dos peones fijos en el color del alfil. El alfil solo puede defender uno. Las demás jugadas dejan la posición igualada.",
     "El alfil defiende b6, pero d6 queda indefenso.",
     "El caballo gana un peón con jaque y luego volverá a c4. Más de cuatro peones de ventaja según el motor."
    ]
   },
   {
    "fen": "8/p4pk1/1p2p1p1/2B5/P7/4P1P1/1P3PK1/1n6 w - - 0 1",
    "caption": "Juegan blancas: alfil contra caballo. El caballo negro está en el borde, en b1. ¿Cómo se aprovecha?",
    "line": [
     "Bb4",
     "f5"
    ],
    "comments": [
     "Bb4 le quita al caballo todas sus casillas de salida (a3, c3 y d2): es la dominación, el gran recurso del alfil contra el caballo. Después el rey blanco irá a buscarlo. Con otras jugadas el caballo escapa y la ventaja desaparece.",
     "Las negras buscan contrajuego con los peones, pero el caballo no tiene salida: el rey blanco se acercará por f3, e2 y d1 para capturarlo."
    ]
   },
   {
    "fen": "6k1/3b1p2/4p1p1/1p1pP3/1P1P1PpP/2N3P1/6K1/8 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil malo. ¿Qué peón negro es el más débil y cómo llega el caballo hasta él?",
    "line": [
     "Nd1",
     "Kg7"
    ],
    "comments": [
     "El peón de g4 está adelantado y lejos de su rey. Nd1 y luego Nf2 (o Ne3): desde allí el caballo lo ataca y el alfil, encerrado detrás de sus peones, no llega a defenderlo. Una retirada que en realidad es un avance. Las jugadas de rey dan una ventaja mínima.",
     "El rey negro no llega a tiempo. Tras Nf2 y Nxg4 las blancas ganan un peón con ventaja decisiva."
    ]
   }
  ]
 },
 "m-profilaxis": {
  "html": "<h4>La pregunta de Dvoretsky en la práctica</h4><p>«¿Qué haría mi rival si fuera su turno?» parece obvio, pero casi nadie se lo pregunta de forma sistemática. La técnica consiste en imaginar que le pasan el turno al rival y buscar su mejor jugada: una ruptura, una maniobra de caballo, una entrada de torre, un sacrificio. Si esa jugada mejora mucho su posición, la jugada correcta suele ser la que la impide, aunque no haga nada «activo». La profilaxis no es pasividad: es eliminar el único plan del rival para que su posición se quede sin futuro.</p><h4>Tipos de jugadas profilácticas</h4><ul><li><b>Contra una ruptura de peón</b>: <span class=\"mv\">a4</span> contra <span class=\"mv\">b5</span>, <span class=\"mv\">f3</span> contra <span class=\"mv\">f5</span>, <span class=\"mv\">h4</span> contra <span class=\"mv\">g5</span>.</li><li><b>Contra una pieza</b>: quitarle la casilla a un caballo (<span class=\"mv\">h3</span> contra <span class=\"mv\">Ng4</span>, <span class=\"mv\">c3</span> contra <span class=\"mv\">Nd4</span>) o cambiar la pieza más activa del rival.</li><li><b>Contra una columna</b>: oponer una torre, o cubrir las casillas de entrada con piezas menores.</li><li><b>Sobreprotección</b>: defender de más un punto clave (Nimzowitsch) para que las piezas que lo defienden queden libres para otros trabajos.</li><li><b>Profilaxis del rey</b>: <span class=\"mv\">Kh1</span> o <span class=\"mv\">Kb1</span> antes de abrir el juego, para evitar jaques con tempo y clavadas en la diagonal.</li></ul><h4>Profilaxis en el final</h4><p>En los finales la profilaxis se llama a menudo «cortar al rey» o «impedir el contrajuego». Una torre que corta al rey rival en una columna, un peón que se queda en su casilla para no dejar entrar al rey, una jugada de rey que anticipa la llegada del rival: todas son profilácticas. Cuando se tiene ventaja, la técnica correcta es quitar al rival cualquier esperanza antes de ir a por la victoria.</p><h4>Errores frecuentes</h4><ul><li>Hacer jugadas «profilácticas» contra amenazas que no existen: cada tempo perdido cuenta. La profilaxis responde a un plan real del rival.</li><li>Ignorar la ruptura del rival porque «todavía no la jugó». Muchas veces, cuando la juega, ya es tarde.</li><li>Confundir profilaxis con defensa pasiva: la mejor profilaxis suele ser una jugada que impide el plan rival <i>y</i> mejora una pieza propia.</li><li>Crear una debilidad nueva al impedir un plan (por ejemplo, un avance de peón que deja un agujero).</li></ul><h4>Lista de comprobación</h4><ol><li>¿Cuál es la mejor jugada del rival si yo pasara?</li><li>¿Es peligrosa? Si no, sigan con su plan.</li><li>Si lo es, ¿qué jugadas la impiden? ¿Cuál de ellas además mejora mi posición?</li><li>¿La jugada profiláctica crea una debilidad nueva?</li></ol><h4>Un ejemplo para recordar</h4><p>En la Dragón, las negras suelen jugar <span class=\"mv\">a5</span> con la idea de <span class=\"mv\">a4</span>-<span class=\"mv\">a3</span>, expulsando al alfil de b3 y abriendo líneas contra el rey blanco. La respuesta <span class=\"mv\">a4</span> de las blancas no ataca nada, pero detiene el peón negro para siempre. En los finales ocurre lo mismo con otras piezas: una torre que corta al rey rival en una fila o una columna es una jugada profiláctica que vale tanto como una ganancia de material, porque el rey cortado ya no puede defender ni atacar.</p>",
  "keyPoints": [
   "Imaginen que el rival juega dos veces seguidas: si su jugada es peligrosa, impídanla.",
   "La mejor profilaxis impide el plan rival y a la vez mejora una pieza propia."
  ],
  "positions": [
   {
    "fen": "2rq1rk1/1p1bppbp/3p1np1/p3n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R w - a6 0 13",
    "orientation": "white",
    "caption": "Dragón, ataque yugoslavo: las negras jugaron …a5 para seguir con …a4 y atrapar o expulsar al alfil de b3.",
    "line": [
     "a4",
     "h5",
     "Kb1",
     "Nc4",
     "Bxc4",
     "Rxc4",
     "b3",
     "Rc8"
    ],
    "comments": [
     "a4 detiene el peón negro en seco: ya no hay …a4-a3. Una jugada que no ataca nada, pero anula el plan rival.",
     "Las negras frenan el avance blanco en el flanco de rey.",
     "Otra jugada profiláctica: el rey sale de la diagonal g1-a7 y de la columna c.",
     "Las negras cambian el alfil de b3.",
     "Las blancas aceptan.",
     "La torre recaptura activa.",
     "Expulsa a la torre de c4.",
     "Las blancas mantienen una ventaja de alrededor de un peón y medio: sin el contrajuego de …a4, las negras están a la defensiva."
    ]
   },
   {
    "fen": "8/p4kpp/1p2p3/3pP3/3P1P2/2P5/P5PP/2bN2K1 w - - 0 1",
    "orientation": "white",
    "caption": "La misma idea en otra estructura: primero se protege f4, después se activa el rey.",
    "line": [
     "g3",
     "Kg6",
     "Kg2",
     "h5",
     "Kf2",
     "Kf5",
     "Ke2",
     "g5"
    ],
    "comments": [
     "g3 deja al alfil negro sin objetivo.",
     "El rey negro se activa.",
     "Las blancas activan el rey, ahora sin miedo.",
     "Las negras ganan espacio.",
     "El rey se dirige al centro.",
     "El rey negro llega a f5.",
     "Las blancas siguen con Kd3 y Ne3+.",
     "Ventaja blanca de un peón y medio según el motor: todos los peones blancos están en casillas negras, protegidos y lejos del alcance del alfil."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/p4kpp/4p3/p2pP3/3P1P2/2P5/P5PP/2bN2K1 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil. El alfil negro de c1 ataca el peón de f4. Antes de pensar en ganar, ¿qué quiere el rival?",
    "line": [
     "g3",
     "Kg6"
    ],
    "comments": [
     "El único objetivo del alfil es f4. Con g3 queda defendido por un peón para siempre, y todos los peones blancos centrales quedan en casillas negras protegidos entre sí: el alfil se queda sin trabajo. Las jugadas activas de rey (Kf2, Kf1) permiten …Bxf4 o …Ba3 con contrajuego.",
     "Las negras buscan actividad con el rey. Las blancas siguen con Kf2-e2 y Nf2-d3: sin contrajuego rival, la ventaja crece sola."
    ]
   },
   {
    "fen": "8/5pk1/6p1/P6p/7P/5KP1/r4P2/1R6 w - - 0 1",
    "caption": "Juegan blancas: final de torres con peón pasado en a5. La torre negra está detrás del peón. ¿Cuál es la jugada que impide el plan negro?",
    "line": [
     "Rb5",
     "Kf6"
    ],
    "comments": [
     "Rb5 defiende el peón de a5 desde el costado y, sobre todo, corta al rey negro en la quinta fila: no puede acercarse al peón. La torre blanca deja de estar atada en a1 o b1 y el rey blanco queda libre para entrar. Las jugadas pasivas (Kg2, Rc1) llevan a las tablas.",
     "El rey negro intenta acercarse por la sexta fila, pero las blancas siguen con Ke4 y su rey llega primero."
    ]
   },
   {
    "fen": "8/5pk1/7p/7p/7P/P5P1/r4PK1/1R6 w - - 0 1",
    "caption": "Juegan blancas: final de torres con un peón de más en a3. La torre negra presiona desde la segunda fila. ¿Dónde se coloca la torre blanca?",
    "line": [
     "Rb3",
     "Kg6"
    ],
    "comments": [
     "En la tercera fila: desde b3 la torre defiende a3 y también g3 y f3, de modo que la torre negra no tiene objetivos y el rey blanco puede salir de su refugio. Es profilaxis pura: antes de avanzar, se le quitan al rival todas sus amenazas. Otras jugadas (Rb5, Rc1) dejan las tablas al alcance de las negras.",
     "El rey negro se acerca. Las blancas seguirán con Kf3 y su rey irá hacia el peón de a, sin miedo a la torre negra."
    ]
   },
   {
    "fen": "r1bqk2r/pp2bppp/3ppn2/8/1nB1P3/2N2N2/PP2QPPP/R1BR2K1 w kq - 6 10",
    "caption": "Juegan blancas (Gambito Smith-Morra): el caballo negro saltó a b4 buscando d3 o c2. ¿Qué jugada lo impide y deja a las blancas listas para su plan?",
    "line": [
     "a3",
     "Nc6",
     "e5"
    ],
    "comments": [
     "a3 expulsa al caballo antes de que llegue a d3 o c2, casillas desde las que molestaría a la dama y a las torres. Quitarle casillas a la pieza más activa del rival es profilaxis. Con e5 enseguida, el caballo de b4 queda bien colocado y la ventaja es menor.",
     "El caballo tiene que volver.",
     "Ahora sí, la ruptura central con todas las piezas listas: e5 abre la columna d contra el rey negro, que sigue en el centro. Unos tres peones de ventaja según el motor."
    ]
   }
  ]
 },
 "m-enroques": {
  "html": "<h4>Contar tempos, no peones</h4><p>Con enroques opuestos, la pregunta decisiva es <b>quién abre primero una columna contra el rey rival</b>. Para responderla hay que contar: cuántas jugadas necesita cada bando para que su peón choque con los peones del enroque contrario y se abra una línea. Un peón que ya está en la quinta fila vale más que una pieza más desarrollada. Por eso en estas posiciones se sacrifican peones y calidades con naturalidad: lo que cuenta es la velocidad.</p><h4>Gancho, ruptura y sacrificio</h4><p>Para abrir líneas hace falta un <b>gancho</b>: un peón rival adelantado contra el que chocar. Si el rival jugó <span class=\"mv\">g6</span>, el avance <span class=\"mv\">h4</span>-<span class=\"mv\">h5</span> encuentra el gancho en <span class=\"mv\">g6</span>; si jugó <span class=\"mv\">h6</span>, <span class=\"mv\">g4</span>-<span class=\"mv\">g5</span> lo encuentra en <span class=\"mv\">h6</span>. Sin gancho, los peones avanzan pero no abren nada. Por eso el defensor debe evitar adelantar los peones de su enroque, y el atacante a veces fuerza el gancho con amenazas. Cuando el peón choca, a menudo se sacrifica para abrir la columna: <span class=\"mv\">h5</span> con <span class=\"mv\">gxh5</span> puede ser bueno para el atacante si la columna h queda abierta para sus torres.</p><h4>Cambiar a los defensores</h4><p>El alfil en fianchetto y el caballo de <span class=\"mv\">f6</span> son los grandes defensores. <span class=\"mv\">Bh6</span> para cambiar el alfil de <span class=\"mv\">g7</span>, <span class=\"mv\">Nd5</span> para cambiar el caballo de <span class=\"mv\">f6</span>, o <span class=\"mv\">Bxf6</span> directamente, son jugadas estándar. Del otro lado, en la Siciliana las negras buscan cambiar el caballo de <span class=\"mv\">c3</span> (a menudo con <span class=\"mv\">Rxc3</span>) porque es el que defiende <span class=\"mv\">a2</span>, <span class=\"mv\">b1</span> y <span class=\"mv\">d1</span>.</p><h4>Defender solo lo imprescindible</h4><p>Cada jugada defensiva es un tempo regalado. La regla práctica: defiendan solo cuando el ataque rival ya amenaza algo concreto (mate o pérdida grande de material) y, si pueden, defiendan con una jugada que también ataque. Un contraataque en el centro es la mejor defensa contra un ataque en el flanco: si el rey del atacante también está expuesto, abrir el centro puede ser decisivo.</p><h4>Errores frecuentes</h4><ul><li>Jugar <span class=\"mv\">a6</span>, <span class=\"mv\">h6</span> o <span class=\"mv\">b6</span> en el propio enroque «para prevenir»: crea el gancho que el rival buscaba.</li><li>Cambiar piezas atacantes por defensoras del rival: cada cambio frena el ataque propio.</li><li>Ganar material en el flanco contrario y perder tres tempos en recuperar la pieza.</li><li>Calcular solo el ataque propio y olvidar las amenazas del rival en la siguiente jugada.</li></ul><h4>Preguntas para la partida</h4><ol><li>¿Cuántas jugadas faltan para abrir una columna contra cada rey?</li><li>¿Dónde está el gancho rival? ¿Puedo provocarlo?</li><li>¿Qué pieza defensora del rival puedo cambiar?</li><li>¿Mi próxima jugada crea una amenaza? Si no, ¿la amenaza rival es más rápida?</li></ol><h4>Un consejo práctico</h4><p>Antes de lanzar los peones, muchas veces conviene una jugada de rey (<span class=\"mv\">Kb1</span> con enroque largo) que lo saque de las diagonales y columnas por donde llegarán los sacrificios del rival.</p>",
  "keyPoints": [
   "Sin gancho no hay apertura de líneas: no adelanten los peones de su enroque.",
   "Cambien al defensor clave del rey rival (alfil en fianchetto, caballo de f6)."
  ],
  "positions": [
   {
    "fen": "1r1q1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R w - - 1 13",
    "orientation": "white",
    "caption": "Dragón: el sacrificio de peón para abrir la columna h y el cambio del defensor de g7.",
    "line": [
     "h5",
     "Nxh5",
     "Bh6",
     "Bh8",
     "Bxf8",
     "Qxf8",
     "Nf5",
     "Bxf5"
    ],
    "comments": [
     "El peón choca con g6 y se ofrece para abrir la columna h.",
     "Las negras aceptan.",
     "Ahora el alfil de casillas negras ataca a la torre y busca cambiar el gran defensor de g7.",
     "Las negras conservan su alfil.",
     "Las blancas ganan la calidad.",
     "Forzado.",
     "El caballo salta con amenazas sobre e7 y h6.",
     "Las negras cambian. Las blancas tienen casi tres peones de ventaja según el motor: material de más y la columna h abierta."
    ]
   },
   {
    "fen": "2rq1rk1/pp1bppbp/3p1np1/4n3/3NP3/1BN1BP2/PPPQ2PP/2KR3R w - - 9 12",
    "orientation": "white",
    "caption": "Dragón: antes de lanzar los peones, las blancas ponen el rey fuera de la diagonal y la columna c.",
    "line": [
     "Kb1",
     "Nc4",
     "Bxc4",
     "Rxc4",
     "g4",
     "b5",
     "h4",
     "h5"
    ],
    "comments": [
     "Kb1: una jugada lenta pero útil, porque evita jaques y sacrificios en c3 con jaque.",
     "Las negras cambian el alfil de b3, que defendía el enroque blanco.",
     "Las blancas aceptan el cambio.",
     "La torre se coloca en la columna c.",
     "Empieza el avance de peones.",
     "Las negras responden con el suyo.",
     "Las blancas siguen.",
     "Las negras frenan con …h5. Ventaja blanca de alrededor de un peón: una carrera en la que cada tempo decide."
    ]
   }
  ],
  "drills": [
   {
    "fen": "2rqbrk1/pp2ppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R w - - 1 13",
    "caption": "Juegan blancas (Dragón, ataque yugoslavo, enroques opuestos): el alfil negro se retiró a e8. ¿Cómo abren las blancas la columna h?",
    "line": [
     "h5",
     "Nxh5"
    ],
    "comments": [
     "h5: el peón choca con el gancho de g6 y se sacrifica para abrir la columna h. En las carreras de ataques, un peón vale menos que una columna abierta contra el rey. g4 o Bh6 son más lentas.",
     "Si las negras no toman, hxg6 abre igualmente la columna. Tras …Nxh5, las blancas siguen con g4 (o Bh6) y la torre de h1 ya tiene una línea contra el rey."
    ]
   },
   {
    "fen": "r1bq1rk1/pp2npp1/2n1p2p/2ppP2Q/3P4/P1PB4/2P2PPP/R1B1K1NR w KQ - 0 10",
    "caption": "Juegan blancas (Francesa Winawer): las negras jugaron …h6 y su enroque tiene un gancho. El rey blanco sigue en el centro. ¿Cómo atacan?",
    "line": [
     "Bxh6",
     "gxh6",
     "Qxh6",
     "Nf5",
     "Bxf5",
     "exf5",
     "O-O-O"
    ],
    "comments": [
     "El sacrificio en h6 destruye el enroque: el gancho que creó …h6 es el punto de ruptura. Nf3 (lo «normal») da mucho menos.",
     "Aceptar es obligado; si no, las blancas ganan un peón y siguen atacando.",
     "La dama entra en h6 con amenazas sobre el rey.",
     "El caballo defiende desde f5 y tapa la diagonal del alfil de d3.",
     "Se elimina al defensor.",
     "Forzado.",
     "¡Enroque largo! El rey blanco se va al flanco opuesto y la torre de h1 se suma al ataque (Rd3-g3 o Rh3). Con los reyes en flancos opuestos, las blancas tienen todo listo y más de dos peones de ventaja según el motor."
    ]
   },
   {
    "fen": "3q1rk1/p2bppbp/3p1np1/1p6/2r1P1P1/2N1BP2/PPPQN2P/1K1R3R b - - 1 15",
    "caption": "Juegan negras (Dragón, enroques opuestos): las blancas acaban de retirar el caballo de d4 a e2. ¿Cómo aceleran las negras su ataque?",
    "line": [
     "b4",
     "Nd5",
     "Nxd5",
     "exd5",
     "Qa5"
    ],
    "comments": [
     "b4 expulsa al caballo de c3, el principal defensor del rey blanco, ganando tiempo. En las carreras de ataques, las jugadas con amenaza son las que cuentan. Las jugadas de espera (…Qb8, …Bc6) son demasiado lentas.",
     "El caballo salta al centro buscando cambios.",
     "Las negras cambian.",
     "Forzado.",
     "La dama se suma al ataque contra a2: las negras tienen la iniciativa (algo más de un peón de ventaja según el motor) mientras el ataque blanco ni siquiera empezó."
    ]
   },
   {
    "fen": "3q1rk1/p2bppbp/3p1np1/1p6/P1rNP1P1/2N1BP2/1PPQ3P/1K1R3R b - a3 0 15",
    "caption": "Juegan negras: las blancas jugaron a4 para frenar el peón de b5. ¿Fue una buena idea con el rey blanco en b1?",
    "line": [
     "bxa4",
     "g5"
    ],
    "comments": [
     "No: …bxa4 abre la columna b contra el rey blanco y el peón de a4 queda como gancho para nuevas rupturas. Adelantar los peones del propio enroque crea los ganchos que el rival necesita. Las negras quedan con unos tres peones de ventaja según el motor.",
     "Las blancas intentan seguir con su ataque, pero las negras llegan antes con …Rb8 y …Qb6 o …Qa5."
    ]
   }
  ]
 },
 "m-sac-calidad": {
  "html": "<h4>Qué se compra con una calidad</h4><p>Una calidad equivale, en términos materiales, a un peón y medio o dos. Por eso un sacrificio de calidad sin peón de compensación necesita una ventaja posicional clara y duradera. Las compensaciones típicas son: <b>destrucción de la estructura del rey</b> (por ejemplo <span class=\"mv\">Rxc3</span> con <span class=\"mv\">bxc3</span> ante un enroque largo), <b>una pieza menor dominante</b> en una casilla de la que no puede ser expulsada, <b>eliminación de una pieza clave</b> (el alfil que defendía las casillas oscuras, el caballo que bloqueaba un peón pasado), <b>peones pasados</b> que la torre no puede frenar, y <b>casillas de un color</b> que el rival ya no puede controlar.</p><h4>El sacrificio posicional y el sacrificio defensivo</h4><p>Hay dos familias. En el <b>sacrificio posicional</b> el bando que entrega la calidad busca iniciativa: abre el rey, consigue un centro móvil de peones o deja al rival con torres que no encuentran columnas. En el <b>sacrificio defensivo</b>, del que Petrosián fue el gran maestro, se entrega la calidad para eliminar la pieza atacante más peligrosa y conseguir una fortaleza: las torres del rival no tienen columnas abiertas y la pieza menor propia controla casillas clave. En ambos casos la pregunta es la misma: ¿tienen las torres del rival líneas por donde actuar?</p><h4>Cuándo NO funciona</h4><ul><li>Si la posición se va a abrir y las torres del rival encontrarán columnas, la calidad pesará en el final.</li><li>Si la pieza menor que queda no tiene un buen puesto o puede ser cambiada fácilmente.</li><li>Si el rival puede devolver la calidad cuando quiera y quedarse con un final mejor.</li><li>Si se sacrificó por «iniciativa» pero no hay ninguna amenaza concreta en las dos o tres jugadas siguientes.</li></ul><h4>Cómo evaluarlo en la partida</h4><ol><li>Cuenten: ¿recibo algún peón? Con un peón y estructura rota del rival, el sacrificio suele ser correcto.</li><li>Imaginen la posición dentro de cinco jugadas: ¿dónde estarán las torres del rival? ¿Tienen columnas?</li><li>¿Mi pieza menor tendrá un puesto fijo? ¿Puede el rival cambiarla?</li><li>¿Qué debilidad nueva aparece en el campo rival? Si es permanente, la compensación también lo es.</li></ol><h4>Errores frecuentes</h4><ul><li>Rechazar el sacrificio de calidad por puro materialismo cuando era la única forma de frenar el ataque.</li><li>Sacrificar por estética sin comprobar las amenazas concretas.</li><li>Tras sacrificar, cambiar piezas sin motivo: con menos piezas, la torre del rival se impone.</li></ul><h4>El sacrificio en c3, paso a paso</h4><p>En la Siciliana con enroque largo blanco, la secuencia típica es: torre negra en <span class=\"mv\">c8</span>, luego en <span class=\"mv\">c4</span> o <span class=\"mv\">c5</span> (a menudo tras <span class=\"mv\">Nc4</span> y el cambio del alfil de b3), y finalmente <span class=\"mv\">Rxc3</span>. Si las blancas recapturan con el peón, quedan peones doblados en la columna c, la columna b abierta y el peón de e4 sin el caballo que lo defendía; las negras siguen con <span class=\"mv\">Qa5</span>, <span class=\"mv\">Nxe4</span> o <span class=\"mv\">Rb8</span>. Si pueden recapturar con la dama sin dañar su estructura, el sacrificio suele fallar. Por eso el defensor prepara esa recaptura (dama en d2, rey en b1) antes de que llegue el golpe.</p>",
  "keyPoints": [
   "La calidad se paga con estructura rota, una pieza dominante o peones pasados.",
   "Pregunta clave: ¿las torres del rival tendrán columnas abiertas?"
  ],
  "positions": [
   {
    "fen": "3q1rk1/pp1bppbp/3p1np1/8/2rNP2P/2N1BP2/PPPQ2P1/2KR3R w - - 0 14",
    "orientation": "black",
    "caption": "Dragón: con la torre negra en c4, el sacrificio …Rxc3 siempre está en el aire. Las blancas atacan, pero deben vigilarlo.",
    "line": [
     "g4",
     "h5",
     "gxh5",
     "Nxh5",
     "Kb1",
     "a5",
     "Rhg1",
     "b5"
    ],
    "comments": [
     "Las blancas avanzan para abrir la columna g.",
     "Las negras frenan.",
     "Se abre la columna g.",
     "El caballo recupera el peón.",
     "El rey sale de la columna c, lejos de un posible …Rxc3 con jaque.",
     "Las negras lanzan sus peones.",
     "La torre ocupa la columna g contra el rey negro.",
     "Las negras siguen con …b4. Ventaja blanca de más de un peón y medio según el motor: aun así, el sacrificio en c3 sigue siendo el recurso principal de las negras."
    ]
   },
   {
    "fen": "3q1rk1/p2bppbp/3p1np1/1p6/2rNP1P1/2N1BP2/PPPQ3P/1K1R3R w - b6 0 15",
    "orientation": "white",
    "caption": "Dragón: las negras amenazan …b4 y …Rxc3. Las blancas deben acelerar.",
    "line": [
     "h4",
     "b4",
     "Nce2",
     "Qa5",
     "h5",
     "Rfc8",
     "Bh6",
     "Bh8"
    ],
    "comments": [
     "Las blancas avanzan el peón h.",
     "Las negras expulsan al caballo de c3.",
     "El caballo se retira a e2, donde defiende c3 y el enroque.",
     "La dama apunta a a2.",
     "El peón llega a h5.",
     "Las negras doblan en la columna c.",
     "Las blancas buscan cambiar el alfil de g7.",
     "Las negras conservan su alfil. Ventaja blanca cercana a un peón: aquí el caballo de e2 y la jugada Kb1 quitaron fuerza al sacrificio en c3."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3q1rk1/p2bppbp/3p1npB/1p6/2rNP1P1/2N2P2/PPPQ3P/1K1R3R b - - 1 15",
    "caption": "Juegan negras: las blancas jugaron Bh6 para cambiar el alfil de g7. ¿Qué entrega de calidad aprovecha el momento?",
    "line": [
     "Rxd4",
     "Qxd4",
     "Bxh6"
    ],
    "comments": [
     "¡La torre se entrega por el caballo de d4! Así el alfil de h6 queda sin protección (la dama, que lo defendía, debe recapturar en d4). Las alternativas (…Nxe4, …Bxh6) dan mucho menos.",
     "Si no recapturan, las negras se quedan con una pieza de más.",
     "Las negras ganan el alfil: entregaron la torre por caballo y alfil, y quedan con dos piezas menores por torre y un alfil de casillas negras muy activo. Casi tres peones de ventaja según el motor."
    ]
   },
   {
    "fen": "3q1rk1/pp1bppbp/3p1np1/6B1/2rNP2P/2N2P2/PPPQ2P1/2KR3R b - - 1 14",
    "caption": "Juegan negras (Dragón): las blancas jugaron Bg5. Calculen: ¿qué combinación de pieza y calidad destroza el centro blanco?",
    "line": [
     "Nxe4",
     "fxe4",
     "Rxd4"
    ],
    "comments": [
     "…Nxe4 elimina el peón central y prepara la jugada siguiente en la columna d.",
     "Las blancas recapturan.",
     "La torre de c4, colocada para los sacrificios de calidad, toma el caballo de d4: si Qxd4, …Bxd4. Las negras recuperan la pieza con un peón de más y la gran diagonal del alfil de g7 abierta hacia b2 (unos dos peones de ventaja según el motor)."
    ]
   },
   {
    "fen": "3q1rk1/pp1bppb1/3p1np1/7p/2rNP2P/2N1BP2/PPP1Q1P1/1K1R3R b - - 1 15",
    "caption": "Juegan negras (Dragón): la dama blanca se fue a e2. ¿Qué sacrificio posicional es el tema de esta estructura?",
    "line": [
     "Rxc3",
     "bxc3"
    ],
    "comments": [
     "El clásico …Rxc3: la calidad se entrega para eliminar el caballo que defendía el enroque blanco y para romper los peones del rey (c3 y c2 doblados, columna b abierta). Las jugadas tranquilas (…Qc8, …Rc5) dejan a las blancas ligeramente mejor.",
     "Forzado. Las negras siguen con …Qc7 o …Qa5, …Rc8 y …Nxe4: los peones de c3 y a2 son blancos y el rey blanco no tiene refugio. El motor ya considera la posición favorable a las negras."
    ]
   },
   {
    "fen": "3q1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1Br1BP2/PPPQ2P1/2KR3R w - - 0 13",
    "caption": "Juegan blancas: las negras acaban de entregar la calidad en c3. ¿Cómo hay que recapturar para que el sacrificio no funcione?",
    "line": [
     "Qxc3",
     "b5"
    ],
    "comments": [
     "Con la dama: la estructura del enroque queda intacta y las negras no reciben nada a cambio de la calidad. Tras bxc3 los peones doblados y la columna b abierta darían a las negras la compensación que buscaban (el motor da dos peones de ventaja con Qxc3 y casi cero con bxc3).",
     "Las negras buscan contrajuego en el flanco de dama, pero las blancas siguen con h5 y su calidad de más pesa."
    ]
   }
  ]
 },
 "m-iniciativa": {
  "html": "<h4>Qué es exactamente la iniciativa</h4><p>Tener la iniciativa significa que tus jugadas obligan al rival a responder a tus amenazas, en lugar de hacer las suyas. No es lo mismo que atacar al rey: se puede tener la iniciativa atacando un peón débil, una pieza mal situada o una columna. La ventaja de desarrollo es la materia prima de la iniciativa: si tienes más piezas en juego, puedes crear amenazas más rápido de lo que el rival puede defenderlas.</p><h4>Cómo se usa una ventaja de desarrollo</h4><ol><li><b>Abrir el centro</b>: una ruptura de peón (<span class=\"mv\">d4</span>, <span class=\"mv\">e5</span>, <span class=\"mv\">d5</span>) abre las líneas por donde entran tus piezas, que ya están listas. El rival, con piezas sin desarrollar, no puede aprovechar esas mismas líneas.</li><li><b>Atacar el rey en el centro</b>: si el rey rival no ha enrocado, abrir la columna e es casi siempre lo primero.</li><li><b>Jugar con amenazas</b>: cada jugada debe obligar a una respuesta. Una jugada lenta le da al rival el tempo que necesitaba para enrocar o desarrollar.</li><li><b>Sacrificar si hace falta</b>: un peón (o más) para abrir una línea es un buen negocio si el rival queda con el rey expuesto y las piezas sin desarrollar.</li></ol><h4>Cuándo termina la iniciativa</h4><p>La iniciativa caduca cuando el rival enroca, conecta sus torres y coloca las piezas en casillas normales. A partir de ahí, el material vuelve a mandar. Por eso hay que medir: si el ataque no va a dar nada concreto antes de que el rival complete su desarrollo, a menudo es mejor transformar la iniciativa en otra ventaja (recuperar el material con mejor posición, provocar una debilidad permanente) que seguir atacando sin resultado.</p><h4>Errores frecuentes</h4><ul><li>Cambiar piezas activas: el que tiene más desarrollo necesita piezas para atacar; cada cambio favorece al rival.</li><li>Ganar un peón con la dama en la apertura y perder tres tempos en volver.</li><li>Mover la misma pieza varias veces sin amenaza mientras otras siguen en casa.</li><li>No abrir el centro por miedo a perder material: las ventajas de desarrollo en posiciones cerradas valen poco.</li><li>Como defensor: aferrarse al material ganado en lugar de devolverlo para completar el desarrollo.</li></ul><h4>Cómo pensarlo en la partida</h4><ul><li>Cuenten piezas desarrolladas de cada bando (y si los reyes están enrocados).</li><li>Si van adelante en desarrollo: ¿qué ruptura abre el juego ahora? ¿Qué amenaza concreta crea?</li><li>Si van atrás: ¿cuál es la forma más rápida de enrocar? ¿Debo devolver material para conseguirlo?</li><li>Antes de una jugada tranquila, pregunten: ¿le doy al rival el tempo que necesitaba?</li></ul><h4>Un ejemplo de defensa</h4><p>En los gambitos abiertos, el defensor que devuelve el peón con <span class=\"mv\">d5</span> en el momento justo suele igualar: abre el juego para sus piezas y termina el desarrollo, que era lo único que le faltaba.</p>",
  "keyPoints": [
   "Con ventaja de desarrollo: abran el centro y jueguen con amenazas.",
   "El defensor devuelve material a tiempo para completar su desarrollo."
  ],
  "positions": [
   {
    "fen": "r1bqk1nr/pppp1ppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1 b kq - 1 7",
    "orientation": "black",
    "caption": "Gambito Evans: las blancas dieron un peón por el centro y el desarrollo. La defensa correcta de las negras devuelve material a tiempo.",
    "line": [
     "Nge7",
     "cxd4",
     "d5",
     "exd5",
     "Nxd5",
     "Qb3",
     "Be6",
     "Qxb7"
    ],
    "comments": [
     "Las negras desarrollan sin perder tiempo.",
     "Las blancas recuperan el centro.",
     "Las negras devuelven el peón para abrir el juego a su favor y terminar el desarrollo.",
     "Las blancas aceptan.",
     "El caballo se centraliza.",
     "La dama ataca d5 y b7.",
     "Las negras defienden con desarrollo y preparan el enroque.",
     "Las blancas recuperan el material, pero las negras terminaron su desarrollo y quedan incluso algo mejor (más de medio peón según el motor). Devolver el peón a tiempo neutralizó la iniciativa."
    ]
   },
   {
    "fen": "r1bqk2r/pp2bppp/2nppn2/8/2B1P3/2N2N2/PP2QPPP/R1BR2K1 b kq - 5 9",
    "orientation": "black",
    "caption": "Smith-Morra: las negras tienen un peón de más; las blancas, desarrollo y columnas abiertas. Juegan negras.",
    "line": [
     "Bd7",
     "Bf4",
     "e5",
     "Bg5",
     "Bg4",
     "Qd3",
     "h6",
     "Bxf6"
    ],
    "comments": [
     "Las negras desarrollan antes de enrocar.",
     "Las blancas presionan d6.",
     "Las negras cierran el centro: con el centro cerrado, la ventaja de desarrollo vale mucho menos.",
     "El alfil clava al caballo de f6.",
     "Las negras devuelven la clavada.",
     "La dama defiende y apunta a d6.",
     "Las negras preguntan al alfil.",
     "Las blancas cambian. Posición equilibrada según el motor: el peón de más negro compensa exactamente el desarrollo blanco."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r1bqk2r/1p2bppp/p1nppn2/8/2B1P3/2N2N2/PP2QPPP/R1BR2K1 w kq - 0 10",
    "caption": "Juegan blancas (Gambito Smith-Morra): tienen un peón menos, pero todas sus piezas están en juego y el rey negro sigue en el centro. Las negras acaban de jugar …a6. ¿Cómo usan las blancas su ventaja de desarrollo?",
    "line": [
     "e5",
     "Nd7",
     "exd6"
    ],
    "comments": [
     "Abrir el centro: e5 ataca al caballo de f6 y abre la columna d, donde está la torre blanca, contra el peón de d6 y el rey negro. Las jugadas tranquilas (Bf4, Bb3) dejan que las negras enroquen y la compensación desaparece.",
     "El caballo se retira; si …dxe5, Rxd8+ gana la dama por una torre, porque la columna d quedó abierta.",
     "Las blancas recuperan el peón y dejan un peón en d6 que estorba el desarrollo negro. Unos dos peones de ventaja según el motor: la iniciativa se transformó en algo concreto."
    ]
   },
   {
    "fen": "rnbqkbnr/p1p2ppp/3p4/1p6/2B1P3/8/PB2NPPP/RN1QK2R w KQkq b6 0 7",
    "caption": "Juegan blancas (Gambito Danés): las negras, con dos peones de más, jugaron …b5 en lugar de desarrollar. ¿Cómo castigan las blancas esa pérdida de tiempo?",
    "line": [
     "Bxf7+",
     "Kxf7",
     "Qd5+",
     "Be6",
     "Qxa8"
    ],
    "comments": [
     "El sacrificio en f7 saca al rey negro al centro y abre el camino para la dama. Con el rey sin enrocar y las piezas en casa, las tácticas aparecen solas.",
     "Forzado; si …Ke7, la dama entra en d5 igualmente.",
     "Jaque con doble ataque: al rey y a la torre de a8.",
     "Lo único para tapar el jaque.",
     "Las blancas ganan la torre: unos tres peones de ventaja según el motor. Una sola jugada lenta en la apertura puede costar la partida cuando el rival tiene el desarrollo."
    ]
   },
   {
    "fen": "r1bqk2r/pppp1ppp/2n4n/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1 w kq - 2 8",
    "caption": "Juegan blancas (Gambito Evans): las negras desarrollaron el caballo a h6. ¿Qué jugada gana tiempo y mantiene la iniciativa?",
    "line": [
     "Bg5",
     "Ne7",
     "Qxd4"
    ],
    "comments": [
     "Bg5 desarrolla con amenaza sobre la dama de d8: cada jugada debe obligar al rival a responder. Recuperar el peón enseguida (cxd4) es más lento y deja a las negras consolidar.",
     "Las negras tapan con el caballo, pero el de h6 sigue en el borde y el rey en el centro.",
     "Ahora sí, la dama recupera el peón centralizada y ataca g7 y h8. Más de dos peones y medio de ventaja según el motor."
    ]
   },
   {
    "fen": "r1bqk2r/pp2bppp/2n1pn2/3p4/2B1P3/2N2N2/PP2QPPP/R1BR2K1 w kq - 0 10",
    "caption": "Juegan blancas (Smith-Morra): las negras quisieron devolver el peón con …d5 sin haber enrocado. ¿Cómo se abre el juego?",
    "line": [
     "exd5",
     "exd5",
     "Nxd5",
     "Nxd5",
     "Bxd5"
    ],
    "comments": [
     "Se abre la columna e contra el rey negro, que sigue en el centro, y la columna d para la torre. Tomar con el caballo de inmediato (Nxd5) es menos fuerte.",
     "Lo más natural; si …Nxd5, Nxd5 exd5 Bxd5 y la clavada en la columna e es muy molesta.",
     "El caballo toma en d5 aprovechando que el peón está clavado contra la dama por la torre de d1.",
     "Las negras cambian.",
     "Las blancas ganan un peón con todas las piezas activas y el rey negro todavía en e8: casi cinco peones de ventaja según el motor."
    ]
   }
  ]
 },
 "m-dos-debilidades": {
  "html": "<h4>Por qué una debilidad no alcanza</h4><p>Si el rival tiene una sola debilidad (un peón aislado, un peón retrasado), puede defenderla con piezas: una torre detrás, el rey cerca, un caballo bloqueando. Mientras el atacante no tenga más piezas atacando que el defensor defendiendo, la debilidad aguanta. La solución no es apilar más piezas contra el mismo punto, sino abrir un <b>segundo frente</b>. Cuando aparece otra debilidad lejos de la primera, las piezas del defensor tienen que repartirse, y las piezas lentas (rey, caballo) no llegan a tiempo a ambos lados.</p><h4>Cómo se crea la segunda debilidad</h4><ul><li><b>Una ruptura de peones</b> en el otro flanco: <span class=\"mv\">h4</span>-<span class=\"mv\">h5</span> contra <span class=\"mv\">g6</span>, <span class=\"mv\">b4</span>-<span class=\"mv\">b5</span> contra <span class=\"mv\">c6</span>, o un avance que fije peones en el color de un alfil.</li><li><b>Un peón pasado</b>: aunque no corone, ata al rey o a una torre rival.</li><li><b>Una casilla de entrada</b> para el rey o una torre: la debilidad puede ser una casilla, no solo un peón.</li><li><b>Amenazas contra el rey</b>: en el medio juego, la segunda debilidad puede ser el propio rey rival.</li></ul><h4>La técnica de conversión</h4><ol><li>Fijen y ataquen la primera debilidad para atar las piezas rivales.</li><li>Mejoren todas sus piezas y su rey sin prisa: el defensor no puede hacer nada útil.</li><li>Abran el segundo frente en el momento en que las piezas rivales están más lejos.</li><li>Alternen: amenacen un lado, obliguen al defensor a ir, y cambien al otro.</li></ol><p>En el final de reyes y peones la idea es la misma con el rey como protagonista: un peón pasado alejado obliga al rey rival a ir hacia un lado, y el rey propio entra en el otro. En los finales de torre, la torre activa ata a la torre rival a un peón débil, y el rey del atacante avanza hacia el otro flanco.</p><h4>Errores frecuentes</h4><ul><li>Atacar la misma debilidad una y otra vez esperando que el rival se equivoque.</li><li>Abrir el segundo frente demasiado pronto, antes de que las piezas estén listas, y dar contrajuego.</li><li>Cambiar piezas que atan al rival: si se cambia la torre que ataca la primera debilidad, el defensor queda libre.</li><li>Como defensor: defender pasivamente las dos debilidades. Muchas veces la única salvación es buscar contrajuego activo aunque cueste un peón.</li></ul><h4>Preguntas para la partida</h4><ul><li>¿Cuál es la debilidad número uno del rival y qué piezas suyas la defienden?</li><li>¿En qué parte del tablero puedo crear una segunda? ¿Con qué ruptura?</li><li>¿Qué pieza rival es demasiado lenta para atender ambas?</li></ul><h4>Un ejemplo típico</h4><p>En los finales de torres, un peón pasado del rival atado a una torre propia es la primera debilidad; el atacante no se empeña en ganarlo, sino que busca peones aislados en el otro flanco. Con dos objetivos, la torre defensora no da abasto.</p>",
  "keyPoints": [
   "Ataquen la primera debilidad para atar al rival; luego abran un segundo frente.",
   "La segunda debilidad puede ser un peón pasado, una casilla de entrada o el rey."
  ],
  "positions": [
   {
    "fen": "8/4p1k1/6p1/2p4p/2P2P1P/3K2P1/1P6/8 w - - 0 1",
    "orientation": "white",
    "caption": "El método: el rey ataca una debilidad (c5), obliga al rey rival a irse y luego gana en el otro flanco.",
    "line": [
     "Ke4",
     "Kf7",
     "Kd5",
     "Kf6",
     "Kc6",
     "Kf5",
     "Kxc5",
     "Ke6"
    ],
    "comments": [
     "El rey se centraliza.",
     "El rey negro también.",
     "El rey blanco se acerca a c5.",
     "El rey negro se mantiene cerca de su flanco.",
     "Las blancas rodean el peón de c5.",
     "El rey negro busca contrajuego contra f4.",
     "Primera debilidad eliminada.",
     "Las blancas ganan: su peón de c, apoyado por el rey, y el de b, deciden. El motor da más de cinco peones de ventaja."
    ]
   },
   {
    "fen": "8/5pk1/6p1/p6p/P6P/1R4P1/r4PK1/8 w - - 0 1",
    "orientation": "white",
    "caption": "Con una sola debilidad no alcanza: las negras defienden los peones del flanco de rey con el rey y la posición está igualada.",
    "line": [
     "Rb6",
     "Rxa4",
     "Ra6",
     "Kf8",
     "Ra7",
     "Ra3",
     "Rd7",
     "Kg7"
    ],
    "comments": [
     "La torre blanca se activa detrás del peón de a5.",
     "Las negras cambian su peón de a por el de a4.",
     "Ahora la torre blanca ataca a5.",
     "El rey negro se acerca.",
     "La torre se pone en la séptima.",
     "La torre negra defiende desde atrás.",
     "Las blancas buscan otro objetivo.",
     "Igualdad según el motor: el flanco de rey negro no tiene debilidades y el peón de a5 solo no basta."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/5pk1/6p1/2p4p/p1P2P1P/P2K2P1/8/8 w - - 0 1",
    "caption": "Juegan blancas: final de reyes y peones. Las negras tienen dos debilidades: el peón de a4, fijo, y el de c5. ¿Cómo se aprovechan?",
    "line": [
     "Ke4",
     "Kf6",
     "Kd5"
    ],
    "comments": [
     "El rey va hacia c5. Las negras tendrán que elegir entre defender el flanco de dama y vigilar el flanco de rey: no pueden hacer ambas cosas. Cualquier otra jugada (f5, Ke2) deja tablas.",
     "El rey negro se activa, pero va hacia el otro lado.",
     "Kd5 y luego Kxc5: el rey blanco gana el peón de c5 y después el de a4, mientras el rey negro llega tarde al flanco de rey. Ventaja decisiva."
    ]
   },
   {
    "fen": "6k1/5p2/8/p4p1p/P6P/1R4P1/r4PK1/8 w - - 0 1",
    "caption": "Juegan blancas: final de torres. La torre negra está detrás del peón blanco de a4 y lo ataca. ¿Dónde está la segunda debilidad negra?",
    "line": [
     "Rf3",
     "f4",
     "Rxf4"
    ],
    "comments": [
     "En el flanco de rey: los peones de f5 y h5 están aislados. Rf3 ataca f5 y deja el peón de a4 abandonado: lo importante es la segunda debilidad. Defender el peón de a (Rb5) lleva a tablas.",
     "Las negras avanzan para no perder el peón con tempo, pero no lo salvan.",
     "Las blancas ganan el peón de f y siguen con Rf5 contra h5: dos debilidades, y la torre negra solo puede atender una. Más de tres peones de ventaja según el motor."
    ]
   },
   {
    "fen": "8/8/1p3k2/p1p3p1/P1P1K1P1/1P6/8/8 w - - 0 1",
    "caption": "Juegan blancas: los peones negros del flanco de dama están fijos. ¿Hacia dónde va el rey blanco?",
    "line": [
     "Kd5"
    ],
    "comments": [
     "Kd5: el rey se mete entre las dos debilidades (b6/c5 y g5) y el rey negro no puede cubrir ambas: Kc6 contra b6 o Ke5 contra g5. Las jugadas de espera (Kd3, Kf3) llevan a las tablas. Ventaja decisiva."
    ]
   }
  ]
 },
 "m-cambios": {
  "html": "<h4>Cada cambio transforma la posición</h4><p>Antes de cambiar una pieza, la pregunta no es «¿es un cambio igual?», sino «¿qué queda en el tablero después?». Un cambio de alfiles puede dejar al rival con un alfil malo, al propio rey sin defensores o una casilla débil sin vigilancia. Un cambio de damas puede apagar un ataque o, al revés, llevar a un final donde la mejor estructura decide. Los cambios no son neutrales: deciden qué tipo de partida se va a jugar.</p><h4>El final de peones: el cambio definitivo</h4><p>Cambiar la última pieza para ir a un final de reyes y peones es la decisión más concreta de todas, porque después no hay vuelta atrás y el resultado suele estar decidido. Se calcula, no se intuye. Factores que hacen ganador un final de peones: un <b>peón pasado alejado</b> (desvía al rey rival), la <b>oposición</b> o un rey más activo, una mayoría sana contra una mayoría con peones doblados, y la posibilidad de crear un peón pasado por ruptura. Si tienen una de esas ventajas, el cambio de la última pieza suele ser la forma más limpia de ganar; si no la tienen, evítenlo.</p><h4>Qué piezas cambiar</h4><ul><li><b>La pieza activa del rival</b> por una propia pasiva: el cambio mejora la proporción de piezas activas.</li><li><b>El defensor</b>: la pieza que protege una debilidad o una casilla clave; tras el cambio, la debilidad cae.</li><li><b>El atacante</b>: si el rival ataca al rey, cambiar su pieza más peligrosa reduce la fuerza del ataque más que cualquier jugada defensiva.</li><li><b>Piezas, no peones</b>, cuando tienen material de más; <b>peones, no piezas</b>, cuando tienen material de menos (con menos peones aumentan las opciones de tablas).</li></ul><h4>Errores frecuentes</h4><ul><li>Cambiar por reflejo cuando el rival ofrece un cambio: muchas veces la oferta es su mejor jugada, y aceptarla le resuelve los problemas.</li><li>Cambiar la pieza buena y quedarse con la mala.</li><li>Ir a un final de peones «porque está igualado» sin calcularlo: en esos finales un tempo decide.</li><li>Con ventaja de espacio, cambiar piezas: el rival respira.</li></ul><h4>Lista de comprobación antes de cambiar</h4><ol><li>¿Quién queda con la mejor pieza menor después del cambio?</li><li>¿Mejora o empeora mi estructura al recapturar? ¿Con qué recapturo?</li><li>¿El final resultante es favorable? Si es de peones, calcúlenlo hasta el final.</li><li>¿El cambio quita un atacante o un defensor importante?</li></ol><h4>Cambios de damas</h4><p>El cambio de damas merece una pregunta aparte. Quien tiene el rey más seguro, la mejor estructura o un peón de más suele ganar con el cambio, porque desaparece el contrajuego táctico. Quien ataca o tiene el rey del rival expuesto suele perder casi toda su ventaja si acepta el cambio. Un recurso defensivo frecuente es ofrecer el cambio de damas con ganancia de tiempo: el atacante debe retirarse (y pierde tiempo) o cambiar (y pierde el ataque).</p>",
  "keyPoints": [
   "Antes de cambiar, imaginen lo que queda: el cambio decide qué partida se juega.",
   "El cambio a final de peones se calcula, no se intuye."
  ],
  "positions": [
   {
    "fen": "3r4/4kp1p/6p1/8/8/1P2K1P1/5P1P/3R4 w - - 0 1",
    "orientation": "white",
    "caption": "El cambio de la última pieza: con un peón pasado alejado (aquí el de b), el final de peones está ganado.",
    "line": [
     "Rxd8",
     "Kxd8",
     "Ke4",
     "Kd7",
     "Ke5",
     "Kc6",
     "Kf6",
     "g5"
    ],
    "comments": [
     "Las blancas cambian las torres.",
     "Forzado.",
     "El rey se centraliza.",
     "El rey negro tiene que vigilar el peón de b.",
     "El rey blanco avanza hacia el flanco de rey.",
     "El rey negro se va al flanco de dama.",
     "El rey blanco ataca los peones de f7 y h7.",
     "Las blancas ganan los peones del flanco de rey: más de siete peones de ventaja según el motor."
    ]
   },
   {
    "fen": "8/4kp1p/4b1p1/8/P7/3BK1P1/5P1P/8 w - - 0 1",
    "orientation": "white",
    "caption": "Final de alfiles del mismo color con peón pasado alejado. Si se cambiaran los alfiles, el final de peones estaría ganado para las blancas (el motor da más de seis peones); por eso las negras evitan el cambio y las blancas progresan con el rey.",
    "line": [
     "Be4",
     "Kd6",
     "Kd4",
     "Bd7",
     "a5",
     "Bc8",
     "Bd3",
     "Bh3"
    ],
    "comments": [
     "El alfil se centraliza y vigila h7 y b7.",
     "El rey negro se acerca al peón de a.",
     "El rey blanco ocupa el centro.",
     "El alfil negro se prepara para frenar el peón desde c8.",
     "El peón avanza.",
     "El alfil controla a6.",
     "El alfil blanco apoya el avance a6.",
     "El alfil negro busca contrajuego. Ventaja blanca de más de cuatro peones según el motor: el rey activo y el peón pasado deciden aunque los alfiles sigan en el tablero."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3r4/4kp1p/6p1/8/P7/4K1P1/5P1P/3R4 w - - 0 1",
    "caption": "Juegan blancas: final de torres con el peón de a pasado. ¿Conviene cambiar las torres?",
    "line": [
     "Rxd8",
     "Kxd8"
    ],
    "comments": [
     "Sí: en el final de reyes y peones, el peón de a alejado desvía al rey negro mientras el rey blanco entra en el flanco de rey. Con las torres en el tablero (Ra1, Rd4) la ventaja es mucho menor. Se calcula, no se intuye: Ke4 (o Kd4), a5 y el rey blanco llega a f7 o g6.",
     "Forzado. Ahora Ke4 y el final está ganado: el motor da más de seis peones de ventaja."
    ]
   },
   {
    "fen": "r1b2rk1/2q1bppp/p2p1n2/1pp1p3/2nPP3/2P2N1P/PPBN1PP1/R1BQR1K1 w - - 3 13",
    "caption": "Juegan blancas (Española, Chigorin): el caballo negro llegó a c4, donde ataca b2 y d2. ¿Qué hacen las blancas?",
    "line": [
     "Nxc4",
     "bxc4"
    ],
    "comments": [
     "Cambiar la pieza activa del rival por una propia que no hacía mucho. Tras el cambio, el peón de c4 queda como un blanco fijo y las blancas pueden atacarlo con Nd2, Qe2 y Be3. Las alternativas (d5, Nf1) dejan al caballo dominando.",
     "Forzado. Las blancas siguen con dxe5 y Nd2, y el peón de c4 será difícil de sostener."
    ]
   },
   {
    "fen": "r1b1rnk1/ppq1bppp/2p2n2/3p2B1/3P4/2NBPP2/PPQ1N1PP/R4RK1 w - - 1 12",
    "caption": "Juegan blancas (estructura Carlsbad): la dama negra salió a c7. ¿Qué pieza negra sostiene el peón de d5 y qué cambio la elimina?",
    "line": [
     "Bxf6",
     "Bxf6",
     "Nxd5"
    ],
    "comments": [
     "El caballo de f6 es el defensor de d5. Bxf6 lo elimina: cambiar al defensor es una de las razones clásicas para cambiar piezas. Las jugadas tranquilas (Kh1, h3) dejan igualdad.",
     "Si …gxf6, la estructura negra queda arruinada.",
     "El caballo ataca la dama y el alfil de f6, y si …cxd5 se abre la columna c y Qxc7 gana la dama negra. Las blancas ganan un peón: unos dos peones y medio de ventaja según el motor."
    ]
   },
   {
    "fen": "8/3rkp1p/6p1/8/P7/4K1P1/6PP/3R4 w - - 0 1",
    "caption": "Juegan blancas: las torres están enfrentadas en la columna d y las blancas tienen un peón pasado en a4. ¿Conviene cambiar?",
    "line": [
     "Rxd7+",
     "Kxd7"
    ],
    "comments": [
     "Sí: el final de reyes y peones con el peón de a alejado está ganado, mientras que con torres (Ra1, Rd3) la ventaja es mucho menor.",
     "Forzado. El final de peones está ganado: el peón de a ocupa al rey negro y el rey blanco entra en el flanco de rey (por ejemplo, con g4, Kd4 y Kd5). Más de seis peones de ventaja según el motor."
    ]
   }
  ]
 },
 "m-planificacion": {
  "html": "<h4>De la evaluación al plan</h4><p>Un plan nace de la evaluación. Si el inventario de desequilibrios dice que el rival tiene un peón débil en <span class=\"mv\">c6</span>, el plan es atacarlo; si dice que tenemos más espacio en el flanco de rey, el plan es avanzar allí. Los planes que no salen de la posición («voy a atacar porque me gusta») fracasan contra rivales sólidos. Por eso el orden es: primero entender qué pasa en el tablero, después decidir qué hacer.</p><h4>Planes de una jugada, de tres y de diez</h4><p>Hay planes de distinta longitud. A corto plazo: mejorar la peor pieza, ocupar una columna, impedir una ruptura. A medio plazo: una maniobra de caballo de cuatro jugadas hacia un puesto avanzado, o un ataque de minorías. A largo plazo: llevar la partida a un final favorable. Un jugador fuerte tiene en la cabeza los tres niveles a la vez y elige la jugada que sirve a varios. Las jugadas que solo sirven a un plan a largo plazo pero ignoran una amenaza inmediata suelen ser errores.</p><h4>La peor pieza y la maniobra</h4><p>La pregunta «¿cuál es mi peor pieza?» es la herramienta más útil de la planificación. Normalmente hay una pieza que no hace nada: un alfil encerrado, un caballo en el borde, una torre sin columna. Mejorarla casi nunca es un error, y en posiciones tranquilas suele ser la mejor jugada. Una vez identificada, se busca su casilla ideal (un puesto, una columna, una diagonal) y la ruta más corta para llegar. Las maniobras clásicas como <span class=\"mv\">Nbd2</span>-<span class=\"mv\">f1</span>-<span class=\"mv\">g3</span> en la Española, o <span class=\"mv\">Nf3</span>-<span class=\"mv\">e1</span>-<span class=\"mv\">d3</span> en la India de Rey, son ejemplos de ese razonamiento.</p><h4>Adaptar el plan</h4><p>Un plan no es un contrato. Si el rival hace una jugada que cambia la estructura, hay que volver a evaluar. Errores frecuentes:</p><ul><li><b>Seguir el plan a ciegas</b> cuando el rival ya lo impidió o cuando apareció una táctica.</li><li><b>No tener plan</b> y hacer jugadas «útiles» sueltas que no se conectan entre sí.</li><li><b>Cambiar de plan cada jugada</b>: las piezas terminan repartidas sin coordinación.</li><li><b>Planificar solo para uno mismo</b>, sin preguntarse qué quiere el rival.</li></ul><h4>Un ejemplo de razonamiento</h4><p>Supongan que tienen una columna abierta y el rival un caballo mal colocado. Paso 1: no hay tácticas. Paso 2: tengo la columna, el rival tiene un caballo pasivo pero una estructura sana. Paso 3: el objetivo es la séptima fila. Paso 4: mi peor pieza es la torre de <span class=\"mv\">a1</span>, que debe ir a la columna abierta. Paso 5: el rival quiere oponer su torre; ¿puedo impedirlo controlando la casilla? Paso 6: candidatas: llevar la torre, doblar, o controlar la casilla de oposición primero. Con este orden, las jugadas salen solas.</p>",
  "keyPoints": [
   "El plan sale de la evaluación, no del gusto personal.",
   "En posiciones tranquilas, mejorar la peor pieza casi nunca es un error."
  ],
  "positions": [
   {
    "fen": "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 1 9",
    "orientation": "white",
    "caption": "India de Rey cerrada: el plan blanco sale de la estructura (cadena d5-e4 que apunta al flanco de dama).",
    "line": [
     "Ne1",
     "Nd7",
     "Nd3",
     "f5",
     "f3",
     "b6",
     "a3",
     "a5"
    ],
    "comments": [
     "El caballo de f3 no tiene futuro: va a d3, desde donde apoya c5 y vigila f4.",
     "Las negras preparan …f5.",
     "El caballo llega a d3.",
     "Las negras atacan la base e4.",
     "Las blancas sostienen la base.",
     "Las negras frenan c5.",
     "Las blancas preparan b4.",
     "Las negras frenan b4. Ligera ventaja blanca: cada bando sigue el plan que dicta la estructura."
    ]
   },
   {
    "fen": "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PP3PPP/3Q1RK1 w - - 0 13",
    "orientation": "black",
    "caption": "Gambito de Dama ortodoxo: las negras, con menos espacio, ejecutaron su plan liberador (cambios con …Nd5 y la ruptura …e5). Ahora le toca a cada bando elegir un plan nuevo.",
    "line": [
     "Bb3",
     "a5",
     "Qc2",
     "exd4",
     "exd4",
     "Nf6",
     "Re1",
     "Qd8"
    ],
    "comments": [
     "El alfil se retira a una diagonal segura, desde donde apunta a f7.",
     "Las negras ganan espacio en el flanco de dama y amenazan …a4 para expulsar al alfil.",
     "La dama se coloca en la diagonal b1-h7 y conecta las torres.",
     "Las negras cambian en d4: dejan a las blancas con un peón aislado, un objetivo claro para su plan a largo plazo.",
     "Las blancas recapturan; su plan será jugar con piezas activas y la columna e.",
     "El caballo, que estaba pasivo en d7, vuelve a f6 a controlar d5: la casilla de bloqueo.",
     "La torre ocupa la columna e abierta.",
     "La dama negra presiona el peón aislado. Ligera ventaja blanca (menos de medio peón según el motor): cada bando tiene un plan claro que sale de la estructura."
    ]
   }
  ],
  "drills": [
   {
    "fen": "6k1/3b1p2/4p1p1/1p1pP3/1P1P1PpP/1N4P1/6K1/8 w - - 0 1",
    "caption": "Juegan blancas: final de caballo contra alfil. Identifiquen la debilidad negra y la peor pieza blanca. ¿Cuál es el plan?",
    "line": [
     "Nc5",
     "Be8",
     "Nd3"
    ],
    "comments": [
     "La peor pieza es el caballo de b3, y el objetivo es el peón de g4. Ruta: c5-d3-f2 y Nxg4. Nc5 además ataca e6 y obliga al alfil a moverse. Las jugadas sin plan (Na5, f5) dejan apenas ventaja.",
     "El alfil se aparta del ataque, pero no puede ayudar al peón de g4: sus propios peones de f7 y g6 le cierran la diagonal hacia h5.",
     "Siguiente paso de la maniobra: Nf2 y el peón de g4 cae. Más de cuatro peones de ventaja según el motor."
    ]
   },
   {
    "fen": "8/8/1p1p1k2/p5p1/P5P1/1PP1K3/8/8 w - - 0 1",
    "caption": "Juegan blancas: final de reyes y peones. El peón negro de g5 está fijo. ¿Cuál es el plan correcto para el rey?",
    "line": [
     "Ke4",
     "Ke6",
     "c4"
    ],
    "comments": [
     "El rey va hacia f5 para atacar g5. Kd4 parece natural, pero no amenaza nada concreto y permite al rival defenderse.",
     "El rey negro se opone.",
     "Una jugada de espera que además quita la casilla d5: el rey negro debe ceder el paso y el blanco entra por f5. Unos seis peones y medio de ventaja según el motor."
    ]
   },
   {
    "fen": "4k3/4b3/1p1p4/pP1Pp1p1/6P1/1P1K1P2/8/4N3 w - - 0 1",
    "caption": "Juegan blancas: caballo contra alfil malo. Hagan el inventario: ¿cuál es la debilidad negra más fácil de atacar y qué pieza blanca debe ir a por ella?",
    "line": [
     "Ke4",
     "Bf6"
    ],
    "comments": [
     "El objetivo es el peón de g5 y la pieza es el rey: Ke4 y Kf5, por las casillas blancas que el alfil no controla. Las jugadas de caballo (Nc2, Ng2) no amenazan nada y dejan la posición igualada.",
     "El alfil defiende g5, pero el rey blanco llega a f5 y el caballo se sumará por d3 y f2 o por e3: las negras quedan atadas a la defensa. Más de cinco peones de ventaja según el motor."
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
