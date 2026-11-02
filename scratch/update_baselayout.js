import fs from 'fs';

let content = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

// 1. Dynamic ogImageUrl for articles
const oldOg = 'const ogImageUrl = `${siteOrigin}/assets/aistudio/image_a475d35f.webp`;';
const newOg = `const articleSlugMatch = isArticle ? currentPath.match(/\\/blog\\/([^/]+)/) : null;
const articleSlug = articleSlugMatch ? articleSlugMatch[1] : '';
const ogImageUrl = isArticle && articleSlug
  ? \`\${siteOrigin}/api/og/\${locale}/\${articleSlug}.svg\`
  : \`\${siteOrigin}/assets/aistudio/image_a475d35f.webp\`;`;

content = content.replace(oldOg, newOg);

// 2. Add RSS Feed links to <head>
const oldAgentCatalog = '<link rel="agent-catalog" type="application/json" href="/ai-catalog.json" />';
const newRssLinks = `<link rel="agent-catalog" type="application/json" href="/ai-catalog.json" />

    <!-- RSS 2.0 Feeds -->
    <link rel="alternate" type="application/rss+xml" title="Girish Lade — Full RSS 2.0 Feed" href="/rss.xml" />
    <link rel="alternate" type="application/rss+xml" title={\`Girish Lade — \${meta.label} RSS Feed\`} href={\`/\${locale}/rss.xml\`} />`;

content = content.replace(oldAgentCatalog, newRssLinks);

fs.writeFileSync('src/layouts/BaseLayout.astro', content, 'utf8');
console.log('src/layouts/BaseLayout.astro updated with dynamic OG and RSS links!');

