import type { Category } from "../../types";
import { mapCategoryToCard } from "../../utils/categoryMapper";
import { CategoryCard } from "./CategoryCard";

type CategoryGridProps = {
  categories: Category[];
  emptyMessage?: string;
};

export function CategoryGrid({
  categories,
  emptyMessage = "Belum ada kategori.",
}: CategoryGridProps) {
  if (categories.length === 0) {
    return <p className="text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => {
        const card = mapCategoryToCard(category);

        return <CategoryCard key={card.id} {...card} />;
      })}
    </div>
  );
}