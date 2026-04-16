import { ProductCard } from "@/components/ui/ProductCard";
import { fetchAPI } from "@/lib/api";

type ProductImage = {
  image_url?: string | null;
  url?: string | null;
  is_primary?: boolean;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  stock?: number;
  category?: {
    name?: string;
  };
  thumbnail?: string | null;
  images?: ProductImage[];
};

function resolveImage(product: Product): string {
  if (product.thumbnail) {
    return product.thumbnail;
  }

  const primary = product.images?.find((image) => image.is_primary);
  const fallback = primary ?? product.images?.[0];

  return fallback?.image_url ?? fallback?.url ?? "https://via.placeholder.com/900x900?text=No+Image";
}

export default async function SearchPage() {
  let items: Product[] = [];

  try {
    items = await fetchAPI<Product[]>("/products");
  } catch {
    items = [];
  }

  return (
    <div className="grid gap-8 lg:grid-cols">

      <section>
        <div className="mb-8 flex items-end justify-between">
          <select className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold">
            <option>Popularity</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
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
    </div>
  );
}
