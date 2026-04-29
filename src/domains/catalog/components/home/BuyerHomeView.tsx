import type { HomepageData } from "../../services/homepageService";

import { BannerSection } from "./BannerSection";
import { CatalogGroupsSection } from "./CatalogGroupsSection";
import { CategoriesSection } from "./CategoriesSection";
import { HomepageErrorAlert } from "./HomepageErrorAlert";
import { RecommendedProductsSection } from "./RecommendedProductsSection";
import { StoresSection } from "./StoresSection";

type BuyerHomeViewProps = {
  data: HomepageData;
};

export function BuyerHomeView({ data }: BuyerHomeViewProps) {
  const {
    banners,
    products,
    categories,
    catalogGroups,
    stores,
    hasPartialError,
  } = data;

  return (
    <div className="space-y-16 pb-16">
      <BannerSection banner={banners[0]} />

      {hasPartialError ? <HomepageErrorAlert /> : null}

      <CatalogGroupsSection catalogGroups={catalogGroups} />
      <CategoriesSection categories={categories} />
      <RecommendedProductsSection products={products} />
      <StoresSection stores={stores} />
    </div>
  );
}