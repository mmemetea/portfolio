/** Prefix root-relative URLs with the deployment basePath.
 *  next/link and next/image do this automatically; raw <a href>, <video>
 *  src/poster, and content-driven proof-link URLs do not. */
export function withBasePath(url: string): string {
  if (!url.startsWith("/")) return url;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${url}`;
}
