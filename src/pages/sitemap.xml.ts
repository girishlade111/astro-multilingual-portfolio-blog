import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_METADATA } from '../i18n/config';
import { getAllMarkdownBlogs } from '../utils/blog';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => (
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!
));

export const GET: APIRoute = ({ site }) => {
  const posts = getAllMarkdownBlogs();
  const paths = LOCALES.flatMap((locale) => [
    `/${locale}/`,
    `/${locale}/blog/`,
    ...posts.filter((post) => post.frontmatter.lang === locale)
      .map((post) => `/${locale}/blog/${post.frontmatter.slug}/`),
  ]);
  const urls = paths.map((path) => {
    const subpath = path.replace(/^\/[^/]+/, '');
    const alternates = LOCALES.filter((locale) => paths.includes(`/${locale}${subpath}`))
      .map((locale) => `<xhtml:link rel="alternate" hreflang="${LOCALE_METADATA[locale].htmlLang}" href="${escapeXml(new URL(`/${locale}${subpath}`, site).href)}"/>`);
    if (paths.includes(`/en${subpath}`)) {
      alternates.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(new URL(`/en${subpath}`, site).href)}"/>`);
    }
    return `<url><loc>${escapeXml(new URL(path, site).href)}</loc>${alternates.join('')}</url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('\n')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
