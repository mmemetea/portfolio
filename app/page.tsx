import Container from "@/components/Container";

export default function Home() {
  return (
    <section className="flex flex-1 items-center">
      <Container>
        <div className="py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Portfolio
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Michaël Memeteau
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/60">
            Seasoned professional bridging software engineering and business
            strategy. Lateral Thinker. Product &amp; Innovative Executive.
          </p>
          <p className="mt-8 text-sm text-foreground/40">
            More coming soon &mdash; stay tuned.
          </p>
        </div>
      </Container>
    </section>
  );
}
