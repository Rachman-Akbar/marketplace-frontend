import Link from "next/link";

const vouchers = [
  { title: "10% Off", subtitle: "Min. spend $50.00", cta: "Claim" },
  { title: "$5 Voucher", subtitle: "No min. spend required", cta: "Claim" },
  { title: "Free Gift", subtitle: "With any ceramics order", cta: "Copy Code" },
  { title: "15% Off", subtitle: "New subscriber exclusive", cta: "Claim" },
];

const products = [
  {
    title: "Artisan Clay Table Vase",
    price: "$45.00",
    sold: "540 sold",
    rating: "(142)",
    badge: "Top Seller",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCywA1ZpBLhvFvelMGIEGFqxDHCjIQQxMcImEw0Qps2UFfyvk7q3foO2xu7gGxCjvkRXVpJsIMHFOfnb_kBWgNBxgOYVRrSb66BJ73XVHETEmpzQ2VakzbovX2dEl3lRKkWQWE4ffJqdyzQLfGrGwnUH_7rMZjjP5CjJeYVv_6r6keaU6QV4AwqC9C5bvzAVT_W29aJ8-rfNdOfI1uAVsv7L6BVzEka52KAF0iAK6qOdfRloQbCe0uW3_p5gsgJn-SusypO0IT9ZAE",
  },
  {
    title: "Sustainable Soy Candle",
    price: "$22.00",
    sold: "210 sold",
    rating: "(89)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6fxXTYmUuJP0ntZ58yeZj6FSfSTm493mWVnm9SpiiFvj4gGkZljPcluk8ch_S2F7Vh_Rdyraokn5alSRqLvFnvFLDcJmMBuHsyCBCGs-Uy308H2Di758_L4X82-eoz9_dayurELVZ6LWjSpOYzDdhA5OU_Rq8GYiyBCheM69Fnyw4jhPhA5HCiB_y7uM1ur9pBlOvtgQ6K9hT1JHCWrRCZg6ESK2lZSfcgD5mMzNm8UoRRQZVXI24qHt2slCG5zGTt06AY8wEe9s",
  },
  {
    title: "Woven Seagrass Basket",
    price: "$38.50",
    sold: "1,100 sold",
    rating: "(256)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9t8aQUWXW-Q2AMm--Sm7PGLW2EFxhzhsfx1dI56GAlNIkNTnIE3JbhryrFT2uxYVqATTcwXlwMezk-HkZcWfh906s1AQ-QJ6uVetBzatYBRlSPmDGQtH799UhtTo7ozBe52xsonM6PjftGTw1oP_ANd49mN6pzbqGblGXnMMum-61npDhoZgwl9p5gK7YP-_SmBpgdc6bSuLw_wJl8LUdwhDBI4iA0ifpefyQF5ApBIk75iES5O_9dw4MIX2Wtqeezr5uG1rtr6c",
  },
];

const gallery = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDk-BLRbMsl-jsp5r9aL-IX30KWwgIpFDwHrI7ilfDUbSRTLBYRn4xy8Qy_uH-giNd9gFTtdI9pjbf1JuZJ2F-dbk4u3IRJwb2Vh_zePdm0XiuMbns7YSfXYvgkRUXRva5DYj9cqRPnqTBMucs61H39nIrKvGyGsdX52X3W0gAgIf1qtZWVogOcXQChPLVBvI0JwlIXdLPfZWjwabfl1_tpfa2hPj0E-0J8TZOlfZtrA0mFgid94QDS-m9VMQn-SvOFv34JDC2rTKU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBW87yOtaBr86V-uXWkoeP9KhbYL6NAeGRGB1sCxv8xZCOR0BONR84-7B4XqL6FWORP7nmz_Chi1GzAn29wke0rfTlXUvP27ToMGegqnRqbP7K5vewflBJr9H3Q3ILt1xgt5hsruahgu3ElSwBNj4JzRg8eNtAIHI-lC42EuH1CBf89A_bNErQw-Le4sqeamlXW2-kCNW_ooSG6K7yYloAH1GsnryXW4lGRJYvL_akkQWTLT3jPj9yxjTwa_AWgUIZ4kbkFKxBKr_Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDyHdhwegqnRxN_B236jA5oyi2h_jjOI0MIp979J3tnUEDa0LzBJJCGdWHAH55SdtoE0NpkEATN8GoBa3y90LWL5-0DqWCcPv3qqfxzBjmjaBHXTOpua7rw1wCZ5ZIwvpEDLF7Li5WM5Z8FQI0RbqaNXtAHccep3j3pzXabmolDqz9pTfHMk8ZV-SyPZ-nh13vyPRHE1vDjwZl5MfUYIStzb7nT3PU7EzXMniV123C0IQYMOk5yiB7QpD2EDnhptLfrTUNe6mloJRI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-EcRRh-f4JoyR-Mf9gSij9d3c7mRLzxvyRvvm5CQzS_lLpbWv5yVEZKkU5SyfvMPvh4Ed3gpLXZ8U5wLz3t3tB8-uNwZb-63FyhBSyBRXf7D-WM7XHGQ79Uwo1X0VuS5jqkvxVM_dclD5lDyhMxdI7fH-ZYyAiCgKC4afWURHyHzXAelBI8vy6O0CzFwfUld9YdIzlbi_PMZCo-ZIhypGmslvpBFMBm6VBwJMMkpHsSLGTqYTqchCzI62JgyfHm3Wx3WUbdcXka4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcds42-bkADYkHmnO7b3wBg7_CkpBUjdzyZqP6ThNcKXN1DaD_P8VGPoyRWDKBOVgZbVVxFcJpaSYei5gPP0t_ZTcCWpfBzftxEWz3etl4mi-GosmmLWE6dWRTISkKMnxlRfzFDJAyaCxa7iX5sv1rfgsvkkCf4aMBQkDauA_EEU_94oaXwAbs241Wx_r3-Mjo0W7Sm34tabbDKaH-FMwCrRtzLIyPeD4hYvKXusAPPRE5rusFYfsGKPgTj6m6KqAtzzHqOUIjvs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBb-HoJLSHdUTf3MM42SBbNbTGKA3xpklezYn88jsWzMs6bm05nB2FJpmVGTWBssA83iro73WqLEg9SlW0MHNunniA7CT0t6thl8xgcDihLs3KrfK8trEL26V0Zlf3D_y37q-CsSQfesljZ8MyMCCjTXS-xRDVhk9tQU_IsCyoTr6_OtgG99TVKXsxkNJDNJX9Wx42vwWjCpSRjyrPARh62id7sjYocd2r-9XwZAlnIJh7JkQSqligI5idZ11HJe1QSzz7EBe0k4SI",
];

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SellerStorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const storeName = slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="space-y-12 rounded-[28px] bg-white px-4 pb-16 pt-4 md:px-6 md:pt-6 lg:px-8">
      <header className="relative">
        <div className="relative h-52 overflow-hidden rounded-xl md:h-72">
          <img
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_BvRx8agWEerwDib-acJsx_P46N3Tgd_e2DsIf8BzgO7qa3uBuOqMsSJJm7NZRHatfw5WixT2iFONa0o7zq-sFN3SrbWF0555C6y0LwKK26RRjdv2QjxGyUmJZFqueMzcCZlxKE0PRAzgvresu1hzxELsIPFIG8XTI_MAlvUWNGuQrPY87TE9AqtawhNUNvTj4ZIPfprCZlS-X3AIsyR_JdS8a9H4ZNZP2jW1PjICLjDhOCmTMEMgatu3V54PdW0L70V51GAhUM"
            alt="Store Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        <div className="relative -mt-16 flex flex-col gap-5 px-4 md:-mt-20 md:flex-row md:items-end md:px-6">
          <div className="h-28 w-28 overflow-hidden rounded-xl border-2 border-white bg-white p-1 shadow-lg md:h-36 md:w-36">
            <img
              className="h-full w-full rounded-lg object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBERR7t2FqSZvYVpIX1PdHdjULpgoSLXoSz6NpnU1ibuEgKTgSB0zmYYe2HrOQGrhRrqlBDezIa3N4qpDPrrRV5dGRrbRRAFvZzkaRCs--uin640494hbdU72I6bXYBtJLsbMXzQ9un-zSXqXahK7qE_7_CdKy52_7ajvMmcCL04m5YRQwIuXir3_sdy9Mh1bHcbGTxw8zjxGu3qIpz4Yi1gxUteeAnBK3V8I6WxM7cJmbfHN9wlM8Jy67skQIBXiJ2Lf_xa35gm2c"
              alt="Store Profile"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{storeName}</h1>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Online
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <p className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-slate-700">star</span>
                  <span className="font-bold text-slate-800">4.9</span> (2k reviews)
                </p>
                <p className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  98% response rate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-1 rounded-lg border-2 border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                <span className="material-symbols-outlined text-base">chat</span>
                Chat with Seller
              </button>
              <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                Follow
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vouchers.map((voucher) => (
          <article key={voucher.title} className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
            <p className="text-2xl font-extrabold text-slate-900">{voucher.title}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{voucher.subtitle}</p>
            <button className="mt-4 w-full rounded-lg bg-slate-900 py-1.5 text-xs font-bold text-white">{voucher.cta}</button>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden space-y-6 lg:block">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="material-symbols-outlined text-slate-700">filter_list</span> Filters
            </h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> Living Room</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Bedroom Decor</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Kitchen Artisans</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Sustainable Textiles</label>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h4 className="mb-4 text-lg font-bold">Customer Reviews</h4>
            <div className="space-y-3">
              {[85, 10, 3, 1].map((value, index) => (
                <div key={value} className="flex items-center gap-2">
                  <span className="w-4 text-xs font-bold">{5 - index}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full bg-slate-700" style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white">All Products</button>
              <button className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">New Arrivals</button>
              <button className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">Best Selling</button>
            </div>
            <select className="rounded-lg bg-white px-3 py-2 text-sm font-bold shadow-sm">
              <option>Popularity</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.title} className="group overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_rgba(44,52,54,0.06)]">
                <div className="relative h-64 overflow-hidden">
                  <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={product.image} alt={product.title} />
                  {product.badge ? (
                    <span className="absolute left-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-800 group-hover:text-slate-900">{product.title}</h4>
                  <p className="mt-1 text-xs font-medium text-slate-500">{product.rating}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900">{product.price}</p>
                      <p className="text-[10px] text-slate-500">{product.sold}</p>
                    </div>
                    <Link href="/products/emerald-tide-vessel" className="text-xs font-bold text-slate-700">
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Artisans in the Wild</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {gallery.map((image, index) => (
            <div key={image} className="aspect-square overflow-hidden rounded-xl">
              <img src={image} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
