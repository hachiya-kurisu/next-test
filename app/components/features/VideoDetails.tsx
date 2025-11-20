import DurationBadge from '../ui/DurationBadge';
import Image from 'next/image';
import Heading from '../ui/Heading';
import { GetOriginalVideoQuery } from '@/lib/graphql/generated/graphql';

interface VideoDetailsProps {
  video: NonNullable<GetOriginalVideoQuery['originalVideo']>;
}

export default function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <article className="flex-1">
      {video.landscapeThumbnail && (
        <figure className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src={video.landscapeThumbnail}
            alt={video.title || '動画サムネイル'}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        </figure>
      )}

      <Heading size="lg" className="leading-tight">
        {video.title || '無題'}
      </Heading>

      <footer className="flex items-center gap-6 mb-8 text-secondary">
        <div className="flex items-center gap-2">
          <span className="text-2xl"> </span>
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
