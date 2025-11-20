'use client';

import { useEffect, useRef, useState } from 'react';
import VideoGrid from './VideoGrid';
import { GetHomeScreensQuery } from '@/lib/graphql/generated/graphql';

type Video = NonNullable<NonNullable<GetHomeScreensQuery['homeScreens'][0]['videos']>[0]>;

interface LazyVideoGridProps {
  videos: Video[];
  layout?: 'horizontal' | 'grid';
  prioritizeFirst?: number;
  onEmpty?: () => void;
}

// lazy renders category videos
export default function LazyVideoGrid({
  videos,
  layout = 'horizontal',
  prioritizeFirst = 0,
  onEmpty
}: LazyVideoGridProps) {
  // if videos are already available (cached), render immediately
  const [shouldRender, setShouldRender] = useState(videos.length > 0);
  const containerRef = useRef<HTMLDivElement>(null);

  // detect when component is visible
  useEffect(() => {
    // skip observer if already rendering
    if (shouldRender) return;

    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldRender) {
            setShouldRender(true);
          }
        });
      },
      {
        rootMargin: '200px', // render 200px before component enters viewport
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [shouldRender]);

  // avoid setState during render
  useEffect(() => {
    if (videos.length === 0 && onEmpty) {
      onEmpty();
    }
  }, [videos.length, onEmpty]);

  // don't render empty categories
  if (videos.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef}>
      <VideoGrid
        videos={videos}
        layout={layout}
        prioritizeFirst={prioritizeFirst}
        isLoading={!shouldRender}
        skeletonCount={layout === 'horizontal' ? 6 : 8}
      />
    </div>
  );
}
