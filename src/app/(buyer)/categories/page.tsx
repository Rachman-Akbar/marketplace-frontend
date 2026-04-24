import { catalogService } from "@/lib/catalogService";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { toCategoryProductsRoute } from "@/lib/catalogRoutes";

export default async function CategoriesPage() {
  const categories: any = await catalogService.getCategories();
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Categories</h1>
        <p className="mt-2 text-gray-500">
          Pilih kategori untuk melihat produk.
        </p>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryList.length > 0 ? (
            categoryList.map((category: any) => (
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
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada kategori.</p>
          )}
        </div>
      </section>
    </main>
  );
}