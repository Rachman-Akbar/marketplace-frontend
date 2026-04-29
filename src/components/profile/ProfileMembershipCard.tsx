export function ProfileMembershipCard() {
  return (
    <div className="rounded-xl bg-emerald-700 p-6 text-white shadow-sm">
      <span className="material-symbols-outlined text-3xl">diamond</span>

      <p className="mt-3 text-2xl font-extrabold tracking-tight">
        Canvas Platinum
      </p>

      <p className="mt-2 text-sm text-emerald-100">
        You&apos;re 2,400 points away from Emerald Status.
      </p>

      <div className="mt-4 h-2 rounded-full bg-emerald-900">
        <div className="h-2 w-3/4 rounded-full bg-emerald-300" />
      </div>

      <p className="mt-1 text-[10px] text-emerald-100">
        7,600 / 10,000 XP
      </p>
    </div>
  );
}