"use client";

import { Scene, type ArtName } from "@kiah/art";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";
import { ProjectCard } from "../project-card/project-card";

type Project = {
  slug: string;
  title: string;
  location: string;
  scope: string;
  year: string;
  art: ArtName;
  category: string;
};

function IndexList({ projects }: { projects: readonly Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const onMove = (event: React.PointerEvent) => {
    const preview = previewRef.current;
    const wrap = wrapRef.current;
    if (!preview || !wrap || event.pointerType !== "mouse") return;
    const box = wrap.getBoundingClientRect();
    preview.style.translate = `${event.clientX - box.left}px ${event.clientY - box.top}px`;
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="type-label grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-b border-line-strong pb-3 text-muted min-[860px]:grid-cols-[minmax(0,5fr)_3fr_3fr_1fr]">
        <span>Project</span>
        <span className="max-[859px]:hidden">Location</span>
        <span className="max-[859px]:hidden">Scope</span>
        <span className="text-right">Year</span>
      </div>
      <ul onPointerMove={onMove} onPointerLeave={() => setHovered(null)} className="relative">
        {projects.map((project, index) => (
          <li key={project.slug} className="animate-rise" style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}>
            <Link
              href={`/portfolio/${project.slug}`}
              onPointerEnter={() => setHovered(index)}
              onFocus={() => setHovered(null)}
              className={cn(
                "group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-b border-line py-[clamp(1.1rem,1.8vw,1.6rem)] transition-colors duration-300 min-[860px]:grid-cols-[minmax(0,5fr)_3fr_3fr_1fr]",
                hovered !== null && hovered !== index && "text-ink/30",
              )}
            >
              <span className="text-[clamp(1.4rem,1.6vw+0.9rem,2.6rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-transform duration-500 ease-out group-hover:translate-x-2">
                {project.title}
              </span>
              <span className="type-label max-[859px]:hidden">{project.location}</span>
              <span className="type-label max-[859px]:hidden">{project.scope}</span>
              <span className="type-label text-right tabular-nums">{project.year}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        ref={previewRef}
        className="pointer-events-none absolute top-0 left-0 z-10 max-[859px]:hidden [transition:translate_450ms_var(--ease-out)]"
        aria-hidden="true"
      >
        <div
          className={cn(
            "relative -mt-36 ml-8 aspect-[4/5] w-56 overflow-hidden rounded-media bg-vellum shadow-[0_30px_60px_-20px_rgba(29,32,30,0.45)] transition-[opacity,scale,rotate] duration-300 ease-out",
            hovered === null ? "scale-75 rotate-[-4deg] opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        >
          {projects.map((project, index) => (
            <Scene
              key={project.slug}
              name={project.art}
              decorative
              className={cn("absolute inset-0 size-full transition-opacity duration-300", hovered === index ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioBrowser({
  projects,
  filters,
}: {
  projects: readonly Project[];
  filters: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState("all");
  const [view, setView] = useState<"grid" | "index">("grid");
  const [marker, setMarker] = useState<{ left: number; width: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);
  const countFor = (id: string) => (id === "all" ? projects.length : projects.filter((project) => project.category === id).length);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => {
      const button = bar.querySelector<HTMLElement>(`[data-filter="${active}"]`);
      if (button) setMarker({ left: button.offsetLeft, width: button.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <div>
      <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-line-strong py-4">
        <div ref={barRef} className="relative flex flex-wrap gap-x-7 gap-y-3" role="group" aria-label="Filter projects">
          {marker ? (
            <span
              className="absolute -bottom-[17px] h-[2px] bg-falu transition-[left,width] duration-500 ease-out max-[700px]:hidden"
              style={marker}
              aria-hidden="true"
            />
          ) : null}
          {filters.map((filter) => {
            const selected = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                data-filter={filter.id}
                onClick={() => setActive(filter.id)}
                aria-pressed={selected}
                className={cn(
                  "relative inline-flex items-start gap-1 py-1 text-[1rem] font-medium tracking-[-0.01em] transition-colors duration-200 ease-micro",
                  selected ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {filter.label}
                <span className="text-[0.66rem] leading-none tabular-nums">{countFor(filter.id)}</span>
              </button>
            );
          })}
        </div>
        <div className="relative flex rounded-full p-0.5 shadow-[inset_0_0_0_1px_var(--color-line-strong)]" role="group" aria-label="Layout">
          <span
            className={cn(
              "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-ink transition-[translate] duration-400 ease-out",
              view === "index" && "translate-x-full",
            )}
            aria-hidden="true"
          />
          {(["grid", "index"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              aria-pressed={view === option}
              className={cn(
                "relative z-10 h-8 w-16 rounded-full text-[0.8125rem] capitalize transition-colors duration-300",
                view === option ? "text-paper" : "text-ink/60 hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {view === "grid" ? (
        <div key={active} className="grid gap-x-6 gap-y-14 min-[700px]:grid-cols-2 min-[1180px]:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              title={project.title}
              location={project.location}
              scope={project.scope}
              year={project.year}
              art={project.art}
              className="animate-rise"
              style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
            />
          ))}
        </div>
      ) : (
        <IndexList key={active} projects={visible} />
      )}
    </div>
  );
}
