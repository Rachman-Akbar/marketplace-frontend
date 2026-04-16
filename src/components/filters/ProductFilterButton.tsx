"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

type CategoryOption = {
  name: string;
  slug: string;
};

type ProductFilterButtonProps = {
  categories: CategoryOption[];
  currentCategories?: string[];
  currentSort?: string;
};

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
] as const;

export function ProductFilterButton({
  categories,
  currentCategories = [],
  currentSort = "popularity",
}: ProductFilterButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentCategories);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    count += selectedCategories.length;

    if (selectedSort && selectedSort !== "popularity") {
      count += 1;
    }

    return count;
  }, [selectedCategories, selectedSort]);

  function openModal() {
    setSelectedCategories(currentCategories);
    setSelectedSort(currentSort || "popularity");
    setIsOpen(true);
  }

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }

      return [...prev, slug];
    });
  }

  function applyFilters() {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      nextParams.set("categories", selectedCategories.join(","));
    } else {
      nextParams.delete("categories");
    }

    // Remove legacy single-category query after applying new multi-select format.
    nextParams.delete("category");

    if (selectedSort && selectedSort !== "popularity") {
      nextParams.set("sort", selectedSort);
    } else {
      nextParams.delete("sort");
    }

    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedSort("popularity");
  }

  return (
    <>
      <Button variant="outline" size="md" onClick={openModal}>
        Filter
        {activeFilterCount > 0 ? (
          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
            {activeFilterCount}
          </span>
        ) : null}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/45 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Filter Products</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close filter modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isActive = selectedCategories.includes(category.slug);

                    return (
                      <button
                        key={category.slug}
                        type="button"
                        onClick={() => toggleCategory(category.slug)}
                        className={
                          isActive
                            ? "rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                            : "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                        }
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedSort(option.value)}
                      className={
                        selectedSort === option.value
                          ? "rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                          : "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button variant="ghost" type="button" onClick={resetFilters} className="w-full">
                Reset
              </Button>
              <Button type="button" onClick={applyFilters} className="w-full">
                Apply
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
