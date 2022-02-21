self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
            './pwa.html',
            './pwa.css',
            './pwa.js',
            './sw.js',
            './icon-192x192.png',
            './icon-256x256.png',
            './icon-384x384.png',
            './icon-512x512.png',
            './manifest.webmanifest',
            '../pwa/'
        ]);
      })
    );
  });