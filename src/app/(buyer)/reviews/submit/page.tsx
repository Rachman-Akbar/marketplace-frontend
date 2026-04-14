export default function SubmitReviewPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight">Share Your Experience</h1>
        <p className="mt-2 text-slate-500">Your feedback helps millions of shoppers make better choices.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <img className="aspect-square w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG6zyKcoY6uHoMnZCLAuB3ZWoj-9Z0vLruOPd7aW0KPAGcunhbvNCpQCAAFM3c2keFyhAYfx4-fKlsnu1TaeDRztSafiJuoiO6COY97BlHww8e0PruoGBri6RQwv_xNShj9t13CEtQtqNKNfy9Kro8ezS4-UaWonHcUUQlojrE9rbMuxoDdqZ7j3mBYAsMpF0AvUMJ6lyeWy9Apw5b7uerL4WCSkfUrbCjCKpRmuherZU9bAD7r6rS4vm2HOYXBLQGfBiYtqLV4TU" alt="watch" />
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Premium Minimalist Wristwatch</h2>
          </div>
          <div className="rounded-xl bg-slate-200/60 p-5 text-sm text-slate-600">
            <p className="mb-2 font-semibold">Review Guidelines</p>
            <ul className="space-y-1">
              <li>Focus on product quality and features.</li>
              <li>Mention assembly or setup if applicable.</li>
              <li>Keep it respectful and honest.</li>
            </ul>
          </div>
        </aside>

        <section className="space-y-6 lg:col-span-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-extrabold tracking-tight">Overall Experience</h3>
            <div className="mt-4 flex items-center gap-1 text-emerald-700">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined text-slate-300">star</span>
              <span className="ml-2 font-semibold text-slate-700">Great</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-extrabold tracking-tight">Review Details</h3>
            <textarea className="mt-4 min-h-40 w-full rounded-lg bg-slate-200 px-4 py-3" placeholder="What did you like or dislike? How was the assembly process?" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold tracking-tight">Detailed Ratings</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p>Product Quality 4.5</p>
                <p>Shipping Speed 5.0</p>
                <p>Value for Money 4.0</p>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold tracking-tight">Add Photos or Video</h3>
              <div className="mt-4 flex min-h-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-500">
                Click to upload
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="rounded-lg px-5 py-2 text-slate-600">Save as Draft</button>
            <button className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white">Submit Review</button>
          </div>
        </section>
      </div>
    </div>
  );
}
