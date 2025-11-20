'use client';

import { useQuery } from '@apollo/client';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { HomeScreen } from '@/lib/graphql/types';
import { PageWithRefresh } from '@/app/components/ui/PageWithRefresh';
import { HomeScreenSkeleton } from '@/app/components/ui/HomeScreenSkeleton';
import ErrorState from '@/app/components/ui/ErrorState';
import CategorySection from '@/app/components/features/CategorySection';
import Heading from '@/app/components/ui/Heading';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'ホーム | SAMANSA';
  }, []);

  const { data, loading, error, refetch } = useQuery(GetHomeScreensDocument, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <PageWithRefresh onRefresh={handleRefresh}>
      <Heading>SAMANSA</Heading>

      {loading && <HomeScreenSkeleton />}

      {error && (
        <ErrorState
          message={error.message}
          onRetry={() => refetch()}
        />
      )}

      {data?.homeScreens && (
        <section className="space-y-16">
          {data.homeScreens
            .filter((screen: HomeScreen) => screen.category?.name && screen.category?.id)
            .map((screen: HomeScreen, index: number) => (
              <CategorySection
                key={screen.id}
                categoryId={screen.category!.id}
                categoryName={screen.category!.name!}
                videos={screen.videos || []}
                index={index}
                prioritizeFirst={index === 0 ? 4 : 0}
              />
            ))}
        </section>
      )}
    </PageWithRefresh>
  );
}
