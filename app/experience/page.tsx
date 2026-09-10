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
  location?: string;
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
    role: "Senior Consultant & Project Lead",
    company: "InnoTech",
    location: "Portugal",
    startDate: "2021-07-01",
    endDate: null,
    description:
      "Providing strategic consulting across multiple industries — retail, healthcare, aviation security, and automotive — bridging business requirements with technical delivery.",
    highlights: [
      "VW Financial Services — leading simplification, automation & optimization of accounting & treasury operations using PowerBI, Power Query and AI Agents",
      "IKEA Industry — led process mapping for Engineering, Compliance & Quality to facilitate PLM migration to PTC Windchill",
      "Fujitsu Retail — reverse engineering of the COBOL code base for POS solutions used by Jerónimo Martins and Staples",
      "Luz Saúde — study for automated mortality score calculation (APACHE II, SAPS II) in ICUs using FHIR/HL7 standards",
      "Vision-Box — product team lead for refactoring biometric eGates in .NET Core; built synthetic training framework using camera silhouettes to replace physical fraud simulation (ICAO norms); upon completion, Vision-Box was sold to Amadeus for €320M",
    ],
    techStack: [
      ".NET Core",
      "C++",
      "COBOL",
      "gRPC",
      "PowerBI",
      "HL7",
      "Agile",
      "Copilot",
      "OpenCode",
      "AI & LLMs",
    ],
  },
  {
    _id: "exp-2",
    role: "Senior Product Manager",
    company: "DAIMLER TRUCK tb.lx",
    location: "Lisbon / Worldwide",
    startDate: "2019-02-01",
    endDate: "2021-05-31",
    description:
      "Bootstrapped the Digital Service Hub serving Daimler Trucks worldwide, leading a team of 30+ developers. Built an automated charging schedule optimizer for eBus tenders that reduced planning from 1 month to under 7 seconds.",
    highlights: [
      "Automated eBus charging schedule optimization using OptaPlanner (Timefold) — several hundred buses optimized in under 7 seconds instead of 1 month",
      "Implemented digital business models for telematics data across North America, Europe, and Japan",
      "Established foundations of e-Services (Charge Management, Battery Health & e-Range prediction) for heavy-duty electric vehicles",
      "Open-source solution enabling the team to adapt to new features (new battery types, hydrogen, hybrid vehicles)",
    ],
    techStack: ["Product Management", "Agile", "OptaPlanner", "Java", "React", "Node.js"],
  },
  {
    _id: "exp-2b",
    role: "3D Printing Advisor",
    company: "Patient Innovation",
    location: "Lisbon, Portugal",
    startDate: "2018-11-01",
    endDate: "2019-02-28",
    description:
      "Advised on open-source, inexpensive 3D-printed hand prosthetics for children, contributing design and fabrication expertise to the e-NABLE community.",
    highlights: [
      "Designed and fabricated low-cost 3D-printed prosthetic hand prototypes",
      "Collaborated with the Patient Innovation platform for pediatric applications",
      "Contributed to open-source prosthetic design improvements",
    ],
    techStack: ["3D Printing", "CAD", "Open Source", "e-NABLE"],
  },
  {
    _id: "exp-3",
    role: "Founder & CEO",
    company: "NESTO.IO",
    location: "Lisbon, Portugal",
    startDate: "2017-01-01",
    endDate: "2019-02-28",
    description:
      "Founded an IoT startup to digitalize the bottled gas market. Built a cloud platform with two hardware products — an NB-IoT connected scale and a vibro-acoustic rack sensor — using Prophet ML for demand forecasting and route optimization.",
    highlights: [
      "Built 20 field prototypes deployed with a bottled gas distributor, filed 1 patent",
      "Connected scale sends weight & temperature data; vibro-acoustic rack detects bottle removal/replenishment via resonating frequencies",
      "Used Prophet ML algorithm for demand forecasting and clean data input for route optimization",
      "Originally SIGFOX-based, migrated to NB-IoT; won multiple innovation awards (ENGIE Singapore, ALTICE, KIC InnoEnergy)",
    ],
    techStack: [
      "IoT",
      "SIGFOX",
      "NB-IoT",
      "ML",
      "Prophet",
      "AWS IoT",
      "Startup",
    ],
  },
  {
    _id: "exp-4",
    role: "Technical Consultant",
    company: "Freelancer",
    location: "Lisbon, Portugal",
    startDate: "2013-06-01",
    endDate: "2016-12-31",
    description:
      "Market study, impact assessment & business intelligence related to Track & Trace, Serialization, M2M & IoT. International projects linked to excisable goods & healthcare in the FMCG space.",
    highlights: [
      "Core Team Member of the European Commission study on Tracking and Tracing of Tobacco Products (EAHC/2013/Health/11)",
      "Delivered 15+ projects across diverse industries and tech stacks",
      "Built payment processing systems and logistics platforms for retail clients",
    ],
    techStack: [
      "M2M",
      "IoT",
      "PHP",
      "JavaScript",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    _id: "exp-5",
    role: "Head of Development for European Projects",
    company: "SEDIMAP",
    location: "Montauban, France",
    startDate: "2011-06-01",
    endDate: "2013-04-30",
    description:
      "Coordinated cross-border development teams building geographic information and land management platforms for European projects.",
    highlights: [
      "Led 3 remote teams across Lisbon, Madrid, and Montauban",
      "Managed platform internationalization (i18n) across multiple EU languages",
      "Integrated analytics pipelines and graph databases for spatial data",
      "Drove agile adoption across distributed teams",
    ],
    techStack: ["PHP", "PostgreSQL", "Graph DB", "Agile", "GIS"],
  },
  {
    _id: "exp-6",
    role: "Co-Founder & CTO",
    company: "ComUT, Lda.",
    location: "Setúbal, Portugal",
    startDate: "2004-03-01",
    endDate: "2013-04-30",
    description:
      "Co-founded the first Portuguese company to offer GPRS-based fleet management SaaS with CANbus integration. Scaled to 28 employees and €3M annual turnover before successful acquisition by a French group.",
    highlights: [
      "Scaled to 28 employees and €3M ARR before acquisition by a French group",
      "Clients included LIDL, Auchan, and Portuguese Civil Protection",
      "Pioneered the 1st commercial implementation of MongoDB in Portugal",
      "99.95% availability in the last 5 years of operation",
    ],
    techStack: [
      "SaaS",
      "GPRS",
      "CANbus",
      "MongoDB",
      "Full-Stack",
      "Linux",
    ],
  },
  {
    _id: "exp-6b",
    role: "Consultant Freelancer",
    company: "CME",
    location: "France",
    startDate: "2003-01-01",
    endDate: "2004-03-01",
    description:
      "Fleet management consulting for a utility company, optimizing operations for a fleet of approximately 600 vehicles using SAP R/3 and TCO analysis.",
    highlights: [
      "Managed fleet operations and maintenance for ~600 utility vehicles",
      "Implemented SAP R/3 for fleet cost tracking and TCO analysis",
      "Delivered cost reduction recommendations based on data-driven insights",
    ],
    techStack: ["SAP R/3", "Fleet Management", "TCO Analysis"],
  },
  {
    _id: "exp-7",
    role: "Automotive Consultant",
    company: "AltranTec",
    client: "Faurecia / Sommer-Allibert",
    location: "Palmela, Portugal",
    startDate: "1999-08-01",
    endDate: "2003-01-31",
    description:
      "Developed and implemented a custom non-quality costs control system using Access for external suppliers using ERP data (AS400). Automated KPIs calculation and improved traceability of defective batches.",
    highlights: [
      "Developed custom non-quality costs control system for automotive suppliers",
      "Automated KPIs calculation (Cycle Time, OEE, Rework & Scrap %, PPM)",
      "Improved traceability of defective batches and reduced feedback time to suppliers",
      "Monthly reporting for suppliers against ISO 9001 standards",
    ],
    techStack: ["VBA", "Access", "AS400", "Excel", "ISO 9001"],
  },
  {
    _id: "exp-8",
    role: "Product Engineer",
    company: "AutoEuropa (VW Group)",
    location: "Palmela, Portugal",
    startDate: "1996-04-01",
    endDate: "1999-08-31",
    description:
      "Managed a team of 18 engineers focusing on Cockpit, Trim, HVAC, and Interiors for VW Sharan, Ford Galaxy, and Seat Alhambra (650 vehicles/day).",
    highlights: [
      "Managed a team of 18 engineers for multi-brand vehicle production (650 vehicles/day)",
      "Led multi-disciplinary problem-solving between Manufacturing, Quality, and Engineering departments",
      "Created and modified parts using CATIA and ICEM Surf CAD systems",
      "Focused on three strategic axes: Quality, Cost Reduction, and Facelift projects",
    ],
    techStack: ["CATIA", "ICEM Surf", "CAD/CAM", "Automotive"],
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
                className={`relative mb-12 last:mb-0 ${
                  index === 0
                    ? "md:mb-0"
                    : isRight
                      ? "md:-mt-24 md:mb-0"
                      : "md:-mt-24 md:mb-0"
                }`}
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
                        {exp.location && (
                          <p className="text-sm text-foreground/40">
                            {exp.location}
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
