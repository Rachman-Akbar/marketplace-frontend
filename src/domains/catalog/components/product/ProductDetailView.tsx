import type { Product } from "../../types";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductSellerCard } from "./ProductSellerCard";
import { ProductPurchaseCard } from "./ProductPurchaseCard";
import { ProductTabs } from "./ProductTabs";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-8 sm:px-6">
      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)_minmax(320px,360px)]">
        <div className="min-w-0">
          <ProductImageGallery product={product} />
        </div>

        <section className="min-w-0 rounded-2xl border bg-white p-6">
          <p className="text-sm text-gray-500">
            {product.category?.name ?? "Product"}
          </p>

          <h1 className="mt-2 break-words text-3xl font-bold leading-tight">
            {product.name}
          </h1>

          <p className="mt-5 break-words text-3xl font-bold">
            Rp{Number(product.price).toLocaleString("id-ID")}
          </p>

          <div className="mt-6 border-t pt-5">
            <dl className="grid grid-cols-[100px_minmax(0,1fr)] gap-y-3 text-sm">
              <dt className="text-gray-500">Kategori</dt>
              <dd className="min-w-0 break-words">
                {product.category?.name ?? "-"}
              </dd>

              <dt className="text-gray-500">Stok</dt>
              <dd>{product.stock ?? "-"}</dd>

              <dt className="text-gray-500">Status</dt>
              <dd className="min-w-0 break-words">{product.status ?? "-"}</dd>

              <dt className="text-gray-500">Toko</dt>
              <dd className="min-w-0 break-words">
                {product.store?.name ?? "-"}
              </dd>
            </dl>
          </div>

          <div className="mt-6">
            <ProductSellerCard product={product} />
          </div>
        </section>

        <div className="min-w-0">
          <ProductPurchaseCard product={product} />
        </div>
      </section>

      <section className="mt-8 min-w-0">
        <ProductTabs product={product} />
      </section>
    </main>
  );
}