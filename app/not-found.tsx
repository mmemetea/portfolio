import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container>
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
          404 · no receipt
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          This page isn&apos;t in the record.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-secondary">
          The link points at something that never shipped — or shipped and
          was replaced by the system that runs it instead. Every page that
          does exist is one click away.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background shadow-sm transition-all hover:bg-accent/90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the work
        </Link>
      </Container>
    </section>
  );
}
