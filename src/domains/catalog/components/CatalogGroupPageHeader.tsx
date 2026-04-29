type CatalogGroupPageHeaderProps = {
  title: string;
  description?: string | null;
  eyebrow?: string;
};

export function CatalogGroupPageHeader({
  title,
  description,
  eyebrow = "Catalog Groups",
}: CatalogGroupPageHeaderProps) {
  return (
    <section className="rounded-2xl bg-slate-100 px-8 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        {eyebrow}
      </p>

      <h1 className="mt-3 text-4xl font-extrabold">{title}</h1>

      {description ? (
        <p className="mt-3 max-w-2xl text-gray-500">{description}</p>
      ) : null}
    </section>
  );
}