import { notFound } from "next/navigation";

import { CategoryPageHeader, ProductGrid } from "@/domains/catalog";
import { categoryService } from "@/domains/catalog/server";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const category = await categoryService.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await categoryService.getProductsByCategorySlug(slug);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <CategoryPageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description || "Semua produk dalam kategori ini."}
      />

      <section className="mt-10 space-y-5">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-sm text-gray-500">
            Semua produk dalam kategori ini.
          </p>
        </div>

        <ProductGrid
          products={products}
          emptyMessage="Belum ada produk dalam kategori ini."
        />
      </section>
    </main>
  );
}