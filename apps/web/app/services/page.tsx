import { faqs, processSteps, serviceRows } from "@kiah/content";
import { Accordion, Container, PageHero, ProcessSteps, Section, SectionHead, SectionNav, ServiceRow } from "@kiah/ui";
import { BreadcrumbJsonLd, JsonLd, faqGraph, pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description: "Interior design, lighting, bespoke furnishings and construction from one New Delhi studio.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <JsonLd data={faqGraph()} />
      <PageHero
        title="Design, build and furnish, with one team."
        lede="From a single room to a ground-up build, four disciplines under one roof keep every detail in step."
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />
      <Section tight className="pt-0">
        <SectionNav label="Services on this page" items={serviceRows.map((row) => ({ id: row.id, label: row.title }))} className="mb-6" />
        <Container>
          {serviceRows.map((row) => (
            <ServiceRow key={row.id} {...row} />
          ))}
        </Container>
      </Section>
      <Section id="process" tone="vellum">
        <Container>
          <SectionHead
            label="How a project runs"
            title="Twelve weeks of design, then the build."
            aside="A week-by-week plan before you commit, and an updated one every Friday after that."
          />
          <ProcessSteps steps={processSteps} />
        </Container>
      </Section>
      <Section id="faq">
        <Container>
          <SectionHead
            label="Questions"
            title="Asked often, answered plainly."
            aside="Something else on your mind? Write to us. A designer replies within one working day."
          />
          <Accordion items={faqs} />
        </Container>
      </Section>
    </>
  );
}
