import type { Metadata } from "next";
import Image from "next/image";
import {
  Printer,
  Camera,
  ExternalLink,
  MapPin,
  Globe,
  GraduationCap,
  Code,
  Cpu,
} from "lucide-react";
import Container from "@/components/Container";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Person {
  name: string;
  bio: string;
  location: string;
  email: string;
}

// ---------------------------------------------------------------------------
// Hardcoded fallback data
// ---------------------------------------------------------------------------

const person: Person = {
  name: "Michaël Memeteau",
  bio: [
    "Mechanical engineer by training — Arts et Métiers, ENSAM Bordeaux, non-conventional manufacturing. Founder twice: a fleet-management SaaS grown to 28 people and sold, and an IoT platform for bottled-gas logistics that filed a patent and earned four competition wins in 2017 (Productized Lisbon, CleanTech Iberia, ENGIE Singapore, ALTICE Portugal). Product and engineering lead at tb.lx/Daimler and Vision-Box; technical consultant to the European Commission; now automating finance at VW Financial Services.",
    "Based in Lisbon. Fluent in French, Portuguese and English; Spanish good, German basic. Off the clock: a federated orienteer, a CMAS three-star diver, a cook, and a home workshop whose 3D printers — one self-built Voron among them — also printed prosthetic hands for the e-NABLE community.",
  ].join("\n\n"),
  location: "Lisbon, Portugal",
  email: "mmemetea@gmail.com",
};

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "What I build with, now",
    items: [
      "TypeScript",
      "Python",
      ".NET",
      "OptaPlanner / Timefold",
      "Kafka",
      "Spark",
      "Azure",
      "AWS",
      "PowerBI",
      "LLMs & agents",
      "Graph databases",
    ],
  },
  {
    category: "Where the instincts come from",
    items: [
      "CAD/CAM (CATIA, Onshape)",
      "Firmware & PCBs",
      "BPMN",
      "FMEA",
      "TRIZ",
      "Kaizen",
      "3D printing",
    ],
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

export default function AboutPage() {
  const bioParagraphs = person.bio.split("\n\n");

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
              The person behind the pattern.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/60">
              Background, skills, and what I do outside work
            </p>
          </div>

          {/* ---- Bio Section ---- */}
          <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Avatar placeholder */}
            <Image
              src="/profile.png"
              alt="Michaël Memeteau"
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-40 sm:w-40"
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {person.name}
              </h2>

              {bioParagraphs.map((p, i) => (
                <p key={i} className="max-w-prose leading-7 text-foreground/70">
                  {p}
                </p>
              ))}

              <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground/60">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  {person.location}
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  <a
                    href={`mailto:${person.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {person.email}
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
                Arts et Métiers — ENSAM Bordeaux
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
            <div className="grid gap-6 lg:grid-cols-2">
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
