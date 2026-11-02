import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_METADATA } from '../i18n/config';
import { getAllMarkdownBlogs } from '../utils/blog';

const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[character]!
  );

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  alternates: Array<{ hreflang: string; href: string }>;
}

export const GET: APIRoute = ({ site }) => {
  const origin = (site ? site.toString() : 'https://ladestack.in').replace(/\/+$/, '');
  const getAbsoluteUrl = (path: string) =>
    `${origin}${path.startsWith('/') ? path : `/${path}`}`;

  const posts = getAllMarkdownBlogs();
  const allDates = posts.map((p) => p.frontmatter.pubDate).filter(Boolean);
  const latestDate = allDates.length
    ? [...allDates].sort().reverse()[0]
    : '2026-10-30';

  const entries: SitemapEntry[] = [];

  // 1. Root apex URL
  entries.push({
    loc: getAbsoluteUrl('/'),
    lastmod: latestDate,
    changefreq: 'weekly',
    priority: '1.0',
    alternates: [
      ...LOCALES.map((loc) => ({
        hreflang: LOCALE_METADATA[loc].htmlLang,
        href: getAbsoluteUrl(`/${loc}/`),
      })),
      {
        hreflang: 'x-default',
        href: getAbsoluteUrl('/en/'),
      },
    ],
  });

  // 2. Localized Homepages (9 locales)
  for (const locale of LOCALES) {
    entries.push({
      loc: getAbsoluteUrl(`/${locale}/`),
      lastmod: latestDate,
      changefreq: 'weekly',
      priority: locale === 'en' ? '1.0' : '0.9',
      alternates: [
        ...LOCALES.map((loc) => ({
          hreflang: LOCALE_METADATA[loc].htmlLang,
          href: getAbsoluteUrl(`/${loc}/`),
        })),
        {
          hreflang: 'x-default',
          href: getAbsoluteUrl('/en/'),
        },
      ],
    });
  }

  // 3. Localized Blog Index Pages (9 locales)
  for (const locale of LOCALES) {
    const localePosts = posts.filter((p) => p.frontmatter.lang === locale);
    const localeDates = localePosts
      .map((p) => p.frontmatter.pubDate)
      .filter(Boolean)
      .sort()
      .reverse();
    const blogIndexLastmod = localeDates[0] || latestDate;

    entries.push({
      loc: getAbsoluteUrl(`/${locale}/blog/`),
      lastmod: blogIndexLastmod,
      changefreq: 'weekly',
      priority: '0.8',
      alternates: [
        ...LOCALES.map((loc) => ({
          hreflang: LOCALE_METADATA[loc].htmlLang,
          href: getAbsoluteUrl(`/${loc}/blog/`),
        })),
        {
          hreflang: 'x-default',
          href: getAbsoluteUrl('/en/blog/'),
        },
      ],
    });
  }

  // 4. Individual Blog Articles (36 articles across 9 locales)
  for (const locale of LOCALES) {
    const localePosts = posts.filter((p) => p.frontmatter.lang === locale);
    for (const post of localePosts) {
      const slug = post.frontmatter.slug;
      const matchingLocales = LOCALES.filter((loc) =>
        posts.some(
          (p) => p.frontmatter.lang === loc && p.frontmatter.slug === slug
        )
      );

      const alternates = matchingLocales.map((loc) => ({
        hreflang: LOCALE_METADATA[loc].htmlLang,
        href: getAbsoluteUrl(`/${loc}/blog/${slug}/`),
      }));

      if (matchingLocales.includes('en')) {
        alternates.push({
          hreflang: 'x-default',
          href: getAbsoluteUrl(`/en/blog/${slug}/`),
        });
      }

      entries.push({
        loc: getAbsoluteUrl(`/${locale}/blog/${slug}/`),
        lastmod: post.frontmatter.pubDate || latestDate,
        changefreq: 'monthly',
        priority: '0.7',
        alternates,
      });
    }
  }

  const xmlUrls = entries.map((entry) => {
    const altLinks = entry.alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
      )
      .join('\n');

    return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${altLinks}
  </url>`;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlUrls.join('\n')}
</urlset>
`;

  return new Response(xmlContent, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
