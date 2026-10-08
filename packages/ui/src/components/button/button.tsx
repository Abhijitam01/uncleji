import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../../cn";

type Variant = "dark" | "light" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Shared & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type LinkProps = Shared & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "group relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans font-medium tracking-[-0.01em] whitespace-nowrap",
    "transition-[color,box-shadow,scale] duration-300 ease-out active:scale-[0.97] active:duration-100",
    "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-[50%_50%_0_0/100%_100%_0_0] before:transition-[translate,border-radius] before:duration-500 before:ease-out before:content-[''] hover:before:translate-y-0 hover:before:rounded-none",
    variant === "dark" && "bg-ink text-paper before:bg-falu",
    variant === "light" && "bg-paper text-ink before:bg-falu-bright hover:text-paper",
    variant === "ghost" && "text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] before:bg-ink hover:text-paper hover:shadow-[inset_0_0_0_1px_var(--color-ink)]",
    variant === "ghost-light" && "text-paper shadow-[inset_0_0_0_1px_rgba(251,251,248,0.32)] before:bg-paper hover:text-ink",
    size === "sm" && "h-9 px-4 text-[0.875rem]",
    size === "md" && "h-12 px-6 text-[0.95rem]",
    size === "lg" && "h-14 px-7 text-[1rem]",
    className,
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden leading-[1.25]">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function Button({ variant = "dark", size = "md", className, children, href, ...props }: ButtonProps | LinkProps) {
  const classNameValue = classes(variant, size, className);
  if (href) {
    return (
      <Link className={classNameValue} {...(props as Omit<LinkProps, keyof Shared>)} href={href}>
        <Label>{children}</Label>
      </Link>
    );
  }
  return (
    <button className={classNameValue} {...(props as Omit<ButtonProps, keyof Shared>)}>
      <Label>{children}</Label>
    </button>
  );
}
