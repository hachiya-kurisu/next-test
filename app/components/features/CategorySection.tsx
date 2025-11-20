'use client';

import { useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import PrefetchLink from '../ui/PrefetchLink';
import LazyVideoGrid from './LazyVideoGrid';
import Heading from '../ui/Heading';
import { usePrefetch } from '@/app/hooks/usePrefetch';
import { GetCategoryDocument, GetHomeScreensQuery } from '@/lib/graphql/generated/graphql';

type Video = NonNullable<NonNullable<GetHomeScreensQuery['homeScreens'][0]['videos']>[0]>;

interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  videos: Video[];
  prioritizeFirst?: number;
  index: number;
}

// category header and lazy-loaded video grid
export default function CategorySection({
  categoryId,
  categoryName,
  videos,
  prioritizeFirst = 0,
}: CategorySectionProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const client = useApolloClient();
  const { onEnter, onLeave } = usePrefetch({ href: `/categories/${categoryId}` });

  const handleCategoryLinkHover = useCallback(() => {
    onEnter();
    client.query({
      query: GetCategoryDocument,
      variables: { id: categoryId },
    });
  }, [client, categoryId, onEnter]);

  const handleCategoryLinkLeave = useCallback(() => {
    onLeave();
  }, [onLeave]);

  if (isEmpty) {
    return null;
  }

  return (
    <section>
      <header className="flex items-baseline justify-between">
        <Heading level="h2" className="mb-0">{categoryName}</Heading>
        <PrefetchLink
          href={`/categories/${categoryId}`}
          className="text-accent hover:text-accent-hover font-medium transition-colors"
          onMouseEnter={handleCategoryLinkHover}
          onMouseLeave={handleCategoryLinkLeave}
        >
          すべて見る →
        </PrefetchLink>
      </header>

      <LazyVideoGrid
        videos={videos}
        layout="horizontal"
        prioritizeFirst={prioritizeFirst}
        onEmpty={() => setIsEmpty(true)}
      />
    </section>
  );
}
