export interface AuthUser {
  id: number | string;
  firebase_uid: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  [key: string]: unknown;
}

export interface AuthSession {
  user: AuthUser;
  roles: string[];
  active_role: string;
  api_token: string;
}

export interface AuthResponse {
  user: AuthUser;
  roles?: string[];
  active_role?: string;
  api_token: string;
}