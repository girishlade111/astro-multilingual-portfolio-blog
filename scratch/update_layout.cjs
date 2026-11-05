const fs = require('fs');
const path = 'src/layouts/BaseLayout.astro';
let content = fs.readFileSync(path, 'utf8');

const themeScript = `
    <!-- Immediate Zero-Flash Theme Initialization -->
    <script is:inline>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
          }
        } catch (_) {}
      })();
    </script>`;

if (!content.includes('Immediate Zero-Flash Theme Initialization')) {
  content = content.replace(/<head>/, '<head>' + themeScript);
}

content = content.replace(
  /<meta name="color-scheme" content="light" \/>/,
  '<meta name="color-scheme" content="light dark" />'
);

content = content.replace(
  /<meta name="theme-color" content="#fafafa" \/>/,
  '<meta name="theme-color" content="#fafafa" id="meta-theme-color" />'
);

content = content.replace(
  'class="min-h-screen flex flex-col overflow-x-hidden bg-[#fafafa] text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white"',
  'class="min-h-screen flex flex-col overflow-x-hidden bg-[#fafafa] text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-[#09090b] dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors duration-150"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('BaseLayout updated successfully');
