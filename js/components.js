// =============================================
// 共用元件載入器
// 動態注入 header 與 footer，避免各頁重複撰寫
// =============================================

/**
 * 根據目前頁面路徑計算相對根目錄路徑
 * @returns {string} 根目錄相對路徑
 */
function getRootPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // GitHub Pages 部署時路徑深度需扣除 repo 名稱
  const isPages = window.location.pathname.includes('/pages/');
  return isPages ? '../' : './';
}

const ROOT = getRootPath();

// =============================================
// Header 元件
// =============================================
function renderHeader(activePage = '') {
  const navLinks = [
    { href: `${ROOT}index.html`,           icon: '🏠', label: '首頁' },
    { href: `${ROOT}pages/about.html`,     icon: '🎖', label: '關於我們' },
    { href: `${ROOT}pages/schedule.html`,  icon: '📅', label: '活動排程' },
    { href: `${ROOT}pages/checkin.html`,   icon: '📝', label: '社課簽到' },
    { href: `${ROOT}pages/finance.html`,   icon: '💰', label: '財務紀錄' },
    { href: `${ROOT}pages/knowledge.html`, icon: '📚', label: '知識分享' },
    { href: `${ROOT}pages/map.html`,       icon: '🗺️', label: '教室地圖' },
    { href: `${ROOT}pages/gun-loan.html`,  icon: '🔫', label: '槍枝借用' },
  ];

  const navHTML = navLinks.map(link => `
    <a href="${link.href}"
       class="nav-link flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-green-700 hover:text-yellow-300 transition-colors rounded-md ${activePage === link.label ? 'bg-green-700 text-yellow-300 font-semibold' : ''}">
      <span>${link.icon}</span>
      <span>${link.label}</span>
    </a>
  `).join('');

  const headerHTML = `
    <header class="site-header bg-green-900 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo / 品牌名稱 -->
        <a href="${ROOT}index.html" class="flex items-center gap-3 group">
          <img src="${ROOT}assets/images/NHMC.png" alt="NHMC Logo"
               class="w-9 h-9 rounded-full object-cover border-2 border-yellow-400 group-hover:border-yellow-300 transition-colors"
               onerror="this.style.display='none'">
          <div>
            <div class="text-yellow-400 font-bold text-lg leading-tight group-hover:text-yellow-300 transition-colors" style="font-family:'Oswald',sans-serif;">
              內湖高中軍武社
            </div>
            <div class="text-green-300 text-xs">NHMC · 9th</div>
          </div>
        </a>

        <!-- 桌面版導覽列 -->
        <nav class="hidden lg:flex items-center gap-1" id="desktopNav">
          ${navHTML}
          <a href="${ROOT}pages/admin.html" id="adminNavLink"
             class="nav-link hidden flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-green-700 hover:text-yellow-300 transition-colors rounded-md">
            <span>🛡️</span><span>幹部後台</span>
          </a>
        </nav>

        <!-- 右側操作區 -->
        <div class="flex items-center gap-3">
          <!-- 登入狀態指示器 -->
          <div id="authIndicator" class="hidden lg:flex items-center gap-2 text-sm">
            <span id="authStatusDot" class="w-2 h-2 rounded-full bg-red-500"></span>
            <span id="authStatusText" class="text-gray-400 text-xs">未登入</span>
          </div>

          <!-- 漢堡選單按鈕（手機版） -->
          <button id="mobileMenuBtn"
                  class="lg:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-green-800 transition-colors"
                  aria-label="開啟選單" aria-expanded="false">
            <span class="hamburger-line w-6 h-0.5 bg-yellow-400 block transition-all duration-300"></span>
            <span class="hamburger-line w-6 h-0.5 bg-yellow-400 block transition-all duration-300"></span>
            <span class="hamburger-line w-6 h-0.5 bg-yellow-400 block transition-all duration-300"></span>
          </button>
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <div id="mobileMenu"
           class="lg:hidden overflow-hidden max-h-0 transition-all duration-300 ease-in-out bg-green-950 border-t border-green-800">
        <nav class="px-4 py-2 space-y-1">
          ${navHTML}
          <a href="${ROOT}pages/admin.html" id="adminMobileLink"
             class="nav-link hidden flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-green-700 hover:text-yellow-300 transition-colors rounded-md">
            <span>🛡️</span><span>幹部後台</span>
          </a>
          <div class="border-t border-green-800 pt-2 mt-2">
            <div id="mobileAuthStatus" class="px-4 py-2 text-xs text-gray-400">🔒 幹部尚未登入</div>
            <button id="mobileLogoutBtn"
                    class="hidden w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900 hover:text-red-300 transition-colors rounded-md">
              🚪 登出
            </button>
          </div>
        </nav>
      </div>
    </header>
  `;

  // 注入 header
  const placeholder = document.getElementById('site-header');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // 初始化手機選單
  initMobileMenu();
  // 初始化 Auth 狀態監聽
  initAuthState();
}

// =============================================
// Footer 元件
// =============================================
function renderFooter() {
  const footerHTML = `
    <footer class="site-footer bg-gray-900 border-t border-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- 品牌資訊 -->
          <div>
            <h3 class="text-yellow-400 font-bold text-lg mb-2" style="font-family:'Oswald',sans-serif;">內湖高中軍武社</h3>
            <p class="text-gray-400 text-sm leading-relaxed">紀律・榮譽・責任<br>NHMC 9th · 內湖高中</p>
          </div>
          <!-- 快速連結 -->
          <div>
            <h4 class="text-gray-300 font-semibold text-sm mb-3 uppercase tracking-wider">快速連結</h4>
            <ul class="space-y-1.5">
              <li><a href="${ROOT}pages/about.html" class="text-gray-400 hover:text-yellow-300 text-sm transition-colors">關於我們</a></li>
              <li><a href="${ROOT}pages/schedule.html" class="text-gray-400 hover:text-yellow-300 text-sm transition-colors">活動排程</a></li>
              <li><a href="${ROOT}pages/checkin.html" class="text-gray-400 hover:text-yellow-300 text-sm transition-colors">社課簽到</a></li>
              <li><a href="${ROOT}pages/knowledge.html" class="text-gray-400 hover:text-yellow-300 text-sm transition-colors">知識分享</a></li>
            </ul>
          </div>
          <!-- 聯絡資訊 -->
          <div>
            <h4 class="text-gray-300 font-semibold text-sm mb-3 uppercase tracking-wider">聯絡我們</h4>
            <ul class="space-y-1.5">
              <li>
                <a href="https://line.me/ti/g/ssQssHJu4D" target="_blank" rel="noopener"
                   class="text-gray-400 hover:text-yellow-300 text-sm transition-colors flex items-center gap-2">
                  💬 LINE 社群
                </a>
              </li>
              <li class="text-gray-400 text-sm">📸 IG：@nhmc.9th</li>
              <li class="text-gray-400 text-sm">🏫 內湖高中 C棟 5樓 205</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p class="text-gray-500 text-xs">&copy; 2025 內湖高中軍武社 · 版權所有</p>
          <p class="text-gray-600 text-xs">設計者：奕嘉 | 重新架構版本</p>
        </div>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('site-footer');
  if (placeholder) {
    placeholder.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
}

// =============================================
// 手機選單互動
// =============================================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.style.maxHeight && menu.style.maxHeight !== '0px';
    if (isOpen) {
      menu.style.maxHeight = '0px';
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelectorAll('.hamburger-line').forEach((line, i) => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    } else {
      menu.style.maxHeight = menu.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
      const lines = btn.querySelectorAll('.hamburger-line');
      if (lines[0]) lines[0].style.transform = 'translateY(8px) rotate(45deg)';
      if (lines[1]) { lines[1].style.opacity = '0'; lines[1].style.transform = 'scaleX(0)'; }
      if (lines[2]) lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    }
  });

  // 點擊外部關閉
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.style.maxHeight = '0px';
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelectorAll('.hamburger-line').forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  });
}

// =============================================
// Auth 狀態監聽（共用）
// =============================================
function initAuthState() {
  if (typeof auth === 'undefined') return;

  auth.onAuthStateChanged(user => {
    const adminNavLink = document.getElementById('adminNavLink');
    const adminMobileLink = document.getElementById('adminMobileLink');
    const authStatusDot = document.getElementById('authStatusDot');
    const authStatusText = document.getElementById('authStatusText');
    const mobileAuthStatus = document.getElementById('mobileAuthStatus');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    if (user) {
      if (adminNavLink) adminNavLink.classList.remove('hidden');
      if (adminMobileLink) adminMobileLink.classList.remove('hidden');
      if (authStatusDot) { authStatusDot.classList.remove('bg-red-500'); authStatusDot.classList.add('bg-green-400'); }
      if (authStatusText) authStatusText.textContent = user.email.split('@')[0];
      if (mobileAuthStatus) mobileAuthStatus.textContent = `✅ ${user.email.split('@')[0]} 已登入`;
      if (mobileLogoutBtn) mobileLogoutBtn.classList.remove('hidden');
    } else {
      if (adminNavLink) adminNavLink.classList.add('hidden');
      if (adminMobileLink) adminMobileLink.classList.add('hidden');
      if (authStatusDot) { authStatusDot.classList.remove('bg-green-400'); authStatusDot.classList.add('bg-red-500'); }
      if (authStatusText) authStatusText.textContent = '未登入';
      if (mobileAuthStatus) mobileAuthStatus.textContent = '🔒 幹部尚未登入';
      if (mobileLogoutBtn) mobileLogoutBtn.classList.add('hidden');
    }
  });

  // 手機版登出按鈕
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'mobileLogoutBtn') {
      auth.signOut();
    }
  });
}

// =============================================
// 頁面淡入淡出過渡
// =============================================
function initPageTransition() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (link.target === '_blank') return;
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = href; }, 350);
  });
}
