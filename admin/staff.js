// admin/staff.js
import { collection, query, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

let db, currentUser;
let views, openModal, closeModal, getCollectionData;

export function initializeStaffModule(firestore, user, commonViews, openModalFunc, closeModalFunc, getCollectionDataFunc) {
    db = firestore;
    currentUser = user;
    views = commonViews;
    openModal = openModalFunc;
    closeModal = closeModalFunc;
    getCollectionData = getCollectionDataFunc;
}

export async function loadAndRenderStaff() {
    const [staff, menus, options] = await Promise.all([getCollectionData("staff"), getCollectionData("menus"), getCollectionData("options")]);
    renderStaff(staff, menus, options);
}

function renderStaff(staff = [], menus = [], options = []) {
    const container = views['staff']?.querySelector('.bg-white');
    if (!container) return;
    const menuMap = menus.reduce((map, menu) => ({ ...map, [menu.id]: menu.name }), {});
    const optionMap = options.reduce((map, option) => ({ ...map, [option.id]: option.name }), {});
    const getAssignableNames = (ids = [], map) => ids.map(id => map[id] || '不明').join(', ') || 'なし';
    container.innerHTML = `<div class="flex justify-end mb-4"><button id="add-staff-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規スタッフを追加</button></div><div class="space-y-3">${staff.length > 0 ? staff.map(s => `<div class="p-4 border rounded-lg flex justify-between items-center"><div><h4 class="font-bold">${s.name}</h4><p class="text-sm text-gray-600 italic">"${s.specialty}"</p><p class="text-xs text-gray-400 mt-1">対応メニュー: ${getAssignableNames(s.assignableMenuIds, menuMap)}</p><p class="text-xs text-gray-400 mt-1">対応オプション: ${getAssignableNames(s.assignableOptionIds, optionMap)}</p></div><div class="space-x-2"><button class="edit-staff-btn text-gray-500 hover:text-purple-600 p-2" data-id="${s.id}"><i class="pointer-events-none" data-lucide="edit"></i></button><button class="delete-staff-btn text-gray-500 hover:text-red-600 p-2" data-id="${s.id}"><i class="pointer-events-none" data-lucide="trash-2"></i></button></div></div>`).join('') : '<p class="text-gray-500 text-center py-4">スタッフがまだ登録されていません。</p>'}</div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

export async function handleAddStaff() {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const [menus, options] = await Promise.all([getCollectionData("menus"), getCollectionData("options")]);
    const menuCheckboxes = menus.map(m => `<label class="flex items-center"><input type="checkbox" name="staff-menu-assoc" value="${m.id}" class="h-4 w-4 rounded text-purple-600">${m.name}</label>`).join('');
    const optionCheckboxes = options.map(o => `<label class="flex items-center"><input type="checkbox" name="staff-option-assoc" value="${o.id}" class="h-4 w-4 rounded text-purple-600">${o.name}</label>`).join('');
    modalTitle.textContent = '新規スタッフを追加';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">スタッフ名</label><input type="text" id="staff-name-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">得意な施術など</label><input type="text" id="staff-specialty-input" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">対応可能メニュー</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${menuCheckboxes}</div></div><div><label class="font-semibold text-sm">対応可能オプション</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${optionCheckboxes}</div></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('staff-name-input').value;
        const specialty = document.getElementById('staff-specialty-input').value;
        if (!name) return alert('スタッフ名を入力してください。');
        const assignableMenuIds = [...document.querySelectorAll('input[name="staff-menu-assoc"]:checked')].map(cb => cb.value);
        const assignableOptionIds = [...document.querySelectorAll('input[name="staff-option-assoc"]:checked')].map(cb => cb.value);
        try {
            await addDoc(collection(db, "salons", currentUser.uid, "staff"), { name, specialty, assignableMenuIds, assignableOptionIds, createdAt: serverTimestamp() });
            closeModal();
            await loadAndRenderStaff();
        } catch (error) { console.error("Error adding staff: ", error); }
    };
    openModal();
}

export async function handleEditStaff(staffId) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const [menus, options, staffData] = await Promise.all([getCollectionData("menus"), getCollectionData("options"), getDoc(doc(db, "salons", currentUser.uid, "staff", staffId)).then(snap => snap.data())]);
    if (!staffData) return alert("編集対象のスタッフが見つかりません。");
    const menuCheckboxes = menus.map(m => `<label class="flex items-center"><input type="checkbox" name="staff-menu-assoc" value="${m.id}" class="h-4 w-4 rounded text-purple-600" ${staffData.assignableMenuIds?.includes(m.id) ? 'checked' : ''}>${m.name}</label>`).join('');
    const optionCheckboxes = options.map(o => `<label class="flex items-center"><input type="checkbox" name="staff-option-assoc" value="${o.id}" class="h-4 w-4 rounded text-purple-600" ${staffData.assignableOptionIds?.includes(o.id) ? 'checked' : ''}>${o.name}</label>`).join('');
    modalTitle.textContent = 'スタッフ情報を編集';
    modalBody.innerHTML = `<div class="space-y-4"><div><label class="font-semibold text-sm">スタッフ名</label><input type="text" id="staff-name-input" value="${staffData.name}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">得意な施術など</label><input type="text" id="staff-specialty-input" value="${staffData.specialty}" class="w-full mt-1 p-2 border rounded-md"></div><div><label class="font-semibold text-sm">対応可能メニュー</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${menuCheckboxes}</div></div><div><label class="font-semibold text-sm">対応可能オプション</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${optionCheckboxes}</div></div></div>`;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('staff-name-input').value;
        const specialty = document.getElementById('staff-specialty-input').value;
        if (!name) return alert('スタッフ名を入力してください。');
        const assignableMenuIds = [...document.querySelectorAll('input[name="staff-menu-assoc"]:checked')].map(cb => cb.value);
        const assignableOptionIds = [...document.querySelectorAll('input[name="staff-option-assoc"]:checked')].map(cb => cb.value);
        try {
            await updateDoc(doc(db, "salons", currentUser.uid, "staff", staffId), { name, specialty, assignableMenuIds, assignableOptionIds });
            closeModal();
            await loadAndRenderStaff();
        } catch (error) { console.error("Error updating staff: ", error); }
    };
    openModal();
}

export async function handleDeleteStaff(staffId) {
    if (confirm("このスタッフを本当に削除しますか？")) {
        try {
            await deleteDoc(doc(db, "salons", currentUser.uid, "staff", staffId));
            await loadAndRenderStaff();
        } catch (error) { console.error("Error deleting staff: ", error); }
    }
}