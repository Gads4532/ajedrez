/* Juego de piezas «Pro»: diseño original de Ajedrez Pro. Siluetas robustas con volumen
   (sombra lateral, brillo y contorno fino), pensadas para el tablero verde y crema.
   Las piezas simétricas se generan a partir de su perfil derecho, que se refleja. */
(function () {
  const C = {
    w: { f: '#f8f7f4', sh: '#d3cec7', hi: '#ffffff', s: '#57534e', d: '#57534e' },
    b: { f: '#56524e', sh: '#3b3835', hi: '#79746f', s: '#262321', d: '#d9d4cd' }
  };
  const r1 = (n) => Math.round(n * 10) / 10;
  const mir = (p) => [100 - p[0], p[1]];
  const loop = (right) => right.concat(right.slice(1, -1).reverse().map(mir));
  const poly = (pts) => 'M' + pts.map(p => r1(p[0]) + ' ' + r1(p[1])).join('L') + 'Z';
  // Catmull-Rom cerrado → curvas Bézier suaves
  const smooth = (pts) => {
    const n = pts.length; let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`;
    }
    return d + 'Z';
  };
  const inward = (pts, k) => pts.map(p => [50 + (p[0] - 50) * k, p[1]]);
  // Una pieza simétrica: relleno, sombra a la derecha, brillo a la izquierda y contorno.
  const part = (right, c, sharp) => {
    const path = sharp ? poly : smooth;
    const out = path(loop(right));
    const inner = right.slice(1, -1);
    let s = `<path d="${out}" fill="${c.f}" stroke="none"/>`;
    if (inner.length) {
      const shade = inner.concat(inward(inner, 0.42).reverse());
      s += `<path d="${sharp ? poly(shade) : smooth(shade)}" fill="${c.sh}" stroke="none"/>`;
      if (!sharp) {
        const hl = inward(inner, -0.78).concat(inward(inner, -0.6).reverse());
        s += `<path d="${smooth(hl)}" fill="${c.hi}" stroke="none" opacity=".75"/>`;
      }
    }
    return s + `<path d="${out}" fill="none"/>`;
  };
  const ball = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.f}"/><path d="M${x + r * 0.15} ${y - r * 0.98}A${r} ${r} 0 0 1 ${x + r * 0.15} ${y + r * 0.98}A${r * 0.62} ${r} 0 0 0 ${x + r * 0.15} ${y - r * 0.98}Z" fill="${c.sh}" stroke="none"/><circle cx="${x - r * 0.42}" cy="${y - r * 0.4}" r="${r * 0.22}" fill="${c.hi}" stroke="none" opacity=".8"/><circle cx="${x}" cy="${y}" r="${r}" fill="none"/>`;
  const base = (c) => part([[50, 79], [70, 79], [74, 82.5], [74, 89], [50, 89]], c, true);
  const foot = (c, w) => part([[50, 71], [w, 71], [w + 4, 79], [50, 79]], c, true);
  const band = (c, y, w) => part([[50, y], [w, y], [w + 2.5, y + 3.5], [w, y + 7], [50, y + 7]], c);

  const SH = {
    p: (c) => part([[50, 44], [56, 47], [58.5, 56], [61.5, 67], [68, 80], [50, 82]], c)
      + band(c, 42, 60.5) + ball(50, 30.5, 12.5, c) + base(c),
    r: (c) => part([[50, 38], [63, 38], [64.5, 60], [66.5, 76], [50, 77]], c)
      + part([[50, 15], [56, 15], [56, 23], [63, 23], [63, 15], [72, 15], [72, 31], [65, 39], [50, 39]], c, true)
      + `<path d="M35 39L65 39" fill="none"/>`
      + band(c, 72, 67) + base(c),
    b: (c) => foot(c, 61)
      + part([[50, 19], [57.5, 26], [63.5, 38], [63, 50], [58, 60], [50, 63]], c)
      + band(c, 60, 62) + ball(50, 15, 5.5, c)
      + `<path d="M57.5 29L48.5 40.5" stroke="${c.d}" stroke-width="3.6" fill="none"/>`
      + base(c),
    n: (c) => {
      const out = 'M33.5 79C32.5 68 37.5 60 46.5 54C40.5 57 32.5 59.5 27.5 55.5C22.5 51.5 23.5 45 28.5 40.5L41.5 29C42.5 23 46.5 17.5 51 14.5L54 20.5C67 22.5 75.5 35 73.5 52C72.5 63 69.5 71 68.5 79Z';
      const sh = 'M54 20.5C67 22.5 75.5 35 73.5 52C72.5 63 69.5 71 68.5 79L60 79C62 70 64.5 62 65.5 52C66.5 38 61.5 28 54 20.5Z';
      const hi = 'M29.5 46C30 43.5 32 41.5 34 40L43.5 31.5C44.5 26.5 46.5 22.5 49.5 19.5L50.5 21.5C48 24.5 46.5 28 45.8 32.5L36 41.5C33.5 43.5 31.5 45 29.5 46Z';
      return `<path d="${out}" fill="${c.f}" stroke="none"/><path d="${sh}" fill="${c.sh}" stroke="none"/><path d="${hi}" fill="${c.hi}" stroke="none" opacity=".75"/><path d="${out}" fill="none"/>`
        + `<circle cx="45" cy="31" r="2.7" fill="${c.d}" stroke="none"/><path d="M29.5 49.5L32.5 47.5" stroke="${c.d}" stroke-width="3" fill="none"/>`
        + `<path d="M55 25C61 30 63.5 38 63 47" stroke="${c.f === '#f8f7f4' ? '#bdb7ae' : '#2e2b29'}" stroke-width="2.6" fill="none"/>`
        + base(c);
    },
    q: (c) => foot(c, 66)
      + part([[50, 25], [56, 47], [63, 29], [66.5, 50], [77, 34], [68, 66], [50, 66]], c, true)
      + ball(50, 22, 4.8, c) + ball(63, 26, 4.8, c) + ball(37, 26, 4.8, c) + ball(77, 31.5, 4.8, c) + ball(23, 31.5, 4.8, c)
      + band(c, 63, 67) + base(c),
    k: (c) => foot(c, 66)
      + part([[50, 27], [57, 27.5], [68, 34], [71, 45], [66.5, 64], [50, 66]], c)
      + part([[50, 7], [54, 7], [54, 13], [59.5, 13], [59.5, 18.5], [54, 18.5], [54, 28], [50, 28]], c, true)
      + `<path d="M50 34L50 58M36.5 52.5C45 49.5 55 49.5 63.5 52.5" stroke="${c.f === '#f8f7f4' ? '#bdb7ae' : '#2e2b29'}" stroke-width="2.6" fill="none"/>`
      + band(c, 63, 67) + base(c)
  };
  const svg = (col, t) => { const c = C[col]; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="7 4 86 86"><g stroke="${c.s}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">${SH[t](c)}</g></svg>`; };
  const set = {}; for (const col of ['w', 'b']) for (const t of 'pnbrqk') set[col + t] = svg(col, t);
  window.PIECE_SETS = window.PIECE_SETS || {}; window.PIECE_SETS.pro = set;
  // Piezas personalizadas: imágenes que sube el usuario. Se guardan solo en este navegador (no se suben a la nube).
  const CK = 'ajedrezpro_custom_pieces';
  const imgSet = (m) => { const o = {}; for (const k in set) o[k] = m[k] ? `<img src="${m[k]}" alt="" draggable="false">` : set[k]; return o; };
  window.CustomPieces = {
    load() { try { const m = JSON.parse(localStorage.getItem(CK) || 'null'); if (m && Object.keys(m).length) { window.PIECE_SETS.custom = imgSet(m); return m; } } catch (e) { } delete window.PIECE_SETS.custom; return null; },
    save(m) { localStorage.setItem(CK, JSON.stringify(m)); return this.load(); },
    clear() { localStorage.removeItem(CK); delete window.PIECE_SETS.custom; },
    // Reconoce nombres como wp.png, bK.svg, white-pawn.png, negro_caballo.webp
    keyOf(name) {
      const n = name.toLowerCase().replace(/\.[a-z0-9]+$/, '');
      let m = n.match(/(?:^|[^a-z])([wb])([pnbrqk])$/) || n.match(/^([wb])([pnbrqk])(?:[^a-z]|$)/);
      if (m) return m[1] + m[2];
      const col = /white|blanc/.test(n) ? 'w' : /black|negr/.test(n) ? 'b' : null;
      const T = [['k', /king|rey/], ['q', /queen|dama|reina/], ['r', /rook|torre/], ['b', /bishop|alfil/], ['n', /knight|caballo/], ['p', /pawn|peon|peón/]];
      const t = (T.find(x => x[1].test(n)) || [])[0];
      return col && t ? col + t : null;
    }
  };
  window.CustomPieces.load();
  let pick = 'pro'; try { const st = JSON.parse(localStorage.getItem('ajedrezpro_v1') || '{}'); if (st.settings && st.settings.pieceSet) pick = st.settings.pieceSet; } catch (e) { }
  window.PIECE_SVG = window.PIECE_SETS[pick] || set;
})();
