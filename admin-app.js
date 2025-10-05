import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { initializeMenuModule, loadAndRenderMenus, handleAddMenu, handleEditMenu, handleDeleteMenu } from './admin/menu.js';
import { initializeOptionModule, loadAndRenderOptions, handleAddOption, handleEditOption, handleDeleteOption } from './admin/options.js';
import { initializeStaffModule, loadAndRenderStaff, handleAddStaff, handleEditStaff, handleDeleteStaff } from './admin/staff.js';
import { initializeCustomerModule, loadAndRenderCustomers, handleAddCustomer, handleCustomerDetails, handleDeleteCustomer } from './admin/customer.js';
// ★ 新しくticket.jsをインポート
import { initializeTicketModule, loadAndRenderTickets, handleAddTicketTemplate, handleEditTicketTemplate, handleDeleteTicketTemplate, handleAssignTicket } from './admin/ticket.js';

// --- Firebaseの初期化設定 ---
const firebaseConfig = {
    apiKey: "AIzaSyBR367KAMmI8IcXOSWar4ILMxboKpaKH4Q",
    authDomain: "beauty-portal-c2e44.firebaseapp.com",
    projectId: "beauty-portal-c2e44",
    storageBucket: "beauty-portal-c2e44.appspot.com",
    messagingSenderId: "6749240171",
    appId: "1:6749240171:web:64caf9771ddc76da936a2e"
};

// --- アプリケーションのエントリーポイント ---
document.addEventListener('DOMContentLoaded', () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let currentUser = null;

    const sidebarNav = document.getElementById('sidebar-nav');
    const views = { 'dashboard': document.getElementById('dashboard-view'), 'reservations': document.getElementById('reservations-view'), 'customers': document.getElementById('customers-view'), 'staff': document.getElementById('staff-view'), 'menus': document.getElementById('menus-view'), 'options': document.getElementById('options-view'), 'tickets': document.getElementById('tickets-view'), 'coupons': document.getElementById('coupons-view'), 'settings': document.getElementById('settings-view'), };
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalBody = document.getElementById('modal-body');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            initializeAppUI();
        } else {
            window.location.href = 'index.html';
        }
    });

    function initializeAppUI() {
        // 各モジュールに共通の変数や関数を渡して初期化
        const commonViewsModal = [views, openModal, closeModal];
        const commonWithData = [db, currentUser, ...commonViewsModal, getCollectionData];
        initializeMenuModule(...commonWithData);
        initializeOptionModule(...commonWithData);
        initializeStaffModule(...commonWithData);
        initializeCustomerModule(db, currentUser, ...commonViewsModal);
        // ★ 回数券モジュールを初期化
        initializeTicketModule(...commonWithData);
        
        sidebarNav.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.sidebar-link');
            if (link?.dataset.view) switchView(link.dataset.view);
        });

        document.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            if (target.id === 'add-menu-btn') handleAddMenu();
            if (target.classList.contains('edit-menu-btn')) handleEditMenu(target.dataset.id);
            if (target.classList.contains('delete-menu-btn')) handleDeleteMenu(target.dataset.id);
            if (target.id === 'add-option-btn') handleAddOption();
            if (target.classList.contains('edit-option-btn')) handleEditOption(target.dataset.id);
            if (target.classList.contains('delete-option-btn')) handleDeleteOption(target.dataset.id);
            if (target.id === 'add-staff-btn') handleAddStaff();
            if (target.classList.contains('edit-staff-btn')) handleEditStaff(target.dataset.id);
            if (target.classList.contains('delete-staff-btn')) handleDeleteStaff(target.dataset.id);
            if (target.id === 'add-customer-btn') handleAddCustomer();
            if (target.classList.contains('customer-details-btn')) handleCustomerDetails(target.dataset.id);
            if (target.classList.contains('delete-customer-btn')) handleDeleteCustomer(target.dataset.id);
            // ★ 回数券
            if (target.id === 'add-ticket-template-btn') handleAddTicketTemplate();
            if (target.classList.contains('edit-ticket-template-btn')) handleEditTicketTemplate(target.dataset.id);
            if (target.classList.contains('delete-ticket-template-btn')) handleDeleteTicketTemplate(target.dataset.id);
            if (target.id === 'assign-ticket-btn') handleAssignTicket();
            // モーダル
            if (target.id === 'modal-close-btn' || target.id === 'modal-close-x-btn') closeModal();
        });

        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        switchView('dashboard');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    async function switchView(targetView) {
        Object.values(views).forEach(view => view?.classList.add('hidden'));
        if (views[targetView]) views[targetView].classList.remove('hidden');
        sidebarNav.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.dataset.view === targetView);
        });
        switch (targetView) {
            case 'dashboard': renderDashboard(); break;
            case 'menus': await loadAndRenderMenus(); break;
            case 'options': await loadAndRenderOptions(); break;
            case 'staff': await loadAndRenderStaff(); break;
            case 'customers': await loadAndRenderCustomers(); break;
            // ★ 回数券
            case 'tickets': await loadAndRenderTickets(); break;
            default: renderDummy(targetView); break;
        }
    }

    async function getCollectionData(collectionName) {
        if (!currentUser) return [];
        const data = [];
        const q = query(collection(db, "salons", currentUser.uid, collectionName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        return data;
    }

    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
        }, 10);
    }
    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (modalBody) modalBody.innerHTML = '';
        }, 300);
    }

    let dummySummaryData = { todayReservations: 8, monthlySales: '320,000', newCustomers: 12, customerTotal: 156 };
    function renderDashboard() {
        const summaryContainer = document.getElementById('dashboard-summary');
        if (summaryContainer) summaryContainer.innerHTML = `<div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-blue-100 text-blue-600 p-3 rounded-full mr-4"><i data-lucide="calendar-check"></i></div><div><p class="text-sm text-gray-500">本日の予約件数</p><p class="text-2xl font-bold">${dummySummaryData.todayReservations}件</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-green-100 text-green-600 p-3 rounded-full mr-4"><i data-lucide="circle-dollar-sign"></i></div><div><p class="text-sm text-gray-500">今月の売上 (概算)</p><p class="text-2xl font-bold">¥${dummySummaryData.monthlySales}</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-purple-100 text-purple-600 p-3 rounded-full mr-4"><i data-lucide="user-plus"></i></div><div><p class="text-sm text-gray-500">新規顧客数 (今月)</p><p class="text-2xl font-bold">${dummySummaryData.newCustomers}人</p></div></div><div class="bg-white p-6 rounded-lg shadow flex items-center"><div class="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4"><i data-lucide="users"></i></div><div><p class="text-sm text-gray-500">総顧客数</p><p class="text-2xl font-bold">${dummySummaryData.customerTotal}人</p></div></div>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    function renderDummy(viewName) {
        const view = views[viewName]?.querySelector('.bg-white');
        if (view) view.innerHTML = `<p class="text-center text-gray-500">${viewName} 機能は現在開発中です。</p>`;
    }
    function renderReservations() { renderDummy('reservations'); }
    function renderCoupons() { renderDummy('coupons'); }
    function renderSettings() { renderDummy('settings'); }
});