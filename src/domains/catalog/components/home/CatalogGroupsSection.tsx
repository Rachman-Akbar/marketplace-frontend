import type { CatalogGroup } from "../../types";

import { CatalogGroupGrid } from "../CatalogGroupGrid";
import { SectionHeader } from "../SectionHeader";

type CatalogGroupsSectionProps = {
  catalogGroups: CatalogGroup[];
};

export function CatalogGroupsSection({
  catalogGroups,
}: CatalogGroupsSectionProps) {
  return (
    <section className="mx-auto max-w-[1440px] space-y-6">
      <SectionHeader
        title="Catalog Groups"
        description="Data catalog group dari backend"
        href="/catalog-groups"
      />

      <CatalogGroupGrid
        catalogGroups={catalogGroups}
        emptyMessage="Belum ada catalog groups."
      />
    </section>
  );
}