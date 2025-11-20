import { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <>
      <header className="fixed top-8 right-8 z-50">
        <ThemeToggle />
      </header>
      <div className="min-h-screen p-8 md:p-12 lg:p-16">
        <main className="max-w-7xl mx-auto fade-in">{children}</main>
      </div>
    </>
  )
}
