import { catalogService } from "@/lib/catalogService";
import { CatalogGroupCard } from "@/components/ui/CatalogGroupCard";
import { toCatalogGroupProductsRoute } from "@/lib/catalogRoutes";

export default async function CatalogGroupsPage() {
  const groups: any = await catalogService.getCatalogGroups();
  const groupList = Array.isArray(groups) ? groups : [];

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <section>
        <h1 className="text-4xl font-bold">Catalog Groups</h1>
        <p className="mt-2 text-gray-500">
          Pilih catalog group untuk melihat kategori dan produk.
        </p>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {groupList.length > 0 ? (
            groupList.map((group: any) => (
              <CatalogGroupCard
                key={group.id}
                name={group.name}
                categoryCount={group.categories?.length ?? 0}
                href={toCatalogGroupProductsRoute(group.slug)}
                imageUrl={
                  group.image_url ||
                  group.cover_image_url ||
                  "https://via.placeholder.com/600x400?text=Group"
                }
                categories={
                  group.categories?.map((category: any) => ({
                    id: category.id,
                    name: category.name,
                  })) ?? []
                }
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">Belum ada catalog group.</p>
          )}
        </div>
      </section>
    </main>
  );
}