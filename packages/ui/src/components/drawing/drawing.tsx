"use client";

import { Scene, type ArtName } from "@atelier/art";
import { useEffect, useState } from "react";
import { cn } from "../../cn";
import { Dimension } from "../dimension/dimension";
import { NorthMark } from "../logo/logo";

const grid =
  "bg-paper bg-[linear-gradient(rgba(29,32,30,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(29,32,30,0.055)_1px,transparent_1px)] bg-[size:28px_28px] bg-[position:-1px_-1px]";

export function Drawing({
  art,
  caption,
  scale = "1:50",
  width,
  height,
  className,
  frameClassName,
  linesOnly = false,
}: {
  art: ArtName;
  caption: string;
  scale?: string;
  width: string;
  height: string;
  className?: string;
  frameClassName?: string;
  linesOnly?: boolean;
}) {
  const [view, setView] = useState<"drawing" | "room">("drawing");

  useEffect(() => {
    if (linesOnly) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setView("room");
      return;
    }
    const timer = window.setTimeout(() => setView("room"), 2400);
    return () => window.clearTimeout(timer);
  }, [linesOnly]);

  const room = view === "room";

  return (
    <figure className={cn("grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-3", className)}>
      <Dimension label={width} delay={200} />
      <span />
      <div className={cn("relative overflow-hidden rounded-media", grid, frameClassName)}>
        {linesOnly ? null : (
          <Scene
            name={art}
            className={cn(
              "absolute inset-0 size-full transition-[clip-path] duration-[1500ms] ease-out",
              room ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)]",
            )}
          />
        )}
        <Scene
          name={art}
          decorative
          className={cn(
            "linework is-drawing absolute inset-0 size-full transition-opacity duration-700 ease-micro",
            room ? "opacity-0 delay-500" : "opacity-100",
          )}
        />
      </div>
      <Dimension label={height} vertical delay={360} />
      <figcaption className="type-label flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-1">
        <span className="flex items-center gap-3">
          <NorthMark className="text-falu" />
          <span>
            {caption}
            <span className="ml-2 text-muted tabular-nums">{scale}</span>
          </span>
        </span>
        {linesOnly ? null : (
          <span className="relative inline-grid grid-cols-2 rounded-full p-0.5 shadow-[inset_0_0_0_1px_var(--color-line-strong)]" role="group" aria-label="Show the room as">
            <span
              className={cn(
                "absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-ink transition-transform duration-300 ease-out",
                room && "translate-x-full",
              )}
              aria-hidden="true"
            />
            {(["drawing", "room"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={view === option}
                onClick={() => setView(option)}
                className={cn(
                  "relative z-[1] rounded-full px-3.5 py-1.5 capitalize transition-colors duration-200 ease-micro",
                  view === option ? "text-paper" : "text-muted hover:text-ink",
                )}
              >
                {option}
              </button>
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
