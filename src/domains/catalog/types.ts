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
  price: number | string;
  stock?: number | null;
  thumbnail?: string | null;
  status?: string | null;
  category_id?: number | null;
  store_id?: number | null;
  seller_id?: string | null;
  category?: Category | null;
  store?: Store | null;
  images?: ProductImage[];
};

export type ProductCardItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  metaText: string;
  soldText?: string;
  href: string;
};

export type HomepageData = {
  banners: Banner[];
  products: Product[];
  categories: Category[];
  catalogGroups: CatalogGroup[];
  stores: Store[];
  hasPartialError: boolean;
};