import { BannerSection } from "@/components/home/BannerSection";
import { CatalogGroupsSection } from "@/components/home/CatalogGroupsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { RecommendedProductsSection } from "@/components/home/RecommendedProductsSection";
import { StoresSection } from "@/components/home/StoresSection";

import { getHomepageData } from "@/lib/catalog/homepageService";

export default async function BuyerHomePage() {
  const {
    banners,
    products,
    categories,
    catalogGroups,
    stores,
    hasPartialError,
  } = await getHomepageData();

  return (
    <div className="space-y-16 pb-16">
      <BannerSection banner={banners[0]} />

      {hasPartialError ? (
        <section className="mx-auto max-w-[1440px]">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Sebagian data homepage gagal diambil dari backend.
          </div>
        </section>
      ) : null}

      <CatalogGroupsSection catalogGroups={catalogGroups} />
      <CategoriesSection categories={categories} />
      <RecommendedProductsSection products={products} />
      <StoresSection stores={stores} />
    </div>
  );
}