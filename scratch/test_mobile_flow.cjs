const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const vm = require('vm');

console.log('\n======================================================');
console.log('🚀 RUNNING MOBILE LIFECYCLE & DUAL-STORAGE TEST SUITE');
console.log('======================================================\n');

// Helper to extract and execute scripts from built HTML in a simulated browser sandbox
function createMobileBrowserSandbox(options = {}) {
  const localStorageStore = { ...(options.localStorage || {}) };
  let cookieStore = options.cookies ? options.cookies.slice() : [];

  const documentElement = {
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); }
    },
    attributes: {},
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k]; }
  };

  const metaTheme = {
    attributes: { content: '#fafafa' },
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k]; }
  };

  let redirectedTo = null;

  const sandbox = {
    window: {
      location: {
        search: options.search || '',
        hash: options.hash || '',
        replace(url) { redirectedTo = url; },
        href: options.url || 'https://girish.ladestack.in/'
      },
      matchMedia(query) {
        return {
          matches: options.systemDark === true,
          addEventListener: () => {},
          addListener: () => {}
        };
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {}
    },
    document: {
      documentElement,
      readyState: 'complete',
      createElement: (tag) => ({ tag, setAttribute: () => {}, getAttribute: () => null }),
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
      addEventListener: () => {},
      getElementById(id) {
        if (id === 'meta-theme-color') return metaTheme;
        return null;
      },
      get cookie() {
        return cookieStore.join('; ');
      },
      set cookie(val) {
        const parts = val.split(';');
        const [cookieKeyVal] = parts;
        const [k, v] = cookieKeyVal.split('=');
        const trimmedKey = k.trim();
        // Remove existing cookie with same key
        cookieStore = cookieStore.filter(c => !c.trim().startsWith(trimmedKey + '='));
        cookieStore.push(`${trimmedKey}=${v}`);
      }
    },
    localStorage: {
      getItem(k) {
        return localStorageStore[k] !== undefined ? localStorageStore[k] : null;
      },
      setItem(k, v) {
        localStorageStore[k] = String(v);
      },
      removeItem(k) {
        delete localStorageStore[k];
      }
    },
    navigator: {
      languages: options.languages || ['en-US', 'en'],
      language: (options.languages && options.languages[0]) || 'en-US'
    },
    CustomEvent: class {
      constructor(type, detail) {
        this.type = type;
        this.detail = detail;
      }
    },
    encodeURIComponent,
    decodeURIComponent,
    JSON,
    String,
    RegExp,
    Array
  };

  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;

  return {
    sandbox,
    getRedirect: () => redirectedTo,
    getLocalStorage: () => ({ ...localStorageStore }),
    getCookies: () => [...cookieStore],
    isDark: () => documentElement.classList.contains('dark'),
    getThemeColor: () => metaTheme.getAttribute('content')
  };
}

// Extract scripts from dist HTML file
function extractHeadScripts(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) return [];
  const headContent = headMatch[1];
  const scriptRegex = /<script(?![^>]*application\/ld\+json)(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  const scripts = [];
  let m;
  while ((m = scriptRegex.exec(headContent)) !== null) {
    scripts.push(m[1]);
  }
  return scripts;
}

const rootScripts = extractHeadScripts(path.join(__dirname, '../dist/index.html'));
const enScripts = extractHeadScripts(path.join(__dirname, '../dist/en/index.html'));
const mrScripts = extractHeadScripts(path.join(__dirname, '../dist/mr/index.html'));

console.log(`✓ Loaded dist/index.html scripts (${rootScripts.length} head scripts found)`);
console.log(`✓ Loaded dist/en/index.html scripts (${enScripts.length} head scripts found)`);
console.log(`✓ Loaded dist/mr/index.html scripts (${mrScripts.length} head scripts found)`);

// --- TEST 1: First-time Mobile Visit with Russian OS & Dark Mode ---
{
  const sim = createMobileBrowserSandbox({
    languages: ['ru-RU', 'ru', 'en-US'],
    systemDark: true
  });

  const ctx = vm.createContext(sim.sandbox);
  for (const script of rootScripts) {
    vm.runInContext(script, ctx);
  }

  assert.equal(sim.getRedirect(), '/ru/', 'Must redirect to Russian route /ru/');
  assert.equal(sim.isDark(), true, 'Must apply dark mode for dark OS');
  assert.equal(sim.getThemeColor(), '#09090b', 'Theme color must match dark background');
  assert.equal(sim.getLocalStorage().preferred_locale, 'ru', 'Must anchor ru in localStorage');
  assert.ok(sim.getCookies().some(c => c.includes('preferred_locale=ru')), 'Must anchor ru in cookie');
  console.log('✓ TEST 1 PASSED: First-Time Russian Mobile Visit -> Routes to /ru/ in Dark Mode with Dual-Storage Anchoring');
}

// --- TEST 2: First-time Mobile Visit with Japanese Device & Light Mode ---
{
  const sim = createMobileBrowserSandbox({
    languages: ['ja-JP', 'ja', 'en-US'],
    systemDark: false
  });

  const ctx = vm.createContext(sim.sandbox);
  for (const script of rootScripts) {
    vm.runInContext(script, ctx);
  }

  assert.equal(sim.getRedirect(), '/jp/', 'Must map ja-JP to /jp/');
  assert.equal(sim.isDark(), false, 'Must apply light mode');
  assert.equal(sim.getThemeColor(), '#fafafa', 'Theme color must match light background');
  assert.equal(sim.getLocalStorage().preferred_locale, 'jp', 'Must anchor jp in localStorage');
  assert.ok(sim.getCookies().some(c => c.includes('preferred_locale=jp')), 'Must anchor jp in cookie');
  console.log('✓ TEST 2 PASSED: First-Time Japanese Mobile Visit -> Routes to /jp/ in Light Mode with BCP-47 Tag Resolution');
}

// --- TEST 3: User Bug Reproduction & Fix Verification ---
// Step 3A: User opens on mobile first time in English (default Indian phone English)
{
  const sim = createMobileBrowserSandbox({
    languages: ['en-IN', 'en-US'],
    systemDark: false
  });

  const ctx = vm.createContext(sim.sandbox);
  for (const script of rootScripts) {
    vm.runInContext(script, ctx);
  }

  assert.equal(sim.getRedirect(), '/en/', 'Initial visit goes to /en/');
  console.log('✓ Step 3A: User opens mobile -> correctly routes to /en/');

  // Step 3B: User switches language to Marathi (Simulate safe pre-navigation click handler)
  sim.sandbox.localStorage.setItem('preferred_locale', 'mr');
  sim.sandbox.document.cookie = 'preferred_locale=mr;path=/;max-age=31536000;SameSite=Lax';

  // Step 3C: User visits Marathi page /mr/index.html
  const mrSim = createMobileBrowserSandbox({
    languages: ['en-IN', 'en-US'],
    localStorage: sim.getLocalStorage(),
    cookies: sim.getCookies(),
    systemDark: false,
    url: 'https://girish.ladestack.in/mr/'
  });
  const mrCtx = vm.createContext(mrSim.sandbox);
  for (const script of mrScripts) {
    vm.runInContext(script, mrCtx);
  }

  assert.equal(mrSim.getRedirect(), null, 'No redirect on /mr/ because user is on Marathi');
  assert.equal(mrSim.getLocalStorage().preferred_locale, 'mr', 'Self-healing confirms Marathi in localStorage');
  console.log('✓ Step 3B & 3C: User switches to Marathi -> /mr/ confirms Marathi in Dual Storage');

  // Step 3D: User closes the browser and reopens the website.
  // CRUCIAL SUB-TEST 1: Mobile Chrome Autocomplete Trap (Browser directly re-opens https://girish.ladestack.in/en/)
  const trapSim = createMobileBrowserSandbox({
    languages: ['en-IN', 'en-US'],
    localStorage: mrSim.getLocalStorage(),
    cookies: mrSim.getCookies(),
    systemDark: false,
    url: 'https://girish.ladestack.in/en/'
  });

  const trapCtx = vm.createContext(trapSim.sandbox);
  for (const script of enScripts) {
    vm.runInContext(script, trapCtx);
  }

  assert.equal(trapSim.getRedirect(), '/mr/', 'Autocomplete Shield MUST intercept /en/ and immediately route to /mr/');
  console.log('✓ Step 3D (Sub-test 1): Autocomplete Trap SHIELDED! Opening /en/ automatically redirected to /mr/!');

  // CRUCIAL SUB-TEST 2: User closes tab and localStorage was wiped (Safari private / partition), but Cookie survived!
  const cookieOnlySim = createMobileBrowserSandbox({
    languages: ['en-IN', 'en-US'],
    localStorage: {}, // LocalStorage empty!
    cookies: ['preferred_locale=mr'], // Cookie intact!
    systemDark: false,
    url: 'https://girish.ladestack.in/en/'
  });

  const cookieOnlyCtx = vm.createContext(cookieOnlySim.sandbox);
  for (const script of enScripts) {
    vm.runInContext(script, cookieOnlyCtx);
  }

  assert.equal(cookieOnlySim.getRedirect(), '/mr/', 'Must recover Marathi from Cookie when localStorage is wiped!');
  console.log('✓ Step 3D (Sub-test 2): Cookie Recovery SHIELDED! When localStorage was wiped, Cookie successfully routed to /mr/!');

  // CRUCIAL SUB-TEST 3: User reopens domain root https://girish.ladestack.in/
  const rootReopenSim = createMobileBrowserSandbox({
    languages: ['en-IN', 'en-US'],
    localStorage: mrSim.getLocalStorage(),
    cookies: mrSim.getCookies(),
    systemDark: false
  });

  const rootReopenCtx = vm.createContext(rootReopenSim.sandbox);
  for (const script of rootScripts) {
    vm.runInContext(script, rootReopenCtx);
  }

  assert.equal(rootReopenSim.getRedirect(), '/mr/', 'Opening root URL must redirect to /mr/ on repeat visit');
  console.log('✓ Step 3D (Sub-test 3): Opening root URL routes directly to /mr/ on repeat visit!');
}

// --- TEST 4: Switching back to English from Marathi (No infinite loop) ---
{
  // User is on Marathi, but deliberately switches to English
  const sim = createMobileBrowserSandbox({
    languages: ['en-IN'],
    localStorage: { preferred_locale: 'en' },
    cookies: ['preferred_locale=en'],
    url: 'https://girish.ladestack.in/en/'
  });

  const ctx = vm.createContext(sim.sandbox);
  for (const script of enScripts) {
    vm.runInContext(script, ctx);
  }

  assert.equal(sim.getRedirect(), null, 'Must NOT redirect when user deliberately chose English');
  console.log('✓ TEST 4 PASSED: Switching back to English stays on /en/ cleanly without loop!');
}

// --- TEST 5: Mobile Theme Dual Storage Persistence ---
{
  // User toggled dark mode on a light phone
  const sim = createMobileBrowserSandbox({
    languages: ['en-US'],
    systemDark: false, // Phone OS is light
    localStorage: { theme: 'dark' },
    cookies: ['theme=dark'],
    url: 'https://girish.ladestack.in/mr/'
  });

  const ctx = vm.createContext(sim.sandbox);
  for (const script of mrScripts) {
    vm.runInContext(script, ctx);
  }

  assert.equal(sim.isDark(), true, 'Must respect user stored dark theme even if phone OS is light');
  assert.equal(sim.getThemeColor(), '#09090b', 'Status bar must be dark #09090b');
  console.log('✓ TEST 5 PASSED: User Dark theme preference persists across browser closes!');
}

console.log('\n======================================================');
console.log('🎉 ALL 5 COMPREHENSIVE MOBILE TEST SUITES PASSED (100%)');
console.log('======================================================\n');
