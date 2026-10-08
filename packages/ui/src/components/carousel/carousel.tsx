"use client";

import { useEffect, useState } from "react";
import { cn } from "../../cn";
import { Container } from "../container/container";
import { TextLink } from "../link-arrow/link-arrow";

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 12" className={cn("w-4", back && "rotate-180")} aria-hidden="true">
      <path d="M0 6h15M10 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const control =
  "grid size-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(251,251,248,0.28)] transition-[background-color,color,scale] duration-200 ease-micro hover:bg-paper hover:text-ink active:scale-95";

export function QuoteSlider({
  label,
  quotes,
}: {
  label: string;
  quotes: readonly { quote: string; name: string; project: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = quotes.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), 8000);
    return () => window.clearTimeout(timer);
  }, [paused, count, index]);

  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <section id="reviews" className="bg-ink py-[clamp(4.5rem,10vw,9rem)] text-paper" aria-roledescription="carousel" aria-label={label}>
      <Container>
        <div className="type-label mb-[clamp(2.5rem,6vw,5rem)] flex items-center justify-between gap-6 border-t border-paper/18 pt-4 text-paper/55">
          <span>{label}</span>
          <TextLink href="/reviews" className="text-paper">
            Read all reviews
          </TextLink>
        </div>
        <div
          className="grid gap-x-6 gap-y-12 min-[960px]:grid-cols-12"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid min-[960px]:col-span-10" aria-live={paused ? "polite" : "off"}>
            {quotes.map((quote, position) => {
              const active = position === index;
              return (
                <figure
                  key={quote.name}
                  className={cn(
                    "[grid-area:1/1] transition-[opacity,translate,visibility] duration-700 ease-out",
                    active ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
                  )}
                  aria-hidden={!active}
                >
                  <blockquote className="font-serif text-[clamp(1.75rem,2.6vw+1rem,3.75rem)] leading-[1.14] tracking-[-0.018em]">
                    <p>“{quote.quote}”</p>
                  </blockquote>
                  <figcaption className="type-label mt-10 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="text-paper">{quote.name}</span>
                    <span className="text-paper/50">{quote.project}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <div className="flex items-end gap-3 min-[960px]:col-span-2 min-[960px]:flex-col min-[960px]:items-end min-[960px]:justify-end">
            <p className="type-label mr-auto text-paper/50 tabular-nums min-[960px]:mr-0 min-[960px]:mb-1">
              <span className="text-paper">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button type="button" className={control} onClick={() => go(-1)} aria-label="Previous review">
                <Arrow back />
              </button>
              <button type="button" className={control} onClick={() => go(1)} aria-label="Next review">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-2" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
          {quotes.map((quote, position) => (
            <button
              key={quote.name}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={`Show review ${position + 1} of ${count}`}
              aria-current={position === index}
              className="group py-3 text-left"
            >
              <span className="relative block h-px overflow-hidden bg-paper/18">
                <span
                  key={position === index ? `on-${index}` : "off"}
                  className={cn(
                    "absolute inset-0 origin-left bg-paper",
                    position < index && "scale-x-100",
                    position > index && "scale-x-0 group-hover:scale-x-[0.12] transition-transform duration-300",
                    position === index && (paused ? "scale-x-100" : "animate-[progress_8s_linear_forwards]"),
                  )}
                />
              </span>
              <span className={cn("type-label mt-3 block truncate transition-colors duration-300", position === index ? "text-paper" : "text-paper/40 group-hover:text-paper/70")}>
                {quote.project}
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
