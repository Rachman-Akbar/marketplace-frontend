export type StoreId = number | string;

export type Store = {
  id: StoreId;
  user_id: string;

  name: string;
  slug: string;

  description?: string | null;
  short_description?: string | null;

  phone?: string | null;
  email?: string | null;

  city?: string | null;
  province?: string | null;
  address?: string | null;

  is_active: boolean | 0 | 1;

  logo?: string | null;
  banner_url?: string | null;

  created_at?: string | null;
  updated_at?: string | null;

  details?: StoreDetails | null;
};

export type StoreDetails = {
  id: StoreId;
  store_id: StoreId;

  owner_name?: string | null;
  owner_phone?: string | null;

  description?: string | null;
  shipping_policy?: string | null;
  return_policy?: string | null;

  open_days?: string | null;
  open_time?: string | null;
  close_time?: string | null;

  whatsapp_url?: string | null;
  instagram_url?: string | null;
  tiktok_url?: string | null;
  website_url?: string | null;

  created_at?: string | null;
  updated_at?: string | null;
};