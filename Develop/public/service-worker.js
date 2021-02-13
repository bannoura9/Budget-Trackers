const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/db.js",
  "https://fonts.googleapis.com/css?family=Istok+Web|Montserrat:800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
];

const PRECACHE = "precache-v2";
const RUNTIME = "runtime";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

