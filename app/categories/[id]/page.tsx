'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { PageWithRefresh } from '@/app/components/ui/PageWithRefresh';
import { ErrorPage } from '@/app/components/ui/ErrorPage';
import { CategorySkeleton } from '@/app/components/ui/CategorySkeleton';
import { useBreadcrumb } from '@/app/contexts/BreadcrumbContext';
import VideoGrid from '@/app/components/features/VideoGrid';
import EmptyState from '@/app/components/ui/EmptyState';
import Heading from '@/app/components/ui/Heading';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const { setSegments, setLoading } = useBreadcrumb();
  const { data, error, refetch } = useQuery(GetCategoryDocument, {
    variables: { id: unwrappedParams.id },
    fetchPolicy: 'cache-first',
  });

  React.useEffect(() => {
    if (data?.category?.name) {
      document.title = `${data.category.name} | SAMANSA`;
      setSegments([
        { label: 'ホーム', href: '/' },
        { label: data.category.name }
      ]);
      setLoading(false);
    } else if (!error) {
      setLoading(true);
    }
    return () => setSegments([{ label: 'ショートフィルム' }]);
  }, [data?.category?.name, setSegments, setLoading, error]);

  const handleRefresh = async () => {
    await refetch();
  };

  if (!data && !error) {
    return (
      <PageWithRefresh onRefresh={handleRefresh}>
        <CategorySkeleton />
      </PageWithRefresh>
    );
  }

  if (error) {
    return (
      <ErrorPage
        title="カテゴリが見つかりません"
        description={error.message}
      />
    );
  }

  const category = data?.category;
  const hasVideos = category?.videos && category.videos.length > 0;

  return (
    <PageWithRefresh onRefresh={handleRefresh}>
      <Heading level="h2" className="mb-0">{category?.name}</Heading>
      {hasVideos ? (
        <VideoGrid videos={category.videos ?? []} layout="grid" prioritizeFirst={8} isRankable={category?.rankable} />
      ) : (
        <EmptyState message="このカテゴリにはまだ動画がありません" icon="🎬" />
      )}
    </PageWithRefresh>
  );
}
