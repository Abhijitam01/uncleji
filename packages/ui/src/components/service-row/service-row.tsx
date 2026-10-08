import { Scene, type ArtName } from "@atelier/art";
import { cn } from "../../cn";
import { TextLink } from "../link-arrow/link-arrow";
import { Reveal } from "../reveal/reveal";

export function ServiceRow({
  id,
  title,
  body,
  items,
  art,
  flip = false,
}: {
  id: string;
  title: string;
  body: string;
  items: readonly string[];
  art: ArtName;
  flip?: boolean;
}) {
  return (
    <article id={id} className="grid scroll-mt-28 gap-x-6 gap-y-10 border-t border-line-strong py-[clamp(3.5rem,7vw,6.5rem)] min-[960px]:grid-cols-12 min-[960px]:items-start">
      <Reveal className={cn("min-[960px]:col-span-5", flip && "min-[960px]:order-2 min-[960px]:col-start-8")}>
        <figure className="aspect-[4/5] overflow-hidden rounded-media bg-vellum">
          <Scene name={art} className="size-full" />
        </figure>
      </Reveal>
      <div className={cn("grid content-start gap-7 min-[960px]:col-span-6", flip ? "min-[960px]:order-1" : "min-[960px]:col-start-7")}>
        <Reveal as="h2" className="type-h2">
          {title}
        </Reveal>
        <Reveal as="p" delay={80} className="type-lead max-w-[36ch] text-ink/72">
          {body}
        </Reveal>
        <Reveal delay={140}>
          <ul className="border-t border-line">
            {items.map((item) => (
              <li key={item} className="border-b border-line py-3 text-[0.98rem]">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={200}>
          <TextLink href="/contact">Discuss a {title.toLowerCase()} project</TextLink>
        </Reveal>
      </div>
    </article>
  );
}
