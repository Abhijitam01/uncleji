import { useId } from "react";
import { scenes, type ArtName } from "./scenes";

function scopeIds(body: string, prefix: string) {
  return body
    .replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${prefix}${id})`);
}

export function Scene({
  name,
  className,
  decorative = false,
}: {
  name: ArtName;
  className?: string;
  decorative?: boolean;
}) {
  const prefix = `s${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const scene = scenes[name];

  return (
    <svg
      className={className}
      viewBox={`0 0 ${scene.width} ${scene.height}`}
      preserveAspectRatio="xMidYMid slice"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": scene.label })}
      dangerouslySetInnerHTML={{ __html: scopeIds(scene.body, prefix) }}
    />
  );
}
