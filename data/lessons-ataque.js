/* Lecciones de ataque al rey: principios, sacrificios típicos, estructuras, patrones de mate y defensa — contenido de redacción propia. */
(window.LESSONS = window.LESSONS || []).push(

  /* ───────────── PRINCIPIOS DEL ATAQUE ───────────── */
  { id: 'a-cuando-atacar', area: 'ataque', category: 'Principios del ataque', title: '¿Cuándo se puede atacar al rey?', level: 'principiante',
    summary: 'Un ataque al rey no nace del deseo de atacar, sino de condiciones concretas en la posición: ventaja de desarrollo, piezas apuntando al enroque y debilidades en la defensa.',
    html: '<p>Muchos jugadores de club lanzan la dama y un caballo contra el rey rival en cuanto pueden. A veces funciona contra rivales despistados, pero contra una defensa correcta ese ataque se desinfla y deja piezas mal colocadas. La pregunta correcta no es <i>"¿puedo atacar?"</i> sino <i>"¿la posición me autoriza a atacar?"</i>. Steinitz ya lo formuló: el ataque es la recompensa de una ventaja previa, no su sustituto.</p>' +
      '<h4>Las tres condiciones clásicas</h4>' +
      '<ul><li><b>Ventaja de desarrollo:</b> si tienes dos o tres piezas más en juego que el rival, durante unas jugadas eres más fuerte en el sector donde se decide la partida. Esa ventaja es temporal: si no se usa, el rival termina de desarrollarse y desaparece.</li>' +
      '<li><b>Piezas apuntando al rey:</b> alfiles en diagonales hacia h7 o g7, caballos que pueden saltar a g5, f5 o e5, una torre que puede elevarse por la tercera fila, la dama cerca del flanco de rey. Cuantas más piezas participan, más probable es que el ataque sea correcto. Una regla práctica: ataca con al menos una pieza más de las que defienden.</li>' +
      '<li><b>Debilidades en el enroque:</b> peones avanzados (h6, g6, f6), casillas oscuras sin el alfil que las defendía, falta del caballo de f6, una columna abierta hacia el rey.</li></ul>' +
      '<h4>Lo que no autoriza un ataque</h4>' +
      '<p>Sacar la dama pronto para "amenazar algo" no es atacar: el rival responde desarrollando piezas con ganancia de tiempo. Tampoco lo es avanzar peones del propio enroque sin que el centro esté cerrado o controlado. Un <b>centro abierto e inestable</b> es el mayor enemigo de un ataque de flanco: el defensor contraataca por el medio y el atacante se queda con el rey debilitado.</p>' +
      '<h4>Cómo decidirlo en la partida</h4>' +
      '<p>Cuenta piezas: cuántas tuyas pueden llegar al rey en dos o tres jugadas y cuántas defensoras hay. Mira el centro: si está cerrado o lo controlas, el ataque tiene vía libre. Busca la debilidad concreta que vas a explotar. Si no encuentras ninguna de las tres condiciones, lo correcto suele ser mejorar la posición y esperar.</p>',
    keyPoints: ['Ataca cuando la posición lo justifica: ventaja de desarrollo, piezas dirigidas al rey o debilidades concretas.', 'Ataca con más piezas de las que defienden.', 'Un centro abierto e inestable castiga los ataques de flanco prematuros.', 'La ventaja de desarrollo es temporal: hay que usarla antes de que desaparezca.'],
    positions: [
      { fen: 'rnbqkbnr/pppp1ppp/8/8/2B1P3/8/PB3PPP/RN1QK1NR b KQkq - 0 5', orientation: 'white',
        caption: 'Gambito Danés: las blancas han entregado dos peones a cambio de dos alfiles activos que apuntan a f7 y g7. Es una ventaja de desarrollo pura.',
        line: ['Nf6', 'Nc3', 'd5', 'Bxd5'],
        comments: ['Las negras desarrollan.', 'Otra pieza más en juego para las blancas.', 'La defensa recomendada: devolver un peón para abrir líneas para sus propias piezas y frenar el ataque.', 'Las blancas recuperan un peón; la partida queda equilibrada pero viva.'],
        arrows: [['c4', 'f7', 'r'], ['b2', 'g7', 'r']] },
      { fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2', orientation: 'white',
        caption: 'Ataque prematuro: la dama sale sin apoyo y acaba perdiendo tiempo.',
        line: ['Qh5', 'Nc6', 'Bc4', 'g6', 'Qf3', 'Nf6'],
        comments: ['Amenaza f7 y e5, pero solo con una pieza.', 'Defiende e5 desarrollando.', 'Ahora la amenaza es Qxf7#.', 'Cubre f7 echando a la dama.', 'Vuelve a amenazar f7.', 'Defensa sencilla con otra pieza nueva. La dama blanca está mal situada y bloquea a su caballo de g1: las negras ya tienen la iniciativa.'] },
      { fen: 'r4rk1/1b2bppp/ppq1pn2/2ppB3/5P2/1P1BP1N1/P1PPQ1PP/R4RK1 w - - 0 14', orientation: 'white',
        caption: 'Lasker–Bauer (Ámsterdam, 1889), antes del ataque: dos alfiles hacia el enroque, caballo listo para saltar a h5, dama y torre cerca. Todas las condiciones se cumplen.',
        line: ['Nh5', 'Nxh5'],
        comments: ['Elimina al caballo de f6, el mejor defensor del enroque.', 'Ahora llega la famosa combinación con los dos alfiles (ver la lección del doble sacrificio).'],
        arrows: [['d3', 'h7', 'r'], ['e5', 'g7', 'r']] }
    ] },

  { id: 'a-rey-centro', area: 'ataque', category: 'Principios del ataque', title: 'Atacar al rey en el centro', level: 'intermedio',
    summary: 'Un rey que no ha enrocado es el blanco más vulnerable: abre el centro, sacrifica material si hace falta para impedir el enroque y lleva las torres a las columnas abiertas.',
    html: '<p>Cuando un rey se queda en e8 (o e1) mientras el centro se abre, cada columna central se convierte en una autopista hacia él. Las torres, que en la apertura apenas participan, entran en juego por las columnas d y e, y los alfiles atacan las casillas vecinas al rey. Por eso los jugadores fuertes valoran tanto <b>impedir el enroque rival</b>: a menudo vale un peón o incluso una pieza.</p>' +
      '<h4>Abrir líneas</h4>' +
      '<p>La herramienta principal son las <b>rupturas centrales</b> (<span class="mv">d4</span>, <span class="mv">e5</span>, <span class="mv">d5</span>) y los cambios que despejan las columnas. Si el rey está en el centro y las columnas d y e están cerradas, el rey está relativamente seguro; tu trabajo es abrirlas aunque cueste material. Un peón entregado para abrir la columna e frente al rey suele ser una inversión excelente.</p>' +
      '<h4>Sacrificios para impedir el enroque</h4>' +
      '<ul><li>Sacrificar en <b>f7</b> o <b>e6</b> para desplazar al rey y que pierda el derecho a enrocar.</li>' +
      '<li>Clavar o controlar las casillas de paso: un alfil en <b>a3</b> o <b>b4</b> que domine f8 (o f1) impide el enroque corto aunque el rey no se haya movido.</li>' +
      '<li>Dar jaques que obliguen al rey a moverse: aunque no gane material, el rey pierde el enroque y queda expuesto.</li></ul>' +
      '<h4>Coordinar las piezas pesadas</h4>' +
      '<p>El remate casi siempre llega con las torres. Enrocar largo, por ejemplo, coloca de golpe una torre en la columna d. En la partida Réti–Tartakower (Viena, 1910) las blancas sacrificaron la dama para aprovechar esa torre y el alfil: el rey negro, todavía en el centro, no tuvo escapatoria. En la Partida de la Ópera (Morphy, 1858) ocurre algo parecido: una pieza entregada en b5 abre la diagonal y la columna d, y las torres hacen el resto.</p>' +
      '<h4>Consejo práctico</h4>' +
      '<p>Si tu rival se retrasa en enrocar, pregúntate en cada jugada qué columna o diagonal puedes abrir. Si eres tú quien no ha enrocado, no abras el centro y enroca cuanto antes.</p>',
    keyPoints: ['El rey en el centro es vulnerable en cuanto se abren las columnas d y e.', 'Merece la pena sacrificar material para impedir el enroque rival.', 'Las torres en columnas abiertas suelen dar el golpe final.', 'Si tu rey sigue en el centro, mantén el centro cerrado y enroca.'],
    positions: [
      { fen: 'rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq b6 0 10', orientation: 'white',
        caption: 'Partida de la Ópera (Morphy–duque de Brunswick e Isouard, París, 1858). El rey negro sigue en el centro y las blancas tienen todas sus piezas desarrolladas.',
        line: ['Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8', 'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#'],
        comments: ['Sacrificio para abrir líneas contra el rey en el centro.', '', 'Jaque, y el caballo de d7 queda clavado.', '', 'Enroque largo: la torre llega a la columna d con tempo.', '', 'Elimina un defensor.', '', 'Otra torre a la columna abierta.', '', '', '', '¡Sacrificio de dama para desviar el caballo!', '', 'Mate con torre y alfil. El rey nunca pudo enrocar.'],
        arrows: [['c3', 'b5', 'r']] },
      { fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9', orientation: 'white',
        caption: 'Réti–Tartakower (Viena, 1910). Las negras acaban de ganar un caballo con 8...Nxe4, pero su rey sigue en e8 frente a la torre de d1.',
        line: ['Qd8+', 'Kxd8', 'Bg5+', 'Kc7', 'Bd8#'],
        comments: ['¡Sacrificio de dama! Atrae al rey a la columna d.', 'Forzado.', 'Jaque doble: del alfil y de la torre de d1.', 'Si 10...Ke8, 11.Rd8#.', 'Mate: el alfil está protegido por la torre.'],
        arrows: [['d1', 'd8', 'r']] }
    ],
    practice: { fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9', goal: 'mate', side: 'w',
      text: 'Réti–Tartakower: el rey negro sigue en el centro. Encuentra el mate en tres jugadas.' } },

  { id: 'a-tormenta-peones', area: 'ataque', category: 'Principios del ataque', title: 'La tormenta de peones: abrir columnas con g y h', level: 'intermedio',
    summary: 'Con enroques opuestos, los peones g y h avanzan para expulsar a los defensores y abrir columnas contra el rey. Técnica: crear un gancho, decidir qué columna abrir y no perder tiempo.',
    html: '<p>La idea general de los enroques opuestos (cada bando ataca por su flanco) se trata en otra lección. Aquí nos centramos en la <b>técnica</b>: cómo se usan concretamente los peones g y h para abrir líneas, y qué errores hay que evitar.</p>' +
      '<h4>1. Expulsar al defensor</h4>' +
      '<p>El primer objetivo del peón g suele ser el <b>caballo de f6</b>, el mejor defensor del enroque (cubre h7, h5, g4 y d5). Con <span class="mv">g4-g5</span> el caballo tiene que irse a d7, h5 o e8, casillas donde defiende mucho peor. Cada salto forzado es un tempo ganado para el atacante.</p>' +
      '<h4>2. Crear un gancho</h4>' +
      '<p>Para abrir una columna hace falta un peón enemigo contra el que chocar: un <b>gancho</b>. Si el defensor juega ...h6, el peón g encuentra su gancho (g4-g5 y gxh6 o ...hxg5 abren la columna g o la h). Si juega ...g6, el gancho lo encuentra el peón h (h4-h5 y hxg6). Si el defensor no mueve ningún peón, el atacante a veces sacrifica un peón (h5-h6 o g5-g6) para forzar la apertura.</p>' +
      '<h4>3. Abrir la columna correcta</h4>' +
      '<p>Antes de cambiar peones, piensa qué columna quedará abierta y si tus torres pueden llegar a ella. Una columna abierta sin torre detrás no sirve de nada. La torre de h1 está ya en su sitio para la columna h; para la g se suele jugar <span class="mv">Rg1</span> o <span class="mv">Rdg1</span>.</p>' +
      '<h4>4. El tiempo lo es todo</h4>' +
      '<ul><li>No cierres la posición: si el defensor puede responder a g5 con ...h5 y bloquear, el ataque se detiene.</li>' +
      '<li>Una jugada de defensa en tu flanco solo está justificada si sin ella pierdes antes de llegar.</li>' +
      '<li>Un peón sacrificado que abre una columna vale más que el peón.</li></ul>' +
      '<p>A veces el peón f se une a la tormenta (<span class="mv">f4-f5</span>) para atacar el peón e6 y abrir otra línea más: cuantas más palancas, más difícil es defender.</p>',
    keyPoints: ['g4-g5 expulsa al caballo de f6, el defensor principal.', 'Para abrir una columna hace falta un gancho: un peón enemigo avanzado (h6, g6).', 'Abre solo columnas a las que tus torres puedan llegar.', 'Evita que el rival bloquee: un ataque cerrado es un ataque muerto.'],
    pros: ['Los peones son las piezas más baratas: perder uno para abrir líneas cuesta poco.', 'Con enroques opuestos el avance no debilita al propio rey.'],
    cons: ['Si el ataque se frena, los peones avanzados son debilidades en el final.', 'Exige calcular la carrera de tempos con el contraataque rival.'],
    positions: [
      { fen: 'r2qkb1r/1b1n1ppp/p2ppn2/1p6/3NP1P1/2N1BP2/PPPQ3P/R3KB1R w KQkq - 1 10', orientation: 'white',
        caption: 'Ataque Inglés contra la Siciliana Najdorf. El peón g ya está en g4: toca expulsar al caballo de f6.',
        line: ['g5', 'Nh5', 'O-O-O', 'Be7', 'Kb1'],
        comments: ['El caballo pierde su casilla ideal.', 'En h5 el caballo queda en el borde, lejos del centro.', 'Enroques opuestos: ahora los peones del flanco de rey avanzan sin miedo.', '', 'Jugada profiláctica habitual antes de seguir con f4-f5 o con Be2 para cambiar el caballo de h5.'],
        arrows: [['g4', 'g5', 'g'], ['g5', 'f6', 'r']] },
      { fen: '2rqkb1r/1b1n1p1p/p2pp1p1/1p4Pn/1P1NP3/P1N1BP2/2PQB2P/2KR3R w k - 1 15', orientation: 'white',
        caption: 'Misma estructura unas jugadas después. Las negras han jugado ...g6 para asegurar el caballo; las blancas usan el peón f como nueva palanca.',
        line: ['f4', 'Bg7', 'f5'],
        comments: ['Prepara f5 y quita la casilla f4 al caballo de h5.', '', 'Palanca contra e6: se abren la columna f y la diagonal hacia e6. Las blancas quedan con ventaja.'],
        arrows: [['f4', 'f5', 'g'], ['f5', 'e6', 'r']] }
    ] },

  /* ───────────── SACRIFICIOS TÍPICOS ───────────── */
  { id: 'a-sac-f7', area: 'ataque', category: 'Sacrificios típicos', title: 'El sacrificio en f7 (y f2)', level: 'principiante',
    summary: 'f7 es la casilla más débil al inicio de la partida: solo la defiende el rey. Sacrificar ahí saca al rey de su refugio o desvía su defensa.',
    html: '<p>En la posición inicial, el peón de <b>f7</b> (f2 para las blancas) solo está protegido por el rey. Por eso tantas trampas de apertura y tantos ataques tempranos se dirigen a esa casilla. Incluso después del enroque, f7 sigue siendo un punto sensible: está junto al rey y suele ser el blanco del alfil de c4 y del caballo de g5.</p>' +
      '<h4>Tipos de sacrificio en f7</h4>' +
      '<ul><li><b>Para sacar al rey:</b> <span class="mv">Nxf7</span> o <span class="mv">Bxf7+</span> obligan al rey a capturar y salir al centro, donde las demás piezas lo persiguen con jaques. El ejemplo más famoso es el ataque <i>Fegatello</i> (hígado frito) en la defensa de los Dos Caballos.</li>' +
      '<li><b>Para desviar:</b> <span class="mv">Bxf7+ Kxf7</span> y luego se gana algo que el rey defendía, por ejemplo la dama en d8 por la columna d o una pieza con un jaque doble.</li>' +
      '<li><b>Para impedir el enroque:</b> aunque el sacrificio no dé mate, el rey que ha capturado en f7 ya no puede enrocar.</li></ul>' +
      '<h4>El mismo golpe en f2</h4>' +
      '<p>Las negras pueden hacer lo mismo con <span class="mv">Bxf2+</span>. En la variante Traxler (Wilkes-Barre) de los Dos Caballos, las negras ignoran la amenaza en f7 y contraatacan en f2: tras <span class="mv">Kxf2 Nxe4+</span> el rey blanco queda al descubierto y la lucha se vuelve muy aguda.</p>' +
      '<h4>Antes de sacrificar, comprueba</h4>' +
      '<ol><li>¿Cuántas piezas pueden seguir al rey después del sacrificio? Con una sola, el ataque suele fracasar.</li>' +
      '<li>¿Tiene el rey una ruta de huida segura hacia el otro flanco?</li>' +
      '<li>¿Recuperas el material o tienes un ataque duradero? Si no, es solo una pieza menos.</li></ol>',
    keyPoints: ['f7/f2 solo está defendido por el rey al inicio de la partida.', 'El sacrificio puede sacar al rey, desviarlo o impedir el enroque.', 'Hacen falta varias piezas que continúen el ataque.', 'El mismo patrón funciona para las negras en f2.'],
    positions: [
      { fen: 'r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6', orientation: 'white',
        caption: 'Defensa de los Dos Caballos: el ataque Fegatello. El caballo de d5 está clavado contra f7 y el rey negro está solo.',
        line: ['Nxf7', 'Kxf7', 'Qf3+', 'Ke6', 'Nc3'],
        comments: ['Sacrificio de caballo en f7.', 'Aceptar es lo más natural.', 'Jaque y ataque al caballo de d5.', 'El rey tiene que defender el caballo y queda en el centro.', 'Más presión sobre d5. Las negras tienen una pieza más, pero su rey sufre mucho; en la práctica las blancas tienen un ataque peligroso.'],
        arrows: [['c4', 'd5', 'r'], ['f3', 'd5', 'r']] },
      { fen: 'r1bqkbnr/ppp2pp1/7p/4p3/2B1P3/8/PPP2PPP/RNBQK2R w KQkq - 0 7', orientation: 'white',
        caption: 'Bxf7+ como desviación: la columna d está abierta y la dama negra solo la defiende el rey.',
        line: ['Bxf7+', 'Kxf7', 'Qxd8'],
        comments: ['El alfil se sacrifica con jaque.', 'Si 7...Ke7, 8.Qxd8+ Kxd8 y las blancas se quedan con un peón más.', 'El rey ya no defiende d8: las blancas ganan la dama por un alfil.'],
        arrows: [['d1', 'd8', 'r']] },
      { fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 6 5', orientation: 'black',
        caption: 'Variante Traxler: las negras dejan que el caballo tome en f7 y responden con el sacrificio en f2.',
        line: ['Nxf7', 'Bxf2+', 'Kxf2', 'Nxe4+', 'Kg1', 'Qh4', 'g3', 'Nxg3'],
        comments: ['Horquilla a dama y torre.', '¡Contragolpe en f2!', '', 'Jaque y el peón e4 cae.', 'El rey vuelve a su esquina, pero tiene la torre de h1 encerrada.', 'Amenaza Qf2#.', 'Única defensa.', 'Las negras siguen sacrificando para mantener abierto al rey. Con juego exacto de ambos bandos, la lucha acaba en tablas o en posiciones muy complicadas.'] }
    ] },

  { id: 'a-sac-g7', area: 'ataque', category: 'Sacrificios típicos', title: 'El sacrificio en g7', level: 'avanzado',
    summary: 'Una torre o un alfil se sacrifican en g7 para destruir la protección del rey enrocado. Funciona cuando la gran diagonal y las columnas g y h están en manos del atacante.',
    html: '<p>El peón de <b>g7</b> es el pilar del enroque corto: cubre f6 y h6 y protege al rey de los jaques por la gran diagonal. Cuando el atacante consigue apuntar varias piezas a esa casilla, el sacrificio en g7 es uno de los golpes más demoledores.</p>' +
      '<h4>Con torre: Rxg7+</h4>' +
      '<p>La torre llega a g3 (elevación por la tercera fila) o a la columna g abierta. Tras <span class="mv">Rxg7+ Kxg7</span>, la dama entra con jaque por h6, g5 o h7. Ingredientes típicos:</p>' +
      '<ul><li>Un <b>alfil en b2</b> (o c3) en la gran diagonal: después del sacrificio, el caballo de f6 queda <b>clavado</b> contra el rey y deja de defender h7 y h5.</li>' +
      '<li>La dama cerca del flanco de rey (h5, g4, h6).</li>' +
      '<li>Pocas piezas negras capaces de volver a defender.</li></ul>' +
      '<h4>Con alfil: Bxg7</h4>' +
      '<p>El alfil de b2 o de h6 se entrega en g7 para abrir paso a la dama o a la torre. Es la segunda mitad del famoso doble sacrificio de Lasker y la idea central contra el fianchetto (<span class="mv">Bh6</span> y <span class="mv">Bxg7</span>). Tras <span class="mv">Bxg7 Kxg7</span>, la dama da jaque por g4, g5 o h6 y una torre se suma por la tercera fila.</p>' +
      '<h4>Cómo reconocerlo</h4>' +
      '<ol><li>Cuenta atacantes y defensores de g7 y de las casillas vecinas (h7, h6, f6).</li>' +
      '<li>Mira si alguna pieza defensora quedará clavada después del sacrificio.</li>' +
      '<li>Calcula todas las respuestas del rey: aceptar, huir a h8 o, si existe, a f8.</li></ol>' +
      '<p>Si tras el sacrificio el rey puede refugiarse en f8-e7 y tus piezas no llegan, el sacrificio es especulativo.</p>',
    keyPoints: ['g7 es el pilar del enroque: su caída abre f6, h6 y la gran diagonal.', 'El alfil en b2 clava al caballo de f6 tras el sacrificio.', 'Calcula todas las respuestas del rey, también la de no aceptar.', 'Cuantas más piezas atacan, más seguro es el sacrificio.'],
    positions: [
      { fen: '2r2rk1/pb2qppp/1p2pn2/7Q/8/3B2R1/PB3PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Torre en g3, alfil en b2, alfil en d3 y dama en h5: todas las piezas blancas apuntan al enroque. h7 está defendido solo por el caballo.',
        line: ['Rxg7+', 'Kxg7', 'Qxh7#'],
        comments: ['¡Sacrificio de torre!', 'Al aceptar, el caballo de f6 queda clavado por el alfil de b2.', 'El caballo ya no puede capturar: mate.'],
        arrows: [['g3', 'g7', 'r'], ['b2', 'g7', 'b']] },
      { fen: '2r2r1k/pb2qpRp/1p2pn2/7Q/8/3B4/PB3PPP/6K1 w - - 1 2', orientation: 'white',
        caption: 'Si el rey no acepta y se esconde en h8, el caballo sigue clavado (ahora contra el rey en h8).',
        line: ['Rxh7+', 'Kg8', 'Qg5#'],
        comments: ['La torre sigue comiendo. El caballo no puede tomar porque está clavado.', 'Única casilla.', 'Mate: la torre de h7 cubre g7 y h8.'] }
    ],
    practice: { fen: '2r2rk1/pb2qppp/1p2pn2/7Q/8/3B2R1/PB3PPP/6K1 w - - 0 1', goal: 'mate', side: 'w',
      text: 'Las blancas dan mate en tres jugadas como máximo. Empieza por el sacrificio en g7.' } },

  { id: 'a-doble-alfiles', area: 'ataque', category: 'Sacrificios típicos', title: 'El doble sacrificio de alfiles', level: 'avanzado',
    summary: 'Bxh7+ y Bxg7: los dos alfiles se entregan para desnudar al rey, y la dama y una torre rematan. Patrón inmortalizado por Lasker en 1889.',
    html: '<p>El doble sacrificio de alfiles consiste en entregar los dos alfiles en <b>h7</b> y <b>g7</b> para eliminar los dos peones que protegen al rey. Después, la dama da jaques y una torre se eleva por la tercera fila para llegar a la columna h o g. El primer ejemplo célebre es <b>Lasker–Bauer, Ámsterdam 1889</b>; décadas después se repitió en partidas de grandes maestros, prueba de que es un patrón y no una casualidad.</p>' +
      '<h4>Condiciones necesarias</h4>' +
      '<ul><li>Un alfil apuntando a h7 (normalmente en d3) y otro en la gran diagonal hacia g7 (en b2 o en e5).</li>' +
      '<li>Sin caballo negro en f6: si existe, primero hay que eliminarlo o desviarlo (Lasker jugó <span class="mv">Nh5</span> para provocar <span class="mv">...Nxh5</span>).</li>' +
      '<li>La dama debe poder entrar con jaque en h5 tras el primer sacrificio.</li>' +
      '<li>Una torre que pueda llegar a la tercera fila (<span class="mv">Rf3</span>) y desde allí a h3 o g3.</li></ul>' +
      '<h4>El mecanismo</h4>' +
      '<ol><li><span class="mv">Bxh7+ Kxh7</span>: el rey sale de su refugio.</li>' +
      '<li><span class="mv">Qh5+ Kg8</span>: la dama entra con jaque.</li>' +
      '<li><span class="mv">Bxg7!</span>: segundo sacrificio; amenaza <span class="mv">Qh8#</span>.</li>' +
      '<li><span class="mv">Kxg7 Qg4+</span> y <span class="mv">Rf3</span>: la torre llega a h3 con mate o ganancia de material.</li></ol>' +
      '<p>En la partida original, las negras tuvieron que devolver la dama para evitar el mate y Lasker terminó ganando gracias a un jaque doble que capturó el alfil de b7. Fíjate en el detalle: el objetivo no siempre es el mate, sino recuperar el material con intereses.</p>',
    keyPoints: ['Dos alfiles apuntando a h7 y g7, sin caballo en f6.', 'La dama entra con jaque y una torre llega por la tercera fila.', 'El objetivo puede ser el mate o recuperar más material del entregado.', 'Elimina antes al caballo defensor si es necesario.'],
    positions: [
      { fen: 'r4rk1/1b2bppp/ppq1p3/2ppB2n/5P2/1P1BP3/P1PPQ1PP/R4RK1 w - - 0 15', orientation: 'white',
        caption: 'Lasker–Bauer (Ámsterdam, 1889), tras 14.Nh5 Nxh5. El caballo de f6 ha desaparecido y los dos alfiles apuntan al enroque.',
        line: ['Bxh7+', 'Kxh7', 'Qxh5+', 'Kg8', 'Bxg7', 'Kxg7', 'Qg4+', 'Kh7', 'Rf3', 'e5', 'Rh3+', 'Qh6', 'Rxh6+', 'Kxh6', 'Qd7'],
        comments: ['Primer sacrificio.', '', 'La dama recupera la pieza con jaque.', '', 'Segundo sacrificio. Amenaza Qh8#.', 'Bauer acepta: rechazar tampoco salvaba la posición.', '', '', 'La torre se eleva hacia h3.', 'Abre una casilla para huir, pero llega tarde.', '', 'Las negras devuelven la dama para no recibir mate.', '', '', '¡Ataque doble! La dama amenaza el alfil de b7 y el de e7. Las blancas ganan material y, más tarde, la partida.'],
        arrows: [['d3', 'h7', 'r'], ['e5', 'g7', 'r']] },
      { fen: 'r4rk1/pbq1bppp/1p2p3/2p5/5P2/1P1BP3/PB2Q1PP/R4RK1 w - - 0 1', orientation: 'white',
        caption: 'Mismo esquema, pero aquí la dama negra en c7 y el alfil en e7 defienden a tiempo. El doble sacrificio solo alcanza para tablas.',
        line: ['Bxh7+', 'Kxh7', 'Qh5+', 'Kg8', 'Bxg7', 'Kxg7', 'Qg4+', 'Kh6', 'Qh3+', 'Kg7', 'Qg4+'],
        comments: ['', '', '', '', 'Segundo sacrificio.', '', '', 'El rey se adelanta: Rf3 ya no llega con jaque.', '', '', 'Jaque perpetuo: con dos piezas menos, las blancas no tienen nada mejor. Antes de sacrificar, comprueba que la torre llega a tiempo.'],
        arrows: [['d3', 'h7', 'r'], ['b2', 'g7', 'r']] }
    ],
    practice: { fen: 'r4rk1/1b2bppp/ppq1p3/2ppB2n/5P2/1P1BP3/P1PPQ1PP/R4RK1 w - - 0 15', goal: 'ganar', side: 'w',
      text: 'Repite la combinación de Lasker: sacrifica los dos alfiles y convierte el ataque en una victoria.' } },

  { id: 'a-sac-e6', area: 'ataque', category: 'Sacrificios típicos', title: 'El sacrificio en e6 en la Siciliana', level: 'avanzado',
    summary: 'En las estructuras sicilianas con el peón en e6 y el rey negro en el centro, Bxe6 o Nxe6 rompen la cadena de peones y abren la columna e y la diagonal a2-g8.',
    html: '<p>En muchas variantes de la Siciliana (Najdorf, Scheveningen, Sozin) las negras construyen una estructura sólida con peones en <b>d6 y e6</b>. El peón de e6 es la clave de esa muralla: controla d5 y f5 y cierra la diagonal a2-g8 del alfil blanco. Si cae, el rey negro, que con frecuencia sigue en e8, queda expuesto.</p>' +
      '<h4>Dos formas del sacrificio</h4>' +
      '<ul><li><b>Bxe6:</b> el alfil de b3 o c4 se entrega en e6. Tras <span class="mv">...fxe6</span>, el caballo de d4 captura en e6 con amenazas contra la dama, g7 y c7. La diagonal a2-g8 queda abierta hacia el rey.</li>' +
      '<li><b>Nxe6:</b> el caballo de d4 se sacrifica directamente. Tras <span class="mv">...fxe6</span>, la columna e se abre o el alfil captura en e6 con jaque.</li></ul>' +
      '<h4>Cuándo funciona</h4>' +
      '<ol><li>El rey negro está en e8 y no puede enrocar a tiempo.</li>' +
      '<li>Las blancas tienen una torre en e1 o pueden llevarla allí rápidamente.</li>' +
      '<li>La dama negra está en una casilla expuesta (c7, b6) donde el caballo de e6 o un alfil la atacan.</li>' +
      '<li>Hay piezas negras sin desarrollar o mal coordinadas.</li></ol>' +
      '<h4>Lo que se obtiene</h4>' +
      '<p>Normalmente, dos peones por la pieza y un ataque duradero. Rara vez es un mate forzado: es un sacrificio <b>posicional-dinámico</b>, en el que el rey negro tendrá que vivir varias jugadas sin protección. Por eso hay que valorar si tus piezas pueden mantener la presión, y no solo calcular las primeras jugadas.</p>' +
      '<p>Para el defensor la lección es la contraria: en la Siciliana, no retrases el enroque más de lo necesario cuando el alfil blanco apunta a e6.</p>',
    keyPoints: ['e6 sostiene la estructura siciliana y cierra la diagonal a2-g8.', 'Bxe6 o Nxe6 funcionan con el rey negro en e8 y una torre blanca en la columna e.', 'Se obtienen peones y ataque, no siempre un mate.', 'Como defensor, no retrases el enroque.'],
    positions: [
      { fen: 'r3k2r/1b2bppp/pq1ppn2/1pn5/P2NP3/1BN1B3/1PP2PPP/R2QR1K1 w kq - 3 13', orientation: 'white',
        caption: 'Najdorf con 6.Bc4. El rey negro está en e8, la dama en b6 y el alfil de b3 apunta a e6.',
        line: ['Bxe6', 'fxe6', 'Nxe6', 'Qc6', 'Nxg7+', 'Kf7', 'Nf5'],
        comments: ['¡Sacrificio en e6!', '', 'El caballo ataca la dama, el peón de g7 y el caballo de c5.', 'La dama huye.', 'Segundo peón y con jaque.', '', 'El caballo vuelve a una casilla fuerte. Las blancas tienen dos peones por la pieza, el rey negro desprotegido y clara ventaja.'],
        arrows: [['b3', 'e6', 'r']] },
      { fen: 'rnbqkb1r/5ppp/p3p3/3p4/Np1Nn3/1B6/PPP2PPP/R1BQR1K1 w kq - 0 11', orientation: 'white',
        caption: 'Najdorf, línea agresiva: las negras han tomado en e4 y siguen sin desarrollar el flanco de rey.',
        line: ['Bf4', 'Bd6', 'Rxe4', 'dxe4', 'Nxe6', 'Bxe6', 'Bxd6'],
        comments: ['Desarrolla y prepara la entrega de la calidad.', '', 'Sacrificio de calidad para abrir la columna e.', '', '¡Ahora sí: Nxe6! El caballo ataca la dama y g7.', '', 'El rey negro no puede enrocar y seguirá Bxe6 con Qh5+. Las blancas tienen compensación de sobra y ventaja.'] }
    ] },

  { id: 'a-sac-f5-d5', area: 'ataque', category: 'Sacrificios típicos', title: 'Sacrificios de caballo en f5 y d5', level: 'avanzado',
    summary: 'Contra el peón de e6, el caballo se ofrece en f5 o d5: si se captura con el peón, se abren la columna e y las diagonales hacia el rey.',
    html: '<p>Otra familia de sacrificios contra las estructuras con peón en <b>e6</b> consiste en colocar un caballo en <b>f5</b> o <b>d5</b>, justo donde el peón puede capturarlo. Si las negras toman con <span class="mv">...exf5</span> o <span class="mv">...exd5</span>, la columna e se abre hacia su rey y el peón blanco que recaptura (exf5 o exd5) gana espacio y abre líneas.</p>' +
      '<h4>El sacrificio en d5</h4>' +
      '<p>Es típico de la Siciliana con <span class="mv">Bg5</span> y enroque largo. Tras <span class="mv">Nd5 exd5 exd5</span>:</p>' +
      '<ul><li>La columna e queda abierta frente al rey negro, todavía en e8.</li>' +
      '<li>El peón de d5 corta la comunicación de las piezas negras y amenaza avanzar.</li>' +
      '<li>Las torres blancas (Rhe1, Rd1) entran en acción de inmediato.</li></ul>' +
      '<h4>El sacrificio en f5</h4>' +
      '<p>El caballo de d4 salta a f5 atacando d6, g7 y e7. Si se captura, el peón e4 recaptura en f5 y abre la diagonal del alfil y la columna e. A veces el sacrificio tiene un apoyo táctico concreto: tras <span class="mv">...exf5</span>, una pieza blanca llega a d5 con ataque doble. Es el famoso recurso del <b>Ataque Velimirović</b>, donde las blancas sacrifican primero en f5 y luego en d5.</p>' +
      '<h4>Cómo valorarlo</h4>' +
      '<ol><li>Si las negras no pueden enrocar pronto, la columna e abierta compensa mucho material.</li>' +
      '<li>Busca el golpe táctico que sigue a la captura (ataque doble, clavada en la columna e).</li>' +
      '<li>Si el rival puede rechazar el sacrificio, valora qué pasa entonces: el caballo en f5 o d5 suele seguir siendo muy molesto.</li></ol>',
    keyPoints: ['El caballo se ofrece en f5 o d5 contra el peón de e6.', 'Aceptar abre la columna e frente al rey negro.', 'Busca el golpe táctico que sigue a la captura.', 'Valora también la posición si el sacrificio se rechaza.'],
    positions: [
      { fen: 'rnbqk2r/4bppp/p2ppn2/6B1/Np1N4/1B6/PPP2PPP/R2QR1K1 w kq - 4 12', orientation: 'white',
        caption: 'Najdorf con 6.Bc4. El rey negro está en e8 y la torre de a8 no está defendida.',
        line: ['Nf5', 'exf5', 'Bxf6', 'gxf6', 'Qd5'],
        comments: ['¡Sacrificio en f5!', 'Aceptar es un error.', 'Elimina el caballo que cubriría d5.', '', 'Ataque doble: la dama amenaza la torre de a8 y el peón de f7. Las blancas recuperan la pieza con ventaja decisiva. Lo mejor para las negras era rechazar con 12...Rg8, aunque igualmente quedan peor.'],
        arrows: [['d5', 'a8', 'r'], ['d5', 'f7', 'r']] },
      { fen: 'r1b1k2r/2qnbppp/p2pp3/1p4P1/3NP3/1PN1B3/1PP1QP1P/2KR3R w kq - 1 14', orientation: 'white',
        caption: 'Ataque Velimirović (Siciliana Sozin). Con el peón en g5, las blancas sacrifican en f5 y en d5.',
        line: ['Nf5', 'exf5', 'Nd5', 'Qd8', 'exf5'],
        comments: ['Primer sacrificio: el caballo ataca e7, d6 y g7.', '', 'Segundo caballo a d5, atacando la dama y e7.', '', 'Las blancas tienen una pieza menos pero columna e abierta y rey negro en el centro: compensación completa y una posición muy difícil de defender en la práctica.'],
        arrows: [['d4', 'f5', 'r'], ['c3', 'd5', 'r']] },
      { fen: 'r3k2r/1bqnbppp/p2ppn2/1p4B1/3NPP2/2NB1Q2/PPP3PP/2KRR3 w kq - 4 12', orientation: 'white',
        caption: 'Najdorf con 6.Bg5. Todas las piezas blancas están listas; el rey negro sigue en e8.',
        line: ['Qg3', 'b4', 'Nd5', 'exd5', 'exd5'],
        comments: ['Presiona g7 y d6.', 'Las negras atacan el caballo de c3.', '¡En lugar de retirarse, el caballo se sacrifica en d5!', '', 'La columna e se abre contra el rey negro y el peón de d5 corta sus piezas. Juego muy dinámico con compensación para las blancas.'],
        arrows: [['c3', 'd5', 'r'], ['e1', 'e8', 'y']] }
    ] },

  /* ───────────── ATACAR ESTRUCTURAS ───────────── */
  { id: 'a-fianchetto', area: 'ataque', category: 'Atacar estructuras', title: 'Atacar el enroque con fianchetto', level: 'intermedio',
    summary: 'Contra g6-Bg7 el plan clásico es cambiar el alfil de g7 con Qd2 y Bh6, y abrir la columna h con h4-h5. Sin su alfil, las casillas oscuras alrededor del rey quedan indefensas.',
    html: '<p>El enroque con fianchetto (peones en f7, g6, h7 y alfil en g7) es muy sólido mientras el <b>alfil de g7</b> siga en su sitio: cubre f6, h6 y h8 y hace de tapón en la gran diagonal. El plan de ataque consiste en eliminar ese alfil y después abrir la columna h.</p>' +
      '<h4>Paso 1: cambiar el alfil de g7</h4>' +
      '<p>La batería <span class="mv">Qd2</span> + <span class="mv">Bh6</span> ofrece el cambio de alfiles. Si las negras aceptan <span class="mv">...Bxh6 Qxh6</span>, la dama blanca se instala en h6 a un paso del rey. Si no aceptan, el alfil blanco toma en g7 y el resultado es el mismo: <b>las casillas oscuras f6, g7 y h6 quedan débiles para siempre</b>.</p>' +
      '<h4>Paso 2: abrir la columna h</h4>' +
      '<p>El peón g6 es el gancho perfecto para el peón h: <span class="mv">h4-h5</span> y <span class="mv">hxg6</span>. Si las negras capturan en h5 con el caballo, se juega <span class="mv">g4</span> para expulsarlo y abrir aún más. La torre de h1 ya está en su columna, por eso este ataque encaja tan bien con el enroque largo (Ataque Yugoslavo contra el Dragón).</p>' +
      '<h4>Paso 3: el remate</h4>' +
      '<ul><li>Dama en h6 + torre en la columna h = amenaza de mate en h7 o h8.</li>' +
      '<li>Si el caballo de f6 defiende h7, elimínalo o desvíalo (Nd5, e5, g5).</li>' +
      '<li>Si el rey intenta huir por f6, un peón en e5 o un caballo en d5 le cierran el paso.</li></ul>' +
      '<h4>Defensas habituales</h4>' +
      '<p>El defensor intenta frenar con <span class="mv">...h5</span> (variante Soltis), contraatacar en el otro flanco o evitar el cambio retirando el alfil a h8. Es una carrera: el atacante no debe perder tiempo en jugadas secundarias.</p>',
    keyPoints: ['Sin el alfil de g7, f6, g7 y h6 quedan débiles.', 'Batería Qd2 + Bh6 para cambiar el alfil.', 'h4-h5 usa el peón g6 como gancho para abrir la columna h.', 'Dama en h6 + torre en la columna h: amenaza de mate.'],
    positions: [
      { fen: 'r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R w KQ - 5 10', orientation: 'white',
        caption: 'Ataque Yugoslavo contra la Siciliana Dragón. Qd2 y Be3 ya preparan Bh6; el peón h está listo para avanzar.',
        line: ['h4', 'Rc8', 'Bb3', 'Ne5', 'O-O-O', 'Nc4', 'Bxc4', 'Rxc4', 'h5', 'Nxh5', 'g4', 'Nf6'],
        comments: ['¡El peón h en marcha!', 'Las negras atacan por la columna c.', 'El alfil se aparta del ataque del caballo.', '', 'Enroques opuestos.', '', 'Cambio del alfil, que sería atacado una y otra vez.', '', 'Ofrece un peón para abrir la columna h.', 'Las negras aceptan.', 'Expulsa al caballo con tempo.', 'La columna h está abierta. Ahora llega el plan Bh6 para cambiar el alfil de g7.'],
        arrows: [['h2', 'h5', 'g'], ['e3', 'h6', 'g']] },
      { fen: 'r4rk1/pp1pppb1/1q4pB/4P3/6P1/5P2/PPPQ4/1K1R3R w - - 0 1', orientation: 'white',
        caption: 'La columna h ya está abierta, el alfil está en h6 y el peón de e5 controla f6. Momento de rematar.',
        line: ['Bxg7', 'Kxg7', 'Qh6+', 'Kg8', 'Qh7#'],
        comments: ['El alfil elimina a su colega.', 'Si no acepta, Bxf8 gana material decisivo.', 'Jaque: el peón de e5 impide huir por f6.', 'Única casilla.', 'Mate, con la dama apoyada por la torre de h1.'],
        arrows: [['h1', 'h7', 'r'], ['e5', 'f6', 'b']] }
    ],
    practice: { fen: 'r4rk1/pp1pppb1/1q4pB/4P3/6P1/5P2/PPPQ4/1K1R3R w - - 0 1', goal: 'ganar', side: 'w',
      text: 'Elimina el alfil de g7 y aprovecha la columna h abierta para ganar.' } },

  { id: 'a-enroque-h6', area: 'ataque', category: 'Atacar estructuras', title: 'Atacar el enroque con peón en h6 (o h3)', level: 'avanzado',
    summary: 'El peón en h6 da aire al rey pero ofrece un gancho: se puede sacrificar una pieza en h6 o usar la palanca g4-g5 para abrir columnas.',
    html: '<p>La jugada <span class="mv">...h6</span> (o <span class="mv">h3</span> para las blancas) es muy común: evita las molestias de un alfil o un caballo en g5 y da una casilla de escape al rey. Pero tiene un precio: el peón avanzado se convierte en un <b>objetivo</b> y en un <b>gancho</b>.</p>' +
      '<h4>El sacrificio en h6</h4>' +
      '<p>Con el peón en h6, el alfil de e3 o c1 y la dama en d2 forman una batería contra él. Tras <span class="mv">Bxh6 gxh6 Qxh6</span>, las blancas tienen dos peones por la pieza y la dama junto al rey. Funciona sobre todo cuando:</p>' +
      '<ul><li>El caballo negro <b>no está en f6</b> (o puede ser expulsado), porque es el que defiende h7.</li>' +
      '<li>Hay un alfil en d3 apuntando a h7 y la posibilidad de llevar un caballo a g5 o una torre a la tercera fila.</li>' +
      '<li>Las negras no pueden traer defensores rápidamente (Nf6, f5, Rf6).</li></ul>' +
      '<p>También existe la versión con caballo (<span class="mv">Nxh6+</span>) y la de la torre que llega a h3 y toma en h6.</p>' +
      '<h4>La palanca g4-g5</h4>' +
      '<p>Si los reyes están en flancos opuestos, el peón de h6 es el gancho ideal para el peón g. Tras <span class="mv">g4</span>, <span class="mv">h4</span> y <span class="mv">g5</span>, las negras tienen que elegir: si cambian <span class="mv">...hxg5 hxg5</span>, se abre la columna h para la torre blanca; si no cambian, <span class="mv">gxh6</span> abre la columna g. A menudo se prepara con <span class="mv">Rg1</span> para que el avance sea imparable.</p>' +
      '<h4>Consejos</h4>' +
      '<ol><li>Antes de sacrificar en h6, cuenta qué piezas llegan después de <span class="mv">Qxh6</span>. Con solo la dama, el ataque suele fallar.</li>' +
      '<li>Con enroques en el mismo flanco, la palanca g4-g5 debilita a tu propio rey: úsala solo si el centro está cerrado.</li></ol>',
    keyPoints: ['El peón en h6 es a la vez objetivo de sacrificio y gancho para g4-g5.', 'Bxh6 gxh6 Qxh6 funciona mejor sin caballo negro en f6.', 'Con enroques opuestos, g4-g5 abre la columna g o la h.', 'Cuenta las piezas que llegan después del sacrificio.'],
    positions: [
      { fen: 'r1b2rk1/pp1nbpp1/4p2p/q2p4/3P4/2PBBN2/PP1Q1PPP/R4RK1 w - - 0 1', orientation: 'white',
        caption: 'El caballo negro está en d7, lejos de f6. Batería Qd2-Be3 contra h6 y alfil de d3 apuntando a h7.',
        line: ['Bxh6', 'gxh6', 'Qxh6', 'f5', 'Qg6+', 'Kh8', 'Qxe6'],
        comments: ['¡Sacrificio en h6!', 'Aceptar abre el rey. (Si las negras no aceptan, las blancas tienen un peón más y siguen atacando.)', 'Dos peones por la pieza, la dama junto al rey y amenazas como Ng5 o Bh7+.', 'Las negras cierran la diagonal del alfil.', 'Jaque desde g6.', '', 'Tercer peón y el ataque continúa. Ventaja blanca clara.'],
        arrows: [['e3', 'h6', 'r'], ['d3', 'h7', 'r']] },
      { fen: 'r2qkb1r/1b1n1pp1/p2ppn1p/1p6/3NP1P1/2N1BP2/PPPQ3P/2KR1B1R w kq - 2 11', orientation: 'white',
        caption: 'Ataque Inglés: las negras jugaron ...h6 para frenar g4-g5. Ahora el peón de h6 es el gancho.',
        line: ['h4', 'b4', 'Nce2', 'Qc7', 'Rg1', 'd5', 'g5', 'hxg5', 'hxg5'],
        comments: ['Apoya el avance g5.', 'Contraataque negro.', '', '', 'La torre respalda el peón g.', 'Golpe central.', '¡Palanca!', '', 'Se abre la columna h para la torre negra, pero sobre todo el caballo de f6 es atacado y las piezas blancas ganan espacio. Ventaja blanca.'],
        arrows: [['g4', 'g5', 'g'], ['h4', 'g5', 'g']] }
    ] },

  /* ───────────── PATRONES DE MATE DE ATAQUE ───────────── */
  { id: 'a-mates-greco', area: 'ataque', category: 'Patrones de mate de ataque', title: 'Mates de Greco, Lolli y Damiano', level: 'intermedio',
    summary: 'Tres patrones clásicos contra el rey enrocado: la dama en la columna h con alfil en la diagonal (Greco), dama y peón en f6 (Lolli) y dama apoyada por un peón en g6 (Damiano).',
    html: '<p>Los patrones de mate llevan el nombre de los maestros que los publicaron hace siglos. Conocerlos no es erudición: son <b>imágenes</b> que permiten reconocer en un instante si un ataque tiene remate.</p>' +
      '<h4>Mate de Greco</h4>' +
      '<p>El rey está en h8 con el peón en g7. Un <b>alfil en la diagonal a2-g8</b> (normalmente en c4) le quita la casilla g8, y la <b>dama o una torre en la columna h</b> da el mate. El golpe típico para abrir la columna h es un sacrificio: un caballo que da jaque en g6 obliga a <span class="mv">...hxg6</span>, y la dama entra en h3, h4 o h5.</p>' +
      '<h4>Mate de Lolli</h4>' +
      '<p>Un <b>peón blanco en f6</b> es una espina clavada en el enroque: controla g7 y e7. Si la dama llega a <b>h6</b>, amenaza <span class="mv">Qg7#</span> y a menudo no hay defensa. El patrón aparece mucho contra el fianchetto cuando el alfil de g7 ha desaparecido.</p>' +
      '<h4>Mate de Damiano</h4>' +
      '<p>Un <b>peón blanco en g6</b> apoya a la dama en <b>h7</b>. Con una torre o el propio rey negro bloqueando f8, <span class="mv">Qh7#</span> es mate. El patrón original incluía sacrificios de torre en h8 para atraer al rey y abrir paso a la dama por la columna h.</p>' +
      '<h4>Cómo usarlos</h4>' +
      '<ul><li>Si tienes un peón en f6 o g6 cerca del rey rival, busca el camino de la dama a h6 o h7.</li>' +
      '<li>Si el rey está en h8 y tu alfil controla g8, cualquier línea abierta en la columna h es mortal.</li>' +
      '<li>Como defensor, elimina cuanto antes el peón de f6 o g6 aunque cueste material.</li></ul>',
    keyPoints: ['Greco: alfil cubre g8 y la dama o la torre mata por la columna h.', 'Lolli: peón en f6 + dama en h6 = amenaza Qg7#.', 'Damiano: peón en g6 apoya Qh7#.', 'Un peón avanzado junto al rey enemigo suele ser decisivo.'],
    positions: [
      { fen: 'r4r1k/pbq3pp/1p6/8/2B2N2/3Q4/PPP2PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Mate de Greco: el alfil de c4 cubre g8. Hay que abrir la columna h.',
        line: ['Ng6+', 'hxg6', 'Qh3#'],
        comments: ['El caballo da jaque y se ofrece.', 'Forzado: el rey no tiene casillas.', 'Mate de Greco: g8 cubierto por el alfil, g7 bloqueado por el propio peón.'],
        arrows: [['c4', 'g8', 'r']] },
      { fen: 'r4rk1/pp3p1p/5Pp1/8/8/8/PPPQ3P/2K4R w - - 0 1', orientation: 'white',
        caption: 'Mate de Lolli: el peón de f6 controla g7. La dama solo necesita llegar a h6.',
        line: ['Qh6', 'g5', 'Qg7#'],
        comments: ['Amenaza Qg7# y no hay defensa.', 'Nada ayuda.', 'Mate de Lolli: la dama en g7 apoyada por el peón de f6.'],
        arrows: [['d2', 'h6', 'g'], ['f6', 'g7', 'r']] },
      { fen: '1q3rk1/5p2/5bP1/8/8/3BQ3/5PP1/6KR w - - 0 1', orientation: 'white',
        caption: 'Mate de Damiano: el peón de g6 apoyará a la dama en h7.',
        line: ['Qh6', 'Qb1+', 'Bxb1', 'Rc8', 'Qh7+', 'Kf8', 'Qxf7#'],
        comments: ['Amenaza Qh7#, el mate de Damiano (con la torre bloqueando f8).', 'Un jaque desesperado.', '', 'La torre deja f8 libre para el rey.', '', '', 'Mate: la dama apoyada por el peón de g6.'],
        arrows: [['g6', 'h7', 'r']] }
    ] },

  { id: 'a-mates-morphy', area: 'ataque', category: 'Patrones de mate de ataque', title: 'Cola de golondrina, charretera, Morphy y Pillsbury', level: 'intermedio',
    summary: 'Dos mates en los que las propias torres encierran al rey (cola de golondrina y charretera) y dos mates de torre y alfil en la gran diagonal (Morphy y Pillsbury).',
    html: '<p>Estos cuatro patrones tienen en común que el rey muere rodeado de <b>sus propias piezas</b> o encerrado por la colaboración de dos piezas atacantes.</p>' +
      '<h4>Cola de golondrina</h4>' +
      '<p>El rey está en <b>e7</b> y sus torres en <b>d8 y f8</b>, justo detrás en diagonal: forman la figura de una cola de golondrina. La dama da mate en <b>e6</b>, delante del rey, protegida por un peón o una pieza. El rey no puede retroceder porque sus torres le tapan d8 y f8, y e8 sigue en la línea de la dama.</p>' +
      '<h4>Charretera (épaulette)</h4>' +
      '<p>El rey está en la última fila con <b>una torre a cada lado</b> (por ejemplo, Rd8-Ke8-Rf8), como las charreteras de un uniforme. La dama da jaque desde dos casillas delante (<b>e6</b>) y cubre d7, e7 y f7. Las torres, que deberían defender, solo estorban.</p>' +
      '<h4>Mate de Morphy</h4>' +
      '<p>El rey está en <b>h8</b> con el peón en h7. Una <b>torre en la columna g</b> le quita g8 y g7, y el <b>alfil da jaque por la gran diagonal</b> desde f6. Suele llegar tras un sacrificio de dama en f6 para abrir la columna g.</p>' +
      '<h4>Mate de Pillsbury</h4>' +
      '<p>Es el reverso del anterior: el rey está en <b>g8</b>, el alfil en la gran diagonal controla h8 (y g7), y la <b>torre da el jaque por la columna g</b>. Una torre negra en f8 y los peones f7 y h7 completan la jaula.</p>' +
      '<h4>Qué aprender</h4>' +
      '<ul><li>Las torres junto al rey en la última fila pueden convertirse en carceleras.</li>' +
      '<li>Un alfil en la gran diagonal y una torre en la columna g son una pareja letal contra el enroque corto sin peón g.</li>' +
      '<li>Muchas veces el sacrificio de dama que abre la columna g es el paso previo.</li></ul>',
    keyPoints: ['Cola de golondrina: rey en e7, torres en d8 y f8, dama protegida en e6.', 'Charretera: rey entre sus torres, dama dos casillas delante.', 'Morphy: rey en h8, torre en la columna g, alfil da jaque en la gran diagonal.', 'Pillsbury: rey en g8, alfil cubre h8, torre da jaque en la columna g.'],
    positions: [
      { fen: '3r1r2/pp2k1pp/8/3P4/8/7Q/PPP3PP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Cola de golondrina: el rey en e7 con sus torres en d8 y f8.',
        line: ['Qe6#'],
        comments: ['Mate: la dama, protegida por el peón de d5, cubre todas las casillas; d8 y f8 están ocupadas por las torres.'],
        highlights: ['d8', 'f8'] },
      { fen: '3rkr2/pp4pp/8/8/6Q1/8/PPP3PP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Charretera: el rey en e8, flanqueado por sus dos torres.',
        line: ['Qe6#'],
        comments: ['Mate: la dama cubre d7, e7 y f7, y las torres tapan d8 y f8.'],
        highlights: ['d8', 'f8'] },
      { fen: 'r3qrk1/pp3ppp/5n2/8/8/3R1Q2/PB3PPP/5RK1 w - - 0 1', orientation: 'white',
        caption: 'Mate de Morphy: alfil en la gran diagonal y torre lista para ir a la columna g. Solo falta eliminar el caballo de f6.',
        line: ['Qxf6', 'gxf6', 'Rg3+', 'Kh8', 'Bxf6#'],
        comments: ['¡Sacrificio de dama! Amenaza Qxg7#.', 'Si las negras no capturan, reciben mate en g7.', 'La torre ocupa la columna g abierta.', 'Única casilla.', 'Mate de Morphy: la torre cubre g8 y g7, el peón de h7 bloquea al rey.'],
        arrows: [['b2', 'f6', 'r'], ['d3', 'g3', 'g']] },
      { fen: '5rk1/p4p1p/1p6/8/8/3R4/PB3PPP/6K1 w - - 0 1', orientation: 'white',
        caption: 'Mate de Pillsbury: el alfil de b2 controla h8 y g7; la torre da el jaque.',
        line: ['Rg3#'],
        comments: ['Mate: f8 ocupada por la torre negra, f7 y h7 por sus peones, h8 y g7 controladas.'],
        arrows: [['b2', 'h8', 'r']] }
    ],
    practice: { fen: 'r3qrk1/pp3ppp/5n2/8/8/3R1Q2/PB3PPP/5RK1 w - - 0 1', goal: 'mate', side: 'w',
      text: 'Elimina al defensor de f6 y da el mate de Morphy.' } },

  /* ───────────── DEFENSA ───────────── */
  { id: 'a-defensa', area: 'ataque', category: 'Defensa', title: 'Cómo defenderse de un ataque', level: 'intermedio',
    summary: 'Defender bien es tan importante como atacar: cambia las piezas atacantes, contraataca en el centro y no dudes en devolver material para cortar la iniciativa.',
    html: '<p>Todo ataque tiene un punto débil: depende de que las piezas atacantes sigan coordinadas y de que el defensor no tenga contrajuego. La buena defensa aprovecha esas debilidades. Lasker y Petrosian, grandes defensores, insistían en que <b>defender no es esperar</b>, sino actuar.</p>' +
      '<h4>1. Cambiar las piezas atacantes</h4>' +
      '<p>Cada cambio reduce la fuerza del ataque. Prioriza cambiar las piezas que más peligro generan: el alfil que apunta a h7, el caballo que llega a g5, la dama. Jugadas como <span class="mv">...Ne4</span> o <span class="mv">...Bg4</span> que ofrecen cambios suelen aliviar mucho. Al revés, evita cambiar tus propios defensores (el caballo de f6, el alfil de g7).</p>' +
      '<h4>2. Contraatacar en el centro</h4>' +
      '<p>La regla clásica: <b>a un ataque en el flanco se responde con una acción en el centro</b>. Si el centro se abre, las piezas atacantes pierden sus puntos de apoyo y el rey del atacante queda expuesto. La ruptura <span class="mv">...d5</span> o <span class="mv">...e5</span> en el momento justo cambia el curso de la partida.</p>' +
      '<h4>3. Devolver material</h4>' +
      '<p>Muchos aficionados se aferran al peón o la pieza ganados y acaban recibiendo mate. Devolver material a cambio de cortar la iniciativa, cambiar damas o completar el desarrollo suele ser lo más sensato. Un peón de menos con el rey a salvo es mejor que un peón de más con el rey bajo fuego.</p>' +
      '<h4>4. Otras reglas útiles</h4>' +
      '<ul><li>No crees debilidades nuevas: cada avance de peón delante del rey da un gancho al atacante.</li>' +
      '<li>Mantén piezas cerca del rey y conserva el caballo de f6.</li>' +
      '<li>Busca cada jugada qué quiere el rival y quítale la jugada clave (profilaxis).</li>' +
      '<li>No entres en pánico: calcula la amenaza real. Muchos ataques parecen más peligrosos de lo que son.</li></ul>',
    keyPoints: ['Cambia las piezas atacantes y conserva tus defensores.', 'Responde a un ataque de flanco con acción en el centro.', 'Devuelve material si con ello cortas la iniciativa.', 'No crees ganchos con avances de peón innecesarios.'],
    positions: [
      { fen: 'rnbq1rk1/ppp1bpp1/4pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R b KQ - 1 7', orientation: 'black',
        caption: 'Gambito de Dama, defensa Lasker. Las negras alivian la presión del alfil clavador mediante cambios.',
        line: ['Ne4', 'Bxe7', 'Qxe7'],
        comments: ['El caballo ofrece cambios y libera la diagonal.', 'Cambio de alfiles.', 'Las negras han cambiado una pieza activa blanca y tienen una posición sólida.'],
        arrows: [['f6', 'e4', 'g']] },
      { fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2', orientation: 'black',
        caption: 'Gambito de Rey: las blancas abren el flanco de rey para atacar. El contragolpe Falkbeer responde en el centro.',
        line: ['d5', 'exd5', 'e4'],
        comments: ['Contragolpe central en vez de aceptar el gambito.', '', 'El peón de e4 se clava en la posición blanca y dificulta el desarrollo natural (Nf3). La partida queda equilibrada.'],
        arrows: [['d7', 'd5', 'g']] },
      { fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4', orientation: 'black',
        caption: 'Dos Caballos: en lugar de sufrir el ataque Fegatello, las negras entregan un peón y ganan tiempo para contraatacar.',
        line: ['d5', 'exd5', 'Na5', 'Bb5+', 'c6', 'dxc6', 'bxc6', 'Be2', 'h6', 'Nf3', 'e4', 'Ne5'],
        comments: ['Bloquea la diagonal del alfil.', '', 'No recaptura en d5 (eso permitiría el sacrificio en f7): ataca el alfil.', '', 'Las negras entregan un peón para desarrollarse con ganancia de tiempo.', '', '', 'El alfil se retira.', 'Expulsa al caballo.', '', 'Más ganancia de tiempo.', 'Las negras tienen un peón menos, pero todas sus piezas activas y la iniciativa: la defensa se ha convertido en ataque.'] }
    ] }
);
