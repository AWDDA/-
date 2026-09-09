/* מאזן — service worker: אופליין מלא לקבצי האפליקציה */
const CACHE = 'maazan-glass-v28';
const ASSETS = ['./', './index.html', './app.js', './cloud.js', './exercises.js', './manifest.webmanifest',
                './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  /* קוד האפליקציה: רשת קודם, cache כגיבוי. כך עדכון נכנס לתוקף
     בטעינה הראשונה שיש בה רשת, בלי להמתין למחזור חיים של SW.
     שאר הנכסים נשארים cache-first כדי לשמור על מהירות ואופליין. */
  const url = new URL(req.url);
  const isCode = url.origin === location.origin &&
                 /\.(js|html|webmanifest)$/.test(url.pathname);
  if (isCode) {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok && new URL(req.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
