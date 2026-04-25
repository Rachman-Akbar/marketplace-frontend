import { catalogService } from "@/lib/catalogService";
import { ProductCard } from "@/components/ui/ProductCard";
import { toProductRoute } from "@/lib/catalogRoutes";

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    "https://via.placeholder.com/600x600?text=No+Image"
  );
}

export default async function ProductsPage() {
  const products: any = await catalogService.getProducts({all: true});
  const productList = Array.isArray(products) ? products : [];

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Products</h1>
        <p className="mt-2 text-gray-500">
          Semua produk dari backend catalog API.
        </p>
      </section>

      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productList.length > 0 ? (
            productList.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                image={resolveProductImage(product)}
                price={Number(product.price)}
                metaText={product.category?.name ?? product.store?.name ?? ""}
                soldText={
                  typeof product.stock === "number"
                    ? `Stock ${product.stock}`
                    : undefined
                }
                href={toProductRoute(product.slug)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada produk.</p>
          )}
        </div>
      </section>
    </main>
  );
}