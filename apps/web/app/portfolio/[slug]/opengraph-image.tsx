import { getProject } from "@atelier/content";
import { ogCard, ogContentType, ogSize } from "../../../lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return [
    {
      id: "og",
      alt: project ? `${project.title} — ${project.location}` : "Kiah project",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return ogCard({
    eyebrow: project?.tagLabel ?? "Portfolio",
    title: project?.title ?? "Portfolio",
    detail: project ? `${project.location}, ${project.scope.toLowerCase()}` : undefined,
  });
}
