# Design System Specification — Astro Multilingual Portfolio & Blog

**Source of truth:** this repository at the time of extraction.
**Deliverable:** documentation only. No source file, stylesheet, configuration, asset, or route was changed.
**Verification basis:** **source inspection only.** No browser render, screenshot, Lighthouse run, contrast measurement, or assistive-technology test was performed. Findings are labelled:

| Label | Meaning |
|---|---|
| **Verified from source** | The exact value or behaviour exists in the cited source. |
| **Inferred** | A conclusion derived from CSS cascade, framework defaults, or composition. Not visually confirmed. |
| **Unavailable** | Not present in source or not determinable without rendering. |

Where source classes and global CSS disagree, the **effective** result is marked **Inferred** with the cascade reasoning. Do not treat inferred values as pixel-verified.

**Stack (Verified from source, `package.json`):** Astro `^7.4.4`, React `^19.0.1`, Tailwind CSS `^4.3.3` with `@tailwindcss/vite ^4.3.3`, `lucide-react ^0.546.0`, `three ^0.187.0`, TypeScript `^7.0.2`. `motion ^12.23.24` is installed but no import was found in the audited UI files.

---

## 1. Design Overview

A restrained, editorial, light-only personal portfolio. The page reads as a sheet of warm-neutral paper (`#fafafa`) with near-black ink (`#09090b`), hairline zinc borders, and one large physical object — a 3D lanyard holding an ID card — as the only spectacle. Everything below the hero is a quiet, typographic accordion directory. The blog is a typographic reading surface with a searchable directory and a sticky table of contents.

**Verified from source:**
- Single light theme: `<meta name="color-scheme" content="light">` (`src/layouts/BaseLayout.astro:281`).
- Canvas and ink: `html { color: #09090b; background-color: #fafafa; }` (`src/styles/global.css:12-13`).
- Main column: `max-w-3xl` = 48rem = 768px (`src/layouts/BaseLayout.astro:346`).
- Display face: Plus Jakarta Sans; body face: DM Sans; mono: JetBrains Mono; hero name: Cormorant Garamond (`src/styles/global.css:5-7`, `src/pages/[lang]/index.astro:127-131`).
- Hero object: interactive 3D lanyard, portrait ID card, botanical background (`src/pages/[lang]/index.astro:33-118`).
- Portfolio structure: identity card + ten-section single-expand accordion (`src/components/PortfolioSections.tsx:22-33`).

**Inferred:** The intended impression is “independent engineer with editorial taste”: high whitespace, compact type, almost no colour, physical hero object, dense but calm information architecture.

---

## 2. Brand and Personality

**Verified from source:**
- Brand name string: `Girish Lade.` (trailing period included) in every locale’s `brandName` (`src/i18n/config.ts:148` and equivalents).
- Footer strips the trailing period: `brandDisplay = t.brandName.replace(/\.+$/, '')` (`src/components/Footer.astro:15`).
- Hero name is `Girish Lade` without a period (`src/pages/[lang]/index.astro:115`).
- Product ecosystem name: `LadeStack` (`src/components/PortfolioSections.tsx:226`).
- Voice in source copy: first-person, technical, privacy-first, product-led. Example: “privacy-conscious developer tools, web apps, and LadeStack products” (`src/pages/[lang]/index.astro:30`).

**Personality attributes (Inferred from copy and visual choices):**
- Quiet confidence, not salesy.
- Engineer-first, designer-aware.
- Editorial and bibliographic rather than “startup gradient”.
- Tactile/physical in exactly one place: the lanyard.

**Brand rules to preserve:**
1. The period after “Girish Lade.” is part of the wordmark in navigation and page titles.
2. The footer wordmark removes the period.
3. The hero name uses the serif face and no period.
4. “LadeStack” is always one word, capital L and S.

---

## 3. Design Principles

**Verified from source (expressed as rules the code follows):**

1. **Paper first.** The page background is always `#fafafa`; dark surfaces appear only for code and primary buttons.
2. **One ink accent.** Interactive emphasis is achieved with the zinc ramp, not a hue. Primary action is `zinc-950` (`#09090b`); hover is `zinc-800` (`#27272a`).
3. **Hairlines, not boxes.** Structure comes from `1px` borders at 70–90% opacity, not heavy fills or large shadows.
4. **Type carries hierarchy.** Sizes stay compact (10–40px); weight and family do the work.
5. **One hero spectacle.** The 3D lanyard is the only WebGL element. The rest of the page is static until interaction.
6. **Progressive disclosure.** Ten portfolio sections start collapsed. One section expands at a time.
7. **Content survives translation.** Layouts use wrapping, `min-width: 0`, `overflow-wrap: anywhere`, and flexible grids (`src/styles/global.css:145-150`, `294-308`).
8. **Motion is short and functional.** 75–300ms; no decorative page transitions.
9. **Respect reduced motion.** Animations and transitions are disabled inside the portfolio, and smooth scrolling is turned off (`src/styles/global.css:343-349`).

---

## 4. Color System

### 4.1 Core palette (Verified from source)

| Token / role | Value | Where declared | Use |
|---|---|---|---|
| Canvas | `#fafafa` | `global.css:13`; `BaseLayout.astro:344` | Page background, navbar/footer background |
| Ink | `#09090b` | `global.css:12`; body `text-zinc-900` | Primary text, headings, primary buttons |
| Portfolio ink | `#18181b` | `global.css:141` (`--portfolio-ink`) | Accordion labels, strong values |
| Body prose | `#3f3f46` | `global.css:64` | Markdown paragraphs, lists |
| Prose base | `#27272a` | `global.css:31` | Markdown container, blockquotes |
| Muted | `#71717a` | `global.css:252`, `281`; Tailwind `zinc-500` | Secondary labels, nav inactive, icons |
| Portfolio muted | `#626269` | `global.css:142` (`--portfolio-muted`) | Accordion summaries, 404 body |
| Divider | `#e4e4e7` | `global.css:50`, `111`, `119`; Tailwind `zinc-200` | Hairline borders, inline code border |
| Portfolio divider | `#e6e6e9` | `global.css:143` (`--portfolio-line`) | Identity card, accordion rules |
| Surface | `#f7f7f8` | `global.css:144` (`--portfolio-surface`) | Declared but lightly used |
| Subtle surface | `#f4f4f5` | `global.css:106`, `118`; Tailwind `zinc-100` | Inline code, blockquote, chips |
| Hero paper | `#f4f5f6` | `HeroBackground.astro:19`; gradients | Hero background and centre blend |
| White | `#ffffff` | Cards, buttons, TOC | Raised surfaces |
| Code panel | `#18181b` | `global.css:95` | Fenced code blocks |
| Code text | `#f4f4f5` | `global.css:96` | Code foreground |
| Deep code panel | `#121214` | `[slug].astro:211` | Enhanced code wrapper background |
| Strap black | `#111111` | `index.astro:94` | 3D lanyard strap |
| SSR strap | `#141416` | `index.astro:51` | Pre-hydration strap |
| Silver metal | `#d9dce2` | `Lanyard.jsx:146` | Clamp, ring, eyelet |
| Clamp top | `#e4e7ec` | `index.astro:55` | SSR metal gradient start |
| Clamp middle | `#cfd4dc` | `index.astro:55` | SSR metal gradient middle |
| Clamp end | `#9ea4b0` | `index.astro:55` | SSR metal gradient end |
| Ring stroke | `#c8cdd6` | `index.astro:57` | SSR metal ring |
| Gold option | `#e4b965` | `Lanyard.jsx:147` | Unused alternative metal |
| Graphite option | `#4d4f55` | `Lanyard.jsx:148` | Unused alternative metal |
| Mask black | `#000000` | `HeroBackground.astro:39`, `44` | CSS mask stops |

### 4.2 Alpha and state recipes (Verified from source)

- Selection: `selection:bg-zinc-900 selection:text-white` (`BaseLayout.astro:344`).
- Navbar: `bg-[#fafafa]/90` + `backdrop-blur-md` + `border-zinc-200/70` (`Navbar.astro:27`).
- Language popover: `bg-white/98`, `shadow-zinc-950/5`, `ring-black/5` (`Navbar.astro:121`).
- Identity card: `bg-white/95`, `border-zinc-200/85` (`PortfolioSections.tsx:188`).
- Spotlight tint: `rgba(24, 24, 27, 0.055)` (`SpotlightCard.tsx:13`).
- Hero centre blend: `#f4f5f6` opaque to `rgba(244,245,246,0)` (`HeroBackground.astro:30`, `49`).
- OG grid line: `rgba(255,255,255,0.04)`; frame `rgba(255,255,255,0.08)`; pill fill `rgba(255,255,255,0.06)` (`og/[lang]/[slug].svg.ts:65`, `74`, `84`).
- Focus outline: `#52525b` at `2px`, offset `3px` (`global.css:310-313`).

### 4.3 Colour rules

1. Never introduce a brand hue. There is no primary blue/green/purple.
2. Primary action = `#09090b` background, `#ffffff` text. Hover = `#27272a`.
3. Secondary action = white or `zinc-50` fill, `1px` `zinc-200` border, `zinc-800` text. Hover border = `zinc-400`.
4. Muted text uses `zinc-500` (`#71717a`); the portfolio’s own muted token is `#626269`. Do not mix them inside one component.
5. Dark surfaces are reserved for code. Do not use a dark section background.
6. Borders are never pure `#000`; they are zinc-200 at 70–90% alpha, or `#e6e6e9` in the portfolio.

**Contrast:** not measured. No WCAG conformance claim is made. `#71717a` on `#fafafa`, and `#a1a1aa` placeholder on white, are plausible risk points and must be measured before an accessibility claim.

---

## 5. Typography System

### 5.1 Families (Verified from source)

| Token | Family stack | Loaded weights | Source |
|---|---|---|---|
| `--font-display` | `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif` | 500, 600, 700 | `global.css:5`; `BaseLayout.astro:223` |
| `--font-sans` | `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif` | 400, 500, 600 (variable `opsz 9..40`) | `global.css:6`; `BaseLayout.astro:223` |
| `--font-mono` | `'JetBrains Mono', monospace` | 400, 500 | `global.css:7`; `BaseLayout.astro:223` |
| Hero serif | `'Cormorant Garamond', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif` | 600, 700 | `[lang]/index.astro:128`; `BaseLayout.astro:223` |

Loading: preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`, preload as style, then non-blocking stylesheet with `media="print" onload="this.media='all'"`, plus `<noscript>` fallback (`BaseLayout.astro:217-236`).

Global rules:
- `html { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }` (`global.css:10-16`).
- `h1, h2, h3, h4, .font-display { font-family: var(--font-display); text-wrap: balance; }` (`global.css:18-21`).
- `code, pre, .font-mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }` (`global.css:23-26`).

### 5.2 Type scale in use (Verified from source; px values are Tailwind equivalents)

| Role | Size | Family | Weight | Tracking | Leading | Source |
|---|---|---|---|---|---|---|
| Micro mono label | 10px | JetBrains Mono | 400–500 | `0.05em` (`tracking-wider`) in places | normal | `PortfolioSections.tsx:195`, `341`, `398` |
| Meta / badge | 11px | Mono or sans | 500–600 | wide | normal | `PortfolioSections.tsx:315`, `599` |
| Small label | 12px | DM Sans / Mono | 400–500 | normal | 1.6–1.8 | `global.css:280`, `289` |
| Nav / UI small | 12–14px | DM Sans | 500–600 | normal | normal | `Navbar.astro:40` |
| Body small | 14px (`text-sm`) | DM Sans | 400 | normal | relaxed ≈1.625 | `[slug].astro:117` |
| Body base | 16px (`1rem`) | DM Sans | 400 | normal | 1.75 | `global.css:32-34` |
| Section label | 14px → 15px at `sm` | Plus Jakarta Sans | 500 | `-0.025em` | 1.6 | `global.css:234-243`, `333` |
| Article H3 | 18px (`1.125rem`) | Plus Jakarta Sans | 600 | `-0.01em` | 1.4 | `global.css:53-61` |
| Identity H1 | `clamp(1.25rem, 4.8vw, 1.65rem)` (20–26.4px) | Plus Jakarta Sans | 700 (class) | `-0.045em` | 1.35 | `global.css:165-171` |
| Prose H2 | 22px (`1.375rem`) | Plus Jakarta Sans | 600 | `-0.02em` | 1.35 | `global.css:41-51` |
| Blog H1 / article H1 | 24px → 36px (`text-2xl sm:text-4xl`) | Plus Jakarta Sans | 600 | tight | tight | `blog/index.astro:42`; `[slug].astro:113` |
| Hero name | 28px → 32px → 36px | Cormorant Garamond | 600 | `-0.01em` | none (`leading-none`) | `[lang]/index.astro:113`, `129` |
| 404 H1 | `clamp(28px, 6vw, 40px)` | display | 600 | `-0.05em` | 1.2 | `404.astro:20` |

**Derived sizes (Inferred):**
- `0.84rem` code = 13.44px at the default 16px root.
- `0.85em` inline code is relative to its parent.
- `1.65rem` identity max = 26.4px.
- `text-sm` = 14px, `text-base` = 16px, `text-lg` = 18px, `text-xl` = 20px, `text-2xl` = 24px, `text-4xl` = 36px, following Tailwind defaults.

### 5.3 Typographic rules

1. Display headings use Plus Jakarta Sans 600; the identity card uses 700.
2. Body copy is DM Sans 400. Do not set body copy in the display face.
3. All metadata (dates, categories, counts, codes, coordinates, tech stacks) uses JetBrains Mono with tabular numerals.
4. The hero name is the only Cormorant Garamond use. Do not reuse it for section headings.
5. Headings get `text-wrap: balance`.
6. Letter-spacing tightens as size rises: `-0.05em` at 40px, `-0.045em` identity, `-0.025em` section labels, `-0.02em` prose H2, `-0.01em` prose H3/hero.
7. Prose measure is capped at `68ch` (`global.css:34`).

---

## 6. Spacing System

**Base unit:** 4px (Tailwind default). **Verified from source** through utility values.

| Step | px | Common use |
|---|---|---|
| 0.5 | 2px | Hairline gaps, tiny offsets |
| 1 | 4px | Icon gaps, tight stacks |
| 1.5 | 6px | Button icon gaps, nav offsets |
| 2 | 8px | Button groups, compact stacks |
| 2.5 | 10px | Card inner gaps, button padding |
| 3 | 12px | Input padding, card gaps |
| 3.5 | 14px | Page gutter (`px-3.5`), card padding |
| 4 | 16px | Standard gap |
| 5 | 20px | Card padding (`p-5`) |
| 6 | 24px | Page gutter at `sm`, card padding (`p-6`) |
| 8 | 32px | Section rhythm |
| 10 | 40px | Blog top padding |
| 12 | 48px | Article TOC gap (`lg:gap-12`) |
| 14 | 56px | Navbar min height, bottom padding |
| 16 | 64px | Page vertical rhythm |
| 20 | 80px | Blog page bottom padding |
| 24 | 96px | TOC sticky offset (`top-24`) |
| 72 | 160px? | `404` top padding clamp max `160px` |

**Verified recipes:**
- Page gutter: `px-3.5` (14px) mobile, `sm:px-6` (24px) from 640px (`BaseLayout.astro:346`).
- Homepage hero: `h-[380px] sm:h-[440px] lg:h-[480px]` (`[lang]/index.astro:38`).
- Identity card: `20px 18px 16px`, `margin-bottom: 20px`; at `sm`: `24px`, `margin-bottom: 24px` (`global.css:152-157`, `330-331`).
- Accordion trigger: `17px 4px`, min-height `58px`; at `sm`: `18px`, min-height `62px` (`global.css:219-232`, `332`).
- Nested trigger: `13px 0`, min-height `48px` (`global.css:288`, `334`).
- Article page: `py-8 sm:py-16` (`[slug].astro:49`).
- Blog index: `py-10 sm:py-20` (`blog/index.astro:32`).
- Footer: `py-6 sm:py-7` (`Footer.astro:19`).

**Rules:** use the 4px scale. Do not introduce arbitrary spacing except the documented hero heights, reading-bar height (`2.5px`), and fixed object dimensions.

---

## 7. Layout and Grid

**Verified from source:**

| Element | Spec | Source |
|---|---|---|
| Global container | `max-w-3xl` = 48rem = 768px, centred, `w-full` | `BaseLayout.astro:346` |
| Page gutters | 14px mobile, 24px at `sm` | `BaseLayout.astro:346` |
| Body | `min-h-screen flex flex-col`, `overflow-x-hidden` | `BaseLayout.astro:344` |
| Main | `flex-1 min-w-0` | `BaseLayout.astro:346` |
| Navbar inner | same 768px container; `h-12 sm:h-14`; effective `min-height: 56px` override | `Navbar.astro:28`; `global.css:315` |
| Hero | full container width; 380/440/480px tall; items bottom-aligned | `[lang]/index.astro:38` |
| Lanyard canvas stage | 780/880/940px tall, absolute, top 0 | `[lang]/index.astro:80` |
| Article grid | `grid-cols-1`, `lg:grid-cols-12`, `gap-8 lg:gap-12` | `[slug].astro:123` |
| Article body | `lg:col-span-8` | `[slug].astro:125` |
| Article TOC | `lg:col-span-4`, sticky `lg:top-24`, first on mobile, last on desktop | `[slug].astro:132-135` |
| Blog header | `max-w-2xl` = 42rem = 672px | `blog/index.astro:34` |
| Blog list measure | `max-w-3xl` per row | `BlogDirectory.tsx:167` |
| Footer inner | 768px container, flex column → row at `sm` | `Footer.astro:19` |
| 404 | `max-width: 44ch`, padding `clamp(72px, 16vh, 160px) 8px` | `404.astro:18` |

**Inferred:** The 768px column plus 24px gutters gives a 720px content width at desktop. The article’s 8/4 split at `lg` yields roughly 480px body and 240px sidebar before gap subtraction.

**Rules:**
- Never widen the main column beyond 768px.
- Do not add a second container width except the documented `max-w-2xl` blog header and `44ch` 404 block.
- Article prose is additionally capped at `68ch`, so it may not fill the 8-column track at wide widths.

---

## 8. Borders, Radii, and Elevation

### 8.1 Borders (Verified from source)

| Role | Value | Source |
|---|---|---|
| Navbar / footer rule | `1px solid` `zinc-200/70` | `Navbar.astro:27`; `Footer.astro:18` |
| Blog header / article header rule | `1px solid` `zinc-200/80` | `blog/index.astro:34`; `[slug].astro:75` |
| Card border | `1px solid` `zinc-200/85` or `/80` | `PortfolioSections.tsx:188`, `396` |
| Portfolio directory rule | `1px solid #e6e6e9` | `global.css:208`, `214`, `284` |
| Input border | `1px solid` `zinc-200/90` | `BlogDirectory.tsx:110` |
| Focus outline | `2px solid #52525b`, offset `3px` | `global.css:310-313` |
| Reading bar | `2.5px` tall | `[slug].astro:46` |
| Footer divider dot | `1px × 1px`? No — `w-1 h-1` = 4px dot | `Footer.astro:28` |

### 8.2 Radii (Verified from source)

| Radius | px | Use |
|---|---|---|
| `3px` | 3 | Accordion trigger |
| `rounded` / `0.25rem` | 4 | Inline code, locale badge |
| `rounded-md` | 6 | Compact buttons |
| `rounded-lg` | 8 | Inputs? No — filters, icon buttons, secondary buttons |
| `0.625rem` | 10 | Code block, blockquote |
| `rounded-xl` | 12 | Cards, search input, TOC, dropdown |
| `14px` | 14 | SSR ID card mobile |
| `16px` | 16 | SSR ID card `sm` |
| `18px` | 18 | Identity card (global override) |
| `rounded-2xl` | 16 | Hero background frame, empty state |
| `rounded-full` | 9999 | Tags, dots, portrait punch hole |

**Conflict to resolve in a rebuild:** the identity card has `rounded-xl` (12px) in the class list but `border-radius: 18px` in `global.css:152-158`. The unlayered global rule wins over the utility in the cascade. **Inferred effective radius: 18px.**

### 8.3 Elevation (Verified from source)

| Recipe | Use |
|---|---|
| `shadow-2xs` | Navbar language button, hero frame |
| `shadow-xs` | SSR strap |
| `shadow-sm` | Search input, active filter pill, code wrapper |
| `shadow-lg shadow-zinc-950/5 ring-1 ring-black/5` | Language dropdown |
| `0 2px 8px rgb(24 24 27 / 2%)` | Identity card |
| `0 10px 28px rgba(0,0,0,0.16)` | SSR ID card |
| `shadow-inner` | Card punch hole |
| Text shadow `0 1px 2px rgba(255,255,255,0.9), 0 2px 12px rgba(0,0,0,0.04)` | Hero name plate |

**Rule:** elevation is almost flat. Cards are separated by border and background, not by large shadows. The strongest shadow is the floating ID card.

---

## 9. Iconography

**Verified from source:**

- Primary icon grid: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Stroke widths: `1.2` (accordion plus/minus), `1.5` (section icon), `1.6` (section icons, back arrow, copy icon), `1.7` (external-link arrows, social arrows), `1.8` (translation icon, code copy), `2.25` (chevron, checkmark).
- Sizes: `w-2.5 h-2.5` (10px), `w-3 h-3` (12px), `w-3.5 h-3.5` (14px), `w-4 h-4` (16px), `w-5 h-5` (20px).
- Footer social icons: filled brand marks at `16px` inside `32px` buttons.
- Blog uses `lucide-react ^0.546.0`: `Search`, `X`, `ChevronLeft`, `ChevronRight`, `ArrowUpRight`, `Tag`, `Wrench`, `RotateCcw` (`BlogDirectory.tsx:2`).
- Portfolio uses ten bespoke inline SVG icons, one per section (`PortfolioSections.tsx:37-115`).
- Accordion indicator is a bespoke 16×16 plus/minus: horizontal line plus a vertical line that rotates 90° when open (`AnimatedAccordion.tsx:71-74`).

**Rules:**
- Use 1.5–1.8 stroke for UI icons; 2.25 only for small chevrons/checks.
- Icons inherit `currentColor`; muted icons use `zinc-400`/`zinc-500`.
- Never mix filled and stroked icons in the same control group, except the footer’s brand marks.
- No emoji.

---

## 10. Imagery and Art Direction

**Verified from source:**

| Asset | Role | Spec |
|---|---|---|
| `/assets/aistudio/image_a475d35f.webp` | Botanical hero frame | Full-bleed `background-size: cover`, centre; preloaded with `fetchpriority="high"` |
| `/assets/profile.jpeg` | Lanyard card front/back and SSR image | `400×600` intrinsic, `object-cover`, eager, high priority |
| `/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png` | Icons | 16/32/180 |
| `/api/og/{locale}/{slug}.svg` | Article OG image | `1200×630` SVG |

**Hero background composition (Verified from source):**
- Frame: `absolute inset-x-0 top-1.5 bottom-1.5`, `rounded-2xl`, `border-zinc-200/80`, `bg-[#f4f5f6]`, `shadow-2xs` (`HeroBackground.astro:19`).
- Desktop/tablet (`sm+`): image cover at `scale-[1.01]`, plus a radial blend:
  `radial-gradient(ellipse 46% 34% at 50% 50%, #f4f5f6 0%, #f4f5f6 60%, rgba(244,245,246,0.82) 76%, rgba(244,245,246,0) 100%)` (`HeroBackground.astro:24-31`).
- Mobile (`<640px`): two edge layers, each `64%` wide, `background-left`/`background-right`, masked with `linear-gradient(to right/left, #000 0%, #000 54%, transparent 100%)` (`HeroBackground.astro:35-45`).
- Mobile centre blend: `radial-gradient(ellipse 50% 44% at 50% 50%, #f4f5f6 0%, #f4f5f6 62%, rgba(244,245,246,0.85) 78%, rgba(244,245,246,0) 100%)` (`HeroBackground.astro:49`).
- Bottom caption scrim: `h-12`, `linear-gradient(to top, #f4f5f6/90, #f4f5f6/45, transparent)` (`HeroBackground.astro:55`).
- Inner ring: `ring-1 ring-inset ring-black/[0.04]` (`HeroBackground.astro:57`).

**Art direction rules:**
1. Botanical imagery is desaturated, warm-grey studio paper, never saturated green.
2. The centre must stay clear so the lanyard reads.
3. No stock watermark may be visible; the radial blend exists to hide it.
4. Profile photography is portrait, full-bleed inside the card, no border, no rounded inner mask beyond the card itself.
5. OG images are dark, typographic, and grid-textured — a deliberate inverse of the light site.

---

## 11. Global Shell

**Verified from source (`src/layouts/BaseLayout.astro`):**

```html
<html lang={meta.htmlLang} class="overflow-x-hidden">
<body class="min-h-screen flex flex-col overflow-x-hidden bg-[#fafafa] text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
  <Navbar locale={locale} currentPath={currentPath} />
  <main id="main-content" class="flex-1 min-w-0 w-full max-w-3xl mx-auto px-3.5 sm:px-6">
    <slot />
  </main>
  <Footer locale={locale} currentPath={currentPath} />
</body>
</html>
```

**Global CSS behaviour:**
- `html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }` (`global.css:10-16`).
- `overflow-x-hidden` on both `html` and `body`.
- `min-width: 0` on main prevents grid/flex overflow.
- Focus ring is global for `a`, `button`, `select` (`global.css:310-313`).
- No skip link was found in `BaseLayout.astro`; `main` has `id="main-content"` but nothing links to it. **Unavailable / gap.**

**Shell rules:**
- Navbar and footer are the only full-width bands.
- Main never exceeds 768px.
- Backgrounds are always `#fafafa`; no section should paint a different page background.
- Selection is inverted to near-black with white text.

---

## 12. Navigation Bar

**Verified from source (`src/components/Navbar.astro`):**

```
header: sticky top-0 z-40
  bg-[#fafafa]/90 backdrop-blur-md
  border-b border-zinc-200/70
inner: max-w-3xl mx-auto px-3.5 sm:px-6
  flex items-center justify-between gap-2
  h-12 sm:h-14
  global override: min-height 56px, padding-block 6px, height auto
```

| Zone | Spec |
|---|---|
| Brand | Plus Jakarta Sans, `text-sm sm:text-base`, `font-bold`, `tracking-tight`, `text-zinc-950`, hover `zinc-700`, `whitespace-nowrap` |
| Primary nav | flex, `gap-4 sm:gap-6`, `text-xs sm:text-sm`, `font-medium`, `text-zinc-500`; global `gap: clamp(8px, 3vw, 24px)` |
| Nav links | `h-8 px-1`; active: `text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-950 decoration-1.5`; inactive hover: `text-zinc-950`; global `min-height: 40px` |
| Language trigger | `h-8 px-2.5 rounded-lg border border-zinc-200/90 bg-white`, `text-xs font-medium`, `shadow-2xs`; hover `border-zinc-300 bg-zinc-50/80`; focus ring `2px zinc-900` offset `1` |
| Locale code | JetBrains Mono `11px`, `font-semibold`, uppercase, `tracking-wide` |
| Chevron | 14px, `stroke-width 2.25`, `transition-transform duration-200`; rotates 180° when open |

**Inferred effective navbar height:** at least 56px on all viewports because `header > div { min-height: 56px; height: auto; padding-block: 6px; }` overrides `h-12` (48px) and `sm:h-14` (56px). Treat 56px as the stable height.

**Rules:**
- Only two primary links: Home and Blog.
- Active state is an underline plus weight change, never a pill.
- The language control is the only bordered control in the navbar.
- Sticky header must remain translucent with blur; do not make it opaque.

---

## 13. Language Dropdown

**Verified from source (`Navbar.astro:116-169`, `174-232`):**

| Property | Value |
|---|---|
| Container | `role="listbox"`, `aria-label` from translations |
| Width | `w-52` = 208px |
| Position | absolute, right 0, `mt-1.5`, origin top-right |
| Surface | `rounded-xl`, `border-zinc-200/90`, `bg-white/98`, `backdrop-blur-md`, `p-1` |
| Shadow | `shadow-lg shadow-zinc-950/5 ring-1 ring-black/5` |
| Header | `10px` mono, uppercase, `tracking-wider`, `text-zinc-400`, bottom border `zinc-100` |
| Option | flex, `px-2.5 py-1.5`, `rounded-lg`, `text-xs` |
| Selected | `bg-zinc-100 text-zinc-950 font-semibold` + 14px check |
| Unselected | `text-zinc-600`, hover `text-zinc-950 bg-zinc-50` |
| Locale badge | `24×20px`, `rounded`, `10px` mono bold uppercase, `bg-zinc-100 text-zinc-700` |
| Locales | 10: `en, mr, jp, ko, zh, ru, pt, tr, fr, es` |

**Behaviour (Verified from source):**
- Click toggles `.hidden` and `aria-expanded`.
- Click outside closes.
- `Escape` closes and returns focus to trigger.
- Selecting a locale stores `localStorage['preferred_locale']` before navigation (`Navbar.astro:221-230`).
- Locale switch preserves the current sub-path via `switchLocalePath` (`src/i18n/config.ts:734-741`).

**Rules:**
- Native names only in the option list (`English`, `मराठी`, `日本語`, etc.); locale code in the badge.
- Do not use a native `<select>`; this is a custom listbox.
- Keep the 208px width; longer translations must not widen it.

---

## 14. Hero Stage

**Verified from source (`src/pages/[lang]/index.astro`):**

| Layer | Spec |
|---|---|
| Section | `relative z-30 w-full h-[380px] sm:h-[440px] lg:h-[480px]`, flex column, items centre, justify end, `select-none`, `overflow-visible` |
| Botanical background | z-0, inset with 6px top/bottom, rounded-2xl |
| SSR preview | z-20, absolute inset 0, pointer-events none, items centre/start, `transition-opacity duration-150` |
| Strap | `21/24/26px` wide, `54/64/70px` tall, `bg-[#141416]`, repeating linear weave every 3px at 4% white |
| Clamp | `25/29/31px` wide, `12/14px` tall, `rounded-[3px]`, vertical gradient `#e4e7ec → #cfd4dc → #9ea4b0`, `border-zinc-500/40` |
| Ring | `14/16px` square, `rounded-full`, `2.5px` border `#c8cdd6` |
| ID card | `140×197`, `162×228`, `178×250`, `rounded-[14px]` / `16px`, white, `shadow-[0_10px_28px_rgba(0,0,0,0.16)]`, `ring-1 ring-black/10` |
| Punch hole | `30/34px × 6/7px`, `rounded-full`, `bg-[#f4f5f6]`, `shadow-inner`, `ring-1 ring-black/15` |
| Canvas stage | absolute top 0, `780/880/940px` tall, z-30, pointer-events none |
| Name plate | absolute, centred, `bottom-[46px] sm:bottom-[48px] lg:bottom-[52px]`, z-20 |

**Hero name:**
- Text: `Girish Lade`
- Classes: `text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-none text-zinc-950 whitespace-nowrap select-none`
- CSS: Cormorant Garamond stack, `letter-spacing: -0.01em`, text shadow white + faint dark (`[lang]/index.astro:125-132`).

**Rules:**
- Keep the hero exactly tall enough for the card plus name; do not add a headline, subheadline, or CTA here.
- The name is the only serif element.
- Hero is `select-none`; it is an object, not content to copy.
- The canvas may extend below the section; do not clip it.

---

## 15. 3D Lanyard

**Verified from source (`[lang]/index.astro:82-106`, `Lanyard.jsx`):**

| Parameter | Value |
|---|---|
| `frontImage` / `backImage` | `/assets/profile.jpeg` |
| `imageFit` | `cover` |
| `cardColor` | `#ffffff` |
| `orientation` | `portrait` |
| `finish` | `glossy` → roughness `0.55`, metalness `0`, clearcoat `0`, clearcoatRoughness `0.6` |
| `cornerRadius` | `0.28` |
| `size` | `0.52` |
| `anchor` | `center` |
| `strapLength` | `0.35` |
| `strapColor` | `#111111` |
| `strapWidth` | `0.65` |
| `metal` | `silver` → color `#d9dce2`, roughness `0.16` |
| `gravity` | `1` |
| `damping` | `0.5` |
| `elasticity` | `0.5` |
| `breeze` | `0.5` |
| `gyroscope` | `true` |
| `gyroSensitivity` | `1.1` |
| `interactive` | `true` |
| `intro` | `true` |
| Camera FOV | `24` |
| Metal material | `MeshStandardMaterial({ metalness: 1 })` |

**Loading behaviour (Verified from source):**
- `LanyardDeferred` lazy-imports the ~600KB three.js bundle and mounts on hydration (`LanyardDeferred.tsx:3-26`).
- SSR preview renders immediately; when the canvas is ready, the hero gets `data-lanyard-ready="true"` and the preview fades to opacity 0 / `visibility: hidden` (`Lanyard.css:21-28`).
- Canvas starts at `opacity: 0` and transitions to `1` over `120ms ease-out` (`Lanyard.css:11-23`).
- `.lanyard` and `.lanyard-canvas` are `pointer-events: none`; interaction is driven by the component’s own listeners on the stage/hero.

**Gyroscope (Verified from source, `src/utils/gyro.ts`):**
- `neutralBeta = 48°`, base gravity `40`, sensitivity multiplier `1.0` default.
- Lateral force uses a `0.75` power curve, multiplied by `sensitivity * 1.6`.
- Longitudinal force: `-gravity * cos(pitch) * cos(roll * 0.7) * (sensitivity * 1.25)`.
- Depth force: `gravity * sin(pitch) * cos(roll) * (sensitivity * 0.8)`.
- Screen orientation rotation applied when `screenAngle !== 0`.
- Tilt clamped to `±0.5rad`.

**Rules:**
- Keep the lanyard as the only 3D element.
- Never block the initial HTML render on three.js.
- Keep strap/card/metal colour constants; do not reskin in a new hue.
- Provide a static poster fallback identical to the SSR preview if WebGL is unavailable.

---

## 16. Identity Card

**Verified from source (`PortfolioSections.tsx:184-265`, `global.css:152-205`):**

| Property | Value |
|---|---|
| Wrapper | `SpotlightCard as="section"` |
| Class | `identity-card rounded-xl border border-zinc-200/85 bg-white/95 p-4 sm:p-5 mb-4 sm:mb-5` |
| Effective padding | `20px 18px 16px`; `sm`: `24px` |
| Effective radius | `18px` (global override) |
| Effective margin-bottom | `20px`; `sm`: `24px` |
| Border | `1px` `#e6e6e9` |
| Shadow | `0 2px 8px rgb(24 24 27 / 2%)` |
| Spotlight | 480px radial, `rgba(24,24,27,0.055)`, transparent at 45%, 300ms opacity |

**Contents:**
- Name: `h1`, effective `clamp(1.25rem,4.8vw,1.65rem)`, Plus Jakarta Sans 700, `-0.045em`, 1.35.
- Location: mono `10px sm:11px`, `zinc-400`, shrink-0.
- Headline: `text-xs sm:text-sm`, `font-medium`, `zinc-800`, `leading-snug`.
- Positioning quote: `text-xs`, `zinc-500`, `leading-relaxed`.
- Divider: `border-t border-zinc-100`, `pt-2.5`.
- Actions: four controls (Explore Products, LadeStack, GitHub, Contact) plus Expand All.
- Global action sizing: `min-height: 40px`, `padding-block: 8px`, `padding-inline: 10px`, `font-size: 11px`, `line-height: 1.4` (`global.css:194-205`).
- Explore Products: `bg-zinc-950 text-white`, radius 6px, hover `bg-zinc-800`.
- LadeStack / GitHub: `border-zinc-200 bg-zinc-50/80 text-zinc-800`, hover `border-zinc-400 bg-white`.
- Contact: `border-zinc-200 bg-white text-zinc-700`, hover `border-zinc-400 text-zinc-950`.
- Expand All: `border-zinc-200/80`, 10px mono, `zinc-500`, hover `zinc-950`; label hidden on mobile, `+`/`−` always visible.

**Inferred effective control height:** `40px` on every action because the global `.portfolio-content :where(button, a.inline-flex)` rule sets `min-height: 40px` and `padding-block: 8px`; the utility `h-6 sm:h-7` (24/28px) is overridden.

**Rules:**
- The identity card is the only card with a pointer-tracked spotlight.
- Do not add an avatar here; the lanyard already carries the portrait.
- Keep the action row to one line on desktop; wrap on mobile.
- The Expand All control is visually quieter than the four actions.

---

## 17. Portfolio Accordion Directory

**Verified from source (`AnimatedAccordion.tsx`, `global.css:207-341`, `PortfolioSections.tsx:268-296`):**

**Structure:**
```
div.portfolio-directory[role=region][aria-label="Expandable Portfolio Sections"]
  div.portfolio-section
    div[id="section-<key>"] .scroll-mt-20
      h2.accordion-heading
        button.accordion-trigger[aria-expanded][aria-controls]
          span.accordion-label
            span.accordion-section-icon
            span <title>
          span.accordion-indicator[aria-hidden]
            svg 16×16: horizontal line + vertical line
      div.accordion-panel[role=region][aria-labelledby][hidden]
        div.accordion-body.space-y-4
```

**Ten sections, in order (`PortfolioSections.tsx:22-33`):**
`profile`, `story`, `education`, `vision`, `ecosystem`, `products`, `prototypes`, `capabilities`, `practice`, `contact`.

**Geometry:**

| Property | Mobile | `sm+` |
|---|---|---|
| Directory top border | `1px #e6e6e9`, `margin-top: 28px` | same |
| Section bottom border | `1px #e6e6e9` | same |
| Trigger min-height | `58px` | `62px` |
| Trigger padding | `17px 4px` | `18px 4px` |
| Trigger gap | `20px` | `20px` |
| Label size | `14px` | `15px` |
| Label family/weight | Plus Jakarta Sans 500 | same |
| Label tracking/leading | `-0.025em` / `1.6` | same |
| Section icon | `16×16`, stroke `1.5`, `#71717a` | same |
| Indicator | `16×16`, `#85858d`, open `#18181b` | same |
| Panel body padding | `0 4px 24px` | same |
| Nested trigger | `48px`, `13px 0` | same |
| Nested label | DM Sans 12px 500, no tracking | same |
| Nested body padding | `2px 0 20px` | same |

**Icon animation:** vertical bar rotates `90deg` over `160ms ease` when `aria-expanded="true"` (`global.css:274-275`).
**Panel animation:** `portfolio-open 160ms ease-out` fade from opacity 0 to 1 (`global.css:292`, `338-341`).
**Hover:** only on hover-capable devices; label colour shifts to `#71717a` (`global.css:326-328`).

**Behaviour (Verified from source):**
- All sections start collapsed: `createInitialAccordionState()` returns `{}` (`src/utils/accordion.ts:14-16`).
- Single-expand: opening one closes all others (`toggleAccordionItem` default `allowMultiple: false`, `accordion.ts:30-55`).
- Clicking an open section collapses it.
- Expand All toggles every section; it becomes Collapse All only when all ten are open (`accordion.ts:75-98`).
- Keyboard: `ArrowDown`, `ArrowUp`, `Home`, `End` move focus between triggers (`accordion.ts:104-123`).
- ARIA: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`, `hidden` on closed panels.
- `scroll-mt-20` = 80px offset for anchor scrolling.

**Rules:**
- Keep the plus/minus indicator; do not replace with a chevron.
- Keep the section icon at 16px and muted.
- No background fill on hover; only label colour.
- One open section at a time is the default.
- Do not animate height; the panel is hidden/shown with a fade only.

---

## 18. Accordion Content Modules

**Verified from source (`PortfolioSections.tsx:297-906`, `global.css:277-308`):**

### Shared content rules
- Body text: `12px` (`text-xs`), `zinc-600`/`zinc-700`, `leading-relaxed` or `1.8`.
- Secondary text: `11px`, `zinc-500`/`zinc-600`.
- Micro labels: `10px` mono, `zinc-400`, uppercase where used.
- Inner cards: `rounded-lg`, `border-zinc-200/80`, `p-3`, background `zinc-50/50`, `/60`, `/40`, or white.
- Grids: `grid-cols-1 sm:grid-cols-2` or `sm:grid-cols-3`, `gap-2`–`gap-3.5`.
- Inner card shadow: none.
- Global override strips borders/background from `.accordion-body .grid > div` (`global.css:301-307`). **Inferred:** this flattens several Tailwind card styles inside grids; confirm in a render before reproducing exact card borders there.

### Module inventory

| Section | Content pattern |
|---|---|
| `profile` | Three bio-mode buttons (short/medium/extended), bio box, identity rows (field/value grid) |
| `story` | Nested accordion chapters, code + title, body paragraph |
| `education` | 2-up entry cards, self-directed block, 3-up influence cards |
| `vision` | 2-up vision/mission cards, 2-up core-value cards with numbers |
| `ecosystem` | 2-up definition cards, 2-up audience cards, ownership list |
| `products` | Nested product accordions: category/role mono meta, overview, 3-up use cases, stack line, note with left rule, CTA row |
| `prototypes` | Nested prototype accordions with summary and link buttons |
| `capabilities` | 2-up domain cards (technologies in mono), 2-up landscape cards |
| `practice` | 2-up offering cards with code, 2-up process-step cards |
| `contact` | Contact panel, email + copy-email button, 2-up social channel cards |

### Specific component recipes

**Bio-mode segmented buttons:**
- `h-6 px-2.5 rounded-md text-[11px] font-mono`.
- Active: `bg-zinc-950 text-white`.
- Inactive: `bg-zinc-100 text-zinc-600`, hover `text-zinc-950`.
- `aria-pressed` present.

**Identity rows:**
- `divide-y divide-zinc-100`, `rounded-lg border border-zinc-200/80 bg-white`.
- Row: `grid-cols-1 sm:grid-cols-3`, `px-3 py-2`, `text-xs`.
- Field: mono `11px`, `zinc-400`.
- Value: `zinc-800`, links underlined `decoration-zinc-300` offset 4, hover `decoration-zinc-900`.

**Product note:**
- `text-[10px] font-mono text-zinc-500`, `border-l-2 border-zinc-300`, `pl-2.5 py-0.5`.

**Contact email:**
- Primary: `h-7 px-2.5 rounded-md bg-zinc-950 text-white text-[11px]`, hover `bg-zinc-800`.
- Copy: `h-7 px-2.5 rounded-md border border-zinc-200 bg-white text-zinc-700 text-[11px] font-mono`.
- Copy success label replaces text for 2000ms (`PortfolioSections.tsx:173-181`).

**Social channel card:**
- `rounded-lg border border-zinc-200/80 bg-white p-3`, hover `border-zinc-400`.
- Platform: mono 10px uppercase `tracking-wider` `zinc-400`.
- Handle: `text-xs font-semibold zinc-900`, hover underline offset 4.
- Arrow: 14px `zinc-400`, hover `zinc-900`.

---

## 19. Blog Index

**Verified from source (`src/pages/[lang]/blog/index.astro`, `src/components/BlogDirectory.tsx`):**

### Page header
- Wrapper: `py-10 sm:py-20`, `space-y-10 sm:space-y-12`.
- Header: `pb-8 sm:pb-10`, bottom border `zinc-200/80`, `space-y-3`, `max-w-2xl`.
- Breadcrumb meta: `text-xs zinc-500 font-mono`, items separated by `/`: All Articles / Markdown → HTML / `/{locale}/blog`.
- H1: `font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950`.
- Subtitle: `text-sm sm:text-base text-zinc-600 leading-relaxed`.

### Search
- Wrapper `relative w-full max-w-2xl`.
- Input: `w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-zinc-200/90 bg-white/80 backdrop-blur-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm`.
- Focus: `ring-2 ring-zinc-950/20`, `border-zinc-950`, no outline.
- Search icon: absolute left `pl-3.5`, 16px, `zinc-400`.
- Clear button: absolute right `pr-3`, 16px, `zinc-400`, hover `zinc-700`.
- Placeholder is localized.

### Category filters
- Container: `flex flex-wrap gap-1.5`, `role="toolbar"`, `aria-label="Filter articles by category"`.
- Pill: `px-3 py-1.5 text-xs font-medium rounded-lg border transition-all`.
- Active: `bg-zinc-900 text-white border-zinc-900 shadow-sm`.
- Inactive: `bg-zinc-50 text-zinc-600 border-zinc-200/80`, hover `bg-zinc-100 text-zinc-900`.
- “All Topics” pill is always first.
- Result count: `text-xs font-mono text-zinc-500`, right-aligned at `sm`.

### Post list
- Container: `divide-y divide-zinc-200/80`.
- Row: `<article>` `py-7 sm:py-8 first:pt-2 last:pb-2 group`.
- Inner measure: `max-w-3xl`, `space-y-3`.
- Meta bar: `flex flex-wrap items-center gap-2 text-xs zinc-500 font-mono`.
- Category badge: `px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium`.
- Separators: `/` in `zinc-300`.
- Tool badge: `inline-flex items-center gap-1 text-zinc-700 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[11px]` + 12px wrench.
- Title: `font-display text-lg sm:text-2xl font-semibold tracking-tight text-zinc-950`, group hover `text-zinc-700`.
- Description: `text-sm sm:text-base text-zinc-600 leading-relaxed`.
- Tags: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-600`, 10px tag icon.
- Read link: `min-h-[40px] text-xs font-semibold text-zinc-900`, hover `zinc-600`; arrow translates `+0.5` x and `-0.5` y on group hover.
- Items per page: **6** (`BlogDirectory.tsx:12`).

### Empty state
- Wrapper: `py-16 text-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 p-8 space-y-4`.
- Icon circle: `40px`, `rounded-full bg-zinc-100 text-zinc-400`.
- Title: `text-base font-semibold zinc-900`.
- Hint: `text-sm zinc-500 max-w-sm mx-auto`.
- Reset button: `px-3.5 py-2 text-xs font-medium rounded-lg border bg-white shadow-sm`, `RotateCcw` 14px.

### Pagination
- Nav: `flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200/80`.
- Page-of text: `text-xs font-mono text-zinc-500`, order 2 on mobile / 1 on `sm`.
- Buttons: previous/next `px-3 py-2 text-xs font-medium rounded-lg border border-zinc-200/80 bg-white text-zinc-700`, hover `bg-zinc-50`, disabled `opacity-40 cursor-not-allowed`; chevrons 14px; labels hidden on mobile.
- Page numbers: `w-8 h-8 rounded-lg text-xs`; current `bg-zinc-900 text-white font-semibold`; others `bg-white border text-zinc-700`.
- `aria-current="page"` on current.
- Changing page scrolls the directory into view smoothly (`BlogDirectory.tsx:78-85`).

**Rules:**
- Search filters title, description, category, tool, tags, and content snippet (`BlogDirectory.tsx:42-50`).
- Any query/category change resets to page 1.
- Keep 6 items per page.
- Do not add a sidebar to the index; it is a single column.

---

## 20. Blog Article

**Verified from source (`src/pages/[lang]/blog/[slug].astro`, `src/styles/global.css`):**

### Reading progress
- Fixed top, full width, `h-[2.5px]`, `bg-zinc-950`, `z-50`, `origin-left scale-x-0`, `transition-transform duration-75`.
- Progress = clamped scrolled portion of the `<article>`; updated via `requestAnimationFrame` on scroll (`[slug].astro:178-203`).

### Page frame
- Wrapper: `py-8 sm:py-16`.
- Back link: `mb-6 sm:mb-8`, inline flex, `min-h-[40px]`, `text-xs font-medium zinc-500`, hover `zinc-950`; 14px arrow.
- Article: `space-y-8 sm:space-y-10`.
- Header: `pb-6 sm:pb-8`, bottom border `zinc-200/80`, `space-y-4`, full width.

### Header meta
- Row: `flex flex-wrap items-center justify-between gap-3`.
- Meta: `text-xs zinc-500 font-mono`, items separated by `·`.
- Order: category · Published date · reading time.
- Copy-link button: `min-h-[36px] px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg`, hover `border-zinc-400`; 14px copy icon.
- H1: `font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight max-w-3xl`.
- Description: `text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl`.

### Body grid
- `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start`.
- Content: `lg:col-span-8 markdown-prose w-full overflow-hidden`.
- TOC: `lg:col-span-4 lg:sticky lg:top-24 p-4 sm:p-5 rounded-xl bg-white border border-zinc-200/80 space-y-3 order-first lg:order-last`.
- TOC title: `font-display text-xs font-semibold text-zinc-900 tracking-tight`.
- TOC list: `space-y-2 text-xs text-zinc-600`; H3 entries get `pl-3`.
- TOC links: `block py-0.5 leading-snug`, hover `zinc-950`.
- TOC shows only H2/H3 (`[slug].astro:28`).

### Markdown prose (Verified from source, `global.css:30-128`)
| Element | Spec |
|---|---|
| Container | `#27272a`, `1rem`, `1.75`, `max-width: 68ch` |
| Vertical rhythm | every direct child after the first: `margin-top: 1.35rem` |
| H2 | `#09090b`, `1.375rem`, 600, `-0.02em`, 1.35, top `2.5rem`, bottom `.75rem`, bottom border `#e4e4e7` |
| H3 | `#18181b`, `1.125rem`, 600, `-0.01em`, 1.4, top `1.75rem`, bottom `.5rem` |
| P | `#3f3f46`, 1.75 |
| Strong | `#09090b`, 600 |
| UL / OL | disc / decimal, `padding-left: 1.375rem`, `#3f3f46` |
| LI | `margin-top: .5rem`, 1.7 |
| Marker | `#a1a1aa` |
| Pre | `#18181b` bg, `#f4f4f5` text, `1.125rem 1.25rem` padding, `.625rem` radius, `.84rem`, 1.65, border `#27272a` |
| Inline code | `#f4f4f5` bg, `#18181b` text, `.15rem .4rem` padding, `.25rem` radius, `.85em`, border `#e4e4e7` |
| Blockquote | `1.75rem` vertical margin, `1.125rem 1.25rem` padding, `#f4f4f5` bg, `#e4e4e7` border, `.625rem` radius, `#27272a`, normal style |

### Enhanced code blocks (Verified from source, `[slug].astro:205-247`)
- Wrapper: `relative group my-6 rounded-xl overflow-hidden border border-zinc-800 bg-[#121214] text-zinc-100 shadow-sm`.
- Header: `flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/90 text-xs text-zinc-400 font-mono select-none`.
- Language badge: `11px`, semibold, `tracking-wider`, `zinc-400`.
- Copy button: `px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300 bg-zinc-800`, hover `text-white bg-zinc-700`; icon 14px.
- Success: emerald-400 check + “Copied!” for 2000ms.
- `<pre>` gets `p-4 overflow-x-auto text-sm leading-relaxed m-0 bg-transparent`.

**Rules:**
- The reading bar is the only fixed overlay on article pages.
- TOC precedes the body on mobile and becomes a right rail at `lg`.
- Do not add author cards, share bars, or related posts; none exist.
- Code blocks are the only dark surface on article pages.

---

## 21. Footer

**Verified from source (`src/components/Footer.astro`):**

```
footer: border-t border-zinc-200/70 bg-[#fafafa] mt-auto
inner: max-w-3xl mx-auto px-3.5 sm:px-6 py-6 sm:py-7
  flex flex-col sm:flex-row items-center justify-between gap-4
```

| Element | Spec |
|---|---|
| Brand | Plus Jakarta Sans, `text-xs sm:text-sm`, `font-bold`, `tracking-tight`, `zinc-950`, hover `zinc-700`; period removed |
| Dot separator | `4×4px`, `rounded-full`, `bg-zinc-300` |
| Copyright | `text-xs zinc-500`; year is hardcoded `2024` |
| Footer nav | `gap-3 sm:gap-4`, `text-xs font-medium zinc-500`; links `h-8 px-1`, hover `zinc-950` |
| Vertical divider | `h-3.5 w-px bg-zinc-200/90` |
| Social buttons | `32×32px`, `rounded-lg`, `zinc-500`, hover `zinc-950` + `bg-zinc-200/50` |
| Social icons | 16px filled GitHub, Instagram, LinkedIn |

**Rules:**
- One row on desktop, stacked on mobile.
- Keep only Home and Blog in footer nav.
- Social links open in new tabs with `rel="noopener noreferrer"`.
- Copyright year is static in source; a rebuild should decide whether to keep static or compute it.

---

## 22. Utility Pages

### 404 (`src/pages/404.astro`, Verified from source)
- Uses `BaseLayout` with `locale="en"`, `noindex`, title “Page not found”.
- Section: `padding: clamp(72px, 16vh, 160px) 8px`, `max-width: 44ch`.
- Code: `12px` JetBrains Mono, `#71717a`, `margin-bottom: 24px`.
- H1: `clamp(28px, 6vw, 40px)`, 600, `-0.05em`, 1.2.
- Paragraph: `#626269`, 14px, 1.8, `margin-top: 16px`.
- Nav: flex wrap, `gap: 12px`, `margin-top: 28px`.
- Links: inline flex, `min-height: 44px`, `padding: 10px 16px`, `1px solid #e4e4e7`, radius 8px, 12px.
- First link: `#18181b` background and border, white text.

### Root redirect (`src/pages/index.astro`, Verified from source)
- `<html lang="en">`, no layout; own `<head>`.
- Body: `min-h-screen flex items-center justify-center bg-[#fafafa] text-zinc-900 px-6`.
- Card: centred, `space-y-3`.
- Text: `text-sm zinc-500` “Redirecting to localized portfolio...”.
- Link: `text-xs font-medium zinc-900 underline underline-offset-4`, “Continue to /en/”.
- JS reads `localStorage['preferred_locale']`, validates against `LOCALES`, then `window.location.replace('/' + target + '/')`.
- Meta refresh fallback to `/en/`.

**Rules:** utility pages inherit the same shell tokens but do not use the main container for the 404 section (its own `44ch` measure).

---

## 23. Component Specifications and States

### 23.1 Buttons

| Variant | Background | Border | Text | Radius | Height | Hover |
|---|---|---|---|---|---|---|
| Primary dark | `#09090b` | none | white | 6px | 40px effective in portfolio; 28px in nested product CTA classes but global 40px wins | `#27272a` |
| Secondary | white / `zinc-50` | `1px zinc-200` | `zinc-800` / `zinc-700` | 6px | 40px effective | border `zinc-400`, bg white |
| Quiet outline | transparent / white | `1px zinc-200/80` | `zinc-500` | 6px | 24–28px class, 40px in portfolio | text `zinc-950`, border `zinc-400` |
| Blog filter active | `zinc-900` | `zinc-900` | white | 8px | auto (~30px) | none |
| Blog filter idle | `zinc-50` | `zinc-200/80` | `zinc-600` | 8px | auto | bg `zinc-100`, text `zinc-900` |
| Pagination page | white | `zinc-200/80` | `zinc-700` | 8px | 32px | bg `zinc-50` |
| Pagination current | `zinc-900` | — | white | 8px | 32px | — |
| Icon button (footer) | transparent | none | `zinc-500` | 8px | 32px | text `zinc-950`, bg `zinc-200/50` |

**Universal focus:** `outline: 2px solid #52525b; outline-offset: 3px` (`global.css:310-313`). Some controls also declare Tailwind focus rings; both may apply. **Inferred:** the language trigger can show both its ring and the global outline.

**Disabled:** `opacity: 0.4`, `cursor: not-allowed` (pagination only).

### 23.2 Inputs
- Search only.
- Radius 12px, 1px border, white/80 fill, backdrop blur, `shadow-sm`.
- Padding `12px` vertical, 40px left/right.
- Placeholder `zinc-400`.
- Focus ring 2px `zinc-950/20`; border becomes `zinc-950`.
- No visible label; `aria-label` supplied.

### 23.3 Chips, badges, tags

| Type | Spec |
|---|---|
| Category badge (blog row) | `px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium text-xs` |
| Tool badge | `px-1.5 py-0.5 rounded text-[11px] bg-zinc-100/80 text-zinc-700` + 12px wrench |
| Tag | `px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-600` + 10px tag |
| Locale badge (dropdown) | `24×20px rounded text-[10px] font-mono font-bold uppercase bg-zinc-100 text-zinc-700` |
| Product status badge | Inherited accordion `metaLabel`, 10px mono, `zinc-400` |
| OG category pill | 220×32px, radius 16px, white 6% fill, white 12% stroke, 12px text |

### 23.4 Cards

| Card | Radius | Border | Background | Shadow |
|---|---|---|---|---|
| Identity | 18px | `#e6e6e9` | `white/95` | `0 2px 8px rgb(24 24 27 / 2%)` |
| Blog search | 12px | `zinc-200/90` | `white/80` + blur | `shadow-sm` |
| TOC | 12px | `zinc-200/80` | white | none |
| Inner content card | 8px | `zinc-200/80` | `zinc-50/40–60` or white | none |
| Social channel | 8px | `zinc-200/80` | white | none |
| Empty state | 16px | dashed `zinc-200` | `zinc-50/50` | none |
| Hero frame | 16px | `zinc-200/80` | `#f4f5f6` | `shadow-2xs` |

### 23.5 State matrix

| State | Visual change |
|---|---|
| Hover (nav link) | text `zinc-500` → `zinc-950` |
| Hover (primary button) | bg `zinc-950` → `zinc-800` |
| Hover (secondary) | border `zinc-200` → `zinc-400` |
| Hover (accordion) | label `#18181b` → `#71717a` (hover-capable only) |
| Focus-visible | 2px `#52525b` outline, 3px offset |
| Active nav | near-black, semibold, 1.5px underline offset 4 |
| Expanded accordion | plus vertical bar rotates 90°, indicator darkens |
| Selected locale | `bg-zinc-100`, semibold, check icon |
| Copied | label swaps to copied string for 2s |
| Code copied | emerald check + “Copied!” for 2s |
| Search active | 2px soft ring + near-black border |
| Disabled page | 40% opacity, not-allowed cursor |
| Empty results | dashed panel with reset action |

---

## 24. Motion and Interaction

**Verified from source:**

| Motion | Spec | Source |
|---|---|---|
| Smooth page scroll | `scroll-behavior: smooth` | `global.css:14` |
| Accordion panel | fade `160ms ease-out` | `global.css:292`, `338-341` |
| Plus/minus vertical bar | rotate 90°, `160ms ease` | `global.css:274-275` |
| Language chevron | rotate 180°, `200ms` | `Navbar.astro:104` |
| Spotlight overlay | opacity `300ms`; radial follows pointer | `SpotlightCard.tsx:28-36`, `50` |
| Reading progress | `transform 75ms`; rAF-throttled scroll | `[slug].astro:46`, `196-201` |
| Lanyard canvas reveal | opacity `120ms ease-out` | `Lanyard.css:18` |
| SSR preview hide | opacity `150ms` | `[lang]/index.astro:47`; `Lanyard.css:25-28` |
| Copy label reset | `2000ms` | `[slug].astro:172-174`; `PortfolioSections.tsx:177` |
| Blog arrow micro-move | `translate-x-0.5 -translate-y-0.5` on group hover | `BlogDirectory.tsx:233` |
| Pagination scroll | `smooth`, block start | `BlogDirectory.tsx:82` |
| Reduced motion | disables smooth scroll, all portfolio animations/transitions | `global.css:343-349` |

**Interaction rules:**
- Hover effects must be gated by `@media (hover: hover)` only where the source does so (accordion label). Other hover utilities are not gated.
- No parallax, scroll-jacking, or reveal-on-scroll for text.
- The lanyard is the only physics simulation.
- Spotlight is pointer-only; it must not affect keyboard focus.
- Do not add page-transition animations.

**Reduced-motion gap:** the global reduced-motion rule targets `.portfolio-content *` only. Navbar chevron, spotlight, reading bar, and lanyard reveal are not covered. **Inferred:** a rebuild should extend reduced-motion handling to those, but that would be an intentional improvement, not a reproduction of source.

---

## 25. Responsive Behaviour

**Breakpoints (Verified from source usage):**

| Name | Min width | Tailwind |
|---|---|---|
| Mobile | 0 | base |
| `sm` | 640px | `sm:` |
| `lg` | 1024px | `lg:` |

No custom breakpoints are configured. No `md` or `xl` usage was found in the audited UI.

### Changes at `sm` (640px)
- Page gutter 14px → 24px.
- Navbar inner min-height stays 56px due to global override; intended 48 → 56.
- Nav text 12 → 14px; gaps 16 → 24px.
- Hero height 380 → 440px.
- Hero background switches from dual masked edge layers to full botanical frame.
- SSR card 140×197 → 162×228; strap 21×54 → 24×64; clamp 25×12 → 29×14; ring 14 → 16px.
- Hero name 28 → 32px.
- Identity padding 20/18/16 → 24px.
- Accordion trigger 58 → 62px; label 14 → 15px.
- Blog page padding 40 → 80px top/bottom.
- Article page padding 32 → 64px.
- Blog row padding 28 → 32px.
- Footer padding 24 → 28px.
- Article H1 24 → 36px; blog H1 24 → 36px.
- Identity H1 uses fluid clamp, not a step.

### Changes at `lg` (1024px)
- Article grid becomes 12 columns.
- Content spans 8; TOC spans 4.
- Gap 32 → 48px.
- TOC becomes sticky at `top: 96px` and moves after content.
- Hero height 440 → 480px.
- SSR card 162×228 → 178×250; strap 24×64 → 26×70; clamp 29×14 → 31×14; hero name 32 → 36px.
- Canvas stage 880 → 940px.

### Rules
- Mobile-first; base styles must work at 320px.
- No horizontal scrolling. `overflow-x-hidden` plus `min-width: 0` and `overflow-wrap: anywhere` are mandatory.
- Long unbroken strings (emails, URLs, German/Marathi compounds) must wrap, not clip.
- The 768px content column never widens.
- Hero must not crop the card; `overflow-visible` on the section is intentional.

---

## 26. Theming

**Verified from source:**
- One theme only. `color-scheme: light`; `theme-color: #fafafa` (`BaseLayout.astro:280-281`).
- No `prefers-color-scheme` query.
- No `.dark` class, no theme toggle, no alternate token set.
- CSS custom properties are declared once on `:root` and `.portfolio-content`.
- The only persisted preference is locale (`preferred_locale`), not theme.

| Theme token | Value |
|---|---|
| `color-scheme` | `light` |
| `theme-color` | `#fafafa` |
| Page background | `#fafafa` |
| Page foreground | `#09090b` |
| Selection background | `#18181b` |
| Selection foreground | `#ffffff` |

**Rules for a rebuild:**
- Do not invent dark mode and call it part of this system.
- If dark mode is added, it must be a new, separately specified token set; the source provides none.
- Keep `theme-color` equal to the canvas so mobile browser chrome blends with the page.
- Keep locale persistence separate from theme persistence.

---

## 27. Accessibility

**Verified from source:**
- Semantic landmarks: `<header>`, `<nav aria-label="Primary Navigation">`, `<main id="main-content">`, `<footer>`, `<article>`, `<aside aria-label>`, `<section>`.
- Navbar current page: `aria-current="page"`.
- Language dropdown: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `role="listbox"`, `role="option"`, `aria-selected`, `Escape` to close and restore focus.
- Accordion: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`, `hidden`, keyboard arrows/Home/End.
- Decorative icons: `aria-hidden="true"` in most cases.
- Icon-only links: `aria-label` present (GitHub, Instagram, LinkedIn, clear search, previous/next).
- Search: `aria-label` on input; filter toolbar labelled; pagination nav labelled.
- Copy buttons: visible text labels; copied state also textual.
- Focus: global 2px outline with 3px offset; many controls add rings.
- Reduced motion: portfolio animations and smooth scroll disabled.
- Min target sizes in portfolio: 40px; 404 links: 44px; navbar links: 40px.
- Blog filter pills, pagination buttons, footer icon buttons, and language trigger are 30–32px. This meets WCAG 2.2 minimum target size (24px) **if** spacing exceptions are satisfied; that is not verified.

**Gaps / risks (Unavailable or not verified):**
- No skip link to `#main-content`.
- Contrast ratios not measured.
- Screen-reader announcements for search result count and copied state are not implemented via live regions.
- The accordion uses `role="region"` on every panel; this can add landmark noise.
- `title` attributes are used as expand/collapse hints on the indicator, which is not reliably announced.
- No visible focus style is specified for the search input beyond the ring.
- Touch target sizing of all 24–32px controls needs measurement in context.
- No `aria-live` for pagination page changes.
- Language dropdown does not implement full arrow-key listbox navigation; only click, Escape, and outside click.

**Do not claim WCAG conformance.** State only what is implemented.

---

## 28. Internationalization

**Verified from source (`src/i18n/config.ts`, `astro.config.mjs`):**

| Locale code | Label | Native name | `htmlLang` | `ogLocale` |
|---|---|---|---|---|
| `en` | English | English | `en` | `en_US` |
| `mr` | Marathi | मराठी | `mr` | `mr_IN` |
| `jp` | Japanese | 日本語 | `ja` | `ja_JP` |
| `ko` | Korean | 한국어 | `ko` | `ko_KR` |
| `zh` | Chinese | 中文 | `zh-CN` | `zh_CN` |
| `ru` | Russian | Русский | `ru` | `ru_RU` |
| `pt` | Portuguese | Português | `pt` | `pt_BR` |
| `tr` | Turkish | Türkçe | `tr` | `tr_TR` |
| `fr` | French | Français | `fr` | `fr_FR` |
| `es` | Spanish | Español | `es` | `es_ES` |

- Default locale: `en`.
- Locale prefix is always present in routes: `/{locale}/`, `/{locale}/blog/`, `/{locale}/blog/{slug}`.
- Root `/` redirects to saved locale or `/en/`.
- Locale switch preserves sub-path (`switchLocalePath`).
- `hreflang` alternates for all 10 locales plus `x-default` → English (`BaseLayout.astro:301-308`).
- UI strings live in `UI_TRANSLATIONS`; templates use placeholders `{current}`, `{total}`, `{count}` replaced in `BlogDirectory.tsx:87-93`.
- Marathi is the only locale with fully localized portfolio copy; English is the fallback for the rest.
- Footer Marathi string says “10 languages” (`config.ts:691`), while English `siteDescription` says “9 languages” (`config.ts:147`). **Content inconsistency to resolve.**
- Locale code `jp` is used for Japanese even though the standard ISO code is `ja`; `htmlLang` correctly uses `ja`.

**Rules:**
- Never translate brand name “Girish Lade.” or “LadeStack”.
- Keep locale codes stable; they are URLs.
- Keep `htmlLang` different from the route code where required (`jp` → `ja`, `zh` → `zh-CN`).
- Test layouts with Japanese, Chinese, Marathi, Russian, and German-length strings.
- Do not assume English string length.

---

## 29. SEO and Social Metadata

**Verified from source (`BaseLayout.astro`, `src/pages/api/og/[lang]/[slug].svg.ts`, route files):**

| Item | Spec |
|---|---|
| Title pattern | `{pageTitle} | Girish Lade.`; homepage uses `siteTitle` |
| Description | page prop or localized `siteDescription` |
| Canonical | `{siteOrigin}{currentPath}` |
| hreflang | 10 locales + `x-default` |
| OG type | `website` or `article` |
| OG image | article: `/api/og/{locale}/{slug}.svg`; else `/assets/aistudio/image_a475d35f.webp` |
| OG dimensions | 1200×630 |
| Twitter card | `summary_large_image` |
| Twitter creator | `@girishlade` |
| Robots | `index, follow`; `noindex, follow` on 404 |
| JSON-LD | `WebSite`, `Organization`, `Person`, `BreadcrumbList`, optional `BlogPosting` |
| Feeds | `/rss.xml`, `/{locale}/rss.xml` |
| Sitemap | `/sitemap.xml` |
| Agent discovery | `/llms.txt`, `/llms-full.txt`, `/ai-catalog.json` |
| Referrer | `strict-origin-when-cross-origin` |
| Preloads | hero webp + profile jpeg, both high priority |

**OG SVG design (Verified from source):**
- 1200×630, dark radial gradient `#18181b` → `#09090b`.
- 40×40 grid of `rgba(255,255,255,0.04)` lines.
- Outer frame: `30,30`, `1140×570`, radius 24, stroke `rgba(255,255,255,0.08)`, width 2.
- Brand block at `90,95`: 16×16 white rounded square; “GIRISH LADE” 14px 700, letter-spacing 1.5, `#fafafa`; dot `#71717a`; “LADESTACK” 14px 600, spacing 1, `#a1a1aa`.
- Category pill: `740,-8`, `220×32`, radius 16, white 6% fill, white 12% stroke, 12px `#e4e4e7` text.
- Title: 44px 700 white, `-0.5` spacing, starts at `90,280`, line height 56, max 3 lines, wrap at 38 chars.
- Footer: `90,515`, 14px mono, `#a1a1aa`, `{date} · {readingTime} MIN READ · girish.ladestack.in`.
- Font is system UI stack in SVG, not the site’s web fonts.

**Rules:**
- Keep the 1200×630 OG frame and dark inversion.
- Do not place the light site background behind the OG title.
- Keep social metadata independent of visible page layout.
- Do not expose secrets or private data in metadata.

---

## 30. Reconstruction Playbook

Build in this order. Each step ends with a check; do not proceed on a failed check.

### Step 1 — Project shell
- Create Astro + React + Tailwind v4 project.
- Install `lucide-react`, `three`.
- Add Google Fonts: Plus Jakarta Sans 500/600/700, DM Sans opsz 9..40 400/500/600, JetBrains Mono 400/500, Cormorant Garamond 600/700.
- **Check:** computed `font-family` on `body` is DM Sans; headings are Plus Jakarta Sans.

### Step 2 — Tokens and global CSS
- Declare the three font variables and four portfolio variables.
- Set `html` colour, background, smooth scroll, antialiasing.
- Add heading family + `text-wrap: balance`; mono tabular numerals.
- Add global focus-visible outline.
- Add reduced-motion rules.
- **Check:** focus ring is `2px #52525b` at `3px` offset on every link and button.

### Step 3 — Shell layout
- Build `body` flex column, `main` `max-w-3xl`, gutters 14/24px, footer at bottom.
- Add `overflow-x-hidden`, `min-width: 0`.
- **Check:** no horizontal scroll at 320px.

### Step 4 — Navbar
- Sticky, 90% canvas, blur, 1px 70% border, 56px min height.
- Brand with period, two links, active underline, language listbox.
- **Check:** active link is underline + weight, not a pill; dropdown closes on outside click and Escape.

### Step 5 — Hero and lanyard
- Build the botanical frame with desktop radial blend and mobile dual masks.
- Build the SSR poster at the exact dimensions.
- Add the 3D lanyard with the parameter table.
- Hide poster when `data-lanyard-ready="true"`.
- **Check:** no layout shift when the canvas replaces the poster; hero is 380/440/480px.

### Step 6 — Identity card
- Spotlight card, 18px radius, 20/24px padding, name/location/headline/quote/action row.
- **Check:** actions are 40px tall and wrap without clipping.

### Step 7 — Accordion directory
- Ten sections, all collapsed, single-expand, plus/minus, ARIA, keyboard.
- Apply exact trigger heights and label sizes.
- **Check:** only one panel open after clicking a second section; arrow keys move focus.

### Step 8 — Accordion content
- Recreate each module with 8px inner cards, 2/3-column grids, mono metadata.
- **Check:** long URLs and emails wrap inside cards; no horizontal overflow.

### Step 9 — Blog index
- Header, search, filters, six-per-page rows, empty state, pagination.
- **Check:** query + category combine; page resets to 1; empty state resets both.

### Step 10 — Article
- Reading bar, back link, meta row, copy link, 8/4 grid, TOC, prose.
- Add code wrapper enhancement.
- **Check:** TOC is first on mobile, sticky right rail at 1024px; reading bar reaches 100% at article end.

### Step 11 — Footer and utility pages
- Footer with brand, dot, copyright, two links, three social icons.
- 404 with 44ch measure and 44px links.
- Root redirect with locale memory.
- **Check:** footer sits at the bottom on short pages.

### Step 12 — SEO, i18n, QA
- Add title pattern, canonical, hreflang, OG, Twitter, JSON-LD.
- Add 10 locales and route generation.
- Test 320px, 640px, 1024px, 1440px.
- Test reduced motion, keyboard-only, and 200% zoom.
- **Check:** no clipped text in any locale; all images have alt text; no console errors.

---

## 31. AI Agent Contract and Fidelity Checklist

### 31.1 Contract — must

1. Use only the documented values. If a value is absent, mark it **Unavailable** or ask; do not invent.
2. Preserve `#fafafa` canvas, `#09090b` ink, and the zinc-only accent system.
3. Preserve the 768px main column, 14/24px gutters, and 56px navbar.
4. Preserve the font roles: Plus Jakarta Sans display, DM Sans body, JetBrains Mono metadata, Cormorant Garamond hero only.
5. Preserve the hero as the only 3D element, with the poster fallback and deferred loading.
6. Preserve one-at-a-time accordion expansion and all ten section keys.
7. Preserve the 8/4 article split at `lg` and the sticky TOC.
8. Preserve 6 posts per page on the blog index.
9. Preserve the single light theme. Do not add dark mode and call it source fidelity.
10. Preserve reduced-motion handling and visible focus.
11. Label every finding as verified, inferred, or unavailable in any further design documentation.
12. Keep content wrapping safe: `min-width: 0`, `overflow-wrap: anywhere`, flexible grids.

### 31.2 Contract — must not

1. Do not add gradients to cards, buttons, or page sections. The only gradients are the metal clamp, hero masks/blends, OG background, and text shadow.
2. Do not add a brand hue, neon accent, glassmorphism panel, or large blur blob.
3. Do not add a second display font or a script font.
4. Do not replace the plus/minus accordion indicator with a chevron.
5. Do not add a hero CTA, headline, or subtitle.
6. Do not widen the main column.
7. Do not add scroll-jacking, parallax text, or page transitions.
8. Do not claim WCAG compliance, Lighthouse scores, or pixel accuracy without measurement.
9. Do not copy placeholder copy as final content when real content is available.
10. Do not expose API keys, tokens, or private paths in design docs or metadata.
11. Do not modify source files when the task is documentation-only.
12. Do not treat Tailwind class names as tokens without resolving their underlying values.

### 31.3 Fidelity checklist

| # | Check | Pass condition |
|---|---|---|
| 1 | Canvas | `#fafafa` on every page; no dark section background |
| 2 | Ink | Primary text `#09090b`; body prose `#3f3f46` |
| 3 | Accent | No hue outside zinc, except emerald copy success and the unused metal options |
| 4 | Display face | Plus Jakarta Sans on all headings and brand |
| 5 | Body face | DM Sans on body and UI |
| 6 | Mono | JetBrains Mono on metadata, codes, dates, counts |
| 7 | Hero serif | Cormorant Garamond on “Girish Lade” only |
| 8 | Column | 768px max, 14/24px gutters |
| 9 | Navbar | Sticky, 90% canvas, blur, 56px min height |
| 10 | Hero heights | 380 / 440 / 480px |
| 11 | Lanyard config | Portrait, glossy, silver, 0.52 size, 0.35 strap |
| 12 | Identity card | 18px radius, 20/24px padding, spotlight |
| 13 | Accordion | 10 sections, all collapsed, one open at a time |
| 14 | Accordion geometry | 58/62px trigger, 14/15px label |
| 15 | Blog rows | 6 per page, hairline separators, 40px read link |
| 16 | Article grid | 8/4 at 1024px, TOC sticky at 96px |
| 17 | Prose | 68ch, 1.75 line-height, 1.35rem rhythm |
| 18 | Code | Dark `#18181b`/`#121214` only |
| 19 | Footer | One row at `sm`, 32px social buttons |
| 20 | Motion | 75–300ms functional motion; reduced-motion respected |
| 21 | Focus | 2px `#52525b` outline, 3px offset |
| 22 | i18n | 10 locales, correct `htmlLang`, preserved sub-path |
| 23 | Metadata | 1200×630 OG, canonical, hreflang, JSON-LD |
| 24 | Overflow | No horizontal scroll at 320px in any locale |
| 25 | Honesty | No unmeasured accessibility or performance claim |

---

## 32. Source Traceability, Token Inventory, and Final Summary

### 32.1 Source traceability

| Area | File | Lines |
|---|---|---|
| Global tokens, prose, portfolio CSS, focus, responsive, reduced motion | `src/styles/global.css` | 1–350 |
| Shell, fonts, metadata, JSON-LD, body/main | `src/layouts/BaseLayout.astro` | 195–351 |
| Navbar and language dropdown | `src/components/Navbar.astro` | 27–233 |
| Footer | `src/components/Footer.astro` | 18–121 |
| Homepage hero, SSR poster, lanyard config, name plate | `src/pages/[lang]/index.astro` | 33–132 |
| Botanical hero layers and masks | `src/components/HeroBackground.astro` | 15–58 |
| Portfolio identity card, actions, ten sections, module content | `src/components/PortfolioSections.tsx` | 22–916 |
| Accordion structure, ARIA, keyboard | `src/components/reactbits/AnimatedAccordion.tsx` | 22–145 |
| Accordion state logic | `src/utils/accordion.ts` | 1–123 |
| Spotlight pointer effect | `src/components/reactbits/SpotlightCard.tsx` | 10–57 |
| Blog search, filters, rows, empty state, pagination | `src/components/BlogDirectory.tsx` | 12–323 |
| Blog index header and composition | `src/pages/[lang]/blog/index.astro` | 26–53 |
| Article header, grid, TOC, progress, code enhancer | `src/pages/[lang]/blog/[slug].astro` | 42–249 |
| 404 design | `src/pages/404.astro` | 5–25 |
| Root redirect screen | `src/pages/index.astro` | 9–71 |
| Lanyard 3D materials and camera | `src/components/Lanyard.jsx` | 21–33, 146–148, 835–876, 925–1263 |
| Lanyard reveal CSS | `src/components/Lanyard.css` | 1–28 |
| Lanyard lazy loading | `src/components/LanyardDeferred.tsx` | 1–27 |
| Gyroscope physics | `src/utils/gyro.ts` | 1–92 |
| Locale metadata, strings, routing helpers | `src/i18n/config.ts` | 1–762 |
| OG SVG design | `src/pages/api/og/[lang]/[slug].svg.ts` | 58–99 |
| Dependencies and scripts | `package.json` | 1–39 |

### 32.2 Token inventory and counting method

**Total catalogued: 112 design tokens/values.**

| Category | Count | What was counted |
|---|---:|---|
| CSS custom properties | 7 | 3 font vars + 4 portfolio vars |
| Colour values | 28 | Unique hex literals, including metal options and mask black; alpha variants not counted separately |
| Font families | 4 | Display, sans, mono, hero serif |
| Font weights | 4 | 400, 500, 600, 700 |
| Type sizes | 17 | Unique px/rem/em sizes in use, including derived `0.84rem`, `0.85em`, `1.65rem` |
| Spacing steps | 18 | 4px-scale steps actually used: 2–72 |
| Radii | 11 | 3, 4, 6, 8, 10, 12, 14, 16, 18, 16 (`2xl`), full |
| Shadows | 8 | 4 Tailwind steps + identity + ID card + text shadow + inner |
| Motion values | 9 | 7 durations + 2 easings, plus scroll behaviour counted as one |
| Breakpoints | 2 | 640px, 1024px |
| Border widths | 4 | 1px, 1.5px underline, 2px outline, 2.5px bar |

**Counting rules:**
- Deduplicated across all audited files.
- Tailwind utilities counted once at their resolved value.
- Opacity modifiers (`/70`, `/90`, `/95`) are treated as alpha variants, not new colours.
- Component dimensions (140px card, 208px dropdown, etc.) are **not** counted as tokens; they are component specs.
- This is a documentation inventory, not a generated token file. No `tokens.json` exists in the repository.

### 32.3 Major effects inventory

1. 3D lanyard with spring physics, drag interaction, and gyroscope.
2. Botanical hero frame with desktop radial blend and mobile dual edge masks.
3. Pointer-tracked radial spotlight on the identity card.
4. Single-expand accordion with plus/minus rotation and 160ms fade.
5. Article reading-progress bar driven by `requestAnimationFrame`.
6. Dark code-block wrapper with language badge and copy-success state.
7. Blog search + faceted category filtering + pagination.
8. Sticky translucent navbar with custom accessible language listbox.

### 32.4 Unresolved details

**Unavailable or not verified without rendering:**
- Exact computed heights where global CSS overrides Tailwind utilities (navbar, portfolio buttons, identity card).
- Whether the `.accordion-body .grid > div` reset visually removes intended card borders in all modules.
- Contrast ratios for muted text, placeholders, and 10–11px metadata.
- Focus-ring stacking where both global outline and Tailwind ring apply.
- Whether the 3D lanyard’s poster-to-canvas handoff is visually seamless at all viewport sizes.
- Real performance numbers for the three.js bundle, font loading, and LCP.
- Screen-reader behaviour of the custom listbox and accordion landmark structure.
- Whether `overflow-x-hidden` masks any real overflow rather than preventing it.
- The hardcoded footer year `2024` versus the current date.
- The “9 languages” copy versus 10 configured locales.

### 32.5 Final summary

This design system is a light, paper-toned, editorial portfolio built from a very small palette and four tightly scoped typefaces. Its identity depends on restraint: a 768px column, hairline zinc borders, near-black ink, one physical 3D object, and a dense but calm accordion of professional information. The blog extends the same language into a reading surface with a dark-only code exception.

A rebuild is faithful when it reproduces the **canvas, ink, column, type roles, hero object, card/accordion geometry, article split, and motion restraint** — not when it merely copies Tailwind class names. All values above are source-extracted. Anything not extracted is marked inferred or unavailable. No visual, contrast, performance, or WCAG claim is made.

---

*End of specification.*
