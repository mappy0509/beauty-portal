// Firebase SDKのインポート
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

// ========================================================================


// --- Firebaseの初期化 ---
const app = window.firebaseApp;
const auth = getAuth(app);
const db = getFirestore(app);
setLogLevel('debug');
console.log("Firebase Initialized Successfully from app.js");


// --- DOM Elements ---
const authLinks = document.getElementById('auth-links');
const landingPageView = document.getElementById('landing-page-view');
const salonSetupView = document.getElementById('salon-setup-view');

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

// --- Modal Control ---
function openModal(modal) {
    modal.classList.remove('hidden');
    // ... (以下、変更なし)
}

function closeModal(modal) {
    modal.classList.add('hidden');
    // ... (以下、変更なし)
}

// --- View Management ---
const showSalonSetupView = (user) => {
    landingPageView.classList.add('hidden');
    salonSetupView.classList.remove('hidden');
    authLinks.innerHTML = `
        <span class="text-gray-600">${user.email}</span>
        <button id="logout-button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">ログアウト</button>
    `;
    document.getElementById('logout-button').addEventListener('click', () => {
        signOut(auth);
    });
};

const updateUIForLoggedOutUser = () => {
    landingPageView.classList.remove('hidden');
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

// --- Firebaseの認証状態監視 ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const salonDocRef = doc(db, "salons", user.uid);
        const salonDocSnap = await getDoc(salonDocRef);

        if (salonDocSnap.exists()) {
            // ★★★★★変更点 1★★★★★
            // サロン情報があれば、即座にadmin.htmlに遷移
            window.location.href = 'admin.html';
        } else {
            // サロン情報がなければ、設定画面を表示
            showSalonSetupView(user);
        }
    } else {
        updateUIForLoggedOutUser();
    }
});


// --- 開発用の画面初期化処理など (変更なし) ---
// ... (中略) ...


// Signup Form Submission
if(document.getElementById('signup-form')) {
    // ... (変更なし)
}

// Login Form Submission
if(document.getElementById('login-form')) {
    // ... (変更なし)
}

// Salon Setup Form Submission
if(document.getElementById('salon-setup-form')) {
    document.getElementById('salon-setup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const salonName = document.getElementById('salon-name').value;
        const salonAddress = document.getElementById('salon-address').value;
        const user = auth.currentUser;

        if (user) {
            try {
                const salonData = {
                    name: salonName,
                    address: salonAddress,
                    ownerId: user.uid,
                    createdAt: serverTimestamp()
                };
                
                const salonDocRef = doc(db, "salons", user.uid);
                await setDoc(salonDocRef, salonData);
                console.log("Salon data saved successfully!");

                // ★★★★★変更点 2★★★★★
                // データ保存後、admin.htmlに遷移
                window.location.href = 'admin.html';

            } catch (error) {
                console.error("Error saving salon data: ", error);
                alert("サロン情報の保存に失敗しました。");
            }
        }
    });
}