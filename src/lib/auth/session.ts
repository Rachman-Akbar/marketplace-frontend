import {
  API_TOKEN_COOKIE,
  AUTH_SESSION_CHANGED_EVENT,
  AUTH_STORAGE_KEY,
  COOKIE_MAX_AGE,
} from "./constants";

import type { AuthResponse, AuthSession } from "./types";

function dispatchAuthSessionChanged(): void {
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

function setApiTokenCookie(token: string): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${API_TOKEN_COOKIE}=${encodeURIComponent(
    token,
  )}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function clearApiTokenCookie(): void {
  document.cookie = `${API_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function saveAuthSession(session: AuthResponse): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setApiTokenCookie(session.api_token);
  dispatchAuthSessionChanged();
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;

    if (!parsed.api_token || !parsed.user?.id) {
      clearAuthSession();
      return null;
    }

    return parsed as AuthSession;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearApiTokenCookie();
  dispatchAuthSessionChanged();
}