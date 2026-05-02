import { sendPasswordResetEmail } from "firebase/auth";

import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import { clearAuthSession, getAuthSession, saveAuthSession } from "./session";

import type { AuthResponse, AuthSession, AuthUser } from "../types";

type RegisterWithFirebasePayload = {
  idToken: string;
  name?: string;
};

type MeResponse = {
  user: AuthUser;
  roles?: string[];
  active_role?: string;
};

function normalizeAuthResponse(response: AuthResponse): AuthSession {
  return {
    user: response.user,
    roles: response.roles ?? [],
    active_role: response.active_role ?? "",
    api_token: response.api_token,
  };
}

function normalizeSessionFromMe(
  response: MeResponse,
  apiToken: string,
): AuthSession {
  return {
    user: response.user,
    roles: response.roles ?? [],
    active_role: response.active_role ?? "",
    api_token: apiToken,
  };
}

export async function loginWithFirebaseAction({
  idToken,
}: {
  idToken: string;
}): Promise<AuthSession> {
  const token = idToken.trim();

  if (!token) {
    throw new Error("Firebase ID token kosong.");
  }

  const response = await api.post<AuthResponse>(
    "/identity/auth/firebase-login",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return normalizeAuthResponse(response.data);
}

export async function registerWithFirebase({
  idToken,
  name,
}: RegisterWithFirebasePayload): Promise<AuthSession> {
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

  return normalizeAuthResponse(response.data);
}

export async function verifyAuthSession(
  session: AuthSession,
): Promise<AuthSession | null> {
  if (!session.api_token) {
    return null;
  }

  try {
    const response = await api.get<MeResponse>("/identity/auth/me", {
      headers: {
        Authorization: `Bearer ${session.api_token}`,
      },
    });

    return normalizeSessionFromMe(response.data, session.api_token);
  } catch {
    return null;
  }
}

export async function getVerifiedAuthSession(): Promise<AuthSession | null> {
  const session = getAuthSession();

  if (!session) {
    return null;
  }

  const verifiedSession = await verifyAuthSession(session);

  if (!verifiedSession) {
    clearAuthSession();
    return null;
  }

  saveAuthSession(verifiedSession);

  return verifiedSession;
}

export async function logoutFromBackend(): Promise<void> {
  try {
    await api.post("/identity/auth/logout");
  } finally {
    clearAuthSession();
  }
}

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email wajib diisi.");
  }

  await sendPasswordResetEmail(auth, normalizedEmail);
}