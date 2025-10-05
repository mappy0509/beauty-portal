// admin/options.js
import { collection, query, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

let db, currentUser;
let views, openModal, closeModal, getCollectionData;

export function initializeOptionModule(firestore, user, commonViews, openModalFunc, closeModalFunc, getCollectionDataFunc) {
    db = firestore;
    currentUser = user;
    views = commonViews;
    openModal = openModalFunc;
    closeModal = closeModalFunc;
    getCollectionData = getCollectionDataFunc;
}

export async function loadAndRenderOptions() {
    const [options, menus] = await Promise.all([getCollectionData("options"), getCollectionData("menus")]);
    renderOptions(options, menus);
}

function renderOptions(options = [], menus = []) {
    const container = views['options']?.querySelector('.bg-white');
    if (!container) return;
    const menuMap = menus.reduce((map, menu) => ({ ...map, [menu.id]: menu.name }), {});
    const getAssociatedMenuNames = (menuIds = []) => menuIds.map(id => menuMap[id] || '不明').join(', ') || '未割り当て';
    container.innerHTML = `<div class="flex justify-end mb-4"><button id="add-option-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規オプションを追加</button></div><div class="space-y-3">${options.length > 0 ? options.map(o => `<div class="p-4 border rounded-lg flex justify-between items-center"><div><h4 class="font-bold">${o.name}</h4><p class="text-sm text-gray-500">¥${Number(o.price).toLocaleString()}</p><p class="text-xs text-gray-400 mt-1">対応メニュー: ${getAssociatedMenuNames(o.associatedMenuIds)}</p></div><div class="space-x-2"><button class="edit-option-btn text-gray-500 hover:text-purple-600 p-2" data-id="${o.id}"><i class="pointer-events-none" data-lucide="edit"></i></button><button class="delete-option-btn text-gray-500 hover:text-red-600 p-2" data-id="${o.id}"><i class="pointer-events-none" data-lucide="trash-2"></i></button></div></div>`).join('') : '<p class="text-gray-500 text-center py-4">オプションがまだ登録されていません。</p>'}</div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

export async function handleAddOption() {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const menus = await getCollectionData("menus");
    const menuCheckboxes = menus.map(m => `<label class="flex items-center"><input type="checkbox" name="menu-assoc" value="${m.id}" class="h-4 w-4 rounded text-purple-600">${m.name}</label>`).join('');
    modalTitle.textContent = '新規オプションを追加';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">オプション名</label><input type="text" id="option-name-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">価格</label><input type="number" id="option-price-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">対応メニュー (複数選択可)</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">${menuCheckboxes}</div></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('option-name-input').value;
        const price = document.getElementById('option-price-input').value;
        if (!name || !price) return alert('オプション名と価格を入力してください。');
        const associatedMenuIds = [...document.querySelectorAll('input[name="menu-assoc"]:checked')].map(cb => cb.value);
        try {
            await addDoc(collection(db, "salons", currentUser.uid, "options"), { name, price: Number(price), associatedMenuIds, createdAt: serverTimestamp() });
            closeModal();
            await loadAndRenderOptions();
        } catch (error) { console.error("Error adding option: ", error); }
    };
    openModal();
}

export async function handleEditOption(optionId) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const [menus, optionData] = await Promise.all([getCollectionData("menus"), getDoc(doc(db, "salons", currentUser.uid, "options", optionId)).then(snap => snap.data())]);
    if (!optionData) return alert("編集対象のオプションが見つかりません。");
    const menuCheckboxes = menus.map(m => `<label class="flex items-center"><input type="checkbox" name="menu-assoc" value="${m.id}" class="h-4 w-4 rounded text-purple-600" ${optionData.associatedMenuIds?.includes(m.id) ? 'checked' : ''}>${m.name}</label>`).join('');
    modalTitle.textContent = 'オプションを編集';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">オプション名</label><input type="text" id="option-name-input" value="${optionData.name}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">価格</label><input type="number" id="option-price-input" value="${optionData.price}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">対応メニュー (複数選択可)</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">${menuCheckboxes}</div></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('option-name-input').value;
        const price = document.getElementById('option-price-input').value;
        if (!name || !price) return alert('オプション名と価格を入力してください。');
        const associatedMenuIds = [...document.querySelectorAll('input[name="menu-assoc"]:checked')].map(cb => cb.value);
        try {
            await updateDoc(doc(db, "salons", currentUser.uid, "options", optionId), { name, price: Number(price), associatedMenuIds });
            closeModal();
            await loadAndRenderOptions();
        } catch (error) { console.error("Error updating option: ", error); }
    };
    openModal();
}

export async function handleDeleteOption(optionId) {
    if (confirm("このオプションを本当に削除しますか？")) {
        try {
            await deleteDoc(doc(db, "salons", currentUser.uid, "options", optionId));
            await loadAndRenderOptions();
        } catch (error) { console.error("Error deleting option: ", error); }
    }
}