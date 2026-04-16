import { fetchAPI } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";

type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  price: number;
  stock?: number;
  thumbnail?: string | null;
};

type StoreDetail = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  products?: StoreProduct[];
};

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SellerStorePage({ params }: StorePageProps) {
  const { slug } = await params;
  let storeName = slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  let storeProducts: StoreProduct[] = [];
  let storeLogo: string | null = null;

  try {
    const store = await fetchAPI<StoreDetail>(`/stores/${slug}`);
    storeName = store.name;
    storeProducts = store.products ?? [];
    storeLogo = store.logo ?? null;
  } catch {
    storeProducts = [];
  }

  const vouchers = [
    {
      title: `${storeProducts.length} Products`,
      subtitle: "Data voucher belum tersedia dari API",
      cta: "Browse",
    },
  ];

  const gallery = storeProducts
    .map((product) => product.thumbnail)
    .filter((thumbnail): thumbnail is string => Boolean(thumbnail))
    .slice(0, 6);

  return (
    <div className="space-y-12 rounded-[28px] bg-white px-4 pb-16 pt-4 md:px-6 md:pt-6 lg:px-8">
      <header className="relative">
        <div className="relative h-52 overflow-hidden rounded-xl md:h-72">
          <img
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_BvRx8agWEerwDib-acJsx_P46N3Tgd_e2DsIf8BzgO7qa3uBuOqMsSJJm7NZRHatfw5WixT2iFONa0o7zq-sFN3SrbWF0555C6y0LwKK26RRjdv2QjxGyUmJZFqueMzcCZlxKE0PRAzgvresu1hzxELsIPFIG8XTI_MAlvUWNGuQrPY87TE9AqtawhNUNvTj4ZIPfprCZlS-X3AIsyR_JdS8a9H4ZNZP2jW1PjICLjDhOCmTMEMgatu3V54PdW0L70V51GAhUM"
            alt="Store Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        <div className="relative -mt-16 flex flex-col gap-5 px-4 md:-mt-20 md:flex-row md:items-end md:px-6">
          <div className="h-28 w-28 overflow-hidden rounded-xl border-2 border-white bg-white p-1 shadow-lg md:h-36 md:w-36">
            <img
              className="h-full w-full rounded-lg object-cover"
              src={storeLogo ?? "https://via.placeholder.com/300x300?text=Store"}
              alt="Store Profile"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{storeName}</h1>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Online
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <p className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-slate-700">star</span>
                  <span className="font-bold text-slate-800">4.9</span> (2k reviews)
                </p>
                <p className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  98% response rate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-1 rounded-lg border-2 border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                <span className="material-symbols-outlined text-base">chat</span>
                Chat with Seller
              </button>
              <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                Follow
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vouchers.map((voucher) => (
          <article key={voucher.title} className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
            <p className="text-2xl font-extrabold text-slate-900">{voucher.title}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{voucher.subtitle}</p>
            <button className="mt-4 w-full rounded-lg bg-slate-900 py-1.5 text-xs font-bold text-white">{voucher.cta}</button>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden space-y-6 lg:block">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="material-symbols-outlined text-slate-700">filter_list</span> Filters
            </h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> Living Room</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Bedroom Decor</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Kitchen Artisans</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Sustainable Textiles</label>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h4 className="mb-4 text-lg font-bold">Customer Reviews</h4>
            <div className="space-y-3">
              {[85, 10, 3, 1].map((value, index) => (
                <div key={value} className="flex items-center gap-2">
                  <span className="w-4 text-xs font-bold">{5 - index}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full bg-slate-700" style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white">All Products</button>
              <button className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">New Arrivals</button>
              <button className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">Best Selling</button>
            </div>
            <select className="rounded-lg bg-white px-3 py-2 text-sm font-bold shadow-sm">
              <option>Popularity</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {storeProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                image={product.thumbnail ?? "https://via.placeholder.com/900x900?text=No+Image"}
                price={product.price}
                metaText={storeName}
                soldText={typeof product.stock === "number" ? `Stock ${product.stock}` : undefined}
                href={`/products/${product.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Artisans in the Wild</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {gallery.map((image, index) => (
            <div key={image} className="aspect-square overflow-hidden rounded-xl">
              <img src={image} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
