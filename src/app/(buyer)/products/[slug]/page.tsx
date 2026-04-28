import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalog/catalogService";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function resolveProductImage(product: any) {
  return (
    product?.thumbnail ||
    product?.images?.find((img: any) => img.is_primary)?.image_url ||
    product?.images?.[0]?.image_url ||
    "https://via.placeholder.com/800x800?text=No+Image"
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price ?? 0);
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    console.error("PRODUCT DETAIL ERROR: slug is undefined");
    notFound();
  }

  let product: any = null;

  try {
    product = await catalogService.getProductBySlug(slug);
  } catch (error: any) {
    console.error("PRODUCT DETAIL FETCH ERROR:", {
      slug,
      url: error?.response?.config?.url,
      baseURL: error?.response?.config?.baseURL,
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    return (
      <main className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-2xl font-bold text-red-700">
            Gagal memuat product detail
          </h1>

          <p className="mt-3 text-sm text-red-600">
            Slug: <strong>{slug}</strong>
          </p>

          <p className="mt-2 text-sm text-red-600">
            Status: <strong>{error?.response?.status ?? "Unknown"}</strong>
          </p>

          <p className="mt-2 text-sm text-red-600">
            Endpoint:{" "}
            <strong>
              {error?.response?.config?.baseURL}
              {error?.response?.config?.url}
            </strong>
          </p>

          <pre className="mt-4 overflow-auto rounded-xl bg-white p-4 text-xs text-red-700">
            {JSON.stringify(error?.response?.data ?? error?.message, null, 2)}
          </pre>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Kembali ke Products
          </Link>
        </div>
      </main>
    );
  }

  if (!product || Array.isArray(product)) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <Link
        href="/products"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Kembali ke Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={resolveProductImage(product)}
              alt={product.name}
              className="h-full max-h-[620px] w-full object-cover"
            />
          </div>

          {Array.isArray(product.images) && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image: any) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-xl border bg-gray-100"
                >
                  <img
                    src={image.image_url}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <p className="text-sm text-gray-500">
            {product.category?.name ?? "No Category"} •{" "}
            {product.store?.name ?? "No Store"}
          </p>

          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-bold">
            {formatPrice(Number(product.price))}
          </p>

          {typeof product.stock === "number" && (
            <p className="mt-2 text-sm text-gray-500">
              Stock: {product.stock}
            </p>
          )}

          {product.status && (
            <p className="mt-2 text-sm text-gray-500">
              Status: {product.status}
            </p>
          )}

          {product.description && (
            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>
          )}

          {product.store && (
            <div className="mt-8 rounded-2xl border bg-white p-5">
              <p className="text-sm text-gray-500">Sold by</p>

              <Link
                href={`/stores/${product.store.slug}`}
                className="mt-2 flex items-center gap-3 hover:text-blue-600"
              >
                <img
                  src={
                    product.store.logo_url ||
                    "https://via.placeholder.com/120x120?text=Store"
                  }
                  alt={product.store.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold">{product.store.name}</p>
                  <p className="text-sm text-gray-500">
                    @{product.store.slug}
                  </p>
                </div>
              </Link>
            </div>
          )}

          <button className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto">
            Tambah ke Keranjang
          </button>
        </section>
      </div>
    </main>
  );
}