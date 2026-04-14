import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-100/90 py-12 text-xs text-slate-500">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">The Curated Canvas</h3>
            <p className="max-w-xs leading-6">
              An editorial marketplace for modern homes. Handpicked excellence for every room.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-700">Gallery</h4>
            <ul className="space-y-2">
              <li><Link href="/categories">About Us</Link></li>
              <li><Link href="/chat">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-700">Assistance</h4>
            <ul className="space-y-2">
              <li><Link href="/orders">Shipping Policy</Link></li>
              <li><Link href="/profile">Terms of Service</Link></li>
              <li><Link href="/profile">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-700">Newsletter</h4>
            <p className="mb-3">Join our curation for weekly drops.</p>
            <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
              <input className="w-full px-3 py-2 text-sm focus:outline-none" placeholder="Email" />
              <button className="bg-emerald-700 px-3 text-white">
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p>Copyright 2026 The Curated Canvas. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
