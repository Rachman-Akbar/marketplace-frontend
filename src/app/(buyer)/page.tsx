import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { BannerCard } from "@/components/ui/BannerCard";
import { CatalogGroupCard } from "@/components/ui/CatalogGroupCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { StoreCard } from "@/components/ui/StoreCard";
import { catalogService } from "@/lib/catalogService";
import {
  toBannerRoute,
  toProductRoute,
  toCategoryProductsRoute,
  toCatalogGroupProductsRoute,
  toStoreRoute,
} from "@/lib/catalogRoutes";
import { logApiError } from "@/lib/logApiError";

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

function placeholderImage(label: string, width = 600, height = 600) {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F1F5F9"/>
      <rect x="${width * 0.2}" y="${height * 0.2}" width="${width * 0.6}" height="${height * 0.45}" rx="24" fill="#CBD5E1"/>
      <text x="50%" y="72%" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#64748B">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function resolveImage(product: Product) {
  return (
    product.thumbnail ??
    product.images?.find((img) => img.is_primary)?.image_url ??
    product.images?.[0]?.image_url ??
    placeholderImage("No Image")
  );
}

function SectionHeader({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <Link
        href={href}
        className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
      >
        View all →
      </Link>
    </div>
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
    const results = await Promise.allSettled([
      catalogService.getBanners(),
      catalogService.getProducts(),
      catalogService.getCategories(),
      catalogService.getCatalogGroups(),
      catalogService.getStores(),
    ]);

    const [
      bannersResult,
      productsResult,
      categoriesResult,
      catalogGroupsResult,
      storesResult,
    ] = results;

    if (bannersResult.status === "fulfilled") {
      banners = bannersResult.value as Banner[];
    } else {
      logApiError("getBanners failed:", bannersResult.reason);
    }

    if (productsResult.status === "fulfilled") {
      products = productsResult.value as Product[];
    } else {
      logApiError("getProducts failed:", productsResult.reason);
    }

    if (categoriesResult.status === "fulfilled") {
      categories = categoriesResult.value as Category[];
    } else {
      logApiError("getCategories failed:", categoriesResult.reason);
    }

    if (catalogGroupsResult.status === "fulfilled") {
      catalogGroups = catalogGroupsResult.value as CatalogGroup[];
    } else {
      logApiError("getCatalogGroups failed:", catalogGroupsResult.reason);
    }

    if (storesResult.status === "fulfilled") {
      stores = storesResult.value as Store[];
    } else {
      logApiError("getStores failed:", storesResult.reason);
    }

    if (results.some((result) => result.status === "rejected")) {
      errorMessage = "Sebagian data homepage gagal diambil dari backend.";
    }
  } catch (err) {
    logApiError("Homepage fetch error:", err);
    errorMessage = "Gagal mengambil data homepage dari backend.";
  }

  const recommendedProducts = products.slice(0, 16).map((product) => ({
    id: product.id,
    title: product.name,
    image: resolveImage(product),
    price: product.price,
    metaText: product.category?.name ?? product.store?.name ?? "",
    soldText:
      typeof product.stock === "number" ? `Stock ${product.stock}` : undefined,
    href: toProductRoute(product.slug),
  }));

  return (
    <div className="space-y-16 pb-16">
      <section className="mx-auto max-w-[1440px] pt-6">
        {banners.length > 0 ? (
          <BannerCard
            title={banners[0].title}
            subtitle={banners[0].subtitle}
            imageUrl={banners[0].image_url}
            href={toBannerRoute(banners[0].link_url)}
          />
        ) : (
          <div className="rounded-2xl bg-gray-100 px-8 py-16">
            <h1 className="text-4xl font-extrabold">Buyer Homepage</h1>
            <p className="mt-3 text-gray-600">
              Data homepage ditampilkan dari backend catalog API.
            </p>
          </div>
        )}
      </section>

      {errorMessage ? (
        <section className="mx-auto max-w-[1440px]">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1440px] space-y-6">
        <SectionHeader
          title="Catalog Groups"
          description="Data catalog group dari backend"
          href="/catalog-groups"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {catalogGroups.length > 0 ? (
            catalogGroups.slice(0, 8).map((group) => (
              <CatalogGroupCard
                key={group.id}
                name={group.name}
                categoryCount={group.categories?.length ?? 0}
                href={toCatalogGroupProductsRoute(group.slug)}
                imageUrl={
                  group.image_url ||
                  group.cover_image_url ||
                  placeholderImage("Group", 600, 400)
                }
                categories={
                  group.categories?.map((category) => ({
                    id: category.id,
                    name: category.name,
                  })) ?? []
                }
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada catalog groups.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-6">
        <SectionHeader
          title="Categories"
          description="Data kategori dari backend"
          href="/categories"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.length > 0 ? (
            categories.slice(0, 8).map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                itemCount={category.products_count ?? 0}
                href={toCategoryProductsRoute(category.slug)}
                imageUrl={
                  category.image_url ||
                  category.cover_image_url ||
                  placeholderImage("Category", 900, 1200)
                }
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada categories.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-6">
        <SectionHeader
          title="Recommended Products"
          description="Produk ditampilkan dari endpoint products"
          href="/products"
        />

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

      <section className="mx-auto max-w-[1440px] space-y-6">
        <SectionHeader
          title="Stores"
          description="Toko yang tersedia dari backend"
          href="/stores"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stores.length > 0 ? (
            stores.slice(0, 8).map((store) => (
              <StoreCard
                key={store.id}
                name={store.name}
                slug={store.slug}
                href={toStoreRoute(store.slug)}
                logoUrl={store.logo_url || placeholderImage("Store", 200, 200)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada stores.</p>
          )}
        </div>
      </section>
    </div>
  );
}