import manifest from './media-manifest.json';

/** Intrinsic dimensions for a public/ media path, for width/height attributes (CLS). */
export function mediaSize(src: string): { width: number; height: number } | undefined {
  const hit = (manifest as Record<string, { w: number; h: number }>)[src];
  return hit ? { width: hit.w, height: hit.h } : undefined;
}
