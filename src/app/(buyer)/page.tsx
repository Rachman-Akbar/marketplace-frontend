import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { catalogService } from "@/lib/catalogService";

type Banner = {
  id: number;
  title: string;
  subtitle?: string | null;
  image_url: string;
  mobile_image_url?: string | null;
  link_url?: string | null;
  is_active: boolean;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
  products_count?: number | null;
  catalog_group_id?: number | null;
};

type CatalogGroup = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
  categories?: Category[];
};

type Store = {
  id: number;
  name: string;
  slug: string;
  logo_url?: string | null;
  banner_url?: string | null;
  short_description?: string | null;
  is_active?: boolean;
};

type ProductImage = {
  id: number;
  image_url?: string | null;
  is_primary?: boolean;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock?: number;
  thumbnail?: string | null;
  status?: string;
  category_id?: number | null;
  store_id?: number | null;
  seller_id?: string | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
    image_url?: string | null;
  } | null;
  store?: {
    id?: number;
    name?: string;
    slug?: string;
    logo_url?: string | null;
  } | null;
  images?: ProductImage[];
};

function resolveImage(product: Product) {
  return (
    product.thumbnail ??
    product.images?.find((img) => img.is_primary)?.image_url ??
    product.images?.[0]?.image_url ??
    "https://via.placeholder.com/600x600?text=No+Image"
  );
}

export default async function BuyerHomePage() {
  let banners: Banner[] = [];
  let products: Product[] = [];
  let categories: Category[] = [];
  let catalogGroups: CatalogGroup[] = [];
  let stores: Store[] = [];
  let errorMessage = "";

  try {
    [banners, products, categories, catalogGroups, stores] = await Promise.all([
      catalogService.getBanners(),
      catalogService.getProducts(),
      catalogService.getCategories(),
      catalogService.getCatalogGroups(),
      catalogService.getStores(),
    ]);
  } catch (err: any) {
    console.error("Homepage fetch error:", {
      url: err?.response?.config?.url,
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });

    errorMessage =
      err?.response?.data?.message || "Gagal memuat data homepage";
  }

  const recommendedProducts = products.slice(0, 16).map((product) => ({
    id: product.id,
    title: product.name,
    image: resolveImage(product),
    price: product.price,
    metaText: product.category?.name ?? product.store?.name ?? "",
    soldText:
      typeof product.stock === "number" ? `Stock ${product.stock}` : undefined,
    href: `/products/${product.slug}`,
  }));

  return (
    <div className="space-y-16 pb-16">
      {/* BANNER */}
      <section className="mx-auto max-w-[1440px] pt-6">
        {banners.length > 0 ? (
          <Link
            href={banners[0].link_url || "#"}
            className="group block overflow-hidden rounded-2xl"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={banners[0].image_url}
                alt={banners[0].title ?? "Banner"}
                className="h-[260px] w-full object-cover transition duration-500 ease-out group-hover:scale-105 md:h-[420px] xl:h-[560px]"
              />
            </div>
          </Link>
        ) : (
          <div className="rounded-2xl bg-gray-100 px-8 py-16">
            <h1 className="text-4xl font-extrabold">Buyer Homepage</h1>
            <p className="mt-3 text-gray-600">
              Data homepage ditampilkan dari backend catalog API.
            </p>
          </div>
        )}
      </section>

      {/* ERROR */}
      {errorMessage && (
        <section className="mx-auto max-w-[1440px]">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        </section>
      )}

      {/* CATALOG GROUPS */}
      <section className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Catalog Groups</h2>
          <p className="text-sm text-gray-500">
            Data katalog group dari backend
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {catalogGroups.length > 0 ? (
            catalogGroups.map((group) => (
              <Link
                key={group.id}
                href={`/catalog-groups/${group.slug}`}
                className="group block cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={
                      group.image_url ||
                      group.cover_image_url ||
                      "https://via.placeholder.com/600x400?text=Group"
                    }
                    alt={group.name}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-bold transition-colors group-hover:text-blue-600">
                    {group.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {group.categories?.length ?? 0} categories
                  </p>

                  {group.categories?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.categories.slice(0, 3).map((category) => (
                        <span
                          key={category.id}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
                    Lihat detail →
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada catalog groups.</p>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Categories</h2>
          <p className="text-sm text-gray-500">Data kategori dari backend</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={
                      category.image_url ||
                      category.cover_image_url ||
                      "https://via.placeholder.com/500x500?text=Category"
                    }
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <div className="font-semibold transition-colors group-hover:text-blue-600">
                    {category.name}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {category.slug}
                  </div>

                  {typeof category.products_count === "number" && (
                    <div className="mt-2 text-xs text-gray-400">
                      {category.products_count} products
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada categories.</p>
          )}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Recommended Products</h2>
          <p className="text-sm text-gray-500">
            Produk ditampilkan dari endpoint products
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada product.</p>
          )}
        </div>
      </section>

      {/* STORES */}
      <section className="mx-auto max-w-[1440px] space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Stores</h2>
          <p className="text-sm text-gray-500">
            Toko yang tersedia dari backend
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stores.length > 0 ? (
            stores.slice(0, 8).map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.slug}`}
                className="group block cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-3 h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                  <img
                    src={
                      store.logo_url ||
                      "https://via.placeholder.com/200x200?text=Store"
                    }
                    alt={store.name}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="font-semibold transition-colors group-hover:text-blue-600">
                  {store.name}
                </div>
                <div className="mt-1 text-sm text-gray-500">{store.slug}</div>

                <div className="mt-3 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
                  Kunjungi toko →
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada stores.</p>
          )}
        </div>
      </section>
    </div>
  );
}