import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { HoverCard } from "./Motion";

export default function EventCard({ event }: { event: { id: string; title: string; date: string; location: string; description: string } }) {
  return (
    <HoverCard className="command-card flex h-full flex-col">
      <p className="kicker w-fit">Mission Event</p>
      <h3 className="mt-4 text-xl font-black uppercase text-white sm:text-2xl">{event.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-steel">{event.description}</p>
      <div className="mt-6 space-y-2 text-sm text-ice">
        <p className="flex items-start gap-2"><Calendar className="mt-0.5 shrink-0 text-sky" size={18} />{formatDate(event.date)}</p>
        <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0 text-sky" size={18} />{event.location}</p>
      </div>
      <Link className="ghost-btn mt-6" href="/contact">Request Details</Link>
    </HoverCard>
  );
}
