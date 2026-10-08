import { cn } from "../../cn";
import { Reveal } from "../reveal/reveal";

export function SectionHead({
  label,
  title,
  aside,
  action,
  light = false,
  className,
}: {
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  action?: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-[clamp(3rem,6vw,5.5rem)]", className)}>
      <div
        className={cn(
          "type-label mb-[clamp(2rem,4vw,3.5rem)] flex items-center justify-between gap-6 border-t pt-4",
          light ? "border-paper/18 text-paper/55" : "border-line-strong text-muted",
        )}
      >
        <span>{label}</span>
        {action ? <span className={light ? "text-paper" : "text-ink"}>{action}</span> : null}
      </div>
      <div className="grid gap-x-6 gap-y-8 min-[960px]:grid-cols-12 min-[960px]:items-end">
        <Reveal as="h2" className="type-h2 min-[960px]:col-span-7">
          {title}
        </Reveal>
        {aside ? (
          <Reveal
            as="p"
            delay={100}
            className={cn("type-lead max-w-[34ch] min-[960px]:col-span-4 min-[960px]:col-start-9", light ? "text-paper/65" : "text-ink/70")}
          >
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
