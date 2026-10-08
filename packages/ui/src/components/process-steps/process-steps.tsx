import { Reveal } from "../reveal/reveal";

export function ProcessSteps({
  steps,
}: {
  steps: readonly { num: string; title: string; body: string; duration?: string }[];
}) {
  return (
    <ol className="grid gap-y-12 min-[700px]:grid-cols-2 min-[1180px]:grid-cols-4">
      {steps.map((step, index) => (
        <Reveal as="li" key={step.num} delay={index * 110} className="group/reveal relative pt-6 pr-[clamp(1rem,2.5vw,2.5rem)]">
          <span className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
          <span
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink transition-transform delay-(--reveal) duration-[1400ms] ease-out group-data-shown/reveal:scale-x-100"
            aria-hidden="true"
          />
          <span className="absolute -top-[5px] left-0 h-[11px] w-px bg-ink" aria-hidden="true" />
          <span
            className="absolute -top-[3.5px] left-0 size-2 -translate-x-1/2 scale-0 rounded-full bg-falu transition-transform delay-(--reveal) duration-500 ease-out group-data-shown/reveal:scale-100"
            aria-hidden="true"
          />
          <div className="type-label mb-10 flex items-baseline justify-between gap-4">
            <span className="text-falu tabular-nums">Step {Number(step.num)}</span>
            {step.duration ? <span className="text-muted">{step.duration}</span> : null}
          </div>
          <h3 className="type-h3 mb-3">{step.title}</h3>
          <p className="type-read max-w-[34ch] text-muted">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
