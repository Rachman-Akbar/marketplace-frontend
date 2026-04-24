import Link from "next/link";

type StoreCardProps = {
  name: string;
  slug: string;
  href?: string;
  logoUrl?: string | null;
};

export function StoreCard({
  name,
  slug,
  href = "/stores",
  logoUrl,
}: StoreCardProps) {
  return (
    <Link
      href={href}
      className="group block cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-3 h-16 w-16 overflow-hidden rounded-full bg-gray-100">
        <img
          src={logoUrl || "https://via.placeholder.com/200x200?text=Store"}
          alt={name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="font-semibold transition-colors group-hover:text-blue-600">
        {name}
      </div>

      <div className="mt-1 text-sm text-gray-500">{slug}</div>

      <div className="mt-3 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
        Kunjungi toko →
      </div>
    </Link>
  );
}