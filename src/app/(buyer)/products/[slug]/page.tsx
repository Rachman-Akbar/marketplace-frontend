import { ProductCard } from "@/components/ui/ProductCard";
import { productCards } from "@/lib/mock-data";

export default function ProductDetailPage() {
  return (
    <div className="space-y-14">
      <div className="text-sm text-slate-500">Home &gt; Ceramics &gt; Artisanal Speckled Vessel</div>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 flex gap-4">
          <div className="hidden w-20 flex-col gap-3 md:flex">
            <img className="h-20 rounded-lg border-2 border-emerald-700 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIZ8PxtRNlguqARzCZeheNNtlQR-7pIGMHq4IinsAkNAqr9JsUPMXIETtOkEbQlRF_AMsS7uKX8fnF27-i31k6GUyNgA30Ke5X1V6HQRITMmmwbnt6GAqDmg7R6MZb6ujz0mSBYlQ-4QfxkK9_AB5SUTU0db25yEJCFYH4LnWqZKS5dZriMciq9tDoFaSJZ3vzNNfS5NBjnlzeufuoDPO3pnZUP00ceEHFU7h6N25yUjtyGC4j2TN3gXQP_Ei8NmSCOjD1-1hYCVM" alt="thumb1" />
            <img className="h-20 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtj6l4kTbGfIjHfC3fw4-qcAbqu4Zxhx9sG7wfwNpn_wdDpQbAjyoWxBP7dFXMT0tMjHjy3AJlN6myEetvXXHXayUw-LDAVMUpwM3eGHsZ24NpF2PX_heg0viTysM0fbikYwfVbMlxkHnI6W9mpgKTNgkjUy1SviAldhxfz2cjmiT96vHkEYICsZo0Bu2kw0Oe623aj8NZ0q4VxuKkRWPGT0y-xcPACRvqiNf7yOjiHF5sIyQPqEJU6hNjqYGmDCYTu1UQIgf3iaI" alt="thumb2" />
            <img className="h-20 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9a3cecX7QdZur5rPc50xNCLZgBVzIhNGQUf_efCeQZO8IMtCXpsyH1B688WjjQ6v3aauxWeKgfle0U9etdITMX_hajn5X3G58dJeHHkzhM9Okg-YsxTv7GFObjMyFo4Oib2b8a-_eGJsq08RE2onV0h_9Gbwa6FRYQwGWFPGaMqneYEhWqf4vIrk2XAGXJaQuJomfRsefx_GLeS3zffMLFHS1qOOmfAYXQELlOxPknlba14UBGaiTbFOplrLwMmdfF9iqhyHITl8" alt="thumb3" />
          </div>
          <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-100">
            <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSq80tzVgTEE677xUXjF1_GKY_rx_r9rDkCi1k9LRgcnAN7eiVC6H7zdXErwaNM-pX54EDIg9DQzEycgvMRXX-22-Q42_7aJ9cpNXI8oprn6mqY0XglZoWkAS7_ROM3JkExGhj52K4MQRBenpxT4OnA33ZQ9FZczxZ9VrcxDEc33Hd3eqEer-02aN0Ff4iqb7A_F1i-38x3ATs7TlO5My_jyz8INTnO7gOtL1XRhdpCssHFs9UjUTw41MknQmoVO_tap4HIU2t3rg" alt="product" />
          </div>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Limited Edition</p>
          <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">Artisanal Speckled Vessel</h1>
          <p className="text-sm text-slate-500">4.8 (124 reviews) | In Stock</p>
          <p className="text-5xl font-bold">$185.00</p>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-600">Color: Oatmeal Speckle</p>
            <div className="flex gap-3">
              <span className="h-10 w-10 rounded-full border-2 border-emerald-700 bg-[#e5e1da]" />
              <span className="h-10 w-10 rounded-full bg-[#4a4a48]" />
              <span className="h-10 w-10 rounded-full bg-[#d9c9b4]" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg bg-emerald-200 px-5 py-2 font-semibold text-emerald-900">Standard</button>
              <button className="rounded-lg bg-slate-200 px-5 py-2">Grand</button>
              <button className="rounded-lg bg-slate-200 px-5 py-2">Tall Slim</button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center rounded-lg bg-slate-200 px-3">
              <button className="px-2 py-3">-</button>
              <span className="px-3">1</span>
              <button className="px-2 py-3">+</button>
            </div>
            <button className="flex-1 rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Add to Cart</button>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 rounded-lg bg-slate-800 px-6 py-3 font-bold text-white">Buy Now</button>
            <button className="rounded-lg bg-slate-200 px-4 py-3">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">The Story Behind the Piece</h2>
            <p className="mb-4 leading-8 text-slate-600">
              Hand-thrown in our Portland studio, the Artisanal Speckled Vessel represents a perfect marriage of
              wabi-sabi philosophy and modern structural design.
            </p>
            <ul className="grid gap-2 text-slate-700 sm:grid-cols-2">
              <li>100% Hand-thrown stoneware</li>
              <li>Food-safe matte glaze</li>
              <li>Sustainably sourced materials</li>
              <li>Dishwasher safe</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Member Reviews</h2>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="font-semibold">Eleanor Vance</p>
              <p className="mt-2 text-slate-600">The texture is even more beautiful in person. It transformed my entryway completely.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="font-semibold">Julian Rivers</p>
              <p className="mt-2 text-slate-600">Stunning piece with premium packaging and great quality.</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Merchant Profile</p>
            <h3 className="mt-2 text-2xl font-bold">Earth and Ember</h3>
            <p className="mt-2 text-sm text-slate-600">Top rated artisan studio</p>
            <button className="mt-4 w-full rounded-lg border border-emerald-700 py-2 font-semibold text-emerald-700">Visit Studio</button>
          </div>
          <div className="rounded-xl bg-lime-100 p-6 text-sm text-lime-900">Sustainability curated Tier 1 standards.</div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight">Complete the Collection</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCards.slice(2, 6).map((item) => (
            <ProductCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
