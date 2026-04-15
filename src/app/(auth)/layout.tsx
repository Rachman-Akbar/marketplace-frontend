import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-260px)] gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-stretch">
      <section className="relative hidden overflow-hidden rounded-2xl bg-slate-900 lg:block">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtMteekZNTxQobdwMnX-IIKml3tJHgEQm1PZ0bWEntV5tGyy_fJGIniJ8_lS33Xyj-iVcVo_H6o64ot5-UZRNqZJ62Sn3dujiG6QVTmZ5KyUY6gjYmZyWUtOLQzE75ao1EzJYmpyylQpay7o5X7Lc201r5gdImdOQ4WoPeVUaPJSEzPb0fTG7NrL2gbFvegxzPjzQj6oin-4kL0G0d1k3hes9kW4kvXfPpFQwfgUPfJY9eT0NCvLbusFyvfeYs2gqLjb2_VTYXXeE"
          alt="Auth visual"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Buyer Marketplace</p>
          <h2 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight">
            Discover curated pieces with confidence.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-100">
            Enter your member space to manage wishlist, checkout faster, and track every order seamlessly.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-lg items-center py-6">{children}</section>
    </div>
  );
}
