// Firebase SDKのインポート (後で使うために残しておきます)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    updateDoc,
    serverTimestamp,
    setLogLevel,
    onSnapshot,
    query
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


// ========================================================================
// --- 開発用設定 & ダミーデータ ---
// ========================================================================
// --- ダミーデータ ---
const dummyUser = {
    email: 'salon-owner@example.com',
};

const dummySalonData = {
    name: 'ダミーサロン「Beauty Potal」',
    address: '東京都渋谷区ダミー1-2-3'
};

let dummyMenus = [
    { name: 'カット', price: 5000 },
    { name: 'カラー', price: 7000 },
    { name: 'トリートメント', price: 4500 }
];
// ========================================================================


// --- Firebaseの初期化 (開発中はコメントアウト) ---
/*
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

let app, auth, db;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    setLogLevel('debug');
    console.log("Firebase Initialized Successfully");
} catch (e) {
    console.error("Firebase initialization error:", e);
}
*/


// --- DOM Elements ---
const authLinks = document.getElementById('auth-links');
const landingPageView = document.getElementById('landing-page-view');
const dashboardView = document.getElementById('dashboard-view');
const salonSetupView = document.getElementById('salon-setup-view');
const welcomeMessage = document.getElementById('welcome-message');

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

// --- Menu Elements ---
const menuList = document.getElementById('menu-list');

// --- Modal Control ---
function openModal(modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
        if(modal.querySelector('.modal-overlay')) modal.querySelector('.modal-overlay').classList.remove('opacity-0');
        if(modal.querySelector('.modal-content')) modal.querySelector('.modal-content').classList.remove('scale-95');
    }, 10);
}

function closeModal(modal) {
    if(modal.querySelector('.modal-overlay')) modal.querySelector('.modal-overlay').classList.add('opacity-0');
    if(modal.querySelector('.modal-content')) modal.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- View Management ---
const showSalonSetupView = (user) => {
    landingPageView.classList.add('hidden');
    dashboardView.classList.add('hidden');
    salonSetupView.classList.remove('hidden');
    authLinks.innerHTML = `
        <span class="text-gray-600">${user.email}</span>
        <button id="logout-button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">ログアウト</button>
    `;
    // ログアウトボタンは未ログインページにリダイレクトするようにします
    document.getElementById('logout-button').addEventListener('click', () => {
        window.location.reload(); 
    });
};

const updateUIForLoggedInUser = (user, userData, salonData) => {
    landingPageView.classList.add('hidden');
    salonSetupView.classList.add('hidden');
    dashboardView.classList.remove('hidden');

    const salonTabButton = document.getElementById('salon-tab');
    const customerTabButton = document.getElementById('customer-tab');

    if (userData.role === 'salon' && salonData) {
        welcomeMessage.textContent = `${salonData.name}のダッシュボードへようこそ！`;
        renderMenuSettings(); // 引数なしでダミーデータを表示
        customerTabButton.style.display = 'none';
        salonTabButton.style.display = 'flex';
        switchDashboardTab('salon');
    } else { // Customer view
        welcomeMessage.textContent = `${user.email} さん、ようこそ！`;
        document.getElementById('customer-view').innerHTML = `<p class="text-gray-600">あなたの予約履歴、利用可能なクーポンなどがここに表示されます。</p>`;
        salonTabButton.style.display = 'none';
        customerTabButton.style.display = 'flex';
        switchDashboardTab('customer');
    }
    
    authLinks.innerHTML = `
        <span class="text-gray-600">${userData.role === 'salon' ? 'サロン' : '顧客'}</span>
        <button id="logout-button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">ログアウト</button>
    `;
    document.getElementById('logout-button').addEventListener('click', () => {
        window.location.reload();
    });
};

const updateUIForLoggedOutUser = () => {
    landingPageView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    salonSetupView.classList.add('hidden');
    
    authLinks.innerHTML = `
        <a href="#features" class="text-gray-600 hover:text-purple-600">機能紹介</a>
        <a href="#pricing" class="text-gray-600 hover:text-purple-600">料金プラン</a>
        <button id="login-button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">ログイン</button>
        <button id="signup-button" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md">無料で始める</button>
    `;
    document.getElementById('login-button').addEventListener('click', () => openModal(loginModal));
    document.getElementById('signup-button').addEventListener('click', () => openModal(signupModal));
};

// --- Firebaseの認証状態監視 (開発中はコメントアウト) ---
/*
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // ... (省略) ...
    } else {
        updateUIForLoggedOutUser();
    }
});
*/

// --- 開発用の画面初期化処理 ---
document.addEventListener('DOMContentLoaded', () => {
    // 初期表示は未ログイン画面
    updateUIForLoggedOutUser();
    
    // 開発用スイッチャーのセットアップ
    setupDevSwitcher();

    // アイコンの初期化
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- 開発用スイッチャーのセットアップ ---
function setupDevSwitcher() {
    document.querySelectorAll('.dev-btn').forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            console.log(`開発モードを '${mode}' に切り替えます。`);
            switch(mode) {
                case 'salon_dashboard':
                    updateUIForLoggedInUser(dummyUser, { role: 'salon', salonId: 'dummy-salon-id' }, dummySalonData);
                    break;
                case 'salon_setup':
                    showSalonSetupView(dummyUser);
                    break;
                case 'customer_dashboard':
                    const customerUser = { email: 'customer@example.com' };
                    updateUIForLoggedInUser(customerUser, { role: 'customer' }, null);
                    break;
                case 'logged_out':
                default:
                    updateUIForLoggedOutUser();
                    break;
            }
        });
    });
}


// --- ダミーデータ用メニュー表示関数 ---
function renderMenuSettings() {
    if (!dummyMenus || dummyMenus.length === 0) {
        menuList.innerHTML = `<p class="text-gray-500">現在登録されているメニューはありません。</p>`;
        return;
    }

    menuList.innerHTML = ''; // 現在のリストをクリア
    dummyMenus.forEach((menu) => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg border';
        menuItemElement.innerHTML = `
            <span class="font-medium">${menu.name}</span>
            <span class="text-gray-600">${Number(menu.price).toLocaleString()}円</span>
        `;
        menuList.appendChild(menuItemElement);
    });
}


// --- Event Listeners ---
// Modal Triggers from Landing Page
if(document.getElementById('cta-salon-signup')) {
    document.getElementById('cta-salon-signup').addEventListener('click', () => {
        if(signupModal) {
            signupModal.querySelector('input[name="role"][value="salon"]').checked = true;
            openModal(signupModal);
        }
    });
}
if(document.getElementById('cta-customer-signup')) {
    document.getElementById('cta-customer-signup').addEventListener('click', () => {
        if(signupModal) {
            signupModal.querySelector('input[name="role"][value="customer"]').checked = true;
            openModal(signupModal);
        }
    });
}

// Modal Close Buttons
if(document.getElementById('close-login-modal')) {
    document.getElementById('close-login-modal').addEventListener('click', () => closeModal(loginModal));
}
if(document.getElementById('close-signup-modal')) {
    document.getElementById('close-signup-modal').addEventListener('click', () => closeModal(signupModal));
}
if(loginModal) {
    loginModal.addEventListener('click', (e) => e.target === loginModal && closeModal(loginModal));
}
if(signupModal) {
    signupModal.addEventListener('click', (e) => e.target === signupModal && closeModal(signupModal));
}


// Login Form Submission
if(document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("ログインフォームが送信されました（ダミー）");
        // ここで 'salon_dashboard' に切り替えるなどの挙動をシミュレートできます
        closeModal(loginModal);
        alert("開発モードです。左下のスイッチャーでダッシュボードを表示してください。");
    });
}

// Signup Form Submission
if(document.getElementById('signup-form')) {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("新規登録フォームが送信されました（ダミー）");
        closeModal(signupModal);
        alert("開発モードです。左下のスイッチャーでダッシュボードを表示してください。");
    });
}

// Salon Setup Form Submission
if(document.getElementById('salon-setup-form')) {
    document.getElementById('salon-setup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const salonName = document.getElementById('salon-name').value;
        const salonAddress = document.getElementById('salon-address').value;
        console.log("サロン情報が登録されました（ダミー）:", { salonName, salonAddress });

        // ダッシュボードビューに切り替え
        updateUIForLoggedInUser(dummyUser, { role: 'salon', salonId: 'dummy-id' }, { name: salonName, address: salonAddress });
    });
}

// Menu Form Submission
if(document.getElementById('add-menu-form')) {
    document.getElementById('add-menu-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const menuName = document.getElementById('menu-name').value;
        const menuPrice = document.getElementById('menu-price').value;

        console.log("メニューが追加されました（ダミー）:", { menuName, menuPrice });

        // ダミーのメニュー配列に新しいメニューを追加
        dummyMenus.push({
            name: menuName,
            price: Number(menuPrice)
        });

        // メニューリストを再描画
        renderMenuSettings();
        
        // フォームをリセット
        e.target.reset();
    });
}


// --- Dashboard Tab Switching ---
function switchDashboardTab(tab) {
    const salonTab = document.getElementById('salon-tab');
    const customerTab = document.getElementById('customer-tab');
    const salonView = document.getElementById('salon-view');
    const customerView = document.getElementById('customer-view');

    // Reset all tabs
    [salonTab, customerTab].forEach(t => {
        if(t) t.classList.remove('tab-active', 'text-gray-500');
    });
    
    if (tab === 'salon') {
        salonTab.classList.add('tab-active');
        customerTab.classList.add('text-gray-500');
        salonView.classList.remove('hidden');
        customerView.classList.add('hidden');
    } else {
        customerTab.classList.add('tab-active');
        salonTab.classList.add('text-gray-500');
        salonView.classList.add('hidden');
        customerView.classList.remove('hidden');
    }
}
// Make function globally available for onclick attributes
window.switchDashboardTab = switchDashboardTab;

