'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbContextType {
  segments: BreadcrumbSegment[];
  setSegments: (_segments: BreadcrumbSegment[]) => void;
  setLoading: (_loading: boolean) => void;
  isLoading: boolean;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

const DEFAULT_TAGLINE: BreadcrumbSegment[] = [{ label: 'ショートフィルム' }];

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [segments, setSegments] = useState<BreadcrumbSegment[]>(DEFAULT_TAGLINE);
  const [isLoading, setLoading] = useState(false);

  return (
    <BreadcrumbContext.Provider value={{ segments, setSegments, isLoading, setLoading }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  return ctx;
}
