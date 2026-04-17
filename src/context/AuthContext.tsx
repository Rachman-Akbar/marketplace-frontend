"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthSession, saveAuthSession, getVerifiedAuthSession, clearAuthSession, getAuthSession } from '@/lib/auth';
import { firebaseAuthService } from '@/lib/firebaseAuthService';

interface AuthContextType {
  firebaseUser: User | null;
  backendSession: AuthSession | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendSession, setBackendSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setFirebaseUser(user);

    if (!user) {
      clearAuthSession();
      setBackendSession(null);
      setIsLoading(false);
      return;
    }

    const existingSession = getAuthSession();

    // ✅ JANGAN SYNC LAGI kalau session sudah ada
    if (existingSession) {
      setBackendSession(existingSession);
      setIsLoading(false);
      return;
    }

    try {
      const session =
        await firebaseAuthService.syncFirebaseToBackend(user);

      if (session) {
        saveAuthSession(session);
        setBackendSession(session);
      }
    } catch (error) {
      console.error("Firebase sync failed:", error);
    }

    setIsLoading(false);
  });

  return () => unsubscribe();
}, []);


  return (
    <AuthContext.Provider value={{ firebaseUser, backendSession, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
