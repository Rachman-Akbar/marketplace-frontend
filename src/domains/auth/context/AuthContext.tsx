"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { logApiError } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import type { AuthSession } from "@/domains/auth";

import {
  AUTH_SESSION_CHANGED_EVENT,
  clearAuthSession,
  getAuthSession,
  getVerifiedAuthSession,
  syncFirebaseUserToBackend,
} from "@/domains/auth";

interface AuthContextType {
  firebaseUser: User | null;
  backendSession: AuthSession | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendSession, setBackendSession] = useState<AuthSession | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);

    try {
      const verifiedSession = await getVerifiedAuthSession();
      setBackendSession(verifiedSession);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function syncWithFirebaseUser(user: User) {
      const existingSession = getAuthSession();

      if (existingSession && isMounted) {
        setBackendSession(existingSession);
      }

      /**
       * Kalau local session ada, verify dulu.
       * Kalau valid, pakai session itu.
       * Kalau invalid, baru sync ulang dari Firebase token.
       */
      if (existingSession) {
        const verifiedSession = await getVerifiedAuthSession();

        if (!isMounted) return;

        if (verifiedSession) {
          setBackendSession(verifiedSession);
          return;
        }
      }

      const newSession = await syncFirebaseUserToBackend(user, {
        forceRefreshToken: true,
      });

      if (!isMounted) return;

      setBackendSession(newSession);
    }

    async function syncWithoutFirebaseUser() {
      const existingSession = getAuthSession();

      /**
       * Jangan langsung clear session hanya karena Firebase user null.
       * Header server membaca cookie api_token.
       * Jadi kita verify dulu backend session-nya.
       */
      if (!existingSession) {
        clearAuthSession();
        setBackendSession(null);
        return;
      }

      if (isMounted) {
        setBackendSession(existingSession);
      }

      const verifiedSession = await getVerifiedAuthSession();

      if (!isMounted) return;

      if (verifiedSession) {
        setBackendSession(verifiedSession);
        return;
      }

      clearAuthSession();
      setBackendSession(null);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      setIsLoading(true);
      setFirebaseUser(user);

      try {
        if (user) {
          await syncWithFirebaseUser(user);
        } else {
          await syncWithoutFirebaseUser();
        }
      } catch (error) {
        logApiError("Auth sync failed:", error);

        const fallbackSession = getAuthSession();

        if (isMounted) {
          setBackendSession(fallbackSession);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleSessionChanged() {
      setBackendSession(getAuthSession());
    }

    window.addEventListener(
      AUTH_SESSION_CHANGED_EVENT,
      handleSessionChanged,
    );

    return () => {
      window.removeEventListener(
        AUTH_SESSION_CHANGED_EVENT,
        handleSessionChanged,
      );
    };
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      firebaseUser,
      backendSession,
      isLoading,
      refreshSession,
    }),
    [firebaseUser, backendSession, isLoading, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}