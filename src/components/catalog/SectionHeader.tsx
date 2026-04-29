import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  description: string;
  href: string;
};

export function SectionHeader({
  title,
  description,
  href,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <Link
        href={href}
        className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
      >
        View all →
      </Link>
    </div>
  );
}