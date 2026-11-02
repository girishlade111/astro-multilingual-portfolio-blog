---
title: "Scalable Design Systems: Building Resilient Three-Tier Token Architectures"
description: "How we eliminate hardcoded styling, guarantee WCAG 2.2 AA contrast compliance, and support seamless multi-brand theming using tiered design tokens."
pubDate: "2026-11-06"
readingTime: 6
category: "Capabilities"
slug: "design-systems-three-tier-tokens-accessibility"
lang: "en"
tags: ["design-systems", "design-tokens", "accessibility", "wcag-2-2"]
tool: "Design Systems"
---

Most design systems start with great intentions. A designer hands off a Figma file, a developer creates a `tailwind.config.js` with twenty shades of gray, and everyone is happy. Within six months, the codebase is littered with rogue hex codes (`#1a1a24`, `#23232f`), unreadable contrast combinations on mobile screens, and inconsistent button states.

To build UI that survives long-term product iterations, you need a **Three-Tier Design Token Architecture**.

## The Three Tiers of Token Architecture

Instead of referencing raw values directly in components, we route every visual property through three layers of abstraction:

```
[ Tier 1: Primitive Tokens ] -> Raw values (#09090b, 16px, 200ms)
            |
[ Tier 2: Semantic Tokens ]  -> Intent-based aliases (action.primary, surface.muted)
            |
[ Tier 3: Component Tokens ] -> Exact element bounds (button.primary.hover.bg)
```

### 1. Primitive Tokens
The physical palette of your system:
```css
:root {
  --color-zinc-950: #09090b;
  --color-zinc-100: #f4f4f5;
  --color-zinc-500: #71717a;
}
```

### 2. Semantic Tokens
The intent and purpose of a value:
```css
:root {
  --surface-base: #fafafa;
  --surface-card: #ffffff;
  --text-main: var(--color-zinc-950);
  --text-muted: var(--color-zinc-500);
  --action-primary: var(--color-zinc-950);
  --border-subtle: rgba(228, 228, 231, 0.8);
}
```

### 3. Component Tokens
Scoped precisely to element states:
```css
.btn-primary {
  background-color: var(--action-primary);
  color: var(--surface-card);
}
```

## Enforcing WCAG 2.2 AA Accessibility

Every text-to-background combination in our semantic layer is mathematically tested against WCAG contrast algorithms. Normal body text guarantees a minimum 4.5:1 ratio, while large display headings achieve at least 3.0:1.

Furthermore, we enforce:
- Zero native `<select>` dropdowns with platform-specific chevrons.
- Strict 44x44px minimum touch targets for mobile accessibility.
- Zero reliance on color alone to communicate state.

Systematic design produces durable software.
