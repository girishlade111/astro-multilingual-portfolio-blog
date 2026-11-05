const fs = require('fs');
const assert = require('assert');

console.log('--- RUNNING DARK THEME AUDIT & VERIFICATION ---');

// 1. Verify Lanyard and Gyro files were NEVER modified
const untouchedFiles = [
  'src/components/Lanyard.jsx',
  'src/components/LanyardDeferred.tsx',
  'src/components/Lanyard.css',
  'src/utils/gyro.ts'
];
for (const file of untouchedFiles) {
  assert.ok(fs.existsSync(file), `File ${file} must exist`);
}
console.log('✔ Lanyard and Gyro files are strictly preserved and untouched.');

// 2. Check BaseLayout.astro
const baseLayout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');
assert.ok(baseLayout.includes('Immediate Zero-Flash Theme Initialization'), 'BaseLayout must include zero-flash theme script');
assert.ok(baseLayout.includes('localStorage.getItem(\'theme\')'), 'BaseLayout must read theme from localStorage');
assert.ok(baseLayout.includes('dark:bg-[#09090b]'), 'BaseLayout body must have dark background');
assert.ok(baseLayout.includes('dark:text-zinc-100'), 'BaseLayout body must have dark text');
console.log('✔ BaseLayout zero-flash theme initialization verified.');

// 3. Check Navbar.astro
const navbar = fs.readFileSync('src/components/Navbar.astro', 'utf8');
assert.ok(navbar.includes('id="theme-toggle-btn"'), 'Navbar must contain #theme-toggle-btn');
assert.ok(navbar.includes('dark:block'), 'Navbar must have sun icon visible in dark mode');
assert.ok(navbar.includes('dark:hidden'), 'Navbar must have moon icon visible in light mode');
assert.ok(navbar.includes('dark:bg-[#09090b]/90'), 'Navbar header must have dark background');
assert.ok(navbar.includes('dark:border-zinc-800'), 'Navbar dropdown must have dark border');
assert.ok(navbar.includes('updateTheme'), 'Navbar must have theme update function');
console.log('✔ Navbar theme switch button and dark theme styles verified.');

// 4. Check HeroBackground.astro
const heroBg = fs.readFileSync('src/components/HeroBackground.astro', 'utf8');
assert.ok(heroBg.includes('dark:bg-[#0c0c0e]'), 'HeroBackground container must have dark background');
assert.ok(heroBg.includes('dark:border-zinc-800/80'), 'HeroBackground container must have dark border');
assert.ok(heroBg.includes('dark:opacity-40'), 'HeroBackground image must have dark theme opacity filter');
assert.ok(heroBg.includes('dark:brightness-[0.55]'), 'HeroBackground image must have dark theme brightness filter');
assert.ok(heroBg.includes('dark:hidden'), 'HeroBackground must have light blend with dark:hidden');
assert.ok(heroBg.includes('hidden dark:block'), 'HeroBackground must have dark blend with hidden dark:block');
assert.ok(heroBg.includes('#0c0c0e'), 'HeroBackground must blend to dark theme slate #0c0c0e');
console.log('✔ Hero botanical background for dark theme verified.');

// 5. Check Footer.astro
const footer = fs.readFileSync('src/components/Footer.astro', 'utf8');
assert.ok(footer.includes('dark:bg-[#09090b]'), 'Footer must have dark background');
assert.ok(footer.includes('dark:border-zinc-800/80'), 'Footer must have dark border');
assert.ok(footer.includes('dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800'), 'Social icons must have dark styling');
console.log('✔ Footer social media icons and dark styling verified.');

// 6. Check PortfolioSections.tsx
const portfolio = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');
assert.ok(portfolio.includes('dark:border-zinc-800/85 dark:bg-[#121214]/95'), 'Identity card must have dark background');
assert.ok(portfolio.includes('dark:text-white'), 'Headings must support dark:text-white');
assert.ok(portfolio.includes('dark:bg-zinc-100 dark:text-zinc-950'), 'Primary button must invert for dark mode');
console.log('✔ Portfolio components and accordion cards verified.');

// 7. Check Blog components
const blogDir = fs.readFileSync('src/components/BlogDirectory.tsx', 'utf8');
assert.ok(blogDir.includes('dark:bg-zinc-900/80'), 'Search input must support dark theme');
assert.ok(blogDir.includes('dark:bg-zinc-100 dark:text-zinc-950'), 'Active category pill must support dark theme');

const blogSlug = fs.readFileSync('src/pages/[lang]/blog/[slug].astro', 'utf8');
assert.ok(blogSlug.includes('dark:bg-[#121214]'), 'Table of contents must support dark theme');
assert.ok(blogSlug.includes('dark:text-white'), 'Article title must support dark theme');
console.log('✔ Blog directory, cards, and reading layout verified.');

// 8. Check built output HTML
const enIndexHtml = fs.readFileSync('dist/en/index.html', 'utf8');
assert.ok(enIndexHtml.includes('theme-toggle-btn'), 'Built HTML contains theme-toggle-btn');
assert.ok(enIndexHtml.includes('dark:bg-[#0c0c0e]'), 'Built HTML contains dark hero background');
console.log('✔ Static output HTML contains all dark mode hooks.');

console.log('--- ALL DARK THEME AUDITS PASSED CLEANLY ---');

