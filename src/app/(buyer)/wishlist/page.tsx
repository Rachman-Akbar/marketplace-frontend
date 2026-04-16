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

export default async function WishlistPage() {
  let items: Product[] = [];

  try {
    items = await fetchAPI<Product[]>("/products");
  } catch {
    items = [];
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className={`block rounded-lg px-3 py-2 ${n === 'Wishlist' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} href="#">{n}</a>
          ))}
        </nav>
      </aside>

      <section>
        <h1 className="text-5xl font-extrabold tracking-tight">Your Wishlist</h1>
        <p className="mt-2 text-slate-500">Items you&apos;ve curated for your future collection.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.slice(0, 16).map((item, index) => (
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
