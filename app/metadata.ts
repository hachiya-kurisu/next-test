import type { Metadata } from 'next';

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
