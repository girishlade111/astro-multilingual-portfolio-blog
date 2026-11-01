export type AccordionState = Record<string, boolean>;

export interface ToggleAccordionOptions {
  /**
   * When false (default), opening an item closes all other open items
   * so that only the clicked section expands at a time.
   */
  allowMultiple?: boolean;
}

/**
 * Returns an empty accordion state so all sections start collapsed/hidden by default.
 */
export function createInitialAccordionState(): AccordionState {
  return {};
}

/**
 * Checks whether a specific accordion section is currently expanded.
 */
export function isAccordionItemOpen(state: AccordionState, id: string): boolean {
  return Boolean(state[id]);
}

/**
 * Toggles an accordion section cleanly.
 * By default (`allowMultiple: false`), clicking a closed section opens ONLY that section
 * and collapses any previously open section; clicking an already-open section collapses it.
 */
export function toggleAccordionItem(
  state: AccordionState,
  id: string,
  options: ToggleAccordionOptions = {}
): AccordionState {
  const { allowMultiple = false } = options;
  const currentlyOpen = Boolean(state[id]);

  if (allowMultiple) {
    if (currentlyOpen) {
      const next = { ...state };
      delete next[id];
      return next;
    }
    return {
      ...state,
      [id]: true,
    };
  }

  // Single-expand mode: only the clicked section expands; clicking again collapses it
  if (currentlyOpen) {
    return {};
  }
  return { [id]: true };
}

/**
 * Explicitly opens a single target section (closing others unless allowMultiple is true).
 */
export function openAccordionItem(
  state: AccordionState,
  id: string,
  options: ToggleAccordionOptions = {}
): AccordionState {
  const { allowMultiple = false } = options;
  if (allowMultiple) {
    return { ...state, [id]: true };
  }
  return { [id]: true };
}

/**
 * Checks whether every key in `keys` is currently open.
 */
export function areAllAccordionItemsOpen(
  state: AccordionState,
  keys: readonly string[]
): boolean {
  if (keys.length === 0) return false;
  return keys.every((k) => Boolean(state[k]));
}

/**
 * Toggles between all sections expanded and all sections collapsed.
 */
export function toggleAllAccordionItems(
  state: AccordionState,
  keys: readonly string[]
): AccordionState {
  if (areAllAccordionItemsOpen(state, keys)) {
    return {};
  }
  const next: AccordionState = {};
  for (const key of keys) {
    next[key] = true;
  }
  return next;
}

/**
 * Computes the next trigger index for WAI-ARIA Accordion keyboard navigation
 * (`ArrowDown`, `ArrowUp`, `Home`, `End`). Returns `null` if the key is unrelated.
 */
export function getNextAccordionFocusIndex(
  currentIndex: number,
  totalItems: number,
  key: string
): number | null {
  if (totalItems <= 0) return null;

  switch (key) {
    case 'ArrowDown':
      return (currentIndex + 1) % totalItems;
    case 'ArrowUp':
      return (currentIndex - 1 + totalItems) % totalItems;
    case 'Home':
      return 0;
    case 'End':
      return totalItems - 1;
    default:
      return null;
  }
}
