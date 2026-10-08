import { cn } from "../../cn";

export function Quote({
  quote,
  name,
  project,
  className,
}: {
  quote: string;
  name: string;
  project: string;
  className?: string;
}) {
  return (
    <figure className={cn("grid content-start gap-6 border-t border-line-strong pt-6", className)}>
      <blockquote className="font-serif text-[clamp(1.2rem,0.6vw+1.05rem,1.5rem)] leading-[1.42] text-ink">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="type-label flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-ink">{name}</span>
        <span className="text-muted">{project}</span>
      </figcaption>
    </figure>
  );
}

export function QuoteGrid({ children }: { children: React.ReactNode }) {
  return <div className="columns-1 gap-x-[clamp(2rem,4vw,4rem)] min-[760px]:columns-2 min-[1180px]:columns-3 [&>*]:mb-[clamp(2.5rem,5vw,4rem)] [&>*]:break-inside-avoid">{children}</div>;
}
