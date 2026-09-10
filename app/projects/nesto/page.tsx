import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import ImageCarousel from "@/components/ImageCarousel";
import { getProjectBySlug } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

// Bespoke case study: this static route shadows /projects/[slug] for NESTO.
// The slug is fixed by the route itself — it is never passed in params.
export async function generateMetadata(): Promise<Metadata> {
  const project = await getProjectBySlug("nesto");
  if (!project) return {};
  return {
    title: `${project.title} | Michaël Memeteau`,
    description: project.description ?? undefined,
  };
}

// Original decks and documents — served from public/projects/nesto/.
const documents = [
  { label: "Functional overview (PNG)", href: "/projects/nesto/NESTO - Functional Overview.png" },
  { label: "Pitch deck — Brinc accelerator, 2018 Q4 (PNG)", href: "/projects/nesto/NESTO Pitch Deck Brinc 2018Q4.png" },
  { label: "Business canvas — May 2016 (PDF)", href: "/projects/nesto/nesto_business_canvas_20160525.pdf" },
  { label: "NESTO Gas — full deck, July 2016 (PPTX)", href: "/projects/nesto/nesto_gas_20160709.pptx" },
  { label: "NESTO Gas — EDP (PDF)", href: "/projects/nesto/nesto_gas_edp.pdf" },
  { label: "NESTO Gas — InnoEnergy (PPTX)", href: "/projects/nesto/nesto_gas_innoenergy.pptx" },
  { label: "NESTO Gas — Oz Energia (PPTX)", href: "/projects/nesto/nesto_gas_oz_energia.pptx" },
  { label: "NESTO Gas — PV3 (PPTX)", href: "/projects/nesto/nesto_gas_pv3.pptx" },
  { label: "NESTO Gas — Web Summit (PPSX)", href: "/projects/nesto/nesto_gas_websummit.ppsx" },
];

export default async function NestoPage() {
  const project = await getProjectBySlug("nesto");

  if (!project) notFound();

  const description = project.fullDescription ?? project.description ?? "";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-foreground/50">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground/70">{project.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-2 text-lg text-accent">{project.subtitle}</p>
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Carousel */}
            <ImageCarousel images={project.images ?? []} />

            {/* Full description */}
            {description && (
              <div className="prose prose-neutral max-w-none dark:prose-invert">
                {description.split("\n\n").map((paragraph, i) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                    return (
                      <h3 key={i} className="mt-6 text-lg font-semibold text-foreground">
                        {trimmed.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith("- ")) {
                    const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} className="ml-4 list-disc space-y-1 text-foreground/70">
                        {items.map((item, j) => (
                          <li key={j} className="text-sm leading-relaxed">
                            {formatRichText(item.replace(/^-\s/, ""))}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={i} className="text-sm leading-relaxed text-foreground/70">
                      {formatRichText(trimmed)}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Paper trail — the original decks */}
            <div className="rounded-xl border border-foreground/10 p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                The paper trail
              </h2>
              <ul className="space-y-2">
                {documents.map((doc) => (
                  <li key={doc.href}>
                    <a
                      href={withBasePath(doc.href)}
                      className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
                    >
                      <Download className="h-4 w-4 shrink-0 text-accent/60" />
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Proof Links */}
            {project.proofLinks && project.proofLinks.length > 0 && (
              <div className="rounded-xl border border-foreground/10 p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                  Proof of Work
                </h2>
                <div className="space-y-3">
                  {project.proofLinks.map((link, i) =>
                    link.url ? (
                      <a
                        key={`${link.label}-${i}`}
                        href={withBasePath(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-foreground/10 p-3 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0 text-accent/60" />
                        {link.label}
                      </a>
                    ) : (
                      <p
                        key={`${link.label}-${i}`}
                        className="flex items-center gap-2 rounded-lg border border-foreground/10 p-3 text-sm font-medium text-foreground/60"
                      >
                        {link.label}
                      </p>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Quick info */}
            <div className="rounded-xl border border-foreground/10 p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                Details
              </h2>
              <dl className="space-y-3 text-sm">
                {project.tags && (
                  <div>
                    <dt className="text-foreground/50">Technologies</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-foreground/5 px-2 py-0.5 text-xs text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-foreground/50">Images</dt>
                  <dd className="mt-1 text-foreground/70">
                    {(project.images ?? []).length} file
                    {(project.images ?? []).length !== 1 ? "s" : ""}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-foreground/10 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Projects
          </Link>
        </div>
      </Container>
    </section>
  );
}

function formatRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
