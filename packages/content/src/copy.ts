import type { ArtName } from "@kiah/art";

export const site = {
  name: "Kiah",
  url: "https://kiah.studio",
  description:
    "A warm, human-centred interior design and architecture studio in Brooklyn crafting calm homes, considered light and bespoke furnishings.",
  blurb: "An interior design & architecture studio crafting calm, personal homes since 2012.",
  email: "hello@kiah.studio",
  phone: "+1 (212) 555-0148",
  phoneHref: "tel:+12125550148",
  address: ["68 Java St, Greenpoint", "Brooklyn, NY 11222"],
  street: "68 Java St",
  neighborhood: "Greenpoint",
  city: "Brooklyn",
  region: "NY",
  postalCode: "11222",
  country: "US",
  latitude: 40.7304,
  longitude: -73.9572,
  locality: "Greenpoint, Brooklyn",
  foundingYear: "2012",
  socials: [
    { label: "Instagram", short: "Ig", href: "https://www.instagram.com/kiah" },
    { label: "Pinterest", short: "Pi", href: "https://www.pinterest.com/kiah" },
    { label: "LinkedIn", short: "In", href: "https://www.linkedin.com/company/kiah" },
  ],
} as const;

export const nav = [
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/journal", label: "Journal" },
] as const;

export const footerColumns = [
  {
    title: "Studio",
    links: [
      { href: "/studio", label: "About us" },
      { href: "/services#process", label: "Our process" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#interior-design", label: "Interior design" },
      { href: "/services#lighting-design", label: "Lighting design" },
      { href: "/services#bespoke-furnishings", label: "Bespoke furnishings" },
      { href: "/services#construction", label: "Construction" },
    ],
  },
] as const;

export const stats = [
  { value: 14, suffix: "+", label: "years of practice" },
  { value: 240, suffix: "+", label: "projects delivered" },
  { value: 98, suffix: "%", label: "clients who return or refer" },
] as const;

export const values = [
  {
    numeral: "I",
    title: "Warm & human-centred",
    body: "We design around people first — how you wake, cook, gather and rest — then let beauty follow function, never the reverse.",
    tone: "light",
  },
  {
    numeral: "II",
    title: "Artistic & expressive",
    body: "Every project carries one confident gesture — a sculpted arch, a wash of limewash, a stair that deserves a second glance.",
    tone: "dark",
  },
  {
    numeral: "III",
    title: "Client-focused",
    body: "Fixed fees, shared budgets and weekly previews. You’ll never wonder what your home looks like until “the big reveal.”",
    tone: "light",
  },
] as const;

export const processSteps = [
  {
    num: "01",
    duration: "Weeks 1–2",
    title: "Listen and explore",
    body: "A long first conversation, a walk through your space, and a written brief we both sign off on.",
  },
  {
    num: "02",
    duration: "Weeks 3–6",
    title: "Concept and mood",
    body: "Hand sketches, material boards and early 3D views — direction locked before detail begins.",
  },
  {
    num: "03",
    duration: "Weeks 7–12",
    title: "Design and document",
    body: "Drawings, lighting plans and joinery details priced with real quotes — no vague allowances.",
  },
  {
    num: "04",
    duration: "4–9 months",
    title: "Build and style",
    body: "We manage the site week by week, then style every shelf before handing back the keys.",
  },
] as const;

export const serviceSummaries = [
  {
    num: "01",
    title: "Interior design",
    body: "Full-home and room-by-room design — spatial planning, palettes, custom joinery drawings and a styled finish you can feel the moment you walk in.",
  },
  {
    num: "02",
    title: "Lighting design",
    body: "Layered lighting schemes tuned to each hour of the day — architectural fixtures, dimmable scenes and warm pools of light where life actually happens.",
  },
  {
    num: "03",
    title: "Bespoke furnishings",
    body: "Made-to-measure pieces from trusted local workshops — oak tables, linen upholstery and storage that swallows clutter without swallowing character.",
  },
  {
    num: "04",
    title: "Construction",
    body: "Renovations and extensions managed end-to-end. One contract, one point of contact, and a site diary you can follow from anywhere.",
  },
] as const;

export const serviceRows: Array<{
  id: string;
  num: string;
  title: string;
  body: string;
  art: ArtName;
  flip: boolean;
  items: string[];
}> = [
  {
    id: "interior-design",
    num: "(01)",
    title: "Interior design",
    art: "living-room",
    flip: false,
    body: "Full-home and room-by-room design — spatial planning, palettes, custom joinery drawings and a styled finish you can feel the moment you walk in.",
    items: [
      "Concept development & material boards",
      "Spatial planning and joinery drawings",
      "Furniture, fabric & finish specification",
      "Full styling for handover day",
    ],
  },
  {
    id: "lighting-design",
    num: "(02)",
    title: "Lighting design",
    art: "dark-stairs",
    flip: true,
    body: "Layered schemes tuned to each hour of the day — architectural fixtures, dimmable scenes and warm pools of light where life actually happens.",
    items: [
      "Ambient, task & accent layers",
      "Circuit plans with scene presets",
      "Fixture sourcing and custom shades",
      "Daylight analysis for key rooms",
    ],
  },
  {
    id: "bespoke-furnishings",
    num: "(03)",
    title: "Bespoke furnishings",
    art: "material-board",
    flip: false,
    body: "Made-to-measure pieces from trusted local workshops — oak tables, linen upholstery and storage that swallows clutter without swallowing character.",
    items: [
      "Designed-and-drawn by the studio",
      "Built by two partner workshops in Brooklyn",
      "Solid oak, walnut & linen as standard",
      "White-glove delivery and install",
    ],
  },
  {
    id: "construction",
    num: "(04)",
    title: "Construction",
    art: "house-exterior",
    flip: true,
    body: "Renovations, extensions and ground-up builds managed end-to-end. One contract, one point of contact, and a site diary you can follow from anywhere.",
    items: [
      "Fixed-fee design & build contracts",
      "Vetted trades, weekly cost reporting",
      "Photo site diary every Friday",
      "Two-year post-handover care visit",
    ],
  },
];

export const faqs = [
  {
    num: "Q1",
    title: "What does a typical project cost?",
    body: "A furnished room refresh typically lands between $25k–60k; full-home renovations run $350k+. Every proposal carries ranges with clear levers, so you always know what moves the number.",
  },
  {
    num: "Q2",
    title: "How long does a full renovation take?",
    body: "Design runs 8–12 weeks depending on scope; construction adds 4–9 months. We give you a week-by-week plan before you commit, and we keep it updated every Friday.",
  },
  {
    num: "Q3",
    title: "Do you take on single rooms?",
    body: "Happily. Bathrooms, kids’ rooms and home offices are some of our favourite briefs — small rooms, fast decisions, dramatic results.",
  },
  {
    num: "Q4",
    title: "Do you work outside New York?",
    body: "Yes — recent projects span Quebec, Chicago and Australia. Remote builds get the same weekly previews, plus scheduled site visits at every milestone.",
  },
] as const;

export const team: Array<{ name: string; role: string; art: ArtName }> = [
  { name: "Elena Voss", role: "Founder and principal designer", art: "team-elena" },
  { name: "Marcus Hale", role: "Head of architecture", art: "team-marcus" },
  { name: "June Okafor", role: "Interiors & styling lead", art: "team-june" },
  { name: "Tomas Lindqvist", role: "Project architect", art: "team-tomas" },
];

export const milestones = [
  {
    year: "2012",
    title: "A table in Greenpoint",
    body: "Elena leaves a large commercial firm, buys a secondhand drafting table and takes on two apartment renovations.",
  },
  {
    year: "2015",
    title: "First full build",
    body: "The Spruce Lane house — ground-up architecture, interiors and furniture. Still the studio’s most requested case study.",
  },
  {
    year: "2019",
    title: "Licensed architecture",
    body: "Marcus joins and the practice adds full architectural services under one roof.",
  },
  {
    year: "2022",
    title: "The workshop partnership",
    body: "An exclusive collaboration with two local joineries means bespoke pieces at honest lead times.",
  },
  {
    year: "2026",
    title: "Nine people, eight projects",
    body: "Same table energy. Slightly better chairs.",
  },
] as const;

export const ratings = [
  { value: "5.0", mark: "★★★★★", label: "Average across all review platforms" },
  { value: "98%", mark: "★★★★★", label: "Clients who return or refer a friend" },
  { value: "240+", mark: "✦", label: "Homes designed since 2012" },
  { value: "0", mark: "✦", label: "Budgets exceeded without written approval. We keep count." },
] as const;

export const hours = [
  { day: "Mon–Fri", time: "9:00–18:00" },
  { day: "Sat", time: "By appointment" },
  { day: "Sun", time: "Closed, we’re at the flea market" },
] as const;

export const projectTypes = [
  "Full home renovation",
  "Apartment refresh",
  "Single room",
  "New build / architecture",
  "Furnishing & styling only",
] as const;

export const budgetRanges = ["Under $50k", "$50k – $150k", "$150k – $350k", "$350k+"] as const;

export const projectFilters = [
  { id: "all", label: "All work" },
  { id: "residential", label: "Residential" },
  { id: "apartment", label: "Apartment" },
  { id: "retreat", label: "Retreat" },
  { id: "commercial", label: "Commercial" },
] as const;
