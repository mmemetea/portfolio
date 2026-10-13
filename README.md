# mmemetea.github.io/portfolio

Portfolio of Michaël Memeteau — mechanical engineer, twice founder, product and engineering lead in Lisbon.

**Concept: "one month → seven seconds."** Every project is presented as a compression run: slow manual work in, a measured result out, the receipt attached. The home page plays the real tb.lx story (a month of Excel collapsing into a seven-second optimizer schedule) as its signature moment, and the loader is a session stopwatch that becomes the corner clock.

## Stack

- Astro 7 (static, content collections in `content/*.md`)
- GSAP + Lenis motion engine in `src/engine/` (one clock, page lifecycle, declarative reveals)
- Plain CSS design tokens (`src/styles/tokens.css`), Archivo variable + JetBrains Mono (self-hosted)
- No client framework, no WebGL, no trackers

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/portfolio
npm run build      # production build → dist/
npm run preview
```

Deploy: push to `main` — the GitHub Actions workflow builds `dist/` and publishes to GitHub Pages (`https://mmemetea.github.io/portfolio`). The base path is set in `astro.config.mjs`.

## Content

- `content/projects/*.md` — case pages. Frontmatter: `title`, `subtitle`, `description`, `tags`, `compression: {before, after}` (the measured result for the index), `proofLinks` (real URLs only), `images`, `videos`, `featured`, `bench` (home-workshop projects), `order`.
- `content/experience/*.md` — career log on the about page.
- `content/about.md`, `content/articles/*.md`.
- Media lives in `public/projects/<slug>/`; `src/lib/media-manifest.json` carries intrinsic dimensions (regenerate with `node scripts/media-manifest.mjs` after adding media) so images ship with `width`/`height`.

A build-time gate (`src/lib/gate.ts`) fails the build if any referenced image is missing or a wikilink dangles.

## Design

`DESIGN.md` documents the concept, palette, type system, motion language and the QA notes. `DESIGN.md` is the reference for future passes — keep it current.
