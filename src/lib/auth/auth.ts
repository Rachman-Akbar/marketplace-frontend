// src/lib/auth.ts

import { sendPasswordResetEmail } from "firebase/auth";
import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import type { AuthResponse, AuthSession } from "@/lib/auth/auth-session";

export type { AuthUser, AuthResponse, AuthSession } from "@/lib/auth/auth-session";

export {
  AUTH_STORAGE_KEY,
  AUTH_SESSION_CHANGED_EVENT,
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
} from "@/lib/auth/auth-session";

/* =====================================================
   REGISTER
===================================================== */

export async function loginWithFirebaseAction({
  idToken,
}: {
  idToken: string;
}): Promise<AuthResponse> {
  const token = idToken?.trim();

  if (!token) {
    throw new Error("Firebase ID token kosong.");
  }

  const response = await api.post<AuthResponse>(
    "/identity/auth/firebase-login",
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return response.data;
}

/* =====================================================
   VERIFY SESSION
===================================================== */

export async function verifyAuthSession(
  session: AuthSession,
): Promise<boolean> {
  try {
    await api.get("/identity/auth/me", {
      headers: {
        Authorization: `Bearer ${session.api_token}`,
      },
    });

    return true;
  } catch {
    return false;
  }
}

export async function getVerifiedAuthSession(): Promise<AuthSession | null> {
  const { getAuthSession, clearAuthSession } = await import("@/lib/auth/auth-session");

  const session = getAuthSession();

  if (!session) {
    return null;
  }

  const valid = await verifyAuthSession(session);

  if (!valid) {
    clearAuthSession();
    return null;
  }

  return session;
}

/* =====================================================
   PASSWORD RESET
===================================================== */

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email wajib diisi.");
  }

  await sendPasswordResetEmail(auth, normalizedEmail);
}