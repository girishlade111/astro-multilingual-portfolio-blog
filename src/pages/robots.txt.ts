import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ? site.toString() : 'https://girish.ladestack.in').replace(/\/+$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# AI Search Crawlers',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: Claude-SearchBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
