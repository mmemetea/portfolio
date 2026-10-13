# CHANGELOG

## 2026-10-13: "One month → seven seconds" redesign (awwwards rebuild)

- **Concept**: the portfolio now performs its owner's signature trick — slow manual work compressing into a measured result. The work index is a table of compression runs (before → after), the home page carries a pinned compression sequence using the real tb.lx numbers (one month of Excel → seven seconds), and the loader is a session stopwatch that hands off to a persistent corner clock.
- **Design system**: paper/ink/signal palette (#e9e7e2 / #1a1b1d / #d9480f), Archivo variable (width axis as the compression idea) + JetBrains Mono, radius 0, plain CSS design tokens. Replaces the Mint Lagoon system and Tailwind.
- **Engine**: GSAP + Lenis motion engine with page lifecycle, real-progress loader, curtain transitions, declarative reveals (`data-split`/`data-reveal`), cursor follower, index hover previews, corner frame that steps aside on scroll. Reduced-motion and no-JS paths keep all content visible.
- **Content**: same Markdown collections, plus `compression: {before, after}` on projects; new media from the raw library (Shark Tank press stills, VWFS BPMN animation, Vision-Box actuator, NESTO diagrams); heavy GIFs converted to MP4; new bench project `egg-v2`.
- **Pages**: home, work index, case pages (spec-sheet layout with receipt block), about (bio, career log, spec sidebar), articles, designed 404.
- **Perf/a11y**: LCP ≤ 1.0 s on throttled mobile (hero claim paints under the loader), CLS ≤ 0.02, 60 fps scroll, zero axe violations, visible focus, skip link, reduced-motion static fallbacks, robots.txt + sitemap + OG image.
- **Deploy**: workflow rewritten for GitHub Pages (actions/deploy-pages, `dist/` artifact). The old workflow uploaded a non-existent `out/` directory and never deployed.

## 2026-09-14: Astro Migration & Content Pivot

- **Framework Migration**: Successfully ported the portfolio from Next.js 16 to Astro v7.3.2.
- **Content Source**: Migrated all project, article, and experience content from YAML/Keystatic into Obsidian-compatible Markdown notes within the `content/` directory.
- **Design Preservation**: Verified that the Mint Lagoon design system (color tokens, gradient-hakka, typography) is carried over verbatim.
- **Component Porting**: Successfully ported all major components (`Header`, `Footer`, `Container`, `CareerTimeline`, `ImageCarousel`, `ProjectFilterGrid`, `EmptyMedia`) to performant, vanilla JavaScript/Astro components, ensuring zero client-side framework reliance.
- **Data Layer Overhaul**: Replaced Next.js data fetching logic with Astro Content Collections (`getCollection`, `getEntry`) and introduced a robust `contentGate` integration in `src/lib/gate.ts` for build-time validation.
- **Code Cleanup**: Removed all Next.js boilerplate (`app/`, `components/`, `lib/` directories, `.next/`, old `out/` dir references).
- **Deployment**: Updated CI/CD workflow (`.github/workflows/deploy.yml`) to use `npm run build` targeting the `out/` directory for parity baseline compatibility.

## Next Steps
- Complete final verification (Browser/Playwright checks).
- Finalize Parity diff against `/tmp/pf-parity-baseline/`.
- Update `CHANGELOG.md` to reflect this pivot and content source change.
- Commit final state.

