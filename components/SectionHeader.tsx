import { Reveal } from "./Motion";
export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[.3em] text-cyan-200">ARMY OF SALVATION</p>
      <h2 className="text-2xl font-black uppercase italic tracking-tight text-white md:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      {subtitle && <p className="subheading mt-5">{subtitle}</p>}
    </Reveal>
  );
}
