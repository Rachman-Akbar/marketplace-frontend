export default function AddressManagementPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Address Management</h1>
        <p className="mt-2 text-slate-500">Select where your curated pieces should be delivered.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-2 border-emerald-700 bg-emerald-50 p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Primary Address</p>
          <p className="mt-3 text-lg font-bold">Emma Richardson</p>
          <p className="mt-1 text-sm text-slate-600">742 Evergreen Terrace, Springfield, IL 62704, United States</p>
          <button className="mt-4 w-full rounded-lg border border-emerald-700 py-2.5 font-semibold text-emerald-700">Edit Address</button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Secondary Address</p>
          <p className="mt-3 text-lg font-bold">Emma Richardson</p>
          <p className="mt-1 text-sm text-slate-600">1200 Avenue of the Americas, New York, NY 10036, United States</p>
          <button className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 font-semibold text-slate-700">Edit Address</button>
        </div>
      </div>

      <button className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Add New Address</button>
    </div>
  );
}
