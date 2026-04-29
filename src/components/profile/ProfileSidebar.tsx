const PROFILE_NAV_ITEMS = [
  "Profile Info",
  "Addresses",
  "Payments",
  "Wishlist",
  "Orders",
];

export function ProfileSidebar() {
  return (
    <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
      <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">
        Account Settings
      </h2>

      <nav className="mt-2 space-y-1 text-sm">
        {PROFILE_NAV_ITEMS.map((item) => {
          const isActive = item === "Profile Info";

          return (
            <a
              key={item}
              href="#"
              className={
                isActive
                  ? "block rounded-lg bg-emerald-100 px-3 py-2 text-emerald-700"
                  : "block rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-200"
              }
            >
              {item}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}