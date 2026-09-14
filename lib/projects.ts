/* Shared project types. Content lives in content/projects/*.yaml (Keystatic)
   and is read at build time through lib/content.ts. */

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProofLink {
  label: string;
  /** Omitted when the proof is not linkable — the label then says so honestly. */
  url?: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
}

export interface Project {
  slug: string;
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  tags?: string[];
  proofLinks?: ProofLink[];
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  featured?: boolean;
  /** Maker builds — shown under "Off the clock, on the bench", not in the work grid. */
  bench?: boolean;
  order: number;
}

/** Tags render snake_case site-wide: lowercase, separators (space, hyphen,
 *  slash) become a single underscore. Tech-significant symbols stay — "C++"
 *  stays "c++", ".NET" stays ".net" — so names keep their meaning. */
export function snakeCaseTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[\s/-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
