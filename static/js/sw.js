self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("fitness-tracker-cache").then(cache => {
            return cache.addAll([
                "/templates/index.html",
                "/static/css/style.css",
                "/static/js/app.js",
                "/static/img/icon-192.png",
                "/static/img/icon-512.png"
            ]);
        })
    );
    console.log("Service Worker installiert");
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});