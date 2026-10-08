import { posts, press, processSteps, projects, reviewQuote, reviews, serviceSummaries, stats, values } from "@kiah/content";
import {
  Accordion,
  Container,
  PostCard,
  PostGrid,
  PressRow,
  ProcessSteps,
  QuoteSlider,
  Reveal,
  Section,
  SectionHead,
  TextLink,
} from "@kiah/ui";
import { Hero } from "../components/hero";
import { Statement } from "../components/statement";
import { StudioSplit } from "../components/studio-split";
import { WorkReel } from "../components/work-reel";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  description:
    "Kiah is a New Delhi interior design and architecture studio crafting calm homes, considered light and bespoke furnishings since 2012.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <PressRow label="As featured in" names={press} />
      <Section id="studio">
        <Container>
          <StudioSplit
            title="A small team, and the founder on every project."
            lede="Kiah designs apartments, townhouses and retreats. We take on eight projects a year, so the person who draws your first sketch is there when the last shelf is styled."
            stats={stats}
          />
        </Container>
      </Section>
      <WorkReel items={projects.slice(0, 6)} total={projects.length} />
      <Section id="services" tone="vellum">
        <Container>
          <SectionHead
            label="Services"
            title="Design, build and furnish, under one roof."
            aside="From a single room to a ground-up house, four disciplines share one team and one contract."
            action={<TextLink href="/services">All services</TextLink>}
          />
          <Accordion items={serviceSummaries.map((item) => ({ ...item, href: "/contact" }))} />
        </Container>
      </Section>
      <Statement values={values} />
      <Section id="process">
        <Container>
          <SectionHead
            label="How a project runs"
            title="Twelve weeks of design, then the build."
            aside="You see a week-by-week plan before you commit, and an updated one every Friday after that."
          />
          <ProcessSteps steps={processSteps} />
        </Container>
      </Section>
      <QuoteSlider
        label="What clients say"
        quotes={reviews.slice(0, 4).map((review) => ({
          quote: reviewQuote(review),
          name: review.name,
          project: review.project,
        }))}
      />
      <Section id="journal">
        <Container>
          <SectionHead
            label="Journal"
            title="Notes on light, materials and living well."
            action={<TextLink href="/journal">All articles</TextLink>}
          />
          <PostGrid>
            {posts.slice(0, 3).map((post, index) => (
              <Reveal key={post.slug} delay={index * 90}>
                <PostCard href={`/journal/${post.slug}`} title={post.title} date={post.date} category={post.category} readTime={post.readTime} art={post.art} />
              </Reveal>
            ))}
          </PostGrid>
        </Container>
      </Section>
    </>
  );
}
