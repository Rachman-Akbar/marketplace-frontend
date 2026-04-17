import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY5kse5sDeMCIU0UXVheWKUHhpSFBGGCw",
  authDomain: "marketplace-village.firebaseapp.com",
  databaseURL: "https://marketplace-village-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marketplace-village",
storageBucket: "marketplace-village.appspot.com",
  messagingSenderId: "698326217840",
  appId: "1:698326217840:web:e3bb3a1a6eb4da25f8b0b5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);