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
    let idleId: number | undefined;

    const enable = () => {
      if (cancelled) return;
      const ric = (window as any).requestIdleCallback;
      if (typeof ric === 'function') {
        idleId = ric(() => {
          if (!cancelled) setEnabled(true);
        }, { timeout: 1500 });
      } else {
        timer = setTimeout(() => {
          if (!cancelled) setEnabled(true);
        }, 200);
      }
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
      const cic = (window as any).cancelIdleCallback;
      if (idleId !== undefined && typeof cic === 'function') cic(idleId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Lanyard {...props} />
    </Suspense>
  );
}
