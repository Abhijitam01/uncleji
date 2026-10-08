import { Scene } from "@kiah/art";
import { milestones, stats, team, values } from "@kiah/content";
import { Container, PageHero, Reveal, Section, SectionHead, ValueGrid } from "@kiah/ui";
import { StudioSplit } from "../../components/studio-split";
import { BreadcrumbJsonLd, pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Studio",
  description: "Fourteen years, four hundred sketches a project and one belief: good rooms come from listening before drawing.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Studio", path: "/studio" }]} />
      <PageHero
        title="A small studio with long conversations."
        lede="Fourteen years, four hundred sketches a project, and one belief: good rooms come from listening before drawing."
        crumbs={[{ href: "/", label: "Home" }, { label: "Studio" }]}
      />
      <Section tight>
        <Container>
          <StudioSplit
            title="It began at a kitchen table in Shahpur Jat."
            lede="Two chairs, one client and a stubborn idea: interiors should serve mornings, not photo shoots."
            extra="Today we are nine people: designers, an architect, a joinery specialist and a very patient bookkeeper. We work across apartments, townhouses and the occasional cabin in the woods, and we stay small on purpose so every home gets the founder’s eye from first sketch to final styling."
            ctaHref="/portfolio"
            ctaLabel="See the projects"
            stats={stats}
          />
        </Container>
      </Section>
      <Section tone="vellum">
        <Container>
          <SectionHead label="What we believe" title="Three values, and no slogans." />
          <ValueGrid items={values} />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHead
            label="The people"
            title="Four of the nine people you’ll meet."
            aside="Every project has a lead designer and an architect from the first meeting to handover."
          />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 min-[960px]:grid-cols-4">
            {team.map((person, index) => (
              <Reveal as="li" key={person.name} delay={index * 80} className={index % 2 === 1 ? "min-[960px]:mt-16" : undefined}>
                <figure>
                  <div className="aspect-[4/5] overflow-hidden rounded-media bg-vellum">
                    <Scene name={person.art} className="size-full" />
                  </div>
                  <figcaption className="mt-4">
                    <p className="text-[1.2rem] font-medium tracking-[-0.02em]">{person.name}</p>
                    <p className="type-label mt-1 text-muted">{person.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section tone="ink">
        <Container>
          <SectionHead
            light
            label="Milestones"
            title="Fourteen years, measured in homes."
            aside="We grew the slow way: one referral at a time, never more than eight projects a year."
          />
          <ol className="grid gap-x-6 border-t border-paper/18 min-[960px]:grid-cols-5">
            {milestones.map((item, index) => (
              <Reveal
                as="li"
                key={item.year}
                delay={index * 90}
                className="relative border-b border-paper/18 py-8 min-[960px]:border-b-0 min-[960px]:pr-6"
              >
                <span className="absolute -top-[5px] left-0 h-[9px] w-px bg-paper max-[959px]:hidden" aria-hidden="true" />
                <p className="text-[clamp(2rem,2vw+1rem,3rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">{item.year}</p>
                <h3 className="mt-6 text-[1.15rem] font-medium tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-paper/62">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
