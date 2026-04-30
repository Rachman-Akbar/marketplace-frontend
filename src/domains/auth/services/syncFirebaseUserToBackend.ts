import type { User } from "firebase/auth";

import { loginWithFirebaseAction } from "./api";
import { saveAuthSession } from "./session";

import type { AuthSession } from "../types";

export async function syncFirebaseUserToBackend(
  user: User,
  options?: {
    forceRefreshToken?: boolean;
  },
): Promise<AuthSession> {
  const idToken = await user.getIdToken(options?.forceRefreshToken ?? true);

  const session = await loginWithFirebaseAction({
    idToken,
  });

  saveAuthSession(session);

  return session;
}