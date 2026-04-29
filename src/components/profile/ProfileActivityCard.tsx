const ACTIVITIES = [
  {
    icon: "inventory_2",
    text: "Order #8821 Delivered",
    className: "text-emerald-700",
  },
  {
    icon: "star",
    text: "Review Published",
    className: "text-sky-700",
  },
  {
    icon: "favorite",
    text: "Added to Wishlist",
    className: "text-emerald-700",
  },
];

export function ProfileActivityCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-extrabold tracking-tight">
        Recent Activity
      </h3>

      <ul className="mt-3 space-y-3 text-sm text-slate-600">
        {ACTIVITIES.map((activity) => (
          <li key={activity.text} className="flex gap-2">
            <span
              className={`material-symbols-outlined text-base ${activity.className}`}
            >
              {activity.icon}
            </span>
            {activity.text}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-700"
      >
        View all activity
      </button>
    </div>
  );
}