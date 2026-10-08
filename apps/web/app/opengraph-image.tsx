import { ogCard, ogContentType, ogSize } from "../lib/og";

export const alt = "Kiah — interior design and architecture studio in Brooklyn";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Since 2012",
    title: "Homes drawn around the people who live in them.",
    detail: "Calm, light-filled homes, planned, drawn and built in one studio.",
  });
}
