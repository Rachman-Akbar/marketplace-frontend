// src/lib/firebase.ts

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyBY5kse5sDeMCIU0UXVheWKUHhpSFBGGCw",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "marketplace-village.firebaseapp.com",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
    "https://marketplace-village-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
    "marketplace-village",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "marketplace-village.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
    "698326217840",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:698326217840:web:e3bb3a1a6eb4da25f8b0b5",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();