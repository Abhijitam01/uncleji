import { projectFilters, projects } from "@atelier/content";
import { Container, PageHero, PortfolioBrowser, Section } from "@atelier/ui";
import { BreadcrumbJsonLd, pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Portfolio",
  description: "Selected residential, apartment, retreat and commercial projects by Atelier Nord.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]} />
      <PageHero
        title="Twelve homes, from sketch to handover."
        lede="Filter by type, or start with the one that sounds most like your home."
        crumbs={[{ href: "/", label: "Home" }, { label: "Portfolio" }]}
      />
      <Section tight>
        <Container>
          <PortfolioBrowser
            filters={projectFilters}
            projects={projects.map((project) => ({
              slug: project.slug,
              title: project.title,
              location: project.location,
              scope: project.scope,
              year: project.year,
              art: project.art,
              category: project.category,
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
