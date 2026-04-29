import { CatalogGroupCard } from "@/components/catalog/CatalogGroupCard";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { toCatalogGroupProductsRoute } from "@/lib/catalog/catalogRoutes";
import { PLACEHOLDER_IMAGE } from "@/lib/catalog/homepageMapper";

import type { CatalogGroup } from "@/lib/catalog/types";

export function CatalogGroupsSection({
  catalogGroups,
}: {
  catalogGroups: CatalogGroup[];
}) {
  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Catalog Groups"
        description="Data catalog group dari backend"
        href="/catalog-groups"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {catalogGroups.length > 0 ? (
          catalogGroups.map((group) => (
            <CatalogGroupCard
              key={group.id}
              name={group.name}
              categoryCount={group.categories?.length ?? 0}
              href={toCatalogGroupProductsRoute(group.slug)}
              imageUrl={
                group.image_url ||
                group.cover_image_url ||
                PLACEHOLDER_IMAGE
              }
              categories={
                group.categories?.map((category) => ({
                  id: category.id,
                  name: category.name,
                })) ?? []
              }
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">Belum ada catalog groups.</p>
        )}
      </div>
    </section>
  );
}