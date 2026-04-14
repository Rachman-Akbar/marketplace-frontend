import { ProductCard } from "@/components/ui/ProductCard";
import { productCards } from "@/lib/mock-data";

export default function SearchPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-xl bg-slate-200/60 p-6">
        <h3 className="mb-4 text-2xl font-bold">Category</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <label className="flex items-center gap-2"><input type="checkbox" /> Art and Decor</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Handcrafted Furniture</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Sustainable Textiles</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Ceramics</label>
        </div>
        <h3 className="mb-3 mt-7 text-2xl font-bold">Price Range</h3>
        <input type="range" className="w-full" defaultValue={45} />
        <div className="mt-1 flex justify-between text-sm text-slate-500"><span>$0</span><span className="font-bold text-emerald-700">$450+</span><span>$1000+</span></div>
        <button className="mt-7 w-full rounded-xl bg-emerald-700 py-3 font-bold text-white">Apply Filters</button>
      </aside>

      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Search Results</p>
            <h1 className="text-5xl font-extrabold tracking-tight">Handcrafted Essentials</h1>
            <p className="mt-1 text-slate-500">248 items found matching your preference</p>
          </div>
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
