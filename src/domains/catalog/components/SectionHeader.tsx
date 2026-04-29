import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeader({
  title,
  description,
  href,
  actionLabel = "View all →",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>

        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}