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

export { CategoryCard } from "./components/category/CategoryCard";
export { CategoryGrid } from "./components/category/CategoryGrid";
export { CategoryPageHeader } from "./components/category/CategoryPageHeader";

export { ProductCard } from "./components/product/ProductCard";
export { ProductGrid } from "./components/product/ProductGrid";
export { ProductPageHeader } from "./components/product/ProductPageHeader";
export { ProductImageGallery } from "./components/product/ProductImageGallery";
export { ProductSellerCard } from "./components/product/ProductSellerCard";
export { ProductDetailView } from "./components/product/ProductDetailView";

export { CatalogGroupCard } from "./components/catalog-groups/CatalogGroupCard";
export { CatalogGroupGrid } from "./components/catalog-groups/CatalogGroupGrid";
export { CatalogGroupPageHeader } from "./components/catalog-groups/CatalogGroupPageHeader";

export { BannerSection } from "./components/home/BannerSection";
export { CatalogGroupsSection } from "./components/home/CatalogGroupsSection";
export { CategoriesSection } from "./components/home/CategoriesSection";
export { RecommendedProductsSection } from "./components/home/RecommendedProductsSection";
export { StoresSection } from "./components/home/StoresSection";
export { HomepageErrorAlert } from "./components/home/HomepageErrorAlert";