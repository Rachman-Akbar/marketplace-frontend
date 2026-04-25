import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalogService";
import { ProductCard } from "@/components/ui/ProductCard";
import { toProductRoute } from "@/lib/catalogRoutes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    "/images/placeholder.svg"
  );
}

function normalizeList(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function uniqueProducts(products: any[]) {
  const map = new Map<number | string, any>();

  for (const product of products) {
    if (product?.id) {
      map.set(product.id, product);
    }
  }

  return Array.from(map.values());
}

function filterProductsByCategory(products: any[], category: any, slug: string) {
  return products.filter((product) => {
    return (
      product?.category?.slug === slug ||
      product?.category_slug === slug ||
      product?.category_id === category?.id ||
      product?.category?.id === category?.id
    );
  });
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const category = await catalogService.getCategoryBySlug(slug);

    if (!category || Array.isArray(category)) {
      notFound();
    }

    const categoryProducts = normalizeList(
      await catalogService.getProductsByCategorySlug(slug),
    );

    const allProducts = normalizeList(await catalogService.getProducts());

    const fallbackProducts = filterProductsByCategory(
      allProducts,
      category,
      slug,
    );

    const productList = uniqueProducts([
      ...categoryProducts,
      ...fallbackProducts,
    ]);

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <section className="rounded-2xl bg-slate-100 px-8 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Category
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">{category.name}</h1>

          {category.description ? (
            <p className="mt-3 max-w-2xl text-gray-500">
              {category.description}
            </p>
          ) : null}
        </section>

        <section className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-sm text-gray-500">
              Produk dalam kategori ini.
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
                  metaText={product.store?.name ?? product.category?.name ?? ""}
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
    console.error("Category detail error:", error);
    notFound();
  }
}