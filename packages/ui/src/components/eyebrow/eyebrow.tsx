import { cn } from "../../cn";

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-label text-muted", className)}>{children}</p>;
}
