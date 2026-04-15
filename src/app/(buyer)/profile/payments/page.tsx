export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Payment Methods</h1>
        <p className="mt-2 text-slate-500">Manage cards and digital payment channels for faster checkout.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-widest text-emerald-200">Primary Card</p>
          <p className="mt-4 text-2xl font-extrabold tracking-tight">Visa</p>
          <p className="mt-2 text-xl font-semibold">•••• •••• •••• 4242</p>
          <div className="mt-6 flex items-center justify-between text-sm text-emerald-100">
            <span>Emma Richardson</span>
            <span>12/28</span>
          </div>
        </article>

        <article className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-slate-500">Backup Card</p>
          <p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">Mastercard</p>
          <p className="mt-2 text-xl font-semibold text-slate-700">•••• •••• •••• 9831</p>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span>Emma Richardson</span>
            <span>08/27</span>
          </div>
        </article>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight">Add New Payment Method</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Card Holder Name</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" placeholder="Emma Richardson" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Card Number</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" placeholder="•••• •••• •••• ••••" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Expiry Date</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" placeholder="MM/YY" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">CVV</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" placeholder="•••" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg px-5 py-2 font-semibold text-slate-600">Cancel</button>
          <button className="rounded-lg bg-emerald-700 px-6 py-2.5 font-bold text-white">Save Card</button>
        </div>
      </section>
    </div>
  );
}
