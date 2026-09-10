# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project detail pages at `/projects/[slug]` with breadcrumb, hero, image carousel,
  proof links, and rich-text (`**bold**`) support in descriptions; routes are
  statically generated for every project.
- Dedicated NESTO case study at `/projects/nesto`, backed by the original pitch
  decks and documents (Brinc, Web Summit, EDP, InnoEnergy, Oz Energia, PV3).
- Keystatic CMS mounted at `/keystatic` (local storage) with a `projects`
  collection schema (including the `bench` flag). The 13 projects now live in
  `content/projects/*.yaml`; every project page reads them at build time
  through the async reader in `lib/content.ts`. `lib/projects.ts` keeps only
  the shared types.
- `CareerTimeline` component: horizontally scrollable career history with arrow
  controls, rendered on the home page.
- `ImageCarousel` component used by the project detail pages.
- `FeaturedProjectCards` async server component, mounted in a "The work, up
  front." section on the home page.
- GitHub Pages deployment: `scripts/export.sh` builds the static export
  (setting aside the dev-only Keystatic admin), and
  `.github/workflows/deploy.yml` publishes it to mmemetea.github.io/portfolio.
- "The paper trail" section on the NESTO case study, linking the original
  pitch decks and documents now served from `public/projects/nesto/`.
- Project media library under `public/projects/` (photos, GIFs, videos with
  posters), profile photo, and placeholder SVG.
- "Off the clock, on the bench" section on the Projects page for maker builds,
  rendered without tag filters.
- `.scrollbar-hide` utility class in `globals.css`.

### Changed

- Restructured the home page around featured work and a "receipts" anchor;
  primary CTAs now point at `/experience`.
- Project grids show thumbnails; `ProjectFilterGrid` accepts `showFilters` so
  grouped sections can hide the tag bar.
- Experience page expanded; About page trimmed.
- Articles page links to the real Medium and Hackaday articles instead of the
  publication homepages.
- Theme boot script moved to `next/script` with `beforeInteractive` (runs once
  before hydration, no flash of unstyled theme).
- Header brand reads "Michaël Memeteau"; footer copyright no longer renders the
  current year.
- Upgraded `next` to `^16.2.10`; added `@keystatic/core`, `@keystatic/next`, and
  `@playwright/test`.
- Static export serves under `/portfolio`: basePath, trailing slashes, and
  unoptimized images apply only to export builds — dev stays unprefixed so
  the Keystatic admin keeps working. `withBasePath()` in `lib/paths.ts`
  prefixes the URLs that bypass basePath (raw proof links, video sources,
  unoptimized image srcs).
- Retheme to the "Mint lagoon" palette: Minted Bamboo background, deep
  emerald ink, Forest Tea accent (Tea Leaf in dark mode), with the six-step
  OKLab gradient ("gradient-hakka") and grain texture as the hero field.
  Accent buttons and active filter pills use text-background instead of
  white for AA contrast in both themes; hero and nav text opacities raised
  where the gradient darkens.

### Fixed

- `/projects/nesto` always 404'd: the bespoke static page destructured a
  `params.slug` that never exists on a static route. The slug is now fixed in
  the page, and `/projects/[slug]` no longer emits a duplicate param for it.

### Removed

- `AGENTS.md` and `CLAUDE.md` agent context files, and the one-shot
  `scripts/migrate-projects.ts` after it was run.

