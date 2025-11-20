import { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type PrefetchOptions = {
  href: string;
  delay?: number;
};

export function usePrefetch({ href, delay = 200 }: PrefetchOptions) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      router.prefetch(href);
    }, delay);
  }, [href, delay, router]);

  const onLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { onEnter, onLeave };
}
