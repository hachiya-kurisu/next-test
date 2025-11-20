import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

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

export const metadata: Metadata = {
  title: {
    template: '%s | SAMANSA',
    default: 'SAMANSA - short films',
  },
  description: 'watch a curated collection of short films. browse by category, explore trending content, engage with our community.',
  keywords: ['movies', 'films', 'videos', 'short films', 'entertainment', 'streaming'],
  authors: [{ name: 'SAMANSA' }],
  openGraph: {
    title: 'SAMANSA - short films',
    description: 'Discover and watch a curated collection of short films and videos',
    type: 'website',
    siteName: 'SAMANSA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAMANSA - short films',
    description: 'Discover and watch a curated collection of short films and videos',
  },
};

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
