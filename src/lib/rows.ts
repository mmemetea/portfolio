import type { Project } from './collections';
import type { Row } from '../components/WorkIndex.astro';

export function toIndexRows(projects: Project[]): Row[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    compression: p.compression,
    bench: p.bench,
    preview: p.images?.[0]?.src,
  }));
}
