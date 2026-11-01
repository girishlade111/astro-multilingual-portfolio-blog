import React, { useRef } from 'react';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: 'div' | 'article' | 'section';
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(24, 24, 27, 0.055)',
  as: Tag = 'div',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mutate the overlay directly: no React state means no re-render of the
  // whole portfolio tree on every mousemove.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(480px circle at ${x}px ${y}px, ${spotlightColor}, transparent 45%)`;
  };

  const handleMouseEnter = () => {
    if (glowRef.current) glowRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <Tag
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0"
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
};

export default SpotlightCard;
