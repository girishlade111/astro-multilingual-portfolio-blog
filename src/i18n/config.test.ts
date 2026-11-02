import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import astroConfig from '../../astro.config.mjs';
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_METADATA,
  isValidLocale,
  resolveLocale,
  getTranslations,
  extractSubPath,
  switchLocalePath,
  getAlternateLinks,
} from './config';
import { computeGyroForces } from '../utils/gyro';
import { getPortfolioContent } from '../data/portfolioContent';
import {
  areAllAccordionItemsOpen,
  createInitialAccordionState,
  getNextAccordionFocusIndex,
  isAccordionItemOpen,
  openAccordionItem,
  toggleAccordionItem,
  toggleAllAccordionItems,
} from '../utils/accordion';

test('astro.config.mjs has built-in i18n configured for all 9 languages with directory prefix routing', () => {
  assert.ok(astroConfig.i18n, 'astro.config.mjs must define i18n configuration');
  assert.equal(astroConfig.i18n.defaultLocale, 'en');
  assert.deepEqual(
    astroConfig.i18n.locales,
    ['en', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es']
  );
  assert.equal(typeof astroConfig.i18n.routing, 'object');
  if (typeof astroConfig.i18n.routing === 'object') {
    assert.equal(astroConfig.i18n.routing.prefixDefaultLocale, true);
  }
});

test('supports the exact 9 requested languages', () => {
  assert.deepEqual(
    [...LOCALES],
    ['en', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es']
  );
  assert.equal(LOCALES.length, 9);
  assert.equal(DEFAULT_LOCALE, 'en');
});

test('validates and resolves locales accurately', () => {
  for (const locale of LOCALES) {
    assert.equal(isValidLocale(locale), true);
    assert.equal(resolveLocale(locale), locale);
    assert.ok(LOCALE_METADATA[locale].nativeName.length > 0);
  }
  assert.equal(isValidLocale('de'), false);
  assert.equal(isValidLocale(undefined), false);
  assert.equal(resolveLocale('invalid'), 'en');
});

test('extracts subpath and switches locale URLs cleanly across pages', () => {
  assert.equal(extractSubPath('/en/'), '/');
  assert.equal(extractSubPath('/ru/blog'), '/blog');
  assert.equal(extractSubPath('/jp/blog/template-post'), '/blog/template-post');

  assert.equal(switchLocalePath('/en/', 'ru'), '/ru/');
  assert.equal(switchLocalePath('/ru/', 'jp'), '/jp/');
  assert.equal(switchLocalePath('/en/blog', 'jp'), '/jp/blog');
  assert.equal(switchLocalePath('/jp/blog/template-post', 'es'), '/es/blog/template-post');
  assert.equal(switchLocalePath('/fr/blog/template-post/', 'ko'), '/ko/blog/template-post');
});

test('generates complete SEO hreflang alternate links for all 9 languages', () => {
  const alternates = getAlternateLinks('/en/blog/template-post', 'https://portfolio.example.com');
  assert.equal(alternates.length, 9);
  const jpLink = alternates.find((a) => a.locale === 'jp');
  assert.ok(jpLink);
  assert.equal(jpLink.href, 'https://portfolio.example.com/jp/blog/template-post');
  assert.equal(jpLink.hreflang, 'ja');

  const ruLink = alternates.find((a) => a.locale === 'ru');
  assert.ok(ruLink);
  assert.equal(ruLink.href, 'https://portfolio.example.com/ru/blog/template-post');
  assert.equal(ruLink.hreflang, 'ru');
});

test('provides complete translations for every language', () => {
  for (const locale of LOCALES) {
    const t = getTranslations(locale);
    assert.ok(t.siteTitle.length > 0);
    assert.ok(t.nav.home.length > 0);
    assert.ok(t.nav.blog.length > 0);
    assert.ok(t.blog.title.length > 0);
    assert.ok(t.footer.rights.length > 0);
  }
});

test('has 9 localized Markdown files for blog posts across all 9 languages', () => {
  for (const locale of LOCALES) {
    const filePath = path.resolve(process.cwd(), 'src/content/blog', locale, 'why-i-built-ladestack-browser-first-tools.md');
    assert.equal(fs.existsSync(filePath), true, `Missing markdown file for locale: ${locale}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.includes('slug: "why-i-built-ladestack-browser-first-tools"'), `Missing slug in ${locale}/why-i-built-ladestack-browser-first-tools.md`);
    assert.ok(content.includes(`lang: "${locale}"`), `Missing lang in ${locale}/why-i-built-ladestack-browser-first-tools.md`);
    assert.ok(content.includes('## '), `Missing Markdown H2 section in ${locale}/why-i-built-ladestack-browser-first-tools.md`);
  }
});

test('integrates 3D Lanyard component with attached user profile image and responsive Hero background in Hero section', () => {
  const profileImgPath = path.resolve(process.cwd(), 'public/assets/profile.jpeg');
  assert.equal(fs.existsSync(profileImgPath), true, 'Attached profile image must exist in public/assets');

  const heroBgImgPath = path.resolve(process.cwd(), 'public/assets/aistudio/image_a475d35f.webp');
  assert.equal(fs.existsSync(heroBgImgPath), true, 'Attached hero reference background image must exist in public/assets/aistudio');

  const heroBgComponentPath = path.resolve(process.cwd(), 'src/components/HeroBackground.astro');
  assert.equal(fs.existsSync(heroBgComponentPath), true, 'HeroBackground.astro component must exist');
  const heroBgContent = fs.readFileSync(heroBgComponentPath, 'utf-8');
  assert.ok(heroBgContent.includes('hidden sm:block'), 'HeroBackground must include desktop responsive layer');
  assert.ok(heroBgContent.includes('block sm:hidden'), 'HeroBackground must include mobile responsive layer');

  const lanyardPath = path.resolve(process.cwd(), 'src/components/Lanyard.jsx');
  assert.equal(fs.existsSync(lanyardPath), true, 'Lanyard.jsx component must exist');
  const lanyardContent = fs.readFileSync(lanyardPath, 'utf-8');
  assert.ok(lanyardContent.includes('getLoadedImageSync'), 'Lanyard.jsx must synchronously reuse preloaded DOM image when ready');

  const indexAstroPath = path.resolve(process.cwd(), 'src/pages/[lang]/index.astro');
  const indexContent = fs.readFileSync(indexAstroPath, 'utf-8');
  assert.ok(indexContent.includes('<HeroBackground'), 'Homepage must render <HeroBackground /> in Hero section');
  assert.ok(indexContent.includes('/assets/aistudio/image_a475d35f.webp'), 'Homepage must pass reference background image to HeroBackground');
  assert.ok(indexContent.includes('id="lanyard-ssr-preview"'), 'Homepage must render instant 0ms SSR Lanyard preview');
  assert.ok(indexContent.includes('id="lanyard-preload-profile"'), 'Homepage must include high-priority preloaded profile img in SSR HTML');
  assert.ok(indexContent.includes('<Lanyard'), 'Homepage must render <Lanyard />');
  assert.ok(indexContent.includes('/assets/profile.jpeg'), 'Homepage must pass attached profile image to Lanyard');
  assert.ok(indexContent.includes('gyroscope={true}'), 'Homepage must enable gyroscope on Lanyard');
  assert.ok(indexContent.includes('<PortfolioSections'), 'Homepage must render <PortfolioSections /> below Hero');
});

test('computes DeviceOrientation gyroscope 3D forces accurately for left/right and forward/back tilt', () => {
  const neutral = computeGyroForces({ beta: 50, gamma: 0, neutralBeta: 50, gravity: 40 });
  assert.ok(Math.abs(neutral.gx) < 1e-6);
  assert.ok(Math.abs(neutral.gz) < 1e-6);

  const rightTilt = computeGyroForces({ beta: 50, gamma: 45, neutralBeta: 50, gravity: 40 });
  assert.ok(rightTilt.gx > 15, 'Tilting device right should pull lanyard in +X');
  assert.ok(rightTilt.tiltRoll > 0);

  const leftTilt = computeGyroForces({ beta: 50, gamma: -45, neutralBeta: 50, gravity: 40 });
  assert.ok(leftTilt.gx < -15, 'Tilting device left should pull lanyard in -X');
  assert.ok(leftTilt.tiltRoll < 0);

  const forwardTilt = computeGyroForces({ beta: 80, gamma: 0, neutralBeta: 50, gravity: 40 });
  assert.ok(forwardTilt.gz > 5, 'Tilting device forward should pull lanyard in +Z');
});

test('provides complete Girish Balaso Lade portfolio master content across all 9 locales with privacy filtering', () => {
  for (const locale of LOCALES) {
    const content = getPortfolioContent(locale);
    assert.equal(content.fullName, 'Girish Balaso Lade');
    assert.equal(Object.keys(content.sections).length, 10);
    assert.equal(content.featuredProducts.length, 9);
    for (const product of content.featuredProducts) {
      assert.equal(product.useCases.length, 3, `Product ${product.id} must have 3 use cases`);
      assert.ok(product.overview.length > 20);
    }
    assert.equal(content.prototypes.length, 9);
    assert.equal(content.coreValues.length, 10);
    assert.equal(content.capabilityDomains.length, 10);
    assert.equal(content.approachSteps.length, 8);

    // Ensure private appendix data (DOB 14/05/2001 or 14 May 2001) is never exposed
    const serialized = JSON.stringify(content);
    assert.equal(serialized.includes('14/05/2001'), false);
    assert.equal(serialized.includes('14 May 2001'), false);
  }
});

test('accordion state starts completely hidden by default and expands only clicked section (Experience vs Education)', () => {
  const keys = ['profile', 'story', 'education', 'vision', 'ecosystem'] as const;
  const initial = createInitialAccordionState();
  assert.deepEqual(initial, {});
  for (const key of keys) {
    assert.equal(isAccordionItemOpen(initial, key), false, `Section ${key} must be collapsed initially`);
  }

  // Click Experience ('story') -> only 'story' expands
  const afterClickExperience = toggleAccordionItem(initial, 'story');
  assert.equal(isAccordionItemOpen(afterClickExperience, 'story'), true);
  assert.equal(isAccordionItemOpen(afterClickExperience, 'education'), false);
  assert.deepEqual(Object.keys(afterClickExperience), ['story']);

  // Click Education ('education') -> 'education' expands and 'story' collapses automatically
  const afterClickEducation = toggleAccordionItem(afterClickExperience, 'education');
  assert.equal(isAccordionItemOpen(afterClickEducation, 'education'), true);
  assert.equal(isAccordionItemOpen(afterClickEducation, 'story'), false);
  assert.deepEqual(Object.keys(afterClickEducation), ['education']);

  // Click Education again -> collapses back to empty state
  const afterCollapseEducation = toggleAccordionItem(afterClickEducation, 'education');
  assert.deepEqual(afterCollapseEducation, {});
  assert.equal(isAccordionItemOpen(afterCollapseEducation, 'education'), false);

  // Explicit openAccordionItem and toggleAllAccordionItems
  const explicitProducts = openAccordionItem(afterClickEducation, 'products');
  assert.deepEqual(explicitProducts, { products: true });

  const allOpen = toggleAllAccordionItems(initial, keys);
  assert.equal(areAllAccordionItemsOpen(allOpen, keys), true);
  const allClosed = toggleAllAccordionItems(allOpen, keys);
  assert.equal(areAllAccordionItemsOpen(allClosed, keys), false);
  assert.deepEqual(allClosed, {});

  // Keyboard navigation wraps cleanly
  assert.equal(getNextAccordionFocusIndex(0, 10, 'ArrowDown'), 1);
  assert.equal(getNextAccordionFocusIndex(9, 10, 'ArrowDown'), 0);
  assert.equal(getNextAccordionFocusIndex(0, 10, 'ArrowUp'), 9);
  assert.equal(getNextAccordionFocusIndex(4, 10, 'Home'), 0);
  assert.equal(getNextAccordionFocusIndex(4, 10, 'End'), 9);
  assert.equal(getNextAccordionFocusIndex(4, 10, 'Enter'), null);
});


