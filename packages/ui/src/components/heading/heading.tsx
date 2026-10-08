import { cn } from "../../cn";

const tags = { h1: "h1", h2: "h2", h3: "h3", h4: "h4" } as const;

export function Heading({
  as = "h2",
  children,
  className,
}: {
  as?: keyof typeof tags;
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = tags[as];
  return <Tag className={cn(className)}>{children}</Tag>;
}
