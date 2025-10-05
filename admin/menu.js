// admin/menu.js

// Firestoreの関数をインポート
import { collection, query, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// このファイルで使う関数や変数を定義
let db, currentUser;
let views, openModal, closeModal, getCollectionData;

// 他のファイルから共通の関数や変数を引き継ぐための初期化関数
export function initializeMenuModule(firestore, user, commonViews, openModalFunc, closeModalFunc, getCollectionDataFunc) {
    db = firestore;
    currentUser = user;
    views = commonViews;
    openModal = openModalFunc;
    closeModal = closeModalFunc;
    getCollectionData = getCollectionDataFunc;
}

// メニューを読み込んで表示する
export async function loadAndRenderMenus() {
    renderMenus(await getCollectionData("menus"));
}

// HTMLを描画する
function renderMenus(menus = []) {
    const container = views['menus']?.querySelector('.bg-white');
    if (!container) return;
    container.innerHTML = `<div class="flex justify-end mb-4"><button id="add-menu-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規メニューを追加</button></div><div class="space-y-3">${menus.length > 0 ? menus.map(m => `<div class="p-4 border rounded-lg flex justify-between items-center"><div><h4 class="font-bold">${m.name}</h4><p class="text-sm text-gray-500">¥${Number(m.price).toLocaleString()} / ${m.time}分</p></div><div class="space-x-2"><button class="edit-menu-btn text-gray-500 hover:text-purple-600 p-2" data-id="${m.id}"><i class="pointer-events-none" data-lucide="edit"></i></button><button class="delete-menu-btn text-gray-500 hover:text-red-600 p-2" data-id="${m.id}"><i class="pointer-events-none" data-lucide="trash-2"></i></button></div></div>`).join('') : '<p class="text-gray-500 text-center py-4">メニューがまだ登録されていません。</p>'}</div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// メニュー追加の処理
export async function handleAddMenu() {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    
    modalTitle.textContent = '新規メニューを追加';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">メニュー名</label><input type="text" id="menu-name-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">価格</label><input type="number" id="menu-price-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">施術時間 (分)</label><input type="number" id="menu-time-input" class="w-full mt-1 p-2 border rounded-md"></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('menu-name-input').value;
        const price = document.getElementById('menu-price-input').value;
        const time = document.getElementById('menu-time-input').value;
        if (!name || !price || !time) return alert('すべての項目を入力してください。');
        try {
            await addDoc(collection(db, "salons", currentUser.uid, "menus"), { name, price: Number(price), time: Number(time), createdAt: serverTimestamp() });
            closeModal();
            await loadAndRenderMenus();
        } catch (error) { console.error("Error adding menu: ", error); }
    };
    openModal();
}

// メニュー編集の処理
export async function handleEditMenu(menuId) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');

    const menuDocRef = doc(db, "salons", currentUser.uid, "menus", menuId);
    const menuDocSnap = await getDoc(menuDocRef);
    if (!menuDocSnap.exists()) return alert("編集対象のメニューが見つかりません。");
    const menuData = menuDocSnap.data();
    modalTitle.textContent = 'メニューを編集';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">メニュー名</label><input type="text" id="menu-name-input" value="${menuData.name}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">価格</label><input type="number" id="menu-price-input" value="${menuData.price}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">施術時間 (分)</label><input type="number" id="menu-time-input" value="${menuData.time}" class="w-full mt-1 p-2 border rounded-md"></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('menu-name-input').value;
        const price = document.getElementById('menu-price-input').value;
        const time = document.getElementById('menu-time-input').value;
        if (!name || !price || !time) return alert('すべての項目を入力してください。');
        try {
            await updateDoc(menuDocRef, { name, price: Number(price), time: Number(time) });
            closeModal();
            await loadAndRenderMenus();
        } catch (error) { console.error("Error updating menu: ", error); }
    };
    openModal();
}

// メニュー削除の処理
export async function handleDeleteMenu(menuId) {
    if (confirm("このメニューを本当に削除しますか？")) {
        try {
            await deleteDoc(doc(db, "salons", currentUser.uid, "menus", menuId));
            await loadAndRenderMenus();
        } catch (error) { console.error("Error deleting menu: ", error); }
    }
}