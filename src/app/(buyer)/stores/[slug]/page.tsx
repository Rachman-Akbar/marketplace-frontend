import { notFound } from "next/navigation";
import { storeService } from "@/domains/stores/services/storeService";
import { StoreHero } from "@/domains/stores/components/StoreHero";
import { StoreProductsSection } from "@/domains/stores/components/StoreProductSection";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StoreDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [store, products] = await Promise.all([
    storeService.getStoreBySlug(slug),
    storeService.getProductsByStoreSlug(slug),
  ]);

  if (!store) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <StoreHero store={store} />
      <StoreProductsSection store={store} products={products} />
    </main>
  );
}