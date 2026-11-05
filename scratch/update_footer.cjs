const fs = require('fs');
const path = 'src/components/Footer.astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<footer class="border-t border-zinc-200/70 bg-[#fafafa] mt-auto">',
  '<footer class="border-t border-zinc-200/70 bg-[#fafafa] dark:border-zinc-800/80 dark:bg-[#09090b] transition-colors duration-150 mt-auto">'
);

content = content.replace(
  'class="font-display inline-flex items-center text-xs sm:text-sm font-bold tracking-tight text-zinc-950 hover:text-zinc-700 transition-colors whitespace-nowrap"',
  'class="font-display inline-flex items-center text-xs sm:text-sm font-bold tracking-tight text-zinc-950 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors whitespace-nowrap"'
);

content = content.replace(
  'class="w-1 h-1 rounded-full bg-zinc-300 shrink-0"',
  'class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0"'
);

content = content.replace(
  'class="inline-flex items-center text-xs text-zinc-500 whitespace-nowrap"',
  'class="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"'
);

content = content.replace(
  'class="flex items-center gap-3 sm:gap-4 text-xs font-medium text-zinc-500"',
  'class="flex items-center gap-3 sm:gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400"'
);

content = content.replace(
  'hover:text-zinc-950 transition-colors whitespace-nowrap',
  'hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap'
);

content = content.replace(
  'hover:text-zinc-950 transition-colors whitespace-nowrap',
  'hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap'
);

content = content.replace(
  'class="h-3.5 w-px bg-zinc-200/90 shrink-0"',
  'class="h-3.5 w-px bg-zinc-200/90 dark:bg-zinc-800 shrink-0"'
);

content = content.replace(
  /class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200\/50 transition-colors"/g,
  'class="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Footer updated successfully');
