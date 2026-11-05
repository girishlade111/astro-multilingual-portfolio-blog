const fs = require('fs');
const path = 'src/pages/[lang]/blog/index.astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'border-b border-zinc-200/80 space-y-3 max-w-2xl',
  'border-b border-zinc-200/80 dark:border-zinc-800/80 space-y-3 max-w-2xl'
);

content = content.replace(
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono',
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono'
);

content = content.replace(
  'font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950',
  'font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white'
);

content = content.replace(
  'text-sm sm:text-base text-zinc-600 leading-relaxed',
  'text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Blog index updated successfully');
