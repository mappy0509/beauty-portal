// ========================================================================
// --- お客様ページ用 開発用ダミーデータ (スマホUI版) ---
// ========================================================================
const dummySalonDetail = {
    id: 'salon1',
    name: 'Luminous Hair',
    address: '東京都渋谷区恵比寿1-1-1',
    description: '光溢れる空間で、あなただけの最高のスタイルを見つけませんか？経験豊富なスタイリストが、丁寧なカウンセリングでお客様一人ひとりの魅力を最大限に引き出します。',
    imageUrl: 'https://placehold.co/600x400/E9D5FF/8B5CF6?text=Luminous+Hair',
    openingHours: '平日 10:00-20:00 / 土日祝 09:00-19:00',
    holidays: '毎週火曜日'
};

const dummySalonMenus = [
    {
        id: 'menu1',
        name: 'デザインカット',
        description: '骨格や髪質に合わせた再現性の高いカット技術で、あなたの魅力を最大限に引き出します。',
        price: '6,600',
        time: '60分',
        options: [
            { id: 'opt1-1', name: '炭酸シャンプー', price: '1000' },
            { id: 'opt1-2', name: '眉カット', price: '500' }
        ]
    },
    {
        id: 'menu2',
        name: 'カット＋オーガニックカラー',
        description: '髪と頭皮に優しいオーガニック成分配合のカラー剤を使用。透明感と艶のある仕上がりに。',
        price: '13,200',
        time: '120分',
        options: []
    },
    {
        id: 'menu3',
        name: 'TOKIOトリートメント',
        description: '特許技術インカラミによる本格的な髪質改善。毛髪強度を回復させ、驚きのツヤと手触りを実現します。',
        price: '5,500',
        time: '45分',
        options: [
            { id: 'opt3-1', name: '超音波アイロン使用', price: '1500' }
        ]
    },
];

const dummyStaff = [
    { id: 'staff1', name: 'Suzuki', specialty: 'ショートカットが得意です' },
    { id: 'staff2', name: 'Tanaka', specialty: 'カラーリングのスペシャリスト' },
    { id: 'staff3', name: 'Watanabe', specialty: 'ヘアケア・髪質改善お任せください' },
    { id: 'staff0', name: '指名なし', specialty: ''}
];

const dummyOwnedTickets = [
    {
        id: 'owned_ticket1',
        name: 'デザインカット 3回券',
        menuId: 'menu1', 
        remaining: 2,
        total: 3,
        expiryDate: '2026年3月31日'
    },
    {
        id: 'owned_ticket2',
        name: 'TOKIOトリートメント 5回券',
        menuId: 'menu3', 
        remaining: 5,
        total: 5,
        expiryDate: '2026年9月30日'
    },
];

const dummyBookingHistory = [
    {
        id: 'hist1',
        menuName: 'デザインカット',
        staffName: 'Suzuki',
        date: '2025年9月15日 14:00',
        totalPrice: '6,600',
        status: '来店済み'
    },
    {
        id: 'hist2',
        menuName: 'カット＋オーガニックカラー',
        staffName: 'Tanaka',
        date: '2025年8月20日 11:30',
        totalPrice: '13,200',
        status: '来店済み'
    },
    {
        id: 'hist3',
        menuName: 'TOKIOトリートメント',
        staffName: 'Watanabe',
        date: '2025年7月5日 18:00',
        totalPrice: '5,500',
        status: 'キャンセル'
    }
];

const dummySalonCoupons = [
    { title: '【新規様限定】カット＋カラー 20% OFF', details: '通常価格 13,200円 → 10,560円' },
    { title: '【全員OK】平日限定トリートメントサービス', details: '平日10時〜16時のご予約で、クイックトリートメントをプレゼント。' }
];


const timeSlots = [];
for (let h = 10; h < 24; h++) { for (let m = 0; m < 60; m += 15) { timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`); } }
const availabilitySymbols = ['◎', 'TEL', '×'];
const dummyAvailabilityGrid = Array.from({ length: 28 }, () => Array.from({ length: timeSlots.length }, () => availabilitySymbols[Math.floor(Math.random() * availabilitySymbols.length)]));
for (let i = 0; i < 28; i++) { const date = new Date(); date.setDate(date.getDate() + i); if (date.getDay() === 2) { dummyAvailabilityGrid[i] = Array(timeSlots.length).fill('×'); } }
// ========================================================================

// --- State Management ---
let reservationState = {
    menu: null,
    options: [],
    staff: null,
    date: null,
    time: null,
    notes: '',
    ticket: null, 
};

// --- DOM Elements ---
const mainHeader = document.getElementById('main-header');
const reservationHeader = document.getElementById('reservation-header');
const reservationStepTitle = document.getElementById('reservation-step-title');
const mainContentContainer = document.getElementById('main-content-container');
const reservationFlowContainer = document.getElementById('reservation-flow-container');
const salonNameHeader = document.getElementById('salon-name-header');
const menuListContainer = document.getElementById('menu-list-container');
const ticketListContainer = document.getElementById('ticket-list-container');
const historyListContainer = document.getElementById('history-list-container');
const couponListContainer = document.getElementById('coupon-list-container');
const calendarNav = document.getElementById('calendar-nav');
const bookingCalendarContainer = document.getElementById('booking-calendar-container');
const bookingCalendarWrapper = document.getElementById('booking-calendar-wrapper');
const bottomNav = document.getElementById('bottom-nav');
const navButtons = document.querySelectorAll('.nav-btn');
const reservationFooter = document.getElementById('reservation-footer');

// --- Views & Buttons ---
const views = {
    'salon-info': document.getElementById('salon-info-view'),
    'menu': document.getElementById('menu-view'),
    'ticket': document.getElementById('ticket-view'),
    'history': document.getElementById('history-view'),
    'coupon': document.getElementById('coupon-view'),
    'options': document.getElementById('options-view'),
    'staff': document.getElementById('staff-view'),
    'datetime': document.getElementById('datetime-view'),
    'confirmation': document.getElementById('confirmation-view'),
    'booking-complete': document.getElementById('booking-complete-view'),
};
const reservationButtons = {
    'options': document.getElementById('to-staff-selection-btn'),
    'staff': document.getElementById('to-datetime-selection-btn'),
    'datetime': document.getElementById('to-confirmation-btn'),
    'confirmation': document.getElementById('submit-booking-btn'),
};

// --- Render Functions ---
function renderSalonInfo() {
    const salonInfoView = document.getElementById('salon-info-view');
    salonNameHeader.textContent = dummySalonDetail.name;
    salonInfoView.innerHTML = `
        <img src="${dummySalonDetail.imageUrl}" alt="${dummySalonDetail.name}" class="w-full h-56 object-cover rounded-lg shadow-md mb-6">
        <h2 class="text-3xl font-bold mb-2">${dummySalonDetail.name}</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">${dummySalonDetail.description}</p>
        <div class="space-y-4 text-gray-700 bg-white p-4 rounded-lg border">
            <div class="flex items-start"><i data-lucide="map-pin" class="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0"></i><span>${dummySalonDetail.address}</span></div>
            <div class="flex items-center"><i data-lucide="clock" class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0"></i><span>${dummySalonDetail.openingHours}</span></div>
            <div class="flex items-center"><i data-lucide="calendar-x" class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0"></i><span>定休日: ${dummySalonDetail.holidays}</span></div>
        </div>
    `;
}

function renderCouponList() {
    couponListContainer.innerHTML = dummySalonCoupons.map(coupon => `
         <div class="bg-white p-4 rounded-lg shadow-sm border border-pink-300">
            <h4 class="font-bold text-lg text-pink-600">${coupon.title}</h4>
            <p class="text-sm text-gray-600 mt-1">${coupon.details}</p>
        </div>
    `).join('');
}

function renderMenuList() {
    menuListContainer.innerHTML = dummySalonMenus.map(menu => `
        <div class="menu-card bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50 transition" data-menu-id="${menu.id}">
            <div class="flex justify-between items-center">
                <div class="flex-1 pr-4">
                    <h4 class="font-bold text-lg">${menu.name}</h4>
                    <p class="text-sm text-gray-600 my-2">${menu.description}</p>
                    <p class="text-sm text-gray-500">${menu.time} / ¥${menu.price}</p>
                </div>
                <div class="flex-shrink-0"><i data-lucide="chevron-right" class="text-gray-400"></i></div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderTicketList() {
    if (dummyOwnedTickets.length === 0) {
        ticketListContainer.innerHTML = `<p class="text-gray-500 text-center">現在保有している回数券はありません。</p>`;
        return;
    }
    ticketListContainer.innerHTML = dummyOwnedTickets.map(ticket => `
        <div class="bg-white p-4 rounded-lg shadow-sm border">
            <h4 class="font-bold text-lg text-gray-800">${ticket.name}</h4>
            <div class="my-3">
                <div class="flex justify-between items-baseline mb-1">
                    <span class="text-sm text-gray-600">残り回数</span>
                    <span class="font-bold text-lg text-purple-600">${ticket.remaining}<span class="text-sm font-normal text-gray-500"> / ${ticket.total}回</span></span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-purple-600 h-2.5 rounded-full" style="width: ${(ticket.remaining / ticket.total) * 100}%"></div>
                </div>
            </div>
            <p class="text-xs text-gray-500 text-right mb-4">有効期限: ${ticket.expiryDate}</p>
            <button class="book-with-ticket-btn w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition" data-ticket-id="${ticket.id}">
                この回数券で予約する
            </button>
        </div>
    `).join('');
}

function renderHistoryList() {
    if (dummyBookingHistory.length === 0) {
        historyListContainer.innerHTML = `<p class="text-gray-500 text-center">予約履歴はありません。</p>`;
        return;
    }
    historyListContainer.innerHTML = dummyBookingHistory.map(history => {
        const statusBadge = history.status === '来店済み'
            ? '<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">来店済み</span>'
            : '<span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">キャンセル</span>';

        return `
        <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500">${history.date}</p>
                    <h4 class="font-bold text-lg my-1">${history.menuName}</h4>
                    <p class="text-sm text-gray-500">担当: ${history.staffName}</p>
                </div>
                <div class="text-right">
                    ${statusBadge}
                    <p class="font-bold text-gray-800 mt-2">¥${history.totalPrice}</p>
                </div>
            </div>
        </div>
    `;
    }).join('');
}


function renderOptions(menu) {
    const container = document.getElementById('options-list-container');
    if (!menu.options || menu.options.length === 0) {
        container.innerHTML = '<p class="text-gray-500">追加可能なオプションはありません。</p>';
        return;
    }
    container.innerHTML = menu.options.map(opt => `
        <label class="flex items-center bg-white p-4 rounded-lg border has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 transition">
            <input type="checkbox" name="options" value="${opt.id}" class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-4">
            <div class="flex-1">
                <span class="font-semibold">${opt.name}</span>
                <span class="text-sm text-gray-500 block">+ ¥${opt.price}</span>
            </div>
        </label>
    `).join('');
}

function renderStaff() {
    const container = document.getElementById('staff-list-container');
    container.innerHTML = dummyStaff.map(st => `
         <label class="flex items-center bg-white p-4 rounded-lg border has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 transition">
            <input type="radio" name="staff" value="${st.id}" class="h-5 w-5 text-purple-600 focus:ring-purple-500 mr-4">
            <div class="flex-1">
                <span class="font-semibold">${st.name}</span>
                 <span class="text-sm text-gray-500 block">${st.specialty}</span>
            </div>
        </label>
    `).join('');
}

function renderBookingCalendar() {
    const today = new Date();
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const calendarMonth = document.getElementById('calendar-month');
    
    calendarMonth.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月`;

    let calendarHtml = '<table class="border-collapse text-center whitespace-nowrap text-sm">';

    calendarHtml += '<thead><tr class="bg-gray-100">';
    calendarHtml += '<th class="p-1 border sticky top-0 left-0 z-20 bg-gray-100 w-16">時間</th>';
    for (let i = 0; i < 28; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const day = date.getDate();
        const dayOfWeek = dayNames[date.getDay()];
        const dayClass = dayOfWeek === '日' ? 'text-red-500' : (dayOfWeek === '土' ? 'text-blue-500' : '');
        calendarHtml += `<th class="p-1 border font-normal sticky top-0 z-10 bg-gray-100 ${dayClass}">
            <div>${day}</div>
            <div class="text-xs">(${dayOfWeek})</div>
        </th>`;
    }
    calendarHtml += '</tr></thead>';

    calendarHtml += '<tbody>';
    timeSlots.forEach((time, timeIndex) => {
        if (time.endsWith('00') || time.endsWith('30')) {
             calendarHtml += '<tr>';
             calendarHtml += `<td class="p-1 border font-semibold sticky-col bg-white">${time}</td>`;
             for (let dayIndex = 0; dayIndex < 28; dayIndex++) {
                const status = dummyAvailabilityGrid[dayIndex][timeIndex];
                let cellContent = '';
                let isClickable = false;

                switch (status) {
                    case '◎':
                        cellContent = '<span class="text-lg font-semibold text-blue-500 cursor-pointer">◎</span>';
                        isClickable = true;
                        break;
                    case 'TEL':
                        cellContent = '<span class="text-xs font-bold text-orange-400 cursor-pointer">TEL</span>';
                        isClickable = true;
                        break;
                    case '×':
                    default:
                        cellContent = '<span class="text-lg font-semibold text-gray-300">×</span>';
                        break;
                }
                 calendarHtml += `<td class="p-1 border align-middle ${isClickable ? 'hover:bg-purple-50' : ''}" data-day="${dayIndex}" data-time="${time}">${cellContent}</td>`;
            }
            calendarHtml += '</tr>';
        }
    });
    calendarHtml += '</tbody></table>';

    bookingCalendarContainer.innerHTML = calendarHtml;
}

function renderConfirmation() {
    const container = document.getElementById('confirmation-details');
    let optionsHtml = reservationState.options.length > 0
        ? reservationState.options.map(opt => `<li>${opt.name} (+ ¥${opt.price})</li>`).join('')
        : '<li>なし</li>';

    const paymentInfo = reservationState.ticket
        ? `<p><strong>お支払い:</strong> ${reservationState.ticket.name} を使用 (予約後残り ${reservationState.ticket.remaining - 1}回)</p>`
        : `<p><strong>お支払い:</strong> 当日店舗にて</p>`;

    container.innerHTML = `
        <div class="space-y-3">
            <p><strong>メニュー:</strong> ${reservationState.menu.name}</p>
            <div><strong>オプション:</strong><ul class="list-disc pl-5">${optionsHtml}</ul></div>
            <p><strong>担当者:</strong> ${reservationState.staff.name}</p>
            <p><strong>日時:</strong> ${reservationState.date} ${reservationState.time}</p>
            ${paymentInfo}
        </div>
        <div class="mt-6">
            <label for="booking-notes" class="block font-semibold mb-2">備考</label>
            <textarea id="booking-notes" rows="4" class="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="ご要望や気になる点があればご記入ください。"></textarea>
        </div>
    `;
}

// --- View & Flow Management ---
function showView(viewId) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    if (views[viewId]) {
        views[viewId].classList.remove('hidden');
    }

    Object.values(reservationButtons).forEach(btn => btn.classList.add('hidden'));
    if (reservationButtons[viewId]) {
        reservationButtons[viewId].classList.remove('hidden');
    }
}

function startReservationFlow(menuId) {
    const menu = dummySalonMenus.find(m => m.id === menuId);
    if (!menu) return;

    reservationState.menu = menu;
    
    mainContentContainer.classList.add('hidden');
    bottomNav.classList.add('hidden');
    mainHeader.classList.add('hidden');
    
    reservationFlowContainer.classList.remove('hidden');
    reservationHeader.classList.remove('hidden');
    reservationFooter.classList.remove('hidden');
    
    reservationStepTitle.textContent = "オプション選択";
    renderOptions(reservationState.menu);
    showView('options');
}

function startReservationFlowFromTicket(ticketId) {
    const ticket = dummyOwnedTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const menu = dummySalonMenus.find(m => m.id === ticket.menuId);
    if (!menu) {
        alert('この回数券に対応するメニューが見つかりません。');
        return;
    }

    reservationState.ticket = ticket;
    reservationState.menu = menu;

    mainContentContainer.classList.add('hidden');
    bottomNav.classList.add('hidden');
    mainHeader.classList.add('hidden');
    
    reservationFlowContainer.classList.remove('hidden');
    reservationHeader.classList.remove('hidden');
    reservationFooter.classList.remove('hidden');
    
    reservationStepTitle.textContent = "オプション選択";
    renderOptions(reservationState.menu);
    showView('options');
}

function endReservationFlow() {
    reservationFlowContainer.classList.add('hidden');
    reservationHeader.classList.add('hidden');
    reservationFooter.classList.add('hidden');
    
    mainContentContainer.classList.remove('hidden');
    bottomNav.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
    
    reservationState = { menu: null, options: [], staff: null, date: null, time: null, notes: '', ticket: null };
    switchTab('salon-info');
}

// --- Tab Switching Logic ---
function switchTab(targetTab) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    if (views[targetTab]) views[targetTab].classList.remove('hidden');

    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === targetTab);
        btn.classList.toggle('text-purple-600', btn.dataset.tab === targetTab);
        btn.classList.toggle('text-gray-500', btn.dataset.tab !== targetTab);
    });
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial Renders
    renderSalonInfo();
    renderMenuList();
    renderTicketList();
    renderHistoryList();
    renderCouponList();
    renderBookingCalendar(); 
    switchTab('salon-info');
    lucide.createIcons();
    
    // Main Tab Navigation
    bottomNav.addEventListener('click', (e) => {
        const navBtn = e.target.closest('.nav-btn');
        if (navBtn) switchTab(navBtn.dataset.tab);
    });

    // --- Reservation Flow ---
    // 1a. Start Flow (Menu Click)
    menuListContainer.addEventListener('click', (e) => {
        const menuCard = e.target.closest('.menu-card');
        if (menuCard) startReservationFlow(menuCard.dataset.menuId);
    });

    // 1b. Start Flow (Ticket Click)
    ticketListContainer.addEventListener('click', (e) => {
        const ticketBtn = e.target.closest('.book-with-ticket-btn');
        if (ticketBtn) startReservationFlowFromTicket(ticketBtn.dataset.ticketId);
    });
    
    // 2. Options -> Staff
    reservationButtons.options.addEventListener('click', () => {
        const selectedOptions = [...document.querySelectorAll('input[name="options"]:checked')].map(input => {
            return reservationState.menu.options.find(opt => opt.id === input.value);
        });
        reservationState.options = selectedOptions;
        reservationStepTitle.textContent = "担当者選択";
        renderStaff();
        showView('staff');
    });

    // 3. Staff -> DateTime
    reservationButtons.staff.addEventListener('click', () => {
        const selectedStaffId = document.querySelector('input[name="staff"]:checked')?.value;
        if (!selectedStaffId) { alert("担当者を選択してください。"); return; }
        reservationState.staff = dummyStaff.find(s => s.id === selectedStaffId);
        reservationStepTitle.textContent = "日時選択";
        showView('datetime');
    });

    // 4. DateTime -> Confirmation
    reservationButtons.datetime.addEventListener('click', () => {
        if (!reservationState.date || !reservationState.time) {
            alert('日時を選択してください。');
            return;
        }
        reservationStepTitle.textContent = "予約内容の確認";
        renderConfirmation();
        showView('confirmation');
    });
    
    // 5. Submit
    reservationButtons.confirmation.addEventListener('click', () => {
        const notes = document.getElementById('booking-notes').value;
        reservationState.notes = notes;
        console.log('予約内容:', reservationState); 
        
        reservationHeader.classList.add('hidden');
        reservationFooter.classList.add('hidden');
        showView('booking-complete');
    });

    // 6. Close Complete View
    document.getElementById('close-booking-complete-btn').addEventListener('click', endReservationFlow);

    // Close/Cancel Reservation Flow
    document.getElementById('back-to-main-view-btn').addEventListener('click', endReservationFlow);

    // Calendar Cell Click
    bookingCalendarContainer.addEventListener('click', (e) => {
        const cell = e.target.closest('td');
        if (cell && (cell.textContent.includes('◎') || cell.textContent.includes('TEL'))) {
            const selected = bookingCalendarContainer.querySelector('.bg-purple-200');
            if (selected) selected.classList.remove('bg-purple-200');
            
            cell.classList.add('bg-purple-200');

            const dayIndex = parseInt(cell.dataset.day);
            const time = cell.dataset.time;
            const selectedDate = new Date();
            selectedDate.setDate(selectedDate.getDate() + dayIndex);
            
            const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
            reservationState.date = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日(${dayNames[selectedDate.getDay()]})`;
            reservationState.time = time;
        }
    });

    // Calendar navigation
    const prevWeekBtn = calendarNav.querySelector('button:first-child');
    const nextWeekBtn = calendarNav.querySelector('button:last-child');
    prevWeekBtn.addEventListener('click', () => {
        const scrollAmount = 7 * 49; 
        bookingCalendarWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextWeekBtn.addEventListener('click', () => {
        const scrollAmount = 7 * 49;
        bookingCalendarWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});

