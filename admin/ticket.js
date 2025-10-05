// admin/ticket.js
import { collection, query, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

let db, currentUser;
let views, openModal, closeModal, getCollectionData;

export function initializeTicketModule(firestore, user, commonViews, openModalFunc, closeModalFunc, getCollectionDataFunc) {
    db = firestore;
    currentUser = user;
    views = commonViews;
    openModal = openModalFunc;
    closeModal = closeModalFunc;
    getCollectionData = getCollectionDataFunc;
}

export async function loadAndRenderTickets() {
    const [templates, customers, menus] = await Promise.all([
        getCollectionData("ticketTemplates"),
        getCollectionData("customers"),
        getCollectionData("menus")
    ]);
    renderTickets(templates, customers, menus);
}

function renderTickets(templates = [], customers = [], menus = []) {
    const container = views['tickets']?.querySelector('.bg-white');
    if (!container) return;
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 class="text-lg font-bold mb-4">回数券テンプレート</h3>
                <div class="flex justify-end mb-4">
                    <button id="add-ticket-template-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center w-full">
                        <i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規テンプレート作成
                    </button>
                </div>
                <div id="ticket-template-list" class="space-y-3">
                    ${templates.length > 0 ? templates.map(t => `
                        <div class="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h4 class="font-bold">${t.name}</h4>
                                <p class="text-sm text-gray-500">価格: ¥${Number(t.price).toLocaleString()} / ${t.count}回</p>
                            </div>
                            <div class="space-x-2">
                                <button class="edit-ticket-template-btn text-gray-500 hover:text-purple-600 p-2" data-id="${t.id}"><i class="pointer-events-none" data-lucide="edit"></i></button>
                                <button class="delete-ticket-template-btn text-gray-500 hover:text-red-600 p-2" data-id="${t.id}"><i class="pointer-events-none" data-lucide="trash-2"></i></button>
                            </div>
                        </div>
                    `).join('') : '<p class="text-gray-500 text-center py-4">テンプレートがありません。</p>'}
                </div>
            </div>
            <div>
                <h3 class="text-lg font-bold mb-4">顧客に回数券を付与</h3>
                <div class="p-4 border rounded-lg bg-gray-50 space-y-4">
                    <div>
                        <label class="font-semibold text-sm">顧客を選択</label>
                        <select id="assign-ticket-customer" class="w-full mt-1 p-2 border rounded-md bg-white">
                            ${customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold text-sm">回数券を選択</label>
                        <select id="assign-ticket-template" class="w-full mt-1 p-2 border rounded-md bg-white">
                            ${templates.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>
                    <button id="assign-ticket-btn" class="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition">付与する</button>
                </div>
            </div>
        </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

export async function handleAddTicketTemplate() {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const menus = await getCollectionData("menus");
    const menuOptions = menus.map(m => `<option value="${m.id}">${m.name}</option>`).join('');

    modalTitle.textContent = '新規回数券テンプレートを作成';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">テンプレート名</label><input type="text" id="ticket-name-input" class="w-full mt-1 p-2 border rounded-md" placeholder="例: デザインカット 5回券"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="ticket-price-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">回数</label><input type="number" id="ticket-count-input" class="w-full mt-1 p-2 border rounded-md" placeholder="例: 5"></div>
            <div><label class="font-semibold text-sm">対応メニュー</label>
                <select id="ticket-menu-input" class="w-full mt-1 p-2 border rounded-md bg-white">${menuOptions}</select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('ticket-name-input').value;
        const price = document.getElementById('ticket-price-input').value;
        const count = document.getElementById('ticket-count-input').value;
        const menuId = document.getElementById('ticket-menu-input').value;
        if (!name || !price || !count || !menuId) return alert('すべての項目を入力してください。');
        try {
            await addDoc(collection(db, "salons", currentUser.uid, "ticketTemplates"), { name, price: Number(price), count: Number(count), menuId });
            closeModal();
            await loadAndRenderTickets();
        } catch (error) { console.error("Error adding ticket template: ", error); }
    };
    openModal();
}

export async function handleEditTicketTemplate(templateId) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const [menus, templateData] = await Promise.all([
        getCollectionData("menus"),
        getDoc(doc(db, "salons", currentUser.uid, "ticketTemplates", templateId)).then(snap => snap.data())
    ]);
    if (!templateData) return alert("編集対象のテンプレートが見つかりません。");
    const menuOptions = menus.map(m => `<option value="${m.id}" ${templateData.menuId === m.id ? 'selected' : ''}>${m.name}</option>`).join('');

    modalTitle.textContent = '回数券テンプレートを編集';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">テンプレート名</label><input type="text" id="ticket-name-input" class="w-full mt-1 p-2 border rounded-md" value="${templateData.name}"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="ticket-price-input" class="w-full mt-1 p-2 border rounded-md" value="${templateData.price}"></div>
            <div><label class="font-semibold text-sm">回数</label><input type="number" id="ticket-count-input" class="w-full mt-1 p-2 border rounded-md" value="${templateData.count}"></div>
            <div><label class="font-semibold text-sm">対応メニュー</label>
                <select id="ticket-menu-input" class="w-full mt-1 p-2 border rounded-md bg-white">${menuOptions}</select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = async () => {
        const name = document.getElementById('ticket-name-input').value;
        const price = document.getElementById('ticket-price-input').value;
        const count = document.getElementById('ticket-count-input').value;
        const menuId = document.getElementById('ticket-menu-input').value;
        if (!name || !price || !count || !menuId) return alert('すべての項目を入力してください。');
        try {
            await updateDoc(doc(db, "salons", currentUser.uid, "ticketTemplates", templateId), { name, price: Number(price), count: Number(count), menuId });
            closeModal();
            await loadAndRenderTickets();
        } catch (error) { console.error("Error updating ticket template: ", error); }
    };
    openModal();
}

export async function handleDeleteTicketTemplate(templateId) {
    if (confirm("このテンプレートを本当に削除しますか？")) {
        try {
            await deleteDoc(doc(db, "salons", currentUser.uid, "ticketTemplates", templateId));
            await loadAndRenderTickets();
        } catch (error) { console.error("Error deleting ticket template: ", error); }
    }
}

export async function handleAssignTicket() {
    const customerId = document.getElementById('assign-ticket-customer').value;
    const templateId = document.getElementById('assign-ticket-template').value;
    if (!customerId || !templateId) return alert("顧客と回数券を選択してください。");

    try {
        const templateSnap = await getDoc(doc(db, "salons", currentUser.uid, "ticketTemplates", templateId));
        if (!templateSnap.exists()) return alert("選択された回数券テンプレートが見つかりません。");
        const templateData = templateSnap.data();
        
        const customerDocRef = doc(db, "salons", currentUser.uid, "customers", customerId);
        const newTicket = {
            templateId: templateId,
            name: templateData.name,
            remaining: templateData.count,
            total: templateData.count,
            // expiryDate: '...' // 有効期限もここで設定可能
        };
        
        // 顧客ドキュメントに保有チケット情報を追加または上書き
        await updateDoc(customerDocRef, { ownedTicket: newTicket });
        
        alert("顧客に回数券を付与しました。");
    } catch (error) {
        console.error("Error assigning ticket: ", error);
        alert("回数券の付与に失敗しました。");
    }
}