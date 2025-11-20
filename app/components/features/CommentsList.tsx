import { useEffect, useRef, useState } from 'react';
import CommentItem from '../ui/CommentItem';
import EmptyState from '../ui/EmptyState';
import { GetVideoCommentsQuery } from '@/lib/graphql/generated/graphql';

interface CommentsListProps {
  comments?: GetVideoCommentsQuery['videoComments'];
  loading: boolean;
  onLoadMore: () => void;
}

export default function CommentsList({
  comments,
  loading,
  onLoadMore
}: CommentsListProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);

  // reset loading state when comments change (new data loaded)
  useEffect(() => {
    if (comments?.edges) {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [comments?.edges]);

  // intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && comments?.pageInfo?.hasNextPage && !isLoadingMoreRef.current) {
          isLoadingMoreRef.current = true;
          setIsLoadingMore(true);
          onLoadMore();
        }
      },
      {
        rootMargin: '200px', // load 200px before reaching the bottom
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [comments?.pageInfo?.hasNextPage, onLoadMore]);

  if (loading) {
    return <div className="text-center py-4">コメントを読み込み中...</div>;
  }

  const hasComments = comments?.edges && comments.edges.length > 0;

  if (!hasComments) {
    return <EmptyState message="まだコメントはありません" icon="/icons/comment.svg" />;
  }

  return (
    <section aria-label="Comments">
      <div className="space-y-4 max-h-[600px] overflow-y-auto" role="feed">
        {comments.edges?.filter(edge => edge.node).map((edge) => (
          <CommentItem
            key={edge.node!.id}
            user={edge.node!.user}
            contents={edge.node!.contents}
            createdAt={edge.node!.createdAt}
            likeNum={edge.node!.likeNum}
          />
        ))}

        {comments.pageInfo?.hasNextPage && (
          <footer ref={sentinelRef} className="py-4 text-center">
            {isLoadingMore && (
              <div className="flex items-center justify-center gap-2 text-secondary" role="status" aria-live="polite">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">さらに読み込み中...</span>
              </div>
            )}
          </footer>
        )}
      </div>
    </section>
  );
}
