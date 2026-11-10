/* Cuenta (Supabase, correo y contraseña), sincronización entre dispositivos, instalación como app y actualizaciones automáticas.
   Usa el mismo proyecto de Supabase que «Organización Personal»: la misma cuenta sirve para las dos apps.
   El progreso del ajedrez se guarda aparte, en la tabla «ajedrez_estados» (ver supabase.sql). */
(function () {
  const APP_VERSION = '1.7.0';
  App.VERSION = APP_VERSION;
  const { $, h, esc, toast } = App;
  const inArtifact = /claude\.ai|claudeusercontent/.test(location.host) || !/^https?:$/.test(location.protocol);

  // La clave de abajo es la pública («anon»): solo permite lo que las reglas de la base de datos dejan.
  const SUPA_URL = 'https://vqxtxzmtrgsitgsxtvif.supabase.co';
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxeHR4em10cmdzaXRnc3h0dmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MjQzNTksImV4cCI6MjEwODIwMDM1OX0.9CrCH7vkgr_4-25m22ttDxI1WyTPKVxK-2uEUi801dQ';
  const TABLE = 'ajedrez_estados', AUTH_KEY = 'ajedrezpro-auth', SEEN_KEY = 'ajedrezpro-seen';
  let auth = null; try { auth = JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) { }
  const saveAuth = (a) => { auth = a; try { a ? localStorage.setItem(AUTH_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_KEY); } catch (e) { } };
  let syncState = 'local', lastSeen = '', pushT = null, pollT = null, pending = false, writing = false;
  try { lastSeen = localStorage.getItem(SEEN_KEY) || ''; } catch (e) { }

  async function supa(path, { method = 'GET', body, headers = {}, token } = {}) {
    const res = await fetch(SUPA_URL + path, { method, headers: { apikey: SUPA_KEY, Authorization: `Bearer ${token || (auth && auth.access_token) || SUPA_KEY}`, 'Content-Type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
    const text = await res.text(); let data = null; try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    if (!res.ok) { const err = new Error((data && (data.msg || data.message || data.error_description || data.error)) || res.statusText); err.status = res.status; err.code = (data && (data.code || data.error_code)) || ''; throw err; }
    return data;
  }
  const sessionFrom = (d) => d && d.access_token ? { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Date.now() + (d.expires_in || 3600) * 1000, uid: d.user && d.user.id, email: d.user && d.user.email } : null;
  async function ensureToken() {
    if (!auth) return false;
    if (auth.expires_at - Date.now() > 60000) return true;
    try { const d = await supa('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: auth.refresh_token }, token: SUPA_KEY }); const n = sessionFrom(d); if (!n) return false; saveAuth({ ...n, uid: n.uid || auth.uid, email: n.email || auth.email }); return true; }
    catch (e) { if (e.status === 400 || e.status === 401) { saveAuth(null); paintAccount(); setSync('local'); } return false; }
  }
  const AUTH_MSG = (e) => {
    const m = String((e && e.message) || '').toLowerCase();
    if (m.includes('invalid login') || m.includes('invalid_credentials')) return 'Correo o contraseña incorrectos.';
    if (m.includes('already registered') || m.includes('already exists')) return 'Ese correo ya tiene cuenta. Entra con tu contraseña.';
    if (m.includes('not confirmed')) return 'Confirma tu correo: busca el mensaje en tu bandeja y toca el enlace.';
    if (m.includes('password') && (m.includes('6') || m.includes('short') || m.includes('weak'))) return 'La contraseña necesita al menos 6 caracteres.';
    if (m.includes('rate limit') || m.includes('too many')) return 'Demasiados intentos. Espera un minuto.';
    if (m.includes('failed to fetch') || m.includes('network')) return 'Sin conexión. Inténtalo cuando tengas internet.';
    return 'No se pudo: ' + ((e && e.message) || 'error desconocido');
  };

  /* ---------- Combinar dos copias del progreso sin perder nada ---------- */
  const maxObj = (a = {}, b = {}) => { const o = { ...a }; for (const k in b) o[k] = typeof b[k] === 'number' ? Math.max(o[k] || 0, b[k]) : (o[k] || b[k]); return o; };
  const uniq = (arr, key) => { const m = new Map(); for (const x of arr) m.set(key(x), x); return [...m.values()]; };
  function merge(L, R) {
    const o = JSON.parse(JSON.stringify(L));
    const pl = L.pz || {}, pr = R.pz || {};
    const base = (pr.n || 0) > (pl.n || 0) ? pr : pl;
    o.pz = { ...pl, rating: base.rating, n: Math.max(pl.n || 0, pr.n || 0), hist: base.hist || [], best: Math.max(pl.best || 0, pr.best || 0), streak: base.streak || 0,
      day: [pl.day, pr.day].filter(Boolean).sort().pop() || null, dayStreak: Math.max(pl.dayStreak || 0, pr.dayStreak || 0), solved: { ...(pl.solved || {}) }, theme: { ...(pl.theme || {}) } };
    for (const [id, r] of Object.entries(pr.solved || {})) { const l = o.pz.solved[id]; o.pz.solved[id] = l ? { ok: Math.max(l.ok, r.ok), fail: Math.max(l.fail, r.fail), t: Math.max(l.t || 0, r.t || 0) } : r; }
    for (const [k, r] of Object.entries(pr.theme || {})) { const l = o.pz.theme[k]; o.pz.theme[k] = !l || r.n > l.n ? r : l; }
    o.lessons = { ...(R.lessons || {}), ...(L.lessons || {}) };
    o.open = { ...(R.open || {}) }; for (const [k, v] of Object.entries(L.open || {})) { const r = o.open[k]; o.open[k] = !r || (v.reps || 0) >= (r.reps || 0) ? v : r; }
    { const gm = new Map(); for (const g of [...(R.games || []), ...(L.games || [])]) { const p = gm.get(g.d); gm.set(g.d, p && p.rev && !g.rev ? p : g); } o.games = [...gm.values()].sort((a, b) => a.d - b.d).slice(-200); } // conserva el análisis (rev) si solo lo tiene una copia
    o.journal = uniq([...(R.journal || []), ...(L.journal || [])], j => j.date + '|' + j.text);
    o.activity = maxObj(L.activity, R.activity);
    o.rush = { best: maxObj((L.rush || {}).best, (R.rush || {}).best), runs: uniq([...((R.rush || {}).runs || []), ...((L.rush || {}).runs || [])], r => r.d).slice(-300) };
    o.wood = { sets: uniq([...((R.wood || {}).sets || []), ...((L.wood || {}).sets || [])].sort((a, b) => a.cycles.length - b.cycles.length), s => s.name) };
    o.route = maxObj(L.route, R.route); o.vision = maxObj(L.vision, R.vision); o.totals = maxObj(L.totals, R.totals); o.battles = maxObj(L.battles, R.battles);
    o.ach = { ...(R.ach || {}), ...(L.ach || {}) }; o.rm = { ...(R.rm || {}), ...(L.rm || {}) };
    o.xp = Math.max(L.xp || 0, R.xp || 0);
    const dl = L.daily, dr = R.daily; o.daily = !dl ? dr : !dr ? dl : dl.date === dr.date ? { ...maxObj(dl, dr), date: dl.date, theme: maxObj(dl.theme, dr.theme), done: { ...(dr.done || {}), ...(dl.done || {}) } } : (dl.date > dr.date ? dl : dr);
    o.settings = { ...(R.settings || {}), ...(L.settings || {}) };
    if (!L.playCfg && R.playCfg) o.playCfg = R.playCfg;
    return o;
  }
  const canon = (x) => JSON.stringify(x, Object.keys(x).sort());

  /* ---------- Subir y bajar ---------- */
  function setSync(s) { syncState = s; paintAccount(); }
  async function push() {
    if (!auth || writing) { pending = true; return; }
    if (!navigator.onLine) { pending = true; setSync('offline'); return; }
    writing = true; pending = false; setSync('wait');
    try {
      if (!(await ensureToken())) throw new Error('sin sesión');
      const rows = await supa(`/rest/v1/${TABLE}`, { method: 'POST', body: { user_id: auth.uid, data: App.S, updated_at: new Date().toISOString() }, headers: { Prefer: 'resolution=merge-duplicates,return=representation' } });
      lastSeen = (rows && rows[0] && rows[0].updated_at) || lastSeen; try { localStorage.setItem(SEEN_KEY, lastSeen); } catch (e) { }
      setSync('ok');
    } catch (e) { pending = true; setSync(e.code === '42P01' || e.code === 'PGRST205' || e.status === 404 ? 'notable' : 'error'); }
    writing = false; if (pending && syncState === 'ok') push();
  }
  async function pull() {
    if (!auth || writing || pending || !navigator.onLine) return;
    if (!(await ensureToken())) return;
    let rows;
    try { rows = await supa(`/rest/v1/${TABLE}?select=data,updated_at&user_id=eq.${auth.uid}`); }
    catch (e) { setSync(e.code === '42P01' || e.code === 'PGRST205' || e.status === 404 ? 'notable' : 'error'); return; }
    const row = rows && rows[0];
    if (!row) { push(); return; }
    if (row.updated_at === lastSeen) { setSync('ok'); return; }
    const merged = merge(App.S, row.data || {});
    const localChanged = canon(merged) !== canon(App.S), remoteChanged = canon(merged) !== canon(row.data || {});
    lastSeen = row.updated_at; try { localStorage.setItem(SEEN_KEY, lastSeen); } catch (e) { }
    if (localChanged) { App.S = merged; App.rawSave(); if (!busyView()) App.route(); else toast('Progreso sincronizado'); }
    if (remoteChanged) push(); else setSync('ok');
  }
  // No recargar la vista si estás en mitad de una partida o un puzle cronometrado.
  const busyView = () => /^#(jugar|contrarreloj|batalla|duelo|woodpecker|ruta)/.test(location.hash);
  App.onSaved = () => { if (!auth) return; clearTimeout(pushT); pushT = setTimeout(push, 1500); };
  function connect() {
    if (!auth) { setSync('local'); return; }
    pull(); clearInterval(pollT);
    pollT = setInterval(() => { if (document.visibilityState === 'visible') pull(); }, 30000);
  }
  addEventListener('online', () => { if (pending) push(); else pull(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { pending ? push() : pull(); checkUpdate(); } });

  /* ---------- Ventana de diálogo ---------- */
  function dialog(html) {
    closeDialog();
    const d = h(`<div class="dlg-bg" id="dlg"><div class="dlg" role="dialog" aria-modal="true"><button class="icon-btn dlg-x" aria-label="Cerrar">✕</button>${html}</div></div>`);
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('.dlg-x') || e.target.closest('[data-close]')) closeDialog(); });
    document.body.appendChild(d); return d;
  }
  function closeDialog() { const d = $('#dlg'); if (d) d.remove(); }
  App.dialog = dialog; App.closeDialog = closeDialog;

  /* ---------- Cuenta ---------- */
  function accountForm(mode = 'in') {
    const d = dialog(`<h2 style="font-size:22px;font-weight:900;margin-bottom:6px">${mode === 'up' ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
      <p class="muted" style="margin:0 0 14px;font-size:14px">Con una cuenta tu progreso (rating, puzles, lecciones, partidas, logros) se guarda en la nube y lo ves en cualquier teléfono u ordenador. Es la misma cuenta de Organización Personal.</p>
      <div style="display:grid;gap:10px"><label class="fl">Correo<input id="a-email" type="email" autocomplete="email" placeholder="tu@correo.com"></label>
      <label class="fl">Contraseña<input id="a-pass" type="password" autocomplete="${mode === 'up' ? 'new-password' : 'current-password'}" placeholder="Mínimo 6 caracteres"></label></div>
      <p class="muted" id="a-msg" style="min-height:1.4em;margin:10px 0;font-size:14px"></p>
      <button class="btn pri big" id="a-go">${mode === 'up' ? 'Crear cuenta' : 'Entrar'}</button>
      <div style="display:flex;justify-content:space-between;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn ghost sm" id="a-switch">${mode === 'up' ? 'Ya tengo cuenta' : 'Crear cuenta nueva'}</button>${mode === 'in' ? '<button class="btn ghost sm" id="a-forgot">Olvidé la contraseña</button>' : ''}</div>`);
    const msg = (t) => { $('#a-msg', d).textContent = t; };
    $('#a-email', d).focus();
    $('#a-switch', d).onclick = () => accountForm(mode === 'up' ? 'in' : 'up');
    const fg = $('#a-forgot', d); if (fg) fg.onclick = async () => { const email = $('#a-email', d).value.trim(); if (!email) { msg('Escribe tu correo primero.'); return; } try { await supa('/auth/v1/recover', { method: 'POST', body: { email }, token: SUPA_KEY }); msg('Te enviamos un correo para cambiar la contraseña.'); } catch (e) { msg(AUTH_MSG(e)); } };
    $('#a-go', d).onclick = async () => {
      const email = $('#a-email', d).value.trim(), password = $('#a-pass', d).value;
      if (!email || password.length < 6) { msg('Escribe tu correo y una contraseña de al menos 6 caracteres.'); return; }
      $('#a-go', d).disabled = true; msg('Un momento…');
      try {
        const r = mode === 'up' ? await supa('/auth/v1/signup', { method: 'POST', body: { email, password }, token: SUPA_KEY }) : await supa('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password }, token: SUPA_KEY });
        const ses = sessionFrom(r);
        if (!ses) { msg('Cuenta creada. Confirma tu correo (mira la bandeja de entrada) y luego entra.'); $('#a-go', d).disabled = false; return; }
        saveAuth(ses); lastSeen = ''; closeDialog(); toast('Sesión iniciada: ' + ses.email); connect(); paintAccount();
      } catch (e) { msg(AUTH_MSG(e)); $('#a-go', d).disabled = false; }
    };
    d.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#a-go', d).click(); });
  }
  async function signOut() {
    try { await supa('/auth/v1/logout', { method: 'POST' }); } catch (e) { }
    saveAuth(null); clearInterval(pollT); lastSeen = ''; try { localStorage.removeItem(SEEN_KEY); } catch (e) { }
    setSync('local'); toast('Sesión cerrada. Tu progreso sigue en este dispositivo.');
  }
  App.account = { form: accountForm, signOut, get auth() { return auth; }, get state() { return syncState; }, syncNow: () => (pending ? push() : pull()) };
  const SYNC_TXT = { local: 'Sin cuenta: progreso solo en este dispositivo', wait: 'Sincronizando…', ok: '✓ Sincronizado', error: 'No se pudo sincronizar; se reintentará', offline: 'Sin conexión; se subirá al volver', notable: 'Falta preparar la base de datos (supabase.sql)' };
  function paintAccount() {
    const el = $('#acctBox'); if (!el) return;
    if (inArtifact) { el.innerHTML = ''; return; }
    el.innerHTML = auth ? `<div class="acct"><span class="acct-mail" title="${esc(auth.email || '')}">${esc(auth.email || '')}</span><span class="acct-st ${syncState}">${esc(SYNC_TXT[syncState] || '')}</span><button class="btn ghost sm" id="acctOut">Cerrar sesión</button></div>`
      : `<button class="btn pri sm" id="acctIn" style="width:100%">Crear cuenta / Entrar</button>`;
    const i = $('#acctIn'), o = $('#acctOut'); if (i) i.onclick = () => accountForm('in'); if (o) o.onclick = signOut;
  }
  App.paintAccount = paintAccount;

  /* ---------- Instalar como app ---------- */
  let deferred = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; paintInstall(); maybeAskInstall(); });
  addEventListener('appinstalled', () => { deferred = null; paintInstall(); toast('App instalada. Ábrela desde tu pantalla de inicio.'); });
  function installNow() {
    if (deferred) { deferred.prompt(); deferred.userChoice.then(() => { deferred = null; paintInstall(); closeDialog(); }); return; }
    dialog(`<h2 style="font-size:22px;font-weight:900;margin-bottom:10px">Instalar Ajedrez Pro</h2>${isIOS
      ? '<ol class="prose" style="padding-left:1.2em"><li>Abre esta página en <b>Safari</b>.</li><li>Toca <b>Compartir</b> (el cuadrado con la flecha hacia arriba).</li><li>Elige <b>Añadir a pantalla de inicio</b> y luego <b>Añadir</b>.</li></ol>'
      : '<ol class="prose" style="padding-left:1.2em"><li>Abre esta página en <b>Chrome</b> (o Edge).</li><li>Toca el menú <b>⋮</b>.</li><li>Elige <b>Instalar aplicación</b> o <b>Añadir a pantalla de inicio</b>.</li></ol>'}
      <p class="muted" style="font-size:14px">Una vez instalada se abre a pantalla completa, funciona sin internet y se actualiza sola.</p><button class="btn pri" data-close>Entendido</button>`);
  }
  function maybeAskInstall() {
    if (inArtifact || standalone()) return;
    let seen = 0; try { seen = +localStorage.getItem('ajedrezpro-install-ask') || 0; } catch (e) { }
    if (Date.now() - seen < 3 * 864e5) return;
    try { localStorage.setItem('ajedrezpro-install-ask', Date.now()); } catch (e) { }
    const d = dialog(`<div style="display:flex;gap:14px;align-items:center;margin-bottom:12px"><img src="icons/icon-192.png" alt="" width="64" height="64" style="border-radius:14px"><div><h2 style="font-size:21px;font-weight:900">Instala Ajedrez Pro</h2><div class="muted" style="font-size:14px">Gratis · sin anuncios · funciona sin internet</div></div></div>
      <p class="muted" style="font-size:14.5px;margin:0 0 14px">Tenla en tu pantalla de inicio como cualquier app: se abre a pantalla completa, guarda tu progreso y se actualiza sola cuando hay novedades.</p>
      <button class="btn pri big" id="inGo">⬇ Instalar app</button><button class="btn ghost sm" data-close style="margin-top:10px;width:100%">Ahora no</button>`);
    $('#inGo', d).onclick = installNow;
  }
  function paintInstall() {
    const el = $('#instBox'); if (!el) return;
    el.innerHTML = inArtifact || standalone() ? '' : `<button class="btn sm" id="instBtn" style="width:100%">⬇ Instalar app</button>`;
    const b = $('#instBtn'); if (b) b.onclick = installNow;
  }
  App.installNow = installNow;

  /* ---------- Actualizaciones automáticas ---------- */
  let swReg = null, reloading = false;
  function applyUpdate() { if (swReg && swReg.waiting) swReg.waiting.postMessage('SKIP_WAITING'); }
  function onUpdateReady() {
    // Se aplica sola, salvo en mitad de una partida o un reto: entonces se ofrece un botón.
    if (!busyView()) { try { sessionStorage.setItem('ajedrezpro-updated', '1'); } catch (e) { } applyUpdate(); return; }
    let b = $('#updBar'); if (b) return;
    b = h(`<div class="upd-bar" id="updBar"><span>Hay una versión nueva lista.</span><button class="btn pri sm">Actualizar</button></div>`);
    b.querySelector('button').onclick = () => { try { sessionStorage.setItem('ajedrezpro-updated', '1'); } catch (e) { } applyUpdate(); };
    document.body.appendChild(b);
  }
  function checkUpdate() { if (swReg) swReg.update().catch(() => { }); }
  App.checkUpdate = async () => {
    if (!swReg) { location.reload(); return; }
    toast('Buscando actualización…'); try { await swReg.update(); } catch (e) { }
    setTimeout(() => { if (swReg.waiting || swReg.installing) toast('Descargando la versión nueva…'); else toast('Tienes la última versión (v' + APP_VERSION + ')'); }, 1500);
  };
  if (!inArtifact && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then((r) => {
      swReg = r; if (r.waiting && navigator.serviceWorker.controller) onUpdateReady();
      r.addEventListener('updatefound', () => { const w = r.installing; if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) onUpdateReady(); }); });
      setInterval(checkUpdate, 30 * 60 * 1000);
    }).catch(() => { });
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) return; reloading = true; location.reload(); });
  }

  window.addEventListener('DOMContentLoaded', () => {
    paintAccount(); paintInstall(); connect();
    try { if (sessionStorage.getItem('ajedrezpro-updated')) { sessionStorage.removeItem('ajedrezpro-updated'); setTimeout(() => toast('App actualizada a la versión ' + APP_VERSION), 600); } } catch (e) { }
    setTimeout(maybeAskInstall, 2500);
  });
})();
