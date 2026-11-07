/* Guarda la app para usarla sin internet. Pide primero a la red (así llegan las versiones nuevas) y, sin red, usa la caché.
   Cambiar VERSION en cada publicación hace que la app detecte la actualización y se recargue sola. */
const VERSION = '1.2.0';
const CACHE = 'ajedrez-pro-' + VERSION;
const CORE = ["./", "index.html", "manifest.webmanifest", "js/app.js", "js/board.js", "js/chess.js", "js/cloud.js", "js/engine.js", "js/pieces.js", "js/sf19.js", "js/sf19.wasm", "js/stockfish.js", "js/v-games.js", "js/v-learn.js", "js/v-play.js", "js/v-roadmap.js", "js/v-strategy.js", "js/v-train.js", "data/knowledge.js", "data/lessons.js", "data/openings.js", "data/puzzles.js", "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-192.png", "icons/icon-512-maskable.png", "icons/icon-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); });
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const big = /\.wasm$|stockfish\.js$|sf19\.js$/.test(e.request.url);
  if (big) { // el motor no cambia entre versiones: caché primero
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return res; })));
    return;
  }
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('index.html'))));
});
