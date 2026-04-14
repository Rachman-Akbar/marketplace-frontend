export default function WishlistPage() {
  const items = [
    {
      title: 'Ephemeral Drift #4',
      brand: 'By Studio Arthemis',
      price: '$1,240',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzIhYiaOZgU9JcOmjHUN3s81cRgkyBRCXLsfAXccJqUnAhkaokScX1NM_n4osaID5x0D85la81hJSZEkwWA5MVtLGOHP0cCLF16DLLY_w5L-BTcHEUo7ELETmDFDevn3CvJFLqaLf_EOSIndYEzzQcj02VGm_FGETSJFIPwNvkdvS-Gc53RJmcKECG7DRX98l6VaVa6nQaVY6tL0-bSHdWLys7iC3z9u58u-rOqjYVDQS99bMHeqvK_vQFfT71mgc9c3rYiBI14U',
    },
    {
      title: 'Ovoid Vessel No. 12',
      brand: 'Handcrafted Ceramics',
      price: '$385',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPHCrovJE8pgm3AVnNEyByyqc5L1dRH1xFcTqJBwUbw26FwS7Z4CaoSYy-hI7qnTBSygLi06HU4MS7Ae61SnwC5sJFkUZcJlb6LLG4iEs0qI7hYDLHK0iArb-rnfmeICPdyKahRCUo3r1jfOYe__f0DAVzqwnIGva2ildtQhu2VpyQR3yIbDsZ7g8ooWF2KeZ2KduuPY2Ya1BcJfCZiLWoOKpPS3vAEMugyWgzdddXdj8_awwAV8dBVCJb8C0v9TzkBaEX1Db2MXs',
    },
    {
      title: 'Indigo Warp Hanging',
      brand: 'Textile Collective',
      price: '$820',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmqjstkks0r_T_-HUhc3Sb114cwk61vqVkiFct7pRpDsDYUa6Ig4gNyJkO2MaGktrL2a-5sxyG5zurXBrBKQIp9jn_2JLvYTlXl-sjlB5KRNEMxLPHitfpNdtmjKYjzc5_wUd70E_0xIGowmJm1WRRB65Jn75Js17r_GJTC8Ps7ll2Sw-TED1yJf7-mzp8IavWj4L6gE1KezF5Z9SgOcnDYGSG0vllNh6fe4KBZe5w5muA_7CkiaXdvISmt6BGvG9Xl7gbOW9Dr8M',
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className={`block rounded-lg px-3 py-2 ${n === 'Wishlist' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} href="#">{n}</a>
          ))}
        </nav>
      </aside>

      <section>
        <h1 className="text-5xl font-extrabold tracking-tight">Your Wishlist</h1>
        <p className="mt-2 text-slate-500">Items you&apos;ve curated for your future collection.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-xl bg-white p-4 shadow-sm">
              <img src={item.img} alt={item.title} className="aspect-square w-full rounded-lg object-cover" />
              <h3 className="mt-3 text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.brand}</p>
              <p className="mt-2 text-3xl font-extrabold text-emerald-700">{item.price}</p>
              <button className="mt-4 w-full rounded-lg bg-emerald-700 py-2.5 font-bold text-white">Move to Cart</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
