import SkeletonBar from './SkeletonBar';

export function VideoDetailSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="aspect-video bg-border rounded-lg shimmer mb-6 flex-1" />
      <div className="bg-surface rounded-lg p-6 border border-border lg:w-96">
        <SkeletonBar width="60%" height="1.5rem" className="mb-4" />
        <SkeletonBar width="100%" height="1rem" className="mb-6" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-border shimmer" />
            <div className="flex-1">
              <SkeletonBar width="40%" height="0.875rem" className="mb-2" />
              <SkeletonBar width="90%" height="0.75rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
