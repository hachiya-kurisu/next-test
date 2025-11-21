'use client';

import { useEffect, useState } from 'react';

export default function LoadingDots() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-secondary">{dots}</span>;
}
