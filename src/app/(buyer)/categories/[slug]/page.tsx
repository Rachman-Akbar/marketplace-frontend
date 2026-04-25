import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalogService";
import { ProductCard } from "@/components/ui/ProductCard";
import { toProductRoute } from "@/lib/catalogRoutes";

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

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [category, products]: any = await Promise.all([
      catalogService.getCategoryBySlug(slug),
      catalogService.getProductsByCategorySlug(slug),
    ]);

    if (!category || Array.isArray(category)) {
      notFound();
    }

    const productList = Array.isArray(products) ? products : [];

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
              Semua produk dalam kategori ini.
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