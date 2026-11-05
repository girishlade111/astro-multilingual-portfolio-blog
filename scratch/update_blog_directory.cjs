const fs = require('fs');
const path = 'src/components/BlogDirectory.tsx';
let content = fs.readFileSync(path, 'utf8');

// Input
content = content.replace(
  'border border-zinc-200/90 bg-white/80 backdrop-blur-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950',
  'border border-zinc-200/90 bg-white/80 backdrop-blur-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100/20 dark:focus:border-zinc-100'
);

content = content.replace(
  'hover:text-zinc-700 transition-colors',
  'hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors'
);

// Categories
content = content.replace(
  "? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'\n                  : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900'",
  "? 'bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'\n                  : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'"
);

content = content.replace(
  "? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'\n                    : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900'",
  "? 'bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'\n                    : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'"
);

// Results counter
content = content.replace(
  'text-xs font-mono text-zinc-500 whitespace-nowrap',
  'text-xs font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap'
);

// Divide
content = content.replace(
  'divide-y divide-zinc-200/80',
  'divide-y divide-zinc-200/80 dark:divide-zinc-800/80'
);

// Article meta
content = content.replace(
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono',
  'flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono'
);

content = content.replace(
  'px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium',
  'px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-800 dark:text-zinc-200'
);

content = content.replace(
  /aria-hidden="true" className="text-zinc-300"/g,
  'aria-hidden="true" className="text-zinc-300 dark:text-zinc-600"'
);

content = content.replace(
  'text-zinc-700 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[11px]',
  'text-zinc-700 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[11px] dark:text-zinc-300 dark:bg-zinc-800/80'
);

content = content.replace(
  'w-3 h-3 text-zinc-500',
  'w-3 h-3 text-zinc-500 dark:text-zinc-400'
);

// Title
content = content.replace(
  'text-zinc-950 group-hover:text-zinc-700 transition-colors',
  'text-zinc-950 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300 transition-colors'
);

// Description
content = content.replace(
  'text-sm sm:text-base text-zinc-600 leading-relaxed',
  'text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

// Tags
content = content.replace(
  'px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-600',
  'px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
);

// Read article link
content = content.replace(
  'text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors whitespace-nowrap ml-auto',
  'text-xs font-semibold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors whitespace-nowrap ml-auto'
);

// Empty state
content = content.replace(
  'border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 p-8 space-y-4',
  'border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 p-8 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50'
);

content = content.replace(
  'w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto',
  'w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-400 flex items-center justify-center mx-auto'
);

content = content.replace(
  'text-base font-semibold text-zinc-900',
  'text-base font-semibold text-zinc-900 dark:text-white'
);

content = content.replace(
  'text-sm text-zinc-500 max-w-sm mx-auto',
  'text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto'
);

content = content.replace(
  'border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm',
  'border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm'
);

// Pagination
content = content.replace(
  'border-t border-zinc-200/80',
  'border-t border-zinc-200/80 dark:border-zinc-800/80'
);

content = content.replace(
  /border border-zinc-200\/80 bg-white text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors/g,
  'border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
);

content = content.replace(
  "? 'bg-zinc-900 text-white font-semibold'\n                    : 'bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50'",
  "? 'bg-zinc-900 text-white font-semibold dark:bg-zinc-100 dark:text-zinc-950'\n                    : 'bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800'"
);

fs.writeFileSync(path, content, 'utf8');
console.log('BlogDirectory updated successfully');
