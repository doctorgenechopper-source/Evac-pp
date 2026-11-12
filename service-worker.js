const CACHE = 'evac-v4';
const FILES = [
  './',
  './index.html',
  './sandbag.html',
  './convert.html',
  './map.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// キャッシュ優先で応答（オフライン対応）
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
