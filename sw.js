const staticCacheName = 'cache-static';
const assetsUrls = [ 
    '/', 
    '/index.html',
    '/app.js', 
    '/src/timer.js', 
    '/src/quotes.js',
    'https://fonts.googleapis.com/css?family=Open+Sans&display=swap&subset=latin-ext',
    'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2',
    '/style.css',
    'https://cdn.jsdelivr.net/npm/vue',
    '/manifest.json',
    '/favicon.ico',
    'https://raw.githubusercontent.com/TheMadMike/Programmer-s-Timer/master/img/icons-192.png',
    'https://raw.githubusercontent.com/TheMadMike/Programmer-s-Timer/master/img/icons-512.png',
    '/audio/notify_break.mp3',
    '/audio/notify_session.mp3'
];

async function cacheAssets() {
    try {
        const cache = await caches.open(staticCacheName);
        return cache.addAll(assetsUrls);
    } catch(error) {
        console.log(error);
    }
}

self.addEventListener('install', event => {

    event.waitUntil(cacheAssets());

});

self.addEventListener('activate', event => {

});

self.addEventListener('fetch', event => {

    event.respondWith(
        
        caches.match(event.request).then(cacheResponse => {

            return cacheResponse || fetch(event.request);
        })
    );
});