import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogCard({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  const compact = title.length > 42;
  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-between bg-[#fbfbf8] px-20 py-[72px] text-[#1d201e]">
        <div tw="flex w-full items-center justify-between border-b border-[#c8cac2] pb-6 text-[26px]">
          <span tw="flex items-center">
            Atelier Nord
            <span tw="ml-3 flex h-4 w-4 rounded-full bg-[#94321f]" />
          </span>
          <span tw="text-[#5f635d]">{eyebrow}</span>
        </div>
        <div tw="flex w-full flex-col">
          <div tw={`flex max-w-[1000px] leading-none tracking-[-3px] ${compact ? "text-[64px]" : "text-[84px]"}`}>{title}</div>
          {detail ? <div tw="mt-8 flex text-[28px] text-[#5f635d]">{detail}</div> : null}
        </div>
        <div tw="flex w-full justify-between border-t border-[#c8cac2] pt-6 text-[22px] text-[#5f635d]">
          <span>Interior design and architecture</span>
          <span>Greenpoint, Brooklyn</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
