import React, { useState } from 'react';
import type { Locale } from '../i18n/config';
import { getPortfolioContent } from '../data/portfolioContent';
import SpotlightCard from './reactbits/SpotlightCard';
import {
  AnimatedAccordionGroup,
  AnimatedAccordionItem,
} from './reactbits/AnimatedAccordion';
import {
  areAllAccordionItemsOpen,
  createInitialAccordionState,
  isAccordionItemOpen,
  openAccordionItem,
  toggleAccordionItem,
  toggleAllAccordionItems,
} from '../utils/accordion';

interface PortfolioSectionsProps {
  locale: Locale;
}

export const SECTION_KEYS = [
  'profile',
  'story',
  'education',
  'vision',
  'ecosystem',
  'products',
  'prototypes',
  'capabilities',
  'practice',
  'contact',
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

const MinimalSectionIcon: React.FC<{ section: SectionKey }> = ({ section }) => {
  switch (section) {
    case 'profile':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19.5c1.8-3.2 4.2-4.5 7-4.5s5.2 1.3 7 4.5" strokeLinecap="round" />
        </svg>
      );
    case 'story':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" />
          <circle cx="18" cy="12" r="2" />
        </svg>
      );
    case 'education':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <path d="M12 4 3 8.5 12 13l9-4.5L12 4Z" strokeLinejoin="round" />
          <path d="M6.5 10.5v5c0 1.8 2.5 3.5 5.5 3.5s5.5-1.7 5.5-3.5v-5" strokeLinecap="round" />
        </svg>
      );
    case 'vision':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="8.5" />
          <polygon points="14.8,9.2 13.2,13.2 9.2,14.8 10.8,10.8" />
        </svg>
      );
    case 'ecosystem':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'products':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" strokeLinejoin="round" />
          <path d="M4 7l8 4 8-4M12 11v10" strokeLinecap="round" />
        </svg>
      );
    case 'prototypes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <path d="M9 3h6M10 3v5.2L5.4 16.6A2 2 0 0 0 7.1 19.5h9.8a2 2 0 0 0 1.7-2.9L14 8.2V3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 14h9" strokeLinecap="round" />
        </svg>
      );
    case 'capabilities':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <polyline points="8 8 4 12 8 16" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="16 8 20 12 16 16" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="13.5" y1="6" x2="10.5" y2="18" strokeLinecap="round" />
        </svg>
      );
    case 'practice':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          <circle cx="8" cy="7" r="1.8" fill="currentColor" />
          <circle cx="15" cy="12" r="1.8" fill="currentColor" />
          <circle cx="10" cy="17" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'contact':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

export const PortfolioSections: React.FC<PortfolioSectionsProps> = ({
  locale,
}) => {
  const c = getPortfolioContent(locale);

  // All main sections and sub-accordions start 100% collapsed/hidden by default
  const [openSections, setOpenSections] = useState(createInitialAccordionState);
  const [openProducts, setOpenProducts] = useState(createInitialAccordionState);
  const [openStoryChapters, setOpenStoryChapters] = useState(createInitialAccordionState);
  const [openPrototypes, setOpenPrototypes] = useState(createInitialAccordionState);
  const [openBioMode, setOpenBioMode] = useState<'short' | 'medium' | 'extended'>('short');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Single-expand accordion behavior: only the clicked section expands
  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => toggleAccordionItem(prev, key, { allowMultiple: false }));
  };

  const toggleProduct = (id: string) => {
    setOpenProducts((prev) => toggleAccordionItem(prev, id, { allowMultiple: false }));
  };

  const toggleStoryChapter = (id: string) => {
    setOpenStoryChapters((prev) => toggleAccordionItem(prev, id, { allowMultiple: false }));
  };

  const togglePrototype = (id: string) => {
    setOpenPrototypes((prev) => toggleAccordionItem(prev, id, { allowMultiple: false }));
  };

  const allExpanded = areAllAccordionItemsOpen(openSections, SECTION_KEYS);

  const handleToggleAll = () => {
    setOpenSections((prev) => toggleAllAccordionItems(prev, SECTION_KEYS));
  };

  const handleExploreProducts = () => {
    setOpenSections((prev) => openAccordionItem(prev, 'products', { allowMultiple: false }));
    window.requestAnimationFrame(() => {
      const el = document.getElementById('section-products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleOpenContact = () => {
    setOpenSections((prev) => openAccordionItem(prev, 'contact', { allowMultiple: false }));
    window.requestAnimationFrame(() => {
      const el = document.getElementById('section-contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('admin@ladestack.in');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = 'mailto:admin@ladestack.in';
    }
  };

  return (
    <div className="portfolio-content relative z-10 w-full pt-2 pb-14 sm:pb-20">
      {/* Compact, Clean Identity Intro Below Lanyard Hero */}
      <SpotlightCard
        as="section"
        className="identity-card rounded-xl border border-zinc-200/85 bg-white/95 p-4 sm:p-5 mb-4 sm:mb-5"
      >
        <div className="space-y-3">
          <div className="identity-heading flex items-baseline justify-between gap-2">
            <h1 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-zinc-950 truncate">
              {c.fullName}
            </h1>
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 shrink-0">
              {c.location}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-zinc-800 leading-snug">
              {c.headline}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {c.positioningQuote}
            </p>
          </div>

          {/* Ultra-Compact Single-Row Action Bar */}
          <div className="identity-actions pt-2.5 flex items-center justify-between gap-1 border-t border-zinc-100">
            <div className="flex items-center gap-1 min-w-0">
              <button
                type="button"
                onClick={handleExploreProducts}
                className="inline-flex items-center justify-center h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-zinc-950 text-white text-[10px] sm:text-[11px] font-medium hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{c.exploreProductsBtn}</span>
              </button>

              <a
                href="https://ladestack.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 h-6 sm:h-7 px-2 sm:px-2.5 rounded-md border border-zinc-200 bg-zinc-50/80 text-zinc-800 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:bg-white transition-colors whitespace-nowrap"
              >
                <span>LadeStack</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-2.5 h-2.5 text-zinc-400">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="https://github.com/girishlade111"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 h-6 sm:h-7 px-2 sm:px-2.5 rounded-md border border-zinc-200 bg-zinc-50/80 text-zinc-800 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:bg-white transition-colors whitespace-nowrap"
              >
                <span>GitHub</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-2.5 h-2.5 text-zinc-400">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleOpenContact}
                className="inline-flex items-center justify-center h-6 sm:h-7 px-2 sm:px-2.5 rounded-md border border-zinc-200 bg-white text-zinc-700 text-[10px] sm:text-[11px] font-medium hover:border-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{c.contactBtn}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleToggleAll}
              data-testid="toggle-all-sections"
              aria-label={allExpanded ? c.collapseAllLabel : c.expandAllLabel}
              className="inline-flex items-center justify-center gap-1 h-6 sm:h-7 px-2 rounded-md border border-zinc-200/80 text-[10px] font-mono text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 transition-colors cursor-pointer shrink-0"
            >
              <span className="hidden sm:inline">{allExpanded ? c.collapseAllLabel : c.expandAllLabel}</span>
              <span aria-hidden="true">{allExpanded ? '−' : '+'}</span>
            </button>
          </div>
        </div>
      </SpotlightCard>

      {/* React Bits Animated Accordion Directory */}
      <AnimatedAccordionGroup
        ariaLabel="Expandable Portfolio Sections"
        itemIds={SECTION_KEYS}
        className="portfolio-directory space-y-2"
      >
        {({ getTriggerProps }) =>
          SECTION_KEYS.map((key, index) => {
            const meta = c.sections[key];
            const isOpen = isAccordionItemOpen(openSections, key);
            const triggerProps = getTriggerProps(index);

            return (
              <AnimatedAccordionItem
                key={key}
                id={key}
                indexLabel={meta.index}
                title={meta.title}
                subtitle={meta.subtitle}
                metaLabel={meta.badge}
                icon={<MinimalSectionIcon section={key} />}
                isOpen={isOpen}
                onToggle={() => toggleSection(key)}
                triggerRef={triggerProps.triggerRef}
                onKeyDown={triggerProps.onKeyDown}
                expandHint={c.clickToExpandHint}
                collapseHint={c.clickToCollapseHint}
                testIdPrefix="section"
                variant="primary"
              >
                {/* 01. ABOUT & IDENTITY */}
                {key === 'profile' && (
                  <div className="space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        {(['short', 'medium', 'extended'] as const).map((mode) => {
                          const label =
                            mode === 'short'
                              ? c.shortBioTitle
                              : mode === 'medium'
                              ? c.mediumBioTitle
                              : c.extendedBioTitle;
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setOpenBioMode(mode)}
                              aria-pressed={openBioMode === mode}
                              className={`h-6 px-2.5 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                                openBioMode === mode
                                  ? 'bg-zinc-950 text-white'
                                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 p-3 sm:p-3.5 text-xs text-zinc-700 leading-relaxed space-y-2">
                        {openBioMode === 'short' && <p>{c.shortBio}</p>}
                        {openBioMode === 'medium' && <p>{c.mediumBio}</p>}
                        {openBioMode === 'extended' &&
                          c.extendedBio.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
                      </div>
                    </div>

                    <div className="divide-y divide-zinc-100 rounded-lg border border-zinc-200/80 bg-white overflow-hidden">
                      {c.identityRows.map((row) => (
                        <div
                          key={row.field}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 sm:gap-3 px-3 py-2 text-xs"
                        >
                          <span className="font-mono text-[11px] text-zinc-400">{row.field}</span>
                          <span className="sm:col-span-2 text-zinc-800">
                            {row.href ? (
                              <a
                                href={row.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
                              >
                                {row.value}
                              </a>
                            ) : (
                              row.value
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 02. EXPERIENCE & JOURNEY */}
                {key === 'story' && (
                  <div className="space-y-2">
                    {c.storyChapters.map((chapter) => {
                      const isChapterOpen = isAccordionItemOpen(openStoryChapters, chapter.id);
                      return (
                        <AnimatedAccordionItem
                          key={chapter.id}
                          id={chapter.id}
                          indexLabel={chapter.code}
                          title={chapter.title}
                          isOpen={isChapterOpen}
                          onToggle={() => toggleStoryChapter(chapter.id)}
                          expandHint={c.clickToExpandHint}
                          collapseHint={c.clickToCollapseHint}
                          testIdPrefix="chapter"
                          variant="nested"
                        >
                          <p className="text-xs text-zinc-600 leading-relaxed">
                            {chapter.body}
                          </p>
                        </AnimatedAccordionItem>
                      );
                    })}
                  </div>
                )}

                {/* 03. EDUCATION */}
                {key === 'education' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {c.educationEntries.map((edu) => (
                        <div
                          key={edu.stage}
                          className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1"
                        >
                          <span className="font-mono text-[10px] text-zinc-400">
                            {edu.stage}
                          </span>
                          <h4 className="text-xs font-semibold text-zinc-950">
                            {edu.qualification}
                          </h4>
                          <p className="text-[11px] font-medium text-zinc-700">
                            {edu.institution}
                          </p>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            {edu.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-zinc-200/80 bg-white p-3 space-y-1">
                      <h3 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        {c.selfDirectedTitle}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {c.selfDirectedEducation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {c.backgroundInfluences.map((inf) => (
                        <div
                          key={inf.title}
                          className="rounded-lg border border-zinc-200/80 bg-zinc-50/40 p-3 space-y-1"
                        >
                          <h4 className="text-xs font-semibold text-zinc-950">
                            {inf.title}
                          </h4>
                          <p className="text-[11px] text-zinc-600 leading-relaxed">
                            {inf.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 04. VISION & VALUES */}
                {key === 'vision' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <span className="font-mono text-[10px] uppercase text-zinc-400">
                          {c.personalVisionTitle}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-950 leading-snug">
                          {c.personalVisionHeadline}
                        </h4>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.personalVisionBody}
                        </p>
                      </div>

                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <span className="font-mono text-[10px] uppercase text-zinc-400">
                          {c.personalMissionTitle}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-950 leading-snug">
                          {c.personalMissionHeadline}
                        </h4>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.personalMissionBody}
                        </p>
                      </div>

                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <span className="font-mono text-[10px] uppercase text-zinc-400">
                          {c.brandVisionTitle}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-950 leading-snug">
                          {c.ladestackVisionHeadline}
                        </h4>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.ladestackVisionBody}
                        </p>
                      </div>

                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <span className="font-mono text-[10px] uppercase text-zinc-400">
                          {c.brandMissionTitle}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-950 leading-snug">
                          {c.ladestackMissionHeadline}
                        </h4>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.ladestackMissionBody}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.coreValues.map((val) => (
                        <div
                          key={val.number}
                          className="rounded-lg border border-zinc-200/80 bg-white p-3 flex items-start gap-2.5"
                        >
                          <span className="font-mono text-[10px] text-zinc-400 mt-0.5 shrink-0">
                            {val.number}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-semibold text-zinc-950">
                              {val.title}
                            </h4>
                            <p className="text-[11px] text-zinc-600 leading-relaxed">
                              {val.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 05. LADESTACK ECOSYSTEM */}
                {key === 'ecosystem' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <h3 className="text-xs font-semibold text-zinc-950">
                          {c.ecosystemBlocks.whatItIsTitle}
                        </h3>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.ecosystemBlocks.whatItIsBody}
                        </p>
                      </div>
                      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1">
                        <h3 className="text-xs font-semibold text-zinc-950">
                          {c.ecosystemBlocks.problemTitle}
                        </h3>
                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                          {c.ecosystemBlocks.problemBody}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.ecosystemBlocks.audiences.map((aud) => (
                        <div
                          key={aud.group}
                          className="rounded-lg border border-zinc-200/80 bg-white p-3 space-y-0.5"
                        >
                          <h4 className="text-xs font-semibold text-zinc-900">
                            {aud.group}
                          </h4>
                          <p className="text-[11px] text-zinc-600 leading-relaxed">
                            {aud.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/40 p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                        {c.ecosystemBlocks.ownershipItems.map((item) => (
                          <div key={item.label} className="flex items-center gap-1.5">
                            <span className="text-zinc-400 font-mono text-[11px]">{item.label}:</span>
                            {item.href ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="font-medium text-zinc-900">{item.value}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 06. PRODUCTS & WEB APPS */}
                {key === 'products' && (
                  <div className="space-y-2">
                    {c.featuredProducts.map((product) => {
                      const isProductOpen = isAccordionItemOpen(openProducts, product.id);
                      return (
                        <AnimatedAccordionItem
                          key={product.id}
                          id={product.id}
                          indexLabel={product.code}
                          title={product.name}
                          subtitle={product.conciseSummary}
                          metaLabel={product.statusBadge}
                          isOpen={isProductOpen}
                          onToggle={() => toggleProduct(product.id)}
                          expandHint={c.clickToExpandHint}
                          collapseHint={c.clickToCollapseHint}
                          testIdPrefix="product"
                          variant="nested"
                        >
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-mono text-zinc-400">
                            <span>{product.category}</span>
                            <span>·</span>
                            <span>{product.role}</span>
                          </div>

                          <p className="text-xs text-zinc-700 leading-relaxed">
                            {product.overview}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {product.useCases.map((uc) => (
                              <div
                                key={uc.number}
                                className="rounded-md border border-zinc-200/80 bg-white p-2.5 space-y-0.5"
                              >
                                <h5 className="text-[11px] font-semibold text-zinc-900">
                                  {uc.title}
                                </h5>
                                <p className="text-[11px] text-zinc-500 leading-relaxed">
                                  {uc.description}
                                </p>
                              </div>
                            ))}
                          </div>

                          <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">
                            <span className="text-zinc-400">{c.techStackLabel}: </span>
                            {product.stack.join(' · ')}
                          </p>

                          {product.note && (
                            <p className="text-[10px] font-mono text-zinc-500 border-l-2 border-zinc-300 pl-2.5 py-0.5">
                              {product.note}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md bg-zinc-950 text-white text-[11px] font-medium hover:bg-zinc-800 transition-colors"
                            >
                              <span>{c.visitSiteLabel}</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="w-2.5 h-2.5"
                              >
                                <path
                                  d="M7 17 17 7M9 7h8v8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>

                            {product.repoUrl && (
                              <a
                                href={product.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-zinc-200 bg-white text-zinc-800 text-[11px] font-medium hover:border-zinc-400 transition-colors"
                              >
                                <span>{c.sourceCodeLabel}</span>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  className="w-2.5 h-2.5"
                                >
                                  <path
                                    d="M7 17 17 7M9 7h8v8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                            )}

                            {product.relatedLinks?.map((rl) => (
                              <a
                                key={rl.href}
                                href={rl.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center h-7 px-2 rounded-md border border-zinc-200 bg-white text-zinc-600 text-[11px] hover:text-zinc-950 hover:border-zinc-400 transition-colors"
                              >
                                <span>{rl.label}</span>
                              </a>
                            ))}
                          </div>
                        </AnimatedAccordionItem>
                      );
                    })}
                  </div>
                )}

                {/* 07. PROTOTYPES & R&D */}
                {key === 'prototypes' && (
                  <div className="space-y-2">
                    {c.prototypes.map((proto) => {
                      const isProtoOpen = isAccordionItemOpen(openPrototypes, proto.id);
                      return (
                        <AnimatedAccordionItem
                          key={proto.id}
                          id={proto.id}
                          indexLabel={proto.code}
                          title={proto.title}
                          subtitle={proto.summary}
                          metaLabel={proto.statusBadge}
                          isOpen={isProtoOpen}
                          onToggle={() => togglePrototype(proto.id)}
                          expandHint={c.clickToExpandHint}
                          collapseHint={c.clickToCollapseHint}
                          testIdPrefix="prototype"
                          variant="nested"
                        >
                          <p className="text-xs text-zinc-600 leading-relaxed">
                            {proto.details}
                          </p>
                          {proto.links && proto.links.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {proto.links.map((lk) => (
                                <a
                                  key={lk.href}
                                  href={lk.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-zinc-200 bg-white text-[11px] font-medium text-zinc-800 hover:border-zinc-400"
                                >
                                  <span>{lk.label}</span>
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="w-2.5 h-2.5"
                                  >
                                    <path
                                      d="M7 17 17 7M9 7h8v8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </a>
                              ))}
                            </div>
                          )}
                        </AnimatedAccordionItem>
                      );
                    })}
                  </div>
                )}

                {/* 08. SKILLS & TECH STACK */}
                {key === 'capabilities' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.capabilityDomains.map((cap) => (
                        <div
                          key={cap.domain}
                          className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1"
                        >
                          <h4 className="text-xs font-semibold text-zinc-950">
                            {cap.domain}
                          </h4>
                          <p className="font-mono text-[10px] text-zinc-700">
                            {cap.technologies}
                          </p>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            {cap.evidence}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.landscapeCategories.map((cat) => (
                        <div
                          key={cat.category}
                          className="rounded-lg border border-zinc-200/80 bg-white p-3 space-y-1"
                        >
                          <h4 className="text-xs font-semibold text-zinc-900">
                            {cat.category}
                          </h4>
                          <p className="font-mono text-[10px] text-zinc-600 leading-relaxed">
                            {cat.items.join(' · ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 09. WORKFLOW & APPROACH */}
                {key === 'practice' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.offerings.map((off) => (
                        <div
                          key={off.code}
                          className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 space-y-1"
                        >
                          <span className="font-mono text-[10px] text-zinc-400">
                            {off.code}
                          </span>
                          <h4 className="text-xs font-semibold text-zinc-950">
                            {off.title}
                          </h4>
                          <p className="text-[11px] text-zinc-600 leading-relaxed">
                            {off.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.approachSteps.map((step) => (
                        <div
                          key={step.step}
                          className="rounded-lg border border-zinc-200/80 bg-white p-3 flex items-start gap-2.5"
                        >
                          <span className="font-mono text-[10px] text-zinc-400 mt-0.5 shrink-0">
                            {step.step}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-semibold text-zinc-950">
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-zinc-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 10. CONTACT & SOCIALS */}
                {key === 'contact' && (
                  <div className="space-y-3.5">
                    <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 p-3.5 space-y-2.5">
                      <h3 className="font-display text-sm font-semibold text-zinc-950">
                        {c.contactHeadline}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {c.contactBody}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <a
                          href="mailto:admin@ladestack.in"
                          className="inline-flex items-center h-7 px-2.5 rounded-md bg-zinc-950 text-white text-[11px] font-medium hover:bg-zinc-800 transition-colors"
                        >
                          <span>admin@ladestack.in</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center h-7 px-2.5 rounded-md border border-zinc-200 bg-white text-zinc-700 text-[11px] font-mono hover:border-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
                        >
                          <span>{copiedEmail ? c.copiedEmailLabel : c.copyEmailLabel}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {c.socialChannels.map((sc) => (
                        <a
                          key={sc.platform}
                          href={sc.href}
                          target={sc.href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={
                            sc.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
                          }
                          className="group rounded-lg border border-zinc-200/80 bg-white p-3 hover:border-zinc-400 transition-colors flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                              {sc.platform}
                            </span>
                            <p className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-4">
                              {sc.handleOrLabel}
                            </p>
                          </div>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 shrink-0"
                          >
                            <path
                              d="M7 17 17 7M9 7h8v8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatedAccordionItem>
            );
          })
        }
      </AnimatedAccordionGroup>
    </div>
  );
};

export default PortfolioSections;
