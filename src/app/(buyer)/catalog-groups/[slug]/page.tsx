import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalog/catalogService";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import {
  toProductRoute,
  toCategoryProductsRoute,
} from "@/lib/catalog/catalogRoutes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    PLACEHOLDER_IMAGE
  );
}

function resolveCategoryImage(category: any) {
  return (
    category?.image_url ||
    category?.cover_image_url ||
    PLACEHOLDER_IMAGE
  );
}

export default async function CatalogGroupDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [group, categories, products]: any = await Promise.all([
      catalogService.getCatalogGroupBySlug(slug),
      catalogService.getCategoriesByCatalogGroupSlug(slug),
      catalogService.getProductsByCatalogGroupSlug(slug),
    ]);

    if (!group || Array.isArray(group)) {
      notFound();
    }

    const categoryList = Array.isArray(categories) ? categories : [];
    const productList = Array.isArray(products) ? products : [];

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <section className="rounded-2xl bg-slate-100 px-8 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Catalog Group
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">{group.name}</h1>

          {group.description ? (
            <p className="mt-3 max-w-2xl text-gray-500">
              {group.description}
            </p>
          ) : null}
        </section>

        <section className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Categories</h2>
            <p className="text-sm text-gray-500">
              Semua kategori dalam catalog group ini.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryList.length > 0 ? (
              categoryList.map((category: any) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  itemCount={category.products_count ?? 0}
                  href={toCategoryProductsRoute(category.slug)}
                  imageUrl={resolveCategoryImage(category)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada kategori dalam catalog group ini.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-sm text-gray-500">
              Semua produk dalam catalog group ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <p className="text-sm text-gray-500">
                Belum ada produk untuk catalog group ini.
              </p>
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