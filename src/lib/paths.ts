/** Prefixes public/ asset URLs with the deploy basePath (GitHub Pages
 *  project page). Astro's BASE_URL is "/" in dev, "/portfolio/" in build. */
export function withBasePath(p: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${p}`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
