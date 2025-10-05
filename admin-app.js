import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    query,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ★★★★★ここからが新しい構造です★★★★★

// --- アプリケーションのエントリーポイント ---
// DOM（HTML）の読み込みが完了したら、すべての処理を開始する
document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth(window.firebaseApp);
    const db = getFirestore(window.firebaseApp);
    let currentUser = null;

    // --- DOM Elements ---
    const sidebarNav = document.getElementById('sidebar-nav');
    const views = {
        'dashboard': document.getElementById('dashboard-view'),
        'reservations': document.getElementById('reservations-view'),
        'customers': document.getElementById('customers-view'),
        'staff': document.getElementById('staff-view'),
        'menus': document.getElementById('menus-view'),
        'options': document.getElementById('options-view'),
        'tickets': document.getElementById('tickets-view'),
        'coupons': document.getElementById('coupons-view'),
        'settings': document.getElementById('settings-view'),
    };
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseXBtn = document.getElementById('modal-close-x-btn');

    // --- State ---
    let reservationDate = new Date('2025-10-02');

    // --- 認証状態の監視 ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            console.log("Admin page access authorized for:", user.uid);
            // ログインが確認されたら、アプリケーションのUIを初期化
            initializeAppUI();
        } else {
            console.log("User not logged in. Redirecting...");
            window.location.href = 'index.html';
        }
    });

    // --- UIの初期化とイベントリスナー設定 ---
    function initializeAppUI() {
        if (!sidebarNav) {
            console.error("Sidebar navigation not found!");
            return;
        }

        sidebarNav.addEventListener('click', (e) => {
            e.preventDefault(); // これでURLに#が付かなくなります
            const link = e.target.closest('.sidebar-link');
            if (link && link.dataset.view) {
                switchView(link.dataset.view);
            }
        });

        document.querySelector('main').addEventListener('click', (e) => {
            const addMenuBtn = e.target.closest('#add-menu-btn');
            if (addMenuBtn) handleAddMenu();
            // 今後、他のボタンのイベントもここに追加
        });

        modalCloseBtn.addEventListener('click', closeModal);
        modalCloseXBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // 最初に表示するビューを設定
        switchView('dashboard');
        lucide.createIcons();
    }

    // --- View Switching & Data Loading ---
    async function switchView(targetView) {
        Object.values(views).forEach(view => {
            if (view) view.classList.add('hidden');
        });
        if (views[targetView]) {
            views[targetView].classList.remove('hidden');
        }

        const links = sidebarNav.querySelectorAll('.sidebar-link');
        links.forEach(link => {
            link.classList.toggle('active', link.dataset.view === targetView);
        });

        // 各ビューのデータを読み込む
        switch (targetView) {
            case 'dashboard': renderDashboard(); break;
            case 'reservations': renderReservations(); break;
            case 'customers': renderCustomers(); break;
            case 'staff': renderStaff(); break;
            case 'menus': await loadAndRenderMenus(); break;
            case 'options': renderOptions(); break;
            case 'tickets': renderTickets(); break;
            case 'coupons': renderCoupons(); break;
            case 'settings': renderSettings(); break;
        }
    }

    async function loadAndRenderMenus() {
        if (!currentUser) return;
        
        const menus = [];
        const menusCollectionRef = collection(db, "salons", currentUser.uid, "menus");
        const q = query(menusCollectionRef);
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            menus.push({ id: doc.id, ...doc.data() });
        });

        console.log("Loaded menus from Firestore:", menus);
        renderMenus(menus);
    }

    // --- Render Functions ---
    function renderMenus(menus = []) {
        const container = views['menus'].querySelector('.bg-white');
        if (!container) return;
        container.innerHTML = `
            <div class="flex justify-end mb-4"><button id="add-menu-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規メニューを追加</button></div>
            <div class="space-y-3">
            ${menus.length > 0 ? menus.map(m => `
                <div class="p-4 border rounded-lg flex justify-between items-center">
                    <div><h4 class="font-bold">${m.name}</h4><p class="text-sm text-gray-500">¥${Number(m.price).toLocaleString()} / ${m.time}分</p></div>
                    <div class="space-x-2">
                        <button class="edit-menu-btn text-gray-500 hover:text-purple-600 p-2" data-id="${m.id}"><i data-lucide="edit"></i></button>
                        <button class="delete-menu-btn text-gray-500 hover:text-red-600 p-2" data-id="${m.id}"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            `).join('') : '<p class="text-gray-500 text-center py-4">メニューがまだ登録されていません。</p>'}
            </div>
        `;
        lucide.createIcons();
    }

    // --- Modal Functions ---
    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalContent) modalContent.classList.remove('scale-95');
        }, 10);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('opacity-0');
        if (modalContent) modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (modalBody) modalBody.innerHTML = '';
        }, 300);
    }

    // --- Event Handlers ---
    async function handleAddMenu() {
        modalTitle.textContent = '新規メニューを追加';
        modalBody.innerHTML = `
            <div class="space-y-4">
                <div><label class="font-semibold text-sm">メニュー名</label><input type="text" id="menu-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
                <div><label class="font-semibold text-sm">価格</label><input type="number" id="menu-price-input" class="w-full mt-1 p-2 border rounded-md"></div>
                <div><label class="font-semibold text-sm">施術時間 (分)</label><input type="number" id="menu-time-input" class="w-full mt-1 p-2 border rounded-md"></div>
            </div>
        `;
        modalConfirmBtn.onclick = async () => {
            const name = document.getElementById('menu-name-input').value;
            const price = document.getElementById('menu-price-input').value;
            const time = document.getElementById('menu-time-input').value;
            if (!name || !price || !time) {
                alert('すべての項目を入力してください。');
                return;
            }
            try {
                const menusCollectionRef = collection(db, "salons", currentUser.uid, "menus");
                await addDoc(menusCollectionRef, { name, price: Number(price), time: Number(time), createdAt: serverTimestamp() });
                closeModal();
                await loadAndRenderMenus();
            } catch (error) {
                console.error("Error adding menu: ", error);
                alert("メニューの追加に失敗しました。");
            }
        };
        openModal();
    }
    
    // --- ダミーデータとそれを使用するRender関数 ---
    // (これらは今後、順次Firebase化していきます)
    let dummySummaryData = { todayReservations: 8, monthlySales: '320,000', newCustomers: 12, customerTotal: 156, storeCode: '852146' };
    function renderDashboard() {
        const summaryContainer = document.getElementById('dashboard-summary');
        summaryContainer.innerHTML = `<div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-blue-100 text-blue-600 p-3 rounded-full mr-4"><i data-lucide="calendar-check"></i></div><div><p class="text-sm text-gray-500">本日の予約件数</p><p class="text-2xl font-bold">${dummySummaryData.todayReservations}件</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-green-100 text-green-600 p-3 rounded-full mr-4"><i data-lucide="circle-dollar-sign"></i></div><div><p class="text-sm text-gray-500">今月の売上 (概算)</p><p class="text-2xl font-bold">¥${dummySummaryData.monthlySales}</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-purple-100 text-purple-600 p-3 rounded-full mr-4"><i data-lucide="user-plus"></i></div><div><p class="text-sm text-gray-500">新規顧客数 (今月)</p><p class="text-2xl font-bold">${dummySummaryData.newCustomers}人</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4"><i data-lucide="users"></i></div><div><p class="text-sm text-gray-500">総顧客数</p><p class="text-2xl font-bold">${dummySummaryData.customerTotal}人</p></div></div>`;
        lucide.createIcons();
    }
    function renderReservations() { views['reservations'].querySelector('.bg-white').innerHTML = `<p>予約管理はここに表示されます</p>`; }
    function renderCustomers() { views['customers'].querySelector('.bg-white').innerHTML = `<p>顧客管理はここに表示されます</p>`; }
    function renderStaff() { views['staff'].querySelector('.bg-white').innerHTML = `<p>スタッフ管理はここに表示されます</p>`; }
    function renderOptions() { views['options'].querySelector('.bg-white').innerHTML = `<p>オプション設定はここに表示されます</p>`; }
    function renderTickets() { views['tickets'].querySelector('.bg-white').innerHTML = `<p>回数券管理はここに表示されます</p>`; }
    function renderCoupons() { views['coupons'].querySelector('.bg-white').innerHTML = `<p>クーポン管理はここに表示されます</p>`; }
    function renderSettings() { views['settings'].querySelector('.bg-white').innerHTML = `<p>店舗設定はここに表示されます</p>`; }

});