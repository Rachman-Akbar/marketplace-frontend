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

import axios from "axios";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import { logApiError } from "@/lib/axios";
import { auth } from "@/lib/firebase";

import {
  AUTH_SESSION_CHANGED_EVENT,
  AuthSession,
  clearAuthSession,
  getAuthSession,
  getVerifiedAuthSession,
  syncFirebaseUserToBackend,
} from "@/domains/auth";

interface AuthContextType {
  firebaseUser: User | null;
  backendSession: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isSessionForFirebaseUser(
  session: AuthSession | null,
  user: User | null,
): session is AuthSession {
  if (!session || !user) return false;

  return session.user.firebase_uid === user.uid;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendSession, setBackendSession] = useState<AuthSession | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);

    try {
      const currentFirebaseUser = auth.currentUser;

      if (!currentFirebaseUser) {
        clearAuthSession();
        setFirebaseUser(null);
        setBackendSession(null);
        return;
      }

      const verifiedSession = await getVerifiedAuthSession();

      if (!isSessionForFirebaseUser(verifiedSession, currentFirebaseUser)) {
        clearAuthSession();
        setBackendSession(null);
        return;
      }

      setFirebaseUser(currentFirebaseUser);
      setBackendSession(verifiedSession);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function resetAuthState(shouldSignOutFirebase = false) {
      clearAuthSession();

      if (shouldSignOutFirebase) {
        try {
          await signOut(auth);
        } catch {
          // ignore firebase signOut error
        }
      }

      if (!isMounted) return;

      setFirebaseUser(null);
      setBackendSession(null);
    }

    async function syncUser(user: User): Promise<void> {
      const verifiedSession = await getVerifiedAuthSession();

      if (isSessionForFirebaseUser(verifiedSession, user)) {
        if (!isMounted) return;

        setBackendSession(verifiedSession);
        return;
      }

      clearAuthSession();

      const newSession = await syncFirebaseUserToBackend(user, {
        forceRefreshToken: true,
      });

      if (!isMounted) return;

      setBackendSession(newSession);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      setIsLoading(true);
      setFirebaseUser(user);

      try {
        if (!user) {
          await resetAuthState(false);
          return;
        }

        await syncUser(user);
      } catch (error) {
        logApiError("Auth sync failed:", error);

        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (status === 401 || status === 419) {
          await resetAuthState(true);
          return;
        }

        if (isMounted) {
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
      const currentFirebaseUser = auth.currentUser;
      const session = getAuthSession();

      if (!currentFirebaseUser) {
        setBackendSession(null);
        return;
      }

      if (isSessionForFirebaseUser(session, currentFirebaseUser)) {
        setBackendSession(session);
        return;
      }

      setBackendSession(null);
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
      isAuthenticated: Boolean(backendSession),
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