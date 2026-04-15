export default function OrderTrackingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Order Tracking</h1>
        <p className="mt-2 text-slate-500">Track progress for order #CC-82910-442</p>
      </header>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Shipment Progress</h2>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">In Transit</span>
        </div>

        <div className="space-y-6">
          {[
            ["Order confirmed", true],
            ["Packed by artisan studio", true],
            ["Shipped with premium courier", true],
            ["Out for delivery", false],
          ].map(([label, active], index) => (
            <div key={label as string} className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${active ? "bg-emerald-700" : "bg-slate-300"}`} />
              <p className={`text-sm ${active ? "text-slate-800" : "text-slate-500"}`}>{label as string}</p>
              <span className="ml-auto text-xs text-slate-400">Step {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
