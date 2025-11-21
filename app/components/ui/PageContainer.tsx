import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
