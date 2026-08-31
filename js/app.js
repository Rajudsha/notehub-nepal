// ============================================
// SHARED APP LOGIC — Firebase init + Auth
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs,
  query, where, orderBy, updateDoc, increment, serverTimestamp, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
  signOut, updateProfile, collection, addDoc, doc, setDoc, getDoc, getDocs,
  query, where, orderBy, updateDoc, increment, serverTimestamp, arrayUnion
};

// ---- Signup: also create a user profile doc ----
export async function signup(name, email, password, grade) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    name, email, grade, earnings: 0, notesUploaded: 0, testsAttempted: 0,
    createdAt: serverTimestamp()
  });
  return cred.user;
}

// ---- Nav bar injector: keeps every page's header consistent ----
export function renderNav(activePage) {
  const links = [
    { id: "notes", label: "📚 Notes", href: "notes.html" },
    { id: "sell", label: "💸 Bechो", href: "sell.html" },
    { id: "quiz", label: "📝 Weekly Test", href: "quiz.html" },
    { id: "ai", label: "🤖 AI Help", href: "ai-help.html" },
    { id: "profile", label: "👤 Profile", href: "profile.html" },
  ];
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  nav.innerHTML = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a>`
  ).join("");
}

// ---- Auth guard: redirect to login if not signed in ----
export function requireAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      callback(user);
    }
  });
}
