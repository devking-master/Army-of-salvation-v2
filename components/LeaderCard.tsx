import { UserRound, Quote } from "lucide-react";
import type { Leader } from "@/types";

export default function LeaderCard({ leader }: { leader: Leader & { image?: string } }) {
  return (
    <article className="command-card group flex h-full flex-col p-0">
      <div className="relative h-56 overflow-hidden sm:h-64">
        {leader.image ? (
          <div
            className="h-full bg-cover bg-center transition duration-700 group-hover:scale-110"
            style={{ backgroundImage: `linear-gradient(to top, rgba(3,7,18,.92), rgba(3,7,18,.05)), url(${leader.image})` }}
          />
        ) : (
          <div className="grid h-full place-items-center bg-cyan-300/10"><UserRound /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-black text-white sm:text-xl">{leader.name}</h3>
        <div className="mt-4 flex gap-3 text-sm leading-6 text-slate-300">
          <Quote className="mt-1 shrink-0 text-cyan-200" size={16} />
          <p>{leader.quote}</p>
        </div>
      </div>
    </article>
  );
}
