'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// toggles between light and dark mode
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // avoid flash
    return (
      <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shadow-sm">
        <Image
          src="/icons/sun-placeholder.svg"
          alt="Loading"
          width={20}
          height={20}
          className="text-secondary opacity-50"
        />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Image
          src="/icons/moon.svg"
          alt="Dark mode"
          width={20}
          height={20}
          className="text-accent transition-transform duration-300 group-hover:rotate-12"
        />
      ) : (
        <Image
          src="/icons/sun.svg"
          alt="Light mode"
          width={20}
          height={20}
          className="text-accent transition-transform duration-300 group-hover:rotate-90"
        />
      )}
    </button>
  );
}
