export default function ChatPage() {
  return (
    <div className="grid min-h-[calc(100vh-260px)] gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[360px_1fr]">
      <aside className="border-r border-slate-200 bg-slate-100 p-4">
        <h1 className="px-2 py-3 text-4xl font-extrabold tracking-tight">Messages</h1>
        <div className="rounded-xl bg-slate-200 px-3 py-2 text-sm text-slate-500">Search conversations...</div>
        <div className="mt-3 space-y-2">
          {["Elena Studio", "The Oak Collective", "Julian Rossi", "Minimalist Home"].map((name, i) => (
            <div key={name} className={`flex items-center gap-3 rounded-xl p-3 ${i === 0 ? 'border-l-4 border-l-emerald-700 bg-white' : 'hover:bg-slate-200/60'}`}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ2ZTRhN8o1-4bSmXh9wbwaSWvnQzW-UDplAfeD82xGZ4hns9YxLXNXbyu08h4LoY2JWdEuQ839y2J2nRsn0uACizjNr7GbP3eAHbtjqBr93CQb2f_PrWIcdU4LM29NYmIPaOzSJif3dgwKXTO1Lb9g2k05tqclL4gWl8rHiT-B48ItMTBAfa7ZB8hPax5Bs42kLIQfpgI-fsMKnkWiubjWBywXC3MwMy-Mhy4yC05L1Tye2GM988NSB_txatFbuqAIsSSAAtxO0"
                alt={name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{name}</p>
                <p className="text-xs text-slate-500">Typing...</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex flex-col bg-slate-50">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xl font-bold">Elena Studio</p>
            <p className="text-xs text-emerald-700">Online</p>
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
          <div className="ml-auto max-w-xl rounded-2xl bg-emerald-700 p-4 text-white shadow-sm">
            That looks beautiful. Does it come in any other colors? I&apos;m looking for something neutral like beige or cream.
          </div>
          <div className="max-w-xl rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
            Yes, we have a Sahara Sand option. Also checking your previous order status now.
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
