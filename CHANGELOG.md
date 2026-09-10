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
  collection schema, YAML reader helpers in `lib/content.ts`, and a one-shot
  `scripts/migrate-projects.ts` to move the hardcoded array in `lib/projects.ts`
  into `content/projects/*.yaml` (script run pending; pages still read the array).
- `CareerTimeline` component: horizontally scrollable career history with arrow
  controls, rendered on the home page.
- `ImageCarousel` component used by the project detail pages.
- `FeaturedProjectCards` component (built, not yet mounted on a page).
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

### Removed

- `AGENTS.md` and `CLAUDE.md` agent context files.
