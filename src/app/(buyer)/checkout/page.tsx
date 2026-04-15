export default function CheckoutPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Secure Checkout</h1>
        <p className="mt-2 text-slate-500">Complete your order to bring the curated collection home.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          <div className="rounded-xl bg-slate-200/55 p-7">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">1</span>
                <h2 className="text-3xl font-bold tracking-tight">Shipping Address</h2>
              </div>
              <button className="text-sm font-semibold text-emerald-700">Add New</button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <article className="rounded-xl border-2 border-emerald-700 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-start justify-between">
                  <p className="font-bold text-slate-900">Emma Richardson</p>
                  <span className="material-symbols-outlined text-emerald-700">check_circle</span>
                </div>
                <p className="text-sm leading-6 text-slate-600">742 Evergreen Terrace<br/>Springfield, IL 62704<br/>United States</p>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-emerald-700">Primary Address</p>
              </article>

              <article className="rounded-xl border border-slate-300 bg-slate-100 p-5">
                <p className="font-bold text-slate-900">Emma Richardson</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">1200 Avenue of the Americas<br/>New York, NY 10036<br/>United States</p>
              </article>
            </div>
          </div>

          <div className="rounded-xl bg-slate-200/55 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">2</span>
              <h2 className="text-3xl font-bold tracking-tight">Shipping Method</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between rounded-xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <input defaultChecked type="radio" name="ship" className="h-4 w-4 accent-emerald-700" />
                  <div>
                    <p className="font-semibold">Standard Courier</p>
                    <p className="text-xs text-slate-500">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-700">$12.00</p>
              </label>
              <label className="flex items-center justify-between rounded-xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <input type="radio" name="ship" className="h-4 w-4 accent-emerald-700" />
                  <div>
                    <p className="font-semibold">Express Premium</p>
                    <p className="text-xs text-slate-500">Guaranteed delivery: 1-2 business days</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-700">$35.00</p>
              </label>
            </div>
          </div>

          <div className="rounded-xl bg-slate-200/55 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">3</span>
              <h2 className="text-3xl font-bold tracking-tight">Payment Method</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <button className="rounded-xl border-2 border-emerald-700 bg-white py-4 font-semibold">Credit Card</button>
              <button className="rounded-xl border border-slate-300 bg-slate-100 py-4 font-semibold text-slate-500">PayPal</button>
              <button className="rounded-xl border border-slate-300 bg-slate-100 py-4 font-semibold text-slate-500">Apple Pay</button>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <input className="rounded-lg bg-slate-100 px-4 py-3 md:col-span-2" placeholder="•••• •••• •••• 4242" />
              <input className="rounded-lg bg-slate-100 px-4 py-3" placeholder="MM/YY" />
              <input className="rounded-lg bg-slate-100 px-4 py-3" placeholder="CVC / CVV" />
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm lg:col-span-4">
          <h2 className="text-3xl font-bold tracking-tight">Order Summary</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-2">
              <img className="h-16 w-16 rounded-md object-cover" src="https://images.unsplash.com/photo-1616628182509-6f6f58f7f0d7?w=400&q=80&auto=format&fit=crop" alt="item" />
              <div>
                <p className="text-sm font-semibold">Minimalist Obsidian Sculpture</p>
                <p className="text-xs text-slate-500">Edition: 1 of 50</p>
                <p className="text-sm font-bold text-emerald-700">$420.00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-2">
              <img className="h-16 w-16 rounded-md object-cover" src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80&auto=format&fit=crop" alt="item" />
              <div>
                <p className="text-sm font-semibold">Hand-woven Silk Tapestry</p>
                <p className="text-xs text-slate-500">Large / Natural Dye</p>
                <p className="text-sm font-bold text-emerald-700">$1,250.00</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>$1,670.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>$12.00</span></div>
            <div className="flex justify-between"><span>Estimated Tax</span><span>$133.60</span></div>
          </div>

          <p className="mt-5 text-right text-xs text-slate-400">Including VAT</p>
          <p className="text-5xl font-extrabold text-emerald-700">$1,815.60</p>
          <button className="mt-6 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white">Place Order</button>
          <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-400">Secure • 30-day returns</p>
        </aside>
      </div>
    </div>
  );
}
