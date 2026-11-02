import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LOCALES, LOCALE_METADATA, type Locale, switchLocalePath } from '../i18n/config';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  url: string;
  external?: boolean;
}

interface CommandPaletteProps {
  locale: Locale;
  currentPath: string;
}

const BLOG_TITLES_EN: Record<string, string> = {
  'why-i-built-ladestack-browser-first-tools': 'Why I Built LadeStack: Browser-First Tools',
  'building-in-browser-ide-monaco-webcontainers': 'Building an In-Browser IDE with Monaco & WebContainers',
  'privacy-first-local-file-processing-web': 'Privacy-First Local File Processing in the Browser',
  'from-mechanical-engineering-to-fullstack-dev': 'From Mechanical Engineering to Full-Stack Developer',
  'client-side-image-compression-canvas-webp': 'Client-Side Image Compression with Canvas & WebP',
  'systems-thinking-mechanical-to-software-architecture': 'Systems Thinking: Mechanical to Software Architecture',
  'building-in-public-independent-developer-philosophy': 'Building in Public: Independent Developer Philosophy',
  'eight-step-engineering-workflow-solo-builders': '8-Step Engineering Workflow for Solo Builders',
  'byok-architecture-ai-app-builders': 'BYOK Architecture for Private AI App Builders',
  'design-systems-three-tier-tokens-accessibility': 'Design Systems with 3-Tier Tokens & Accessibility',
  'performance-conscious-frontend-60fps-web': '60fps Web Performance & Lightweight Frontend',
  'multilingual-astro-architecture-9-languages': 'Multilingual Astro Architecture across 10 Languages',
  'in-browser-api-testing-postman-alternative': 'In-Browser API Testing: Lightweight Postman Alternative',
  'deterministic-url-deduplication-bookmark-manager': 'Deterministic URL Deduplication for Bookmark Manager',
  'swift-resume-ats-friendly-browser-resume-builder': 'Swift Resume: ATS-Friendly Browser Resume Builder',
  'ladestack-portal-unified-tool-directory': 'LadeStack Portal: Unified Developer Tool Directory',
  'ladestack-drive-decentralized-cloud-storage': 'LadeStack Drive: Zero-Knowledge Decentralized Storage',
  'local-notes-document-intelligence-vector-embeddings': 'Local Notes with Vector Embeddings & In-Memory AI',
  'multi-provider-ai-routing-cost-latency-benchmarks': 'Multi-Provider AI Routing: Cost & Latency Benchmarks',
  'md2pdf-markdown-documentation-book-publishing': 'MD2PDF: Print-Ready Markdown Book & Doc Publishing',
  'bharat-land-converter-indian-measurement-systems': 'Bharat Land Converter: Indian Land Measurement Systems',
  'building-33-mini-games-nextjs-code-splitting': 'Building 33 Mini-Games with Dynamic Code Splitting',
  '3d-web-physics-interactive-lanyard-threejs': '3D Web Physics & Gyroscope Badge with Three.js',
  'webassembly-web-workers-browser-operating-system': 'WebAssembly & Web Workers: The Browser as an OS',
  'zero-telemetry-privacy-by-architecture': 'Zero Telemetry: Building Software Without Tracking',
};

const BLOG_TITLES_MR: Record<string, string> = {
  'why-i-built-ladestack-browser-first-tools': 'मी LadeStack का सुरू केलं: ब्राउझर-फर्स्ट टूल्सची गरज',
  'building-in-browser-ide-monaco-webcontainers': 'ब्राउझरमध्ये कोडिंग IDE: Monaco & WebContainers',
  'privacy-first-local-file-processing-web': 'प्रायव्हेट फाईल प्रोसेसिंग: स्थानिक डेटा सुरक्षा',
  'from-mechanical-engineering-to-fullstack-dev': 'मेकॅनिकल इंजिनिअरिंग ते फुल-स्टॅक डेव्हलपर प्रवास',
  'client-side-image-compression-canvas-webp': 'इमेज कॉम्प्रेशन: Canvas आणि WebP तंत्रज्ञान',
  'systems-thinking-mechanical-to-software-architecture': 'सिस्टिम्स थिंकिंग: इंजिनिअरिंग ते सॉफ्टवेअर',
  'building-in-public-independent-developer-philosophy': 'पब्लिकमध्ये काम करणे: सोलो बिल्डर अनुभव',
  'eight-step-engineering-workflow-solo-builders': 'सोलो बिल्डरची ८ टप्प्यांची इंजिनिअरिंग पद्धत',
  'byok-architecture-ai-app-builders': 'BYOK आर्किटेक्चर: स्वतःची API की वापरून AI टूल्स',
  'design-systems-three-tier-tokens-accessibility': 'डिझाइन सिस्टिम्स आणि ३-लेयर टोकन्स',
  'performance-conscious-frontend-60fps-web': '६० एफपीएस परफॉर्मन्स: लॅग-फ्री स्मूथ अनुभव',
  'multilingual-astro-architecture-9-languages': 'अ‍ॅस्ट्रो जेएस सह १० भाषांचे बहुभाषिक आर्किटेक्चर',
  'in-browser-api-testing-postman-alternative': 'ब्राउझरमध्ये API टेस्टिंग: Postman ला पर्याय',
  'deterministic-url-deduplication-bookmark-manager': 'बुकमार्क मॅनेजर आणि URL डीड्युप्लिकेशन',
  'swift-resume-ats-friendly-browser-resume-builder': 'Swift Resume: ATS-फ्रेंडली रेझ्युमे बिल्डर',
  'ladestack-portal-unified-tool-directory': 'LadeStack पोर्टल: सर्व टूल्सची सुटसुटीत डिरेक्टरी',
  'ladestack-drive-decentralized-cloud-storage': 'LadeStack Drive: विकेंद्रित क्लाउड स्टोरेज',
  'local-notes-document-intelligence-vector-embeddings': 'लोकल नोट्स आणि इन-मेमरी वेक्टर सर्च',
  'multi-provider-ai-routing-cost-latency-benchmarks': 'मल्टी-प्रोव्हाइडर AI राऊटिंग आणि वेग',
  'md2pdf-markdown-documentation-book-publishing': 'MD2PDF: मार्कडाउनमधून प्रिंट-रेडी PDF',
  'bharat-land-converter-indian-measurement-systems': 'भारत लँड कन्व्हर्टर: स्थानिक जमीन मोजणी',
  'building-33-mini-games-nextjs-code-splitting': '३३ मिनी गेम्सचा संग्रह आणि कोड स्प्लिटिंग',
  '3d-web-physics-interactive-lanyard-threejs': 'थ्री.जेएस सह ३डी वेब फिजिक्स व गायरोस्कोप',
  'webassembly-web-workers-browser-operating-system': 'WebAssembly आणि Web Workers: ब्राउझर ओएस',
  'zero-telemetry-privacy-by-architecture': 'झिरो टेलिमेट्री: ट्रॅकिंगशिवाय दर्जेदार सॉफ्टवेअर',
};

export default function CommandPalette({ locale, currentPath }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items: CommandItem[] = useMemo(() => {
    const isMarathi = locale === 'mr';
    const list: CommandItem[] = [
      // 1. Navigation
      {
        id: 'nav-home',
        category: isMarathi ? 'नेव्हिगेशन' : 'Navigation',
        title: isMarathi ? 'मुख्यपृष्ठ (Home)' : 'Home Page',
        subtitle: `/${locale}/`,
        url: `/${locale}/`,
      },
      {
        id: 'nav-blog',
        category: isMarathi ? 'नेव्हिगेशन' : 'Navigation',
        title: isMarathi ? 'सर्व तांत्रिक ब्लॉग (All Blogs)' : 'All 25 Technical Blog Posts',
        subtitle: `/${locale}/blog/`,
        url: `/${locale}/blog/`,
      },
      {
        id: 'nav-rss',
        category: isMarathi ? 'नेव्हिगेशन' : 'Navigation',
        title: isMarathi ? 'RSS फीड (RSS 2.0 Feed)' : 'RSS 2.0 Feed',
        subtitle: `/${locale}/rss.xml`,
        url: `/${locale}/rss.xml`,
      },
      // 2. LadeStack Flagship Products
      {
        id: 'prod-portal',
        category: isMarathi ? 'LadeStack प्रॉडक्ट्स' : 'LadeStack Products',
        title: 'LadeStack Portal',
        subtitle: 'Unified client-side tool directory (ladestack.in)',
        url: 'https://ladestack.in',
        external: true,
      },
      {
        id: 'prod-gbcoder',
        category: isMarathi ? 'LadeStack प्रॉडक्ट्स' : 'LadeStack Products',
        title: 'GB Coder — In-Browser IDE',
        subtitle: 'Monaco editor & WebContainers sandbox (gbcoder.ladestack.in)',
        url: 'https://gbcoder.ladestack.in',
        external: true,
      },
      {
        id: 'prod-lspdf',
        category: isMarathi ? 'LadeStack प्रॉडक्ट्स' : 'LadeStack Products',
        title: 'LS PDF — Local PDF Tools',
        subtitle: 'Zero-upload, browser-side PDF processing (lspdf.ladestack.in)',
        url: 'https://lspdf.ladestack.in',
        external: true,
      },
      // 3. Blog Articles
      ...Object.entries(BLOG_TITLES_EN).map(([slug, enTitle]) => {
        const title = isMarathi && BLOG_TITLES_MR[slug] ? BLOG_TITLES_MR[slug] : enTitle;
        return {
          id: `blog-${slug}`,
          category: isMarathi ? 'ब्लॉग लेख (२५ विषय)' : 'Blog Articles (25 Topics)',
          title,
          subtitle: `/${locale}/blog/${slug}/`,
          url: `/${locale}/blog/${slug}/`,
        };
      }),
      // 4. Languages
      ...LOCALES.map((loc) => {
        const meta = LOCALE_METADATA[loc];
        return {
          id: `lang-${loc}`,
          category: isMarathi ? 'भाषा बदला (Language)' : 'Switch Language (10 Locales)',
          title: `${meta.nativeName} (${meta.label})`,
          subtitle: switchLocalePath(currentPath, loc),
          url: switchLocalePath(currentPath, loc),
        };
      }),
      // 5. Contact & Socials
      {
        id: 'social-github',
        category: isMarathi ? 'संपर्क आणि प्रोफाईल्स' : 'Contact & Socials',
        title: 'GitHub — @girishlade111',
        subtitle: 'github.com/girishlade111',
        url: 'https://github.com/girishlade111',
        external: true,
      },
      {
        id: 'social-linkedin',
        category: isMarathi ? 'संपर्क आणि प्रोफाईल्स' : 'Contact & Socials',
        title: 'LinkedIn — Girish Lade',
        subtitle: 'linkedin.com/in/girish-lade/',
        url: 'https://www.linkedin.com/in/girish-lade/',
        external: true,
      },
    ];
    return list;
  }, [locale, currentPath]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items.slice(0, 15);
    const q = search.toLowerCase();
    return items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.subtitle && it.subtitle.toLowerCase().includes(q)) ||
          it.category.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [items, search]);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = item.url;
    }
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Search Trigger Button visible in header or floating */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette (Ctrl+K)"
        className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/80 rounded-lg transition-colors cursor-pointer select-none"
      >
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-sans font-medium text-zinc-400 bg-white border border-zinc-200 rounded shadow-2xs">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-zinc-200/90 text-zinc-900 flex flex-col max-h-[80vh] transition-all"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDownList}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-zinc-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={locale === 'mr' ? 'शोधा (ब्लॉग, टूल्स, भाषा, संपर्क)...' : 'Type a command, blog topic, or product...'}
                className="w-full text-sm bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
              />
              <kbd
                onClick={() => setIsOpen(false)}
                className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-100 border border-zinc-200 rounded cursor-pointer"
              >
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 divide-y divide-zinc-50 max-h-[60vh]">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-400 font-mono">
                  {locale === 'mr' ? 'काहीही सापडले नाही' : 'No matching commands or articles found'}
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isSelected ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 overflow-hidden pr-2">
                        <span className="font-medium truncate">{item.title}</span>
                        {item.subtitle && (
                          <span
                            className={`font-mono text-[11px] truncate ${
                              isSelected ? 'text-zinc-400' : 'text-zinc-400'
                            }`}
                          >
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] uppercase font-mono tracking-wider shrink-0 px-2 py-0.5 rounded ${
                          isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-500'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-100 bg-zinc-50/60 text-[11px] font-mono text-zinc-400 select-none">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span>LadeStack</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
