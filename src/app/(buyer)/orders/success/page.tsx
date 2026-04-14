export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl py-8 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-200">
        <span className="material-symbols-outlined text-5xl text-emerald-700">check_circle</span>
      </div>
      <h1 className="mt-6 text-6xl font-extrabold tracking-tight">Your masterpiece is on its way.</h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-500">
        Thank you for choosing The Curated Canvas. We&apos;re carefully preparing your selection for its new home.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Order Details</p>
          <p className="mt-3 text-sm text-slate-500">Order Number</p>
          <p className="text-2xl font-extrabold text-emerald-700">#CC-82910-442</p>
          <p className="mt-3 text-sm text-slate-500">Estimated Arrival</p>
          <p className="text-2xl font-extrabold">October 24, 2024</p>
        </div>
        <div className="rounded-xl bg-white p-6 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment & Shipping</p>
          <p className="mt-3 text-sm text-slate-500">Payment Method</p>
          <p className="font-semibold">Visa ending in 4242</p>
          <p className="mt-3 text-sm text-slate-500">Shipping Address</p>
          <p className="font-semibold">128 Fine Arts Plaza, Building 4, Studio 12, New York, NY 10012</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-200 p-5">
        <div className="flex -space-x-3">
          <img className="h-14 w-14 rounded-lg ring-4 ring-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGPtJ1zk2ipQyB8eToqCXEJV9uYxL27NwNNdG6QpZaI6rtmbcwQSumnB8r07vnpBFK1qycsRk_ANf_JbC9vyuzYAnfty-3pmFeeD3j6bMVzAkT0Ys1stpZJKIfQxKPw21uN92xZy6GSdaJnyxa1cnMo9pLB218ADlvfL6qUjFfYhIend2r3b0PEWxy-v1RxK0dDxtNQDAIgX0C4WNoSlClmYpbAG_-3H3F4fivZjJyebTAlKYDqPdijiZyaGKM1z2IxpxNnhQAEo" alt="item1" />
          <img className="h-14 w-14 rounded-lg ring-4 ring-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlJ3n8Tkl7I-11tJsFNqFcczhMIeK63bmknw-a-560dffjnF8d_rLVfU-u9TTvacip1Qgw4nbwcLdFiyiOBcgC_PXT0JzSmVuIaHZxgfhG9Fy6CR4vr5gEtY_HY_AZlCsdShXxKxSTFm6iFQeqNE2pedH8Cgk2cspjLhbSIzrTx8Z_X27nbCy0rmJV5KRKKrFRUL0qonb4AMMxKzUfOkTUGs06QzxfZ-6chzOzIFVv4RQwTR3iTYS0_smq5FnwVU3eKpRb0mb5Gao" alt="item2" />
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Amount</p>
          <p className="text-4xl font-extrabold">$1,240.00</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Track Order</button>
        <button className="rounded-lg bg-slate-300 px-6 py-3 font-bold text-slate-700">Continue Shopping</button>
      </div>
    </div>
  );
}
