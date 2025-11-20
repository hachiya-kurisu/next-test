import SkeletonBar from './SkeletonBar';
import VideoGrid from '../features/VideoGrid';

export function CategorySkeleton() {
  return (
    <>
      <SkeletonBar width="250px" height="2.5rem" className="mb-2" />
      <SkeletonBar width="60%" height="1.25rem" className="mb-8" />
      <VideoGrid videos={[]} isLoading />
    </>
  );
}
