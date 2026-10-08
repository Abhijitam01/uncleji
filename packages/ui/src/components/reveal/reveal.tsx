"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";

const tags = {
  div: "div",
  li: "li",
  article: "article",
  p: "p",
  h2: "h2",
  section: "section",
  span: "span",
  blockquote: "blockquote",
  ol: "ol",
} as const;

type TagName = keyof typeof tags;

export function Reveal({
  as = "div",
  delay = 0,
  side = false,
  immediate = false,
  className,
  children,
  onPointerMove,
}: {
  as?: TagName;
  delay?: number;
  side?: boolean;
  immediate?: boolean;
  className?: string;
  children: React.ReactNode;
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    const el = ref.current;
    if (!el || immediate) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const Tag = tags[as];
  return (
    <Tag
      ref={ref as never}
      onPointerMove={onPointerMove}
      data-shown={shown || undefined}
      className={cn(
        "translate-y-5 opacity-0 transition-[opacity,translate] delay-(--reveal) duration-[900ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:delay-0",
        side && "translate-y-0",
        shown && "translate-y-0 opacity-100",
        className,
      )}
      style={{ "--reveal": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
