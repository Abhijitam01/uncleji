"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";

type Mode = "idle" | "link" | "view" | "text";

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;

    const loop = () => {
      current.x += (target.x - current.x) * 0.32;
      current.y += (target.y - current.y) * 0.32;
      const transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (rootRef.current) rootRef.current.style.transform = transform;
      if (discRef.current) discRef.current.style.transform = transform;
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const classify = (element: Element | null) => {
      const next: Mode = element?.closest("input, textarea, select, [contenteditable='true']")
        ? "text"
        : element?.closest("[data-cursor='view']")
          ? "view"
        : element?.closest("a, button, label, [role='button'], summary")
          ? "link"
          : "idle";
      setMode((value) => (value === next ? value : next));
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);
      if (coordsRef.current) {
        coordsRef.current.textContent = `${String(Math.round(event.pageX)).padStart(4, "0")} × ${String(Math.round(event.pageY)).padStart(4, "0")}`;
      }
      classify(event.target instanceof Element ? event.target : null);
      if (!frame) frame = requestAnimationFrame(loop);
    };
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame || target.x < 0) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        classify(document.elementFromPoint(target.x, target.y));
      });
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={rootRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[400] text-white mix-blend-difference transition-opacity duration-200",
          visible && mode !== "view" && mode !== "text" ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute top-0 left-0 transition-[scale,rotate] duration-300 ease-out",
            mode === "link" && "scale-[0.45]",
            pressed && "scale-75",
          )}
        >
          <span className="absolute top-0 -left-[11px] h-px w-[22px] bg-current" />
          <span className="absolute -top-[11px] left-0 h-[22px] w-px bg-current" />
        </div>
        <span
          className={cn(
            "absolute top-0 left-0 size-9 -translate-1/2 rounded-full border border-current transition-[scale,opacity] duration-300 ease-out",
            mode === "link" ? "scale-100 opacity-100" : "scale-50 opacity-0",
            pressed && mode === "link" && "scale-75",
          )}
        />
        <span
          ref={coordsRef}
          className={cn(
            "absolute top-3 left-3 text-[0.625rem] whitespace-nowrap tabular-nums transition-opacity duration-200",
            mode === "idle" ? "opacity-70" : "opacity-0",
          )}
        />
      </div>
      <div ref={discRef} className="pointer-events-none fixed top-0 left-0 z-[400]" aria-hidden="true">
        <span
          className={cn(
            "absolute top-0 left-0 grid size-[5.5rem] -translate-1/2 place-items-center rounded-full bg-ink text-[0.8125rem] font-medium tracking-[-0.01em] text-paper transition-[scale,opacity] duration-400 ease-out",
            visible && mode === "view" ? "scale-100 opacity-100" : "scale-[0.2] opacity-0",
            pressed && mode === "view" && "scale-90",
          )}
        >
          View
        </span>
      </div>
    </>
  );
}
