import type { Store } from "../types/store";
import { StoreCard } from "./StoreCard";

type StoreGridProps = {
  stores: Store[];
};

export function StoreGrid({ stores }: StoreGridProps) {
  if (stores.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Belum ada toko
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Toko akan tampil di sini setelah tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}