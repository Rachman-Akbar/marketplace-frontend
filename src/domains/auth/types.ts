export type AuthUser = {
  id: string;
  firebase_uid: string | null;
  email: string;
  name: string | null;
  avatar: string | null;
  is_email_verified: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  roles: string[];
  active_role: string;
  api_token: string;
};

export type AuthSession = AuthResponse;