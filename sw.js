/* AXION Combustible · Service worker: la app abre sin señal. Cambie VERSION al publicar una mejora. */
var VERSION = 'comb-v3';
var ARCHIVOS = ['./', 'index.html', 'styles.css', 'config.js', 'analisis.js', 'graficos.js', 'app.js', 'icono.svg', 'icono-192.png', 'icono-512.png',
  'icono-maskable-512.png', 'apple-touch-icon.png', 'manifest.webmanifest', 'plantilla.html'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // la API nunca se guarda en caché
  e.respondWith(fetch(e.request).then(function (r) {
    var copia = r.clone();
    caches.open(VERSION).then(function (c) { c.put(e.request, copia); });
    return r;
  }).catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match('index.html'); }); }));
});
