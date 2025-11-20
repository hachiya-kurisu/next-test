import SkeletonBar from './SkeletonBar';

export default function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="aspect-video bg-border rounded-lg mb-3 shimmer" />
      <SkeletonBar width="75%" height="1.25rem" className="mb-2" />
      <SkeletonBar width="4rem" height="1rem" />
    </div>
  );
}
