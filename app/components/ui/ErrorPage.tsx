import { ReactNode } from 'react';
import PageContainer from './PageContainer';
import BackLink from './BackLink';
import ErrorState from './ErrorState';

type Props = {
  title: string;
  description: string;
  backLink?: ReactNode;
  onRetry?: () => void;
};

export function ErrorPage({ description, backLink, onRetry }: Props) {
  return (
    <PageContainer>
      {backLink || <BackLink />}
      <ErrorState message={description} onRetry={onRetry} />
    </PageContainer>
  );
}
