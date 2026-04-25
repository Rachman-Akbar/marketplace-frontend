import { catalogService } from "@/lib/catalogService";
import { CatalogGroupCard } from "@/components/ui/CatalogGroupCard";
import { toCatalogGroupProductsRoute } from "@/lib/catalogRoutes";

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

function resolveCatalogGroupImage(group: any) {
  return (
    group?.image_url ||
    group?.cover_image_url ||
    PLACEHOLDER_IMAGE
  );
}

export default async function CatalogGroupsPage() {
  const catalogGroups: any[] = await catalogService.getCatalogGroups();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Catalog Groups</h1>
        <p className="mt-2 text-gray-500">
          Semua catalog group dari backend catalog API.
        </p>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {catalogGroups.length > 0 ? (
            catalogGroups.map((group: any) => (
              <CatalogGroupCard
                key={group.id}
                name={group.name}
                categoryCount={group.categories?.length ?? 0}
                href={toCatalogGroupProductsRoute(group.slug)}
                imageUrl={resolveCatalogGroupImage(group)}
                categories={
                  group.categories?.map((category: any) => ({
                    id: category.id,
                    name: category.name,
                  })) ?? []
                }
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Belum ada catalog group.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}