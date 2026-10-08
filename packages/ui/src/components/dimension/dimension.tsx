import { cn } from "../../cn";

const tick =
  "block size-2.5 shrink-0 bg-[linear-gradient(45deg,transparent_44%,currentColor_44%,currentColor_56%,transparent_56%)]";

export function Dimension({
  label,
  vertical = false,
  delay = 0,
  className,
}: {
  label: string;
  vertical?: boolean;
  delay?: number;
  className?: string;
}) {
  const line = cn(
    "block flex-1 bg-current/45",
    vertical
      ? "w-px animate-[dim-y_1.4s_var(--ease-out)_both]"
      : "h-px animate-[dim-x_1.4s_var(--ease-out)_both]",
  );
  return (
    <div
      className={cn("flex items-center gap-2 text-muted", vertical && "flex-col", className)}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <span className={tick} />
      <span className={cn(line, vertical ? "origin-bottom" : "origin-right")} style={{ animationDelay: `${delay}ms` }} />
      <span className={cn("text-[0.75rem] tracking-[0.04em] tabular-nums", vertical && "[writing-mode:vertical-rl] rotate-180")}>
        {label}
      </span>
      <span className={cn(line, vertical ? "origin-top" : "origin-left")} style={{ animationDelay: `${delay}ms` }} />
      <span className={tick} />
    </div>
  );
}
