# DESIGN.md — mmemetea portfolio rebuild

## Phase 0 — Brief

- **Subject:** Michaël Memeteau. Mechanical engineer (Arts et Métiers) turned product/engineering lead. Twice founder (Com-UT sold at €3M ARR; NESTO, patent filed). tb.lx/Daimler, Vision-Box, EU Commission consultant, now VW Financial Services. Lisbon. Maker: Voron 2.4, Chocofi keyboard, e-NABLE prosthetics.
- **Audience:** hiring managers, consulting clients, engineering peers.
- **Site's job:** get him hired/booked. Everything must show receipts — his own copy already does ("Finalist, not a shipped product — listed because the build is real").
- **Assets:** real photography/renders under `public/projects/`, plus `../portfolio_media` (shark-tank press stills, VWFS BPMN animation, Vision-Box actuator gif, NESTO diagrams). All copy in `content/*.md`.
- **Language:** English. **Deploy:** GitHub Pages, `https://mmemetea.github.io/portfolio` (base path `/portfolio`).
- **Stack:** Astro 7 (existing project, content collections kept) + GSAP + Lenis, no framework JS, no WebGL (concept needs none; images are the color). Reason: content-only showcase, motion is the product, 75 KB engine beats 250 KB.

## Phase 1 — Concept

Three candidates, different territories:

| | A. Compression (process/time) | B. The Bench (material) | C. Boot log (formal) |
|---|---|---|---|
| Idea | The site performs his signature trick: slow manual work visibly compressing into an instant, measured result | Portfolio as a test bench: every project a proof run — objective, method, measurement, receipt | Site reads as a machine boot log: timestamped lines, 404 = failed homing |
| Anchor | tb.lx's real "one month of Excel → seven seconds"; his career is a series of compressions | His receipt culture ("no receipt yet") | Klipper/Voron world |
| Swap test | Fails for anyone else | Fails for non-engineers | Weak as layout system |
| O/F/Fe/P | 4/5/4/1 | 3/4/4/2 | 3/3/5/3 |

**Picked: A.** Strongest fit, generates loader, index, transitions, 404. (Steal B's receipt block for case pages: every case ends in real links.)

```
Idea:        every project is a compression run: slow manual work squeezed into a measured result
Metaphor:    the test bench + stopwatch — before/after, elapsed time, the receipt at the end
Signature:   pinned "compression run" on home: a month of spreadsheet work (day counter climbing,
             timetable grid filling) collapses into one result line: one month → seven seconds (tb.lx, real numbers)
Emotion:     precision, snap, "this person removes waste"
Motion verb: compress — gather, accelerate, lock
Screenshot:  the timetable grid squeezed into the seven-second result line
```

Genericness test: a generic model would land on dark hero + GL blobs + "selected works" grid. This lands on a light spec-sheet index where each row is a measured before→after, a stopwatch loader, and width-axis type that literally compresses. Changed vs generic: no GL, no dark theme, no gradient; index is the concept, not a list.

## Phase 2 — Art direction

**Palette** (machine-shop paper + stopwatch signal; sampled, not defaults):

| Role | Value | Source |
|---|---|---|
| `--paper` (ground) | `#E9E7E2` | warm technical paper |
| `--ink` | `#1A1B1D` | india ink |
| `--muted` | `#616369` | grey print (AA on paper, verify ≥4.5) |
| `--line` | `rgb(26 27 29 / 0.16)` | hairline rules |
| `--signal` | `#D9480F` | stopwatch hand / safety orange, used rarely: timer, result numbers, focus |
| `--curtain` | `var(--ink)` | page transitions |

**Type:**
- Display + text: **Archivo variable** (Google, `wght` 100–900, `wdth` 62–125). Display at `wght 800, wdth 125`; the width axis is the concept — headlines compress under scroll/hover (`font-variation-settings` tween). Display tracking −0.03em, leading 0.9.
- Data/labels/receipts/timer: **JetBrains Mono** (Google), tabular figures, 12–14 px labels tracked +0.04em uppercase.
- Fluid scale: `--t-mega: clamp(3.4rem, 1rem + 11vw, 12rem)`, `--t-xl: clamp(2.4rem, 1.2rem + 5vw, 6.5rem)`, `--t-l: clamp(1.6rem, 1.2rem + 1.8vw, 3rem)`, `--t-m: clamp(1.15rem, 1rem + 0.7vw, 1.5rem)`, body 17px/1.55, `--t-s: 0.875rem`, `--t-xs: 0.75rem`.

**Grid & rhythm:** 12 columns, gutter `clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`, hairline row rules in indexes only (no broadsheet hairlines everywhere). Section rhythm varies: 190svh sticky hero → flush index → pinned interlude → airy about. Alignment rule: all display type hangs to the left gutter with `margin-left: -0.05em` optical correction.

**Shape:** radius 0 everywhere. Images squared with 1px line frame.

**Motion language:** verb *compress*. `expo.out` entrances (1.0–1.3 s), `expo.inOut` curtains (0.8–1.0 s), staggers 20–80 ms. Treatments (one per role): index rows = title width-compress (wdth 125→95) + floating preview following the pointer; nav = letter roll; primary CTA (email) = fill from pointer side; inline links = underline at rest rising into a band; utility links = color only. Idle: the corner stopwatch ticks (real session elapsed time — information, not decoration) and the hero compression bar breathes ±0.5% on the same clock. Reduced motion: native scroll, no loader theatrics, clock renders but does not animate anything else.

**Composition plan (different family per section):**

```
HOME
┌───────────────────────────────────────────┐  hero: sticky stage 190svh, four-corner frame
│ MM            work about articles    ⏱    │  name TL, nav TR, claim BL (mega display),
│                                           │  session clock BR
│  SLOW WORK,                               │
│  COMPRESSED.        ← claim + intro split │
│  scroll ↓                                 │
└───────────────────────────────────────────┘
┌───────────────────────────────────────────┐  index (the work IS the concept):
│ №   TITLE                BEFORE → AFTER   │  full-width ruled rows, hover preview
│ 01  E-bus charging      1 month → 7 s     │  follows pointer, width-squeeze on title
│ …                                         │
└───────────────────────────────────────────┘
┌───────────────────────────────────────────┐  signature: pinned compression run
│  [grid of timetable cells filling]        │  scrub 0→1: days counter climbs,
│  DAY 23/30…                               │  then the stage compresses to a line:
│  ═════════════► 7.00 s                    │  "several hundred e-buses, 7 seconds"
└───────────────────────────────────────────┘
┌──────────────┬────────────────────────────┐  bench strip: maker work, uneven mosaic
│ BENCH        │ [voron] [chocofi] [print]  │
└──────────────┴────────────────────────────┘
FOOTER: oversized name, email CTA, receipt links, colophon

CASE PAGE: spec sheet — meta table (role/tags/receipt), body text, ruled figure
gallery (FIG.01…), receipt block (real links), prev/next run.
ABOUT: two-col editorial + spec sidebar (skills/languages/education) + experience log table.
404: "MEASUREMENT NOT FOUND" — a run that never resolved, elapsed counter, link home.
```

**Background/ink is static** (paper everywhere); no global theme switch. Footer inverts to ink field (motivated chapter end, animated once via reveal).

## Phase 3 — Build notes

- Engine: `src/engine/*` from engine.md + astro adapter; no `gl/`. Tokens/engine CSS from engine.md, values from this doc.
- Content: `content/*.md` is truth; add optional `compression: {before, after}` + new images (vwfs bpmn gif cropped, visionbox actuator gif, nesto diagrams, owlo shark-tank stills); new bench project `egg-v2` (photos exist; copy minimal — flagged assumption).
- Fonts: `font.mjs google "Archivo"` variable + `"JetBrains Mono"`, preloaded in head.
- Loader: mono stopwatch `0.00 s` counting real progress; `setLoaderExit` hands the counter's value to the corner session clock (same fixed position, same style).
- Corner frame: name TL, nav TR, `LISBON 38.7°N` BL, session clock BR; steps aside on scroll down, returns on scroll up.
- Signature driver: `src/motion/compress.ts` — one scrub progress maps grid fill, day counter, stage squeeze, result line.
- No WebGL; `#gl` omitted. Curtain = single ink panel with a signal leading edge.
- Images: public/ paths via `withBasePath`, `loading=lazy` + fixed aspect boxes (CLS), explicit width/height where known.

## Phase 4 — QA decisions (pass 1)

- **Idle life**: the corner session clock ticks (real elapsed time) and the hero plate bar breathes on the same ticker. `shoot.mjs` reports `idleMotion: false` because both signals are small by design; accepted as the documented quiet-at-rest choice — the concept carries motion through scroll and hovers.
- **Corner frame**: the BL coordinates were removed (collided with prose on text pages); they live in the footer colophon instead. The frame steps aside on scroll down (translate + fade, 0.35 s) and returns on scroll up.
- **LCP**: the hero claim renders immediately under the loader (`data-lcp` bypasses the hidden-until-revealed state); case-gallery figures use `content-visibility: auto` so below-fold video posters never gate LCP. Throttled mobile LCP ≤ 1.1 s on every page.
- **Loader**: progress is real and capped (snap at MAX on throttled ticks); exit ≈ 0.8 s, total ≈ 1.9 s desktop.
- **Hover vocabulary**: index rows compress (width axis 116 → 92) with a floating preview + "Open" follower; nav/breadcrumb labels roll; CTA fills from the pointer side; inline links raise their underline; utility links change color only (`hover.colorOnly` = the EU receipt link, allowed).
- **Tags**: `tags` render snake_case (existing site convention); `tagsRaw` feeds human-readable captions.

## Phase 4 — QA pass 2 (outside critic: 7.25 weighted; concept reading matched the Concept Card)

Fixed from the critic's list: keyboard focus on gallery videos (visible accent outline, no stuck tab), footer receipt links now use the underline-rise (no color-only hovers), muted ink darkened to `#54565c`, case back-link and all link targets ≥24 px, run-section labels nowrap on mobile, mobile scroll runways trimmed (hero 150svh, pin +=170%), Voron gallery reordered so the machine itself is the cover with honest per-photo alt text, Voron images recompressed, pitch-deck bullet copy rewritten in the site's first-person voice (owlo, nesto, comut), tblx compression cell de-duplicated from its title, loader snap at the cap, programmatic/keyboard scrolls now drive frame-away through a native-scroll fallback in `scroll.ts`.

Accepted with evidence: year-range en dashes in the career log (correct typography, not clause dashes), throttled-mobile `is-loaded` at 3.8–5.1 s (the overlay itself lifts at the 1.4 s mobile cap; content paints under it from ~0.9 s LCP), `idleMotion: false` outside the vwfs video (documented quiet-at-rest choice), two-article articles page (all that exists). Deploy stays manual: the GitHub Actions workflow publishes on push to `main` when the owner confirms.

## Final pass — "remove one accessory"

Inventory per role: loader stopwatch (continuity), curtain wipe (navigation), corner frame + step-aside (orientation + collision), session clock (identity/idle), hero plate compress + breath (the verb at rest), index width-compress + preview + "Open" follower (primary targets), pinned compression run (signature), bench scale-in-clip (work images), CTA pointer fill (one button), nav roll (labels), inline underline rise (prose links). Every effect is load-bearing; the weakest decorative candidate (velocity tilt on the floating preview) was evaluated and kept because it is the only motion answer the preview has besides position. Nothing further cut — restraint budget spent on removing the BL coordinates corner and the hero chars intro during QA instead.
