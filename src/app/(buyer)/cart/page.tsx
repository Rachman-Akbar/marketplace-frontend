export default function CartPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <section className="space-y-5 lg:col-span-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <img className="h-28 w-28 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd0I3Eao7oicd53MD0FkiF4Spksmusf2eaigqbHVn9okWDqYapzAXsXw3x_3QR94ZM91jDWCoqLNSrZuEyWx_aUVg2_JKbVgTYh2By4HSFAWLDvWL7oMj3Ky81JBEPKsGGE2noCefwyV4dgddBiM1G3KvTcFU5NivSpC4Vg_PFPKoi34Pgj4s_DZ9ObzNltNHL3CzHFN8dS5J6qvNaS0lyKmka5r4zRhtnOQ5SHW4YNTG2vl5Z7lqM7TWlE9EYkU52W5ePVLnpXnQ" alt="item1" />
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Limited Edition</p>
              <h3 className="text-3xl font-bold tracking-tight">Organique Terracotta Vessel</h3>
              <p className="text-sm text-slate-500">Size: Large • Color: Desert Sand</p>
            </div>
            <p className="text-3xl font-bold">$285.00</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <img className="h-28 w-28 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0V574jNjCC-JUjDUoPxetFeQICrtN1UI-wRweEqnOhZp6BWzNnK0EhSr5ftxvtcqRa8bWGZzQJyYP9ptgB1Yx9r2tqKCB4aHxMZFgdN-5qLLbteWBchXnr79Qxsr9yqkP6Gl2cWDeJtC-VnPak-2wOE_iAK7s4k2iLs9dvzltpcU94RlNRud-TFIADdWLRARdj56tjY45V3glmKFy37SvFickHElz1_udxaAuq6hU9oKXEiwo2VXFbv79sfxTMuPt8kl-JUIW078" alt="item2" />
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Bestseller</p>
              <h3 className="text-3xl font-bold tracking-tight">Brutalist Concrete Lamp</h3>
              <p className="text-sm text-slate-500">Finish: Raw Industrial • Bulb: Warm 2700K</p>
            </div>
            <p className="text-3xl font-bold">$420.00</p>
          </div>
        </div>

        <button className="mt-3 flex items-center gap-2 font-semibold text-emerald-700">
          <span className="material-symbols-outlined">arrow_back</span>
          Continue Browsing The Gallery
        </button>
      </section>

      <aside className="h-fit rounded-xl bg-slate-300/40 p-8 lg:col-span-4">
        <h2 className="text-4xl font-extrabold tracking-tight">Order Summary</h2>
        <div className="mt-5 space-y-2 text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>$705.00</span></div>
          <div className="flex justify-between"><span>Shipping (Standard)</span><span className="font-bold text-emerald-700">Complimentary</span></div>
          <div className="flex justify-between"><span>Estimated Tax</span><span>$56.40</span></div>
        </div>
        <div className="mt-5 text-5xl font-extrabold text-emerald-700">$761.40</div>
        <div className="mt-5 flex gap-2">
          <input className="w-full rounded-lg bg-white px-3 py-2" placeholder="CANVAS20" />
          <button className="rounded-lg bg-slate-600 px-4 py-2 font-bold text-white">Apply</button>
        </div>
        <button className="mt-5 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white">Proceed to Checkout</button>
      </aside>
    </div>
  );
}
