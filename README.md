# Astro Multilingual Portfolio & Blog

A minimal, SEO-optimized multilingual portfolio and Markdown blog built entirely with **Astro JS**, supporting **9 languages** out of the box.

**Live site:** [ladestack.in](https://ladestack.in/) &nbsp;|&nbsp; **Author:** [Girish Lade](https://github.com/girishlade111) &nbsp;|&nbsp; **Brand:** [LadeStack](https://ladestack.in/)

---

## Overview

This project is a production-ready personal portfolio and blog starter that combines:

- A **full portfolio** with 10 content sections (profile, story, education, vision, products, prototypes, capabilities, workflow, contact, and more)
- A **Markdown-powered blog** with per-language content collections
- Native Astro **i18n routing** across 9 locales with hreflang SEO metadata
- React components for interactive UI (animated accordion, spotlight cards, Lanyard, Three.js hero background)
- Tailwind CSS v4 via the Vite plugin, zero config
- TypeScript throughout, strict mode

---

## Supported Languages

| Code | Language   | Native Name |
|------|------------|-------------|
| `en` | English    | English     |
| `jp` | Japanese   | 日本語       |
| `ko` | Korean     | 한국어       |
| `zh` | Chinese    | 中文         |
| `ru` | Russian    | Русский      |
| `pt` | Portuguese | Português   |
| `tr` | Turkish    | Türkçe      |
| `fr` | French     | Français    |
| `es` | Spanish    | Español     |

All UI strings, blog content, and SEO metadata are fully translated for each locale. URLs follow the pattern `/{lang}/` (e.g. `/jp/`, `/fr/blog/my-post`).

---

## Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Framework    | [Astro](https://astro.build/) v7                |
| UI Library   | [React](https://react.dev/) v19 via `@astrojs/react` |
| Styling      | [Tailwind CSS](https://tailwindcss.com/) v4 (Vite plugin) |
| Language     | TypeScript v7, strict                           |
| 3D / Motion  | [Three.js](https://threejs.org/), [Motion](https://motion.dev/) |
| Icons        | [Lucide React](https://lucide.dev/)             |
| Build tool   | Vite v8 + esbuild v0.28                         |
| AI API       | Google Gemini via `@google/genai`               |
| Server       | Express (optional API layer)                    |

---

## Project Structure

```
astro-multilingual-portfolio-&-blog/
├── public/                        # Static assets (favicon, OG images, etc.)
├── src/
│   ├── components/
│   │   ├── Footer.astro           # Site footer with locale switcher
│   │   ├── HeroBackground.astro   # Three.js animated hero canvas
│   │   ├── Lanyard.jsx            # Interactive Lanyard / ID card component
│   │   ├── Navbar.astro           # Responsive top navigation with language picker
│   │   ├── PortfolioSections.tsx  # Main portfolio content renderer (10 sections)
│   │   └── reactbits/
│   │       ├── AnimatedAccordion.tsx
│   │       ├── BlurText.tsx
│   │       ├── DecryptedText.tsx
│   │       ├── ShinyText.tsx
│   │       └── SpotlightCard.tsx
│   ├── content/
│   │   └── blog/
│   │       ├── en/template-post.md
│   │       ├── jp/template-post.md
│   │       ├── ko/template-post.md
│   │       ├── zh/template-post.md
│   │       ├── ru/template-post.md
│   │       ├── pt/template-post.md
│   │       ├── tr/template-post.md
│   │       ├── fr/template-post.md
│   │       └── es/template-post.md
│   ├── data/
│   │   └── portfolioContent.ts    # All localized portfolio data (9 languages)
│   ├── i18n/
│   │   ├── config.ts              # Locale metadata, UI translations, routing helpers
│   │   └── config.test.ts         # Unit tests for i18n utilities
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML shell, SEO head, hreflang tags
│   ├── pages/
│   │   ├── index.astro            # Root redirect to default locale
│   │   └── [lang]/
│   │       ├── index.astro        # Localized home / portfolio page
│   │       └── blog/
│   │           ├── index.astro    # Blog listing page
│   │           └── [slug].astro   # Individual blog post with ToC & cross-links
│   ├── styles/
│   │   └── global.css             # Global Tailwind imports and base styles
│   └── utils/
│       ├── accordion.ts           # Accordion state utilities
│       ├── blog.ts                # Blog collection helpers
│       └── gyro.ts                # Gyroscope / tilt effect utilities
├── .env.example                   # Environment variable template
├── .gitignore
├── astro.config.mjs               # Astro config: i18n, React, Tailwind, Vite
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/astro-multilingual-portfolio-blog.git
cd astro-multilingual-portfolio-blog

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable         | Description                                              |
|------------------|----------------------------------------------------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features                    |
| `APP_URL`        | Public URL of the deployed site (e.g. `https://ladestack.in`) |

> The app runs without these variables in local development. AI-powered features will be disabled without `GEMINI_API_KEY`.

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Hot Module Replacement is enabled by default.

### Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

---

## i18n Architecture

Routing is handled by Astro's native i18n with `prefixDefaultLocale: true`, meaning the English default locale is served under `/en/` like every other language. The root `/` redirects to `/en/`.

```
/en/              -> English portfolio
/jp/              -> Japanese portfolio
/fr/blog/         -> French blog listing
/ru/blog/my-post  -> Russian blog post
```

**Key files:**

- [`src/i18n/config.ts`](src/i18n/config.ts) — locale list, UI string map, routing helpers (`switchLocalePath`, `getAlternateLinks`, `resolveLocale`)
- [`src/data/portfolioContent.ts`](src/data/portfolioContent.ts) — all portfolio copy localized into 9 languages
- [`src/content/blog/{lang}/`](src/content/blog/) — per-locale Markdown blog content

**Adding a new language:**

1. Add the locale code to `LOCALES` and `LOCALE_METADATA` in `src/i18n/config.ts`
2. Add translated `UIStrings` to `UI_TRANSLATIONS`
3. Add a localized data block to `portfolioContent.ts`
4. Create `src/content/blog/{newlang}/` and add Markdown posts
5. Update `astro.config.mjs` to include the new locale in the `i18n.locales` array

---

## Blog

Blog posts are plain Markdown files under `src/content/blog/{lang}/`. Each post uses frontmatter:

```markdown
---
title: "My Post Title"
description: "A short description shown in the blog listing."
pubDate: 2025-01-01
---

Post body in Markdown...
```

Features on every post page:
- Auto-generated **table of contents** from headings
- **Reading time** estimate
- **Cross-language links** — links to the same post in all other available languages
- **Copy link** button
- Fully semantic HTML output, no client-side JS required for content

---

## Portfolio Sections

The portfolio renders 10 collapsible sections from `src/data/portfolioContent.ts`:

| # | Section         | Content                                              |
|---|-----------------|------------------------------------------------------|
| 01 | About & Identity | Bio (short / summary / full), quick-facts table      |
| 02 | Experience & Journey | 5-chapter career narrative                       |
| 03 | Education       | Academic + self-directed learning                    |
| 04 | Vision & Values | Personal/brand mission + 10 core principles          |
| 05 | LadeStack Ecosystem | Brand overview, audience, architecture           |
| 06 | Products & Web Apps | 9 live products with stacks, use cases, links   |
| 07 | Prototypes & R&D | 9 experimental / lab projects                       |
| 08 | Skills & Tech Stack | 10 capability domains + technology landscape    |
| 09 | Workflow & Approach | 8-step process + offerings                      |
| 10 | Contact & Socials | Email, GitHub, LinkedIn, social channels           |

---

## Components

| Component              | Type    | Description                                                  |
|------------------------|---------|--------------------------------------------------------------|
| `Navbar.astro`         | Astro   | Sticky top nav with anchor links and language switcher       |
| `HeroBackground.astro` | Astro   | Three.js canvas for animated background in the hero section  |
| `Lanyard.jsx`          | React   | Interactive identity card / lanyard with gyro tilt effect    |
| `PortfolioSections.tsx`| React   | Accordion-driven portfolio section renderer                  |
| `AnimatedAccordion.tsx`| React   | Smooth animated expand/collapse for section panels           |
| `SpotlightCard.tsx`    | React   | Card with a moving spotlight hover effect                    |
| `BlurText.tsx`         | React   | Text reveal with blur-in animation                           |
| `DecryptedText.tsx`    | React   | Character scramble / decryption text effect                  |
| `ShinyText.tsx`        | React   | Shimmering gradient text effect                              |
| `Footer.astro`         | Astro   | Site footer with copyright, SEO note, active locale display  |

---

## SEO

Every page includes:

- `<title>` and `<meta name="description">` from localized UI strings
- `<link rel="canonical">` pointing to the current locale URL
- `<link rel="alternate" hreflang="...">` for all 9 supported languages + `x-default`
- Open Graph tags (`og:title`, `og:description`, `og:locale`, `og:type`)
- Static HTML output — no client-side rendering delay for crawlers

---

## Scripts Reference

| Script          | Command           | Description                              |
|-----------------|-------------------|------------------------------------------|
| Dev server      | `npm run dev`     | Start on port 3000 with HMR              |
| Build           | `npm run build`   | Compile to `dist/`                       |
| Preview         | `npm run preview` | Serve built output locally               |
| Type check      | `npm run lint`    | Run `tsc --noEmit`                       |
| Clean           | `npm run clean`   | Remove `dist/` and `.astro/` cache       |

---

## Deployment

This project produces a fully static output (`dist/`) compatible with any static host:

- **Vercel** — connect the repo, set `npm run build` as the build command, `dist` as the output directory
- **Netlify** — same as Vercel
- **GitHub Pages** — use the official Astro GitHub Actions workflow
- **Cloudflare Pages** — connect repo, build command `npm run build`, output `dist`

Set the `APP_URL` environment variable to your production domain.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a pull request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**Girish Balaso Lade** — UI/UX Designer, Full-Stack Developer, Founder of [LadeStack](https://ladestack.in/)

- Website: [ladestack.in](https://ladestack.in/)
- GitHub: [@girishlade111](https://github.com/girishlade111)
- Email: admin@ladestack.in
