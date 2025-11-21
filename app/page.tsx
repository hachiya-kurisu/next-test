'use client';

import { useQuery } from '@apollo/client/react';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { HomeScreen } from '@/lib/graphql/types';
import CategorySection from '@/app/components/features/CategorySection';
import PageContainer from '@/app/components/ui/PageContainer';
import { useBreadcrumb } from '@/app/contexts/BreadcrumbContext';
import { useEffect } from 'react';

export default function Home() {
  const { setSegments, setLoading } = useBreadcrumb();

  useEffect(() => {
    document.title = 'ホーム | SAMANSA';
    setSegments([{ label: 'ショートフィルム' }]);
    setLoading(false);
  }, [setSegments, setLoading]);

  const { data } = useQuery(GetHomeScreensDocument, {
    fetchPolicy: 'cache-first',
  });

  return (
    <PageContainer>
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
                prioritizeFirst={index === 0 ? 12 : 0}
                isRankable={screen.category?.rankable}
              />
            ))}
        </section>
      )}
    </PageContainer>
  );
}
