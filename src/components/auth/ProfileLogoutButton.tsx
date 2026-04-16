"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession, getAuthSession, logoutWithToken } from "@/lib/auth";

export function ProfileLogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    const session = getAuthSession();
    setIsLoggingOut(true);

    try {
      if (session?.api_token) {
        await logoutWithToken(session.api_token);
      }
    } catch {
      // Clear local session even when API logout fails.
    } finally {
      clearAuthSession();
      setIsLoggingOut(false);
      router.push("/login");
      router.refresh();
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
