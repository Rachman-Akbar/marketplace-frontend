import { ProductCard } from "@/components/ui/ProductCard";
import { api } from "@/lib/api";

type Category = {
  id: number;
  name: string;
  slug: string;
  products_count?: number;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock?: number;
  category?: {
    name?: string;
  };
  thumbnail?: string | null;
  images?: Array<{
    image_url?: string | null;
    url?: string | null;
    is_primary?: boolean;
  }>;
  store?: {
    name?: string;
  };
};

function resolveImage(product: Product): string {
  if (product.thumbnail) {
    return product.thumbnail;
  }

  const primary = product.images?.find((image) => image.is_primary);
  const fallback = primary ?? product.images?.[0];

  return fallback?.image_url ?? fallback?.url ?? "https://via.placeholder.com/900x900?text=No+Image";
}

const categoryImageTiles = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCbBj6xWQ9bmkB5pYDh2QJdJKebhAfKAEzN6VGZWmRvPlvDsFz7NiCAYYYB4AYoW20AiVWRxQlPGoML95gvWjnHbYIc5Jer7KaK1GGUuwF1n01Pp-o1DNkElboC4KAVV9BBui8JIapRmboVeawTYoSV7NWTl9rNG8lDLwePYQ8XDL1SUOnVM8Tftek8h-txsGjNk2QXQQUHd_r_BzyhH3FgT9mJA5iEEJrnqAfz-JTaJs_8BxlV4BE5jxG7ckWJG1k1LBd3GBAi8PU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBp-MEnNZ4yhEJZ01ROmIugzvOgITKdgHTl8zZQ0yjXS_xjhA99sSEWzgu33CYY7ixbl6lzlL8onuYk_TN1Z5jJy35AS1x8m2r3LejCvlqf367x4jLMNW-af3JvDMN_lEaOpwwkxhQi2CXXtpi7q369gTW6rhJ6IiW-BnWhh8oQ-REWKUKzrBubZBTPdo7JvGLbNaiEXB6mub_-6YTOcr7kBuia3LsBj3jj6Dr6Ri1bAPhxHb252B7GsQosSraJzkKl1totfiISfWU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBeG6fzqaxDByGBM4B37w623RZQbgRWTSwQ1tIpp81ce_F0xicfAvpl1U2KY9lkVcxW2iKoszLMwLHBu5qf7N-5SqQ49HDarPk_5GTOw0eInYbw6CzyB3NQAgPlJH7AhYFLpv3wlUklZROg2qqnRRHXmpLNn8VQpuU0b1UzrjUYa82vi6XYHrp-gUPpSniKSYR8DwnJMKl7Tqa67QbRYkI1rC1BF7T9DYIAep1uD6dCjmNF4dqpymKBh6V-GDG9IwWTa_dP7MIcvuo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXe4Boqu3wvbLbhQDsMKbYv_gk87rvPeiafIzLLsj8OZvIbKgw6g53_JGJyl9WywO92avgTwmPJWRXtOCrcEfZYDOY2OCa2iFhr6UXcXWo35yAwYTD93FvYuuFbw3djemq0KU_Idm1DJXOt6xrP1TOKIqB2VaUblS9hBjafmWuWL0cd-TOAcnOkTgldugkRl1ft6ebJqIbBqNAqS1ADySq2KH7hL8SwBcKjkI2T_REQrzbOXwDu1NsMeczjjfVmhqRVySEv6WKaQ",
];

export default async function BuyerHomePage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      fetchAPI<Product[]>("/products"),
      fetchAPI<Category[]>("/categories"),
    ]);
  } catch {
    products = [];
    categories = [];
  }

  const featuredCategories = categories.slice(0, 4);
  const recommendedProducts = products.slice(0, 16).map((product, index) => ({
    id: product.id,
    title: product.name,
    image: resolveImage(product),
    price: product.price,
    metaText: product.category?.name ?? product.store?.name ?? "",
    soldText: typeof product.stock === "number" ? `Stock ${product.stock}` : undefined,
    href: `/products/${product.slug}`,
  }));

  return (
    <div className="space-y-16">
      <section className="mx-auto max-w-[1440px]">
        <div className="relative h-[560px] overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <img
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtMteekZNTxQobdwMnX-IIKml3tJHgEQm1PZ0bWEntV5tGyy_fJGIniJ8_lS33Xyj-iVcVo_H6o64ot5-UZRNqZJ62Sn3dujiG6QVTmZ5KyUY6gjYmZyWUtOLQzE75ao1EzJYmpyylQpay7o5X7Lc201r5gdImdOQ4WoPeVUaPJSEzPb0fTG7NrL2gbFvegxzPjzQj6oin-4kL0G0d1k3hes9kW4kvXfPpFQwfgUPfJY9eT0NCvLbusFyvfeYs2gqLjb2_VTYXXeE"
            alt="Hero"
          />
          <div className="absolute left-10 top-1/2 max-w-2xl -translate-y-1/2 text-white">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">Spring Collection 2024</p>
            <h1 className="headline-serif text-6xl font-bold leading-[1.08] tracking-tight">
              Artistry in every <span className="text-emerald-300">daily essential.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-100">
              Discover a handpicked selection of artisanal products designed for the contemporary home.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold">Shop The Collection</button>
              <button className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold">View Lookbook</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">Curated Categories</h2>
            <p className="mt-1 text-slate-500">Thoughtfully organized for your lifestyle.</p>
          </div>
          <button className="flex items-center gap-2 font-bold text-emerald-700">Explore All</button>
        </div>
        <div className="grid h-[640px] grid-cols-12 gap-5">
          {["col-span-8", "col-span-4", "col-span-4", "col-span-8"].map((className, index) => (
            <div key={`category-${index}`} className={`${className} group relative overflow-hidden rounded-xl`}>
              <img className="h-full w-full object-cover" src={categoryImageTiles[index]} alt={featuredCategories[index]?.name ?? "Category"} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-extrabold tracking-tight">{featuredCategories[index]?.name ?? "Kategori"}</h3>
                <p className="text-sm text-white/80">{featuredCategories[index]?.products_count ?? 0}+ Items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-700 py-16 text-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em]">Limited Time Flash Sale</p>
            <h2 className="headline-serif text-6xl font-bold leading-tight tracking-tight">Premium design at unmissable value.</h2>
            <button className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700">Shop the Sale</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              className="rounded-xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqtPEaKmh2lQREQLnr7qZ42FFPzsBKNgmX0D_sWGrMrEQ8oqoidILOxtAZ8jU2HwfUADZKjYAlYt4h9NxMzoCEp6KrgGLkCgczhaHzcsAlr1-F0oawbDtjHbrLg2BZbTWaOkuGVTe27xd5y6s-ehA5TxaZSDyj4HKRF17Fkqql5jYbRkUiJpil1NTR9wpgmGpNAem57DIaP8wxAgPsO4J6zUxJrce-ct0Q4AO-bs9FyshgS7UCqP_0gOYhRtAnIKSQCayQHv67vOg"
              alt="Product"
            />
            <img
              className="rounded-xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjqBnm4H6KaQH_ayykYezM2QNUycmXaV3GeWCgXRBNHRFBAxCUR0aLA6ydI5VAX9o7VV6FAcWX6Vo2Y3L9QAL8RdybbsaxtsbGyMp1HIlbzrv-iv3lJebdORkr9cVHJ8hPfgKrkYlBM48HC6qaFpkN3jrKkZZKULR7L8xwWp7r6Vv6SK_TJqBlb4o1DpmANJMHiL3ynjDEzK6HEDKggt7YueVpyuOECjbD-jUv9ba1n8KsouSshitHNdEBibJsMQW87TGeq-igxYE"
              alt="Product"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight">Recommended For You</h2>
          <button className="flex items-center gap-2 font-bold text-emerald-700">Explore All</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
}
