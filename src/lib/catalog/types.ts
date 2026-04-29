export type Banner = {
  id: number;
  title: string;
  subtitle?: string | null;
  image_url: string;
  mobile_image_url?: string | null;
  link_url?: string | null;
  is_active: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
  products_count?: number | null;
  catalog_group_id?: number | null;
};

export type CatalogGroup = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
  categories?: Category[];
};

export type Store = {
  id: number;
  name: string;
  slug: string;
  logo_url?: string | null;
  banner_url?: string | null;
  short_description?: string | null;
  is_active?: boolean;
};

export type ProductImage = {
  id: number;
  image_url?: string | null;
  is_primary?: boolean;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock?: number;
  thumbnail?: string | null;
  status?: string;
  category_id?: number | null;
  store_id?: number | null;
  seller_id?: string | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
    image_url?: string | null;
  } | null;
  store?: {
    id?: number;
    name?: string;
    slug?: string;
    logo_url?: string | null;
  } | null;
  images?: ProductImage[];
};