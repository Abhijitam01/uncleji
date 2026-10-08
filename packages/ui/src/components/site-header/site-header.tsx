"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";
import { Button } from "../button/button";
import { Logo } from "../logo/logo";
import { StudioClock } from "../studio-clock/studio-clock";

type Item = { href: string; label: string; count?: number };

export function SiteHeader({
  items,
  email,
  phone,
  phoneHref,
}: {
  items: readonly Item[];
  email: string;
  phone: string;
  phoneHref: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<{ left: number; width: number } | null>(null);
  const lastY = useRef(0);
  const progressRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    openRef.current = open;
    document.body.classList.toggle("no-scroll", open);
    if (open) {
      setHidden(false);
      window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 320);
    }
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (!openRef.current) setHidden(y > lastY.current + 2 && y > 360);
      else setHidden(false);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty("scale", `${max > 0 ? Math.min(1, y / max) : 0} 1`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !openRef.current) return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.header = hidden && !open ? "hidden" : "shown";
  }, [hidden, open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const mobile = [...items, { href: "/contact", label: "Contact" }];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,translate,color] duration-300 ease-out",
          scrolled && !open && "bg-paper/88 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md backdrop-saturate-150",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="shell grid h-[var(--header)] grid-cols-[1fr_auto] items-center gap-6 min-[1080px]:grid-cols-[1fr_auto_1fr]">
          <Logo light={open} className="justify-self-start transition-colors duration-300" />
          <nav className="max-[1079px]:hidden" aria-label="Primary">
            <ul className="relative flex items-center gap-1" onMouseLeave={() => setHover(null)}>
              <span
                className={cn(
                  "absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-ink/[0.06] transition-[left,width,opacity] duration-300 ease-out",
                  hover ? "opacity-100" : "opacity-0",
                )}
                style={hover ?? undefined}
                aria-hidden="true"
              />
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={(event) => setHover({ left: event.currentTarget.offsetLeft, width: event.currentTarget.offsetWidth })}
                      className={cn(
                        "group relative inline-flex items-start px-[clamp(0.7rem,1.1vw,1.15rem)] py-2 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-150 ease-micro",
                        active ? "text-ink" : "text-ink/62 hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1/2 left-[0.15rem] size-[5px] -translate-y-1/2 rounded-full bg-falu transition-[scale,opacity] duration-300 ease-out",
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <span className="relative">{item.label}</span>
                      {item.count ? (
                        <span className="ml-0.5 text-[0.625rem] leading-none text-muted tabular-nums">{item.count}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-self-end gap-5">
            <StudioClock className="max-[1279px]:hidden" />
            <Button href="/contact" size="sm" className="max-[1079px]:hidden">
              Start a project
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className={cn(
                "type-label relative hidden h-10 items-center gap-2.5 rounded-full pr-4 pl-3.5 text-[0.875rem] shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[color,box-shadow] duration-300 max-[1079px]:inline-flex",
                open && "text-paper shadow-[inset_0_0_0_1px_rgba(251,251,248,0.3)]",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-2 w-4" aria-hidden="true">
                <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-[translate,rotate] duration-300 ease-out", open && "translate-y-1 rotate-45")} />
                <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-[translate,rotate] duration-300 ease-out", open && "-translate-y-[3px] -rotate-45")} />
              </span>
              <span className="relative block h-[1.2em] overflow-hidden" aria-hidden="true">
                <span className={cn("block transition-transform duration-300 ease-out", open && "-translate-y-full")}>Menu</span>
                <span className={cn("absolute inset-0 block translate-y-full transition-transform duration-300 ease-out", open && "translate-y-0")}>Close</span>
              </span>
            </button>
          </div>
        </div>
        <span
          ref={progressRef}
          className={cn("absolute inset-x-0 bottom-0 h-px origin-left bg-falu transition-opacity duration-300", scrolled && !open ? "opacity-100" : "opacity-0")}
          style={{ scale: "0 1" }}
          aria-hidden="true"
        />
      </header>
      <div
        id="site-menu"
        className={cn(
          "fixed inset-0 z-[90] flex flex-col bg-ink px-[var(--gutter)] pt-[calc(var(--header)+2rem)] pb-8 text-paper",
          "transition-[clip-path,visibility] ease-out",
          open
            ? "visible duration-[650ms] [clip-path:inset(0_0_0_0)]"
            : "invisible duration-[450ms] [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <nav aria-label="Mobile" className="my-auto">
          <ul className="grid gap-1">
            {mobile.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-start gap-1 py-1 text-[clamp(2.4rem,10vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.045em] transition-[translate,color] duration-[650ms] ease-out",
                      open ? "translate-y-0" : "translate-y-full",
                      active ? "text-falu-bright" : "hover:text-paper/60",
                    )}
                    style={{ transitionDelay: open ? `${120 + index * 50}ms` : "0ms" }}
                  >
                    {item.label}
                    {"count" in item && item.count ? (
                      <span className="mt-[0.5em] text-[0.8rem] tracking-normal text-paper/45 tabular-nums">{item.count}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={cn(
            "grid gap-6 border-t border-paper/15 pt-6 transition-[opacity,translate] duration-500 ease-out min-[560px]:grid-cols-2",
            open ? "translate-y-0 opacity-100 delay-[450ms]" : "translate-y-2 opacity-0",
          )}
        >
          <div className="grid gap-1 text-[1rem]">
            <a href={`mailto:${email}`} className="w-fit hover:text-falu-bright">{email}</a>
            <a href={phoneHref} className="w-fit text-paper/60 hover:text-paper">{phone}</a>
          </div>
          <StudioClock light className="min-[560px]:justify-self-end" />
        </div>
      </div>
    </>
  );
}
