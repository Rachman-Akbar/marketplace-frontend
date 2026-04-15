export default function ChatPage() {
  const chats = [
    ["Elena Studio", "Typing...", "10:42 AM", true],
    ["The Oak Collective", "Your order #Canvas-9022 is ready for pickup.", "Yesterday", false],
    ["Julian Rossi", "I&apos;ve shared the catalog for the new collection.", "Tuesday", false],
    ["Minimalist Home", "Thanks for your feedback on the ceramic vase.", "May 12", false],
  ] as const;

  return (
    <div className="grid min-h-[calc(100vh-230px)] gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[360px_1fr]">
      <aside className="border-r border-slate-200 bg-slate-100 p-4">
        <h1 className="px-2 py-3 text-4xl font-extrabold tracking-tight">Messages</h1>
        <div className="flex items-center gap-2 rounded-xl bg-slate-200 px-3 py-2 text-sm text-slate-500">
          <span className="material-symbols-outlined text-base">search</span>
          <span>Search conversations...</span>
        </div>

        <div className="mt-3 space-y-2">
          {chats.map(([name, snippet, time, active]) => (
            <div key={name} className={`flex items-center gap-3 rounded-xl p-3 ${active ? "border-l-4 border-l-emerald-700 bg-white" : "hover:bg-slate-200/60"}`}>
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ2ZTRhN8o1-4bSmXh9wbwaSWvnQzW-UDplAfeD82xGZ4hns9YxLXNXbyu08h4LoY2JWdEuQ839y2J2nRsn0uACizjNr7GbP3eAHbtjqBr93CQb2f_PrWIcdU4LM29NYmIPaOzSJif3dgwKXTO1Lb9g2k05tqclL4gWl8rHiT-B48ItMTBAfa7ZB8hPax5Bs42kLIQfpgI-fsMKnkWiubjWBywXC3MwMy-Mhy4yC05L1Tye2GM988NSB_txatFbuqAIsSSAAtxO0"
                  alt={name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-100 ${active ? "bg-emerald-600" : "bg-slate-400"}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-bold">{name}</p>
                  <p className="text-[10px] text-slate-500">{time}</p>
                </div>
                <p className={`truncate text-xs ${active ? "font-semibold text-emerald-700" : "text-slate-500"}`} dangerouslySetInnerHTML={{ __html: snippet }} />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex flex-col bg-slate-50">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ2ZTRhN8o1-4bSmXh9wbwaSWvnQzW-UDplAfeD82xGZ4hns9YxLXNXbyu08h4LoY2JWdEuQ839y2J2nRsn0uACizjNr7GbP3eAHbtjqBr93CQb2f_PrWIcdU4LM29NYmIPaOzSJif3dgwKXTO1Lb9g2k05tqclL4gWl8rHiT-B48ItMTBAfa7ZB8hPax5Bs42kLIQfpgI-fsMKnkWiubjWBywXC3MwMy-Mhy4yC05L1Tye2GM988NSB_txatFbuqAIsSSAAtxO0"
              alt="Elena"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-bold">Elena Studio</p>
              <p className="text-xs text-emerald-700">Online</p>
            </div>
          </div>
          <div className="flex gap-3 text-slate-500">
            <span className="material-symbols-outlined">call</span>
            <span className="material-symbols-outlined">videocam</span>
            <span className="material-symbols-outlined">info</span>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          <div className="mx-auto w-fit rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase text-slate-500">Today</div>
          <div className="max-w-xl rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
            Hello! I saw you were interested in the hand-woven linen collection. We just released this piece.
          </div>
          <div className="flex max-w-sm items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <img className="h-12 w-12 rounded-md object-cover" src="https://images.unsplash.com/photo-1603204077779-bed963ea7d0b?w=200&q=80&auto=format&fit=crop" alt="linen" />
            <div>
              <p className="text-sm font-semibold">Artisan Linen Throw</p>
              <p className="text-xs text-slate-500">Olive Green • In Stock</p>
              <p className="text-sm font-bold text-emerald-700">$145.00</p>
            </div>
          </div>
          <div className="ml-auto max-w-xl rounded-2xl bg-emerald-700 p-4 text-white shadow-sm">
            That looks beautiful. Does it come in any other colors? I&apos;m looking for something neutral like beige or cream.
          </div>
          <div className="max-w-xl rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
            Yes, we have a Sahara Sand option. Also checking your previous order status now.
          </div>
          <div className="max-w-sm rounded-2xl bg-slate-100 p-3 text-slate-700 shadow-sm">
            <p className="text-xs text-slate-500">ORDER #CANVAS-4491</p>
            <p className="font-semibold">Ceramic Vessel Set</p>
            <div className="mt-2 h-1.5 rounded bg-slate-300"><div className="h-1.5 w-3/4 rounded bg-emerald-700" /></div>
          </div>
        </div>

        <footer className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-2 rounded-xl bg-slate-200 px-3 py-2">
            <span className="material-symbols-outlined text-slate-500">add</span>
            <input className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none" placeholder="Write a message..." />
            <button className="rounded-lg bg-emerald-700 p-2 text-white">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
