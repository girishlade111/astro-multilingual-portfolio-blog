const fs = require('fs');
const path = 'src/pages/[lang]/blog/[slug].astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'class="fixed top-0 left-0 right-0 h-[2.5px] bg-zinc-950 z-50 origin-left scale-x-0 transition-transform duration-75"',
  'class="fixed top-0 left-0 right-0 h-[2.5px] bg-zinc-950 dark:bg-zinc-100 z-50 origin-left scale-x-0 transition-transform duration-75"'
);

content = content.replace(
  'class="inline-flex items-center gap-2 min-h-[40px] text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors whitespace-nowrap"',
  'class="inline-flex items-center gap-2 min-h-[40px] text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors whitespace-nowrap"'
);

content = content.replace(
  'header class="pb-6 sm:pb-8 border-b border-zinc-200/80 space-y-4 w-full"',
  'header class="pb-6 sm:pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80 space-y-4 w-full"'
);

content = content.replace(
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono',
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono'
);

content = content.replace(
  'class="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"',
  'class="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-400 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"'
);

content = content.replace(
  'class="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight max-w-3xl"',
  'class="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight max-w-3xl"'
);

content = content.replace(
  'class="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl"',
  'class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl"'
);

content = content.replace(
  'class="lg:col-span-4 lg:sticky lg:top-24 p-4 sm:p-5 rounded-xl bg-white border border-zinc-200/80 space-y-3 order-first lg:order-last"',
  'class="lg:col-span-4 lg:sticky lg:top-24 p-4 sm:p-5 rounded-xl bg-white border border-zinc-200/80 space-y-3 order-first lg:order-last dark:bg-[#121214] dark:border-zinc-800"'
);

content = content.replace(
  'class="font-display text-xs font-semibold text-zinc-900 tracking-tight"',
  'class="font-display text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight"'
);

content = content.replace(
  'class="space-y-2 text-xs text-zinc-600"',
  'class="space-y-2 text-xs text-zinc-600 dark:text-zinc-400"'
);

content = content.replace(
  'class="hover:text-zinc-950 transition-colors block py-0.5 leading-snug"',
  'class="hover:text-zinc-950 dark:hover:text-white transition-colors block py-0.5 leading-snug"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Blog [slug] updated successfully');
