export default function EditProfilePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Edit Profile</h1>
        <p className="mt-2 text-slate-500">Update your personal details and public buyer identity.</p>
      </header>

      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight">Personal Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">First Name</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" defaultValue="Julian" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Last Name</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" defaultValue="Thorne" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-600">Email Address</label>
            <input className="w-full rounded-lg bg-slate-200 px-4 py-3" defaultValue="julian.thorne@canvas.co" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-600">Bio</label>
            <textarea
              className="min-h-32 w-full rounded-lg bg-slate-200 px-4 py-3"
              defaultValue="Art director and minimalist furniture collector. Obsessed with natural materials and Bauhaus principles."
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg px-5 py-2 font-semibold text-slate-600">Discard</button>
          <button className="rounded-lg bg-emerald-700 px-6 py-2.5 font-bold text-white">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
