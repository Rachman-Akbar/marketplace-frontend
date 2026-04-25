// src/lib/auth.ts

import { sendPasswordResetEmail } from "firebase/auth";
import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import type { AuthResponse, AuthSession } from "@/lib/auth-session";

export type { AuthUser, AuthResponse, AuthSession } from "@/lib/auth-session";

export {
  AUTH_STORAGE_KEY,
  AUTH_SESSION_CHANGED_EVENT,
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
} from "@/lib/auth-session";

/* =====================================================
   REGISTER
===================================================== */

export async function registerWithPassword(input: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/identity/auth/register", {
    name: input.name,
    email: input.email,
    password: input.password,
    password_confirmation: input.passwordConfirmation,
  });

  return response.data;
}

/* =====================================================
   FIREBASE LOGIN
===================================================== */

export async function loginWithFirebaseAction({
  idToken,
}: {
  idToken: string;
}): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/identity/auth/firebase-login",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
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
  const { getAuthSession, clearAuthSession } = await import("@/lib/auth-session");

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