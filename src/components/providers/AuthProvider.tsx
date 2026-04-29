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

import {
  AUTH_SESSION_CHANGED_EVENT,
  AuthSession,
  clearAuthSession,
  getAuthSession,
  getVerifiedAuthSession,
  syncFirebaseUserToBackend,
} from "@/lib/auth";

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
    const verifiedSession = await getVerifiedAuthSession();
    setBackendSession(verifiedSession);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function syncUser(user: User): Promise<void> {
      const existingSession = getAuthSession();

      if (existingSession) {
        setBackendSession(existingSession);
        return;
      }

      const newSession = await syncFirebaseUserToBackend(user);

      if (!isMounted) return;

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

        await syncUser(user);
      } catch (error) {
        logApiError("Auth sync failed:", error);

        const fallbackSession = getAuthSession();
        setBackendSession(fallbackSession);
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