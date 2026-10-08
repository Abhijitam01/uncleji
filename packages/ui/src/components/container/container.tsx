import { cn } from "../../cn";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("shell", className)}>{children}</div>;
}
