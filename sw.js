const CACHE_NAME = 'boom-iktv-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/LOGOCOMBO.jpg',
  '/studio.JPG',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. Install - Cache everything for instant loading
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 2. Activate - Clear out old versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
  return self.clients.claim();
});

// 3. Fetch - Serve from cache first, then network
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // DO NOT CACHE live streams or YouTube/Twitch frames
  if (url.hostname.includes('shoutcast') || url.hostname.includes('youtube') || url.hostname.includes('twitch')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});