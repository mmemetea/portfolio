# Portfolio Website Design

**Date:** 2026-03-21
**Author:** Michaël Memeteau
**Status:** Approved

## Goal

Build a professional portfolio website to showcase career experience with verifiable, practical proof of work. The portfolio targets a general professional audience and establishes credibility through linked evidence.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **CMS:** Sanity.io (free tier) for structured content management
- **Styling:** Tailwind CSS v4, dark/light mode
- **Deployment:** Vercel connected to GitHub repo (auto-deploy on push)
- **Domain:** To be registered

## Site Structure

| Route        | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `/`          | Hero + tagline + 3 featured proof points         |
| `/experience`| Vertical timeline of roles with company details  |
| `/projects`  | Grid of projects with verifiable proof links     |
| `/articles`  | Published articles (Hackaday, Medium/tb.lx)      |
| `/about`     | Bio, education, skills, hobbies, contact         |

## Content Model (Sanity schemas)

- **Person** — name, tagline, bio, photo, social links
- **Experience** — role, company, dates, description, tech stack, highlights
- **Project** — title, description, tags, proof links (URL + label), images
- **Article** — title, URL, publication name, date, excerpt
- **Award** — title, event, date, description

## Proof Points (Evidence Wall)

Every project card pairs a claim with a verifiable link:

| Project                                         | Proof                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| NESTO.IO — IoT bottled gas platform              | [Hackaday article](https://hackaday.com/2017/09/03/polyurethane-meet-3d-printing/), [hackaday.io](https://hackaday.io/project/26941-nesto-prototyping), 4 startup competition wins |
| ComUT — Co-founded, EUR 3M ARR, acquired        | Business acquisition (verifiable fact)                                                                             |
| tb.lx / Daimler — Digital Service Hub            | [Kanban article (Medium)](https://medium.com/tblx-insider/kanban-the-alternative-path-to-agility-55ef6c13e25c), 30-day to <1min quantified result |
| Vision-Box — Core platform refactoring          | Acquisition by Amadeus for EUR 320M (public record)                                                               |
| EU Commission — Tobacco Track & Trace study     | Published EU report (EAHC/2013/Health/11)                                                                          |
| InnoTech / Fujitsu — COBOL reverse engineering  | Project documentation, client names (Jerónimo Martins, Staples)                                                    |
| InnoTech / IKEA — PLM process mapping           | Ongoing, BPMN artifacts as proof                                                                                   |
| InnoTech / Luz Saúde — ICU mortality scores     | Healthcare compliance project                                                                                      |

## Hobbies Section (`/about`)

- **YouTube:** Embed the [3D printing playlist](https://www.youtube.com/playlist?list=PLxgWx23tRb-OUprTZU4c9d2UtylOSdO7p) as both a full playlist player and individual video cards (thumbnails + titles via YouTube Data API)
- **Google Photos Albums:**
  - [Chocofi Magnets](https://photos.app.goo.gl/YX7X6g8VPrJWCty49) — Custom magnetic design
  - [Monte Alentejano](https://photos.app.goo.gl/jpqSaAzejQKF4SGW7) — Traditional Portuguese house project (2023-2024)
  - [Voron Raven](https://photos.app.goo.gl/k8mPXLV2UzcqT4YZA) — Voron 3D printer build (2020-2024)
  - [3D Printing Talk & Beer](https://photos.app.goo.gl/Z78pAj1VhgqtC5BJ7) — Community meetup organization (2013-2019)
  - [IWI MIT Boston](https://goo.gl/photos/KxRZXKHgKDmkWsbH9) — MIT International Workshop on Innovating (2017)
  - [Onshape CAD Work](https://photos.app.goo.gl/YSUVgZ6EFpthx3Hp6) — CAD/CAM design projects (2015)
- **Other interests:** Mountain biking, orienteering (federated athlete), scuba diving (CMAS), cooking

## Design Direction

- **Tone:** Professional yet approachable — engineering meets entrepreneurial
- **Colors:** Neutral base (charcoal/slate) with single accent color (teal or amber, TBD)
- **Typography:** Geist (Next.js default) sans-serif
- **Layout:** Card-based for projects, vertical timeline for experience
- **Mobile-first** responsive design
- **Dark/light mode** toggle

## Key Principles

1. **Every claim links to proof** — external URLs, publications, public records
2. **Content managed in Sanity** — easy non-technical updates
3. **Fast and lightweight** — static generation where possible
4. **GitHub as source of truth** — all content and code version-controlled

## Content Sources

- CV: `cv_202509.pdf` from personal vault
- Hackaday article: https://hackaday.com/2017/09/03/polyurethane-meet-3d-printing/
- hackaday.io project: https://hackaday.io/project/26941-nesto-prototyping
- tb.lx Medium article: https://medium.com/tblx-insider/kanban-the-alternative-path-to-agility-55ef6c13e25c
- YouTube playlist: https://www.youtube.com/playlist?list=PLxgWx23tRb-OUprTZU4c9d2UtylOSdO7p
- Google Photos albums: 6 albums (see above)
- Work vault: project documentation, journal entries
- Personal vault: CVs, references, clippings
