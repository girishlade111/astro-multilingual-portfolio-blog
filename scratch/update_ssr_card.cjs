const fs = require('fs');
const file = 'src/pages/[lang]/index.astro';
let content = fs.readFileSync(file, 'utf8');

const target = `          <!-- Card Top Slot Punch Hole -->
          <div class="absolute top-[7px] sm:top-[8px] left-1/2 -translate-x-1/2 w-[30px] sm:w-[34px] h-[6px] sm:h-[7px] rounded-full bg-[#f4f5f6] dark:bg-[#0c0c0e] shadow-inner ring-1 ring-black/15 dark:ring-white/10" />
        </div>`;

const repl = `          <!-- Card Glossy Glass Sheen Overlay -->
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.18] dark:via-white/[0.03] dark:to-white/[0.10]" />
          <!-- Card Top Slot Punch Hole -->
          <div class="absolute top-[7px] sm:top-[8px] left-1/2 -translate-x-1/2 w-[30px] sm:w-[34px] h-[6px] sm:h-[7px] rounded-full bg-[#f4f5f6] dark:bg-[#0c0c0e] shadow-inner ring-1 ring-black/15 dark:ring-white/10" />
        </div>`;

if (content.includes(target)) {
  content = content.replace(target, repl);
} else {
  const targetCRLF = target.replace(/\n/g, '\r\n');
  const replCRLF = repl.replace(/\n/g, '\r\n');
  if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replCRLF);
  } else {
    throw new Error('target not found in index.astro');
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated SSR card in index.astro');
