import type { Product } from "../../types";

import { ProductGrid } from "../ProductGrid";
import { SectionHeader } from "../SectionHeader";

type RecommendedProductsSectionProps = {
  products: Product[];
};

export function RecommendedProductsSection({
  products,
}: RecommendedProductsSectionProps) {
  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Recommended Products"
        description="Produk ditampilkan dari endpoint products"
        href="/products"
      />

      <ProductGrid
        products={products}
        emptyMessage="Belum ada product."
      />
    </section>
  );
}