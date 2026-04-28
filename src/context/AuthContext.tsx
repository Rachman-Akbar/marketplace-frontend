"use client";

import { logApiError } from "@/lib/axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  AuthSession,
  AUTH_SESSION_CHANGED_EVENT,
  clearAuthSession,
  getAuthSession,
  getVerifiedAuthSession,
  loginWithFirebaseAction,
  saveAuthSession,
} from "@/lib/auth/auth";

interface AuthContextType {
  firebaseUser: User | null;
  backendSession: AuthSession | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendSession, setBackendSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshSession() {
    const existingSession = getAuthSession();

    if (!existingSession) {
      setBackendSession(null);
      return;
    }

    const verifiedSession = await getVerifiedAuthSession();
    setBackendSession(verifiedSession);
  }

  useEffect(() => {
    let isMounted = true;

    async function syncFirebaseUser(user: User) {
      /**
       * Pakai session Laravel/Sanctum lokal dulu.
       * Jangan verify/sync ulang setiap refresh halaman.
       */
      const existingSession = getAuthSession();

      if (existingSession) {
        if (isMounted) {
          setBackendSession(existingSession);
        }

        return;
      }

      /**
       * Kalau Firebase login tapi backend session belum ada,
       * baru sync Firebase token ke Laravel.
       */
      const idToken = await user.getIdToken(true);

      const newSession = await loginWithFirebaseAction({
        idToken,
      });

      if (!isMounted) return;

      saveAuthSession(newSession);
      setBackendSession(newSession);
    }

const unsubscribe = onAuthStateChanged(auth, async (user) => {
  if (!isMounted) return;

  setIsLoading(true);
  setFirebaseUser(user);

  try {
    if (!user) {
      clearAuthSession();
      setBackendSession(null);
      return;
    }

    await syncFirebaseUser(user);
  } catch (error) {
    logApiError("Auth sync failed:", error);

    const fallbackSession = getAuthSession();

    if (fallbackSession) {
      setBackendSession(fallbackSession);
    } else {
      setBackendSession(null);
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

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        backendSession,
        isLoading,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}