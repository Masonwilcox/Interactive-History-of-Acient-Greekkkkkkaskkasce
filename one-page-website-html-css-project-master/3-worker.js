// (A) FILES TO CACHE
const cName = "JSFlashCard",
cFiles = [
  "1-flashcard.html",
  "2-flashcard.css",
  "2-flashcard.js",
  "assets/favicon.png",
  "assets/icon-512.png",
  "assets/mi.woff2"
];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(cName)
    .then(cache => cache.addAll(cFiles))
    .catch(err => console.error(err))
  );
});

// (C) LOAD FROM CACHE, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request)
  .then(res => res || fetch(evt.request))
));