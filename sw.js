/* © 2026 Anuja Sharma. All rights reserved. See LICENSE. */
/* Brainbloom service worker: makes the app installable and usable offline.
   - App files: network first (always fresh when online), cached copy when offline.
   - Versioned library files from CDNs (Three.js, Firebase SDK): cached after first use.
   - Anything else (Firebase sign-in and database calls, other sites) is never touched.
   Bump VERSION whenever you publish a new build so every device refreshes its copy. */
const VERSION = 'bb-v6';
const SHELL = [
  './', 'index.html', 'privacy.html', 'about.html', 'styles.css', 'manifest.json', 'icon.svg',
  'content.js', 'i18n.js', 'hi.js', 'characters.js', 'mascots3d.js', 'intros.js', 'quotes.js', 'skits.js', 'summaries.js', 'promptlab.js', 'trading.js', 'business.js', 'creators.js', 'devpath.js', 'zh-content.js', 'zh.js',
  'firebase-config.js', 'cloud.js', 'fx.js', 'app.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png',
];
const CDN_LIBS = [/^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\//, /^https:\/\/www\.gstatic\.com\/firebasejs\//];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(SHELL);
    // the 3D engine: try to keep a copy so the characters also work offline (not fatal if this fails)
    try { await cache.add(new Request('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', { mode: 'cors' })); } catch (e) { /* online next time */ }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (CDN_LIBS.some((re) => re.test(req.url))) { // immutable, versioned files: cache first
    event.respondWith((async () => {
      const cache = await caches.open(VERSION), hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    })());
    return;
  }

  if (url.origin !== self.location.origin) return; // leave Firebase and every other site alone

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      const res = await fetch(req);
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    } catch (e) { // offline
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return (await cache.match('index.html')) || (await cache.match('./'));
      throw e;
    }
  })());
});
