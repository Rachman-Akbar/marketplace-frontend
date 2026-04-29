import { sendPasswordResetEmail } from "firebase/auth";

import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import { clearAuthSession, getAuthSession } from "./session";

import type { AuthResponse, AuthSession } from "./types";

type RegisterWithPasswordPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type RegisterWithFirebasePayload = {
  idToken: string;
  name?: string;
};

export async function loginWithFirebaseAction({
  idToken,
}: {
  idToken: string;
}): Promise<AuthResponse> {
  const token = idToken.trim();

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

export async function registerWithFirebase({
  idToken,
  name,
}: RegisterWithFirebasePayload): Promise<AuthResponse> {
  const token = idToken.trim();

  if (!token) {
    throw new Error("Firebase ID token kosong.");
  }

  const response = await api.post<AuthResponse>(
    "/identity/auth/firebase-register",
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return response.data;
}

export async function registerWithPassword({
  name,
  email,
  password,
  passwordConfirmation,
}: RegisterWithPasswordPayload): Promise<AuthResponse> {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName) {
    throw new Error("Nama wajib diisi.");
  }

  if (!normalizedEmail) {
    throw new Error("Email wajib diisi.");
  }

  if (!password) {
    throw new Error("Password wajib diisi.");
  }

  if (password !== passwordConfirmation) {
    throw new Error("Konfirmasi password tidak sama.");
  }

  const response = await api.post<AuthResponse>("/identity/auth/register", {
    name: normalizedName,
    email: normalizedEmail,
    password,
    password_confirmation: passwordConfirmation,
  });

  return response.data;
}

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

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email wajib diisi.");
  }

  await sendPasswordResetEmail(auth, normalizedEmail);
}