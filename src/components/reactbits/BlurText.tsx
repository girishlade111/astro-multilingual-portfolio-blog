import React, { useEffect, useState } from 'react';

export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 45,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const yOffset = direction === 'top' ? '-8px' : '8px';

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {elements.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          style={{
            transitionProperty: 'filter, opacity, transform',
            transitionDuration: '420ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: `${index * delay}ms`,
            filter: visible ? 'blur(0px)' : 'blur(6px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0px)' : `translateY(${yOffset})`,
          }}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
