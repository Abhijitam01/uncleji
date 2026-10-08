import Link from "next/link";
import { cn } from "../../cn";

export function NorthMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 18" className={cn("h-[0.95em] w-auto", className)} aria-hidden="true">
      <path d="M6 1.2 11 16.4 6 12.6Z" fill="currentColor" />
      <path d="M6 1.2 1 16.4 6 12.6Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ href = "/", light = false, className }: { href?: string; light?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-[0.32em] text-[1.4rem] leading-none font-semibold tracking-[-0.045em] text-ink",
        light && "text-paper",
        className,
      )}
      aria-label="Kiah, home"
    >
      Kiah
      <NorthMark className="text-falu transition-transform duration-500 ease-out group-hover:rotate-[360deg] group-active:scale-90" />
    </Link>
  );
}
