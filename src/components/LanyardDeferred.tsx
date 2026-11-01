import React, { lazy, Suspense, useEffect, useState } from 'react';

// three.js (~600 KB) must stay off the critical path. The static SSR preview
// keeps the hero looking complete until this chunk is fetched and mounted.
const Lanyard = lazy(() => import('./Lanyard.jsx')) as React.LazyExoticComponent<
  React.ComponentType<any>
>;

type DeferredProps = Record<string, unknown>;

export default function LanyardDeferred(props: DeferredProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Wait for load, then give the page a quiet window before pulling in
    // three.js. The static SSR card is already visible, so nothing is missing.
    const enable = () => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (!cancelled) setEnabled(true);
      }, 2500);
    };

    if (document.readyState === 'complete') {
      enable();
    } else {
      window.addEventListener('load', enable, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', enable);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Lanyard {...props} />
    </Suspense>
  );
}
