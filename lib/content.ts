import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";
import type { Project } from "./projects";

const reader = createReader(process.cwd(), keystaticConfig);

type ProjectEntry = NonNullable<
  Awaited<ReturnType<typeof reader.collections.projects.read>>
>;

function toProject(slug: string, e: ProjectEntry): Project {
  return {
    slug,
    _id: `ks-${slug}`,
    title: e.title,
    subtitle: e.subtitle ?? undefined,
    description: e.description ?? undefined,
    fullDescription: e.fullDescription ?? undefined,
    tags: e.tags ? [...e.tags] : undefined,
    proofLinks: (e.proofLinks ?? []).map((p) => ({ label: p.label, url: p.url })),
    images: (e.images ?? []).map((im) => ({ src: im.src, alt: im.alt })),
    videos: (e.videos ?? []).map((v) => ({
      src: v.src,
      ...(v.poster ? { poster: v.poster } : {}),
    })),
    featured: e.featured ?? false,
    bench: e.bench ?? false,
    order: e.order ?? 0,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const all = await reader.collections.projects.all();
  return all
    .map((item) => toProject(item.slug, item.entry))
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const entry = await reader.collections.projects.read(slug);
  if (!entry) return undefined;
  return toProject(slug, entry);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}
