import Link from "next/link";
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

export default async function OrderDetailPage() {
  let items: Product[] = [];

  try {
    items = await fetchAPI<Product[]>("/products");
  } catch {
    items = [];
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Order Detail</h1>
        <p className="mt-2 text-slate-500">Order #CC-82910-442</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Items</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.slice(0, 4).map((item, index) => (
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
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Payment and Shipping</h2>
            <div className="space-y-2 text-sm text-slate-600">
              <p>Visa ending in 4242</p>
              <p>128 Fine Arts Plaza, Building 4, Studio 12, New York, NY 10012</p>
              <p className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Estimated arrival: Oct 24, 2026</p>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Order Actions</h2>
          <Link href="/orders/CC-82910-442/tracking" className="block">
            <button className="w-full rounded-lg bg-emerald-700 py-3 font-bold text-white">Track Order</button>
          </Link>
          <button className="mt-3 w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700">Download Invoice</button>
          <button className="mt-3 w-full rounded-lg bg-slate-100 py-3 font-semibold text-slate-700">Request Support</button>
        </aside>
      </div>
    </div>
  );
}
