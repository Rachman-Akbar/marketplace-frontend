export type { AuthUser, AuthResponse, AuthSession } from "./types";

export {
  AUTH_STORAGE_KEY,
  AUTH_SESSION_CHANGED_EVENT,
} from "./constants";

export {
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
} from "./session";

export {
  loginWithFirebaseAction,
  registerWithFirebase,
  registerWithPassword,
  verifyAuthSession,
  getVerifiedAuthSession,
  sendResetPasswordEmail,
} from "./api";

export { syncFirebaseUserToBackend } from "./firebase-sync";
export { logout } from "./logout";