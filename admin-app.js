// ========================================================================
// --- 管理画面用 開発用ダミーデータ ---
// ========================================================================
let dummySummaryData = {
    todayReservations: 8,
    monthlySales: '320,000',
    newCustomers: 12,
    customerTotal: 156,
    storeCode: '852146'
};

let dummyStoreSettings = {
    name: 'Luminous Hair',
    address: '東京都渋谷区恵比寿1-1-1',
    description: '光溢れる空間で、あなただけの最高のスタイルを見つけませんか？経験豊富なスタイリストが、丁寧なカウンセリングでお客様一人ひとりの魅力を最大限に引き出します。',
    holidays: '毎週火曜日',
    shifts: {
        '月': '10:00 - 20:00', '火': '定休日', '水': '10:00 - 20:00',
        '木': '10:00 - 20:00', '金': '12:00 - 22:00', '土': '09:00 - 19:00', '日': '09:00 - 19:00'
    }
};

let dummyTodaysReservations = [
    { id: 'res1', time: '10:00', customerName: '田中 さやか', menu: 'デザインカット', staff: 'Suzuki' },
    { id: 'res2', time: '11:00', customerName: '佐藤 あかり', menu: 'カット＋オーガニックカラー', staff: 'Tanaka' },
    { id: 'res3', time: '13:00', customerName: '鈴木 恵子', menu: 'TOKIOトリートメント', staff: 'Watanabe' },
    { id: 'res4', time: '14:30', customerName: '高橋 ゆうか', menu: 'デザインカット', staff: 'Suzuki' },
];

let dummyAllReservations = [
    { id: 'res1', date: '2025-10-02', time: '10:00', customerName: '田中 さやか', menu: 'デザインカット', staff: 'Suzuki', status: '確定' },
    { id: 'res2', date: '2025-10-02', time: '11:00', customerName: '佐藤 あかり', menu: 'カット＋オーガニックカラー', staff: 'Tanaka', status: '確定' },
    { id: 'res3', date: '2025-10-02', time: '13:00', customerName: '鈴木 恵子', menu: 'TOKIOトリートメント', staff: 'Watanabe', status: '確定' },
    { id: 'res4', date: '2025-10-02', time: '14:30', customerName: '高橋 ゆうか', menu: 'デザインカット', staff: 'Suzuki', status: '確定' },
    { id: 'res5', date: '2025-10-03', time: '10:00', customerName: '伊藤 みき', menu: 'デザインカット', staff: 'Suzuki', status: '確定' },
    { id: 'res6', date: '2025-10-03', time: '12:00', customerName: '渡辺 淳', menu: 'カット＋オーガニックカラー', staff: 'Tanaka', status: '確定' },
    { id: 'res7', date: '2025-10-01', time: '15:00', customerName: '山本 太郎', menu: 'デザインカット', staff: 'Suzuki', status: '完了' },
    { id: 'res8', date: '2025-10-01', time: '17:00', customerName: '中村 美咲', menu: 'TOKIOトリートメント', staff: 'Watanabe', status: 'キャンセル' },
    { id: 'res9', date: '2025-10-03', time: '15:00', customerName: '小林 健太', menu: 'TOKIOトリートメント', staff: 'Watanabe', status: '確定' },
];

let dummyAllCustomers = [
    { id: 'cust1', name: '田中 さやか', lastVisit: '2025年9月15日', totalSpend: '45,800', memo: '猫アレルギー', ticket: { name: 'デザインカット 3回券', remaining: 2 } },
    { id: 'cust2', name: '佐藤 あかり', lastVisit: '2025年8月20日', totalSpend: '82,100', memo: '', ticket: null },
    { id: 'cust3', name: '鈴木 恵子', lastVisit: '2025年9月10日', totalSpend: '23,500', memo: 'シャンプーは弱め希望', ticket: { name: 'TOKIOトリートメント 5回券', remaining: 4 } },
    { id: 'cust4', name: '高橋 ゆうか', lastVisit: '2025年9月18日', totalSpend: '112,000', memo: '', ticket: null },
    { id: 'cust5', name: '伊藤 みき', lastVisit: '2025年7月2日', totalSpend: '5,500', memo: '', ticket: null },
];

let dummyAllMenus = [
    { id: 'menu1', name: 'デザインカット', price: '6,600', time: '60分' },
    { id: 'menu2', name: 'カット＋オーガニックカラー', price: '13,200', time: '120分' },
    { id: 'menu3', name: 'TOKIOトリートメント', price: '5,500', time: '45分' },
];

let dummyAllOptions = [
    { id: 'opt1', name: '炭酸シャンプー', price: '1000', associatedMenuIds: ['menu1', 'menu2'] },
    { id: 'opt2', name: '眉カット', price: '500', associatedMenuIds: ['menu1'] },
    { id: 'opt3', name: '超音波アイロン使用', price: '1500', associatedMenuIds: ['menu3'] }
];

let dummyStaff = [
    { id: 'staff1', name: 'Suzuki', specialty: 'ショートカットが得意です', assignableMenuIds: ['menu1', 'menu2'], assignableOptionIds: ['opt1', 'opt2'], shifts: {'月': '10:00 - 20:00', '火': '休み', '水': '10:00 - 20:00', '木': '10:00 - 18:00', '金': '12:00 - 22:00', '土': '09:00 - 19:00', '日': '09:00 - 19:00'} },
    { id: 'staff2', name: 'Tanaka', specialty: 'カラーリングのスペシャリスト', assignableMenuIds: ['menu2'], assignableOptionIds: ['opt1'], shifts: {'月': '10:00 - 20:00', '火': '休み', '水': '10:00 - 20:00', '木': '10:00 - 20:00', '金': '12:00 - 22:00', '土': '09:00 - 19:00', '日': '休み'} },
    { id: 'staff3', name: 'Watanabe', specialty: 'ヘアケア・髪質改善お任せください', assignableMenuIds: ['menu3'], assignableOptionIds: ['opt3'], shifts: {'月': '休み', '火': '休み', '水': '10:00 - 20:00', '木': '10:00 - 20:00', '金': '12:00 - 22:00', '土': '09:00 - 19:00', '日': '09:00 - 19:00'} }
];

let dummyTicketTemplates = [
    { id: 't_temp1', name: 'デザインカット 3回券', price: '18,000', menuId: 'menu1', count: 3 },
    { id: 't_temp2', name: 'TOKIOトリートメント 5回券', price: '25,000', menuId: 'menu3', count: 5 },
];

let dummyCoupons = [
    { id: 'coupon1', title: '【新規様限定】カット＋カラー 20% OFF', details: '通常価格 13,200円 → 10,560円', target: '新規' },
    { id: 'coupon2', title: '【全員OK】平日限定トリートメントサービス', details: '平日10時〜16時のご予約で、クイックトリートメントをプレゼント。', target: '全員' }
];

// ========================================================================

// --- State ---
let reservationDate = new Date('2025-10-02');

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
const modalFooter = document.getElementById('modal-footer');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCloseXBtn = document.getElementById('modal-close-x-btn');

// --- Modal Functions ---
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
        modalBody.innerHTML = ''; // Clear body on close
    }, 300);
}


// --- Render Functions ---

function renderDashboard() {
    // Render summary cards
    const summaryContainer = document.getElementById('dashboard-summary');
    summaryContainer.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow flex items-center">
            <div class="bg-blue-100 text-blue-600 p-3 rounded-full mr-4"><i data-lucide="calendar-check"></i></div>
            <div><p class="text-sm text-gray-500">本日の予約件数</p><p class="text-2xl font-bold">${dummySummaryData.todayReservations}件</p></div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow flex items-center">
            <div class="bg-green-100 text-green-600 p-3 rounded-full mr-4"><i data-lucide="circle-dollar-sign"></i></div>
            <div><p class="text-sm text-gray-500">今月の売上 (概算)</p><p class="text-2xl font-bold">¥${dummySummaryData.monthlySales}</p></div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow flex items-center">
            <div class="bg-purple-100 text-purple-600 p-3 rounded-full mr-4"><i data-lucide="user-plus"></i></div>
            <div><p class="text-sm text-gray-500">新規顧客数 (今月)</p><p class="text-2xl font-bold">${dummySummaryData.newCustomers}人</p></div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow flex items-center">
            <div class="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4"><i data-lucide="users"></i></div>
            <div><p class="text-sm text-gray-500">総顧客数</p><p class="text-2xl font-bold">${dummySummaryData.customerTotal}人</p></div>
        </div>
    `;

    // Render store code
    const reservationsListContainer = document.getElementById('today-reservations-list');
    const mainContentContainer = reservationsListContainer.parentElement; 
    
    const existingStoreCode = document.getElementById('store-code-display');
    if (existingStoreCode) {
        existingStoreCode.remove();
    }
    const storeCodeElement = document.createElement('div');
    storeCodeElement.id = 'store-code-display';
    storeCodeElement.className = "mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-center";
    storeCodeElement.innerHTML = `
        <h4 class="text-sm font-semibold text-gray-600">お客様連携用 店舗コード</h4>
        <p class="text-4xl font-bold text-purple-700 tracking-widest my-2">${dummySummaryData.storeCode}</p>
        <p class="text-xs text-gray-500">お客様ページの「サロン登録」画面で、このコードを入力してもらうことでアカウントが連携されます。</p>
    `;
    const reservationsTitle = mainContentContainer.querySelector('h3');
    if (reservationsTitle) {
         mainContentContainer.insertBefore(storeCodeElement, reservationsTitle);
    }

    // Render today's reservation list
    if(dummyTodaysReservations.length === 0) {
        reservationsListContainer.innerHTML = `<p class="text-gray-500">本日の予約はありません。</p>`;
    } else {
        reservationsListContainer.innerHTML = dummyTodaysReservations.map(res => `
            <div class="border-t py-3 flex items-center justify-between">
                <div class="flex items-center"><span class="font-bold text-lg text-purple-600 w-20">${res.time}</span>
                    <div><p class="font-semibold text-gray-800">${res.customerName}様</p><p class="text-sm text-gray-500">${res.menu} / 担当: ${res.staff}</p></div>
                </div>
                <button class="text-gray-400 hover:text-purple-600"><i data-lucide="chevron-right"></i></button>
            </div>
        `).join('');
    }

    lucide.createIcons();
}


function renderReservations() {
    const container = views['reservations'].querySelector('.bg-white');
    const dateStr = reservationDate.toISOString().split('T')[0];
    dummyAllReservations.sort((a, b) => a.time.localeCompare(b.time));
    const todaysReservations = dummyAllReservations.filter(r => r.date === dateStr);

    const getStatusBadge = (status) => {
        switch (status) {
            case '確定':
                return '<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">確定</span>';
            case '完了':
                return '<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">完了</span>';
            case 'キャンセル':
                return '<span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">キャンセル</span>';
            default:
                return '<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">不明</span>';
        }
    };

    let contentHtml = `
        <div class="mb-6">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold">${reservationDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })} の予約</h3>
                <div class="flex items-center space-x-2">
                    <button id="prev-day-btn" class="p-2 rounded-md hover:bg-gray-100"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                    <button id="today-btn" class="px-4 py-2 text-sm font-semibold border rounded-md hover:bg-gray-100">今日</button>
                    <button id="next-day-btn" class="p-2 rounded-md hover:bg-gray-100"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                    <button id="add-reservation-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規予約</button>
                </div>
            </div>
        </div>
        <div class="space-y-4">
            ${todaysReservations.length > 0 ? todaysReservations.map(res => `
                <div class="p-4 border rounded-lg flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-24">
                            <p class="font-bold text-lg text-purple-600">${res.time}</p>
                            ${getStatusBadge(res.status)}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 text-lg">${res.customerName}様</p>
                            <p class="text-sm text-gray-500">${res.menu}</p>
                            <p class="text-sm text-gray-500">担当: ${res.staff}</p>
                        </div>
                    </div>
                    <button class="reservation-details-btn text-purple-600 hover:text-purple-900 font-medium flex items-center" data-id="${res.id}">
                        <span>詳細</span>
                        <i data-lucide="chevron-right" class="w-5 h-5"></i>
                    </button>
                </div>
            `).join('') : '<p class="text-gray-500 text-center py-8">この日の予約はありません。</p>'}
        </div>
    `;

    container.innerHTML = contentHtml;
    lucide.createIcons();
}

function renderCustomers(customers = dummyAllCustomers) {
    const container = views['customers'].querySelector('.bg-white');
    let tableHtml = `
        <div class="flex justify-between items-center mb-4">
            <div class="relative w-1/3"><input type="text" id="customer-search-input" placeholder="顧客名で検索..." class="w-full pl-10 pr-4 py-2 border rounded-lg"><i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i></div>
            <button id="add-customer-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規顧客を追加</button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-50"><tr>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">顧客名</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終来店日</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">累計利用額</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メモ</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">回数券</th>
                    <th class="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr></thead>
                <tbody class="divide-y divide-gray-200">
                    ${customers.map(c => `
                        <tr>
                            <td class="py-4 px-6 whitespace-nowrap font-medium text-gray-900">${c.name}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500">${c.lastVisit}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500">¥${c.totalSpend}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500">${c.memo}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-gray-500">${c.ticket ? `${c.ticket.name} (残り${c.ticket.remaining}回)` : 'なし'}</td>
                            <td class="py-4 px-6 whitespace-nowrap text-right"><button class="customer-details-btn text-purple-600 hover:text-purple-900 font-medium" data-id="${c.id}">詳細</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    container.innerHTML = tableHtml;
    lucide.createIcons();
}

function renderStaff() {
    const container = views['staff'].querySelector('.bg-white');

    const getMenuNames = (ids) => ids.map(id => dummyAllMenus.find(m => m.id === id)?.name || '').join(', ');
    const getOptionNames = (ids) => ids.map(id => dummyAllOptions.find(o => o.id === id)?.name || '').join(', ');

    container.innerHTML = `
        <div class="flex justify-end mb-4"><button id="add-staff-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規スタッフを追加</button></div>
        <div class="space-y-3">
        ${dummyStaff.map(s => `
            <div class="p-4 border rounded-lg flex justify-between items-center">
                <div>
                    <h4 class="font-bold">${s.name}</h4>
                    <p class="text-sm text-gray-600 italic">"${s.specialty}"</p>
                    <p class="text-xs text-gray-400 mt-1">対応メニュー: ${getMenuNames(s.assignableMenuIds)}</p>
                    <p class="text-xs text-gray-400 mt-1">対応オプション: ${getOptionNames(s.assignableOptionIds)}</p>
                </div>
                <div class="space-x-2">
                    <button class="edit-staff-shifts-btn text-gray-500 hover:text-blue-600 p-2" data-id="${s.id}" title="シフトを編集"><i data-lucide="calendar-clock"></i></button>
                    <button class="edit-staff-btn text-gray-500 hover:text-purple-600 p-2" data-id="${s.id}" title="スタッフ情報を編集"><i data-lucide="edit"></i></button>
                    <button class="delete-staff-btn text-gray-500 hover:text-red-600 p-2" data-id="${s.id}" title="スタッフを削除"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `).join('')}
        </div>
    `;
    lucide.createIcons();
}


function renderMenus() {
    const container = views['menus'].querySelector('.bg-white');
    container.innerHTML = `
        <div class="flex justify-end mb-4"><button id="add-menu-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規メニューを追加</button></div>
        <div class="space-y-3">
        ${dummyAllMenus.map(m => `
            <div class="p-4 border rounded-lg flex justify-between items-center">
                <div><h4 class="font-bold">${m.name}</h4><p class="text-sm text-gray-500">¥${m.price} / ${m.time}</p></div>
                <div class="space-x-2">
                    <button class="edit-menu-btn text-gray-500 hover:text-purple-600 p-2" data-id="${m.id}"><i data-lucide="edit"></i></button>
                    <button class="delete-menu-btn text-gray-500 hover:text-red-600 p-2" data-id="${m.id}"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function renderOptions() {
    const container = views['options'].querySelector('.bg-white');
    
    const getAssociatedMenuNames = (menuIds) => {
        if (!menuIds || menuIds.length === 0) return '未割り当て';
        return menuIds.map(id => {
            const menu = dummyAllMenus.find(m => m.id === id);
            return menu ? menu.name : '';
        }).filter(name => name).join(', ');
    };

    container.innerHTML = `
        <div class="flex justify-end mb-4"><button id="add-option-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規オプションを追加</button></div>
        <div class="space-y-3">
        ${dummyAllOptions.map(o => `
            <div class="p-4 border rounded-lg flex justify-between items-center">
                <div>
                    <h4 class="font-bold">${o.name}</h4>
                    <p class="text-sm text-gray-500">¥${o.price}</p>
                    <p class="text-xs text-gray-400 mt-1">対応メニュー: ${getAssociatedMenuNames(o.associatedMenuIds)}</p>
                </div>
                <div class="space-x-2">
                    <button class="edit-option-btn text-gray-500 hover:text-purple-600 p-2" data-id="${o.id}"><i data-lucide="edit"></i></button>
                    <button class="delete-option-btn text-gray-500 hover:text-red-600 p-2" data-id="${o.id}"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function renderTickets() {
    const container = views['tickets'].querySelector('.bg-white');
     container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 class="text-lg font-bold mb-4">回数券テンプレート</h3>
                <div class="flex justify-end mb-4">
                    <button id="add-ticket-template-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center w-full">
                        <i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規テンプレート作成
                    </button>
                </div>
                <div class="space-y-3">
                ${dummyTicketTemplates.map(t => `
                    <div class="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <h4 class="font-bold">${t.name}</h4>
                            <p class="text-sm text-gray-500">価格: ¥${t.price} / ${t.count}回</p>
                        </div>
                        <div class="space-x-2">
                            <button class="edit-ticket-template-btn text-gray-500 hover:text-purple-600 p-2" data-id="${t.id}"><i data-lucide="edit"></i></button>
                            <button class="delete-ticket-template-btn text-gray-500 hover:text-red-600 p-2" data-id="${t.id}"><i data-lucide="trash-2"></i></button>
                        </div>
                    </div>
                `).join('')}
                </div>
            </div>
            <div>
                <h3 class="text-lg font-bold mb-4">顧客に回数券を付与</h3>
                <div class="p-4 border rounded-lg bg-gray-50 space-y-4">
                    <div>
                        <label class="font-semibold text-sm">顧客を選択</label>
                        <select id="assign-ticket-customer" class="w-full mt-1 p-2 border rounded-md bg-white">
                            ${dummyAllCustomers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold text-sm">回数券を選択</label>
                        <select id="assign-ticket-template" class="w-full mt-1 p-2 border rounded-md bg-white">
                            ${dummyTicketTemplates.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>
                    <button id="assign-ticket-btn" class="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition">付与する</button>
                </div>
            </div>
        </div>
     `;
    lucide.createIcons();
}

function renderCoupons() {
    const container = views['coupons'].querySelector('.bg-white');
    container.innerHTML = `
        <div class="flex justify-end mb-4"><button id="add-coupon-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"><i data-lucide="plus" class="w-5 h-5 mr-2"></i>新規クーポンを作成</button></div>
        <div class="space-y-3">
        ${dummyCoupons.map(c => `
            <div class="p-4 border rounded-lg flex justify-between items-center">
                <div>
                    <h4 class="font-bold">${c.title}</h4>
                    <p class="text-sm text-gray-500">${c.details}</p>
                    <p class="text-xs text-white ${c.target === '新規' ? 'bg-blue-500' : 'bg-pink-500'} rounded-full px-2 py-0.5 inline-block mt-1">${c.target}顧客向け</p>
                </div>
                <div class="space-x-2">
                    <button class="edit-coupon-btn text-gray-500 hover:text-purple-600 p-2" data-id="${c.id}"><i data-lucide="edit"></i></button>
                    <button class="delete-coupon-btn text-gray-500 hover:text-red-600 p-2" data-id="${c.id}"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function renderSettings() {
    const container = views['settings'].querySelector('.bg-white');
    const shifts = dummyStoreSettings.shifts;
    container.innerHTML = `
        <div class="flex justify-end mb-4">
            <button id="edit-settings-btn" class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center">
                <i data-lucide="edit" class="w-5 h-5 mr-2"></i>店舗情報を編集
            </button>
        </div>
        <div class="space-y-6 text-gray-800">
            <div>
                <h4 class="font-bold text-gray-500 text-sm uppercase tracking-wider">店舗名</h4>
                <p class="mt-1 text-lg">${dummyStoreSettings.name}</p>
            </div>
             <hr>
            <div>
                <h4 class="font-bold text-gray-500 text-sm uppercase tracking-wider">住所</h4>
                <p class="mt-1 text-lg">${dummyStoreSettings.address}</p>
            </div>
             <hr>
            <div>
                <h4 class="font-bold text-gray-500 text-sm uppercase tracking-wider">店舗紹介文</h4>
                <p class="mt-1 text-lg whitespace-pre-wrap">${dummyStoreSettings.description}</p>
            </div>
             <hr>
            <div>
                <h4 class="font-bold text-gray-500 text-sm uppercase tracking-wider">定休日</h4>
                <p class="mt-1 text-lg">${dummyStoreSettings.holidays}</p>
            </div>
             <hr>
            <div>
                <h4 class="font-bold text-gray-500 text-sm uppercase tracking-wider mb-2">営業時間</h4>
                <div class="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                    ${Object.keys(shifts).map(day => `<div class="bg-gray-50 text-center font-bold py-2">${day}</div>`).join('')}
                    ${Object.values(shifts).map(time => `<div class="bg-white text-center py-4">${time.includes('定休日') ? `<span class="text-red-500 font-semibold">${time}</span>` : time}</div>`).join('')}
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}


// --- Event Handlers ---
function handleAddMenu() {
    modalTitle.textContent = '新規メニューを追加';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">メニュー名</label><input type="text" id="menu-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="menu-price-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">施術時間 (分)</label><input type="number" id="menu-time-input" class="w-full mt-1 p-2 border rounded-md"></div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('menu-name-input').value;
        const price = document.getElementById('menu-price-input').value;
        const time = document.getElementById('menu-time-input').value;
        if (!name || !price || !time) {
            alert('すべての項目を入力してください。');
            return;
        }
        dummyAllMenus.push({ id: `menu${Date.now()}`, name, price: `${parseInt(price).toLocaleString()}`, time: `${time}分` });
        renderMenus();
        closeModal();
    };
    openModal();
}

function handleEditMenu(id) {
    const menu = dummyAllMenus.find(m => m.id === id);
    if (!menu) return;

    modalTitle.textContent = 'メニューを編集';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">メニュー名</label><input type="text" id="menu-name-input" value="${menu.name}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="menu-price-input" value="${menu.price.replace(/,/g, '')}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">施術時間 (分)</label><input type="number" id="menu-time-input" value="${menu.time.replace('分', '')}" class="w-full mt-1 p-2 border rounded-md"></div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        menu.name = document.getElementById('menu-name-input').value;
        menu.price = `${parseInt(document.getElementById('menu-price-input').value).toLocaleString()}`;
        menu.time = `${document.getElementById('menu-time-input').value}分`;
        renderMenus();
        closeModal();
    };
    openModal();
}

function handleDeleteMenu(id) {
    if (confirm('このメニューを本当に削除しますか？')) {
        dummyAllMenus = dummyAllMenus.filter(m => m.id !== id);
        renderMenus();
    }
}

function handleReservationDetails(id) {
    const reservation = dummyAllReservations.find(r => r.id === id);
    if (!reservation) return;

    modalTitle.textContent = '予約詳細';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><p class="text-sm text-gray-500">顧客名</p><p class="font-semibold">${reservation.customerName}様</p></div>
            <div><p class="text-sm text-gray-500">日時</p><p class="font-semibold">${reservation.date} ${reservation.time}</p></div>
            <div><p class="text-sm text-gray-500">メニュー</p><p class="font-semibold">${reservation.menu}</p></div>
            <div><p class="text-sm text-gray-500">担当者</p><p class="font-semibold">${reservation.staff}</p></div>
            <div>
                <label class="font-semibold text-sm">ステータス変更</label>
                <select id="status-select" class="w-full mt-1 p-2 border rounded-md">
                    <option value="確定" ${reservation.status === '確定' ? 'selected' : ''}>確定</option>
                    <option value="完了" ${reservation.status === '完了' ? 'selected' : ''}>完了</option>
                    <option value="キャンセル" ${reservation.status === 'キャンセル' ? 'selected' : ''}>キャンセル</option>
                </select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        const newStatus = document.getElementById('status-select').value;
        reservation.status = newStatus;
        renderReservations();
        closeModal();
    };
    openModal();
}

function handleAddNewReservation() {
    modalTitle.textContent = '新規予約を作成';
    
    const customerOptions = dummyAllCustomers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    const menuOptions = dummyAllMenus.map(m => `<option value="${m.name}">${m.name}</option>`).join('');
    const staffOptions = dummyStaff.map(s => `<option value="${s.name}">${s.name}</option>`).join('');

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="font-semibold text-sm">顧客</label>
                <select id="res-customer-input" class="w-full mt-1 p-2 border rounded-md bg-white">
                    ${customerOptions}
                </select>
            </div>
             <div>
                <label class="font-semibold text-sm">時間</label>
                <input type="time" id="res-time-input" value="10:00" class="w-full mt-1 p-2 border rounded-md">
            </div>
            <div>
                <label class="font-semibold text-sm">メニュー</label>
                <select id="res-menu-input" class="w-full mt-1 p-2 border rounded-md bg-white">
                   ${menuOptions}
                </select>
            </div>
            <div>
                <label class="font-semibold text-sm">担当者</label>
                <select id="res-staff-input" class="w-full mt-1 p-2 border rounded-md bg-white">
                    ${staffOptions}
                </select>
            </div>
        </div>
    `;

    modalConfirmBtn.onclick = () => {
        const customerName = document.getElementById('res-customer-input').value;
        const time = document.getElementById('res-time-input').value;
        const menu = document.getElementById('res-menu-input').value;
        const staff = document.getElementById('res-staff-input').value;

        if (!customerName || !time || !menu || !staff) {
            alert('すべての項目を選択してください。');
            return;
        }

        const newReservation = {
            id: `res${Date.now()}`,
            date: reservationDate.toISOString().split('T')[0],
            time: time,
            customerName: customerName,
            menu: menu,
            staff: staff,
            status: '確定'
        };

        dummyAllReservations.push(newReservation);
        renderReservations();
        closeModal();
    };

    openModal();
}

function handleAddCustomer() {
    modalTitle.textContent = '新規顧客を追加';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">顧客名</label><input type="text" id="customer-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">メモ</label><textarea id="customer-memo-input" class="w-full mt-1 p-2 border rounded-md" rows="3"></textarea></div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('customer-name-input').value;
        if (!name) {
            alert('顧客名を入力してください。');
            return;
        }
        const newCustomer = {
            id: `cust${Date.now()}`,
            name: name,
            lastVisit: '未訪問',
            totalSpend: '0',
            memo: document.getElementById('customer-memo-input').value,
            ticket: null
        };
        dummyAllCustomers.push(newCustomer);
        renderCustomers();
        closeModal();
    };
    openModal();
}

function handleCustomerDetails(id) {
    const customer = dummyAllCustomers.find(c => c.id === id);
    if (!customer) return;

    modalTitle.textContent = '顧客詳細';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><p class="text-sm text-gray-500">顧客名</p><p class="font-semibold">${customer.name}</p></div>
            <div><p class="text-sm text-gray-500">最終来店日</p><p class="font-semibold">${customer.lastVisit}</p></div>
            <div><p class="text-sm text-gray-500">累計利用額</p><p class="font-semibold">¥${customer.totalSpend}</p></div>
            <div>
                 <p class="text-sm text-gray-500">保有回数券</p>
                 ${customer.ticket ? `
                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded-md mt-1">
                        <div>
                            <p class="font-semibold">${customer.ticket.name}</p>
                            <p class="text-sm">残り: ${customer.ticket.remaining}回</p>
                        </div>
                        <button id="use-ticket-btn" class="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 ${customer.ticket.remaining === 0 ? 'opacity-50 cursor-not-allowed' : ''}">使用する</button>
                    </div>
                 ` : '<p class="font-semibold">なし</p>'}
            </div>
            <div>
                <label class="font-semibold text-sm">メモ</label>
                <textarea id="customer-memo-input" class="w-full mt-1 p-2 border rounded-md" rows="4">${customer.memo}</textarea>
            </div>
        </div>
    `;

    const useTicketBtn = modalBody.querySelector('#use-ticket-btn');
    if(useTicketBtn){
        useTicketBtn.onclick = () => {
             if (customer.ticket && customer.ticket.remaining > 0) {
                customer.ticket.remaining--;
                handleCustomerDetails(id); // Re-render modal content
                renderCustomers(); // Re-render table in the background
            } else {
                alert('この回数券はもう使用できません。');
            }
        };
    }
    
    modalConfirmBtn.onclick = () => {
        customer.memo = document.getElementById('customer-memo-input').value;
        renderCustomers();
        closeModal();
    };
    openModal();
}

function handleAddOption() {
    modalTitle.textContent = '新規オプションを追加';

    const menuCheckboxes = dummyAllMenus.map(m => `
        <label class="flex items-center"><input type="checkbox" name="menu-assoc" value="${m.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2">${m.name}</label>
    `).join('');

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">オプション名</label><input type="text" id="option-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="option-price-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">対応メニュー (複数選択可)</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">${menuCheckboxes}</div></div>
        </div>
    `;

    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('option-name-input').value;
        const price = document.getElementById('option-price-input').value;
        const associatedMenuIds = [...document.querySelectorAll('input[name="menu-assoc"]:checked')].map(cb => cb.value);

        if (!name || !price) {
            alert('オプション名と価格を入力してください。');
            return;
        }

        dummyAllOptions.push({
            id: `opt${Date.now()}`,
            name,
            price,
            associatedMenuIds
        });
        renderOptions();
        closeModal();
    };
    openModal();
}

function handleEditOption(id) {
    const option = dummyAllOptions.find(o => o.id === id);
    if (!option) return;

    modalTitle.textContent = 'オプションを編集';

    const menuCheckboxes = dummyAllMenus.map(m => `
        <label class="flex items-center"><input type="checkbox" name="menu-assoc" value="${m.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" ${option.associatedMenuIds.includes(m.id) ? 'checked' : ''}>${m.name}</label>
    `).join('');

    modalBody.innerHTML = `
         <div class="space-y-4">
            <div><label class="font-semibold text-sm">オプション名</label><input type="text" id="option-name-input" value="${option.name}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="option-price-input" value="${option.price}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">対応メニュー (複数選択可)</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">${menuCheckboxes}</div></div>
        </div>
    `;

     modalConfirmBtn.onclick = () => {
        option.name = document.getElementById('option-name-input').value;
        option.price = document.getElementById('option-price-input').value;
        option.associatedMenuIds = [...document.querySelectorAll('input[name="menu-assoc"]:checked')].map(cb => cb.value);
        renderOptions();
        closeModal();
    };
    openModal();
}

function handleDeleteOption(id) {
     if (confirm('このオプションを本当に削除しますか？')) {
        dummyAllOptions = dummyAllOptions.filter(o => o.id !== id);
        renderOptions();
    }
}

function handleAddTicketTemplate() {
    modalTitle.textContent = '新規回数券テンプレートを作成';
    const menuOptions = dummyAllMenus.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
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
    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('ticket-name-input').value;
        const price = document.getElementById('ticket-price-input').value;
        const count = document.getElementById('ticket-count-input').value;
        const menuId = document.getElementById('ticket-menu-input').value;

        if (!name || !price || !count || !menuId) {
            alert('すべての項目を入力してください。');
            return;
        }

        dummyTicketTemplates.push({
            id: `t_temp${Date.now()}`,
            name,
            price: parseInt(price).toLocaleString(),
            count: parseInt(count),
            menuId
        });
        renderTickets();
        closeModal();
    };
    openModal();
}

function handleEditTicketTemplate(id) {
    const template = dummyTicketTemplates.find(t => t.id === id);
    if (!template) return;

    modalTitle.textContent = '回数券テンプレートを編集';
    const menuOptions = dummyAllMenus.map(m => `<option value="${m.id}" ${template.menuId === m.id ? 'selected' : ''}>${m.name}</option>`).join('');
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">テンプレート名</label><input type="text" id="ticket-name-input" class="w-full mt-1 p-2 border rounded-md" value="${template.name}"></div>
            <div><label class="font-semibold text-sm">価格</label><input type="number" id="ticket-price-input" class="w-full mt-1 p-2 border rounded-md" value="${template.price.replace(/,/g, '')}"></div>
            <div><label class="font-semibold text-sm">回数</label><input type="number" id="ticket-count-input" class="w-full mt-1 p-2 border rounded-md" value="${template.count}"></div>
            <div><label class="font-semibold text-sm">対応メニュー</label>
                <select id="ticket-menu-input" class="w-full mt-1 p-2 border rounded-md bg-white">${menuOptions}</select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('ticket-name-input').value;
        const price = document.getElementById('ticket-price-input').value;
        const count = document.getElementById('ticket-count-input').value;
        const menuId = document.getElementById('ticket-menu-input').value;

        if (!name || !price || !count || !menuId) {
            alert('すべての項目を入力してください。');
            return;
        }
        
        template.name = name;
        template.price = parseInt(price).toLocaleString();
        template.count = parseInt(count);
        template.menuId = menuId;
        
        renderTickets();
        closeModal();
    };
    openModal();
}

function handleDeleteTicketTemplate(id) {
    if (confirm('この回数券テンプレートを本当に削除しますか？')) {
        dummyTicketTemplates = dummyTicketTemplates.filter(t => t.id !== id);
        renderTickets();
    }
}


function handleAssignTicket() {
    const customerId = document.getElementById('assign-ticket-customer').value;
    const templateId = document.getElementById('assign-ticket-template').value;
    
    const customer = dummyAllCustomers.find(c => c.id === customerId);
    const template = dummyTicketTemplates.find(t => t.id === templateId);

    if (customer && template) {
        if (customer.ticket && !confirm(`${customer.name}様はすでに回数券を保有しています。上書きして新しい回数券を付与しますか？`)) {
            return;
        }
        
        customer.ticket = {
            name: template.name,
            remaining: template.count,
        };

        alert(`${customer.name}様に「${template.name}」を付与しました。`);
        if (!views['customers'].classList.contains('hidden')) {
             renderCustomers();
        }
    } else {
        alert('顧客またはテンプレートが見つかりませんでした。');
    }
}

function handleEditSettings() {
    modalTitle.textContent = '店舗情報を編集';
    
    const dayOrder = ['月', '火', '水', '木', '金', '土', '日'];
    const dayInputs = dayOrder.map(day => {
        const time = dummyStoreSettings.shifts[day];
        const isClosed = time.includes('定休日');
        const [start, end] = isClosed ? ['10:00', '20:00'] : time.split(' - ');

        return `
            <div class="grid grid-cols-5 items-center gap-2">
                <label class="font-semibold col-span-1">${day}</label>
                <input type="time" id="start-time-${day}" value="${start}" class="p-2 border rounded-md col-span-2" ${isClosed ? 'disabled' : ''}>
                <input type="time" id="end-time-${day}" value="${end}" class="p-2 border rounded-md col-span-2" ${isClosed ? 'disabled' : ''}>
                <div class="col-start-2 col-span-4"><label class="flex items-center text-sm"><input type="checkbox" id="closed-${day}" ${isClosed ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2">定休日</label></div>
            </div>
        `;
    }).join('<hr class="my-2">');

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">店舗名</label><input type="text" id="setting-name-input" value="${dummyStoreSettings.name}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">住所</label><input type="text" id="setting-address-input" value="${dummyStoreSettings.address}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">店舗紹介文</label><textarea id="setting-desc-input" class="w-full mt-1 p-2 border rounded-md" rows="5">${dummyStoreSettings.description}</textarea></div>
            <div><label class="font-semibold text-sm">定休日 (表示用)</label><input type="text" id="setting-holidays-input" value="${dummyStoreSettings.holidays}" class="w-full mt-1 p-2 border rounded-md" placeholder="例: 毎週火曜日、第3月曜日"></div>
            <hr>
            <div><h4 class="font-semibold text-sm mb-2">営業時間</h4><div class="space-y-2">${dayInputs}</div></div>
        </div>`;

    dayOrder.forEach((day) => {
        const checkbox = modalBody.querySelector(`#closed-${day}`);
        const startTimeInput = modalBody.querySelector(`#start-time-${day}`);
        const endTimeInput = modalBody.querySelector(`#end-time-${day}`);
        checkbox.onchange = (e) => {
            const disabled = e.target.checked;
            startTimeInput.disabled = disabled;
            endTimeInput.disabled = disabled;
        };
    });

    modalConfirmBtn.onclick = () => {
        dummyStoreSettings.name = document.getElementById('setting-name-input').value;
        dummyStoreSettings.address = document.getElementById('setting-address-input').value;
        dummyStoreSettings.description = document.getElementById('setting-desc-input').value;
        dummyStoreSettings.holidays = document.getElementById('setting-holidays-input').value;

        dayOrder.forEach((day) => {
            const isClosed = modalBody.querySelector(`#closed-${day}`).checked;
            if (isClosed) {
                dummyStoreSettings.shifts[day] = '定休日';
            } else {
                const start = modalBody.querySelector(`#start-time-${day}`).value;
                const end = modalBody.querySelector(`#end-time-${day}`).value;
                dummyStoreSettings.shifts[day] = `${start} - ${end}`;
            }
        });
        renderSettings();
        closeModal();
    };

    openModal();
}

function handleAddStaff() {
    modalTitle.textContent = '新規スタッフを追加';
    
    const menuCheckboxes = dummyAllMenus.map(m => `<label class="flex items-center"><input type="checkbox" name="staff-menu-assoc" value="${m.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2">${m.name}</label>`).join('');
    const optionCheckboxes = dummyAllOptions.map(o => `<label class="flex items-center"><input type="checkbox" name="staff-option-assoc" value="${o.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2">${o.name}</label>`).join('');

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">スタッフ名</label><input type="text" id="staff-name-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">得意な施術など</label><input type="text" id="staff-specialty-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">対応可能メニュー</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${menuCheckboxes}</div></div>
            <div><label class="font-semibold text-sm">対応可能オプション</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${optionCheckboxes}</div></div>
        </div>
    `;

    modalConfirmBtn.onclick = () => {
        const name = document.getElementById('staff-name-input').value;
        const specialty = document.getElementById('staff-specialty-input').value;
        const assignableMenuIds = [...document.querySelectorAll('input[name="staff-menu-assoc"]:checked')].map(cb => cb.value);
        const assignableOptionIds = [...document.querySelectorAll('input[name="staff-option-assoc"]:checked')].map(cb => cb.value);

        if (!name) { alert('スタッフ名を入力してください。'); return; }

        dummyStaff.push({ id: `staff${Date.now()}`, name, specialty, assignableMenuIds, assignableOptionIds, shifts: { ...dummyStoreSettings.shifts } }); // 店舗のデフォルトシフトをコピー
        renderStaff();
        closeModal();
    };
    openModal();
}

function handleEditStaff(id) {
    const staff = dummyStaff.find(s => s.id === id);
    if (!staff) return;

    modalTitle.textContent = 'スタッフ情報を編集';

    const menuCheckboxes = dummyAllMenus.map(m => `<label class="flex items-center"><input type="checkbox" name="staff-menu-assoc" value="${m.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" ${staff.assignableMenuIds.includes(m.id) ? 'checked' : ''}>${m.name}</label>`).join('');
    const optionCheckboxes = dummyAllOptions.map(o => `<label class="flex items-center"><input type="checkbox" name="staff-option-assoc" value="${o.id}" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" ${staff.assignableOptionIds.includes(o.id) ? 'checked' : ''}>${o.name}</label>`).join('');

    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">スタッフ名</label><input type="text" id="staff-name-input" value="${staff.name}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">得意な施術など</label><input type="text" id="staff-specialty-input" value="${staff.specialty}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">対応可能メニュー</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${menuCheckboxes}</div></div>
            <div><label class="font-semibold text-sm">対応可能オプション</label><div class="mt-2 space-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">${optionCheckboxes}</div></div>
        </div>
    `;
    
    modalConfirmBtn.onclick = () => {
        staff.name = document.getElementById('staff-name-input').value;
        staff.specialty = document.getElementById('staff-specialty-input').value;
        staff.assignableMenuIds = [...document.querySelectorAll('input[name="staff-menu-assoc"]:checked')].map(cb => cb.value);
        staff.assignableOptionIds = [...document.querySelectorAll('input[name="staff-option-assoc"]:checked')].map(cb => cb.value);
        renderStaff();
        closeModal();
    };
    openModal();
}

function handleDeleteStaff(id) {
    if (confirm('このスタッフを本当に削除しますか？')) {
        dummyStaff = dummyStaff.filter(s => s.id !== id);
        renderStaff();
    }
}

function handleEditStaffShifts(id) {
    const staff = dummyStaff.find(s => s.id === id);
    if (!staff) return;
    
    modalTitle.textContent = `${staff.name} のシフトを編集`;

    const dayOrder = ['月', '火', '水', '木', '金', '土', '日'];
    const dayInputs = dayOrder.map(day => {
        const time = staff.shifts[day] || dummyStoreSettings.shifts[day];
        const isClosed = time.includes('休み') || time.includes('定休日');
        const [start, end] = isClosed ? ['10:00', '20:00'] : time.split(' - ');

        return `
            <div class="grid grid-cols-5 items-center gap-2">
                <label class="font-semibold col-span-1">${day}</label>
                <input type="time" id="staff-start-time-${day}" value="${start}" class="p-2 border rounded-md col-span-2" ${isClosed ? 'disabled' : ''}>
                <input type="time" id="staff-end-time-${day}" value="${end}" class="p-2 border rounded-md col-span-2" ${isClosed ? 'disabled' : ''}>
                <div class="col-start-2 col-span-4"><label class="flex items-center text-sm"><input type="checkbox" id="staff-closed-${day}" ${isClosed ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2">休み</label></div>
            </div>
        `;
    }).join('<hr class="my-2">');

    modalBody.innerHTML = `<div class="space-y-4">${dayInputs}</div>`;

    dayOrder.forEach((day) => {
        const checkbox = modalBody.querySelector(`#staff-closed-${day}`);
        const startTimeInput = modalBody.querySelector(`#staff-start-time-${day}`);
        const endTimeInput = modalBody.querySelector(`#staff-end-time-${day}`);
        checkbox.onchange = (e) => {
            const disabled = e.target.checked;
            startTimeInput.disabled = disabled;
            endTimeInput.disabled = disabled;
        };
    });

    modalConfirmBtn.onclick = () => {
        dayOrder.forEach((day) => {
            const isClosed = modalBody.querySelector(`#staff-closed-${day}`).checked;
            if (isClosed) {
                staff.shifts[day] = '休み';
            } else {
                const start = modalBody.querySelector(`#staff-start-time-${day}`).value;
                const end = modalBody.querySelector(`#staff-end-time-${day}`).value;
                staff.shifts[day] = `${start} - ${end}`;
            }
        });
        renderStaff();
        closeModal();
    };

    openModal();
}

function handleAddCoupon() {
    modalTitle.textContent = '新規クーポンを作成';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">タイトル</label><input type="text" id="coupon-title-input" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">詳細</label><textarea id="coupon-details-input" class="w-full mt-1 p-2 border rounded-md" rows="3"></textarea></div>
            <div>
                <label class="font-semibold text-sm">対象顧客</label>
                <select id="coupon-target-input" class="w-full mt-1 p-2 border rounded-md bg-white">
                    <option value="全員">全員</option>
                    <option value="新規">新規</option>
                </select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        const title = document.getElementById('coupon-title-input').value;
        const details = document.getElementById('coupon-details-input').value;
        const target = document.getElementById('coupon-target-input').value;

        if (!title || !details) { alert('タイトルと詳細を入力してください。'); return; }
        
        dummyCoupons.push({ id: `coupon${Date.now()}`, title, details, target });
        renderCoupons();
        closeModal();
    };
    openModal();
}

function handleEditCoupon(id) {
    const coupon = dummyCoupons.find(c => c.id === id);
    if (!coupon) return;

    modalTitle.textContent = 'クーポンを編集';
    modalBody.innerHTML = `
        <div class="space-y-4">
            <div><label class="font-semibold text-sm">タイトル</label><input type="text" id="coupon-title-input" value="${coupon.title}" class="w-full mt-1 p-2 border rounded-md"></div>
            <div><label class="font-semibold text-sm">詳細</label><textarea id="coupon-details-input" class="w-full mt-1 p-2 border rounded-md" rows="3">${coupon.details}</textarea></div>
            <div>
                <label class="font-semibold text-sm">対象顧客</label>
                <select id="coupon-target-input" class="w-full mt-1 p-2 border rounded-md bg-white">
                    <option value="全員" ${coupon.target === '全員' ? 'selected' : ''}>全員</option>
                    <option value="新規" ${coupon.target === '新規' ? 'selected' : ''}>新規</option>
                </select>
            </div>
        </div>
    `;
    modalConfirmBtn.onclick = () => {
        coupon.title = document.getElementById('coupon-title-input').value;
        coupon.details = document.getElementById('coupon-details-input').value;
        coupon.target = document.getElementById('coupon-target-input').value;
        renderCoupons();
        closeModal();
    };
    openModal();
}

function handleDeleteCoupon(id) {
    if (confirm('このクーポンを本当に削除しますか？')) {
        dummyCoupons = dummyCoupons.filter(c => c.id !== id);
        renderCoupons();
    }
}


// --- View Switching Logic ---
function switchView(targetView) {
    Object.values(views).forEach(view => {
        if(view) view.classList.add('hidden');
    });
    if (views[targetView]) {
        views[targetView].classList.remove('hidden');
    }

    const links = sidebarNav.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        link.classList.toggle('active', link.dataset.view === targetView);
    });

    // Call render function for the view
    switch (targetView) {
        case 'dashboard': renderDashboard(); break;
        case 'reservations': renderReservations(); break;
        case 'customers': renderCustomers(); break;
        case 'staff': renderStaff(); break;
        case 'menus': renderMenus(); break;
        case 'options': renderOptions(); break;
        case 'tickets': renderTickets(); break;
        case 'coupons': renderCoupons(); break;
        case 'settings': renderSettings(); break;
    }
}


// --- Initial Page Load & Event Delegation ---
document.addEventListener('DOMContentLoaded', () => {
    sidebarNav.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('.sidebar-link');
        if (link && link.dataset.view) {
            switchView(link.dataset.view);
        }
    });

    switchView('dashboard');
    lucide.createIcons();
    
    // Main container event delegation
    document.querySelector('main').addEventListener('click', (e) => {
        const addMenuBtn = e.target.closest('#add-menu-btn');
        const editMenuBtn = e.target.closest('.edit-menu-btn');
        const deleteMenuBtn = e.target.closest('.delete-menu-btn');
        const addOptionBtn = e.target.closest('#add-option-btn');
        const editOptionBtn = e.target.closest('.edit-option-btn');
        const deleteOptionBtn = e.target.closest('.delete-option-btn');
        const addTicketTemplateBtn = e.target.closest('#add-ticket-template-btn');
        const editTicketTemplateBtn = e.target.closest('.edit-ticket-template-btn');
        const deleteTicketTemplateBtn = e.target.closest('.delete-ticket-template-btn');
        const assignTicketBtn = e.target.closest('#assign-ticket-btn');
        const addCouponBtn = e.target.closest('#add-coupon-btn');
        const editCouponBtn = e.target.closest('.edit-coupon-btn');
        const deleteCouponBtn = e.target.closest('.delete-coupon-btn');
        const editSettingsBtn = e.target.closest('#edit-settings-btn');
        const addStaffBtn = e.target.closest('#add-staff-btn');
        const editStaffBtn = e.target.closest('.edit-staff-btn');
        const deleteStaffBtn = e.target.closest('.delete-staff-btn');
        const editStaffShiftsBtn = e.target.closest('.edit-staff-shifts-btn');
        const reservationDetailsBtn = e.target.closest('.reservation-details-btn');
        const addReservationBtn = e.target.closest('#add-reservation-btn');
        const addCustomerBtn = e.target.closest('#add-customer-btn');
        const customerDetailsBtn = e.target.closest('.customer-details-btn');
        const prevDayBtn = e.target.closest('#prev-day-btn');
        const nextDayBtn = e.target.closest('#next-day-btn');
        const todayBtn = e.target.closest('#today-btn');

        if (addMenuBtn) handleAddMenu();
        if (editMenuBtn) handleEditMenu(editMenuBtn.dataset.id);
        if (deleteMenuBtn) handleDeleteMenu(deleteMenuBtn.dataset.id);
        if (addOptionBtn) handleAddOption();
        if (editOptionBtn) handleEditOption(editOptionBtn.dataset.id);
        if (deleteOptionBtn) handleDeleteOption(deleteOptionBtn.dataset.id);
        if (addTicketTemplateBtn) handleAddTicketTemplate();
        if (editTicketTemplateBtn) handleEditTicketTemplate(editTicketTemplateBtn.dataset.id);
        if (deleteTicketTemplateBtn) handleDeleteTicketTemplate(deleteTicketTemplateBtn.dataset.id);
        if (assignTicketBtn) handleAssignTicket();
        if (addCouponBtn) handleAddCoupon();
        if (editCouponBtn) handleEditCoupon(editCouponBtn.dataset.id);
        if (deleteCouponBtn) handleDeleteCoupon(deleteCouponBtn.dataset.id);
        if (editSettingsBtn) handleEditSettings();
        if (addStaffBtn) handleAddStaff();
        if (editStaffBtn) handleEditStaff(editStaffBtn.dataset.id);
        if (deleteStaffBtn) handleDeleteStaff(deleteStaffBtn.dataset.id);
        if (editStaffShiftsBtn) handleEditStaffShifts(editStaffShiftsBtn.dataset.id);
        if (reservationDetailsBtn) handleReservationDetails(reservationDetailsBtn.dataset.id);
        if (addReservationBtn) handleAddNewReservation();
        if (addCustomerBtn) handleAddCustomer();
        if (customerDetailsBtn) handleCustomerDetails(customerDetailsBtn.dataset.id);
        
        if (prevDayBtn) {
            reservationDate.setDate(reservationDate.getDate() - 1);
            renderReservations();
        }
        if (nextDayBtn) {
            reservationDate.setDate(reservationDate.getDate() + 1);
            renderReservations();
        }
        if (todayBtn) {
            reservationDate = new Date('2025-10-02');
            renderReservations();
        }
    });

    document.querySelector('main').addEventListener('input', (e) => {
        if (e.target.id === 'customer-search-input') {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCustomers = dummyAllCustomers.filter(c => c.name.toLowerCase().includes(searchTerm));
            renderCustomers(filteredCustomers);
        }
    });

    // Modal listeners
    modalCloseBtn.addEventListener('click', closeModal);
    modalCloseXBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});

