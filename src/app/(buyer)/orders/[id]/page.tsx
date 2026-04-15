import Link from "next/link";

export default function OrderDetailPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Order Detail</h1>
        <p className="mt-2 text-slate-500">Order #CC-82910-442</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Items</h2>
            <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
              <img
                className="h-16 w-16 rounded-lg object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGPtJ1zk2ipQyB8eToqCXEJV9uYxL27NwNNdG6QpZaI6rtmbcwQSumnB8r07vnpBFK1qycsRk_ANf_JbC9vyuzYAnfty-3pmFeeD3j6bMVzAkT0Ys1stpZJKIfQxKPw21uN92xZy6GSdaJnyxa1cnMo9pLB218ADlvfL6qUjFfYhIend2r3b0PEWxy-v1RxK0dDxtNQDAIgX0C4WNoSlClmYpbAG_-3H3F4fivZjJyebTAlKYDqPdijiZyaGKM1z2IxpxNnhQAEo"
                alt="item"
              />
              <div className="flex-1">
                <p className="font-semibold">Emerald Fragment Limited Edition Print</p>
                <p className="text-sm text-slate-500">Qty 1</p>
              </div>
              <p className="text-xl font-bold">$1,240</p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Payment and Shipping</h2>
            <div className="space-y-2 text-sm text-slate-600">
              <p>Visa ending in 4242</p>
              <p>128 Fine Arts Plaza, Building 4, Studio 12, New York, NY 10012</p>
              <p className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Estimated arrival: Oct 24, 2026</p>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Order Actions</h2>
          <Link href="/orders/CC-82910-442/tracking" className="block">
            <button className="w-full rounded-lg bg-emerald-700 py-3 font-bold text-white">Track Order</button>
          </Link>
          <button className="mt-3 w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700">Download Invoice</button>
          <button className="mt-3 w-full rounded-lg bg-slate-100 py-3 font-semibold text-slate-700">Request Support</button>
        </aside>
      </div>
    </div>
  );
}
