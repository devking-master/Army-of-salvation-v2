import IconBox from "./IconBox";
import { HoverCard } from "./Motion";

export default function ActivityCard({ item }: { item: { title: string; description: string; icon: string } }) {
  return (
    <HoverCard className="command-card h-full">
      <IconBox name={item.icon} />
      <h3 className="text-base font-black uppercase text-white sm:text-lg">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-steel">{item.description}</p>
    </HoverCard>
  );
}
