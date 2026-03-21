import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/Container";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProofLink {
  label: string;
  url: string;
}

interface Project {
  _id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  proofLinks?: ProofLink[];
}

/* ------------------------------------------------------------------ */
/*  Local data                                                        */
/* ------------------------------------------------------------------ */

const person = {
  name: "Michaël Memeteau",
  tagline: "Lateral Thinker. Product & Innovative Executive.",
  bio: "Seasoned professional bridging software engineering and business strategy. From founding a SaaS startup acquired by Amadeus to shaping EU digital transformation policies, I turn complex challenges into elegant solutions.",
};

const projects: Project[] = [
  {
    _id: "proj-1",
    title: "ComUT SaaS Platform",
    subtitle: "B2B SaaS for local government procurement",
    description:
      "Built a complete SaaS platform that digitised public procurement workflows for Portuguese municipalities. Reached €3M ARR before acquisition by Amadeus IT Group via Vision-Box in 2023.",
    tags: ["SaaS", "Government", "Procurement", "Full-Stack"],
    proofLinks: [{ label: "Amadeus Acquisition", url: "#" }],
  },
  {
    _id: "proj-2",
    title: "EU Track & Trace Study",
    subtitle: "European Commission digital transformation research",
    description:
      "Led the technical research for the European Commission's study on cross-border digital track & trace systems, shaping EU policy on supply-chain digitisation.",
    tags: ["EU Policy", "Research", "Supply Chain", "Digital Identity"],
    proofLinks: [{ label: "Commission Report", url: "#" }],
  },
  {
    _id: "proj-3",
    title: "tb.lx e-Bus Planner",
    subtitle: "Digital transformation of public transport planning",
    description:
      "Reduced transport planning cycles from 30 days to under 1 minute by building a real-time digital planner for Daimler's public transport division (EvoBus).",
    tags: ["Product", "Transport", "Daimler", "Real-Time"],
    proofLinks: [{ label: "Case Study", url: "#" }],
  },
];

const stats = [
  { value: "€3M", label: "ARR before acquisition", detail: "ComUT" },
  { value: "€320M", label: "Amadeus acquisition", detail: "Vision-Box" },
  { value: "< 1 min", label: "from 30 days", detail: "tb.lx e-Bus Planner" },
  { value: "EU", label: "Commission study", detail: "Track & Trace" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        {/* Decorative accent gradient line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -bottom-48 h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-3xl"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            {/* Accent decorative line */}
            <div className="mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent/40" />

            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Portfolio
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {person.name}
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground/80 sm:text-2xl">
              {person.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/60">
              {person.bio}
            </p>

            <div className="mt-10">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured Projects Section ───────────────────────────── */}
      <section className="border-t border-foreground/10 bg-foreground/[0.02] py-20 transition-colors dark:bg-foreground/[0.02]">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured Work
            </h2>
            <p className="mt-2 text-foreground/60">
              Selected projects that showcase impact across industries.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const subtitle =
                project.subtitle ?? project.description?.split("\n")[0] ?? "";
              const firstProof = project.proofLinks?.[0];

              return (
                <article
                  key={project._id}
                  className="group flex flex-col rounded-xl border border-foreground/10 bg-background p-6 transition-all hover:border-accent/30 hover:shadow-md"
                >
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {subtitle && (
                    <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
                      {subtitle}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/50 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {firstProof && (
                    <a
                      href={firstProof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      {firstProof.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Quick Stats Section ─────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Impact at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground/80">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-foreground/40">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
