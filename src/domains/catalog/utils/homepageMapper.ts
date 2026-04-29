import type {
  Banner,
  CatalogGroup,
  Category,
  HomepageData,
  Product,
  Store,
} from "../types";

import {
  CATALOG_PLACEHOLDER_IMAGE,
  STORE_PLACEHOLDER_IMAGE,
} from "../constants";

import { toBannerRoute, toStoreRoute } from "../services/catalogRoutes";

export type HomepageBannerViewModel = {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  href: string;
};

export type HomepageStoreCardViewModel = {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  href: string;
};

export type HomepageViewModel = {
  banner?: HomepageBannerViewModel;
  products: Product[];
  categories: Category[];
  catalogGroups: CatalogGroup[];
  stores: HomepageStoreCardViewModel[];
  hasPartialError: boolean;
};

export function mapHomepageBanner(
  banner?: Banner,
): HomepageBannerViewModel | undefined {
  if (!banner) {
    return undefined;
  }

  return {
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    imageUrl: banner.image_url || CATALOG_PLACEHOLDER_IMAGE,
    href: toBannerRoute(banner.link_url),
  };
}

export function mapHomepageStoreToCard(
  store: Store,
): HomepageStoreCardViewModel {
  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    logoUrl: store.logo_url || STORE_PLACEHOLDER_IMAGE,
    href: toStoreRoute(store.slug),
  };
}

export function mapHomepageDataToViewModel(
  data: HomepageData,
): HomepageViewModel {
  return {
    banner: mapHomepageBanner(data.banners[0]),
    products: data.products,
    categories: data.categories,
    catalogGroups: data.catalogGroups,
    stores: data.stores.map(mapHomepageStoreToCard),
    hasPartialError: data.hasPartialError,
  };
}