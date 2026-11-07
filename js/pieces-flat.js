/* Juego de piezas «Plano»: diseño original de Ajedrez Pro (formas geométricas simples, color plano y contorno grueso). */
(function () {
  const C = {
    w: { f: '#fbfaf8', s: '#3c3a38', sh: '#e3e0dc', d: '#3c3a38' },
    b: { f: '#5a5754', s: '#1e1c1b', sh: '#4a4745', d: '#cfcbc6' }
  };
  const base = (c) => `<path d="M24 89 Q24 80 32 79 L68 79 Q76 80 76 89 Z" fill="${c.f}"/><path d="M26 86 L74 86" stroke="${c.sh}" stroke-width="3"/>`;
  const SH = {
    p: (c) => `${base(c)}<path d="M35 79 C37 66 41 58 44 52 L56 52 C59 58 63 66 65 79 Z" fill="${c.f}"/><rect x="37" y="46" width="26" height="7" rx="3.5" fill="${c.f}"/><circle cx="50" cy="33" r="14" fill="${c.f}"/><path d="M44 70 C45 64 47 60 48 57" stroke="${c.sh}" stroke-width="3" fill="none"/>`,
    r: (c) => `${base(c)}<path d="M34 79 L37 44 L63 44 L66 79 Z" fill="${c.f}"/><path d="M29 44 L29 20 L39 20 L39 28 L45.5 28 L45.5 20 L54.5 20 L54.5 28 L61 28 L61 20 L71 20 L71 44 Z" fill="${c.f}"/><path d="M33 44 L67 44" stroke="${c.s}" stroke-width="3.5"/><path d="M40 72 L41.5 52" stroke="${c.sh}" stroke-width="3" fill="none"/>`,
    b: (c) => `${base(c)}<path d="M38 79 L41 68 L59 68 L62 79 Z" fill="${c.f}"/><rect x="35" y="63" width="30" height="7" rx="3.5" fill="${c.f}"/><path d="M50 18 C66 31 67 50 59 63 L41 63 C33 50 34 31 50 18 Z" fill="${c.f}"/><circle cx="50" cy="13" r="5.5" fill="${c.f}"/><path d="M56 31 L47 42" stroke="${c.d}" stroke-width="4" stroke-linecap="round"/><path d="M43 56 C40 48 40 40 43 33" stroke="${c.sh}" stroke-width="3" fill="none"/>`,
    n: (c) => `${base(c)}<path d="M68 79 L33 79 C32 67 37 60 46 53 C40 56 32 58 27 54 C22 50 24 43 30 39 L43 27 C44 21 48 16 52 13 L54 19 C66 21 75 33 73 50 C72 61 69 70 68 79 Z" fill="${c.f}"/><path d="M54 19 C64 24 69 36 67 50 C66 60 64 69 63 76" stroke="${c.sh}" stroke-width="3.5" fill="none"/><circle cx="46" cy="30" r="2.8" fill="${c.d}" stroke="none"/><path d="M30 48 L33 46" stroke="${c.d}" stroke-width="3" stroke-linecap="round"/>`,
    q: (c) => `${base(c)}<path d="M33 79 L36 70 L64 70 L67 79 Z" fill="${c.f}"/><path d="M31 70 L24 35 L38 52 L50 28 L62 52 L76 35 L69 70 Z" fill="${c.f}"/><circle cx="24" cy="32" r="5.5" fill="${c.f}"/><circle cx="50" cy="23" r="5.5" fill="${c.f}"/><circle cx="76" cy="32" r="5.5" fill="${c.f}"/><path d="M34 62 L66 62" stroke="${c.sh}" stroke-width="3"/>`,
    k: (c) => `${base(c)}<path d="M33 79 L36 70 L64 70 L67 79 Z" fill="${c.f}"/><path d="M31 70 C25 54 29 39 50 39 C71 39 75 54 69 70 Z" fill="${c.f}"/><path d="M46 39 L46 25 L39 25 L39 18 L46 18 L46 9 L54 9 L54 18 L61 18 L61 25 L54 25 L54 39 Z" fill="${c.f}"/><path d="M50 44 L50 66" stroke="${c.sh}" stroke-width="3"/><path d="M35 62 L65 62" stroke="${c.sh}" stroke-width="3"/>`
  };
  const svg = (col, t) => { const c = C[col]; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 6 76 88"><g stroke="${c.s}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${SH[t](c)}</g></svg>`; };
  const set = {}; for (const col of ['w', 'b']) for (const t of 'pnbrqk') set[col + t] = svg(col, t);
  window.PIECE_SETS = window.PIECE_SETS || {}; window.PIECE_SETS.plano = set;
  let pick = 'plano'; try { const st = JSON.parse(localStorage.getItem('ajedrezpro_v1') || '{}'); if (st.settings && st.settings.pieces) pick = st.settings.pieces; } catch (e) { }
  if (window.PIECE_SETS[pick]) window.PIECE_SVG = window.PIECE_SETS[pick];
})();
