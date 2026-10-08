"use client";

import { useRef, useState } from "react";
import { Button } from "../button/button";
import { TextLink } from "../link-arrow/link-arrow";

const field =
  "w-full border-0 border-b border-line-strong bg-transparent py-3 text-[clamp(1.1rem,0.4vw+1rem,1.3rem)] tracking-[-0.01em] outline-none transition-[border-color] duration-200 ease-micro placeholder:text-ink/30 hover:border-ink/50 focus:border-ink focus-visible:outline-none";

function Line() {
  return (
    <span
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-focus-within:scale-x-100"
      aria-hidden="true"
    />
  );
}

const fieldLabel = "type-label text-muted transition-colors duration-150 ease-micro group-focus-within:text-ink";

function Chips({ name, label, options }: { name: string; label: string; options: readonly string[] }) {
  return (
    <fieldset className="group grid gap-4">
      <legend className={`${fieldLabel} mb-4`}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <label key={option} className="group/chip relative">
            <input type="radio" name={name} value={option} required={index === 0} className="peer absolute inset-0 opacity-0" />
            <span className="inline-flex h-10 cursor-pointer items-center rounded-full px-4 text-[0.92rem] shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color,box-shadow,scale] duration-150 ease-micro select-none gap-0 peer-hover:shadow-[inset_0_0_0_1px_var(--color-ink)] peer-checked:bg-ink peer-checked:text-paper peer-checked:shadow-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-falu peer-active:scale-[0.97] group-has-checked/chip:gap-2">
              <svg viewBox="0 0 12 10" className="w-0 opacity-0 transition-[width,opacity] duration-300 ease-out group-has-checked/chip:w-3 group-has-checked/chip:opacity-100" aria-hidden="true">
                <path d="M1 5.2 4.3 8.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm({
  types,
  budgets,
  email,
}: {
  types: readonly string[];
  budgets: readonly string[];
  email: string;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  if (sent) {
    return (
      <div ref={doneRef} className="grid justify-items-start gap-5 border-t border-ink pt-8" tabIndex={-1} role="status">
        <span className="animate-check grid size-14 place-items-center rounded-full bg-falu text-paper" aria-hidden="true">
          <svg viewBox="0 0 16 12" className="w-5">
            <path d="M1 6.5 5.5 11 15 1" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <h2 className="type-h2">Enquiry sent.</h2>
        <p className="type-lead max-w-[34ch] text-ink/72">
          Ira or Kabir will reply within one working day. If it’s urgent, call the studio.
        </p>
        <Button href="/portfolio" variant="ghost">
          Browse the portfolio
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-10"
      onSubmit={(event) => {
        event.preventDefault();
        if (sending || !event.currentTarget.reportValidity()) return;
        setSending(true);
        window.setTimeout(() => {
          setSent(true);
          window.setTimeout(() => doneRef.current?.focus(), 0);
        }, 900);
      }}
    >
      <div className="grid gap-10 min-[640px]:grid-cols-2 min-[640px]:gap-6">
        <label className="group grid gap-1">
          <span className={fieldLabel}>Your name</span>
          <span className="relative">
            <input name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={field} />
            <Line />
          </span>
        </label>
        <label className="group grid gap-1">
          <span className={fieldLabel}>Email</span>
          <span className="relative">
            <input name="email" type="email" required autoComplete="email" placeholder="jane@example.com" className={field} />
            <Line />
          </span>
        </label>
      </div>
      <Chips name="type" label="What are we working on?" options={types} />
      <Chips name="budget" label="Budget range" options={budgets} />
      <label className="group grid gap-1">
        <span className={fieldLabel}>About the rooms</span>
        <span className="relative grid">
          <textarea
          name="message"
          required
          rows={4}
          placeholder="Which rooms, a rough timeline, and what isn’t working today"
          className={`${field} min-h-32 resize-y`}
        />
          <Line />
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" size="lg" aria-disabled={sending} className={sending ? "pointer-events-none" : undefined}>
          {sending ? (
            <span className="inline-flex items-center gap-3">
              <span className="size-3.5 animate-spin rounded-full border border-current border-t-transparent" aria-hidden="true" />
              Sending
            </span>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="type-label text-muted">
          Or write to <TextLink href={`mailto:${email}`} className="text-ink">{email}</TextLink>
        </p>
      </div>
    </form>
  );
}
