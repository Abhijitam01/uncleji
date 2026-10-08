import { Scene } from "@kiah/art";
import { budgetRanges, hours, projectTypes, site } from "@kiah/content";
import { ContactForm, Container, PageHero, Section, StudioClock, TextLink } from "@kiah/ui";
import { BreadcrumbJsonLd, pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Tell us about your home and book a free consultation with Kiah in Shahpur Jat, New Delhi.",
  path: "/contact",
});

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line-strong pt-4">
      <h2 className="type-label text-muted">{label}</h2>
      <div className="text-[1.05rem]">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero
        title="Tell us about the rooms."
        lede="Your rooms, your timeline and a budget range are enough to start. We reply within one working day."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />
      <Section tight>
        <Container className="grid gap-x-6 gap-y-16 min-[1080px]:grid-cols-12">
          <div className="min-[1080px]:col-span-7">
            <ContactForm types={projectTypes} budgets={budgetRanges} email={site.email} />
          </div>
          <aside className="grid content-start gap-10 min-[1080px]:col-span-4 min-[1080px]:col-start-9">
            <Block label="Write or call">
              <p>
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
              </p>
              <p className="mt-1">
                <TextLink href={site.phoneHref}>{site.phone}</TextLink>
              </p>
            </Block>
            <Block label="Visit the studio">
              <address className="not-italic">
                {site.address[0]}
                <br />
                {site.address[1]}
              </address>
              <StudioClock className="mt-3" />
            </Block>
            <Block label="Hours">
              <dl className="grid gap-1">
                {hours.map((row) => (
                  <div key={row.day} className="flex justify-between gap-6">
                    <dt className="text-muted">{row.day}</dt>
                    <dd className="text-right">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </Block>
            <figure className="aspect-[4/3] overflow-hidden rounded-media bg-vellum">
              <Scene name="city-map" className="size-full" />
            </figure>
          </aside>
        </Container>
      </Section>
    </>
  );
}
