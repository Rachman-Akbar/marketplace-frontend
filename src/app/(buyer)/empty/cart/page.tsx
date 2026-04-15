import Link from "next/link";

export default function EmptyCartPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <span className="material-symbols-outlined text-3xl">shopping_cart</span>
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight">Your cart is still empty</h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        Browse handmade essentials and add your first curated piece to your collection.
      </p>
      <Link href="/products" className="mt-8 inline-block">
        <button className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Explore Products</button>
      </Link>
    </div>
  );
}
