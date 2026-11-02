import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_METADATA, type Locale } from '../../i18n/config';
import { getBlogsByLocale } from '../../utils/blog';

export function getStaticPaths() {
  return LOCALES.map((lang) => ({
    params: { lang },
  }));
}

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

export const GET: APIRoute = ({ params, site }) => {
  const locale = (params.lang as Locale) || 'en';
  const meta = LOCALE_METADATA[locale] || LOCALE_METADATA.en;
  const origin = (site ? site.toString() : 'https://girish.ladestack.in').replace(/\/+$/, '');
  const posts = getBlogsByLocale(locale);

  const rssFeedUrl = `${origin}/${locale}/rss.xml`;
  const latestDate = posts.length > 0
    ? new Date(posts[0].frontmatter.pubDate).toUTCString()
    : new Date().toUTCString();

  const isMarathi = locale === 'mr';
  const channelTitle = isMarathi
    ? 'गिरीश लाडे — तांत्रिक ब्लॉग आणि सॉफ्टवेअर आर्किटेक्चर'
    : `Girish Lade — Blog & Engineering (${meta.label})`;

  const channelDesc = isMarathi
    ? 'LadeStack चे संस्थापक गिरीश लाडे यांचे तंत्रज्ञान, ब्राउझर कम्प्युटिंग आणि प्रायव्हेट वेब टूल्सवरील अस्सल मराठी लेख.'
    : `Technical writings by Girish Balaso Lade, founder of LadeStack in ${meta.label}.`;

  const itemsXml = posts
    .map((post) => {
      const link = `${origin}/${locale}/blog/${post.frontmatter.slug}/`;
      const pubDate = new Date(post.frontmatter.pubDate).toUTCString();
      const title = escapeXml(post.frontmatter.title);
      const description = escapeXml(post.frontmatter.description);
      const category = escapeXml(post.frontmatter.category || 'Engineering');

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <category>${category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <description>${escapeXml(channelDesc)}</description>
    <link>${origin}/${locale}/</link>
    <atom:link href="${rssFeedUrl}" rel="self" type="application/rss+xml" />
    <language>${meta.htmlLang}</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
