import { cn } from "../../cn";

export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-lead max-w-[38ch] text-ink/72", className)}>{children}</p>;
}
