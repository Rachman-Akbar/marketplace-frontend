import Link from "next/link";

export default function ProductsPage() {
  const items = [
    {
      title: "Earth-Tone Ceramic Set",
      desc: "Hand-thrown stoneware with unique iron-speckled glaze.",
      price: "$120",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7hqLlVrIyTwcR7sKajPJ_00-F9Z7NPLosizIgUWvn_7cRV423T1Z_utZwC5fr19zxW6HZP5ND59aiYXPeu-CQDypuqCWfGl5J-j74V4EwauHnt357So0epUnKsxEcEaz4dXxoeLTWpBXgMA_sXQKYmv_x15_bQVtqeG0OD7xwtqZjxDMg1ilHEXBzAimMRPqqtQZGaLLjjxw7Dr_fyVONN0JHQ7_cPJQKTERDKG9bLzKEuapJXkjq22fDIuFRlOgLTqP5CSWjKmg",
    },
    {
      title: "Scandi Oak Lounge Chair",
      desc: "Sustainable solid oak frame with natural reed weaving.",
      price: "$580",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLDynDXSSzzqp2QIhvlJ1LED3FFqTAYRgpwxeu3ccsUUHt4gD7agyEzCEMJQKWIq7YGYdqjLXwtZskk8_CZvWDtZuVQ2JM1Z3TsKkPZUS2aFpqu6V2Zrp_ohuV4wKd8jXgvzB12f0ThQK6uMnR_M7zOVH3zt_mhOh7tOukr4QUYLjFJL0J9Erlb5Y4QKR_WxoDAycSD9949RIfpLeZfzN49OkYskFFqb5kkqL7DjNAfJdJ05WW8hGGkkrOXGF1xpgxK8N6ixCrSco",
    },
    {
      title: "Organic Sage Linen Throw",
      desc: "Breathable, eco-certified linen. Stone-washed for softness.",
      price: "$85",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI90c_J_fU81h8YXZmKxsRJxXeGq0NV_GwFrEo7CZ4pqgDMo2IIfKCM1K8_8Tbv-vp0wzZ6v_OHpuSddLMN_NdEjFULo6WWKT1sKTp6pLjSWJ_nWOfFRYzJZsUHgTXYAUjZhrvBdBkBtmkcyKyzpS9AGEwWn_wQGoKt1ZaQ1L_txl6osstk7c7SrpeEQ-DdU-Llw7YFEfKX2gK_fFwW43N1lEXwiTa8_ABkj83lNyyLqPQRNtgQs868LyaZAaL-5u2mn7IId0C-fQ",
    },
    {
      title: "Aged Bronze Studio Lamp",
      desc: "Hand-finished bronze with adjustable arm.",
      price: "$210",
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80&auto=format&fit=crop",
    },
    {
      title: "Walnut Culinary Set",
      desc: "5-piece set carved from a single piece of dark walnut.",
      price: "$65",
      img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=80&auto=format&fit=crop",
    },
    {
      title: "Jute Mandala Wall Art",
      desc: "Ethically sourced jute fibers woven by hand.",
      price: "$145",
      img: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="hidden rounded-xl bg-slate-200/60 p-6 lg:block">
        <h3 className="mb-4 text-2xl font-bold tracking-tight">Category</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <label className="flex items-center gap-2"><input type="checkbox" /> Art &amp; Decor</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Handcrafted Furniture</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Sustainable Textiles</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Ceramics</label>
        </div>
        <h3 className="mb-3 mt-8 text-2xl font-bold tracking-tight">Price Range</h3>
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
          {items.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-500">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="space-y-2 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-extrabold tracking-tight">{item.title}</h3>
                  <p className="font-extrabold text-emerald-700">{item.price}</p>
                </div>
                <p className="line-clamp-2 text-sm text-slate-500">{item.desc}</p>
                <Link href="/products/speckled-vessel" className="block">
                  <button className="mt-2 w-full rounded-lg bg-slate-200 py-2.5 font-semibold text-slate-700 transition hover:bg-emerald-700 hover:text-white">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
