# 📒 NotesBazaar Nepal — Setup Guide

Nepal ke students ke liye handwritten notes marketplace. Grade 8-12, free-first notes, weekly tests, AI helper, aur GitHub Pages pe **100% free hosting**.

## Kya kya real kaam karta hai
- ✅ Real signup/login (Firebase Auth)
- ✅ Notes upload/download (real file storage)
- ✅ Free notes sabse pehle dikhte hain
- ✅ Weekly test + score history (real database)
- ✅ Profile with earnings tracking
- ✅ AI doubt-solving chat (Gemini free API)
- ⚠️ Paid notes: eSewa payment link khulta hai, lekin verification abhi manual hai (neeche "Payment ke baare mein" section padho)

---

## STEP 1 — Firebase Project Banao (5 min, free)

1. https://console.firebase.google.com par jao, Google account se login karo
2. "Add Project" → naam do `notesbazaar-nepal` → continue
3. Left menu se **Build → Authentication** → "Get Started" → **Email/Password** ko enable karo
4. **Databases and storage → Firestore Database** → "Create Database" → **Locked mode** mein start karo (location: asia-south1/Mumbai rakho, Nepal ke paas hai)
5. ⚠️ **Firebase Storage skip karo** — Google ne isse ab paid (Blaze) plan ke peeche daal diya hai. Hum iske bajaye **Cloudinary** (bilkul free, card nahi chahiye) use kar rahe hain — Step 1B dekho neeche.
6. Gear icon (⚙️) → **Project Settings** → neeche scroll karo → "Your apps" → `</>` (web) icon click karo
7. App ka naam do, "Register app" karo
8. Jo `firebaseConfig = {...}` code dikhega, use copy karo

Ab `js/firebase-config.js` file kholo aur apna config paste karo (jahan `YOUR_API_KEY` likha hai wahan).

### Firestore Security Rules (zaroori — copy-paste karo)
Firestore → Rules tab mein ye paste karo:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /notes/{noteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    match /results/{resultId} {
      allow read, create: if request.auth != null;
    }
  }
}
```

---

## STEP 1B — Cloudinary Setup (File Storage, free, card nahi chahiye)

1. https://cloudinary.com/users/register/free par free account banao
2. Login karne ke baad dashboard mein upar **"Cloud name"** dikhega — copy karo
3. Gear icon (Settings) → **Upload** tab → **"Upload presets"** → **"Add upload preset"**
4. **Signing Mode** ko **"Unsigned"** kar do (zaroori hai, warna upload fail hoga) → Save
5. Jo preset name dikhe (jaise `abcd1234`) use copy kar lo
6. `js/firebase-config.js` mein `CLOUDINARY_CLOUD_NAME` aur `CLOUDINARY_UPLOAD_PRESET` mein paste karo

Free tier mein 25 credits/month milte hain (roughly 25GB uploads/views) — chhote scale ke liye kaafi hai.

---

## STEP 2 — Free AI Helper (Gemini) Setup (2 min, free)

1. https://aistudio.google.com/app/apikey par jao
2. "Create API Key" click karo (Google account se, bilkul free)
3. `js/firebase-config.js` mein `GEMINI_API_KEY` wali line mein paste karo

**Security note:** Ye key browser mein visible rehti hai. Isko safe rakhne ke liye Google AI Studio mein key ko apni GitHub Pages domain tak restrict kar dena (API key settings → restrictions).

---

## STEP 3 — GitHub Pe Daalo (Free Hosting)

1. https://github.com par account banao (agar nahi hai)
2. Naya repository banao — naam `notesbazaar-nepal`, **Public** rakho
3. Is poore folder (`notesbazaar-nepal`) ko GitHub pe upload karo:
   ```
   cd notesbazaar-nepal
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/TUMHARA-USERNAME/notesbazaar-nepal.git
   git push -u origin main
   ```
4. GitHub repo ke **Settings → Pages** mein jao
5. Source: "Deploy from branch" → Branch: `main` → folder `/ (root)` → Save
6. 2 minute baad tumhari site live hogi: `https://TUMHARA-USERNAME.github.io/notesbazaar-nepal/`

**Cost: ₹0.** GitHub Pages hamesha free hai, Firebase ka free tier (Spark plan) students ke liye kaafi hai (50k reads/day free).

---

## STEP 4 — Ads Lagana (Google AdSense)

1. https://www.google.com/adsense se apply karo apni live GitHub Pages URL ke saath
2. Approval milne mein 1-4 weeks lagte hain (naye site ke liye)
3. Approval ke baad, har `.ad-slot` div ke andar comment kiya hua `<ins class="adsbygoogle">` code uncomment karo aur apna `data-ad-client` ID daalo
4. `<head>` mein AdSense ka script tag bhi add karna hoga (AdSense dashboard se milega)

**Tab tak:** ad-slot placeholders already har page pe hain, bas real ad code baad mein daalna hai.

---

## Payment ke baare mein (eSewa/Khalti) — zaroori samjho

Nepal mein real payment lene ke liye **eSewa** ya **Khalti** merchant account chahiye:
- eSewa Merchant: https://esewa.com.np/#/merchant
- Khalti Merchant: https://khalti.com/join/merchant/

Abhi is site mein `notes.html` ke andar eSewa ka payment link khulta hai, lekin **payment verify automatically nahi hoti** — kyunki uske liye ek backend server chahiye hota hai (Firebase Cloud Functions se ho sakta hai, lekin uske liye Firebase ka Blaze/paid plan activate karna padta hai, jisme bhi free tier included hai but card verification chahiye).

**Abhi ke liye:** Student "maine pay kar diya" confirm karta hai tab note unlock hota hai (trust-based, chhote scale ke liye theek hai). Jab users badh jayein aur real business banana ho, tab Cloud Functions se real payment verification add karna — us waqt bata dena, main help kar dunga.

---

## Grade/Subject/Test Questions Add Karna

`pages/quiz.html` file mein `QUESTION_BANK` object hai — wahan jitne chaho utne questions add kar sakte ho, same format follow karke.

---

## File Structure
```
notesbazaar-nepal/
├── index.html          ← Login/Signup page
├── success.html        ← eSewa payment success redirect
├── failure.html        ← eSewa payment failure redirect
├── css/style.css        ← Sab pages ka common design
├── js/
│   ├── firebase-config.js  ← APNI KEYS YAHAN DAALO (Firebase + Gemini + Cloudinary)
│   └── app.js               ← Shared Firebase logic
└── pages/
    ├── notes.html       ← Browse & buy/download notes
    ├── sell.html         ← Upload notes
    ├── quiz.html         ← Weekly test
    ├── profile.html      ← Profile + score history
    └── ai-help.html      ← AI doubt chat
```

## Agla Step
Isko apne college/school ke WhatsApp groups mein share karo, 10-15 friends ko free notes daalne ke liye bolo — traction wahi se shuru hoti hai.
