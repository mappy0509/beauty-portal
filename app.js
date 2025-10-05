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
    serverTimestamp,
    setLogLevel
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
    if (!modal) return;
    modal.classList.remove('hidden');
}
function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
}

// --- View Management ---
const showSalonSetupView = (user) => {
    landingPageView.classList.add('hidden');
    salonSetupView.classList.remove('hidden');
    authLinks.innerHTML = `
        <span class="text-gray-600">${user.email}</span>
        <button id="logout-button" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">ログアウト</button>
    `;
    document.getElementById('logout-button').addEventListener('click', () => signOut(auth));
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
    document.getElementById('login-button')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('signup-button')?.addEventListener('click', () => openModal(signupModal));
};

// --- Firebaseの認証状態監視 (★デバッグログを追加) ---
onAuthStateChanged(auth, async (user) => {
    console.log("onAuthStateChanged triggered.");
    if (user) {
        console.log("  -> User is logged in. UID:", user.uid);
        try {
            console.log("  -> Checking for salon document in Firestore...");
            const salonDocRef = doc(db, "salons", user.uid);
            const salonDocSnap = await getDoc(salonDocRef);

            if (salonDocSnap.exists()) {
                console.log("  -> Salon document FOUND. Redirecting to admin.html...");
                window.location.href = 'admin.html';
            } else {
                console.log("  -> Salon document NOT FOUND. Showing salon setup view.");
                showSalonSetupView(user);
            }
        } catch (error) {
            console.error("  -> ERROR checking Firestore:", error);
            alert("データベースの確認中にエラーが発生しました。");
        }
    } else {
        console.log("  -> User is logged out. Showing logged-out view.");
        updateUIForLoggedOutUser();
    }
});

// --- Event Listeners ---
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorP = document.getElementById('login-error');
    errorP.textContent = '';
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful. Waiting for onAuthStateChanged to handle redirect...");
        closeModal(loginModal);
    } catch (error) {
        console.error("Login error:", error);
        errorP.textContent = 'メールアドレスまたはパスワードが違います。';
    }
});

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorP = document.getElementById('signup-error');
    errorP.textContent = '';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: serverTimestamp(),
            role: 'salon'
        });
        console.log("Signup successful. Waiting for onAuthStateChanged to handle UI change...");
        closeModal(signupModal);
    } catch (error) {
        console.error("Signup error:", error);
        errorP.textContent = '登録に失敗しました: ' + error.message;
    }
});

document.getElementById('salon-setup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const salonName = document.getElementById('salon-name').value;
    const salonAddress = document.getElementById('salon-address').value;
    const user = auth.currentUser;

    if (user) {
        try {
            const salonDocRef = doc(db, "salons", user.uid);
            await setDoc(salonDocRef, {
                name: salonName,
                address: salonAddress,
                ownerId: user.uid,
                createdAt: serverTimestamp()
            });
            console.log("Salon data saved. Redirecting to admin.html...");
            window.location.href = 'admin.html';
        } catch (error) {
            console.error("Error saving salon data: ", error);
            alert("サロン情報の保存に失敗しました。");
        }
    }
});

document.getElementById('close-login-modal')?.addEventListener('click', () => closeModal(loginModal));
document.getElementById('close-signup-modal')?.addEventListener('click', () => closeModal(signupModal));
loginModal?.addEventListener('click', (e) => { if (e.target === loginModal) closeModal(loginModal); });
signupModal?.addEventListener('click', (e) => { if (e.target === signupModal) closeModal(signupModal); });

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});