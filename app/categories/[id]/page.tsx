'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { PageWithRefresh } from '@/app/components/ui/PageWithRefresh';
import { ErrorPage } from '@/app/components/ui/ErrorPage';
import { CategorySkeleton } from '@/app/components/ui/CategorySkeleton';
import BackLink from '@/app/components/ui/BackLink';
import VideoGrid from '@/app/components/features/VideoGrid';
import EmptyState from '@/app/components/ui/EmptyState';
import Heading from '@/app/components/ui/Heading';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const { data, loading, error, refetch } = useQuery(GetCategoryDocument, {
    variables: { id: unwrappedParams.id },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  React.useEffect(() => {
    if (data?.category?.name) {
      document.title = `${data.category.name} | SAMANSA`;
    }
  }, [data?.category?.name]);

  const handleRefresh = async () => {
    await refetch();
  };

  if (loading) {
    return (
      <PageWithRefresh onRefresh={handleRefresh}>
        <BackLink />
        <CategorySkeleton />
      </PageWithRefresh>
    );
  }

  if (error) {
    return (
      <ErrorPage
        title="カテゴリが見つかりません"
        description={error.message}
        backLink={<BackLink />}
      />
    );
  }

  const category = data?.category;
  const hasVideos = category?.videos && category.videos.length > 0;

  return (
    <PageWithRefresh onRefresh={handleRefresh}>
      <BackLink />
      <Heading size="lg">{category?.name}</Heading>
      {hasVideos ? (
        <VideoGrid videos={category.videos ?? []} layout="grid" prioritizeFirst={8} />
      ) : (
        <EmptyState message="このカテゴリにはまだ動画がありません" icon="🎬" />
      )}
    </PageWithRefresh>
  );
}
