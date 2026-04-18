// lib/auth.ts

export type AuthUser = {
  id: string;
  firebase_uid: string | null;
  email: string;
  name: string | null;
  avatar: string | null;
  is_email_verified: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  roles: string[];
  active_role: string;
  api_token: string;
};

export type AuthSession = AuthResponse;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DEFAULT_BASE_URLS = [
  "http://localhost/UKOMP/market-api/public/api",
  "http://127.0.0.1/UKOMP/market-api/public/api",
  "http://localhost:8000/api",
  "http://127.0.0.1:8000/api",
];

const AUTH_STORAGE_KEY = "ukomp.auth.session";
export const AUTH_SESSION_CHANGED_EVENT = "ukomp:auth-session-changed";

/* =====================================================
   BASE URL
===================================================== */

function getBaseUrls(): string[] {
  return BASE_URL ? [BASE_URL] : DEFAULT_BASE_URLS;
}

function buildEndpoint(baseUrl: string, endpoint: string) {
  const safeEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${baseUrl.replace(/\/$/, "")}${safeEndpoint}`;
}

/* =====================================================
   AUTH REQUEST CORE
===================================================== */

export async function authRequest<T>(
  endpoint: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {

  const baseUrls = getBaseUrls();
  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const headers = new Headers(init.headers ?? {});
      headers.set("Accept", "application/json");

      if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      if (init.token) {
        headers.set("Authorization", `Bearer ${init.token}`);
      }

      const response = await fetch(
        buildEndpoint(baseUrl, endpoint),
        {
          ...init,
          headers,
        }
      );

      let payload: any = {};

      // ✅ FIX IMPORTANT (204 logout bug)
      if (response.status !== 204) {
        payload = await response.json().catch(() => ({}));
      }

      if (response.ok) {
        return payload as T;
      }

      lastError =
        typeof payload?.message === "string"
          ? new Error(payload.message)
          : new Error(`Request failed (${response.status})`);

    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Auth request failed");
}

/* =====================================================
   REGISTER
===================================================== */

export async function registerWithPassword(input: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<AuthResponse> {
  return authRequest<AuthResponse>(
    "/v1/identity/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password,
        password_confirmation: input.passwordConfirmation,
      }),
    }
  );
}

/* =====================================================
   SESSION STORAGE
===================================================== */

export function saveAuthSession(session: AuthResponse) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session)
  );

  window.dispatchEvent(
    new Event(AUTH_SESSION_CHANGED_EVENT)
  );
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    if (!parsed?.api_token || !parsed?.user?.id) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem("auth_session");
}

/* =====================================================
   VERIFY SESSION
===================================================== */

export async function verifyAuthSession(
  session: AuthSession
): Promise<boolean> {
  try {
    await authRequest("/v1/identity/auth/me", {
      method: "GET",
      token: session.api_token,
    });

    return true;
  } catch {
    return false;
  }
}

export async function getVerifiedAuthSession() {
  const session = getAuthSession();
  if (!session) return null;

  const valid = await verifyAuthSession(session);

  if (!valid) {
    clearAuthSession();
    return null;
  }

  return session;
}

/* =====================================================
   LOGOUT
===================================================== */

export async function logoutWithToken(token: string) {
  await authRequest(
    "/v1/identity/auth/logout",
    {
      method: "POST",
      token,
    }
  );
}

/* =====================================================
   GLOBAL LOGOUT (SAFE)
===================================================== */

import { api } from "./axios";

export async function logout() {
  try {
    await api.post("/v1/identity/auth/logout");
  } catch (e) {
    console.log("Logout API error ignored");
  }

  /**
   * CLEAR SESSION
   */
  localStorage.removeItem("ukomp.auth.session");

  /**
   * VERY IMPORTANT
   * reset axios header
   */
  delete api.defaults.headers.common["Authorization"];

  /**
   * notify app
   */
  window.dispatchEvent(
    new Event("ukomp:auth-session-changed")
  );
}

/* =====================================================
   FIREBASE LOGIN
===================================================== */

export async function loginWithFirebaseAction({
  idToken,
}: {
  idToken: string;
}) {
  return authRequest<AuthResponse>(
    "/v1/identity/auth/firebase-login",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
}

