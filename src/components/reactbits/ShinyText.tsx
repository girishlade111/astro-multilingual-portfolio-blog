import React from 'react';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) => {
  return (
    <span
      className={`inline-block bg-clip-text ${
        disabled ? 'text-zinc-500' : 'text-zinc-600'
      } ${className}`}
      style={
        disabled
          ? undefined
          : {
              backgroundImage:
                'linear-gradient(120deg, rgba(82,82,91,1) 35%, rgba(9,9,11,1) 50%, rgba(82,82,91,1) 65%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animation: `rb-shine ${speed}s linear infinite`,
            }
      }
    >
      {text}
    </span>
  );
};

export default ShinyText;
