import { notFound } from "next/navigation";
import { Scene } from "@kiah/art";
import { getPost, posts, publishedIso, relatedPosts, site } from "@kiah/content";
import { Container, PageHero, PostCard, PostGrid, Reveal, Section, TextLink } from "@kiah/ui";
import { BreadcrumbJsonLd, JsonLd, articleGraph, pageMeta } from "../../../lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal" };
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    article: { published: publishedIso(post.date), section: post.category },
  });
}

export default async function JournalPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post.slug);
  const published = publishedIso(post.date);
  const url = `${site.url}/journal/${post.slug}`;
  const share = [
    ["Pinterest", `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(post.title)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ["Email", `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`],
  ] as const;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ]}
      />
      <JsonLd data={articleGraph(post, published)} />
      <PageHero
        align="center"
        title={post.title}
        lede={post.excerpt}
        crumbs={[{ href: "/", label: "Home" }, { href: "/journal", label: "Journal" }, { label: post.title }]}
      >
        <p className="type-label animate-fade mt-8 flex justify-center gap-5 text-muted [animation-delay:300ms]">
          <span className="text-ink">{post.category}</span>
          <time dateTime={published}>{post.date}</time>
          <span>{post.readTime} read</span>
        </p>
      </PageHero>
      <Container>
        <figure className="animate-fade aspect-[4/3] overflow-hidden rounded-media bg-vellum [animation-delay:250ms] min-[760px]:aspect-[21/9]">
          <Scene name={post.art} className="size-full" />
        </figure>
      </Container>
      <article className="py-[clamp(3.5rem,8vw,7rem)]">
        <Container className="grid gap-x-6 gap-y-10 min-[1080px]:grid-cols-12">
          <aside className="type-label grid content-start gap-6 text-muted min-[1080px]:sticky min-[1080px]:top-[calc(var(--header)+2rem)] min-[1080px]:col-span-3 min-[1080px]:self-start max-[1079px]:order-last max-[1079px]:border-t max-[1079px]:border-line-strong max-[1079px]:pt-5">
            <p>
              Written by the studio
              <br />
              <span className="text-ink">Kiah, Greenpoint</span>
            </p>
            <div>
              <p>Share</p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-ink">
                {share.map(([label, href]) => (
                  <li key={label}>
                    <TextLink href={href} external={href.startsWith("http")}>
                      {label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="grid max-w-[38rem] gap-7 min-[1080px]:col-span-7 min-[1080px]:col-start-5">
            {post.body.map((block, index) =>
              "h" in block ? (
                <h2 key={index} className="type-h3 mt-6 text-[clamp(1.6rem,1.2vw+1.2rem,2.2rem)]">
                  {block.h}
                </h2>
              ) : (
                <p key={index} className={index === 0 ? "type-lead text-ink" : "type-read text-ink/82"}>
                  {block.p.join(" ")}
                </p>
              ),
            )}
          </div>
        </Container>
      </article>
      <Section tone="vellum">
        <Container>
          <div className="type-label mb-[clamp(2rem,4vw,3.5rem)] flex items-center justify-between gap-6 border-t border-line-strong pt-4 text-muted">
            <span>Keep reading</span>
            <TextLink href="/journal" className="text-ink">
              All articles
            </TextLink>
          </div>
          <PostGrid variant="related">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <PostCard href={`/journal/${item.slug}`} title={item.title} date={item.date} category={item.category} art={item.art} />
              </Reveal>
            ))}
          </PostGrid>
        </Container>
      </Section>
    </>
  );
}
