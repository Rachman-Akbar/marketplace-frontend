import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalogService";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import {
  toProductRoute,
  toCategoryProductsRoute,
} from "@/lib/catalogRoutes";

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

export default async function CatalogGroupDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [group, products]: any = await Promise.all([
      catalogService.getCatalogGroupBySlug(slug),
      catalogService.getProductsByCatalogGroupSlug(slug),
    ]);

    if (!group || Array.isArray(group)) {
      notFound();
    }

    const productList = Array.isArray(products) ? products : [];
    const categories = Array.isArray(group.categories) ? group.categories : [];

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <section>
          <h1 className="text-4xl font-bold">{group.name}</h1>

          {group.description && (
            <p className="mt-2 text-gray-500">{group.description}</p>
          )}
        </section>

        {categories.length > 0 && (
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">Categories</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category: any) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  itemCount={category.products_count ?? 0}
                  href={toCategoryProductsRoute(category.slug)}
                  imageUrl={
                    category.image_url ||
                    category.cover_image_url ||
                    "https://via.placeholder.com/900x1200?text=Category"
                  }
                />
              ))}
            </div>
          </section>
        )}

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
  } catch (error) {
    console.error("Catalog group detail error:", error);
    notFound();
  }
}