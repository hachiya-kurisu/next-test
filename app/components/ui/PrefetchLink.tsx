'use client';

import Link from 'next/link';
import { ComponentProps, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePrefetch } from '@/app/hooks/usePrefetch';

type PrefetchLinkProps = ComponentProps<typeof Link>;

export default function PrefetchLink({
  href,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();
  const hrefString = typeof href === 'string' ? href : href.pathname || '';
  const { onEnter, onLeave } = usePrefetch({ href: hrefString });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onEnter();
      onMouseEnter?.(e);
    },
    [onEnter, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onLeave();
      onMouseLeave?.(e);
    },
    [onLeave, onMouseLeave]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
    },
    [onClick]
  );

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    />
  );
}
