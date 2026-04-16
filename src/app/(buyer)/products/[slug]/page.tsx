import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";

type ProductImage = {
  image_url?: string | null;
  url?: string | null;
};

type ProductReview = {
  id: number;
  rating: number;
  comment?: string | null;
  created_at?: string;
  user?: {
    name?: string | null;
  };
};

type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock?: number;
  thumbnail?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  store?: {
    name: string;
    slug: string;
    logo?: string | null;
  };
  images?: ProductImage[];
  reviews?: ProductReview[];
};

type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock?: number;
  thumbnail?: string | null;
  category?: {
    name?: string;
    slug: string;
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(input?: string): string {
  if (!input) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(input));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let product: ProductDetail | null = null;
  let relatedItems: ProductListItem[] = [];

  try {
    const fetchedProduct = await fetchAPI<ProductDetail>(`/products/${slug}`);
    product = fetchedProduct;
    const allProducts = await fetchAPI<ProductListItem[]>("/products");
    relatedItems = allProducts
      .filter((item) => item.id !== fetchedProduct.id)
      .filter((item) => item.category?.slug === fetchedProduct.category?.slug)
      .slice(0, 16);
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-8 text-slate-700 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
        Produk tidak ditemukan atau API belum tersedia.
      </div>
    );
  }

  const galleryImages = [
    ...(product.images ?? []).map((item) => item.image_url || item.url).filter((url): url is string => Boolean(url)),
  ];

  const mainImage = product.thumbnail || galleryImages[0] || "https://via.placeholder.com/1200x1200?text=No+Image";
  const visibleThumbnails = [...galleryImages, mainImage].slice(0, 5);

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
      : "0.0";

  const productSpecs = [
    { label: "Kategori", value: product.category?.name ?? "-" },
    { label: "Stok", value: `${product.stock ?? 0}` },
    { label: "Store", value: product.store?.name ?? "-" },
    { label: "Slug", value: product.slug },
  ];

  const variantDetails = [
    {
      name: "Default",
      size: "-",
      capacity: "-",
      bestFor: "-",
      colors: "-",
      stock: (product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock",
    },
  ];

  const productReviews = product.reviews ?? [];

  return (
    <div className="space-y-16 rounded-2xl border border-slate-200/70 bg-white/95 p-6 pb-16 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-8">
      <nav className="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <span>Shop</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span>{product.category?.name ?? "Products"}</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-semibold text-slate-800">{product.name}</span>
      </nav>

      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100">
            <img
              alt="Main Product Image"
              className="h-full w-full object-cover"
              src={mainImage}
            />
            <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-emerald-900 opacity-0 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100">
              <span className="material-symbols-outlined text-sm">zoom_in</span>
              Click to zoom
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {visibleThumbnails.map((image, index) => (
              <button
                key={image}
                className={
                  index === 0
                    ? "aspect-square overflow-hidden rounded-lg border-2 border-emerald-600 bg-white ring-2 ring-emerald-100 ring-offset-2"
                    : "relative aspect-square overflow-hidden rounded-lg border border-transparent transition-all hover:border-emerald-300"
                }
              >
                <img
                  alt={`Thumbnail ${index + 1}`}
                  className={index === 4 ? "h-full w-full object-cover opacity-50" : "h-full w-full object-cover"}
                  src={image}
                />
                {index === 4 && galleryImages.length > 5 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-700">+{galleryImages.length - 5}</div>
                ) : null}
              </button>
            ))}
          </div>

          <section className="rounded-xl border border-slate-200 px-4 py-3 md:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-3 md:gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img
                    alt="Merchant Avatar"
                    className="h-full w-full object-cover"
                    src={product.store?.logo ?? "https://via.placeholder.com/96x96?text=Store"}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Official Artist</p>
                  <Link href={`/seller/${product.store?.slug ?? "unknown"}`} className="truncate font-bold text-slate-800 hover:text-emerald-700">
                    {product.store?.name ?? "Unknown Store"}
                  </Link>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">eco</span>
                    100% Sustainable
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">local_shipping</span>
                    Carbon Neutral Delivery
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">history_edu</span>
                    Lifetime Guarantee
                  </span>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <p>
                    <span className="font-bold text-slate-800">{avgRating}</span> Rating
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">97%</span> Chat Response
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">{product.stock ?? 0}</span> Stock
                  </p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Link
                  href={`/seller/${product.store?.slug ?? "unknown"}`}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:border-emerald-700 hover:text-emerald-700"
                >
                  <span className="material-symbols-outlined text-sm">storefront</span>
                  Kunjungi Toko
                </Link>
                <button className="inline-flex items-center gap-1 rounded-full border border-emerald-700 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white">
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Chat
                </button>
                <button className="inline-flex items-center gap-1 rounded-full border border-emerald-700 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Follow
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-5">
          <section>
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded-full bg-emerald-100/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                New Arrival
              </span>
              <div className="flex items-center gap-1 text-slate-800">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold">{avgRating}</span>
                <span className="text-sm text-slate-500">({productReviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-slate-900 md:text-5xl">{product.name}</h1>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              <span className="text-slate-500 line-through">{formatPrice(product.price * 1.2)}</span>
            </div>

            <p className="text-lg leading-relaxed text-slate-600">{product.description ?? "Deskripsi produk belum tersedia."}</p>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Select Size</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center rounded-xl border-2 border-emerald-700 bg-white py-4 shadow-sm">
                <span className="font-bold text-slate-800">Standard</span>
                <span className="text-xs text-slate-500">8&quot; x 5&quot;</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-xl bg-slate-100 py-4 transition-colors hover:bg-slate-200">
                <span className="font-bold text-slate-800">Grand</span>
                <span className="text-xs text-slate-500">12&quot; x 8&quot;</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-xl bg-slate-100 py-4 transition-colors hover:bg-slate-200">
                <span className="font-bold text-slate-800">Tall Slim</span>
                <span className="text-xs text-slate-500">15&quot; x 4&quot;</span>
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <button className="w-full rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-800 py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
              Buy It Now
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-200 py-5 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-300">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Voucher Toko</h3>
              <button className="text-xs font-bold text-emerald-700 hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                <div>
                  <p className="text-sm font-bold text-slate-800">Produk tersedia: {product.stock ?? 0}</p>
                  <p className="text-xs text-slate-500">Kategori: {product.category?.name ?? "-"}</p>
                </div>
                <button className="rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">Klaim</button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                <div>
                  <p className="text-sm font-bold text-slate-800">Store: {product.store?.name ?? "-"}</p>
                  <p className="text-xs text-slate-500">Slug: {product.slug}</p>
                </div>
                <button className="rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">Klaim</button>
              </div>
            </div>
          </section>

        </div>
      </section>

      <section className="space-y-10 rounded-2xl border border-slate-200 p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Product Specification</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Detailed Specification</h2>
          </div>

          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {productSpecs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 gap-1 px-4 py-3 md:grid-cols-[180px_1fr] md:gap-4">
                <p className="text-sm font-semibold text-slate-700">{spec.label}</p>
                <p className="text-sm text-slate-600">{spec.value}</p>
              </div>
            ))}
          </div>
          </div>

          <div className="md:col-span-5">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Available Variants</span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Variant Details</h3>
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
              {variantDetails.map((variant) => (
                <article key={variant.name} className="px-4 py-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-800">{variant.name}</h4>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">{variant.stock}</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">Size:</span> {variant.size}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Capacity:</span> {variant.capacity}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Best For:</span> {variant.bestFor}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Color Options:</span> {variant.colors}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Ulasan Produk</span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Review Pembeli</h3>
            </div>
            <button className="text-sm font-bold text-emerald-700 hover:underline">Lihat Semua Ulasan</button>
          </div>

          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {productReviews.map((review) => (
              <article key={review.id} className="space-y-2 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{review.user?.name ?? "User"}</p>
                    <p className="text-xs text-slate-500">Rating {review.rating}/5</p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">{formatDate(review.created_at)}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`${review.id}-star-${index}`} className="material-symbols-outlined text-base">
                      {index < review.rating ? "star" : "star_outline"}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{review.comment ?? "-"}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">The Ensemble</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter md:text-4xl">Complete the Collection</h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-emerald-700 transition-all hover:gap-4">
            View Full Series
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {relatedItems.map((item, index) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.name}
              image={item.thumbnail ?? "https://via.placeholder.com/500x700?text=No+Image"}
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
