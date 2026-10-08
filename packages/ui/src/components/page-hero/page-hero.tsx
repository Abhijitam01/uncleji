import { Fragment } from "react";
import Link from "next/link";
import { cn } from "../../cn";
import { Container } from "../container/container";

type Crumb = { href?: string; label: string };

export function PageHero({
  title,
  lede,
  crumbs,
  align = "start",
  children,
  className,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs: readonly Crumb[];
  align?: "start" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <section className={cn("bg-paper pt-[calc(var(--header)+clamp(2.5rem,7vw,6rem))] pb-[clamp(3rem,6vw,5.5rem)]", className)}>
      <Container>
        <nav
          className={cn("type-label animate-fade flex flex-wrap items-center gap-x-2 text-muted", centered && "justify-center")}
          aria-label="Breadcrumb"
        >
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="contents">
              {index > 0 ? <span className="text-stone" aria-hidden="true">/</span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors duration-150 ease-micro hover:text-ink">
                  {crumb.label}
                </Link>
              ) : (
                <span className="max-w-[28ch] truncate text-ink" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className={cn("mt-[clamp(2rem,5vw,4rem)] grid gap-x-6 gap-y-8", !centered && "min-[960px]:grid-cols-12 min-[960px]:items-end")}>
          <h1
            className={cn(
              "type-h1",
              centered ? "mx-auto max-w-[18ch] text-center" : "min-[960px]:col-span-8",
            )}
          >
            {typeof title === "string"
              ? title.split(" ").map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                      <span className="animate-line inline-block" style={{ animationDelay: `${60 + index * 45}ms` }}>
                        {word}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))
              : title}
          </h1>
          {lede ? (
            <p
              className={cn(
                "type-lead animate-rise max-w-[36ch] text-ink/72 [animation-delay:200ms]",
                centered ? "mx-auto text-center" : "min-[960px]:col-span-4 min-[960px]:pb-2",
              )}
            >
              {lede}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
