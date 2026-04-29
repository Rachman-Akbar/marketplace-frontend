import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { mapRecommendedProducts } from "@/lib/catalog/homepageMapper";

import type { Product } from "@/lib/catalog/types";

export function RecommendedProductsSection({
  products,
}: {
  products: Product[];
}) {
  const recommendedProducts = mapRecommendedProducts(products);

  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Recommended Products"
        description="Produk ditampilkan dari endpoint products"
        href="/products"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="text-sm text-gray-500">Belum ada product.</p>
        )}
      </div>
    </section>
  );
}