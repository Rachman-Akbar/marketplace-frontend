import { fetchAPI } from "@/lib/api";
import { ProductFilterButton } from "@/components/filters/ProductFilterButton";
import { ProductCard } from "@/components/ui/ProductCard";

type ProductImage = {
  image_url?: string | null;
  url?: string | null;
  is_primary?: boolean;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  price: number;
  stock?: number;
  category?: {
    name?: string;
    slug?: string;
  };
  thumbnail?: string | null;
  images?: ProductImage[];
};

type CategoryOption = {
  id: number;
  name: string;
  slug: string;
};

type ProductsPageProps = {
  searchParams?: Promise<{ category?: string; categories?: string; sort?: string }>;
};

function resolveImage(product: Product): string {
  if (product.thumbnail) {
    return product.thumbnail;
  }

  const primary = product.images?.find((image) => image.is_primary);
  const fallback = primary ?? product.images?.[0];

  return fallback?.image_url ?? fallback?.url ?? "https://via.placeholder.com/900x900?text=No+Image";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const selectedCategories = params?.categories
    ? params.categories
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : params?.category
      ? [params.category]
      : [];
  const sort = params?.sort ?? "popularity";
  let items: Product[] = [];
  let categories: CategoryOption[] = [];

  try {
    [items, categories] = await Promise.all([
      fetchAPI<Product[]>("/products"),
      fetchAPI<CategoryOption[]>("/categories"),
    ]);
  } catch {
    items = [];
    categories = [];
  }

  if (selectedCategories.length > 0) {
    items = items.filter((item) => {
      const slug = item.category?.slug;

      return !!slug && selectedCategories.includes(slug);
    });
  }

  if (sort === "price_asc") {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (sort === "name_asc") {
    items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "newest") {
    items = [...items].sort((a, b) => b.id - a.id);
  }

  return (
    <section className="space-y-8">
      <div className="flex justify-end">
        <ProductFilterButton categories={categories} currentCategories={selectedCategories} currentSort={sort} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            image={resolveImage(item)}
            price={item.price}
            metaText={item.category?.name ?? ""}
            soldText={typeof item.stock === "number" ? `Stock ${item.stock}` : undefined}
            href={`/products/${item.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
