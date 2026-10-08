"use client";

import { Scene, type ArtName } from "@kiah/art";
import { TextLink, cn } from "@kiah/ui";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Item = { slug: string; title: string; location: string; scope: string; year: string; art: ArtName };

const shapes = [
  "aspect-[4/5] min-[960px]:h-[min(62svh,40rem)]",
  "aspect-[4/3] min-[960px]:mt-[12svh] min-[960px]:h-[min(48svh,30rem)]",
  "aspect-[4/5] min-[960px]:h-[min(56svh,36rem)]",
  "aspect-[3/2] min-[960px]:mt-[18svh] min-[960px]:h-[min(46svh,28rem)]",
  "aspect-[4/5] min-[960px]:h-[min(60svh,38rem)]",
  "aspect-[4/3] min-[960px]:mt-[8svh] min-[960px]:h-[min(50svh,32rem)]",
];

export function WorkReel({ items, total }: { items: readonly Item[]; total: number }) {
  const stageRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    const pinned = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".reel-card"));
    let frame = 0;
    let distance = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      stage.style.height = `${distance + window.innerHeight}px`;
    };
    const update = () => {
      frame = 0;
      const box = stage.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 0;
      track.style.transform = `translate3d(${-progress * distance}px,0,0)`;
      const centre = window.innerWidth * 0.5;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const offset = Math.abs(rect.left + rect.width / 2 - centre) / (window.innerWidth * 0.55);
        card.style.setProperty("--c", Math.min(1, Math.max(0, 1.35 - offset * 1.35)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const bind = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (!pinned.matches) {
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
    pinned.addEventListener("change", bind);
    return () => {
      cancelAnimationFrame(frame);
      pinned.removeEventListener("change", bind);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={stageRef} id="work" className="relative" aria-label="Selected work">
      <div className="reel-pin flex flex-col justify-center py-[clamp(4rem,8vw,6rem)] min-[960px]:py-0">
        <div
          ref={trackRef}
          className="reel-track flex snap-x snap-mandatory items-start gap-[clamp(1.25rem,2.5vw,2.5rem)] scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-[min(80vw,26rem)] shrink-0 snap-start flex-col justify-between self-stretch py-1 min-[960px]:w-[30vw]">
            <div>
              <p className="type-label border-t border-line-strong pt-4 text-muted">Selected work</p>
              <h2 className="type-h2 mt-8">Rooms we would happily live in.</h2>
            </div>
            <div className="mt-10 grid gap-4">
              <p className="type-read max-w-[28ch] text-muted">Every one began as a drawing.<span className="max-[959px]:hidden"> Keep scrolling to watch them become rooms.</span></p>
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
              className="reel-card group block w-[76vw] shrink-0 snap-start min-[960px]:w-auto"
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
            className="group flex aspect-[4/5] w-[76vw] min-[960px]:aspect-auto min-[960px]:h-[min(62svh,40rem)] min-[960px]:w-[min(70vw,24rem)] shrink-0 snap-start flex-col justify-between rounded-media bg-ink p-6 text-paper transition-colors duration-300 hover:bg-falu"
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
          <span className="w-px shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
