import Link from "next/link";
import { ArrowRight, ChevronDown, Radar, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ActivityCard from "@/components/ActivityCard";
import LeaderCard from "@/components/LeaderCard";
import GalleryGrid from "@/components/GalleryGrid";
import RegistrationForm from "@/components/RegistrationForm";
import { Reveal } from "@/components/Motion";
import { activities, leaders, pillars } from "@/data/site";
import IconBox from "@/components/IconBox";

export default function Home() {
  const stats = ["Faith", "Discipline", "Service", "Leadership"];

  return (
    <>
      <section className="hero-bg scan-lines noise relative min-h-screen overflow-hidden pt-24 sm:pt-28">
        <div className="orb left-[-10rem] top-24 h-72 w-72 bg-cyan-400/20 sm:h-80 sm:w-80" />
        <div className="orb right-[-12rem] top-40 h-80 w-80 bg-red-500/20 sm:right-[-6rem] sm:h-96 sm:w-96" />
        <div className="container-pad grid min-h-[calc(100vh-6rem)] items-center gap-12 pb-16 lg:grid-cols-[1.05fr_.95fr] lg:pb-8">
          <Reveal>
            <span className="kicker">
              <Radar size={14} /> Operational Readiness: Future-Ready
            </span>
            <h1 className="heading mt-7 max-w-4xl">
              We Stand <span className="text-sky-glow">For Christ</span>
              <br className="hidden sm:block" /> 
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base md:text-lg md:leading-8">
              The Army Of Salvation stands as a beacon of faith, discipline, leadership, and service. Through Christian training, mentorship, fellowship, and community outreach, we are committed to building men and women of character who will serve God faithfully and lead with integrity in every sphere of life.

            </p>
            <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row">
              <Link href="/join" className="command-btn">
                Join The Brigade <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="ghost-btn">
                Explore Mission
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
                  <p className="text-xl font-black text-white sm:text-2xl">0{i + 1}</p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[.18em] text-cyan-200 sm:text-[10px]">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="hidden lg:block">
            <div className="floaty relative mx-auto max-w-md rounded-[2rem] border border-cyan-300/25 bg-slate-950/45 p-4 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[url('/images/gallery/colour-party.jpg')] bg-cover bg-center" />
              <div className="absolute -bottom-6 -left-6 max-w-[13rem] rounded-2xl border border-cyan-300/25 bg-slate-950/75 p-5 backdrop-blur-xl">
                <ShieldCheck className="text-cyan-200" />
                <p className="mt-2 text-sm font-black uppercase text-white">Command Verified</p>
                <p className="text-xs text-slate-400">QR profile ready</p>
              </div>
              <div className="absolute -right-5 top-10 rounded-2xl border border-red-300/25 bg-red-500/10 p-4 backdrop-blur-xl">
                <Sparkles className="text-red-200" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad surface-grid bg-slate-950/70">
        <div className="container-pad">
          <SectionHeader title="Core Pillars" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div className="command-card h-full">
                  <IconBox name={p.icon} />
                  <h3 className="font-black uppercase text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-gradient-to-b from-slate-950 to-[#061525]">
        <div className="orb left-1/4 top-20 h-72 w-72 bg-cyan-400/10" />
        <div className="container-pad">
          <SectionHeader title="The Leadership Journey" subtitle="A rank-based growth path from recruitment to strategic command." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {["Recruit", "Cadet", "Junior Leader", "Senior Leader", "Officer"].map((s, i) => (
              <div
                className="relative rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-5 text-center backdrop-blur-xl"
                key={s}
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-black text-white">{s}</h3>
                <div className="mx-auto mt-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-400">
                  {i === 0 ? "Foundation Stage" : i === 1 ? "Drill Acquisition" : i === 2 ? "Command Basics" : i === 3 ? "Mentorship" : "Strategic Command"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#07111f]">
        <div className="container-pad">
          <SectionHeader title="Strategic Operations" subtitle="Training programs designed for discipline, spiritual excellence, physical confidence, and leadership readiness." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <ActivityCard key={a.title} item={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad surface-grid bg-slate-950/80">
        <div className="container-pad">
          <SectionHeader title="Archive Extraction" subtitle="A living gallery of parades, officers, colour parties, and field operations." />
          <GalleryGrid />
        </div>
      </section>

      <section className="section-pad bg-[#07111f]">
        <div className="container-pad">
          <SectionHeader title="High Command" subtitle="A leadership structure built on faith, duty, excellence, and accountability." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <LeaderCard key={l.name} leader={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad surface-grid bg-gradient-to-b from-[#07111f] to-slate-950">
        <div className="container-pad">
          <SectionHeader title="Answer The Call" subtitle="Register interest, connect with the command team, and begin the journey into faith-based leadership." />
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
