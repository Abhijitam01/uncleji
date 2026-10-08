"use client";

import { Scene, type ArtName } from "@kiah/art";
import { TextLink, cn } from "@kiah/ui";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Item = { slug: string; title: string; location: string; scope: string; year: string; art: ArtName };

const shapes = [
  "aspect-[4/5] motion-safe:w-[64vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:h-[min(62svh,40rem)]",
  "aspect-[4/3] motion-safe:w-[78vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:mt-[12svh] motion-safe:min-[960px]:h-[min(48svh,30rem)]",
  "aspect-[4/5] motion-safe:w-[64vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:h-[min(56svh,36rem)]",
  "aspect-[3/2] motion-safe:w-[80vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:mt-[18svh] motion-safe:min-[960px]:h-[min(46svh,28rem)]",
  "aspect-[4/5] motion-safe:w-[64vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:h-[min(60svh,38rem)]",
  "aspect-[4/3] motion-safe:w-[78vw] motion-safe:min-[960px]:w-auto motion-safe:min-[960px]:mt-[8svh] motion-safe:min-[960px]:h-[min(50svh,32rem)]",
];

export function WorkReel({ items, total }: { items: readonly Item[]; total: number }) {
  const stageRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!stage || !pin || !track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".reel-card"));
    let frame = 0;
    let distance = 0;
    let screen = 0;
    let width = 0;

    const measure = () => {
      width = window.innerWidth;
      screen = pin.offsetHeight;
      distance = Math.max(0, track.scrollWidth - width);
      stage.style.height = `${distance + screen}px`;
    };
    const update = () => {
      frame = 0;
      const top = stage.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -top / distance)) : 0;
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px,0,0)`;
      barRef.current?.style.setProperty("scale", `${progress.toFixed(4)} 1`);
      const centre = width * 0.5;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const gap = Math.abs(rect.left + rect.width / 2 - centre);
        if (gap < best) {
          best = gap;
          nearest = index;
        }
        const offset = gap / (width * 0.55);
        card.style.setProperty("--c", Math.min(1, Math.max(0, 1.35 - offset * 1.35)).toFixed(3));
      });
      if (countRef.current) countRef.current.textContent = String(nearest + 1).padStart(2, "0");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      if (window.innerWidth === width) return;
      measure();
      onScroll();
    };
    const unbind = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    const bind = () => {
      unbind();
      if (!motion.matches) {
        stage.style.height = "";
        track.style.transform = "";
        cards.forEach((card) => card.style.removeProperty("--c"));
        return;
      }
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    bind();
    motion.addEventListener("change", bind);
    const fonts = document.fonts?.ready.then(() => {
      if (!motion.matches) return;
      measure();
      update();
    });
    return () => {
      void fonts;
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", bind);
      unbind();
    };
  }, []);

  return (
    <section ref={stageRef} id="work" className="relative" aria-label="Selected work">
      <div
        ref={pinRef}
        className="reel-pin flex flex-col justify-center py-[clamp(4rem,8vw,6rem)] motion-safe:py-0 motion-safe:pt-[calc(var(--header)*0.6)]"
      >
        <div
          ref={trackRef}
          className="reel-track flex flex-col gap-14 px-[var(--gutter)] motion-reduce:min-[960px]:grid motion-reduce:min-[960px]:grid-cols-3 motion-reduce:min-[960px]:gap-x-6 motion-safe:flex-row motion-safe:items-center motion-safe:gap-[clamp(1rem,2.5vw,2.5rem)] motion-safe:min-[960px]:items-start"
        >
          <div className="flex flex-col justify-between py-1 motion-safe:w-[74vw] motion-safe:shrink-0 motion-safe:min-[960px]:w-[30vw] motion-safe:min-[960px]:self-stretch">
            <div>
              <p className="type-label border-t border-line-strong pt-4 text-muted">Selected work</p>
              <h2 className="type-h2 mt-6 min-[960px]:mt-8">Rooms we would happily live in.</h2>
            </div>
            <div className="mt-6 grid gap-4 min-[960px]:mt-10">
              <p className="type-read max-w-[28ch] text-muted">
                Every one began as a drawing.<span className="motion-reduce:hidden"> Keep scrolling to watch them become rooms.</span>
              </p>
              <TextLink href="/portfolio" className="w-fit">
                All {total} projects
              </TextLink>
            </div>
          </div>
          {items.map((item, index) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              data-cursor="view"
              className="reel-card group block motion-safe:shrink-0"
            >
              <div className={cn("relative overflow-hidden rounded-media bg-paper", shapes[index % shapes.length])}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(29,32,30,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(29,32,30,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <Scene name={item.art} className="reel-color absolute inset-0 size-full transition-[scale] duration-700 ease-out group-hover:scale-[1.03]" />
                <Scene name={item.art} decorative className="reel-lines linework absolute inset-0 size-full" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <h3 className="text-[clamp(1.15rem,0.6vw+0.95rem,1.5rem)] leading-tight font-medium tracking-[-0.025em]">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-[0.08em] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                    {item.title}
                  </span>
                </h3>
                <span className="type-label text-muted tabular-nums">{item.year}</span>
              </div>
              <p className="type-label mt-1 text-muted">
                {item.location}, {item.scope.toLowerCase()}
              </p>
            </Link>
          ))}
          <Link
            href="/portfolio"
            data-cursor="view"
            className="group flex aspect-[16/10] flex-col justify-between rounded-media bg-ink p-6 text-paper transition-colors duration-300 hover:bg-falu motion-safe:aspect-[4/5] motion-safe:w-[60vw] motion-safe:shrink-0 min-[960px]:aspect-auto min-[960px]:h-[min(62svh,40rem)] min-[960px]:w-[min(70vw,24rem)] motion-safe:min-[960px]:aspect-auto motion-safe:min-[960px]:w-[min(70vw,24rem)]"
          >
            <span className="type-label text-paper/55">Portfolio</span>
            <span className="type-h2">
              See all {total}
              <br />
              projects
            </span>
            <svg viewBox="0 0 24 24" className="size-8 transition-transform duration-500 ease-out group-hover:translate-x-2" aria-hidden="true">
              <path d="M2 12h19M14 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
          <span className="hidden w-px shrink-0 motion-safe:block" aria-hidden="true" />
        </div>
        <div className="type-label absolute inset-x-[var(--gutter)] bottom-[max(1.25rem,3svh)] hidden items-center gap-4 text-muted tabular-nums motion-safe:flex" aria-hidden="true">
          <span>
            <span ref={countRef} className="text-ink">
              01
            </span>{" "}
            / {String(items.length).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 overflow-hidden bg-line">
            <span ref={barRef} className="absolute inset-0 origin-left bg-ink" style={{ scale: "0 1" }} />
          </span>
        </div>
      </div>
    </section>
  );
}
