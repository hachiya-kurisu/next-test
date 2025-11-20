'use client';

import { useRef, KeyboardEvent } from 'react';
import VideoCard from './VideoCard';
import SkeletonCard from '../ui/SkeletonCard';
import { Video } from '@/lib/graphql/types';

interface VideoGridProps {
  videos?: Video[];
  layout?: 'horizontal' | 'grid';
  prioritizeFirst?: number;
  isLoading?: boolean;
  skeletonCount?: number;
}

export function VideoGrid({
  videos = [],
  layout = 'grid',
  prioritizeFirst = 0,
  isLoading = false,
  skeletonCount = 8
}: VideoGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 280;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (layout === 'horizontal') {
    return (
      <section aria-label="Video carousel">
        <div className="relative overflow-hidden carousel-mask">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded carousel-padding"
            tabIndex={0}
            role="region"
            aria-label="Video carousel - use arrow keys to navigate"
            onKeyDown={handleKeyDown}
          >
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <SkeletonCard key={i} className="flex-shrink-0 w-64" />
                ))
              : videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    title={video.title}
                    landscapeThumbnail={video.landscapeThumbnail}
                    duration={video.duration}
                    href={`/movies/${video.id}`}
                    className="flex-shrink-0 w-64"
                    priority={index < prioritizeFirst}
                  />
                ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Video grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : videos.map((video, index) => (
              <VideoCard
                key={video.id}
                title={video.title}
                landscapeThumbnail={video.landscapeThumbnail}
                duration={video.duration}
                href={`/movies/${video.id}`}
                priority={index < prioritizeFirst}
              />
            ))}
      </div>
    </section>
  );
}

export default VideoGrid;
