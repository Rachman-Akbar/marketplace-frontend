export type StoreProductImage = {
  id?: number | string;
  image_url?: string | null;
  url?: string | null;
  is_primary?: boolean;
};

export type StoreProduct = {
  id: number | string;

  store_id?: number | string;
  category_id?: number | string | null;
  seller_id?: number | string | null;

  name: string;
  slug: string;
  description?: string | null;

  price: number | string;
  stock?: number | null;
  thumbnail?: string | null;
  status?: string | null;

  category?: {
    id?: number | string;
    name?: string | null;
    slug?: string | null;
  } | null;

  store?: {
    id?: number | string;
    name?: string | null;
    slug?: string | null;
    logo?: string | null;
    city?: string | null;
    province?: string | null;
  } | null;

  images?: StoreProductImage[];
};