// ============================================
// FIREBASE CONFIG — YAHAN APNI KEYS DAALO
// ============================================
// 1. https://console.firebase.google.com par jao
// 2. "Add Project" -> naam do "NotesBazaarNepal"
// 3. Build > Authentication > Get Started > Email/Password ON karo
// 4. Build > Firestore Database > Create Database (test mode se shuru karo)
// 5. Build > Storage > Get Started (notes files store karne ke liye)
// 6. Project Settings (gear icon) > scroll down > "Your apps" > Web app (</>) add karo
// 7. Wahan se config copy karke NEECHE paste karo
// ============================================

export const firebaseConfig = {
  apiKey: "AIzaSyAZFfS82n9oLgbfBXVTfaClTfPsF7xyJTI",
  authDomain: "notehub-nepal.firebaseapp.com",
  projectId: "notehub-nepal",
  storageBucket: "notehub-nepal.firebasestorage.app",
  messagingSenderId: "1063046094965",
  appId: "1:1063046094965:web:17d4abf35af09827f3183c"
};

// ============================================
// AI HELPER (Gemini) — FREE API KEY
// ============================================
// 1. https://aistudio.google.com/app/apikey par jao (Google account se login)
// 2. "Create API Key" click karo — bilkul FREE hai student ke liye
// 3. Copy karke neeche paste karo
// ============================================
export const GEMINI_API_KEY = "AQ.Ab8RN6Jqv9W0RjNhC4rP5EoyWfD6B1jAETLaZBCP79iyif6QFQ";

// ============================================
// FILE STORAGE (Cloudinary) — FREE, CARD NAHI CHAHIYE
// ============================================
// 1. https://cloudinary.com/users/register/free par free account banao
// 2. Dashboard khulega, wahan upar "Cloud name" dikhega — copy karo
// 3. Settings (gear icon) → Upload tab → "Upload presets" → "Add upload preset"
//    → Signing Mode ko "Unsigned" karo → Save → jo naam dikhe wo copy karo
// 4. Dono neeche paste karo
// ============================================
export const CLOUDINARY_CLOUD_NAME = "aficxcqc";
export const CLOUDINARY_UPLOAD_PRESET = "notehub_notes";
