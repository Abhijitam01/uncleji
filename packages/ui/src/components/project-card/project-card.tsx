import { Scene, type ArtName } from "@atelier/art";
import Link from "next/link";
import { cn } from "../../cn";

export function ProjectCard({
  href,
  title,
  location,
  scope,
  year,
  art,
  aspect = "aspect-[4/5]",
  className,
  style,
}: {
  href: string;
  title: string;
  location: string;
  scope: string;
  year: string;
  art: ArtName;
  aspect?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article className={className} style={style}>
      <Link href={href} data-cursor="view" className="group block">
        <div className={cn("relative overflow-hidden rounded-media bg-vellum", aspect)}>
          <Scene
            name={art}
            className="absolute inset-0 size-full transition-[scale,opacity] duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-25"
          />
          <Scene
            name={art}
            decorative
            className="linework absolute inset-0 size-full opacity-0 transition-[opacity,scale] duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-100"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="text-[clamp(1.2rem,0.6vw+1rem,1.5rem)] leading-tight font-medium tracking-[-0.025em]">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-[0.08em] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
              {title}
            </span>
          </h3>
          <span className="type-label shrink-0 text-muted tabular-nums">{year}</span>
        </div>
        <p className="type-label mt-1 text-muted">
          {location}, {scope.toLowerCase()}
        </p>
      </Link>
    </article>
  );
}
