import { User } from "firebase/auth";
import api from "./api";
import { AuthSession } from "./auth";

export const firebaseAuthService = {
  async syncFirebaseToBackend(
    firebaseUser: User
  ): Promise<AuthSession | null> {
    try {
      const idToken = await firebaseUser.getIdToken();

      const res = await api.post(
        "/v1/identity/auth/firebase-login",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Backend sync failed:", error);
      return null;
    }
  },
};