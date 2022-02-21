if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        self.addEventListener('install', (event) => {
            event.waitUntil(
              caches.open('v2').then((cache) => {
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
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
    
  }
  