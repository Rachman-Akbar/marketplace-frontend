import type { HomepageData } from "../../types";
import { mapHomepageDataToViewModel } from "../../utils/homepageMapper";

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
  const homepage = mapHomepageDataToViewModel(data);

  return (
    <div className="space-y-16 pb-16">
      <BannerSection banner={homepage.banner} />

      {homepage.hasPartialError ? <HomepageErrorAlert /> : null}

      <CatalogGroupsSection catalogGroups={homepage.catalogGroups} />
      <CategoriesSection categories={homepage.categories} />
      <RecommendedProductsSection products={homepage.products} />
      <StoresSection stores={homepage.stores} />
    </div>
  );
}