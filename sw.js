/* Service worker: guarda la app completa para usarla sin conexión. */
const CACHE = 'ajedrez-pro-v1';
const FILES = [
"./",
"index.html",
"manifest.webmanifest",
"js/app.js",
"js/board.js",
"js/chess.js",
"js/engine.js",
"js/pieces.js",
"js/sf19.js",
"js/sf19.wasm",
"js/stockfish.js",
"js/v-games.js",
"js/v-learn.js",
"js/v-play.js",
"js/v-roadmap.js",
"js/v-strategy.js",
"js/v-train.js",
"data/knowledge.js",
"data/lessons.js",
"data/openings.js",
"data/puzzles.js",
"icons/apple-touch-icon.png",
"icons/favicon-32.png",
"icons/icon-192.png",
"icons/icon-512-maskable.png",
"icons/icon-512.png"
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
