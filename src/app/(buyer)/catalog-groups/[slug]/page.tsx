import { notFound } from "next/navigation";

import {
  CatalogGroupPageHeader,
  CategoryGrid,
  ProductGrid,
} from "@/domains/catalog";

import { catalogGroupService } from "@/domains/catalog/server";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CatalogGroupDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const [group, categories, products] = await Promise.all([
    catalogGroupService.getCatalogGroupBySlug(slug),
    catalogGroupService.getCategoriesByCatalogGroupSlug(slug),
    catalogGroupService.getProductsByCatalogGroupSlug(slug),
  ]);

  if (!group) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <CatalogGroupPageHeader
        eyebrow="Catalog Group"
        title={group.name}
        description={
          group.description || "Semua kategori dan produk dalam catalog group ini."
        }
      />

      <section className="mt-10 space-y-5">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-sm text-gray-500">
            Semua kategori dalam catalog group ini.
          </p>
        </div>

        <CategoryGrid
          categories={categories}
          emptyMessage="Belum ada kategori dalam catalog group ini."
        />
      </section>

      <section className="mt-10 space-y-5">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-sm text-gray-500">
            Semua produk dalam catalog group ini.
          </p>
        </div>

        <ProductGrid
          products={products}
          emptyMessage="Belum ada produk untuk catalog group ini."
        />
      </section>
    </main>
  );
}