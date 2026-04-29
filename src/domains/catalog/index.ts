export type {
  Banner,
  Category,
  CatalogGroup,
  Store,
  Product,
  ProductImage,
  ProductCardItem,
  HomepageData,
} from "./types";

export {
  CATALOG_PLACEHOLDER_IMAGE,
  STORE_PLACEHOLDER_IMAGE,
} from "./constants";

export {
  toBannerRoute,
  toProductRoute,
  toProductsRoute,
  toCategoryRoute,
  toCategoryProductsRoute,
  toCatalogGroupRoute,
  toCatalogGroupProductsRoute,
  toStoreRoute,
  toStoresRoute,
} from "./services/catalogRoutes";

export { BuyerHomeView } from "./components/home/BuyerHomeView";

export { formatPrice } from "./utils/catalogFormatters";

export {
  resolveProductImage,
  mapProductToCard,
} from "./utils/productMapper";

export {
  resolveCategoryImage,
  mapCategoryToCard,
} from "./utils/categoryMapper";

export {
  resolveCatalogGroupImage,
  mapCatalogGroupToCard,
} from "./utils/catalogGroupMapper";

export {
  mapHomepageBanner,
  mapHomepageStoreToCard,
  mapHomepageDataToViewModel,
} from "./utils/homepageMapper";

export type {
  HomepageBannerViewModel,
  HomepageStoreCardViewModel,
  HomepageViewModel,
} from "./utils/homepageMapper";

export { SectionHeader } from "./components/SectionHeader";

export { CategoryCard } from "./components/CategoryCard";
export { CategoryGrid } from "./components/CategoryGrid";
export { CategoryPageHeader } from "./components/CategoryPageHeader";

export { ProductCard } from "./components/ProductCard";
export { ProductGrid } from "./components/ProductGrid";
export { ProductPageHeader } from "./components/ProductPageHeader";
export { ProductImageGallery } from "./components/ProductImageGallery";
export { ProductSellerCard } from "./components/ProductSellerCard";
export { ProductDetailView } from "./components/ProductDetailView";

export { CatalogGroupCard } from "./components/CatalogGroupCard";
export { CatalogGroupGrid } from "./components/CatalogGroupGrid";
export { CatalogGroupPageHeader } from "./components/CatalogGroupPageHeader";

export { BannerSection } from "./components/home/BannerSection";
export { CatalogGroupsSection } from "./components/home/CatalogGroupsSection";
export { CategoriesSection } from "./components/home/CategoriesSection";
export { RecommendedProductsSection } from "./components/home/RecommendedProductsSection";
export { StoresSection } from "./components/home/StoresSection";
export { HomepageErrorAlert } from "./components/home/HomepageErrorAlert";