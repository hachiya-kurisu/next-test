'use client';

interface PullToRefreshIndicatorProps {
  pullDist: number;
  refreshing: boolean;
  progress: number;
}

export default function PullToRefreshIndicator({
  pullDist,
  refreshing,
  progress,
}: PullToRefreshIndicatorProps) {
  if (pullDist === 0 && !refreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none"
      style={{
        transform: `translateY(${refreshing ? '60px' : `${pullDist}px`})`,
        transition: refreshing ? 'transform 0.3s ease' : 'none',
      }}
    >
      <div className="bg-surface border border-border rounded-full p-3 shadow-lg">
        {refreshing ? (
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <div
            className="w-6 h-6 text-primary transition-transform"
            style={{
              transform: `rotate(${progress * 180}deg)`,
            }}
          >
            <img
              src="/icons/refresh.svg"
              alt="Pull to refresh"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
    </div>
  );
}
