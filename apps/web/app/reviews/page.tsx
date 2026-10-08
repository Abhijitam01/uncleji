import { press, ratings, reviews } from "@atelier/content";
import { Container, PageHero, PressRow, Quote, QuoteGrid, Reveal, Section } from "@atelier/ui";
import { BreadcrumbJsonLd, JsonLd, pageMeta, reviewsGraph } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Reviews",
  description: "Unedited notes from the people who let Kiah redraw their daily lives.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} />
      <JsonLd data={reviewsGraph()} />
      <PageHero
        title="In our clients’ words."
        lede="Unedited notes from the people who let us redraw their daily lives."
        crumbs={[{ href: "/", label: "Home" }, { label: "Reviews" }]}
      />
      <Section tight>
        <Container>
          <dl className="mb-[clamp(4rem,8vw,7rem)] grid grid-cols-2 border-y border-line-strong min-[960px]:grid-cols-4">
            {ratings.map((rating, index) => (
              <Reveal
                key={rating.label}
                delay={index * 70}
                className="flex flex-col-reverse justify-end gap-3 border-line-strong py-6 pr-4 max-[959px]:odd:border-r max-[959px]:[&:nth-child(-n+2)]:border-b min-[960px]:border-l min-[960px]:pl-6 min-[960px]:first:border-l-0 min-[960px]:first:pl-0 max-[959px]:even:pl-4"
              >
                <dt className="type-label max-w-[22ch] text-muted">{rating.label}</dt>
                <dd className="text-[clamp(2.4rem,2.6vw+1rem,4rem)] leading-none font-medium tracking-[-0.05em] tabular-nums">{rating.value}</dd>
              </Reveal>
            ))}
          </dl>
          <QuoteGrid>
            {reviews.map((review) => (
              <Quote key={review.name} quote={review.quote} name={review.name} project={review.project} />
            ))}
          </QuoteGrid>
        </Container>
      </Section>
      <PressRow label="As featured in" names={press} className="border-b-0" />
    </>
  );
}
