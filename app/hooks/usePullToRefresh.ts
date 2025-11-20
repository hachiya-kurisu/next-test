'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  disabled?: boolean;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  disabled = false,
}: PullToRefreshOptions) {
  const [pullDist, setPullDist] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || refreshing) return;
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, [disabled, refreshing]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pulling.current || disabled || refreshing) return;

    const currY = e.touches[0].clientY;
    const dist = currY - startY.current;

    if (dist > 0) {
      setPullDist(Math.min(dist, threshold * 1.5));
      if (dist > 10) {
        e.preventDefault();
      }
    }
  }, [disabled, refreshing, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current || disabled) return;

    pulling.current = false;

    if (pullDist >= threshold && !refreshing) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPullDist(0);
      }
    } else {
      setPullDist(0);
    }
  }, [disabled, pullDist, threshold, refreshing, onRefresh]);

  useEffect(() => {
    if (disabled) return;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    pullDist,
    refreshing,
    isActive: pullDist > 0 || refreshing,
    progress: Math.min(pullDist / threshold, 1),
  };
}
