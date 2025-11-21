import { ReactNode } from 'react';

type Level = 'h1' | 'h2' | 'h3';
type Size = 'xl' | 'lg' | 'md' | 'sm';

interface HeadingProps {
  level?: Level;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  xl: 'text-5xl mb-16',
  lg: 'text-3xl mb-10',
  md: 'text-2xl mb-6',
  sm: 'text-xl mb-4',
};

const defaultSizes: Record<Level, Size> = {
  h1: 'xl',
  h2: 'md',
  h3: 'sm',
};

export default function Heading({
  level = 'h1',
  size,
  className = '',
  children,
}: HeadingProps) {
  const Tag = level;
  const sz = size || defaultSizes[level];
  const cls = `font-semibold text-primary tracking-tight ${sizeClasses[sz]} ${className}`.trim();

  return <Tag className={cls}>{children}</Tag>;
}
