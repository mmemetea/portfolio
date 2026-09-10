import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import CareerTimeline from "@/components/CareerTimeline";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TimelineEntry {
  year: string;
  company: string;
  role: string;
  current?: boolean;
}

interface Capability {
  num: string;
  title: string;
  body: string;
  receipt?: { label: string; url: string };
}

/* ------------------------------------------------------------------ */
/*  Local data                                                        */
/* ------------------------------------------------------------------ */

const timeline: TimelineEntry[] = [
  { year: "2021", company: "InnoTech", role: "Senior Consultant", current: true },
  { year: "2019", company: "tb.lx / Daimler", role: "Senior Product Manager" },
  { year: "2018", company: "Patient Innovation", role: "3D Printing Advisor" },
  { year: "2017", company: "NESTO (Startup)", role: "Founder & CEO" },
  { year: "2013", company: "Freelancer", role: "Technical Consultant" },
  { year: "2011", company: "SEDIMAP", role: "Head of Dev — EU Projects" },
  { year: "2004", company: "Com-UT (Startup)", role: "Co-Founder & CTO" },
  { year: "2003", company: "CME", role: "Consultant" },
  { year: "1999", company: "AltranTec", role: "Automotive Consultant" },
  { year: "1996", company: "AutoEuropa (VW)", role: "Product Engineer" },
];

const person = {
  name: "Michaël Memeteau",
  role: "Engineer. Founder. Product lead.",
  h1: "I replace the process you're still running by hand.",
  lead: "Thirty years in, the pattern still holds. A public-transport tender that cost a month of Excel became a seven-second optimization. A border eGate validated by physically walking every passage type became a synthetic dataset. A gas bottle checked by a driver's eye became a patented sensor. Someone runs the business out of a spreadsheet; I build the system that runs it instead.",
};

const capabilities: Capability[] = [
  {
    num: "001",
    title: "From ritual to optimizer",
    body: "tb.lx / Daimler. Public-transport tenders were answered with about a month of Excel per network — timetables, battery capacity, opportunity charging, all by hand. I replaced it with an OptaPlanner (Timefold) model that schedules several hundred e-buses in under seven seconds. It became a product of Daimler's public-transport division and a differentiator in every tender since.",
    receipt: {
      label: "How the team ran — Medium",
      url: "https://medium.com/tblx-insider/kanban-the-alternative-path-to-agility-55ef6c13e25c",
    },
  },
  {
    num: "002",
    title: "From test lab to dataset",
    body: "Vision-Box. Border-control eGates were validated against ICAO norms by physically simulating every passage type — babies carried, U-turns, doors jumped — for each product variant. During the middleware refactoring I replaced the passage-fraud state machine with a neural network and built a synthetic training framework from side-camera silhouettes, so thousands of scenarios became generated data instead of hardware time. Vision-Box was later acquired by Amadeus for €320M. That is the company's outcome; my work was the middleware and the fraud-detection model inside it.",
    receipt: {
      label: "Amadeus acquisition — public record",
      url: "https://amadeus.com/en/newsroom/press-releases/vision-box-biometrics-acquisition-complete",
    },
  },
  {
    num: "003",
    title: "From paper to platform",
    body: "Com-UT, co-founded 2004. Fleet management ran on phone calls and paper logs. We built the SaaS that replaced them — GPRS tracking, CANbus diagnostics, driver analytics, predictive maintenance on a MongoDB pipeline — scaled it to 28 people and €3M ARR, and sold it to a French industrial group.",
  },
  {
    num: "004",
    title: "From eyeball to sensor",
    body: "NESTO, founded 2017. Bottled-gas logistics ran on drivers eyeballing racks. I built the whole stack: an NB-IoT scale for weight and temperature, a vibro-acoustic rack sensor for removal and replenishment (patent filed), Prophet demand forecasting, route optimization. Twenty prototypes in the field. Hackaday wrote up the polyurethane-printed enclosure.",
    receipt: {
      label: "Hackaday article",
      url: "https://hackaday.com/2017/09/03/polyurethane-meet-3d-printing/",
    },
  },
  {
    num: "005",
    title: "From question to framework",
    body: "European Commission, freelance. The Commission needed to know whether tobacco could be tracked and traced across member states. I did the technical research — serialization and authentication architectures, cross-border coordination — behind the published feasibility study that became the reference for national implementations.",
    receipt: {
      label: "The EU study, published",
      url: "https://health.ec.europa.eu/system/files/2016-11/2015_tpd_tracking_tracing_frep_en_0.pdf",
    },
  },
  {
    num: "006",
    title: "From close to autopilot — in progress",
    body: "InnoTech / VW Financial Services, current. Accounting and treasury still close through manual Power Query rituals. I'm replacing them with PowerBI pipelines and AI agents. No receipt yet — the receipt will be the close time when it's done, here on this page.",
  },
];

const notClaimed = [
  "The €320M is Vision-Box's outcome, not mine — see 002.",
  "NESTO proved the technology, filed its patent, and stopped there; it never became a scaled company.",
  "OWLO was a finalist on two stages, never a shipped product.",
  "IKEA's PLM mapping and Fujitsu's COBOL modernization are consulting work I led, under NDA, with references rather than URLs.",
  "The maker builds — printers, keyboards, prosthetics — are where the hardware instincts come from, not credentials.",
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
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
            <div className="mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent/40" />

            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Portfolio
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {person.h1}
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground/80 sm:text-2xl">
              {person.name} — {person.role}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/60">
              {person.lead}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View the work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#receipts"
                className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-accent/40 hover:text-accent"
              >
                The receipts
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The pain ─────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              The expensive part is never the code.
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/60">
              It&rsquo;s the process that grew around it. The tender spreadsheet only
              one person can operate. The test plan that needs a physical
              passage for every product variant. The monthly close held
              together by copy-paste. Nobody quotes for it, everybody rebuilds
              it. That&rsquo;s the work I take — and the work below is what it
              became.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Receipts principle ───────────────────────────────────── */}
      <section id="receipts" className="border-t border-foreground/10 bg-foreground/[0.02] py-16">
        <Container>
          <p className="max-w-3xl text-2xl font-semibold leading-9 tracking-tight text-foreground">
            Every claim on this site links to something you can check.
          </p>
          <p className="mt-4 max-w-2xl text-foreground/60">
            A Hackaday article. A published EU study. An acquisition in the
            public record. Where there is no receipt, the claim says so. Where
            the work is in progress, it says that too.
          </p>
        </Container>
      </section>

      {/* ── The pattern, six times over ──────────────────────────── */}
      <section className="border-t border-foreground/10 py-20">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            The pattern, six times over.
          </h2>

          <div className="mt-12 space-y-14">
            {capabilities.map((cap) => (
              <article key={cap.num} className="grid gap-4 sm:grid-cols-[5rem_1fr]">
                <p className="font-mono text-sm font-semibold tracking-widest text-accent">
                  {cap.num}
                </p>
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-3 leading-7 text-foreground/70">{cap.body}</p>
                  {cap.receipt && (
                    <a
                      href={cap.receipt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      Receipt: {cap.receipt.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What I don't claim ───────────────────────────────────── */}
      <section className="border-t border-foreground/10 bg-foreground/[0.02] py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              What I don&rsquo;t claim.
            </h2>
            <ul className="mt-6 space-y-3">
              {notClaimed.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 leading-7 text-foreground/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-foreground/60">
              A portfolio that only rounds up is a brochure; this one aims to
              be a record.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The years ────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-20">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                The years, for the record.
              </h2>
              <p className="mt-2 max-w-2xl text-foreground/60">
                30 years across automotive, IoT, SaaS, AI, and consulting —
                each role a chapter of the same pattern.
              </p>
            </div>
            <Link
              href="/experience"
              className="hidden items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80 sm:inline-flex"
            >
              Full Timeline
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <CareerTimeline entries={timeline} />

          <Link
            href="/experience"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80 sm:hidden"
          >
            Full Timeline
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* ── This portfolio is the work, too ──────────────────────── */}
      <section className="border-t border-foreground/10 py-16">
        <Container>
          <p className="text-foreground/60">
            This portfolio is the work, too. Next.js 16, App Router, no CMS
            dependency — content lives in the repo, versioned with the code,
            and every proof link resolves.{" "}
            <a
              href="https://github.com/mmemetea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent/80"
            >
              GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
