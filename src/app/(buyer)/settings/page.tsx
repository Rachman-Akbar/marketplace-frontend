export default function SettingsPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className={`block rounded-lg px-3 py-2 ${n === 'Profile Info' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} href="#">{n}</a>
          ))}
        </nav>
        <button className="mt-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600">
          <span className="material-symbols-outlined text-base">logout</span>
          Logout
        </button>
      </aside>

      <section className="space-y-8">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight">Settings</h1>
          <p className="mt-2 text-slate-500">Update your account preferences and secure your presence on The Curated Canvas.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <span className="material-symbols-outlined text-emerald-700">manage_accounts</span>
              Account Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Language</label>
                <select className="w-full rounded-lg bg-slate-200 px-4 py-3">
                  <option>English (United States)</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Currency</label>
                <select className="w-full rounded-lg bg-slate-200 px-4 py-3">
                  <option>USD ($)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="rounded-lg bg-emerald-700 px-6 py-2.5 font-bold text-white">Save Preferences</button>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight">Experience</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-slate-500">Adaptive interface</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-emerald-300 p-1"><div className="ml-auto h-4 w-4 rounded-full bg-emerald-900" /></button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Beta Features</p>
                  <p className="text-slate-500">Early access tools</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-slate-200 p-1"><div className="h-4 w-4 rounded-full bg-slate-400" /></button>
              </div>
            </div>
            <img className="mt-6 h-24 w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFr1K6UfuyrpCjT9DgPi2xDR_oB933YtSctcPKXdfhWIcH0Lfwk8mvvsClRBmCSlolye4krJgSmNtm4jrXkIOgttX_k_YhKEwjWfnnLVi6DqhOpo3nQYWK82QLg3XiC3jl8NRMCj61egmgxThW3J367_NWBAu9sOX4-UH-EtnJZhUTT-21KSRPzHjq5RC0mYL0V8nhJpxByn6LRBbi8JM1ZBLuCIn4IK0xoKVQ_BEtnRyZ7J8YVFjovSetqZcv_zNuvBhCVNQNsSM" alt="experience" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
                <span className="material-symbols-outlined text-emerald-700">security</span>
                Security & Access
              </h2>
              <p className="mt-1 text-sm text-slate-500">Keep your account safe with modern authentication.</p>
            </div>
            <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">Strong Security</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Current Password</label>
                <input className="w-full rounded-lg bg-slate-200 px-4 py-3" type="password" placeholder="••••••••••••" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">New Password</label>
                <input className="w-full rounded-lg bg-slate-200 px-4 py-3" type="password" />
              </div>
            </div>
            <div className="rounded-xl bg-slate-100 p-5">
              <h3 className="font-bold">Two-Factor Authentication</h3>
              <p className="mt-2 text-sm text-slate-500">Adds extra security to your account by requiring more than a password.</p>
              <button className="mt-5 w-full rounded-lg border-2 border-emerald-700 py-2.5 font-bold text-emerald-700">Enable 2FA</button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <span className="material-symbols-outlined text-emerald-700">notifications_active</span>
              Push Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                <div>
                  <p className="font-semibold">Order Updates</p>
                  <p className="text-xs text-slate-500">Shipping status & delivery confirmations</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-emerald-700 p-1"><div className="ml-auto h-4 w-4 rounded-full bg-white" /></button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
                <div>
                  <p className="font-semibold">New Collections</p>
                  <p className="text-xs text-slate-500">Exclusive artist drops & limited items</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-emerald-700 p-1"><div className="ml-auto h-4 w-4 rounded-full bg-white" /></button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <span className="material-symbols-outlined text-emerald-700">alternate_email</span>
              Email Preferences
            </h3>
            <label className="mb-3 flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> Weekly Curated Newsletter</label>
            <label className="mb-3 flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> Artist Spotlight & Interviews</label>
            <label className="mb-3 flex items-center gap-3 text-sm"><input type="checkbox" /> Promotional Offers & Sales</label>
            <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">Changes can take up to 24 hours to propagate across all channels.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
