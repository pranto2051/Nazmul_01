# AI MASTER PROMPT — Academic Research Portfolio (Astro 7 · Vercel · Light/Dark)

> **Version 1.0** · Target agent: Claude Code / Cursor / Windsurf / any autonomous coding agent
> **Deliverable:** a complete, production-ready, static academic portfolio website, plus full documentation
> **Language of this prompt:** English (for agent accuracy). **Language of generated docs & code comments:** Bengali-first with English technical terms (see §12–§13).

---

## 📋 Usage Instructions

1. Copy the prompt from `=== BEGIN MASTER PROMPT ===` to `=== END MASTER PROMPT ===` into your autonomous coding agent.
2. The agent reads official Astro documentation, then generates code according to phases.
3. Tasks proceed phase-by-phase (Phase 1 → Phase 8).
4. Review `docs/00_START_HERE.md` for onboarding and update guides.
5. ⚠️ **Important:** Certain fields in Appendix A (DOIs, abstracts, metrics) are provisional. Audit with `npm run check:content:strict` before official submission.

---

=== BEGIN MASTER PROMPT ===

# 0. ROLE & MISSION

You are a **senior staff-level front-end engineer, information designer, and technical writer** working as one person. Build a **complete, professional, award-quality academic research portfolio website** for an early-career researcher (Machine Learning · Medical Imaging · Explainable AI), using the **latest Astro (Astro 7)**.

The site will be:
- **Submitted to universities** (PhD / MSc admission committees, prospective supervisors, scholarship panels) and shared with journal editors and collaborators,
- **Deployed on Vercel** as a fast, fully static site,
- **Maintained later by a non-expert owner** who will replace demo photos and demo text with real material by reading comments and docs — so *editability and documentation are first-class deliverables, equal in importance to visual quality.*

**Success looks like:** an admissions committee member opens the site on a phone or laptop, understands within 10 seconds who this researcher is, what they work on, and why they are credible — and finds publications, CV, and contact details in one click. Meanwhile the owner can change any photo, paper, or sentence in under two minutes by following a comment.

---

# 1. NON-NEGOTIABLE RULES

Read these first. They override anything else in this document if there is a conflict.

1. **Research before code (Step 0, §2).** Do not rely on memory for Astro APIs. Astro 7 is newer than your training data may cover. Read the official sources, then write code that matches *them*.
2. **Academic integrity of content.** This site is a credentials document.
   - **Never invent** facts, metrics, DOIs, co-authors, venues, dates, awards, affiliations, or links.
   - Everything in **Appendix A** is tagged `[CV]` (taken from the owner's CV material — still to be re-confirmed by the owner) or `[DRAFT]` (demo placeholder). Items tagged `[DRAFT]` must be stored with `verified: false` and shown only as clearly-marked placeholders (see §8.8 "Draft-content system").
   - If you need extra copy to make the demo look complete, write it as obviously replaceable demo text and mark it `verified: false`.
3. **Everything editable lives in content files, not in components.** No hard-coded names, papers, dates, URLs, or image links inside `.astro` components. Components receive data.
4. **Comment convention is mandatory (§12).** Every section, every card type, every image slot, every manual-update point gets the standard Bengali+English comment block. A missing comment is a bug.
5. **Documentation is a deliverable (§13).** For every feature you build, the matching doc file is created/updated in the same phase. No undocumented feature ships.
6. **Zero-flash light/dark theme**, **WCAG 2.2 AA**, **Lighthouse ≥ 95 in all four categories** (mobile), **no layout shift**, **works without JavaScript for all core content** (progressive enhancement).
7. **Static output only.** No server, no database, no API keys, no tracking scripts, no cookie banners needed.
8. **No lorem ipsum, no "Your Name Here", no broken images, no dead links, no console errors, no TypeScript errors.**
9. **Use demo photos** so the site looks complete today; every one must be replaceable through a single registry file (§11).
10. **Do not stop early or ask unnecessary questions.** Make sensible decisions, document them in `docs/TECH_DECISIONS.md`, and continue. Report briefly at the end of each Phase (§16) and proceed.

---

# 2. STEP 0 — RESEARCH BEFORE YOU WRITE ANY CODE

Spend real effort here. Output: `docs/TECH_DECISIONS.md` (English, concise).

## 2.1 Read these sources (fetch them; they are authoritative)
- Astro 7 release post: https://astro.build/blog/astro-7/
- Astro docs (Getting Started and everything it links to that you need): https://docs.astro.build/en/getting-started/
- From the docs, specifically confirm the **current** way to do each of these (names and APIs may have changed between versions — do not assume):
  1. Project scaffolding command and minimum Node.js version
  2. TypeScript configuration and `astro check`
  3. **Content collections** (loaders such as `glob`/`file`, schema definition with Zod, querying)
  4. **Images** (`astro:assets`, remote image domain allow-listing, responsive images, `<Image>`/`<Picture>`)
  5. **Fonts** (built-in font optimisation if available; otherwise self-hosted `@fontsource-*`)
  6. **View transitions / client router** and the lifecycle events needed to re-apply the theme after navigation
  7. **Styling** (scoped CSS, global CSS, Tailwind integration the officially-recommended way)
  8. **Sitemap / RSS / SEO** integrations
  9. **Deployment to Vercel** (static output; whether an adapter is required or not)
  10. Any **breaking changes / migration notes** introduced in Astro 7 relative to Astro 5/6 that affect the above
3. If a link is unreachable, fall back to the official docs site search and the `astro` package's own README/changelog on npm/GitHub, and record that in `TECH_DECISIONS.md`.

## 2.2 Record decisions
`docs/TECH_DECISIONS.md` must contain: Astro version installed, Node version, every integration chosen **and why**, anything you found that differs from this prompt's assumptions, and every place where you deviated from this prompt and why. **If the Astro 7 docs contradict a technical assumption in this prompt, follow the docs and note it.**

## 2.3 Visual research (lightweight, reasoned — not copying)
Study the *patterns* (not the assets) of strong academic/lab pages — e.g. Stanford AIMI, Oxford VGG, UCL CMIC, MIT CSAIL member pages, well-regarded personal researcher sites — and clinical imaging workstations (3D Slicer, OsiriX, Radiopaedia). Write 5–8 lines in `docs/05_DESIGN_SYSTEM.md` ("Design rationale") on what you took from them: information hierarchy, density, typography, figure presentation, trust signals.

---

# 3. TECH STACK & CONSTRAINTS

| Concern | Decision |
|---|---|
| Framework | **Astro 7 (latest stable)**, `output: 'static'` |
| Language | TypeScript, `strict` |
| Styling | Modern CSS with **design tokens (CSS custom properties)**; Tailwind CSS only if the Astro 7 docs recommend a first-class integration — otherwise plain CSS with scoped styles. Tokens are the single source of truth either way |
| Interactivity | **Zero-framework by default**: vanilla TypeScript in Astro `<script>` / small custom elements. Add a UI framework island (Preact/Svelte) **only** if a feature genuinely can't be done cleanly without it — justify in `TECH_DECISIONS.md` |
| Content | **Content collections** with Zod schemas; YAML/Markdown content files (see §6) |
| Images | `astro:assets` where possible; remote demo images allow-listed in config; graceful fallback component when an image is missing |
| Fonts | Self-hosted/optimised, `font-display: swap`, preloaded critical weights, **no render-blocking third-party font CSS** |
| Icons | Inline SVG (e.g. a small Lucide subset via `astro-icon` or hand-picked SVG files). No icon fonts |
| Animation | CSS + `IntersectionObserver` + View Transitions. **Always honour `prefers-reduced-motion`** |
| Deploy | **Vercel**, static. Include `vercel.json` (headers, clean URLs, cache) |
| Package manager | npm (include lockfile). Scripts listed in §14 |
| Analytics / trackers | None |

**Browser support:** last 2 versions of Chrome, Edge, Safari (incl. iOS), Firefox.

---

# 4. PROJECT STRUCTURE (create exactly this, extend only if needed)

```
/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ vercel.json
├─ .env.example                  # PUBLIC_SITE_URL, PUBLIC_CONTACT_FORM_URL (optional)
├─ README.md                     # Bengali-first overview, links into /docs
├─ docs/                         # ← §13, all human documentation
├─ scripts/
│  ├─ check-content.mjs          # finds placeholders/unverified items (§14)
│  └─ check-images.mjs           # verifies every image URL in the registry responds
├─ public/
│  ├─ cv/YOUR_NAME_CV.pdf        # downloadable CV (replace)
│  ├─ favicon.svg  favicon.ico  apple-touch-icon.png
│  ├─ og/og-default.jpg          # 1200×630 social card (replace)
│  ├─ assets/                    # owner's real images go here
│  └─ robots.txt
└─ src/
   ├─ content.config.ts          # collection definitions + Zod schemas
   ├─ content/
   │  ├─ README.md               # field-by-field editing guide (Bengali)
   │  ├─ site/                   # profile.yaml, site.yaml, nav.yaml
   │  ├─ publications/publications.yaml
   │  ├─ research/*.md           # one case study per file
   │  ├─ experience/experience.yaml
   │  ├─ teaching/teaching.yaml
   │  ├─ education/education.yaml
   │  ├─ awards/awards.yaml
   │  ├─ projects/projects.yaml
   │  ├─ skills/skills.yaml
   │  └─ gallery/gallery.yaml
   ├─ data/
   │  └─ images.ts               # ★ CENTRAL IMAGE REGISTRY (§11)
   ├─ layouts/  BaseLayout.astro  PageLayout.astro  PrintLayout.astro
   ├─ components/
   │  ├─ layout/   Header  Footer  SkipLink  ThemeToggle  MobileMenu  ScrollProgress  BackToTop
   │  ├─ home/     Hero  StatsBento  ResearchSpotlight  FeaturedPublications  ResearchInterests  TimelinePreview  CtaBand
   │  ├─ research/ ResearchCard  ResearchHeader  MethodSteps  ResultsGrid  RelatedPublications
   │  ├─ publications/ PublicationCard  PublicationBrowser  BibtexDialog  StatusPill  PublicationStats  TopicChips
   │  ├─ experience/ TimelineItem  EducationCard  TeachingCard  AwardCard  SkillGroup
   │  ├─ projects/ ProjectCard
   │  ├─ media/    Figure  FigureGallery  Lightbox  BeforeAfter  ImageFallback
   │  ├─ ui/       Button  Badge  Card  SectionHeading  Reveal  CountUp  DraftBadge  Prose
   │  └─ seo/      SEO  JsonLdPerson  JsonLdPublication
   ├─ pages/
   │  ├─ index.astro
   │  ├─ research/index.astro  research/[slug].astro
   │  ├─ publications.astro
   │  ├─ experience.astro
   │  ├─ projects.astro
   │  ├─ gallery.astro
   │  ├─ cv.astro               # printable web CV
   │  ├─ research-statement.astro
   │  ├─ contact.astro
   │  └─ 404.astro
   ├─ styles/  tokens.css  base.css  typography.css  utilities.css  print.css
   ├─ lib/     publications.ts  format.ts  draft.ts  site.ts
   └─ types/   index.ts
```

*(Adapt file names to Astro 7 conventions you discovered in Step 0, e.g. the location of `content.config.ts`; record any change.)*

---

# 5. DESIGN DIRECTION — "CLINICAL PRECISION, EDITORIAL WARMTH"

**Concept:** a modern academic journal meets a radiology workstation. Trustworthy and rigorous first; beautiful and memorable second — but it must be *genuinely striking*, not generic. Avoid template-looking SaaS gloss (no rainbow gradients, no stock "glassmorphism everywhere", no emoji as icons, no fake testimonials, no sales copy).

## 5.1 Visual signature (what makes it memorable)
- **Diagnostic grid background** in the hero: a faint measurement grid with small crosshair/tick ornaments and a slowly drifting soft gradient "aurora" (two blurred radial blobs in accent colours, ≤ 12% opacity). Static when `prefers-reduced-motion`.
- **Hero visual:** a large rounded "viewer panel" styled like a scan viewport (corner brackets, tiny monospace overlay labels like `AXIAL · W:400 L:40`, scale ruler) containing the portrait or the featured scan image. Subtle parallax tilt on pointer move (desktop only, reduced-motion safe).
- **Bento statistics grid** with animated count-up numbers (derived from real data, §8.1).
- **Before/After slider** (raw CT ↔ segmentation mask) as the "wow" interactive on the home page.
- **Editorial serif headlines** + clean sans body + monospace for metadata → instantly reads "scholarly".
- **Accent used with discipline:** one clinical sky/teal accent for interactive state, links, metric highlights, selected filters, focus rings.
- **Micro-interactions:** card lift + image zoom on hover, animated underline on links, smooth section reveals (fade-up 12px, 400–600 ms, staggered), scroll-progress bar under the header, scroll-spy highlighting in page sub-navigation.
- **Smooth page transitions** via Astro view transitions/client router (if confirmed in Astro 7 docs) with theme and scroll handled correctly.

## 5.2 Design tokens (put in `src/styles/tokens.css`; **both themes must be hand-tuned, not auto-inverted**)

| Token | Light ("Paper") | Dark ("PACS console") | Use |
|---|---|---|---|
| `--bg-canvas` | `#f8fafc` | `#080d14` | page background |
| `--bg-surface` | `#ffffff` | `#0f1724` | cards, dialogs |
| `--bg-subtle` | `#f1f5f9` | `#172234` | chips, code, inputs |
| `--border-hairline` | `#e2e8f0` | `#1e2e42` | 1px separators |
| `--text-primary` | `#0f172a` | `#f1f5f9` | headings |
| `--text-secondary` | `#475569` | `#a8b5c8` | body, abstracts |
| `--text-muted` | `#64748b` | `#8493a8` | meta, captions (**must keep ≥ 4.5:1**) |
| `--accent` | `#0369a1` | `#38bdf8` | links, active, focus |
| `--accent-2` | `#0d9488` | `#2dd4bf` | gradient partner, success-ish highlights |
| `--accent-subtle` | `rgba(3,105,161,.08)` | `rgba(56,189,248,.12)` | active chip bg |
| `--status-published` | `#0369a1` | `#38bdf8` | publication status pill |
| `--status-accepted` | `#047857` | `#34d399` | " |
| `--status-review` | `#b45309` | `#fbbf24` | " |
| `--status-inpress` | `#6d28d9` | `#a78bfa` | " |
| `--shadow-card` | soft 2-layer | deeper, low-spread | elevation |
| `--radius-sm/md/lg/xl` | 8 / 12 / 18 / 28 px | same | |

Verify contrast of every text/background pair in both themes (≥ 4.5:1 body, ≥ 3:1 large text & UI). Document the pairs you checked in `docs/05_DESIGN_SYSTEM.md`.

## 5.3 Typography
- **Display / section titles / paper titles:** an editorial serif (e.g. *Newsreader* or *Source Serif 4*), weight 500–600, tight tracking (-0.015em).
- **Body & UI:** humanist sans (e.g. *Plus Jakarta Sans* or *Inter Tight*), 400/500/600, line-height 1.6–1.7, measure 65–75ch.
- **Data / BibTeX / labels:** monospace (*JetBrains Mono*), `font-variant-numeric: tabular-nums`.
- Fluid type scale with `clamp()`. Hero H1 up to ~72px desktop, ~40px mobile.
- Self-host only the weights actually used. Provide metric-matched fallbacks to prevent layout shift.

## 5.4 Layout system
- 12-column grid, max content width 1200px, prose max 72ch, generous vertical rhythm (section padding `clamp(64px, 10vw, 128px)`).
- Mobile-first. Breakpoints roughly 480 / 768 / 1024 / 1280. Test at 360px width.
- Asymmetric editorial layouts on desktop (e.g. publications with a sticky right rail of stats/filters); single column on mobile.
- Header: sticky, translucent blur background that gains a hairline border after scroll; contains name/monogram, nav, **theme toggle**, **"Download CV" button**. Mobile: accessible full-screen menu (focus trap, `Esc` to close).

## 5.5 Light / Dark mode ("Day / Night")
- Three states internally: `light`, `dark`, `system` (default = system). The visible control is a **sun/moon toggle** that cycles or switches (with `aria-pressed`/clear label, e.g. "Switch to dark mode").
- **No flash:** a tiny blocking inline script in `<head>` reads `localStorage` (wrapped in try/catch) and `prefers-color-scheme`, sets `data-theme` on `<html>` before first paint. Set `color-scheme` and `<meta name="theme-color">` for both themes.
- Re-apply correctly after view-transition swaps.
- Images/figures: a subtle brightness/contrast treatment in dark mode for photos; diagrams with white backgrounds sit on a light "plate" so they never look broken in dark mode.
- Animate the theme change with a short colour transition (≤ 200ms), disabled for reduced-motion.

---

# 6. CONTENT ARCHITECTURE (editable data layer)

All text, numbers, links, and image keys live in `src/content/**` and `src/data/images.ts`. Define **Zod schemas** in `content.config.ts` so that a typo by the owner fails the build with a clear message (and `docs/10_TROUBLESHOOTING.md` explains the common errors in Bengali).

## 6.1 Collections & key fields (adapt to loader syntax confirmed in Step 0)

**profile / site (singletons)**
`name`, `shortName`, `monogram`, `currentRole`, `institution`, `location`, `email`, `phone`, `showPhoneOnSite` (**default `false`** — privacy), `positioningLine`, `bioShort` (≤ 220 chars), `bioLong[]` (paragraphs), `researchInterests[]`, `currentFocus{ title, description, highlights[] }`, `links{ linkedin, googleScholar, orcid, github, researchGate?, website? }` (each may be empty → UI hides it), `availability` (e.g. "Open to PhD opportunities for 2027 intake" — editable, may be empty), `lastUpdated` (ISO date, shown in footer & CV).

**publications** — one record per item
`id`, `title`, `authors[]` (strings; the owner's exact name string is auto-highlighted **bold**; support `*` equal-contribution and `†` corresponding markers via optional fields), `venue`, `venueShort`, `year`, `month?`, `pages?`, `type: conference|journal|book-chapter|preprint`, `status: published|accepted|in-press|under-review`, `doi?`, `pdfUrl?`, `codeUrl?`, `abstract?`, `topics[]` (controlled vocabulary), `thumbnail` (image **key** from registry), `figures[]` (image keys + caption + credit), `bibtex?`, `featured` (bool), `verified` (bool), `notes?` (private owner notes, never rendered).

**research** (Markdown, one file per case study)
Frontmatter: `slug`, `title`, `subtitle`, `period`, `role`, `status: ongoing|completed`, `stack[]`, `results[]{label,value,kind:'achieved'|'target'}`, `resultsVerified`, `figures[]` (image keys with `category`, `aspect`, `caption`, `credit`), `relatedPublicationIds[]`, `featured`, `verified`. Body sections (Markdown H2s): **Summary → Problem → Approach → Results → Interpretability / Validation → Limitations & Next Steps**.

**experience**, **teaching**, **education**, **awards**, **projects**, **skills**, **gallery** — fields as visible in Appendix A (each with `verified`).

## 6.2 Derived values (never hand-typed)
Counts shown on the site (e.g. "10 conference papers", "3 book chapters", "2 journal manuscripts") are **computed from the publications collection** in `src/lib/publications.ts` so they can never drift from the list. Same for "latest year", per-topic counts, and first-author count.

## 6.3 Controlled topic vocabulary
`Artificial Intelligence`, `Machine Learning`, `Deep Learning`, `Medical Image Analysis`, `Explainable AI (XAI)`, `Vision Transformers`, `AI for Healthcare`, `Trustworthy AI`, `3D Segmentation`. Schema rejects unknown topics (owner can extend the list in one place, documented).

---

# 7. PAGES & ROUTES

| Route | Purpose |
|---|---|
| `/` | Home — the 10-second pitch |
| `/research` and `/research/[slug]` | Research overview + deep-dive case studies |
| `/publications` | Searchable, filterable publication browser |
| `/experience` | Education · Research & professional experience · Teaching & mentoring · Awards & certifications · Skills (sticky in-page sub-nav) |
| `/projects` | Academic & engineering projects |
| `/gallery` | Figures, scans, diagrams, certificates, event photos with categories + lightbox |
| `/cv` | Print-optimised web CV + "Download PDF" |
| `/research-statement` | Long-form research statement & future plans (editable Markdown) — valuable for PhD applications |
| `/contact` | Contact details, copy-email button, optional external form link, links to Scholar/ORCID/LinkedIn/GitHub |
| `/404` | Friendly, on-brand, with links back |

Global: skip-link, header, footer (affiliation · email · scholarly links · "Last updated" · "Back to top"), scroll-progress, consistent page titles & descriptions.

---

# 8. SECTION-BY-SECTION SPECIFICATION

For each section below: build it as its own component, give it the standard comment block (§12), and document it in `docs/04_SECTION_MAP.md`.

## 8.1 Home (`/`)
1. **Hero** — name (H1, serif), role & institution line, positioning sentence, 3 CTA buttons (*View Publications*, *Download CV*, *Contact*), small row of scholarly link icons (Scholar, ORCID, LinkedIn, GitHub — hide any that are empty), availability pill if set. Right side: scan-viewport panel with portrait/featured image (image key `portrait` or `heroScan`, owner-selectable via a single config flag).
2. **StatsBento** — 4–6 bento tiles with count-up: Conference Papers · Journal Manuscripts · Book Chapters · MSc average · BSc CGPA · (optional) Years in research. Values derived/pulled from data; tiles that lack data are hidden.
3. **Research Spotlight** — "Current focus" (pancreatic CT analysis & 3D segmentation) with the **Before/After slider** (raw CT ↔ predicted mask) and 3–4 highlight bullets.
4. **Research Interests** — chip cloud linking to filtered publications.
5. **Featured Publications** — 3–4 cards where `featured: true`, with "View all" link.
6. **Selected Research Case Studies** — 3 `ResearchCard`s.
7. **Journey Timeline preview** — education + current placement, link to `/experience`.
8. **Venues strip** — text-only "Published / accepted at": IEEE QPAIN · IEEE ICCIT · IEEE ICECTE · PECCII · Frontiers (FCDS) · Wiley (Engineering Reports) · Bentham Science. Plain text styling only — **no third-party logos**.
9. **CTA band** — "Interested in collaboration or supervision opportunities?" → Contact / CV.

## 8.2 Research index & case studies
- Index: grid of `ResearchCard`s with status badge (Ongoing / Completed), role, period, stack chips, thumbnail.
- Case study page: header (title, subtitle, role, period, status), **jump-links**, sections (Summary, Problem, Approach as numbered `MethodSteps`, Results as `ResultsGrid`, Figures via `FigureGallery`, Related publications, Limitations & next steps), prev/next case-study navigation.
- `ResultsGrid` shows `kind:'target'` values with a "Target" label and `kind:'achieved'` normally. Unverified results follow §8.8.

## 8.3 Publications (`/publications`) — flagship feature
- Pre-render **all** entries in HTML (SEO + no-JS). Enhance with JS:
  - **Instant search** (title, venue, authors, topics), debounced, with result count announced via `aria-live`.
  - **Filters:** type (Conference / Journal / Book chapter), year, status, topic chips; multi-select; "Clear all"; state reflected in the **URL query string** so filtered views are shareable.
  - **Sort:** newest / oldest / venue.
  - **Card:** serif title, authors (owner in bold, markers for equal contribution if any), venue · year · pages, **StatusPill**, topic chips, thumbnail, buttons: **DOI**, **PDF**, **Code**, **BibTeX**, **Abstract** (accessible disclosure). Buttons render only if the data exists.
  - **BibTeX dialog** (native `<dialog>`): monospace block, **Copy** button with "Copied ✓" feedback, download `.bib`, focus management.
  - **Right rail (desktop, sticky):** PublicationStats (derived), topic filter list, "Export all as .bib" button (generated at build time).
- Group headings by year when sorted by newest.
- Add `ScholarlyArticle` JSON-LD **only** for items with a real DOI.

## 8.4 Experience (`/experience`)
Sticky sub-nav with scroll-spy: **Education · Experience · Teaching · Awards · Skills**.
- **Education:** two `EducationCard`s (MSc in progress; BSc with thesis title and its IEEE publication linked to the publication entry).
- **Experience:** vertical timeline (`TimelineItem`) with org, role, location, period, type badge (Research / Professional), 2–5 bullets.
- **Teaching & Mentoring:** `TeachingCard`s with optional photo (guest lecture).
- **Awards & Certifications:** `AwardCard`s with optional certificate image opening in the lightbox.
- **Skills:** `SkillGroup`s as labelled chip groups (no fake percentage bars — they undermine credibility).

## 8.5 Projects (`/projects`)
`ProjectCard`s: title, context (module/course), description, bullets, stack chips, optional links. Filter by tag (Databases, Networking, Big Data, Web).

## 8.6 Gallery (`/gallery`)
Category tabs: **All · Segmentation · Architecture · XAI · Results · Talks & Events · Certificates**. Masonry-like responsive grid honouring `aspect`. Click → **Lightbox** (native `<dialog>`): next/prev (buttons + ← →), `Esc`, zoom (wheel/pinch/button), caption + credit, focus trap, swipe on touch. Deep-link via `#figure-id`.

## 8.7 CV (`/cv`), Contact (`/contact`), Research Statement
- **CV:** clean two-column web CV generated from the same content files (education, experience, publications list in a standard citation style, teaching, awards, skills). **Print stylesheet** produces a tidy A4 (no nav, no shadows, black on white, links expanded with URLs optional). Buttons: Download PDF, Print.
- **Contact:** email (with copy button), location, phone **only if** `showPhoneOnSite: true`, scholarly links, optional `PUBLIC_CONTACT_FORM_URL` embedded as a button ("Open contact form"). No backend form.
- **Research Statement:** Markdown body (demo text clearly marked `verified:false`) with sections *Research vision · Current work · Methods & strengths · Future directions · Why doctoral study*. Table of contents on the side.

## 8.8 Draft-content system (integrity guard)
Every record with `verified: false` (or `resultsVerified: false`) must:
- show a small **`DraftBadge`** ("Demo — verify") **only** in dev and in non-production deployments (`import.meta.env.DEV` or an env flag such as `PUBLIC_SHOW_DRAFT=true`); in production builds the badge is hidden but `npm run check:content` lists every such item;
- never be rendered as an *achieved* numerical result in production unless the owner flips the flag.
Document this clearly in `docs/09_PRE_SUBMISSION_CHECKLIST.md`.

---

# 9. COMPONENT QUALITY BAR

- Semantic HTML (`header`, `nav`, `main`, `section` with headings, `article` for cards, `figure/figcaption`, `dl` for metadata, `time`).
- One `<h1>` per page, no skipped heading levels.
- All interactive elements keyboard-operable with visible 2px accent focus ring (offset 2px), min target size 44×44 on touch.
- Every image has meaningful `alt` (decorative ones `alt=""`), explicit `width/height` (or aspect-ratio) to prevent CLS, `loading="lazy"` except the LCP image (`fetchpriority="high"`).
- Dialogs: native `<dialog>`, focus returns to trigger, `aria-labelledby`.
- Motion: ≤ 600 ms, ease-out, disabled/reduced for `prefers-reduced-motion`.
- No component imports more than it needs; ship **< 60 KB of JS total** on the home page (excluding images).

---

# 10. KEY INTERACTION SPECS (implementation notes)

**Theme script (head, blocking, tiny):** read `localStorage['theme']` (try/catch) → fall back to `matchMedia('(prefers-color-scheme: dark)')` → set `document.documentElement.dataset.theme`. Listen to system changes only when the stored value is `system`. Re-run on the view-transition "after swap" event.

**Before/After slider:** two stacked images in one aspect-ratio box; a visually-hidden-but-focusable `<input type="range">` controls clip position (so it is keyboard- and screen-reader-accessible, `aria-label="Comparison position"`); pointer drag on the handle; labels "Before: Raw CT" / "After: Segmentation"; works on touch; if either image fails, show `ImageFallback`.

**Publication browser:** server-render the full list; client script toggles `hidden` on cards and updates `aria-live` count. Keep state in `URLSearchParams`; restore on load. Never remove cards from the DOM (so Ctrl+F and SEO still work when no filter is active).

**Lightbox:** one shared `<dialog>` per page; figures opt in with `data-lightbox` + `data-figure-id`; preload next/prev; restore scroll & focus on close.

**Count-up:** runs once when visible; final value is already in the HTML (no-JS and reduced-motion show the final number immediately).

**Copy buttons:** `navigator.clipboard` with fallback; announce "Copied" via `aria-live="polite"`.

---

# 11. IMAGE STRATEGY & CENTRAL REGISTRY (critical for the owner)

## 11.1 Rules
- **Single source of truth:** `src/data/images.ts` exports `IMG`. Components and content files refer to images **only by key** (e.g. `portrait`, `pancreaticCtScan`). Changing one line there changes the image everywhere.
- Each registry entry: `{ src, alt, width, height, aspect: 'square'|'wide'|'tall'|'portrait', credit?, demo: boolean }`. `src` accepts a remote URL **or** a local path like `/assets/my-photo.jpg`.
- **Demo images (`demo: true`) so the site looks complete today:**
  - *Human photos* (portrait, lecture, conference): license-compatible stock (Unsplash/Pexels). Pick professional, neutral images. **Verify each URL returns 200** with `scripts/check-images.mjs`.
  - *Scientific slots* (CT scan, segmentation mask, architecture diagrams, Grad-CAM, confusion matrices, ROC curves, SHAP plots, flowcharts, certificates): **do not use unrelated stock photos pretending to be results.** Generate clean **local SVG placeholders** (in `public/demo/`) that look like the thing (grid + crosshair for scans, block diagrams for architectures, axes for charts, certificate frame) and carry a subtle "DEMO" corner mark. They must look polished in both themes.
- A missing/broken/empty `src` must never show a broken-image icon: render `ImageFallback` (clean diagnostic placeholder with crosshair + caption "Image coming soon").
- In dev/non-production, `demo: true` images show a small "DEMO IMAGE" tag (same mechanism as `DraftBadge`).
- If remote demo images are used with `astro:assets`, allow-list the domains in config; otherwise use plain `<img>` with explicit sizes.
- Provide optimised responsive output (`srcset`, WebP/AVIF) for local images where Astro supports it.

## 11.2 Registry entry template (follow exactly for every key)

```ts
/**
 * ═════════════════════════════════════════════════════════════
 * [IMAGE] portrait — Primary Profile Photo / Author Portrait
 * ───────────────────────────────────────────────────────────── 
 * Displayed On : Home Hero, About Card, CV Page
 * Requirements : Formal academic headshot, balanced lighting, centered
 * Dimensions   : 800×800 px (1:1) · Format: .jpg/.webp · ≤ 300 KB
 * How to Edit  : 1) Save photo to public/assets/portrait.jpg
 *                2) Set src: "/assets/portrait.jpg" below and set demo: false
 * ═════════════════════════════════════════════════════════════
 */
portrait: {
  src: "https://…demo…",   // ← [MANUAL-UPDATE] Insert your verified photo link
  alt: "Portrait of <Name>",
  width: 800, height: 800, aspect: "square",
  demo: true,                // ← Set to false once verified
},
```

## 11.3 Required keys (and recommended sizes)

| Key | Content | Size |
|---|---|---|
| `portrait` | Professional headshot | 800×800 |
| `ogImage` | Social share banner (also copy to `public/og/og-default.jpg`) | 1200×630 |
| `heroScan` | Optional featured scan for hero viewport | 1200×900 |
| `pancreaticCtScan` | Axial abdominal CT slice | 1000×1000 |
| `pancreaticSegmentationMask` | Predicted segmentation overlay (same framing as above — needed for Before/After) | 1000×1000 |
| `pancreaticVitArchitecture` | Swin-3D / ViT UNet architecture diagram | 1600×900 |
| `pancreatic3dMesh` | 3D surface render | 1000×1000 |
| `guavaArchitecture` · `guavaGradcam` · `guavaConfusionMatrix` | Guava leaf paper figures | 1600×900 · 1000² · 1000² |
| `appleNetArchitecture` · `appleNetAttentionHeatmap` | AppleNet / attention figures | 1600×900 · 1000² |
| `tomatoNetDiagram` · `mangoNetSaArchitecture` | Pipeline / spatial-attention diagrams | 1600×900 |
| `heartStrokePipeline` · `heartStrokeRocCurves` | Heart & stroke paper | 1600×900 · 1000² |
| `aidsEnsembleFramework` · `aidsThresholdOptimization` | Ensemble flow · threshold curves | 1600×900 · 1000² |
| `liverStackingPipeline` · `liverShapSummary` | Liver stacking pipeline · SHAP plot | 1600×900 · 1000² |
| `skinNetArchitecture` · `parkinsonsVotingWorkflow` | Journal papers | 1600×900 |
| `scheduling5gFlowchart` · `schedulingThroughputComparison` | ICCIT paper figures | 900×1200 · 1200×800 |
| `cccuGuestLecturePhoto` · `conferencePresentationQpain` | Event photos | 1600×900 |
| `ccnaCertificate` · `ieeeIccitCertificate` | Certificates | 1600×1100 |
| `cccuPlacementBadge` | Placement badge/ID (optional) | 800×800 |

`docs/03_IMAGE_GUIDE.md` must reproduce this table in Bengali with a "which page/section uses it" column **generated from actual usage** (grep your own code to make it accurate), plus hosting options (local `public/assets/` vs. cloud), compression advice, and a **"before you submit" image checklist** (copyright/permission for figures from published papers, patient-data anonymisation for any scan, no identifiable patient information).

---

# 12. COMMENT CONVENTION (the owner relies on this — apply everywhere)

Goal: while scrolling any file, the owner instantly sees **what this block is** and **what to change**. Use these tags consistently so `Ctrl+F` works:

| Tag | Meaning |
|---|---|
| `[SECTION]` | A page section (Hero, Research Cards, Publications list…) |
| `[CARD]` | A repeating card type (ResearchCard, PublicationCard, AwardCard…) |
| `[IMAGE]` | An image slot (and its registry key) |
| `[TEXT]` | Copy the owner is expected to edit |
| `[LINK]` | A URL the owner must provide (Scholar, ORCID, GitHub…) |
| `[DATA]` | Where the data for this block comes from |
| `[MANUAL-UPDATE]` | Anything the owner **must** replace before submitting |
| `[VERIFY]` | Demo/unverified fact — confirm before publishing |

## 12.1 Templates (Bengali first, short English gloss)

**In `.astro` templates**
```astro
{/* ═══════════════════════════════════════════════════════════════
    [SECTION] Research Cards — Research Case Studies Section (Home)
    [DATA]    src/content/research/*.md (featured: true)
    [CARD]    ResearchCard — Each card represents a case study
    [MANUAL-UPDATE] To add cards: create a new .md file (docs/02_CONTENT_GUIDE.md §Research)
    ═══════════════════════════════════════════════════════════════ */}
<section id="research-cards"> … </section>

{/* [CARD:ResearchCard] Research card — Image: thumbnail key, Text: title/subtitle */}
<ResearchCard … />

{/* [IMAGE] key: portrait · 800×800 · Edit: src/data/images.ts → portrait */}
<Figure image={IMG.portrait} … />
```

**In YAML content files**
```yaml
# ───────────────────────────────────────────────────────────────
# [CARD] Publication — One paper per block. To append new papers,
# duplicate this template at top and update attributes.
# [VERIFY] Leave doi / abstract empty if provisional; set verified: false.
# ───────────────────────────────────────────────────────────────
- id: shouvo-guava-leaf-2026
  title: "…"
```
Every content file starts with a **file header comment**: purpose, how to add a new item (copy-paste template), field meanings, allowed values (enums), common mistakes.

**In TypeScript / CSS**
```ts
// [DATA] Derived metric calculation dynamically computed from publications
```
```css
/* [DESIGN] Design token palette — update here to modify global site theme */
```

## 12.2 Coverage requirements
- A comment block **before every `<section>`**, **before every distinct card type** (first instance explains it; repeated instances in loops get a one-line `[CARD:Name]`), **at every `[IMAGE]` usage**, at every external `[LINK]` placeholder.
- Every component file begins with a header: *Purpose · Props · Data source · Where used · How to edit*.
- Comments are accurate (they match the code) and updated when code changes. A final automated sweep (§14) greps for sections/cards without a preceding tag.

---

# 13. DOCUMENTATION DELIVERABLES (create in `docs/`, **Bengali-first, plain language, English technical terms OK**)

Write for a smart non-expert. Short paragraphs, numbered steps, copy-paste snippets, "before → after" examples, and **screenshots described in text** (or real screenshots if your environment can capture them).

| File | Must contain |
|---|---|
| `00_START_HERE.md` | What this site is · project map · how to run (`npm install`, `npm run dev`) · "Your first 5 updates" (name/photo, CV PDF, one paper, links, theme colour) · where to go next |
| `01_PROJECT_STRUCTURE.md` | Annotated folder tree; "if you want to change X, open file Y" lookup table |
| `02_CONTENT_GUIDE.md` | Every content file: purpose, every field (type, required?, example, effect on UI), copy-paste templates to **add / edit / remove** a publication, research case study, experience, teaching item, award, project, skill, gallery figure. Include the draft/verified system |
| `03_IMAGE_GUIDE.md` | See §11.3 — full registry table, hosting options, optimisation, ethics/permissions checklist |
| `04_SECTION_MAP.md` | Table: **Page → Section → Component file → Data source → Comment tag to search** (so the owner can `Ctrl+F [SECTION] Hero`) |
| `05_DESIGN_SYSTEM.md` | Design rationale (§2.3) · tokens table · how to change accent colour/fonts/spacing · contrast pairs verified · component gallery notes |
| `06_FEATURES_GUIDE.md` | How theme toggle, publication search/filters, BibTeX export, lightbox, before/after slider work and how to customise each |
| `07_DEPLOY_VERCEL.md` | Step-by-step: push to GitHub → import in Vercel → framework preset → env vars → custom domain → redeploy after edits → rollback. Include `PUBLIC_SITE_URL` |
| `08_SEO_AND_SHARING.md` | Titles/descriptions per page, OG image, JSON-LD, sitemap, how to check with social debuggers & Google Search Console, adding Google Scholar/ORCID |
| `09_PRE_SUBMISSION_CHECKLIST.md` | See Appendix B |
| `10_TROUBLESHOOTING.md` | Common build errors (schema validation messages explained), image not showing, theme flash, Vercel 404, how to reset a file from git |
| `TECH_DECISIONS.md` | See §2.2 (English) |
| `CHANGELOG.md` | One entry per Phase, plus a template for the owner's future edits |
| `README.md` (root) | 1-screen overview with links to `docs/` |

Also: `src/content/README.md` (editing guide next to the data) and a header doc-comment in every script.

---

# 14. SCRIPTS, QUALITY GATES & TOOLING

`package.json` scripts (names fixed):
- `dev`, `build`, `preview`
- `check` → `astro check` (zero errors required)
- `check:content` → runs `scripts/check-content.mjs` in **warn mode**; `check:content:strict` → same but **exit code 1** if anything remains
- `check:images` → HEAD-requests every remote URL in the registry; reports failures
- `prebuild` → runs `check:content` (warn only; must never block the Vercel build)

**`check-content.mjs` must report, grouped by file with line numbers:** any `REPLACE_`/`TODO`/`PLACEHOLDER` tokens · every item with `verified: false` / `resultsVerified: false` · registry entries with `demo: true` · empty scholarly links · DOIs that don't match the `10.xxxx/…` pattern · publications missing `abstract`/`doi`. End with a one-line summary and a pointer to `docs/09_PRE_SUBMISSION_CHECKLIST.md`.

**Also run before finishing:** build with no warnings you can fix · HTML validity spot-check · link check (internal links all resolve) · axe-style accessibility pass (keyboard-only walk-through of every page, both themes) · Lighthouse mobile ≥ 95 ×4 on `/`, `/publications`, `/research/[slug]`, `/cv` · print preview of `/cv` · test at 360 / 768 / 1280 px · test with JS disabled (content visible, nav usable) · test `prefers-reduced-motion` · test both themes on every page. Record results in `CHANGELOG.md`.

---

# 15. SEO, SHARING & VERCEL

- `<SEO>` component: unique `<title>` & meta description per page, canonical URL (from `PUBLIC_SITE_URL`, with Vercel fallback), Open Graph + Twitter card (uses `ogImage`), `theme-color` for both themes.
- **JSON-LD:** `Person` (name, jobTitle, affiliation, email, `sameAs` = only non-empty scholarly links, `knowsAbout` = research interests); `ScholarlyArticle` only for items with a real DOI.
- `@astrojs/sitemap` (or Astro 7 equivalent) + `robots.txt`. `favicon.svg` (monogram) + `apple-touch-icon`.
- `vercel.json`: `cleanUrls: true`, `trailingSlash` consistent with Astro config, long-cache for hashed assets and `/assets`, short-cache for HTML, security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`/frame-ancestors). Do **not** add a strict CSP that would break the inline theme script or remote demo images unless you also handle them (hash/nonce) — document the choice.
- Confirm the exact Vercel build settings from Astro 7 docs (preset, build command, output dir) and write them in `docs/07_DEPLOY_VERCEL.md`.

---

# 16. EXECUTION PLAN (phases) & REPORTING

Work in these phases. **After each phase:** (1) `npm run check` and `npm run build` pass, (2) the related docs are written/updated, (3) print a short report: *what was built · files created · decisions · open issues*. Then continue to the next phase automatically unless the environment requires confirmation or you hit a real blocker.

1. **Foundation** — Step 0 research → `TECH_DECISIONS.md`; scaffold Astro 7; config; tokens; fonts; base layout; theme system; Header/Footer/SkipLink/ScrollProgress; `README`, `00_START_HERE`, `01_PROJECT_STRUCTURE`, `05_DESIGN_SYSTEM` (initial).
2. **Content layer** — collections + Zod schemas; seed all Appendix A data with correct `verified` flags; `lib/publications.ts` derived values; image registry + local SVG demo placeholders + `ImageFallback`; `check-content`, `check-images`; `02_CONTENT_GUIDE`, `03_IMAGE_GUIDE`, `src/content/README.md`.
3. **Home page** — all §8.1 sections; `04_SECTION_MAP` (initial).
4. **Publications** — full browser, BibTeX dialog, stats rail, `.bib` export; `06_FEATURES_GUIDE` (part).
5. **Research + Experience + Projects** — index, case-study template, timeline, teaching, awards, skills, projects.
6. **Gallery, CV, Contact, Research Statement, 404** — Lightbox, Before/After (if not yet), print CSS.
7. **SEO · a11y · performance · Vercel** — §14/§15 gates; `07`, `08`, `09`, `10` docs.
8. **Polish & final QA** — comment-coverage sweep (§12.2), docs proofreading, final audit results in `CHANGELOG.md`, final report.

**Final report (end of Phase 8) must include:** how to run & deploy in 5 lines · list of every `[MANUAL-UPDATE]` the owner must do · output of `check:content` · Lighthouse scores · known limitations.

---

# 17. DEFINITION OF DONE

- [ ] `npm run build` succeeds; `npm run check` has 0 errors
- [ ] All routes in §7 exist, are linked, and render in light **and** dark
- [ ] No flash of wrong theme on reload or navigation
- [ ] Publications search/filter/sort/BibTeX work; URL state shareable; works (statically) without JS
- [ ] Lightbox and Before/After are keyboard-accessible
- [ ] Every image slot uses the registry; no broken images; demo content clearly flagged in non-production
- [ ] No hard-coded personal data inside components
- [ ] Comment convention applied everywhere (§12.2); all docs in §13 exist and are accurate
- [ ] Lighthouse mobile ≥ 95 (Performance, Accessibility, Best Practices, SEO) on key pages
- [ ] `/cv` prints cleanly on A4
- [ ] `vercel.json`, sitemap, robots, OG tags present
- [ ] `check:content` output reviewed and listed in the final report

---


# APPENDIX A — CONTENT SEED DATA

**Tag legend:** `[CV]` = taken from the owner's CV material (the owner must still re-confirm before submission) · `[DRAFT]` = demo placeholder written only so the site looks complete. Every `[DRAFT]` item → `verified: false`.
**Rule:** do not add facts beyond this appendix. Where a field is absent here (e.g. DOI, PDF link), leave it empty so its button is hidden — never invent it.

## A1. Profile `[CV]`
- Name: **Nazmul Hasan Shouvo** (owner's exact name string used for author highlighting)
- Current role: Research Assistant (Placement) & MSc Data Intelligence student
- Institution: Canterbury Christ Church University (CCCU), United Kingdom · Location: Canterbury, Kent, United Kingdom
- Email: mdnazmulhasanshouv@gmail.com · Phone: +44 7757 738008 (`showPhoneOnSite: false`)
- Links: LinkedIn `https://www.linkedin.com/in/nazmul-hasan-shouvo` `[DRAFT — confirm]`; Google Scholar, ORCID, GitHub **empty** (`[LINK]` placeholders — hide icons until filled)
- Positioning line `[CV]`: "Building explainable, clinically meaningful AI for medical image analysis."
- Headline credentials `[CV]`: 10 accepted international peer-reviewed publications · 3 accepted book chapters (Bentham Science) · 2 journal manuscripts (1 accepted/forthcoming, 1 under review) · MSc average 70% (Distinction, ongoing) · BSc CGPA 3.84/4.00
- Research interests `[CV]`: Artificial Intelligence; Machine Learning; Deep Learning; Medical Image Analysis; Explainable AI (XAI); 3D Medical Image Segmentation; Vision Transformers; AI for Healthcare; Trustworthy AI
- Current focus `[CV]`: **Pancreatic CT Image Analysis & 3D Segmentation** — AI-based healthcare and medical imaging research with emphasis on pancreatic CT image analysis and 3D medical image segmentation using deep learning and Vision Transformer–based approaches; medical image and data preprocessing; model development, evaluation, and publication-oriented research.
- Availability line `[DRAFT]`: "Open to PhD and research opportunities" (editable, may be emptied)
- Short bio `[DRAFT]` (≤ 220 chars; write in neutral academic tone from the facts above only)
- References: "Available on request"

## A2. Education `[CV]`
1. **MSc Data Intelligence with Placement** — CCCU, UK · 2025/26 – present · Current average 70% (Distinction), ongoing. Modules: Big Data Database Development, Data in Action, Applied Machine Learning, Healthcare Informatics `[DRAFT module list — confirm]`.
2. **BSc in Computer Science & Engineering** — IUBAT (International University of Business Agriculture and Technology), Bangladesh · Graduated Fall 2023 · CGPA 3.84/4.00 · Thesis: *An Efficient Scheduling Algorithm Based on Buffer Status and Queue Length to Satisfy Real-Time Users in 5G Networks* → published at **IEEE ICCIT 2024, pp. 2014–2019** (link to publication entry `chayon-5g-scheduling-2024`).

## A3. Experience `[CV]` (bullets are `[DRAFT]` wording — confirm)
| Role | Organisation | Location | Period | Type |
|---|---|---|---|---|
| Research Assistant — Placement | Canterbury Christ Church University | Canterbury, Kent, UK | 2026 – Present | research |
| Student Research Assistant | Miyan Research Institute, IUBAT | Dhaka, Bangladesh | Jan 2023 – Sep 2023 | research |
| Network Support Engineer | Jamuna Television Ltd | Dhaka, Bangladesh | Jan 2024 – Feb 2024 | professional |
| IT & Networking Intern | Jamuna Television Ltd | Dhaka, Bangladesh | Sep 2023 – Dec 2023 | professional |

Bullet themes to write (2–4 each, factual, no invented numbers): *CCCU* — applied AI/deep-learning research on medical imaging & healthcare data; literature review; dataset curation/preprocessing; model development & evaluation; paper writing. *Miyan* — literature reviews; data collection & benchmark recording; support for IEEE conference paper drafting. *Jamuna TV (support engineer)* — 24/7 network operations in a live-broadcast environment; monitoring and troubleshooting. *Jamuna TV (intern)* — assisting administrators with server-room hardware, cabling, subnetting, troubleshooting.

## A4. Teaching & mentoring `[CV]`
- **Guest Lecturer / Invited Speaker** — CCCU · March 2026 · invited lecture on applied AI & data intelligence in healthcare (photo slot `cccuGuestLecturePhoto`).
- **Teaching Assistant** — CCCU · 2026 – Present · lab support for Python programming, linear algebra for ML, applied probability.
- **Academic Mentor** — IUBAT · Jul 2022 – Sep 2022 · peer mentoring in data structures & programming.

## A5. Awards & certifications `[CV]`
- Cisco Certified Network Associate (**CCNA**) — Cisco Systems (certificate slot `ccnaCertificate`)
- Author/co-author of **10 accepted international peer-reviewed publications** — IEEE & international conferences, 2024–2026 (photo slot `conferencePresentationQpain`)
- Author/co-author of **3 accepted book chapters** — Bentham Science Publishers, in press / 2026
- **Published research paper at IEEE ICCIT 2024** (27th ICCIT, December 2024) (certificate slot `ieeeIccitCertificate`)
- **Appointed Research Placement Researcher** — CCCU, 2026 – present

## A6. Publications `[CV]` for title / authors / venue / year / month / pages / type / status. DOI, PDF, code: **leave empty** except where noted. `summary` lines are `[DRAFT]` one-sentence descriptions (no numeric claims) → `verified: false`. Owner = **Nazmul Hasan Shouvo**.

**Conference (10)**
1. *Multi-Class Heart Disease and Stroke Risk Classification Framework* — N. H. Shouvo, A. Rakin, M. S. Alom, et al. — **AI-Scientist-UK 2025** — 2025 — published — topics: AI, ML, AI for Healthcare, Trustworthy AI.
2. *Class-Weighted ResNet50 for Robust Guava Leaf Disease Classification under Real-Field Conditions* — **N. H. Shouvo**, M. S. Alom, F. A. Jibon, A. Islam, W. H. Hridoy, A. Rakin, M. I. Ahamed — **IEEE QPAIN 2026**, April 2026, pp. 1–6 — accepted — Deep Learning, XAI. *(first author — mark `featured: true`)*
3. *Robust AIDS Disease Classification Using a Threshold-Optimized Weighted Ensemble and Class-Balanced Machine Learning* — A. Rakin, **N. H. Shouvo**, M. S. Alom, M. I. Ahamed, W. H. Hridoy, I. Al Mamoon, M. A. Awal — IEEE QPAIN 2026, April, pp. 1–6 — accepted — ML, AI for Healthcare, Trustworthy AI.
4. *AppleNet-B1: Explainable Auto-Reweighted EfficientNet for Apple Disease Detection* — M. S. Alom, A. Al Rafee, A. Rakin, F. A. Jibon, **N. H. Shouvo**, A. H. M. Kamal, M. I. Ahamed — IEEE QPAIN 2026, April, pp. 1–6 — accepted — Deep Learning, XAI, Trustworthy AI.
5. *TomatoNet-R50: A ResNet50-Based Deep Learning Architecture for the Detection of Tomato Leaf Disease* — M. S. Alom, M. I. Ahamed, F. A. Jibon, **N. H. Shouvo**, A. H. M. Kamal, A. Rakin — IEEE QPAIN 2026, April, pp. 1–6 — accepted — Deep Learning.
6. *MangoNet-SA: A Lightweight MobileNetV2-Based Spatial Attention CNN for Robust Mango Leaf Disease Classification* — M. S. Alom, A. Rakin, F. A. Jibon, **N. H. Shouvo**, A. H. M. Kamal, M. I. Ahamed — IEEE QPAIN 2026, April, pp. 1–6 — accepted — Deep Learning, XAI.
7. *Explainable Eggplant Leaf Disease Classification Using Vision Transformers and Convolutional Neural Networks* — A. Rakin, M. S. Alom, M. I. Ahamed, **N. H. Shouvo**, I. Al Mamoon, M. A. Awal — IEEE QPAIN 2026, April, pp. 1–6 — accepted — Vision Transformers, Deep Learning, XAI.
8. *Explainable Stacking Machine Learning Ensemble Model for Liver Disease Prediction* — O. Haque, M. S. Alom, F. A. Jibon, S. K. Gain, M. M. Alum, M. A. A. Linkon, **N. H. Shouvo** — **IEEE ICECTE 2026**, January 2026, pp. 1–6 — accepted — ML, XAI, AI for Healthcare.
9. *Explainable Liver Disease Prediction Using Stacking Ensemble Machine Learning* — **N. H. Shouvo**, A. Rakin, M. S. Alom, et al. — **PECCII 2026** — 2026 — accepted (presented; proceedings pending) — ML, XAI, AI for Healthcare.
10. *An Efficient Scheduling Algorithm Based on Buffer Status and Queue Length to Satisfy the Real-Time Users in 5G* — M. H. R. Chayon, **N. H. Shouvo**, M. A. Al Mamun — **IEEE ICCIT 2024** (27th ICCIT), December 2024, pp. 2014–2019 — published — DOI `10.1109/ICCIT64658.2024.10892014` `[DRAFT — confirm on IEEE Xplore before showing]`.

**Journal (2)**
11. *SkinNet: Explainable Lightweight CNN Model for Skin Disease Classification* — M. A. Awal, A. Rakin, M. S. Alom, S. S. Akhi, **N. H. Shouvo**, M. I. Ahamed, I. A. Mamoon, U. K. Das — **Frontiers in Complex Dynamical Systems (FCDS)** — 2026 — accepted / forthcoming.
12. *Variation-Based Ensemble Learning for Parkinson's Disease Prediction Using Weighted Voting and Stacking Models* — M. I. Ahamed, S. S. Akhi, **N. H. Shouvo**, A. Rakin, M. S. Alom — **Engineering Reports (Wiley)** — 2026 — **under review**. *(Venue impact-factor text is `[DRAFT]` — omit unless confirmed.)*

**Book chapters (3) — Bentham Science Publishers, 2026, in press** (co-author lists unknown → use `authors: ["Nazmul Hasan Shouvo", "et al."]` and `[VERIFY]` the real list)
13. *Energy Aware Machine Learning Frameworks for Sustainable Environmental Applications*
14. *Artificial Intelligence in Water Pollution Monitoring and Management: Methods, Challenges, and Future Directions*
15. *Carbon Conscious Artificial Intelligence: Environmental Impact, Ethical Concerns, and Sustainable AI Frameworks*

BibTeX: auto-generate at build time from the fields above (don't hand-type); mark generated entries `verified: false` until DOI/pages are confirmed.

## A7. Research case studies (Markdown files) — titles/roles `[CV-derived]`, **all body text, methods and numbers `[DRAFT]`**
1. **`pancreatic-ct-segmentation`** — *3D Pancreatic CT Image Analysis & Volumetric Segmentation* · 2025/26 – present · role: Placement Researcher · **ongoing** · stack: Python, PyTorch, MONAI, Vision Transformers, SimpleITK, 3D Slicer. Write a Problem/Approach/Next-Steps narrative at a *general* level (small organ, class imbalance, 3D context, interpretability) with **no unverifiable specifics**. Results: show `kind: target` placeholders only, e.g. "Dice (DSC) — target: *to be added*". `resultsVerified: false`. Uses the Before/After slider (`pancreaticCtScan` ↔ `pancreaticSegmentationMask`).
2. **`class-weighted-resnet-xai`** — *Class-Weighted ResNet50 with Grad-CAM Explanations* · 2025–2026 · role: First author · completed · related: `shouvo-guava-leaf-2026`.
3. **`threshold-optimized-ensembles`** — *Threshold-Optimized Weighted Ensembles for Clinical Cohort Staging* · 2025–2026 · role: Co-author · completed · related: AIDS paper.
4. **`explainable-leaf-disease-suite`** — *Explainable Compound-Scaled & Attention-Based CNN/ViT Models* (AppleNet-B1, TomatoNet-R50, MangoNet-SA, Eggplant ViT) · 2025–2026 · role: Co-author · completed.
For 2–4, results tiles use placeholder values such as `XX.X%` with `kind: achieved`, `resultsVerified: false`, so nothing unverified can be mistaken for a real result.

## A8. Projects `[CV]` (descriptions `[DRAFT]`)
1. **NewsPortal — MongoDB database for a high-volume news CMS** · MSc module *Big Data Database Development* (group lead) · stack: MongoDB, NoSQL, Python, aggregation pipelines, indexing, JSON Schema.
2. **Big Data framework for autonomous-vehicle route optimisation** · MSc module *Data in Action* · stack: Python, Pandas, NetworkX, spatial telematics, Seaborn.
3. **Re-designing & implementing a resilient enterprise office network** · BSc practicum · stack: Cisco Packet Tracer, VLANs, HSRP, ACLs, VLSM.
4. **Dynamic QR code management & verification system** · BSc software-engineering capstone · stack: JavaScript/TypeScript, Node.js, SQL, REST APIs.
Links: leave empty (`[LINK]`) until real repositories exist.

## A9. Skills `[CV]`
- **Programming & languages:** Python (Pandas, NumPy, Scikit-learn), SQL, MongoDB (NoSQL), C, C++, Java, C#, TypeScript
- **AI & data analysis:** Machine Learning; Deep Learning (CNNs, Vision Transformers); Medical Image Analysis (MONAI, SimpleITK); Explainable AI (Grad-CAM, SHAP, LIME); Statistical analysis & hypothesis testing; Data visualisation (Matplotlib, Seaborn); Model evaluation
- **Research methods:** Literature review; scientific documentation; quantitative & qualitative data collection; usability testing & empirical validation; technical paper writing (LaTeX / Overleaf)
- **Data handling:** DICOM & NIfTI processing; data cleaning, normalisation & imputation; JSON/CSV/Parquet; pipeline automation & model versioning
- **Tools:** Jupyter, Google Colab, MATLAB, Git & GitHub, VS Code, Cisco Packet Tracer, 3D Slicer, Linux/Bash

## A10. Gallery categories & items
Categories: Segmentation · Architecture · XAI · Results · Talks & Events · Certificates. Build gallery entries from the figure keys in §11.3 (each with caption + credit text marked `[DRAFT]`, e.g. credit "Figure X, <venue>" only when the paper is confirmed).

---

# APPENDIX B — `docs/09_PRE_SUBMISSION_CHECKLIST.md` SPECIFICATION

1. **Identity & Contact:** Name, title, institution, email, phone visibility (`showPhoneOnSite`), Scholar/ORCID/LinkedIn/GitHub links.
2. **Publications Audit:** Title, author ordering, venue, pagination, status (`accepted` vs `published`), official DOI, abstract; set `verified: true`.
3. **Book Chapters:** Full co-author listings and book titles for Bentham Science manuscripts.
4. **Research Case Studies:** Verified benchmark results; set `resultsVerified: true`; retain `target/ongoing` for active works.
5. **Media & Figures:** Replace `demo: true` placeholders; confirm permissions; ensure zero patient identifiers on clinical scans.
6. **CV PDF:** Verified PDF in `public/cv/`; exact match with Web CV.
7. **Research Statement:** Personalized statement tailored to target doctoral labs.
8. **Technical Quality:** `npm run check:content:strict` reports 0 issues; `npm run build` succeeds cleanly; inspect light & dark themes; test mobile viewports.
9. **Deployment:** Set `PUBLIC_SITE_URL`; configure custom domain; test Open Graph previews.
10. **Submission Protocol:** Test in private browser window; submit `https://` URLs; maintain identical link in CV header.

=== END MASTER PROMPT ===
