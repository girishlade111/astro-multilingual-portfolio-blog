const fs = require('fs');
const path = 'src/pages/index.astro';
let content = fs.readFileSync(path, 'utf8');

const themeScript = `    <script is:inline>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (isDark) {
            document.documentElement.classList.add('dark');
          }
        } catch (_) {}
      })();
    </script>
`;

if (!content.includes('localStorage.getItem(\'theme\')')) {
  content = content.replace('<head>', '<head>\n' + themeScript);
}

content = content.replace(
  'bg-[#fafafa] text-zinc-900',
  'bg-[#fafafa] text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100'
);

content = content.replace(
  'text-sm text-zinc-500',
  'text-sm text-zinc-500 dark:text-zinc-400'
);

content = content.replace(
  'text-xs font-medium text-zinc-900 underline underline-offset-4',
  'text-xs font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Index redirect updated successfully');
