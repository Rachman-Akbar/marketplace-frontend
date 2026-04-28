import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalog/catalogService";
import { ProductCard } from "@/components/catalog/ProductCard";
import { toProductRoute } from "@/lib/catalog/catalogRoutes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    "https://via.placeholder.com/600x600?text=No+Image"
  );
}

export default async function StoreDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [store, products]: any = await Promise.all([
      catalogService.getStoreBySlug(slug),
      catalogService.getProductsByStoreSlug(slug),
    ]);

    if (!store || Array.isArray(store)) {
      notFound();
    }

    const productList = Array.isArray(products) ? products : [];

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <section className="overflow-hidden rounded-2xl border bg-white">
          {store.banner_url && (
            <img
              src={store.banner_url}
              alt={store.name}
              className="h-64 w-full object-cover"
            />
          )}

          <div className="flex items-center gap-4 p-6">
            <img
              src={
                store.logo_url ||
                "https://via.placeholder.com/200x200?text=Store"
              }
              alt={store.name}
              className="h-20 w-20 rounded-full object-cover"
            />

            <div>
              <h1 className="text-4xl font-bold">{store.name}</h1>

              {store.short_description && (
                <p className="mt-2 text-gray-500">
                  {store.short_description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-5">
          <h2 className="text-2xl font-bold">Products</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {productList.length > 0 ? (
              productList.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={resolveProductImage(product)}
                  price={Number(product.price)}
                  metaText={product.category?.name ?? store.name ?? ""}
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
  } catch (error) {
    console.error("Store detail error:", error);
    notFound();
  }
}