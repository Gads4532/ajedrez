/* Piezas personalizadas: imágenes que sube el usuario. Se guardan solo en este navegador (no se suben a la nube).
   Las que falten se completan con las piezas planas. También elige el juego de piezas activo. */
(function () {
  const SETS = window.PIECE_SETS = window.PIECE_SETS || {};
  const CK = 'ajedrezpro_custom_pieces';
  const imgSet = (m) => { const base = SETS.plano, o = {}; for (const k in base) o[k] = m[k] ? `<img src="${m[k]}" alt="" draggable="false">` : base[k]; return o; };
  window.CustomPieces = {
    load() { try { const m = JSON.parse(localStorage.getItem(CK) || 'null'); if (m && Object.keys(m).length) { SETS.custom = imgSet(m); return m; } } catch (e) { } delete SETS.custom; return null; },
    save(m) { localStorage.setItem(CK, JSON.stringify(m)); return this.load(); },
    clear() { localStorage.removeItem(CK); delete SETS.custom; },
    // Reconoce nombres como wp.png, bK.svg, white-pawn.png, negro_caballo.webp
    keyOf(name) {
      const n = name.toLowerCase().replace(/\.[a-z0-9]+$/, '');
      const m = n.match(/(?:^|[^a-z])([wb])([pnbrqk])$/) || n.match(/^([wb])([pnbrqk])(?:[^a-z]|$)/);
      if (m) return m[1] + m[2];
      const col = /white|blanc/.test(n) ? 'w' : /black|negr/.test(n) ? 'b' : null;
      const T = [['k', /king|rey/], ['q', /queen|dama|reina/], ['r', /rook|torre/], ['b', /bishop|alfil/], ['n', /knight|caballo/], ['p', /pawn|peon|peón/]];
      const t = (T.find(x => x[1].test(n)) || [])[0];
      return col && t ? col + t : null;
    }
  };
  window.CustomPieces.load();
  let pick = 'plano'; try { const st = JSON.parse(localStorage.getItem('ajedrezpro_v1') || '{}'); if (st.settings) pick = st.settings.pieceSet || st.settings.pieces || pick; } catch (e) { }
  window.PIECE_SVG = SETS[pick] || SETS.plano;
})();
