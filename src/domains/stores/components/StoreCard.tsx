import Link from "next/link";

import type { Store } from "../types/store";
import { toStoreRoute } from "../services/storeRoutes";

type StoreCardProps = {
  store?: Store | null;
  productCount?: number;
};

const FALLBACK_STORE_LOGO = "/images/store-placeholder.png";

export function StoreCard({ store, productCount }: StoreCardProps) {
  if (!store) {
    return null;
  }

  const location = [store.city, store.province, store.address]
    .filter(Boolean)
    .join(", ");

  const description =
    store.short_description || store.description || "Belum ada deskripsi toko.";

  const logo = store.logo || FALLBACK_STORE_LOGO;

  return (
    <Link
      href={toStoreRoute(store.slug)}
      className="block rounded-2xl border bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex gap-4">
        <img
          src={logo}
          alt={store.name}
          className="h-16 w-16 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {store.name}
          </h3>

          {location ? (
            <p className="mt-1 line-clamp-1 text-sm text-gray-500">
              {location}
            </p>
          ) : null}

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {description}
          </p>

          {typeof productCount === "number" ? (
            <p className="mt-3 text-xs text-gray-500">
              {productCount} produk
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}