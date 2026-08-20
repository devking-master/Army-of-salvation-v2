"use client";

import { useState } from "react";
import { gallery } from "@/data/site";
import { X, Maximize2 } from "lucide-react";

export default function GalleryGrid() {
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null);

  return (
    <>
      <div className="grid auto-rows-[190px] gap-4 sm:auto-rows-[220px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {gallery.map((g, i) => (
          <button
            key={g.title}
            onClick={() => setActive(g)}
            className={`${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""} group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-cover bg-center text-left shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/60`}
            style={{ backgroundImage: `linear-gradient(to top, rgba(3,7,18,.93), rgba(3,7,18,.16)), url(${g.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-transparent to-red-500/0 transition duration-500 group-hover:from-cyan-500/20 group-hover:to-red-500/20" />
            <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-cyan-100 opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
              <Maximize2 size={17} />
            </div>
            <div className="absolute bottom-0 w-full p-4 sm:p-5">
              <p className="text-[9px] font-black uppercase tracking-[.2em] text-cyan-200 sm:text-[10px]">{g.category}</p>
              <h3 className="mt-1 text-base font-black uppercase italic text-white sm:text-lg">{g.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-5"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-950 p-3 shadow-2xl shadow-cyan-500/20 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X />
            </button>
            <div className="aspect-[4/3] rounded-2xl bg-cover bg-center sm:aspect-[16/10]" style={{ backgroundImage: `url(${active.image})` }} />
            <div className="p-3 sm:p-4">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-200">{active.category}</p>
              <h3 className="heading-md mt-1">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
