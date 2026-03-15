// =============================================
// Service Worker - 內湖高中軍武社
// 提供基本的快取與離線支援
// =============================================

const CACHE_NAME = 'nhmc-v2';
const STATIC_ASSETS = [
  '/nhmc9th-redesign/',
  '/nhmc9th-redesign/index.html',
  '/nhmc9th-redesign/style.css',
  '/nhmc9th-redesign/manifest.json',
  '/nhmc9th-redesign/js/firebase-config.js',
  '/nhmc9th-redesign/js/components.js',
  '/nhmc9th-redesign/assets/images/NHMC.png',
  '/nhmc9th-redesign/assets/images/IMG_1645.jpg',
  '/nhmc9th-redesign/assets/images/classroom.png',
  '/nhmc9th-redesign/pages/about.html',
  '/nhmc9th-redesign/pages/schedule.html',
  '/nhmc9th-redesign/pages/checkin.html',
  '/nhmc9th-redesign/pages/finance.html',
  '/nhmc9th-redesign/pages/knowledge.html',
  '/nhmc9th-redesign/pages/map.html',
  '/nhmc9th-redesign/pages/gun-loan.html'
];

// 安裝：快取靜態資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('SW: Some assets failed to cache', err);
      });
    })
  );
  self.skipWaiting();
});

// 啟用：清除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 攔截請求：網路優先，快取備援
self.addEventListener('fetch', event => {
  // 跳過非 GET 請求和 Firebase 請求
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('firebase') || event.request.url.includes('googleapis')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 更新快取
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // 網路失敗時使用快取
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // 返回離線頁面
          if (event.request.destination === 'document') {
            return caches.match('/nhmc9th-redesign/index.html');
          }
        });
      })
  );
});
