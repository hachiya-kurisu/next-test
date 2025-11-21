'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GetOriginalVideoDocument, GetVideoCommentsDocument } from '@/lib/graphql/generated/graphql';
import { PageWithRefresh } from '@/app/components/ui/PageWithRefresh';
import { ErrorPage } from '@/app/components/ui/ErrorPage';
import { VideoDetailSkeleton } from '@/app/components/ui/VideoDetailSkeleton';
import { useBreadcrumb } from '@/app/contexts/BreadcrumbContext';
import VideoDetails from '@/app/components/features/VideoDetails';
import CommentsList from '@/app/components/features/CommentsList';
import Heading from '@/app/components/ui/Heading';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const { setSegments, setLoading } = useBreadcrumb();
  const { data: videoData, error: videoError, refetch: refetchVideo } = useQuery(
    GetOriginalVideoDocument,
    {
      variables: { id: unwrappedParams.id },
      fetchPolicy: 'cache-first',
    }
  );

  React.useEffect(() => {
    if (videoData?.originalVideo?.title) {
      document.title = `${videoData.originalVideo.title} | SAMANSA`;

      const firstCategory = videoData.originalVideo.categories?.[0];
      setSegments([
        { label: 'ホーム', href: '/' },
        ...(firstCategory?.name && firstCategory?.id ? [{ label: firstCategory.name, href: `/categories/${firstCategory.id}` }] : []),
        { label: videoData.originalVideo.title }
      ]);
      setLoading(false);
    } else if (!videoError) {
      setLoading(true);
    }
    return () => setSegments([{ label: 'ショートフィルム' }]);
  }, [videoData?.originalVideo?.title, videoData?.originalVideo?.categories, setSegments, setLoading, videoError]);

  const { data: commentsData, loading: commentsLoading, fetchMore, refetch: refetchComments } = useQuery(
    GetVideoCommentsDocument,
    {
      variables: { id: unwrappedParams.id, first: 10 },
      fetchPolicy: 'network-only',
    }
  );

  const handleRefresh = async () => {
    await Promise.all([
      refetchVideo(),
      refetchComments(),
    ]);
  };

  if (!videoData && !videoError) {
    return (
      <PageWithRefresh onRefresh={handleRefresh}>
        <VideoDetailSkeleton />
      </PageWithRefresh>
    );
  }

  if (videoError) {
    return (
      <ErrorPage
        title="動画が見つかりません"
        description={videoError.message}
      />
    );
  }

  const video = videoData?.originalVideo;
  const comments = commentsData?.videoComments;

  const handleLoadMore = () => {
    if (comments?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: comments.pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <PageWithRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col lg:flex-row gap-8">
        {video && <VideoDetails video={video} />}
        <aside className="lg:w-96 bg-surface border border-border rounded-lg p-6 shadow-sm">
          <Heading level="h2">コメント一覧</Heading>
          <CommentsList
            comments={comments}
            loading={commentsLoading}
            onLoadMore={handleLoadMore}
          />
        </aside>
      </div>
    </PageWithRefresh>
  );
}
