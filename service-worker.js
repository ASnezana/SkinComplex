const CACHE_NAME = 'skincomplex-cache-v2';

// Pliki statyczne / priorytetowe
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/polityka-prywatnosci.html',
  '/style.css',
  '/script.js',
  '/site.webmanifest',
  '/images/apple-touch-icon.png',
  '/images/favicon-32x32.png',
  '/images/favicon-16x16.png',
  '/images/logo-bez-tla.png'
];

// Limit obrazów w cache galerii
const MAX_IMAGE_CACHE = 30;

// Instalacja SW – cache plików statycznych
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Aktywacja – usuwa stare cache
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

// Funkcja ograniczająca liczbę obrazów w cache
async function limitImageCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const imageKeys = keys.filter(req => req.url.match(/\.(jpg|jpeg|png|webp)$/i));
  if (imageKeys.length > maxItems) {
    await cache.delete(imageKeys[0]);
    await limitImageCache(cacheName, maxItems);
  }
}

// Obsługa fetch – cache + sieć
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then(networkResponse => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              if (event.request.url.match(/\.(jpg|jpeg|png|webp)$/i)) {
                cache.put(event.request, responseClone).then(() => {
                  limitImageCache(CACHE_NAME, MAX_IMAGE_CACHE);
                });
              }
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Opcjonalnie: cache miniatur galerii
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_THUMBNAILS') {
    caches.open(CACHE_NAME).then(cache => {
      event.data.urls.forEach(url => {
        if (url.match(/\.(jpg|jpeg|png|webp)$/i)) {
          cache.add(url).catch(() => {});
        }
      });
    });
  }
});



/*
Funkcje:

- Priorytetowe cache: HTML, CSS, JS, manifest oraz ikony (STATIC_ASSETS).
- Dynamiczne cache’owanie obrazów galerii z limitem, aby nie zajmować zbyt dużo miejsca.
- Fallback offline dla dokumentów (index.html).
- Automatyczne czyszczenie starych wersji cache przy aktualizacji.
- Natychmiastowa aktywacja nowej wersji service workera (skipWaiting + clients.claim).
*/
