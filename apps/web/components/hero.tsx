"use client";

import { Scene } from "@atelier/art";
import { Button, Dimension, NorthMark, cn } from "@atelier/ui";
import { useEffect, useRef, useState } from "react";

const lines = ["Homes drawn", "around the people", "who live in them."];

const grid =
  "bg-paper bg-[linear-gradient(rgba(29,32,30,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(29,32,30,0.055)_1px,transparent_1px)] bg-[size:28px_28px]";

export function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const [room, setRoom] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setRoom(true), reduce ? 0 : 2400);

    const scrub = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = stage.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 0;
      stage.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const bind = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (!scrub.matches) return;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };
    bind();
    scrub.addEventListener("change", bind);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      scrub.removeEventListener("change", bind);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={stageRef} className="hero-stage relative bg-paper">
      <div className="hero-pin">
        <div className="hero-head shell pt-[calc(var(--header)+2rem)]">
          <div className="type-label animate-fade flex flex-wrap justify-between gap-x-6 gap-y-1 text-muted">
            <span>Interior design and architecture</span>
            <span>Greenpoint, Brooklyn, since 2012</span>
          </div>
          <h1 className="mt-[clamp(1.5rem,4svh,3rem)] text-[clamp(3rem,11vw,5rem)] leading-[0.88] font-medium tracking-[-0.055em] min-[960px]:text-[clamp(3rem,6.4vw,9rem)]">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.07em]">
                <span className="animate-line block" style={{ animationDelay: `${120 + index * 110}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-foot shell mt-8">
          <p className="type-lead animate-rise max-w-[30ch] text-ink/72 [animation-delay:520ms]">
            We plan, draw and build calm, light-filled interiors around how you actually live, with joinery made a few streets away.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:640ms]">
            <Button href="/portfolio" size="lg">
              See the work
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Start a project
            </Button>
          </div>
        </div>
        <figure className="hero-figure shell animate-fade mt-14 grid grid-cols-[minmax(0,1fr)_auto] gap-3 pb-14 [animation-delay:150ms]">
          <Dimension label="4 200" delay={200} className="hero-dim-x" />
          <span />
          <div className={cn("hero-frame relative aspect-[4/4.6] overflow-hidden rounded-media", grid)}>
            <Scene
              name="living-room"
              className={cn(
                "hero-color absolute inset-0 size-full transition-[clip-path] duration-[1500ms] ease-out",
                room ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)]",
              )}
            />
            <Scene
              name="living-room"
              decorative
              className={cn(
                "hero-lines linework is-drawing absolute inset-0 size-full transition-opacity duration-700",
                room ? "opacity-0 delay-500" : "opacity-100",
              )}
            />
            <figcaption className="type-label absolute bottom-3 left-3 flex items-center gap-4 rounded-full bg-paper/85 py-2 pr-4 pl-3 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <NorthMark className="text-falu" />
                Living room, Alderwood colonial
                <span className="text-muted tabular-nums">1:50</span>
              </span>
              <span className="hero-cue items-center gap-2 text-muted">
                <span className="relative block h-3.5 w-px overflow-hidden bg-line-strong">
                  <span className="absolute inset-x-0 top-0 h-1.5 animate-[cue_1.6s_var(--ease-out)_infinite] bg-ink" />
                </span>
                Scroll to finish
              </span>
            </figcaption>
          </div>
          <Dimension label="5 100" vertical delay={360} className="hero-dim-y" />
        </figure>
      </div>
    </section>
  );
}
