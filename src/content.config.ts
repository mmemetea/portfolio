import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* js-yaml (under Astro's frontmatter parser) turns bare YYYY-MM-DD values
   into Date objects; keep them as ISO day strings for the pages. */
const isoDay = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string()
);

const proofLink = z.object({
  label: z.string(),
  url: z.string().optional(), // "" (honest no-receipt) is allowed, as before
});

/* The repo folder is a dedicated Obsidian vault ("portfolio"); notes keep
   human-friendly tag/tech names and the render layer canonicalizes them. */
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/projects" }),
  schema: z.object({
    type: z.literal("project"),
    draft: z.boolean().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    proofLinks: z.array(proofLink).optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
    videos: z.array(z.object({ src: z.string(), poster: z.string().optional() })).optional(),
    featured: z.boolean().optional(),
    bench: z.boolean().optional(),
    compression: z.object({ before: z.string(), after: z.string() }).optional(),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/articles" }),
  schema: z.object({
    type: z.literal("article"),
    draft: z.boolean().optional(),
    title: z.string(),
    url: z.string(),
    publication: z.string().optional(),
    date: isoDay,
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/experience" }),
  schema: z.object({
    type: z.literal("experience"),
    draft: z.boolean().optional(),
    role: z.string().optional(),
    company: z.string().optional(),
    client: z.string().optional(),
    location: z.string().optional(),
    startDate: isoDay.optional(),
    endDate: isoDay.nullable().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./content" }),
  schema: z.object({
    type: z.literal("about"),
    draft: z.boolean().optional(),
    name: z.string(),
    bio: z.array(z.string()),
    location: z.string(),
    email: z.string(),
    education: z.array(z.object({ period: z.string(), school: z.string(), detail: z.string().optional() })),
    skills: z.array(z.object({ category: z.string(), items: z.array(z.string()) })),
    languages: z.array(z.object({ name: z.string(), level: z.string(), note: z.string() })),
    photoAlbums: z.array(z.object({ title: z.string(), url: z.string() })),
    otherInterests: z.array(z.string()),
  }),
});

export const collections = { projects, articles, experience, about };
