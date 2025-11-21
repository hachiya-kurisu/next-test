import PageContainer from './PageContainer';
import ErrorState from './ErrorState';

type Props = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorPage({ description, onRetry }: Props) {
  return (
    <PageContainer>
      <ErrorState message={description} onRetry={onRetry} />
    </PageContainer>
  );
}
