'use client';

import { useApolloClient } from '@apollo/client/react';
import PrefetchLink from '../ui/PrefetchLink';
import Heading from '../ui/Heading';
import Image from 'next/image';
import { TimeBadge } from '../ui/TimeBadge';
import { usePrefetch } from '@/app/hooks/usePrefetch';
import { GetOriginalVideoDocument, GetVideoCommentsDocument } from '@/lib/graphql/generated/graphql';
import { Video } from '@/lib/graphql/types';
import { useCallback } from 'react';

interface VideoCardProps {
  title?: Video['title'];
  landscapeThumbnail?: Video['landscapeThumbnail'];
  duration?: Video['duration'];
  href: string;
  className?: string;
  priority?: boolean;
}

export default function VideoCard({
  title,
  landscapeThumbnail,
  duration,
  href,
  className = '',
  priority = false
}: VideoCardProps) {
  const client = useApolloClient();
  const videoId = href.split('/').pop();
  const { onEnter, onLeave } = usePrefetch({ href });

  const handleMouseEnter = useCallback(() => {
    if (!videoId) return;

    onEnter();
    client.query({
      query: GetOriginalVideoDocument,
      variables: { id: videoId },
    });
    client.query({
      query: GetVideoCommentsDocument,
      variables: { id: videoId, first: 10 },
    });
  }, [client, videoId, onEnter]);

  const handleMouseLeave = useCallback(() => {
    onLeave();
  }, [onLeave]);

  const cls = `group cursor-pointer block ${className}`;

  return (
    <PrefetchLink
      href={href}
      className={cls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <figure className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3 border border-transparent group-hover:border-accent transition-all shadow-sm group-hover:shadow-lg">
        {landscapeThumbnail && (
          <Image
            src={landscapeThumbnail}
            alt={title || '動画サムネイル'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform ease-out"
            priority={priority}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {duration && <TimeBadge minutes={duration.minutes} seconds={duration.seconds} />}
      </figure>

      <Heading
        level="h3"
        size="sm"
        className="font-medium text-primary group-hover:text-accent transition-colors truncate leading-snug"
      >
        {title || '無題'}
      </Heading>
    </PrefetchLink>
  );
}
