const navLinks = [
  { name: '首頁', href: 'index.html', icon: '🏠' },
  { name: '關於我們', href: 'pages/about.html', icon: '🎖' },
  { name: '活動排程', href: 'pages/schedule.html', icon: '📅' },
  { name: '社課簽到', href: 'pages/checkin.html', icon: '📝' },
  { name: '財務紀錄', href: 'pages/finance.html', icon: '💰' },
  { name: '知識分享', href: 'pages/knowledge.html', icon: '📚' },
  { name: '教室地圖', href: 'pages/map.html', icon: '🗺️' },
  { name: '槍枝借用', href: 'pages/gun-loan.html', icon: '🔫' },
];

function renderHeader(currentPageTitle = '') {
  const header = document.getElementById('site-header');
  if (!header) return;

  const currentPath = window.location.pathname;
  const basePath = '/nhmc9th-redesign/'; // GitHub Pages base path

  const navHTML = navLinks.map(link => {
    const fullHref = basePath + link.href;
    const isActive = currentPath === fullHref || (currentPath.startsWith(basePath + 'pages/') && fullHref.includes(currentPath.split('/').pop()));
    return `
      <a href="${fullHref}"
         class="nav-link flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 hover:text-yellow-300 transition-colors rounded-md
         ${isActive ? 'bg-gray-700 text-yellow-300 font-semibold' : ''}"
      >
        <span>${link.icon}</span>
        <span>${link.name}</span>
      </a>
    `;
  }).join('');

  header.innerHTML = `
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <a href="${basePath}index.html" class="flex items-center gap-2 text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-200" style="font-family: 'Oswald', sans-serif;">
        <img src="${basePath}assets/images/NHMC.png" alt="NHMC Logo" class="w-10 h-10 rounded-full border-2 border-yellow-500">
        NHMC
      </a>

      <nav class="hidden md:flex items-center space-x-1">
        ${navHTML}
        <a href="${basePath}login.html" class="btn btn-primary ml-4 text-xs px-3 py-1.5">
          🔑 幹部登入
        </a>
      </nav>

      <button id="mobile-menu-button" class="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span class="sr-only">開啟主選單</span>
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div id="mobile-menu" class="md:hidden hidden bg-gray-900 bg-opacity-95 backdrop-filter backdrop-blur-lg shadow-lg py-2">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        ${navLinks.map(link => {
          const fullHref = basePath + link.href;
          const isActive = currentPath === fullHref || (currentPath.startsWith(basePath + 'pages/') && fullHref.includes(currentPath.split('/').pop()));
          return `
            <a href="${fullHref}"
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700
               ${isActive ? 'bg-gray-800 text-yellow-300' : ''}"
            >
              ${link.icon} ${link.name}
            </a>
          `;
        }).join('')}
        <a href="${basePath}login.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
          🔑 幹部登入
        </a>
      </div>
    </div>
  `;

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mobileMenu && mobileMenuButton && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const basePath = '/nhmc9th-redesign/'; // GitHub Pages base path

  footer.innerHTML = `
    <div class="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
      <p>&copy; 2025 內湖高中軍武社. All rights reserved.</p>
      <p class="mt-2">紀律 • 榮譽 • 責任</p>
      <div class="flex justify-center space-x-4 mt-4">
        <a href="https://line.me/R/ti/g/YOUR_LINE_GROUP_ID" target="_blank" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.72 13.68c-.16.08-.32.12-.48.12-.16 0-.32-.04-.48-.12-.16-.08-.28-.2-.36-.36-.08-.16-.12-.32-.12-.48 0-.16.04-.32.12-.48.08-.16.2-.28.36-.36.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08.28.2.36.36.08.16.12.32.12.48 0 .16-.04.32-.12.48-.08.16-.2.28-.36.36zM7.28 13.68c-.16.08-.32.12-.48.12-.16 0-.32-.04-.48-.12-.16-.08-.28-.2-.36-.36-.08-.16-.12-.32-.12-.48 0-.16.04-.32.12-.48.08-.16.2-.28.36-.36.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08.28.2.36.36.08.16.12.32.12.48 0 .16-.04.32-.12.48-.08.16-.2.28-.36.36z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/nhmc.9th/" target="_blank" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 0C8.74 0 8.333.01 7.05 0.07c-1.26.06-2.02.24-2.58.47-.56.23-1.02.55-1.48.99-.46.44-.78.9-.99 1.48-.23.56-.41 1.32-.47 2.58-.06 1.28-.07 1.69-.07 5.05s.01 3.77.07 5.05c.06 1.26.24 2.02.47 2.58.23.56.55 1.02.99 1.48.44.46.9 0.78 1.48.99.56.23 1.32.41 2.58.47 1.28.06 1.69.07 5.05.07s3.77-.01 5.05-.07c1.26-.06 2.02-.24 2.58-.47.56-.23 1.02-.55 1.48-.99.46-.44.78-.9.99-1.48.23-.56.41-1.32.47-2.58.06-1.28.07-1.69.07-5.05s-.01-3.77-.07-5.05c-.06-1.26-.24-2.02-.47-2.58-.23-.56-.55-1.02-.99-1.48-.44-.46-.9-.78-1.48-.99-.56-.23-1.32-.41-2.58-.47C15.77 0.01 15.367 0 12 0zm0 2.16c3.2 0 3.585.016 4.85.07c1.17.05 1.7.24 2.02.37.34.14.67.3.92.55.25.25.41.58.55.92.13.32.32.85.37 2.02.05 1.26.07 1.64.07 4.85s-.02 3.585-.07 4.85c-.05 1.17-.24 1.7-.37 2.02-.14.34-.3.67-.55.92-.25.25-.58.41-.92.55-.32.13-.85.32-2.02.37-1.26.05-1.64.07-4.85.07s-3.585-.02-4.85-.07c-1.17-.05-1.7-.24-2.02-.37-.34-.14-.67-.3-.92-.55-.25-.25-.41-.58-.55-.92-.13-.32-.32-.85-.37-2.02-.05-1.26-.07-1.64-.07-4.85s.02-3.585.07-4.85c.05-1.17.24-1.7.37-2.02.14-.34.3-.67.55-.92.25-.25.58-.41.92-.55.32-.13.85-.32 2.02-.37C8.415 2.176 8.79 2.16 12 2.16zM12 6.865c-2.89 0-5.235 2.345-5.235 5.235s2.345 5.235 5.235 5.235 5.235-2.345 5.235-5.235-2.345-5.235-5.235-5.235zM12 15.05c-1.795 0-3.245-1.45-3.245-3.245S10.205 8.56 12 8.56s3.245 1.45 3.245 3.245-1.45 3.245-3.245 3.245zm5.338-8.562c0 .876-.712 1.588-1.588 1.588S13.99 7.374 13.99 6.498s.712-1.588 1.588-1.588 1.588.712 1.588 1.588z" clip-rule="evenodd"/>
          </svg>
        </a>
      </div>
    </div>
  `;
}

// 頁面過渡動畫
function initPageTransition() {
  const overlay = document.createElement('div');
  overlay.classList.add('page-transition-overlay');
  document.body.appendChild(overlay);

  window.addEventListener('beforeunload', () => {
    overlay.classList.remove('hidden');
  });

  window.addEventListener('load', () => {
    overlay.classList.add('hidden');
  });
}

// PWA 安裝提示
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

function showInstallPromotion() {
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.innerHTML = `
    <img src="/nhmc9th-redesign/assets/images/NHMC.png" alt="NHMC Logo" class="w-8 h-8">
    <div>
      <p class="font-bold">安裝內湖高中軍武社 App</p>
      <p class="text-gray-400 text-xs">新增至主畫面，體驗更快速、沉浸式的瀏覽。</p>
    </div>
    <button id="install-btn" class="btn btn-primary">安裝</button>
    <button id="close-install-banner" class="close-btn p-1 rounded-full hover:bg-gray-700">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;
  document.body.appendChild(banner);

  document.getElementById('install-btn').addEventListener('click', () => {
    banner.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });

  document.getElementById('close-install-banner').addEventListener('click', () => {
    banner.remove();
  });
}

// Toast 通知
function showToast(msg, success = true) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('success', 'error');
  toast.classList.add(success ? 'success' : 'error');
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 3000);
}
