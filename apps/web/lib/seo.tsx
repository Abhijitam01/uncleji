import { faqs, posts, projects, reviews, site, type Post, type Project } from "@kiah/content";
import type { Metadata } from "next";

export function absoluteUrl(path = "/") {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const studioId = `${site.url}/#studio`;

export function pageMeta({
  title,
  description,
  path,
  article,
}: {
  title?: string;
  description: string;
  path: string;
  article?: { published: string; section?: string };
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      description,
      url: path,
      type: article ? "article" : "website",
      ...(article
        ? {
            publishedTime: article.published,
            authors: [site.name],
            section: article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      description,
    },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: readonly { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function studioGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": studioId },
      },
      {
        "@type": ["InteriorDesigner", "ProfessionalService"],
        "@id": studioId,
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: "+1-212-555-0148",
        image: `${site.url}/opengraph-image`,
        foundingDate: site.foundingYear,
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          addressLocality: site.city,
          addressRegion: site.region,
          postalCode: site.postalCode,
          addressCountry: site.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.latitude,
          longitude: site.longitude,
        },
        areaServed: ["New York", "Brooklyn", "United States"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00",
          },
        ],
        sameAs: site.socials.map((social) => social.href),
      },
    ],
  };
}

export function faqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.body },
    })),
  };
}

export function reviewsGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "@id": studioId,
    name: site.name,
    url: absoluteUrl("/reviews"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: String(reviews.length),
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewBody: review.quote,
      itemReviewed: { "@id": studioId },
    })),
  };
}

export function projectGraph(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.blurb,
    url: absoluteUrl(`/portfolio/${project.slug}`),
    dateCreated: project.year,
    creator: { "@id": studioId },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    about: project.scope,
    keywords: project.services.join(", "),
  };
}

export function articleGraph(post: Post, published: string) {
  const url = absoluteUrl(`/journal/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    dateModified: published,
    articleSection: post.category,
    inLanguage: "en-US",
    mainEntityOfPage: url,
    url,
    image: `${url}/opengraph-image`,
    author: { "@id": studioId, name: site.name },
    publisher: {
      "@id": studioId,
      name: site.name,
      url: site.url,
    },
  };
}

export const indexablePaths = [
  "/",
  "/studio",
  "/services",
  "/portfolio",
  "/reviews",
  "/journal",
  "/contact",
  ...projects.map((project) => `/portfolio/${project.slug}`),
  ...posts.map((post) => `/journal/${post.slug}`),
];
