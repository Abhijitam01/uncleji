import { getPost } from "@kiah/content";
import { ogCard, ogContentType, ogSize } from "../../../lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return [
    {
      id: "og",
      alt: post ? post.title : "Kiah journal",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogCard({
    eyebrow: post?.category ?? "Journal",
    title: post?.title ?? "Journal",
    detail: post ? `${post.date}, ${post.readTime} read` : undefined,
  });
}