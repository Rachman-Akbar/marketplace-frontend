import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalogService";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import {
  toProductRoute,
  toCategoryProductsRoute,
} from "@/lib/catalogRoutes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_RANDOM_PRODUCTS = 24;

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    "/images/placeholder.svg"
  );
}

function resolveCategoryImage(category: any) {
  return (
    category?.image_url ||
    category?.cover_image_url ||
    "/images/placeholder.svg"
  );
}

function normalizeList(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function shuffleItems<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueById(items: any[]) {
  const map = new Map<number | string, any>();

  for (const item of items) {
    if (item?.id) {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values());
}

function filterCategoriesByCatalogGroup(
  categories: any[],
  group: any,
  slug: string,
) {
  return categories.filter((category) => {
    return (
      category?.catalog_group_id === group?.id ||
      category?.catalogGroupId === group?.id ||
      category?.catalog_group?.id === group?.id ||
      category?.catalog_group?.slug === slug ||
      category?.catalogGroup?.slug === slug
    );
  });
}

function filterProductsByCatalogGroup(
  products: any[],
  group: any,
  categories: any[],
  slug: string,
) {
  const categoryIds = new Set(categories.map((category) => category.id));
  const categorySlugs = new Set(categories.map((category) => category.slug));

  return products.filter((product) => {
    return (
      product?.catalog_group_id === group?.id ||
      product?.catalog_group?.id === group?.id ||
      product?.catalog_group?.slug === slug ||
      product?.catalogGroup?.slug === slug ||
      product?.category?.catalog_group_id === group?.id ||
      product?.category?.catalog_group?.slug === slug ||
      categoryIds.has(product?.category_id) ||
      categoryIds.has(product?.category?.id) ||
      categorySlugs.has(product?.category?.slug)
    );
  });
}

async function getAllCategoriesForGroup(group: any, slug: string) {
  const groupCategories = normalizeList(group?.categories);

  const allCategoriesResult = await Promise.allSettled([
    catalogService.getCategories(),
  ]);

  if (allCategoriesResult[0].status !== "fulfilled") {
    return uniqueById(groupCategories);
  }

  const allCategories = normalizeList(allCategoriesResult[0].value);

  const filteredCategories = filterCategoriesByCatalogGroup(
    allCategories,
    group,
    slug,
  );

  return uniqueById([...groupCategories, ...filteredCategories]);
}

async function getProductsForCatalogGroup(
  slug: string,
  group: any,
  categories: any[],
) {
  const directResult = await Promise.allSettled([
    catalogService.getProductsByCatalogGroupSlug(slug),
  ]);

  if (directResult[0].status === "fulfilled") {
    const directProducts = normalizeList(directResult[0].value);

    if (directProducts.length > 0) {
      return shuffleItems(uniqueById(directProducts));
    }
  }

  const categoryProductResults = await Promise.allSettled(
    categories.map((category) =>
      catalogService.getProductsByCategorySlug(category.slug),
    ),
  );

  const categoryProducts = categoryProductResults.flatMap((result) => {
    if (result.status !== "fulfilled") return [];
    return normalizeList(result.value);
  });

  if (categoryProducts.length > 0) {
    return shuffleItems(uniqueById(categoryProducts));
  }

  const allProducts = normalizeList(await catalogService.getProducts());

  return shuffleItems(
    uniqueById(
      filterProductsByCatalogGroup(allProducts, group, categories, slug),
    ),
  );
}

export default async function CatalogGroupDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const group: any = await catalogService.getCatalogGroupBySlug(slug);

    if (!group || Array.isArray(group)) {
      notFound();
    }

    const categories = await getAllCategoriesForGroup(group, slug);

    const products = await getProductsForCatalogGroup(
      slug,
      group,
      categories,
    );

    const randomProducts = products.slice(0, MAX_RANDOM_PRODUCTS);

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <section className="rounded-2xl bg-slate-100 px-8 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Catalog Group
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">{group.name}</h1>

          {group.description ? (
            <p className="mt-3 max-w-2xl text-gray-500">
              {group.description}
            </p>
          ) : null}
        </section>

        <section className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Categories</h2>
            <p className="text-sm text-gray-500">
              Semua kategori dalam catalog group ini.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.length > 0 ? (
              categories.map((category: any) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  itemCount={category.products_count ?? 0}
                  href={toCategoryProductsRoute(category.slug)}
                  imageUrl={resolveCategoryImage(category)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada kategori dalam catalog group ini.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Random Products</h2>
            <p className="text-sm text-gray-500">
              Produk acak dari kategori dalam catalog group ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {randomProducts.length > 0 ? (
              randomProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={resolveProductImage(product)}
                  price={Number(product.price)}
                  metaText={product.category?.name ?? product.store?.name ?? ""}
                  soldText={
                    typeof product.stock === "number"
                      ? `Stock ${product.stock}`
                      : undefined
                  }
                  href={toProductRoute(product.slug)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada produk untuk catalog group ini.
              </p>
            )}
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Catalog group detail error:", error);
    notFound();
  }
}