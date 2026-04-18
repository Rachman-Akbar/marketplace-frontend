"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  clearAuthSession,
  getAuthSession,
  logoutWithToken,
} from "@/lib/auth";

export function ProfileLogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      const session = getAuthSession();

      // ✅ logout Laravel API
      if (session?.api_token) {
        await logoutWithToken(session.api_token);
      }

      // ✅ logout Firebase (INI YANG HILANG)
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // ✅ hapus local session
      clearAuthSession();

      // ✅ HARD RESET APP
      window.location.href = "/login";
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}