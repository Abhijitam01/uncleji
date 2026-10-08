import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Newsreader } from "next/font/google";
import { footerColumns, hours, nav, posts, projects, site } from "@atelier/content";
import { Cursor, SiteFooter, SiteHeader } from "@atelier/ui";
import { JsonLd, studioGraph } from "../lib/seo";
import "./globals.css";

const sans = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kiah — Interior Design & Architecture Studio",
    template: "%s — Kiah",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Interior design",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Kiah — Interior Design & Architecture Studio",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiah — Interior Design & Architecture Studio",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbf8",
  colorScheme: "light",
};

const counts: Record<string, number> = { "/portfolio": projects.length, "/journal": posts.length };
const navItems = nav.map((item) => ({ ...item, count: counts[item.href] }));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-paper font-sans text-[1.0625rem] leading-normal text-ink antialiased">
        <JsonLd data={studioGraph()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Cursor />
        <SiteHeader items={navItems} email={site.email} phone={site.phone} phoneHref={site.phoneHref} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter
          email={site.email}
          phone={site.phone}
          phoneHref={site.phoneHref}
          address={site.address}
          socials={site.socials}
          columns={footerColumns}
          hours={hours}
        />
      </body>
    </html>
  );
}
