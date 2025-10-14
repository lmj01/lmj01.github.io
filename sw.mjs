const cacheName = 'lmj01Doc';
const urlsToCache = [
    '/favicon.ico',
    '/index.html',
];
const NO_CACHE = [
    '/index.mjs',
    '/sw.mjs',
    '/time.txt',
];
function isNoCache(url) {
    return NO_CACHE.some(pattern => pattern.test ? pattern.test(url) : url.includes(pattern));
}
self.addEventListener('install', async function(){
    // console.log('[SW] install');
    // localStorage.setItem('sw', Date.now());
    const cahche = await caches.open(cacheName)
    urlsToCache.forEach(async(url) => {
        try {
            await cahche.add(url);
        } catch(e) {
            console.log('[SW] cache failure:', e, url);
        }
    })
    // await cahche.addAll(urlsToCache)
})
self.addEventListener('fetch', function(event) {
    // console.log('[SW] fetch event:', event.request.url);
    const request = event.request;
    // console.log('[SW] fetch:', request.url, isNoCache(request.url));
    if (isNoCache(request.url)) {
        // console.warn('[SW] no cache for:', request.url);
        return;
    }
    event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
    try {
        // console.log('[SW] fetching:', request.url);
        const response = await fetch(request);
        if (request.url.endsWith('.md')) {
            const newHeaders = new Headers(response.headers);
            newHeaders.set('Cross-Origin-Embedder-Policy', 'text/markdown');
            newHeaders.set('Cross-Origin-Embedder-Policy', 'text/markdown');
            return response;
        }
        if (request.method === 'GET') {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch (e) {
        const cacheResponse = await caches.match(request);
        if (cacheResponse === undefined) {
            console.warn('[SW] fetch failure:', e);  
        }
        return cacheResponse;
    }
}
