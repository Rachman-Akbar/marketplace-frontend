import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Order History</h1>
        <p className="mt-2 max-w-2xl text-slate-500">Review your past acquisitions and track currently active shipments.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {['All Orders', 'Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'].map((t, i) => (
          <button key={t} className={`rounded-full px-5 py-2 text-sm font-semibold ${i === 0 ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-600'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { id: 'CC-84920', total: '$1,240.00', status: 'Shipped', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYvIkezl66gv-ZFnxGxVj83Hckoje1ufIV7omO23dD7AuLbT9wlgaBPRvL8q1jjeC48uJTwo8dzqUZ4lejPzFaU9eo7nEaUTlA2AIbPOezs-9Lg3lnTA6umlQp8OgvKu4IT76mrG8y1j0fsOBCVOceN-BoE1c_zCKmKfxW2Pwiylf9AurbXQA1n-9Da92N7kttxhEAp1ucPiGPkK8SsH74QNjJTEr29i34lNCQeR2bbCb1XIJ7p9ZrtOZ4aEeKmNsTB5TQoBhK05c' },
          { id: 'CC-84811', total: '$450.00', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjY5VXHOQ5LjB-T_0Gv4TFRj_F8sXjLeBwQ2x4yBhKMWJ9Pu3DlpYav8QDJ2pk7SimEbSFDS1Ej9EfBgHIDA-IcOD3Nin11enWvvyhwXb7izMAW88IwcQGyRE5gLPIbEhlW9DjKCy8pz8jbQ9DqWR_dHiR5e9M7aeUgbD0nxsxrztk_Et3a1xUWLSYZm7qNpcjmb--E7Z1yQRL9U54Ppp7AYYZvRzkZH3kOhd8J5JZRUFfzMHHSipziI5DSJaTfPW07M3TRQX6Akk' },
          { id: 'CC-85004', total: '$2,800.00', status: 'Pending', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5KloplWfVXMVT1C5Cy9I6Gd0Q8eT7bo_H0MuAPiyRqw8Be9VHP9gVgZBa1hf4dlyOSjMg1wShTc1GXiyPTXxiaZNwqtDUh90HsdQNqllPkxNYjXYYQ_1y9lMKTsaEUCeCbOG3tA-_jNYPvU-_IE_c_OttCV5XFOVEidyuzEIapxCmWt_yhBeufIrQ0ZxR13O1YfGc8XnaBqIAfCCP3E2cI0j9eDTlIwU9Uwfwcc92Vx_zTywQo5BNHtmHYK3VichNQ1m4pCnr_4M' },
        ].map((o) => (
          <div key={o.id} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <img src={o.img} className="h-28 w-28 rounded-lg object-cover" alt={o.id} />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-3xl font-bold tracking-tight">Order #{o.id}</h3>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold">{o.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Placed on Oct 24, 2023</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <p className="text-3xl font-bold text-emerald-700">{o.total}</p>
                  <Link href="/orders/CC-82910-442" className="font-bold text-emerald-700">View Detail</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="rounded-lg bg-emerald-700 px-8 py-3 font-bold text-white">Load Older Orders</button>
      </div>
    </div>
  );
}
