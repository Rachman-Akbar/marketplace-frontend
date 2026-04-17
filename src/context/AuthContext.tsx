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
      if (user) {
        // Sync Firebase user to backend session
        try {
          const session = await firebaseAuthService.syncFirebaseToBackend(user);
          if (session) {
            saveAuthSession(session);
            setBackendSession(session);
          }
        } catch (error) {
          console.error('Firebase sync failed:', error);
          // Keep Firebase state, but backend may be invalid
        }
      } else {
        // No Firebase user -> clear backend session if invalid
        clearAuthSession();
        setBackendSession(null);
      }
      setIsLoading(false);
    });

    // Listen to AUTH_SESSION_CHANGED_EVENT for manual logout (e.g. ProfileLogoutButton)
    let prevSession = getAuthSession();
    function handleSessionChange() {
      const currentSession = getAuthSession();
      setBackendSession(currentSession);
      // Hanya tampilkan alert jika sebelumnya ada session, lalu session menjadi null (benar-benar logout)
      if (prevSession && !currentSession) {
        alert('Logout berhasil!');
      }
      prevSession = currentSession;
    }
    window.addEventListener('ukomp:auth-session-changed', handleSessionChange);

    return () => {
      unsubscribe();
      window.removeEventListener('ukomp:auth-session-changed', handleSessionChange);
    };
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
