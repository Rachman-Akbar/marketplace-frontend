import {
  CatalogGroupGrid,
  CatalogGroupPageHeader,
  catalogGroupService,
} from "@/domains/catalog";

export default async function CatalogGroupsPage() {
  const catalogGroups = await catalogGroupService.getAllCatalogGroups();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <CatalogGroupPageHeader
        title="Catalog Groups"
        description="Semua catalog group dari backend catalog API."
      />

      <section className="mt-10">
        <CatalogGroupGrid catalogGroups={catalogGroups} />
      </section>
    </main>
  );
}