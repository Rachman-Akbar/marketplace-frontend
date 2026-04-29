import type { Product } from "../../types";
import { mapProductToCard } from "../../utils/productMapper";

import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "Belum ada produk.",
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const card = mapProductToCard(product);

        return <ProductCard key={card.id} {...card} />;
      })}
    </div>
  );
}