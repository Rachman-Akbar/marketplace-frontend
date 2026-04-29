export function ProfileSecurityCard() {
  return (
    <div className="rounded-xl bg-slate-200 p-6">
      <h3 className="mb-2 text-2xl font-extrabold tracking-tight">
        Privacy & Security
      </h3>

      <p className="text-sm text-slate-600">
        2-step verification is currently disabled. Protect your curated gallery.
      </p>

      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-white py-2.5 font-semibold text-slate-700"
      >
        Enable Security
      </button>
    </div>
  );
}