/* Aperturas — Ajedrez Pro. Estadísticas aproximadas. */
window.OPENINGS = [
 {
  "id": "italiana",
  "name": "Apertura Italiana (Giuoco Piano)",
  "eco": "C50-C54",
  "group": "e4",
  "type": "abierta",
  "side": "blancas",
  "level": "principiante",
  "summary": "Desarrollo rápido del alfil a c4 apuntando a f7. Hoy se juega sobre todo en su forma lenta (Giuoco Pianissimo) con c3 y d3, muy popular en la élite.",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "Nc6",
   "Bc4",
   "Bc5",
   "c3",
   "Nf6",
   "d3",
   "d6",
   "O-O",
   "O-O",
   "Re1",
   "a6",
   "Bb3",
   "Ba7"
  ],
  "comments": [
   "Ocupa el centro y libera dama y alfil.",
   "Respuesta simétrica: disputa el centro.",
   "Desarrolla atacando e5.",
   "Defiende e5 desarrollando.",
   "El alfil apunta a f7, el punto débil de las negras.",
   "Las negras imitan: el alfil apunta a f2.",
   "Prepara d4 y da una casilla de retirada al alfil (a2 tras b4/a4).",
   "Contraataca e4.",
   "Plan lento: protege e4 y mantiene la tensión (Pianissimo).",
   "Simetría sólida; abre el alfil de c8.",
   "Rey a salvo.",
   "Las negras también enrocan.",
   "La torre apoya e4 y prepara Nbd2-f1-g3.",
   "Prepara ...Ba7 y evita Bb5 / Nb5.",
   "Retirada preventiva ante ...Na5 o ...d5.",
   "El alfil se esconde en a7 sin perder la diagonal a7-g1."
  ],
  "stats": {
   "white": 37,
   "draw": 36,
   "black": 27,
   "popularity": "Muy alta",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases de partidas magistrales"
  },
  "ideas": [
   "Presión sobre f7 con alfil y caballo.",
   "Ruptura central d3-d4 en el momento preciso.",
   "Maniobra de caballo b1-d2-f1-g3 hacia el flanco de rey.",
   "Expansión en el flanco de dama con a4 y b4."
  ],
  "plansWhite": [
   "Preparar d4 con c3 para conquistar el centro.",
   "Jugar Nbd2-f1-g3 y buscar ataque con Nf5 o Ng5.",
   "Ganar espacio con a4, b4 y fijar el flanco de dama."
  ],
  "plansBlack": [
   "Romper con ...d5 si las blancas se demoran.",
   "Maniobra ...Ne7-g6 para controlar f4.",
   "Golpear con ...b5 o ...a5 para cuestionar el alfil de c4."
  ],
  "pros": [
   "Principios clásicos claros: ideal para aprender.",
   "Posiciones ricas pero sin teoría excesiva en la versión lenta.",
   "Muy flexible: se puede elegir entre lucha táctica (d4, Evans) o maniobras lentas.",
   "Usada en la élite mundial (Carlsen, Caruana, Giri)."
  ],
  "cons": [
   "Con juego lento la ventaja de las blancas es mínima.",
   "Las negras igualan con facilidad si conocen los planes.",
   "Las líneas agudas (Gambito Evans, Ataque Moller) exigen mucha memoria."
  ],
  "structures": "Centro simétrico abierto (e4/e5) o semicerrado tras d3/d6. Si se juega d4 y ...exd4 cxd4 aparece un centro móvil blanco (e4+d4).",
  "variations": [
   {
    "name": "Línea principal con 4.c3 Nf6 5.d4",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Bc5",
     "c3",
     "Nf6",
     "d4",
     "exd4",
     "cxd4",
     "Bb4+",
     "Bd2",
     "Bxd2+",
     "Nbxd2",
     "d5"
    ],
    "note": "Lucha por el centro: las negras rompen con ...d5 para no quedar aplastadas."
   },
   {
    "name": "Gambito Evans",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Bc5",
     "b4",
     "Bxb4",
     "c3",
     "Ba5",
     "d4",
     "exd4",
     "O-O"
    ],
    "note": "Las blancas sacrifican un peón para ganar tiempos y centro. Fue arma de Morphy y Kasparov."
   },
   {
    "name": "Giuoco Pianissimo con a4",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Bc5",
     "c3",
     "Nf6",
     "d3",
     "d6",
     "O-O",
     "a6",
     "a4",
     "Ba7"
    ],
    "note": "Ganancia de espacio en flanco de dama; muy moderna."
   }
  ],
  "traps": [
   {
    "name": "Trampa del Gambito Blackburne-Shilling",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Nd4",
     "Nxe5",
     "Qg5",
     "Nxf7",
     "Qxg2",
     "Rf1",
     "Qxe4+",
     "Be2",
     "Nf3#"
    ],
    "explanation": "3...Nd4 parece un error que regala e5, pero si las blancas comen con avidez (4.Nxe5? Qg5!) acaban recibiendo un mate de caballo. Lo correcto es 4.Nxd4 o 4.O-O."
   }
  ],
  "players": [
   "Giulio Polerio (histórico)",
   "Paul Morphy",
   "Magnus Carlsen",
   "Fabiano Caruana",
   "Anish Giri"
  ],
  "style": [
   "posicional",
   "universal"
  ],
  "goal": "Busca desarrollo rápido y presión sobre f7 para luego conquistar el centro con c3-d4. En su forma moderna (d3) el fin no es un ataque inmediato sino mantener la tensión, maniobrar con Nbd2-f1-g3 y llegar a un medio juego rico donde gana quien entiende mejor los planes, no quien memoriza más.",
  "profile": "Jugador que quiere posiciones clásicas, sanas y flexibles, desde principiantes hasta élite.",
  "middlegame": [
   "Maniobra Nbd2-f1-g3 y ataque con Nf5/Ng5.",
   "Ruptura d3-d4 en el momento oportuno.",
   "Expansión a4-b4 en flanco de dama.",
   "Ruptura negra ...d5 para liberar."
  ],
  "endgames": [
   "Finales de piezas menores con estructura simétrica: igualdad, decide la técnica.",
   "Finales de torres con mayoría en flanco de dama si se juega d4 y cambios."
  ],
  "keyPieces": "Clave: alfil de c4 (b3/a2) apuntando a f7. Peor pieza típica: el caballo de b1 hasta que llega a g3.",
  "riskLevel": 2,
  "theoryLoad": 2
 },
 {
  "id": "espanola",
  "name": "Apertura Española (Ruy López)",
  "eco": "C60-C99",
  "group": "e4",
  "type": "abierta",
  "side": "blancas",
  "level": "intermedio",
  "summary": "La reina de las aperturas abiertas: el alfil presiona al defensor de e5 y genera una presión duradera. Gran tradición en campeonatos mundiales.",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "Nc6",
   "Bb5",
   "a6",
   "Ba4",
   "Nf6",
   "O-O",
   "Be7",
   "Re1",
   "b5",
   "Bb3",
   "d6",
   "c3",
   "O-O",
   "h3",
   "Nb8"
  ],
  "comments": [
   "Peón rey: centro y desarrollo.",
   "Respuesta clásica.",
   "Ataca e5.",
   "Defiende e5.",
   "Presiona al caballo que defiende e5 (amenaza indirecta).",
   "Variante Morphy: pregunta al alfil.",
   "Mantiene la clavada potencial.",
   "Contraataque sobre e4.",
   "Enroque: e4 está protegido tácticamente (...Nxe4 Re1).",
   "Desarrollo sobrio (Española Cerrada).",
   "Protege e4 y libera la amenaza Bxc6 + Nxe5.",
   "Expulsa al alfil y gana espacio.",
   "El alfil mantiene la diagonal a2-g8 apuntando a f7.",
   "Consolida e5.",
   "Prepara d4 y crea una retirada para el alfil en c2.",
   "Rey a salvo.",
   "Evita ...Bg4 antes de jugar d4.",
   "Variante Breyer: el caballo se reubica en d7 para apoyar e5 y liberar c6."
  ],
  "stats": {
   "white": 39,
   "draw": 37,
   "black": 24,
   "popularity": "Muy alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Presión prolongada sobre e5.",
   "Maniobra Nbd2-f1-g3 típica de la Cerrada.",
   "Ruptura d4 con apoyo de c3.",
   "Juego en flanco de dama con a4."
  ],
  "plansWhite": [
   "Construir un centro e4-d4 y ganar espacio.",
   "Reagrupar el caballo de b1 vía d2-f1-g3 para atacar el flanco de rey.",
   "Presionar con a4 contra el peón de b5."
  ],
  "plansBlack": [
   "Mantener e5 con ...d6 y reorganizar piezas (Breyer, Chigorin, Zaitsev).",
   "Contraatacar en el flanco de dama con ...c5 y ...b4.",
   "En la Marshall, sacrificar un peón por iniciativa con ...d5."
  ],
  "pros": [
   "Presión estratégica duradera, sin riesgo para las blancas.",
   "Muy estudiada: planes claros en todas las variantes.",
   "Funciona en todos los niveles y ritmos.",
   "Enseña maniobras, estructura y profilaxis."
  ],
  "cons": [
   "Teoría muy extensa (Berlín, Marshall, Zaitsev, Abierta...).",
   "La Defensa Berlín conduce a finales muy sólidos para las negras.",
   "La Marshall obliga a memorizar líneas de 20+ jugadas."
  ],
  "structures": "Típicamente centro cerrado e4/d4 contra d6/e5 tras d4-d5, o estructura abierta con centro móvil. En la Berlín se produce un final sin damas con peones doblados en c.",
  "variations": [
   {
    "name": "Defensa Berlín (Muro de Berlín)",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "Nf6",
     "O-O",
     "Nxe4",
     "d4",
     "Nd6",
     "Bxc6",
     "dxc6",
     "dxe5",
     "Nf5",
     "Qxd8+",
     "Kxd8"
    ],
    "note": "Final sin damas: Kramnik la usó para arrebatar el título a Kasparov en 2000."
   },
   {
    "name": "Variante del Cambio",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "a6",
     "Bxc6",
     "dxc6",
     "O-O",
     "f6",
     "d4",
     "exd4",
     "Nxd4"
    ],
    "note": "Las blancas buscan un final con mayoría de peones sana en flanco de rey. Favorita de Fischer."
   },
   {
    "name": "Ataque Marshall",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "a6",
     "Ba4",
     "Nf6",
     "O-O",
     "Be7",
     "Re1",
     "b5",
     "Bb3",
     "O-O",
     "c3",
     "d5",
     "exd5",
     "Nxd5",
     "Nxe5",
     "Nxe5",
     "Rxe5",
     "c6"
    ],
    "note": "Gambito: las negras dan un peón por un ataque peligroso en el flanco de rey."
   },
   {
    "name": "Variante Abierta",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "a6",
     "Ba4",
     "Nf6",
     "O-O",
     "Nxe4",
     "d4",
     "b5",
     "Bb3",
     "d5",
     "dxe5",
     "Be6"
    ],
    "note": "Juego activo de piezas para las negras a cambio de una estructura algo expuesta."
   }
  ],
  "traps": [
   {
    "name": "Trampa del Arca de Noé",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "a6",
     "Ba4",
     "d6",
     "d4",
     "b5",
     "Bb3",
     "Nxd4",
     "Nxd4",
     "exd4",
     "Qxd4",
     "c5",
     "Qd5",
     "Be6",
     "Qc6+",
     "Bd7",
     "Qd5",
     "c4"
    ],
    "explanation": "Si las blancas recuperan el peón con 7.Qxd4?, la cadena ...c5-c4 encierra y captura el alfil de b3."
   },
   {
    "name": "Trampa de la caña de pescar (Fishing Pole)",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bb5",
     "Nf6",
     "O-O",
     "Ng4",
     "h3",
     "h5",
     "hxg4",
     "hxg4",
     "Ne1",
     "Qh4",
     "f3",
     "g3"
    ],
    "explanation": "Si las blancas cogen el caballo con hxg4, la columna h se abre y la dama entra por h4: el mate en h2 es imparable."
   }
  ],
  "players": [
   "Ruy López de Segura",
   "José Raúl Capablanca",
   "Bobby Fischer",
   "Anatoli Kárpov",
   "Magnus Carlsen"
  ],
  "style": [
   "posicional",
   "sólido"
  ],
  "goal": "Presionar indirectamente e5 atacando a su defensor (Nc6) para crear una presión duradera en el centro. Las blancas quieren construir e4-d4 y obligar a las negras a defender durante mucho tiempo; las negras aceptan algo de pasividad a cambio de una posición muy sólida.",
  "profile": "Jugador estratégico y paciente que disfruta de maniobras largas y está dispuesto a estudiar teoría.",
  "middlegame": [
   "Maniobra Nbd2-f1-g3 y ataque en flanco de rey.",
   "Cierre del centro con d5 y juego en flancos.",
   "Presión a4 contra b5.",
   "Ataque Marshall: iniciativa negra a cambio de un peón."
  ],
  "endgames": [
   "Final de la Berlín sin damas: las blancas tienen mayoría en el flanco de rey, las negras la pareja de alfiles; muy sólido para negras.",
   "Finales de cambio (Bxc6): mayoría sana blanca 4 contra 3 en flanco de rey, ligera ventaja blanca."
  ],
  "keyPieces": "Clave: alfil de b3 (diagonal a2-g8). Peor pieza típica: el alfil negro de e7 en la Cerrada.",
  "riskLevel": 2,
  "theoryLoad": 5
 },
 {
  "id": "escocesa",
  "name": "Apertura Escocesa",
  "eco": "C44-C45",
  "group": "e4",
  "type": "abierta",
  "side": "blancas",
  "level": "intermedio",
  "summary": "Las blancas abren el centro de inmediato con 3.d4, buscando juego de piezas libre y una mayoría central. Revitalizada por Kaspárov en los 90.",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "Nc6",
   "d4",
   "exd4",
   "Nxd4",
   "Bc5",
   "Be3",
   "Qf6",
   "c3",
   "Nge7",
   "Bc4",
   "Ne5",
   "Be2",
   "Qg6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Ataca e5.",
   "Defiende.",
   "Rompe el centro inmediatamente.",
   "Forzado prácticamente.",
   "Recupera el peón con un caballo centralizado.",
   "Variante Clásica: presiona d4.",
   "Defiende el caballo.",
   "Aumenta la presión sobre d4.",
   "Refuerza d4 con un peón.",
   "Desarrollo flexible (el caballo de e7 no bloquea el peón f).",
   "Desarrolla con presión en f7.",
   "Golpea el alfil y apunta a c4 y g4.",
   "Retirada segura, mantiene el centro.",
   "La dama ataca e4 y g2."
  ],
  "stats": {
   "white": 40,
   "draw": 31,
   "black": 29,
   "popularity": "Alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Centralización rápida del caballo en d4.",
   "Ventaja de espacio por el peón de e4 contra d6.",
   "En la Mieses, ataque con e5 ganando espacio."
  ],
  "plansWhite": [
   "Desarrollo armónico y presión en la columna d.",
   "Avanzar e5 para desalojar el caballo de f6.",
   "Aprovechar la debilidad de c6 tras Nxc6 bxc6."
  ],
  "plansBlack": [
   "Contraatacar d4 con ...Bc5 / ...Qf6.",
   "Romper con ...d5 para liberar el juego.",
   "Aprovechar la pareja de alfiles o la columna b semiabierta."
  ],
  "pros": [
   "Evita la enorme teoría de la Española.",
   "Juego directo y fácil de entender.",
   "Posiciones abiertas donde mandan las piezas."
  ],
  "cons": [
   "Libera el juego de las negras pronto.",
   "Cede la tensión central: menos presión a largo plazo.",
   "Líneas como la Mieses requieren precisión."
  ],
  "structures": "Centro abierto con peón e4 blanco vs peones negros en d7/c7; tras Nxc6 bxc6 las negras quedan con peones doblados pero centro fuerte (...d5).",
  "variations": [
   {
    "name": "Variante Mieses",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "d4",
     "exd4",
     "Nxd4",
     "Nf6",
     "Nxc6",
     "bxc6",
     "e5",
     "Qe7",
     "Qe2",
     "Nd5",
     "c4",
     "Ba6"
    ],
    "note": "Lucha aguda: las blancas ganan espacio, las negras clavan c4."
   },
   {
    "name": "Gambito Escocés",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "d4",
     "exd4",
     "Bc4",
     "Nf6",
     "e5",
     "d5",
     "Bb5",
     "Ne4",
     "Nxd4"
    ],
    "note": "Las blancas difieren la recuperación del peón para acelerar el desarrollo."
   },
   {
    "name": "Variante Steinitz",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "d4",
     "exd4",
     "Nxd4",
     "Qh4",
     "Nc3",
     "Bb4",
     "Be2"
    ],
    "note": "La dama ataca e4 pronto; arriesgado para las negras."
   }
  ],
  "traps": [],
  "players": [
   "Garry Kaspárov",
   "Ian Nepómniashchi",
   "Magnus Carlsen",
   "Alexei Shirov"
  ],
  "style": [
   "dinámico",
   "universal"
  ],
  "goal": "Abrir el centro de inmediato para tener un juego libre de piezas y evitar la teoría de la Española. Las blancas aspiran a una ligera ventaja de espacio por el peón e4; las negras buscan contraatacar d4 y liberarse con ...d5.",
  "profile": "Jugador práctico que prefiere posiciones abiertas y claras sin enorme memoria.",
  "middlegame": [
   "Presión en la columna d.",
   "Avance e5 para expulsar Nf6 (Mieses).",
   "Peones doblados c6 negros: ataque contra ellos."
  ],
  "endgames": [
   "Finales con peón negro de c doblado: ligera ventaja blanca por estructura.",
   "Finales de alfiles de distinto color frecuentes y tablas."
  ],
  "keyPieces": "Clave: caballo de d4 centralizado. Peor pieza típica: alfil negro de c8 en líneas con ...bxc6.",
  "riskLevel": 3,
  "theoryLoad": 3
 },
 {
  "id": "dos-caballos",
  "name": "Defensa de los Dos Caballos",
  "eco": "C55-C59",
  "group": "e4",
  "type": "abierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "Las negras responden a la Italiana con 3...Nf6 contraatacando e4 y aceptando complicaciones tácticas como el ataque Ng5 contra f7.",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "Nc6",
   "Bc4",
   "Nf6",
   "Ng5",
   "d5",
   "exd5",
   "Na5",
   "Bb5+",
   "c6",
   "dxc6",
   "bxc6",
   "Be2",
   "h6",
   "Nf3",
   "e4",
   "Ne5",
   "Bd6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Desarrollo.",
   "Defensa.",
   "Italiana.",
   "Dos Caballos: contraataque inmediato a e4.",
   "Ataque a f7 con caballo y alfil.",
   "La defensa principal: bloquea la diagonal.",
   "Gana un peón.",
   "Ataca al alfil (mejor que 5...Nxd5).",
   "Jaque intermedio.",
   "Sacrifica un peón para ganar tiempo.",
   "Acepta.",
   "Las negras tienen peón menos pero mucho desarrollo.",
   "El alfil se retira.",
   "Expulsa al caballo.",
   "Retirada.",
   "Gana espacio y tiempo.",
   "Caballo centralizado.",
   "Desarrollo con presión en el flanco de rey: compensación clara."
  ],
  "stats": {
   "white": 40,
   "draw": 27,
   "black": 33,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Gambito de peón por desarrollo e iniciativa.",
   "Defensa de f7 con ...d5.",
   "Contraataque con ...Bxf2+ en la Traxler."
  ],
  "plansWhite": [
   "Ganar el peón de d5 y consolidar.",
   "Atacar f7 de inmediato (Fegatello / Hígado Frito).",
   "Alternativa tranquila: 4.d3 entrando en Italiana lenta."
  ],
  "plansBlack": [
   "Ganar tiempos sobre el caballo y alfil blancos.",
   "Montar ataque en el flanco de rey tras ...e4.",
   "En la Traxler, contraatacar f2 sacrificando material."
  ],
  "pros": [
   "Juego muy activo para las negras.",
   "Castiga a las blancas que quieren evitar teoría con 4.Ng5.",
   "Muy instructiva en táctica."
  ],
  "cons": [
   "Concede material y exige compensación precisa.",
   "Errores de las negras en la línea 5...Nxd5 se castigan con el Hígado Frito.",
   "Las blancas pueden evitarla con 4.d3 lento."
  ],
  "structures": "Abiertas o semiabiertas; en la línea principal las negras tienen peón doblado en c y un peón avanzado en e4 a cambio del peón.",
  "variations": [
   {
    "name": "Ataque Hígado Frito (Fegatello)",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Nf6",
     "Ng5",
     "d5",
     "exd5",
     "Nxd5",
     "Nxf7",
     "Kxf7",
     "Qf3+",
     "Ke6",
     "Nc3"
    ],
    "note": "Sacrificio de caballo para exponer el rey negro en el centro. Por eso 5...Na5 es la jugada correcta."
   },
   {
    "name": "Contraataque Traxler (Wilkes-Barre)",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Nf6",
     "Ng5",
     "Bc5",
     "Nxf7",
     "Bxf2+",
     "Kxf2",
     "Nxe4+"
    ],
    "note": "Las negras ignoran la amenaza en f7 y atacan f2: caos táctico."
   },
   {
    "name": "Ataque Moderno 4.d4",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Nf6",
     "d4",
     "exd4",
     "O-O",
     "Nxe4",
     "Re1",
     "d5",
     "Bxd5",
     "Qxd5",
     "Nc3"
    ],
    "note": "Juego abierto con clavadas en la columna e."
   }
  ],
  "traps": [
   {
    "name": "El Hígado Frito como trampa",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nc6",
     "Bc4",
     "Nf6",
     "Ng5",
     "d5",
     "exd5",
     "Nxd5",
     "Nxf7",
     "Kxf7",
     "Qf3+",
     "Ke6",
     "Nc3"
    ],
    "explanation": "5...Nxd5? parece natural, pero permite 6.Nxf7! con el rey negro atrapado en el centro bajo ataque de todas las piezas blancas."
   }
  ],
  "players": [
   "Mijaíl Chigorin",
   "Alexander Beliavsky",
   "Karl Traxler (histórico)"
  ],
  "style": [
   "táctico",
   "agresivo"
  ],
  "goal": "Contraatacar e4 en vez de defender pasivamente, aceptando sacrificar un peón por desarrollo e iniciativa si las blancas atacan f7. Su fin es castigar el juego materialista y llevar la lucha a terreno táctico.",
  "profile": "Jugador táctico, buen calculador, al que le gusta tener la iniciativa con negras.",
  "middlegame": [
   "Ataques contra f7/f2.",
   "Columnas abiertas y desarrollo superior negro.",
   "Avance ...e4 ganando tiempos."
  ],
  "endgames": [
   "Si las blancas consolidan el peón extra, los finales les favorecen.",
   "Si las negras conservan la iniciativa rara vez se llega al final."
  ],
  "keyPieces": "Clave: caballo de f6 y alfil de c4. Peor pieza típica: caballo negro de a5 en el borde.",
  "riskLevel": 4,
  "theoryLoad": 3
 },
 {
  "id": "gambito-rey",
  "name": "Gambito de Rey",
  "eco": "C30-C39",
  "group": "e4",
  "type": "gambito",
  "side": "blancas",
  "level": "intermedio",
  "summary": "El gambito romántico por excelencia: las blancas ofrecen el peón f para abrir la columna f y dominar el centro con d4.",
  "moves": [
   "e4",
   "e5",
   "f4",
   "exf4",
   "Nf3",
   "g5",
   "h4",
   "g4",
   "Ne5",
   "Nf6",
   "d4",
   "d6",
   "Nd3",
   "Nxe4",
   "Bxf4",
   "Bg7"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Gambito: desvía el peón e5.",
   "Acepta el peón.",
   "Impide ...Qh4+ y prepara d4.",
   "Defiende el peón de f4.",
   "Gambito Kieseritzky: ataca la cadena de peones.",
   "Avanza ganando tiempo sobre el caballo.",
   "Caballo activo en e5.",
   "Contraataque a e4.",
   "Centro fuerte.",
   "Expulsa al caballo.",
   "El caballo presiona f4.",
   "Las negras devuelven material ganando e4.",
   "Recupera el peón: centro abierto.",
   "Pareja de alfiles activa para las negras."
  ],
  "stats": {
   "white": 43,
   "draw": 20,
   "black": 37,
   "popularity": "Baja en élite / media en aficionados",
   "elo": "Club",
   "note": "Porcentajes aproximados; resultados mucho más decisivos que la media"
  },
  "ideas": [
   "Abrir la columna f contra f7.",
   "Construir centro con d4 tras eliminar e5.",
   "Desarrollo rápido y ataque al rey negro."
  ],
  "plansWhite": [
   "Recuperar el peón f4 con Bxf4 en buenas condiciones.",
   "Atacar f7 con Bc4, Rf1 y Qe2/Qd3.",
   "Explotar el debilitamiento del flanco de rey negro (...g5)."
  ],
  "plansBlack": [
   "Mantener el peón con ...g5 o devolverlo con ...d5 para igualar.",
   "Contraatacar el centro con ...d5.",
   "Aprovechar la exposición del rey blanco en la diagonal e1-h4."
  ],
  "pros": [
   "Iniciativa y juego de ataque desde la jugada 2.",
   "Sorpresa: pocos rivales la preparan.",
   "Enseña juego dinámico y valoración de compensación."
  ],
  "cons": [
   "Objetivamente arriesgado: debilita el rey blanco.",
   "Las negras pueden devolver el peón con ventaja de desarrollo (2...d5 Falkbeer, 3...d5).",
   "Requiere mucha preparación concreta."
  ],
  "structures": "Estructuras irregulares: columna f abierta, peones negros en g5/f4 o centro abierto tras ...d5.",
  "variations": [
   {
    "name": "Contragambito Falkbeer",
    "moves": [
     "e4",
     "e5",
     "f4",
     "d5",
     "exd5",
     "e4",
     "d3",
     "Nf6",
     "dxe4",
     "Nxe4"
    ],
    "note": "Las negras contra-sacrifican para mantener un peón en e4."
   },
   {
    "name": "Gambito de Rey Rehusado (2...Bc5)",
    "moves": [
     "e4",
     "e5",
     "f4",
     "Bc5",
     "Nf3",
     "d6",
     "c3",
     "Nf6",
     "fxe5",
     "dxe5"
    ],
    "note": "El alfil impide el enroque blanco; sólido para las negras."
   },
   {
    "name": "Defensa Moderna 3...d5",
    "moves": [
     "e4",
     "e5",
     "f4",
     "exf4",
     "Nf3",
     "d5",
     "exd5",
     "Nf6",
     "Bb5+",
     "c6",
     "dxc6"
    ],
    "note": "Las negras devuelven el peón y aceleran su desarrollo."
   },
   {
    "name": "Gambito Muzio",
    "moves": [
     "e4",
     "e5",
     "f4",
     "exf4",
     "Nf3",
     "g5",
     "Bc4",
     "g4",
     "O-O",
     "gxf3",
     "Qxf3"
    ],
    "note": "Sacrificio de caballo completo por un ataque feroz en la columna f."
   }
  ],
  "traps": [
   {
    "name": "Trampa del Gambito Rehusado",
    "moves": [
     "e4",
     "e5",
     "f4",
     "Bc5",
     "fxe5",
     "Qh4+",
     "g3",
     "Qxe4+",
     "Qe2",
     "Qxh1"
    ],
    "explanation": "Si las blancas capturan 3.fxe5?? sin preparar, ...Qh4+ y ...Qxe4+ ganan la torre de h1."
   }
  ],
  "players": [
   "Adolf Anderssen",
   "Paul Morphy",
   "Boris Spassky",
   "David Bronstein",
   "Hikaru Nakamura (partidas rápidas)"
  ],
  "style": [
   "agresivo",
   "gambito",
   "táctico"
  ],
  "goal": "Desviar el peón e5 para abrir la columna f y construir un centro ideal con d4. Es la apertura romántica: sacrificar material para obtener desarrollo, líneas abiertas y ataque al rey.",
  "profile": "Atacante nato, buen calculador, que disfruta del riesgo y la iniciativa; útil como sorpresa.",
  "middlegame": [
   "Ataque sobre f7 con torre en f1 y alfil en c4.",
   "Recuperación del peón f4 con Bxf4.",
   "Debilidades del flanco de rey negro tras ...g5."
  ],
  "endgames": [
   "Si las negras retienen el peón y cambian piezas, el final suele favorecerlas.",
   "Finales con estructura dañada en flanco de rey para ambos."
  ],
  "keyPieces": "Clave: torre de f1 en la columna f abierta. Peor pieza: rey blanco expuesto en la diagonal e1-h4.",
  "riskLevel": 5,
  "theoryLoad": 4
 },
 {
  "id": "petrov",
  "name": "Defensa Petrov (Rusa)",
  "eco": "C42-C43",
  "group": "e4",
  "type": "abierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "Las negras contraatacan e4 en vez de defender e5. Una de las defensas más sólidas: igualdad y simetría.",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "Nf6",
   "Nxe5",
   "d6",
   "Nf3",
   "Nxe4",
   "d4",
   "d5",
   "Bd3",
   "Nc6",
   "O-O",
   "Be7",
   "c4",
   "Nb4"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Ataca e5.",
   "Contraataque simétrico a e4.",
   "Gana el peón.",
   "¡Importante! Primero expulsar al caballo (3...Nxe4? es un error).",
   "Retirada.",
   "Recupera el peón.",
   "Centro y amenaza indirecta contra e4.",
   "El caballo se apoya en d5.",
   "Desarrollo con presión en e4.",
   "Desarrollo y presión sobre d4.",
   "Enroque.",
   "Desarrollo sólido.",
   "Ataca la base d5.",
   "Golpea al alfil de d3 (variante principal moderna)."
  ],
  "stats": {
   "white": 35,
   "draw": 46,
   "black": 19,
   "popularity": "Alta en élite",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales; muy alto índice de tablas"
  },
  "ideas": [
   "Simetría y solidez.",
   "Caballo activo en e4.",
   "Contraataque central con ...d5."
  ],
  "plansWhite": [
   "Expulsar el caballo de e4 con c4 / Nc3.",
   "Enroque largo y ataque (línea Nc3 Nxc3 dxc3).",
   "Explotar ligera ventaja de desarrollo."
  ],
  "plansBlack": [
   "Mantener el caballo en e4 el mayor tiempo posible.",
   "Simplificar y buscar finales iguales.",
   "Presionar d4 con ...Nc6, ...Bg4."
  ],
  "pros": [
   "Extremadamente sólida.",
   "Poca teoría forzada comparada con la Española.",
   "Arma de tablas fiable en torneos."
  ],
  "cons": [
   "Pocas oportunidades de ganar contra rivales sólidos.",
   "Posiciones simétricas que pueden ser aburridas.",
   "Requiere conocer la trampa 3...Nxe4?."
  ],
  "structures": "Simétricas: peones d4/d5 frente a frente y columna e semiabierta.",
  "variations": [
   {
    "name": "Variante 5.Nc3 (enroque largo)",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nf6",
     "Nxe5",
     "d6",
     "Nf3",
     "Nxe4",
     "Nc3",
     "Nxc3",
     "dxc3",
     "Be7",
     "Be3",
     "O-O",
     "Qd2",
     "Nd7",
     "O-O-O"
    ],
    "note": "Enroques opuestos: las blancas buscan ataque con g4-g5."
   },
   {
    "name": "Variante Steinitz 3.d4",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nf6",
     "d4",
     "Nxe4",
     "Bd3",
     "d5",
     "Nxe5",
     "Nd7",
     "Nxd7",
     "Bxd7",
     "O-O"
    ],
    "note": "Las blancas abren el centro antes."
   }
  ],
  "traps": [
   {
    "name": "Trampa de la clavada en la columna e",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "Nf6",
     "Nxe5",
     "Nxe4",
     "Qe2",
     "Nf6",
     "Nc6+"
    ],
    "explanation": "Copiar con 3...Nxe4? es malo: 4.Qe2 y si 4...Nf6?? 5.Nc6+ es jaque descubierto que gana la dama de d8."
   }
  ],
  "players": [
   "Vladímir Kramnik",
   "Fabiano Caruana",
   "Artur Yusúpov",
   "Petr Petrov (histórico)"
  ],
  "style": [
   "sólido"
  ],
  "goal": "Neutralizar la iniciativa blanca mediante simetría: en vez de defender e5, las negras contraatacan e4. El fin es igualar con seguridad, simplificar y llegar a posiciones donde las blancas no tengan nada concreto.",
  "profile": "Jugador sólido que busca tablas fiables con negras o que juega bien finales simétricos.",
  "middlegame": [
   "Mantenimiento del caballo en e4.",
   "Enroques opuestos tras 5.Nc3.",
   "Simplificación y juego en la columna e."
  ],
  "endgames": [
   "Finales simétricos muy igualados (tablas frecuentes).",
   "Ligera ventaja de espacio blanca sin consecuencias serias."
  ],
  "keyPieces": "Clave: caballo negro en e4. Peor pieza: ninguna destacada; posiciones equilibradas.",
  "riskLevel": 1,
  "theoryLoad": 3
 },
 {
  "id": "philidor",
  "name": "Defensa Philidor",
  "eco": "C41",
  "group": "e4",
  "type": "abierta",
  "side": "negras",
  "level": "principiante",
  "summary": "Defensa sólida y algo pasiva: las negras protegen e5 con ...d6 y buscan una estructura compacta (sistema Hanham).",
  "moves": [
   "e4",
   "e5",
   "Nf3",
   "d6",
   "d4",
   "Nf6",
   "Nc3",
   "Nbd7",
   "Bc4",
   "Be7",
   "O-O",
   "O-O",
   "Re1",
   "c6",
   "a4",
   "b6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Ataca e5.",
   "Defensa Philidor: protege e5 con un peón.",
   "Las blancas desafían el centro.",
   "Contraataque a e4 (orden moderno).",
   "Defiende e4.",
   "Sistema Hanham: mantener e5 a toda costa.",
   "Apunta a f7.",
   "Desarrollo sobrio.",
   "Enroque.",
   "Enroque.",
   "Apoya e4 y prepara Bf1.",
   "Prepara ...b5 y ...Qc7.",
   "Impide ...b5.",
   "Prepara ...Bb7 y ...a6."
  ],
  "stats": {
   "white": 44,
   "draw": 30,
   "black": 26,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Mantener el punto fuerte e5.",
   "Estructura compacta y flexible.",
   "Ruptura posterior con ...b5 o ...exd4 + ...Re8."
  ],
  "plansWhite": [
   "Ganar espacio con a4, h3 y Be3.",
   "Presión sobre f7 y la diagonal a2-g8.",
   "Ruptura d5 para encerrar el alfil de e7."
  ],
  "plansBlack": [
   "Mantener e5 y jugar ...c6, ...Qc7, ...b5.",
   "Maniobra ...Re8-...Bf8.",
   "Cambio en d4 y presión en la columna e."
  ],
  "pros": [
   "Estructura sólida y difícil de romper.",
   "Pocas líneas forzadas.",
   "Fácil de aprender para principiantes."
  ],
  "cons": [
   "Pasiva: cede espacio.",
   "El alfil de e7 queda poco activo.",
   "Existen trampas tácticas tempranas (Légal) si se juega mal el orden."
  ],
  "structures": "Centro cerrado o semiabierto con peón negro en e5 sostenido por d6.",
  "variations": [
   {
    "name": "Variante del Cambio",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "d6",
     "d4",
     "exd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "Be7",
     "Bf4",
     "O-O",
     "Qd2"
    ],
    "note": "Las negras ceden el centro y juegan con piezas; las blancas tienen más espacio."
   },
   {
    "name": "Defensa León (orden 1...d6)",
    "moves": [
     "e4",
     "d6",
     "d4",
     "Nf6",
     "Nc3",
     "e5",
     "Nf3",
     "Nbd7",
     "Bc4",
     "Be7",
     "O-O",
     "O-O"
    ],
    "note": "Llega a la estructura Hanham evitando algunas líneas."
   }
  ],
  "traps": [
   {
    "name": "Mate de Légal",
    "moves": [
     "e4",
     "e5",
     "Nf3",
     "d6",
     "Bc4",
     "Bg4",
     "Nc3",
     "g6",
     "Nxe5",
     "Bxd1",
     "Bxf7+",
     "Ke7",
     "Nd5#"
    ],
    "explanation": "La clavada del caballo f3 es solo relativa: 5.Nxe5! sacrifica la dama y, si las negras la toman, mate con tres piezas menores."
   }
  ],
  "players": [
   "François-André Danican Philidor",
   "Bent Larsen",
   "Ígor Glek"
  ],
  "style": [
   "sólido"
  ],
  "goal": "Mantener el punto fuerte e5 con peones a toda costa, construyendo una fortaleza compacta. Las negras renuncian a espacio para tener una estructura sin debilidades y contraatacar más tarde con ...b5 o ...exd4.",
  "profile": "Jugador defensivo que prefiere estructuras fijas y planes sencillos.",
  "middlegame": [
   "Ganancia de espacio blanca (a4, h3, Be3).",
   "Reorganización negra ...Re8-Bf8.",
   "Ruptura ...b5 / ...d5."
  ],
  "endgames": [
   "Finales con poco espacio para las negras: ligeramente peores pero defendibles."
  ],
  "keyPieces": "Clave: peón negro de e5. Peor pieza: alfil negro de e7 encerrado tras d6.",
  "riskLevel": 2,
  "theoryLoad": 2
 },
 {
  "id": "vienesa",
  "name": "Apertura Vienesa",
  "eco": "C25-C29",
  "group": "e4",
  "type": "abierta",
  "side": "blancas",
  "level": "intermedio",
  "summary": "2.Nc3 refuerza e4 y prepara f4 en condiciones más favorables que el Gambito de Rey.",
  "moves": [
   "e4",
   "e5",
   "Nc3",
   "Nf6",
   "f4",
   "d5",
   "fxe5",
   "Nxe4",
   "Nf3",
   "Be7",
   "d4",
   "O-O",
   "Bd3",
   "f5"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Vienesa: apoya e4 y prepara f4.",
   "Desarrollo.",
   "Gambito Vienés.",
   "Respuesta central.",
   "Gana espacio.",
   "Caballo activo.",
   "Desarrollo.",
   "Desarrollo sólido.",
   "Centro amplio.",
   "Enroque.",
   "Presiona el caballo de e4.",
   "Refuerza el caballo de e4."
  ],
  "stats": {
   "white": 40,
   "draw": 30,
   "black": 30,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Avance f4 con el centro apoyado.",
   "Espacio en flanco de rey (peón e5).",
   "Variantes muy tácticas (Frankenstein-Drácula)."
  ],
  "plansWhite": [
   "Jugar f4 y abrir la columna f.",
   "Usar el peón e5 como cuña para atacar.",
   "Alternativa lenta: g3 y Bg2."
  ],
  "plansBlack": [
   "Romper con ...d5 central.",
   "Contraatacar con ...Bb4 o ...Bc5.",
   "Bloquear con ...f5 para sostener el caballo."
  ],
  "pros": [
   "Flexible: puede ser posicional o agresiva.",
   "Menos teoría que la Española.",
   "Buenas posibilidades de ataque."
  ],
  "cons": [
   "Las negras igualan con ...d5 preciso.",
   "Algunas líneas se vuelven muy forzadas.",
   "Menos presión que 2.Nf3."
  ],
  "structures": "Peón blanco en e5 contra d5 negro tras la línea principal: cadena semicerrada.",
  "variations": [
   {
    "name": "Variante Frankenstein-Drácula",
    "moves": [
     "e4",
     "e5",
     "Nc3",
     "Nf6",
     "Bc4",
     "Nxe4",
     "Qh5",
     "Nd6",
     "Bb3",
     "Nc6",
     "Nb5",
     "g6",
     "Qf3",
     "f5",
     "Qd5",
     "Qe7",
     "Nxc7+",
     "Kd8",
     "Nxa8",
     "b6"
    ],
    "note": "Locura táctica: las negras sacrifican la torre por iniciativa."
   },
   {
    "name": "Sistema con g3",
    "moves": [
     "e4",
     "e5",
     "Nc3",
     "Nf6",
     "g3",
     "d5",
     "exd5",
     "Nxd5",
     "Bg2",
     "Nxc3",
     "bxc3",
     "Bd6"
    ],
    "note": "Fianchetto: juego posicional."
   }
  ],
  "traps": [
   {
    "name": "Mate en f7",
    "moves": [
     "e4",
     "e5",
     "Nc3",
     "Nf6",
     "Bc4",
     "Nxe4",
     "Qh5",
     "Nf6",
     "Qxf7#"
    ],
    "explanation": "Tras 3...Nxe4 4.Qh5 las negras deben jugar 4...Nd6. Retirar a f6 permite mate inmediato en f7."
   }
  ],
  "players": [
   "Carl Hamppe",
   "Rudolf Spielmann",
   "Hikaru Nakamura"
  ],
  "style": [
   "dinámico",
   "agresivo"
  ],
  "goal": "Reforzar e4 con Nc3 para jugar f4 en condiciones mejores que en el Gambito de Rey. Combina ataque en el flanco de rey con un centro estable.",
  "profile": "Jugador ofensivo que quiere ideas del Gambito de Rey con menos riesgo.",
  "middlegame": [
   "Cuña e5 y ataque con f-pawn.",
   "Lucha por d5 tras ...d5.",
   "Ataque Frankenstein-Drácula muy táctico."
  ],
  "endgames": [
   "Finales con peón en e5 blanco: ventaja de espacio."
  ],
  "keyPieces": "Clave: peón de f4/e5. Peor pieza: alfil negro de c8 si se cierra el centro.",
  "riskLevel": 3,
  "theoryLoad": 3
 },
 {
  "id": "siciliana-najdorf",
  "name": "Siciliana Najdorf",
  "eco": "B90-B99",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "avanzado",
  "summary": "La variante más prestigiosa de la Siciliana. 5...a6 es una jugada flexible que controla b5 y prepara ...e5 o ...e6. Arma de Fischer y Kaspárov.",
  "moves": [
   "e4",
   "c5",
   "Nf3",
   "d6",
   "d4",
   "cxd4",
   "Nxd4",
   "Nf6",
   "Nc3",
   "a6",
   "Be3",
   "e5",
   "Nb3",
   "Be6",
   "f3",
   "Be7",
   "Qd2",
   "O-O",
   "O-O-O",
   "Nbd7"
  ],
  "comments": [
   "Centro.",
   "Siciliana: lucha asimétrica por d4.",
   "Desarrollo.",
   "Controla e5 y prepara ...Nf6.",
   "Abre el centro.",
   "Cambia un peón de flanco por uno central.",
   "Recupera.",
   "Ataca e4.",
   "Defiende e4.",
   "Najdorf: controla b5 y prepara ...e5.",
   "Ataque Inglés.",
   "Gana espacio y expulsa al caballo.",
   "Retirada.",
   "Controla d5 y apunta a b3.",
   "Refuerza e4 y prepara g4.",
   "Desarrollo.",
   "Conecta y prepara el enroque largo.",
   "Rey a salvo.",
   "Enroques opuestos: carrera de ataques.",
   "Prepara ...b5 y ...Qc7."
  ],
  "stats": {
   "white": 38,
   "draw": 33,
   "black": 29,
   "popularity": "Muy alta",
   "elo": "Avanzado a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Control de d5 como casilla clave.",
   "Ruptura ...b5-b4 en el flanco de dama.",
   "Ruptura ...d5 que libera el juego."
  ],
  "plansWhite": [
   "Enroque largo y avalancha g4-g5-h4 (Ataque Inglés).",
   "Ocupar d5 con un caballo.",
   "En la 6.Bg5, ataque con f4 y e5."
  ],
  "plansBlack": [
   "Contraataque con ...b5-b4 y presión en la columna c.",
   "Liberarse con ...d5 en el momento justo.",
   "Explotar el peón e4 con ...Nxe4 tácticos."
  ],
  "pros": [
   "Desequilibrio: juego por la victoria con negras.",
   "Columna c semiabierta y mayoría central de peones.",
   "Muy flexible frente a cualquier sistema blanco.",
   "Probada al máximo nivel durante 70 años."
  ],
  "cons": [
   "Teoría gigantesca y en evolución constante.",
   "Errores pequeños llevan a derrotas rápidas.",
   "Las blancas eligen el tipo de batalla (6.Be3, 6.Bg5, 6.Be2, 6.h3...)."
  ],
  "structures": "Estructura Najdorf/Boleslavsky: peones negros en d6-e5 con agujero en d5; o estructura Scheveningen (d6-e6) en las líneas con ...e6.",
  "variations": [
   {
    "name": "6.Bg5 y Peón Envenenado",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "a6",
     "Bg5",
     "e6",
     "f4",
     "Qb6",
     "Qd2",
     "Qxb2",
     "Rb1",
     "Qa3"
    ],
    "note": "La dama negra come el peón b2 a cambio de un gran retraso de desarrollo."
   },
   {
    "name": "6.Be2 Clásica",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "a6",
     "Be2",
     "e5",
     "Nb3",
     "Be7",
     "O-O",
     "O-O"
    ],
    "note": "Juego posicional en torno a d5."
   },
   {
    "name": "Ataque Fischer-Sozin 6.Bc4",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "a6",
     "Bc4",
     "e6",
     "Bb3",
     "b5",
     "O-O",
     "Be7"
    ],
    "note": "El alfil apunta a e6 y f7; Fischer la jugó con blancas."
   }
  ],
  "traps": [],
  "players": [
   "Miguel Najdorf",
   "Bobby Fischer",
   "Garry Kaspárov",
   "Maxime Vachier-Lagrave",
   "Viswanathan Anand"
  ],
  "style": [
   "dinámico",
   "táctico"
  ],
  "goal": "Crear desequilibrio desde la jugada 1 para jugar a ganar con negras: cambiar el peón c por el peón d blanco, conseguir mayoría central y columna c, y retrasar la definición con ...a6 para elegir la estructura según el sistema blanco.",
  "profile": "Jugador ambicioso, trabajador, buen calculador, que acepta estudiar mucha teoría.",
  "middlegame": [
   "Carrera de ataques con enroques opuestos.",
   "Control de d5.",
   "Ruptura ...b5-b4 y ...d5.",
   "Sacrificios en e6 y b5 por parte de las blancas."
  ],
  "endgames": [
   "Finales con mayoría central negra (d6-e5/e6): a menudo favorables a las negras.",
   "Si las blancas controlan d5, final de caballo bueno contra alfil malo."
  ],
  "keyPieces": "Clave: caballo blanco en d5 y alfil negro de e6/b7. Peor pieza: alfil negro de e7 pasivo.",
  "riskLevel": 4,
  "theoryLoad": 5
 },
 {
  "id": "siciliana-dragon",
  "name": "Siciliana Dragón",
  "eco": "B70-B79",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "avanzado",
  "summary": "Las negras colocan el alfil en g7 en la gran diagonal. Contra el Ataque Yugoslavo se produce una de las carreras de ataque más feroces del ajedrez.",
  "moves": [
   "e4",
   "c5",
   "Nf3",
   "d6",
   "d4",
   "cxd4",
   "Nxd4",
   "Nf6",
   "Nc3",
   "g6",
   "Be3",
   "Bg7",
   "f3",
   "O-O",
   "Qd2",
   "Nc6",
   "Bc4",
   "Bd7",
   "O-O-O",
   "Rc8",
   "Bb3",
   "Ne5"
  ],
  "comments": [
   "Centro.",
   "Siciliana.",
   "Desarrollo.",
   "Prepara el desarrollo.",
   "Abre.",
   "Cambio.",
   "Recupera.",
   "Ataque a e4.",
   "Defensa.",
   "Dragón: fianchetto de rey.",
   "Ataque Yugoslavo.",
   "El alfil domina la diagonal a1-h8.",
   "Impide ...Ng4 y prepara g4.",
   "Enroque.",
   "Prepara Bh6 para cambiar el alfil de g7.",
   "Presión sobre d4.",
   "Controla d5 y apunta a f7.",
   "Desarrollo y prepara ...Rc8.",
   "Enroques opuestos.",
   "Columna c.",
   "Retirada preventiva.",
   "El caballo apunta a c4."
  ],
  "stats": {
   "white": 42,
   "draw": 28,
   "black": 30,
   "popularity": "Media",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Gran diagonal para el alfil de g7.",
   "Sacrificio de calidad ...Rxc3 típico.",
   "Ataque en la columna c contra el rey blanco."
  ],
  "plansWhite": [
   "Bh6 para eliminar el alfil dragón.",
   "Avance h4-h5 y abrir la columna h.",
   "Mate en h7/h8 con dama y torre."
  ],
  "plansBlack": [
   "...Rxc3 destruyendo el enroque blanco.",
   "...b5-b4 o ...Nc4 contra b2.",
   "Contraatacar más rápido que las blancas."
  ],
  "pros": [
   "Desequilibrio: juego por la victoria con negras.",
   "Columna c semiabierta y mayoría central de peones.",
   "Planes claros para ambos bandos.",
   "Muy rica tácticamente."
  ],
  "cons": [
   "El Ataque Yugoslavo es muy peligroso y teórico.",
   "Un solo tiempo decide la partida.",
   "Estructura con agujero en d5."
  ],
  "structures": "Peones negros en d6, e7, f7, g6, h7 (fianchetto) contra e4/f3/g4 blancos.",
  "variations": [
   {
    "name": "Dragón Clásico 6.Be2",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "g6",
     "Be2",
     "Bg7",
     "O-O",
     "O-O",
     "Be3",
     "Nc6",
     "Nb3"
    ],
    "note": "Sistema tranquilo; las negras igualan con facilidad."
   },
   {
    "name": "Dragón Acelerado",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "Nc6",
     "d4",
     "cxd4",
     "Nxd4",
     "g6",
     "c4",
     "Bg7",
     "Be3",
     "Nf6",
     "Nc3",
     "O-O",
     "Be2",
     "d6"
    ],
    "note": "Las negras evitan el Yugoslavo; las blancas pueden montar el Maróczy con c4."
   }
  ],
  "traps": [],
  "players": [
   "Veselin Topálov",
   "Gawain Jones",
   "Bobby Fischer (con blancas contra ella)",
   "Fedor Dus-Chotimirsky (histórico)"
  ],
  "style": [
   "agresivo",
   "táctico"
  ],
  "goal": "Situar el alfil en la gran diagonal para presionar d4 y b2, y contraatacar al rey blanco por la columna c. Contra el Yugoslavo el fin es ser más rápido en una carrera de ataques mutuos.",
  "profile": "Atacante puro que calcula bien y no teme las posiciones de \"todo o nada\".",
  "middlegame": [
   "Sacrificio ...Rxc3.",
   "Ataque blanco h4-h5 + Bh6.",
   "Columna c abierta."
  ],
  "endgames": [
   "Si se cambia el alfil de g7, los finales favorecen a las blancas por casillas oscuras débiles.",
   "Si el alfil dragón sobrevive, finales activos para las negras."
  ],
  "keyPieces": "Clave: alfil negro de g7 (el \"dragón\"). Peor pieza: alfil blanco de b3 si queda bloqueado.",
  "riskLevel": 5,
  "theoryLoad": 5
 },
 {
  "id": "siciliana-sveshnikov",
  "name": "Siciliana Sveshnikov",
  "eco": "B33",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "avanzado",
  "summary": "Las negras aceptan un agujero en d5 a cambio de mucha actividad y la pareja de alfiles. Muy concreta y moderna.",
  "moves": [
   "e4",
   "c5",
   "Nf3",
   "Nc6",
   "d4",
   "cxd4",
   "Nxd4",
   "Nf6",
   "Nc3",
   "e5",
   "Ndb5",
   "d6",
   "Bg5",
   "a6",
   "Na3",
   "b5",
   "Bxf6",
   "gxf6",
   "Nd5",
   "f5"
  ],
  "comments": [
   "Centro.",
   "Siciliana.",
   "Desarrollo.",
   "Desarrollo.",
   "Abre.",
   "Cambio.",
   "Recupera.",
   "Ataque a e4.",
   "Defiende.",
   "Sveshnikov: gana tiempo sobre d4.",
   "Amenaza Nd6+.",
   "Cierra d6.",
   "Lucha por d5 eliminando el defensor.",
   "Expulsa al caballo.",
   "Retirada al borde.",
   "Encierra el caballo de a3.",
   "Destruye la estructura negra.",
   "Estructura dañada pero pareja de alfiles.",
   "Caballo dominante en d5.",
   "Rompe el centro blanco."
  ],
  "stats": {
   "white": 37,
   "draw": 39,
   "black": 24,
   "popularity": "Alta",
   "elo": "Avanzado a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Agujero en d5 frente a pareja de alfiles.",
   "Ruptura ...f5 para dinamizar el centro.",
   "Caballo blanco de a3 fuera de juego."
  ],
  "plansWhite": [
   "Reubicar el caballo a3-c2-e3 para controlar d5.",
   "c3 y a4 contra la estructura de b5.",
   "Bloquear y explotar las debilidades negras."
  ],
  "plansBlack": [
   "...f5 y ...fxe4 para abrir líneas a los alfiles.",
   "Ataque en el flanco de rey.",
   "Activar el alfil de f8 en g7 o h6."
  ],
  "pros": [
   "Muy dinámica.",
   "Bien probada en la élite (Carlsen la usó en el Mundial 2018).",
   "Más forzada que otras sicilianas: menos sorpresas."
  ],
  "cons": [
   "Concede debilidades permanentes (d5, f5).",
   "Exige memorizar líneas concretas.",
   "El 9.Nd5 lleva a posiciones tranquilas difíciles de ganar."
  ],
  "structures": "Peones negros en d6-e5 con el agujero d5 y a menudo peones f doblados.",
  "variations": [
   {
    "name": "Línea 9.Nd5",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "Nc6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "e5",
     "Ndb5",
     "d6",
     "Bg5",
     "a6",
     "Na3",
     "b5",
     "Nd5",
     "Be7",
     "Bxf6",
     "Bxf6",
     "c3"
    ],
    "note": "Más posicional: las blancas retienen el control de d5."
   },
   {
    "name": "Variante Kalashnikov",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "Nc6",
     "d4",
     "cxd4",
     "Nxd4",
     "e5",
     "Nb5",
     "d6",
     "c4",
     "Be7"
    ],
    "note": "Prima hermana: ...e5 antes de ...Nf6."
   },
   {
    "name": "Rossolimo (anti-Sveshnikov)",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "Nc6",
     "Bb5",
     "g6",
     "O-O",
     "Bg7",
     "Re1",
     "e5"
    ],
    "note": "Las blancas evitan 3.d4 y juegan Bb5."
   }
  ],
  "traps": [],
  "players": [
   "Evgueni Sveshnikov",
   "Magnus Carlsen",
   "Vladímir Kramnik",
   "Teimour Radjabov"
  ],
  "style": [
   "dinámico"
  ],
  "goal": "Ganar tiempos sobre el caballo de d4 y conseguir actividad y pareja de alfiles a cambio de debilidades estructurales permanentes en d5 y f5. Es un trueque consciente: dinámica contra estructura.",
  "profile": "Jugador concreto y dinámico que entiende compensaciones y sabe memorizar.",
  "middlegame": [
   "Lucha por d5.",
   "Ruptura ...f5.",
   "Caballo blanco de a3 reubicándose vía c2-e3."
  ],
  "endgames": [
   "Finales a menudo favorables a las blancas si dominan d5.",
   "Pareja de alfiles negra puede compensar en finales abiertos."
  ],
  "keyPieces": "Clave: caballo blanco en d5. Peor pieza: caballo blanco de a3.",
  "riskLevel": 4,
  "theoryLoad": 4
 },
 {
  "id": "siciliana-taimanov",
  "name": "Siciliana Taimanov / Paulsen (Kan)",
  "eco": "B40-B49",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "Sistemas flexibles con ...e6: las negras retrasan la definición de sus piezas y apuestan por una estructura de erizo o Scheveningen.",
  "moves": [
   "e4",
   "c5",
   "Nf3",
   "e6",
   "d4",
   "cxd4",
   "Nxd4",
   "Nc6",
   "Nc3",
   "Qc7",
   "Be3",
   "a6",
   "Qd2",
   "Nf6",
   "O-O-O",
   "Bb4",
   "f3",
   "Na5"
  ],
  "comments": [
   "Centro.",
   "Siciliana.",
   "Desarrollo.",
   "Controla d5 y abre la diagonal del alfil f8.",
   "Abre.",
   "Cambio.",
   "Recupera.",
   "Taimanov: presión sobre d4.",
   "Defensa.",
   "Controla e5 y prepara ...a6.",
   "Desarrollo.",
   "Controla b5.",
   "Prepara enroque largo.",
   "Ataque a e4.",
   "Enroque largo.",
   "Clava el caballo de c3.",
   "Refuerza e4.",
   "El caballo apunta a c4 y b3."
  ],
  "stats": {
   "white": 38,
   "draw": 34,
   "black": 28,
   "popularity": "Alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Flexibilidad de piezas.",
   "Estructura Scheveningen/erizo.",
   "Contraataque en la columna c."
  ],
  "plansWhite": [
   "Ataque Inglés con f3, g4, O-O-O.",
   "Bloquear con Nb5-d6 si las negras se descuidan.",
   "Estructura Maróczy con c4 contra la Kan."
  ],
  "plansBlack": [
   "...b5, ...Bb7 y presión en la columna c.",
   "Ruptura ...d5 central.",
   "Alfil a b4 o c5 activo."
  ],
  "pros": [
   "Menos teoría que Najdorf o Dragón.",
   "Muy flexible: transposiciones a múltiples estructuras.",
   "Sólida."
  ],
  "cons": [
   "Casilla d6 a veces débil.",
   "Las negras pueden quedar pasivas.",
   "Requiere comprensión estratégica profunda."
  ],
  "structures": "Peones negros en a6, b7, d7, e6 (Kan/Taimanov) o d6-e6 (Scheveningen).",
  "variations": [
   {
    "name": "Variante Kan",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "e6",
     "d4",
     "cxd4",
     "Nxd4",
     "a6",
     "Bd3",
     "Bc5",
     "Nb3",
     "Ba7",
     "Qe2",
     "Nc6"
    ],
    "note": "...a6 antes de ...Nc6: máxima flexibilidad."
   },
   {
    "name": "Scheveningen",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "e6",
     "Be2",
     "Be7",
     "O-O",
     "O-O",
     "f4",
     "Nc6"
    ],
    "note": "Pequeño centro d6-e6; contra él existe el temible Ataque Keres g4."
   }
  ],
  "traps": [],
  "players": [
   "Mark Taimanov",
   "Louis Paulsen (histórico)",
   "Shakhriyar Mamedyarov",
   "Ruslan Ponomariov"
  ],
  "style": [
   "posicional",
   "dinámico"
  ],
  "goal": "Mantener máxima flexibilidad con ...e6, retrasando ...d6 y el desarrollo de las piezas para adaptarse al sistema blanco. Apunta a estructuras tipo erizo o Scheveningen con contraataque en el flanco de dama.",
  "profile": "Jugador estratégico con buena comprensión de estructuras, que prefiere menos teoría que en la Najdorf.",
  "middlegame": [
   "Expansión ...b5 y presión en columna c.",
   "Ataque Inglés blanco.",
   "Ruptura ...d5."
  ],
  "endgames": [
   "Finales con mayoría central negra; d6 puede ser débil."
  ],
  "keyPieces": "Clave: dama negra en c7. Peor pieza: alfil negro de c8 hasta ...b5-Bb7.",
  "riskLevel": 3,
  "theoryLoad": 3
 },
 {
  "id": "siciliana-alapin",
  "name": "Siciliana Alapin (2.c3) y Smith-Morra",
  "eco": "B22 / B21",
  "group": "e4",
  "type": "semiabierta",
  "side": "blancas",
  "level": "principiante",
  "summary": "Sistemas antisicilianos: con 2.c3 las blancas preparan d4 para retomar con peón; el Gambito Smith-Morra sacrifica ese peón por desarrollo.",
  "moves": [
   "e4",
   "c5",
   "c3",
   "Nf6",
   "e5",
   "Nd5",
   "d4",
   "cxd4",
   "Nf3",
   "Nc6",
   "cxd4",
   "d6",
   "Bc4",
   "Nb6",
   "Bb5",
   "dxe5",
   "Nxe5",
   "Bd7"
  ],
  "comments": [
   "Centro.",
   "Siciliana.",
   "Alapin: prepara d4 con apoyo de peón.",
   "Ataca e4 aprovechando que c3 quita el caballo.",
   "Expulsa el caballo.",
   "Centraliza.",
   "Centro.",
   "Cambio.",
   "Desarrollo.",
   "Desarrollo y presión en d4.",
   "Centro de peones.",
   "Golpea el peón avanzado.",
   "Presiona el caballo de d5.",
   "Retirada.",
   "Clavada.",
   "Cambio en e5.",
   "Recupera con caballo central.",
   "Rompe la clavada."
  ],
  "stats": {
   "white": 40,
   "draw": 33,
   "black": 27,
   "popularity": "Alta en aficionados",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Evitar la teoría de la Siciliana abierta.",
   "Centro de peones d4 con c3.",
   "Peón aislado d4 frecuente."
  ],
  "plansWhite": [
   "Construir centro d4 y desarrollar armónicamente.",
   "Jugar con el peón aislado (ataque en flanco de rey).",
   "En el Morra: Rd1, Qe2 y presión contra d6."
  ],
  "plansBlack": [
   "Atacar el centro con ...Nf6 o ...d5.",
   "Bloquear y explotar el peón aislado.",
   "En el Morra: devolver material para igualar."
  ],
  "pros": [
   "Muy poca teoría comparada con 2.Nf3 + 3.d4.",
   "Posiciones claras y lógicas.",
   "El Morra da ataque rápido en partidas rápidas."
  ],
  "cons": [
   "Menos ambición: las negras igualan con precisión.",
   "La Alapin puede llevar a posiciones simétricas tranquilas.",
   "El Morra es objetivamente dudoso."
  ],
  "structures": "Peón aislado en d4 (tras ...cxd4 cxd4 y ...e6) o centro e5/d4 en la línea ...Nf6.",
  "variations": [
   {
    "name": "Alapin con 2...d5",
    "moves": [
     "e4",
     "c5",
     "c3",
     "d5",
     "exd5",
     "Qxd5",
     "d4",
     "Nf6",
     "Nf3",
     "Bg4",
     "Be2",
     "e6",
     "O-O",
     "Nc6"
    ],
    "note": "Las negras centralizan la dama aprovechando que c3 quita esa casilla al caballo."
   },
   {
    "name": "Gambito Smith-Morra",
    "moves": [
     "e4",
     "c5",
     "d4",
     "cxd4",
     "c3",
     "dxc3",
     "Nxc3",
     "Nc6",
     "Nf3",
     "d6",
     "Bc4",
     "e6",
     "O-O",
     "Nf6",
     "Qe2",
     "Be7",
     "Rd1",
     "e5"
    ],
    "note": "Un peón por un enorme desarrollo y columnas abiertas c y d."
   }
  ],
  "traps": [
   {
    "name": "Trampa Siberiana (Smith-Morra)",
    "moves": [
     "e4",
     "c5",
     "d4",
     "cxd4",
     "c3",
     "dxc3",
     "Nxc3",
     "Nc6",
     "Nf3",
     "e6",
     "Bc4",
     "Qc7",
     "O-O",
     "Nf6",
     "Qe2",
     "Ng4",
     "h3",
     "Nd4"
    ],
    "explanation": "Tras el natural 9.h3?? el caballo de d4 ataca la dama y la de c7 amenaza Qh2#: las blancas pierden la dama o reciben mate."
   }
  ],
  "players": [
   "Semyon Alapin (histórico)",
   "Evgeny Sveshnikov",
   "Marc Esserman (Morra)",
   "Ian Nepómniashchi"
  ],
  "style": [
   "universal",
   "posicional"
  ],
  "goal": "Evitar las grandes Sicilianas abiertas preparando d4 con c3 para recuperar con peón y quedarse con centro. Su fin es práctico: posiciones claras y poca teoría.",
  "profile": "Jugador práctico que no quiere estudiar la Siciliana abierta; el Morra conviene a atacantes de partidas rápidas.",
  "middlegame": [
   "Peón aislado d4 y ataque en flanco de rey.",
   "Columnas abiertas en el Morra.",
   "Centro e5 contra caballo d5."
  ],
  "endgames": [
   "Final de peón aislado: suele favorecer al bando sin él (negras)."
  ],
  "keyPieces": "Clave: peón blanco de d4. Peor pieza: alfil blanco de c1 en algunas líneas.",
  "riskLevel": 2,
  "theoryLoad": 2
 },
 {
  "id": "siciliana-clasica",
  "name": "Siciliana Clásica (Richter-Rauzer)",
  "eco": "B56-B69",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "avanzado",
  "summary": "Las negras desarrollan ...Nc6 y ...d6; las blancas responden con 6.Bg5 (Richter-Rauzer) y enroque largo.",
  "moves": [
   "e4",
   "c5",
   "Nf3",
   "d6",
   "d4",
   "cxd4",
   "Nxd4",
   "Nf6",
   "Nc3",
   "Nc6",
   "Bg5",
   "e6",
   "Qd2",
   "Be7",
   "O-O-O",
   "O-O",
   "f4",
   "h6",
   "Bh4",
   "e5"
  ],
  "comments": [
   "Centro.",
   "Siciliana.",
   "Desarrollo.",
   "Prepara ...Nf6.",
   "Abre.",
   "Cambio.",
   "Recupera.",
   "Ataque a e4.",
   "Defiende.",
   "Clásica: desarrollo natural.",
   "Richter-Rauzer: impide ...g6 (Dragón).",
   "Sólido.",
   "Prepara el enroque largo.",
   "Desarrollo.",
   "Enroque largo.",
   "Enroque corto: enroques opuestos.",
   "Gana espacio y prepara e5.",
   "Pregunta al alfil.",
   "Mantiene la clavada.",
   "Golpe central contra f4 y d4."
  ],
  "stats": {
   "white": 39,
   "draw": 34,
   "black": 27,
   "popularity": "Media",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Clavada del caballo de f6.",
   "Enroques opuestos.",
   "Ruptura ...e5 o ...d5."
  ],
  "plansWhite": [
   "f4-e5 central.",
   "Ataque en el flanco de rey con g4.",
   "Presión sobre d6."
  ],
  "plansBlack": [
   "...a6, ...b5 en el flanco de dama.",
   "Liberarse con ...d5 o ...e5.",
   "Cambios para reducir el ataque."
  ],
  "pros": [
   "Desequilibrio: juego por la victoria con negras.",
   "Columna c semiabierta y mayoría central de peones.",
   "Desarrollo natural y lógico."
  ],
  "cons": [
   "El peón d6 puede volverse débil.",
   "Las blancas tienen ataque directo.",
   "Requiere precisión teórica."
  ],
  "structures": "Scheveningen (d6-e6) que puede transformarse en Boleslavsky (d6-e5).",
  "variations": [
   {
    "name": "Ataque Sozin",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "Nc6",
     "Bc4",
     "e6",
     "Be3",
     "Be7",
     "Qe2",
     "a6",
     "O-O-O"
    ],
    "note": "Ataque Velimirović con enroque largo y g4-g5."
   },
   {
    "name": "Variante Boleslavsky",
    "moves": [
     "e4",
     "c5",
     "Nf3",
     "d6",
     "d4",
     "cxd4",
     "Nxd4",
     "Nf6",
     "Nc3",
     "Nc6",
     "Be2",
     "e5",
     "Nb3",
     "Be7",
     "O-O",
     "O-O"
    ],
    "note": "...e5 da espacio a costa de d5."
   }
  ],
  "traps": [],
  "players": [
   "Vsevolod Rauzer",
   "Kurt Richter",
   "Borís Spasski",
   "Peter Svidler"
  ],
  "style": [
   "dinámico",
   "táctico"
  ],
  "goal": "Desarrollo natural con ...Nc6 y ...d6 manteniendo opciones de Dragón o Boleslavsky; con 6.Bg5 las blancas impiden ...g6 y buscan enroques opuestos.",
  "profile": "Jugador que quiere Siciliana activa sin la teoría extrema de la Najdorf.",
  "middlegame": [
   "Enroques opuestos.",
   "Ruptura ...d5/...e5.",
   "Presión en d6."
  ],
  "endgames": [
   "Peón d6 débil en finales: ventaja blanca si se cambian las piezas."
  ],
  "keyPieces": "Clave: alfil blanco de g5. Peor pieza: alfil negro de e7.",
  "riskLevel": 4,
  "theoryLoad": 4
 },
 {
  "id": "francesa",
  "name": "Defensa Francesa",
  "eco": "C00-C19",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "1...e6 y 2...d5: las negras construyen una cadena sólida y contraatacan la base del centro blanco con ...c5 y ...f6.",
  "moves": [
   "e4",
   "e6",
   "d4",
   "d5",
   "Nc3",
   "Nf6",
   "Bg5",
   "Be7",
   "e5",
   "Nfd7",
   "Bxe7",
   "Qxe7",
   "f4",
   "O-O",
   "Nf3",
   "c5"
  ],
  "comments": [
   "Centro.",
   "Francesa: prepara ...d5.",
   "Centro ideal.",
   "Desafía e4.",
   "Defiende e4.",
   "Ataque a e4 (Clásica).",
   "Clava el caballo.",
   "Rompe la clavada.",
   "Gana espacio con tiempo.",
   "Retirada forzada.",
   "Cambio de alfiles.",
   "Recupera.",
   "Refuerza e5 (Steinitz).",
   "Enroque.",
   "Desarrollo.",
   "Golpe típico a la base de la cadena."
  ],
  "stats": {
   "white": 41,
   "draw": 33,
   "black": 26,
   "popularity": "Alta",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Cadena de peones: atacar su base.",
   "Alfil \"malo\" de c8 a reubicar (...b6-...Ba6 o ...Bd7-e8-h5).",
   "Rupturas ...c5 y ...f6."
  ],
  "plansWhite": [
   "Espacio en el flanco de rey con e5 y f4-f5.",
   "Ataque al enroque negro (Bd3, Qh5/Qg4).",
   "Mantener d4 apoyado por c3 y Nf3."
  ],
  "plansBlack": [
   "Presión sobre d4 con ...c5, ...Nc6, ...Qb6.",
   "Romper con ...f6 contra e5.",
   "Ataque de minoría en el flanco de dama."
  ],
  "pros": [
   "Estructura muy sólida y de planes claros.",
   "Contraataque dinámico (Winawer).",
   "Enseña pensamiento estratégico sobre cadenas de peones."
  ],
  "cons": [
   "El alfil de c8 queda encerrado.",
   "Espacio reducido.",
   "Muchas variantes distintas: Winawer, Tarrasch, Avance, Clásica."
  ],
  "structures": "Cadena de peones: blancas d4-e5 contra negras d5-e6. En la Tarrasch aparecen peones aislados.",
  "variations": [
   {
    "name": "Variante Winawer",
    "moves": [
     "e4",
     "e6",
     "d4",
     "d5",
     "Nc3",
     "Bb4",
     "e5",
     "c5",
     "a3",
     "Bxc3+",
     "bxc3",
     "Ne7",
     "Qg4",
     "Qc7"
    ],
    "note": "La más aguda: las negras ceden la pareja de alfiles y atacan el flanco de dama."
   },
   {
    "name": "Variante del Avance",
    "moves": [
     "e4",
     "e6",
     "d4",
     "d5",
     "e5",
     "c5",
     "c3",
     "Nc6",
     "Nf3",
     "Qb6",
     "a3",
     "c4"
    ],
    "note": "Presión inmediata sobre d4."
   },
   {
    "name": "Variante Tarrasch",
    "moves": [
     "e4",
     "e6",
     "d4",
     "d5",
     "Nd2",
     "c5",
     "exd5",
     "Qxd5",
     "Ngf3",
     "cxd4",
     "Bc4",
     "Qd6",
     "O-O",
     "Nf6"
    ],
    "note": "Juego abierto con dama negra centralizada."
   }
  ],
  "traps": [
   {
    "name": "Trampa del Avance (dama en d4)",
    "moves": [
     "e4",
     "e6",
     "d4",
     "d5",
     "e5",
     "c5",
     "c3",
     "Nc6",
     "Nf3",
     "Qb6",
     "Bd3",
     "cxd4",
     "cxd4",
     "Nxd4",
     "Nxd4",
     "Qxd4",
     "Bb5+"
    ],
    "explanation": "Comer dos veces en d4 parece ganar un peón, pero el jaque descubierto Bb5+ deja la dama de d4 indefensa frente a la de d1."
   }
  ],
  "players": [
   "Viktor Korchnói",
   "Wolfgang Uhlmann",
   "Mijaíl Botvínnik",
   "Alexander Morozevich"
  ],
  "style": [
   "sólido",
   "posicional"
  ],
  "goal": "Crear una cadena de peones sólida (d5-e6) y contraatacar la base del centro blanco (d4) con ...c5 y ...f6. Las negras aceptan menos espacio y un alfil de c8 encerrado a cambio de una estructura muy firme y planes claros.",
  "profile": "Jugador estratégico, paciente y tenaz que disfruta de las cadenas de peones.",
  "middlegame": [
   "Ataque a la base de la cadena (...c5, ...f6).",
   "Ataque blanco en flanco de rey con f4-f5.",
   "Reubicación del alfil malo de c8."
  ],
  "endgames": [
   "Finales con alfil malo de c8: ligera desventaja negra.",
   "Final con peón aislado (Tarrasch) igualado."
  ],
  "keyPieces": "Clave: peón blanco de e5. Peor pieza: alfil negro de c8 (\"alfil francés\").",
  "riskLevel": 3,
  "theoryLoad": 4
 },
 {
  "id": "caro-kann",
  "name": "Defensa Caro-Kann",
  "eco": "B10-B19",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "principiante",
  "summary": "1...c6 prepara ...d5 sin encerrar el alfil de c8. Sólida, fiable y con buena estructura de peones.",
  "moves": [
   "e4",
   "c6",
   "d4",
   "d5",
   "Nc3",
   "dxe4",
   "Nxe4",
   "Bf5",
   "Ng3",
   "Bg6",
   "h4",
   "h6",
   "Nf3",
   "Nd7",
   "h5",
   "Bh7",
   "Bd3",
   "Bxd3",
   "Qxd3",
   "e6"
  ],
  "comments": [
   "Centro.",
   "Caro-Kann: prepara ...d5.",
   "Centro.",
   "Desafía e4.",
   "Defiende.",
   "Cambia el peón central.",
   "Recupera.",
   "El alfil sale antes de ...e6.",
   "Gana tiempo sobre el alfil.",
   "Retirada.",
   "Amenaza h5 atrapando el alfil.",
   "Da casilla de retirada.",
   "Desarrollo.",
   "Desarrollo flexible.",
   "Gana espacio.",
   "Retirada.",
   "Cambio del alfil activo.",
   "Cambio.",
   "Recupera.",
   "Estructura sólida."
  ],
  "stats": {
   "white": 40,
   "draw": 36,
   "black": 24,
   "popularity": "Alta",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Alfil de c8 activo fuera de la cadena.",
   "Estructura c6-e6 sólida.",
   "Finales favorables por estructura sana."
  ],
  "plansWhite": [
   "Espacio con h4-h5 y enroque largo.",
   "Presión con c4 y desarrollo rápido.",
   "En el Avance: ataque en flanco de rey con g4."
  ],
  "plansBlack": [
   "Igualar con ...c5 o ...e5.",
   "Enroque largo y juego seguro.",
   "Aprovechar la mayoría en el flanco de dama en el final."
  ],
  "pros": [
   "Extremadamente sólida.",
   "El alfil de c8 no queda encerrado.",
   "Buena para finales."
  ],
  "cons": [
   "Algo pasiva.",
   "Las blancas tienen ventaja de espacio.",
   "Menos posibilidades de victoria contra jugadores sólidos."
  ],
  "structures": "Peones negros en c6/e6/f7 frente a d4 blanco; en la Panov, peón aislado en d4.",
  "variations": [
   {
    "name": "Variante del Avance",
    "moves": [
     "e4",
     "c6",
     "d4",
     "d5",
     "e5",
     "Bf5",
     "Nf3",
     "e6",
     "Be2",
     "c5",
     "Be3",
     "Nd7"
    ],
    "note": "Estructura parecida a la Francesa pero con el alfil fuera."
   },
   {
    "name": "Ataque Panov-Botvínnik",
    "moves": [
     "e4",
     "c6",
     "d4",
     "d5",
     "exd5",
     "cxd5",
     "c4",
     "Nf6",
     "Nc3",
     "e6",
     "Nf3",
     "Be7"
    ],
    "note": "Lleva a posiciones de peón aislado de dama."
   },
   {
    "name": "Dos Caballos",
    "moves": [
     "e4",
     "c6",
     "Nc3",
     "d5",
     "Nf3",
     "Bg4",
     "h3",
     "Bxf3",
     "Qxf3",
     "e6"
    ],
    "note": "Las blancas obtienen la pareja de alfiles."
   }
  ],
  "traps": [
   {
    "name": "Mate ahogado en d6",
    "moves": [
     "e4",
     "c6",
     "d4",
     "d5",
     "Nc3",
     "dxe4",
     "Nxe4",
     "Nd7",
     "Qe2",
     "Ngf6",
     "Nd6#"
    ],
    "explanation": "5...Ngf6?? bloquea la última casilla: el peón e7 está clavado por la dama de e2 y no puede capturar el caballo."
   }
  ],
  "players": [
   "Anatoli Kárpov",
   "Viswanathan Anand",
   "Ding Liren",
   "Alireza Firouzja"
  ],
  "style": [
   "sólido"
  ],
  "goal": "Disputar el centro con ...d5 apoyado por ...c6 sin encerrar el alfil de c8. Su fin es una estructura sana sin debilidades que conduzca a finales favorables o iguales.",
  "profile": "Jugador sólido, buen finalista, que prefiere seguridad a complicaciones.",
  "middlegame": [
   "Ataque blanco con h4-h5 y enroque largo.",
   "Ruptura ...c5 o ...e5.",
   "Mayoría negra en flanco de dama."
  ],
  "endgames": [
   "Finales con estructura sana negra (4 contra 3 en flanco de dama): a menudo favorables a las negras."
  ],
  "keyPieces": "Clave: alfil negro de f5/g6 activo. Peor pieza: caballo negro de d7 si queda pasivo.",
  "riskLevel": 2,
  "theoryLoad": 3
 },
 {
  "id": "escandinava",
  "name": "Defensa Escandinava",
  "eco": "B01",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "principiante",
  "summary": "1...d5 ataca e4 de inmediato. Las negras definen el juego desde la primera jugada a costa de sacar pronto la dama.",
  "moves": [
   "e4",
   "d5",
   "exd5",
   "Qxd5",
   "Nc3",
   "Qa5",
   "d4",
   "Nf6",
   "Nf3",
   "c6",
   "Bc4",
   "Bf5",
   "Bd2",
   "e6",
   "Qe2",
   "Bb4"
  ],
  "comments": [
   "Centro.",
   "Escandinava.",
   "Acepta.",
   "La dama recupera el peón.",
   "Desarrollo con tempo sobre la dama.",
   "Retirada activa: clava c3.",
   "Centro.",
   "Desarrollo.",
   "Desarrollo.",
   "Casilla de retirada para la dama.",
   "Desarrollo activo.",
   "Alfil fuera de la cadena.",
   "Rompe la clavada.",
   "Estructura sólida.",
   "Prepara el enroque largo.",
   "Clavada."
  ],
  "stats": {
   "white": 45,
   "draw": 30,
   "black": 25,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Simplificación temprana del centro.",
   "Estructura tipo Caro-Kann.",
   "Dama en a5 o d6."
  ],
  "plansWhite": [
   "Ganar tiempos atacando la dama.",
   "Enroque largo y ataque.",
   "Ventaja de espacio con d4-d5."
  ],
  "plansBlack": [
   "Desarrollo rápido y ...c6/...e6 sólido.",
   "Enroque largo o corto según la posición.",
   "Ruptura ...c5."
  ],
  "pros": [
   "Poca teoría, fácil de aprender.",
   "Evita las grandes defensas teóricas.",
   "Estructura sana."
  ],
  "cons": [
   "Pierde tiempos con la dama.",
   "Las blancas obtienen ventaja de desarrollo.",
   "Ligeramente pasiva."
  ],
  "structures": "Similar a la Caro-Kann: peones negros en c6/e6 sin peón d.",
  "variations": [
   {
    "name": "3...Qd6 Moderna",
    "moves": [
     "e4",
     "d5",
     "exd5",
     "Qxd5",
     "Nc3",
     "Qd6",
     "d4",
     "Nf6",
     "Nf3",
     "a6",
     "g3",
     "Bg4"
    ],
    "note": "La dama en d6 evita jaques en el flanco de dama."
   },
   {
    "name": "Variante 2...Nf6",
    "moves": [
     "e4",
     "d5",
     "exd5",
     "Nf6",
     "d4",
     "Nxd5",
     "Nf3",
     "g6",
     "c4",
     "Nb6"
    ],
    "note": "Las negras recuperan con caballo."
   }
  ],
  "traps": [],
  "players": [
   "Bent Larsen",
   "Serguéi Tiviakov",
   "Magnus Carlsen (ocasional)"
  ],
  "style": [
   "sólido",
   "universal"
  ],
  "goal": "Definir el centro desde la primera jugada atacando e4, evitando teoría ajena y llegando a estructuras tipo Caro-Kann a cambio de perder algunos tiempos con la dama.",
  "profile": "Jugador práctico que quiere una defensa sencilla contra 1.e4.",
  "middlegame": [
   "Ganancia de tiempos blancos sobre la dama.",
   "Estructura c6-e6 sólida.",
   "Enroque largo blanco y ataque."
  ],
  "endgames": [
   "Finales con estructura sana para las negras; igualdad."
  ],
  "keyPieces": "Clave: dama negra en a5/d6. Peor pieza: la propia dama si es acosada.",
  "riskLevel": 2,
  "theoryLoad": 1
 },
 {
  "id": "pirc",
  "name": "Defensa Pirc / Moderna",
  "eco": "B06-B09",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "Defensa hipermoderna: las negras permiten un gran centro blanco para atacarlo después con piezas y rupturas.",
  "moves": [
   "e4",
   "d6",
   "d4",
   "Nf6",
   "Nc3",
   "g6",
   "f4",
   "Bg7",
   "Nf3",
   "O-O",
   "Bd3",
   "Na6",
   "O-O",
   "c5",
   "d5",
   "Rb8"
  ],
  "comments": [
   "Centro.",
   "Pirc.",
   "Gran centro.",
   "Ataca e4.",
   "Defensa.",
   "Fianchetto.",
   "Ataque Austriaco: centro máximo.",
   "El alfil presiona d4.",
   "Desarrollo.",
   "Enroque.",
   "Desarrollo.",
   "Caballo hacia c7.",
   "Enroque.",
   "Rompe el centro.",
   "Gana espacio.",
   "Prepara ...b5."
  ],
  "stats": {
   "white": 44,
   "draw": 30,
   "black": 26,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Hipermodernismo: controlar el centro a distancia.",
   "Rupturas ...c5 o ...e5.",
   "Contraataque sobre el centro sobreextendido."
  ],
  "plansWhite": [
   "Ataque con e5 y f5.",
   "Ataque 150: Be3, Qd2, Bh6, h4.",
   "Mantener el centro y ganar espacio."
  ],
  "plansBlack": [
   "Rompas ...c5 y ...e5.",
   "Presión con el alfil de g7.",
   "Contraataque en flanco de dama."
  ],
  "pros": [
   "Flexible y poco estudiada por el rival medio.",
   "Desequilibrada: posibilidades de ganar.",
   "Fácil de jugar contra casi cualquier sistema."
  ],
  "cons": [
   "Cede espacio.",
   "El Ataque Austriaco es peligroso.",
   "Si las rupturas fallan, las negras quedan aplastadas."
  ],
  "structures": "Peones negros en d6/g6 frente a e4/d4 (y f4) blancos.",
  "variations": [
   {
    "name": "Sistema Clásico",
    "moves": [
     "e4",
     "d6",
     "d4",
     "Nf6",
     "Nc3",
     "g6",
     "Nf3",
     "Bg7",
     "Be2",
     "O-O",
     "O-O",
     "c6",
     "a4"
    ],
    "note": "Juego posicional."
   },
   {
    "name": "Ataque 150",
    "moves": [
     "e4",
     "d6",
     "d4",
     "Nf6",
     "Nc3",
     "g6",
     "Be3",
     "c6",
     "Qd2",
     "b5",
     "f3",
     "Nbd7"
    ],
    "note": "Las blancas buscan Bh6 y h4-h5."
   },
   {
    "name": "Moderna (1...g6)",
    "moves": [
     "e4",
     "g6",
     "d4",
     "Bg7",
     "Nc3",
     "d6",
     "Be3",
     "a6",
     "Qd2",
     "Nd7"
    ],
    "note": "Aún más flexible: retrasa ...Nf6."
   }
  ],
  "traps": [],
  "players": [
   "Vasja Pirc",
   "Ulf Andersson",
   "Jan Timman",
   "Viktor Korchnói"
  ],
  "style": [
   "hipermoderno",
   "dinámico"
  ],
  "goal": "Ceder el centro a propósito para atacarlo luego con piezas y rupturas (...c5, ...e5). El fin es provocar sobreextensión blanca y contragolpear.",
  "profile": "Jugador creativo que disfruta del contraataque y posiciones irregulares.",
  "middlegame": [
   "Ataque Austriaco con e5 y f5.",
   "Rupturas negras ...c5 y ...e5.",
   "Ataque 150 con Bh6."
  ],
  "endgames": [
   "Si las negras rompen el centro, finales activos.",
   "Si no, finales con poco espacio."
  ],
  "keyPieces": "Clave: alfil negro de g7. Peor pieza: caballo negro de b8/a6 en algunos sistemas.",
  "riskLevel": 4,
  "theoryLoad": 3
 },
 {
  "id": "alekhine",
  "name": "Defensa Alekhine",
  "eco": "B02-B05",
  "group": "e4",
  "type": "semiabierta",
  "side": "negras",
  "level": "intermedio",
  "summary": "1...Nf6 provoca el avance de los peones blancos para atacarlos después. Provocadora y original.",
  "moves": [
   "e4",
   "Nf6",
   "e5",
   "Nd5",
   "d4",
   "d6",
   "Nf3",
   "Bg4",
   "Be2",
   "e6",
   "O-O",
   "Be7",
   "c4",
   "Nb6",
   "Nbd2",
   "O-O"
  ],
  "comments": [
   "Centro.",
   "Alekhine: provoca e5.",
   "Avance con tiempo.",
   "Centraliza.",
   "Centro.",
   "Ataca e5.",
   "Variante Moderna.",
   "Clava el caballo.",
   "Rompe la clavada.",
   "Sólido.",
   "Enroque.",
   "Desarrollo.",
   "Expulsa el caballo.",
   "Retirada.",
   "Protege c4 y evita cambios.",
   "Enroque."
  ],
  "stats": {
   "white": 44,
   "draw": 31,
   "black": 25,
   "popularity": "Baja",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Provocar sobreextensión.",
   "Atacar el peón e5.",
   "Desequilibrio temprano."
  ],
  "plansWhite": [
   "Mantener e5 y ganar espacio.",
   "Ataque de los cuatro peones.",
   "Restringir los caballos negros."
  ],
  "plansBlack": [
   "Presión con ...d6, ...Nc6, ...Bg4.",
   "Socavar con ...c5 / ...f6.",
   "Explotar casillas débiles detrás de los peones."
  ],
  "pros": [
   "Sorpresa: poca gente la conoce bien.",
   "Desequilibrada.",
   "Lucha clara desde el comienzo."
  ],
  "cons": [
   "Concede mucho espacio.",
   "Los caballos pueden quedar mal ubicados.",
   "La línea de los Cuatro Peones es peligrosa."
  ],
  "structures": "Peón blanco en e5 (a veces e5+d4+c4+f4) contra d6/e6 negros.",
  "variations": [
   {
    "name": "Ataque de los Cuatro Peones",
    "moves": [
     "e4",
     "Nf6",
     "e5",
     "Nd5",
     "d4",
     "d6",
     "c4",
     "Nb6",
     "f4",
     "dxe5",
     "fxe5",
     "Nc6",
     "Be3",
     "Bf5"
    ],
    "note": "Las blancas ocupan todo el centro; las negras atacan sin tregua."
   },
   {
    "name": "Variante del Cambio",
    "moves": [
     "e4",
     "Nf6",
     "e5",
     "Nd5",
     "d4",
     "d6",
     "c4",
     "Nb6",
     "exd6",
     "cxd6",
     "Nc3",
     "g6"
    ],
    "note": "Estructura asimétrica con mayoría negra en el centro."
   }
  ],
  "traps": [],
  "players": [
   "Alexander Alekhine",
   "Bent Larsen",
   "Vladimir Bagirov",
   "Baadur Jobava"
  ],
  "style": [
   "hipermoderno",
   "dinámico"
  ],
  "goal": "Provocar el avance de los peones blancos para convertirlos en objetivos. El caballo \"invita\" a los peones a avanzar y luego las negras golpean el centro sobreextendido.",
  "profile": "Jugador original al que le gustan las posiciones raras y provocadoras.",
  "middlegame": [
   "Presión sobre e5.",
   "Socavamiento con ...c5/...f6.",
   "Caballos negros reubicados."
  ],
  "endgames": [
   "Si el centro blanco cae, las negras quedan mejor en el final."
  ],
  "keyPieces": "Clave: peón blanco de e5. Peor pieza: caballo negro de b6.",
  "riskLevel": 4,
  "theoryLoad": 2
 },
 {
  "id": "gambito-dama-aceptado",
  "name": "Gambito de Dama Aceptado",
  "eco": "D20-D29",
  "group": "d4",
  "type": "cerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "Las negras toman el peón c4 sin intentar conservarlo: buscan desarrollo libre y presión sobre el centro blanco.",
  "moves": [
   "d4",
   "d5",
   "c4",
   "dxc4",
   "Nf3",
   "Nf6",
   "e3",
   "e6",
   "Bxc4",
   "c5",
   "O-O",
   "a6",
   "Qe2",
   "b5",
   "Bb3",
   "Bb7"
  ],
  "comments": [
   "Peón dama: controla e5 y c5.",
   "Simetría.",
   "Gambito de Dama.",
   "Acepta: cede el centro temporalmente.",
   "Desarrollo, impide ...e5.",
   "Desarrollo.",
   "Abre el alfil para recuperar c4.",
   "Sólido.",
   "Recupera el peón.",
   "Golpea el centro.",
   "Enroque.",
   "Prepara ...b5.",
   "Prepara Rd1 y d5.",
   "Gana espacio con tiempo.",
   "Retirada.",
   "Fianchetto de dama."
  ],
  "stats": {
   "white": 40,
   "draw": 37,
   "black": 23,
   "popularity": "Media",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Ceder el centro para golpearlo con ...c5 y ...e5.",
   "Expansión en flanco de dama con ...a6 y ...b5.",
   "Peón aislado de dama frecuente."
  ],
  "plansWhite": [
   "Ruptura e4 o d5.",
   "Juego con peón aislado en d4 y ataque en flanco de rey.",
   "Presión en la columna d."
  ],
  "plansBlack": [
   "Igualar con ...c5 y desarrollo rápido.",
   "Bloquear el peón aislado en d5.",
   "Usar la mayoría en el flanco de dama."
  ],
  "pros": [
   "Lógica y clara.",
   "Posiciones abiertas donde las negras desarrollan libremente.",
   "Menos teoría que el Gambito Rehusado."
  ],
  "cons": [
   "Las blancas obtienen centro y espacio.",
   "Errores pueden dar a las blancas un ataque rápido.",
   "Algo menos sólida que el Gambito Rehusado."
  ],
  "structures": "Peón aislado de dama (d4) o centro blanco e4-d4 contra peones negros en c5/e6.",
  "variations": [
   {
    "name": "Variante Central 3.e4",
    "moves": [
     "d4",
     "d5",
     "c4",
     "dxc4",
     "e4",
     "e5",
     "Nf3",
     "exd4",
     "Bxc4",
     "Bb4+",
     "Nbd2",
     "Nc6"
    ],
    "note": "Las blancas ocupan el centro inmediatamente."
   },
   {
    "name": "Línea Clásica con 7.dxc5",
    "moves": [
     "d4",
     "d5",
     "c4",
     "dxc4",
     "Nf3",
     "Nf6",
     "e3",
     "e6",
     "Bxc4",
     "c5",
     "O-O",
     "a6",
     "dxc5",
     "Qxd1",
     "Rxd1",
     "Bxc5"
    ],
    "note": "Simplificación hacia un final igualado."
   }
  ],
  "traps": [
   {
    "name": "Trampa del peón c4 (retener el gambito)",
    "moves": [
     "d4",
     "d5",
     "c4",
     "dxc4",
     "e3",
     "b5",
     "a4",
     "c6",
     "axb5",
     "cxb5",
     "Qf3"
    ],
    "explanation": "Intentar conservar el peón con ...b5 y ...c6 abre la gran diagonal: Qf3 ataca la torre de a8 y la estructura negra se derrumba."
   }
  ],
  "players": [
   "Viswanathan Anand",
   "Vasyl Ivanchuk",
   "Wilhelm Steinitz (histórico)"
  ],
  "style": [
   "posicional",
   "dinámico"
  ],
  "goal": "Ceder temporalmente el centro tomando c4 para desarrollarse libremente y golpear con ...c5. El fin no es conservar el peón sino ganar tiempos y actividad.",
  "profile": "Jugador clásico que quiere posiciones abiertas y lógicas con negras contra 1.d4.",
  "middlegame": [
   "Peón aislado blanco en d4.",
   "Expansión ...b5 en flanco de dama.",
   "Rupturas d5/e4 blancas."
  ],
  "endgames": [
   "Finales simétricos o con peón aislado: igualdad."
  ],
  "keyPieces": "Clave: peón blanco de d4. Peor pieza: alfil negro de c8 hasta Bb7.",
  "riskLevel": 2,
  "theoryLoad": 3
 },
 {
  "id": "gambito-dama-rehusado",
  "name": "Gambito de Dama Rehusado",
  "eco": "D30-D69",
  "group": "d4",
  "type": "cerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "2...e6 mantiene el punto d5: la defensa clásica más sólida contra 1.d4, base de numerosos Campeonatos del Mundo.",
  "moves": [
   "d4",
   "d5",
   "c4",
   "e6",
   "Nc3",
   "Nf6",
   "Bg5",
   "Be7",
   "e3",
   "O-O",
   "Nf3",
   "h6",
   "Bh4",
   "b6",
   "cxd5",
   "Nxd5",
   "Bxe7",
   "Qxe7"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Gambito.",
   "Rehúsa: sostiene d5.",
   "Presión sobre d5.",
   "Desarrollo.",
   "Clavada.",
   "Rompe la clavada.",
   "Desarrollo sólido.",
   "Enroque.",
   "Desarrollo.",
   "Pregunta al alfil.",
   "Mantiene la clavada.",
   "Tartakower: fianchetto de dama.",
   "Cambio.",
   "Recupera con caballo.",
   "Cambio de alfiles.",
   "Recupera."
  ],
  "stats": {
   "white": 39,
   "draw": 42,
   "black": 19,
   "popularity": "Muy alta",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Mantener d5.",
   "Liberarse con ...c5 o ...e5.",
   "Ataque de minoría blanco en la estructura Carlsbad."
  ],
  "plansWhite": [
   "Ataque de minoría b4-b5 en la estructura Carlsbad.",
   "Ruptura central e4.",
   "Ataque en flanco de rey con piezas."
  ],
  "plansBlack": [
   "Liberarse con ...c5 o ...e5.",
   "Reubicar el alfil de c8 (problema clásico).",
   "Simplificar y defender."
  ],
  "pros": [
   "Sólida y respetable.",
   "Estructuras clásicas y muy instructivas.",
   "Desarrollo natural."
  ],
  "cons": [
   "El alfil de c8 es un problema.",
   "Algo pasiva.",
   "Las blancas mantienen ligera iniciativa durante mucho tiempo."
  ],
  "structures": "Carlsbad (tras cxd5 exd5): blancas con peones a2-b2-d4-e3, negras a7-b7-c6-d5. También peón aislado (Tarrasch) y peones colgantes.",
  "variations": [
   {
    "name": "Variante del Cambio",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e6",
     "Nc3",
     "Nf6",
     "cxd5",
     "exd5",
     "Bg5",
     "c6",
     "e3",
     "Be7",
     "Bd3",
     "Nbd7",
     "Qc2"
    ],
    "note": "Estructura Carlsbad: plan típico de ataque de minoría."
   },
   {
    "name": "Defensa Tarrasch",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e6",
     "Nc3",
     "c5",
     "cxd5",
     "exd5",
     "Nf3",
     "Nc6",
     "g3",
     "Nf6",
     "Bg2",
     "Be7",
     "O-O",
     "O-O"
    ],
    "note": "Las negras aceptan un peón aislado por actividad."
   },
   {
    "name": "Variante Lasker",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e6",
     "Nc3",
     "Nf6",
     "Bg5",
     "Be7",
     "e3",
     "O-O",
     "Nf3",
     "h6",
     "Bh4",
     "Ne4",
     "Bxe7",
     "Qxe7"
    ],
    "note": "Cambios para liberar la posición."
   }
  ],
  "traps": [
   {
    "name": "Trampa del Elefante",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e6",
     "Nc3",
     "Nf6",
     "Bg5",
     "Nbd7",
     "cxd5",
     "exd5",
     "Nxd5",
     "Nxd5",
     "Bxd8",
     "Bb4+",
     "Qd2",
     "Bxd2+",
     "Kxd2",
     "Kxd8"
    ],
    "explanation": "El caballo de f6 parece clavado, pero si las blancas ganan el peón de d5, la dama blanca se pierde tras el jaque ...Bb4+: las negras terminan con una pieza de más."
   }
  ],
  "players": [
   "José Raúl Capablanca",
   "Anatoli Kárpov",
   "Vladímir Kramnik",
   "Magnus Carlsen"
  ],
  "style": [
   "sólido",
   "posicional"
  ],
  "goal": "Mantener a toda costa el punto d5 y construir una posición inexpugnable; las negras liberan su juego después con ...c5 o ...e5. Las blancas buscan presión duradera (ataque de minoría, ruptura e4).",
  "profile": "Jugador clásico y sólido; base fundamental para cualquier jugador de 1.d4.",
  "middlegame": [
   "Ataque de minoría b4-b5.",
   "Problema del alfil de c8.",
   "Peón aislado y peones colgantes."
  ],
  "endgames": [
   "Finales Carlsbad: ligera ventaja blanca por debilidad de c6.",
   "Muchos finales igualados."
  ],
  "keyPieces": "Clave: peón negro de d5. Peor pieza: alfil negro de c8.",
  "riskLevel": 2,
  "theoryLoad": 4
 },
 {
  "id": "eslava",
  "name": "Defensa Eslava",
  "eco": "D10-D19",
  "group": "d4",
  "type": "cerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "2...c6 sostiene d5 sin encerrar el alfil de c8. Combina la solidez del Gambito Rehusado con mejor juego de piezas menores.",
  "moves": [
   "d4",
   "d5",
   "c4",
   "c6",
   "Nf3",
   "Nf6",
   "Nc3",
   "dxc4",
   "a4",
   "Bf5",
   "e3",
   "e6",
   "Bxc4",
   "Bb4",
   "O-O",
   "Nbd7",
   "Qe2",
   "Bg6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Gambito.",
   "Eslava: protege d5 con peón.",
   "Desarrollo.",
   "Desarrollo.",
   "Presión en d5.",
   "Toma c4 amenazando ...b5.",
   "Impide ...b5.",
   "Alfil activo fuera de la cadena.",
   "Prepara recuperar c4.",
   "Sólido.",
   "Recupera.",
   "Clavada.",
   "Enroque.",
   "Desarrollo.",
   "Prepara e4.",
   "Retirada preventiva ante e4 / Nh4."
  ],
  "stats": {
   "white": 38,
   "draw": 42,
   "black": 20,
   "popularity": "Muy alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Alfil de c8 activo antes de ...e6.",
   "Estructura sólida c6-d5.",
   "Presión con ...dxc4 y ...b5."
  ],
  "plansWhite": [
   "Ruptura e4.",
   "Ataque en flanco de rey con Ne5 y f3.",
   "Explotar a4-a5 en el flanco de dama."
  ],
  "plansBlack": [
   "Igualar con ...c5 o ...e5.",
   "Mantener el alfil activo.",
   "Simplificar hacia finales sólidos."
  ],
  "pros": [
   "Muy sólida.",
   "Alfil de c8 sin problemas.",
   "Variedad de sistemas (Chebanenko, Clásica, Cambio)."
  ],
  "cons": [
   "Variante del Cambio puede dar tablas aburridas.",
   "Teoría considerable en las líneas principales.",
   "Algo pasiva en algunas líneas."
  ],
  "structures": "Peones negros en c6-d5; tras ...dxc4 estructura abierta. En el Cambio, estructura simétrica.",
  "variations": [
   {
    "name": "Variante del Cambio",
    "moves": [
     "d4",
     "d5",
     "c4",
     "c6",
     "cxd5",
     "cxd5",
     "Nc3",
     "Nf6",
     "Bf4",
     "Nc6",
     "e3",
     "Bf5"
    ],
    "note": "Simetría: las blancas buscan pequeñas ventajas."
   },
   {
    "name": "Variante Chebanenko",
    "moves": [
     "d4",
     "d5",
     "c4",
     "c6",
     "Nf3",
     "Nf6",
     "Nc3",
     "a6",
     "e3",
     "b5",
     "b3",
     "Bg4"
    ],
    "note": "...a6 y ...b5: expansión en flanco de dama."
   }
  ],
  "traps": [],
  "players": [
   "Vasily Smyslov",
   "Mijaíl Botvínnik",
   "Viswanathan Anand",
   "Ding Liren"
  ],
  "style": [
   "sólido"
  ],
  "goal": "Sostener d5 con ...c6 conservando el alfil de c8 libre. Busca solidez del Gambito Rehusado sin su principal problema.",
  "profile": "Jugador sólido que valora la estructura sana y el buen juego de piezas menores.",
  "middlegame": [
   "Ruptura e4 blanca.",
   "Ruptura ...c5/...e5.",
   "Juego en a4-a5."
  ],
  "endgames": [
   "Finales simétricos (Cambio) de gran tendencia a tablas."
  ],
  "keyPieces": "Clave: alfil negro de f5. Peor pieza: caballo negro de b8 hasta d7.",
  "riskLevel": 2,
  "theoryLoad": 3
 },
 {
  "id": "semieslava",
  "name": "Defensa Semieslava",
  "eco": "D43-D49",
  "group": "d4",
  "type": "cerrada",
  "side": "negras",
  "level": "avanzado",
  "summary": "Combinación de ...c6 y ...e6: muy rica y compleja, desde la Merano hasta el volcánico Sistema Botvínnik.",
  "moves": [
   "d4",
   "d5",
   "c4",
   "c6",
   "Nf3",
   "Nf6",
   "Nc3",
   "e6",
   "e3",
   "Nbd7",
   "Bd3",
   "dxc4",
   "Bxc4",
   "b5",
   "Bd3",
   "Bb7",
   "O-O",
   "a6",
   "e4",
   "c5"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Gambito.",
   "Eslava.",
   "Desarrollo.",
   "Desarrollo.",
   "Desarrollo.",
   "Semieslava.",
   "Sólido.",
   "Prepara ...dxc4 y ...b5.",
   "Desarrollo.",
   "Merano: toma c4.",
   "Recupera.",
   "Gana tiempo y espacio.",
   "Retirada.",
   "Fianchetto.",
   "Enroque.",
   "Prepara ...c5.",
   "Ruptura central.",
   "Golpe a d4."
  ],
  "stats": {
   "white": 39,
   "draw": 38,
   "black": 23,
   "popularity": "Alta",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Flexibilidad ...dxc4 y ...b5.",
   "Ruptura ...c5 o ...e5.",
   "En el Botvínnik, desequilibrio total."
  ],
  "plansWhite": [
   "e4-e5 ganando espacio.",
   "Ataque en el flanco de rey.",
   "Bloquear el flanco de dama."
  ],
  "plansBlack": [
   "Expansión ...b5, ...Bb7, ...c5.",
   "Ruptura central ...e5.",
   "Contraataque dinámico."
  ],
  "pros": [
   "Gran riqueza estratégica y táctica.",
   "Juego activo para las negras.",
   "Muy probada en la élite."
  ],
  "cons": [
   "Teoría enorme (Merano, Botvínnik, Moscú, Anti-Moscú).",
   "Las líneas agudas requieren memoria precisa.",
   "Errores castigados duramente."
  ],
  "structures": "Peones negros en c6-d5-e6 (triángulo); tras ...dxc4 y ...b5 estructura abierta.",
  "variations": [
   {
    "name": "Sistema Botvínnik",
    "moves": [
     "d4",
     "d5",
     "c4",
     "c6",
     "Nf3",
     "Nf6",
     "Nc3",
     "e6",
     "Bg5",
     "dxc4",
     "e4",
     "b5",
     "e5",
     "h6",
     "Bh4",
     "g5",
     "Nxg5",
     "hxg5",
     "Bxg5",
     "Nbd7"
    ],
    "note": "Una de las líneas más complicadas del ajedrez."
   },
   {
    "name": "Variante Moscú",
    "moves": [
     "d4",
     "d5",
     "c4",
     "c6",
     "Nf3",
     "Nf6",
     "Nc3",
     "e6",
     "Bg5",
     "h6",
     "Bxf6",
     "Qxf6",
     "e3",
     "Nd7",
     "Bd3"
    ],
    "note": "Las negras obtienen la pareja de alfiles a cambio de espacio."
   },
   {
    "name": "Anti-Merano 6.Qc2",
    "moves": [
     "d4",
     "d5",
     "c4",
     "c6",
     "Nf3",
     "Nf6",
     "Nc3",
     "e6",
     "e3",
     "Nbd7",
     "Qc2",
     "Bd6",
     "Bd3",
     "O-O",
     "O-O"
    ],
    "note": "Las blancas evitan la Merano."
   }
  ],
  "traps": [],
  "players": [
   "Mijaíl Botvínnik",
   "Garry Kaspárov",
   "Alexei Shirov",
   "Anish Giri"
  ],
  "style": [
   "dinámico",
   "táctico"
  ],
  "goal": "Mantener el triángulo c6-d5-e6 con opción de ...dxc4 y ...b5 para contraatacar. Combina solidez con líneas muy agudas (Merano, Botvínnik).",
  "profile": "Jugador ambicioso con mucho tiempo de estudio y buen cálculo.",
  "middlegame": [
   "Expansión ...b5, ...Bb7, ...c5.",
   "Ruptura e4-e5 blanca.",
   "Desequilibrios extremos en el Botvínnik."
  ],
  "endgames": [
   "Finales con peones pasados en flancos opuestos (Botvínnik)."
  ],
  "keyPieces": "Clave: alfil negro de b7. Peor pieza: alfil negro de c8 antes de ...b5.",
  "riskLevel": 4,
  "theoryLoad": 5
 },
 {
  "id": "india-rey",
  "name": "Defensa India de Rey",
  "eco": "E60-E99",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "avanzado",
  "summary": "Defensa hipermoderna y combativa: las negras ceden el centro y contraatacan con ...e5 y un ataque frontal en el flanco de rey.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "g6",
   "Nc3",
   "Bg7",
   "e4",
   "d6",
   "Nf3",
   "O-O",
   "Be2",
   "e5",
   "O-O",
   "Nc6",
   "d5",
   "Ne7",
   "Ne1",
   "Nd7",
   "Nd3",
   "f5"
  ],
  "comments": [
   "Centro.",
   "India: control de e4 con pieza.",
   "Espacio.",
   "Fianchetto.",
   "Desarrollo.",
   "Alfil en la gran diagonal.",
   "Gran centro.",
   "Prepara ...e5.",
   "Desarrollo.",
   "Enroque.",
   "Variante Clásica.",
   "Golpe central.",
   "Enroque.",
   "Presión en d4.",
   "Cierra el centro.",
   "El caballo va hacia el flanco de rey.",
   "Prepara f3 y c5.",
   "Prepara ...f5.",
   "Apoya c5 y f4.",
   "Ataque en el flanco de rey (Mar del Plata)."
  ],
  "stats": {
   "white": 42,
   "draw": 32,
   "black": 26,
   "popularity": "Alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Centro cerrado y ataques en flancos opuestos.",
   "...f5-f4 y ...g5-g4 para atacar al rey.",
   "Alfil de g7 que se activa al abrirse el centro."
  ],
  "plansWhite": [
   "Ataque en flanco de dama con c5, b4.",
   "Bloquear el flanco de rey con f3, g4.",
   "Explotar la ventaja de espacio."
  ],
  "plansBlack": [
   "...f5, ...f4, ...g5, ...g4 avalancha.",
   "Sacrificios en h3 o g2.",
   "En otras líneas, ...c5 o ...e5 con presión en d4."
  ],
  "pros": [
   "Muy dinámica: juego para ganar.",
   "Planes claros en las estructuras cerradas.",
   "Favorita de Fischer y Kaspárov."
  ],
  "cons": [
   "Las blancas tienen mucho espacio.",
   "Muchas variantes peligrosas (Sämisch, Cuatro Peones, Bayonet).",
   "Riesgo alto."
  ],
  "structures": "Centro cerrado d5-e4 contra d6-e5: cadenas de peones apuntando a flancos opuestos.",
  "variations": [
   {
    "name": "Variante Sämisch",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nc3",
     "Bg7",
     "e4",
     "d6",
     "f3",
     "O-O",
     "Be3",
     "e5",
     "d5",
     "c6",
     "Qd2"
    ],
    "note": "f3 sólido: las blancas preparan g4 y enroque largo."
   },
   {
    "name": "Ataque de los Cuatro Peones",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nc3",
     "Bg7",
     "e4",
     "d6",
     "f4",
     "O-O",
     "Nf3",
     "c5",
     "d5",
     "e6",
     "Be2",
     "exd5",
     "cxd5"
    ],
    "note": "Centro máximo; las negras lo golpean con ...c5."
   },
   {
    "name": "Fianchetto",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nf3",
     "Bg7",
     "g3",
     "O-O",
     "Bg2",
     "d6",
     "O-O",
     "Nbd7",
     "Nc3",
     "e5",
     "e4"
    ],
    "note": "Sistema posicional y sólido."
   }
  ],
  "traps": [],
  "players": [
   "Bobby Fischer",
   "Garry Kaspárov",
   "Teimour Radjabov",
   "Hikaru Nakamura"
  ],
  "style": [
   "dinámico",
   "agresivo",
   "hipermoderno"
  ],
  "goal": "Dejar que las blancas construyan un gran centro para luego atacarlo con ...e5 o ...c5 y, cuando se cierra, lanzar un ataque frontal en el flanco de rey. Busca ganar con negras mediante desequilibrio.",
  "profile": "Atacante con negras, dispuesto a asumir riesgos y estudiar estructuras cerradas.",
  "middlegame": [
   "Avalancha ...f5-f4-g5-g4.",
   "Ataque blanco en flanco de dama con c5.",
   "Sacrificios en el flanco de rey."
  ],
  "endgames": [
   "Si las negras no logran el ataque, los finales suelen favorecer a las blancas (alfil g7 malo)."
  ],
  "keyPieces": "Clave: alfil negro de g7 y peón f5. Peor pieza: alfil negro de g7 si el centro queda bloqueado.",
  "riskLevel": 4,
  "theoryLoad": 4
 },
 {
  "id": "nimzo-india",
  "name": "Defensa Nimzo-India",
  "eco": "E20-E59",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "3...Bb4 clava el caballo de c3 e impide e4. Considerada una de las mejores defensas contra 1.d4.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "e6",
   "Nc3",
   "Bb4",
   "e3",
   "O-O",
   "Bd3",
   "d5",
   "Nf3",
   "c5",
   "O-O",
   "Nc6",
   "a3",
   "Bxc3",
   "bxc3",
   "dxc4",
   "Bxc4",
   "Qc7"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Prepara ...d5 o ...Bb4.",
   "Prepara e4.",
   "Nimzo-India: clava c3 e impide e4.",
   "Rubinstein: sólida.",
   "Enroque.",
   "Desarrollo.",
   "Centro.",
   "Desarrollo.",
   "Golpe a d4.",
   "Enroque.",
   "Presión en d4.",
   "Pregunta al alfil.",
   "Cede la pareja de alfiles a cambio de doblar peones.",
   "Peones doblados en c.",
   "Cambio.",
   "Recupera.",
   "Prepara ...e5."
  ],
  "stats": {
   "white": 37,
   "draw": 39,
   "black": 24,
   "popularity": "Muy alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Pareja de alfiles contra estructura dañada.",
   "Control de e4.",
   "Bloqueo de peones doblados."
  ],
  "plansWhite": [
   "Abrir la posición para la pareja de alfiles.",
   "Centro con f3 y e4.",
   "Ataque en flanco de rey."
  ],
  "plansBlack": [
   "Bloquear con ...c5, ...d6, ...e5.",
   "Presionar los peones doblados de c.",
   "Mantener la posición cerrada para los caballos."
  ],
  "pros": [
   "Flexible y sólida.",
   "Rica en ideas estratégicas.",
   "Respetada en todos los niveles."
  ],
  "cons": [
   "Cede la pareja de alfiles.",
   "Muchas respuestas blancas distintas (4.Qc2, 4.e3, 4.f3, 4.Bg5...).",
   "Exige comprensión posicional."
  ],
  "structures": "Peones doblados en c3/c4 blancos tras ...Bxc3; centro abierto o bloqueado según la variante.",
  "variations": [
   {
    "name": "Variante Clásica 4.Qc2",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "Nc3",
     "Bb4",
     "Qc2",
     "O-O",
     "a3",
     "Bxc3+",
     "Qxc3",
     "b6",
     "Bg5",
     "Bb7"
    ],
    "note": "Las blancas evitan los peones doblados."
   },
   {
    "name": "Variante Sämisch",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "Nc3",
     "Bb4",
     "a3",
     "Bxc3+",
     "bxc3",
     "c5",
     "e3",
     "Nc6",
     "Bd3"
    ],
    "note": "Las blancas fuerzan los peones doblados y apuestan por los alfiles."
   },
   {
    "name": "Variante Leningrado",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "Nc3",
     "Bb4",
     "Bg5",
     "h6",
     "Bh4",
     "c5",
     "d5",
     "d6"
    ],
    "note": "Doble clavada y espacio."
   }
  ],
  "traps": [],
  "players": [
   "Aron Nimzowitsch",
   "Mijaíl Tal",
   "Garry Kaspárov",
   "Vladímir Kramnik"
  ],
  "style": [
   "posicional",
   "universal"
  ],
  "goal": "Impedir e4 con la clavada Bb4 y, si conviene, cambiar el alfil por el caballo para doblar los peones blancos. Lucha pareja de alfiles contra estructura.",
  "profile": "Jugador estratégico que entiende de estructuras y piezas menores.",
  "middlegame": [
   "Bloqueo de peones doblados.",
   "Ruptura e4 blanca.",
   "Pareja de alfiles contra caballos."
  ],
  "endgames": [
   "Finales con peones doblados blancos: ventaja negra si la posición queda cerrada.",
   "Pareja de alfiles en finales abiertos: ventaja blanca."
  ],
  "keyPieces": "Clave: alfil negro de b4. Peor pieza: alfil blanco de c1 en estructuras cerradas.",
  "riskLevel": 2,
  "theoryLoad": 4
 },
 {
  "id": "india-dama",
  "name": "Defensa India de Dama",
  "eco": "E12-E19",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "Fianchetto de dama para controlar e4. Sólida y técnica, compañera natural de la Nimzo-India.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "e6",
   "Nf3",
   "b6",
   "g3",
   "Ba6",
   "b3",
   "Bb4+",
   "Bd2",
   "Be7",
   "Bg2",
   "c6",
   "Bc3",
   "d5",
   "Ne5",
   "Nfd7"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Prepara ...d5 o ...b6.",
   "Evita la Nimzo.",
   "India de Dama.",
   "Fianchetto.",
   "Ataca c4.",
   "Defiende c4.",
   "Jaque intermedio: desvía el alfil.",
   "Bloqueo.",
   "Retirada: el alfil d2 estorba.",
   "Fianchetto.",
   "Prepara ...d5.",
   "Alfil en la gran diagonal.",
   "Centro.",
   "Caballo activo.",
   "Desafía el caballo."
  ],
  "stats": {
   "white": 38,
   "draw": 43,
   "black": 19,
   "popularity": "Media",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Control de e4 con piezas.",
   "Fianchetto contra fianchetto.",
   "Juego posicional y sólido."
  ],
  "plansWhite": [
   "Ruptura d5 o e4.",
   "Ventaja de espacio.",
   "Presión en la gran diagonal."
  ],
  "plansBlack": [
   "Controlar e4 con alfil y caballo.",
   "Liberarse con ...c5 o ...d5.",
   "Simplificar."
  ],
  "pros": [
   "Muy sólida.",
   "Pocas debilidades.",
   "Buena complementaria de la Nimzo."
  ],
  "cons": [
   "Pocas posibilidades de ganar.",
   "Puede ser pasiva.",
   "Las blancas eligen el tempo del juego."
  ],
  "structures": "Fianchetto en b7 o alfil en a6; centro con d5/e6 o pequeño centro.",
  "variations": [
   {
    "name": "Variante Petrosián",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "Nf3",
     "b6",
     "a3",
     "Bb7",
     "Nc3",
     "d5",
     "cxd5",
     "Nxd5",
     "Qc2"
    ],
    "note": "a3 impide ...Bb4 y prepara e4."
   },
   {
    "name": "Línea clásica ...Bb7",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "Nf3",
     "b6",
     "g3",
     "Bb7",
     "Bg2",
     "Be7",
     "O-O",
     "O-O",
     "Nc3",
     "Ne4",
     "Qc2",
     "Nxc3",
     "Qxc3"
    ],
    "note": "Simplificación para controlar e4."
   }
  ],
  "traps": [],
  "players": [
   "Anatoli Kárpov",
   "Tigran Petrosián",
   "Veselin Topálov"
  ],
  "style": [
   "sólido",
   "posicional"
  ],
  "goal": "Controlar e4 con piezas mediante el fianchetto de dama. Busca solidez y juego posicional con pocas debilidades.",
  "profile": "Jugador técnico que prefiere posiciones estables.",
  "middlegame": [
   "Lucha por e4.",
   "Ruptura d5 blanca.",
   "Simplificación."
  ],
  "endgames": [
   "Finales equilibrados con pocas debilidades."
  ],
  "keyPieces": "Clave: alfil negro de b7. Peor pieza: alfil blanco de c1.",
  "riskLevel": 1,
  "theoryLoad": 3
 },
 {
  "id": "grunfeld",
  "name": "Defensa Grünfeld",
  "eco": "D70-D99",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "avanzado",
  "summary": "Las negras permiten a las blancas un gran centro de peones para destruirlo con ...c5 y el alfil de g7. Altamente teórica y dinámica.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "g6",
   "Nc3",
   "d5",
   "cxd5",
   "Nxd5",
   "e4",
   "Nxc3",
   "bxc3",
   "Bg7",
   "Nf3",
   "c5",
   "Rb1",
   "O-O",
   "Be2",
   "cxd4",
   "cxd4",
   "Qa5+",
   "Bd2",
   "Qxa2"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Fianchetto.",
   "Prepara e4.",
   "Grünfeld: golpe central.",
   "Cambio.",
   "Recupera.",
   "Gran centro con tiempo.",
   "Cambio.",
   "Centro e4-d4-c3.",
   "El alfil apunta a d4.",
   "Desarrollo.",
   "Golpe a d4.",
   "Sistema moderno: la torre activa en b.",
   "Enroque.",
   "Desarrollo.",
   "Cambio.",
   "Recupera.",
   "Jaque.",
   "Interposición.",
   "Toma el peón a2: material contra iniciativa."
  ],
  "stats": {
   "white": 40,
   "draw": 36,
   "black": 24,
   "popularity": "Alta",
   "elo": "Avanzado a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Centro blanco como blanco de ataque.",
   "Presión en d4 con ...c5, ...Nc6, ...Bg7.",
   "Mayoría en flanco de dama en el final."
  ],
  "plansWhite": [
   "Mantener el centro y avanzar d5.",
   "Ataque en flanco de rey (h4-h5).",
   "Explotar la ventaja de espacio."
  ],
  "plansBlack": [
   "Presión total sobre d4.",
   "Simplificar y jugar con la mayoría en flanco de dama.",
   "Peón pasado en el flanco de dama."
  ],
  "pros": [
   "Muy dinámica y concreta.",
   "Probada por campeones del mundo.",
   "El final suele favorecer a las negras."
  ],
  "cons": [
   "Teoría enorme y forzada.",
   "Si el centro blanco avanza, las negras pueden ser aplastadas.",
   "Exige memoria precisa."
  ],
  "structures": "Centro blanco c3-d4-e4 contra la presión de alfil g7 y peón c5.",
  "variations": [
   {
    "name": "Cambio con Bc4",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nc3",
     "d5",
     "cxd5",
     "Nxd5",
     "e4",
     "Nxc3",
     "bxc3",
     "Bg7",
     "Bc4",
     "c5",
     "Ne2",
     "Nc6",
     "Be3",
     "O-O",
     "O-O"
    ],
    "note": "Línea clásica de Spassky y Kaspárov-Kárpov."
   },
   {
    "name": "Sistema Ruso",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nc3",
     "d5",
     "Nf3",
     "Bg7",
     "Qb3",
     "dxc4",
     "Qxc4",
     "O-O",
     "e4",
     "Bg4"
    ],
    "note": "La dama blanca protege el centro."
   },
   {
    "name": "Variante 4.Bf4",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "g6",
     "Nc3",
     "d5",
     "Bf4",
     "Bg7",
     "e3",
     "c5",
     "dxc5",
     "Qa5"
    ],
    "note": "Más tranquila."
   }
  ],
  "traps": [],
  "players": [
   "Ernst Grünfeld",
   "Garry Kaspárov",
   "Peter Svidler",
   "Maxime Vachier-Lagrave"
  ],
  "style": [
   "dinámico",
   "hipermoderno"
  ],
  "goal": "Permitir que las blancas formen un gran centro de peones para atacarlo con piezas: ...c5, ...Nc6, ...Bg7. El fin es destruir el centro o dejarlo como blanco de ataque y aprovechar la mayoría en flanco de dama.",
  "profile": "Jugador concreto, con buena memoria y preferencia por el contraataque.",
  "middlegame": [
   "Presión sobre d4.",
   "Avance d5 blanco.",
   "Ataque blanco en flanco de rey."
  ],
  "endgames": [
   "Finales con mayoría negra en flanco de dama: a menudo favorables a las negras."
  ],
  "keyPieces": "Clave: alfil negro de g7. Peor pieza: caballo negro de b8/c6 si es expulsado.",
  "riskLevel": 4,
  "theoryLoad": 5
 },
 {
  "id": "benoni",
  "name": "Defensa Benoni Moderna",
  "eco": "A60-A79",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "avanzado",
  "summary": "Estructura asimétrica: mayoría blanca en el centro contra mayoría negra en flanco de dama. Arma de combate y desequilibrio.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "c5",
   "d5",
   "e6",
   "Nc3",
   "exd5",
   "cxd5",
   "d6",
   "e4",
   "g6",
   "Nf3",
   "Bg7",
   "Be2",
   "O-O",
   "O-O",
   "Re8",
   "Nd2",
   "Na6"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Benoni: golpe a d4.",
   "Avanza ganando espacio.",
   "Ataca d5.",
   "Defensa.",
   "Cambio.",
   "Recupera: estructura asimétrica.",
   "Fija d5.",
   "Centro.",
   "Fianchetto.",
   "Desarrollo.",
   "El alfil domina la gran diagonal.",
   "Desarrollo.",
   "Enroque.",
   "Enroque.",
   "Presión sobre e4.",
   "Defiende e4 y apunta a c4.",
   "Caballo hacia c7."
  ],
  "stats": {
   "white": 44,
   "draw": 30,
   "black": 26,
   "popularity": "Media",
   "elo": "Avanzado",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Mayoría negra en flanco de dama (...b5).",
   "Avance e5 blanco central.",
   "Casilla e5 y gran diagonal."
  ],
  "plansWhite": [
   "e5 central rompiendo.",
   "f4 con ataque.",
   "Controlar b5 para frenar ...b5."
  ],
  "plansBlack": [
   "...a6, ...b5 en flanco de dama.",
   "Presión con el alfil g7.",
   "Contraataque táctico sobre e4."
  ],
  "pros": [
   "Desequilibrada: juego por la victoria.",
   "Activa.",
   "Planes claros."
  ],
  "cons": [
   "Las blancas tienen espacio y centro.",
   "El Ataque Taimanov (f4, Bb5+) es muy peligroso.",
   "Estructura con debilidad en d6."
  ],
  "structures": "Blancas: d5-e4 central; negras: c5-d6, con peones a7-b7 en flanco de dama.",
  "variations": [
   {
    "name": "Ataque Taimanov",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "c5",
     "d5",
     "e6",
     "Nc3",
     "exd5",
     "cxd5",
     "d6",
     "e4",
     "g6",
     "f4",
     "Bg7",
     "Bb5+",
     "Nfd7",
     "a4"
    ],
    "note": "Peligroso: e5 amenaza aplastar a las negras."
   },
   {
    "name": "Fianchetto",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "c5",
     "d5",
     "e6",
     "Nc3",
     "exd5",
     "cxd5",
     "d6",
     "Nf3",
     "g6",
     "g3",
     "Bg7",
     "Bg2",
     "O-O",
     "O-O"
    ],
    "note": "Juego posicional."
   }
  ],
  "traps": [],
  "players": [
   "Mijaíl Tal",
   "Bobby Fischer",
   "Garry Kaspárov (con negras)"
  ],
  "style": [
   "dinámico",
   "agresivo"
  ],
  "goal": "Crear desequilibrio estructural: mayoría negra en flanco de dama contra mayoría blanca en el centro. El fin es jugar a ganar mediante contraataque, aceptando riesgos.",
  "profile": "Jugador combativo que necesita ganar con negras.",
  "middlegame": [
   "Ruptura ...b5.",
   "Avance e5 blanco.",
   "Presión del alfil g7."
  ],
  "endgames": [
   "Final con peón débil en d6: desfavorable a negras."
  ],
  "keyPieces": "Clave: alfil negro de g7. Peor pieza: caballo negro de b8 hasta a6-c7.",
  "riskLevel": 5,
  "theoryLoad": 4
 },
 {
  "id": "holandesa",
  "name": "Defensa Holandesa",
  "eco": "A80-A99",
  "group": "d4",
  "type": "semicerrada",
  "side": "negras",
  "level": "intermedio",
  "summary": "1...f5 controla e4 desde el principio y busca juego en el flanco de rey. Agresiva pero algo debilitante.",
  "moves": [
   "d4",
   "f5",
   "g3",
   "Nf6",
   "Bg2",
   "e6",
   "Nf3",
   "Be7",
   "O-O",
   "O-O",
   "c4",
   "d6",
   "Nc3",
   "Qe8",
   "Qc2",
   "Qh5"
  ],
  "comments": [
   "Centro.",
   "Holandesa: control de e4.",
   "Fianchetto: presión en e4.",
   "Desarrollo.",
   "Alfil a la gran diagonal.",
   "Sólido.",
   "Desarrollo.",
   "Desarrollo.",
   "Enroque.",
   "Enroque.",
   "Espacio.",
   "Prepara ...e5.",
   "Desarrollo.",
   "Dama hacia el flanco de rey.",
   "Prepara e4.",
   "Dama activa en h5 (Clásica / Ilyin-Zhenevsky)."
  ],
  "stats": {
   "white": 44,
   "draw": 30,
   "black": 26,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Control de e4.",
   "Ataque en flanco de rey (...Qe8-h5, ...g5).",
   "Estructuras Stonewall o Leningrado."
  ],
  "plansWhite": [
   "Ruptura e4 para abrir la posición.",
   "Explotar la debilidad de e6 y e5.",
   "Presión en la gran diagonal."
  ],
  "plansBlack": [
   "Ataque en flanco de rey.",
   "Ruptura ...e5.",
   "Mantener el control de e4."
  ],
  "pros": [
   "Desequilibrada.",
   "Planes de ataque claros.",
   "Evita la teoría principal de 1.d4."
  ],
  "cons": [
   "Debilita el rey (diagonal e8-h5).",
   "Casillas débiles e5/e6.",
   "Las blancas tienen gambitos peligrosos (Staunton)."
  ],
  "structures": "Stonewall (c6-d5-e6-f5), Leningrado (d6-f5-g6) o Clásica (d6-e6-f5).",
  "variations": [
   {
    "name": "Variante Leningrado",
    "moves": [
     "d4",
     "f5",
     "g3",
     "Nf6",
     "Bg2",
     "g6",
     "Nf3",
     "Bg7",
     "O-O",
     "O-O",
     "c4",
     "d6",
     "Nc3",
     "Qe8"
    ],
    "note": "Fianchetto de rey: estilo India de Rey."
   },
   {
    "name": "Stonewall",
    "moves": [
     "d4",
     "f5",
     "c4",
     "Nf6",
     "g3",
     "e6",
     "Bg2",
     "d5",
     "Nf3",
     "c6",
     "O-O",
     "Bd6"
    ],
    "note": "Cadena de peones sólida que controla e4."
   },
   {
    "name": "Gambito Staunton",
    "moves": [
     "d4",
     "f5",
     "e4",
     "fxe4",
     "Nc3",
     "Nf6",
     "Bg5",
     "Nc6"
    ],
    "note": "Las blancas sacrifican un peón para abrir líneas."
   }
  ],
  "traps": [
   {
    "name": "Mate en g6",
    "moves": [
     "d4",
     "f5",
     "Bg5",
     "h6",
     "Bh4",
     "g5",
     "Bg3",
     "f4",
     "e3",
     "h5",
     "Bd3",
     "Rh6",
     "Qxh5+",
     "Rxh5",
     "Bg6#"
    ],
    "explanation": "La diagonal e8-h5 debilitada por ...f5 y ...g5 permite un sacrificio de dama seguido de mate con el alfil."
   }
  ],
  "players": [
   "Bent Larsen",
   "Simen Agdestein",
   "Magnus Carlsen (ocasional)",
   "Hikaru Nakamura"
  ],
  "style": [
   "agresivo",
   "dinámico"
  ],
  "goal": "Controlar e4 con ...f5 desde la primera jugada y preparar un ataque en el flanco de rey. Crea desequilibrio frente a 1.d4.",
  "profile": "Jugador agresivo que quiere evitar teoría principal de 1.d4.",
  "middlegame": [
   "Ataque ...Qe8-h5.",
   "Stonewall con Ne4.",
   "Ruptura e4 blanca."
  ],
  "endgames": [
   "Finales con casilla e5 débil: ligera desventaja negra."
  ],
  "keyPieces": "Clave: peón de f5 y caballo de e4. Peor pieza: alfil negro de c8 en la Stonewall.",
  "riskLevel": 4,
  "theoryLoad": 3
 },
 {
  "id": "benko",
  "name": "Gambito Benko",
  "eco": "A57-A59",
  "group": "d4",
  "type": "gambito",
  "side": "negras",
  "level": "intermedio",
  "summary": "Las negras sacrifican un peón en el flanco de dama para obtener columnas abiertas a y b y una presión duradera.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "c5",
   "d5",
   "b5",
   "cxb5",
   "a6",
   "bxa6",
   "g6",
   "Nc3",
   "Bxa6",
   "e4",
   "Bxf1",
   "Kxf1",
   "d6",
   "Nf3",
   "Bg7",
   "g3",
   "O-O",
   "Kg2",
   "Nbd7"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Golpe a d4.",
   "Avanza.",
   "Gambito Benko.",
   "Acepta.",
   "Insiste: abrir columnas.",
   "Acepta de nuevo.",
   "Fianchetto.",
   "Desarrollo.",
   "Recupera con alfil.",
   "Centro.",
   "Cambio: las blancas pierden el enroque.",
   "Recupera.",
   "Estructura típica.",
   "Desarrollo.",
   "Gran diagonal.",
   "Casilla para el rey.",
   "Enroque.",
   "Rey seguro.",
   "Caballo hacia b6/e5."
  ],
  "stats": {
   "white": 45,
   "draw": 30,
   "black": 25,
   "popularity": "Media",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Presión en columnas a y b.",
   "Alfil de g7 sobre a1-h8.",
   "Compensación a largo plazo, incluso en el final."
  ],
  "plansWhite": [
   "Consolidar el peón de más.",
   "Ruptura e5 o ataque central.",
   "Simplificar hacia un final."
  ],
  "plansBlack": [
   "Torres en a y b.",
   "Presión sobre a2 y b2.",
   "Caballos hacia b4/c4."
  ],
  "pros": [
   "Compensación duradera y fácil de jugar.",
   "Planes muy claros.",
   "Funciona incluso en finales."
  ],
  "cons": [
   "Peón menos permanente.",
   "Las blancas pueden rechazar el gambito.",
   "Si las blancas consolidan, el final está perdido."
  ],
  "structures": "Peones blancos d5-e4 con peón extra en a; negras con columnas a y b abiertas.",
  "variations": [
   {
    "name": "Benko Rehusado (4.Nf3)",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "c5",
     "d5",
     "b5",
     "Nf3",
     "g6",
     "cxb5",
     "a6",
     "b6",
     "d6"
    ],
    "note": "Las blancas evitan las columnas abiertas."
   },
   {
    "name": "Línea 5.b6",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "c5",
     "d5",
     "b5",
     "cxb5",
     "a6",
     "b6",
     "e6",
     "Nc3",
     "Nxd5"
    ],
    "note": "Las blancas devuelven el peón para cerrar el flanco."
   }
  ],
  "traps": [],
  "players": [
   "Pal Benkő",
   "Vasyl Ivanchuk",
   "Bent Larsen"
  ],
  "style": [
   "gambito",
   "posicional"
  ],
  "goal": "Sacrificar un peón para abrir las columnas a y b y presionar a largo plazo. Su fin es una compensación estructural duradera, no un ataque inmediato.",
  "profile": "Jugador posicional que disfruta de la presión prolongada.",
  "middlegame": [
   "Torres en a y b.",
   "Ruptura e5 blanca.",
   "Caballos en b4/c4."
  ],
  "endgames": [
   "Finales donde la presión negra compensa el peón incluso sin damas."
  ],
  "keyPieces": "Clave: alfil negro de g7 y torres en a/b. Peor pieza: caballo blanco de c3 si es presionado.",
  "riskLevel": 3,
  "theoryLoad": 2
 },
 {
  "id": "catalana",
  "name": "Apertura Catalana",
  "eco": "E00-E09",
  "group": "d4",
  "type": "cerrada",
  "side": "blancas",
  "level": "avanzado",
  "summary": "Combinación de d4/c4 con fianchetto de rey: el alfil de g2 ejerce una presión enorme sobre la gran diagonal.",
  "moves": [
   "d4",
   "Nf6",
   "c4",
   "e6",
   "g3",
   "d5",
   "Bg2",
   "Be7",
   "Nf3",
   "O-O",
   "O-O",
   "dxc4",
   "Qc2",
   "a6",
   "Qxc4",
   "b5",
   "Qc2",
   "Bb7",
   "Bd2",
   "Be4"
  ],
  "comments": [
   "Centro.",
   "Control de e4.",
   "Espacio.",
   "Sólido.",
   "Catalana: fianchetto.",
   "Centro.",
   "El alfil presiona d5 y b7.",
   "Desarrollo.",
   "Desarrollo.",
   "Enroque.",
   "Enroque.",
   "Toma el peón.",
   "Recupera c4.",
   "Prepara ...b5.",
   "Recupera.",
   "Gana espacio.",
   "Retirada.",
   "Fianchetto: lucha en la diagonal.",
   "Desarrollo.",
   "Golpea la dama."
  ],
  "stats": {
   "white": 41,
   "draw": 41,
   "black": 18,
   "popularity": "Alta",
   "elo": "Avanzado a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Presión de largo plazo en la gran diagonal.",
   "Gambito temporal de c4.",
   "Ventaja estructural en finales."
  ],
  "plansWhite": [
   "Recuperar c4 con presión.",
   "Presión sobre b7 y el flanco de dama.",
   "Explotar la debilidad de c6."
  ],
  "plansBlack": [
   "Mantener c4 con ...b5 o devolverlo para desarrollarse.",
   "Liberarse con ...c5.",
   "Neutralizar el alfil de g2."
  ],
  "pros": [
   "Presión duradera sin riesgo.",
   "Favorita de Kramnik y Carlsen.",
   "Posiciones técnicas de calidad."
  ],
  "cons": [
   "Las negras igualan si conocen la teoría.",
   "Gambito temporal de c4.",
   "Teoría técnica."
  ],
  "structures": "Fianchetto de rey blanco; negras con e6-d5 o abierto tras ...dxc4.",
  "variations": [
   {
    "name": "Catalana Abierta",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "g3",
     "d5",
     "Bg2",
     "dxc4",
     "Nf3",
     "c5",
     "O-O",
     "Nc6",
     "Qa4"
    ],
    "note": "Las negras toman c4 y golpean el centro."
   },
   {
    "name": "Catalana Cerrada",
    "moves": [
     "d4",
     "Nf6",
     "c4",
     "e6",
     "g3",
     "d5",
     "Bg2",
     "Be7",
     "Nf3",
     "O-O",
     "O-O",
     "c6",
     "Qc2",
     "Nbd7",
     "Nbd2",
     "b6"
    ],
    "note": "Estructura sólida y lenta."
   }
  ],
  "traps": [],
  "players": [
   "Vladímir Kramnik",
   "Magnus Carlsen",
   "Borís Gelfand",
   "Viswanathan Anand"
  ],
  "style": [
   "posicional"
  ],
  "goal": "Combinar el centro de 1.d4 con un fianchetto de rey para presionar d5 y b7 a largo plazo. Busca ventaja posicional pequeña pero duradera.",
  "profile": "Jugador posicional y técnico que disfruta de presión sin riesgo.",
  "middlegame": [
   "Presión en la gran diagonal.",
   "Recuperación de c4.",
   "Debilidad de c6."
  ],
  "endgames": [
   "Finales técnicos con ligera ventaja blanca por presión en el flanco de dama."
  ],
  "keyPieces": "Clave: alfil blanco de g2. Peor pieza: alfil negro de c8.",
  "riskLevel": 2,
  "theoryLoad": 4
 },
 {
  "id": "londres",
  "name": "Sistema Londres",
  "eco": "D02 / A46",
  "group": "d4",
  "type": "cerrada",
  "side": "blancas",
  "level": "principiante",
  "summary": "Sistema de desarrollo fijo: d4, Bf4, e3, c3, Nd2, Ngf3, Bd3. Fácil de aprender y muy popular en todos los niveles.",
  "moves": [
   "d4",
   "d5",
   "Bf4",
   "Nf6",
   "e3",
   "c5",
   "c3",
   "Nc6",
   "Nd2",
   "e6",
   "Ngf3",
   "Bd6",
   "Bg3",
   "O-O",
   "Bd3",
   "b6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Londres: el alfil sale antes de e3.",
   "Desarrollo.",
   "Pirámide de peones.",
   "Golpe a d4.",
   "Refuerza d4.",
   "Desarrollo.",
   "Flexible.",
   "Sólido.",
   "Desarrollo.",
   "Desafía el alfil.",
   "Retirada: conserva el alfil.",
   "Enroque.",
   "Desarrollo.",
   "Fianchetto."
  ],
  "stats": {
   "white": 41,
   "draw": 33,
   "black": 26,
   "popularity": "Muy alta en aficionados",
   "elo": "Todos los niveles",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Estructura de pirámide c3-d4-e3.",
   "Caballo en e5 + ataque en flanco de rey.",
   "Sistema universal."
  ],
  "plansWhite": [
   "Ne5, f4 y ataque.",
   "Ataque con h4-h5 en algunas líneas.",
   "Expansión en flanco de dama."
  ],
  "plansBlack": [
   "...c5 y ...Qb6 contra b2.",
   "Ruptura central ...e5.",
   "Cambiar el alfil de f4 con ...Bd6 o ...Nh5."
  ],
  "pros": [
   "Muy fácil de aprender.",
   "Sistema universal contra casi todo.",
   "Pocas sorpresas."
  ],
  "cons": [
   "Poca ambición teórica.",
   "Las negras igualan con ...c5 y ...Qb6.",
   "Puede ser predecible."
  ],
  "structures": "Pirámide c3-d4-e3 con alfil en f4/g3.",
  "variations": [
   {
    "name": "Contra India de Rey",
    "moves": [
     "d4",
     "Nf6",
     "Nf3",
     "g6",
     "Bf4",
     "Bg7",
     "e3",
     "O-O",
     "Be2",
     "d6",
     "h3",
     "c5",
     "c3"
    ],
    "note": "Sólido contra el fianchetto."
   },
   {
    "name": "Ataque Jobava-Londres",
    "moves": [
     "d4",
     "d5",
     "Nc3",
     "Nf6",
     "Bf4",
     "e6",
     "Nb5",
     "Na6",
     "e3",
     "Bb4+",
     "c3",
     "Be7"
    ],
    "note": "Agresivo, con Nc3 en vez de c3."
   }
  ],
  "traps": [
   {
    "name": "Trampa Nb5-c7",
    "moves": [
     "d4",
     "d5",
     "Bf4",
     "c5",
     "e3",
     "Qb6",
     "Nc3",
     "Qxb2",
     "Nb5"
    ],
    "explanation": "Si las negras se comen el peón b2 con la dama, Nb5 amenaza Nc7+ con horquilla y Rb1 para atrapar la dama."
   }
  ],
  "players": [
   "Magnus Carlsen",
   "Gata Kamsky",
   "Vladimir Kramnik (ocasional)"
  ],
  "style": [
   "universal",
   "sólido"
  ],
  "goal": "Sistema de desarrollo fijo que puede jugarse contra casi cualquier defensa: pirámide c3-d4-e3 con el alfil fuera. El fin es llegar a medio juegos conocidos sin teoría.",
  "profile": "Jugador práctico con poco tiempo de estudio; también útil en partidas rápidas.",
  "middlegame": [
   "Ne5 + f4 y ataque.",
   "Ruptura e4.",
   "Presión negra ...c5/...Qb6."
  ],
  "endgames": [
   "Finales simétricos e igualados."
  ],
  "keyPieces": "Clave: alfil blanco de f4/g3. Peor pieza: alfil blanco de c1 si se encierra.",
  "riskLevel": 1,
  "theoryLoad": 1
 },
 {
  "id": "inglesa",
  "name": "Apertura Inglesa",
  "eco": "A10-A39",
  "group": "flancos",
  "type": "flanco",
  "side": "blancas",
  "level": "intermedio",
  "summary": "1.c4 controla d5 desde el flanco. Muy flexible: puede transponer a aperturas de 1.d4 o crear estructuras de Siciliana invertida.",
  "moves": [
   "c4",
   "e5",
   "Nc3",
   "Nf6",
   "Nf3",
   "Nc6",
   "g3",
   "d5",
   "cxd5",
   "Nxd5",
   "Bg2",
   "Nb6",
   "O-O",
   "Be7",
   "d3",
   "O-O",
   "a3",
   "Be6"
  ],
  "comments": [
   "Inglesa: control de d5.",
   "Siciliana invertida.",
   "Desarrollo.",
   "Desarrollo.",
   "Ataca e5.",
   "Defiende.",
   "Fianchetto.",
   "Centro.",
   "Cambio.",
   "Recupera.",
   "Gran diagonal.",
   "Retirada.",
   "Enroque.",
   "Desarrollo.",
   "Sólido.",
   "Enroque.",
   "Prepara b4.",
   "Desarrollo."
  ],
  "stats": {
   "white": 40,
   "draw": 37,
   "black": 23,
   "popularity": "Alta",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Control de d5 y la gran diagonal.",
   "Expansión en flanco de dama con b4-b5.",
   "Siciliana con un tiempo extra."
  ],
  "plansWhite": [
   "b4-b5 contra el caballo de c6.",
   "Presión en la columna c.",
   "Ruptura d4 tardía."
  ],
  "plansBlack": [
   "Centro amplio con ...e5, ...d5.",
   "Ataque en flanco de rey (...f5).",
   "Juego simétrico seguro."
  ],
  "pros": [
   "Extremadamente flexible.",
   "Evita la teoría de 1.e4 y 1.d4.",
   "Juego posicional rico."
  ],
  "cons": [
   "Las negras pueden ocupar el centro.",
   "Muchas transposiciones a dominar.",
   "Menos agresiva al principio."
  ],
  "structures": "Siciliana invertida, estructura Botvínnik (c4-d3-e4) o simétricas.",
  "variations": [
   {
    "name": "Inglesa Simétrica",
    "moves": [
     "c4",
     "c5",
     "Nc3",
     "Nc6",
     "g3",
     "g6",
     "Bg2",
     "Bg7",
     "Nf3",
     "e6",
     "O-O",
     "Nge7"
    ],
    "note": "Simetría con planes en flanco de dama."
   },
   {
    "name": "Sistema Botvínnik",
    "moves": [
     "c4",
     "e5",
     "Nc3",
     "Nc6",
     "g3",
     "g6",
     "Bg2",
     "Bg7",
     "e4",
     "d6",
     "Nge2"
    ],
    "note": "Control de d5 con peones c4-e4."
   },
   {
    "name": "Anglo-India",
    "moves": [
     "c4",
     "Nf6",
     "Nc3",
     "e6",
     "e4",
     "d5",
     "e5",
     "d4",
     "exf6",
     "dxc3",
     "bxc3",
     "Qxf6"
    ],
    "note": "Variante Mikenas-Carls: muy táctica."
   }
  ],
  "traps": [],
  "players": [
   "Mijaíl Botvínnik",
   "Garry Kaspárov",
   "Vladímir Kramnik",
   "Levon Aronian"
  ],
  "style": [
   "posicional",
   "universal",
   "hipermoderno"
  ],
  "goal": "Controlar d5 desde el flanco y mantener flexibilidad para transponer a sistemas de 1.d4 o a una Siciliana con colores invertidos.",
  "profile": "Jugador posicional y flexible que disfruta transposiciones.",
  "middlegame": [
   "Expansión b4-b5.",
   "Presión en columna c.",
   "Ataque negro en flanco de rey."
  ],
  "endgames": [
   "Finales con mayoría blanca en flanco de dama."
  ],
  "keyPieces": "Clave: alfil blanco de g2. Peor pieza: caballo blanco de c3 en algunas estructuras.",
  "riskLevel": 2,
  "theoryLoad": 3
 },
 {
  "id": "reti",
  "name": "Apertura Réti",
  "eco": "A04-A09",
  "group": "flancos",
  "type": "flanco",
  "side": "blancas",
  "level": "intermedio",
  "summary": "1.Nf3 y c4: control hipermoderno del centro con piezas. Ideal para jugadores flexibles.",
  "moves": [
   "Nf3",
   "d5",
   "c4",
   "e6",
   "g3",
   "Nf6",
   "Bg2",
   "Be7",
   "O-O",
   "O-O",
   "b3",
   "c5",
   "Bb2",
   "Nc6",
   "e3",
   "b6",
   "Nc3",
   "Bb7"
  ],
  "comments": [
   "Réti: desarrollo flexible.",
   "Centro.",
   "Ataca d5 desde el flanco.",
   "Sólido.",
   "Fianchetto.",
   "Desarrollo.",
   "Gran diagonal.",
   "Desarrollo.",
   "Enroque.",
   "Enroque.",
   "Doble fianchetto.",
   "Espacio.",
   "Alfil en a1-h8.",
   "Desarrollo.",
   "Sólido.",
   "Fianchetto.",
   "Desarrollo.",
   "Alfil en la gran diagonal."
  ],
  "stats": {
   "white": 39,
   "draw": 38,
   "black": 23,
   "popularity": "Media",
   "elo": "Club a élite",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Hipermodernismo: dominar el centro a distancia.",
   "Doble fianchetto.",
   "Transposiciones."
  ],
  "plansWhite": [
   "Presión sobre d5 con cxd5 en el momento justo.",
   "Ruptura d4 o e4 tardía.",
   "Juego posicional prolongado."
  ],
  "plansBlack": [
   "Ocupar el centro con peones.",
   "Evitar quedar sobreextendido.",
   "Ruptura ...e5."
  ],
  "pros": [
   "Muy flexible.",
   "Poca teoría forzada.",
   "Posiciones estratégicas."
  ],
  "cons": [
   "Las negras ocupan el centro.",
   "Menos ventaja de apertura.",
   "Exige comprensión hipermoderna."
  ],
  "structures": "Fianchetto(s) blancos contra centro negro d5-e6 o d5-c6.",
  "variations": [
   {
    "name": "Réti Aceptada",
    "moves": [
     "Nf3",
     "d5",
     "c4",
     "dxc4",
     "e3",
     "Nf6",
     "Bxc4",
     "e6",
     "O-O",
     "c5"
    ],
    "note": "Las negras toman c4."
   },
   {
    "name": "Réti con ...d4",
    "moves": [
     "Nf3",
     "d5",
     "c4",
     "d4",
     "g3",
     "Nc6",
     "Bg2",
     "e5",
     "d3",
     "Nf6",
     "O-O"
    ],
    "note": "Benoni invertida."
   },
   {
    "name": "Ataque Indio de Rey",
    "moves": [
     "Nf3",
     "d5",
     "g3",
     "Nf6",
     "Bg2",
     "c6",
     "O-O",
     "Bg4",
     "d3",
     "Nbd7",
     "Nbd2",
     "e5",
     "e4"
    ],
    "note": "Sistema universal con e4."
   }
  ],
  "traps": [],
  "players": [
   "Richard Réti",
   "Vladímir Kramnik",
   "Magnus Carlsen"
  ],
  "style": [
   "hipermoderno",
   "posicional"
  ],
  "goal": "Controlar el centro a distancia con piezas (fianchettos) y golpearlo con c4. El fin es una lucha estratégica y flexible.",
  "profile": "Jugador hipermoderno, paciente y flexible.",
  "middlegame": [
   "Doble fianchetto.",
   "Ruptura tardía d4/e4.",
   "Presión sobre d5."
  ],
  "endgames": [
   "Finales posicionales igualados."
  ],
  "keyPieces": "Clave: alfiles en b2 y g2. Peor pieza: caballo de b1 hasta su ubicación ideal.",
  "riskLevel": 1,
  "theoryLoad": 2
 },
 {
  "id": "bird",
  "name": "Apertura Bird",
  "eco": "A02-A03",
  "group": "flancos",
  "type": "flanco",
  "side": "blancas",
  "level": "intermedio",
  "summary": "1.f4 controla e5: una Holandesa con colores invertidos y un tiempo extra.",
  "moves": [
   "f4",
   "d5",
   "Nf3",
   "Nf6",
   "e3",
   "g6",
   "Be2",
   "Bg7",
   "O-O",
   "O-O",
   "d3",
   "c5",
   "Qe1",
   "Nc6",
   "Qh4",
   "Re8"
  ],
  "comments": [
   "Bird: control de e5.",
   "Centro.",
   "Desarrollo.",
   "Desarrollo.",
   "Sólido.",
   "Fianchetto.",
   "Desarrollo.",
   "Gran diagonal.",
   "Enroque.",
   "Enroque.",
   "Prepara e4.",
   "Espacio.",
   "Maniobra típica de dama.",
   "Desarrollo.",
   "Dama al ataque.",
   "Prepara ...e5."
  ],
  "stats": {
   "white": 38,
   "draw": 30,
   "black": 32,
   "popularity": "Baja",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Control de e5.",
   "Ataque en flanco de rey (Qe1-h4).",
   "Holandesa invertida."
  ],
  "plansWhite": [
   "Ataque con Qe1-h4, f5.",
   "Ruptura e4.",
   "Control de e5 con Ne5."
  ],
  "plansBlack": [
   "Ruptura ...e5.",
   "Explotar la debilidad de e3.",
   "Gambito From."
  ],
  "pros": [
   "Sorpresa.",
   "Juego en flanco de rey.",
   "Planes claros."
  ],
  "cons": [
   "Debilita el rey blanco.",
   "Gambito From peligroso.",
   "Poco ambiciosa en el centro."
  ],
  "structures": "Peón blanco en f4 controlando e5.",
  "variations": [
   {
    "name": "Gambito From",
    "moves": [
     "f4",
     "e5",
     "fxe5",
     "d6",
     "exd6",
     "Bxd6",
     "Nf3",
     "g5"
    ],
    "note": "Las negras sacrifican un peón para atacar el rey blanco."
   },
   {
    "name": "Leningrado invertida",
    "moves": [
     "f4",
     "d5",
     "Nf3",
     "g6",
     "g3",
     "Bg7",
     "Bg2",
     "Nf6",
     "O-O",
     "O-O",
     "d3",
     "c5"
    ],
    "note": "Doble fianchetto."
   }
  ],
  "traps": [
   {
    "name": "Mate en el Gambito From",
    "moves": [
     "f4",
     "e5",
     "fxe5",
     "d6",
     "exd6",
     "Bxd6",
     "Nc3",
     "Qh4+",
     "g3",
     "Qxg3+",
     "hxg3",
     "Bxg3#"
    ],
    "explanation": "Si las blancas olvidan cubrir la diagonal e1-h4 (con Nf3), el sacrificio de dama termina en mate."
   }
  ],
  "players": [
   "Henry Bird",
   "Bent Larsen",
   "Magnus Carlsen (rápidas)"
  ],
  "style": [
   "agresivo"
  ],
  "goal": "Controlar e5 con el peón f4 y preparar un ataque en flanco de rey: una Holandesa con colores cambiados.",
  "profile": "Jugador original y agresivo que busca sorpresa.",
  "middlegame": [
   "Qe1-h4 y ataque.",
   "Ruptura e4.",
   "Control de e5."
  ],
  "endgames": [
   "Finales con e3 débil: ligera desventaja blanca."
  ],
  "keyPieces": "Clave: peón de f4. Peor pieza: alfil blanco de c1.",
  "riskLevel": 3,
  "theoryLoad": 1
 },
 {
  "id": "larsen",
  "name": "Apertura Larsen (Nimzo-Larsen)",
  "eco": "A01",
  "group": "flancos",
  "type": "flanco",
  "side": "blancas",
  "level": "intermedio",
  "summary": "1.b3 fianchetto de dama inmediato: presión sobre e5 y la gran diagonal. Arma de sorpresa.",
  "moves": [
   "b3",
   "e5",
   "Bb2",
   "Nc6",
   "e3",
   "d5",
   "Bb5",
   "Bd6",
   "Nf3",
   "Qe7",
   "c4",
   "Nf6",
   "Nc3",
   "O-O"
  ],
  "comments": [
   "Larsen.",
   "Centro.",
   "Presión en e5.",
   "Defiende.",
   "Sólido.",
   "Centro.",
   "Clavada indirecta del defensor de e5.",
   "Defiende.",
   "Ataca e5.",
   "Defiende.",
   "Golpea el centro.",
   "Desarrollo.",
   "Desarrollo.",
   "Enroque."
  ],
  "stats": {
   "white": 39,
   "draw": 28,
   "black": 33,
   "popularity": "Baja",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Gran diagonal a1-h8.",
   "Presión sobre e5.",
   "Juego hipermoderno."
  ],
  "plansWhite": [
   "Presión en e5 y g7.",
   "Ruptura f4.",
   "Juego flexible."
  ],
  "plansBlack": [
   "Ocupar el centro.",
   "Cerrar la diagonal con ...d4/...e5.",
   "Desarrollo rápido."
  ],
  "pros": [
   "Sorpresa.",
   "Poca teoría.",
   "Posiciones originales."
  ],
  "cons": [
   "Concede el centro.",
   "Las negras igualan fácilmente.",
   "Poco ambiciosa."
  ],
  "structures": "Fianchetto de dama blanco contra centro negro e5-d5.",
  "variations": [
   {
    "name": "Contra 1...Nf6",
    "moves": [
     "b3",
     "Nf6",
     "Bb2",
     "g6",
     "e4",
     "d6",
     "d4",
     "Bg7"
    ],
    "note": "Las blancas pasan a una estructura de 1.e4."
   },
   {
    "name": "Contra 1...d5",
    "moves": [
     "b3",
     "d5",
     "Bb2",
     "Nf6",
     "e3",
     "Bf5",
     "Nf3",
     "e6",
     "c4"
    ],
    "note": "Sistema tipo Réti."
   }
  ],
  "traps": [],
  "players": [
   "Bent Larsen",
   "Aron Nimzowitsch",
   "Richard Rapport",
   "Hikaru Nakamura"
  ],
  "style": [
   "hipermoderno",
   "universal"
  ],
  "goal": "Fianchetto de dama inmediato para presionar e5 y la gran diagonal; poca teoría y posiciones originales.",
  "profile": "Jugador creativo que quiere salir de la teoría.",
  "middlegame": [
   "Presión sobre e5 y g7.",
   "Ruptura f4.",
   "Juego flexible."
  ],
  "endgames": [
   "Finales igualados."
  ],
  "keyPieces": "Clave: alfil de b2. Peor pieza: alfil blanco de f1.",
  "riskLevel": 2,
  "theoryLoad": 1
 },
 {
  "id": "albin",
  "name": "Contragambito Albin",
  "eco": "D08-D09",
  "group": "d4",
  "type": "gambito",
  "side": "negras",
  "level": "intermedio",
  "summary": "Contra el Gambito de Dama, 2...e5 sacrifica un peón para conseguir una cuña en d4 y juego activo.",
  "moves": [
   "d4",
   "d5",
   "c4",
   "e5",
   "dxe5",
   "d4",
   "Nf3",
   "Nc6",
   "g3",
   "Be6",
   "Nbd2",
   "Qd7",
   "Bg2",
   "Nge7",
   "O-O",
   "Ng6"
  ],
  "comments": [
   "Centro.",
   "Simetría.",
   "Gambito de Dama.",
   "Albin: contragambito.",
   "Acepta.",
   "Cuña en d4.",
   "Desarrollo.",
   "Ataca e5.",
   "Fianchetto.",
   "Desarrollo.",
   "Desarrollo.",
   "Prepara enroque largo.",
   "Gran diagonal.",
   "Caballo hacia g6.",
   "Enroque.",
   "Presión sobre e5."
  ],
  "stats": {
   "white": 46,
   "draw": 26,
   "black": 28,
   "popularity": "Baja",
   "elo": "Club",
   "note": "Porcentajes aproximados de bases magistrales"
  },
  "ideas": [
   "Cuña de peón en d4.",
   "Enroque largo y ataque.",
   "Juego activo con piezas."
  ],
  "plansWhite": [
   "Mantener el peón e5 y atacar d4.",
   "Fianchetto y b4-b5.",
   "Simplificar."
  ],
  "plansBlack": [
   "Enroque largo y ...h5-h4.",
   "Recuperar e5.",
   "Explotar la cuña d4."
  ],
  "pros": [
   "Sorpresa.",
   "Juego activo.",
   "Trampas abundantes."
  ],
  "cons": [
   "Objetivamente dudoso.",
   "Las blancas pueden devolver el peón con ventaja.",
   "Requiere precisión táctica."
  ],
  "structures": "Peón negro en d4 como cuña; peón blanco en e5.",
  "variations": [
   {
    "name": "Línea principal con enroque largo",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e5",
     "dxe5",
     "d4",
     "Nf3",
     "Nc6",
     "Nbd2",
     "Be6",
     "g3",
     "Qd7",
     "Bg2",
     "O-O-O"
    ],
    "note": "Enroques opuestos."
   }
  ],
  "traps": [
   {
    "name": "Trampa Lasker",
    "moves": [
     "d4",
     "d5",
     "c4",
     "e5",
     "dxe5",
     "d4",
     "e3",
     "Bb4+",
     "Bd2",
     "dxe3",
     "Bxb4",
     "exf2+",
     "Ke2",
     "fxg1=N+"
    ],
    "explanation": "Uno de los pocos casos famosos de subpromoción en la apertura: el peón corona en caballo con jaque y gana material."
   }
  ],
  "players": [
   "Adolf Albin",
   "Alexander Morozevich"
  ],
  "style": [
   "gambito",
   "táctico"
  ],
  "goal": "Contra el Gambito de Dama, sacrificar un peón para establecer una cuña en d4 y buscar enroque largo y ataque.",
  "profile": "Jugador táctico con ganas de sorprender.",
  "middlegame": [
   "Enroque largo negro y ataque con h-pawn.",
   "Recuperación de e5.",
   "Cuña d4."
  ],
  "endgames": [
   "Si las blancas mantienen el peón, el final les favorece."
  ],
  "keyPieces": "Clave: peón negro de d4. Peor pieza: alfil negro de f8.",
  "riskLevel": 4,
  "theoryLoad": 2
 },
 {
  "id": "englund",
  "name": "Gambito Englund",
  "eco": "A40",
  "group": "d4",
  "type": "gambito",
  "side": "negras",
  "level": "principiante",
  "summary": "1...e5 contra 1.d4: un gambito dudoso pero lleno de trampas, popular en partidas rápidas.",
  "moves": [
   "d4",
   "e5",
   "dxe5",
   "Nc6",
   "Nf3",
   "Qe7",
   "Bf4",
   "Qb4+",
   "Bd2",
   "Qxb2",
   "Bc3",
   "Bb4"
  ],
  "comments": [
   "Centro.",
   "Englund.",
   "Acepta.",
   "Ataca e5.",
   "Defiende.",
   "Ataca e5 y prepara trampas.",
   "Defiende.",
   "Jaque doble ataque: b2 y f4.",
   "Bloquea.",
   "Gana el peón.",
   "Ataca la dama.",
   "Contraataque: clavada."
  ],
  "stats": {
   "white": 58,
   "draw": 15,
   "black": 27,
   "popularity": "Muy baja",
   "elo": "Aficionado",
   "note": "Porcentajes aproximados; resultados muy desfavorables a nivel magistral"
  },
  "ideas": [
   "Trampas tácticas.",
   "Presión temprana con la dama.",
   "Desarrollo rápido."
  ],
  "plansWhite": [
   "Desarrollo normal y devolver material.",
   "Evitar Qd2??.",
   "Aprovechar el peón extra."
  ],
  "plansBlack": [
   "Tender trampas.",
   "Recuperar e5.",
   "Juego activo."
  ],
  "pros": [
   "Sorpresa.",
   "Trampas mortales.",
   "Divertido en partidas rápidas."
  ],
  "cons": [
   "Objetivamente malo.",
   "Contra jugadores preparados se pierde material.",
   "No enseña buenos hábitos."
  ],
  "structures": "Irregulares; las blancas con peón extra en e5.",
  "variations": [],
  "traps": [
   {
    "name": "Trampa Englund",
    "moves": [
     "d4",
     "e5",
     "dxe5",
     "Nc6",
     "Nf3",
     "Qe7",
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
    "explanation": "7.Qd2?? parece proteger todo, pero tras los cambios la dama negra da mate en c1: la torre de a1 no puede ayudar porque el caballo de b1 la bloquea."
   }
  ],
  "players": [
   "Fritz Carl Anton Englund"
  ],
  "style": [
   "gambito",
   "táctico"
  ],
  "goal": "Tender trampas tácticas desde la primera jugada. No busca ventaja objetiva sino aprovechar errores del rival.",
  "profile": "Jugador aficionado de partidas rápidas.",
  "middlegame": [
   "Trampas con la dama.",
   "Recuperación de e5."
  ],
  "endgames": [
   "Finales con peón menos: desfavorables a las negras."
  ],
  "keyPieces": "Clave: dama negra. Peor pieza: la propia dama si es expulsada.",
  "riskLevel": 5,
  "theoryLoad": 1
 }
];
window.OPENING_STYLES = [
 {
  "id": "abiertas",
  "name": "Aperturas abiertas (1.e4 e5)",
  "html": "<p>Ambos bandos avanzan su peón de rey dos casillas. El centro tiende a abrirse pronto, las piezas se desarrollan con rapidez y los ataques contra f7/f2 son frecuentes.</p><p>Son la escuela clásica: enseñan <b>desarrollo, control del centro y seguridad del rey</b>. Hoy conviven versiones agudas (gambitos) y lentas (Italiana con d3, Española Cerrada).</p>",
  "purpose": "Desarrollo rápido y lucha directa por el centro con piezas activas.",
  "pros": [
   "Principios claros.",
   "Juego de piezas activo.",
   "Excelente para aprender táctica."
  ],
  "cons": [
   "Tendencia a la simetría.",
   "Las negras igualan con facilidad."
  ],
  "forWhom": "Principiantes y jugadores clásicos.",
  "examples": [
   "italiana",
   "espanola",
   "escocesa",
   "petrov",
   "vienesa",
   "dos-caballos"
  ]
 },
 {
  "id": "semiabiertas",
  "name": "Defensas semiabiertas",
  "html": "<p>Las negras responden a 1.e4 con algo distinto de 1...e5 (Siciliana, Francesa, Caro-Kann, Escandinava, Pirc, Alekhine). La estructura es asimétrica: suele quedar una columna semiabierta.</p><p>Crean <b>desequilibrio</b> desde el principio; cada bando tiene planes diferentes.</p>",
  "purpose": "Romper la simetría y obtener juego propio con negras.",
  "pros": [
   "Variedad de estructuras.",
   "Posibilidades de ganar con negras."
  ],
  "cons": [
   "Más teoría.",
   "Algunas son pasivas (Francesa, Caro-Kann) y otras arriesgadas (Siciliana)."
  ],
  "forWhom": "Jugadores que quieren elegir el tipo de lucha con negras.",
  "examples": [
   "siciliana-najdorf",
   "francesa",
   "caro-kann",
   "escandinava",
   "pirc",
   "alekhine"
  ]
 },
 {
  "id": "cerradas",
  "name": "Aperturas cerradas (1.d4 d5)",
  "html": "<p>Ambos bandos avanzan el peón de dama. Las cadenas de peones se cierran, las maniobras son más lentas y la lucha gira en torno a rupturas (c4, ...c5, e4, ...e5).</p><p>Enseñan <b>estrategia, estructuras de peones y planes a largo plazo</b>.</p>",
  "purpose": "Presión estratégica duradera a partir de un centro estable.",
  "pros": [
   "Seguras.",
   "Planes basados en estructuras."
  ],
  "cons": [
   "Menos táctica temprana.",
   "Exigen paciencia."
  ],
  "forWhom": "Jugadores posicionales.",
  "examples": [
   "gambito-dama-rehusado",
   "gambito-dama-aceptado",
   "eslava",
   "semieslava",
   "catalana"
  ]
 },
 {
  "id": "indias",
  "name": "Defensas indias (semicerradas)",
  "html": "<p>Contra 1.d4 las negras juegan 1...Nf6 y retrasan ...d5. Controlan e4 con piezas y a menudo fianquetean un alfil (India de Rey, India de Dama, Nimzo, Grünfeld).</p><p>Nacen de la escuela hipermoderna y ofrecen <b>gran flexibilidad</b>.</p>",
  "purpose": "Controlar el centro con piezas y decidir la estructura más tarde.",
  "pros": [
   "Flexibles.",
   "Desequilibradas."
  ],
  "cons": [
   "Ceden espacio.",
   "Teoría profunda."
  ],
  "forWhom": "Jugadores dinámicos y estratégicos.",
  "examples": [
   "india-rey",
   "nimzo-india",
   "india-dama",
   "grunfeld"
  ]
 },
 {
  "id": "hipermodernas",
  "name": "Aperturas hipermodernas",
  "html": "<p>Escuela de Nimzowitsch, Réti y Breyer en los años 20: el centro no necesita ocuparse con peones; puede <b>controlarse a distancia</b> con piezas (fianchettos) y atacarse después.</p>",
  "purpose": "Provocar un centro rival sobreextendido y destruirlo.",
  "pros": [
   "Contraataque potente.",
   "Posiciones originales."
  ],
  "cons": [
   "Riesgo de quedar aplastado.",
   "Requiere comprensión profunda."
  ],
  "forWhom": "Jugadores creativos y pacientes.",
  "examples": [
   "reti",
   "grunfeld",
   "pirc",
   "alekhine",
   "india-rey",
   "larsen"
  ]
 },
 {
  "id": "flanco",
  "name": "Aperturas de flanco",
  "html": "<p>Las blancas comienzan con un peón lateral o caballo (1.c4, 1.Nf3, 1.f4, 1.b3). Retrasan la definición del centro y se apoyan en transposiciones.</p>",
  "purpose": "Flexibilidad y evitar la teoría principal.",
  "pros": [
   "Evitan preparación rival.",
   "Transposiciones ventajosas."
  ],
  "cons": [
   "Menos ventaja inmediata.",
   "Muchas estructuras distintas."
  ],
  "forWhom": "Jugadores flexibles y posicionales.",
  "examples": [
   "inglesa",
   "reti",
   "bird",
   "larsen"
  ]
 },
 {
  "id": "gambitos",
  "name": "Gambitos",
  "html": "<p>Se sacrifica material (normalmente un peón) a cambio de <b>desarrollo, centro, columnas abiertas o iniciativa</b>. La compensación puede ser inmediata (ataque) o a largo plazo (Benko).</p>",
  "purpose": "Transformar material en tiempo y actividad.",
  "pros": [
   "Iniciativa.",
   "Factor sorpresa."
  ],
  "cons": [
   "Si la compensación se agota, se pierde el material.",
   "Algunos son objetivamente dudosos."
  ],
  "forWhom": "Atacantes y jugadores de partidas rápidas.",
  "examples": [
   "gambito-rey",
   "benko",
   "albin",
   "englund",
   "siciliana-alapin"
  ]
 },
 {
  "id": "sistemas",
  "name": "Sistemas universales",
  "html": "<p>Esquemas que se juegan casi igual contra cualquier respuesta: Londres, Colle, Ataque Indio de Rey, Inglés cerrado (estructura Botvínnik). Reducen la teoría a cambio de menos ambición.</p>",
  "purpose": "Llegar a posiciones conocidas con poco estudio de teoría.",
  "pros": [
   "Poca memoria.",
   "Planes repetibles."
  ],
  "cons": [
   "Predecibles.",
   "Ventaja objetiva pequeña."
  ],
  "forWhom": "Jugadores con poco tiempo de estudio.",
  "examples": [
   "londres",
   "reti",
   "inglesa",
   "bird"
  ]
 },
 {
  "id": "contraataque",
  "name": "Defensas de contraataque",
  "html": "<p>Las negras crean un desequilibrio deliberado (Siciliana, Benoni, Holandesa, India de Rey, Dragón) para <b>jugar a ganar</b>. Aceptan riesgo e inferioridad temporal a cambio de contrajuego.</p>",
  "purpose": "Ganar con negras mediante desequilibrio.",
  "pros": [
   "Posibilidades de victoria.",
   "Iniciativa."
  ],
  "cons": [
   "Riesgo alto.",
   "Exigen precisión."
  ],
  "forWhom": "Jugadores combativos.",
  "examples": [
   "siciliana-najdorf",
   "siciliana-dragon",
   "benoni",
   "holandesa",
   "india-rey"
  ]
 },
 {
  "id": "fortaleza",
  "name": "Defensas sólidas / de fortaleza",
  "html": "<p>Buscan una estructura sin debilidades y la igualdad segura: Caro-Kann, Eslava, Berlín, Petrov, Gambito de Dama Rehusado. Su objetivo principal es <b>no perder</b> y aprovechar los excesos rivales.</p>",
  "purpose": "Neutralizar la ventaja de las blancas con seguridad.",
  "pros": [
   "Seguras.",
   "Buenas en finales."
  ],
  "cons": [
   "Pocas posibilidades de ganar.",
   "Pueden ser pasivas."
  ],
  "forWhom": "Jugadores sólidos y finalistas.",
  "examples": [
   "caro-kann",
   "eslava",
   "petrov",
   "gambito-dama-rehusado",
   "espanola"
  ]
 }
];
window.STRATEGY_ELEMENTS = [
 {
  "id": "material",
  "name": "Material",
  "html": "<p>Valor de las piezas (peón 1, caballo/alfil 3, torre 5, dama 9). Es el elemento más concreto, pero puede compensarse con otros factores.</p>",
  "exploit": [
   "Simplifica cambiando piezas, no peones.",
   "Evita contrajuego.",
   "Avanza hacia el final."
  ],
  "defend": [
   "Busca compensación (actividad, iniciativa).",
   "Evita cambios.",
   "Crea complicaciones."
  ],
  "openings": [
   "gambito-rey",
   "benko",
   "englund"
  ],
  "tip": "Antes de aceptar un gambito, evalúa si podrás neutralizar la compensación."
 },
 {
  "id": "desarrollo",
  "name": "Desarrollo y tiempo",
  "html": "<p>Número de piezas activas. Una ventaja de desarrollo es temporal: hay que usarla antes de que el rival se ponga al día.</p>",
  "exploit": [
   "Abre la posición.",
   "Ataca rápido.",
   "Evita que el rival enroque."
  ],
  "defend": [
   "Cierra la posición.",
   "Simplifica.",
   "Enroca rápido."
  ],
  "openings": [
   "dos-caballos",
   "gambito-rey",
   "escocesa"
  ],
  "tip": "Ventaja de tiempo → juego abierto y rápido."
 },
 {
  "id": "centro",
  "name": "Centro",
  "html": "<p>Control de e4, d4, e5, d5. Quien domina el centro tiene más movilidad.</p>",
  "exploit": [
   "Avanza peones centrales.",
   "Restringe al rival."
  ],
  "defend": [
   "Ataca la base del centro.",
   "Rupturas laterales."
  ],
  "openings": [
   "italiana",
   "grunfeld",
   "pirc",
   "alekhine"
  ],
  "tip": "Un centro fuerte vale más si está apoyado por piezas."
 },
 {
  "id": "espacio",
  "name": "Espacio",
  "html": "<p>Territorio controlado detrás de tus peones. Permite maniobrar.</p>",
  "exploit": [
   "Evita cambios.",
   "Prepara rupturas."
  ],
  "defend": [
   "Cambia piezas.",
   "Rupturas liberadoras."
  ],
  "openings": [
   "india-rey",
   "francesa",
   "benoni"
  ],
  "tip": "Con poco espacio, cambia piezas."
 },
 {
  "id": "estructura",
  "name": "Estructura de peones",
  "html": "<p>Peones aislados, doblados, retrasados, colgantes y cadenas. Define planes a largo plazo.</p>",
  "exploit": [
   "Ataca debilidades.",
   "Bloquea peones débiles."
  ],
  "defend": [
   "Busca actividad dinámica.",
   "Disuelve debilidades."
  ],
  "openings": [
   "nimzo-india",
   "gambito-dama-rehusado",
   "francesa"
  ],
  "tip": "Las debilidades estructurales importan más en el final."
 },
 {
  "id": "pasados",
  "name": "Peones pasados",
  "html": "<p>Peones sin oposición. Son decisivos en finales.</p>",
  "exploit": [
   "Avánzalos.",
   "Apóyalos con piezas."
  ],
  "defend": [
   "Bloquéalos (con caballo).",
   "Contraataca."
  ],
  "openings": [
   "grunfeld",
   "semieslava"
  ],
  "tip": "Un peón pasado protegido y lejano vale mucho."
 },
 {
  "id": "rey",
  "name": "Seguridad del rey",
  "html": "<p>Protección del rey: enroque, escudo de peones, piezas defensoras.</p>",
  "exploit": [
   "Abre líneas.",
   "Sacrificios."
  ],
  "defend": [
   "Cambia atacantes.",
   "No avances peones del enroque."
  ],
  "openings": [
   "siciliana-dragon",
   "india-rey",
   "gambito-rey"
  ],
  "tip": "En enroques opuestos, la velocidad es todo."
 },
 {
  "id": "actividad",
  "name": "Actividad y coordinación de piezas",
  "html": "<p>Piezas activas y coordinadas valen más que piezas pasivas.</p>",
  "exploit": [
   "Mejora la peor pieza.",
   "Ataca objetivos."
  ],
  "defend": [
   "Cambia piezas activas rivales."
  ],
  "openings": [
   "escocesa",
   "dos-caballos"
  ],
  "tip": "Pregúntate: ¿cuál es mi peor pieza?"
 },
 {
  "id": "iniciativa",
  "name": "Iniciativa",
  "html": "<p>Capacidad de imponer amenazas. Es un elemento dinámico que se pierde si no se usa.</p>",
  "exploit": [
   "Mantén amenazas.",
   "No permitas consolidar."
  ],
  "defend": [
   "Neutraliza amenazas.",
   "Devuelve material."
  ],
  "openings": [
   "gambito-rey",
   "benko",
   "siciliana-najdorf"
  ],
  "tip": "Con iniciativa, juega rápido."
 },
 {
  "id": "casillas",
  "name": "Casillas débiles y puestos avanzados",
  "html": "<p>Casillas que no pueden ser defendidas por peones.</p>",
  "exploit": [
   "Ocupa con caballos."
  ],
  "defend": [
   "Cambia la pieza ocupante."
  ],
  "openings": [
   "siciliana-sveshnikov",
   "siciliana-najdorf",
   "holandesa"
  ],
  "tip": "Un caballo en un puesto avanzado puede valer una torre."
 },
 {
  "id": "columnas",
  "name": "Columnas y filas abiertas",
  "html": "<p>Las torres necesitan columnas abiertas.</p>",
  "exploit": [
   "Dobla torres.",
   "Invade la 7.ª fila."
  ],
  "defend": [
   "Disputa la columna."
  ],
  "openings": [
   "benko",
   "siciliana-alapin"
  ],
  "tip": "Ocupa primero la columna abierta."
 },
 {
  "id": "alfiles",
  "name": "Pareja de alfiles / alfil vs caballo",
  "html": "<p>Los alfiles brillan en posiciones abiertas; los caballos en cerradas.</p>",
  "exploit": [
   "Abre la posición."
  ],
  "defend": [
   "Mantén la posición cerrada."
  ],
  "openings": [
   "nimzo-india",
   "espanola",
   "siciliana-sveshnikov"
  ],
  "tip": "Con caballos, cierra la posición."
 },
 {
  "id": "alfil-malo",
  "name": "Alfil bueno y alfil malo",
  "html": "<p>Un alfil es malo si sus peones están en casillas de su color.</p>",
  "exploit": [
   "Fija peones del rival en casillas de su alfil."
  ],
  "defend": [
   "Cambia el alfil malo."
  ],
  "openings": [
   "francesa",
   "gambito-dama-rehusado",
   "holandesa"
  ],
  "tip": "Coloca tus peones en casillas de color opuesto a tu alfil."
 },
 {
  "id": "profilaxis",
  "name": "Profilaxis",
  "html": "<p>Impedir los planes del rival antes de ejecutar los propios.</p>",
  "exploit": [
   "Restringe al rival."
  ],
  "defend": [
   "Anticipa amenazas."
  ],
  "openings": [
   "catalana",
   "espanola"
  ],
  "tip": "Pregúntate: ¿qué quiere hacer mi rival?"
 },
 {
  "id": "cambios",
  "name": "Cambios y transición al final",
  "html": "<p>Saber cuándo cambiar piezas y entrar en un final favorable.</p>",
  "exploit": [
   "Simplifica con ventaja."
  ],
  "defend": [
   "Evita finales malos."
  ],
  "openings": [
   "espanola",
   "petrov",
   "caro-kann"
  ],
  "tip": "Cambia cuando tienes ventaja material o estructural."
 },
 {
  "id": "reloj",
  "name": "Gestión del reloj",
  "html": "<p>El tiempo es un recurso; gestionar bien el reloj evita errores en apuros.</p>",
  "exploit": [
   "Presiona al rival en apuros."
  ],
  "defend": [
   "Juega rápido lo conocido."
  ],
  "openings": [
   "londres",
   "reti"
  ],
  "tip": "Ahorra tiempo en la apertura conociendo tu repertorio."
 },
 {
  "id": "psicologia",
  "name": "Estilo del rival (psicología)",
  "html": "<p>Adaptar la estrategia al estilo y nivel del rival.</p>",
  "exploit": [
   "Lleva al rival a posiciones incómodas."
  ],
  "defend": [
   "Mantén la calma."
  ],
  "openings": [
   "englund",
   "bird",
   "larsen"
  ],
  "tip": "Contra un atacante, busca posiciones cerradas; contra un posicional, complicaciones."
 }
];
window.STRATEGY_BUILDER = [
 {
  "id": "agresivo",
  "name": "Agresivo",
  "description": "Busca la iniciativa y el ataque al rey desde la apertura.",
  "white": [
   "italiana",
   "gambito-rey",
   "vienesa"
  ],
  "vsE4": [
   "siciliana-dragon",
   "siciliana-najdorf"
  ],
  "vsD4": [
   "india-rey",
   "holandesa",
   "benoni"
  ],
  "plans": [
   "Enroques opuestos y avalanchas de peones.",
   "Sacrificios para abrir el rey."
  ],
  "endgameAttitude": "Evita finales: busca decidir en el medio juego.",
  "training": [
   "Táctica diaria.",
   "Cálculo de variantes."
  ],
  "famous": [
   "Mijaíl Tal",
   "Garry Kaspárov",
   "Alexei Shirov"
  ]
 },
 {
  "id": "posicional",
  "name": "Posicional",
  "description": "Acumula pequeñas ventajas y presiona a largo plazo.",
  "white": [
   "espanola",
   "catalana",
   "inglesa"
  ],
  "vsE4": [
   "caro-kann",
   "francesa"
  ],
  "vsD4": [
   "nimzo-india",
   "gambito-dama-rehusado"
  ],
  "plans": [
   "Mejorar la peor pieza.",
   "Explotar debilidades estructurales."
  ],
  "endgameAttitude": "Busca finales con ventaja estructural.",
  "training": [
   "Estructuras de peones.",
   "Finales técnicos."
  ],
  "famous": [
   "Anatoli Kárpov",
   "Tigran Petrosián",
   "Magnus Carlsen"
  ]
 },
 {
  "id": "solido",
  "name": "Sólido",
  "description": "Prioriza la seguridad y la igualdad fiable.",
  "white": [
   "londres",
   "reti",
   "catalana"
  ],
  "vsE4": [
   "petrov",
   "caro-kann",
   "espanola"
  ],
  "vsD4": [
   "eslava",
   "gambito-dama-rehusado",
   "india-dama"
  ],
  "plans": [
   "Simplificar.",
   "Profilaxis."
  ],
  "endgameAttitude": "Busca finales iguales o ligeramente favorables.",
  "training": [
   "Finales.",
   "Defensa."
  ],
  "famous": [
   "Vladímir Kramnik",
   "Anish Giri"
  ]
 },
 {
  "id": "tactico",
  "name": "Táctico",
  "description": "Prefiere posiciones con complicaciones y cálculo.",
  "white": [
   "escocesa",
   "vienesa",
   "gambito-rey"
  ],
  "vsE4": [
   "dos-caballos",
   "siciliana-dragon"
  ],
  "vsD4": [
   "semieslava",
   "grunfeld",
   "albin"
  ],
  "plans": [
   "Buscar combinaciones.",
   "Mantener la tensión."
  ],
  "endgameAttitude": "Usa la táctica también en finales.",
  "training": [
   "Puzles.",
   "Cálculo."
  ],
  "famous": [
   "Mijaíl Tal",
   "Hikaru Nakamura"
  ]
 },
 {
  "id": "universal",
  "name": "Universal",
  "description": "Se adapta a cualquier tipo de posición.",
  "white": [
   "italiana",
   "inglesa",
   "reti"
  ],
  "vsE4": [
   "siciliana-taimanov",
   "espanola"
  ],
  "vsD4": [
   "nimzo-india",
   "catalana"
  ],
  "plans": [
   "Cambiar de plan según la posición."
  ],
  "endgameAttitude": "Igual de cómodo en finales.",
  "training": [
   "Todo equilibrado."
  ],
  "famous": [
   "Magnus Carlsen",
   "Viswanathan Anand",
   "Borís Spasski"
  ]
 },
 {
  "id": "contraatacante",
  "name": "Contraatacante",
  "description": "Cede la iniciativa para contragolpear.",
  "white": [
   "larsen",
   "bird",
   "reti"
  ],
  "vsE4": [
   "pirc",
   "alekhine",
   "siciliana-najdorf"
  ],
  "vsD4": [
   "grunfeld",
   "benoni",
   "benko"
  ],
  "plans": [
   "Provocar sobreextensión.",
   "Golpear en el momento justo."
  ],
  "endgameAttitude": "Aprovecha debilidades creadas por el rival.",
  "training": [
   "Defensa.",
   "Cálculo."
  ],
  "famous": [
   "Bent Larsen",
   "Viktor Korchnói"
  ]
 }
];
