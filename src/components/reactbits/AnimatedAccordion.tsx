import React, { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import { getNextAccordionFocusIndex } from '../../utils/accordion';

export interface AnimatedAccordionItemProps {
  id: string;
  indexLabel?: string;
  title: string;
  subtitle?: string;
  metaLabel?: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  triggerRef?: (el: HTMLButtonElement | null) => void;
  expandHint?: string;
  collapseHint?: string;
  testIdPrefix?: string;
  variant?: 'primary' | 'nested';
  children: React.ReactNode;
}

export const AnimatedAccordionItem: React.FC<AnimatedAccordionItemProps> = ({
  id,
  indexLabel,
  title,
  subtitle,
  metaLabel,
  icon,
  isOpen,
  onToggle,
  onKeyDown,
  triggerRef,
  expandHint = 'Click to expand section',
  collapseHint = 'Click to collapse',
  testIdPrefix = 'section',
  variant = 'primary',
  children,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <SpotlightCard
      as="div"
      spotlightColor={isOpen ? 'rgba(24, 24, 27, 0.045)' : 'rgba(24, 24, 27, 0.03)'}
      className={
        isPrimary
          ? `portfolio-section rounded-xl border transition-colors duration-150 ${
              isOpen
                ? 'border-zinc-900/30 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
                : 'border-zinc-200/80 bg-white/90 hover:border-zinc-300 hover:bg-white'
            }`
          : `portfolio-topic rounded-lg border transition-colors duration-150 ${
              isOpen
                ? 'border-zinc-900/20 bg-zinc-50/70'
                : 'border-zinc-200/75 bg-white hover:border-zinc-300'
            }`
      }
    >
      <div
        id={`${testIdPrefix}-${id}`}
        data-testid={isPrimary ? `portfolio-section-${id}` : `${testIdPrefix}-item-${id}`}
        className="scroll-mt-16"
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={onToggle}
          onKeyDown={onKeyDown}
          id={`${testIdPrefix}-heading-${id}`}
          aria-expanded={isOpen}
          aria-controls={`${testIdPrefix}-panel-${id}`}
          data-testid={`${testIdPrefix}-trigger-${id}`}
          className={
            isPrimary
              ? 'accordion-trigger w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-xl'
              : 'accordion-trigger w-full text-left px-3 py-2.5 flex items-center justify-between gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg'
          }
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {icon && (
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border shrink-0 transition-colors duration-150 ${
                  isOpen
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200/90'
                }`}
              >
                {icon}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <div className="accordion-title flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
                {indexLabel && (
                  <span className="font-mono text-[10px] font-medium text-zinc-500 shrink-0">
                    {indexLabel}
                  </span>
                )}
                <h2
                  className={
                    isPrimary
                      ? 'font-display text-xs sm:text-sm font-semibold text-zinc-950 tracking-tight'
                      : 'text-xs font-semibold text-zinc-950 leading-snug'
                  }
                >
                  {title}
                </h2>
                {metaLabel && (
                  <span className="font-mono text-[10px] text-zinc-500">
                    · {metaLabel}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <span
            aria-hidden="true"
            title={isOpen ? collapseHint : expandHint}
            className={
              isPrimary
                ? `inline-flex items-center justify-center w-6 h-6 rounded-md border text-[11px] font-mono shrink-0 transition-transform duration-150 ${
                    isOpen
                      ? 'border-zinc-900 bg-zinc-900 text-white rotate-180'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                  }`
                : 'font-mono text-xs text-zinc-500 shrink-0 select-none w-5 text-center'
            }
          >
            {isPrimary ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-3 h-3"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : isOpen ? (
              '−'
            ) : (
              '+'
            )}
          </span>
        </button>

        <div
            hidden={!isOpen}
            id={`${testIdPrefix}-panel-${id}`}
            role="region"
            aria-labelledby={`${testIdPrefix}-heading-${id}`}
            data-testid={`${testIdPrefix}-panel-${id}`}
            className="accordion-panel"
          >
            <div
              className={
                isPrimary
                  ? 'accordion-body px-3.5 sm:px-4 pb-4 pt-3 border-t border-zinc-100 space-y-4'
                  : 'accordion-body px-3 pb-3 pt-2.5 border-t border-zinc-200/60 space-y-2.5'
              }
            >
              {children}
            </div>
          </div>
      </div>
    </SpotlightCard>
  );
};

export interface AnimatedAccordionGroupProps {
  ariaLabel: string;
  itemIds: readonly string[];
  className?: string;
  children: (helpers: {
    getTriggerProps: (index: number) => {
      triggerRef: (el: HTMLButtonElement | null) => void;
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    };
  }) => React.ReactNode;
}

/**
 * React Bits-patterned Accordion group wrapper providing WAI-ARIA keyboard navigation
 * across accordion headers (`ArrowDown`, `ArrowUp`, `Home`, `End`).
 */
export const AnimatedAccordionGroup: React.FC<AnimatedAccordionGroupProps> = ({
  ariaLabel,
  itemIds,
  className = 'space-y-2',
  children,
}) => {
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const getTriggerProps = (index: number) => ({
    triggerRef: (el: HTMLButtonElement | null) => {
      triggerRefs.current[index] = el;
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const nextIndex = getNextAccordionFocusIndex(index, itemIds.length, e.key);
      if (nextIndex !== null) {
        e.preventDefault();
        triggerRefs.current[nextIndex]?.focus();
      }
    },
  });

  return (
    <div className={className} role="region" aria-label={ariaLabel}>
      {children({ getTriggerProps })}
    </div>
  );
};

export default AnimatedAccordionItem;
