import { fetchAPI } from "@/lib/api";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  products_count?: number;
  image_url?: string | null;
};


export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    categories = await fetchAPI<Category[]>("/categories");
  } catch {
    categories = [];
  }

  return (
    <section className="space-y-12 md:space-y-16">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            aria-label={`Lihat produk kategori ${category.name}`}
            className="group relative h-[400px] cursor-pointer overflow-hidden rounded-xl shadow-[0_10px_22px_rgba(15,23,42,0.08)]"
          >
            <img
              src={category.image_url ?? "https://via.placeholder.com/900x1200?text=Category"}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/75" />

            <div className="absolute inset-x-0 bottom-0 p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">{category.name}</h2>
              <p className="mt-1 text-sm text-white/80">{category.products_count ?? 0}+ Items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
