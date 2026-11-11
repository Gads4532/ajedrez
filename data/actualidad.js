/* Actualidad del ajedrez: campeones vigentes, próximos títulos, ranking y tendencias.
   Redacción propia a partir de los datos publicados por FIDE y la prensa especializada (fuentes al final).
   Actualizar «updated» y los bloques cada vez que haya novedades. */
window.ACTUALIDAD = {
  updated: '10 de noviembre de 2026',
  next: [
    {
      title: 'Campeonato del Mundo 2026: Gukesh – Sindarov',
      when: 'Desde el 24 de noviembre de 2026 (unas tres semanas)',
      where: 'Fondation Martin Bodmer, Cologny (Ginebra, Suiza)',
      html: '<p>El campeón vigente, <b>Gukesh Dommaraju</b> (India), defiende el título ante <b>Javokhir Sindarov</b> (Uzbekistán). Son 14 partidas clásicas: gana quien llegue primero a 7,5 puntos; si hay empate a 7, se juegan desempates rápidos. La bolsa es de 2,5 millones de dólares.</p><p>Es el primer Mundial que se juega en Suiza desde Brissago 2004. Sindarov llega en el mejor momento de su carrera: ganó la Copa del Mundo 2025 y el Torneo de Candidatos 2026, y en la lista FIDE de noviembre tiene 2782 frente a los 2710 de Gukesh. Gukesh, en cambio, ya sabe lo que es ganar un match por el título.</p>'
    },
    {
      title: 'Campeonato del Mundo femenino: Ju Wenjun – Vaishali',
      when: 'Fecha por confirmar',
      where: 'Por confirmar',
      html: '<p><b>Ju Wenjun</b> (China), campeona desde 2018, defenderá la corona ante la india <b>R. Vaishali</b>, que ganó el Torneo de Candidatas 2026 con 8,5/14.</p>'
    }
  ],
  champions: [
    { title: 'Campeón del mundo (clásico)', who: 'Gukesh Dommaraju', flag: 'India', note: 'Ganó el título en 2024 ante Ding Liren (7,5–6,5), con 18 años: el campeón más joven de la historia.' },
    { title: 'Campeona del mundo (clásico)', who: 'Ju Wenjun', flag: 'China', note: 'Campeona desde 2018; defiende el título ante Vaishali.' },
    { title: 'Campeón del mundo de rápidas', who: 'Magnus Carlsen', flag: 'Noruega', note: 'Doha 2025, con 10,5/13. Es su sexto título mundial de rápidas.' },
    { title: 'Campeón del mundo de blitz', who: 'Magnus Carlsen', flag: 'Noruega', note: 'Doha 2025, tras una gran remontada. Es su noveno título mundial de blitz.' },
    { title: 'Campeona del mundo de rápidas', who: 'Aleksandra Goryachkina', flag: 'FIDE', note: 'Doha 2025: ganó el desempate a Zhu Jiner.' },
    { title: 'Campeona del mundo de blitz', who: 'Bibisara Assaubayeva', flag: 'Kazajistán', note: 'Doha 2025. Es su tercer título mundial de blitz.' },
    { title: 'Campeón del mundo de ajedrez libre (Freestyle / 960)', who: 'Magnus Carlsen', flag: 'Noruega', note: 'Primer Mundial oficial de FIDE en esta modalidad (Weissenhaus, febrero de 2026): venció a Fabiano Caruana 2,5–1,5 en la final.' },
    { title: 'Copa del Mundo FIDE 2025', who: 'Javokhir Sindarov', flag: 'Uzbekistán', note: 'Goa, India. A los 19 años es el ganador más joven de la Copa; venció a Wei Yi en los desempates.' },
    { title: 'Torneo de Candidatos 2026', who: 'Javokhir Sindarov', flag: 'Uzbekistán', note: 'Chipre, abril de 2026: 10/14 sin perder ni una partida, un récord de puntos en el torneo. Segundo, Anish Giri.' },
    { title: 'Olimpiada de Ajedrez 2026 (abierto)', who: 'Uzbekistán', flag: 'Uzbekistán', note: 'Samarcanda, en casa. Plata para India y bronce para Alemania.' },
    { title: 'Olimpiada de Ajedrez 2026 (femenino)', who: 'China', flag: 'China', note: 'Séptimo título olímpico de China y el primero desde 2018. Plata para Kazajistán y bronce para India.' },
    { title: 'Esports World Cup 2026 (ajedrez)', who: 'Magnus Carlsen', flag: 'Noruega', note: 'París, agosto de 2026: retuvo el título sin perder una partida y ganó la final a Denis Lazavik.' }
  ],
  ranking: {
    title: 'Lista FIDE de noviembre de 2026 (clásico)',
    note: 'Puestos confirmados en la lista de noviembre. Consulta la lista completa en ratings.fide.com.',
    open: [
      ['1', 'Magnus Carlsen', 'Noruega', 2823],
      ['2', 'Hikaru Nakamura', 'EE. UU.', 2792],
      ['3', 'Fabiano Caruana', 'EE. UU.', 2783],
      ['4', 'Javokhir Sindarov', 'Uzbekistán', 2782],
      ['5', 'Nodirbek Abdusattorov', 'Uzbekistán', 2772],
      ['6', 'Wesley So', 'EE. UU.', 2771],
      ['10', 'Alireza Firouzja', 'Francia', 2757],
      ['26', 'Gukesh Dommaraju (campeón)', 'India', 2710]
    ],
    women: [
      ['1', 'Hou Yifan', 'China', 2596],
      ['2', 'Ju Wenjun', 'China', 2553],
      ['3', 'Lei Tingjie', 'China', 2552],
      ['4', 'Zhu Jiner', 'China', 2550]
    ]
  },
  trends: [
    { title: 'La nueva generación ya manda', html: '<p>El ajedrez de élite se ha rejuvenecido como nunca. Gukesh fue campeón con 18 años y Sindarov ganó la Copa del Mundo con 19. Abdusattorov, Praggnanandhaa, Erigaisi y Keymer ya están en la élite. <b>Uzbekistán</b> e <b>India</b> se han convertido en potencias: Uzbekistán ganó la Olimpiada de 2026 en casa e India subió al podio en las dos categorías.</p>' },
    { title: 'El auge del ajedrez libre (Freestyle / Chess960)', html: '<p>En el ajedrez libre, las piezas de la primera fila se colocan al azar (960 posiciones posibles) y la preparación de aperturas memorizada pierde valor. En 2026 FIDE celebró su primer Mundial oficial de esta modalidad, que ganó Carlsen. Para el aficionado es una forma excelente de entrenar la comprensión pura: desarrollar, controlar el centro y poner el rey a salvo sin «teoría».</p>' },
    { title: 'Motores con redes neuronales', html: '<p>Stockfish (con red NNUE, el mismo que usa esta app) y Leela Chess Zero juegan muy por encima de cualquier humano. Los profesionales los usan para preparar aperturas y revisar sus partidas. Han cambiado la forma de entender el juego: ahora se valoran más los avances tempranos del peón h, los sacrificios de peón por iniciativa y la actividad de las piezas por encima de la estructura.</p>' },
    { title: 'Aperturas de moda', html: '<p>A todos los niveles se ven mucho los sistemas fáciles de aprender y con ideas claras: el <b>Sistema Londres</b> (también su versión Jobava, con <span class="mv">Nc3</span>), la <b>Catalana</b>, la <b>Italiana</b> lenta con <span class="mv">c3</span> y <span class="mv">d3</span>, y el <b>Anti-Marshall</b> en la Ruy López. Con negras, la <b>Berlinesa</b> y la <b>Petrov</b> son las defensas sólidas de la élite, y la <b>Siciliana</b> sigue siendo el arma para jugar a ganar. En la sección Aperturas tienes todas ellas.</p>' },
    { title: 'Más partidas rápidas y online', html: '<p>Gran parte del ajedrez profesional se juega ya en ritmos rápidos y online: circuitos con transmisión en vivo, la Esports World Cup y los torneos de partidas rápidas. Para el aficionado, la recomendación de los entrenadores sigue siendo la misma: el blitz divierte, pero <b>se mejora con partidas lentas, puzles y su análisis</b>.</p>' },
    { title: 'Juego limpio', html: '<p>Con el auge del ajedrez online, FIDE y las plataformas han reforzado los sistemas contra las trampas: análisis estadístico de las jugadas, cámaras en los torneos online importantes y retrasos en las transmisiones. En los torneos presenciales de élite ya es habitual revisar a los jugadores con detectores.</p>' }
  ],
  sources: [
    ['Campeonato del Mundo 2026 (Wikipedia)', 'https://en.wikipedia.org/wiki/World_Chess_Championship_2026'],
    ['Geneva to host Gukesh vs. Sindarov (ESPN)', 'https://www.espn.com/chess/story/_/id/49469254/geneva-host-gukesh-vs-sindarov-world-chess-championship-match'],
    ['Lista FIDE de noviembre de 2026 (Chess.com)', 'https://www.chess.com/news/view/november-2026-fide-rating-list'],
    ['Candidates Tournament 2026 (Wikipedia)', 'https://en.wikipedia.org/wiki/Candidates_Tournament_2026'],
    ["Women's Candidates Tournament 2026 (Wikipedia)", 'https://en.wikipedia.org/wiki/Women%27s_Candidates_Tournament_2026'],
    ['Mundial de rápidas y blitz 2025 (ChessBase)', 'https://en.chessbase.com/post/world-rapid-blitz-2025-5'],
    ['Copa del Mundo 2025 (FIDE)', 'https://www.fide.com/javokhir-sindarov-crowned-2025-fide-world-cup-champion/'],
    ['Mundial Freestyle 2026 (FIDE)', 'https://www.fide.com/magnus-carlsen-wins-2026-fide-freestyle-world-championship/'],
    ['46.ª Olimpiada de Ajedrez (Wikipedia)', 'https://en.wikipedia.org/wiki/46th_Chess_Olympiad'],
    ['Esports World Cup 2026 (CNN)', 'https://www.cnn.com/2026/08/18/sport/magnus-carlsen-esports-world-cup-2026-chess']
  ]
};
