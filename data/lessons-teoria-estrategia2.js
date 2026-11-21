/* Teoría ampliada y ejercicios nuevos: estrategia2. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
 "m2-carlsbad": {
  "html": "<h4>El momento de la ruptura b5</h4><p>El ataque de minorías no consiste en empujar peones a ciegas. La preparación típica es <span class=\"mv\">Rab1</span>, a veces <span class=\"mv\">a3</span>, después <span class=\"mv\">b4</span>, y solo entonces <span class=\"mv\">b5</span>. Antes de dar el último paso hay que comprobar tres cosas: que las negras no puedan contestar <span class=\"mv\">...c5</span> con buen juego (esa ruptura deja peones colgantes, pero con piezas activas puede ser buena para las negras), que el flanco de rey propio esté a salvo y que las piezas blancas estén listas para atacar el blanco que va a aparecer. La ruptura <b>sin piezas detrás</b> solo cambia peones y no crea nada.</p><p>Las negras pueden responder de tres maneras, y cada una deja un objetivo distinto: si cambian <span class=\"mv\">...cxb5</span>, el peón d5 queda <b>aislado</b> y las blancas lo atacan con <span class=\"mv\">Nf4</span>, el alfil por la gran diagonal o una torre en la quinta fila; si permiten <span class=\"mv\">bxc6</span> y recapturan <span class=\"mv\">...bxc6</span>, el peón c6 queda <b>retrasado</b> en la columna c y la casilla c5 se convierte en un puesto ideal para un caballo blanco (por <span class=\"mv\">Na4</span> o <span class=\"mv\">Nd2</span>-b3); si las negras se adelantan con <span class=\"mv\">...b5</span>, el peón c6 queda retrasado de inmediato y el agujero de c5 aparece aún antes, a cambio de frenar el avance.</p><h4>El contrajuego bien hecho</h4><p>Las negras no deben limitarse a esperar. Sus recursos principales son: la maniobra del caballo de d7 por f8 hacia g6 o e6; el alfil de c8, que es el «malo», sale por <span class=\"mv\">Bf5</span> para cambiarse por el alfil de d3, o por <span class=\"mv\">Bg4</span> y h5; y sobre todo el salto <span class=\"mv\">Ne4</span>, que cambia piezas y prepara <span class=\"mv\">...f5</span> o una torre levantada por la tercera fila. Cuando las blancas ya han invertido varios tiempos en el flanco de dama, un ataque negro bien coordinado en el otro flanco llega a tiempo con frecuencia. La regla práctica: cada tiempo que las blancas gastan en <span class=\"mv\">b4</span>-b5 las negras deben gastarlo en el rey blanco, no en defender c6 por adelantado.</p><h4>Errores típicos</h4><ul><li><b>Con blancas:</b> jugar <span class=\"mv\">b5</span> cuando las negras ya tienen <span class=\"mv\">...a5</span> o <span class=\"mv\">...b5</span> bien apoyados; olvidar el puesto e4 y dejar entrar un caballo negro allí sin poder cambiarlo; cambiar el alfil de d3 por el caballo de e4 sin pensar en la estructura que queda.</li><li><b>Con negras:</b> recapturar siempre igual sin evaluar la estructura; jugar <span class=\"mv\">...a6</span> y <span class=\"mv\">...b5</span> mecánicamente y regalar c5; dejar el alfil de c8 encerrado toda la partida; defender c6 con todas las piezas y quedar pasivo.</li></ul><h4>Por qué las debilidades duran hasta el final</h4><p>La gran virtud del ataque de minorías es que lo que crea es <b>permanente</b>. Un peón c6 retrasado o un peón d5 aislado no se curan con el tiempo; al contrario, cada cambio de piezas los vuelve más vulnerables, porque quedan menos defensores. Por eso, después de crear la debilidad, el plan blanco suele ser simplificar: cambiar las piezas activas de las negras, llevar una torre a la columna c, un caballo a c5 y el rey hacia el centro. En los finales de torres resultantes, una torre blanca atacando c6 desde c5 o c1 obliga a la torre negra a una defensa pasiva, y eso suele bastar para ganar.</p><p><b>Lista de comprobación en la partida:</b> ¿está mi rey seguro? ¿qué contestan las negras a <span class=\"mv\">b5</span>: ...c5, ...cxb5 o bxc6? ¿qué peón quedará débil y qué piezas tengo para atacarlo? ¿puede el rival ocupar e4 o lanzar su ataque mientras tanto?</p>",
  "keyPoints": [
   "Antes de b5, comprueba la respuesta ...c5 y que tus piezas estén listas para atacar el peón que quedará débil.",
   "Las debilidades del ataque de minorías son permanentes: tras crearlas, simplifica hacia el final."
  ],
  "positions": [
   {
    "fen": "2r2k2/pp2nppp/2p5/3p4/1P1P4/2N1P3/P4PPP/2R2K2 w - - 0 1",
    "orientation": "white",
    "caption": "Final de la Carlsbad: el ataque de minorías también funciona sin damas. Ventaja pequeña pero duradera para las blancas.",
    "line": [
     "Ke2",
     "Ke8",
     "f3",
     "Kd7",
     "Kd3",
     "f5",
     "Rb1",
     "b6",
     "a4"
    ],
    "comments": [
     "Primero el rey: en el final es una pieza de ataque y desde d3 apoyará el avance de los peones del flanco de dama.",
     "Las negras también centralizan su rey para defender c6.",
     "Quita la casilla e4 al caballo negro, que soñaba con instalarse allí apoyado por d5.",
     "El rey negro se acerca a c7, el mejor lugar para proteger los peones del flanco de dama.",
     "El rey blanco llega a d3: controla c4 y e4 y respalda el futuro b5.",
     "Las negras ganan espacio en el flanco de rey; es su única forma de crear contrajuego.",
     "La torre se coloca detrás del peón b para preparar b5. El motor da unas cuatro décimas de ventaja: poca, pero las negras no tienen planes activos.",
     "Las negras se adelantan con ...b6 para que b5 no rompa la cadena con tanta fuerza.",
     "Ahora a4-a5 o b5 crearán una debilidad en c6 o en b6. Es el ataque de minorías en su versión de final."
    ],
    "arrows": [
     [
      "b4",
      "b5",
      "g"
     ]
    ]
   },
   {
    "fen": "2r2k2/p2b1ppp/2p5/3p4/3P4/1N2P3/P4PPP/2R2K2 w - - 0 1",
    "orientation": "white",
    "caption": "Después de bxc6: el peón c6 retrasado y la casilla c5. Las blancas tienen cerca de un peón de ventaja.",
    "line": [
     "Nc5",
     "Bf5",
     "Rc3",
     "Rb8",
     "Ra3",
     "Rb1+",
     "Ke2",
     "Be4",
     "Rxa7"
    ],
    "comments": [
     "El caballo ocupa c5, la casilla que nunca podrá atacar un peón negro: presiona a6, b7, d7 y e6.",
     "El alfil escapa del ataque y busca actividad.",
     "La torre se levanta por la tercera fila para atacar el peón a7, la segunda debilidad.",
     "Las negras buscan contrajuego activo con la torre en la columna b.",
     "Ataque directo al peón a7: c6 y a7 no pueden defenderse a la vez con comodidad.",
     "Jaque para activar la torre y distraer.",
     "El rey sale del jaque acercándose al centro.",
     "El alfil se instala en e4, su mejor casilla.",
     "Cae el peón a7: la presión sobre las debilidades del flanco de dama se convierte en material."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r1b1r1k1/pp2qppp/2p2n2/3p4/1P1P4/1QN1PB2/P4PPP/1RR3K1 w - - 0 1",
    "caption": "Juegan blancas: el ataque de minorías está preparado. ¿Es el momento de actuar o hay que seguir preparando?",
    "line": [
     "b5",
     "Bf5",
     "bxc6",
     "bxc6",
     "Rb2"
    ],
    "comments": [
     "¡Ahora! Torre en b1, dama en b3 y torre en c1 apoyan la ruptura, y las negras todavía no frenaron con ...a6 o ...b6. Esperar (a4, Ne2) permite que las negras se reorganicen: b5 es claramente la mejor.",
     "La mejor defensa: el alfil malo sale con tempo atacando la torre de b1. Si ...cxb5, Nxd5 gana un peón.",
     "Cambias en c6 para obligar a las negras a decidir la estructura ya mismo.",
     "Recaptura forzada: si ...Bxb1, cxb7 y el peón corona o gana material. Queda un peón c6 retrasado en la columna c.",
     "La torre se aparta del alfil y se queda en la columna b. El plan siguiente: Na4-c5 y presión doble sobre c6."
    ]
   },
   {
    "fen": "2r2k2/p4ppp/2p1b3/3p4/3P4/2N1P3/P4PPP/1R3K2 w - - 0 1",
    "caption": "Juegan blancas: final de la estructura Carlsbad después del ataque de minorías. Encuentra el plan que hace valer las debilidades negras.",
    "line": [
     "Na4",
     "g5",
     "Nc5",
     "Bf5",
     "Rb7"
    ],
    "comments": [
     "El caballo va hacia c5, el puesto que dejó el ataque de minorías. Las demás jugadas apenas dan medio peón de ventaja; esta da casi dos.",
     "Las negras ganan espacio en el flanco de rey: no pueden impedir el salto a c5.",
     "El caballo llega a su casilla ideal: ningún peón negro podrá expulsarlo y desde allí ataca e6, b7 y a6.",
     "El alfil esquiva al caballo y vigila b1.",
     "La torre entra en la séptima fila contra a7: torre y caballo atacan juntos las debilidades del flanco de dama."
    ]
   },
   {
    "fen": "8/7p/2p5/pp1p4/P2Pk1pP/1P2P1P1/3K4/8 w - - 7 35",
    "caption": "Juegan blancas: el rey negro amenaza comerse los peones del flanco de rey. Final de peones con la estructura Carlsbad.",
    "line": [
     "b4",
     "bxa4",
     "bxa5"
    ],
    "comments": [
     "¡Ruptura en el flanco de dama! Hay que crear un peón pasado lejos del rey negro antes de que este coma en e3 y g3. Las jugadas de rey pierden.",
     "Si ...axb4, a5 y el peón corona; las negras toman en a4 para tener su propio peón pasado.",
     "Ahora el peón a5 está más avanzado que el a4 negro y el rey blanco lo vigila desde c2-b2: el peón blanco corona primero."
    ]
   },
   {
    "fen": "8/8/2p5/3p1p2/3P2p1/4PkP1/5P2/4K3 w - - 0 40",
    "caption": "Juegan blancas: el rey negro está metido en f3 y amenaza f2. Encuentra la única forma de ganar.",
    "line": [
     "Kf1",
     "Ke4",
     "Ke2",
     "f4",
     "gxf4"
    ],
    "comments": [
     "Única: defiende f2 y quita la casilla e2. Las demás jugadas pierden; por ejemplo, Kd2? permite ...Kxf2.",
     "El rey negro busca otro camino por d3.",
     "Oposición: el rey blanco le cierra d3 y f3. Las negras se quedan sin jugadas útiles de rey (zugzwang).",
     "Obligadas a mover peones, las negras rompen con ...f4.",
     "Las blancas toman y quedan con un peón de más; el peón g4 negro quedará aislado y caerá."
    ]
   }
  ]
 },
 "m2-stonewall": {
  "html": "<h4>La lucha por e5 y e4: dos puestos simétricos</h4><p>La Stonewall crea una situación casi geométrica: el bando de la Stonewall tiene un puesto perfecto en e4 y el rival un puesto perfecto en e5. La partida suele girar en torno a qué caballo se instala mejor y qué bando consigue cambiar el caballo contrario. Un caballo en e5 puede ser cambiado por <span class=\"mv\">...Nd7</span> o <span class=\"mv\">...Nfd7</span>; tras el cambio, el peón que recaptura en e5 (normalmente de d4 o f4) cambia la estructura y abre la diagonal del alfil. Por eso el caballo que llega a e5 debe tener <b>relevo</b>: un segundo caballo en d3 o f3 que ocupe la casilla si el primero desaparece, o un peón en f4 que permita recapturar manteniendo el control.</p><h4>El plan contra la Stonewall, paso a paso</h4><ol><li><b>Cambiar el alfil de casillas negras</b> del rival: <span class=\"mv\">b3</span> y <span class=\"mv\">Ba3</span>, o <span class=\"mv\">Bf4</span>. Es el defensor natural de e5 y la pieza más valiosa del bando de la Stonewall.</li><li><b>Llevar los caballos hacia e5</b> por d3 (desde f3-e1-d3 o b1-d2-f3).</li><li><b>Desafiar el puesto e4</b> con <span class=\"mv\">f3</span>, o cambiar el caballo de e4 con el alfil o con un caballo; un caballo negro en e4 sin cambiar es la mejor pieza de la posición.</li><li><b>Abrir la columna c</b> con <span class=\"mv\">cxd5</span> en el momento oportuno: si las negras recapturan con el peón e, aparece la casilla e5 todavía más débil y el peón e6 desaparece; si recapturan con el peón c, la columna c queda para las torres blancas.</li></ol><h4>El plan del bando de la Stonewall</h4><p>Con las negras, el esquema clásico es <span class=\"mv\">...Qe7</span> o <span class=\"mv\">...Qe8</span>, <span class=\"mv\">...Ne4</span>, <span class=\"mv\">...Nd7</span> (para cambiar un caballo blanco que llegue a e5) y un ataque en el flanco de rey: <span class=\"mv\">...Qh5</span>, <span class=\"mv\">...Rf6</span>-h6 o <span class=\"mv\">...g5</span>-g4. El ataque funciona cuando el centro está cerrado y las blancas no pueden romper con e4 o con cxd5 y e4. Un recurso importante es la ruptura <span class=\"mv\">...e5</span>: si las negras la consiguen en buenas condiciones, el agujero de e5 desaparece y el alfil de c8 se libera de golpe. Es la manera más radical de resolver los problemas estructurales.</p><h4>Errores típicos</h4><ul><li>Con la Stonewall: atacar en el flanco de rey sin haber resuelto la casilla e5, de modo que el caballo blanco allí sostiene toda la defensa; cambiar el alfil de casillas negras «porque sí»; olvidarse del alfil de c8 hasta el final, donde es un peón grande.</li><li>Contra la Stonewall: atacar e4 con peones demasiado pronto (<span class=\"mv\">f3</span> y e4 sin preparación debilita al propio rey); instalar un caballo en e5 que puede ser cambiado sin relevo; precipitar los cambios cuando el rival tiene ataque.</li></ul><p><b>Preguntas para la partida:</b> ¿qué alfil de casillas negras queda vivo? ¿quién controla mejor su puesto, e4 o e5? ¿se puede romper con <span class=\"mv\">...e5</span> o con <span class=\"mv\">e4</span>? ¿llega el ataque en el flanco de rey antes que la presión en la columna c?</p>",
  "keyPoints": [
   "Un caballo en e5 o e4 necesita relevo: si lo cambian, otra pieza o un peón debe mantener el puesto.",
   "La ruptura ...e5 (o e4 en la Stonewall blanca) elimina el agujero y libera el alfil malo."
  ],
  "positions": [
   {
    "fen": "r1b2rk1/pp1nq1pp/2pbpn2/3p1p2/2PP1B2/2N1PNP1/PPQ2PBP/R4RK1 w - - 0 1",
    "orientation": "white",
    "caption": "El plan clásico contra la Stonewall: cambiar el alfil de casillas negras y abrir el centro. Las blancas quedan claramente mejor.",
    "line": [
     "cxd5",
     "Nxd5",
     "Bxd6",
     "Qxd6",
     "e4",
     "Nxc3",
     "bxc3",
     "fxe4",
     "Qxe4"
    ],
    "comments": [
     "Primero se abre la columna c y se obliga al caballo a recapturar.",
     "Las negras recapturan con el caballo: ...cxd5 abriría la columna c para la dama blanca y ...exd5 dejaría la casilla e5 todavía más débil, con el alfil de c8 igual de encerrado.",
     "Se cambia el alfil de casillas negras, la mejor pieza de la Stonewall.",
     "La dama recaptura, pero ya no hay alfil que defienda e5.",
     "La ruptura e4 abre el centro justo cuando las negras están retrasadas en desarrollo.",
     "Las negras cambian para aliviar la presión.",
     "La estructura blanca mejora: el peón c3 controla d4 y b4.",
     "Se cambia el peón f5; el alfil de c8 sigue encerrado.",
     "La dama se centraliza en e4. El motor da unos dos peones de ventaja: el alfil de c8 no tiene futuro y e5 es para las blancas."
    ]
   },
   {
    "fen": "8/pp1bk1pp/4p3/3p1p2/3P4/3NP1P1/PP2KP1P/8 w - - 0 1",
    "orientation": "white",
    "caption": "Caballo bueno contra alfil malo: el final que teme el bando de la Stonewall. Ventaja pequeña pero estable.",
    "line": [
     "Ne5",
     "Be8",
     "f3",
     "Bb5+",
     "Kd2",
     "h6",
     "Kc3"
    ],
    "comments": [
     "El caballo ocupa el agujero de e5, del que nadie podrá echarlo.",
     "El alfil se retira: no tiene casillas activas detrás de los peones.",
     "Las blancas quitan la casilla e4 y preparan g4 para abrir líneas en el flanco de rey.",
     "El alfil busca alguna diagonal por fuera de la cadena.",
     "El rey sale del jaque acercándose al flanco de dama.",
     "Las negras esperan; no tienen ningún plan activo.",
     "El rey blanco se acerca a b4 y c5. La ventaja es de apenas un tercio de peón según el motor, pero solo puede jugar un bando."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/k1p1p3/3pPp1p/1K1P1Pp1/6P1/6P1/8 w - - 0 48",
    "caption": "Juegan blancas: los peones negros forman una Stonewall en casillas blancas. ¿Por dónde entra el rey blanco?",
    "line": [
     "Kc5",
     "Kb7",
     "Kd6",
     "c5",
     "dxc5"
    ],
    "comments": [
     "El rey usa las casillas negras: c5 y d6 no pueden ser atacadas por ningún peón negro. Retroceder pierde: el rey negro entraría por b5.",
     "El rey negro intenta proteger c6.",
     "Desde d6 ataca c6 y e6 a la vez; el rey negro no puede cubrir los dos.",
     "Las negras intentan crear un peón pasado en d4 como último recurso.",
     "Captura: el peón pasado negro llega tarde y caerá e6. Son las debilidades de color de la Stonewall llevadas al final."
    ]
   },
   {
    "fen": "r5k1/p5pp/2pbpr2/3pqp2/1P6/P4QP1/R1P2P1P/2B2RK1 w - - 2 25",
    "caption": "Juegan blancas contra la Stonewall: busca el cambio clave en el momento justo.",
    "line": [
     "Bf4",
     "Qe4",
     "Qxe4",
     "fxe4",
     "Bxd6"
    ],
    "comments": [
     "El cambio del alfil de casillas negras llega con tempo: la dama de e5 está atacada y es la única defensora del alfil de d6. Ninguna otra jugada da ventaja.",
     "La mejor defensa: ofrecer el cambio de damas. Si ...Qxf4, gxf4 y las negras pierden la dama por un alfil.",
     "Cambias damas: así el alfil de d6 se queda sin defensa.",
     "Recaptura obligada.",
     "Cae el alfil de d6: sin su alfil de casillas negras, la Stonewall queda con todas sus debilidades y además con una pieza de menos."
    ]
   },
   {
    "fen": "4b3/8/p3p1p1/kp1p1p1p/P2P1P1P/2P1P1P1/1K6/3B4 b - - 0 40",
    "caption": "Juegan negras: final de alfiles con peones bloqueados en casillas blancas. ¿Cómo se abre paso el rey negro?",
    "line": [
     "b4",
     "cxb4+",
     "Kxb4"
    ],
    "comments": [
     "¡Ruptura! Se cambia la estructura del flanco de dama para abrir una puerta al rey. Cualquier otra jugada mantiene todo cerrado y es tablas.",
     "Las blancas toman; si no, ...bxc3 deja al rey negro el camino libre.",
     "El rey negro entra en b4 y amenaza a3 y c3: el peón a4 y los peones fijos en casillas blancas, del color de los alfiles, serán blancos de ataque."
    ]
   },
   {
    "fen": "5k2/p1r3p1/2p1p1K1/2PpPp2/3P1P2/5P2/8/R7 w - - 6 42",
    "caption": "Juegan blancas: final de torres contra la Stonewall. El rey blanco ya entró en g6. Encuentra el plan ganador.",
    "line": [
     "Rh1",
     "Kg8",
     "Rb1"
    ],
    "comments": [
     "La torre amenaza entrar por la columna h con jaque y atacar g7. Las demás jugadas no consiguen nada.",
     "El rey negro cubre la octava fila, pero ahora la torre cambia de flanco.",
     "La torre pasa a la columna b, amenazando Rb8+ y entrar en la séptima. Es el juego en ambos flancos: el rey negro está atado al flanco de rey y la torre negra no puede cubrir todo."
    ]
   }
  ]
 },
 "m2-mayoria": {
  "html": "<h4>Mayoría sana y mayoría inválida</h4><p>No toda mayoría vale lo mismo. Una mayoría es <b>sana</b> cuando, con avances normales, puede crear un peón pasado. Es <b>inválida</b> cuando no puede: por ejemplo, tres peones contra dos con peones doblados entre los tres (como en la Española del Cambio), o una mayoría bloqueada por una pieza rival bien instalada delante del peón candidato. Antes de confiar en una mayoría, cuenta: ¿puedo conseguir un peón sin oposición en esa columna? Si la respuesta es no, la mayoría es solo un grupo de peones de más que ocupa casillas.</p><h4>La técnica del candidato</h4><p>El <b>peón candidato</b> es el que no tiene peón enemigo delante en su columna: será el futuro pasado. La regla clásica es avanzarlo primero (o al menos no dejarlo atrás), porque los otros peones de la mayoría van a servirle de escolta y a cambiarse por los peones rivales. Con peones a-b-c contra a-b, la secuencia típica es c4-c5, b4, a4 y b5: el peón b se cambia por el b rival y el c queda pasado. Si se adelantan los peones que tienen oposición, el rival los bloquea uno a uno con su par de peones y la mayoría se paraliza. Un detalle práctico: cuando el rival tiene dos peones contra tres, intentará frenar con un peón avanzado (por ejemplo, ...b5 contra la mayoría a-b-c blanca) para que un solo peón suyo detenga a dos. Respóndelo atacando ese peón adelantado con <span class=\"mv\">a4</span>.</p><h4>El rol del rey y de las piezas</h4><p>En el medio juego, la mayoría se apoya con piezas: una torre en la columna del candidato, el alfil en la diagonal que controla la casilla de coronación o el caballo que impide el bloqueo. En el final, el rey se convierte en la pieza principal. Con mayorías en flancos opuestos (por ejemplo, tú tres contra dos en el flanco de dama y el rival tres contra dos en el de rey), la carrera se decide por <b>quién crea antes su pasado</b> y qué rey está más cerca de los peones. Un peón pasado que nace lejos del rey rival obliga a ese rey a abandonar su flanco, y entonces tu rey entra a comer.</p><h4>Errores típicos</h4><ul><li>Avanzar la mayoría demasiado pronto en el medio juego: los peones adelantados se convierten en objetivos y dejan casillas libres detrás.</li><li>Permitir un bloqueo: una pieza rival en la casilla de delante del candidato (sobre todo un caballo) congela la mayoría entera.</li><li>Olvidar la mayoría del rival: en el centro contra mayoría, si el bando con el centro consigue avanzar e5 y f5 con ataque, la mayoría del flanco de dama llega tarde.</li></ul><p><b>Lista de comprobación:</b> ¿mi mayoría es sana? ¿cuál es el candidato? ¿qué pieza rival podría bloquearla y cómo lo impido? ¿me conviene cambiar piezas para acercarme al final? ¿qué rey está más cerca del lugar donde nacerá el pasado?</p>",
  "keyPoints": [
   "Una mayoría con peones doblados o bloqueada por una pieza no crea peón pasado: es una mayoría inválida.",
   "Ante un peón rival adelantado que frena dos de los tuyos, atácalo con el peón vecino."
  ],
  "positions": [
   {
    "fen": "8/5p1p/1p1k2p1/p7/P1P5/1P1K2P1/5P1P/8 w - - 0 1",
    "orientation": "white",
    "caption": "Mayoría tres contra dos en el flanco de dama con los reyes centralizados: las blancas ganan.",
    "line": [
     "g4",
     "h6",
     "Kd4",
     "Kc6",
     "Kc3",
     "Kc5",
     "h4",
     "g5",
     "h5"
    ],
    "comments": [
     "Antes de avanzar la mayoría, las blancas ganan espacio en el flanco de rey para tener tiempos de reserva.",
     "Las negras esperan.",
     "El rey blanco ocupa el centro: apoya el avance del flanco de dama y vigila el de rey.",
     "El rey negro bloquea el flanco de dama.",
     "Maniobra de rey: se prepara b4 en el momento adecuado.",
     "El rey negro se adelanta a c5.",
     "Las blancas fijan los peones negros del flanco de rey.",
     "Las negras intentan crear algo.",
     "Con el flanco de rey bloqueado, las negras se quedarán sin jugadas y el peón pasado del flanco de dama decidirá. El motor da cerca de tres peones de ventaja."
    ]
   },
   {
    "fen": "6k1/5ppp/pp6/8/PPP5/8/5PPP/6K1 w - - 0 1",
    "orientation": "white",
    "caption": "Mayoría sana en el flanco de dama: primero se centraliza el rey, después se crea el peón pasado.",
    "line": [
     "Kf1",
     "Kf8",
     "Ke2",
     "Ke7",
     "Kd3",
     "Kd6",
     "Kd4",
     "Kc6",
     "b5+",
     "axb5",
     "cxb5+"
    ],
    "comments": [
     "No hay prisa: el rey va hacia el centro.",
     "El rey negro también.",
     "El rey sigue su camino.",
     "Las negras lo imitan.",
     "Llega a d3.",
     "El rey negro se coloca frente a la mayoría.",
     "El rey blanco ocupa d4, la casilla clave delante del flanco de dama.",
     "Las negras bloquean con el rey.",
     "Ahora sí: la ruptura con jaque.",
     "Las negras toman.",
     "Recaptura con jaque: el peón b5 fija al b6, y la ruptura a4-a5 dejará un peón pasado en el flanco de dama. Casi cuatro peones de ventaja según el motor."
    ]
   }
  ],
  "drills": [
   {
    "fen": "6k1/p4ppp/1q6/8/P2Q4/1P4P1/5PKP/8 w - - 0 1",
    "caption": "Juegan blancas: tienes un peón de más en el flanco de dama. ¿Cómo se convierte la ventaja?",
    "line": [
     "Qxb6",
     "axb6",
     "b4",
     "f6",
     "a5",
     "bxa5",
     "bxa5"
    ],
    "comments": [
     "Cambiar damas lleva a un final de peones con mayoría de dos contra uno en el flanco de dama, lejos de los reyes. Sin damas, el negro no tiene jaques ni contrajuego.",
     "Recaptura obligada.",
     "¡Inmediatamente! El peón b va al encuentro del b6 para crear un pasado alejado. Las jugadas de rey dan ventaja, pero mucho menor.",
     "Las negras abren camino a su rey por f7.",
     "Se cambia el peón b para dejar el peón a pasado.",
     "Si no toma, a6 y el peón corona.",
     "El peón a5 está pasado y lejos del rey negro: este tendrá que ir a pararlo y abandonar el flanco de rey."
    ]
   },
   {
    "fen": "8/8/3k4/1ppp1K2/p2P1P2/P1P1P3/8/8 b - - 0 41",
    "caption": "Juegan negras: tienes una mayoría en el flanco de dama, pero los peones blancos parecen frenarla. Encuentra la ruptura.",
    "line": [
     "c4",
     "e4",
     "b4"
    ],
    "comments": [
     "Primero se fija el peón d4 y se prepara la ruptura. Las alternativas, como ...b4 o ...Kc6, pierden: el rey blanco llega a tiempo.",
     "Las blancas buscan contrajuego en el centro.",
     "¡Ruptura! Si axb4, ...a3 y el peón corona; si cxb4, ...c3. La mayoría se convierte en un peón pasado imparable."
    ]
   },
   {
    "fen": "8/1p4k1/p1p1K3/3p4/1P1P4/4P2P/8/8 b - - 1 42",
    "caption": "Juegan negras: el rey blanco está muy activo, pero tú tienes más peones en el flanco de dama. ¿Cómo se usa la mayoría?",
    "line": [
     "b6",
     "Kd6",
     "a5",
     "bxa5",
     "bxa5"
    ],
    "comments": [
     "El peón candidato es el que no tiene oposición: hay que preparar ...a5 para crear un pasado. ...b5 bloquearía la mayoría.",
     "El rey blanco ataca c6.",
     "La ruptura: el peón b4 se cambia y queda un peón pasado negro.",
     "Las blancas toman.",
     "El peón a5 está pasado y lejos del rey blanco, que además tiene que vigilar c6: la mayoría hizo su trabajo."
    ]
   },
   {
    "fen": "8/8/p3k3/1pp1P3/5K2/1PP1P3/8/8 b - - 1 41",
    "caption": "Juegan negras: tres peones contra dos en el flanco de dama, y los peones blancos del flanco de rey están doblados. Encuentra el plan.",
    "line": [
     "a5",
     "Ke4",
     "a4",
     "bxa4",
     "bxa4"
    ],
    "comments": [
     "Se avanza el peón a para cambiarlo por el b3 y abrir camino. ...c4 permitiría bxc4 y la mayoría se deshace.",
     "El rey blanco se acerca al centro.",
     "Se ofrece el cambio: la mayoría avanza unida.",
     "Si no toma, ...axb3 y el peón negro avanza.",
     "Ahora las negras tienen un peón pasado en a4 y los peones doblados de e3 y e5 no pueden crear nada: la mayoría sana gana."
    ]
   }
  ]
 },
 "m2-doblados": {
  "html": "<h4>Hacia dónde capturar: la decisión que crea los doblados</h4><p>Casi siempre los peones doblados nacen de una decisión de recaptura, y esa decisión es estratégica. La regla orientativa de «capturar hacia el centro» existe porque un peón que se acerca al centro controla casillas más importantes: tras <span class=\"mv\">...Bxf3</span>, recapturar <span class=\"mv\">gxf3</span> refuerza e4 y abre la columna g, mientras que <span class=\"mv\">Qxf3</span> mantiene la estructura intacta pero pierde tiempo. Ninguna de las dos es correcta siempre: hay que preguntarse qué columna se abre, qué casillas se controlan y qué pasa con la seguridad del rey. Recapturar hacia el centro (por ejemplo, <span class=\"mv\">hxg6</span> en vez de <span class=\"mv\">fxg6</span>) suele ser lo más sólido para el rey; recapturar hacia fuera (<span class=\"mv\">fxg6</span>) abre la columna f para las torres.</p><h4>Cómo atacar peones doblados</h4><p>Los peones doblados tienen tres defectos concretos: <b>no se defienden entre sí</b>, <b>dejan un agujero</b> en la columna vecina y <b>pierden movilidad</b>. El plan del atacante es:</p><ol><li><b>Fijar</b> el peón delantero para que no pueda avanzar ni cambiarse (en la Nimzoindia, el bloqueo en c5 contra el peón c4 blanco).</li><li><b>Atacar</b> el peón fijado con piezas que no puedan ser desalojadas: el caballo en a5, el alfil en a6, la torre en la columna c.</li><li><b>Simplificar</b>: cada cambio quita al rival piezas activas que compensaban la estructura, y en el final los doblados pesan el doble.</li></ol><p>El bando con los doblados, en cambio, quiere lo contrario: actividad inmediata, columnas abiertas y, si puede, cambiar uno de los peones doblados para curar la estructura (por ejemplo, con la ruptura c4-c5 o con d4-d5 en la Nimzoindia).</p><h4>Los doblados en el final de peones</h4><p>El efecto más claro de los peones doblados aparece en el final de peones. Una mayoría de tres contra dos con dos peones doblados no puede crear un pasado, mientras que una mayoría sana del rival sí. Por eso, el bando con estructura sana busca cambiar todas las piezas: el final de peones resultante puede ser ganador aunque el material esté igualado. Otro efecto importante: los peones doblados <b>dan tiempos de reserva</b> si están en su posición inicial (el peón trasero puede avanzar una o dos casillas), y en los finales de oposición esos tiempos pueden decidir la partida a favor de quien los tiene.</p><h4>Errores típicos</h4><ul><li>Evitar siempre los doblados aunque a cambio se ofrezca la pareja de alfiles o una columna decisiva.</li><li>Con los doblados, buscar los cambios: cada cambio acerca el final, donde la estructura pesa más.</li><li>Contra los doblados, atacarlos antes de fijarlos: el rival los avanza, los cambia y la debilidad desaparece.</li></ul><p><b>Lista de comprobación:</b> ¿los doblados están aislados o tienen un vecino que los proteja? ¿qué se obtuvo a cambio? ¿puede el rival fijarlos y atacarlos con piezas? ¿qué pasa si se cambian todas las piezas?</p>",
  "keyPoints": [
   "Fija primero el peón doblado, después atácalo con piezas y finalmente simplifica.",
   "Con los peones doblados, busca actividad y evita el final de peones."
  ],
  "positions": [
   {
    "fen": "8/ppp1k1pp/2p5/8/8/8/PPP2PPP/5K2 w - - 0 1",
    "orientation": "white",
    "caption": "La estructura de la Española del Cambio sin piezas: la mayoría blanca del flanco de rey es sana; la negra del flanco de dama, no.",
    "line": [
     "Ke2",
     "Ke6",
     "f4",
     "b5",
     "c3",
     "Kd5",
     "Kd3",
     "c5",
     "b3"
    ],
    "comments": [
     "El rey se acerca al centro.",
     "El rey negro también.",
     "Las blancas empiezan a mover su mayoría sana: tres contra dos en el flanco de rey producirán un peón pasado.",
     "Las negras ganan espacio en el flanco de dama, pero con los peones c doblados no podrán crear un pasado.",
     "Se controla d4 y se prepara b3 para frenar a los peones negros.",
     "El rey negro se activa.",
     "Oposición: el rey blanco no deja pasar al negro.",
     "Las negras intentan avanzar en el flanco de dama.",
     "Las blancas fijan los peones negros. Ventaja de casi dos peones según el motor: la mayoría sana avanzará y la negra quedará bloqueada."
    ]
   },
   {
    "fen": "8/1pp1k1pp/p7/2p5/8/8/PPP1KPPP/8 w - - 0 1",
    "orientation": "white",
    "caption": "Otra versión: las negras tienen un peón doblado en c5 y c7. El rey blanco centralizado decide.",
    "line": [
     "Kd3",
     "Ke6",
     "Ke4",
     "a5",
     "f3",
     "a4",
     "g4"
    ],
    "comments": [
     "El rey va hacia e4, la casilla central más activa.",
     "Las negras lo siguen.",
     "El rey blanco domina el centro y apoyará el avance f4-f5 de la mayoría.",
     "Las negras intentan ganar espacio en el flanco de dama.",
     "Las blancas preparan g4 y f4 sin dejar debilidades.",
     "El peón negro sigue adelante, pero no crea nada: delante solo tiene a b2 y c2.",
     "Las blancas avanzan la mayoría sana; el motor les da casi dos peones de ventaja."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3r4/1pp1k1pp/p1p2p2/8/4P3/8/PPP1KPPP/3R4 w - - 0 1",
    "caption": "Juegan blancas: las negras tienen peones doblados en la columna c. ¿Qué hacer con las torres?",
    "line": [
     "Rxd8",
     "Kxd8",
     "Ke3",
     "Kd7",
     "Kd4"
    ],
    "comments": [
     "Cambiar torres lleva al final de peones, donde la mayoría sana del flanco de rey vale y la negra, con peones doblados, no. Con las torres en el tablero la ventaja es mucho menor.",
     "Recaptura obligada.",
     "El rey se centraliza rumbo a d4. También sirven b4 o Kd3: lo importante es el plan.",
     "El rey negro intenta frenar al blanco.",
     "El rey blanco ocupa d4: desde ahí apoya f4-f5 y vigila el flanco de dama. Es el final ideal para el bando con estructura sana."
    ]
   },
   {
    "fen": "8/p5p1/1p4p1/2p2kPp/5P1P/2P2K2/PP6/8 w - - 0 43",
    "caption": "Juegan blancas: las negras tienen los peones g doblados. Encuentra el plan en el flanco de dama.",
    "line": [
     "c4",
     "a6",
     "a4",
     "Ke6",
     "Ke4"
    ],
    "comments": [
     "Fija el peón c5 en una casilla negra y prepara a4-a5. Las demás jugadas permiten que el rey negro entre por g4.",
     "Las negras esperan con un peón.",
     "Se prepara a5 para abrir la columna a y crear un pasado; los peones doblados g7 y g6 no pueden hacer nada en el otro flanco.",
     "El rey negro vuelve al centro.",
     "El rey blanco entra en e4: tiene más tiempos y mejor estructura. Las negras perderán por zugzwang."
    ]
   },
   {
    "fen": "8/2p5/p1p1k2p/6p1/PP1K2P1/7P/8/8 w - - 3 42",
    "caption": "Juegan blancas: las negras tienen peones doblados en c6 y c7. ¿Cómo se atacan?",
    "line": [
     "Kc5",
     "Ke5",
     "a5"
    ],
    "comments": [
     "El rey ataca el peón c6, que ningún peón puede defender. Las demás jugadas son tablas.",
     "La mejor defensa: contraataque por el flanco de rey.",
     "Fija el peón a6 y quita a las negras su última jugada de peón útil en el flanco de dama: después de Kxc6 caerán los peones doblados."
    ]
   },
   {
    "fen": "8/1p6/1p1p1k2/2p1p2K/P1P1P3/1P1P4/8/8 w - - 1 39",
    "caption": "Juegan blancas: los peones b negros están doblados y no tienen tiempos de reserva. Encuentra el camino del rey.",
    "line": [
     "Kh6",
     "Ke6",
     "Kg6",
     "Ke7",
     "Kg7"
    ],
    "comments": [
     "El rey entra por el flanco de rey. Las jugadas que retroceden permiten ...Kg6 y son tablas.",
     "El rey negro vigila f7.",
     "El rey sigue avanzando y amenaza f7.",
     "El rey negro defiende f7 y f8.",
     "Ahora el rey blanco amenaza Kf8 y las negras se quedan sin jugadas: sus peones b doblados no dan tiempos. Zugzwang."
    ]
   }
  ]
 },
 "m2-retrasados": {
  "html": "<h4>Cómo se crea un peón retrasado</h4><p>El peón retrasado puede ser consecuencia de la apertura (…e5 en la Siciliana deja d6 retrasado por diseño) o el resultado de una lucha de peones en el medio juego. Hay dos formas típicas de provocarlo en el rival: <b>forzar un avance</b> del peón vecino (si el rival juega …b5 con su peón c todavía en c7 o c6, el peón c puede quedarse atrás) y <b>cambiar el peón vecino</b> (tras bxc6 bxc6 en la Carlsbad, el peón c6 queda retrasado frente al peón d5). Un aficionado suele mirar solo el peón, pero la clave es la casilla de delante: si el rival puede ocuparla con una pieza fuerte, la debilidad es grave; si nadie puede usarla, el peón retrasado es solo una pequeña molestia.</p><h4>El plan de bloqueo y presión, en orden</h4><ol><li><b>Impide la ruptura liberadora</b> antes que nada: en la Siciliana con …e5, todo gira en torno a <span class=\"mv\">...d5</span>. Si esa ruptura funciona, el peón retrasado desaparece y las piezas negras se activan de golpe.</li><li><b>Cambia los defensores de la casilla de delante</b>: en el ejemplo siciliano, el caballo de f6 (con <span class=\"mv\">Bg5</span> y Bxf6) y el alfil de e6. Un caballo propio en d5 que no puede ser cambiado es la pieza más fuerte del tablero.</li><li><b>Presiona el peón</b> con las torres en la columna semiabierta y, en el final, con el rey.</li><li><b>Abre un segundo frente</b> si el rival logra defender: un peón retrasado ata piezas, y esas piezas no llegan al otro flanco.</li></ol><h4>Las armas del defensor</h4><p>Quien tiene el peón retrasado no está perdido. El peón controla casillas importantes (en la Siciliana, c5 y e5), da solidez al centro y deja a las piezas propias detrás de una cadena firme. Los recursos son: preparar la ruptura con todas las piezas (<span class=\"mv\">...Rc8</span>, <span class=\"mv\">...Qc7</span>, <span class=\"mv\">...Be6</span>, <span class=\"mv\">...Nbd7</span>, y solo entonces <span class=\"mv\">...d5</span>); conservar el alfil que controla la casilla de delante; y buscar contrajuego activo en otro sector, como la columna c o el avance <span class=\"mv\">...b5</span>-b4 para desalojar al caballo de c3, el defensor principal de d5.</p><h4>Errores típicos</h4><ul><li>Atacar el peón retrasado frontalmente con muchas piezas sin controlar la casilla de delante: el rival rompe y libera su juego.</li><li>Ocupar la casilla de delante con una pieza que el rival puede cambiar dejando una recaptura de peón que cierra la columna. Antes de ocupar, piensa qué estructura quedará tras el cambio.</li><li>Con el peón retrasado, defenderlo pasivamente con todas las piezas: es preferible prepararse para romper o generar amenazas en otro sitio.</li></ul><p><b>Preguntas para la partida:</b> ¿quién controla la casilla de delante del peón? ¿puede el rival hacer la ruptura liberadora ahora? ¿qué piezas defienden esa casilla y cuáles puedo cambiar? ¿la estructura que queda tras un cambio en la casilla clave me favorece?</p>",
  "keyPoints": [
   "La casilla de delante del peón retrasado importa más que el propio peón.",
   "Orden del plan: impedir la ruptura, cambiar los defensores de la casilla clave, presionar el peón."
  ],
  "positions": [
   {
    "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p1B1/4P3/1NN5/PPP1BPPP/R2Q1RK1 w - - 6 10",
    "orientation": "white",
    "caption": "Najdorf con ...e5: la lucha por d5. Posición equilibrada.",
    "line": [
     "Bxf6",
     "Bxf6",
     "a4",
     "Bg5",
     "a5"
    ],
    "comments": [
     "Se elimina un defensor de d5. Las blancas ceden la pareja de alfiles para dominar la casilla clave.",
     "Las negras recapturan con el alfil, que queda algo pasivo detrás del peón e5.",
     "Se gana espacio en el flanco de dama y se impide ...b5, que daría contrajuego.",
     "Las negras activan su alfil malo por g5, fuera de la cadena: es la manera correcta de defenderse.",
     "El peón a5 fija b6. El motor da igualdad: las negras compensan d5 con la pareja de alfiles y actividad."
    ]
   },
   {
    "fen": "rn1q1rk1/1p3ppp/p2pbb2/3Np3/4P3/1N6/PPP1BPPP/R2Q1RK1 b - - 1 11",
    "orientation": "black",
    "caption": "El caballo ya está en d5. Las armas del defensor: no cambiar por cambiar y activar el alfil malo. Posición equilibrada.",
    "line": [
     "Nd7",
     "c4",
     "Bg5",
     "a4",
     "a5",
     "Qc2",
     "Rc8",
     "Rad1"
    ],
    "comments": [
     "Las negras no se apresuran a tomar en d5: después de ...Bxd5 exd5 las blancas ganarían espacio con un peón en d5, y a las negras les quedaría solo el alfil de casillas negras, el malo, detrás de d6 y e5. Primero desarrollan.",
     "Las blancas refuerzan el caballo de d5 con un peón.",
     "El alfil malo sale por g5, fuera de la cadena: podrá cambiarse por una pieza activa.",
     "Las blancas ganan espacio en el flanco de dama.",
     "Las negras frenan a4-a5 y fijan b4 para su caballo.",
     "La dama vigila c4 y la columna c.",
     "La torre se prepara para ...b5 o ...f5.",
     "Las blancas presionan d6. El motor da una pequeña ventaja a las negras (unas tres décimas): el caballo de d5 es fuerte, pero las negras tienen contrajuego y su alfil ya no es malo."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/1k6/pp1p4/1P2p3/PKP1P1p1/6P1/8/8 w - - 0 48",
    "caption": "Juegan blancas: el peón d6 es retrasado. Primero hay que abrir el flanco de dama. Encuentra la secuencia.",
    "line": [
     "a5",
     "Ka7",
     "axb6+",
     "Kxb6",
     "bxa6",
     "Kxa6",
     "c5"
    ],
    "comments": [
     "Ruptura: amenaza axb6 y bxa6 para crear un peón pasado. Las demás jugadas no ganan.",
     "El rey negro intenta mantener la estructura.",
     "Se abre la columna y se aleja al rey negro.",
     "Recaptura obligada.",
     "Se cambia el último peón del flanco de dama.",
     "El rey negro queda en el borde.",
     "Ahora la ruptura contra el peón retrasado: c5 ataca d6 y el rey blanco está mucho más cerca del centro que el negro."
    ]
   },
   {
    "fen": "5n2/1p1k4/1P1p3p/3Kp1p1/4P1P1/5P1P/3B4/8 w - - 1 42",
    "caption": "Juegan blancas: el rey ocupa d5, la casilla de delante del peón retrasado. ¿Cómo se gana el peón d6?",
    "line": [
     "Bb4",
     "Ng6",
     "Bxd6",
     "Nf4+",
     "Kxe5"
    ],
    "comments": [
     "El alfil ataca el peón retrasado desde b4, donde nadie puede molestarlo. Las demás jugadas incluso pierden.",
     "El caballo busca contrajuego por f4.",
     "Cae el peón d6: el retrasado era la debilidad decisiva.",
     "Jaque para ganar tiempo.",
     "El rey blanco come también e5 y queda con dos peones pasados en el centro."
    ]
   },
   {
    "fen": "8/1r1k4/3p4/P2Np1p1/1P2P1Pp/5P1P/4K3/8 w - - 2 47",
    "caption": "Juegan blancas: el caballo de d5 domina la casilla de delante del peón retrasado. ¿Cómo se gana?",
    "line": [
     "a6",
     "Ra7",
     "b5"
    ],
    "comments": [
     "El caballo, intocable en d5, controla b6 y c7; los peones del flanco de dama avanzan. f4 o Kd3 no ganan.",
     "La torre debe bloquear el peón a.",
     "Los peones avanzan unidos con el apoyo del caballo: b6 llegará y la torre negra no podrá contenerlos."
    ]
   },
   {
    "fen": "8/1p2bppp/p2pk3/4p3/2r1P3/2N2P2/PPPR1KPP/8 w - - 0 1",
    "caption": "Juegan blancas: final con el peón negro d6 retrasado. Encuentra la mejor casilla para el caballo.",
    "line": [
     "Nd5",
     "Bg5",
     "Re2"
    ],
    "comments": [
     "El caballo ocupa d5, la casilla de delante del peón retrasado: no puede ser expulsado por peones, bloquea d6 y su sitio es inmejorable. Las jugadas de espera, como Re2 o Ke1, dejan la posición igualada.",
     "El alfil busca la diagonal c1-h6, la única activa que tiene; no puede disputar d5 porque es de casillas negras.",
     "La torre se aparta del ataque del alfil y protege la segunda fila. El plan: c3, rey al centro y presión sobre d6; el alfil negro queda malo, detrás de d6 y e5."
    ]
   }
  ]
 },
 "m2-centro": {
  "html": "<h4>Qué dice el centro sobre dónde atacar</h4><p>En un centro cerrado, la dirección de la cadena de peones indica el flanco de cada bando. La regla, formulada por Nimzowitsch, es atacar la cadena por su <b>base</b> y jugar en el flanco hacia el que apunta la cabeza de tus peones. En la India de Rey con peones blancos en d5 y e4 y negros en d6 y e5, las blancas atacan la base d6 con <span class=\"mv\">c4</span>-c5 y las negras atacan la base e4 con <span class=\"mv\">...f5</span> (y después con …f4, …g5 y …g4 contra el rey). En la Francesa con peones blancos en d4 y e5, las negras atacan la base d4 con <span class=\"mv\">...c5</span> y las blancas juegan en el flanco de rey, adonde apunta su peón e5. Atacar la cabeza de la cadena (por ejemplo, …d6 contra e5) suele ser menos eficaz.</p><h4>Cuándo cerrar y cuándo abrir</h4><p>El bando que <b>decide</b> la estructura central tiene una gran ventaja. Algunas pautas:</p><ul><li><b>Cierra el centro</b> si tu ataque en un flanco va a llegar antes que el del rival, si tu rey está más expuesto en una posición abierta o si tienes caballos contra alfiles.</li><li><b>Abre el centro</b> si tienes ventaja de desarrollo, si el rey rival no ha enrocado o si tienes la pareja de alfiles. Abrir con el rey rival en el centro es la regla más importante del juego abierto.</li><li>Mantén la <b>tensión</b> si cualquier cambio favorece al rival: muchas veces la mejor jugada es la que no resuelve nada y obliga al otro a decidir.</li></ul><h4>El contraataque en el centro</h4><p>Un principio clásico: <b>un ataque en el flanco se refuta con un contraataque en el centro</b>. Si el rival lanza sus peones contra tu rey mientras el centro está móvil o tenso, la respuesta correcta casi nunca es defender pasivamente, sino abrir el centro: una ruptura con <span class=\"mv\">d4</span> o <span class=\"mv\">...d5</span> trae las piezas al combate y deja al atacante con peones avanzados y un rey sin abrigo. Al revés, si el centro está bloqueado por completo, este recurso no existe, y por eso los ataques de peones son posibles en posiciones cerradas.</p><h4>Errores típicos</h4><ul><li>Cerrar el centro con <span class=\"mv\">d5</span> sin tener un plan en el flanco de dama: se le entrega al rival la iniciativa en el otro lado.</li><li>En posiciones abiertas, jugar maniobras lentas con el rey en el centro.</li><li>En posiciones cerradas, perder el tiempo en el centro cuando la carrera se decide en los flancos.</li></ul><p>Un detalle práctico: cuando el centro se cierra, revisa qué alfil quedó malo. En la India de Rey, el alfil negro de g7 queda tapado por e5, pero gana vida si las negras rompen con <span class=\"mv\">...f5</span> y <span class=\"mv\">...f4</span>; por eso ese alfil «malo» a menudo termina siendo una pieza clave del ataque.</p><p><b>Lista de comprobación:</b> ¿el centro está cerrado, abierto, móvil o tenso? ¿quién puede cambiar esa estructura y cuándo? ¿hacia qué flanco apuntan mis peones centrales? Si el rival ataca en un flanco, ¿puedo responder en el centro?</p>",
  "keyPoints": [
   "Ataca la cadena de peones por su base: c5 contra d6 en la India de Rey, ...c5 contra d4 en la Francesa.",
   "Un ataque en el flanco se refuta con un contraataque en el centro, salvo que el centro esté bloqueado."
  ],
  "positions": [
   {
    "fen": "r1bq1rk1/ppp1n1bp/3p1n2/2PPp1p1/4Pp2/2NN1P2/PP1BB1PP/R2Q1RK1 w - - 0 14",
    "orientation": "white",
    "caption": "India de Rey con el centro cerrado: cada bando ataca en su flanco. Las blancas tienen una ligera ventaja.",
    "line": [
     "Rc1",
     "Rf7",
     "Nb5",
     "Ng6",
     "Qc2",
     "Ne8",
     "g4"
    ],
    "comments": [
     "La torre va a la columna c que se abrirá tras cxd6.",
     "Las negras preparan la defensa de c7 y d6 por la segunda fila.",
     "El caballo apunta a c7 y a7: el ataque blanco llega rápido.",
     "Las negras siguen con su plan en el flanco de rey: ...g4, ...h5.",
     "La dama se suma a la presión en la columna c.",
     "El caballo defiende c7 y d6.",
     "Las blancas frenan el avance ...g4 en el flanco de rey. El motor da medio peón a las blancas: el ataque en el flanco de dama está más avanzado."
    ]
   },
   {
    "fen": "r1b1kbnr/pp3ppp/1qn1p3/3pP3/2pP4/P1P2N2/1P3PPP/RNBQKB1R w KQkq - 0 7",
    "orientation": "white",
    "caption": "Francesa del Avance: las negras cierran con ...c4. Cambia el plan de ambos bandos.",
    "line": [
     "Nbd2",
     "Na5",
     "Be2",
     "Bd7",
     "Rb1",
     "Qc7",
     "h4"
    ],
    "comments": [
     "El caballo sale por d2, desde donde puede seguir a f1-g3 o presionar c4: al no haber tensión en d4, las blancas tienen tiempo.",
     "Las negras ocupan b3 y presionan el flanco de dama.",
     "Desarrollo tranquilo: el centro cerrado no exige prisa.",
     "Las negras completan su desarrollo.",
     "Prepara b3 para atacar la punta c4 de la cadena negra; contra la base e6, el plan blanco es f4-f5.",
     "La dama se aparta de la columna b.",
     "Las blancas ganan espacio en el flanco de rey, adonde apunta el peón e5. Posición equilibrada con planes claros para los dos."
    ]
   }
  ],
  "drills": [
   {
    "fen": "r1bqkb1r/pp3pp1/2nppn1p/8/3NP1PP/2N5/PPP2P2/R1BQKBR1 b Qkq - 2 8",
    "caption": "Juegan negras: las blancas lanzaron sus peones del flanco de rey. ¿Cuál es la respuesta correcta?",
    "line": [
     "d5",
     "exd5",
     "Nxd5",
     "Nxd5",
     "Qxd5"
    ],
    "comments": [
     "¡Contraataque en el centro! El rey blanco sigue en e1 y los peones g4 y h4 dejaron casillas débiles. Las jugadas lentas, como ...h5 o ...Nxd4, dejan a las blancas con medio peón más de ventaja.",
     "Las blancas toman; si no, ...dxe4 abre el juego.",
     "Recapturas con el caballo para cambiar piezas y abrir líneas.",
     "Las blancas cambian.",
     "La dama se centraliza atacando d4. El motor todavía da una pequeña ventaja blanca, pero mucho menor que tras las jugadas lentas: abrir el centro frenó el ataque."
    ]
   },
   {
    "fen": "6k1/5p2/3Kp1p1/3pP3/3P1PP1/8/8/8 w - - 3 50",
    "caption": "Juegan blancas: la cadena negra e6-d5 está bloqueada. Ataca la cadena por su base.",
    "line": [
     "f5",
     "gxf5",
     "gxf5",
     "exf5",
     "Kxd5"
    ],
    "comments": [
     "La ruptura f5 ataca e6, la base de la cadena. Las jugadas de rey no consiguen nada: es tablas.",
     "Las negras toman.",
     "Se recupera con peón y se insiste contra e6.",
     "Las negras cambian para no quedarse con un peón débil en e6.",
     "El rey blanco come d5: el peón d4 es pasado, el e5 lo apoya y el rey está en el centro. Ganan con facilidad."
    ]
   },
   {
    "fen": "8/5p2/k3p2p/1p1pP1pP/1KpP2P1/2P2P2/8/8 w - - 2 43",
    "caption": "Juegan blancas: todo está bloqueado. ¿Dónde está la ruptura ganadora?",
    "line": [
     "f4",
     "gxf4",
     "g5"
    ],
    "comments": [
     "La ruptura en el flanco hacia donde apunta el peón e5. Si las negras no toman, fxg5 y el peón h5 avanza. Las jugadas de rey pierden.",
     "Las negras toman.",
     "¡Segunda ruptura! Si ...hxg5, h6 y el peón corona; si ...f3, gxh6 f2 h7 f1=D h8=D, y la dama blanca entra con jaques y gana los peones f7 y e6."
    ]
   },
   {
    "fen": "8/1k6/1p2p1p1/3pP1Pp/PK1P3P/8/8/8 w - - 1 39",
    "caption": "Juegan blancas: centro cerrado y peones bloqueados en el flanco de rey. ¿Por dónde se gana?",
    "line": [
     "Kb5",
     "Kc7",
     "a5",
     "bxa5",
     "Kxa5",
     "Kc6",
     "Ka6"
    ],
    "comments": [
     "Con el centro y el flanco de rey cerrados, el juego está en el flanco de dama. Las demás jugadas son tablas.",
     "El rey negro defiende la casilla b6.",
     "Ruptura: se abre el flanco de dama.",
     "Las negras toman.",
     "El rey blanco recupera el peón y se acerca a b6 y b7.",
     "El rey negro bloquea.",
     "El rey sigue a b7 y entrará por c7 o d7: las negras, sin jugadas de peón, caen en zugzwang."
    ]
   }
  ]
 },
 "m2-peor-pieza": {
  "html": "<h4>Tres preguntas para cada pieza</h4><p>Para encontrar tu peor pieza no basta con mirarla: hay que hacerle preguntas. <b>¿Qué casillas útiles controla?</b> (casillas en el campo rival, casillas centrales, casillas que defienden al rey). <b>¿Participa en el plan?</b> (una torre en una columna cerrada, un alfil que muerde sus propios peones o un caballo en a3 no participan). <b>¿Tiene futuro?</b> (un alfil malo que nunca podrá salir es peor que uno temporalmente pasivo). La pieza con peores respuestas es la candidata a mejorar, y la jugada que la mejora suele ser la mejor de la posición cuando no hay nada táctico.</p><h4>Rutas típicas de mejora</h4><ul><li><b>Caballos:</b> del borde al centro o a un puesto avanzado. Ejemplos clásicos: <span class=\"mv\">Nb1</span>-d2-f1-g3 en la Española, <span class=\"mv\">...Na5</span>-c6 o …Nb7-d8-e6 para recuperar un caballo desplazado, <span class=\"mv\">Nf3</span>-e1-d3 en la India de Rey para apoyar c5.</li><li><b>Alfiles malos:</b> sacarlos por fuera de la cadena (en la Francesa, <span class=\"mv\">...Bd7</span>-e8-h5), cambiarlos por una pieza activa del rival o convertirlos en defensores útiles de los peones.</li><li><b>Torres:</b> a las columnas abiertas o a punto de abrirse; levantarlas por la tercera fila (<span class=\"mv\">Re3</span>-g3) cuando no hay columnas; doblarlas.</li><li><b>Rey:</b> en el final, el rey es una pieza más y casi siempre es la peor si se queda en su rincón.</li></ul><h4>Cuándo hay tiempo para maniobrar</h4><p>Una maniobra de tres o cuatro jugadas es posible si el rival no puede castigarla. Antes de iniciarla, haz una comprobación de seguridad: ¿tiene el rival alguna ruptura o amenaza que gane fuerza mientras mi pieza está de viaje? ¿la casilla de llegada seguirá siendo buena cuando llegue? En posiciones cerradas suele haber tiempo; en posiciones abiertas, solo si la iniciativa no está en manos del rival. Mientras maniobras, procura que cada jugada intermedia también haga algo útil (defender un peón, cubrir una casilla).</p><h4>Errores típicos</h4><ul><li>Mejorar la pieza que ya es buena: jugar con la dama o la torre activa porque son las que «se ven», mientras el caballo de a6 sigue sin jugar.</li><li>Cambiar la pieza buena y quedarse con la mala: cambiar el alfil bueno por un caballo sin pensar qué alfil queda.</li><li>Iniciar una maniobra larga cuando el rival tiene una amenaza concreta: la profilaxis va primero.</li></ul><p>En el final, la peor pieza suele ser el rey. Un rey que se queda en g1 mientras el rival centraliza el suyo equivale a jugar con una pieza menos. La regla es activarlo en cuanto desaparecen las damas y llevarlo a la casilla desde donde ataque los peones débiles del rival, aunque la ruta sea larga.</p><p><b>Rutina práctica:</b> cuando no haya táctica ni plan evidente, recorre tus piezas de la peor a la mejor, elige la peor, decide su casilla ideal y busca la ruta más corta y segura. Haz lo mismo con las piezas del rival: si su peor pieza está a punto de mejorar, impídelo.</p>",
  "keyPoints": [
   "Pregunta a cada pieza: qué casillas útiles controla, si participa en el plan y si tiene futuro.",
   "Antes de una maniobra larga, comprueba que el rival no tiene una amenaza que gane fuerza mientras tanto."
  ],
  "positions": [
   {
    "fen": "r1b2rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1 b - - 2 12",
    "orientation": "black",
    "caption": "Española Chigorin: el caballo de a5 es la peor pieza negra. Las negras lo rescatan con un cambio en d4.",
    "line": [
     "cxd4",
     "cxd4",
     "Nc6",
     "a3",
     "Bd7",
     "d5",
     "Nb8"
    ],
    "comments": [
     "Se cambia en d4 para abrir la casilla c6 al caballo.",
     "Las blancas recapturan.",
     "El caballo vuelve al centro: presiona d4 y deja de estar fuera de juego.",
     "Las blancas impiden ...Nb4.",
     "Las negras conectan sus piezas.",
     "Las blancas cierran el centro con tempo sobre el caballo.",
     "El caballo vuelve a b8 para buscar d7 y c5. Las blancas tienen una pequeña ventaja de espacio; el motor da unas cuatro décimas."
    ]
   },
   {
    "fen": "r1bq1rk1/pp4pp/2nbpn2/3p4/3P4/3B1N2/PP2NPPP/R1BQ1RK1 w - - 4 12",
    "orientation": "white",
    "caption": "La otra cara: empeora al rival. El alfil de d6 es la mejor pieza menor negra; las blancas lo cambian.",
    "line": [
     "Bf4",
     "Bxf4",
     "Nxf4",
     "Ne4",
     "Nh5",
     "Qb6"
    ],
    "comments": [
     "Se ofrece el cambio del alfil activo negro. El de c1 blanco no tenía un papel importante.",
     "Las negras aceptan; evitarlo con ...Be7 sería pasivo.",
     "El caballo recaptura y apunta a e6, la debilidad negra.",
     "El caballo negro salta al centro.",
     "El caballo presiona f6 y g7.",
     "La dama negra ataca b2. Ventaja ligera de las blancas (unas cuatro décimas): sin el alfil de d6, las casillas negras e5 y f4 quedan sin defensa."
    ]
   }
  ],
  "drills": [
   {
    "fen": "2r2k2/1p2bppp/p2p4/4p3/4P3/5P2/PPP3PP/1N1R1K2 w - - 0 1",
    "caption": "Juegan blancas: final con el peón negro d6 retrasado. ¿Cuál es tu peor pieza y adónde debe ir?",
    "line": [
     "Nc3",
     "b5",
     "Rd2",
     "b4",
     "Nd5"
    ],
    "comments": [
     "El caballo de b1 no hace nada; su casilla ideal es d5. Nc3 es el primer paso y es claramente mejor que c3 o las jugadas de torre.",
     "Las negras ganan espacio para expulsar al caballo con ...b4.",
     "La torre se aparta y defiende la segunda fila; el caballo ya no tiene prisa.",
     "Las negras expulsan al caballo de c3.",
     "Pero llega a d5, donde ningún peón puede molestarlo: domina la casilla de delante del peón retrasado."
    ]
   },
   {
    "fen": "1n6/8/p1pNk3/Pp1pP3/1P1P1K2/8/8/8 w - - 7 56",
    "caption": "Juegan blancas: final de caballos. Tu caballo de d6 parece bien colocado, pero no ataca nada. Mejóralo.",
    "line": [
     "Nb7",
     "c5",
     "Nxc5+"
    ],
    "comments": [
     "El caballo va hacia c5, desde donde atacará a6 y e6. Las demás jugadas no consiguen ventaja.",
     "Las negras intentan liberarse.",
     "El caballo gana el peón con jaque y llega a la casilla ideal: desde c5 ataca a6 y controla todo el flanco de dama."
    ]
   },
   {
    "fen": "8/6p1/N7/P4k1p/3K2n1/8/8/8 w - - 1 54",
    "caption": "Juegan blancas: el caballo de a6 está en el borde. Llévalo a una casilla donde apoye al peón pasado.",
    "line": [
     "Nb4",
     "Nf6",
     "a6",
     "Ne8",
     "Nd5"
    ],
    "comments": [
     "El caballo sale del borde y vigila d5 y c6. Las demás jugadas son tablas.",
     "El caballo negro se acerca para frenar el peón.",
     "El peón avanza protegido por el caballo.",
     "El caballo negro intenta llegar a c7.",
     "Desde d5 el caballo controla c7 y e7: el caballo negro no puede detener el peón."
    ]
   },
   {
    "fen": "8/8/p1pk4/1p1p2K1/1P1P4/P3P3/8/8 w - - 6 49",
    "caption": "Juegan blancas: final de peones con estructura bloqueada. El rey es tu peor pieza: encuentra su ruta.",
    "line": [
     "Kf6",
     "Kd7",
     "Kf7"
    ],
    "comments": [
     "El rey va hacia e8 o e7 para entrar por detrás. Las demás jugadas son tablas.",
     "El rey negro intenta mantener la oposición.",
     "El rey sigue hacia e8: las negras, que no tienen jugadas de peón útiles, deberán ceder el paso y caerá el peón c6."
    ]
   }
  ]
 },
 "m2-espacio": {
  "html": "<h4>Cómo se gana espacio sin crear debilidades</h4><p>Ganar espacio es avanzar peones, y todo avance de peón tiene un precio: las casillas que el peón deja de controlar detrás. Un peón en e5 controla d6 y f6, pero ya no controla d5 ni f5, y la casilla e4 que deja atrás puede convertirse en un puesto para una pieza rival. Por eso un avance que gana espacio debe cumplir dos condiciones: que el peón avanzado <b>se pueda sostener</b> (con otro peón o con piezas) y que las casillas que quedan detrás <b>no puedan ser ocupadas</b> por el rival. Un peón avanzado que no se puede sostener no da espacio: da un objetivo.</p><h4>La técnica del bando con más espacio</h4><ul><li><b>Restringir antes que atacar.</b> El objetivo inmediato no es dar mate, sino quitarle al rival sus rupturas y sus buenas casillas. Una jugada como <span class=\"mv\">a4</span> contra …b5 o <span class=\"mv\">Nd5</span> contra …d5 no amenaza nada, pero quita al rival su única forma de respirar.</li><li><b>Usar el espacio para maniobrar.</b> Detrás de tus peones tienes casillas para mover piezas de un flanco a otro. El rival, con sus piezas apretadas, tarda más en seguirte.</li><li><b>Abrir solo cuando estés listo.</b> El momento de romper llega cuando tus piezas están mejor colocadas que las del rival en el sector elegido; antes de eso, abrir solo le da aire.</li></ul><h4>La técnica del bando con menos espacio</h4><p>Las posiciones con poco espacio no son malas si son <b>sólidas y tienen una ruptura</b>. El defensor debe cambiar las piezas que se estorban (por ejemplo, el alfil que no tiene casillas o un caballo sin puestos), mantener los peones en casillas donde no ofrezcan blancos y tener preparada al menos una ruptura de peón. Mientras la ruptura siga siendo posible, el rival no puede relajarse. Una idea muy útil es <b>provocar el avance</b> de los peones rivales: cada paso hacia adelante deja casillas detrás para tus piezas.</p><h4>Errores típicos</h4><ul><li>Con más espacio: cambiar piezas sin necesidad, sobre todo las del rival que estaban mal colocadas; avanzar peones solo porque se puede; dejar que el rival haga su ruptura «por descuido».</li><li>Con menos espacio: romper antes de tiempo (la ruptura prematura abre líneas para las piezas del rival, que están mejor); colocar las piezas en casillas donde se bloquean entre sí; aceptar una posición sin ninguna ruptura posible.</li></ul><p>Una idea que verás en los ejercicios: cuando el centro está bloqueado, el bando con más espacio puede llevar el rey o las piezas al otro flanco con calma, porque el rival, encerrado detrás de sus peones, tarda más en reaccionar. El espacio no solo sirve para atacar: sirve para elegir dónde se jugará la partida.</p><p><b>Lista de comprobación:</b> ¿quién tiene más espacio y dónde? ¿cuál es la ruptura del bando con menos espacio y puedo impedirla con una jugada? ¿qué cambio aliviaría al rival y cómo lo evito? ¿mis peones avanzados están sostenidos?</p>",
  "keyPoints": [
   "Un peón avanzado da espacio solo si se puede sostener; si no, es un objetivo.",
   "Con más espacio, primero restringe: quita al rival sus rupturas y sus buenas casillas."
  ],
  "positions": [
   {
    "fen": "r2q1rk1/pp1bppbp/2np1np1/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 w - - 2 10",
    "orientation": "white",
    "caption": "Maroczy: con más espacio, evita los cambios. Ligera ventaja blanca.",
    "line": [
     "Nc2",
     "Rc8",
     "h3",
     "Na5",
     "Na3",
     "Be6",
     "b3",
     "Nc6"
    ],
    "comments": [
     "El caballo se retira para no cambiarse en d4: cada cambio alivia a las negras.",
     "Las negras presionan la columna c.",
     "Se quita la casilla g4 al caballo negro, otra forma de evitar cambios.",
     "El caballo negro ataca c4.",
     "El caballo defiende c4 desde a3, aunque parezca una casilla fea.",
     "Las negras presionan c4.",
     "Peón protegido: el cerrojo se mantiene.",
     "El caballo vuelve. Medio peón de ventaja según el motor: las negras no tienen rupturas y su posición sigue apretada."
    ]
   },
   {
    "fen": "2r1rbk1/1bqn1ppp/pp1ppn2/8/2P1P3/1PN1Q1P1/PB1N1PBP/2RR2K1 w - - 9 16",
    "orientation": "white",
    "caption": "Erizo: las negras aceptan menos espacio, pero son elásticas. Igualdad dinámica.",
    "line": [
     "Na4",
     "Ng4",
     "Qe2",
     "Ngf6",
     "a3",
     "h6",
     "Nc3"
    ],
    "comments": [
     "El caballo apunta a b6 y frena ...b5.",
     "Las negras buscan cambiar o molestar a la dama.",
     "La dama se retira sin cambiar: con más espacio no conviene cambiar piezas.",
     "El caballo negro vuelve; las negras esperan su momento.",
     "Las blancas preparan b4 para ganar más espacio.",
     "Jugada útil de espera.",
     "El caballo vuelve a vigilar d5 y b5. El motor da igualdad: el Erizo resiste mientras las rupturas ...b5 y ...d5 sigan vivas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "rnbq1rk1/1p3pbp/p2p1np1/2pP4/P3P3/2N2N2/1P2BPPP/R1BQ1RK1 b - - 0 10",
    "caption": "Juegan negras: Benoni Moderna, tienes menos espacio. ¿Qué pieza conviene cambiar?",
    "line": [
     "Bg4",
     "Nd2",
     "Bxe2",
     "Qxe2",
     "Nbd7"
    ],
    "comments": [
     "El alfil de c8 no tiene buenas casillas detrás de d6; se cambia por el de e2, que defiende el centro blanco. Es casi medio peón mejor que ...Re8.",
     "Las blancas evitan ...Bxf3 retirando el caballo, que irá a c4.",
     "Cambias tu pieza menos útil.",
     "Recaptura.",
     "El caballo sale por d7 hacia e5 o b6: con menos piezas, la falta de espacio molesta menos."
    ]
   },
   {
    "fen": "r1bqr1k1/p1n2pbp/1p1p1np1/2pP4/P1N1P3/2N2P2/1P2B1PP/R1BQ1RK1 b - - 1 13",
    "caption": "Juegan negras: tienes menos espacio y el caballo blanco de c4 es una pieza magnífica. ¿Qué haces?",
    "line": [
     "Ba6",
     "Bg5",
     "Bxc4",
     "Bxc4",
     "a6"
    ],
    "comments": [
     "Se cambia el alfil malo de c8 por el mejor caballo blanco. Las jugadas de espera dejan a las blancas con más de un peón y medio de ventaja.",
     "Las blancas desarrollan con amenaza sobre f6.",
     "Cambias el caballo de c4.",
     "Recaptura.",
     "Se prepara ...b5 para ganar espacio en el flanco de dama. Las negras siguen algo peor, pero ya respiran."
    ]
   },
   {
    "fen": "8/6p1/6p1/3p1kP1/p1pPpP2/PpP1P3/1P3K2/8 w - - 1 43",
    "caption": "Juegan blancas: el flanco de dama está cerrado y tienes más espacio en el de rey. Usa ese espacio con el rey.",
    "line": [
     "Kg3",
     "Ke6",
     "Kg4",
     "Kf7",
     "f5"
    ],
    "comments": [
     "El rey avanza detrás de su muro de peones. Las demás jugadas son tablas.",
     "El rey negro espera.",
     "El rey llega a g4, desde donde apoya la ruptura f5.",
     "Las negras no pueden impedirla.",
     "La ruptura en el momento justo: el rey blanco entrará por f4-e5 y las negras perderán sus peones."
    ]
   },
   {
    "fen": "6k1/2n5/3p2p1/p1pPp1Pp/1p2P3/3PB1P1/PPK5/8 w - - 0 36",
    "caption": "Juegan blancas: centro bloqueado, y tu ventaja de espacio te deja maniobrar. ¿Adónde va el rey?",
    "line": [
     "Kb3",
     "Ne8",
     "Ka4"
    ],
    "comments": [
     "El rey va al flanco de dama, donde hay peones negros débiles. Las demás jugadas no ganan.",
     "El caballo negro busca f5 para contraatacar.",
     "El rey sigue hacia a5: caerán los peones del flanco de dama. El bando con más espacio trasladó su rey al otro flanco antes de que el caballo negro pudiera crear contrajuego."
    ]
   }
  ]
 },
 "m2-pasado-medio": {
  "html": "<h4>Peón pasado protegido, aislado y unido</h4><p>No todos los peones pasados valen lo mismo en el medio juego. Un <b>pasado protegido</b> (apoyado por otro peón) es casi una pieza: el rival no puede atacarlo con el rey en el final y debe vigilarlo siempre. Un <b>pasado aislado</b> necesita piezas para avanzar y puede ser bloqueado y atacado. Dos <b>pasados unidos</b> en la sexta fila suelen valer más que una torre. Cuanto más avanzado está el peón, más fuerte es, pero también más difícil de defender: el peón en la sexta fila puede ser una fuerza decisiva o una debilidad aislada lejos de sus piezas. La pregunta clave es si las piezas propias pueden <b>escoltarlo</b>.</p><h4>El plan con el peón pasado</h4><ol><li><b>Elimina o desaloja al bloqueador.</b> Ataca la pieza que está delante del peón con otra pieza menor, o cámbiala. Un alfil que controla la casilla de bloqueo (por ejemplo, un alfil de casillas negras contra un bloqueador en d6) es el mejor aliado del peón.</li><li><b>Coloca las torres detrás</b> del peón: así ganan actividad a medida que el peón avanza.</li><li><b>Avanza en el momento táctico.</b> Muchas veces el peón avanza con tempo (atacando una pieza) o aprovechando una clavada o una sobrecarga. Un avance sin preparación solo cambia la casilla de bloqueo.</li><li><b>Usa el peón como amenaza</b> para obtener otras ventajas: el rival tiene piezas atadas a la defensa y eso abre juego en el otro flanco.</li></ol><h4>El plan del bando que bloquea</h4><p>El bloqueador ideal se instala en la casilla de delante y no puede ser atacado por peones. Después, el bando que bloquea busca <b>cambiar las piezas que apoyan al peón</b> (sobre todo el alfil del color de la casilla de bloqueo) y, con menos material, atacar el peón con el rey o las torres. Si el peón está aislado y bloqueado, en el final se convierte en una debilidad. Un detalle importante: el bloqueador no debe abandonar su casilla para «hacer algo», salvo que la jugada gane material o que otra pieza tome su relevo.</p><h4>Errores típicos</h4><ul><li>Bloquear con la dama: la desalojan con tempo y el peón avanza.</li><li>Empujar el peón sin apoyo hasta perderlo.</li><li>Olvidar que un peón pasado vale más con muchas piezas en el tablero si está bien apoyado, y vale más con pocas piezas si el rey puede escoltarlo.</li></ul><p>Por último, un peón pasado en la sexta o la séptima fila crea amenazas tácticas constantes: coronaciones, desviaciones de la pieza que lo vigila y jugadas con ganancia de tiempo. Cuando tengas un peón así, pregúntate en cada jugada si su avance gana algo.</p><p><b>Preguntas para la partida:</b> ¿puede el rival bloquear el peón y con qué pieza? ¿qué pieza propia controla la casilla de delante? ¿avanzar ahora gana algo (tempo, material, una casilla) o solo cambia la casilla de bloqueo? ¿qué cambios favorecen al bando que bloquea?</p>",
  "keyPoints": [
   "El peón pasado avanza mejor con tempo o aprovechando una clavada; sin preparación, solo cambia la casilla de bloqueo.",
   "El bando que bloquea busca cambiar las piezas que apoyan al peón."
  ],
  "positions": [
   {
    "fen": "r3r1k1/pbq2ppp/1p3n2/3P4/8/2N2B2/PP2QPPP/2RR2K1 w - - 0 1",
    "orientation": "white",
    "caption": "Peón pasado en d5: no hay prisa por avanzar. Primero se refuerza. Ventaja clara de las blancas.",
    "line": [
     "Qd3",
     "Qe5",
     "Qd2",
     "Rad8",
     "Re1",
     "Qb8",
     "Rxe8+",
     "Rxe8"
    ],
    "comments": [
     "La dama defiende d5 y vigila d4.",
     "La dama negra se centraliza en e5, delante del alfil.",
     "Se evita el cambio de damas y se mantiene el control de d4.",
     "Las negras bloquean d6 desde lejos.",
     "Las blancas disputan la columna e.",
     "La dama negra se aparta.",
     "Cambio de torres: cada cambio quita defensores al bloqueo negro.",
     "Recaptura. Casi dos peones de ventaja según el motor: el peón d5 sigue siendo la gran fuerza de la posición."
    ]
   },
   {
    "fen": "2rr2k1/pn2qpbp/1p4p1/3P4/5Q2/1BN5/PP3PPP/2RR2K1 b - - 0 1",
    "orientation": "black",
    "caption": "El bloqueo con el caballo: las negras neutralizan el peón pasado. Posición casi igualada.",
    "line": [
     "Nd6",
     "g3",
     "b5",
     "Re1",
     "Qd7",
     "Qb4",
     "h5"
    ],
    "comments": [
     "El caballo se instala en d6, delante del peón: desde ahí controla b5, c4, e4 y f5.",
     "Las blancas dan aire a su rey.",
     "Las negras ganan espacio y quitan la casilla c4.",
     "La torre busca la columna e.",
     "La dama apoya al bloqueador.",
     "La dama blanca presiona desde b4.",
     "Las negras ganan espacio en el flanco de rey. El motor da apenas dos décimas a las blancas: el bloqueo funciona."
    ]
   }
  ],
  "drills": [
   {
    "fen": "2r2rk1/pp1n1pbp/3q2p1/3P4/8/2N2B2/PP1Q1PPP/2RR2K1 w - - 0 1",
    "caption": "Juegan blancas: la dama negra bloquea el peón pasado. ¿Cómo lo aprovechas?",
    "line": [
     "Ne4",
     "Qe5",
     "d6",
     "Rxc1",
     "Qxc1"
    ],
    "comments": [
     "La dama es un mal bloqueador: el caballo la ataca con tempo y el peón queda listo para avanzar. Es más de medio peón mejor que las jugadas lentas.",
     "La dama se aparta a una casilla activa.",
     "El peón avanza a d6: ahora sí es una fuerza.",
     "Las negras cambian torres para aliviar.",
     "Recaptura con la dama, que entra en la columna c. El peón d6 sigue siendo muy peligroso."
    ]
   },
   {
    "fen": "r1r3k1/p2bbp2/6p1/q2pPp1p/3B4/2N5/PP1Q1RPP/R5K1 w - - 0 21",
    "caption": "Juegan blancas: tienes un peón muy avanzado en e5. ¿Hay que esperar o avanzar ya?",
    "line": [
     "e6",
     "Rc4",
     "exd7"
    ],
    "comments": [
     "¡Avanza ahora! El peón ataca el alfil de d7 y abre la diagonal del alfil de d4 hacia g7. Las jugadas lentas permiten a las negras consolidar.",
     "La mejor defensa: contraatacar el alfil de d4.",
     "El peón come el alfil y llega a la séptima fila: las negras quedan con una pieza menos y un peón en d7 que les ata las piezas."
    ]
   },
   {
    "fen": "2rn1k2/6bp/p2P2p1/B2Bp3/3nP3/2N5/1PP2KPP/8 w - - 5 32",
    "caption": "Juegan blancas: el peón de d6 está a dos pasos de coronar. ¿Cómo sacas provecho?",
    "line": [
     "d7",
     "Rb8",
     "Bc7",
     "Ke7",
     "Bxb8"
    ],
    "comments": [
     "El peón avanza a la séptima y ataca la torre. Con cualquier otra jugada las negras quedan mejor: el peón de d6 caería.",
     "La torre se aparta.",
     "El alfil persigue a la torre, que no tiene casillas.",
     "El rey negro se acerca al peón.",
     "Las blancas ganan la torre por el alfil: el peón de d7 obligó a las negras a defenderse con todo."
    ]
   },
   {
    "fen": "2r3k1/5p2/P2p2p1/1n2p2n/2q1P3/4B1PP/1Q3P2/R5K1 w - - 1 35",
    "caption": "Juegan blancas: el peón de a6 es tu mejor pieza. Encuentra cómo acelerarlo.",
    "line": [
     "Rc1",
     "Nc3",
     "a7"
    ],
    "comments": [
     "La torre ataca la dama por la columna c y prepara a7. El avance inmediato a7 permite ...Nxa7.",
     "Las negras bloquean la columna c con el caballo.",
     "El peón llega a a7 y no hay quien lo detenga sin perder material."
    ]
   }
  ]
 },
 "m2-color": {
  "html": "<h4>Alfil bueno, alfil malo y alfil activo</h4><p>Se llama <b>alfil malo</b> al que tiene sus propios peones centrales fijos en casillas de su color, y <b>alfil bueno</b> al que los tiene en el color contrario. La definición se refiere a la estructura, no a la actividad: un alfil malo puede estar activo por fuera de la cadena (por ejemplo, delante de sus peones), y en el medio juego defiende precisamente las casillas que sus peones ya no cubren. El problema aparece en el final, cuando el alfil malo queda detrás de sus peones defendiéndolos y el rival ataca las casillas del otro color. Por eso es tan habitual <b>cambiar el alfil bueno del rival</b> y dejarle el malo: es una forma de crear una debilidad de color permanente.</p><h4>El plan para dominar un color</h4><ol><li><b>Cambia el defensor de ese color.</b> Normalmente el alfil de esas casillas; a veces un caballo que las cubre.</li><li><b>Fija los peones del rival</b> en el color contrario, de forma que no puedan volver a cubrir las casillas débiles.</li><li><b>Ocupa las casillas débiles</b> con piezas, empezando por el caballo, que no puede ser desalojado por peones ni por el alfil rival (que es del otro color).</li><li><b>Coordina la dama con el alfil</b> del color dominado: juntas crean amenazas de mate o de penetración en casillas que nadie defiende.</li></ol><h4>Alfiles de distinto color</h4><p>Con alfiles de distinto color, el control de las casillas de un color es absoluto: tu alfil ataca casillas que el alfil rival nunca podrá defender. En el medio juego, esto favorece al <b>atacante</b>: el alfil propio actúa como una pieza de más en las casillas que el rival no controla. En el final, en cambio, los alfiles de distinto color tienden a las tablas porque el defensor bloquea los peones en las casillas de su alfil. Conclusión práctica: con alfiles de distinto color, ataca con piezas en el medio juego; si vas por delante en material, evita simplificar, y si vas por detrás, busca los cambios hacia el final de alfiles de distinto color.</p><h4>Errores típicos</h4><ul><li>Colocar los peones en el color de tu propio alfil cuando el rival ya no tiene alfil de ese color: tus peones tapan a tu alfil y dejan el otro color sin defensa.</li><li>Cambiar el alfil que defiende las casillas débiles de tu enroque (por ejemplo, el de g7 tras …g6).</li><li>Ocupar una casilla débil con la pieza equivocada: un alfil en una casilla que el alfil rival puede disputar, en vez de un caballo.</li></ul><p>En el final, la debilidad de color abre la puerta al rey: si todos los peones rivales están en casillas blancas, tu rey camina por las negras sin que ningún peón lo moleste. Es el mecanismo de uno de los ejercicios, y también la razón por la que el bando de la Stonewall teme los finales.</p><p><b>Lista de comprobación:</b> ¿qué alfiles quedan y de qué color? ¿en qué color están los peones fijos de cada bando? ¿qué casillas no puede controlar ningún peón ni alfil del rival? ¿qué pieza propia puede instalarse allí?</p>",
  "keyPoints": [
   "Cambia el alfil bueno del rival y déjale el malo: es una debilidad de color permanente.",
   "Con alfiles de distinto color, en el medio juego manda el atacante; en el final, el defensor."
  ],
  "positions": [
   {
    "fen": "r1bq1rk1/p3ppbp/2p3p1/3n4/8/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 12",
    "orientation": "white",
    "caption": "Dragón: las blancas cambian el alfil de g7 para debilitar las casillas negras del enroque negro. Ligera ventaja blanca.",
    "line": [
     "Bd4",
     "Bxd4",
     "Qxd4",
     "Qb6",
     "Na4",
     "Qa5",
     "b3"
    ],
    "comments": [
     "Se ofrece el cambio del alfil de g7, defensor de las casillas negras alrededor del rey negro.",
     "Las negras cambian.",
     "La dama recaptura y apunta a d5 y a las casillas negras.",
     "La dama negra busca contrajuego contra el rey blanco.",
     "El caballo esquiva y ataca la dama.",
     "La dama negra se reubica.",
     "Las blancas protegen su rey. Unas seis décimas de ventaja: f6 y h6 quedaron sin el alfil que las defendía."
    ]
   },
   {
    "fen": "rnbqk2r/pp2nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR b KQkq - 2 7",
    "orientation": "black",
    "caption": "Francesa Winawer: las negras entregaron su alfil de casillas negras; la dama blanca ataca g7 enseguida. Ligera ventaja blanca.",
    "line": [
     "Qc7",
     "Bd3",
     "cxd4",
     "Ne2",
     "dxc3",
     "Qxg7",
     "Rg8",
     "Qxh7"
    ],
    "comments": [
     "Las negras contraatacan e5 y c3 en vez de defender g7 con piezas.",
     "Desarrollo con ataque: el alfil apunta a h7.",
     "Las negras abren el flanco de dama.",
     "El caballo defiende c3 y d4.",
     "Las negras ganan un peón.",
     "La dama entra en g7: sin alfil de casillas negras, el enroque negro no se puede defender bien.",
     "La torre expulsa a la dama.",
     "Las blancas recuperan material con un ataque peligroso. Unas cuatro décimas para las blancas según el motor: posición muy aguda."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3r1rk1/pb1nqppp/2p1p3/4P3/1p2N3/4QB2/PPP2PPP/3R1RK1 w - - 0 1",
    "caption": "Juegan blancas: las negras no tienen alfil de casillas negras. ¿Qué casilla debes ocupar?",
    "line": [
     "Nd6",
     "Rb8",
     "Rfe1"
    ],
    "comments": [
     "El caballo se instala en d6, una casilla negra que ningún peón ni alfil negro puede disputar; además ataca b7. Es casi dos peones mejor que cualquier otra jugada.",
     "La torre defiende el alfil de b7.",
     "Las blancas refuerzan: la torre apoya e5, el sostén del caballo. Las piezas negras quedan atadas a la defensa."
    ]
   },
   {
    "fen": "8/2k5/2p1p3/p2pPp2/P2K1Pp1/4P1P1/8/8 w - - 1 49",
    "caption": "Juegan blancas: los peones negros están todos en casillas blancas. Encuentra la ruta del rey.",
    "line": [
     "Kc5",
     "Kb7",
     "Kd6"
    ],
    "comments": [
     "Las casillas negras c5 y d6 son inaccesibles para los peones negros. Las jugadas de espera pierden.",
     "El rey negro defiende c6.",
     "El rey blanco ataca e6 y c6 a la vez: caerá uno de los dos y el final está ganado."
    ]
   },
   {
    "fen": "4r1k1/1q1rBp1p/2p3p1/p2b2Q1/8/7P/P4PP1/R3R1K1 w - - 3 25",
    "caption": "Juegan blancas: alfiles de distinto color con damas. Tu alfil domina las casillas negras alrededor del rey negro. Úsalo.",
    "line": [
     "Bf6",
     "Rde7",
     "Rxe7",
     "Qxe7",
     "Bxe7"
    ],
    "comments": [
     "El alfil se instala en f6 y amenaza Qh6 con mate en g7: el alfil negro de casillas blancas no puede ayudar. Las demás jugadas apenas dan ventaja.",
     "La única defensa contra el mate: interponer y cambiar torres.",
     "Cambias torres.",
     "Si ...Rxe7, Qh6 y mate en g7; las negras tienen que entregar la dama.",
     "Las blancas ganan la dama por torre: la debilidad de las casillas negras fue decisiva."
    ]
   },
   {
    "fen": "r4rk1/pp3ppp/4b3/2pp4/5B2/6QP/PqP2PP1/3R1RK1 w - - 0 18",
    "caption": "Juegan blancas: la dama negra se fue a b2 y el enroque negro quedó sin defensores en las casillas negras. Encuentra la jugada fuerte.",
    "line": [
     "Be5",
     "Qxe5",
     "Qxe5"
    ],
    "comments": [
     "El alfil ocupa la gran diagonal negra: ataca la dama y amenaza Qxg7 mate. Si la dama se aparta, llega el mate; si ...f6, Bxb2.",
     "Las negras deben entregar la dama.",
     "Las blancas quedan con dama contra torre y alfil: el control de las casillas negras decidió."
    ]
   }
  ]
 },
 "m2-transformar": {
  "html": "<h4>Tipos de transformación</h4><p>Las transformaciones más frecuentes son:</p><ul><li><b>Desarrollo en ataque:</b> con el rey rival en el centro, abrir líneas aunque cueste un peón.</li><li><b>Ataque en material:</b> cuando el ataque ya no puede dar mate, cobrarlo en material o en un final mejor antes de que el rival consolide.</li><li><b>Material en estructura o actividad:</b> devolver material de más para obtener un final sencillo, quitarle el contrajuego al rival o conseguir una estructura que gana sola.</li><li><b>Debilidad en otra debilidad:</b> cambiar un peón débil del rival por otro más débil, o cambiar la estructura con una ruptura para que aparezca un objetivo nuevo.</li><li><b>Una ventaja en dos:</b> el principio de las dos debilidades. Una sola debilidad se defiende; si se crea otra en el otro flanco, la defensa se rompe.</li></ul><h4>Devolver material a tiempo</h4><p>Uno de los errores más frecuentes en la práctica es aferrarse al material. Si tienes un peón de más pero el rival tiene mucha actividad, devolverlo para cambiar las piezas activas del rival suele ser la manera más rápida de ganar. La pregunta no es «¿cuánto material tengo?», sino <b>«¿qué posición quedará y quién tendrá la iniciativa?»</b>. Lo mismo vale para el ataque: un ataque que ya no da mate se convierte en una deuda si se ha pagado con peones; es el momento de cobrarlo en forma de final favorable.</p><h4>El final de peones como destino</h4><p>El final de peones es el terreno donde las ventajas se convierten con mayor certeza, pero también el más implacable. Antes de cambiar la última pieza, comprueba: ¿tengo un peón pasado alejado que desvíe al rey rival? ¿mi rey llega antes al centro o a los peones del rival? ¿tengo tiempos de reserva para ganar la oposición? ¿hay alguna ruptura que cree un pasado para el rival? En el final de peones no hay piezas que salven un error de cálculo, así que esta comprobación debe hacerse jugada a jugada.</p><h4>Errores típicos</h4><ul><li>Mantener una ventaja temporal hasta que se esfuma (no abrir el juego con ventaja de desarrollo).</li><li>Cambiar piezas cuando se va por detrás en material, o evitarlas cuando se va por delante.</li><li>Liquidar a un final de peones sin calcularlo hasta el final.</li><li>Aceptar una transformación que deja una ventaja más pequeña: la nueva ventaja debe ser más duradera o más fácil de convertir que la anterior.</li></ul><p>Por eso, en muchos finales igualados en material la jugada ganadora es un cambio: torres, alfiles o un alfil por un caballo, para llegar a un final de peones donde tu rey entra o tu peón pasado decide. La pregunta clave es siempre la misma: ¿qué final de peones queda si cambio esta pieza?</p><p><b>Lista de comprobación:</b> ¿mi ventaja es temporal o permanente? ¿se está agotando? ¿qué transformación le quita al rival su mejor recurso? ¿el final resultante está calculado?</p>",
  "keyPoints": [
   "Devolver material para cambiar las piezas activas del rival suele ser la vía más corta hacia la victoria.",
   "Principio de las dos debilidades: si una debilidad se defiende, crea otra en el otro flanco."
  ],
  "positions": [
   {
    "fen": "8/3rkp2/p5p1/7p/1P6/P4PPP/3R1K2/8 w - - 0 1",
    "orientation": "white",
    "caption": "Final de torres con mayoría en el flanco de dama: el cambio de torres transforma la ventaja en un final de peones ganado.",
    "line": [
     "Rxd7+",
     "Kxd7",
     "Ke3",
     "Kc6",
     "a4",
     "Kd5",
     "Kd3",
     "g5",
     "g4"
    ],
    "comments": [
     "Se cambian torres: en el final de peones, la mayoría del flanco de dama será decisiva. Con torres, el motor da dos peones; sin ellas, cerca de cinco.",
     "Recaptura obligada.",
     "El rey se centraliza.",
     "El rey negro va al flanco de dama.",
     "Se prepara b5 para crear un peón pasado.",
     "El rey negro se acerca al centro.",
     "Oposición: el rey blanco frena al negro.",
     "Las negras buscan contrajuego.",
     "Las blancas fijan el flanco de rey. El peón pasado del flanco de dama desviará al rey negro."
    ]
   },
   {
    "fen": "r1bq1rk1/pp2bppp/2n1p3/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 b - - 4 10",
    "orientation": "black",
    "caption": "Peón aislado: las blancas tienen actividad temporal; las negras deben neutralizarla antes de que se transforme en algo duradero.",
    "line": [
     "Bf6",
     "Be4",
     "Bd7",
     "Bxd5",
     "exd5",
     "Nxd5",
     "Bg4",
     "Nxf6+",
     "Qxf6"
    ],
    "comments": [
     "El alfil presiona d4, el punto débil de las blancas.",
     "Las blancas buscan cambiar el caballo de d5, el bloqueador.",
     "Las negras desarrollan.",
     "Las blancas cambian alfil por caballo para quitar el bloqueador de d5.",
     "Las negras recapturan con peón.",
     "Las blancas ganan el peón de d5.",
     "Las negras contraatacan contra f3 y d4.",
     "Las blancas simplifican.",
     "La dama recaptura. Posición dinámica e igualada según el motor: la ventaja temporal de actividad se transformó en un peón de más, pero la presión negra sobre d4 y f3 lo compensa."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/5p2/1k2p3/pp1rPp1p/5P1P/1P2K1P1/P2R4/8 w - - 0 33",
    "caption": "Juegan blancas: final de torres equilibrado en material. ¿Hay alguna transformación que gane?",
    "line": [
     "Rxd5",
     "exd5",
     "Kd4",
     "b4",
     "Kxd5"
    ],
    "comments": [
     "El cambio de torres deja un final de peones ganado: el peón d5 negro será débil y el rey blanco entrará. Con las torres en el tablero es tablas.",
     "Recaptura obligada.",
     "El rey ataca d5 enseguida.",
     "Las negras buscan contrajuego en el flanco de dama, pero el rey blanco está más cerca.",
     "Cae el peón d5 y el rey blanco queda en el centro: e5-e6 y la entrada en el flanco de rey deciden. Las demás jugadas son tablas."
    ]
   },
   {
    "fen": "8/2b5/1Bk3pp/P1p1pp2/8/2PPK2P/6P1/8 w - - 3 33",
    "caption": "Juegan blancas: final de alfiles. El peón de a5 está pasado. ¿Cómo se transforma la ventaja?",
    "line": [
     "Bxc7",
     "Kxc7",
     "d4",
     "exd4+",
     "cxd4"
    ],
    "comments": [
     "Se cambian los alfiles: en el final de peones, el peón a5 desviará al rey negro. Las demás jugadas son malas: el alfil negro frena el peón a.",
     "Recaptura obligada.",
     "Ruptura central: se crea un segundo peón pasado.",
     "Las negras toman.",
     "Dos peones pasados separados, en a5 y d4: el rey negro no puede detener a los dos."
    ]
   },
   {
    "fen": "1n6/1k3p1p/p2Bp1p1/Pp1pP1P1/1K1P1P1P/1P6/8/8 w - - 5 43",
    "caption": "Juegan blancas: alfil contra caballo con peones bloqueados. ¿Cuál es la transformación ganadora?",
    "line": [
     "Bxb8",
     "Kxb8",
     "Kc5",
     "Kc7",
     "b4"
    ],
    "comments": [
     "Se entrega el alfil por el caballo: el final de peones está ganado porque el rey blanco entra por c5. Con las piezas, es tablas.",
     "Recaptura obligada.",
     "El rey entra en c5, la casilla negra de entrada.",
     "El rey negro defiende.",
     "Jugada de espera que fija el peón b5: las negras se quedan sin jugadas útiles y el rey blanco entrará por d6 o b6."
    ]
   },
   {
    "fen": "8/3bk3/8/1B2p1p1/4P3/4K1P1/8/8 w - - 0 59",
    "caption": "Juegan blancas: final de alfiles del mismo color. ¿Cambiar o no cambiar?",
    "line": [
     "Bxd7",
     "Kxd7",
     "Kf3",
     "Ke6",
     "Kg4"
    ],
    "comments": [
     "El cambio de alfiles lleva a un final de peones ganado: el rey blanco llegará antes a g5. Con los alfiles es tablas.",
     "Recaptura obligada.",
     "El rey se dirige a g4.",
     "El rey negro intenta defender.",
     "El rey blanco llega a g4 y luego a h5 o f5: el peón g5 cae."
    ]
   }
  ]
 },
 "m2-dos-flancos": {
  "html": "<h4>El principio de las dos debilidades</h4><p>El juego en ambos flancos es la aplicación práctica del <b>principio de las dos debilidades</b>: un defensor bien organizado puede resistir contra una sola debilidad, porque concentra sus piezas en ella; pero si aparece una segunda debilidad lejos de la primera, sus piezas no pueden estar en dos lugares a la vez. La técnica consiste en atacar la primera debilidad hasta que el rival coloque sus piezas en posiciones defensivas, y entonces cambiar de frente con rapidez. La debilidad no tiene que ser un peón: puede ser una casilla de entrada, una columna abierta o el propio rey.</p><h4>Las piezas que cambian de frente</h4><p>No todas las piezas trasladan su fuerza igual de rápido. La <b>dama</b> y las <b>torres</b> por filas abiertas (sobre todo la segunda o la tercera) cambian de flanco en una o dos jugadas. Los <b>alfiles</b> en diagonales largas actúan en ambos flancos a la vez y son las piezas ideales para este tipo de juego. Los <b>caballos</b> son lentos: necesitan tres o cuatro jugadas para cruzar el tablero, así que conviene colocarlos en el centro, desde donde pueden ir a cualquier lado. El <b>rey</b>, en el final, es la pieza que más a menudo decide el cambio de frente: amenaza entrar por un lado y el rey rival no puede cubrir los dos.</p><h4>El final: atacar donde el rival no llega</h4><p>En los finales, el juego en dos flancos es la técnica ganadora por excelencia. Un ejemplo típico: con un peón de más en un flanco, el bando fuerte crea un peón pasado que el rey rival tiene que vigilar; mientras el rey defensor está ocupado, el rey atacante entra por el otro flanco. También en los finales de torres la torre activa ataca peones en un lado y luego en el otro, obligando a la torre rival a defender sin descanso. La norma de oro es <b>no apresurarse</b>: mejorar todas las piezas al máximo antes del golpe decisivo, porque el defensor apenas puede mejorar su posición.</p><h4>Errores típicos</h4><ul><li>Atacar en un solo flanco hasta agotar las posibilidades y dejar todo bloqueado.</li><li>Dejar las piezas en el borde, desde donde no pueden cambiar de frente.</li><li>Con el bando que defiende, adelantar peones en el flanco tranquilo para «ganar espacio»: eso crea la segunda debilidad que el rival estaba buscando.</li></ul><p>En los finales de peones el principio toma una forma muy concreta: un peón pasado en un flanco atrae al rey rival y, mientras tanto, tu rey come en el otro. Antes de iniciar la maniobra, cuenta los tiempos: ¿cuántas jugadas necesita cada rey para llegar a su destino?</p><p><b>Preguntas para la partida:</b> ¿dónde está la primera debilidad del rival y la tiene bien defendida? ¿puedo crear una segunda en el otro flanco? ¿mis piezas pueden cambiar de frente más rápido que las suyas? ¿estoy mejorando todo antes del golpe final?</p>",
  "keyPoints": [
   "Principio de las dos debilidades: ataca una hasta que el rival se concentre en ella y cambia de frente.",
   "Coloca caballos en el centro y torres en filas abiertas para poder cambiar de flanco rápido."
  ],
  "positions": [
   {
    "fen": "8/6pp/p2pkp2/1p1Rp3/1Pr1P3/1KP2P2/P5PP/8 w - - 3 27",
    "orientation": "white",
    "caption": "Final de torres: las blancas crean una segunda debilidad en el flanco de dama. Ventaja decisiva.",
    "line": [
     "a4",
     "Rc8",
     "axb5",
     "axb5",
     "Rxb5",
     "f5",
     "c4"
    ],
    "comments": [
     "Ruptura en el flanco de dama: se ataca la cadena negra para dejar un peón aislado en b5.",
     "La torre negra se retira.",
     "Se cambian peones.",
     "Recaptura.",
     "La torre gana el peón b5.",
     "Las negras buscan contrajuego en el otro flanco.",
     "Los peones pasados del flanco de dama avanzan. Unos tres peones y medio de ventaja: las negras no pueden defender los dos flancos."
    ]
   },
   {
    "fen": "rnbqnrk1/pp2bppp/3p4/2pPp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 6 8",
    "orientation": "black",
    "caption": "Benoni Checa: centro cerrado y una ruptura posible en cada flanco. Las blancas tienen cerca de un peón de ventaja.",
    "line": [
     "Bg4",
     "b3",
     "Nd7",
     "Ne1",
     "Bxe2",
     "Qxe2",
     "g6",
     "Bh6",
     "Ng7"
    ],
    "comments": [
     "Las negras cambian su alfil de casillas blancas, el bueno, por el alfil blanco de e2, un buen defensor del centro blanco; así alivian la falta de espacio.",
     "Las blancas preparan a3 y b4 en el flanco de dama.",
     "Desarrollo.",
     "El caballo va hacia d3 para apoyar b4 o f4.",
     "Cambio de alfiles.",
     "Recaptura.",
     "Las negras preparan ...f5.",
     "Las blancas cambian el alfil de casillas negras.",
     "El caballo defiende. Las blancas pueden elegir entre b4 y f4: tener dos rupturas es su ventaja."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/6k1/5r2/3R1p1p/2pP1P2/2P1P3/PP6/2K5 b - - 0 38",
    "caption": "Juegan negras: la torre blanca está ocupada en el flanco de dama. Crea una amenaza en el otro flanco.",
    "line": [
     "h4",
     "Kd2",
     "h3"
    ],
    "comments": [
     "El peón h corre: está lejos del rey blanco y la torre blanca está lejos. Las demás jugadas son tablas.",
     "El rey blanco intenta acercarse.",
     "El peón llega a h3: la torre blanca tendrá que abandonar el flanco de dama para detenerlo."
    ]
   },
   {
    "fen": "8/8/2p5/1p6/8/1P2k1K1/P1P5/8 b - - 0 48",
    "caption": "Juegan negras: los reyes están en flancos distintos. ¿Cómo se gana?",
    "line": [
     "b4",
     "Kg4",
     "Kd2"
    ],
    "comments": [
     "Se fijan los peones blancos del flanco de dama para que el rey negro pueda comerlos. Otras jugadas son tablas.",
     "El rey blanco está lejos.",
     "El rey negro va a c2: los peones blancos caerán antes de que el rey blanco llegue."
    ]
   },
   {
    "fen": "8/pp6/2p3k1/8/2P2KPp/3P4/P7/8 b - - 0 36",
    "caption": "Juegan negras: tienes un peón pasado en h4. Primero frena el flanco de dama y luego cambia de frente.",
    "line": [
     "c5",
     "g5",
     "h3",
     "Kg3",
     "Kxg5"
    ],
    "comments": [
     "Se fijan los peones blancos del flanco de dama: d3 y c4 ya no pueden crear un pasado. Las demás jugadas permiten d4-d5 y son tablas.",
     "Las blancas intentan crear algo en el flanco de rey.",
     "El peón h avanza y desvía al rey blanco.",
     "El rey blanco debe ir a detenerlo.",
     "El rey negro gana el peón g5: los dos flancos estaban a su favor."
    ]
   },
   {
    "fen": "8/8/3p1p1p/3Pp1pP/1p1kP1P1/5P2/P1K5/8 w - - 2 51",
    "caption": "Juegan blancas: el rey negro está en d4. Cambia de frente con tu rey.",
    "line": [
     "Kb3",
     "Ke3",
     "Kxb4",
     "Kxf3",
     "a4"
    ],
    "comments": [
     "El rey ataca el peón b4 y deja al rey negro en el otro flanco. Otras jugadas pierden o son tablas.",
     "El rey negro va a comer los peones del flanco de rey.",
     "Cae b4 y el peón a queda libre.",
     "El rey negro come f3.",
     "El peón a corre hacia la coronación: llega antes que los peones negros del flanco de rey."
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
