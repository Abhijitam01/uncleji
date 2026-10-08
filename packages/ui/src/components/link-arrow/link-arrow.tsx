import Link from "next/link";
import { cn } from "../../cn";

export const underline =
  "bg-[linear-gradient(currentColor,currentColor),linear-gradient(var(--color-line-strong),var(--color-line-strong))] bg-[length:0%_1px,100%_1px] bg-[position:0_100%,0_100%] bg-no-repeat pb-[0.12em] transition-[background-size,color] duration-300 ease-out hover:bg-[length:100%_1px,100%_1px]";

export function TextLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classValue = cn("inline font-medium", underline, className);
  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classValue} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classValue}>
      {children}
    </Link>
  );
}
