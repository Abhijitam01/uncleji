"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../cn";
import { Button } from "../button/button";
import { Logo } from "../logo/logo";
import { StudioClock } from "../studio-clock/studio-clock";

type LinkItem = { href: string; label: string };

const footLink =
  "w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-[0.1em] text-paper/70 transition-[background-size,color] duration-300 ease-out hover:bg-[length:100%_1px] hover:text-paper";

function Cell({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid content-between gap-3 bg-ink p-4", className)}>
      <span className="type-label text-paper/42">{label}</span>
      <div className="text-[0.95rem] text-paper">{children}</div>
    </div>
  );
}

export function SiteFooter({
  email,
  phone,
  phoneHref,
  address,
  socials,
  columns,
  hours,
}: {
  email: string;
  phone: string;
  phoneHref: string;
  address: readonly string[];
  socials: readonly { label: string; href: string }[];
  columns: readonly { title: string; links: readonly LinkItem[] }[];
  hours: readonly { day: string; time: string }[];
}) {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const onContact = pathname === "/contact";

  return (
    <footer className="bg-ink text-paper">
      {onContact ? null : (
        <div className="shell pt-[clamp(5rem,11vw,10rem)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="type-label flex justify-between gap-6 border-t border-paper/14 pt-4 text-paper/45">
            <span>Next step</span>
            <span>Reply within one working day</span>
          </div>
          <Link
            href="/contact"
            data-cursor="view"
            className="group mt-[clamp(2rem,5vw,4rem)] flex items-end justify-between gap-6 text-[clamp(3.4rem,10.4vw,13rem)] leading-[0.86] font-medium tracking-[-0.06em]"
          >
            <span className="relative">
              <span className="block transition-colors duration-500 ease-out group-hover:text-falu-bright">Have a room</span>
              <span className="block transition-colors delay-75 duration-500 ease-out group-hover:text-falu-bright">in mind?</span>
            </span>
            <svg
              viewBox="0 0 48 48"
              className="mb-[0.12em] size-[0.62em] shrink-0 transition-[translate,rotate] duration-500 ease-out group-hover:translate-x-[0.06em] group-hover:-rotate-45 max-[700px]:hidden"
              aria-hidden="true"
            >
              <path d="M4 24h38M28 10l14 14-14 14" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </Link>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 min-[960px]:grid-cols-12 min-[960px]:items-end">
            <p className="type-lead text-paper/68 min-[960px]:col-span-5">
              Tell us what isn’t working today. Elena or Marcus will reply with real thoughts rather than a brochure.
            </p>
            <div className="flex flex-wrap items-center gap-3 min-[960px]:col-span-5 min-[960px]:col-start-8 min-[960px]:justify-end">
              <Button href="/contact" variant="light" size="lg">
                Book a consultation
              </Button>
              <Button href={`mailto:${email}`} variant="ghost-light" size="lg">
                Write to us
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={cn("shell grid grid-cols-2 gap-x-6 gap-y-12 border-t border-paper/14 py-14 min-[1080px]:grid-cols-12", onContact && "border-t-0 pt-[clamp(4rem,8vw,6rem)]")}>
        <div className="col-span-2 grid content-start gap-5 min-[1080px]:col-span-4">
          <Logo light />
          <p className="max-w-[30ch] font-serif text-[1.125rem] leading-snug text-paper/62">
            Interior design and architecture for calm, personal homes. Drawn in Greenpoint since 2012.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="min-[1080px]:col-span-2">
            <h2 className="type-label mb-5 text-paper/42">{column.title}</h2>
            <ul className="grid gap-2.5 text-[0.98rem]">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="min-[1080px]:col-span-2">
          <h2 className="type-label mb-5 text-paper/42">Visit</h2>
          <address className="grid gap-1 text-[0.98rem] text-paper/70 not-italic">
            <span>{address[0]}</span>
            <span>{address[1]}</span>
          </address>
          <dl className="mt-5 grid gap-1.5 text-[0.9rem]">
            {hours.map((row) => (
              <div key={row.day} className="grid grid-cols-[3.75rem_1fr] gap-2">
                <dt className="text-paper/42">{row.day}</dt>
                <dd className="text-paper/70">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="min-[1080px]:col-span-2">
          <h2 className="type-label mb-5 text-paper/42">Contact</h2>
          <ul className="grid gap-2.5 text-[0.98rem]">
            <li>
              <a href={`mailto:${email}`} className={cn(footLink, "break-all")}>
                {email}
              </a>
            </li>
            <li>
              <a href={phoneHref} className={footLink}>
                {phone}
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={footLink}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell pb-[var(--gutter)]">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-media border border-paper/14 bg-paper/14 min-[900px]:grid-cols-[1.4fr_1fr_0.7fr_0.7fr_auto]">
          <Cell label="Studio" className="max-[899px]:col-span-2">Atelier Nord, interior design and architecture</Cell>
          <Cell label="Local time">
            <StudioClock light className="text-[0.95rem] text-paper" />
          </Cell>
          <Cell label="Scale">1:1</Cell>
          <Cell label="Sheet">© {year}</Cell>
          <a
            href="#main"
            className="group grid content-between gap-3 bg-ink p-4 transition-colors duration-200 ease-micro hover:bg-paper hover:text-ink max-[899px]:col-span-2 min-[900px]:min-w-40"
          >
            <span className="type-label text-paper/42 transition-colors duration-200 group-hover:text-muted">Return</span>
            <span className="flex items-center justify-between gap-4 text-[0.95rem]">
              Back to top
              <svg viewBox="0 0 12 12" className="size-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" aria-hidden="true">
                <path d="M6 11V1M1.5 5.5 6 1l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div className="overflow-hidden" aria-hidden="true">
        <p className="shell -mt-[1vw] translate-y-[9%] text-[18.5vw] leading-[0.8] font-medium tracking-[-0.065em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(251,251,248,0.22)] select-none">
          Atelier Nord
        </p>
      </div>
    </footer>
  );
}
