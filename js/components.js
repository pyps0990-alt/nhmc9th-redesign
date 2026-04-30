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

function getBasePath() {
  const path = window.location.pathname;
  // 檢查是否處於 pages 子目錄中
  if (path.includes('/pages/')) {
    return '../';
  }
  // 否則預設為當前目錄，確保在 GitHub Pages 子路徑下也能正確解析
  return './';
}

function renderHeader(currentPageTitle = '') {
  const header = document.getElementById('site-header');
  if (!header) return;

  const currentPath = window.location.pathname;
  const rootPath = getBasePath();

  const desktopDropdownItems = navLinks.map(link => {
    const isCurrentPageRoot = !currentPath.includes('/pages/');
    let fullHref = isCurrentPageRoot ? link.href : (link.href.startsWith('pages/') ? link.href.replace('pages/', '') : '../' + link.href);
    const isActive = link.name === currentPageTitle;

    return `
      <a href="${fullHref}" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${isActive ? 'bg-white/10 text-yellow-400 font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'}">
        <span class="text-lg opacity-80">${link.icon}</span>
        <span class="tracking-wide">${link.name}</span>
      </a>
    `;
  }).join('');

  header.innerHTML = `
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <a href="${rootPath}index.html" class="flex items-center gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 tracking-wider" style="font-family: 'Oswald', sans-serif;">
        <img src="${rootPath}assets/images/NHMC.png" alt="NHMC Logo" class="w-9 h-9 rounded-full border border-yellow-500/50 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
        NHMC
      </a>

      <nav class="hidden md:flex items-center space-x-1">
        <!-- 電腦版下拉選單 -->
        <div class="relative group">
          <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5">
            <span>社團功能選單</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          <!-- 下拉內容 (玻璃透視感) -->
          <div class="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 scale-95 group-hover:translate-y-0 group-hover:scale-100 z-50">
            <div class="bg-[#09090b]/50 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] p-2 flex flex-col gap-1">
              ${desktopDropdownItems}
            </div>
          </div>
        </div>

        <!-- 專業深色玻璃感：幹部登入按鈕 -->
        <a href="${rootPath}login.html" class="ml-4 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all shadow-lg">
          <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          幹部登入
        </a>
      </nav>

      <!-- 手機版漢堡選單按鈕 -->
      <button id="mobile-menu-button" class="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus:outline-none">
        <span class="sr-only">開啟主選單</span>
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- 手機版選單面版 (極致玻璃感) -->
    <div id="mobile-menu" class="md:hidden hidden bg-[#09090b]/40 backdrop-blur-3xl border-b border-white/5 shadow-2xl overflow-hidden transition-all duration-300">
      <div class="px-4 py-4 flex flex-col gap-1">
        ${navLinks.map(link => {
    const isCurrentPageRoot = !currentPath.includes('/pages/');
    let fullHref = isCurrentPageRoot ? link.href : (link.href.startsWith('pages/') ? link.href.replace('pages/', '') : '../' + link.href);
    const isActive = link.name === currentPageTitle;
    return `
            <a href="${fullHref}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive ? 'bg-white/10 text-yellow-400 font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'}">
              <span class="text-lg opacity-80">${link.icon}</span>
              <span class="tracking-wide">${link.name}</span>
            </a>
          `;
  }).join('')}
        <div class="h-px bg-white/10 my-2"></div>
        <a href="${rootPath}login.html" class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all mt-1">
          <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          幹部登入
        </a>
      </div>
    </div>
  `;

  // 行動版選單切換邏輯
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const rootPath = getBasePath();

  footer.innerHTML = `
    <div class="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
      <p>&copy; 2025 內湖高中軍武社. All rights reserved.</p>
      <p class="mt-2">紀律 • 榮譽 • 責任</p>
      <div class="flex justify-center space-x-4 mt-4">
        <a href="https://line.me/R/ti/g/YOUR_LINE_GROUP_ID" target="_blank" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200" aria-label="LINE 社群">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.72 13.68c-.16.08-.32.12-.48.12-.16 0-.32-.04-.48-.12-.16-.08-.28-.2-.36-.36-.08-.16-.12-.32-.12-.48 0-.16.04-.32.12-.48.08-.16.2-.28.36-.36.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08.28.2.36.36.08.16.12.32.12.48 0 .16-.04.32-.12.48-.08.16-.2.28-.36.36zM7.28 13.68c-.16.08-.32.12-.48.12-.16 0-.32-.04-.48-.12-.16-.08-.28-.2-.36-.36-.08-.16-.12-.32-.12-.48 0-.16.04-.32.12-.48.08-.16.2-.28.36-.36.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08.28.2.36.36.08.16.12.32.12.48 0 .16-.04.32-.12.48-.08.16-.2.28-.36.36z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/nhmc.9th/" target="_blank" class="text-gray-400 hover:text-yellow-400 transition-colors duration-200" aria-label="Instagram">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 0C8.74 0 8.333.01 7.05 0.07c-1.26.06-2.02.24-2.58.47-.56.23-1.02.55-1.48.99-.46.44-.78.9-.99 1.48-.23.56-.41 1.32-.47 2.58-.06 1.28-.07 1.69-.07 5.05s.01 3.77.07 5.05c.06 1.26.24 2.02.47 2.58.23.56.55 1.02.99 1.48.44.46.9 0.78 1.48.99.56.23 1.32.41 2.58.47 1.28.06 1.69.07 5.05.07s3.77-.01 5.05-.07c1.26-.06 2.02-.24 2.58-.47.56-.23 1.02-.55 1.48-.99.46-.44.78-.9.99-1.48.23-.56.41-1.32.47-2.58.06-1.28.07-1.69.07-5.05s-.01-3.77-.07-5.05c-.06-1.26-.24-2.02-.47-2.58-.23-.56-.55-1.02-.99-1.48-.44-.46-.9-.78-1.48-.99-.56-.23-1.32-.41-2.58-.47C15.77 0.01 15.367 0 12 0zm0 2.16c3.2 0 3.585.016 4.85.07c1.17.05 1.7.24 2.02.37.34.14.67.3.92.55.25.25.41.58.55.92.13.32.32.85.37 2.02.05 1.26.07 1.64.07 4.85s-.02 3.585-.07 4.85c-.05 1.17-.24 1.7-.37 2.02-.14.34-.3.67-.55.92-.25.25-.58.41-.92.55-.32.13-.85.32-2.02.37-1.26.05-1.64.07-4.85.07s-3.585-.02-4.85-.07c-1.17-.05-1.7-.24-2.02-.37-.34-.14-.67-.3-.92-.55-.25-.25-.41-.58-.55-.92-.13-.32-.32-.85-.37-2.02-.05-1.26-.07-1.64-.07-4.85s.02-3.585.07-4.85c.05-1.17.24-1.7.37-2.02.14-.34.3-.67.55-.92.25-.25.58-.41.92-.55.32-.13.85-.32 2.02-.37C8.415 2.176 8.79 2.16 12 2.16zM12 6.865c-2.89 0-5.235 2.345-5.235 5.235s2.345 5.235 5.235 5.235 5.235-2.345 5.235-5.235-2.345-5.235-5.235-5.235zM12 15.05c-1.795 0-3.245-1.45-3.245-3.245S10.205 8.56 12 8.56s3.245 1.45 3.245 3.245-1.45 3.245-3.245 3.245zm5.338-8.562c0 .876-.712 1.588-1.588 1.588S13.99 7.374 13.99 6.498s.712-1.588 1.588-1.588 1.588.712 1.588 1.588z" clip-rule="evenodd"/>
        </a>
      </div>
    </div>
  `;
}

// 移除過度動畫，保持簡潔
function initPageTransition() {
  // 已移除多餘動畫
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
  const rootPath = getBasePath();
  banner.innerHTML = `
    <img src="${rootPath}assets/images/NHMC.png" alt="NHMC Logo" class="w-8 h-8">
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
