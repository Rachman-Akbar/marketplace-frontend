import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { clearAuthSession } from "@/lib/auth";

export async function logout() {
  try {
    // 1️⃣ logout Firebase
    await signOut(auth);

    // 2️⃣ hapus session Laravel
    clearAuthSession();

    // 3️⃣ redirect manual
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
}