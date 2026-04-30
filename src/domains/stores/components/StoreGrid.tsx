import { StoreCard } from "@/components/catalog/StoreCard";
import type { Store } from "../types/store";
import { toStoreRoute } from "../services/storeRoutes";

type StoreGridProps = {
  stores: Store[];
};

export function StoreGrid({ stores }: StoreGridProps) {
  if (stores.length === 0) {
    return <p className="text-sm text-gray-500">Belum ada toko.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          name={store.name}
          slug={store.slug}
          href={toStoreRoute(store.slug)}
          logoUrl={store.logo_url || store.logo || undefined}
        />
      ))}
    </div>
  );
}