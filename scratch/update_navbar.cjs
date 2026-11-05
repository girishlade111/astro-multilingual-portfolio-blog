const fs = require('fs');
const path = 'src/components/Navbar.astro';
let content = fs.readFileSync(path, 'utf8');

// Replace header class
content = content.replace(
  '<header class="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-zinc-200/70">',
  '<header class="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-zinc-200/70 dark:bg-[#09090b]/90 dark:border-zinc-800/80 transition-colors duration-150">'
);

// Replace brand class
content = content.replace(
  'class="font-display text-sm sm:text-base font-bold tracking-tight text-zinc-950 hover:text-zinc-700 transition-colors whitespace-nowrap shrink-0"',
  'class="font-display text-sm sm:text-base font-bold tracking-tight text-zinc-950 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0"'
);

// Replace nav class
content = content.replace(
  'class="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-zinc-500"',
  'class="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400"'
);

// Replace nav active/inactive links
content = content.replace(
  "? 'text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-950 decoration-1.5'\n            : 'hover:text-zinc-950'",
  "? 'text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-950 decoration-1.5 dark:text-white dark:decoration-white'\n            : 'hover:text-zinc-950 dark:hover:text-white'"
);
// replace second one (for blog)
content = content.replace(
  "? 'text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-950 decoration-1.5'\n            : 'hover:text-zinc-950'",
  "? 'text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-950 decoration-1.5 dark:text-white dark:decoration-white'\n            : 'hover:text-zinc-950 dark:hover:text-white'"
);

// Replace Zone 3 with Theme toggle + Language dropdown
const oldZone3 = `    <!-- Zone 3: Modern Accessible Language Dropdown -->
    <div class="relative shrink-0" id="language-dropdown-root">`;

const newZone3 = `    <!-- Zone 3: Theme Toggle & Language Dropdown -->
    <div class="flex items-center gap-2 shrink-0">
      <!-- Theme Switch Button (Light / Dark) -->
      <button
        type="button"
        id="theme-toggle-btn"
        aria-label="Toggle theme"
        title="Toggle dark / light theme"
        class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 text-zinc-700 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 dark:text-zinc-200 cursor-pointer"
      >
        <!-- Sun icon (shown in dark mode to switch to light) -->
        <svg
          aria-hidden="true"
          class="hidden dark:block w-4 h-4 text-zinc-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        <!-- Moon icon (shown in light mode to switch to dark) -->
        <svg
          aria-hidden="true"
          class="block dark:hidden w-4 h-4 text-zinc-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <!-- Modern Accessible Language Dropdown -->
      <div class="relative shrink-0" id="language-dropdown-root">`;

content = content.replace(oldZone3, newZone3);

// Replace language trigger classes
content = content.replace(
  'class="group inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 text-zinc-700 text-xs font-medium shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1 cursor-pointer"',
  'class="group inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 text-zinc-700 text-xs font-medium shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 dark:text-zinc-200 cursor-pointer"'
);

// Translation icon
content = content.replace(
  'class="w-3.5 h-3.5 text-zinc-700 shrink-0"',
  'class="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0"'
);

// Locale span
content = content.replace(
  'class="font-mono text-[11px] font-semibold text-zinc-900 uppercase tracking-wide"',
  'class="font-mono text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide"'
);

// Popover container
content = content.replace(
  'class="hidden absolute right-0 mt-1.5 w-52 origin-top-right rounded-xl border border-zinc-200/90 bg-white/98 backdrop-blur-md p-1 shadow-lg shadow-zinc-950/5 ring-1 ring-black/5 focus:outline-none z-50"',
  'class="hidden absolute right-0 mt-1.5 w-52 origin-top-right rounded-xl border border-zinc-200/90 bg-white/98 backdrop-blur-md p-1 shadow-lg shadow-zinc-950/5 ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/98 dark:shadow-black/50 dark:ring-white/10 focus:outline-none z-50"'
);

// Popover label
content = content.replace(
  'class="px-2.5 py-1.5 text-[10px] font-mono font-medium text-zinc-400 tracking-wider uppercase border-b border-zinc-100 mb-1"',
  'class="px-2.5 py-1.5 text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase border-b border-zinc-100 dark:border-zinc-800 mb-1"'
);

// Option classes
content = content.replace(
  "? 'bg-zinc-100 text-zinc-950 font-semibold'\n                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'",
  "? 'bg-zinc-100 text-zinc-950 font-semibold dark:bg-zinc-800 dark:text-white'\n                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/60'"
);

// Option tag badge
content = content.replace(
  'class="inline-flex items-center justify-center w-6 h-5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-100 text-zinc-700"',
  'class="inline-flex items-center justify-center w-6 h-5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"'
);

// Checkmark
content = content.replace(
  'class="w-3.5 h-3.5 text-zinc-950 shrink-0"',
  'class="w-3.5 h-3.5 text-zinc-950 dark:text-white shrink-0"'
);

// Close extra div for Zone 3
content = content.replace(
  '      </div>\n    </div>\n  </div>\n</header>',
  '      </div>\n    </div>\n    </div>\n  </div>\n</header>'
);

// Add theme toggle script logic
const scriptAddition = `
    // Theme toggle handler
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      function updateTheme(dark) {
        if (dark) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
          try { localStorage.setItem('theme', 'dark'); } catch (_) {}
          themeBtn.setAttribute('aria-label', 'Switch to light theme');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
          try { localStorage.setItem('theme', 'light'); } catch (_) {}
          themeBtn.setAttribute('aria-label', 'Switch to dark theme');
        }
        const metaTheme = document.getElementById('meta-theme-color');
        if (metaTheme) metaTheme.setAttribute('content', dark ? '#09090b' : '#fafafa');
        window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: dark ? 'dark' : 'light' } }));
      }

      themeBtn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.contains('dark');
        updateTheme(!isDark);
      });
    }
`;

content = content.replace('if (!root || !trigger || !popover) return;', scriptAddition + '\n    if (!root || !trigger || !popover) return;');

fs.writeFileSync(path, content, 'utf8');
console.log('Navbar updated successfully');
