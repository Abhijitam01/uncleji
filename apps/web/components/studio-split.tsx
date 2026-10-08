"use client";

import { Scene, type ArtName } from "@kiah/art";
import { Reveal, Stats, TextLink } from "@kiah/ui";
import { useEffect, useRef } from "react";

function Signature() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        path.style.transition = "stroke-dashoffset 1600ms cubic-bezier(0.22, 0.61, 0.21, 1)";
        path.style.strokeDashoffset = "0";
        observer.disconnect();
      },
      { threshold: 1 },
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <svg className="w-[7.5rem] text-ink" viewBox="0 0 220 60" aria-hidden="true">
      <path
        ref={pathRef}
        pathLength={1}
        d="M12 44 q22 -34 34 -30 t-8 26 q16 -22 26 -18 t-4 22 q14 -18 24 -14 M108 20 q-6 22 2 26 t18 -22 M136 26 q-8 20 0 24 M152 18 q-4 26 4 30 t20 -28"
        stroke="currentColor"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  );
}

export function StudioSplit({
  art = "founder-portrait",
  title,
  lede,
  extra,
  ctaHref = "/studio",
  ctaLabel = "Meet the studio",
  stats,
}: {
  art?: ArtName;
  title: React.ReactNode;
  lede: string;
  extra?: string;
  ctaHref?: string;
  ctaLabel?: string;
  stats: readonly { value: number; suffix: string; label: string }[];
}) {
  return (
    <div className="grid gap-x-6 gap-y-14 min-[1080px]:grid-cols-12">
      <Reveal className="min-w-0 min-[1080px]:col-span-5">
        <figure>
          <div className="aspect-[4/5] overflow-hidden rounded-media bg-vellum">
            <Scene name={art} className="size-full" />
          </div>
          <figcaption className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
            <p className="font-serif text-[1.15rem] leading-snug text-ink/80 italic">
              “I still sketch every project by hand before a single line goes on screen.”
              <span className="type-label mt-2 block text-muted not-italic">Ira Malhotra, founder</span>
            </p>
            <Signature />
          </figcaption>
        </figure>
      </Reveal>
      <div className="min-w-0 min-[1080px]:col-span-6 min-[1080px]:col-start-7 min-[1080px]:pt-[clamp(0rem,6vw,6rem)]">
        <Reveal as="h2" className="type-h2">
          {title}
        </Reveal>
        <Reveal as="p" delay={100} className="type-lead mt-8 max-w-[34ch] text-ink/72">
          {lede}
        </Reveal>
        {extra ? (
          <Reveal as="p" delay={160} className="type-read mt-6 max-w-[48ch] text-muted">
            {extra}
          </Reveal>
        ) : null}
        <Stats items={stats} />
        <Reveal delay={260} className="mt-10">
          <TextLink href={ctaHref}>{ctaLabel}</TextLink>
        </Reveal>
      </div>
    </div>
  );
}
