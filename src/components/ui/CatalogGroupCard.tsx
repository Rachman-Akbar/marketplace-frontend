import Link from "next/link";

type CatalogGroupCardProps = {
  name: string;
  categoryCount: number;
  href?: string;
  imageUrl?: string | null;
  categories?: { id: number; name: string }[];
};

export function CatalogGroupCard({
  name,
  categoryCount,
  href = "/products",
  imageUrl,
  categories = [],
}: CatalogGroupCardProps) {
  return (
    <Link
      href={href}
      className="group block cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl || "https://via.placeholder.com/600x400?text=Group"}
          alt={name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold transition-colors group-hover:text-blue-600">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {categoryCount} categories
        </p>

        {categories.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 3).map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {category.name}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
          Lihat produk →
        </div>
      </div>
    </Link>
  );
}