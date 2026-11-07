/* Tablero interactivo: render, animaciones, arrastrar/soltar, flechas, sonido. */
(function () {
  const FILES = 'abcdefgh';
  const sqXY = (sq) => [FILES.indexOf(sq[0]), 8 - parseInt(sq[1], 10)]; // x 0..7 (a..h), y 0..7 (8..1)

  /* ---------- Sonido sintetizado (WebAudio) ---------- */
  const Sound = {
    ctx: null, enabled: true,
    _c() { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.enabled = false; } } return this.ctx; },
    _noise(dur, freq, gain, q) {
      const c = this._c(); if (!c || !this.enabled) return;
      if (c.state === 'suspended') c.resume();
      const len = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q || 1.2;
      const g = c.createGain(); g.gain.value = gain;
      src.connect(f); f.connect(g); g.connect(c.destination); src.start();
    },
    _tone(freqs, dur, type, gain) {
      const c = this._c(); if (!c || !this.enabled) return;
      if (c.state === 'suspended') c.resume();
      freqs.forEach((fr, i) => {
        const o = c.createOscillator(), g = c.createGain(); o.type = type || 'sine'; o.frequency.value = fr;
        const t0 = c.currentTime + i * dur * 0.6;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain || 0.15, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
      });
    },
    move() { this._noise(0.07, 1800, 0.9, 0.8); this._noise(0.05, 400, 0.6, 1); },
    capture() { this._noise(0.11, 1200, 1.3, 0.6); this._noise(0.09, 250, 1, 1); },
    check() { this._tone([880, 660], 0.12, 'triangle', 0.12); },
    castle() { this.move(); setTimeout(() => this.move(), 90); },
    good() { this._tone([660, 880, 1320], 0.14, 'sine', 0.12); },
    bad() { this._tone([220, 180], 0.16, 'square', 0.05); },
    end() { this._tone([523, 659, 784, 1047], 0.18, 'triangle', 0.1); },
    tick() { this._noise(0.02, 3000, 0.3, 2); }
  };
  window.Sound = Sound;

  /* ---------- Marcadores tipo "clasificación" ---------- */
  const BADGES = {
    brilliant: { t: '!!', c: '#1baca6' }, great: { t: '!', c: '#5c8bb0' }, best: { t: '★', c: '#81b64c' },
    excellent: { t: '👍', c: '#96bc4b' }, good: { t: '✓', c: '#96af8b' }, book: { t: '📖', c: '#a88865' },
    inaccuracy: { t: '?!', c: '#f0c15c' }, mistake: { t: '?', c: '#e58f2a' }, blunder: { t: '??', c: '#ca3431' },
    miss: { t: '✕', c: '#ee6b55' }, correct: { t: '✓', c: '#81b64c' }, wrong: { t: '✕', c: '#ca3431' },
    hint: { t: '?', c: '#5c8bb0' }
  };
  window.BADGES = BADGES;

  class Board {
    constructor(el, opts = {}) {
      this.el = el;
      this.opts = Object.assign({ orientation: 'white', interactive: true, movable: null, showCoords: true, onUserMove: null, hideP: false }, opts);
      this.game = null;          // instancia de Chess para movimientos legales
      this.pieces = {};          // sq -> element
      this.selected = null;
      this.arrows = []; this.userArrows = []; this.userMarks = new Set();
      this.lastMove = null; this.checkSq = null;
      this._build();
    }
    _build() {
      this.el.classList.add('cb');
      this.el.innerHTML = '';
      this.sqLayer = document.createElement('div'); this.sqLayer.className = 'cb-squares';
      this.pcLayer = document.createElement('div'); this.pcLayer.className = 'cb-pieces';
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('viewBox', '0 0 800 800'); this.svg.setAttribute('class', 'cb-arrows');
      this.ovLayer = document.createElement('div'); this.ovLayer.className = 'cb-overlay';
      this.el.append(this.sqLayer, this.pcLayer, this.svg, this.ovLayer);
      this.squares = {};
      for (let i = 0; i < 64; i++) {
        const d = document.createElement('div'); d.className = 'cb-sq'; this.sqLayer.appendChild(d);
      }
      this._layoutSquares();
      this._bind();
    }
    _layoutSquares() {
      const flip = this.opts.orientation === 'black';
      const nodes = this.sqLayer.children;
      this.squares = {};
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const file = flip ? 7 - c : c, rank = flip ? r + 1 : 8 - r;
        const sq = FILES[file] + rank, d = nodes[r * 8 + c];
        d.dataset.sq = sq;
        d.className = 'cb-sq ' + ((file + rank) % 2 === 0 ? 'dark' : 'light');
        d.innerHTML = '';
        if (this.opts.showCoords) {
          if (c === 0) d.insertAdjacentHTML('beforeend', `<span class="co co-r">${rank}</span>`);
          if (r === 7) d.insertAdjacentHTML('beforeend', `<span class="co co-f">${FILES[file]}</span>`);
        }
        this.squares[sq] = d;
      }
      this._paintMarks();
    }
    _pos(sq) {
      let [x, y] = sqXY(sq);
      if (this.opts.orientation === 'black') { x = 7 - x; y = 7 - y; }
      return [x, y];
    }
    _place(el, sq) { const [x, y] = this._pos(sq); el.style.transform = `translate(${x * 100}%, ${y * 100}%)`; }
    _pieceEl(code) {
      const d = document.createElement('div'); d.className = 'cb-pc'; d.dataset.p = code;
      d.innerHTML = window.PIECE_SVG ? PIECE_SVG[code] : code; return d;
    }
    setOrientation(o) { this.opts.orientation = o; this._layoutSquares(); for (const sq in this.pieces) { this.pieces[sq].classList.add('noanim'); this._place(this.pieces[sq], sq); } requestAnimationFrame(() => { for (const sq in this.pieces) this.pieces[sq].classList.remove('noanim'); }); this.drawArrows(); }
    flip() { this.setOrientation(this.opts.orientation === 'white' ? 'black' : 'white'); }

    /* Posición: reconcilia piezas y anima los desplazamientos */
    setPosition(fen, animate = true) {
      const board = parseFen(fen);
      const old = this.pieces, next = {};
      const oldList = Object.entries(old).map(([sq, el]) => ({ sq, el, code: el.dataset.p }));
      const remainOld = [];
      // 1) piezas que no cambian
      for (const o of oldList) { if (board[o.sq] === o.code) { next[o.sq] = o.el; delete board[o.sq]; } else remainOld.push(o); }
      // 2) emparejar movimientos (mismo tipo, más cercano)
      const newSqs = Object.keys(board);
      for (const sq of newSqs) {
        const code = board[sq];
        let best = -1, bd = 99;
        remainOld.forEach((o, i) => { if (o.code === code) { const [a, b] = sqXY(o.sq), [c, d] = sqXY(sq); const dist = Math.max(Math.abs(a - c), Math.abs(b - d)); if (dist < bd) { bd = dist; best = i; } } });
        if (best >= 0 && animate) { const o = remainOld.splice(best, 1)[0]; next[sq] = o.el; o.el.style.zIndex = 3; this._place(o.el, sq); setTimeout(() => { o.el.style.zIndex = ''; }, 260); }
        else { const el = this._pieceEl(code); el.classList.add('noanim'); this._place(el, sq); if (animate) el.classList.add('fadein'); this.pcLayer.appendChild(el); requestAnimationFrame(() => el.classList.remove('noanim')); next[sq] = el; }
      }
      // 3) eliminar el resto (capturadas)
      for (const o of remainOld) { if (animate) { o.el.classList.add('fadeout'); setTimeout(() => o.el.remove(), 220); } else o.el.remove(); }
      this.pieces = next;
      this.el.classList.toggle('blind', !!this.opts.hideP);
    }
    setGame(g) { this.game = g; this.setPosition(g.fen()); }
    sync(animate = true) {
      if (!this.game) return;
      this.setPosition(this.game.fen(), animate);
      const h = this.game.history({ verbose: true });
      const lm = h.length ? h[h.length - 1] : null;
      this.setLastMove(lm ? [lm.from, lm.to] : null);
      this.setCheck(this.game.in_check() ? findKing(this.game, this.game.turn()) : null);
    }
    setLastMove(m) { this.lastMove = m; this._paintMarks(); }
    setCheck(sq) { this.checkSq = sq; this._paintMarks(); }
    _paintMarks() {
      for (const sq in this.squares) {
        const d = this.squares[sq];
        d.classList.toggle('last', !!(this.lastMove && this.lastMove.includes(sq)));
        d.classList.toggle('check', this.checkSq === sq);
        d.classList.toggle('sel', this.selected === sq);
        d.classList.toggle('mark', this.userMarks.has(sq));
      }
    }
    clearHints() { this.sqLayer.querySelectorAll('.hint,.hintc').forEach(e => e.remove()); }
    showHints(from) {
      this.clearHints(); if (!this.game) return;
      for (const m of this.game.moves({ square: from, verbose: true })) {
        const d = this.squares[m.to]; if (!d) continue;
        const h = document.createElement('div'); h.className = (m.captured ? 'hintc' : 'hint'); d.appendChild(h);
      }
    }
    _canMove(sq) {
      if (!this.opts.interactive || !this.game) return false;
      const p = this.game.get(sq); if (!p) return false;
      const mv = typeof this.opts.movable === 'function' ? this.opts.movable() : this.opts.movable;
      if (mv === 'none') return false;
      if (mv && mv !== 'both' && p.color !== mv) return false;
      return p.color === this.game.turn();
    }
    _select(sq) { this.selected = sq; this._paintMarks(); if (sq) this.showHints(sq); else this.clearHints(); }

    _sqFromPoint(x, y) {
      const r = this.el.getBoundingClientRect();
      const cx = Math.floor((x - r.left) / r.width * 8), cy = Math.floor((y - r.top) / r.height * 8);
      if (cx < 0 || cx > 7 || cy < 0 || cy > 7) return null;
      const flip = this.opts.orientation === 'black';
      const file = flip ? 7 - cx : cx, rank = flip ? cy + 1 : 8 - cy;
      return FILES[file] + rank;
    }
    _bind() {
      let drag = null;
      const onDown = (e) => {
        if (e.button === 2) { // flechas con botón derecho
          e.preventDefault(); const sq = this._sqFromPoint(e.clientX, e.clientY); if (sq) this._rStart = sq; return;
        }
        if (e.button !== 0) return;
        this.userArrows = []; this.userMarks.clear(); this.drawArrows(); this._paintMarks();
        const sq = this._sqFromPoint(e.clientX, e.clientY); if (!sq) return;
        if (this.selected && this.selected !== sq) {
          const legal = this.game && this.game.moves({ square: this.selected, verbose: true }).some(m => m.to === sq);
          if (legal) { const f = this.selected; this._select(null); this._attempt(f, sq); return; }
        }
        if (this._canMove(sq)) {
          const el = this.pieces[sq];
          const wasSel = this.selected === sq;
          this._select(sq);
          drag = { sq, el, x: e.clientX, y: e.clientY, started: false, wasSel };
          this.el.setPointerCapture && this.el.setPointerCapture(e.pointerId);
          e.preventDefault();
        } else this._select(null);
      };
      const onMove = (e) => {
        if (!drag) return;
        if (!drag.started && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 4) return;
        const r = this.el.getBoundingClientRect(), s = r.width / 8;
        drag.started = true; drag.el.classList.add('dragging');
        drag.el.style.transform = `translate(${e.clientX - r.left - s / 2}px, ${e.clientY - r.top - s / 2}px)`;
        const over = this._sqFromPoint(e.clientX, e.clientY);
        if (this._over !== over) { if (this._over && this.squares[this._over]) this.squares[this._over].classList.remove('over'); this._over = over; if (over) this.squares[over].classList.add('over'); }
      };
      const onUp = (e) => {
        if (e.button === 2 && this._rStart) {
          const sq = this._sqFromPoint(e.clientX, e.clientY);
          if (sq && sq !== this._rStart) {
            const i = this.userArrows.findIndex(a => a[0] === this._rStart && a[1] === sq);
            if (i >= 0) this.userArrows.splice(i, 1); else this.userArrows.push([this._rStart, sq, 'o']);
            this.drawArrows();
          } else if (sq) { this.userMarks.has(sq) ? this.userMarks.delete(sq) : this.userMarks.add(sq); this._paintMarks(); }
          this._rStart = null; return;
        }
        if (!drag) return;
        const d = drag; drag = null;
        if (this._over && this.squares[this._over]) this.squares[this._over].classList.remove('over'); this._over = null;
        d.el.classList.remove('dragging');
        if (!d.started) { if (d.wasSel) this._select(null); return; }
        const to = this._sqFromPoint(e.clientX, e.clientY);
        const legal = to && this.game.moves({ square: d.sq, verbose: true }).some(m => m.to === to);
        if (legal) { d.el.classList.add('noanim'); this._place(d.el, to); this._select(null); requestAnimationFrame(() => d.el.classList.remove('noanim')); this._attempt(d.sq, to, true); }
        else { this._place(d.el, d.sq); }
      };
      this.el.addEventListener('pointerdown', onDown);
      this.el.addEventListener('pointermove', onMove);
      this.el.addEventListener('pointerup', onUp);
      this.el.addEventListener('contextmenu', e => e.preventDefault());
    }
    async _attempt(from, to, dropped) {
      const p = this.game.get(from);
      let promotion;
      if (p && p.type === 'p' && (to[1] === '8' || to[1] === '1')) {
        promotion = await this.askPromotion(to, p.color);
        if (!promotion) { this.sync(false); return; }
      }
      const ok = this.opts.onUserMove ? await this.opts.onUserMove({ from, to, promotion }) : false;
      if (ok === false) this.sync(true);
    }
    askPromotion(sq, color) {
      return new Promise(res => {
        const [x, y] = this._pos(sq);
        const box = document.createElement('div'); box.className = 'cb-promo';
        const down = y === 0;
        box.style.left = (x * 12.5) + '%'; box.style[down ? 'top' : 'bottom'] = '0';
        ['q', 'n', 'r', 'b'].forEach(t => {
          const b = document.createElement('button'); b.innerHTML = PIECE_SVG[color + t]; b.title = { q: 'Dama', n: 'Caballo', r: 'Torre', b: 'Alfil' }[t];
          b.onclick = (ev) => { ev.stopPropagation(); box.remove(); res(t); }; box.appendChild(b);
        });
        const x_ = document.createElement('button'); x_.className = 'x'; x_.textContent = '✕'; x_.onclick = (ev) => { ev.stopPropagation(); box.remove(); res(null); };
        if (down) box.appendChild(x_); else box.prepend(x_);
        if (!down) box.style.flexDirection = 'column-reverse';
        box.addEventListener('pointerdown', ev => ev.stopPropagation());
        this.ovLayer.appendChild(box);
      });
    }
    /* Flechas: [from,to,color] color: g verde, r rojo, b azul, y amarillo, o naranja (usuario) */
    setArrows(a) { this.arrows = a || []; this.drawArrows(); }
    drawArrows() {
      const cols = { g: 'rgba(21,120,27,.8)', r: 'rgba(200,40,30,.8)', b: 'rgba(0,48,136,.8)', y: 'rgba(230,180,0,.85)', o: 'rgba(255,170,0,.8)' };
      let html = '<defs>';
      for (const k in cols) html += `<marker id="ah-${k}" markerWidth="4" markerHeight="4" refX="2.05" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 z" fill="${cols[k]}"/></marker>`;
      html += '</defs>';
      for (const [f, t, c0] of [...this.arrows, ...this.userArrows]) {
        const c = cols[c0] ? c0 : 'g';
        const [x1, y1] = this._pos(f), [x2, y2] = this._pos(t);
        const ax = x1 * 100 + 50, ay = y1 * 100 + 50, bx = x2 * 100 + 50, by = y2 * 100 + 50;
        const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy), ex = bx - dx / L * 40, ey = by - dy / L * 40;
        const knight = (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2) || (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1);
        if (knight) {
          const mx = Math.abs(y2 - y1) > Math.abs(x2 - x1) ? ax : bx, my = Math.abs(y2 - y1) > Math.abs(x2 - x1) ? by : ay;
          const ddx = bx - mx, ddy = by - my, LL = Math.hypot(ddx, ddy), kx = bx - ddx / LL * 40, ky = by - ddy / LL * 40;
          html += `<polyline points="${ax},${ay} ${mx},${my} ${kx},${ky}" fill="none" stroke="${cols[c]}" stroke-width="18" stroke-linejoin="round" marker-end="url(#ah-${c})"/>`;
        } else html += `<line x1="${ax}" y1="${ay}" x2="${ex}" y2="${ey}" stroke="${cols[c]}" stroke-width="18" marker-end="url(#ah-${c})"/>`;
      }
      this.svg.innerHTML = html;
    }
    /* Insignia animada sobre una casilla */
    badge(sq, kind) {
      this.ovLayer.querySelectorAll('.cb-badge').forEach(e => e.remove());
      if (!sq || !BADGES[kind]) return;
      const [x, y] = this._pos(sq), b = BADGES[kind];
      const d = document.createElement('div'); d.className = 'cb-badge';
      d.style.left = `calc(${(x + 1) * 12.5}% - 2.6%)`; d.style.top = `calc(${y * 12.5}% - 2.2%)`;
      d.style.background = b.c; d.textContent = b.t; this.ovLayer.appendChild(d);
    }
    flashSquare(sq, cls) { const d = this.squares[sq]; if (!d) return; d.classList.remove(cls); void d.offsetWidth; d.classList.add(cls); setTimeout(() => d.classList.remove(cls), 900); }
    setBlind(on) { this.opts.hideP = on; this.el.classList.toggle('blind', on); }
  }

  function parseFen(fen) {
    const out = {}, rows = fen.split(' ')[0].split('/');
    for (let r = 0; r < 8; r++) {
      let f = 0;
      for (const ch of rows[r]) {
        if (/\d/.test(ch)) f += +ch;
        else { const color = ch === ch.toUpperCase() ? 'w' : 'b'; out[FILES[f] + (8 - r)] = color + ch.toLowerCase(); f++; }
      }
    }
    return out;
  }
  function findKing(g, color) {
    const b = g.board();
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const p = b[r][c]; if (p && p.type === 'k' && p.color === color) return FILES[c] + (8 - r); }
    return null;
  }
  window.Board = Board; window.parseFen = parseFen; window.findKing = findKing;
})();
