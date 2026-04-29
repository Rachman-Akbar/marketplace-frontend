import { StoreCard } from "@/components/catalog/StoreCard";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { toStoreRoute } from "@/lib/catalog/catalogRoutes";
import { PLACEHOLDER_IMAGE } from "@/lib/catalog/homepageMapper";

import type { Store } from "@/lib/catalog/types";

export function StoresSection({ stores }: { stores: Store[] }) {
  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Stores"
        description="Toko yang tersedia dari backend"
        href="/stores"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreCard
              key={store.id}
              name={store.name}
              slug={store.slug}
              href={toStoreRoute(store.slug)}
              logoUrl={store.logo_url || PLACEHOLDER_IMAGE}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">Belum ada stores.</p>
        )}
      </div>
    </section>
  );
}