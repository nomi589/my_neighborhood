let cacheName = 'neighborhood_cache_v1';
let initalCacheItems = ['/', '/service_worker.js', '/static/js/bundle.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(initalCacheItems);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
