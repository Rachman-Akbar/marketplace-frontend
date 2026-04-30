import Link from "next/link";
import type { Product } from "../../types";
import { toStoreRoute } from "@/domains/stores/services/storeRoutes";

type ProductSellerCardProps = {
  product: Product;
};

export function ProductSellerCard({ product }: ProductSellerCardProps) {
  const store = product.store;

  if (!store) {
    return (
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Informasi Toko</h2>
        <p className="mt-2 text-sm text-gray-500">
          Informasi toko belum tersedia.
        </p>
      </section>
    );
  }

  const logoUrl =
    store.logo_url ||
    store.logo ||
    "https://via.placeholder.com/120x120?text=Store";

  const storeIdentifier =
    store.slug || (store.id ? String(store.id) : null);

  const storeHref = storeIdentifier ? toStoreRoute(storeIdentifier) : null;

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Informasi Toko</h2>

        {storeHref ? (
          <Link
            href={storeHref}
            className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Kunjungi Toko
          </Link>
        ) : null}
      </div>

      {storeHref ? (
        <Link
          href={storeHref}
          className="mt-4 flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-50"
        >
          <img
            src={logoUrl}
            alt={store.name ?? "Store"}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{store.name ?? "Toko"}</p>
            <p className="text-sm text-gray-500">
              {store.slug ? `@${store.slug}` : "Lihat halaman toko"}
            </p>
          </div>
        </Link>
      ) : (
        <div className="mt-4 flex items-center gap-3 rounded-xl p-2">
          <img
            src={logoUrl}
            alt={store.name ?? "Store"}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{store.name ?? "Toko"}</p>
            <p className="text-sm text-gray-500">
              Halaman toko belum tersedia.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}