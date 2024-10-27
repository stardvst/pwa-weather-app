const CACHE_NAME = 'version-1';
const cacheUrls = ['index.html', 'offline.html'];

const self = this;

// install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(cacheUrls);
      })
  )
});

// listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(async () => {
        try {
          return await fetch(event.request);
        } catch {
          return await caches.match('offline.html');
        }
      })
  )
});

// activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.forEach(cacheName => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      }))
    ))
});
