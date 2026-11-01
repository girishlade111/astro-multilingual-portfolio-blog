import React, { useEffect, useState } from 'react';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 28,
  maxIterations = 8,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }
    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '·' || char === '—') return char;
            if (index < (iteration / maxIterations) * text.length) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      iteration += 1;
      if (iteration > maxIterations) {
        window.clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [isHovering, text, speed, maxIterations, characters]);

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
