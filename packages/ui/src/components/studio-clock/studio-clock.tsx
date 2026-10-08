"use client";

import { useEffect, useState } from "react";
import { cn } from "../../cn";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h23",
});

function readNewYork(date: Date) {
  const parts = Object.fromEntries(format.formatToParts(date).map((part) => [part.type, part.value]));
  const hour = Number(parts.hour);
  const minute = parts.minute ?? "00";
  const weekday = parts.weekday ?? "";
  const open = !["Sat", "Sun"].includes(weekday) && hour >= 9 && hour < 18;
  const display = `${hour % 12 || 12}:${minute} ${hour < 12 ? "am" : "pm"}`;
  return { open, display };
}

export function StudioClock({ className, light = false }: { className?: string; light?: boolean }) {
  const [now, setNow] = useState<ReturnType<typeof readNewYork> | null>(null);

  useEffect(() => {
    const tick = () => setNow(readNewYork(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={cn("type-label inline-flex items-center gap-2 whitespace-nowrap", light ? "text-paper/60" : "text-muted", className)}>
      <span
        className={cn(
          "size-1.5 rounded-full transition-colors duration-300",
          now?.open ? "animate-blink bg-falu-bright" : light ? "bg-paper/30" : "bg-stone",
        )}
        aria-hidden="true"
      />
      <span className={cn("transition-opacity duration-300", now ? "opacity-100" : "opacity-0")} aria-hidden={now ? undefined : true}>
        Brooklyn {now?.display ?? "0:00 am"}
        <span className="sr-only">, studio {now?.open ? "open" : "closed"}</span>
      </span>
    </p>
  );
}
