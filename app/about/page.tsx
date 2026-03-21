import type { Metadata } from "next";
import {
  Printer,
  Camera,
  ExternalLink,
  MapPin,
  Globe,
  GraduationCap,
  Award,
  Code,
  Cpu,
} from "lucide-react";
import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { personQuery, allAwardsQuery } from "@/lib/queries";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SanityPerson {
  name?: string;
  image?: { asset?: { url?: string }; alt?: string };
  bio?: string;
  location?: string;
  email?: string;
  socialLinks?: { platform?: string; url?: string }[];
}

interface SanityAward {
  title?: string;
  event?: string;
  date?: string;
  description?: string;
  image?: { asset?: { url?: string }; alt?: string };
}

// ---------------------------------------------------------------------------
// Hardcoded fallback data
// ---------------------------------------------------------------------------

const FALLBACK_PERSON: SanityPerson = {
  name: "Michaël Memeteau",
  bio: [
    "Seasoned professional bridging software engineering and business strategy with a unique background in mechanical engineering and decades of hands-on technology leadership.",
    "Throughout my career I have led cross-functional teams delivering innovative products\u2014from IoT hardware accelerators to enterprise-grade SaaS platforms. I thrive at the intersection of design, data, and development, always seeking elegant solutions to complex problems.",
    "Based in Lisbon, I am passionate about continuous learning, open-source contribution, and mentoring the next generation of engineers.",
  ].join("\n\n"),
  location: "Lisbon, Portugal",
  email: "mmemetea@gmail.com",
};

const FALLBACK_AWARDS: SanityAward[] = [
  {
    title: "1st Prize",
    event: "Productized Lisbon Hardware Accelerator (KIC)",
    date: "2017",
    description:
      "Won first place at the Productized Lisbon hardware accelerator powered by KIC InnoEnergy.",
  },
  {
    title: "3rd Prize",
    event: "CleanTech Iberia, KIC InnoEnergy Barcelona",
    date: "2017",
    description:
      "Recognised among top cleantech innovators at the KIC InnoEnergy CleanTech Iberia event.",
  },
  {
    title: "Winner Game Changer",
    event: "IoT OpenInnov Challenge, ENGIE Singapore",
    date: "2017",
    description:
      "Awarded Game Changer prize at ENGIE\u2019s IoT OpenInnov Challenge in Singapore.",
  },
  {
    title: "Winner",
    event: "IoT Challenge Portugal Telecom, ALTICE Group",
    date: "2017",
    description:
      "Won the ALTICE Group IoT Challenge for an innovative connected-device solution.",
  },
  {
    title: "Finalist",
    event: "Shark Tank Portugal",
    date: "2016",
    description:
      "Reached the finals of Shark Tank Portugal, presenting to a national investor panel.",
  },
];

const SKILLS: { category: string; items: string[] }[] = [
  { category: "AI & Data", items: ["AI", "LLMs", "Knowledge Management", "Graph Databases"] },
  {
    category: "Management",
    items: ["Project Management", "Coaching", "Leadership", "Agile (Scrum & Kanban)"],
  },
  {
    category: "Development",
    items: [".NET", "C++", "REST", "gRPC", "TypeScript", "Python", "SQL"],
  },
  {
    category: "Cloud & Data",
    items: ["Kafka", "Spark", "Azure", "AWS", "MongoDB", "Redis"],
  },
  {
    category: "Design",
    items: ["Figma", "CAD/CAM (Onshape, Blender, CATIA)", "3D Printing"],
  },
  {
    category: "Process",
    items: ["BPMN", "FMEA", "SPC", "Kaizen", "JIT", "TRIZ"],
  },
  {
    category: "BI & Reporting",
    items: ["Tableau", "Power BI"],
  },
];

const LANGUAGES = [
  { name: "French", level: "C2", note: "Native" },
  { name: "Portuguese", level: "C2", note: "Fluent" },
  { name: "English", level: "C2", note: "Fluent" },
  { name: "Spanish", level: "B2", note: "Good" },
  { name: "German", level: "B1", note: "Basic" },
] as const;

const PHOTO_ALBUMS = [
  { title: "Chocofi Magnets", url: "https://photos.app.goo.gl/YX7X6g8VPrJWCty49" },
  { title: "Monte Alentejano", url: "https://photos.app.goo.gl/jpqSaAzejQKF4SGW7" },
  { title: "Voron Raven Build", url: "https://photos.app.goo.gl/k8mPXLV2UzcqT4YZA" },
  { title: "3D Printing Talk & Beer", url: "https://photos.app.goo.gl/Z78pAj1VhgqtC5BJ7" },
  { title: "IWI MIT Boston", url: "https://goo.gl/photos/KxRZXKHgKDmkWsbH9" },
  { title: "Onshape CAD Work", url: "https://photos.app.goo.gl/YSUVgZ6EFpthx3Hp6" },
] as const;

const OTHER_INTERESTS = [
  "Mountain Biking",
  "Orienteering (Federated Athlete)",
  "Scuba Diving (CMAS \u2b50\u2b50\u2b50)",
  "Cooking",
] as const;

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getPerson(): Promise<SanityPerson> {
  try {
    const person = await client.fetch<SanityPerson>(personQuery);
    if (person?.name) return person;
  } catch {
    // Sanity unavailable — use fallback
  }
  return FALLBACK_PERSON;
}

async function getAwards(): Promise<SanityAward[]> {
  try {
    const awards = await client.fetch<SanityAward[]>(allAwardsQuery);
    if (awards?.length) return awards;
  } catch {
    // Sanity unavailable — use fallback
  }
  return FALLBACK_AWARDS;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "About | Michaël Memeteau",
  description:
    "Background, skills, and what I do outside work — Michaël Memeteau's portfolio.",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AboutPage() {
  const [person, awards] = await Promise.all([getPerson(), getAwards()]);

  const bioParagraphs = (person.bio ?? FALLBACK_PERSON.bio ?? "").split("\n\n");

  return (
    <section className="flex flex-1 flex-col">
      <Container>
        <div className="py-16 sm:py-24">
          {/* ---- Page Header ---- */}
          <div className="mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              About
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/60">
              Background, skills, and what I do outside work
            </p>
          </div>

          {/* ---- Bio Section ---- */}
          <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Avatar placeholder */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-2xl font-bold text-foreground/60 sm:h-40 sm:w-40 sm:text-3xl">
              MM
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {person.name ?? FALLBACK_PERSON.name}
              </h2>

              {bioParagraphs.map((p, i) => (
                <p key={i} className="max-w-prose leading-7 text-foreground/70">
                  {p}
                </p>
              ))}

              <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground/60">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  {person.location ?? FALLBACK_PERSON.location}
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  <a
                    href={`mailto:${person.email ?? FALLBACK_PERSON.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {person.email ?? FALLBACK_PERSON.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ---- Education Section ---- */}
          <div className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-foreground">
              <GraduationCap className="h-5 w-5 text-accent" />
              Education
            </h2>
            <div className="rounded-xl border border-foreground/10 p-6">
              <h3 className="text-lg font-medium text-foreground">
                Arts et M\u00e9tiers ParisTech — ENSAM Bordeaux
              </h3>
              <p className="text-sm text-foreground/50">1990 &ndash; 1993</p>
              <p className="mt-2 leading-7 text-foreground/70">
                Mechanical Engineering, specialization in Production, Research
                &amp; Development for Non-Conventional Manufacturing Processes
              </p>
            </div>
          </div>

          {/* ---- Skills Section ---- */}
          <div className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-foreground">
              <Code className="h-5 w-5 text-accent" />
              Skills
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map(({ category, items }) => (
                <div
                  key={category}
                  className="rounded-xl border border-foreground/10 p-5"
                >
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-foreground/5 px-3 py-1 text-sm text-foreground/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Languages Section ---- */}
          <div className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-foreground">
              <Globe className="h-5 w-5 text-accent" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {LANGUAGES.map(({ name, level, note }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm text-foreground/70"
                >
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="text-accent">{level}</span>
                  <span className="text-foreground/40">&middot;</span>
                  <span className="text-foreground/40">{note}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ---- Awards Section ---- */}
          <div className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-foreground">
              <Award className="h-5 w-5 text-accent" />
              Awards &amp; Recognition
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-foreground/10 p-5 transition-colors hover:border-accent/30"
                >
                  <p className="text-sm font-semibold text-accent">
                    {award.title}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {award.event}
                  </p>
                  <p className="mt-1 text-xs text-foreground/40">{award.date}</p>
                  {award.description && (
                    <p className="mt-3 text-sm leading-6 text-foreground/60">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ---- Hobbies & Making Section ---- */}
          <div>
            <h2 className="mb-8 flex items-center gap-3 text-xl font-semibold text-foreground">
              <Cpu className="h-5 w-5 text-accent" />
              Hobbies &amp; Making
            </h2>

            {/* 3D Printing & Making */}
            <div className="mb-12">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
                <Printer className="h-5 w-5 text-accent" />
                3D Printing &amp; Making
              </h3>
              <div className="overflow-hidden rounded-xl">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLxgWx23tRb-OUprTZU4c9d2UtylOSdO7p"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full aspect-video rounded-xl"
                />
              </div>
              <a
                href="https://www.youtube.com/playlist?list=PLxgWx23tRb-OUprTZU4c9d2UtylOSdO7p"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                View full playlist on YouTube
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Photo Albums */}
            <div className="mb-12">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
                <Camera className="h-5 w-5 text-accent" />
                Photo Albums
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PHOTO_ALBUMS.map((album) => (
                  <a
                    key={album.title}
                    href={album.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-foreground/10 p-4 transition-colors hover:border-accent/30 hover:bg-foreground/[0.02]"
                  >
                    <Camera className="h-5 w-5 shrink-0 text-foreground/30 transition-colors group-hover:text-accent" />
                    <span className="flex-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      {album.title}
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-foreground/20 transition-colors group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>

            {/* Other Interests */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-foreground">
                Other Interests
              </h3>
              <ul className="flex flex-col gap-2 text-foreground/70">
                {OTHER_INTERESTS.map((interest) => (
                  <li key={interest} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
