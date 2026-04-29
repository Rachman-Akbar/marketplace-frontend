import {
  CategoryGrid,
  CategoryPageHeader,
  categoryService,
} from "@/domains/catalog";

export default async function CategoriesPage() {
  const categories = await categoryService.getAllCategories();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <CategoryPageHeader
        title="Categories"
        description="Semua kategori dari backend catalog API."
      />

      <section className="mt-10">
        <CategoryGrid categories={categories} />
      </section>
    </main>
  );
}