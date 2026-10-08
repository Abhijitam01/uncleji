import { cn } from "../../cn";

export function Section({
  children,
  className,
  id,
  tone = "paper",
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "vellum" | "ink";
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        tight ? "pt-6 pb-[clamp(4.5rem,10vw,9rem)]" : "py-[clamp(4.5rem,10vw,9rem)]",
        tone === "vellum" && "bg-vellum",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
    >
      {children}
    </section>
  );
}
