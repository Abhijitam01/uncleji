import type { ArtName } from "@kiah/art";
import { posts } from "./posts";
import { press } from "./press";
import { projects } from "./projects";
import { reviews } from "./reviews";

export { posts, press, projects, reviews };
export {
  budgetRanges,
  faqs,
  footerColumns,
  hours,
  milestones,
  nav,
  processSteps,
  projectFilters,
  projectTypes,
  ratings,
  serviceRows,
  serviceSummaries,
  site,
  stats,
  team,
  values,
} from "./copy";

export type Project = (typeof projects)[number];
export type Post = (typeof posts)[number];
export type Review = (typeof reviews)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  const count = projects.length;
  return {
    project: projects[index],
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
    index,
  };
}

export function quoteForProject(project: Project, index: number) {
  const city = project.location.split(",")[0] ?? "";
  return reviews.find((review) => review.project.includes(city)) ?? reviews[index % reviews.length];
}

export function relatedPosts(slug: string, count = 3) {
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}

export function reviewQuote(review: Review) {
  return "highlight" in review && review.highlight ? review.highlight : review.quote;
}

export function projectArt(project: Project): ArtName {
  return project.art;
}

const months: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export function publishedIso(date: string) {
  const match = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(date);
  if (!match) return date;
  const month = months[match[2] ?? ""];
  if (!month) return date;
  return `${match[3]}-${month}-${(match[1] ?? "1").padStart(2, "0")}`;
}
