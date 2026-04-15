import { ProductCard } from "@/components/ui/ProductCard";
import { productCards } from "@/lib/mock-data";

export default function SearchPage() {
  return (
    <div className="grid gap-8 lg:grid-cols">

      <section>
        <div className="mb-8 flex items-end justify-between">
          <select className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold">
            <option>Popularity</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productCards.map((item) => (
            <ProductCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
