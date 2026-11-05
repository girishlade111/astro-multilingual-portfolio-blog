const fs = require('fs');
const path = 'src/components/PortfolioSections.tsx';
let content = fs.readFileSync(path, 'utf8');

// Identity card
content = content.replace(
  'className="identity-card rounded-xl border border-zinc-200/85 bg-white/95 p-4 sm:p-5 mb-4 sm:mb-5"',
  'className="identity-card rounded-xl border border-zinc-200/85 bg-white/95 dark:border-zinc-800/85 dark:bg-[#121214]/95 p-4 sm:p-5 mb-4 sm:mb-5 transition-colors duration-150"'
);

content = content.replace(
  'font-display text-lg sm:text-2xl font-bold tracking-tight text-zinc-950 truncate',
  'font-display text-lg sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white truncate'
);

content = content.replace(
  'font-mono text-[10px] sm:text-[11px] text-zinc-400 shrink-0',
  'font-mono text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-400 shrink-0'
);

content = content.replace(
  'text-xs sm:text-sm font-medium text-zinc-800 leading-snug',
  'text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug'
);

content = content.replace(
  'text-xs text-zinc-500 leading-relaxed',
  'text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  'identity-actions pt-2.5 flex items-center justify-between gap-1 border-t border-zinc-100',
  'identity-actions pt-2.5 flex items-center justify-between gap-1 border-t border-zinc-100 dark:border-zinc-800/80'
);

content = content.replace(
  'bg-zinc-950 text-white text-[10px] sm:text-[11px] font-medium hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap',
  'bg-zinc-950 text-white text-[10px] sm:text-[11px] font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-colors cursor-pointer whitespace-nowrap'
);

// LadeStack and GitHub buttons
content = content.replace(
  /border border-zinc-200 bg-zinc-50\/80 text-zinc-800 text-\[10px\] sm:text-\[11px\] font-medium hover:border-zinc-400 hover:bg-white transition-colors whitespace-nowrap/g,
  'border border-zinc-200 bg-zinc-50/80 text-zinc-800 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap'
);

// Contact action button
content = content.replace(
  'border border-zinc-200 bg-white text-zinc-700 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer whitespace-nowrap',
  'border border-zinc-200 bg-white text-zinc-700 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap'
);

// Toggle all button
content = content.replace(
  'border border-zinc-200/80 text-[10px] font-mono text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 transition-colors cursor-pointer shrink-0',
  'border border-zinc-200/80 text-[10px] font-mono text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-600 transition-colors cursor-pointer shrink-0'
);

// Bio buttons
content = content.replace(
  "openBioMode === mode\n                                  ? 'bg-zinc-950 text-white'\n                                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'",
  "openBioMode === mode\n                                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950'\n                                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800'"
);

// Bio box
content = content.replace(
  'border border-zinc-200/80 bg-zinc-50/60 p-3 sm:p-3.5 text-xs text-zinc-700 leading-relaxed space-y-2',
  'border border-zinc-200/80 bg-zinc-50/60 p-3 sm:p-3.5 text-xs text-zinc-700 leading-relaxed space-y-2 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300'
);

// Identity rows
content = content.replace(
  'divide-y divide-zinc-100 rounded-lg border border-zinc-200/80 bg-white overflow-hidden',
  'divide-y divide-zinc-100 rounded-lg border border-zinc-200/80 bg-white overflow-hidden dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#121214]'
);

content = content.replace(
  'sm:col-span-2 text-zinc-800',
  'sm:col-span-2 text-zinc-800 dark:text-zinc-200'
);

content = content.replace(
  'underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900',
  'underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 dark:decoration-zinc-700 dark:hover:decoration-zinc-100'
);

// Chapter body
content = content.replace(
  'text-xs text-zinc-600 leading-relaxed',
  'text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

// Education cards
content = content.replace(
  'rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1',
  'rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1 dark:border-zinc-800 dark:bg-zinc-900/50'
);

content = content.replace(
  'text-xs font-semibold text-zinc-950',
  'text-xs font-semibold text-zinc-950 dark:text-white'
);

content = content.replace(
  'text-[11px] font-medium text-zinc-700',
  'text-[11px] font-medium text-zinc-700 dark:text-zinc-300'
);

content = content.replace(
  'text-[11px] text-zinc-500 leading-relaxed',
  'text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  'rounded-lg border border-zinc-200/80 bg-white p-3 space-y-1',
  'rounded-lg border border-zinc-200/80 bg-white p-3 space-y-1 dark:border-zinc-800 dark:bg-[#121214]'
);

content = content.replace(
  'rounded-lg border border-zinc-200/80 bg-zinc-50/40 p-3 space-y-1',
  'rounded-lg border border-zinc-200/80 bg-zinc-50/40 p-3 space-y-1 dark:border-zinc-800 dark:bg-zinc-900/40'
);

// Global replace of repetitive card patterns across remaining sections
content = content.replace(
  /rounded-lg border border-zinc-200\/80 bg-zinc-50\/50/g,
  'rounded-lg border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50'
);

content = content.replace(
  /rounded-lg border border-zinc-200\/80 bg-zinc-50\/40/g,
  'rounded-lg border border-zinc-200/80 bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-900/40'
);

content = content.replace(
  /rounded-lg border border-zinc-200\/80 bg-zinc-50\/60/g,
  'rounded-lg border border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/60'
);

content = content.replace(
  /rounded-lg border border-zinc-200\/80 bg-white/g,
  'rounded-lg border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-[#121214]'
);

content = content.replace(
  /rounded-md border border-zinc-200\/80 bg-white/g,
  'rounded-md border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-[#121214]'
);

content = content.replace(
  /text-xs font-semibold text-zinc-950/g,
  'text-xs font-semibold text-zinc-950 dark:text-white'
);

content = content.replace(
  /text-xs font-semibold text-zinc-900/g,
  'text-xs font-semibold text-zinc-900 dark:text-zinc-100'
);

content = content.replace(
  /text-\[11px\] font-semibold text-zinc-900/g,
  'text-[11px] font-semibold text-zinc-900 dark:text-zinc-100'
);

content = content.replace(
  /text-xs text-zinc-600 leading-relaxed/g,
  'text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  /text-xs text-zinc-700 leading-relaxed/g,
  'text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed'
);

content = content.replace(
  /text-\[11px\] text-zinc-600 leading-relaxed/g,
  'text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  /text-\[11px\] text-zinc-500 leading-relaxed/g,
  'text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  /font-medium text-zinc-900/g,
  'font-medium text-zinc-900 dark:text-zinc-100'
);

content = content.replace(
  /bg-zinc-950 text-white text-\[11px\] font-medium hover:bg-zinc-800 transition-colors/g,
  'bg-zinc-950 text-white text-[11px] font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-colors'
);

content = content.replace(
  /border border-zinc-200 bg-white text-zinc-800 text-\[11px\] font-medium hover:border-zinc-400 transition-colors/g,
  'border border-zinc-200 bg-white text-zinc-800 text-[11px] font-medium hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 transition-colors'
);

content = content.replace(
  /border border-zinc-200 bg-white text-zinc-600 text-\[11px\] hover:text-zinc-950 hover:border-zinc-400 transition-colors/g,
  'border border-zinc-200 bg-white text-zinc-600 text-[11px] hover:text-zinc-950 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-700 transition-colors'
);

content = content.replace(
  /border border-zinc-200 bg-white text-\[11px\] font-medium text-zinc-800 hover:border-zinc-400/g,
  'border border-zinc-200 bg-white text-[11px] font-medium text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700'
);

content = content.replace(
  'font-mono text-[10px] text-zinc-700',
  'font-mono text-[10px] text-zinc-700 dark:text-zinc-300'
);

content = content.replace(
  'font-mono text-[10px] text-zinc-600 leading-relaxed',
  'font-mono text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed'
);

content = content.replace(
  'font-display text-sm font-semibold text-zinc-950',
  'font-display text-sm font-semibold text-zinc-950 dark:text-white'
);

content = content.replace(
  'border border-zinc-200 bg-white text-zinc-700 text-[11px] font-mono hover:border-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer',
  'border border-zinc-200 bg-white text-zinc-700 text-[11px] font-mono hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white transition-colors cursor-pointer'
);

content = content.replace(
  /group-hover:text-zinc-900 shrink-0/g,
  'group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0'
);

fs.writeFileSync(path, content, 'utf8');
console.log('PortfolioSections updated successfully');
