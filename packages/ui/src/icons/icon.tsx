import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export function Icon({
  icon,
  size = 18,
  className,
}: {
  icon: IconSvgElement;
  size?: number;
  className?: string;
}) {
  return <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={1.5} className={className} />;
}
