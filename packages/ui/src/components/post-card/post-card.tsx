import { Scene, type ArtName } from "@kiah/art";
import Link from "next/link";
import { cn } from "../../cn";

const titleLine =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-[0.06em] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]";

export function PostCard({
  href,
  title,
  date,
  category,
  readTime,
  excerpt,
  art,
  featured = false,
}: {
  href: string;
  title: string;
  date: string;
  category: string;
  readTime?: string;
  excerpt?: string;
  art: ArtName;
  featured?: boolean;
}) {
  return (
    <article className={cn(featured && "border-b border-line-strong pb-[clamp(3rem,6vw,5rem)]")}>
      <Link href={href} data-cursor="view" className={cn("group block", featured && "grid gap-x-6 gap-y-8 min-[900px]:grid-cols-12 min-[900px]:items-end")}>
        <div className={cn("relative overflow-hidden rounded-media bg-paper bg-[linear-gradient(rgba(29,32,30,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(29,32,30,0.05)_1px,transparent_1px)] bg-[size:24px_24px]", featured ? "aspect-[4/3] min-[900px]:col-span-7 min-[900px]:aspect-[16/11]" : "aspect-[3/2]")}>
          <Scene name={art} className="absolute inset-0 size-full transition-[opacity,scale] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-25" />
          <Scene name={art} decorative className="linework absolute inset-0 size-full opacity-0 transition-[opacity,scale] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100" />
        </div>
        <div className={cn("grid justify-items-start gap-3", featured ? "min-[900px]:col-span-4 min-[900px]:col-start-9" : "pt-5")}>
          <span className="type-label flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
            <span className="rounded-full px-2.5 py-1 text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">{category}</span>
            <span>{date}</span>
            {readTime ? <span>{readTime} read</span> : null}
          </span>
          <h3 className={featured ? "type-h2 text-[clamp(2rem,2.2vw+1rem,3.4rem)]" : "type-h3"}>
            <span className={titleLine}>{title}</span>
          </h3>
          {excerpt ? <p className="type-read max-w-[40ch] text-muted">{excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}

export function PostGrid({
  children,
  variant = "home",
}: {
  children: React.ReactNode;
  variant?: "home" | "journal" | "related";
}) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-14",
        variant === "home" && "min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3",
        variant === "journal" && "min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3",
        variant === "related" && "min-[700px]:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
