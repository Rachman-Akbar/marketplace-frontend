import { signOut } from "firebase/auth";

import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import { clearAuthSession, getAuthSession } from "./session";

export async function logout(): Promise<void> {
  const session = getAuthSession();

  try {
    if (session?.api_token) {
      await api.post(
        "/identity/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${session.api_token}`,
          },
        },
      );
    }
  } catch (error) {
    console.warn("Laravel logout failed, continuing local logout:", error);
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.warn("Firebase sign out failed, continuing local cleanup:", error);
  }

  clearAuthSession();

  delete api.defaults.headers.common.Authorization;

  window.location.href = "/login";
}