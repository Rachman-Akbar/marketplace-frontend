// src/lib/auth-session.ts

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

export const AUTH_STORAGE_KEY = "ukomp.auth.session";
export const AUTH_SESSION_CHANGED_EVENT = "ukomp:auth-session-changed";

const API_TOKEN_COOKIE = "api_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function setApiTokenCookie(token: string): void {
  document.cookie = `${API_TOKEN_COOKIE}=${encodeURIComponent(
    token,
  )}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearApiTokenCookie(): void {
  document.cookie = `${API_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function saveAuthSession(session: AuthResponse): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setApiTokenCookie(session.api_token);
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;

    if (!parsed?.api_token || !parsed?.user?.id) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      clearApiTokenCookie();
      return null;
    }

    return parsed as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    clearApiTokenCookie();
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearApiTokenCookie();
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}