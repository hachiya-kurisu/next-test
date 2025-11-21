import DurationBadge from '../ui/DurationBadge';
import Heading from '../ui/Heading';
import { HeartIcon } from '../ui/HeartIcon';
import { GetOriginalVideoQuery } from '@/lib/graphql/generated/graphql';

interface VideoDetailsProps {
  video: NonNullable<GetOriginalVideoQuery['originalVideo']>;
}

export default function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <article className="flex-1">
      {video.landscapeThumbnail && (
        <figure className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8 shadow-md">
          <img
            src={video.landscapeThumbnail}
            alt={video.title || '動画サムネイル'}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      <Heading size="lg" className="leading-tight !mb-2">
        {video.title || '無題'}
      </Heading>

      {video.creator && (
        <div className="flex items-center gap-3 mb-6">
          {video.creator.avatar && (
            <img
              src={video.creator.avatar}
              alt={video.creator.name || 'クリエイターアバター'}
              width={40}
              height={40}
              className="rounded-full border-2 border-border"
            />
          )}
          <div className="text-primary">
            {video.creator.name || '匿名'}
          </div>
        </div>
      )}

      <footer className="flex items-center gap-6 mb-8 text-secondary">
        <div className="flex items-center gap-2">
          <HeartIcon size={24} />
          <span className="text-lg font-medium">{video.likeNum.toLocaleString()}</span>
        </div>
        {video.duration?.minutes != null && (
          <DurationBadge
            minutes={video.duration.minutes}
            variant="large"
          />
        )}
      </footer>

      <p className="text-primary leading-relaxed text-base">
        {video.description || '説明はありません。'}
      </p>
    </article>
  );
}
