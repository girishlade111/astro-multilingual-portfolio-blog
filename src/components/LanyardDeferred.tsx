import React, { lazy, Suspense, useEffect, useState } from 'react';

// three.js (~600 KB) stays deferred via lazy import so initial SSR HTML and critical CSS
// render instantly with 0ms blocking.
const Lanyard = lazy(() => import('./Lanyard.jsx')) as React.LazyExoticComponent<
  React.ComponentType<any>
>;

type DeferredProps = Record<string, unknown>;

export default function LanyardDeferred(props: DeferredProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Mount immediately on hydration so the 3D Lanyard and gyroscope are interactive
    // without any artificial setTimeout or window.load delay.
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Lanyard {...props} />
    </Suspense>
  );
}
