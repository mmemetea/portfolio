import { Calendar, Briefcase } from "lucide-react";
import Container from "@/components/Container";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Experience {
  _id: string;
  role?: string;
  company?: string;
  client?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
  highlights?: string[];
  techStack?: string[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatDate(date: string | null | undefined): string {
  if (!date) return "Present";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function formatDateRange(
  start: string | undefined,
  end: string | null | undefined,
): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/* ------------------------------------------------------------------ */
/*  Local data (CV content, newest first)                            */
/* ------------------------------------------------------------------ */

const experiences: Experience[] = [
  {
    _id: "exp-1",
    role: "Senior Consultant",
    company: "InnoTech",
    startDate: "2021-07-01",
    endDate: null,
    description:
      "Providing strategic consulting across multiple industries — retail, healthcare, aviation security, and digital identity — bridging business requirements with technical delivery.",
    highlights: [
      "IKEA Industry — led digital transformation initiatives across European factories",
      "Fujitsu Retail — architected omnichannel retail solutions for major European retailers",
      "Luz Saúde — designed patient management and telemedicine platforms",
      "Vision-Box — contributed to airport biometric identity solutions (post-acquisition by Amadeus)",
    ],
    techStack: [
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "AWS",
      "Azure",
      "Agile",
    ],
  },
  {
    _id: "exp-2",
    role: "Senior Product Manager",
    company: "tb.lx",
    client: "Daimler / EvoBus",
    startDate: "2019-02-01",
    endDate: "2021-05-31",
    description:
      "Led the product vision and delivery of a real-time digital transport planning platform that fundamentally changed how Daimler's public transport division operates.",
    highlights: [
      "Reduced transport planning cycles from 30 days to under 1 minute",
      "Managed cross-functional teams across Germany and Portugal",
      "Delivered end-to-end product lifecycle from discovery to production",
    ],
    techStack: ["Product Management", "Agile", "React", "Node.js", "PostgreSQL"],
  },
  {
    _id: "exp-3",
    role: "Founder & CEO",
    company: "NESTO.IO",
    startDate: "2017-01-01",
    endDate: "2019-02-28",
    description:
      "Founded and ran a startup focused on connected-home technology, building IoT platforms and smart device integrations for the European market.",
    highlights: [
      "Built and launched an MVP from concept to market in under 6 months",
      "Established partnerships with hardware manufacturers across Europe",
      "Managed all aspects of the business: product, engineering, fundraising, and operations",
    ],
    techStack: [
      "IoT",
      "React Native",
      "Node.js",
      "MQTT",
      "AWS IoT",
      "Startup",
    ],
  },
  {
    _id: "exp-4",
    role: "Senior Technical Consultant",
    company: "Freelancer",
    startDate: "2013-06-01",
    endDate: "2016-12-31",
    description:
      "Delivered high-impact software projects for clients across fintech, e-commerce, and logistics sectors as an independent consultant.",
    highlights: [
      "Delivered 15+ projects across diverse industries and tech stacks",
      "Built payment processing systems handling millions of transactions",
      "Developed inventory management and logistics platforms for retail clients",
    ],
    techStack: [
      "Full-Stack",
      "PHP",
      "JavaScript",
      "MySQL",
      "REST APIs",
      "DevOps",
    ],
  },
  {
    _id: "exp-5",
    role: "Co-Founder & CTO",
    company: "ComUT",
    startDate: "2004-03-01",
    endDate: "2013-04-30",
    description:
      "Co-founded and scaled a B2B SaaS platform that digitised public procurement workflows for Portuguese municipalities. The company reached €3M ARR before being acquired by Vision-Box (later acquired by Amadeus IT Group).",
    highlights: [
      "Built the complete SaaS platform from the ground up",
      "Scaled to serve 200+ municipalities across Portugal",
      "Reached €3M ARR before acquisition by Vision-Box (Amadeus)",
      "Led a growing engineering team from 0 to 15+ developers",
    ],
    techStack: [
      "SaaS",
      "Full-Stack",
      "PHP",
      "JavaScript",
      "MySQL",
      "Linux",
      "Leadership",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section className="py-20">
      <Container>
        {/* ── Page Header ──────────────────────────────────────── */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Experience
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            My professional journey across industries — from founding a SaaS
            startup to shaping EU digital transformation policy.
          </p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <ol className="relative">
          {/* Vertical line (left on mobile, center on desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 hidden h-full w-px bg-foreground/10 md:left-1/2 md:block md:-translate-x-px"
          />
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 block h-full w-px bg-foreground/10 md:hidden"
          />

          {experiences.map((exp, index) => {
            const isRight = index % 2 === 0; // desktop: alternating sides

            return (
              <li
                key={exp._id}
                className="relative mb-12 last:mb-0 md:mb-16"
              >
                {/* ── Dot on the line ── */}
                <div
                  aria-hidden="true"
                  className={`absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-1/2`}
                />

                {/* ── Card content ── */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isRight ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm transition-all hover:border-accent/20 hover:shadow-md sm:p-8">
                    {/* Date range */}
                    <div className="mb-4 flex items-center gap-2 text-sm text-accent">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <time className="font-medium">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </time>
                    </div>

                    {/* Company */}
                    <div className="flex items-start gap-2">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-foreground/80">
                          {exp.company}
                        </p>
                        {exp.client && (
                          <p className="text-sm text-foreground/50">
                            for {exp.client}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                        {exp.description}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {exp.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm text-foreground/60"
                          >
                            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech stack pills */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
