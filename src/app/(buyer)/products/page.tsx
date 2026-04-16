import { fetchAPI } from "@/lib/api";
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
  };
  thumbnail?: string | null;
  images?: ProductImage[];
};

type ProductsPageProps = {
  searchParams?: Promise<{ category?: string }>;
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
  const category = params?.category;
  let items: Product[] = [];

  try {
    items = await fetchAPI<Product[]>(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  } catch {
    items = [];
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="hidden rounded-xl bg-slate-200/60 p-6 lg:block">
        <h3 className="mb-4 text-2xl font-bold tracking-tight">Category</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <label className="flex items-center gap-2"><input type="checkbox" /> Art &amp; Decor</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Handcrafted Furniture</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Sustainable Textiles</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Ceramics</label>
        </div>
        <h3 className="mb-3 mt-8 text-2xl font-bold tracking-tight">Price Range</h3>
        <input type="range" className="w-full" defaultValue={45} />
        <div className="mt-1 flex justify-between text-sm text-slate-500"><span>$0</span><span className="font-bold text-emerald-700">$450+</span><span>$1000+</span></div>
        <button className="mt-7 w-full rounded-xl bg-emerald-700 py-3 font-bold text-white">Apply Filters</button>
      </aside>

      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Search Results</p>
            <h1 className="text-5xl font-extrabold tracking-tight">Handcrafted Essentials</h1>
            <p className="mt-1 text-slate-500">{items.length} items found matching your preference</p>
          </div>
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
