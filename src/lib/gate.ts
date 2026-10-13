/* Build gate beyond schema validation: every published note's referenced
   images must exist under public/, and every [[wikilink]] must resolve to
   a note slug. Fails the build (dev server and export alike) with the
   offending note named. */
import type { AstroIntegration } from "astro";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function walk(dir: string): { slug: string; file: string; body: string; data: Record<string, unknown>; draft: boolean }[] {
  const notes: { slug: string; file: string; body: string; data: Record<string, unknown>; draft: boolean }[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) notes.push(...walk(abs));
    else if (entry.name.endsWith(".md")) {
      const parsed = matter(readFileSync(abs, "utf8"));
      notes.push({
        slug: entry.name.replace(/\.md$/, ""),
        file: abs,
        body: parsed.content,
        data: parsed.data as Record<string, unknown>,
        draft: parsed.data.draft === true,
      });
    }
  }
  return notes;
}

export function contentGate(): AstroIntegration {
  return {
    name: "portfolio-content-gate",
    hooks: {
      "astro:config:done": ({ config }) => {
        const root = config.root.pathname ?? config.root;
        const contentDir = path.join(root, "content");
        if (!existsSync(contentDir)) return;
        const notes = walk(contentDir);
        const slugs = new Set(notes.map((n) => n.slug));
        const errors: string[] = [];
        for (const note of notes) {
          if (note.draft) continue;
          for (const { src } of (note.data.images as { src?: string }[] | undefined) ?? []) {
            if (!src || !src.startsWith("/")) {
              errors.push(`${note.slug}.md — image src must be a public/ path starting with "/": "${src}"`);
            } else if (!existsSync(path.join(root, "public", src))) {
              errors.push(`${note.slug}.md — image not found under public/: "${src}"`);
            }
          }
          for (const match of note.body.matchAll(/\[\[([^\]|#]+)/g)) {
            if (!slugs.has(match[1].trim())) {
              errors.push(`${note.slug}.md — wikilink [[${match[1].trim()}]] does not resolve to a note`);
            }
          }
        }
        if (errors.length) {
          throw new Error(`content gate failed:\n  ${errors.join("\n  ")}`);
        }
        console.info(`[content-gate] ${notes.length} notes checked, ${notes.filter((n) => n.draft).length} drafts excluded`);
      },
    },
  };
}
