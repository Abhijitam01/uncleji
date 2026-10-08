"use client";

import { useId, useState } from "react";
import { cn } from "../../cn";
import { TextLink } from "../link-arrow/link-arrow";

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly { title: string; body: string; href?: string; linkLabel?: string }[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-t border-line-strong">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${id}-panel-${index}`;
        return (
          <div key={item.title} className="group/item relative border-b border-line-strong">
            <span
              className={cn(
                "pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-ink transition-transform duration-700 ease-out",
                open ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100",
              )}
              aria-hidden="true"
            />
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-[clamp(1.4rem,2.6vw,2.25rem)] text-left"
              >
                <span
                  className={cn(
                    "text-[clamp(1.5rem,1.8vw+1rem,2.75rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-[translate,color] duration-300 ease-out group-hover:translate-x-1.5",
                    !open && "text-ink/80 group-hover:text-ink",
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    "relative grid size-11 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color,box-shadow,rotate] duration-300 ease-out group-hover:shadow-[inset_0_0_0_1px_var(--color-ink)]",
                    open && "rotate-180 bg-ink text-paper shadow-none",
                  )}
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={cn("absolute h-px w-3.5 rotate-90 bg-current transition-[rotate] duration-300 ease-out", open && "rotate-0")} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="min-h-0 overflow-hidden" inert={open ? undefined : true}>
                <div
                  className={cn(
                    "grid gap-5 pb-[clamp(1.75rem,3vw,2.5rem)] transition-[opacity,translate] duration-500 ease-out min-[960px]:grid-cols-12",
                    open ? "translate-y-0 opacity-100 delay-75" : "-translate-y-2 opacity-0",
                  )}
                >
                  <p className="type-read max-w-[58ch] text-muted min-[960px]:col-span-7">{item.body}</p>
                  {item.href ? (
                    <p className="min-[960px]:col-span-4 min-[960px]:col-start-9 min-[960px]:self-end min-[960px]:justify-self-end">
                      <TextLink href={item.href}>{item.linkLabel ?? "Discuss your project"}</TextLink>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
