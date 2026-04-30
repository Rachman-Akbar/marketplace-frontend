import { storeService } from "@/domains/stores/services/storeService";
import { StoreGrid } from "@/domains/stores/components/StoreGrid";

export default async function StoresPage() {
  const stores = await storeService.getStores({ all: true });

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Stores</h1>
        <p className="mt-2 text-gray-500">
          Pilih toko untuk melihat produk yang tersedia.
        </p>
      </section>

      <section className="mt-10">
        <StoreGrid stores={stores} />
      </section>
    </main>
  );
}