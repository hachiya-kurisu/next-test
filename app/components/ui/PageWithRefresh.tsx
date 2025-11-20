'use client';

import { ReactNode } from 'react';
import { usePullToRefresh } from '@/app/hooks/usePullToRefresh';
import PullToRefreshIndicator from './PullToRefresh';
import PageContainer from './PageContainer';

type Props = {
  children: ReactNode;
  onRefresh: () => Promise<void>;
};

export function PageWithRefresh({ children, onRefresh }: Props) {
  const { pullDist, refreshing, progress } = usePullToRefresh({
    onRefresh,
    threshold: 80,
  });

  return (
    <>
      <PullToRefreshIndicator
        pullDist={pullDist}
        refreshing={refreshing}
        progress={progress}
      />
      <PageContainer>{children}</PageContainer>
    </>
  );
}
