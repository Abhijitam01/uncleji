import { Scene } from "@atelier/art";
import { getAdjacentProjects, projects, quoteForProject } from "@atelier/content";
import { Container, PageHero, Reveal, Section, TextLink } from "@atelier/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, JsonLd, pageMeta, projectGraph } from "../../../lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getAdjacentProjects(slug)?.project;
  if (!project) return { title: "Project" };
  return pageMeta({
    title: project.title,
    description: project.blurb,
    path: `/portfolio/${project.slug}`,
  });
}

const gallerySpans = [
  "min-[860px]:col-span-7 aspect-[4/3]",
  "min-[860px]:col-span-5 aspect-[4/5] min-[860px]:mt-[clamp(3rem,10vw,10rem)]",
  "min-[860px]:col-span-5 min-[860px]:col-start-2 aspect-[4/5]",
  "min-[860px]:col-span-6 aspect-[4/3] min-[860px]:self-end",
];

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const adjacent = getAdjacentProjects(slug);
  if (!adjacent) notFound();
  const { project, next, index } = adjacent;
  const quote = quoteForProject(project, index);
  const facts = [
    ["Location", project.location],
    ["Scope", project.scope],
    ["Area", project.size],
    ["Duration", project.duration],
    ["Completed", project.year],
  ] as const;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ]}
      />
      <JsonLd data={projectGraph(project)} />
      <PageHero
        title={project.title}
        lede={project.blurb}
        crumbs={[{ href: "/", label: "Home" }, { href: "/portfolio", label: "Portfolio" }, { label: project.title }]}
        className="pb-[clamp(2rem,4vw,3rem)]"
      />
      <section>
        <Container>
          <figure className="animate-fade aspect-[4/3] overflow-hidden rounded-media bg-vellum [animation-delay:250ms] min-[860px]:aspect-[16/8]">
            <Scene name={project.art} className="size-full" />
          </figure>
          <dl className="mt-6 grid grid-cols-2 rounded-media border border-line-strong min-[860px]:grid-cols-5">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-line-strong p-4 max-[859px]:border-b max-[859px]:odd:border-r min-[860px]:border-l min-[860px]:first:border-l-0 max-[859px]:last:col-span-2 max-[859px]:last:border-r-0 max-[859px]:last:border-b-0"
              >
                <dt className="type-label text-muted">{label}</dt>
                <dd className="text-[1.05rem] font-medium tracking-[-0.015em]">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-x-6 gap-y-10 min-[960px]:grid-cols-12">
          <div className="min-[960px]:col-span-3">
            <p className="type-label border-t border-line-strong pt-4 text-muted">The story</p>
            <p className="type-label mt-4 max-w-[24ch] text-ink">{project.services.join(", ")}</p>
          </div>
          <div className="grid gap-6 min-[960px]:col-span-7 min-[960px]:col-start-5">
            {project.story.map((paragraph, position) => (
              <Reveal as="p" key={paragraph} delay={position * 80} className={position === 0 ? "type-lead text-ink" : "type-read text-ink/78"}>
                {paragraph}
              </Reveal>
            ))}
            <Reveal as="blockquote" className="mt-8 border-l border-falu pl-6">
              <p className="font-serif text-[clamp(1.4rem,1vw+1.1rem,1.9rem)] leading-snug text-ink italic">“{quote.quote}”</p>
              <footer className="type-label mt-4 text-muted">{quote.name}</footer>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div className="type-label mb-[clamp(2rem,4vw,3.5rem)] flex items-center justify-between gap-6 border-t border-line-strong pt-4 text-muted">
            <span>Room by room</span>
            <TextLink href="/portfolio" className="text-ink">
              All projects
            </TextLink>
          </div>
          <div className="grid gap-6 min-[860px]:grid-cols-12">
            {project.gallery.map((name, position) => (
              <Reveal
                key={`${name}-${position}`}
                delay={(position % 2) * 100}
                className={gallerySpans[position % gallerySpans.length]}
              >
                <figure className="group relative size-full overflow-hidden rounded-media bg-paper bg-[linear-gradient(rgba(29,32,30,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(29,32,30,0.05)_1px,transparent_1px)] bg-[size:24px_24px]">
                  <Scene name={name} className="absolute inset-0 size-full transition-opacity duration-700 ease-out group-hover:opacity-20" />
                  <Scene name={name} decorative className="linework absolute inset-0 size-full opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
                  <figcaption className="type-label absolute bottom-3 left-3 flex items-center gap-3 rounded-full bg-paper/85 py-1.5 pr-3.5 pl-3 backdrop-blur-sm">
                    <span className="text-falu tabular-nums">Plate {String(position + 1).padStart(2, "0")}</span>
                    <span className="capitalize">{name.replaceAll("-", " ")}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Link href={`/portfolio/${next.slug}`} data-cursor="view" className="group block border-t border-line-strong bg-vellum transition-colors duration-500 hover:bg-stone/40">
        <Container className="grid items-center gap-x-6 gap-y-6 py-[clamp(3rem,7vw,6rem)] min-[860px]:grid-cols-12">
          <div className="min-[860px]:col-span-8">
            <p className="type-label text-muted">Next project</p>
            <p className="type-h1 mt-4">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-[position:0_92%] bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
                {next.title}
              </span>
            </p>
            <p className="type-label mt-4 text-muted">
              {next.location}, {next.scope.toLowerCase()}
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-media transition-[translate] duration-700 ease-out group-hover:-translate-x-3 min-[860px]:col-span-3 min-[860px]:col-start-10">
            <Scene name={next.art} decorative className="size-full transition-[scale] duration-700 ease-out group-hover:scale-[1.06]" />
          </div>
        </Container>
      </Link>
    </>
  );
}
