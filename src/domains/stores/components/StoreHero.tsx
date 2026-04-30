import type { Store } from "../types/store";

const FALLBACK_STORE_LOGO = "https://via.placeholder.com/200x200?text=Store";

type StoreHeroProps = {
  store: Store;
};

export function StoreHero({ store }: StoreHeroProps) {
  const logoUrl = store.logo_url || store.logo || FALLBACK_STORE_LOGO;

  return (
    <section className="overflow-hidden rounded-2xl border bg-white">
      {store.banner_url ? (
        <img
          src={store.banner_url}
          alt={store.name}
          className="h-64 w-full object-cover"
        />
      ) : null}

      <div className="flex items-center gap-4 p-6">
        <img
          src={logoUrl}
          alt={store.name}
          className="h-20 w-20 rounded-full object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold">{store.name}</h1>

          {store.short_description ? (
            <p className="mt-2 text-gray-500">{store.short_description}</p>
          ) : null}

          {!store.short_description && store.description ? (
            <p className="mt-2 max-w-3xl text-gray-500">{store.description}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}