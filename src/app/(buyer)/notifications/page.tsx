export default function NotificationsPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className="block rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-200" href="#">{n}</a>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">Notifications</h1>
            <p className="mt-1 text-slate-500">Stay updated on your curated collections and orders.</p>
          </div>
          <button className="text-sm font-semibold text-emerald-700">Mark all as read</button>
        </div>

        <div className="inline-flex rounded-xl bg-slate-200 p-1">
          <button className="rounded-lg bg-white px-5 py-2 text-sm font-bold text-emerald-700">Orders</button>
          <button className="rounded-lg px-5 py-2 text-sm text-slate-600">Promo</button>
          <button className="rounded-lg px-5 py-2 text-sm text-slate-600">System</button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border-l-4 border-l-emerald-700 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Order Out for Delivery</h3>
                <p className="mt-2 text-slate-600">Your order #TC-88912 containing Handcrafted Ceramic Vase is out for delivery.</p>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Track Shipment</button>
                  <button className="text-sm text-slate-600">Mark as Read</button>
                </div>
              </div>
              <span className="rounded bg-emerald-200 px-2 py-1 text-xs font-bold">URGENT</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-6">
            <h3 className="text-2xl font-bold tracking-tight">Items Shipped</h3>
            <p className="mt-2 text-slate-600">Your items from Autumn Minimalist collection have been processed and shipped.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
