import Link from "next/link";

export default function EmptyOrdersPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <span className="material-symbols-outlined text-3xl">inventory_2</span>
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight">No orders yet</h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        Once you place your first order, shipment tracking and order history will appear here.
      </p>
      <Link href="/products" className="mt-8 inline-block">
        <button className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Start Shopping</button>
      </Link>
    </div>
  );
}
