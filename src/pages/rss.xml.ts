import type { APIRoute } from 'astro';
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

export const GET: APIRoute = ({ site }) => {
  const origin = (site ? site.toString() : 'https://girish.ladestack.in').replace(/\/+$/, '');
  const posts = getAllMarkdownBlogs()
    .sort(
      (a, b) =>
        new Date(b.frontmatter.pubDate).getTime() -
        new Date(a.frontmatter.pubDate).getTime()
    );

  const rssFeedUrl = `${origin}/rss.xml`;
  const latestDate = posts.length > 0
    ? new Date(posts[0].frontmatter.pubDate).toUTCString()
    : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const link = `${origin}/${post.frontmatter.lang}/blog/${post.frontmatter.slug}/`;
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
    <title>Girish Lade — Software Architecture, Browser Computing &amp; Developer Tools</title>
    <description>Technical writings by Girish Balaso Lade, founder of LadeStack. Zero-telemetry web applications, browser-first developer tools, and client-side computing.</description>
    <link>${origin}/</link>
    <atom:link href="${rssFeedUrl}" rel="self" type="application/rss+xml" />
    <language>en</language>
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
