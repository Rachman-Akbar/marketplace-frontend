import { CategoryCard } from "@/components/catalog/CategoryCard";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { toCategoryProductsRoute } from "@/lib/catalog/catalogRoutes";
import { PLACEHOLDER_IMAGE } from "@/lib/catalog/homepageMapper";

import type { Category } from "@/lib/catalog/types";

export function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Categories"
        description="Data kategori dari backend"
        href="/categories"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              itemCount={category.products_count ?? 0}
              href={toCategoryProductsRoute(category.slug)}
              imageUrl={
                category.image_url ||
                category.cover_image_url ||
                PLACEHOLDER_IMAGE
              }
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">Belum ada categories.</p>
        )}
      </div>
    </section>
  );
}