type ProductPageHeaderProps = {
  title: string;
  description: string;
};

export function ProductPageHeader({
  title,
  description,
}: ProductPageHeaderProps) {
  return (
    <section>
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="mt-2 text-gray-500">{description}</p>
    </section>
  );
}