// admin/customer.js

import { collection, query, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// このファイルで使う共通の変数
let db, currentUser;
let views, openModal, closeModal;

// 他のファイルから共通の関数や変数を引き継ぐための初期化関数
export function initializeCustomerModule(firestore, user, commonViews, openModalFunc, closeModalFunc) {
    db = firestore;
    currentUser = user;
    views = commonViews;
    openModal = openModalFunc;
    closeModal = closeModalFunc;
}

// 顧客データを読み込んで表示する
export async function loadAndRenderCustomers() {
    const customers = [];
    const q = query(collection(db, "salons", currentUser.uid, "customers"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        customers.push({ id: doc.id, ...doc.data() });
    });
    renderCustomers(customers);
}

// 顧客一覧のHTMLを描画する
function renderCustomers(customers = []) {
    const container = views['customers']?.querySelector('.bg-white');
    if (!container) return;
    container.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <div class="relative w-1/3"><input type="text" id="customer-search-input" placeholder="顧客名で検索..." class="w-full pl-10 pr-4 py-2 border rounded-lg"><i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i></div>
            <button id="add-customer-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規顧客を追加</button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-50"><tr>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">顧客名</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終来店日</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メモ</th>
                    <th class="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-200">
                    ${customers.map(c => `
                        <tr>
                            <td class="py-4 px-6 whitespace-nowrap font-medium text-gray-900">${c.name}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500">${c.lastVisit || '未訪問'}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500 max-w-xs truncate">${c.memo || ''}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-right space-x-2">
                                <button class="customer-details-btn text-purple-600 hover:text-purple-900 font-medium" data-id="${c.id}">詳細</button>
                                <button class="delete-customer-btn text-red-600 hover:text-red-900 font-medium" data-id="${c.id}">削除</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// 新規顧客追加の処理
export async function handleAddCustomer() {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');

    modalTitle.textContent = '新規顧客を追加';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">顧客名</label><input type="text" id="customer-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">メモ</label><textarea id="customer-memo-input" class="w-full mt-1 p-2 border rounded-md" rows="3"></textarea></div>
        </div>
    `;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('customer-name-input').value;
        if (!name) return alert('顧客名を入力してください。');
        const memo = document.getElementById('customer-memo-input').value;
        try {
            await addDoc(collection(db, "salons", currentUser.uid, "customers"), {
                name,
                memo,
                lastVisit: '未訪問',
                createdAt: serverTimestamp()
            });
            closeModal();
            await loadAndRenderCustomers();
        } catch (error) { console.error("Error adding customer: ", error); }
    };
    openModal();
}

// 顧客詳細の表示・編集の処理
export async function handleCustomerDetails(customerId) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');

    const customerDocRef = doc(db, "salons", currentUser.uid, "customers", customerId);
    const customerDocSnap = await getDoc(customerDocRef);
    if (!customerDocSnap.exists()) return alert("顧客情報が見つかりません。");
    const customer = customerDocSnap.data();

    modalTitle.textContent = '顧客詳細';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">顧客名</label><input type="text" id="customer-name-input" value="${customer.name}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">最終来店日</label><input type="text" id="customer-last-visit-input" value="${customer.lastVisit || ''}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">メモ</label><textarea id="customer-memo-input" class="w-full mt-1 p-2 border rounded-md" rows="4">${customer.memo || ''}</textarea></div>
        </div>
    `;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('customer-name-input').value;
        const lastVisit = document.getElementById('customer-last-visit-input').value;
        const memo = document.getElementById('customer-memo-input').value;
        if (!name) return alert('顧客名を入力してください。');
        try {
            await updateDoc(customerDocRef, { name, lastVisit, memo });
            closeModal();
            await loadAndRenderCustomers();
        } catch (error) { console.error("Error updating customer: ", error); }
    };
    openModal();
}

// 顧客削除の処理
export async function handleDeleteCustomer(customerId) {
    if (confirm("この顧客情報を本当に削除しますか？\n関連する予約履歴などは削除されません。")) {
        try {
            await deleteDoc(doc(db, "salons", currentUser.uid, "customers", customerId));
            await loadAndRenderCustomers();
        } catch (error) { console.error("Error deleting customer: ", error); }
    }
}