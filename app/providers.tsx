'use client';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { client } from '../lib/apolloClient';
import ErrorBoundary from './components/ErrorBoundary';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
