import { User } from 'firebase/auth';
import { authRequest } from './auth';
import { AuthResponse, AuthSession } from './auth';
import { auth } from './firebase';
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';

export const firebaseAuthService = {
  async syncFirebaseToBackend(firebaseUser: User): Promise<AuthSession | null> {
    // Call backend to login/register with firebase_uid
    try {
      const idToken = await firebaseUser.getIdToken();
      const response = await authRequest<AuthResponse>('/v1/identity/auth/firebase-login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({}),
      });
      return response;
    } catch (error) {
      console.error('Backend sync failed:', error);
      return null;
    }
  },

  async sendForgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  async sendVerificationEmail(): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    }
  },

  // Logout both
  async signOut(): Promise<void> {
    auth.signOut();
    // Backend logout handled in lib/auth.ts
  }
};

// Individual exports for direct usage (backward compatibility)
export async function syncFirebaseToBackend(firebaseUser: User): Promise<AuthSession | null> {
  return firebaseAuthService.syncFirebaseToBackend(firebaseUser);
}

export async function sendForgotPassword(email: string): Promise<void> {
  return firebaseAuthService.sendForgotPassword(email);
}

export async function sendVerificationEmail(): Promise<void> {
  return firebaseAuthService.sendVerificationEmail();
}

export async function signOut(): Promise<void> {
  return firebaseAuthService.signOut();
}

