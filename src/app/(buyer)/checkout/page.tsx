export default function CheckoutPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Secure Checkout</h1>
        <p className="mt-2 text-slate-500">Complete your order to bring the curated collection home.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          <div className="rounded-xl bg-slate-200/55 p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">1</span>
              <h2 className="text-3xl font-bold tracking-tight">Shipping Address</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border-2 border-emerald-700 bg-white p-5 shadow-sm">
                <p className="font-bold">Emma Richardson</p>
                <p className="mt-1 text-sm text-slate-600">742 Evergreen Terrace, Springfield, IL 62704, United States</p>
              </div>
              <div className="rounded-xl border border-slate-300 bg-slate-100 p-5">
                <p className="font-bold">Emma Richardson</p>
                <p className="mt-1 text-sm text-slate-600">1200 Avenue of the Americas, New York, NY 10036, United States</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-200/55 p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">2</span>
              <h2 className="text-3xl font-bold tracking-tight">Shipping Method</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <p className="font-semibold">Standard Courier</p>
                <p className="font-bold text-emerald-700">$12.00</p>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <p className="font-semibold">Express Premium</p>
                <p className="font-bold text-emerald-700">$35.00</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-200/55 p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">3</span>
              <h2 className="text-3xl font-bold tracking-tight">Payment Method</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <button className="rounded-xl border-2 border-emerald-700 bg-white py-4 font-semibold">Credit Card</button>
              <button className="rounded-xl border border-slate-300 bg-slate-100 py-4 font-semibold text-slate-500">PayPal</button>
              <button className="rounded-xl border border-slate-300 bg-slate-100 py-4 font-semibold text-slate-500">Apple Pay</button>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm lg:col-span-4">
          <h2 className="text-3xl font-bold tracking-tight">Order Summary</h2>
          <div className="mt-4 space-y-2 text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>$1,670.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>$12.00</span></div>
            <div className="flex justify-between"><span>Estimated Tax</span><span>$133.60</span></div>
          </div>
          <p className="mt-5 text-5xl font-extrabold text-emerald-700">$1,815.60</p>
          <button className="mt-6 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white">Place Order</button>
        </aside>
      </div>
    </div>
  );
}
