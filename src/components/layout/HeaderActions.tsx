import Link from "next/link";

type HeaderActionsProps = {
  isLoggedIn: boolean;
  cartCount: number;
};

function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function HeaderActions({
  isLoggedIn,
  cartCount,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/cart"
        className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
        aria-label="Cart"
      >
        <span className="material-symbols-outlined">shopping_cart</span>
        <CartBadge count={cartCount} />
      </Link>

      <Link
        href="/notifications"
        className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined">notifications</span>
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
      </Link>

      <Link
        href="/chat"
        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
        aria-label="Chat"
      >
        <span className="material-symbols-outlined">chat</span>
      </Link>

      {isLoggedIn ? (
        <Link
          href="/profile"
          className="rounded-full bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100"
          aria-label="Profile"
        >
          <span className="material-symbols-outlined">person</span>
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}