import SkeletonBar from './SkeletonBar';
import VideoGrid from '../features/VideoGrid';

export function HomeScreenSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <SkeletonBar width="200px" height="2rem" className="mb-6" />
          <VideoGrid videos={[]} isLoading />
        </div>
      ))}
    </div>
  );
}
