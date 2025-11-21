'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';
import ThemeToggle from './components/ui/ThemeToggle';
import { BreadcrumbProvider, useBreadcrumb } from './contexts/BreadcrumbContext';
import LoadingDots from './components/ui/LoadingDots';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

function Header() {
  const { segments, isLoading } = useBreadcrumb();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="p-8 md:px-12 lg:px-16 min-h-192">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-primary hover:text-accent transition-colors tracking-tight"
          >
            SAMANSA
          </Link>
          <ThemeToggle />
        </div>
        <div className="h-8 flex items-center gap-2 text-sm text-secondary">
          {isLoading ? (
            <LoadingDots />
          ) : (
            segments.map((segment, idx) => {
              const isLast = idx === segments.length - 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  {segment.href && !isLast ? (
                    <Link
                      href={segment.href}
                      className="hover:text-accent transition-colors"
                    >
                      {segment.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'text-primary' : ''}>
                      {segment.label}
                    </span>
                  )}
                  {!isLast && (
                    <span aria-hidden="true" className="text-border">
                      /
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BreadcrumbProvider>
            <Header />
            {children}
          </BreadcrumbProvider>
        </Providers>
      </body>
    </html>
  );
}
