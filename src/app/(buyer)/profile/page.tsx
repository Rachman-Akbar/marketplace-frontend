export default function ProfileDashboardPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className={`block rounded-lg px-3 py-2 ${n === 'Profile Info' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} href="#">{n}</a>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm md:col-span-2">
            <div className="flex items-center gap-5">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSK3Cs2WXVjGZAx3pGPTrFLuieBj89wY52Aj5dYqjPnFERKTmrGsLYnvonFD6MXfPPHHxHdPmMSx9Dn8C5O3Ce325sm8NUXMWcFmhPkxEZKeLvsnW3YMxMcs01zq5fWEXh099zo9GYNJckP83h_kUfmaql1SP4KDR3vXcG66Q_NUW8NElpRLr-gQajMh0QgJRgrUCZdempAgw3NdQ3qvsIdRhgUmYOclaBCL_zWQGmT1hS9uF_tw8VBbuTABZVfa1z-9g38KpGpOE" alt="avatar" className="h-24 w-24 rounded-full border-4 border-emerald-300" />
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">Julian Thorne</h1>
                <p className="mt-1 text-slate-500">Curating aesthetics since Oct 2023</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">PRO MEMBER</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-emerald-700 p-6 text-white shadow-sm">
            <p className="text-sm">Canvas Platinum</p>
              <p className="mt-2 text-sm text-emerald-100">You&apos;re 2,400 points away from Emerald Status.</p>
            <div className="mt-4 h-2 rounded-full bg-emerald-900">
              <div className="h-2 w-3/4 rounded-full bg-emerald-300" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">Personal Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-lg bg-slate-200 px-4 py-3" value="Julian" readOnly />
              <input className="rounded-lg bg-slate-200 px-4 py-3" value="Thorne" readOnly />
              <input className="rounded-lg bg-slate-200 px-4 py-3 md:col-span-2" value="julian.thorne@canvas.co" readOnly />
              <textarea className="min-h-28 rounded-lg bg-slate-200 px-4 py-3 md:col-span-2" value="Art director and minimalist furniture collector. Obsessed with natural materials and Bauhaus principles." readOnly />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-extrabold tracking-tight">Recent Activity</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Order #8821 Delivered</li>
                <li>Review Published</li>
                <li>Added to Wishlist</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-200 p-6">
              <h3 className="text-2xl font-extrabold tracking-tight">Privacy & Security</h3>
              <p className="mt-2 text-sm text-slate-600">2-step verification is currently disabled.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
