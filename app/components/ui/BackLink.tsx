'use client';

import { useRouter } from 'next/navigation';

interface BackLinkProps {
  label?: string;
}

export default function BackLink({ label = '← 戻る' }: BackLinkProps) {
  const router = useRouter();
  const cls = 'inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-6 group transition-colors cursor-pointer';

  const handleClick = () => {
    router.back();
  };

  return (
    <button onClick={handleClick} className={cls}>
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      <span>{label.replace('← ', '')}</span>
    </button>
  );
}
