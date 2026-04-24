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
    "https://via.placeholder.com/600x600?text=No+Image"
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
        <section>
          <h1 className="text-4xl font-bold">{category.name}</h1>

          {category.description && (
            <p className="mt-2 text-gray-500">{category.description}</p>
          )}
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