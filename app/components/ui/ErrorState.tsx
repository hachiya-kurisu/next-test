import Heading from './Heading';
import Button from './Button';

interface ErrorStateProps {
  message: string;
  icon?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorState({
  message,
  icon = ' ',
  onRetry,
  showRetry = true
}: ErrorStateProps) {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-4" role="alert" aria-live="polite">
      <figure className="text-6xl mb-4" aria-hidden="true">{icon}</figure>
      <Heading level="h2" className="mb-2">エラーが発生しました</Heading>
      <p className="text-secondary text-center mb-6 max-w-md">
        {message}
      </p>
      {onRetry && showRetry && (
        <Button onClick={onRetry}>
          再試行
        </Button>
      )}
    </section>
  );
}
