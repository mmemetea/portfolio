// Run once to migrate the hardcoded projects array into Keystatic content files:
//   npx tsx scripts/migrate-projects.ts
//
// IMPORTANT: run this BEFORE removing the `projects` array from lib/projects.ts.
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "../lib/projects";

function q(s: string | undefined | null): string {
  const v = (s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
  return `"${v}"`;
}

function emit(p: (typeof projects)[number]): string {
  const L: string[] = [];
  L.push(`title: ${q(p.title)}`);
  L.push(`subtitle: ${q(p.subtitle)}`);
  L.push(`description: ${q(p.description)}`);
  L.push(`fullDescription: ${q(p.fullDescription)}`);
  L.push(p.tags && p.tags.length ? "tags:" : "tags: []");
  for (const t of p.tags ?? []) L.push(`  - ${q(t)}`);
  L.push(p.proofLinks && p.proofLinks.length ? "proofLinks:" : "proofLinks: []");
  for (const l of p.proofLinks ?? []) {
    L.push(`  - label: ${q(l.label)}`);
    L.push(`    url: ${q(l.url)}`);
  }
  L.push(p.images && p.images.length ? "images:" : "images: []");
  for (const im of p.images ?? []) {
    L.push(`  - src: ${q(im.src)}`);
    L.push(`    alt: ${q(im.alt)}`);
  }
  L.push(p.videos && p.videos.length ? "videos:" : "videos: []");
  for (const v of p.videos ?? []) {
    L.push(`  - src: ${q(v.src)}`);
    if (v.poster) L.push(`    poster: ${q(v.poster)}`);
  }
  L.push(`featured: ${p.featured ? "true" : "false"}`);
  L.push(`order: ${p.order}`);
  return L.join("\n") + "\n";
}

async function main() {
  const dir = join(process.cwd(), "content", "projects");
  await mkdir(dir, { recursive: true });
  for (const p of projects) {
    const file = join(dir, `${p.slug}.yaml`);
    await writeFile(file, emit(p), "utf8");
    console.log("wrote", file);
  }
  console.log(`Done: ${projects.length} files in content/projects/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
