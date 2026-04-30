export type Store = {
  id: number | string;
  user_id?: number | string | null;
  name: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  logo?: string | null;
  is_active?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};