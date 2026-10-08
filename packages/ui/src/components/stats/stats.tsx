"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "../reveal/reveal";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.textContent = value.toLocaleString();
      return;
    }
    el.textContent = "0";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          el.textContent = Math.round(value * (1 - Math.pow(1 - progress, 4))).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

export function Stats({ items }: { items: readonly { value: number; suffix: string; label: string }[] }) {
  return (
    <Reveal delay={200}>
      <dl className="mt-14 grid grid-cols-3 gap-x-[clamp(1rem,3vw,2.5rem)]">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse justify-end gap-3 border-t border-line-strong pt-4">
            <dt className="type-label max-w-[14ch] text-muted">{item.label}</dt>
            <dd className="text-[clamp(2rem,2.4vw+1rem,3.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
              <Counter value={item.value} />
              <span className="text-muted">{item.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
