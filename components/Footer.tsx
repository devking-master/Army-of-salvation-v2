import Link from "next/link";
import { Facebook, Instagram, Mail, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cyan-300/20 bg-slate-950 py-12 sm:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      <div className="container-pad grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.7fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <Shield size={18} />
            </span>
            <h2 className="font-black uppercase italic tracking-wide text-white">Sure and Steadfast</h2>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
            A futuristic Boys’ Brigade digital command center for mission, membership, leadership, registration,
            and archive presentation.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[.2em] text-cyan-200">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href="/about" className="hover:text-cyan-100">Mission</Link>
            <Link href="/activities" className="hover:text-cyan-100">Operations</Link>
            <Link href="/gallery" className="hover:text-cyan-100">Archive</Link>
            <Link href="/join" className="hover:text-cyan-100">Recruitment</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[.2em] text-cyan-200">Signal</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">contact@bbcommand.org<br />+234 000 000 0000</p>
          <div className="mt-5 flex gap-3 text-cyan-100">
            <Facebook size={18} />
            <Instagram size={18} />
            <Mail size={18} />
          </div>
        </div>
      </div>
      <div className="container-pad mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-slate-500">
        © 2026 Boys’ Brigade | Command Center Ops
      </div>
    </footer>
  );
}
