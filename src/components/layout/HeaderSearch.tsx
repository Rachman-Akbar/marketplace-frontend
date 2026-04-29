export function HeaderSearch() {
  return (
    <form action="/products" className="hidden max-w-sm flex-1 lg:block">
      <div className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-2.5">
        <button
          suppressHydrationWarning
          type="submit"
          className="flex text-slate-500 transition hover:text-emerald-700"
          aria-label="Search"
        >
          <span className="material-symbols-outlined">search</span>
        </button>

        <input
          suppressHydrationWarning
          name="search"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
          placeholder="Search curated collections..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </form>
  );
}