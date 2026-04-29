import Link from "next/link";

import { STORE_PLACEHOLDER_IMAGE } from "../constants";
import { toStoreRoute } from "../services/catalogRoutes";

import type { Store } from "../types";

type ProductSellerCardProps = {
  store: Store;
};

export function ProductSellerCard({ store }: ProductSellerCardProps) {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-5">
      <p className="text-sm text-gray-500">Sold by</p>

      <Link
        href={toStoreRoute(store.slug)}
        className="mt-2 flex items-center gap-3 hover:text-blue-600"
      >
        <img
          src={store.logo_url || STORE_PLACEHOLDER_IMAGE}
          alt={store.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold">{store.name}</p>
          <p className="text-sm text-gray-500">@{store.slug}</p>
        </div>
      </Link>
    </div>
  );
}