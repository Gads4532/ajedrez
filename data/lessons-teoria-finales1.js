/* Teoría ampliada y ejercicios nuevos: finales1. Redacción propia; posiciones verificadas con Stockfish. */
(function () {
  const X = {
 "f-cuadrado": {
  "html": "<h4>Contar, no adivinar</h4><p>La regla del cuadrado es un atajo para una cuenta muy simple: cuántas jugadas necesita el peón para coronar y cuántas necesita el rey para llegar a la casilla de coronación (o a cualquier casilla delante del peón). Cuando sobre el tablero solo hay un rey contra un peón, el cuadrado da la respuesta exacta en un segundo. Pero en cuanto aparecen otros peones o el rey rival estorba, el cuadrado deja de ser una regla y vuelve a ser lo que siempre fue: una forma rápida de contar. Por eso conviene entender de dónde sale. Un rey se mueve en diagonal tan rápido como en línea recta: para ir de <b>h8</b> a <b>h2</b> necesita seis jugadas, y para ir de <b>h8</b> a <b>b2</b> por la diagonal, también seis. Esa propiedad del tablero es la que hace posible el cuadrado y también los milagros de la sección siguiente.</p><h4>La maniobra de Réti: un rey, dos tareas</h4><p>En su famoso estudio de 1921, Richard Réti mostró un rey que parece estar a años luz de todo y aun así hace tablas. Como el camino en diagonal no es más largo que el recto, el rey puede <b>perseguir al peón rival y acercarse a su propio peón al mismo tiempo</b>. Cada jugada plantea al rival una pregunta: si su peón avanza, el rey blanco ayuda al suyo a coronar; si el rey rival se detiene a capturar, el rey blanco entra en el cuadrado del peón enemigo. Esta idea de la <b>doble amenaza del rey</b> aparece una y otra vez en partidas reales: antes de rendirte en una carrera perdida, busca una ruta diagonal que sirva para dos cosas.</p><h4>Cuándo el cuadrado engaña</h4><ul><li><b>Obstáculos</b>: tus propios peones, o el rey rival, pueden bloquear la diagonal por la que pensabas entrar. Un rey atacante bien colocado puede incluso apartar al defensor «con el hombro», ocupando la casilla por la que este quería pasar.</li><li><b>El doble paso</b>: un peón en su casilla inicial avanza dos casillas de una vez; cuenta el cuadrado como si ya estuviera una fila más adelante.</li><li><b>Coronar con jaque</b>: en una carrera de peones no gana siempre el que corona primero. Si la dama nueva da jaque, o ataca enseguida la casilla de coronación rival, el que llega primero gana un tiempo extra decisivo.</li><li><b>Peones que se protegen</b>: dos peones pasados unidos en la sexta, o separados por dos columnas, pueden defenderse solos frente al rey: si el rey captura uno, el otro corona.</li></ul><h4>Carreras de peones: la cuenta completa</h4><p>Cuando ambos bandos tienen peones pasados, cuenta para cada uno las jugadas hasta coronar, sin olvidar quién juega. Si los dos coronan, pregúntate qué pasa en la jugada siguiente: ¿alguna dama da jaque y captura a la otra con un ataque doble? ¿El peón rival llega a la séptima apoyado por su rey? En ese caso la dama gana contra los peones centrales y de caballo, pero contra un peón de alfil o de torre en séptima suele haber tablas por ahogado. Un error típico del aficionado es empujar su peón sin mirar el del rival, o al revés, perseguir el peón enemigo con el rey cuando bastaba con correr.</p><h4>Cómo pensarlo en la partida</h4><ol><li>¿Quién juega? El turno vale exactamente una fila del cuadrado.</li><li>Traza el cuadrado, con el doble paso si el peón no se movió todavía.</li><li>¿Hay piezas o peones en el camino del rey defensor?</li><li>Si es una carrera: ¿quién corona primero, y la nueva dama da jaque o queda atacada?</li><li>¿Puede mi rey hacer dos tareas a la vez por una diagonal?</li></ol>",
  "keyPoints": [
   "El rey en diagonal es tan rápido como en línea recta: puede perseguir un peón y apoyar el suyo a la vez (Réti).",
   "En una carrera de peones, cuenta también la jugada siguiente a la coronación: jaques y ataques dobles."
  ],
  "positions": [
   {
    "fen": "7K/8/k1P5/7p/8/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Estudio de Réti (1921): el rey blanco parece perdido, pero hace tablas caminando en diagonal.",
    "line": [
     "Kg7",
     "h4",
     "Kf6",
     "Kb6",
     "Ke5",
     "h3",
     "Kd6",
     "h2",
     "c7"
    ],
    "comments": [
     "El rey va en diagonal: se acerca al peón de h y, a la vez, al centro. Kh7, en línea recta, solo persigue al peón y llega tarde.",
     "El peón huye. Si el negro empieza con Kb6, el blanco sigue igual con Kf6.",
     "El rey amenaza entrar en el cuadrado del peón de h4 con Ke5 y, al mismo tiempo, se acerca a su propio peón.",
     "El negro detiene el peón de c6. Si siguiera con h3, Ke7 apoyaría el peón: h2, c7 y ambos coronan.",
     "¡Doble tarea! Desde e5 el rey está dentro del cuadrado del peón de h4 y a un paso de proteger el peón de c6.",
     "Si el negro capturara en c6, Kf4 alcanzaría el peón de h. Por eso corre.",
     "El rey protege su peón: c7 queda apoyado.",
     "El negro sigue corriendo con su peón.",
     "Los dos peones coronan: tablas. Un rey que estaba a seis jugadas de todo se salvó gracias a la diagonal."
    ],
    "arrows": [
     [
      "h8",
      "e5",
      "g"
     ]
    ]
   },
   {
    "fen": "8/8/8/7k/8/8/1P6/7K w - - 0 1",
    "orientation": "white",
    "caption": "El doble paso cuenta: con b4 el rey negro queda fuera del cuadrado; con b3 entraría.",
    "line": [
     "b4",
     "Kg5",
     "b5",
     "Kf6",
     "b6",
     "Ke7",
     "b7",
     "Kd7",
     "b8=Q"
    ],
    "comments": [
     "Con el doble paso, el cuadrado es b4-f4-f8-b8 y el rey de h5 queda fuera. Con b3, en cambio, Kg4 entraría en el cuadrado b3-g3-g8-b8 y serían tablas.",
     "El rey negro corre en diagonal, pero va un tiempo tarde.",
     "Cada avance achica el cuadrado: ahora es b5-e5-e8-b8, y el rey negro sigue afuera.",
     "Ni acercándose por la diagonal llega a tiempo.",
     "El peón ya está en la sexta.",
     "El rey llega a la séptima fila, pero una columna tarde.",
     "El peón llega a la séptima con la casilla de coronación libre.",
     "Demasiado tarde: el rey negro no alcanza b8 ni puede capturar el peón.",
     "El peón corona y el blanco gana con la dama."
    ],
    "highlights": [
     "b4",
     "f4",
     "f8",
     "b8"
    ]
   }
  ],
  "drills": [
   {
    "fen": "6K1/k7/8/8/3P3p/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y hacen tablas: el peón de h4 parece imparable.",
    "line": [
     "d5",
     "Kb6",
     "Kf7",
     "Kc5",
     "Ke6",
     "h3",
     "d6"
    ],
    "comments": [
     "¡Primero el peón! Su amenaza de coronar obliga al rey negro a ir a buscarlo. Una jugada de rey como Kg7 llegaría tarde: h3, h2 y h1=Q.",
     "El rey negro tiene que perseguir el peón de d5.",
     "Ahora el rey blanco entra en juego por la diagonal, rumbo a e6 para proteger su peón.",
     "El negro ataca el peón de d5.",
     "El rey llega justo a tiempo para defender el peón: Kxd5 ya no es posible.",
     "Al negro solo le queda correr con su peón.",
     "El peón avanza con el apoyo del rey: d7 y d8=Q llegan a tiempo y la partida termina en tablas."
    ]
   },
   {
    "fen": "8/2k5/5K2/8/3P3p/8/8/8 w - - 0 1",
    "caption": "Juegan blancas: el peón de h4 ya no se puede alcanzar. ¿Cómo salvan la partida?",
    "line": [
     "Ke7",
     "h3",
     "d5",
     "h2",
     "d6+",
     "Kc6",
     "d7"
    ],
    "comments": [
     "¡El empujón con el hombro! El rey no persigue el peón de h, sino que se interpone entre el rey negro y el peón de d, y controla d8, la casilla de coronación. Ke6 parece igual, pero deja libre d8: el rey negro llegaría allí y bloquearía el peón.",
     "El negro corre. Si su rey intentara acercarse con Kc6, d5+ avanzaría con jaque.",
     "El peón avanza protegido por la posición del rey.",
     "El negro sigue con su peón.",
     "Con jaque: el rey negro no puede acercarse a d7 ni a d8.",
     "El rey negro se aparta.",
     "Los dos peones coronan casi a la vez: tablas."
    ]
   },
   {
    "fen": "8/8/8/5p2/2K5/P7/3k4/8 w - - 0 1",
    "caption": "Juegan blancas: el peón de f5 corre hacia f1. ¿Pueden salvarse?",
    "line": [
     "Kd4",
     "f4",
     "Ke4",
     "f3",
     "Kxf3"
    ],
    "comments": [
     "El rey va hacia el peón y, sobre todo, controla e3. Con Kd5, el negro respondería Ke3 y su rey le cerraría el paso al blanco con el hombro, mientras el peón corre.",
     "El peón avanza; otras jugadas tampoco salvan al negro.",
     "El rey ataca el peón y se mantiene dentro de su cuadrado.",
     "El negro intenta seguir adelante.",
     "El peón cae. El rey negro capturará después el peón de a3: tablas."
    ]
   },
   {
    "fen": "K7/7p/5k2/8/2P5/8/8/8 b - - 0 1",
    "caption": "Juegan negras y ganan: ¿qué debe hacer primero el rey negro?",
    "line": [
     "Ke5",
     "Kb7",
     "Kd4"
    ],
    "comments": [
     "El rey entra en el cuadrado del peón de c4 en diagonal, rumbo a d4. Empujar h5 sería un error (c5 y el peón blanco corona), y Ke6 llega tarde: el rey blanco alcanzaría b6 para proteger su peón.",
     "El rey blanco intenta acercarse a su peón.",
     "El rey negro ataca el peón de c4: si avanza, lo alcanza igual. Después el peón de h corona sin oposición, porque el rey blanco está en la otra punta."
    ]
   }
  ]
 },
 "f-oposicion": {
  "html": "<h4>Por qué existe la oposición</h4><p>Dos reyes nunca pueden quedar en casillas vecinas. Cuando se enfrentan con una casilla entre ellos, cada uno le prohíbe al otro las tres casillas de enfrente. El que tiene que mover está obligado a ceder: es un <b>zugzwang</b> en miniatura. La oposición no es un fin en sí mismo: el atacante la busca para que su rey llegue a las <b>casillas clave</b> del peón, y el defensor la toma para cerrarle el paso. Si tu rey ya está en una casilla clave, olvídate de la oposición: el peón corona igual.</p><h4>Oposición distante: cómo verla rápido</h4><p>Con los reyes lejos, cuenta las casillas que los separan en la misma columna o fila: si el número es impar y el rival tiene el turno, la oposición es tuya. Un truco práctico: <b>en ese caso los dos reyes están en casillas del mismo color</b>. Para conservar la oposición distante, avanza tu rey de frente hacia el rival; si él se aparta a un lado, tú también te desplazas a la columna correspondiente, de modo que vuelvan a quedar enfrentados con un número impar de casillas. Así, la oposición distante se convierte, paso a paso, en oposición directa en el momento justo.</p><h4>Desbordar: la oposición abre la puerta</h4><p>Ganar la oposición solo obliga al rival a apartarse. Entonces el atacante no avanza de frente, sino que <b>desborda</b>: pasa por el costado que el defensor acaba de abandonar. El rey defensor debe elegir entre dejar libre una fila o una columna; en ambos casos el atacante gana terreno. El defensor, por su parte, sigue una regla sencilla: cuando pierde la oposición, <b>retrocede en línea recta</b> hacia la casilla de delante del peón, porque desde allí podrá volver a tomar la oposición cuando el rey rival avance. Retroceder en diagonal o hacia un lado suele perder.</p><h4>Errores típicos</h4><ul><li><b>Empujar el peón demasiado pronto.</b> Cada avance del peón le quita al atacante una jugada de reserva y acerca la posición a tablas. Primero el rey, luego el peón.</li><li><b>Olvidar los tiempos de reserva.</b> Un peón que todavía puede avanzar una casilla (por ejemplo, de <b>e2</b> a <b>e3</b>) sirve para pasar el turno y recuperar la oposición perdida.</li><li><b>Aplicar la oposición al peón de torre.</b> Allí el defensor solo necesita llegar a la esquina; la oposición casi no importa.</li><li><b>Defender de lado.</b> El rey defensor que se aleja de la columna del peón pierde la posibilidad de oponerse.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Cuáles son las casillas clave del peón? ¿Ya llego a una?</li><li>Si no llego: ¿quién tiene la oposición (incluida la distante)?</li><li>¿Tengo jugadas de peón de reserva para cambiar el turno?</li><li>Si la gano, ¿por qué lado desbordo?</li></ol>",
  "keyPoints": [
   "Oposición distante: número impar de casillas entre los reyes y el rival al turno (reyes en casillas del mismo color).",
   "Ganar la oposición sirve para desbordar; el defensor que la pierde retrocede en línea recta."
  ],
  "positions": [
   {
    "fen": "8/8/4k3/8/4K3/4P3/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Sin tiempos de reserva: el negro defiende con la oposición y retrocede en línea recta.",
    "line": [
     "Kd4",
     "Kd6",
     "e4",
     "Ke6",
     "e5",
     "Ke7",
     "Kd5",
     "Kd7",
     "e6+",
     "Ke7"
    ],
    "comments": [
     "Los reyes estaban en oposición con el blanco al turno: el blanco debe ceder. Intenta rodear por d4.",
     "El negro responde enfrente: otra vez oposición.",
     "El blanco avanza el peón, pero ya no le quedan tiempos de reserva útiles.",
     "El rey negro se coloca delante del peón.",
     "Ahora las casillas clave del peón son d6, e6 y f6 (y las de la séptima).",
     "El defensor retrocede en línea recta, a la casilla de delante del peón: desde ahí podrá volver a oponerse.",
     "El rey blanco avanza.",
     "Oposición directa: el blanco no puede entrar en d6 ni en e6.",
     "El último intento.",
     "El rey negro sigue delante del peón. Tras Ke5 Ke8 Kd6 Kd8 e7+ Ke8 Ke6, el negro queda ahogado: tablas."
    ]
   },
   {
    "fen": "8/8/4k3/8/4K3/8/4P3/8 w - - 0 1",
    "orientation": "white",
    "caption": "Con un tiempo de reserva, la oposición cambia de manos y el blanco desborda.",
    "line": [
     "e3",
     "Kd6",
     "Kf5",
     "Ke7",
     "Ke5",
     "Kf7",
     "Kd6"
    ],
    "comments": [
     "El tiempo de reserva: el peón avanza una sola casilla y ahora es el negro quien debe mover con los reyes en oposición.",
     "El negro tiene que ceder hacia un lado.",
     "¡Desborda! El rey blanco no avanza de frente, sino por el costado que el negro abandonó.",
     "El negro intenta cerrar el paso.",
     "Otra vez oposición, con el negro al turno.",
     "De nuevo debe ceder.",
     "El rey se planta en la sexta fila, por delante de su peón: la victoria es segura."
    ]
   }
  ],
  "drills": [
   {
    "fen": "1k6/8/8/8/2PK4/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: lleva el rey a una casilla clave del peón de c4.",
    "line": [
     "Kd5",
     "Kc7",
     "Kc5"
    ],
    "comments": [
     "Las casillas clave del peón de c4 son b6, c6 y d6, y Kd5 se acerca a ellas. Kc5?, en cambio, permite Kc7: el negro toma la oposición y hace tablas.",
     "El negro se planta frente a las casillas clave.",
     "¡Oposición! El negro, al turno, debe ceder: si Kd7, Kb6; si Kb7, Kd6. El rey blanco llega a una casilla clave."
    ]
   },
   {
    "fen": "8/8/1k6/8/8/8/2KP4/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: ¿hacia dónde va el rey?",
    "line": [
     "Kd3"
    ],
    "comments": [
     "Las casillas clave del peón de d2 son c4, d4 y e4. Desde d3 el rey toca las tres, y el negro solo puede vigilar un lado: si Kc5, Ke4 entra por el otro. Kb3?, en cambio, permite Kb5 y el negro toma la oposición."
    ]
   },
   {
    "fen": "8/8/3k4/8/8/8/2KP4/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: toma la oposición a distancia.",
    "line": [
     "Kc6",
     "Kc3",
     "Kc5"
    ],
    "comments": [
     "Entre c6 y c2 hay tres casillas (número impar) y el blanco tiene el turno: el negro tiene la oposición distante. Ke6 o Ke5 perderían: el rey blanco llegaría a c4 o d4.",
     "El blanco avanza de frente.",
     "El negro conserva la oposición, ahora a una casilla. El rey blanco no llega a c4, d4 ni e4; si d4+, Kd5 y el rey negro se queda delante del peón."
    ]
   }
  ]
 },
 "f-casillas-clave": {
  "html": "<h4>Las casillas clave según la fila del peón</h4><p>El concepto de casilla clave reemplaza el cálculo de variantes por una pregunta simple: ¿puede mi rey pisar una de estas casillas? Para un peón central o de caballo/alfil:</p><ul><li>En la <b>2.ª, 3.ª o 4.ª fila</b>: las tres casillas situadas dos filas por delante. Para un peón en <b>d3</b>: <b>c5</b>, <b>d5</b> y <b>e5</b>.</li><li>En la <b>5.ª fila</b>: las tres casillas de delante y las tres de dos filas más adelante. Para <b>e5</b>: <b>d6</b>, <b>e6</b>, <b>f6</b>, <b>d7</b>, <b>e7</b> y <b>f7</b>.</li><li>En la <b>6.ª fila</b>: las casillas de la séptima y la octava junto al peón (para <b>e6</b>: <b>d7</b>, <b>e7</b>, <b>f7</b>, <b>d8</b>, <b>e8</b>, <b>f8</b>).</li><li><b>Peón de torre</b>: las casillas clave son las de la columna vecina en la séptima y la octava (para un peón de <b>h</b>: <b>g7</b> y <b>g8</b>). Si el rey defensor llega a la esquina o queda delante del peón, es tablas.</li></ul><h4>El camino hacia la casilla clave</h4><p>El atacante no debe ir hacia el peón, sino hacia sus casillas clave. A menudo la ruta correcta es diagonal o lateral, y una jugada de rey «hacia el costado» gana porque obliga al defensor a elegir qué grupo de casillas defiende. Otra técnica es el <b>empujón con el hombro</b>: colocar el rey de forma que impida al rey rival acercarse a la zona clave. En cambio, el peón solo debe avanzar cuando el rey ya está en una casilla clave o cuando ese avance sirve como jugada de espera.</p><h4>La mirada del defensor</h4><p>El defensor razona al revés: debe impedir que el rey rival pise una casilla clave. Por eso su rey busca la <b>casilla de delante del peón</b> o, si el peón está lejos, la posición desde la que pueda tomar la oposición frente a la zona clave. Muchas veces el defensor no se salva por defender el peón, sino por <b>atacarlo</b>: si el atacante tiene que gastar una jugada en protegerlo, pierde el tiempo que necesitaba. Recuerda también que el peón en su casilla inicial ofrece un tiempo de reserva: con el doble paso o el paso simple el atacante elige quién queda con el turno.</p><h4>Errores típicos</h4><ul><li>Avanzar el peón «para ganar terreno» y alejar así las casillas clave del alcance del rey propio.</li><li>Perseguir la oposición cuando el rey ya podía entrar a una casilla clave por otro lado.</li><li>Con el peón de torre, creer que una casilla clave «normal» basta: el rey defensor en la esquina hace tablas.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>Identifica las casillas clave según la fila del peón.</li><li>Cuenta cuántas jugadas necesita cada rey para llegar a ellas.</li><li>Si hay empate de tiempos, decide la oposición (y los tiempos de reserva de peón).</li><li>Comprueba si el defensor puede ganar tiempo atacando el peón.</li></ol>",
  "keyPoints": [
   "Peón en 5.ª fila: seis casillas clave (las tres de delante y las tres siguientes).",
   "Peón de torre: casillas clave en la columna vecina, séptima y octava; el defensor en la esquina hace tablas."
  ],
  "positions": [
   {
    "fen": "8/4k3/8/3KP3/8/8/8/8 b - - 0 1",
    "orientation": "white",
    "caption": "Peón en quinta: seis casillas clave (d6, e6, f6, d7, e7, f7). El negro las defiende con la oposición.",
    "line": [
     "Kd7",
     "Kc5",
     "Ke7",
     "Kd5",
     "Kd7",
     "e6+",
     "Ke7",
     "Ke5",
     "Ke8"
    ],
    "comments": [
     "La única jugada: el negro se opone al rey de d5 y le cierra d6 y e6. Con Kd8 o Kf7, el rey blanco entraría en d6 y ganaría.",
     "El blanco intenta rodear por c5, rumbo a d6.",
     "El negro no persigue al rey hacia el costado: Kc7? permitiría e6, y el peón correría con el rey blanco en d6. Vuelve a vigilar d6, e6 y f6.",
     "El blanco vuelve al centro.",
     "Oposición otra vez: el negro nunca deja libre una casilla clave.",
     "El peón avanza: ahora sus casillas clave son d7, e7, f7 y las de la octava.",
     "El rey negro se pone delante del peón.",
     "El blanco toma la oposición…",
     "…pero el negro retrocede en línea recta, delante del peón. Tras Kd6 Kd8 e7+ Ke8 Ke6 queda ahogado: tablas."
    ],
    "highlights": [
     "d6",
     "e6",
     "f6",
     "d7",
     "e7",
     "f7"
    ]
   },
   {
    "fen": "5k2/8/7K/7P/8/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Peón de torre: aunque el rey blanco esté delante, si el negro alcanza la esquina son tablas.",
    "line": [
     "Kh7",
     "Kf7",
     "h6",
     "Kf8",
     "Kg6",
     "Kg8",
     "h7+",
     "Kh8",
     "Kh6"
    ],
    "comments": [
     "El rey blanco intenta escoltar el peón por h7, pero así se encierra a sí mismo.",
     "El negro vigila g8 y g7, las casillas clave del peón de torre.",
     "El peón avanza.",
     "El rey negro se mantiene cerca de la esquina.",
     "El blanco libera h7 para su peón.",
     "El negro entra en la esquina.",
     "Con jaque, pero el rey negro tiene h8.",
     "El rey ya está en la esquina.",
     "Ahogado: el negro no tiene jugadas. Con el peón de torre, la esquina es una fortaleza."
    ],
    "highlights": [
     "g7",
     "g8"
    ]
   }
  ],
  "drills": [
   {
    "fen": "3k4/8/2K5/5P2/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el peón de f5 está lejos de su rey. ¿Cuál es el camino?",
    "line": [
     "Kd6",
     "Ke8",
     "Ke6",
     "Kf8",
     "Kf6"
    ],
    "comments": [
     "Las casillas clave del peón de f5 son e6, f6, g6, e7, f7 y g7. Desde d6 el rey toca e6 y e7. Kd5? permite Ke7 y el negro defiende la zona clave; f6? acerca el peón al rey negro.",
     "El negro se coloca frente a e7.",
     "El rey pisa e6, una casilla clave: la partida ya está ganada.",
     "El negro se pone delante del peón.",
     "El rey sigue delante de su peón. Empujar f6 ahora sería prematuro: Ke8 y el negro toma la oposición."
    ]
   },
   {
    "fen": "8/8/5k2/3P4/K7/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey está lejos de su peón de d5.",
    "line": [
     "Kb5",
     "Ke7",
     "Kc6",
     "Kd8",
     "Kd6"
    ],
    "comments": [
     "Rumbo a c6, una de las seis casillas clave del peón en quinta (c6, d6, e6, c7, d7, e7). Kb4? llega un tiempo tarde, y d6? solo acerca el peón al rey negro.",
     "El negro corre hacia d7.",
     "El rey ocupa c6, casilla clave: ya no hay defensa.",
     "El negro se planta delante del peón.",
     "¡Rey en la sexta delante del peón! Gana con cualquier turno. Avanzar d6 ahora permitiría Kc8 y la oposición negra."
    ]
   },
   {
    "fen": "8/8/3k4/5K1P/8/8/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas contra el peón de torre.",
    "line": [
     "Ke7",
     "Kg6",
     "Kf8"
    ],
    "comments": [
     "La casilla clave del peón de h es g7 (y g8). El rey negro corre hacia f8 para vigilarla. Ir hacia el peón con Kd5 o Kc5 pierde: Kg6, Kg7 y el peón corona.",
     "El blanco ocupa g6, pero todavía no g7.",
     "El rey negro controla g7 y g8 y puede refugiarse en la esquina: con el peón de torre, eso es tablas."
    ]
   },
   {
    "fen": "8/7k/8/8/8/5P2/2K5/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro está más cerca del peón.",
    "line": [
     "Kd3",
     "Kg7",
     "Ke4"
    ],
    "comments": [
     "Las casillas clave del peón de f3 son e5, f5 y g5. El rey va directo hacia ellas por e4. Kc3? o f4? llegan tarde: el negro se instala en f6 con la oposición.",
     "El negro se acerca: amenaza Kf6.",
     "Si Kf6, Kf4 toma la oposición y el rey entra en e5 o g5; si Kg6, Ke5. El rey alcanza una casilla clave."
    ]
   }
  ]
 },
 "f-triangulacion": {
  "html": "<h4>Tres maneras de perder un tiempo</h4><p>En los finales de peones el turno es un recurso más, tan concreto como un peón. Cuando la posición es de <b>zugzwang recíproco</b>, ganar consiste en llegar a ella con el rival al turno. Hay tres herramientas para conseguirlo: los <b>tiempos de reserva</b> de peón (un peón que puede avanzar una o dos casillas a elección), el <b>rodeo</b> (llevar el rey por un camino más largo que el rival no puede imitar) y la <b>triangulación</b>, que es el caso más elegante del rodeo: el rey recorre tres casillas vecinas formando un triángulo y vuelve al punto de partida, mientras el rey rival, que solo dispone de dos casillas útiles, no puede copiar la maniobra sin ceder una posición importante.</p><h4>Cómo se ejecuta, paso a paso</h4><ol><li><b>Encuentra la posición objetivo</b>: la posición de zugzwang que quieres alcanzar con el rival al turno. Suele ser aquella en la que el rey rival debe abandonar la defensa de un peón o de una casilla clave.</li><li><b>Comprueba el turno</b>: si ya puedes llegar a ella con el rival al turno, no hace falta triangular. Si llegas con tu turno, necesitas perder un tiempo.</li><li><b>Busca tu triángulo</b>: tres casillas mutuamente vecinas desde las cuales sigas controlando lo esencial (normalmente, sin dejar que el rey rival ataque tus peones).</li><li><b>Mira el triángulo del rival</b>: si él tiene también tres casillas equivalentes, la maniobra fracasa. La triangulación funciona cuando el defensor está limitado por el borde del tablero, por sus propios peones o por las casillas que controla tu rey.</li></ol><h4>Casillas correspondientes</h4><p>La triangulación es un caso particular de una teoría más general. Dos casillas son <b>correspondientes</b> cuando, si el atacante ocupa una, el defensor debe ocupar la otra para mantener el equilibrio. El método práctico es trabajar hacia atrás: primero se fija la casilla de zugzwang (por ejemplo, la casilla desde la que el rey atacante gana un peón si el rival tiene el turno); luego se determinan las casillas vecinas desde las cuales el atacante amenaza llegar allí, y cuáles debe ocupar el defensor en cada caso. Si en algún momento a dos casillas del atacante les corresponde una misma casilla del defensor, y el atacante puede alternar entre ellas, el defensor pierde: le falta una casilla. A menudo la correspondencia es sencilla de ver: si los peones están bloqueados, las casillas correspondientes suelen estar «en espejo» respecto del par de peones.</p><h4>Errores típicos</h4><ul><li><b>Apurarse</b>: entrar a la posición crítica con el turno equivocado y descubrir que ya no se puede volver atrás.</li><li><b>Olvidar los tiempos del rival</b>: si el defensor tiene una jugada de peón libre, puede devolver el tiempo que tú perdiste triangulando.</li><li><b>Mover un peón «por si acaso»</b>: los tiempos de reserva son un tesoro; quemarlos sin necesidad suele regalar el zugzwang al rival.</li><li><b>No mirar el contraataque</b>: mientras tu rey hace el triángulo, el rey rival puede atacar un peón propio; cada casilla del triángulo debe seguir protegiendo lo necesario.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Cuál es la posición de zugzwang que busco y quién debe tener el turno en ella?</li><li>¿Puedo llegar directamente con el turno correcto?</li><li>Si no: ¿tengo tiempos de peón, un rodeo o un triángulo? ¿Y el rival?</li><li>Durante la maniobra, ¿quedan protegidos mis peones en cada paso?</li></ol>",
  "keyPoints": [
   "Para pasar el turno: tiempos de reserva de peón, rodeo o triángulo del rey.",
   "Casillas correspondientes: trabaja hacia atrás desde la posición de zugzwang."
  ],
  "positions": [
   {
    "fen": "8/5k2/3p4/p2P1K2/P7/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Zugzwang recíproco: con el blanco al turno, el negro copia cada paso y hace tablas.",
    "line": [
     "Kg5",
     "Kg7",
     "Kf5",
     "Kf7"
    ],
    "comments": [
     "Si fuera turno del negro, perdería: tendría que soltar e6 o g6 y el rey blanco iría a por el peón de d6. El blanco intenta perder un tiempo.",
     "El negro responde en espejo: a cada casilla del rey blanco le corresponde una del negro.",
     "Vuelta a la posición inicial…",
     "…otra vez con el blanco al turno. El negro tiene tanto espacio como el blanco para maniobrar, así que el tiempo no se puede perder: tablas."
    ]
   },
   {
    "fen": "8/8/2p5/2Pk4/3P4/2K5/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Casillas correspondientes: el blanco llega a d3 con el negro al turno.",
    "line": [
     "Kd3",
     "Ke6",
     "Ke4",
     "Kf6",
     "d5",
     "Ke7",
     "d6+"
    ],
    "comments": [
     "Con los reyes en d3 y d5 y el negro al turno, el negro está en zugzwang: no tiene jugadas de peón y su rey debe ceder.",
     "Es la única jugada: d6 y e5 están controladas por los peones blancos, y c4 y e4 son vecinas del rey blanco.",
     "El rey blanco ocupa e4 y amenaza entrar en f5 o en d5.",
     "El negro se defiende como puede.",
     "¡Ruptura! Si cxd5+, Kxd5 y el peón de c5 corona con el apoyo del rey.",
     "El negro no captura, pero ahora el blanco tiene un peón pasado protegido.",
     "Con jaque: el peón avanza y el rey blanco apoyará su marcha o ganará el peón de c6. El blanco gana."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/2p5/2Pk4/3P4/3K4/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: es la posición del ejemplo, pero con el blanco al turno.",
    "line": [
     "Ke3",
     "Ke6",
     "Ke4"
    ],
    "comments": [
     "¡Perder un tiempo! Desde e3 el rey sigue protegiendo d4 y el negro no tiene jugada de espera: sus únicas opciones son Ke6 y Kc4. Kc3, en cambio, deja que el negro mantenga el equilibrio.",
     "Kc4 sería todavía peor: el rey negro se aleja y el blanco entra por e5.",
     "Ahora el blanco ocupa e4 con el negro al turno: el rey entrará en f5 o e5, y la ruptura d5 decidirá."
    ]
   },
   {
    "fen": "8/8/4p3/4P3/3Pk3/8/3K4/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro acecha el peón de d4.",
    "line": [
     "Kc3"
    ],
    "comments": [
     "Kc3 protege el peón de d4 y prepara la marcha Kd3-Kc4 hacia c5 y d6, rumbo al peón de e6. Ke2? permite Kxd4, y d5? exd5 deja al blanco sin nada."
    ]
   },
   {
    "fen": "8/5k2/3p4/p2P4/P3K3/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: ¿a qué casilla debe ir el rey?",
    "line": [
     "Kf5"
    ],
    "comments": [
     "Kf5 alcanza la posición de zugzwang recíproco del primer ejemplo, pero con el negro al turno: ahora debe soltar e6 o g6, y el rey blanco llegará al peón de d6. Kf3? no gana nada, y Kf4? Kf6 hasta pierde: el negro toma la oposición y su rey invade."
    ]
   },
   {
    "fen": "3k4/8/2p5/2P5/3P1K2/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: busca la casilla correspondiente.",
    "line": [
     "Kf5",
     "Ke7",
     "Ke5"
    ],
    "comments": [
     "El objetivo es la posición Ke5 contra Ke7 con el negro al turno. Desde f5 el blanco puede llegar a e5 o a f6 según dónde vaya el negro. Ke4? permite que el negro ocupe a tiempo la casilla correspondiente.",
     "El negro se coloca frente a e5.",
     "¡Zugzwang! El negro debe ceder: si Kd7, Kf6 y el rey sigue hacia e7; si Kf7, Kd6 y cae el peón de c6."
    ]
   }
  ]
 },
 "f-alejado": {
  "html": "<h4>Por qué gana el peón alejado</h4><p>Un peón pasado alejado es aquel que está lejos del resto de los peones y, sobre todo, lejos del rey rival. Su fuerza no está en coronar, sino en <b>desviar</b>: el rey defensor tiene que ir a buscarlo y, mientras lo hace, el rey atacante se come los peones del otro flanco. La cuenta es simple: cuántas jugadas necesita el rey defensor para capturar el peón alejado y volver, frente a cuántas necesita el rey atacante para capturar los peones del otro lado. Cuanto más lejos esté el peón, más tiempo gana el atacante. Por eso un peón de <b>a</b> o de <b>h</b> suele ser más fuerte que uno de <b>c</b> o de <b>f</b>.</p><h4>El plan, paso a paso</h4><ol><li><b>Centraliza el rey</b> antes que nada. El peón alejado no se escapa; el rey tiene que estar listo para invadir.</li><li><b>Avanza el peón alejado lo justo</b> para que el rey rival tenga que seguirlo. No hace falta empujarlo hasta la séptima: basta con que esté fuera del alcance del rey rival si este se queda en el centro.</li><li><b>Sacrifícalo en el momento oportuno</b>: cuando el rey rival lo captura, tu rey ya debe estar en camino hacia los peones del otro flanco.</li><li><b>Come y corona</b>: tras ganar los peones rivales, uno de tus peones restantes llega a la dama, porque el rey defensor quedó lejos.</li></ol><h4>Excepciones: cuando el alejado no alcanza</h4><ul><li><b>Peón pasado protegido</b>: un peón pasado defendido por otro peón suele ser más fuerte que el alejado, porque el rey rival no puede capturarlo y tu rey queda libre.</li><li><b>Rey rival muy activo</b>: si el rey defensor ya está metido entre tus peones del otro flanco, puede comerlos antes de que tu rey haga lo mismo.</li><li><b>Pocos peones</b>: si en el otro flanco quedan peones que el defensor puede proteger o cambiar, la ventaja se reduce; con un solo peón de torre alejado contra nada, el rey defensor llega a la esquina y hace tablas.</li><li><b>Contraataque</b>: si el rival tiene su propio peón pasado, la carrera puede cambiar todo. Cuenta antes de sacrificar.</li></ul><h4>Del medio juego al final</h4><p>Esta idea explica muchas decisiones del medio juego: una <b>mayoría de peones en el flanco de dama</b> (por ejemplo, tres contra dos cuando ambos enrocaron corto) es una ventaja a largo plazo, porque producirá un peón pasado alejado del rey rival. Por la misma razón, cuando tienes un peón alejado o una mayoría sana, los cambios de piezas te favorecen, y el final de peones suele ser la forma más directa de ganar.</p><h4>Cómo pensarlo en la partida</h4><ol><li>¿Quién tiene, o puede crear, el peón pasado más alejado?</li><li>Si el rey rival captura mi peón alejado, ¿cuántas jugadas tarda en volver?</li><li>¿Cuántas jugadas necesita mi rey para comer los peones del otro flanco?</li><li>¿Tiene el rival un peón pasado protegido o un contraataque más rápido?</li></ol>",
  "keyPoints": [
   "El peón alejado es un señuelo: se sacrifica para desviar al rey rival.",
   "Un peón pasado protegido suele resistir al alejado."
  ],
  "positions": [
   {
    "fen": "8/8/4k1p1/7p/P3K2P/6P1/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "El peón alejado como señuelo: el rey negro va a por él y el blanco entra en el otro flanco.",
    "line": [
     "a5",
     "Kd6",
     "Kf4",
     "Kd5",
     "a6",
     "g5+",
     "Kxg5",
     "Ke4",
     "a7"
    ],
    "comments": [
     "El peón avanza para que el rey negro tenga que perseguirlo.",
     "El negro se acerca al peón: si no lo hace, a6 y a7 coronan.",
     "Mientras tanto, el rey blanco va a por los peones del flanco de rey.",
     "El negro sigue persiguiendo el peón de a.",
     "El peón sigue empujando: cada paso aleja más al rey negro.",
     "Desesperación: el negro intenta abrir el flanco de rey.",
     "El rey blanco come y ya tiene camino libre hacia h5.",
     "El negro no llega a tiempo al peón de a, que está fuera de su cuadrado.",
     "El peón corona o el rey negro tiene que gastar dos jugadas más: en ambos casos el blanco gana."
    ]
   },
   {
    "fen": "8/5p1p/6p1/8/1Pk5/6P1/3K1P1P/8 w - - 0 1",
    "orientation": "white",
    "caption": "El peón alejado ya cumplió: mientras el rey negro lo captura, el blanco gana el otro flanco.",
    "line": [
     "Ke3",
     "Kxb4",
     "Kd4",
     "f6",
     "Kd5",
     "Kc3",
     "f4",
     "Kd2",
     "Ke6"
    ],
    "comments": [
     "El peón de b4 no se puede salvar, pero tampoco hace falta: el rey corre hacia el flanco de rey. Defender el peón con g4 o Kc2 no gana.",
     "El negro captura, pero su rey queda a cuatro columnas de los peones del flanco de rey.",
     "El rey blanco avanza hacia d5 y e6.",
     "El negro intenta cerrarle el paso con sus peones.",
     "Rumbo a e6.",
     "El rey negro vuelve, pero de muy lejos.",
     "Una jugada útil de peón: impide g5 y fija la estructura antes de entrar.",
     "El negro sigue volviendo.",
     "El rey blanco entra: caerá f6 y luego el resto de los peones. El blanco gana."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/8/6p1/5kP1/1P1K4/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro está a punto de comer el peón de g4.",
    "line": [
     "b4",
     "Kxg4",
     "b5",
     "Kf5",
     "b6"
    ],
    "comments": [
     "¡Corre con el peón alejado! El rey negro tendrá que elegir entre comer en g4 o perseguir el peón de b, y no puede hacer las dos cosas. Kc4 o Kc3 no ganan: el negro come g4 y su peón de g se vuelve peligroso.",
     "El negro captura: ahora está muy lejos del flanco de dama.",
     "El peón sigue: el cuadrado de b5 es b5-e5-e8-b8, y el rey de g4 está fuera.",
     "El rey negro corre, pero va dos tiempos atrás.",
     "El peón llega a la sexta y coronará: el rey negro no alcanza c7 a tiempo."
    ]
   },
   {
    "fen": "8/8/8/6p1/5kP1/1P1K4/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: el blanco amenaza crear un peón alejado.",
    "line": [
     "Kxg4"
    ],
    "comments": [
     "Hay que comer: el rey negro no alcanza el peón de b, así que la salvación es su propio peón pasado. Tras b4, el rey se aparta y el peón de g corre: los dos bandos coronan y son tablas. Ke5 o Kg3, en cambio, pierden: el blanco gana el peón de g o corona antes."
    ]
   }
  ]
 },
 "f-ruptura": {
  "html": "<h4>Cómo funciona una ruptura</h4><p>Una ruptura es un sacrificio de uno o más peones para crear por la fuerza un peón pasado. Funciona porque los peones rivales solo pueden capturar en diagonal y hacia adelante: si tu peón amenaza capturar, el rival está obligado a tomar, y cada captura deja un hueco por el que pasa otro de tus peones. Los patrones más útiles son pocos y conviene conocerlos de memoria: tres peones contra tres en la quinta fila (el sacrificio del peón central), dos contra uno cuando el peón rival está bloqueado y los tuyos en la quinta, y la ruptura con un peón que ataca a dos peones a la vez.</p><h4>Las condiciones</h4><ul><li><b>Peones avanzados</b>: tus peones deben estar en la quinta fila (o más allá). Desde la cuarta, el peón que se libera está demasiado lejos de la coronación.</li><li><b>Rey rival lejos</b>: la ruptura crea un peón pasado, pero si el rey defensor está dentro de su cuadrado, lo captura y los peones sacrificados quedan perdidos.</li><li><b>Tu rey no tan lejos de los peones rivales</b>: a veces la ruptura le permite al rival crear su propio peón pasado. Si ese peón corona antes o con jaque, la ruptura falla.</li><li><b>El turno</b>: muchas rupturas solo funcionan si juegas tú. Si es el rival quien mueve, a veces él puede adelantarse con su propia ruptura o colocar sus peones de forma que el sacrificio ya no funcione.</li></ul><h4>Ruptura y defensa</h4><p>La ruptura es también un recurso <b>defensivo</b>. Un bando que va perdiendo en el otro flanco puede salvarse si dispone de una ruptura que amenaza coronar. Por eso, al evaluar un final de peones, no basta con contar peones: hay que mirar qué rupturas tiene cada bando. Una regla práctica de defensa: si tus peones están frente a peones rivales avanzados, <b>no los adelantes</b> sin necesidad, porque cada paso adelante acerca a los peones enemigos a la quinta fila y les facilita la ruptura. Mantenerlos en su casilla inicial (o en la sexta para las negras) suele ser lo más sólido.</p><h4>Errores típicos</h4><ul><li>Sacrificar el peón equivocado: en tres contra tres, el sacrificio correcto es el del peón central; empezar por un lado suele fallar.</li><li>Olvidar que el rival puede no capturar: si ignora la amenaza, ¿tu peón corona igual o solo se pierde un tiempo?</li><li>No contar la carrera completa: después de la ruptura, ¿quién corona primero, y con jaque?</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Mis peones están en la quinta y el rey rival fuera del cuadrado del peón que se liberaría?</li><li>¿Qué peón sacrifico primero y qué pasa si el rival no captura?</li><li>¿Tiene el rival una ruptura o un peón pasado más rápido?</li><li>¿Coronaré con jaque, o la dama rival aparecerá antes?</li></ol>",
  "keyPoints": [
   "Tres contra tres en la quinta: sacrifica el peón central.",
   "Cuenta siempre la carrera posterior y las rupturas del rival."
  ],
  "positions": [
   {
    "fen": "8/6pp/8/4kPPP/8/8/1K6/8 w - - 0 1",
    "orientation": "white",
    "caption": "Tres contra dos: la ruptura f6 libera un peón aunque el rey negro esté cerca.",
    "line": [
     "f6",
     "gxf6",
     "g6",
     "hxg6",
     "h6"
    ],
    "comments": [
     "El sacrificio en f6 abre camino. Empujar h6 primero no sirve: gxh6 y ya no hay ruptura.",
     "Si el negro no captura, fxg7 y el peón corona.",
     "¡Segundo sacrificio! Amenaza gxh7. Si el negro no captura, el peón llega a h8.",
     "Forzado.",
     "El peón de h queda libre y el rey negro, en e5, está fuera de su cuadrado. El blanco corona."
    ]
   },
   {
    "fen": "8/1p6/8/1PPk4/8/8/8/K7 w - - 0 1",
    "orientation": "white",
    "caption": "La ruptura falla si el rey rival está dentro del cuadrado.",
    "line": [
     "c6",
     "bxc6",
     "bxc6",
     "Kxc6"
    ],
    "comments": [
     "Es lo mejor (b6 sería todavía peor), pero no alcanza.",
     "El negro captura.",
     "El peón de c6 es pasado… pero está pegado al rey negro.",
     "El rey negro estaba dentro del cuadrado: captura el peón y son tablas. Antes de romper, mira dónde está el rey rival."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/1pp5/p7/PPP5/2k5/8/1K6/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el peón de a6 cambia el patrón habitual. ¿Qué peón sacrificas?",
    "line": [
     "c6"
    ],
    "comments": [
     "¡El peón de c! Amenaza cxb7. Si bxc6, bxa6 crea un pasado imparable; si b6, bxa6 o axb6 también rompen. En cambio b6? permite cxb6 y el blanco se queda sin ruptura y pierde."
    ]
   },
   {
    "fen": "8/5pp1/8/4P1P1/2k5/8/8/3K4 w - - 0 1",
    "caption": "Juegan blancas y ganan: dos peones contra dos y el rey negro lejos.",
    "line": [
     "g6",
     "Kd5",
     "gxf7"
    ],
    "comments": [
     "Ataca f7. Si fxg6, e6 y el peón de e corona; si f6, exf6 gxf6 y g7. Una jugada de rey perdería: el negro tendría tiempo de llevar su rey.",
     "El rey negro intenta acercarse.",
     "El peón llega a la séptima y f8=Q no se puede impedir."
    ]
   },
   {
    "fen": "k7/5ppp/8/5PPP/8/8/8/7K b - - 0 1",
    "caption": "Juegan negras: el blanco amenaza la ruptura de los tres peones. ¿Cómo la impides?",
    "line": [
     "g6"
    ],
    "comments": [
     "g6 desarma la ruptura: tras los cambios quedan peones bloqueados y ningún pasado. Cualquier jugada de rey permitiría g6!, el sacrificio del peón central, y el blanco coronaría."
    ]
   },
   {
    "fen": "8/5pp1/7p/5PPP/2k5/8/8/3K4 w - - 0 1",
    "caption": "Juegan blancas y ganan: el peón negro de h6 cambia la estructura. ¿Dónde está la ruptura?",
    "line": [
     "f6"
    ],
    "comments": [
     "f6 ataca g7. Si gxf6, gxh6 y el peón de h corona; si g6, hxg6 o gxh6 dejan al blanco con peones pasados imparables. Otras jugadas, como g6, permiten cambios que llevan a tablas."
    ]
   }
  ]
 },
 "f-rey-activo": {
  "html": "<h4>El rey cambia de oficio</h4><p>Durante el medio juego el rey es un objetivo: hay damas, torres y piezas menores capaces de darle mate. Cuando esas piezas desaparecen, el peligro se esfuma y el rey se transforma en una pieza de ataque que controla ocho casillas, defiende peones y ataca los del rival. La frase práctica es simple: <b>en el final, el rey es una pieza más</b>, y quien lo activa primero suele ganar. En los finales de peones la actividad del rey es casi siempre el factor decisivo, más importante incluso que un peón de ventaja.</p><h4>Los tres planes del rey activo</h4><ol><li><b>Centralizar</b>: desde el centro el rey llega rápido a cualquier flanco. Si no sabes qué hacer en un final, una jugada de rey hacia el centro casi nunca es mala.</li><li><b>Invadir</b>: buscar una entrada (una casilla de la cuarta, quinta o sexta fila del rival) desde la cual atacar peones. Los peones que el rival ya no puede proteger con otros peones son los blancos ideales.</li><li><b>Escoltar</b>: colocarse delante o al lado de un peón pasado propio, para llevarlo a la coronación sin que el rey rival lo bloquee.</li></ol><p>Muchas veces hay que elegir entre comer un peón y mejorar la posición del rey. Antes de capturar, pregúntate dónde quedará tu rey después de la captura y qué hará mientras tanto el rey rival.</p><h4>Invasión, zugzwang y tácticas de peones</h4><p>Un rey activo no gana solo: crea amenazas que el rival debe atender, y con pocas piezas en el tablero eso conduce al <b>zugzwang</b>. Cuando el rey rival está atado a la defensa de un peón o de una casilla, cualquier jugada de espera puede obligarlo a soltarla. Además, el rey activo se combina con pequeñas tácticas de peones: un sacrificio que desvía al rey defensor, un peón que avanza con jaque o una ruptura que abre la puerta de entrada. El rey propio, bien colocado, convierte esas tácticas en algo concreto, porque está listo para entrar en cuanto la casilla queda libre.</p><h4>Errores típicos</h4><ul><li><b>Mover peones en lugar del rey</b>: cada jugada de peón es irreversible y crea casillas débiles. Primero el rey.</li><li><b>Ir a comer peones lejanos</b> mientras el rey rival entra en tu campo y se come los tuyos más rápido.</li><li><b>Dejar el rey en la primera fila</b> «por seguridad» cuando ya no hay piezas capaces de atacarlo.</li><li><b>Olvidar la oposición</b>: dos reyes activos frente a frente se bloquean, y el turno decide quién debe ceder.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Quedan piezas capaces de atacar a mi rey? Si no, el rey sale.</li><li>¿Cuál es la casilla de entrada al campo rival y cuántas jugadas me separan de ella? ¿Y al rival de la mía?</li><li>¿Qué peones rivales no pueden ser defendidos por otros peones?</li><li>¿Hay una táctica de peones (desviación, ruptura) que le abra paso a mi rey?</li></ol>",
  "keyPoints": [
   "Planes del rey activo: centralizar, invadir, escoltar.",
   "Antes de comer un peón lejano, mira dónde entra el rey rival."
  ],
  "positions": [
   {
    "fen": "8/2k5/1p4p1/p6p/P6P/1P2K1P1/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Carrera de reyes: gana el que llega primero a los peones que nadie defiende.",
    "line": [
     "Kf4",
     "Kc6",
     "Kg5",
     "Kc5",
     "Kxg6",
     "Kb4",
     "Kxh5",
     "Kxb3"
    ],
    "comments": [
     "El rey va a por g6: ese peón no puede ser protegido por otro peón.",
     "El negro contraataca en el otro flanco, rumbo a b3.",
     "Ataca g6.",
     "El negro sigue su carrera.",
     "Primer peón.",
     "El negro llega a b3.",
     "El blanco ya tiene un peón de h pasado y su rey lo escolta.",
     "El negro también come, pero va un tiempo atrás: el peón de h coronará primero y el blanco gana."
    ]
   },
   {
    "fen": "8/p7/5p2/4K1p1/1Pk3P1/5P2/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Comer en el orden correcto: el rey blanco gana dos peones y se salva.",
    "line": [
     "Kxf6",
     "Kxb4",
     "Kxg5",
     "a5",
     "f4",
     "a4",
     "f5"
    ],
    "comments": [
     "El rey come el peón más cercano y queda junto a g5. Kf5 sería un tiempo más lento.",
     "El negro come b4 y su peón de a queda libre.",
     "Segundo peón: ahora el blanco tiene dos peones pasados unidos.",
     "El peón de a corre.",
     "Los peones blancos también avanzan.",
     "Carrera pareja.",
     "Ambos bandos coronan: tablas. Con cualquier jugada más lenta del rey, el blanco habría perdido."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/5k2/1p4p1/p6p/P6P/1P1K2P1/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: ¿hacia qué flanco va el rey?",
    "line": [
     "Kc4",
     "Ke7",
     "Kb5"
    ],
    "comments": [
     "Hacia b6, un peón que ya no puede ser defendido por otro peón. Kc3 o Kd4 pierden un tiempo y el negro llega a defenderse.",
     "El rey negro corre hacia el flanco de dama.",
     "El rey ataca b6: caerán b6 y a5, y el peón de a coronará antes de que el negro haga daño en el otro flanco."
    ]
   },
   {
    "fen": "8/p7/5p2/3k2p1/1P4P1/2K2P2/8/8 w - - 0 1",
    "caption": "Juegan blancas y hacen tablas: el rey negro amenaza entrar.",
    "line": [
     "Kd3"
    ],
    "comments": [
     "Kd3 toma la oposición y le cierra al rey negro las casillas c4 y e4. Con f4? o Kb3?, el rey negro entra y come peones."
    ]
   },
   {
    "fen": "8/p7/5p2/6p1/1P3kP1/3K1P2/8/8 w - - 0 1",
    "caption": "Juegan blancas y hacen tablas: el rey negro ya está en f4.",
    "line": [
     "Ke2"
    ],
    "comments": [
     "El rey protege f3 y le cierra al rey negro el paso por e3. Con Kd2 o Kc2, el negro come en f3 y el rey blanco llega tarde a defender g4."
    ]
   },
   {
    "fen": "8/p7/5p2/4k1p1/1P4P1/3K1P2/8/8 w - - 0 1",
    "caption": "Juegan blancas y hacen tablas: el rey negro está en e5, listo para entrar.",
    "line": [
     "Ke3"
    ],
    "comments": [
     "Oposición: el rey blanco se planta frente al negro y le cierra d4 y f4. Con Kd2 o Kc4, el rey negro entra en f4 o d4 y gana los peones del flanco de rey."
    ]
   }
  ]
 },
 "f-dama-rey": {
  "html": "<h4>El método, con números</h4><p>El mate de dama y rey contra rey se da en no más de diez jugadas desde cualquier posición, pero solo si se sigue un método. La idea central es la <b>caja</b>: la dama, colocada a salto de caballo del rey rival, le prohíbe una zona rectangular del tablero sin darle jaque. Cada vez que el rey rival se mueve dentro de su caja, la dama lo sigue manteniendo el salto de caballo y la caja se achica, hasta que el rey queda encerrado en una sola fila o columna del borde. En ese momento <b>la dama se detiene</b> y entra en acción el rey propio.</p><h4>El ahogado: tres imágenes que hay que reconocer</h4><p>Casi todos los ahogados con dama tienen la misma forma: el rey rival en la esquina o en el borde, y la dama demasiado cerca, a salto de caballo, sin dar jaque y sin dejarle ninguna casilla. Memoriza estas dos imágenes (valen igual para cualquier esquina):</p><ul><li>Rey negro en <b>a8</b> y dama blanca en <b>b6</b> (o en <b>c7</b>).</li><li>Rey negro en <b>h8</b> y dama blanca en <b>g6</b> (o en <b>f7</b>).</li></ul><p>Por eso, cuando el rey rival ya tiene solo dos casillas, la regla es: <b>antes de mover la dama, cuenta sus casillas libres</b>. Si después de tu jugada no le queda ninguna y no está en jaque, es ahogado.</p><h4>Los dos mates finales</h4><p>Hay dos patrones de mate y conviene buscar uno de los dos desde lejos. En el primero, la dama da jaque en una casilla vecina al rey rival y está protegida por su propio rey (por ejemplo, dama en <b>g7</b> protegida por el rey en <b>f6</b> o <b>h6</b>). En el segundo, el rey propio se coloca enfrente del rival, con una casilla en medio (oposición), y la dama da jaque desde lejos por la fila o columna del borde. Saber cuál de los dos vas a dar te indica a dónde llevar el rey.</p><h4>Errores típicos</h4><ul><li><b>Dar jaques sin plan</b>: un jaque que no reduce la caja solo devuelve libertad al rey rival.</li><li><b>No traer el rey</b>: la dama sola no da mate. Cuando el rey rival está en el borde, todas las jugadas útiles son del rey propio, salvo una jugada de espera si hiciera falta.</li><li><b>Ahogar por apuro</b>: el error más caro, porque convierte una partida ganada en tablas.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿La dama está a salto de caballo del rey rival? Si no, colócala así.</li><li>¿El rey rival ya está en el borde? Entonces, rey propio hacia él.</li><li>Antes de cada jugada: ¿le queda al menos una casilla o recibe jaque?</li><li>¿Qué patrón de mate busco: dama protegida por el rey u oposición más jaque desde lejos?</li></ol>",
  "keyPoints": [
   "Con el rey rival en el borde, la dama se detiene y trabaja el rey.",
   "Ahogados típicos: rey en a8 con dama en b6 o c7."
  ],
  "positions": [
   {
    "fen": "8/8/8/8/8/2k5/8/K2Q4 w - - 0 1",
    "orientation": "white",
    "caption": "La caja: la dama encierra al rey sin dar jaque y lo sigue a salto de caballo.",
    "line": [
     "Qd5",
     "Kc2",
     "Ka2",
     "Kc3",
     "Kb1",
     "Kb4",
     "Kb2"
    ],
    "comments": [
     "Desde d5 la dama le prohíbe al rey la columna d y la quinta fila: su caja es el rectángulo a1-c4.",
     "El rey negro busca espacio.",
     "El rey blanco se acerca. La dama no necesita moverse.",
     "El negro va y viene dentro de su caja.",
     "Otra jugada de rey.",
     "El rey negro intenta salir por b4.",
     "Los reyes se acercan; ahora la dama podrá achicar la caja con Qc6 o Qd4 y el mate llegará en pocas jugadas."
    ]
   },
   {
    "fen": "k7/2Q5/8/1K6/8/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Peligro de ahogado: el rey negro no tiene ninguna jugada. Primero hay que darle una.",
    "line": [
     "Qd7",
     "Kb8",
     "Kb6",
     "Ka8",
     "Qa7#"
    ],
    "comments": [
     "Con el negro sin jugadas, una jugada de rey como Kb6 o Ka6 sería ahogado. La dama se aparta y le devuelve b8.",
     "La única jugada del negro.",
     "Ahora sí el rey blanco se acerca: al negro solo le queda a8 (c8 está dominada por la dama).",
     "Única jugada.",
     "Mate: la dama en a7 está protegida por el rey."
    ],
    "highlights": [
     "a7",
     "b7",
     "b8"
    ]
   }
  ],
  "drills": [
   {
    "fen": "7k/8/8/6Q1/3K4/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres: el rey negro ya está en el borde.",
    "line": [
     "Ke5",
     "Kh7",
     "Kf6",
     "Kh8",
     "Qg7#"
    ],
    "comments": [
     "La dama ya encierra al rey en h7-h8: ahora trabaja el rey. Los jaques de dama solo darían más libertad.",
     "El negro va y viene.",
     "El rey llega a f6 y protege g7.",
     "Única jugada.",
     "Mate con la dama protegida por el rey."
    ]
   },
   {
    "fen": "1k6/8/2Q5/3K4/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres. El rey negro solo tiene una casilla: ¡no lo ahogues!",
    "line": [
     "Qd7",
     "Ka8",
     "Kc6",
     "Kb8",
     "Qb7#"
    ],
    "comments": [
     "La dama le deja al negro a8 y b8 y prepara la llegada del rey. Acercar primero el rey (Kc5 o Kd6) da mate una jugada más tarde.",
     "El rey va a la esquina.",
     "Ahora sí, el rey blanco se acerca y protegerá b7.",
     "Única jugada.",
     "Mate: la dama en b7 está protegida por el rey."
    ]
   },
   {
    "fen": "2k5/8/8/4K3/8/8/8/Q7 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres.",
    "line": [
     "Qa7",
     "Kd8",
     "Kd6",
     "Ke8",
     "Qe7#"
    ],
    "comments": [
     "La dama corta la séptima fila: el rey negro queda encerrado en la octava.",
     "El negro busca el centro de su fila.",
     "Con la caja reducida a una fila, trabaja el rey: se coloca frente al rey negro.",
     "Única jugada.",
     "Mate: la dama en e7, protegida por el rey."
    ]
   },
   {
    "fen": "8/k2K4/8/8/8/8/8/3Q4 w - - 0 1",
    "caption": "Juegan blancas y dan mate en dos.",
    "line": [
     "Kc7",
     "Ka6",
     "Qa4#"
    ],
    "comments": [
     "El rey le quita b6, b7 y b8. Al negro solo le quedan a6 y a8, y en los dos casos Qa4 será mate.",
     "El rey negro sale hacia a6.",
     "Mate por la columna a: el rey blanco cubre b6 y b7, y la dama controla a5 y b5."
    ]
   }
  ]
 },
 "f-torre-rey": {
  "html": "<h4>Por qué la torre necesita al rey</h4><p>La torre controla filas y columnas enteras, pero no las casillas en diagonal. Por eso puede encerrar al rey rival en una parte del tablero, aunque nunca darle mate sin ayuda: el rey propio tiene que tapar las casillas que la torre no cubre. El mate con torre tiene siempre la misma forma: el rey rival en el borde, el rey propio enfrente (en oposición) y la torre dando jaque por la fila o columna del borde.</p><h4>La caja, más rápido</h4><p>El método clásico consiste en <b>achicar la caja</b>: la torre corta al rey rival en un rectángulo, y cada vez que es posible se acerca una fila o columna para reducirlo. Para ir rápido:</p><ul><li>Acerca primero el rey propio, que es el que hace el trabajo lento. Mientras el rey avanza, la torre no necesita moverse.</li><li>Achica la caja cada vez que el rey propio protege la torre o cuando el rey rival se aleja de ella.</li><li>Mantén la torre lejos del rey rival: a distancia, por la misma fila o columna, no puede ser atacada.</li></ul><h4>Oposición y jugada de espera</h4><p>El jaque solo es útil cuando los reyes están en oposición: entonces el rey rival tiene que retroceder una fila. Si los reyes están a <b>salto de caballo</b> (por ejemplo, el rey blanco en <b>d6</b> y el negro en <b>e8</b>), hay dos maneras de seguir: llevar el rey a la oposición si el rival se ve obligado a ir enfrente, o hacer una <b>jugada de espera</b> con la torre, por la misma fila de corte, para que sea el rey rival quien tenga que mover y se ponga en oposición o se aleje. Ese pequeño truco de tiempo es lo que distingue al jugador que mata en quince jugadas del que da vueltas sin fin. Con práctica, el mate de torre se da en menos de veinte jugadas desde cualquier posición, así que la regla de las 50 jugadas no es un problema si sigues el método sin titubeos.</p><h4>Errores típicos</h4><ul><li><b>Dar jaques sin oposición</b>: el rey rival simplemente se aparta y la caja no se achica.</li><li><b>Dejar la torre al alcance del rey rival</b> sin protección: hay que moverla y se pierde tiempo.</li><li><b>Ahogar en la esquina</b>: con el rey rival en h8, el rey blanco en h6 y la torre en la columna g, el negro no tiene jugadas. Revisa sus casillas antes de mover.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿La torre corta al rey rival? Si no, empieza por ahí.</li><li>¿Puedo achicar la caja sin que la torre quede atacada?</li><li>¿Los reyes están en oposición? Entonces jaque. ¿A salto de caballo? Jugada de espera.</li><li>Antes de cada jugada cerca de la esquina: ¿el rey rival tiene alguna casilla?</li></ol>",
  "keyPoints": [
   "Achica la caja cada vez que la torre esté protegida o lejos del rey rival.",
   "Reyes a salto de caballo: jugada de espera con la torre."
  ],
  "positions": [
   {
    "fen": "8/8/8/8/3k4/8/8/4K2R w - - 0 1",
    "orientation": "white",
    "caption": "Primero cortar, después acercar el rey: la torre encierra al rey negro en la mitad inferior del tablero.",
    "line": [
     "Rh5",
     "Ke4",
     "Ke2",
     "Kd4",
     "Kf3",
     "Kc3",
     "Ke3"
    ],
    "comments": [
     "La torre corta al rey negro por la quinta fila: ya no puede subir.",
     "El rey negro intenta atacar a la torre o escapar por el costado.",
     "El rey blanco se acerca. La torre está lejos y a salvo.",
     "El negro se aparta.",
     "El rey blanco avanza en diagonal, ganando terreno.",
     "El negro se va hacia el flanco de dama.",
     "El rey blanco lo sigue; la próxima jugada de torre achicará la caja y el negro quedará cada vez más arrinconado."
    ]
   },
   {
    "fen": "5K1k/5R2/8/8/8/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Peligro de ahogado: si el negro tuviera que mover, no tendría jugadas.",
    "line": [
     "Rf6",
     "Kh7",
     "Rb6",
     "Kh8",
     "Rh6#"
    ],
    "comments": [
     "La torre se aparta de la séptima y le devuelve h7 al negro. Una jugada de rey o de torre por la séptima fila sería ahogado.",
     "Única jugada.",
     "Jugada de espera por la sexta fila: el rey negro solo puede volver a h8.",
     "Única jugada.",
     "Mate por la columna h: el rey blanco cubre g7 y g8."
    ],
    "highlights": [
     "g7",
     "g8",
     "h7"
    ]
   }
  ],
  "drills": [
   {
    "fen": "1k6/8/8/3K4/8/8/8/R7 w - - 0 1",
    "caption": "Juegan blancas y dan mate en dos.",
    "line": [
     "Kc6",
     "Kc8",
     "Ra8#"
    ],
    "comments": [
     "La torre ya corta al rey en la octava fila y la columna a. El rey blanco se acerca y le quita b7, c7 y d7.",
     "Única jugada: a8 y a7 están dominadas por la torre.",
     "Mate: los reyes en oposición y la torre por el borde."
    ]
   },
   {
    "fen": "2R5/k7/8/3K4/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en dos.",
    "line": [
     "Kc6",
     "Ka6",
     "Ra8#"
    ],
    "comments": [
     "El rey le quita b6 y b7; la torre domina la octava fila. Al negro solo le queda a6.",
     "Única jugada.",
     "Mate por la columna a: el rey blanco cubre b5, b6 y b7."
    ]
   },
   {
    "fen": "2k5/8/1R6/3K4/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en dos.",
    "line": [
     "Kd6",
     "Kd8",
     "Rb8#"
    ],
    "comments": [
     "El rey se acerca y le quita c7 y d7; la torre controla la columna b. El negro solo puede ir a d8.",
     "Única jugada.",
     "Mate: los reyes en oposición en la columna d y la torre en la octava."
    ]
   },
   {
    "fen": "5K1k/6R1/8/8/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres. Ojo: el negro no tiene ninguna jugada.",
    "line": [
     "Rg6"
    ],
    "comments": [
     "El negro está sin jugadas: cualquier jugada que no le devuelva una casilla es ahogado. Rg6 libera h7 y prepara Kf7 y Rh6#. Rg5 también libera h7, pero el mate tarda una jugada más."
    ]
   }
  ]
 },
 "f-alfil-caballo": {
  "html": "<h4>Las tres fases</h4><p>El mate de alfil y caballo se divide en tres etapas. Primero, llevar el rey rival al borde con las tres piezas juntas: el rey propio en el centro, el alfil y el caballo cubriendo casillas complementarias (el alfil, un color; el caballo, el otro). Segundo, si el rey rival se refugia en la esquina del color equivocado, conducirlo por el borde hacia una esquina del color del alfil. Tercero, el mate propiamente dicho. El rey defensor siempre corre hacia la esquina que no sirve, así que hay que estar preparado para la segunda fase.</p><h4>La segunda fase: cerrar la salida</h4><p>En el método de la <b>maniobra en W</b>, el rey atacante se coloca frente al rey rival, a una casilla de distancia, y el caballo recorre el borde en forma de <b>W</b>, saltando de la segunda a la tercera fila desde el borde y volviendo. El alfil, desde lejos, cierra la diagonal por la que el rey rival intenta escapar hacia el centro. Lo esencial es que en cada momento las tres piezas tapen las casillas de huida: el rey rival se desplaza por el borde hacia la esquina buena porque no tiene otro camino. Si en algún momento el rey defensor encuentra un «agujero» hacia el centro, hay que volver a empezar la fase y se pierden muchas jugadas.</p><h4>El mate en la esquina buena</h4><p>En la esquina del color del alfil, el patrón final es casi siempre el mismo: el rey atacante a salto de caballo de la esquina (por ejemplo, en <b>g6</b> con el rey rival en <b>h8</b>), el caballo cubriendo la casilla vecina del color contrario al alfil y el alfil dando el jaque final en la diagonal. Una jugada de espera con el alfil es a menudo la clave para que el rey rival tenga que ir a la esquina en el momento justo, porque el caballo no puede perder un tiempo.</p><h4>Errores típicos</h4><ul><li><b>Separar las piezas</b>: un caballo lejos de su rey deja huecos por los que el rey rival vuelve al centro.</li><li><b>Buscar mate en la esquina equivocada</b>: allí no existe, por mucho que el rey rival parezca encerrado.</li><li><b>Ahogar</b>: con el rey rival en la esquina y pocas casillas, cada jugada de alfil o caballo puede quitarle la última.</li><li><b>La regla de las 50 jugadas</b>: el mate puede requerir más de treinta jugadas; si dudas mucho, el tiempo legal se acaba.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿De qué color es mi alfil y cuáles son las esquinas buenas?</li><li>¿Las tres piezas trabajan juntas y no hay agujero hacia el centro?</li><li>Si necesito pasar el turno, ¿qué jugada de alfil lo hace sin abrir una salida?</li><li>Antes de cada jugada cerca de la esquina: ¿hay ahogado?</li></ol>",
  "keyPoints": [
   "El caballo no puede perder un tiempo: las jugadas de espera las hace el alfil.",
   "Mate en la esquina del color del alfil, con el rey atacante a salto de caballo de la esquina."
  ],
  "positions": [
   {
    "fen": "5k2/8/4K2N/8/8/6B1/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "Cerrar las salidas: las tres piezas encierran al rey cerca de la esquina buena (h8, casilla oscura).",
    "line": [
     "Nf5",
     "Ke8",
     "Bh4",
     "Kf8",
     "Be7+",
     "Kg8",
     "Kf6"
    ],
    "comments": [
     "El caballo vuelve al juego y controla g7 y e7.",
     "El rey negro intenta huir hacia la esquina a8, que es del color equivocado.",
     "El alfil controla d8 y e7: el rey negro no puede seguir por la octava.",
     "Tiene que volver.",
     "Jaque que lo empuja hacia la esquina buena.",
     "El rey negro ya no tiene salida hacia el centro.",
     "Las tres piezas trabajan juntas: el mate en la esquina h8 llega en pocas jugadas."
    ]
   },
   {
    "fen": "7k/8/4K3/2B4N/8/8/8/8 w - - 0 1",
    "orientation": "white",
    "caption": "El mate en la esquina del color del alfil.",
    "line": [
     "Kf7",
     "Kh7",
     "Bf8",
     "Kh8",
     "Bg7+",
     "Kh7",
     "Nf6#"
    ],
    "comments": [
     "El rey toma g8 y g6.",
     "El negro va y viene entre h8 y h7.",
     "Jugada de espera del alfil, que además controla g7.",
     "Única jugada.",
     "Jaque con el alfil en la gran diagonal.",
     "Única jugada.",
     "Mate: el caballo da jaque desde f6 y el alfil cubre h8."
    ]
   }
  ],
  "drills": [
   {
    "fen": "4KB1k/8/4N3/8/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres.",
    "line": [
     "Kf7",
     "Kh7",
     "Ng5+",
     "Kh8",
     "Bg7#"
    ],
    "comments": [
     "El rey toma g8 y g6 y deja al negro con h7 y h8.",
     "Única jugada.",
     "Jaque de caballo: el rey vuelve a la esquina.",
     "Única jugada.",
     "Mate: el alfil en g7, protegido por el rey, y el caballo cubre h7."
    ]
   },
   {
    "fen": "4K2k/8/8/8/7N/8/8/4B3 w - - 0 1",
    "caption": "Juegan blancas y dan mate en cinco: el caballo no puede perder un tiempo, el alfil sí.",
    "line": [
     "Kf7",
     "Kh7",
     "Bd2",
     "Kh8",
     "Ng6+",
     "Kh7",
     "Nf8+"
    ],
    "comments": [
     "El rey encierra al negro en h7-h8.",
     "El negro alterna entre sus dos casillas.",
     "¡Jugada de espera del alfil! Se coloca en la diagonal c1-h6, lista para Bc3 al final.",
     "El negro vuelve a la esquina.",
     "Jaque de caballo que obliga al rey a salir a h7.",
     "Única jugada.",
     "Otro jaque: el rey vuelve a h8 y Bc3 es mate."
    ]
   },
   {
    "fen": "6k1/8/8/5KN1/1B6/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en cuatro.",
    "line": [
     "Kg6",
     "Kh8",
     "Nf7+",
     "Kg8",
     "Nh6+",
     "Kh8",
     "Bc3#"
    ],
    "comments": [
     "El rey se coloca a salto de caballo de la esquina, en la posición clave del mate.",
     "El negro se mete en la esquina; es su defensa más tenaz.",
     "Jaque que saca al rey a g8.",
     "Única jugada.",
     "Otro jaque: el rey debe volver a h8.",
     "Única jugada.",
     "Mate en la gran diagonal: el caballo de h6 cubre g8."
    ]
   },
   {
    "fen": "8/5K1k/5B2/8/3N4/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y dan mate en cuatro.",
    "line": [
     "Bg5",
     "Kh8",
     "Ne6",
     "Kh7",
     "Nf8+",
     "Kh8",
     "Bf6#"
    ],
    "comments": [
     "Jugada de espera: el alfil sigue controlando h6 y le deja al negro solo h8.",
     "Única jugada.",
     "El caballo se dirige a f8.",
     "Única jugada.",
     "Jaque: el rey vuelve a la esquina.",
     "Única jugada.",
     "Mate: el alfil en f6 da jaque por la gran diagonal y el caballo de f8 cubre h7."
    ]
   }
  ]
 },
 "f-lucena": {
  "html": "<h4>Antes del puente: las condiciones</h4><p>La posición de Lucena gana siempre que se den cuatro condiciones: el peón está en la <b>séptima</b> fila, no es un peón de torre, el rey atacante está en la casilla de coronación delante de su peón y el rey defensor está <b>cortado</b> por la torre atacante al menos a una columna de distancia. Si la tercera o la cuarta condición falla, hay que trabajar antes de construir el puente. El primer paso típico es un jaque lateral que aleja al rey defensor y deja la torre cortándolo por una columna: sin ese corte, en cuanto el rey atacante salga de delante del peón, el rey rival se acercará y lo atacará.</p><h4>El puente paso a paso</h4><ol><li><b>Corta al rey rival</b> con un jaque por la columna, de modo que quede al menos a una columna del peón.</li><li><b>Lleva la torre a la cuarta fila</b> (la quinta para las negras). Esa es la fila del puente.</li><li><b>Saca el rey</b> de delante del peón por el lado contrario al rey rival y empieza a bajar hacia tu torre, alternando columnas para acercarte a los jaques.</li><li><b>Interpón la torre</b>: cuando tu rey llegue a la quinta fila y la torre rival le dé jaque, la torre se cruza en la cuarta, protegida por el rey. Se acabaron los jaques y el peón corona.</li></ol><p>¿Por qué la cuarta fila? Porque el rey necesita llegar a la quinta para que la torre que se interpone en la cuarta quede protegida. Con la torre en la quinta, el rey tendría que bajar hasta la sexta y la torre rival podría dar jaques desde más lejos. Llevar la torre demasiado cerca del rey (en la sexta o la séptima) tampoco sirve: no hay espacio para interponer.</p><h4>Qué intenta el defensor</h4><p>La defensa no puede salvar la Lucena, pero puede hacer que el atacante se equivoque. Sus recursos son tres: dar jaques laterales desde lejos, atacar el peón en cuanto el rey se aparta y, si el corte no está bien hecho, acercar su rey para estorbar. Por eso el atacante debe comprobar en cada paso que el peón siga protegido (por el rey o por la torre) y que el rey rival no pueda volver. Un método alternativo, útil cuando la torre defensora da jaques desde el costado, es acercar el rey a la torre rival: si el rey llega a su lado, los jaques terminan.</p><h4>Errores típicos</h4><ul><li><b>Salir con el rey antes de cortar</b>: el rey rival llega al peón y es tablas.</li><li><b>Salir hacia el lado equivocado</b>: el rey atacante debe abandonar la casilla de coronación por el lado opuesto al rey rival.</li><li><b>Construir el puente en la fila equivocada</b>: si la torre no está en la cuarta, los jaques no se acaban.</li><li><b>Intentarlo con el peón de torre</b>: no hay espacio para que el rey salga por el otro lado; esa posición suele ser tablas.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Está el rey rival cortado al menos una columna? Si no, jaque lateral primero.</li><li>¿Mi torre está en la cuarta fila? Si no, llévala.</li><li>¿Por qué lado saco el rey y hacia dónde bajo?</li><li>En cada jaque: ¿me acerco a mi torre y el peón sigue protegido?</li></ol>",
  "keyPoints": [
   "Primero cortar al rey rival, después el puente.",
   "El rey baja hasta la quinta fila y la torre se interpone en la cuarta."
  ],
  "positions": [
   {
    "fen": "6K1/3k2P1/8/8/4R3/8/8/7r w - - 0 1",
    "orientation": "white",
    "caption": "El puente con el peón de caballo: torre en la cuarta, rey hasta la quinta.",
    "line": [
     "Kf7",
     "Rf1+",
     "Kg6",
     "Rg1+",
     "Kf6",
     "Rf1+",
     "Kg5",
     "Rg1+",
     "Rg4"
    ],
    "comments": [
     "El rey negro está cortado por la columna e, así que el rey blanco sale de g8 por el lado contrario.",
     "Empiezan los jaques desde atrás.",
     "El rey baja en zigzag, sin dejar de proteger el peón.",
     "Otro jaque por la columna g.",
     "El rey sigue bajando y protege g7 desde f6.",
     "El negro insiste.",
     "El rey llega a la quinta fila, junto a la fila del puente.",
     "Último jaque…",
     "…y la torre se interpone en g4, protegida por el rey. Se acabaron los jaques: el peón corona."
    ]
   },
   {
    "fen": "4K3/4P1k1/8/8/5R2/8/r7/8 b - - 0 1",
    "orientation": "black",
    "caption": "Un puente mal preparado: con la torre negra en el lado largo, los jaques laterales salvan al negro.",
    "line": [
     "Ra8+",
     "Kd7",
     "Ra7+",
     "Kd6",
     "Ra6+",
     "Kd5",
     "Ra5+",
     "Ke6",
     "Ra6+"
    ],
    "comments": [
     "La torre negra está a cuatro columnas del peón, en el lado largo, y da jaque desde lejos por la octava.",
     "El rey sale de delante del peón.",
     "Ahora los jaques llegan por la séptima fila…",
     "…y el rey no encuentra refugio.",
     "Jaque por la sexta.",
     "El rey sigue bajando.",
     "La torre lo persigue por las filas: el puente de f4 no puede interponerse.",
     "Si el rey vuelve hacia su peón…",
     "…los jaques siguen. Tablas: antes de construir el puente hay que asegurarse de que la torre rival no pueda dar jaques laterales desde lejos."
    ]
   }
  ],
  "drills": [
   {
    "fen": "2K5/kP6/2r5/1R6/8/8/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey blanco está en jaque delante de su peón.",
    "line": [
     "Kd7",
     "Rb6",
     "Rxb6",
     "Kxb6",
     "b8=Q+"
    ],
    "comments": [
     "El rey sale de la casilla de coronación hacia el lado contrario al rey negro y ataca la torre de c6. Kd8, en cambio, permite Rb6 y el negro gana el peón con tablas.",
     "La torre negra se interpone para atacar el peón.",
     "El blanco cambia las torres…",
     "…y el rey negro no puede impedir la coronación.",
     "El peón corona con jaque: dama contra rey."
    ]
   }
  ]
 },
 "f-philidor": {
  "html": "<h4>Por qué funciona la tercera fila</h4><p>En la posición de Philidor el rey defensor está delante del peón y su torre ocupa la tercera fila propia (la sexta, si defienden las negras). Esa torre le prohíbe al rey atacante avanzar a la sexta fila, que es donde necesita estar para amenazar mate o apoyar el peón. El atacante tiene entonces dos caminos: renunciar al progreso o avanzar el peón a la sexta para expulsar a la torre. Pero cuando el peón llega a la sexta, le quita al propio rey su único refugio contra los jaques verticales: delante del rey ya no hay ningún escudo.</p><h4>La segunda fase: jaques desde atrás</h4><p>En cuanto el peón pisa la sexta, la torre defensora abandona la tercera fila y se va a la <b>primera fila del atacante</b> (la primera fila del tablero, si defienden las negras), lo más lejos posible del rey rival. Desde allí da jaques desde atrás sin descanso. El rey atacante no puede esconderse delante del peón, y si se acerca a la torre, abandona la defensa del peón. Es importante que los jaques empiecen desde lejos: una torre a dos o tres casillas del rey atacante puede ser alcanzada o bloqueada.</p><h4>La defensa pasiva: cuándo alcanza y cuándo no</h4><p>Muchos aficionados colocan la torre en la última fila y esperan. Esa <b>defensa pasiva</b> pierde contra los peones centrales y de alfil, porque el atacante coloca su rey en la sexta, amenaza mate con su torre y el defensor no tiene jaques útiles. Contra los peones de caballo y de torre la defensa pasiva suele alcanzar, porque al atacante le falta espacio en el flanco corto. Por eso la regla práctica es: si puedes, defiende con la torre activa en la tercera fila; deja la última fila para cuando no quede otra opción.</p><h4>Errores típicos</h4><ul><li><b>Jaques prematuros</b>: con el peón todavía en la quinta, los jaques desde lejos permiten que el rey atacante se esconda en la sexta, delante del peón.</li><li><b>Abandonar la tercera fila sin motivo</b>: cada jugada de torre debe mantener el control de la sexta mientras el peón no avance.</li><li><b>Alejar el rey de la casilla de coronación</b>: el rey defensor debe estar delante del peón o pegado a él.</li><li><b>Dejar la torre cerca del rey rival</b> en la fase de jaques: se gana un tiempo y aparece una Lucena.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Mi rey está delante del peón? Entonces Philidor.</li><li>¿El peón está en la quinta? Torre en mi tercera fila, jugadas de espera por esa fila.</li><li>¿El peón llegó a la sexta? Torre a la primera fila del rival y jaques desde atrás.</li><li>¿Mi torre está lo bastante lejos del rey rival?</li></ol>",
  "keyPoints": [
   "La defensa pasiva en la última fila pierde contra peones centrales y de alfil.",
   "Los jaques desde atrás empiezan solo cuando el peón llega a la sexta."
  ],
  "positions": [
   {
    "fen": "4k3/7R/r7/4PK2/8/8/8/8 w - - 0 1",
    "orientation": "black",
    "caption": "Philidor, segunda fase: cuando el peón llega a la sexta, la torre pasa a dar jaques desde atrás.",
    "line": [
     "e6",
     "Ra1",
     "Kf6",
     "Rf1+",
     "Ke5",
     "Re1+",
     "Kd6",
     "Rd1+"
    ],
    "comments": [
     "El blanco no puede progresar sin avanzar el peón a la sexta.",
     "¡Ahora sí! La torre abandona la sexta fila y se va lejos, a la primera.",
     "El rey blanco amenaza mate con Rh8.",
     "Pero los jaques empiezan: el rey blanco ya no tiene refugio delante del peón.",
     "Si el rey se aleja del peón, este queda débil.",
     "Jaque por la columna e.",
     "El rey vuelve a acercarse al peón.",
     "Jaque tras jaque: no hay forma de esconderse. Tablas."
    ]
   },
   {
    "fen": "4k3/7R/4K3/4P3/8/8/8/r7 b - - 0 1",
    "orientation": "black",
    "caption": "El rey blanco ya llegó a la sexta: el negro se salva con jaques desde el costado.",
    "line": [
     "Ra6+",
     "Kf5",
     "Rb6",
     "Rh1",
     "Ke7"
    ],
    "comments": [
     "Jaque lateral por la sexta fila, lo más preciso para no permitir el mate en la octava. Kd8, en cambio, perdería.",
     "El rey blanco se aparta del peón.",
     "La torre vuelve a la sexta fila y le cierra el paso: es otra vez la posición de Philidor.",
     "El blanco reagrupa su torre.",
     "El rey negro se coloca delante del peón: tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "3k4/7R/8/1KP5/3r4/8/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: el peón de c5 avanza con apoyo del rey.",
    "line": [
     "Kc8",
     "Kc6",
     "Kb8"
    ],
    "comments": [
     "El rey va delante del peón. Mover la torre (por ejemplo Rd2) deja que el rey blanco llegue a c6 y d7 con el peón detrás.",
     "El rey blanco ocupa c6 y amenaza mate.",
     "El rey negro se mantiene delante del peón, en b8: la torre blanca no tiene mate por la octava y la torre negra dará jaques desde atrás. Tablas."
    ]
   },
   {
    "fen": "3k4/8/1KP5/R7/8/6r1/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: el rey blanco y el peón ya están en la sexta.",
    "line": [
     "Rb3+",
     "Rb5",
     "Rxb5+"
    ],
    "comments": [
     "¡Jaque! Obliga a la torre blanca a interponerse. Otras jugadas permiten que el blanco cree amenazas de mate y gane.",
     "La única forma de cubrir el jaque.",
     "El negro cambia las torres: el final de peón contra rey con el rey negro delante del peón es tablas."
    ]
   },
   {
    "fen": "4k3/3R4/3K4/4P3/8/7r/8/8 b - - 0 1",
    "caption": "Juegan negras: la torre blanca de d7 está mal colocada. Aprovecha los jaques desde atrás.",
    "line": [
     "Rd3+",
     "Ke6",
     "Rxd7"
    ],
    "comments": [
     "¡Jaque desde atrás por la columna d! El rey blanco tiene que apartarse y deja sin protección a su torre. Otros jaques, como Rh6+, solo empatan.",
     "El rey sale del jaque y sigue defendiendo la torre, pero esta queda atacada dos veces: por la torre y por el rey negro.",
     "El negro gana la torre: la defensa activa, con jaques desde atrás, castiga cualquier descuido."
    ]
   }
  ]
 },
 "f-vancura": {
  "html": "<h4>La idea de la defensa</h4><p>En la posición de Vancura el atacante tiene un peón de torre (por ejemplo en <b>a6</b>) y su torre delante, en <b>a8</b>. La torre defensora se coloca en la sexta fila atacando el peón de costado, por ejemplo en <b>f6</b>, y el rey defensor se queda en <b>g7</b> o <b>h7</b>. Esta torre lateral cumple dos funciones: obliga a la torre atacante a quedarse en la columna <b>a</b> para proteger el peón, y vigila desde el costado al rey atacante, que no puede acercarse a su peón sin recibir jaques por la fila.</p><h4>Qué intenta el atacante y cómo se responde</h4><ul><li><b>Acercar el rey al peón</b>: la torre defensora le da jaques desde el costado o desde atrás. Al rey atacante le falta un refugio, porque su propio peón y su torre ocupan la columna <b>a</b>.</li><li><b>Avanzar el peón a la séptima</b>: entonces la torre defensora se coloca detrás, en la columna <b>a</b>, y el rey defensor se queda en <b>g7</b> o <b>h7</b>. En esas dos casillas está a salvo de los trucos: si la torre blanca abandona la octava, la torre negra captura el peón, y el jaque en <b>h7</b> que ganaría la torre por rayos X no existe, porque el rey vigila esa casilla. En otras casillas de la séptima, en cambio, la jugada <span class=\"mv\">Rh8</span> seguida de <span class=\"mv\">Rh7+</span> gana.</li><li><b>Llevar la torre al costado del peón</b> (por ejemplo, a la séptima): con la torre fuera de <b>a8</b>, el peón puede avanzar con apoyo; la defensa debe vigilar que el rey rival no llegue a escoltarlo y que la torre defensora pueda colocarse detrás del peón.</li></ul><h4>Llegar a tiempo</h4><p>La posición de Vancura es tablas, pero hay que llegar a ella. El defensor necesita que su torre alcance la sexta fila antes de que el rey atacante se acerque al peón, y que su rey esté cerca de <b>g7</b>. Si el rey defensor está lejos, en el centro, la torre atacante puede salir de <b>a8</b> dando jaque y el peón corona. Por eso, cuando se defiende un final de torre con peón de torre de menos, la prioridad es colocar la torre lateralmente y no delante del peón.</p><h4>Errores típicos</h4><ul><li><b>Torre pasiva detrás del peón</b>: con el peón ya en la sexta, la torre en <b>a1</b> o <b>a2</b> suele perder cuando el rey atacante llega a <b>b7</b>; por eso la defensa buena es de costado, desde la sexta fila.</li><li><b>Rey en la casilla equivocada</b>: en la séptima, lejos de <b>g7</b>/<b>h7</b>, aparece el truco del rayo X.</li><li><b>Jaques innecesarios</b>: si el rey atacante no amenaza nada, la torre se queda en la sexta atacando el peón.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿El peón está en la sexta con la torre delante? Torre a la sexta, de costado.</li><li>¿El rey rival se acerca? Jaques laterales desde la distancia.</li><li>¿El peón llegó a la séptima? Torre detrás del peón, rey en g7 o h7.</li></ol>",
  "keyPoints": [
   "Con el peón en la séptima, el rey defensor solo está seguro en g7 o h7.",
   "La torre lateral ata a la torre rival a la columna a."
  ],
  "positions": [
   {
    "fen": "R7/6k1/P4r2/8/8/8/2K5/8 w - - 0 1",
    "orientation": "white",
    "caption": "La posición de Vancura en acción: el rey blanco se acerca y la torre negra lo aleja con jaques laterales.",
    "line": [
     "Kb3",
     "Rf3+",
     "Kb4",
     "Rf4+",
     "Kb5",
     "Rf5+",
     "Kb6",
     "Rf6+"
    ],
    "comments": [
     "El rey blanco quiere llegar a b7 para liberar a su torre.",
     "Jaque desde el costado, a distancia.",
     "El rey sigue avanzando.",
     "Otro jaque: la torre negra está lejos y no puede ser atacada.",
     "El rey sube.",
     "El negro sigue con los jaques.",
     "El rey se acerca a su peón…",
     "…pero en la sexta fila sigue recibiendo jaques. Si se esconde en b7, la torre negra vuelve a atacar el peón de a6 y la torre blanca sigue atada. Tablas."
    ]
   },
   {
    "fen": "R7/P5k1/8/8/8/8/6K1/r7 w - - 0 1",
    "orientation": "white",
    "caption": "Con el peón en la séptima y el rey negro en g7, la torre negra detrás del peón aguanta.",
    "line": [
     "Kf3",
     "Ra4",
     "Ke3",
     "Kh7",
     "Kd3",
     "Kg7"
    ],
    "comments": [
     "El rey blanco va hacia el peón para liberar a su torre.",
     "La torre negra se queda en la columna a, detrás del peón, y mantiene la distancia del rey blanco.",
     "El rey sigue su camino.",
     "El rey negro solo se mueve entre g7 y h7: allí no hay rayos X posibles. Si la torre blanca sale de a8, Rxa7.",
     "El rey blanco se acerca…",
     "…pero cuando llegue a b7 o b6, la torre negra le dará jaques desde atrás o desde el costado. Tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "R7/P5k1/8/8/8/8/1K6/5r2 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: el peón ya está en la séptima.",
    "line": [
     "Rf2+",
     "Kb3",
     "Rf3+"
    ],
    "comments": [
     "¡Jaque! La torre no puede quedarse en la columna f sin hacer nada: si el negro juega Rf6 o Rf5, Rg8+ Kxg8 a8=Q+ y la dama gana. Los jaques desde el costado obligan al rey blanco a alejarse o a acercarse a la torre.",
     "El rey blanco intenta esconderse.",
     "Otro jaque: el rey blanco no tiene refugio y, si se acerca a la columna a, la torre negra se pondrá detrás del peón. Tablas."
    ]
   },
   {
    "fen": "R7/P4k2/8/8/8/8/6K1/r7 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro está en la casilla equivocada.",
    "line": [
     "Rh8"
    ],
    "comments": [
     "¡Rh8! Amenaza a8=Q. Si Rxa7, Rh7+ gana la torre por rayos X; si Ra2+ y los jaques, el rey blanco se acerca y el peón corona. Con el rey negro en g7 o h7 esto no funcionaría."
    ]
   }
  ]
 },
 "f-tarrasch": {
  "html": "<h4>Por qué detrás</h4><p>La regla de Tarrasch es pura geometría. Una torre detrás de su propio peón pasado gana casillas con cada avance del peón: cuando el peón llega a la séptima, la torre controla toda la columna hasta allí y además protege la casilla de coronación indirectamente. Una torre delante de su peón, en cambio, pierde movilidad con cada paso y termina encerrada en la casilla de coronación. Lo mismo vale al defender: una torre detrás del peón rival lo frena desde lejos y sigue activa, mientras que una torre delante de él queda atada a la casilla de bloqueo.</p><p>El caso típico es una torre con un peón pasado en la columna <b>a</b> contra los peones del flanco de rey. Si la torre del atacante está detrás de su peón, la torre defensora tiene que ponerse delante y queda atada; el rey atacante puede entonces ir hacia el flanco de rey o hacia el peón, según convenga. Si, en cambio, es la torre defensora la que se coloca detrás del peón, el atacante no puede avanzarlo sin perderlo y su propia torre, delante del peón, es la que queda inmovilizada. Por eso, en cuanto aparece un peón pasado, la primera pregunta es quién llega antes a la casilla de detrás.</p><h4>Excepciones y matices</h4><ul><li><b>El corte lateral es más fuerte</b> cuando el rey rival está lejos: una torre que corta al rey defensor por una columna o una fila puede valer más que una torre detrás del peón.</li><li><b>Peón muy avanzado con la torre delante</b>: a veces hay trucos tácticos (como el rayo X del final de Vancura) que justifican la torre delante.</li><li><b>Cuando el rey propio ya escolta el peón</b>, la torre puede ocuparse de otras tareas; la regla importa sobre todo cuando los reyes están lejos.</li><li><b>La regla habla de peones pasados</b>, no de cualquier peón.</li></ul><h4>Actividad antes que material</h4><p>En los finales de torres una torre activa compensa muchas veces un peón de menos, mientras que una torre pasiva pierde aunque el material esté igualado. Una torre es activa cuando ataca peones, corta al rey rival o está detrás de un peón pasado; es pasiva cuando solo defiende. Antes de defender un peón con la torre, pregúntate si no conviene sacrificarlo para activarla: un peón perdido con la torre en la séptima o detrás de un pasado propio suele ser un buen negocio.</p><h4>El plan con un peón pasado</h4><ol><li>Coloca la torre detrás del peón.</li><li>Avanza el peón mientras la torre rival tenga que bloquearlo; cada paso la vuelve más pasiva.</li><li>Lleva el rey hacia el otro flanco, donde la torre rival ya no puede defender, o hacia el peón para escoltarlo.</li></ol><h4>Cómo pensarlo en la partida</h4><ol><li>¿Hay peones pasados? ¿Detrás de cuál va mi torre?</li><li>¿Mi torre es activa o pasiva? Si es pasiva, ¿puedo activarla aunque cueste un peón?</li><li>¿Conviene más cortar al rey rival que ponerse detrás del peón?</li></ol>",
  "keyPoints": [
   "Torre activa con un peón de menos suele bastar; torre pasiva pierde.",
   "El corte lateral del rey rival puede valer más que la regla de Tarrasch."
  ],
  "positions": [
   {
    "fen": "r5k1/5ppp/8/P7/8/8/5PPP/R5K1 w - - 0 1",
    "orientation": "white",
    "caption": "Torre detrás del peón propio contra torre delante: la torre negra queda atada y el blanco juega en el otro flanco.",
    "line": [
     "a6",
     "Ra7",
     "h4",
     "Kf8",
     "Kh2",
     "Ke7",
     "h5",
     "Kd8",
     "h6",
     "g6"
    ],
    "comments": [
     "El peón avanza protegido desde atrás: cada paso vuelve más pasiva a la torre negra.",
     "La torre negra se planta delante del peón y ya no puede moverse de la columna a.",
     "Con la torre rival inmóvil, el blanco gana espacio en el flanco de rey.",
     "El rey negro va hacia el peón para liberar a su torre.",
     "El rey blanco se prepara para avanzar por el flanco de rey.",
     "El rey negro sigue su camino.",
     "El peón de h avanza para crear debilidades.",
     "El rey negro llega cerca del peón de a…",
     "…mientras el blanco fija los peones del flanco de rey.",
     "Las casillas negras del flanco de rey quedaron débiles y la torre blanca sigue siendo la pieza activa: ventaja clara del blanco."
    ]
   },
   {
    "fen": "R7/5ppk/7p/8/8/p7/r4PPP/6K1 w - - 0 1",
    "orientation": "white",
    "caption": "Ahora el pasado es del negro: la torre blanca detrás del peón es activa y la negra, delante, está atada.",
    "line": [
     "g4",
     "Kg6",
     "Kg2",
     "Kf6",
     "h4",
     "Ke6",
     "Ra7",
     "Ra1"
    ],
    "comments": [
     "La torre de a8 no necesita moverse: desde atrás ataca el peón de a3 y vigila toda la columna.",
     "El rey negro quiere ir a apoyar su peón.",
     "El rey blanco protege sus peones de la segunda fila.",
     "El rey negro se acerca al centro.",
     "El blanco gana espacio.",
     "El rey negro sigue hacia el peón de a…",
     "…y la torre blanca ataca f7 por la séptima.",
     "El negro deja que su torre siga atada. El motor ve una ligera ventaja negra, pero el blanco no corre peligro: tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/5pkp/P5p1/6R1/8/1r4P1/5PKP/8 b - - 0 1",
    "caption": "Juegan negras y ganan: la torre blanca abandonó su puesto detrás del peón pasado.",
    "line": [
     "f5"
    ],
    "comments": [
     "¡f5! Corta la quinta fila: la torre blanca ya no puede volver a la columna a, detrás de su peón, y la amenaza h6 la deja sin casillas. Atacar el peón con Ra3 solo empata, porque Ra5 lo protege desde atrás."
    ]
   }
  ]
 },
 "f-dama-peon": {
  "html": "<h4>La técnica de acercamiento</h4><p>Una dama gana contra un peón en la séptima apoyado por su rey, salvo en los casos especiales de los peones de alfil y de torre. El método tiene dos partes. Primero, la dama se acerca con jaques y clavadas hasta controlar la casilla de coronación o colocarse delante del peón. Segundo, obliga al rey rival a ponerse <b>delante de su propio peón</b>: mientras el rey bloquea la casilla de coronación, el peón no puede avanzar y el atacante gana una jugada para acercar su rey. Se repite el ciclo (jaque que fuerza al rey delante del peón, jugada de rey) hasta que el rey atacante llega y el peón cae o hay mate.</p><p>Un detalle práctico: los jaques más eficaces suelen darse desde una casilla que, además, controla la casilla de coronación, porque así la dama impide el avance y obliga al rey a decidir. Si el rey rival se aparta del peón para no bloquearlo, la dama gana el peón directamente.</p><h4>Peón de alfil: el ahogado como defensa</h4><p>Con un peón de alfil en la séptima (por ejemplo en <b>c2</b>, con el rey negro cerca), cuando la dama da jaque, el rey defensor no se pone delante del peón, sino que va a la esquina (<b>a1</b>). Si la dama captura entonces el peón, el rey de la esquina queda ahogado. Por eso el método normal no funciona y la posición suele ser tablas. La excepción es que el rey atacante esté suficientemente cerca: entonces puede dejar coronar al peón y dar mate, o aprovechar el tiempo para acercarse sin capturar, porque existe una red de mate con dama y rey contra el rey en la esquina.</p><h4>Peón de torre: todavía más difícil</h4><p>Con un peón de torre en la séptima, el rey defensor se mete en la esquina delante o al lado del peón y no hay manera de forzarlo a salir sin dar ahogado. Salvo que el rey atacante ya esté muy cerca, es tablas. Una regla práctica: si el peón de torre o de alfil ya está en la séptima con su rey al lado, cuenta las jugadas que necesita tu rey para llegar; si está lejos, el resultado suele ser tablas.</p><h4>Errores típicos</h4><ul><li><b>Jaques que alejan</b> al rey rival de su peón sin ganar tiempos: la meta es obligarlo a ponerse delante del peón.</li><li><b>Acercar el rey cuando el peón amenaza coronar</b>: primero se controla la casilla de coronación.</li><li><b>Capturar el peón de alfil o de torre</b> cuando el rey rival está en la esquina: ahogado.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿Qué peón es: central, de caballo, de alfil o de torre?</li><li>¿Puedo forzar al rey rival delante del peón con un jaque o una clavada?</li><li>Cuando lo consigo, ¿qué jugada de rey me acerca más?</li><li>Antes de capturar: ¿queda el rey rival ahogado?</li></ol>",
  "keyPoints": [
   "Cada vez que el rey rival bloquea su peón, acerca tu rey una casilla.",
   "Peón de alfil o de torre en séptima: tablas salvo que el rey atacante esté cerca."
  ],
  "positions": [
   {
    "fen": "8/8/8/8/3KQ3/8/3kp3/8 w - - 0 1",
    "orientation": "white",
    "caption": "Peón central en séptima: el jaque obliga al rey negro a bloquear su peón y el rey blanco se acerca.",
    "line": [
     "Qd3+",
     "Ke1",
     "Ke3",
     "Kf1",
     "Qxe2+",
     "Kg1",
     "Kf3",
     "Kh1",
     "Qg2#"
    ],
    "comments": [
     "Jaque que obliga al rey negro a ponerse delante de su peón.",
     "El rey se coloca delante de su peón (con Kc1, Qxe2 ganaría el peón enseguida).",
     "El blanco gana el tiempo y acerca el rey: ahora protege la dama y controla f2.",
     "El rey negro deja libre e1, pero ya es tarde.",
     "La dama captura el peón con jaque.",
     "El rey negro huye a la esquina.",
     "El rey blanco cierra la red.",
     "Única jugada.",
     "Mate: la dama protegida por el rey."
    ]
   },
   {
    "fen": "8/8/8/8/8/4Q3/5pk1/K7 w - - 0 1",
    "orientation": "white",
    "caption": "Peón de alfil en séptima con el rey blanco lejos: el ahogado salva al negro.",
    "line": [
     "Qe2",
     "Kg1",
     "Qg4+",
     "Kh2",
     "Qf3",
     "Kg1",
     "Qg3+",
     "Kh1"
    ],
    "comments": [
     "La dama clava el peón y amenaza acercarse.",
     "El rey negro se coloca junto a la casilla de coronación.",
     "Jaque para obligar al rey a ponerse delante del peón.",
     "Pero el rey negro sale por h2.",
     "La dama vuelve a controlar f1.",
     "El rey vuelve a g1.",
     "Jaque…",
     "…y el rey va a la esquina. Si Qxf2, el negro queda ahogado; el rey blanco está demasiado lejos para aprovechar el tiempo. Tablas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/8/8/3Q4/5K2/1p6/k7 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres.",
    "line": [
     "Qa4+",
     "Kb1",
     "Ke2",
     "Kc1",
     "Qd1#"
    ],
    "comments": [
     "Jaque por la columna a: el rey negro tiene que ir a b1, delante de su propio peón.",
     "Única jugada.",
     "Con el rey negro bloqueando su peón, el blanco gana el tiempo para acercar el rey, que ahora controla d1 y d2.",
     "El rey negro sale de delante del peón.",
     "Mate: la dama en d1 está protegida por el rey."
    ]
   },
   {
    "fen": "8/7Q/8/8/1K6/8/1p6/k7 w - - 0 1",
    "caption": "Juegan blancas y dan mate en tres.",
    "line": [
     "Qa7+",
     "Kb1",
     "Kc3",
     "Kc1",
     "Qg1#"
    ],
    "comments": [
     "El jaque por la columna a obliga al rey a ponerse delante del peón.",
     "Única jugada.",
     "El rey blanco se acerca: con el rey negro en b1, el peón no puede coronar.",
     "La única jugada del negro.",
     "Mate en la primera fila: el rey de c3 cubre las casillas de la segunda."
    ]
   },
   {
    "fen": "8/8/8/8/8/Q3K3/2p5/1k6 w - - 0 1",
    "caption": "Juegan blancas y ganan: peón de alfil en séptima, pero el rey blanco está cerca.",
    "line": [
     "Qb4+",
     "Ka2",
     "Kd2"
    ],
    "comments": [
     "Jaque que aparta al rey de b1.",
     "Si Ka1, lo mismo: Kd2.",
     "El rey controla c1: el peón no puede coronar y el mate llega enseguida. Con el rey blanco tan cerca, el truco del ahogado no funciona."
    ]
   },
   {
    "fen": "8/8/8/8/1Q4K1/8/3p4/2k5 w - - 0 1",
    "caption": "Juegan blancas y ganan: el peón está a un paso de coronar.",
    "line": [
     "Qc3+",
     "Kb1",
     "Qxd2"
    ],
    "comments": [
     "Jaque desde c3: si el rey se queda junto al peón con Kd1, se pone delante de él y el blanco gana todavía más rápido.",
     "El rey se aleja para no bloquear el peón.",
     "El peón cae y queda el mate de dama y rey contra rey."
    ]
   }
  ]
 },
 "f-alfil-equivocado": {
  "html": "<h4>La fortaleza de la esquina</h4><p>Con un peón de torre y un alfil que no controla la casilla de coronación, el rey defensor que llega a la esquina (o a la casilla vecina en la columna del caballo) no puede ser expulsado. El alfil no ataca esa esquina, el peón no puede desalojarla y el rey atacante solo puede quitarle casillas hasta producir el ahogado. Dos o incluso tres peones de torre en la misma columna no cambian nada. Lo que sí cambia todo es un peón en otra columna, o que el rey defensor no llegue a tiempo a la esquina.</p><p>Un caso muy frecuente en la práctica: el bando fuerte tiene alfil, peón de torre y además un peón en otra columna. Si el defensor logra cambiar o capturar ese peón, queda la fortaleza. Por eso, al defender un final inferior, conviene contar si puedes eliminar los peones que no son de torre.</p><h4>El atacante: impedir que el rey llegue</h4><p>Si tienes el alfil «equivocado», tu tarea no es coronar rápido, sino <b>cortar al rey rival</b> antes de que alcance la zona de la esquina. El alfil puede controlar una diagonal que el rey rival necesita cruzar (por ejemplo, cuando el peón es de <b>h</b> y el alfil es de casillas blancas, la diagonal que pasa por <b>f7</b> y <b>g8</b>), y el rey propio puede plantarse en <b>g7</b> o en la columna <b>g</b> para cerrar el paso. Si el rey rival ya está en la esquina, no lo intentes con el peón: lo único que conseguirás es el ahogado.</p><h4>El defensor: el camino a la esquina</h4><ul><li>Cuenta las jugadas que necesita tu rey para llegar a la casilla de coronación o a su vecina, y compáralas con las del rey rival para llegar a la casilla que te cierra el paso.</li><li>Si el camino directo está cortado por el alfil, busca una ruta lateral: el alfil controla solo casillas de un color.</li><li>Si tienes una pieza o un peón, considera cambiarlos o sacrificarlos para llegar a este final: es una salvación muy práctica.</li></ul><h4>Errores típicos</h4><ul><li><b>Del atacante</b>: empujar el peón sin cortar al rey rival, o capturar algo que deja al rey rival entrar en la esquina.</li><li><b>Del defensor</b>: ir a buscar el peón en lugar de ir a la esquina, o salir de la esquina cuando no hacía falta.</li><li><b>De ambos</b>: olvidar que con el alfil del color «correcto» la misma posición se gana sin problemas.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>¿El peón es de torre y el alfil no controla la casilla de coronación?</li><li>¿Quién llega primero a la zona de la esquina?</li><li>Si ataco: ¿cómo corto al rey con el alfil y el rey? Si defiendo: ¿qué ruta no controla el alfil?</li></ol>",
  "keyPoints": [
   "El atacante corta al rey antes de que alcance la esquina; después ya es tarde.",
   "El defensor cuenta su camino a la esquina por las casillas que el alfil no controla."
  ],
  "positions": [
   {
    "fen": "8/8/8/7P/4k3/8/2B5/6K1 b - - 0 1",
    "orientation": "black",
    "caption": "El rey negro corre a la esquina por las casillas que el alfil no controla.",
    "line": [
     "Ke5",
     "h6",
     "Kf6",
     "Kf1",
     "Kf7",
     "h7",
     "Kg7"
    ],
    "comments": [
     "El rey va directo hacia f6 y g7. Kd5, en cambio, llega tarde.",
     "El peón avanza.",
     "El rey alcanza la zona de la esquina.",
     "El rey blanco está lejos.",
     "Rumbo a g7.",
     "El peón llega a la séptima…",
     "…pero el rey negro ya controla h8. El alfil de casillas blancas nunca podrá echarlo: tablas (el motor todavía muestra una pequeña ventaja blanca por el material, pero es una fortaleza)."
    ]
   },
   {
    "fen": "8/3k4/8/4K2P/8/8/4B3/8 w - - 0 1",
    "orientation": "white",
    "caption": "Si el rey defensor no llega a la esquina, el peón de torre corona.",
    "line": [
     "h6",
     "Kc6",
     "Bf3+",
     "Kc5",
     "h7"
    ],
    "comments": [
     "El peón corre: el rey negro está a demasiadas jugadas de f8 o g7.",
     "Cualquier jugada pierde (ni siquiera Ke7 llega a tiempo: h7 y h8=Q); aquí el rey negro incluso se aleja.",
     "Jaque que aleja todavía más al rey negro.",
     "El rey sigue lejos.",
     "El peón corona en la próxima jugada."
    ]
   }
  ],
  "drills": [
   {
    "fen": "8/8/B1K5/7P/3k4/8/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: ¿por dónde va el rey?",
    "line": [
     "Ke5",
     "h6",
     "Kf6"
    ],
    "comments": [
     "El rey va hacia f6 y g7, la zona de la esquina. Ke4 pierde porque se aleja una casilla: h6 y el peón corona.",
     "El peón avanza.",
     "El rey llega a f6 y luego a g7 o a la esquina: el alfil de casillas blancas no controla h8. Tablas."
    ]
   },
   {
    "fen": "8/5B2/7P/8/7k/5K2/8/8 w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro está cerca, pero no lo suficiente.",
    "line": [
     "h7",
     "Kg5",
     "h8=Q"
    ],
    "comments": [
     "El alfil de f7 controla g8 y el rey de f3 vigila g4: el rey negro no alcanza la esquina. Acercar el rey primero dejaría al negro llegar a g7.",
     "El rey negro intenta acercarse.",
     "El peón corona y el blanco gana."
    ]
   },
   {
    "fen": "5k2/8/2K4P/8/8/8/8/7B w - - 0 1",
    "caption": "Juegan blancas y ganan: el rey negro está a un paso de la esquina.",
    "line": [
     "Bd5",
     "Ke7",
     "h7",
     "Kf6",
     "h8=Q+"
    ],
    "comments": [
     "¡El alfil corta el camino! Desde d5 controla g8, y el rey negro ya no puede llegar a la esquina. Empujar h7 enseguida permitiría Kg7 con tablas.",
     "El rey negro busca otro camino.",
     "El peón avanza: g8 sigue controlada por el alfil.",
     "El rey llega tarde.",
     "El peón corona con jaque."
    ]
   },
   {
    "fen": "8/5k2/7P/7K/6B1/8/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: ¿a qué casilla va el rey?",
    "line": [
     "Kg8",
     "Kg6",
     "Kh8",
     "Bc8",
     "Kg8"
    ],
    "comments": [
     "El rey va a g8, delante del peón y junto a la esquina. Kf6? pierde: el alfil (por ejemplo Bd1 y Bb3 o Bc4) le quita las casillas blancas g8 y f7, y el peón corona.",
     "El rey blanco ocupa g6.",
     "El rey negro se mete en la esquina.",
     "El alfil hace una jugada de espera…",
     "…y el rey negro va y viene entre g8 y h8. El alfil de casillas blancas no puede echarlo: tablas."
    ]
   }
  ]
 },
 "f-distinto-color": {
  "html": "<h4>Por qué son tan tablíferos</h4><p>En un final de alfiles de distinto color, cada alfil gobierna un color de casillas que el otro nunca puede disputar. El defensor aprovecha esto para crear un <b>bloqueo</b>: coloca su rey o su alfil delante de los peones rivales en casillas del color de su alfil, y el atacante no tiene cómo expulsarlo. El alfil atacante puede atacar las casillas del otro color, pero no puede controlar la casilla de bloqueo. Por eso un peón de más casi nunca gana y, a menudo, ni siquiera dos.</p><h4>Cuándo se gana: peones separados</h4><p>El atacante tiene posibilidades reales cuando dispone de <b>dos peones pasados bien separados</b> (al menos dos o tres columnas entre ellos). El plan es repartir el trabajo: el rey apoya un peón y el otro peón obliga al alfil rival a vigilarlo. Si el rey defensor bloquea un peón y su alfil detiene al otro, el atacante lleva su rey al peón bloqueado por el alfil y lo empuja por casillas del color de su propio alfil, de manera que el alfil rival tenga que sacrificarse. Con dos peones unidos, el defensor suele bloquearlos con el rey delante, en casillas del color de su alfil, y entonces es tablas.</p><p>Una orientación práctica: con dos peones pasados unidos, el defensor suele salvarse si coloca el rey delante de ellos; con peones separados por una sola columna, también suele bastarle; con dos o más columnas de separación, el rey y el alfil defensores normalmente no pueden detener a ambos y el atacante gana.</p><h4>La técnica de defensa</h4><ul><li><b>Rey delante de los peones</b>, preferiblemente en una casilla que el alfil rival no pueda atacar.</li><li><b>El alfil desde lejos</b>: una sola diagonal puede detener un peón y, al mismo tiempo, vigilar otra casilla. Un alfil a distancia no puede ser atacado ni bloqueado fácilmente.</li><li><b>Cambia peones</b>: cada cambio acerca las tablas; un solo peón de más es un final ganado solo en casos muy concretos.</li><li><b>Sacrifica el alfil</b> por dos peones si con eso queda un peón de torre con el alfil «equivocado», o ningún peón.</li></ul><h4>En el medio juego, al revés</h4><p>Con damas y torres en el tablero, los alfiles de distinto color favorecen al bando que ataca: su alfil apunta a casillas que el alfil rival no puede defender, y en la práctica juega con una pieza de más en el sector del ataque. Por eso no hay que cambiar piezas mayores alegremente pensando que «los alfiles de distinto color son tablas»: lo son en el final, no antes.</p><h4>Cómo pensarlo en la partida</h4><ol><li>¿Mis peones pasados están separados o unidos?</li><li>Si defiendo, ¿puedo bloquear con el rey en casillas del color de mi alfil?</li><li>Si ataco, ¿qué peón apoya el rey y cuál distrae al alfil rival?</li></ol>",
  "keyPoints": [
   "Ganan los peones pasados separados; los unidos se bloquean.",
   "El alfil defensor trabaja mejor desde lejos, en una diagonal larga."
  ],
  "positions": [
   {
    "fen": "8/5k2/8/4PP2/3K4/8/3B4/5b2 w - - 0 1",
    "orientation": "white",
    "caption": "Dos peones unidos ganan cuando el rey defensor no está delante de ellos.",
    "line": [
     "Bg5",
     "Bb5",
     "e6+",
     "Kg7",
     "f6+",
     "Kg6",
     "f7",
     "Kxg5",
     "f8=Q"
    ],
    "comments": [
     "El alfil controla e7 y d8, las casillas por las que el rey negro querría bloquear.",
     "El negro espera.",
     "Los peones avanzan con jaque.",
     "El rey negro no puede ponerse delante.",
     "Otro avance con jaque.",
     "El negro ataca el alfil.",
     "El peón llega a la séptima.",
     "El negro gana el alfil…",
     "…pero el peón corona. Por eso el defensor debe bloquear con el rey delante de los peones."
    ]
   },
   {
    "fen": "8/8/2k5/P5P1/8/4K3/8/1b2B3 w - - 0 1",
    "orientation": "white",
    "caption": "Peones separados, pero bien vigilados: el rey negro frena uno y el alfil, desde lejos, el otro.",
    "line": [
     "Kd4",
     "Bf5",
     "Ke5",
     "Bg6",
     "Kf6",
     "Be8",
     "g6",
     "Bxg6",
     "Kxg6",
     "Kb7"
    ],
    "comments": [
     "El rey blanco va a apoyar el peón de g.",
     "El alfil negro controla g6 y h7 desde lejos.",
     "El rey se acerca.",
     "El alfil bloquea en g6, una casilla de su color.",
     "El rey ataca el alfil.",
     "El alfil se aparta, pero sigue vigilando g6 y la diagonal de h5.",
     "El blanco empuja el peón.",
     "El alfil se sacrifica por el peón.",
     "El blanco captura.",
     "El rey negro detiene el peón de a. Tablas: el defensor dividió el trabajo entre el rey y el alfil."
    ]
   }
  ],
  "drills": [
   {
    "fen": "b4B2/2k5/8/1P5P/8/8/4K3/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: dos peones separados contra el alfil.",
    "line": [
     "Kb6",
     "Kd3",
     "Bd5"
    ],
    "comments": [
     "El rey bloquea el peón de b. Las jugadas de alfil pierden: el rey blanco apoyaría el peón de b.",
     "El rey blanco se acerca.",
     "El alfil se coloca en la diagonal a2-g8: si h6, Bg8 y luego Bxh7. El peón de h no coronará: tablas."
    ]
   },
   {
    "fen": "8/7k/P7/6BP/b7/3K4/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: el peón de a6 amenaza coronar.",
    "line": [
     "Bb5+",
     "Kd4",
     "Bxa6"
    ],
    "comments": [
     "¡Jaque! El alfil gana un tiempo y llega a la diagonal del peón. Be8? llega tarde: a7 y el peón corona.",
     "El rey se aparta.",
     "El peón cae. El rey negro frena el peón de h: tablas."
    ]
   },
   {
    "fen": "3B4/8/2P3P1/1bk5/8/2K5/8/8 b - - 0 1",
    "caption": "Juegan negras y hacen tablas: hay que frenar dos peones.",
    "line": [
     "Bxc6",
     "g7",
     "Bd5"
    ],
    "comments": [
     "El alfil captura el peón de c. Si el rey captura (Kxc6), el peón de g corona.",
     "El peón de g avanza.",
     "El alfil vuelve a la diagonal a2-g8 y controla g8: tablas."
    ]
   },
   {
    "fen": "8/8/3k2P1/8/8/1P6/6K1/3b2B1 w - - 0 1",
    "caption": "Juegan blancas y ganan: dos peones bien separados.",
    "line": [
     "b4",
     "Ke5",
     "g7"
    ],
    "comments": [
     "El peón de b avanza: el rey negro no puede ocuparse de los dos peones a la vez. Bd4 no consigue nada.",
     "El rey va hacia el peón de g.",
     "El peón llega a la séptima: el alfil negro tendrá que sacrificarse y el peón de b decidirá."
    ]
   }
  ]
 },
 "f-torre-vs-pieza": {
  "html": "<h4>Torre contra alfil: por qué importa la esquina</h4><p>Sin peones, la torre contra el alfil es tablas si el rey defensor se refugia en la esquina <b>del color contrario</b> al de su alfil. Allí, cuando el rey atacante se coloca enfrente y la torre amenaza mate por el borde, el alfil puede interponerse o el defensor se salva por ahogado. En la esquina del color del alfil, en cambio, la interposición no es posible en el momento clave y el atacante suele ganar. El defensor debe, por eso, dirigir su rey a la esquina buena antes de que lo empujen al borde equivocado, y mantener el alfil lejos del rey rival para que no sea atacado ni clavado.</p><h4>Torre contra caballo: el caballo pegado al rey</h4><p>La torre contra el caballo también es tablas en general, pero el peligro es distinto: el caballo puede quedar <b>separado</b> de su rey y ser cazado, porque se mueve despacio y la torre le quita casillas con facilidad. La regla práctica es mantener el caballo a una o dos casillas del rey y evitar los bordes y, sobre todo, las esquinas, donde el caballo tiene muy pocas salidas. El rey defensor, a su vez, prefiere el centro del tablero.</p><p>Un recurso defensivo frecuente con el alfil: cuando la torre amenaza mate por el borde, el alfil se interpone, y si el rey atacante se coloca justo enfrente, el defensor puede quedar ahogado. Conocer esas imágenes de ahogado es la mitad de la defensa.</p><h4>Con peones en el tablero</h4><p>Cuando hay peones, la torre suele ganar: el atacante puede usar su ventaja de material para crear un peón pasado o ganar peones débiles. Las excepciones son fortalezas concretas, por ejemplo un alfil y peones bien colocados que el rey atacante no puede penetrar. Para el bando de la pieza menor, cambiar peones es la estrategia natural, porque cada cambio acerca un final sin peones, que es tablas en la mayoría de los casos.</p><h4>Errores típicos</h4><ul><li><b>Defensor</b>: ir a la esquina equivocada, separar el caballo del rey o dejar la pieza en una casilla donde la torre la gana con un jaque (enfilada o ataque doble).</li><li><b>Atacante</b>: apurarse y olvidar la regla de las 50 jugadas; buscar el mate en la esquina buena del defensor, donde no existe.</li><li><b>Ambos</b>: no mirar los jaques con ataque doble. La torre gana muchas veces la pieza con un jaque que ataca a la vez al rey y a la pieza separada.</li></ul><h4>Cómo pensarlo en la partida</h4><ol><li>Defendiendo con el alfil: ¿cuál es la esquina del color contrario a mi alfil y cómo llego?</li><li>Defendiendo con el caballo: ¿está mi caballo a una o dos casillas del rey y lejos del borde?</li><li>Atacando: ¿hay un jaque que ataque también a la pieza? ¿Puedo separar la pieza de su rey?</li></ol>",
  "keyPoints": [
   "La torre gana muchas veces la pieza menor con un jaque que la ataca a la vez (enfilada o ataque doble).",
   "El caballo debe quedarse cerca de su rey y lejos de las esquinas."
  ],
  "positions": [
   {
    "fen": "7k/8/6K1/8/8/8/b7/R7 b - - 0 1",
    "orientation": "black",
    "caption": "Torre contra alfil: el rey negro en la esquina buena (h8, del color contrario al alfil).",
    "line": [
     "Bd5",
     "Ra8+",
     "Bg8"
    ],
    "comments": [
     "El alfil, atacado por la torre, se va a la diagonal que lleva a g8.",
     "Amenaza de mate en la octava fila…",
     "…y el alfil se interpone. Si ahora la torre lo clava con Rb8, el negro queda ahogado; si el rey blanco se aparta, el negro libera su rey. Tablas."
    ]
   },
   {
    "fen": "8/8/8/3k4/8/5K2/R7/7n w - - 0 1",
    "orientation": "white",
    "caption": "Torre contra caballo: un caballo lejos de su rey, y en la esquina, se pierde.",
    "line": [
     "Kg2",
     "Ke4",
     "Kxh1"
    ],
    "comments": [
     "El caballo de h1 solo tiene f2 y g3, y el rey blanco controla las dos. Kg2 lo ataca.",
     "El rey negro llega tarde.",
     "El caballo cae. La lección: el caballo debe quedarse cerca de su rey y lejos de las esquinas."
    ]
   }
  ],
  "drills": [
   {
    "fen": "R7/8/8/4k3/8/8/4n3/1K6 w - - 0 1",
    "caption": "Juegan blancas y ganan: el caballo está lejos de su rey.",
    "line": [
     "Re8+",
     "Kf4",
     "Rxe2"
    ],
    "comments": [
     "Jaque por la columna e: el rey negro tiene que apartarse y el caballo, en la misma columna, queda colgando. Otras jugadas no ganan la pieza.",
     "El rey no puede proteger el caballo.",
     "La torre gana el caballo: torre contra rey es mate fácil."
    ]
   },
   {
    "fen": "R7/8/5k2/8/8/8/5b2/1K6 w - - 0 1",
    "caption": "Juegan blancas y ganan: busca la enfilada.",
    "line": [
     "Rf8+",
     "Ke5",
     "Rxf2"
    ],
    "comments": [
     "Jaque por la columna f, detrás del cual está el alfil. Las demás jugadas permiten que el alfil vuelva junto a su rey.",
     "El rey se aparta.",
     "La torre gana el alfil."
    ]
   },
   {
    "fen": "R7/8/8/8/1b4k1/8/8/K7 w - - 0 1",
    "caption": "Juegan blancas y ganan: el alfil y el rey están en la misma fila.",
    "line": [
     "Ra4",
     "Kg5",
     "Rxb4"
    ],
    "comments": [
     "¡Clavada! El alfil no puede moverse sin dejar al rey en jaque, y el rey negro está demasiado lejos para defenderlo.",
     "El rey se aparta y el alfil deja de estar clavado, pero sigue atacado y sin defensa.",
     "La torre gana el alfil."
    ]
   },
   {
    "fen": "R7/8/8/2k5/8/8/2n5/6K1 w - - 0 1",
    "caption": "Juegan blancas y ganan: rey y caballo en la misma columna.",
    "line": [
     "Rc8+",
     "Kd4",
     "Rxc2"
    ],
    "comments": [
     "Jaque por la columna c: el rey se aparta y el caballo, detrás, queda indefenso. Las demás jugadas permiten que el caballo vuelva junto a su rey.",
     "El rey no puede proteger el caballo.",
     "La torre captura el caballo."
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
