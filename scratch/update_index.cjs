const fs = require('fs');
const path = 'src/pages/[lang]/index.astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'ring-1 ring-black/10 overflow-hidden',
  'ring-1 ring-black/10 dark:ring-white/10 dark:shadow-[0_14px_36px_rgba(0,0,0,0.5)] overflow-hidden'
);

content = content.replace(
  'rounded-full bg-[#f4f5f6] shadow-inner ring-1 ring-black/15',
  'rounded-full bg-[#f4f5f6] dark:bg-[#0c0c0e] shadow-inner ring-1 ring-black/15'
);

content = content.replace(
  'leading-none text-zinc-950 whitespace-nowrap select-none',
  'leading-none text-zinc-950 dark:text-zinc-100 whitespace-nowrap select-none'
);

const newStyle = `<style>
  /* Name plate luxury editorial typography: static and stable */
  .hero-name {
    font-family: 'Cormorant Garamond', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif;
    letter-spacing: -0.01em;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 12px rgba(0, 0, 0, 0.04);
  }

  :global(.dark) .hero-name {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9), 0 2px 16px rgba(255, 255, 255, 0.12);
  }
</style>`;

content = content.replace(/<style>[\s\S]*?<\/style>/, newStyle);

fs.writeFileSync(path, content, 'utf8');
console.log('Homepage index updated successfully');
