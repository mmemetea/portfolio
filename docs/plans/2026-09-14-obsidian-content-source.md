# Portfolio Content from a Dedicated Obsidian Vault

**Date:** 2026-09-14
**Author:** Michaël Memeteau
**Status:** Proposal (rev. 2 — dedicated `portfolio` vault, replaces rev. 1)

## Goal

Replace Keystatic/YAML as the portfolio's content source with a **new, dedicated
Obsidian vault named `portfolio`**, and migrate all existing content — 13 project
YAMLs, the inline article/experience/about data — into it. The site itself
(Next.js 16 static export, Mint Lagoon design, GitHub Pages at
`mmemetea.github.io/portfolio`) stays exactly as is.

The dedicated vault changes the architecture for the better: the vault is
**public by construction**. `memto` (the private brain: Health, Finances,
House) is never read, mounted, or referenced — the privacy problem of rev. 1
dissolves instead of being mitigated.

## Non-goals

- No changes to design, routing, or deployment target.
- No two-way sync (vault → site is one-way; the site never writes to the vault).
- No cross-vault automation with `memto` (Obsidian cannot wikilink across
  vaults anyway; anything worth publishing gets copied in by hand).

## Vault shape

```
portfolio/                    ← the vault (Obsidian opens this folder)
├── .obsidian/                ← vault config (gitignored in whichever repo hosts it)
├── about.md                  # type: about
├── articles/
│   ├── 2021-kanban-at-tblx.md
│   └── 2017-polyurethane.md
├── experience/
│   ├── 2021-innotech.md
│   └── …
└── projects/
    ├── visionbox.md
    ├── nesto.md
    └── …
```

Project note — frontmatter mirrors today's YAML 1:1, so pages and components
change only their data source:

```yaml
---
type: project
title: Vision-Box — fraud detection for eGates
subtitle: Biometric border control
order: 4
featured: true
bench: false
tags: [.NET, gRPC, Biometrics]     # snake_case pipeline unchanged (lib/projects.ts)
proofLinks:
  - label: Acquired by Amadeus — public record
    url: https://…
images:
  - src: /projects/visionbox/visionbox-01.jpg   # existing public/ paths, unchanged
    alt: eGate lane
draft: false
---
Free-form markdown body → fullDescription (replaces `**bold**`-in-YAML).
```

Wikilink policy:

- `[[link]]` between two notes → `next/link` under basePath.
- Link to a missing note → **build error** (validation gate), not a silent 404.
- `![[…]]` embeds reference files already under `public/` — **zero image
  migration**; Obsidian resolves embeds from anywhere in the vault.
- Standard markdown links pass through unchanged.

## Pipeline options

| | A. Vault **is** the site repo (recommended) | B. Separate vault repo, submodule | C. Sync script | D. Obsidian plugin |
|---|---|---|---|---|
| Mechanism | Obsidian opens the portfolio repo itself; notes live in `content/` as markdown; `.obsidian/` gitignored | `portfolio` vault is its own repo, mounted as a git submodule | Prebuild copies vault → content | Plugin pushes rendered output |
| Repos | **1** | 2 | 1 (+ a committed copy that drifts) | 2 |
| Publish flow | edit → commit → push | vault commit + submodule bump + push | run script, commit output | plugin push |
| CI changes | none | `submodules: recursive` | none | none |
| Vault/repo coupling | vault location = repo clone | free-floating; can publish the vault itself | free-floating | plugin-dependent |
| Failure modes | none structural | forgotten `--recurse-submodules` → empty local build | two copies diverge | site coupled to plugin releases |

**Recommendation: A.** With a dedicated vault there is no reason for a second
repo. Obsidian is happy opening any folder; the site repo gains a markdown
`content/` tree and a gitignored `.obsidian/`. One repo, one push, no cadence
problem, no submodule fetch, deployment workflow untouched. Choose B only if
you want the vault publishable or syncable independently of the site (e.g.
Obsidian Sync across devices, or a public "content repo" separate from code).

## Migration

### M1 — Scripted: the 13 projects

One-shot `scripts/migrate-keystatic-to-vault.ts` (same pattern as the old
`migrate-projects.ts`): read each `content/projects/*.yaml`, emit
`content/projects/<slug>.md` with identical frontmatter, move
`fullDescription` into the markdown body, delete the YAML. Deterministic and
reviewable as a single diff. ~½ day including review.

### M2 — Manual: articles, experience, about

~2 article notes, ~9 experience notes, 1 about note — hand-moved from the
inline arrays in `app/articles/page.tsx`, `app/experience/page.tsx`,
`app/about/page.tsx` (copy-paste beats scripting at this size). Each note
gets `type:` + the same fields as frontmatter, body where prose exists.
~½ day.

### M3 — Parity check

Build both old and new sources side by side (`CONTENT_SOURCE` env flag during
transition), diff the rendered HTML of all 21 routes, flip the default,
remove the flag. The Playwright verification scripts from the tag/contrast
work run unchanged against the result.

## Implementation phases

- **P0 — Spike (½ day).** `lib/content.ts`: markdown reader (`gray-matter` +
  `zod`) behind the existing function signatures. One migrated project note
  renders identically.
- **P1 — Validation gate (½ day).** Build fails on: missing/invalid
  frontmatter, wikilink to a missing note, image path not under `public/`,
  duplicate slug, `draft: true` count exceeding expectation (fat-fingered
  publishes get caught in review).
- **P2 — Migration (M1 + M2 + M3, ~1 day).**
- **P3 — Cutover (½ day).** Reader reads markdown only; delete
  `app/keystatic`, `app/api/keystatic`, `keystatic.config.ts`, the
  set-aside dance in `scripts/export.sh` (exists only for Keystatic), and
  the spent migration script.
- **P4 — Rich text (optional, later).** Render note bodies as real markdown
  (headings, lists, embeds) — hero, carousel, EmptyMedia untouched.

## Safety

The vault is public by construction — anything in it is intended for
publication. Remaining guards: the `draft:` flag, the P1 validation gate, and
one habit: **memto material enters only by deliberate copy.** Receipts that
live in memto (decks, PDFs, reference notes) get duplicated into the
portfolio vault (or into `public/`) at migration time; wikilinks cannot cross
vaults, so there is no accidental path back.

## Pros

- **Single source of truth, single repo.** Content is markdown in the repo;
  edit in Obsidian, commit, push — Actions deploys. No second surface to
  drift, no submodule, no sync.
- **Better writing ergonomics.** Full markdown, backlinks, graph, mobile —
  versus Keystatic's localhost-only admin whose UI can't even see the
  basePath.
- **Kills the admin/site mismatch** we hit this session (admin showed
  "AI Agents", site rendered `ai_agents`).
- **Rich text for free** — `fullDescription` stops being a string with a
  `**bold**` parser bolted on.
- **Zero privacy blast radius** — the dedicated vault never touches Health /
  Finances / House; rev. 1's biggest con is gone.
- **Zero image migration** — embeds reference existing `public/` paths.
- **Migration is mechanical**, not authoring: the content already exists as
  data; the script is deterministic and the diff reviewable.
- **Vault is git-versioned with the code** — history, blame, and reverts in
  the same place as the site.

## Cons (and mitigations)

- **Schema enforcement moves to build time** — Keystatic validated at edit;
  frontmatter is only as good as the typist. *Mitigation: zod gate failing
  the build. Residual: errors surface later.*
- **Two vaults to live in** — `memto` remains the private brain; portfolio
  writing happens in a different vault. Context-switch cost, and reference
  material can end up duplicated across vaults (copy is the only bridge).
  *Mitigation: keep duplicates one-way (memto → portfolio) and treat the
  portfolio vault as publish-ready only.*
- **Obsidian config lives in the repo folder** — `.obsidian/` must be
  gitignored; plugins/workspace noise stays out of commits. *(One line in
  `.gitignore`.)*
- **No editing UI** — no Keystatic forms; raw frontmatter. Fine if writing
  happens in Obsidian anyway; painful for quick phone edits without
  Obsidian mobile.
- **Writing requires the repo** — the vault *is* the site repo, so edits need
  a clone (laptop/desktop both fine). Obsidian Sync users would need option B
  instead.
- **Effort** — ~2 days total (P0–P3), dominated by migration review, not code.

## When not to do this

- If you want the content publishable/syncable independently of the site
  code → take option B (submodule), everything else stands.
- If content edits are rare and always at a desk with the repo open —
  Keystatic already works; the win is workflow, and a stale workflow has no
  win.
- If the two-vault context switch would make you stop writing notes at all —
  the portfolio then goes stale, which is worse than any pipeline choice.

## Decision requested

Approve option A (vault = site repo) with phases P0–P3, or option B if the
vault should exist independently of the site.
