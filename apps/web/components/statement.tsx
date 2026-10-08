"use client";

import { ValueGrid } from "@atelier/ui";
import { useEffect, useRef } from "react";

const sentence =
  "Eight projects a year. One founder on every one. Every room drawn by hand before it is drawn on screen, and not one budget exceeded without your written approval.";

export function Statement({ values }: { values: readonly { title: string; body: string }[] }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = sentence.split(" ");

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    const spans = Array.from(text.querySelectorAll<HTMLElement>("[data-word]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((span) => (span.style.opacity = "1"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = text.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.3;
      const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end + box.height * 0.6)));
      const lit = progress * spans.length;
      spans.forEach((span, index) => {
        span.style.opacity = String(Math.min(1, Math.max(0.16, lit - index + 0.16)));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="values" className="relative overflow-clip bg-falu py-[clamp(5rem,12vw,11rem)] text-paper">
      <div className="shell">
        <div className="type-label mb-[clamp(2.5rem,6vw,5rem)] flex justify-between gap-6 border-t border-paper/25 pt-4 text-paper/65">
          <span>What we believe</span>
          <span>Since 2012</span>
        </div>
        <p
          ref={textRef}
          className="max-w-[22ch] text-[clamp(2.2rem,5.2vw+0.4rem,7.25rem)] leading-[0.98] font-medium tracking-[-0.048em] text-balance"
          aria-label={sentence}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} data-word aria-hidden="true" className="transition-opacity duration-200 ease-micro" style={{ opacity: 0.16 }}>
              {word}{" "}
            </span>
          ))}
        </p>
        <div className="mt-[clamp(4rem,9vw,8rem)]">
          <ValueGrid items={values} light />
        </div>
      </div>
    </section>
  );
}
