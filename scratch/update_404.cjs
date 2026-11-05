const fs = require('fs');
const path = 'src/pages/404.astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'font-mono text-xs font-medium tracking-wider text-zinc-600',
  'font-mono text-xs font-medium tracking-wider text-zinc-600 dark:text-zinc-400'
);

content = content.replace(
  'text-4xl leading-tight font-semibold tracking-tight text-zinc-950 sm:text-5xl',
  'text-4xl leading-tight font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl'
);

content = content.replace(
  'mt-4 max-w-sm text-base leading-relaxed text-zinc-600',
  'mt-4 max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400'
);

content = content.replace(
  'border-transparent bg-zinc-950 text-white hover:bg-zinc-800 active:bg-zinc-700',
  'border-transparent bg-zinc-950 text-white hover:bg-zinc-800 active:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
);

content = content.replace(
  'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 active:bg-zinc-100',
  'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800'
);

content = content.replace(
  'class="fill-zinc-100/50 stroke-zinc-200"',
  'class="fill-zinc-100/50 stroke-zinc-200 dark:fill-zinc-900/50 dark:stroke-zinc-800"'
);

content = content.replace(
  'class="stroke-zinc-200"',
  'class="stroke-zinc-200 dark:stroke-zinc-800"'
);

content = content.replace(
  'class="stroke-zinc-600"',
  'class="stroke-zinc-600 dark:stroke-zinc-400"'
);

content = content.replace(
  'class="fill-zinc-700"',
  'class="fill-zinc-700 dark:fill-zinc-300"'
);

content = content.replace(
  'class="fill-zinc-50 stroke-zinc-600"',
  'class="fill-zinc-50 stroke-zinc-600 dark:fill-zinc-900 dark:stroke-zinc-400"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('404.astro updated successfully');
