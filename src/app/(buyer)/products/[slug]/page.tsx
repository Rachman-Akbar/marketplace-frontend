import Link from "next/link";

const productGallery = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeiK4PaEe4pEdrZBVyb4mqx2_guWlFklpoPAgclMhPca7bUvcXZsKdlDYjaq8IPDyuFn-z-V6pAo6wEMaJ1H3tcsh565uR9NFtSdpY2aHk9RkYtOmMmMEO4yjScauyfw91dN1cdnDDlt3KHNNAG0jaIzR_Yhrh4Ei4Vk14_V512nZXG0KB7m6GX2_5XK0G8hJMFLhtLb7tjT6E-V6NFZXnXn5e9fFicUcNzDI3imjWYGbMxEIkv5zmxjqq1XlmF8mXBn5JxyBewBY",
    alt: "thumbnail view of handcrafted emerald ceramic vase front view",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFhjyhLcqUn3-mgPxIf0lZ-wV0qRByyVEHFgH5BDdlRvhMvJdWvnrvBqAtJ5o8tUk7MfqhkxCDsJ6hAv908nplM6kJRxezx84p2X227kW1tmzeUHcoYAsJ0UCZR4OGHoaPFSSCr2XtG4TIGxLoMnHi5_Nvgo2JnnoUmCClM0ha0hW4C23XGcSpAOTJiVf5yEWLje4usaPeu2bHL4w0sOKbggDi1b_6K3K6JKe0T0NNEEkrgdzHGu0_KmuCAj4mDQUZGkEZlq2K6g0",
    alt: "close up of texture on emerald green ceramic vase detail",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjPx8q4Oj7XUl88_Xrk1XX6kgXt2j7PgRxhVCy4du4pfsO_c2VhpVj0ksYN0baGcbbIsWsHo-K5WhBIylIYTebSkdkqrxHqcWoN62uRxQBbDUkPnm9kn8s1etXWLGK9auff_hWBxMTWwEuoLI26Q29S6cOhEPXNO0-T6yEvX72vyhBksI6hJ1hEBeQbFDmNbmLz5k_HmQU9rTOw0Fjm0QoFFsFjMaURNkfVkGKOl__Uh5C-k-QIO3x1_kJEgAigSyGomq1-L7Usdw",
    alt: "ceramic artist hands working with green clay on a pottery wheel",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDz5bvTZ0c7xVv3716ywufqyrREMzKQRKQ0_j-93yqB8JMrFRnHTuxRc2W2-UrlkjvJpPg0BsGlILwcqOyzIs0RsxzfGSBbRfC_3NaFWqjQ8adHDH76m4Qeqb_yjjrvFwjI_TQumlC6kx3ZqFbtwlTE5eYaPCMDUBlAi9uSyoD_dMuuv8-EF6dJbvlYOvrAM83Aya0stzDNRRQe2LZNylNzr4gQ1siYCnLr9wWbMLE85DbYe1sy0NUF_IMULBaydh2nU2FFIZWBlfM",
    alt: "stylized arrangement of green ceramics on a wooden shelf with sunlight",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARhkU2xs3JxT9BtXqTp2uOvhJhM50RxZv69DdthTS5m5WOPAsfPRaaS0H0YHDcG5Ey5ulgrAgdJiH8JwBE8JSMeyhB0Fx2_w33xEsWE7FFHtuWj95Vjz-sx4vDV2EcycyoNPZgxe5KxP5vJ6mZUhbqj1kdxuO-pEZ6m_EH1nuMy6EMpnaW7yra82e6jg6KZKLDn-ouGBDqv8dPuBb57rcDqAROzNND6rx24qlHXOcCVefb-iZEweRaUl_i976NCap6SQEvZBi9Br0",
    alt: "minimalist room with emerald green ceramic vase on a side table",
  },
];

const relatedItems = [
  {
    title: "Tidal Incense Holder",
    price: "$45.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdVabJfvmYO2Z6NWq1pWQPuKRkTP5Z8LddZiVme8ekGIlt0FaaVVe2RaGo3vug7-jdUL11rUjI3L6iaMKFBBtMn_aTErim464L0Ov4J3XocOIcloW_ojE34qKrGlJe7UMNuiQEYUfnvLTXP4bcKgOHMalQy-JV1nQ8pNfDnDw60kJ9VOTSpveURH4QCThqmTc-4Jt45R5Q8SpjAlbdLHRzHmXqilZxiKNXL4IIqs56SHGaEj65q5jsmRhSkT6VMS3wuRcFwKdR3KM",
    alt: "minimalist white ceramic tray with subtle grain on a stone surface",
  },
  {
    title: "Shoreline Pinch Bowl",
    price: "$32.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJMwmGMcto4olY9LQjt_bP9qIk7-1FVsv4808GhH3WHKvkiTKzc4_-KFzqg2U4GUTVTQSG2_PcNevHtorQa0dOJVAp6BKkYDYqea17QNgWENKgfyeHkQfacYlpK5s94_KVAiK6v6hRPAO8SE-Bi8yGf5eb-c9Rl7QrBFdIcB_zRO_INVzjN6-oSvhco3I_Zmt92UdT0NNyNaz7zfWxWXogrv6KrjzY7PHV3OhE4iVNXDm2psqUa_6x5_pI9ck0Cn9H37fbA2Kh3YM",
    alt: "small textured emerald ceramic bowl for salt or spices, studio lighting",
  },
  {
    title: "Abyssal Serving Platter",
    price: "$120.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-EWK1GVzbd1h3aP68SRH0_L8ikTaX7ibw45DkCxuI-oBM1kHIgohYSxJDCEm0v39vk___Grlz-gOwkWIGwrh-zRCHj3wtmuXcP0aojo8SW4qh3_Dh7i2v6LhNzI9p_aLrvVh-MI54r46eQDBTDqZheI8sJGpmAdTkbZZWrIXrRSkGgMHv5CNWRSc26QjdBLnrEvK2eV-tGYwrbiXR4Wq0Zj8uGVS-joUAiUTJ3TE-M7z-ewPgkEAWvXa97e-0GrMvveUKsxgtbXQ",
    alt: "large shallow emerald ceramic fruit bowl with artistic glaze patterns",
  },
  {
    title: "Lagoon Bud Vase",
    price: "$85.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUy2hNiIIzvKz6-CDHMVWHgO_SGnbX-LaS3FnO8tC3mP63-VQVjYaBLrO_76l_TxwD-1TK6QphqQAUuiyKhdaHCAZv3JR3PWFviBhMZKp4maTZc0p5UC0bsLzFZ5cp0vN5q403-yC1YG1577hfPAixKpsOxdlWPUtadewuuWvHbmatAhhZJ6Q5NE2XHviev2ArFrv0CWiaeVFv4w1WE218KRTapLTJDz55vI_PHDycInU7pA6wBmFnXcvnFf335Fs11nUgyqgRlFU",
    alt: "tall cylindrical ceramic vase in deep green with organic dripping glaze effect",
  },
];

const productSpecs = [
  { label: "Material", value: "High-fired stoneware clay, lead-free glaze" },
  { label: "Firing Temperature", value: "1,240 C (cone 6 oxidation)" },
  { label: "Finish", value: "Reactive glossy-matte blend, hand-polished base" },
  { label: "Colorway", value: "Emerald Tide (deep green with ocean-like tonal flow)" },
  { label: "Weight", value: "Standard: 1.1 kg | Grand: 1.9 kg | Tall Slim: 1.4 kg" },
  { label: "Dimensions", value: "Standard 8 x 5 in | Grand 12 x 8 in | Tall Slim 15 x 4 in" },
  { label: "Care", value: "Wipe with soft cloth, avoid thermal shock, dishwasher safe on gentle cycle" },
  { label: "Origin", value: "Handcrafted in small batches by Elena Vance Studio" },
];

const variantDetails = [
  {
    name: "Standard",
    size: '8" x 5"',
    capacity: "1.3 L",
    bestFor: "Console table, compact shelf styling",
    colors: "Emerald Tide, Moss Fade, Sand Mist",
    stock: "In Stock",
  },
  {
    name: "Grand",
    size: '12" x 8"',
    capacity: "3.1 L",
    bestFor: "Floor statement, dining centerpiece",
    colors: "Emerald Tide, Obsidian Drip",
    stock: "Low Stock",
  },
  {
    name: "Tall Slim",
    size: '15" x 4"',
    capacity: "1.6 L",
    bestFor: "Long stem floral arrangement",
    colors: "Emerald Tide, Moonstone",
    stock: "Pre-Order 5-7 days",
  },
];

const productReviews = [
  {
    name: "Alya Putri",
    rating: 5,
    date: "2 hari lalu",
    variant: "Standard - Emerald Tide",
    comment:
      "Finishing glaze-nya cantik banget dan warna hijaunya hidup. Datang aman tanpa retak, packaging sangat rapi.",
  },
  {
    name: "Rendra Mahesa",
    rating: 4,
    date: "1 minggu lalu",
    variant: "Grand - Obsidian Drip",
    comment:
      "Ukuran sesuai deskripsi, beratnya solid. Cocok untuk centerpiece meja makan. Pengiriman sedikit terlambat tapi kualitas oke.",
  },
  {
    name: "Nadya K.",
    rating: 5,
    date: "2 minggu lalu",
    variant: "Tall Slim - Moonstone",
    comment:
      "Model tinggi rampingnya elegan banget buat bunga tangkai panjang. Warna dan tekstur persis foto produk.",
  },
];

export default function ProductDetailPage() {
  return (
    <div className="space-y-16 rounded-2xl border border-slate-200/70 bg-white/95 p-6 pb-16 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-8">
      <nav className="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <span>Shop</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span>Vases</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-semibold text-slate-800">Emerald Tide Vessel</span>
      </nav>

      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100">
            <img
              alt="Main Product Image"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUX3CPJVzX11PydCpedhD-p5VZtsdC0Q7n69I8pNdZdSotelzAYhQKXzzEmMZFbm9x2PIZ0yWh7p4VuoNXHqUWlqDLUj7xQ2jYbG_K2H0XIpYmIif4Vse0frNE34zXzNL-myY0zm6Y2MseEv9ti1iN_pPJUnSGiFOGW0BYPoYAoKPK-yKOAd72zXiu25HrIuQIjfc42bZeS4leOvYHZGzLGRm5T2CT5rooMqoeT8Ld4PTEgUKDlsAMAkO1OErLf-FJ4qpLVU5Dpj0"
            />
            <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-emerald-900 opacity-0 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100">
              <span className="material-symbols-outlined text-sm">zoom_in</span>
              Click to zoom
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {productGallery.map((item, index) => (
              <button
                key={item.image}
                className={
                  index === 0
                    ? "aspect-square overflow-hidden rounded-lg border-2 border-emerald-600 bg-white ring-2 ring-emerald-100 ring-offset-2"
                    : "relative aspect-square overflow-hidden rounded-lg border border-transparent transition-all hover:border-emerald-300"
                }
              >
                <img
                  alt={`Thumbnail ${index + 1}`}
                  className={index === 4 ? "h-full w-full object-cover opacity-50" : "h-full w-full object-cover"}
                  src={item.image}
                />
                {index === 4 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-700">+3</div>
                ) : null}
              </button>
            ))}
          </div>

          <section className="rounded-xl border border-slate-200 px-4 py-3 md:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-3 md:gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img
                    alt="Merchant Avatar"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfrjJ08G2wbypQeEqeWZQ6lqzW_A4xEyM-04pnOqUkZBkqt6KO0Vt9iltn_3rblql7PxfJ9O5Z6S2jetNOeAz1V-tRm3zSfpC-wCo3HrEKj7wEgwCcE0STGAlhWaW3c8BIY8v1tDu_6NGUdillpe37xl1RKMRtDNMxZEoFcCAVApJuYtRbBs1AgN8AnrDXyXXdRx1BGwD-ibK3-JbVrxZRcO1QSRxvhy1f5m3E0GG91X_34nJ93ppJCCku3oTvHg6PRDaruX0QPHg"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Official Artist</p>
                  <Link href="/seller/elena-vance-studio" className="truncate font-bold text-slate-800 hover:text-emerald-700">
                    Elena Vance Studio
                  </Link>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">eco</span>
                    100% Sustainable
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">local_shipping</span>
                    Carbon Neutral Delivery
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-emerald-700">history_edu</span>
                    Lifetime Guarantee
                  </span>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <p>
                    <span className="font-bold text-slate-800">4.9</span> Rating
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">97%</span> Chat Response
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">1.2k+</span> Sold
                  </p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Link
                  href="/seller/elena-vance-studio"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:border-emerald-700 hover:text-emerald-700"
                >
                  <span className="material-symbols-outlined text-sm">storefront</span>
                  Kunjungi Toko
                </Link>
                <button className="inline-flex items-center gap-1 rounded-full border border-emerald-700 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white">
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Chat
                </button>
                <button className="inline-flex items-center gap-1 rounded-full border border-emerald-700 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Follow
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-5">
          <section>
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded-full bg-emerald-100/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                New Arrival
              </span>
              <div className="flex items-center gap-1 text-slate-800">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold">4.9</span>
                <span className="text-sm text-slate-500">(124 reviews)</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-slate-900 md:text-5xl">Emerald Tide Vessel</h1>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-slate-900">$245.00</span>
              <span className="text-slate-500 line-through">$320.00</span>
            </div>

            <p className="text-lg leading-relaxed text-slate-600">
              Each vessel is hand-thrown using local kiln-fired clay, finished with a signature deep-forest reactive
              glaze that mimics the churn of ocean currents. No two pieces are identical.
            </p>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Select Size</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center rounded-xl border-2 border-emerald-700 bg-white py-4 shadow-sm">
                <span className="font-bold text-slate-800">Standard</span>
                <span className="text-xs text-slate-500">8&quot; x 5&quot;</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-xl bg-slate-100 py-4 transition-colors hover:bg-slate-200">
                <span className="font-bold text-slate-800">Grand</span>
                <span className="text-xs text-slate-500">12&quot; x 8&quot;</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-xl bg-slate-100 py-4 transition-colors hover:bg-slate-200">
                <span className="font-bold text-slate-800">Tall Slim</span>
                <span className="text-xs text-slate-500">15&quot; x 4&quot;</span>
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <button className="w-full rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-800 py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
              Buy It Now
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-200 py-5 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-300">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">Voucher Toko</h3>
              <button className="text-xs font-bold text-emerald-700 hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                <div>
                  <p className="text-sm font-bold text-slate-800">Diskon 10%</p>
                  <p className="text-xs text-slate-500">Min. belanja $120 | Maks. $18</p>
                </div>
                <button className="rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">Klaim</button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                <div>
                  <p className="text-sm font-bold text-slate-800">Gratis Ongkir</p>
                  <p className="text-xs text-slate-500">Min. belanja $80 | Pilih standard courier</p>
                </div>
                <button className="rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">Klaim</button>
              </div>
            </div>
          </section>

        </div>
      </section>

      <section className="space-y-10 rounded-2xl border border-slate-200 p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Product Specification</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Detailed Specification</h2>
          </div>

          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {productSpecs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 gap-1 px-4 py-3 md:grid-cols-[180px_1fr] md:gap-4">
                <p className="text-sm font-semibold text-slate-700">{spec.label}</p>
                <p className="text-sm text-slate-600">{spec.value}</p>
              </div>
            ))}
          </div>
          </div>

          <div className="md:col-span-5">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Available Variants</span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Variant Details</h3>
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
              {variantDetails.map((variant) => (
                <article key={variant.name} className="px-4 py-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-800">{variant.name}</h4>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">{variant.stock}</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">Size:</span> {variant.size}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Capacity:</span> {variant.capacity}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Best For:</span> {variant.bestFor}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Color Options:</span> {variant.colors}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Ulasan Produk</span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Review Pembeli</h3>
            </div>
            <button className="text-sm font-bold text-emerald-700 hover:underline">Lihat Semua Ulasan</button>
          </div>

          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {productReviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="space-y-2 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.variant}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">{review.date}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`${review.name}-star-${index}`} className="material-symbols-outlined text-base">
                      {index < review.rating ? "star" : "star_outline"}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">The Ensemble</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter md:text-4xl">Complete the Collection</h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-emerald-700 transition-all hover:gap-4">
            View Full Series
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {relatedItems.map((item) => (
            <article key={item.title} className="group cursor-pointer">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                <img alt={item.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} />
                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-white hover:text-rose-600 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                </button>
              </div>
              <h4 className="font-bold text-slate-800 transition-colors group-hover:text-emerald-700">{item.title}</h4>
              <p className="text-sm font-medium text-slate-500">{item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
