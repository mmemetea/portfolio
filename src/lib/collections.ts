/* Typed accessors over the content collections — the single place where
   note data becomes view data. Tags are canonicalized to snake_case here;
   every page consumes these, never raw collections. */
import { getCollection, getEntry } from "astro:content";
import { snakeCaseTag } from "./tags";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  tags?: string[];
  tagsRaw?: string[];
  proofLinks?: { label: string; url?: string }[];
  images?: { src: string; alt: string }[];
  videos?: { src: string; poster?: string }[];
  featured: boolean;
  bench: boolean;
  compression?: { before: string; after: string };
  order: number;
}

export async function getAllProjects(): Promise<Project[]> {
  const entries = await getCollection("projects", ({ data }) => data.draft !== true);
  return entries
    .map((e) => ({
      slug: e.id,
      title: e.data.title,
      subtitle: e.data.subtitle,
      description: e.data.description,
      fullDescription: e.body?.trim() ? e.body : undefined,
      tags: e.data.tags?.map(snakeCaseTag),
      tagsRaw: e.data.tags,
      proofLinks: e.data.proofLinks?.map((p) => ({ label: p.label, url: p.url })),
      images: e.data.images,
      videos: e.data.videos?.map((v) => ({ src: v.src, ...(v.poster ? { poster: v.poster } : {}) })),
      featured: e.data.featured ?? false,
      bench: e.data.bench ?? false,
      compression: e.data.compression,
      order: e.data.order,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getAllProjects()).find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.featured);
}

export async function getArticles() {
  const entries = await getCollection("articles", ({ data }) => data.draft !== true);
  return entries
    .map((e) => ({
      slug: e.id,
      title: e.data.title,
      url: e.data.url,
      publication: e.data.publication,
      date: e.data.date,
      excerpt: e.data.excerpt,
      tags: e.data.tags?.map(snakeCaseTag),
      tagsRaw: e.data.tags,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getExperiences() {
  const entries = await getCollection("experience", ({ data }) => data.draft !== true);
  return entries
    .map((e) => ({
      role: e.data.role,
      company: e.data.company,
      client: e.data.client,
      location: e.data.location,
      startDate: e.data.startDate,
      endDate: e.data.endDate ?? null,
      description: e.data.description,
      highlights: e.data.highlights,
      techStack: e.data.techStack?.map(snakeCaseTag),
      order: e.data.order,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getAbout() {
  const entry = await getEntry("about", "about");
  if (!entry) throw new Error("content/about.md — required note is missing");
  return {
    name: entry.data.name,
    bio: entry.data.bio,
    location: entry.data.location,
    email: entry.data.email,
    education: entry.data.education,
    skills: entry.data.skills,
    languages: entry.data.languages,
    photoAlbums: entry.data.photoAlbums,
    otherInterests: entry.data.otherInterests,
  };
}

