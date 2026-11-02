import type { APIRoute } from 'astro';
import { getAllLocaleBlogPaths, type BlogMarkdownModule } from '../../../../utils/blog';

export function getStaticPaths() {
  return getAllLocaleBlogPaths();
}

interface Props {
  post: BlogMarkdownModule;
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

// Simple line wrapping for SVG text
function wrapText(text: string, maxCharsPerLine: number = 42): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3); // Max 3 lines
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as Props;
  const title = post.frontmatter.title;
  const category = post.frontmatter.category || 'Software Engineering';
  const pubDate = post.frontmatter.pubDate || '2026';
  const readingTime = post.frontmatter.readingTime || 5;

  const lines = wrapText(title, 38);
  const titleSpans = lines
    .map(
      (line, i) =>
        `<tspan x="90" y="${280 + i * 56}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="grad" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="100%" stop-color="#09090b" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Card Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />

  <!-- Brand & Category Bar -->
  <g transform="translate(90, 95)">
    <rect x="0" y="0" width="16" height="16" rx="4" fill="#fafafa" />
    <text x="28" y="13" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5" fill="#fafafa">GIRISH LADE</text>
    <text x="148" y="13" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#71717a">·</text>
    <text x="162" y="13" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="1" fill="#a1a1aa">LADESTACK</text>

    <!-- Category Pill Badge -->
    <rect x="740" y="-8" width="220" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <text x="850" y="13" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#e4e4e7">${escapeXml(category)}</text>
  </g>

  <!-- Article Title Display -->
  <text font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" fill="#ffffff" letter-spacing="-0.5">
    ${titleSpans}
  </text>

  <!-- Footer Metadata -->
  <g transform="translate(90, 515)">
    <text font-family="ui-monospace, monospace" font-size="14" fill="#a1a1aa">
      ${escapeXml(pubDate)} · ${readingTime} MIN READ · girish.ladestack.in
    </text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

