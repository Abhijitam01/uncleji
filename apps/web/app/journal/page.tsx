import { posts } from "@atelier/content";
import { Container, PageHero, PostCard, PostGrid, Reveal, Section } from "@atelier/ui";
import { BreadcrumbJsonLd, pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Journal",
  description: "What the Atelier Nord studio is sketching, specifying and arguing about this month.",
  path: "/journal",
});

export default function JournalPage() {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]} />
      <PageHero
        title="Notes on process, light and living well."
        lede="What we’re sketching, specifying and arguing about this month."
        crumbs={[{ href: "/", label: "Home" }, { label: "Journal" }]}
      />
      <Section tight>
        <Container className="grid gap-[clamp(3rem,6vw,5rem)]">
          <PostCard
            featured
            href={`/journal/${featured.slug}`}
            title={featured.title}
            date={featured.date}
            category={featured.category}
            readTime={featured.readTime}
            excerpt={featured.excerpt}
            art={featured.art}
          />
          <PostGrid variant="journal">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 90}>
                <PostCard
                  href={`/journal/${post.slug}`}
                  title={post.title}
                  date={post.date}
                  category={post.category}
                  readTime={post.readTime}
                  excerpt={post.excerpt}
                  art={post.art}
                />
              </Reveal>
            ))}
          </PostGrid>
        </Container>
      </Section>
    </>
  );
}
