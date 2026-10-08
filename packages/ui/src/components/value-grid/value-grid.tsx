import { cn } from "../../cn";
import { Reveal } from "../reveal/reveal";

export function ValueGrid({ items, light = false }: { items: readonly { title: string; body: string }[]; light?: boolean }) {
  return (
    <ul className="grid gap-y-10 min-[860px]:grid-cols-3">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.title}
          delay={index * 90}
          className={cn(
            "grid content-start gap-4 min-[860px]:border-l min-[860px]:px-[clamp(1.25rem,2.5vw,2.5rem)] min-[860px]:first:border-l-0 min-[860px]:first:pl-0",
            light ? "border-paper/16" : "border-line-strong",
          )}
        >
          <h3 className="type-h3">{item.title}</h3>
          <p className={cn("type-read max-w-[38ch]", light ? "text-paper/62" : "text-muted")}>{item.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
