import { catalogService } from "@/lib/catalogService";
import { StoreCard } from "@/components/ui/StoreCard";
import { toStoreRoute } from "@/lib/catalogRoutes";

export default async function StoresPage() {
  const stores: any = await catalogService.getStores();
  const storeList = Array.isArray(stores) ? stores : [];

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Stores</h1>
        <p className="mt-2 text-gray-500">
          Pilih toko untuk melihat produk yang tersedia.
        </p>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {storeList.length > 0 ? (
            storeList.map((store: any) => (
              <StoreCard
                key={store.id}
                name={store.name}
                slug={store.slug}
                href={toStoreRoute(store.slug)}
                logoUrl={store.logo_url}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada toko.</p>
          )}
        </div>
      </section>
    </main>
  );
}