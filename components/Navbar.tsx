"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-300/10 bg-slate-950/75 backdrop-blur-2xl">
      <nav className="container-pad flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl">
            <Image src="/images/gallery/Logo.png" alt="Army Of Salvation Logo" width={56} height={56} className="object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black italic tracking-tight text-white sm:text-base">
              ARMY OF SALVATION
            </span>
            <span className="hidden text-[9px] font-black uppercase tracking-[.25em] text-slate-500 sm:block">
              Christway Army Of Salvation
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.filter(l => l.href !== '/join').map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-[11px] font-black uppercase tracking-wider transition ${
                path === l.href ? "text-cyan-200" : "text-slate-300 hover:text-white"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-cyan-300 transition-all ${
                  path === l.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link href="/join" className="command-btn px-5 py-2">
            Join
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="container-pad border-t border-cyan-300/10 pb-5 lg:hidden">
          <div className="grid gap-2 pt-4 sm:grid-cols-2">
            {navLinks.map((l) => (
              <Link
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider transition ${
                  path === l.href ? "bg-cyan-300/10 text-cyan-100" : "text-slate-200 hover:bg-white/5"
                }`}
                key={l.href}
                href={l.href}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
