import { Button, Container, Drawing } from "@kiah/ui";

export default function NotFound() {
  return (
    <section className="pt-[calc(var(--header)+clamp(2.5rem,7vw,6rem))] pb-[clamp(4rem,8vw,7rem)]">
      <Container className="grid gap-x-6 gap-y-14 min-[960px]:grid-cols-12 min-[960px]:items-end">
        <div className="min-[960px]:col-span-6">
          <p className="type-label text-muted">Error 404</p>
          <h1 className="type-h1 mt-6 max-w-[11ch]">This room isn’t on the plan.</h1>
          <p className="type-lead mt-8 max-w-[30ch] text-ink/72">The page has moved, or it was never drawn. The rest of the house is still here.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Go to the homepage
            </Button>
            <Button href="/portfolio" variant="ghost" size="lg">
              See the work
            </Button>
          </div>
        </div>
        <div className="min-[960px]:col-span-5 min-[960px]:col-start-8">
          <Drawing art="hallway-runner" caption="Unbuilt hallway" scale="1:100" width="1 200" height="3 400" linesOnly frameClassName="aspect-[4/5]" />
        </div>
      </Container>
    </section>
  );
}
