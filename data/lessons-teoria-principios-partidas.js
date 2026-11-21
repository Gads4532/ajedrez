/* Teoría ampliada y ejercicios nuevos: principios-partidas. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
   "ap-desarrollo": {
    "html": "<h4>Qué significa «desarrollar bien»</h4><p>Sacar piezas no basta: hay que sacarlas <b>a casillas donde tengan futuro</b>. Una pieza está bien desarrollada cuando cumple tres condiciones: controla casillas centrales, no estorba a otras piezas y no puede ser expulsada con ganancia de tiempo. Un caballo en <span class=\"mv\">Nf3</span> cumple las tres; un alfil en <span class=\"mv\">Bd3</span> delante del peón d2 incumple la segunda, porque encierra al alfil de c1. Por eso los entrenadores insisten en pensar en <b>el orden</b>: primero las piezas cuya casilla ideal ya conoces (casi siempre los caballos), después las que dependen de la estructura (alfiles y dama).</p><h4>Las excepciones a las reglas</h4><p>Las reglas de desarrollo describen lo que conviene <i>casi siempre</i>, y un buen jugador sabe cuándo romperlas:</p><ul><li><b>Mover dos veces la misma pieza</b> está justificado si así se gana material, se evita una pérdida o se castiga un error concreto. En la Española, <span class=\"mv\">Bb5</span>, <span class=\"mv\">Ba4</span> y <span class=\"mv\">Bb3</span> son tres jugadas del mismo alfil, pero cada una responde a un peón negro que avanza y gana espacio.</li><li><b>Sacar la dama pronto</b> es correcto cuando no puede ser atacada con tempo, o cuando gana algo forzado. En la Escandinava (<span class=\"mv\">1.e4 d5 2.exd5 Qxd5</span>) la dama sale en la jugada 2, pero el plan es retirarla a a5 o d6, donde no estorba.</li><li><b>Un peón de flanco</b> puede ser una jugada de desarrollo: <span class=\"mv\">g3</span> para un fianchetto o <span class=\"mv\">h3</span> para impedir una clavada molesta en g4.</li></ul><h4>Ventaja de desarrollo: hay que usarla</h4><p>La ventaja de desarrollo es <b>temporal</b>. Si el rival termina de sacar sus piezas, desaparece. Por eso quien la tiene debe crear tensión y, normalmente, <b>abrir el juego</b>: cambiar peones centrales, abrir una columna contra el rey que no enrocó o sacrificar un peón para abrir líneas. Al revés, quien va atrasado debe <b>mantener el centro cerrado</b>, cambiar alguna pieza activa del rival y terminar su desarrollo antes de buscar nada más. Una regla práctica: con tres tempos de ventaja en una posición abierta, ya se puede pensar en un sacrificio.</p><h4>Errores típicos del aficionado</h4><ul><li>Hacer «jugadas de espera» (<span class=\"mv\">a3</span>, <span class=\"mv\">h3</span>) por miedo a una clavada que todavía no existe.</li><li>Desarrollar el alfil a una casilla donde un peón lo ataca enseguida (por ejemplo <span class=\"mv\">Bg5</span> cuando el rival ya jugó <span class=\"mv\">...h6</span> y puede seguir con <span class=\"mv\">...g5</span>).</li><li>Olvidar las torres: el desarrollo termina cuando las torres se conectan y ocupan las columnas centrales.</li><li>Cambiar una pieza bien desarrollada por una del rival que aún no ha salido: así se regala un tempo.</li></ul><h4>Lista de comprobación en la partida</h4><ol><li>¿Qué pieza todavía no ha salido y adónde quiere ir?</li><li>¿Puede el rival atacarla con ganancia de tiempo en esa casilla?</li><li>¿Mi jugada bloquea a otra pieza propia?</li><li>¿Cuántos tempos de ventaja o desventaja tengo? Si tengo ventaja: ¿cómo abro el juego? Si voy atrasado: ¿cómo lo mantengo cerrado?</li></ol>",
    "keyPoints": [
     "Una pieza está bien desarrollada si controla el centro, no estorba y no puede ser expulsada con tempo.",
     "La ventaja de desarrollo es temporal: quien la tiene debe abrir el juego."
    ],
    "positions": [
     {
      "fen": "r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/5N2/PP3PPP/RNBQK2R w KQkq - 1 7",
      "orientation": "white",
      "caption": "Contar tempos tras los cambios: en esta línea de la Italiana ambos bandos cambian piezas desarrolladas y la lucha se decide por quién termina antes.",
      "line": [
       "Bd2",
       "Bxd2+",
       "Nbxd2",
       "d5",
       "exd5",
       "Nxd5",
       "Qb3",
       "Nce7",
       "O-O",
       "O-O"
      ],
      "comments": [
       "Tapa el jaque desarrollando una pieza. (7.Nc3 es la alternativa más aguda.)",
       "Las negras cambian: un alfil desarrollado por otro alfil desarrollado, nadie gana tiempo.",
       "Recaptura desarrollando el caballo: las blancas tienen dos piezas menores en juego.",
       "¡El contragolpe central! Las negras atacan e4 antes de que las blancas consoliden su centro.",
       "Las blancas cambian para no quedar con un peón de e4 débil.",
       "El caballo ocupa el centro.",
       "La dama presiona d5 y b7 a la vez.",
       "El caballo defiende d5 y deja pasar al peón c; así ninguna pieza queda colgada.",
       "Rey a salvo.",
       "Ambos han completado el desarrollo; las blancas tienen un peón aislado en d4 a cambio de piezas activas. Ninguno ganó tiempos: la posición es equilibrada."
      ]
     },
     {
      "fen": "rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3",
      "orientation": "white",
      "caption": "La dama temprana en la Escandinava: las blancas ganan un tiempo, pero las negras eligen una casilla donde la dama no estorba.",
      "line": [
       "Nc3",
       "Qa5",
       "d4",
       "Nf6",
       "Nf3",
       "c6",
       "Bc4",
       "Bf5",
       "Bd2",
       "e6"
      ],
      "comments": [
       "Desarrollo con ganancia de tiempo: el caballo ataca a la dama.",
       "Desde a5 la dama clava el caballo de c3 y no bloquea a ninguna pieza negra.",
       "Ocupa el centro y abre la diagonal del alfil de c1.",
       "Desarrollo natural.",
       "Otra pieza al juego.",
       "Prepara una retirada para la dama (c7, d8) y controla d5.",
       "El alfil apunta a f7 y e6.",
       "El alfil sale antes de jugar ...e6, para no quedar encerrado.",
       "Rompe la clavada en c3 y amenaza Nd5 con ataque a la dama.",
       "Las negras completan una estructura sólida. Las blancas tienen un tiempo de ventaja, pero la posición negra no tiene debilidades."
      ]
     }
    ],
    "drills": [
     {
      "fen": "rnbqkbnr/pppp2pp/8/4p3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4",
      "caption": "Juegan blancas: las negras debilitaron su rey con ...f6 y además comieron el caballo. ¿Cómo lo aprovechas?",
      "line": [
       "Qh5+",
       "g6",
       "Qxe5+",
       "Qe7",
       "Qxh8"
      ],
      "comments": [
       "Jaque por la diagonal h5-e8, que quedó abierta al mover el peón f. El rey no tiene buenas casillas.",
       "Tapar con el peón es lo menos malo: 4...Ke7 5.Qxe5+ Kf7 6.Bc4+ deja al rey a merced del ataque.",
       "Doble ataque: jaque al rey y ataque a la torre de h8, que quedó sin defensa tras ...g6.",
       "La dama tapa el jaque; con 5...Ne7 la torre cae igual.",
       "Ganas la torre. Es el precio de dos jugadas de peón (...f6 y ...g6) que no desarrollaban nada."
      ]
     },
     {
      "fen": "r1bqkb1r/pppp1p1p/2n2np1/4p3/2B1P3/1Q6/PPPP1PPP/RNB1K1NR b KQkq - 3 5",
      "caption": "Juegan negras: la dama blanca ya hizo tres jugadas en la apertura. Castígala desarrollando con ganancia de tiempo.",
      "line": [
       "Nd4",
       "Qd3",
       "d5"
      ],
      "comments": [
       "El caballo salta al centro atacando a la dama y amenazando ...Nxc2+, con horquilla al rey y a la torre.",
       "La dama se retira y defiende c2 (6.Qa4 es parecido). Sigue siendo un blanco para las piezas negras.",
       "¡Golpe central! Abre la diagonal del alfil de c8 y ataca a la vez el alfil de c4 y el peón de e4. Las negras ganan material: cada una de sus jugadas desarrolló una pieza o ganó un tiempo."
      ]
     },
     {
      "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4",
      "caption": "Juegan negras: el caballo de g5 y el alfil de c4 atacan f7. ¿Qué respuesta defiende desarrollando y contraatacando?",
      "line": [
       "d5"
      ],
      "comments": [
       "Corta la diagonal del alfil hacia f7 y abre la del alfil de c8. Tras 5.exd5 lo habitual es 5...Na5, atacando al alfil. Defenderse con jugadas pasivas deja la iniciativa a las blancas, y 4...Nxe4 permite 5.Bxf7+."
      ]
     },
     {
      "fen": "r1bqk2r/ppp2ppp/2np4/8/2BP4/B1b2N2/P4PPP/R2Q1RK1 w kq - 0 11",
      "caption": "Juegan blancas: las negras ganaron material, pero su rey sigue en e8 y no pueden enrocar corto. Trae tu última pieza al ataque.",
      "line": [
       "Rc1",
       "Ba5",
       "Qa4"
      ],
      "comments": [
       "La torre de a1, que estaba atacada por el alfil, entra en juego con tempo: ataca al alfil de c3.",
       "El alfil se retira a a5, donde parece seguro; 11...Bxd4 12.Nxd4 deja a las negras sin su mejor pieza.",
       "Doble amenaza: la dama ataca el alfil de a5 y clava el caballo de c6 contra el rey. Además d4-d5 está en el aire. La ventaja de desarrollo se convierte en ventaja material."
      ]
     }
    ]
   },
   "ap-centro": {
    "html": "<h4>Por qué el centro decide la partida</h4><p>El centro no es importante por sí mismo, sino porque es <b>el cruce de caminos</b>: las piezas que lo controlan pueden ir a cualquier flanco en una o dos jugadas, mientras que las piezas del rival que no lo controlan tardan más en llegar. Por eso un ataque en el flanco solo prospera si el centro está cerrado o dominado. La regla clásica, que todos los manuales repiten, es: <b>contra un ataque de flanco, la mejor respuesta es una reacción en el centro</b>.</p><h4>El centro de peones: fuerza y debilidad</h4><p>Un par de peones en e4 y d4 quita casillas a las piezas rivales (d5, e5, f5, c5) y prepara avances que expulsan a sus piezas con ganancia de tiempo. Pero el centro tiene dos peligros:</p><ul><li><b>El avance prematuro</b>: si juegas <span class=\"mv\">e5</span> sin que el peón esté apoyado, se convierte en un blanco; si cierras el centro, el rival puede atacar la base de la cadena (d4) con <span class=\"mv\">...c5</span>.</li><li><b>La falta de apoyo de piezas</b>: un centro sin piezas detrás se derrumba con un par de rupturas. Por eso Tarrasch y los clásicos querían caballos en c3 y f3 y torres en d1 y e1 antes de avanzar.</li></ul><h4>Las rupturas: cómo se ataca un centro</h4><p>La ruptura es un avance de peón que <b>ofrece un cambio</b> para debilitar el centro rival. Las más comunes:</p><ul><li>Contra e4+d4: <span class=\"mv\">...c5</span> (ataca d4 por el costado) y <span class=\"mv\">...e5</span> o <span class=\"mv\">...f5</span> (ataca e4).</li><li>En la Francesa, tras <span class=\"mv\">e5</span> de las blancas, las negras atacan la cadena con <span class=\"mv\">...c5</span> y luego con <span class=\"mv\">...f6</span>.</li><li>Con blancas contra una cadena negra d5-e6, las rupturas típicas son <span class=\"mv\">c4</span> y <span class=\"mv\">e4</span>.</li></ul><p>Una ruptura se prepara: primero se ponen piezas que apoyen el avance y se calcula qué casillas quedan tras los cambios.</p><h4>Cuando el rival ignora el centro</h4><p>Muchas partidas de aficionados se deciden porque un bando responde a una amenaza central con una jugada de pieza en lugar de con un peón. En la Italiana, tras <span class=\"mv\">5.d4 exd4 6.e5</span>, la jugada correcta es <span class=\"mv\">6...d5!</span>, que golpea al alfil de c4 y gana espacio. Si en su lugar el caballo salta a e4 o g4, los peones blancos ganan tiempos y las piezas negras quedan sin casillas. La idea general: <b>cuando un peón ataca a tu pieza en el centro, busca primero un contragolpe de peón</b>, no solo una retirada.</p><h4>Preguntas para la partida</h4><ol><li>¿Quién controla más casillas centrales, contando peones y piezas?</li><li>¿El centro está abierto, cerrado o en tensión? Eso decide si conviene jugar en el centro o en un flanco.</li><li>¿Qué ruptura tiene el rival y cómo la impido o la hago inofensiva?</li><li>Si mantengo la tensión (no cambio), ¿quién gana con el cambio cuando ocurra?</li></ol>",
    "keyPoints": [
     "Contra un ataque de flanco, la mejor respuesta es una reacción en el centro.",
     "Cuando un peón ataca tu pieza en el centro, busca primero un contragolpe de peón."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
      "orientation": "black",
      "caption": "Atacar la base de la cadena: en la Francesa del Avance las negras presionan d4 con peones y piezas.",
      "line": [
       "c5",
       "c3",
       "Nc6",
       "Nf3",
       "Qb6",
       "Be2",
       "cxd4",
       "cxd4",
       "Nh6"
      ],
      "comments": [
       "La ruptura contra la base de la cadena blanca (d4).",
       "Las blancas apoyan d4 con otro peón.",
       "Segunda pieza contra d4.",
       "El caballo defiende d4.",
       "Tercera pieza contra d4, y además presión sobre b2.",
       "Las blancas preparan el enroque.",
       "Las negras cambian para abrir la columna c.",
       "Las blancas mantienen el peón de d4, pero ahora es un objetivo fijo.",
       "El caballo va a f5, desde donde atacará d4 por cuarta vez. Así se juega contra un centro avanzado: se ataca su base."
      ]
     },
     {
      "fen": "r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 6",
      "orientation": "white",
      "caption": "La respuesta correcta al avance central: contra 6.e5, el contragolpe 6...d5.",
      "line": [
       "e5",
       "d5",
       "Bb5",
       "Ne4",
       "cxd4",
       "Bb6",
       "Nc3",
       "O-O"
      ],
      "comments": [
       "El peón ataca al caballo de f6 ganando espacio.",
       "¡Contragolpe central! El peón ataca al alfil de c4 y abre el alfil de c8: es la respuesta que exige el principio.",
       "El alfil se aparta y clava el caballo de c6.",
       "Ahora el caballo tiene una casilla central sólida, apoyada por el peón de d5.",
       "Las blancas recuperan el peón.",
       "El alfil se retira manteniendo la presión sobre d4.",
       "Las blancas desafían al caballo de e4.",
       "Las negras enrocan con una posición equilibrada: el centro blanco está bloqueado y las piezas negras son activas."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1bqk2r/pppp1ppp/2n5/2b1P3/2Bpn3/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 7",
      "caption": "Juegan blancas: las negras respondieron al avance e5 con 6...Ne4 en lugar del contragolpe 6...d5. Demuestra por qué el caballo está mal ahí.",
      "line": [
       "Bd5",
       "Nxf2",
       "Kxf2"
      ],
      "comments": [
       "El alfil ataca al caballo de e4 y apunta a c6. El caballo no tiene buenas retiradas: d6 y f6 están controladas por el peón de e5.",
       "Las negras intentan sacar algo con un sacrificio. Si 7...f5, 8.cxd4 y las negras siguen en problemas.",
       "Capturas el caballo: tras 8...dxc3+ 9.Kg3 el rey blanco está seguro y las blancas tienen pieza por peones y mejor posición."
      ]
     },
     {
      "fen": "r1bqk1nr/pppnbppp/3p4/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 3 5",
      "caption": "Juegan blancas: en la Philidor las negras desarrollaron el alfil a e7 manteniendo la tensión en e5. ¿Cómo resuelves la tensión a tu favor?",
      "line": [
       "dxe5",
       "Nb6",
       "Bb3"
      ],
      "comments": [
       "Cambias en el momento justo. Si 5...dxe5?, 6.Qd5 ataca f7 a la vez que el peón de e5 y gana material.",
       "La mejor defensa según el motor: el caballo ataca al alfil de c4. 5...Nxe5 6.Nxe5 dxe5 deja f7 y e5 débiles.",
       "El alfil se retira manteniendo la diagonal hacia f7. Si 6...dxe5 7.Qxd8+ Bxd8 8.Nxe5, las blancas ganan un peón con mejor posición."
      ]
     },
     {
      "fen": "rnbqkbnr/pp3ppp/8/3p4/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6",
      "caption": "Juegan blancas: las negras avanzaron ...c4 y quitaron toda la presión sobre d4. ¿Qué ruptura central castiga esa decisión?",
      "line": [
       "e4",
       "Bb4",
       "exd5"
      ],
      "comments": [
       "¡La ruptura central! Ataca el peón de d5, que ya no puede ser apoyado por ...c5, y abre el juego cuando el rey negro aún no ha enrocado.",
       "Las negras clavan el caballo de c3 para defender d5 de forma indirecta. Si 6...dxe4, el peón de c4 queda sin apoyo.",
       "Capturas: tras 7...Qxd5 8.Be2 las blancas recuperarán el peón de c4 con ventaja de desarrollo y el rey negro en el centro."
      ]
     },
     {
      "fen": "r1bqkb1r/pppp1ppp/2n2n2/4P3/8/4Q3/PPP2PPP/RNB1KBNR b KQkq - 0 5",
      "caption": "Juegan negras: las blancas sacaron la dama pronto y ahora avanzan su peón a e5 sin apoyo de otros peones. Atácalo.",
      "line": [
       "Ng4",
       "Qe2",
       "d6"
      ],
      "comments": [
       "El caballo esquiva el ataque y amenaza a la vez el peón de e5 y a la dama de e3.",
       "La dama se aparta y defiende e5 de forma indirecta.",
       "Abres el centro para sacar el alfil de c8 y atacar otra vez e5. El peón adelantado es un blanco y las negras quedan mejor."
      ]
     }
    ]
   },
   "ap-enroque": {
    "html": "<h4>Cuándo enrocar (y cuándo no)</h4><p>La pregunta correcta no es «¿ya enroqué?», sino «¿puede abrirse el centro pronto?». Si el centro está abierto o hay cambios de peones centrales en el aire, el rey en e1/e8 corre peligro inmediato y el enroque es urgente. Si el centro está bloqueado (cadenas de peones trabadas), el rey puede esperar unas jugadas y a veces conviene <b>retrasar el enroque</b> para no revelar en qué flanco estará y no darle al rival un blanco para su ataque de peones.</p><h4>Cómo se castiga al rey que no enrocó</h4><p>El patrón se repite siempre: el rey sin enrocar está en <b>la columna e</b>, que es la primera en abrirse cuando se cambian los peones centrales. El atacante sigue estos pasos:</p><ol><li><b>Abrir la columna e</b> (o la d), aunque cueste un peón.</li><li><b>Poner una torre en esa columna</b> lo antes posible: el enroque propio es la manera más rápida de traerla (<span class=\"mv\">O-O</span> y <span class=\"mv\">Re1</span>).</li><li><b>Clavar</b> la pieza que tapa el jaque, muchas veces un caballo o un alfil en e4/e5 o e6/e7.</li><li>Impedir el enroque rival: un alfil en a3 o en la diagonal a2-g8 que controla f1/f8 o g1/g8.</li></ol><p>Un detalle que suelen olvidar los aficionados: <b>no se puede enrocar si el rey está en jaque, si pasa por una casilla atacada o si llega a una casilla atacada</b>. Por eso un alfil que controla f8 o un jaque oportuno pueden dejar el rey en el centro para siempre.</p><h4>Después del enroque: no desarmar el refugio</h4><ul><li>Los peones f, g, h son el techo del rey. Cada avance crea casillas débiles que el rival puede ocupar.</li><li><b>h3/h6</b> es útil para dar «luft» (una salida contra el mate de pasillo) o para impedir <span class=\"mv\">Bg4</span>, pero en posiciones de ataque da un punto de contacto para <span class=\"mv\">...g5-g4</span>.</li><li>El caballo de f3/f6 es el mejor defensor del enroque: no lo cambies a la ligera.</li><li>Si el rival trae piezas cerca de tu rey, defiende con piezas, no con peones.</li></ul><h4>Enroque largo: matices</h4><p>El enroque largo deja el peón de a2 sin protección y el rey en c1 está en una diagonal (h6-c1) y una columna (c) que se abren fácilmente. Por eso es frecuente completar el refugio con <span class=\"mv\">Kb1</span>, que también protege a2. A cambio, la torre llega a d1 en una sola jugada, algo muy valioso cuando la columna d está abierta o semiabierta.</p><h4>Lista de comprobación</h4><ol><li>¿Hay peones centrales que se puedan cambiar en las próximas jugadas? Si sí, enroca ya.</li><li>¿Mi rival tiene una pieza que controla f1/g1 (o f8/g8) para impedir mi enroque?</li><li>¿Hacia qué flanco va el juego del rival? No enroques justo donde él tiene sus peones listos para avanzar.</li><li>Si el rey rival sigue en el centro: ¿qué columna puedo abrir y con qué torre la ocupo?</li></ol>",
    "keyPoints": [
     "La pregunta clave no es «¿enroqué?», sino «¿puede abrirse el centro pronto?».",
     "Un alfil que controla f1/f8 puede dejar al rey rival en el centro para siempre."
    ],
    "positions": [
     {
      "fen": "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 6",
      "orientation": "white",
      "caption": "La columna e contra el rey sin enrocar: las blancas abren líneas y las negras deben devolver material para poner su rey a salvo.",
      "line": [
       "Re1",
       "d5",
       "Bxd5",
       "Qxd5",
       "Nc3",
       "Qa5",
       "Nxe4",
       "Be6",
       "Neg5",
       "O-O-O"
      ],
      "comments": [
       "La torre llega a la columna e y clava el caballo de e4.",
       "Las negras protegen el caballo y abren su alfil.",
       "Sacrificio temporal: el alfil elimina el defensor del caballo.",
       "La dama recaptura.",
       "Otra pieza ataca a la dama y al caballo clavado.",
       "La dama se aparta, pero sigue defendiendo e4 en diagonal.",
       "Las blancas recuperan la pieza.",
       "Las negras tapan la columna e con el alfil.",
       "El caballo ataca al alfil de e6, la pieza que protege al rey.",
       "Las negras enrocan largo: el rey sale de la columna e justo a tiempo. La posición queda dinámica y equilibrada."
      ]
     },
     {
      "fen": "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
      "orientation": "white",
      "caption": "Enroques opuestos: en el Ataque Yugoslavo cada bando ataca el rey del otro y el tiempo vale más que el material.",
      "line": [
       "Be3",
       "Bg7",
       "f3",
       "O-O",
       "Qd2",
       "Nc6",
       "O-O-O",
       "d5"
      ],
      "comments": [
       "El alfil se prepara para cambiarse en h6 por el defensor del enroque negro.",
       "Fianchetto: el alfil de g7 es la pieza clave de la defensa negra.",
       "Protege e4 y prepara g4 y h4 contra el rey negro.",
       "Las negras enrocan corto.",
       "La dama prepara Bh6 y el enroque largo.",
       "Desarrollo.",
       "Enroques opuestos: los peones blancos de g y h pueden avanzar sin debilitar al propio rey.",
       "Las negras responden al ataque de flanco con una reacción en el centro, como manda el principio clásico. La posición es muy aguda."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1bqk2r/pppp1ppp/2n5/8/2BP4/2b2N2/P4PPP/R1BQ1RK1 w kq - 0 10",
      "caption": "Juegan blancas: las negras ganaron peones y amenazan la torre de a1, pero su rey sigue en e8. ¿Cómo lo dejas atrapado en el centro?",
      "line": [
       "Ba3",
       "d5",
       "Bb5",
       "Bxa1",
       "Re1+"
      ],
      "comments": [
       "El alfil controla f8: las negras ya no pueden enrocar corto, porque el rey pasaría por una casilla atacada. La torre de a1 queda en el aire, pero el rey negro vale más.",
       "La mejor defensa: abre la diagonal del alfil de c8 y cierra la del alfil de c4.",
       "Clava el caballo de c6 contra el rey y prepara Re1+.",
       "Las negras aceptan la torre.",
       "Jaque por la columna e abierta: el rey no puede enrocar ni esconderse y las blancas tienen todo listo para el ataque."
      ]
     },
     {
      "fen": "r1bqkb1r/pp1npppp/2p2n2/8/3PN3/8/PPP1QPPP/R1B1KBNR w KQkq - 3 6",
      "caption": "Juegan blancas: el rey negro aún no enrocó, la dama blanca está en la columna e y las piezas negras le quitan casillas a su propio rey.",
      "line": [
       "Nd6#"
      ],
      "comments": [
       "¡Mate! El peón de e7 no puede capturar en d6 porque está clavado por la dama de e2, y el rey no tiene casillas: d7 y f7 están ocupadas por sus propias piezas y peones."
      ]
     },
     {
      "fen": "rnbqk1nr/pppp1ppp/8/2b1P3/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 3",
      "caption": "Juegan negras: las blancas movieron el peón f y capturaron en e5. ¿Qué diagonal quedó abierta hacia su rey?",
      "line": [
       "Qh4+",
       "g3",
       "Qxe4+"
      ],
      "comments": [
       "Jaque por la diagonal h4-e1, que se abrió al mover el peón f.",
       "La única defensa: 4.Ke2 permitiría el mate con 4...Qxe4#.",
       "Doble ataque: jaque al rey y ataque a la torre de h1. Tras 5.Qe2 Qxh1 las negras ganan la torre."
      ]
     },
     {
      "fen": "r2q1rk1/pppbbppp/2np1n2/1B2p3/3PP3/2N2N2/PPP2PPP/R1BQR1K1 w - - 7 8",
      "caption": "Juegan blancas: las negras enrocaron sin resolver la tensión en e5. ¿Cómo lo castigas?",
      "line": [
       "Bxc6",
       "Bxc6",
       "dxe5",
       "dxe5",
       "Qxd8"
      ],
      "comments": [
       "Eliminas el defensor de e5. Aquí el cambio de alfil por caballo está justificado porque gana material.",
       "Recapturar con el alfil es lo natural; 8...bxc6 deja la estructura dañada.",
       "Abres la columna d y atacas otra vez e5.",
       "Las negras recapturan (9...Ng4 era la alternativa, también con desventaja).",
       "Cambias damas y, tras 10...Raxd8 11.Nxe5, ganas un peón limpio: enrocar no resuelve los problemas del centro."
      ]
     }
    ]
   },
   "ap-errores": {
    "html": "<h4>Por qué se repiten los mismos errores</h4><p>Casi todos los desastres de la apertura tienen una raíz común: <b>jugar sin mirar la jugada del rival</b>. El aficionado sigue un plan propio («saco el caballo, saco el alfil») y no se pregunta qué ha cambiado con la última jugada contraria. El antídoto es un hábito, no un conocimiento: antes de cada jugada, revisar los jaques, capturas y amenazas del rival.</p><h4>La codicia material</h4><p>Ganar un peón en la apertura es bueno <b>si no cuesta tiempo ni coordinación</b>. Los casos peligrosos son tres:</p><ul><li><b>Capturar con la dama lejos del rey</b>: la dama en b2/b7 o en a1/a8 queda fuera de juego, y el rival gana tiempos atacándola.</li><li><b>Defender un peón ganado con peones de flanco</b>: en el Gambito de Dama Aceptado, intentar conservar el peón de c4 con <span class=\"mv\">...b5</span> debilita la gran diagonal y la torre de a8. Lo correcto es devolverlo y desarrollarse.</li><li><b>Tomar un peón que abre una línea contra tu propio rey</b>, por ejemplo la columna f o la diagonal a2-g8.</li></ul><h4>Las trampas que nacen de un principio violado</h4><p>Muchas trampas famosas son simplemente el castigo de una regla rota:</p><ul><li><b>Mover el caballo dos veces</b> para ir a d4 o d5 en la jugada 3 deja el centro sin defensa; si el rival es codicioso y come en e5, puede caer en un contragolpe de dama contra g2 y f7.</li><li><b>Clavadas y peones colgados</b>: en la Philidor, tras <span class=\"mv\">...Nd7</span> y <span class=\"mv\">...Be7</span> en el orden equivocado, el punto f7 y el peón de e5 quedan sin defensa suficiente.</li><li><b>Copiar las jugadas del rival</b>: en posiciones simétricas, quien juega primero suele tener una amenaza que el otro ignora.</li></ul><h4>Cómo reaccionar cuando el rival comete el error</h4><p>Castigar un error exige <b>concreción</b>: no basta con «tener mejor posición». Si la dama rival salió pronto, desarrolla piezas que la ataquen; si el rey rival se quedó en el centro, abre líneas; si el rival se llevó un peón con la dama, busca jugadas con tempo que la dejen encerrada. Y si caes tú en una trampa, no te rindas mentalmente: muchas veces queda una defensa que limita el daño a un peón.</p><h4>Rutina de seguridad (antes de cada jugada)</h4><ol><li>¿Qué amenaza la última jugada del rival? Mira jaques, capturas y ataques a piezas sin defensa.</li><li>¿Qué piezas mías están sin protección? Las piezas «colgadas» son la causa número uno de derrotas.</li><li>¿El punto f7 (o f2) está suficientemente defendido?</li><li>Si voy a ganar material: ¿cuántos tempos me cuesta y qué hace el rival mientras tanto?</li></ol><h4>Un caso típico: la columna e</h4><p>En la Petrov, tras <span class=\"mv\">3.Nxe5 Nxe4?</span>, la jugada <span class=\"mv\">4.Qe2</span> crea la amenaza de un jaque descubierto en la columna e. Copiar las jugadas del rival con <span class=\"mv\">4...Nf6??</span> pierde la dama tras <span class=\"mv\">5.Nc6+</span>. La regla general: si la dama rival está en la misma columna que tu rey, cualquier pieza rival que se mueva en esa columna puede dar jaque descubierto.</p>",
    "keyPoints": [
     "Antes de cada jugada, revisa jaques, capturas y amenazas del rival.",
     "Una dama en la columna e frente a un rey sin enrocar amenaza descubiertos."
    ],
    "positions": [
     {
      "fen": "r1b1kbnr/ppppqppp/2n5/4P3/8/5N2/PPP1PPPP/RNBQKB1R w KQkq - 3 4",
      "orientation": "white",
      "caption": "Desarrollar sin mirar la amenaza: en el Gambito Englund, las blancas juegan jugadas naturales y caen en una trampa.",
      "line": [
       "Bf4",
       "Qb4+",
       "Bd2",
       "Qxb2",
       "Bc3",
       "Bb4",
       "Qd2",
       "Bxc3",
       "Qxc3",
       "Qc1#"
      ],
      "comments": [
       "Defiende el peón de e5 con una jugada natural, pero deja el jaque en b4.",
       "Jaque doble: al rey y al peón de b2.",
       "Tapar con el alfil parece lo más sencillo.",
       "La dama come b2 y ataca la torre de a1.",
       "Error: el alfil ataca a la dama, pero se coloca en una casilla donde puede ser clavado.",
       "¡Clava el alfil! La dama de b2 sigue atacando a1.",
       "La dama protege c3 pero abandona d1.",
       "El alfil come y desvía a la dama.",
       "Obligado, pero ahora c1 no tiene defensa.",
       "Mate: la dama da jaque en c1 y el rey no tiene casillas. Dos jugadas «naturales» sin revisar las amenazas costaron la partida."
      ]
     },
     {
      "fen": "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
      "orientation": "white",
      "caption": "Cómo se trata el peón del Gambito de Dama Aceptado: las negras no intentan conservarlo y se desarrollan.",
      "line": [
       "e3",
       "Nf6",
       "Bxc4",
       "e6",
       "Nf3",
       "c5",
       "O-O",
       "a6"
      ],
      "comments": [
       "Las blancas abren el alfil para recuperar el peón.",
       "Las negras no defienden c4: desarrollan.",
       "Las blancas recuperan el peón.",
       "Abre el alfil de f8.",
       "Desarrollo.",
       "Ruptura contra el centro blanco.",
       "Rey a salvo.",
       "Prepara ...b5 con ganancia de tiempo sobre el alfil. Ahora sí ...b5 tiene sentido, porque el peón ya no defiende material sino que gana espacio. Posición equilibrada."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1bqkbnr/pppp1ppp/8/4N3/2BnP3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4",
      "caption": "Juegan negras: las blancas comieron en e5 con el caballo, pero dejaron g2 sin vigilancia. Castiga la codicia.",
      "line": [
       "Qg5",
       "Bxf7+",
       "Kd8",
       "O-O",
       "Qxe5"
      ],
      "comments": [
       "La dama ataca a la vez el caballo de e5 y el peón de g2. Si 5.Nxf7?, 5...Qxg2 6.Rf1 Qxe4+ 7.Be2 Nf3# es un mate famoso.",
       "La mejor defensa: las blancas devuelven material con jaque para poder enrocar.",
       "El rey va a d8; en e7 quedaría más expuesto.",
       "El rey blanco se pone a salvo y la amenaza ...Qxg2 desaparece.",
       "Recuperas el caballo: las negras tienen pieza por dos peones y quedan algo mejor."
      ]
     },
     {
      "fen": "rnbqkbnr/p3pppp/2p5/1p6/P1pP4/4P3/1P3PPP/RNBQKBNR w KQkq - 0 5",
      "caption": "Juegan blancas: las negras se aferran al peón de c4 con ...b5 y ...c6. ¿Cómo castigas esa codicia?",
      "line": [
       "axb5",
       "cxb5",
       "Qf3"
      ],
      "comments": [
       "Atacas la cadena de peones por su base y abres la columna a.",
       "Recapturar parece natural, pero deja la gran diagonal sin defensa. Lo mejor era 5...e6, aceptando un peón menos.",
       "La dama ataca la torre de a8 por la gran diagonal. Si 6...Nc6, 7.Qxc6+, y si 6...Bb7, 7.Qxb7: las blancas ganan material decisivo."
      ]
     },
     {
      "fen": "rnbqkb1r/pppp1ppp/5n2/4N3/8/8/PPPPQPPP/RNB1KB1R w KQkq - 2 5",
      "caption": "Juegan blancas: en la Petrov las negras copiaron las jugadas y dejaron su rey y su dama en la columna e.",
      "line": [
       "Nc6+",
       "Be7",
       "Nxd8"
      ],
      "comments": [
       "Jaque descubierto de la dama de e2, y el caballo ataca a la dama de d8.",
       "Tapar con el alfil (o con la dama) no salva nada.",
       "Ganas la dama por un caballo. El error fue 4...Nf6?: había que jugar 4...Qe7 para neutralizar la columna e."
      ]
     },
     {
      "fen": "r1bqkb1r/pppn1ppp/3p1n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 3 5",
      "caption": "Juegan blancas: en la Philidor las negras desarrollaron el caballo a f6 sin cuidar f7. Gana material.",
      "line": [
       "dxe5",
       "Nxe5",
       "Nxe5",
       "dxe5",
       "Bxf7+"
      ],
      "comments": [
       "Cambias en e5 para abrir la columna d y dejar expuesto el punto f7.",
       "La recaptura más natural.",
       "Cambias caballos: ahora la dama negra de d8 queda frente a tu dama en la columna d.",
       "Recapturar es obligado.",
       "¡El alfil come en f7 con jaque! Si 7...Kxf7, 8.Qxd8 gana la dama; tras 7...Ke7 8.Qxd8+ Kxd8 las blancas tienen un peón de más y el rey negro sin enroque."
      ]
     }
    ]
   },
   "ap-repertorio": {
    "html": "<h4>Un repertorio se organiza por estructuras</h4><p>La manera más eficaz de estudiar aperturas es agrupar las líneas por <b>la estructura de peones que producen</b>. Si con negras juegas el Gambito de Dama Declinado contra 1.d4, aprenderás la estructura de Carlsbad (peones d5-c6 contra d4-e3, con la columna c semiabierta para las blancas); esa estructura aparece también en la Caro-Kann variante del Cambio y en algunas líneas de la Eslava. Cada plan que aprendas en una apertura te sirve en las demás. Por eso un buen repertorio es <b>coherente</b>: aperturas que llevan a estructuras parecidas.</p><h4>Las trampas forman parte del repertorio</h4><p>Conocer las trampas típicas de tus aperturas no es un truco barato: muchas de ellas explican <b>por qué</b> una jugada es buena o mala. En el Gambito de Dama Declinado, la llamada «trampa del elefante» (<span class=\"mv\">Nxd5?</span> respondido por <span class=\"mv\">...Nxd5!</span>) enseña que el caballo de f6 parece clavado pero no lo está, porque <span class=\"mv\">...Bb4+</span> recupera la dama. En la Española, la «trampa del arca de Noé» muestra que el alfil de b3 puede quedar encerrado por los peones negros si las blancas capturan en d4 con la dama. Estas ideas reaparecen en posiciones parecidas una y otra vez.</p><h4>Cómo preparar un archivo de repertorio</h4><ol><li>Escribe la línea principal hasta la jugada 8-12 y <b>una frase</b> con el plan de cada bando al final.</li><li>Añade las desviaciones que realmente encuentras en tus partidas (consulta tu historial: tus rivales juegan siempre lo mismo).</li><li>Anota 2-3 posiciones clave por apertura con la jugada típica (una ruptura, una maniobra, una trampa) y repásalas como ejercicios.</li><li>Asocia a cada apertura un final típico: por ejemplo, el final de alfil bueno contra caballo de la Francesa.</li></ol><h4>Errores comunes al construir un repertorio</h4><ul><li><b>Cambiar de apertura después de cada derrota</b>: el problema suele estar en el medio juego, no en la apertura.</li><li><b>Memorizar sin comprender</b>: si el rival se desvía en la jugada 6, quien memorizó no sabe qué hacer y quien entendió la estructura sí.</li><li><b>Elegir aperturas que no encajan con el estilo</b>: un jugador al que no le gusta defenderse sufrirá con gambitos aceptados con negras.</li><li><b>Ignorar las respuestas raras</b>: a nivel de club, líneas como la Smith-Morra o el Gambito Budapest aparecen a menudo y conviene tener una respuesta preparada.</li></ul><h4>Cómo revisar tus partidas de apertura</h4><p>Después de cada partida, localiza la <b>primera jugada en la que dudaste</b>. Ese es el punto donde termina tu conocimiento real. Busca qué recomienda la teoría o el motor, escribe una frase que explique la idea (no solo la jugada) y añádela al archivo. En pocos meses tu repertorio estará hecho a la medida de tus rivales.</p><p>Una última recomendación: juega tus aperturas en partidas rápidas antes de usarlas en torneos. Así descubrirás qué posiciones te resultan cómodas y cuáles te cuestan, y podrás ajustar el repertorio antes de que importe el resultado.</p>",
    "keyPoints": [
     "Organiza el repertorio por estructuras de peones, no por listas de jugadas.",
     "Las trampas típicas de tus aperturas explican por qué cada jugada es buena o mala."
    ],
    "positions": [
     {
      "fen": "rnbqkb1r/ppp2ppp/5n2/3p4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5",
      "orientation": "white",
      "caption": "La estructura de Carlsbad: las blancas preparan el ataque de minorías (b4-b5) contra el peón de c6.",
      "line": [
       "Bg5",
       "c6",
       "e3",
       "Be7",
       "Bd3",
       "Nbd7",
       "Qc2",
       "O-O",
       "Nf3",
       "Re8"
      ],
      "comments": [
       "El alfil sale antes de jugar e3.",
       "Protege d5 y forma la cadena c6-d5.",
       "Abre el alfil de f1.",
       "Rompe la clavada.",
       "El alfil apunta a h7.",
       "El caballo irá a f8 para defender el enroque.",
       "La dama controla la diagonal b1-h7 y la columna c.",
       "Rey a salvo.",
       "Desarrollo.",
       "La torre ocupa la columna e. El plan típico de las blancas será Rab1, b4 y b5 para debilitar c6; el de las negras, ...Nf8 y ...Ne4 o un ataque en el flanco de rey."
      ]
     },
     {
      "fen": "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      "orientation": "white",
      "caption": "La misma estructura con colores invertidos: la Caro-Kann variante del Cambio. Quien estudió Carlsbad ya conoce los planes.",
      "line": [
       "d4",
       "d5",
       "exd5",
       "cxd5",
       "Bd3",
       "Nc6",
       "c3",
       "Nf6",
       "Bf4",
       "Bg4"
      ],
      "comments": [
       "Ocupa el centro.",
       "Desafía a e4.",
       "Las blancas cambian.",
       "Recaptura con el peón c: la estructura es una Carlsbad invertida.",
       "El alfil apunta a h7.",
       "Desarrollo contra d4.",
       "Apoya d4 con un peón, como en la Carlsbad.",
       "Desarrollo.",
       "El alfil sale antes de jugar e3, como en la estructura invertida.",
       "Las negras sacan su alfil antes de jugar ...e6. Ahora son las negras quienes pueden pensar en un ataque de minorías con ...b5-b4."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6",
      "caption": "Juegan negras (Gambito de Dama Declinado): las blancas creen que el caballo de f6 está clavado y comieron en d5.",
      "line": [
       "Nxd5",
       "Bxd8",
       "Bb4+"
      ],
      "comments": [
       "¡El caballo no estaba realmente clavado! Capturas el caballo aunque tu dama quede atacada.",
       "Las blancas se llevan la dama; cualquier otra jugada deja una pieza de menos.",
       "Jaque: la dama blanca debe tapar con 8.Qd2 y tras 8...Bxd2+ 9.Kxd2 Kxd8 las negras quedan con una pieza de ventaja. Es la «trampa del elefante»."
      ]
     },
     {
      "fen": "r1b1kb1r/ppqp1ppp/2n1p3/8/2B1P1n1/2N2N1P/PP2QPP1/R1B2RK1 b kq - 0 9",
      "caption": "Juegan negras (Gambito Smith-Morra): las blancas atacan el caballo de g4 con h3. ¿Hay algo mejor que retirarlo?",
      "line": [
       "Nd4",
       "hxg4",
       "Nxe2+"
      ],
      "comments": [
       "¡La trampa siberiana! El caballo ataca a la dama y amenaza ...Qh2#, porque la dama de c7 y el caballo de g4 apuntan a h2.",
       "Las blancas no pueden parar el mate y salvar la dama a la vez: si 10.Nxd4, 10...Qh2#.",
       "Ganas la dama por un caballo: tras 11.Nxe2 las negras tienen una ventaja material decisiva."
      ]
     },
     {
      "fen": "r1bqkbnr/2p2ppp/p2p4/1p6/3QP3/1B6/PPP2PPP/RNB1K2R b KQkq - 0 8",
      "caption": "Juegan negras (Española): las blancas recuperaron el peón con la dama. ¿Cómo atrapas a su alfil?",
      "line": [
       "c5",
       "Qc3",
       "c4"
      ],
      "comments": [
       "Atacas a la dama ganando tiempo y preparas ...c4.",
       "La dama se retira; 9.Qd5 Be6 10.Qc6+ Bd7 11.Qd5 c4 lleva a lo mismo.",
       "El alfil de b3 queda encerrado por los peones: es la «trampa del arca de Noé». Las negras ganan una pieza."
      ]
     },
     {
      "fen": "r4rk1/2pqbppp/p1n1b3/1p1pP3/3Nn3/1BP5/PP3PPP/RNBQR1K1 w - - 5 12",
      "caption": "Juegan blancas (Española abierta): las negras jugaron 11...Qd7, una jugada natural que es un error. Encuentra la combinación.",
      "line": [
       "Nxe6",
       "fxe6",
       "Rxe4"
      ],
      "comments": [
       "Cambias el alfil de e6. Así la torre de e1 y el alfil de b3 quedan listos para actuar.",
       "Recapturar con el peón es lo más natural; 12...Qxe6 lleva a una posición igual de mala.",
       "¡El caballo cae! Si 13...dxe4, 14.Qxd7 gana la dama, porque el peón de d5 era lo único que tapaba la columna d. Es la trampa de Tarrasch: las blancas ganan una pieza."
      ]
     }
    ]
   },
   "p-inmortal": {
    "html": "<h4>La apertura: un gambito sobre otro gambito</h4><p>Tras <span class=\"mv\">1.e4 e5 2.f4 exf4</span> Anderssen eligió el Gambito de Alfil (<span class=\"mv\">3.Bc4</span>), que permite el jaque <span class=\"mv\">3...Qh4+</span> y obliga al rey blanco a ir a f1. Kieseritzky respondió con otro gambito, <span class=\"mv\">4...b5</span> (el contragambito Bryan), para desviar el alfil de la diagonal a2-g8. En el ajedrez de 1851 nadie temía perder el enroque: se pensaba que la actividad de las piezas compensaba de sobra un rey desplazado, siempre que el rival no pudiera abrir líneas contra él.</p><h4>La dama que se mueve demasiado</h4><p>La clave estratégica de la partida es muy instructiva: cuenten las jugadas de la dama negra. Va a h4, h6, g5, g6, g5, f6, b2 y a1: <b>ocho jugadas</b> de una sola pieza en veintidós movimientos. Cada vez que Anderssen ataca una pieza negra con un peón (<span class=\"mv\">g4</span> contra el caballo, <span class=\"mv\">h4</span> y <span class=\"mv\">h5</span> contra la dama), gana un tiempo para su desarrollo. Las jugadas <span class=\"mv\">12.h4</span> y <span class=\"mv\">13.h5</span> son un ejemplo de manual: peones que avanzan con amenaza y quitan casillas a la dama hasta que <span class=\"mv\">14.Qf3</span> amenaza encerrarla con <span class=\"mv\">Bxf4</span>. Mientras tanto, el caballo negro de f6 tuvo que retroceder a g8, su casilla de origen.</p><h4>El momento crítico visto con ojos modernos</h4><p>El sacrificio de las dos torres con <span class=\"mv\">18.Bd6</span> es célebre, pero el análisis con motor muestra que no era forzado: si tras <span class=\"mv\">18...Qxa1+ 19.Ke2</span> las negras hubieran jugado <span class=\"mv\">19...Qb2!</span>, vigilando la casilla c2 y la diagonal hacia g7, la posición habría quedado aproximadamente equilibrada. En cambio, <span class=\"mv\">18...Bxg1</span> se llevó una torre pero apartó al alfil de la defensa del rey. Que la combinación tuviera una defensa no le quita mérito; muestra algo que vale para cualquier partida: <b>contra un ataque peligroso, la defensa más fuerte suele ser la que trae piezas al rey o le corta líneas al atacante, no la que gana más material</b>.</p><h4>Cómo usar esta partida en tu entrenamiento</h4><ul><li>Repite el método de Anderssen en tus partidas: cuando la dama rival salga pronto, busca jugadas de desarrollo que la ataquen.</li><li>Antes de capturar material con la dama, pregúntate qué casillas deja de defender (aquí, g7 y la diagonal a1-h8 quedaron indefensas).</li><li>Observa la posición final: tres piezas menores dan mate a un rey rodeado de piezas negras que no se movieron en toda la partida.</li></ul><h4>Preguntas para analizar la partida</h4><ol><li>¿Por qué <span class=\"mv\">9.Nf5</span> fue tan fuerte, si el caballo no ataca a la dama? (Piensa en g7 y en las casillas de la dama negra.)</li><li>Tras <span class=\"mv\">19.e5</span>, ¿qué diagonal quedó cortada para la dama negra y por qué eso permite <span class=\"mv\">21.Nxg7+</span>?</li><li>¿Qué piezas negras no participaron nunca en la partida? Cuéntalas: esa es la verdadera diferencia de material en el momento del mate.</li></ol>",
    "keyPoints": [
     "La dama negra hizo ocho jugadas: cada ataque blanco contra ella fue un tiempo ganado.",
     "Según el motor, 18...Qxa1+ 19.Ke2 Qb2 habría resistido."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "orientation": "white",
      "caption": "La apertura de la Inmortal: Gambito de Alfil y contragambito Bryan.",
      "line": [
       "e4",
       "e5",
       "f4",
       "exf4",
       "Bc4",
       "Qh4+",
       "Kf1",
       "b5",
       "Bxb5",
       "Nf6"
      ],
      "comments": [
       "Peón al centro.",
       "Respuesta simétrica.",
       "Gambito de Rey: un peón a cambio del centro y de líneas abiertas.",
       "Las negras aceptan.",
       "Gambito de Alfil: el alfil apunta a f7.",
       "Jaque: el rey blanco pierde el enroque.",
       "Única: el rey va a f1.",
       "Contragambito Bryan: un peón para desviar el alfil de la diagonal a2-g8.",
       "Las blancas aceptan.",
       "Desarrollo con ataque al peón de e4. La partida ya es una lucha de tiempos."
      ]
     },
     {
      "fen": "rnb1kbnr/p2p1ppp/8/1p3NqP/4PpP1/3P1Q2/PPP5/RNB2KR1 w kq - 3 15",
      "orientation": "white",
      "caption": "Preparar el ataque: antes del sacrificio, Anderssen activa todas sus piezas.",
      "line": [
       "Bxf4",
       "Qf6",
       "Nc3",
       "Bc5",
       "Nd5",
       "Qxb2"
      ],
      "comments": [
       "El alfil recupera el peón y apunta a d6 y c7.",
       "La dama sale de la amenaza y apunta a b2 por la gran diagonal.",
       "Desarrollo: el caballo se dirige a d5.",
       "Las negras desarrollan el alfil.",
       "Los dos caballos, en d5 y f5, dominan el centro y rodean al rey negro.",
       "La dama negra se va a buscar material lejos de su rey: es el momento que precede a la combinación."
      ]
     }
    ],
    "drills": [
     {
      "fen": "rnb1kb1r/p2p1ppp/5n2/1p3Nq1/4PpP1/3P4/PPP4P/RNBQ1KR1 w kq - 0 12",
      "caption": "Juegan blancas (jugada 12): la dama negra está en g5. ¿Cómo la persiguió Anderssen ganando tiempos?",
      "line": [
       "h4",
       "Qg6",
       "h5",
       "Qg5",
       "Qf3"
      ],
      "comments": [
       "El peón ataca a la dama con ganancia de tiempo.",
       "La dama se retira a g6, su casilla más activa.",
       "Otra vez: el peón ataca a la dama y le quita la casilla g6.",
       "La dama vuelve a g5 (13...Nxh5 era una alternativa de valor parecido).",
       "Amenaza Bxf4, que encerraría a la dama. Las negras tendrán que retirar el caballo a g8 para darle una casilla. Así lo jugó Anderssen."
      ]
     },
     {
      "fen": "rnb1kb1r/p1pp1ppp/8/1B4qn/4Pp1N/3P4/PPP3PP/RNBQ1K1R w kq - 3 9",
      "caption": "Juegan blancas (jugada 9): ¿qué jugó Anderssen? Y si las negras responden distinto que en la partida, ¿cómo sigues?",
      "line": [
       "Nf5",
       "g6",
       "h4"
      ],
      "comments": [
       "El caballo se instala en f5, ataca g7 y quita casillas a la dama negra. Es la jugada de la partida y la mejor.",
       "Variante: en lugar de 9...c6, las negras atacan al caballo con el peón.",
       "¡Contraataque! El peón ataca a la dama antes de ocuparse del caballo; tras 10...Qf6 11.Nc3 el juego sigue equilibrado. Las demás jugadas pierden material."
      ]
     },
     {
      "fen": "rnb1k1nr/p2p1ppp/3B4/1p1NPN1P/6P1/3P1Q2/P1P5/q4Kb1 w kq - 0 20",
      "caption": "Juegan blancas (jugada 20): ¿qué jugó Anderssen? Y después, ¿cómo sigues si las negras se defienden con ...Ba6?",
      "line": [
       "Ke2",
       "Ba6",
       "Nc7+",
       "Kd8",
       "Nxa6"
      ],
      "comments": [
       "El rey sale de la primera fila: así se terminan los jaques de la dama negra y el ataque blanco sigue en pie.",
       "Variante: en lugar de 20...Na6, las negras desarrollan el alfil. Es la mejor defensa según el motor.",
       "Jaque con horquilla: el caballo también amenaza la torre de a8.",
       "Única casilla.",
       "Recuperas material y mantienes el ataque: las blancas quedan con ventaja clara."
      ]
     },
     {
      "fen": "rnb1k1nr/p2p1ppp/3B4/1pbN1N1P/4P1P1/3P1Q2/PqP5/R4KR1 b kq - 1 18",
      "caption": "Juegan negras (jugada 18): Anderssen acaba de dejar sus dos torres en el aire. ¿Cuál era la defensa correcta según el análisis moderno?",
      "line": [
       "Qxa1+",
       "Ke2",
       "Qb2"
      ],
      "comments": [
       "Comer la torre con jaque es lo mejor: obliga al rey a moverse antes de que las blancas jueguen e5.",
       "El rey sale de la primera fila.",
       "¡Defensa con la dama! Vigila c2 y la diagonal hacia g7. Según el motor, la posición queda equilibrada. Kieseritzky jugó 18...Bxg1 y perdió."
      ]
     }
    ]
   },
   "p-siempreviva": {
    "html": "<h4>El Gambito Evans y la lucha por el tiempo</h4><p>El Gambito Evans (<span class=\"mv\">4.b4</span>) entrega un peón para ganar tiempo: tras <span class=\"mv\">4...Bxb4 5.c3</span> el alfil negro debe moverse otra vez y las blancas construyen el centro con <span class=\"mv\">d4</span>. Anderssen llevó la idea al extremo: tras <span class=\"mv\">7.O-O</span> las negras avanzaron su peón hasta d3, donde quedó como una espina en la posición blanca, pero el desarrollo blanco era muy superior. La dama en b3 y el alfil en c4 apuntan a f7; el peón de e5 quita la casilla f6 al caballo negro; el alfil de <span class=\"mv\">11.Ba3</span> controla la diagonal a3-f8 e impide el enroque corto.</p><h4>Los planes de cada bando</h4><p>El plan blanco era sencillo: <b>mantener el rey negro en el centro y abrir la columna e</b>. Por eso <span class=\"mv\">17.Nf6+</span> entrega un caballo: tras <span class=\"mv\">17...gxf6 18.exf6</span> el peón de f6 ataca al caballo de e7, que es el único defensor del rey en esa columna. Las negras, por su parte, apostaban por un contraataque sobre g2, con la torre en la columna g abierta y la dama en h5. La partida es una carrera: quien llegue primero con jaques gana.</p><h4>Lo que dice el análisis moderno</h4><p>La Siempreviva no es una partida perfecta. Según el motor, en la jugada 19 había algo más fuerte que la famosa jugada tranquila: <span class=\"mv\">19.Be4!</span>, que tapa la diagonal del alfil de b7 hacia el caballo de f3 y a la vez lo ataca. Y tras <span class=\"mv\">19.Rad1</span> las negras podían defenderse con <span class=\"mv\">19...Bd4!</span>, que corta la columna d y mantiene el equilibrio. El error decisivo fue <span class=\"mv\">19...Qxf3</span>: las negras ganaron una pieza, pero las blancas llegaron primero. Esto no disminuye la belleza de la combinación; enseña que en las posiciones de ataque mutuo <b>el cálculo concreto importa más que la evaluación general</b>.</p><h4>Patrones para recordar</h4><ul><li><b>El doble jaque</b> (<span class=\"mv\">22.Bf5+</span>) obliga al rey a moverse aunque todas las demás piezas estén defendidas.</li><li><b>El sacrificio de dama de atracción</b> (<span class=\"mv\">21.Qxd7+</span>) lleva al rey a una casilla donde recibe un doble jaque.</li><li><b>La clavada en la columna e</b>: el caballo de e7 no podía moverse sin exponer al rey; cada pieza que lo atacaba era una amenaza real.</li><li>Cuando el rival tiene una amenaza de mate, solo puedes ignorarla si tus jugadas son <b>jaques o amenazas aún mayores</b>.</li></ul><h4>Preguntas para analizar la partida</h4><ol><li>¿Por qué el alfil de a3 era tan importante para impedir el enroque negro?</li><li>Si el rey negro no captura la torre en la jugada 20 (por ejemplo, <span class=\"mv\">20...Kd8</span> o <span class=\"mv\">20...Kf8</span>), ¿qué jaque descubierto gana la dama negra?</li><li>¿Por qué <span class=\"mv\">22.Bf5+</span> es un doble jaque? Identifica las dos piezas que dan jaque.</li></ol>",
    "keyPoints": [
     "El motor prefiere 19.Be4 a la famosa 19.Rad1.",
     "En un ataque mutuo, solo puedes ignorar la amenaza rival si tus jugadas son más fuertes."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "orientation": "white",
      "caption": "El Gambito Evans: un peón a cambio de tiempo y del centro.",
      "line": [
       "e4",
       "e5",
       "Nf3",
       "Nc6",
       "Bc4",
       "Bc5",
       "b4",
       "Bxb4",
       "c3",
       "Ba5"
      ],
      "comments": [
       "Peón al centro.",
       "Respuesta simétrica.",
       "Desarrollo con ataque a e5.",
       "Defiende e5.",
       "El alfil apunta a f7.",
       "La Italiana: el alfil negro apunta a f2.",
       "El Gambito Evans: el peón desvía al alfil.",
       "Las negras aceptan.",
       "Gana un tiempo contra el alfil y prepara d4.",
       "El alfil se retira, pero las blancas ya pueden construir el centro."
      ]
     },
     {
      "fen": "1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/3RR1K1 b - - 2 19",
      "orientation": "black",
      "caption": "La defensa que faltó: tras 19.Rad1, las negras podían mantener el equilibrio con 19...Bd4.",
      "line": [
       "Bd4",
       "cxd4",
       "Qxf3",
       "Be4",
       "Rxg2+",
       "Kh1",
       "Rxh2+",
       "Kxh2",
       "Qxf2+"
      ],
      "comments": [
       "El alfil corta la columna d entre la torre de d1 y d7.",
       "Las blancas capturan.",
       "Ahora la dama come el caballo: la columna d está cortada por el alfil.",
       "Las blancas atacan a la dama.",
       "Las negras entregan la torre para abrir el rey blanco.",
       "El rey se esconde.",
       "Otro sacrificio.",
       "Obligado.",
       "Jaques: según el motor, la posición queda equilibrada. La combinación de Anderssen funcionó porque las negras no encontraron esta defensa."
      ]
     }
    ],
    "drills": [
     {
      "fen": "1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 w - - 1 19",
      "caption": "Juegan blancas (jugada 19): Anderssen jugó la famosa 19.Rad1, pero el análisis moderno encuentra algo más fuerte. ¿Lo ves?",
      "line": [
       "Be4",
       "Qh3",
       "g3"
      ],
      "comments": [
       "El alfil tapa la diagonal del alfil de b7 hacia el caballo de f3 y a la vez lo ataca.",
       "Las negras buscan contraataque contra g2.",
       "Cierras la columna g. Si 20...Rxg3+ 21.hxg3 Qxg3+ 22.Kh1, las negras se quedan sin piezas para seguir el ataque y las blancas mantienen la ventaja."
      ]
     },
     {
      "fen": "1r1k2r1/pbppRp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3R2K1 w - - 1 21",
      "caption": "Juegan blancas (variante): tras 20.Rxe7+, ¿qué pasa si el rey negro va a d8 en lugar de capturar la torre?",
      "line": [
       "Rxd7+",
       "Kc8",
       "Rd8+"
      ],
      "comments": [
       "Jaque: la torre no se puede capturar porque la defiende la torre de d1.",
       "El rey huye a c8.",
       "¡Otro sacrificio! Si 22...Kxd8, 23.Be2+ descubre el jaque de la torre de d1 y ataca a la dama de f3: las blancas ganan la dama."
      ]
     },
     {
      "fen": "1r3kr1/pbppRp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3R2K1 w - - 1 21",
      "caption": "Juegan blancas (variante): tras 20.Rxe7+, ¿qué pasa si el rey negro va a f8?",
      "line": [
       "Re3+",
       "d6",
       "Rxf3"
      ],
      "comments": [
       "Jaque descubierto del alfil de a3, y la torre ataca a la vez a la dama de f3.",
       "Las negras tapan con el peón.",
       "Ganas la dama: las blancas quedan con ventaja decisiva."
      ]
     },
     {
      "fen": "1rb1k2r/p1ppnppp/2n3q1/bQ2P3/2B5/B1Pp1N2/P4PPP/RN2R1K1 w k - 1 13",
      "caption": "Juegan blancas (jugada 13): la dama de b5 está atacada por la torre de b8. ¿Adónde la retiró Anderssen?",
      "line": [
       "Qa4"
      ],
      "comments": [
       "La única retirada buena: ataca el alfil de a5 y sigue presionando c6 y el flanco de dama. Las otras retiradas dejan a las blancas sin compensación por los peones entregados."
      ]
     }
    ]
   },
   "p-opera": {
    "html": "<h4>Por qué la Philidor de las negras falló</h4><p>La Defensa Philidor (<span class=\"mv\">1.e4 e5 2.Nf3 d6</span>) es sólida pero pasiva: el peón de d6 cierra la diagonal del alfil de f8. El problema de los aficionados que la juegan es que, si además cambian su alfil de casillas claras por un caballo, quedan sin buenas piezas menores. Eso hicieron el duque y el conde: <span class=\"mv\">3...Bg4</span> clavó el caballo, pero tras <span class=\"mv\">4.dxe5</span> tuvieron que cambiarlo (<span class=\"mv\">4...Bxf3</span>) para no perder un peón. Resultado: las blancas tienen la pareja de alfiles y la dama ya desarrollada en f3.</p><h4>Morphy y la economía de tiempos</h4><p>Lo admirable de la partida no es solo el final, sino la forma en que Morphy usa <b>cada jugada para crear una amenaza</b>. <span class=\"mv\">6.Bc4</span> amenaza f7; <span class=\"mv\">7.Qb3</span> ataca a la vez f7 y b7 (un doble ataque que obliga a <span class=\"mv\">7...Qe7</span>, una jugada que encierra al alfil de f8). Curiosamente, el motor indica que <span class=\"mv\">8.Qxb7</span> ganaba material de forma más directa, pero Morphy prefirió <span class=\"mv\">8.Nc3</span>: mantener las damas, terminar el desarrollo y atacar. Es una decisión típica de él: no se distraía con peones cuando podía aumentar su ventaja de desarrollo.</p><h4>Cómo se abre una posición con ventaja de desarrollo</h4><p>Cuando un bando tiene más piezas en juego, debe <b>abrir líneas</b> antes de que el rival termine de desarrollarse. Morphy lo hizo así:</p><ol><li><span class=\"mv\">9.Bg5</span>: clava el caballo de f6, que ya no puede defender d7 de forma efectiva.</li><li><span class=\"mv\">10.Nxb5</span>: tras el impreciso <span class=\"mv\">9...b5</span>, entrega una pieza para abrir la diagonal a4-e8 y la columna d.</li><li><span class=\"mv\">12.O-O-O</span>: el enroque largo pone la torre en la columna abierta con ganancia de tiempo.</li><li><span class=\"mv\">13.Rxd7</span> y <span class=\"mv\">14.Rd1</span>: elimina un defensor y trae la otra torre.</li></ol><p>En la posición final, las blancas dan mate con solo dos piezas, pero todas las demás contribuyeron a abrir el camino.</p><h4>Errores típicos que la partida ilustra</h4><ul><li>Cambiar un alfil por un caballo sin necesidad en la apertura.</li><li>Defender con la dama una casilla y bloquear al mismo tiempo el desarrollo de una pieza (<span class=\"mv\">7...Qe7</span> encerró al alfil de f8).</li><li>Abrir el flanco del propio rey con peones (<span class=\"mv\">9...b5</span>) cuando el rival tiene todas sus piezas listas.</li><li>Dejar la torre de h8 y el alfil de f8 sin mover hasta el final: en la práctica, las negras jugaron con dos piezas menos.</li></ul><h4>Preguntas para analizar la partida</h4><ol><li>Cuenta las piezas desarrolladas de cada bando en la jugada 12. ¿Cuántos tiempos de ventaja tenía Morphy?</li><li>¿Por qué el caballo de d7 no podía moverse en las jugadas 11 y 12?</li><li>En el mate final, ¿qué pieza protege a la torre de d8?</li></ol><p>Un consejo para el estudio: reproduzcan la partida sin mirar las jugadas de las blancas y traten de adivinar cada una. Casi todas responden a la misma pregunta: ¿qué pieza todavía no está en juego y cómo la saco con amenaza?</p>",
    "keyPoints": [
     "Cada jugada de Morphy crea una amenaza o desarrolla una pieza.",
     "Con ventaja de desarrollo, abrir líneas aunque cueste material."
    ],
    "positions": [
     {
      "fen": "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
      "orientation": "white",
      "caption": "Cómo las negras perdieron tiempos: el cambio de alfil por caballo y la dama que bloquea.",
      "line": [
       "dxe5",
       "Bxf3",
       "Qxf3",
       "dxe5",
       "Bc4",
       "Nf6",
       "Qb3",
       "Qe7"
      ],
      "comments": [
       "Las blancas atacan el centro.",
       "Para no perder el peón, las negras cambian su alfil por el caballo.",
       "La dama recaptura y ya está desarrollada.",
       "Las negras recuperan el peón.",
       "El alfil amenaza f7.",
       "Desarrollo que tapa la columna f, pero b7 y f7 quedan expuestos.",
       "Doble ataque contra f7 y b7.",
       "La dama defiende ambos puntos, pero encierra al alfil de f8."
      ]
     },
     {
      "fen": "r3kb1r/p2n1ppp/5n2/1Bq1p1B1/4P3/1Q6/PPP2PPP/2KR3R w kq - 3 13",
      "orientation": "white",
      "caption": "Una defensa alternativa en la jugada 12: incluso con 12...Qc5, la clavada y la columna d deciden.",
      "line": [
       "Bxf6",
       "Bd6",
       "Bxd7+",
       "Kxd7"
      ],
      "comments": [
       "Elimina el caballo que defendía d7.",
       "Las negras desarrollan el alfil y protegen e5 en lugar de recapturar.",
       "Las blancas ganan el caballo de d7 con jaque.",
       "El rey recaptura y queda en la columna d abierta, con la dama y la torre blancas apuntándole. Las blancas tienen ventaja decisiva."
      ]
     }
    ],
    "drills": [
     {
      "fen": "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
      "caption": "Juegan blancas (jugada 7): ¿qué jugó Morphy? Y si las negras responden con 7...Bc5 en vez de 7...Qe7, ¿cómo sigues?",
      "line": [
       "Qb3",
       "Bc5",
       "Bxf7+"
      ],
      "comments": [
       "Doble ataque: la dama apunta a f7 (junto con el alfil) y a b7.",
       "Variante: las negras desarrollan el alfil y dejan caer un peón.",
       "Ganas el peón de f7 con jaque: el rey negro pierde el enroque y la dama blanca sigue amenazando b7."
      ]
     },
     {
      "fen": "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
      "caption": "Juegan blancas (jugada 11): Morphy acaba de entregar el caballo en b5. ¿Cómo siguió?",
      "line": [
       "Bxb5+",
       "Nbd7",
       "O-O-O"
      ],
      "comments": [
       "Recuperas un peón con jaque y clavas las piezas negras en la diagonal a4-e8.",
       "Tapar con el caballo es la mejor defensa, pero el caballo queda clavado.",
       "El enroque largo trae la torre a la columna d con ganancia de tiempo: d7 queda atacado dos veces y sigue clavado."
      ]
     },
     {
      "fen": "4kb1r/p2r1ppp/5n2/1B2p1B1/1q2P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
      "caption": "Juegan blancas (variante): en la jugada 14 las negras ofrecen cambiar damas con 14...Qb4. ¿Cómo sigue el ataque?",
      "line": [
       "Bxf6",
       "gxf6",
       "Bxd7+"
      ],
      "comments": [
       "Eliminas el caballo que defendía la torre de d7.",
       "La recaptura natural.",
       "Ganas la torre con jaque; tras 16...Kd8 las blancas tienen ventaja material decisiva."
      ]
     },
     {
      "fen": "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
      "caption": "Juegan blancas (jugada 8): Morphy jugó 8.Nc3 para seguir desarrollándose, pero el motor encuentra una forma más directa de ganar material. ¿Cuál?",
      "line": [
       "Qxb7",
       "Qb4+",
       "Qxb4"
      ],
      "comments": [
       "Comes el peón de b7 y atacas la torre de a8.",
       "Las negras ofrecen el cambio de damas con jaque para salvar la torre.",
       "Cambias damas: tras 9...Bxb4+ 10.Bd2 las blancas tienen un peón de más y ventaja clara. Morphy prefirió mantener las damas para atacar."
      ]
     }
    ]
   },
   "p-rubinstein": {
    "html": "<h4>Una apertura tranquila con tiempos perdidos</h4><p>La partida empieza como una estructura simétrica de Gambito de Dama con <span class=\"mv\">c4</span> de las blancas y <span class=\"mv\">...c5</span> de las negras. Las blancas ganan espacio en el flanco de dama con <span class=\"mv\">a3</span> y <span class=\"mv\">b4</span> y desarrollan el alfil en b2, lo cual es razonable. El problema está en los tiempos: el alfil blanco va a d3, captura en c4 y regresa a d3 (<span class=\"mv\">11.Bd3</span>, <span class=\"mv\">12.Bxc4</span>, <span class=\"mv\">13.Bd3</span>), mientras la dama va de d2 a e2. Cuatro jugadas de piezas ya desarrolladas, mientras Rubinstein completa su desarrollo con <span class=\"mv\">...b5</span>, <span class=\"mv\">...Rd8</span> y <span class=\"mv\">...Bb7</span>. Al llegar la jugada 15 las negras tienen todas sus piezas en buenas casillas.</p><h4>El punto de inflexión estratégico</h4><p>Tras <span class=\"mv\">16.Nxe5 Bxe5</span> las negras amenazan el peón de h2 y el alfil de b7 domina la gran diagonal. Rotlewi respondió con <span class=\"mv\">17.f4</span>, una jugada natural para expulsar al alfil, pero que tiene un precio enorme: abre la diagonal g1-a7, por la que llegará el otro alfil negro con <span class=\"mv\">19...Bb6+</span>. Después, con <span class=\"mv\">18.e4</span> y <span class=\"mv\">19.e5</span>, las blancas ganan espacio en el centro, pero dejan la diagonal b7-h1 apuntando directo a su rey. <b>Cada avance de peón deja casillas débiles detrás</b>, y aquí las casillas débiles estaban junto al rey.</p><h4>La combinación: cómo se prepara</h4><p>La cascada final (<span class=\"mv\">22...Rxc3</span>, <span class=\"mv\">23...Rd2</span>, <span class=\"mv\">25...Rh3</span>) es una de las más bellas de la historia, pero lo que la hace posible es la preparación:</p><ul><li><b>Los dos alfiles</b> apuntan al rey: uno a g1 por la diagonal a7-g1, otro a h1 por la gran diagonal.</li><li><b>El caballo de g4</b> y la <b>dama en h4</b> atacan h2.</li><li><b>Las torres</b> en las columnas c y d están listas para eliminar defensores: la torre de c8 elimina el caballo de c3, que defendía e4; la de d8 desvía a la dama blanca.</li></ul><p>El análisis con motor confirma que tras <span class=\"mv\">22.g3</span> todas las defensas pierden. Si <span class=\"mv\">23.Bxb7</span> (la defensa más tenaz), <span class=\"mv\">23...Rxg3</span> mantiene un ataque ganador; si <span class=\"mv\">24.Qxg4</span>, <span class=\"mv\">24...Bxe4+</span> lleva al mate; y tras <span class=\"mv\">24.Rf2</span> o <span class=\"mv\">24.Bxb7</span>, las torres negras dominan la segunda fila.</p><h4>Lecciones prácticas</h4><ol><li>No pierdas tiempos con piezas ya desarrolladas en posiciones simétricas: el rival te sacará ventaja de desarrollo sin que lo notes.</li><li>Antes de jugar <span class=\"mv\">f4</span> o <span class=\"mv\">f5</span> con el rey enrocado, mira qué diagonal abres y si el rival tiene un alfil para usarla.</li><li>En una combinación con varios sacrificios, cuenta primero <b>cuántas piezas atacan al rey rival y cuántas lo defienden</b>: aquí casi todo el ejército negro apuntaba al enroque blanco.</li></ol><p>Una observación final: Rubinstein no necesitó calcular toda la combinación desde la jugada 22. Le bastó con ver que, tras <span class=\"mv\">22...Rxc3</span>, todas las respuestas blancas dejaban algún punto de su enroque sin defensa suficiente.</p>",
    "keyPoints": [
     "Las blancas perdieron tiempos con el alfil (d3-c4-d3) y la dama.",
     "f4 abrió la diagonal g1-a7 para el alfil negro."
    ],
    "positions": [
     {
      "fen": "r1b2rk1/1p2qppp/p1nbpn2/3p4/1PP5/P1N1PN2/1B1Q1PPP/R3KB1R w KQ - 5 11",
      "orientation": "black",
      "caption": "Los tiempos perdidos por las blancas: el alfil va y vuelve mientras Rubinstein completa su desarrollo.",
      "line": [
       "Bd3",
       "dxc4",
       "Bxc4",
       "b5",
       "Bd3",
       "Rd8",
       "Qe2",
       "Bb7",
       "O-O",
       "Ne5"
      ],
      "comments": [
       "Primera jugada del alfil.",
       "Las negras ganan un tiempo capturando.",
       "El alfil recaptura: segunda jugada.",
       "Las negras ganan otro tiempo atacándolo.",
       "Tercera jugada del alfil, para volver a d3.",
       "La torre ocupa la columna d.",
       "La dama también se mueve otra vez.",
       "El alfil ocupa la gran diagonal hacia g2 y h1.",
       "Las blancas enrocan.",
       "Todas las piezas negras están activas: el caballo provoca cambios que abrirán el juego."
      ]
     },
     {
      "fen": "r2r2k1/1b2qppp/p2bpn2/1p2N3/1P6/P1NBP3/1B2QPPP/R4RK1 b - - 0 16",
      "orientation": "black",
      "caption": "Los avances de peón que debilitaron al rey blanco.",
      "line": [
       "Bxe5",
       "f4",
       "Bc7",
       "e4",
       "Rac8",
       "e5",
       "Bb6+",
       "Kh1",
       "Ng4",
       "Be4"
      ],
      "comments": [
       "El alfil recaptura y amenaza Bxh2+.",
       "Las blancas expulsan al alfil, pero abren la diagonal g1-a7.",
       "El alfil se retira apuntando a h2.",
       "Las blancas ganan espacio.",
       "La torre ocupa la columna c, frente al caballo de c3.",
       "El peón expulsa al caballo, pero deja la gran diagonal sin defensa.",
       "El alfil aprovecha la diagonal abierta por f4.",
       "El rey se aparta.",
       "El caballo salta hacia h2 y e3.",
       "Las blancas tapan la gran diagonal; todo está listo para 21...Qh4."
      ]
     }
    ],
    "drills": [
     {
      "fen": "2rr2k1/1b2qppp/pb2p3/1p2P3/1P2BPn1/P1N5/1B2Q1PP/R4R1K b - - 4 21",
      "caption": "Juegan negras (jugada 21): casi todas las piezas negras apuntan al rey blanco. ¿Qué jugó Rubinstein y cómo respondió al ataque contra su dama?",
      "line": [
       "Qh4",
       "g3",
       "Rxc3"
      ],
      "comments": [
       "La dama se suma al ataque contra h2, junto con el caballo de g4.",
       "Las blancas atacan la dama (22.h3 se responde igual, con ...Rxc3).",
       "¡Deja la dama en el aire! Elimina el caballo que defendía e4 y abre la gran diagonal para el alfil de b7. Las negras tienen un ataque ganador."
      ]
     },
     {
      "fen": "2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N4P/1B2Q1P1/R4R1K b - - 0 22",
      "caption": "Juegan negras (variante): si en la jugada 22 las blancas hubieran jugado h3 en lugar de g3, ¿cómo seguiría el ataque?",
      "line": [
       "Rxc3",
       "Bxc3",
       "Bxe4"
      ],
      "comments": [
       "El mismo golpe: la torre elimina el caballo que defendía e4.",
       "Recuperar la torre es lo más natural.",
       "El alfil come en e4 con amenazas sobre g2. Si 24.Qxg4 Qxg4 25.hxg4 Rd3, las negras ganan material."
      ]
     },
     {
      "fen": "6k1/1b3ppp/pb2p3/1p2P3/1P2BPnP/P1r5/1B1rQR1P/R6K b - - 2 24",
      "caption": "Juegan negras (variante): tras 23...Rd2!, ¿qué hacer si las blancas defienden con 24.Rf2?",
      "line": [
       "Bxe4+",
       "Kg1",
       "Rxe2"
      ],
      "comments": [
       "Jaque con el alfil, que elimina al defensor de la gran diagonal.",
       "El rey se aparta; 25.Qxe4 tampoco salva a las blancas.",
       "Comes la dama: la torre de f2 está clavada por el alfil de b6 y las negras tienen mate en pocas jugadas."
      ]
     },
     {
      "fen": "3r2k1/1B3ppp/pb2p3/1p2P3/1P3Pnq/P1r3P1/1B2Q2P/R4R1K b - - 0 23",
      "caption": "Juegan negras (variante): tras 22...Rxc3, la defensa más tenaz era 23.Bxb7, eliminando el alfil atacante. ¿Cómo mantienes el ataque?",
      "line": [
       "Rxg3"
      ],
      "comments": [
       "La torre elimina el peón que atacaba a la dama y abre la columna g. Las negras siguen con un ataque decisivo contra h2 (por ejemplo, ...Nxh2 o ...Rh3)."
      ]
     }
    ]
   },
   "p-reti-tartakower": {
    "html": "<h4>La trampa preparada desde la jugada 5</h4><p>En la Caro-Kann, tras <span class=\"mv\">4.Nxe4 Nf6</span>, la jugada <span class=\"mv\">5.Qd3</span> es poco habitual, pero esconde una idea: la dama se coloca en la columna d, frente a la dama negra de d8. Si la columna d llega a abrirse, cualquier pieza negra que quede entre ambas damas estará en peligro. Tartakower respondió con el agresivo <span class=\"mv\">5...e5</span>, un golpe al centro que deja la columna d semiabierta. Tras <span class=\"mv\">6.dxe5 Qa5+ 7.Bd2 Qxe5</span> las negras recuperaron el peón, pero el rey sigue en e8 y la columna d está completamente abierta.</p><h4>El enroque largo con doble función</h4><p><span class=\"mv\">8.O-O-O!</span> es la jugada clave de la partida. Pone el rey a salvo, pero sobre todo <b>coloca la torre en d1</b>, detrás de la dama. Ahora hay dos piezas blancas en la columna d apuntando a d8, y el alfil de d2 puede salir con jaque descubierto en cualquier momento. El caballo de e4 queda aparentemente sin defensa: es un cebo. El motor confirma que, incluso sin la captura, las blancas quedan mejor: tras la mejor defensa, <span class=\"mv\">8...Be7</span>, siguen <span class=\"mv\">9.Nxf6+</span> y el desarrollo blanco es muy superior.</p><h4>La mecánica del doble jaque</h4><p>Tras <span class=\"mv\">8...Nxe4?</span> llega <span class=\"mv\">9.Qd8+!</span>: la dama se sacrifica para <b>atraer al rey a d8</b>, la casilla donde se cruzan la columna de la torre y la diagonal del alfil. Con <span class=\"mv\">10.Bg5+</span> el alfil da jaque desde g5 y, al moverse, descubre el jaque de la torre de d1. Es un doble jaque: no se puede capturar ninguna de las dos piezas ni interponer nada, solo mover el rey. Y ambas casillas de escape (c7 y e8) llevan al mate: <span class=\"mv\">Bd8#</span> o <span class=\"mv\">Rd8#</span>.</p><h4>Otras defensas, misma idea</h4><p>Esta partida enseña un patrón que se repite: <b>rey en el centro + columna abierta + pieza que puede dar jaque descubierto</b>. Si en la jugada 8 las negras hubieran jugado <span class=\"mv\">8...Bg4</span> o <span class=\"mv\">8...Nbd7</span>, el patrón cambia de columna pero no de idea: <span class=\"mv\">9.Re1!</span> clava la dama contra el rey en la columna e, y las negras pierden material. Cuando tu rey está en el centro y el rival tiene torres en columnas abiertas, cada pieza que se coloca delante del rey corre peligro de quedar clavada.</p><h4>Lista de comprobación para no caer en estas trampas</h4><ol><li>¿Mi rey está en una columna que el rival puede abrir o que ya tiene una torre rival?</li><li>¿Hay alguna pieza rival que pueda moverse dando jaque descubierto?</li><li>Si el rival me deja una pieza «gratis», ¿qué cambia en la posición después de comerla?</li></ol><p>Un detalle de la posición final: el alfil de f8 y la torre de h8 negros nunca se movieron. Como en tantas miniaturas, el bando que pierde lo hace con buena parte de su ejército todavía en casa.</p>",
    "keyPoints": [
     "Rey en el centro + columna abierta + pieza que puede dar jaque descubierto = peligro.",
     "Con 8...Bg4 u 8...Nbd7, la idea Re1 también gana."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "orientation": "white",
      "caption": "La apertura: la dama blanca se coloca en la columna d.",
      "line": [
       "e4",
       "c6",
       "d4",
       "d5",
       "Nc3",
       "dxe4",
       "Nxe4",
       "Nf6",
       "Qd3",
       "e5"
      ],
      "comments": [
       "Peón al centro.",
       "La Caro-Kann: prepara ...d5.",
       "Segundo peón central.",
       "Desafía a e4.",
       "Defiende e4.",
       "Las negras cambian en el centro.",
       "El caballo recaptura en el centro.",
       "Desarrollo que ataca al caballo.",
       "Poco habitual: la dama se pone frente a la dama negra en la columna d.",
       "Golpe central; ahora la columna d puede abrirse."
      ]
     },
     {
      "fen": "rnb1k2r/pp2bppp/2p2n2/4q3/4N3/3Q4/PPPB1PPP/2KR1BNR w kq - 2 9",
      "orientation": "white",
      "caption": "La mejor defensa en la jugada 8: con 8...Be7 las negras evitan el desastre, pero las blancas siguen mejor.",
      "line": [
       "Nxf6+",
       "Qxf6",
       "Nf3",
       "O-O",
       "Bg5",
       "Qe6"
      ],
      "comments": [
       "Cambio que desplaza a la dama negra.",
       "La dama recaptura.",
       "Desarrollo.",
       "Las negras enrocan por fin.",
       "El alfil ataca a la dama con tempo.",
       "Las blancas tienen ventaja de desarrollo y la columna d, aunque sin ganar material."
      ]
     }
    ],
    "drills": [
     {
      "fen": "rnb1kb1r/pp3ppp/2p2n2/q3P3/4N3/3Q4/PPP2PPP/R1B1KBNR w KQkq - 1 7",
      "caption": "Juegan blancas (jugada 7): la dama negra da jaque. ¿Cómo lo resolvió Réti y cuál fue la jugada clave después?",
      "line": [
       "Bd2",
       "Qxe5",
       "O-O-O"
      ],
      "comments": [
       "El alfil tapa el jaque desarrollándose; más tarde podrá saltar a g5.",
       "Las negras recuperan el peón.",
       "¡La jugada clave! El rey se pone a salvo y la torre llega a d1, detrás de la dama: la columna d será mortal para el rey negro."
      ]
     },
     {
      "fen": "rn2kb1r/pp3ppp/2p2n2/4q3/4N1b1/3Q4/PPPB1PPP/2KR1BNR w kq - 2 9",
      "caption": "Juegan blancas (variante): ¿y si en la jugada 8 las negras hubieran jugado 8...Bg4, atacando a la torre de d1?",
      "line": [
       "Re1",
       "Be6",
       "f4"
      ],
      "comments": [
       "La torre se coloca detrás del caballo de e4: amenaza Nxf6+ con un ataque descubierto contra la dama de e5.",
       "Las negras ponen el alfil en la columna e para proteger a su rey.",
       "El peón ataca a la dama, que no tiene casillas: tras 10...Nxe4 11.fxe5 las blancas ganan la dama por dos piezas menores."
      ]
     },
     {
      "fen": "r1b1kb1r/pp1n1ppp/2p2n2/4q3/4N3/3Q4/PPPB1PPP/2KR1BNR w kq - 2 9",
      "caption": "Juegan blancas (variante): ¿y si en la jugada 8 las negras hubieran jugado 8...Nbd7?",
      "line": [
       "Re1",
       "Nxe4",
       "Rxe4"
      ],
      "comments": [
       "La misma idea: la torre en la columna e amenaza un ataque descubierto contra la dama.",
       "Las negras eliminan el caballo.",
       "La torre recaptura atacando a la dama, que está clavada contra el rey: las blancas ganan la dama por la torre."
      ]
     },
     {
      "fen": "rnb1kb1r/pp3ppp/2p5/4q1B1/4n3/8/PPP2PPP/2KR1BNR w - - 2 11",
      "caption": "Juegan blancas (variante): tras el doble jaque 10.Bg5+, ¿qué pasa si el rey negro va a e8?",
      "line": [
       "Rd8#"
      ],
      "comments": [
       "Mate: la torre da jaque en d8, protegida por el alfil de g5, que además controla e7. La casilla d7 está atacada por la torre y f7 la ocupa un peón negro."
      ]
     }
    ]
   },
   "p-lasker-thomas": {
    "html": "<h4>La apertura: la Holandesa y las casillas negras</h4><p>Las negras eligieron una estructura holandesa con <span class=\"mv\">...e6</span> y <span class=\"mv\">...f5</span>, que controla e4 pero debilita la diagonal h4-e8 y las casillas negras alrededor del rey. Edward Lasker reaccionó con lógica: <span class=\"mv\">4.Bg5</span> y <span class=\"mv\">5.Bxf6</span> eliminan el caballo de f6, el mejor defensor del enroque, y <span class=\"mv\">6.e4</span> abre el centro. Tras <span class=\"mv\">6...fxe4 7.Nxe4</span> el caballo blanco ocupa e4 y luego <span class=\"mv\">8.Ne5</span> pone el otro caballo en una casilla central. Los dos caballos centralizados apuntan al enroque negro.</p><h4>Dónde estuvo el error real</h4><p>El análisis con motor muestra algo interesante: el sacrificio no estaba en el aire desde el principio. En la jugada 9, las negras podían cambiar <span class=\"mv\">9...Bxe5!</span>: tras <span class=\"mv\">10.dxe5 Nc6</span> el peón de e5 queda débil y las negras pasan a estar mejor. Incluso en la jugada 10, después de <span class=\"mv\">10.Qh5</span>, el cambio <span class=\"mv\">10...Bxe5</span> mantenía el equilibrio. El error decisivo fue <span class=\"mv\">10...Qe7?</span>, una jugada natural que conecta las torres, pero que deja el alfil de f6 defendido solo por la dama y la torre, y no cubre h7. Moraleja: <b>cuando el rival concentra piezas frente a tu rey, cambia sus atacantes más peligrosos</b> antes de que sea tarde.</p><h4>La geometría de la caza</h4><p>Tras <span class=\"mv\">11.Qxh7+ Kxh7 12.Nxf6+</span> (doble jaque: el caballo da jaque y descubre el alfil de d3) el rey no puede volver a h8, porque <span class=\"mv\">Ng6#</span> sería mate. A partir de ahí, cada jaque blanco cumple dos funciones: <b>dar jaque y cortar la retirada</b>. Los peones (<span class=\"mv\">h4+</span>, <span class=\"mv\">g3+</span>) empujan al rey hacia adelante; el alfil y la torre cierran las casillas laterales. Un rey que avanza hacia el campo enemigo encuentra cada vez más piezas rivales y menos propias.</p><h4>Ideas que se llevan a otras partidas</h4><ul><li>El sacrificio en h7 funciona cuando hay <b>un caballo que puede dar jaque al instante</b> y un alfil en la diagonal b1-h7.</li><li>En una caza de rey, antes de cada jaque pregunta: ¿a dónde puede escapar el rey después? Elige el jaque que deja menos casillas.</li><li>El mate final con un movimiento del propio rey (<span class=\"mv\">Kd2#</span>, descubriendo la torre) recuerda que el jaque descubierto puede venir de cualquier pieza, incluido el rey.</li></ul><h4>El recorrido del rey negro</h4><p>Sigue en el tablero el viaje del rey: h7, h6, g5, f4, f3, g2 y g1. En siete jugadas cruza todo el tablero y termina en la casilla inicial del rey blanco. En cada parada, cuenta cuántas casillas de escape le quedan: verás que casi siempre es una sola. Esa es la marca de una caza bien conducida: el atacante no da jaques al azar, sino que elige en cada momento el que deja al rey con menos opciones.</p>",
    "keyPoints": [
     "9...Bxe5 o 10...Bxe5 habrían evitado el desastre.",
     "En una caza de rey, cada jaque debe cortar la retirada."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "orientation": "white",
      "caption": "La apertura: estructura holandesa y cambio del defensor de f6.",
      "line": [
       "d4",
       "e6",
       "Nf3",
       "f5",
       "Nc3",
       "Nf6",
       "Bg5",
       "Be7",
       "Bxf6",
       "Bxf6"
      ],
      "comments": [
       "Peón al centro.",
       "Flexible: puede ir a una Francesa o a una Holandesa.",
       "Desarrollo.",
       "Estructura holandesa: control de e4, pero la diagonal h5-e8 queda débil.",
       "Desarrollo que prepara e4.",
       "Desarrollo.",
       "Clava el caballo.",
       "Rompe la clavada.",
       "Cambia el mejor defensor del enroque negro.",
       "Las negras recuperan con el alfil."
      ]
     },
     {
      "fen": "rnbqk2r/pppp2pp/4pb2/8/3Pp3/2N2N2/PPP2PPP/R2QKB1R w KQkq - 0 7",
      "orientation": "white",
      "caption": "Los momentos en que las negras pudieron evitar el sacrificio.",
      "line": [
       "Nxe4",
       "b6",
       "Ne5",
       "O-O",
       "Bd3",
       "Bb7",
       "Qh5",
       "Qe7"
      ],
      "comments": [
       "El caballo ocupa e4.",
       "Las negras preparan el fianchetto del alfil.",
       "El otro caballo se centraliza.",
       "Las negras enrocan.",
       "El alfil apunta a h7.",
       "Aquí 9...Bxe5 era mejor.",
       "La dama se suma al ataque.",
       "El error decisivo: 10...Bxe5 mantenía el equilibrio. Ahora llega 11.Qxh7+."
      ]
     }
    ],
    "drills": [
     {
      "fen": "rnbq1rk1/p1pp2pp/1p2pb2/4N3/3PN3/3B4/PPP2PPP/R2QK2R b KQ - 3 9",
      "caption": "Juegan negras (jugada 9): Thomas jugó 9...Bb7 y dos jugadas después cayó en el ataque. ¿Qué era mejor?",
      "line": [
       "Bxe5",
       "dxe5",
       "Nc6"
      ],
      "comments": [
       "Cambias el caballo de e5, una de las piezas que más tarde participan en el sacrificio.",
       "La recaptura natural; ahora el peón de e5 queda aislado.",
       "El caballo ataca e5 y se acerca al centro: las negras ganan el peón y quedan mejor."
      ]
     },
     {
      "fen": "rnbqk2r/pppp2pp/4pb2/5p2/3P4/2N2N2/PPP1PPPP/R2QKB1R w KQkq - 0 6",
      "caption": "Juegan blancas (jugada 6): las blancas acaban de cambiar el caballo de f6. ¿Cómo abrió el centro Edward Lasker?",
      "line": [
       "e4",
       "fxe4",
       "Nxe4"
      ],
      "comments": [
       "Golpe central contra f5: sin el caballo de f6, las negras ya no controlan bien e4.",
       "Capturar es lo más natural (6...O-O tenía un valor parecido).",
       "El caballo recupera el peón y se instala en e4, mirando hacia f6 y g5. Otras recapturas pierden tiempo y material."
      ]
     },
     {
      "fen": "rn1qk2r/pbpp2pp/1p2pb2/4N3/3PN3/8/PPP2PPP/R2QKB1R w KQkq - 2 9",
      "caption": "Juegan blancas (variante): ¿y si en la jugada 8 las negras desarrollan el alfil con 8...Bb7 en lugar de enrocar?",
      "line": [
       "Qh5+",
       "g6",
       "Nxg6"
      ],
      "comments": [
       "Jaque por la diagonal h5-e8, debilitada por ...f5 y ...e6.",
       "Única defensa: 9...Ke7 permite mate.",
       "El caballo come en g6: si 10...hxg6, 11.Qxh8+ gana la torre con jaque; tras la mejor defensa, 10...Bxe4, sigue 11.Nxh8+ y las blancas ganan la calidad con ataque."
      ]
     },
     {
      "fen": "rn3r1k/pbppq1p1/1p2pN2/4N3/3P4/3B4/PPP2PPP/R3K2R w KQ - 1 13",
      "caption": "Juegan blancas (variante): tras el doble jaque 12.Nxf6+, ¿por qué el rey negro no podía volver a h8?",
      "line": [
       "Ng6#"
      ],
      "comments": [
       "Mate: el caballo de g6, protegido por el alfil de d3, da jaque. Las casillas g8 y h7 están controladas por el caballo de f6 y el peón de g7 le quita la última salida."
      ]
     }
    ]
   },
   "p-avro": {
    "html": "<h4>La Nimzoindia: centro a cambio de estructura</h4><p>Con <span class=\"mv\">5.a3 Bxc3+ 6.bxc3</span> Botvinnik aceptó peones doblados en c3 y c4 a cambio de la pareja de alfiles y de un centro sólido con <span class=\"mv\">e3</span> y <span class=\"mv\">d4</span>. Es el intercambio típico de esta apertura: las negras tienen la mejor estructura, las blancas los alfiles y la posibilidad de avanzar en el centro con <span class=\"mv\">f3</span> y <span class=\"mv\">e4</span>. Capablanca cambió además el alfil bueno de las blancas con <span class=\"mv\">10...Ba6</span>, una idea clásica para dejar al rival con el alfil de casillas negras encerrado detrás de sus peones.</p><h4>El error estratégico: 14...c4</h4><p>La jugada <span class=\"mv\">14...c4</span> parece lógica: fija el peón blanco de c3 y gana la casilla b3 para el caballo. Pero tiene un defecto profundo: <b>quita toda la tensión en el centro</b>. Mientras el peón negro estaba en c5, el centro blanco (d4) estaba bajo presión y <span class=\"mv\">e4</span> era difícil. Tras <span class=\"mv\">...c4</span>, las blancas pueden olvidarse del flanco de dama y lanzar todos sus peones centrales: <span class=\"mv\">18.f3</span>, <span class=\"mv\">19.e4</span>, <span class=\"mv\">20.e5</span>, <span class=\"mv\">22.f4</span> y <span class=\"mv\">24.f5</span>. Mientras tanto, el caballo negro llega a b3 y la dama come el peón de a4: dos piezas negras lejos del rey para ganar un peón que no influye en la lucha.</p><h4>Del plan a la combinación</h4><p>La partida es un ejemplo perfecto de la frase «la combinación es el resultado de una buena posición». Al llegar a la jugada 30, las blancas tienen:</p><ul><li>un <b>peón pasado en e6</b>, protegido y a dos casillas de coronar;</li><li>la <b>dama en e5</b>, en el centro, apoyando al peón y atacando f6;</li><li>un caballo listo para saltar a h5 o f5 contra el rey.</li></ul><p>Con <span class=\"mv\">30.Ba3!</span> Botvinnik desvía a la dama negra, el único defensor de e7. Tras <span class=\"mv\">30...Qxa3 31.Nh5+!</span> la estructura del rey se rompe y el peón corona. El análisis con motor muestra que las negras ya no tenían defensa: si en lugar de <span class=\"mv\">31...gxh5</span> el rey va a g8 o a h6, el caballo captura en f6 con efectos igual de demoledores.</p><h4>Cómo aplicar estas ideas</h4><ol><li>Antes de cerrar el centro o un flanco con un avance de peón, pregúntate <b>qué ruptura le estás dejando libre al rival</b>.</li><li>Ganar un peón en el flanco contrario está bien solo si el rival no puede hacer nada fuerte mientras tanto en el centro o contra tu rey.</li><li>Un peón pasado central apoyado por la dama vale tanto como una pieza: el rival tendrá que bloquearlo con algo y esa pieza dejará de defender.</li></ol><p>Fíjense también en la defensa: al final de la partida, la dama negra da muchos jaques, pero el rey blanco encuentra refugio entre sus propios peones (<span class=\"mv\">40.g4</span>). Cuando calcules una combinación que entrega material, comprueba siempre que tu rey podrá escapar de los jaques.</p>",
    "keyPoints": [
     "14...c4 eliminó la presión sobre d4 y liberó el centro blanco.",
     "Un peón pasado central apoyado por la dama vale tanto como una pieza."
    ],
    "positions": [
     {
      "fen": "rnbq1rk1/p4ppp/1p3n2/2pp4/3P4/P1PBP3/4NPPP/R1BQK2R w KQ - 0 10",
      "orientation": "black",
      "caption": "El cambio del alfil bueno y la jugada 14...c4.",
      "line": [
       "O-O",
       "Ba6",
       "Bxa6",
       "Nxa6",
       "Bb2",
       "Qd7",
       "a4",
       "Rfe8",
       "Qd3",
       "c4"
      ],
      "comments": [
       "Las blancas enrocan.",
       "Las negras ofrecen cambiar el alfil de casillas claras, el bueno de las blancas.",
       "Las blancas cambian.",
       "El caballo recaptura en el borde.",
       "El alfil de casillas negras queda detrás de los peones.",
       "Desarrollo.",
       "Las blancas ganan espacio.",
       "La torre ocupa la columna e.",
       "La dama se coloca en d3, desde donde apoya el futuro avance e4.",
       "Las negras cierran el flanco de dama. Ahora la presión sobre d4 desaparece y las blancas pueden avanzar en el centro con f3 y e4."
      ]
     },
     {
      "fen": "8/p6p/1p2Pnpk/3pQ2N/2pP4/qnP5/6PP/6K1 w - - 2 32",
      "orientation": "white",
      "caption": "Por qué las negras no tenían defensa: tras 31...Kh6, el peón también corona.",
      "line": [
       "Nxf6",
       "Qc1+",
       "Kf2",
       "Qd2+",
       "Kg3",
       "Qg5+",
       "Qxg5+",
       "Kxg5",
       "e7"
      ],
      "comments": [
       "El caballo elimina al defensor de e8.",
       "Jaques de la dama negra.",
       "El rey sale de la primera fila.",
       "Más jaques.",
       "El rey se acerca a sus peones.",
       "Las negras fuerzan el cambio de damas.",
       "Las blancas aceptan.",
       "Recaptura.",
       "El peón coronará en la siguiente jugada: las blancas tienen ventaja decisiva."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r3r1k1/p6p/1p3np1/3p4/q1pP1P2/1nP3N1/1B3QPP/4RRK1 w - - 0 24",
      "caption": "Juegan blancas (jugada 24): ¿cómo siguió Botvinnik su avance en el flanco de rey?",
      "line": [
       "f5",
       "Rxe1",
       "Rxe1"
      ],
      "comments": [
       "El peón avanza contra g6 y abre líneas hacia el rey negro.",
       "Las negras cambian un par de torres.",
       "Recapturas con la torre, no con la dama: la torre domina la columna e abierta y se prepara para Re6."
      ]
     },
     {
      "fen": "4r1k1/p6p/1p3np1/3p1P2/q1pP4/1nP3N1/1B3QPP/4R1K1 w - - 1 26",
      "caption": "Juegan blancas (jugada 26): ¿cómo convirtió Botvinnik su presión en un peón pasado?",
      "line": [
       "Re6",
       "Rxe6",
       "fxe6",
       "Kg7",
       "Qf4"
      ],
      "comments": [
       "La torre ocupa e6 y ataca a la vez el caballo de f6 y el peón de b6.",
       "Las negras cambian torres para no perder material.",
       "Recapturas con el peón: ahora tienes un peón pasado en e6, protegido y muy avanzado.",
       "El rey se acerca para defender f6 y frenar el peón.",
       "La dama se activa en la diagonal hacia c7 y prepara Qe5, centralizándose detrás del peón. Las blancas tienen gran ventaja."
      ]
     },
     {
      "fen": "6k1/p6p/1p2Pnp1/3pQ2N/2pP4/qnP5/6PP/6K1 w - - 2 32",
      "caption": "Juegan blancas (variante): tras 30...Qxa3 31.Nh5+, ¿qué pasa si el rey negro va a g8 en vez de capturar el caballo?",
      "line": [
       "Nxf6+",
       "Kf8",
       "Nxd5"
      ],
      "comments": [
       "El caballo come en f6 con jaque y elimina al defensor de la casilla de coronación.",
       "Si 32...Kg7, las blancas dan mate.",
       "El caballo come d5 y controla e7 y c7: el peón de e6 avanzará y las blancas tienen ventaja decisiva."
      ]
     },
     {
      "fen": "8/p6p/1p2Pnpk/3pQ2N/2pP4/qnP5/6PP/6K1 w - - 2 32",
      "caption": "Juegan blancas (variante): tras 30...Qxa3 31.Nh5+, ¿qué pasa si el rey negro va a h6?",
      "line": [
       "Nxf6",
       "Qc1+",
       "Kf2"
      ],
      "comments": [
       "Comes el caballo de f6, que controlaba e8 y d7: el peón de e6 tiene el camino libre.",
       "Las negras buscan jaques.",
       "El rey sale de la primera fila (33.Qe1?? Qxe1#). Las blancas escaparán de los jaques y coronarán."
      ]
     }
    ]
   },
   "p-siglo": {
    "html": "<h4>La apertura: la dama blanca pierde tiempo</h4><p>La partida empezó con una Grünfeld por transposición. Byrne jugó <span class=\"mv\">5.Bf4</span> y <span class=\"mv\">6.Qb3</span>, presionando d5, y tras <span class=\"mv\">6...dxc4 7.Qxc4</span> su dama quedó en el centro del tablero. Luego volvió a moverla con <span class=\"mv\">10.Qc5</span>: en diez jugadas, la dama blanca hizo tres movimientos y el alfil de f1 todavía no había salido. Fischer, en cambio, enrocó en la jugada 4 y fue colocando sus piezas sin prisa. Las piezas negras estaban listas para la acción cuando las blancas aún tenían el rey en e1.</p><h4>11...Na4: la táctica que nace del desarrollo</h4><p>La jugada <span class=\"mv\">11...Na4!</span> es el primer golpe de genio. El caballo ataca a c3 y deja una pieza «colgada», pero no se puede capturar: si <span class=\"mv\">12.Nxa4</span>, el caballo de f6 come en e4 y las blancas, con el rey en el centro, se enfrentan a amenazas en la columna e y contra su dama de c5. Byrne evitó la captura con <span class=\"mv\">12.Qa3</span>, pero tras <span class=\"mv\">12...Nxc3 13.bxc3 Nxe4</span> las negras ya habían ganado el peón central de e4, y el rey blanco seguía sin enrocar. El motor confirma que <span class=\"mv\">11...Na4</span> era claramente la mejor jugada.</p><h4>17...Be6: el sacrificio de dama como cálculo</h4><p>El famoso <span class=\"mv\">17...Be6!!</span> no es una apuesta: es el resultado de un cálculo preciso. Las negras entregan la dama a cambio de <b>un molino</b>, la repetición de jaques descubiertos del caballo y el alfil contra el rey blanco en f1 y g1. El caballo salta de c3 a e2, d4, e2 y c3 dando jaques descubiertos, y entre jaque y jaque las negras recogen material: el alfil de c4, el peón de d4, el alfil que había tomado la dama en b6 y la torre de d1. Al final, Fischer tiene torre, dos alfiles y un caballo contra la dama, y las piezas blancas están dispersas. Es la demostración de que <b>el valor de las piezas depende de su coordinación</b>: una dama sola no puede defender contra cuatro piezas que trabajan juntas.</p><h4>El final: técnica con piezas menores</h4><p>Después de la combinación, Fischer debía convertir su ventaja. Lo hizo con un método claro: evitar los jaques de la dama blanca (por ejemplo, <span class=\"mv\">34...Kg7</span>, que desclava el alfil de f8 y saca al rey de la octava fila), coordinar alfiles y caballo y empujar el peón pasado. Finalmente, la red de mate se cerró con <span class=\"mv\">41...Rc2#</span>. Aprendan de esta fase: <b>con ventaja material, primero se elimina el contrajuego</b> (los jaques del rival) y solo después se avanza.</p><h4>Preguntas para analizar la partida</h4><ul><li>¿Cuántos tiempos perdió la dama blanca en la apertura? ¿Qué hubiera pasado con el rey blanco enrocado?</li><li>¿Por qué el caballo de c3 era clave para defender e4?</li><li>En el molino, ¿por qué el rey blanco no puede escapar de la repetición de jaques?</li></ul>",
    "keyPoints": [
     "La dama blanca hizo tres jugadas en las diez primeras y el rey nunca enrocó.",
     "Con ventaja material, primero se elimina el contrajuego."
    ],
    "positions": [
     {
      "fen": "rnbq1rk1/ppppppbp/5np1/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 1 5",
      "orientation": "white",
      "caption": "La apertura: la dama blanca se mueve mientras las negras completan su desarrollo.",
      "line": [
       "Bf4",
       "d5",
       "Qb3",
       "dxc4",
       "Qxc4",
       "c6",
       "e4",
       "Nbd7",
       "Rd1",
       "Nb6"
      ],
      "comments": [
       "El alfil se desarrolla.",
       "Golpe central de la Grünfeld.",
       "La dama presiona d5.",
       "Las negras capturan y ganan un tiempo.",
       "Segunda jugada de la dama.",
       "Prepara ...b5 y controla d5.",
       "Las blancas construyen el centro.",
       "Desarrollo.",
       "La torre apoya d4, pero el rey sigue en el centro.",
       "El caballo ataca a la dama: ella tendrá que moverse por tercera vez."
      ]
     },
     {
      "fen": "r2q1rk1/pp2ppbp/2p3p1/6B1/3Pn1b1/Q1P2N2/P4PPP/3RKB1R w K - 0 14",
      "orientation": "white",
      "caption": "La codicia de Byrne: 14.Bxe7 gana la calidad, pero abre la columna e contra su propio rey.",
      "line": [
       "Bxe7",
       "Qb6",
       "Bc4",
       "Nxc3",
       "Bc5"
      ],
      "comments": [
       "El alfil come en e7 atacando la torre de f8.",
       "Las negras no defienden: contraatacan contra d4 y b2.",
       "Desarrollo; el rey sigue en e1.",
       "El caballo ataca la torre de d1 y deja la columna e abierta.",
       "Las blancas atacan a la dama. Ahora llegará 16...Rfe8+ y la famosa 17...Be6."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r2q1rk1/pp2ppbp/1np2np1/2Q3B1/3PP1b1/2N2N2/PP3PPP/3RKB1R b K - 6 11",
      "caption": "Juegan negras (jugada 11): ¿cuál fue la jugada genial de Fischer y cómo continuó?",
      "line": [
       "Na4",
       "Qa3",
       "Nxc3",
       "bxc3",
       "Nxe4"
      ],
      "comments": [
       "El caballo ataca a la dama de c5 y al caballo de c3. No se puede capturar: 12.Nxa4 Nxe4 deja a las blancas en grandes problemas.",
       "La dama se retira a a3, fuera del ataque.",
       "Cambias el caballo que defendía e4.",
       "Recapturar es obligado.",
       "Ganas el peón central: el caballo ataca c3 y el alfil de g5, y el rey blanco sigue sin enrocar."
      ]
     },
     {
      "fen": "r2q1rk1/pp2ppbp/2p2np1/2Q3B1/N2PP1b1/5N2/PP3PPP/3RKB1R b K - 0 12",
      "caption": "Juegan negras (variante): ¿qué pasaba si Byrne capturaba el caballo con 12.Nxa4?",
      "line": [
       "Nxe4"
      ],
      "comments": [
       "El otro caballo come en e4 y ataca a la dama de c5 y al alfil de g5. Con el rey blanco en e1, las negras recuperan la pieza con gran ventaja."
      ]
     },
     {
      "fen": "r3r1k1/pp3pbp/1Bp1b1p1/8/2BP4/Q1n2N2/P4PPP/3R1K1R b - - 0 18",
      "caption": "Juegan negras (jugada 18): Byrne acaba de tomar la dama en b6. ¿Cómo empezó Fischer el molino?",
      "line": [
       "Bxc4+",
       "Kg1",
       "Ne2+"
      ],
      "comments": [
       "El alfil come en c4 con jaque.",
       "La retirada más razonable; 19.Rd3 entregaba material sin resolver nada.",
       "Jaque de caballo. Tras 20.Kf1, cada salto del caballo dará jaque descubierto del alfil de c4, y así Fischer recogerá material."
      ]
     },
     {
      "fen": "1Q3bk1/5p2/2p3p1/1p1bN2p/4n2P/8/r5PK/8 b - - 1 34",
      "caption": "Juegan negras (jugada 34): con gran ventaja material, ¿qué jugada tranquila elimina el contrajuego blanco?",
      "line": [
       "Kg7"
      ],
      "comments": [
       "El rey desclava el alfil de f8 (clavado por la dama de b8) y sale de la octava fila, donde podía recibir jaques. Ahora el alfil queda libre y las piezas negras pueden coordinarse."
      ]
     }
    ]
   },
   "p-kasparov-topalov": {
    "html": "<h4>La apertura: enroques opuestos</h4><p>Kasparov respondió a la Pirc con un esquema agresivo: <span class=\"mv\">Be3</span>, <span class=\"mv\">Qd2</span>, <span class=\"mv\">f3</span> y <span class=\"mv\">Bh6</span> para cambiar el alfil de g7, el mejor defensor del rey negro en un fianchetto. Topalov reaccionó con <span class=\"mv\">6...b5</span> y luego enrocó largo, de modo que ambos reyes terminaron en el flanco de dama. Es una situación poco habitual: los peones de b5 y a6, que las negras avanzaron para ganar espacio, quedaron delante de su propio rey como objetivos.</p><h4>La lógica del sacrificio de torre</h4><p><span class=\"mv\">24.Rxd4!!</span> no gana material por la fuerza; su objetivo es <b>abrir líneas</b>. Tras <span class=\"mv\">24...cxd4 25.Re7+</span> la torre blanca entra en la séptima fila con jaque, el rey negro tiene que avanzar a b6 y luego, tras <span class=\"mv\">26.Qxd4+ Kxa5 27.b4+</span>, queda en a4, rodeado de piezas blancas. La jugada más difícil de ver es <span class=\"mv\">28.Qc3!</span>: no da jaque, pero cierra la casilla b3 y prepara <span class=\"mv\">Ra7</span>, que amenaza mate. Con el rey negro tan expuesto, las blancas siempre tienen jaques o amenazas a mano.</p><h4>Lo que muestran los motores</h4><p>El análisis con computadora indica que la combinación no era una victoria forzada desde el principio: con una defensa perfecta las negras podían mantener la partida cerca del equilibrio en varios momentos. Pero en la práctica, defenderse de una caza así sobre el tablero es casi imposible. Tras <span class=\"mv\">36.Bf1 Rd2</span> llegó el golpe final, <span class=\"mv\">37.Rd7!</span>, una desviación que gana: si la torre negra captura en d7, el alfil come la dama en c4 y la dama blanca recoge la torre de h8.</p><h4>Ideas para tu propio juego</h4><ul><li>En una caza de rey, las <b>jugadas tranquilas</b> que quitan casillas (<span class=\"mv\">28.Qc3</span>, <span class=\"mv\">36.Bf1</span>) son tan importantes como los jaques.</li><li>Cuando el rey rival avanza hacia tu campo, cada una de tus piezas y peones (incluso <span class=\"mv\">c3+</span> o <span class=\"mv\">b4+</span>) puede convertirse en atacante.</li><li>Al final de una combinación larga, comprueba que la posición resultante sea técnicamente ganada: aquí, dama contra torre con peones.</li></ul><h4>La técnica del final</h4><p>Después de <span class=\"mv\">39.Qxh8</span> las blancas tienen dama contra torre, pero todavía hay que ganar. El plan es el de siempre en estos finales: primero <b>asegurar el propio rey</b> (las blancas tienen que cuidarse de los jaques de torre y del peón pasado negro de la columna c), luego <b>coordinar dama y rey</b> y finalmente atacar los peones rivales uno por uno. La dama sola no puede ganar si su rey está expuesto; por eso Kasparov combinó jaques con jugadas de rey y de peón.</p><h4>Preguntas para analizar la partida</h4><ol><li>¿Por qué el rey negro no pudo quedarse en b6 o a7 tras <span class=\"mv\">25.Re7+</span>?</li><li>¿Qué amenaza crea <span class=\"mv\">28.Qc3</span> si las negras no reaccionan?</li><li>En la jugada 37, ¿qué pieza negra queda sobrecargada?</li></ol>",
    "keyPoints": [
     "24.Rxd4 abre líneas; no gana material por la fuerza.",
     "Las jugadas tranquilas que quitan casillas al rey son tan importantes como los jaques."
    ],
    "positions": [
     {
      "fen": "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
      "orientation": "white",
      "caption": "La apertura: Kasparov busca cambiar el alfil de g7.",
      "line": [
       "Be3",
       "Bg7",
       "Qd2",
       "c6",
       "f3",
       "b5",
       "Nge2",
       "Nbd7",
       "Bh6",
       "Bxh6"
      ],
      "comments": [
       "Esquema agresivo contra la Pirc.",
       "Fianchetto.",
       "La dama apoya Bh6.",
       "Prepara ...b5.",
       "Protege e4.",
       "Las negras ganan espacio en el flanco de dama, donde luego estará su rey.",
       "Desarrollo flexible.",
       "Desarrollo.",
       "El alfil se ofrece al cambio por el defensor negro de casillas oscuras.",
       "Las negras cambian; tras 9.Qxh6 el rey negro pierde su mejor defensor de las casillas oscuras."
      ]
     },
     {
      "fen": "b2r3r/k3qp1p/pn3np1/Nppp4/4PQ2/P1N2PPB/1PP4P/1K1R3R w - - 2 21",
      "orientation": "white",
      "caption": "La preparación del sacrificio: las blancas colocan sus torres en las columnas centrales.",
      "line": [
       "Rhe1",
       "d4",
       "Nd5",
       "Nbxd5",
       "exd5",
       "Qd6",
       "Rxd4"
      ],
      "comments": [
       "La torre ocupa la columna e.",
       "Las negras ganan espacio en el centro.",
       "El caballo se ofrece al cambio para abrir la columna e.",
       "Las negras capturan.",
       "Las blancas recapturan; ahora la columna e está abierta.",
       "La dama se aparta de la columna e y bloquea el peón de d5.",
       "¡El sacrificio! Comienza la caza del rey."
      ]
     }
    ],
    "drills": [
     {
      "fen": "b2r3r/k4p1p/p2q1np1/Np1P4/3p1Q2/P4PPB/1PP4P/1K2R3 w - - 0 25",
      "caption": "Juegan blancas (jugada 25): la torre ya se sacrificó en d4. ¿Cómo siguió Kasparov la caza del rey?",
      "line": [
       "Re7+",
       "Kb6",
       "Qxd4+",
       "Kxa5",
       "b4+",
       "Ka4",
       "Qc3"
      ],
      "comments": [
       "La torre entra en la séptima fila con jaque.",
       "La mejor defensa; 25...Kb8 permite un ataque aún más fuerte.",
       "La dama come con jaque y se suma al ataque.",
       "El rey captura el caballo y avanza; 26...Qc5 era peor.",
       "El peón da jaque y empuja al rey hacia adelante.",
       "El rey avanza a a4; tomar el peón con 27...Qxb4+ permitía mate.",
       "¡La jugada tranquila! Cierra la casilla b3 y prepara Ra7 con amenazas de mate. El motor la considera la mejor, aunque la posición sigue siendo muy compleja."
      ]
     },
     {
      "fen": "3r3r/1R3p1p/p4np1/1p6/kPq5/P1Q2PPB/2P4P/1K6 w - - 1 31",
      "caption": "Juegan blancas (jugada 31): ¿cómo continuó Kasparov la persecución?",
      "line": [
       "Qxf6",
       "Kxa3",
       "Qxa6+"
      ],
      "comments": [
       "La dama come el caballo, el defensor más importante, y abre la sexta fila.",
       "El rey sigue avanzando y come otro peón (31...Rd1+ tenía un valor parecido).",
       "Jaque: la dama persigue al rey, que tendrá que seguir huyendo hacia el campo blanco."
      ]
     },
     {
      "fen": "3r3r/1R3p1p/Q5p1/1p6/2q5/2k2PPB/7P/1K6 w - - 0 34",
      "caption": "Juegan blancas (jugada 34): el rey negro está en c3. ¿Cómo lo empujó Kasparov hasta la primera fila?",
      "line": [
       "Qa1+",
       "Kd2",
       "Qb2+",
       "Kd1",
       "Bf1"
      ],
      "comments": [
       "Jaque desde a1: el rey negro sigue avanzando hacia el campo blanco.",
       "El rey no puede volver: 34...Kb4 permitía un ataque decisivo.",
       "Otro jaque que lo empuja a la primera fila.",
       "En e1 el rey estaría todavía peor.",
       "¡Jugada tranquila! El alfil ataca a la dama de c4 y prepara jaques descubiertos. Con la mejor defensa el motor ve la posición cerca del equilibrio, pero las negras tienen que encontrar jugadas muy precisas."
      ]
     },
     {
      "fen": "7r/1R3p1p/6p1/1p6/2q5/5PP1/1Q1r3P/1K1k1B2 w - - 6 37",
      "caption": "Juegan blancas (jugada 37): tras 36...Rd2, ¿cuál es el golpe que decide?",
      "line": [
       "Rd7",
       "Rxd7",
       "Bxc4"
      ],
      "comments": [
       "La torre se coloca en la columna d, frente a la torre negra: si esta la captura, la dama negra queda sin defensa.",
       "Las negras capturan; otras jugadas permiten mate.",
       "El alfil come la dama. Tras 38...bxc4 39.Qxh8 las blancas tienen dama contra torre y ganan."
      ]
     }
    ]
   },
   "p-deepblue-kasparov": {
    "html": "<h4>El contexto del match</h4><p>El match de 1997 se jugó a seis partidas. Deep Blue ganó la segunda, Kasparov la primera, y las partidas 3, 4 y 5 terminaron en tablas, de modo que la sexta partida decidía el match. Kasparov, que normalmente jugaba la Siciliana o la India de Rey, eligió la Caro-Kann, una apertura sólida que no solía usar. La idea era evitar las posiciones abiertas en las que la computadora calculaba mejor, pero esa elección lo llevó a un terreno que conocía menos.</p><h4>El orden de jugadas: 7...h6 y 8.Nxe6</h4><p>En la variante de la partida (<span class=\"mv\">4...Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3</span>), el caballo blanco de g5 está atacado de forma indirecta y las negras suelen jugar primero <span class=\"mv\">7...Bd6</span>. El orden con <span class=\"mv\">7...h6</span> permite el sacrificio <span class=\"mv\">8.Nxe6!</span>: tras <span class=\"mv\">8...Qe7 9.O-O fxe6 10.Bg6+ Kd8</span> las blancas tienen solo un peón por la pieza y, sobre todo, un rey negro que ya nunca podrá enrocar. El sacrificio era conocido en la teoría, y por eso sorprendió tanto que Kasparov lo permitiera.</p><h4>La compensación a largo plazo</h4><p>Después del sacrificio, la posición negra tiene varios problemas que no se resuelven con el tiempo:</p><ul><li>El <b>alfil de f8 y la torre de h8</b> no pueden salir fácilmente: la dama en e7 y el peón de e6 les cierran el paso.</li><li>El <b>rey en d8 y luego c8</b> está en el centro de las líneas que las blancas van a abrir (columnas c y e, diagonal b1-h7).</li><li>El <b>alfil blanco de g6</b> molesta al rey y frena el desarrollo negro y el otro alfil, desde f4 o g3, controla la diagonal h2-b8.</li></ul><p>Las blancas no necesitan prisa: <span class=\"mv\">11.Bf4</span>, <span class=\"mv\">12.a4</span>, <span class=\"mv\">13.Re1</span> y <span class=\"mv\">14.Bg3</span> mejoran las piezas una a una. Cuando todo está listo, <span class=\"mv\">17.Bf5!</span> y <span class=\"mv\">18.Rxe7</span> devuelven material para abrir la posición, y <span class=\"mv\">19.c4</span> abre la última línea.</p><h4>Qué enseña esta partida</h4><ol><li>En la preparación de aperturas, <b>el orden de las jugadas</b> puede ser tan importante como las jugadas mismas.</li><li>Una pieza de ventaja no sirve si dos piezas propias no pueden entrar en juego: cuenten las piezas activas, no solo el material.</li><li>Ante un sacrificio que deja tu rey en el centro, la prioridad es <b>devolver material</b> si con eso consigues enrocar o coordinar tus piezas.</li></ol><h4>Preguntas para analizar la partida</h4><ol><li>¿Por qué <span class=\"mv\">9.O-O</span> antes de recuperar material fue más fuerte que buscar ganancias inmediatas?</li><li>¿Qué piezas negras no llegaron a jugar en toda la partida?</li><li>Tras <span class=\"mv\">19.c4</span>, ¿qué líneas se abren contra el rey negro en c8?</li></ol><p>Desde el punto de vista histórico, la partida marcó un antes y un después: en la década siguiente los programas de ajedrez para computadoras personales pasaron a jugar más fuerte que cualquier humano, y hoy todos los jugadores, desde aficionados hasta campeones, los usan para preparar aperturas y analizar sus partidas.</p>",
    "keyPoints": [
     "El orden de jugadas importa: 7...h6 permitió 8.Nxe6.",
     "Cuenten las piezas activas, no solo el material."
    ],
    "positions": [
     {
      "fen": "rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4",
      "orientation": "white",
      "caption": "El orden de jugadas: 7...h6 permite el sacrificio en e6.",
      "line": [
       "Nd7",
       "Ng5",
       "Ngf6",
       "Bd3",
       "e6",
       "N1f3",
       "h6",
       "Nxe6"
      ],
      "comments": [
       "La variante Karpov de la Caro-Kann.",
       "El caballo apunta a f7 y e6.",
       "Desarrollo.",
       "El alfil apunta a h7.",
       "Abre el alfil de f8.",
       "El otro caballo se desarrolla.",
       "Lo habitual es 7...Bd6. Esta jugada permite el sacrificio.",
       "¡El sacrificio! El caballo come en e6 y el rey negro quedará en el centro."
      ]
     },
     {
      "fen": "r1bk1b1r/pp1nq1p1/2p1pnBp/8/3P4/5N2/PPP2PPP/R1BQ1RK1 w - - 2 11",
      "orientation": "white",
      "caption": "La compensación a largo plazo: las blancas mejoran sus piezas sin prisa.",
      "line": [
       "Bf4",
       "b5",
       "a4",
       "Bb7",
       "Re1",
       "Nd5",
       "Bg3",
       "Kc8",
       "axb5",
       "cxb5"
      ],
      "comments": [
       "El alfil ocupa la diagonal h2-b8.",
       "Las negras ganan espacio.",
       "Las blancas atacan la cadena de peones.",
       "El alfil se desarrolla.",
       "La torre ocupa la columna e.",
       "El caballo bloquea en d5.",
       "El alfil se retira manteniendo la diagonal.",
       "El rey busca refugio en c8.",
       "Las blancas abren la columna a.",
       "Las negras recapturan; las blancas preparan Qd3 y Bf5."
      ]
     }
    ],
    "drills": [
     {
      "fen": "r1bqkb1r/pp1n2p1/2p1pn1p/8/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 0 9",
      "caption": "Juegan blancas (variante): ¿y si Kasparov hubiera capturado el caballo de inmediato con 8...fxe6?",
      "line": [
       "Bg6+",
       "Ke7",
       "Bf4"
      ],
      "comments": [
       "Jaque: el rey negro pierde el enroque y tiene que salir a e7.",
       "Única casilla.",
       "El alfil ocupa la diagonal h2-b8 y apunta a c7 y d6: las blancas tienen un ataque duradero por la pieza."
      ]
     },
     {
      "fen": "r1b1kb1r/pp1nqpp1/2p1Nn1p/8/3P4/3B1N2/PPP2PPP/R1BQK2R w KQkq - 1 9",
      "caption": "Juegan blancas (jugada 9): el caballo de e6 está atacado. ¿Qué jugó Deep Blue?",
      "line": [
       "O-O",
       "fxe6",
       "Bg6+"
      ],
      "comments": [
       "Antes de recuperar nada, pones el rey a salvo y preparas Re1 contra la columna e.",
       "Las negras toman el caballo.",
       "Jaque: el rey negro debe ir a d8 y ya nunca podrá enrocar. Así jugó Deep Blue."
      ]
     },
     {
      "fen": "r2k1b1r/pb1nq1p1/2p1p1Bp/1p1n4/P2P1B2/5N2/1PP2PPP/R2QR1K1 w - - 3 14",
      "caption": "Juegan blancas (jugada 14): el caballo negro de d5 ataca al alfil de f4. ¿Dónde lo colocó Deep Blue?",
      "line": [
       "Bg3"
      ],
      "comments": [
       "El alfil se retira a g3 y sigue en la diagonal h2-b8, controlando c7 y d6 y apoyando la presión contra el rey negro. Las otras retiradas abandonan esa diagonal."
      ]
     },
     {
      "fen": "r1k4r/p2nb1p1/2b4p/3n1p2/2pP4/3Q1NB1/1P3PPP/R5K1 w - - 0 20",
      "caption": "Juegan blancas (variante): Kasparov abandonó tras 19.c4. Si hubiera seguido con 19...bxc4, ¿cómo ganaban las blancas?",
      "line": [
       "Qxc4",
       "Nb4",
       "Re1"
      ],
      "comments": [
       "La dama recaptura y apunta a c6 y e6, con el rey negro en la columna c abierta.",
       "El caballo salta a b4 para proteger c6 y tapar líneas.",
       "La torre entra en la columna e: amenaza Rxe7 y las negras no pueden sostener su posición."
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
