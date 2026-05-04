import { ProductCard } from "@/domains/catalog/components/product/ProductCard";
import { toProductRoute } from "@/domains/catalog/services/catalogRoutes";
import type { Store } from "../types/store";
import type { StoreProduct } from "../types/storeProduct";
import { resolveProductImage } from "../utils/resolveProductImage";

type StoreProductsSectionProps = {
  store: Store;
  products: StoreProduct[];
};

export function StoreProductsSection({
  store,
  products,
}: StoreProductsSectionProps) {
  return (
    <section className="mt-10 space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>

      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              image={resolveProductImage(product)}
              price={Number(product.price)}
              metaText={product.category?.name ?? store.name}
              soldText={
                typeof product.stock === "number"
                  ? `Stock ${product.stock}`
                  : undefined
              }
              href={toProductRoute(product.slug)}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Belum ada produk.</p>
      )}
    </section>
  );
}   