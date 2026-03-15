// =============================================
// Service Worker - 內湖高中軍武社
// 提供基本的快取與離線支援
// =============================================

const CACHE_NAME = 'nhmc-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './js/firebase-config.js',
  './js/components.js',
  './assets/images/NHMC.png',
  './assets/images/IMG_1645.jpg',
  './assets/images/classroom.png',
  './pages/about.html',
  './pages/schedule.html',
  './pages/checkin.html',
  './pages/finance.html',
  './pages/knowledge.html',
  './pages/map.html',
  './pages/gun-loan.html'
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
            return caches.match('./index.html');
          }
        });
      })
  );
});
