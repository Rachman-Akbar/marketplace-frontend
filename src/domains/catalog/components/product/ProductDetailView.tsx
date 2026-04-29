import Link from "next/link";

import { formatPrice } from "../../utils/catalogFormatters";
import { toProductsRoute } from "../../services/catalogRoutes";

import type { Product } from "../../types";

import { ProductImageGallery } from "./ProductImageGallery";
import { ProductSellerCard } from "./ProductSellerCard";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <Link
        href={toProductsRoute()}
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Kembali ke Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImageGallery product={product} />

        <section>
          <p className="text-sm text-gray-500">
            {product.category?.name ?? "No Category"} •{" "}
            {product.store?.name ?? "No Store"}
          </p>

          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-bold">
            {formatPrice(product.price)}
          </p>

          {typeof product.stock === "number" ? (
            <p className="mt-2 text-sm text-gray-500">
              Stock: {product.stock}
            </p>
          ) : null}

          {product.status ? (
            <p className="mt-2 text-sm text-gray-500">
              Status: {product.status}
            </p>
          ) : null}

          {product.description ? (
            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>
          ) : null}

          {product.store ? (
            <ProductSellerCard store={product.store} />
          ) : null}

          <button
            type="button"
            className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto"
          >
            Tambah ke Keranjang
          </button>
        </section>
      </div>
    </main>
  );
}