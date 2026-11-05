const fs = require('fs');
const file = 'src/components/HeroBackground.astro';
let content = fs.readFileSync(file, 'utf8');

// Update desktop light radial blend to NOT drown out the flowers
const targetDesktop = `    <!-- Light Theme Center Radial Blend -->
    <div
      class="dark:hidden absolute inset-0"
      style="background: radial-gradient(ellipse 46% 34% at 50% 50%, #f4f5f6 0%, #f4f5f6 60%, rgba(244, 245, 246, 0.82) 76%, rgba(244, 245, 246, 0) 100%);"
    />`;

const replDesktop = `    <!-- Light Theme Subtle Center Feather (preserves 100% full botanical brilliance & contrast) -->
    <div
      class="dark:hidden absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 34% 22% at 50% 50%, #f4f5f6 0%, rgba(244, 245, 246, 0.5) 45%, transparent 100%);"
    />
    <!-- Light Theme Subtle Studio Soft Light Ambient Vignette -->
    <div
      class="dark:hidden absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.025) 100%);"
    />`;

if (content.includes(targetDesktop)) {
  content = content.replace(targetDesktop, replDesktop);
} else {
  const targetDesktopCRLF = targetDesktop.replace(/\n/g, '\r\n');
  const replDesktopCRLF = replDesktop.replace(/\n/g, '\r\n');
  if (content.includes(targetDesktopCRLF)) {
    content = content.replace(targetDesktopCRLF, replDesktopCRLF);
  } else {
    throw new Error('targetDesktop not found');
  }
}

// Update mobile light vertical blend
const targetMobile = `    <!-- Light Theme Center Vertical Studio Blend -->
    <div
      class="dark:hidden absolute inset-0"
      style="background: radial-gradient(ellipse 50% 44% at 50% 50%, #f4f5f6 0%, #f4f5f6 62%, rgba(244, 245, 246, 0.85) 78%, rgba(244, 245, 246, 0) 100%);"
    />`;

const replMobile = `    <!-- Light Theme Center Vertical Studio Blend -->
    <div
      class="dark:hidden absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 38% 30% at 50% 50%, #f4f5f6 0%, rgba(244, 245, 246, 0.5) 50%, transparent 100%);"
    />`;

if (content.includes(targetMobile)) {
  content = content.replace(targetMobile, replMobile);
} else {
  const targetMobileCRLF = targetMobile.replace(/\n/g, '\r\n');
  const replMobileCRLF = replMobile.replace(/\n/g, '\r\n');
  if (content.includes(targetMobileCRLF)) {
    content = content.replace(targetMobileCRLF, replMobileCRLF);
  } else {
    throw new Error('targetMobile not found');
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated HeroBackground.astro for full botanical impact!');
