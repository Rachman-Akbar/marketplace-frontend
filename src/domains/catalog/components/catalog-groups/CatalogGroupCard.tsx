import Link from "next/link";

type CatalogGroupCardProps = {
  name: string;
  categoryCount: number;
  href: string;
  imageUrl: string;
  categories?: {
    id: number;
    name: string;
  }[];
};

export function CatalogGroupCard({
  name,
  categoryCount,
  href,
  imageUrl,
  categories = [],
}: CatalogGroupCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-4">
        <div>
          <h3 className="font-bold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {categoryCount} categories
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
              >
                {category.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}