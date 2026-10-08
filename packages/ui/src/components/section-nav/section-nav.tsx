"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";

export function SectionNav({ label, items, className }: { label: string; items: readonly { id: string; label: string }[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (link) setPill({ left: link.offsetLeft, width: link.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <nav aria-label={label} className={cn("section-nav sticky top-3 z-40 flex justify-center transition-[top] duration-300 ease-out", className)}>
      <ul
        ref={listRef}
        className="relative flex max-w-full gap-1 overflow-x-auto rounded-full bg-paper/80 p-1 shadow-[inset_0_0_0_1px_var(--color-line),0_10px_30px_-12px_rgba(29,32,30,0.25)] backdrop-blur-md [scrollbar-width:none]"
      >
        {pill ? (
          <span
            className="absolute top-1 bottom-1 rounded-full bg-ink transition-[left,width] duration-500 ease-out"
            style={{ left: pill.left, width: pill.width }}
            aria-hidden="true"
          />
        ) : null}
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative z-10 flex h-9 items-center rounded-full px-4 text-[0.875rem] whitespace-nowrap transition-colors duration-300",
                active === item.id ? "text-paper" : "text-ink/65 hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
