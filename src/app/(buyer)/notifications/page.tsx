export default function NotificationsPage() {
  return (
    <div className="grid gap-8 lg:grid-cols">
      <section className="space-y-6">
        <div className="inline-flex rounded-xl bg-slate-200 p-1">
          <button className="rounded-lg bg-white px-5 py-2 text-sm font-bold text-emerald-700">Orders</button>
          <button className="rounded-lg px-5 py-2 text-sm text-slate-600">Promo</button>
          <button className="rounded-lg px-5 py-2 text-sm text-slate-600">System</button>
        </div>

        <div className="space-y-4">
          <article className="rounded-xl border-l-4 border-l-emerald-700 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold tracking-tight">Order Out for Delivery</h3>
                  <span className="rounded bg-emerald-200 px-2 py-1 text-xs font-bold text-emerald-900">URGENT</span>
                </div>
                <p className="mt-2 text-slate-600">Your order #TC-88912 containing Handcrafted Ceramic Vase is out for delivery with our premium courier.</p>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Track Shipment</button>
                  <button className="text-sm text-slate-600">Mark as Read</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">2 mins ago</p>
                <span className="mt-3 inline-block h-2.5 w-2.5 rounded-full bg-emerald-700" />
              </div>
            </div>
          </article>

          <article className="rounded-xl bg-slate-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-300 text-slate-700">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight">Items Shipped</h3>
                <p className="mt-2 text-slate-600">Exciting news! Your items from Autumn Minimalist collection have been processed and shipped.</p>
              </div>
              <p className="text-xs text-slate-400">1 hour ago</p>
            </div>
          </article>

          <article className="rounded-xl bg-slate-100/70 p-6 opacity-80">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-300 text-slate-700">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight">Payment Confirmed</h3>
                <p className="mt-2 text-slate-600">We have successfully received payment for order #TC-88912. Thank you for shopping with The Curated Canvas.</p>
              </div>
              <p className="text-xs text-slate-400">Yesterday</p>
            </div>
          </article>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-lime-200/70 p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-lime-800">Exclusive Access</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-lime-900">Artisan Home Sale</h3>
            <p className="mt-2 text-sm text-lime-900/75">Get up to 40% off on hand-crafted items this weekend only.</p>
            <button className="mt-4 rounded-lg bg-lime-900 px-4 py-2 text-sm font-semibold text-lime-100">Shop The Collection</button>
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center">
            <span className="material-symbols-outlined text-3xl text-slate-500">redeem</span>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight">Refer a Friend</h3>
            <p className="mt-2 text-sm text-slate-600">Share your personal invite link and you both get $20 in credits.</p>
            <button className="mt-4 rounded-lg border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-700">Generate Link</button>
          </div>
        </div>
      </section>
    </div>
  );
}
