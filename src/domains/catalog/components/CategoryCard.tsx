import Link from "next/link";

type CategoryCardProps = {
  name: string;
  itemCount: number;
  imageUrl: string;
  href: string;
};

export function CategoryCard({
  name,
  itemCount,
  imageUrl,
  href,
}: CategoryCardProps) {
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

      <div className="p-4">
        <h3 className="font-bold text-slate-900">{name}</h3>

        <p className="mt-1 text-sm text-slate-500">
          {itemCount} products
        </p>
      </div>
    </Link>
  );
}