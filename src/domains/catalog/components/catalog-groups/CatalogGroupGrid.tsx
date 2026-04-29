import type { CatalogGroup } from "../../types";
import { mapCatalogGroupToCard } from "../../utils/catalogGroupMapper";

import { CatalogGroupCard } from "./CatalogGroupCard";

type CatalogGroupGridProps = {
  catalogGroups: CatalogGroup[];
  emptyMessage?: string;
};

export function CatalogGroupGrid({
  catalogGroups,
  emptyMessage = "Belum ada catalog group.",
}: CatalogGroupGridProps) {
  if (catalogGroups.length === 0) {
    return <p className="text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {catalogGroups.map((group) => {
        const card = mapCatalogGroupToCard(group);

        return <CatalogGroupCard key={card.id} {...card} />;
      })}
    </div>
  );
}