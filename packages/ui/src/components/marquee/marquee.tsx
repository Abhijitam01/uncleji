import { cn } from "../../cn";

export function PressRow({ label, names, className }: { label: string; names: readonly string[]; className?: string }) {
  return (
    <section className={cn("border-y border-line", className)} aria-label={label}>
      <div className="shell grid gap-x-6 gap-y-5 py-7 min-[960px]:grid-cols-12 min-[960px]:items-center">
        <p className="type-label text-muted min-[960px]:col-span-2">{label}</p>
        <ul className="flex flex-wrap items-baseline justify-between gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-3 min-[960px]:col-span-10">
          {names.map((name) => (
            <li key={name} className="font-serif text-[clamp(1.1rem,0.8vw+0.9rem,1.5rem)] whitespace-nowrap text-ink/55 italic">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
