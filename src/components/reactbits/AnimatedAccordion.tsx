import React, { useRef } from 'react';
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
  const Heading = isPrimary ? 'h2' : 'h3';

  return (
    <div className={isPrimary ? 'portfolio-section' : 'portfolio-topic'}>
      <div
        id={`${testIdPrefix}-${id}`}
        data-testid={isPrimary ? `portfolio-section-${id}` : `${testIdPrefix}-item-${id}`}
        className="scroll-mt-20"
      >
        <Heading className="accordion-heading">
          <button
            ref={triggerRef}
            type="button"
            onClick={onToggle}
            onKeyDown={onKeyDown}
            id={`${testIdPrefix}-heading-${id}`}
            aria-expanded={isOpen}
            aria-controls={`${testIdPrefix}-panel-${id}`}
            data-testid={`${testIdPrefix}-trigger-${id}`}
            className="accordion-trigger"
          >
            <span className="accordion-label">
              {isPrimary && icon && (
                <span className="accordion-section-icon" aria-hidden="true">{icon}</span>
              )}
              <span>{title}</span>
            </span>
            <span
              className="accordion-indicator"
              aria-hidden="true"
              title={isOpen ? collapseHint : expandHint}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 8h10" />
                <path className="accordion-indicator-vertical" d="M8 3v10" />
              </svg>
            </span>
          </button>
        </Heading>
        <div
          hidden={!isOpen}
          id={`${testIdPrefix}-panel-${id}`}
          role="region"
          aria-labelledby={`${testIdPrefix}-heading-${id}`}
          data-testid={`${testIdPrefix}-panel-${id}`}
          className="accordion-panel"
        >
          <div className="accordion-body space-y-4">
            {(subtitle || metaLabel) && (
              <div className="accordion-overview">
                {subtitle && <p>{subtitle}</p>}
                {metaLabel && <span>{metaLabel}</span>}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
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
