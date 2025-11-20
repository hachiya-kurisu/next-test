import { Comment } from '@/lib/graphql/types';

interface CommentItemProps {
  user?: Comment['user'];
  contents?: Comment['contents'];
  createdAt?: Comment['createdAt'];
  likeNum?: Comment['likeNum'];
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'たった今';
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins}分前`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}時間前`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}日前`;
  }
  return date.toLocaleDateString('ja-JP');
}

export default function CommentItem({
  user,
  contents,
  createdAt,
  likeNum
}: CommentItemProps) {
  return (
    <article className="border-b border-border pb-5 last:border-0">
      <header className="flex items-start gap-3">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={user.name || 'ユーザーアバター'}
            width={40}
            height={40}
            className="rounded-full border-2 border-border"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-primary">{user?.name || '匿名'}</div>
          <p className="text-sm text-secondary mt-1.5 leading-relaxed">
            {contents || ''}
          </p>
          <footer className="flex items-center gap-4 mt-2.5 text-xs text-secondary">
            <span>{createdAt ? getRelativeTime(createdAt) : ''}</span>
            <span className="flex items-center gap-1">
              <span> </span>
              <span>{likeNum ?? 0}</span>
            </span>
          </footer>
        </div>
      </header>
    </article>
  );
}
