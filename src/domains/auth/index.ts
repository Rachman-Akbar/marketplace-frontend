export type { AuthUser, AuthResponse, AuthSession } from "./types";

export {
  AUTH_STORAGE_KEY,
  AUTH_SESSION_CHANGED_EVENT,
  API_TOKEN_COOKIE,
  COOKIE_MAX_AGE,
} from "./constants";

export {
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
} from "./services/session";

export {
  loginWithFirebaseAction,
  registerWithPassword,
  verifyAuthSession,
  getVerifiedAuthSession,
  sendResetPasswordEmail,
} from "./services/api";

export { syncFirebaseUserToBackend } from "./services/firebase-sync";
export { logout } from "./services/logout";

export { AuthProvider, useAuth } from "./providers/AuthProvider";
export { AuthRouteGuard } from "./providers/AuthRouteGuard";

export { LoginForm } from "./components/LoginForm";
export { RegisterForm } from "./components/RegisterForm";
export { ForgotPasswordForm } from "./components/ForgotPasswordForm";
export { GoogleAuthButton } from "./components/GoogleAuthButton";