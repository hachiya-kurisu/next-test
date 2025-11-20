import Image from 'next/image';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export default function EmptyState({ message, icon = '🐊' }: EmptyStateProps) {
  const isSvg = icon.endsWith('.svg');

  return (
    <section className="text-center py-16" role="status" aria-live="polite">
      <figure className="mb-4 flex justify-center" aria-hidden="true">
        {isSvg ? (
          <Image src={icon} alt="" width={64} height={64} className="text-secondary" />
        ) : (
          <span className="text-6xl">{icon}</span>
        )}
      </figure>
      <p className="text-secondary text-lg">{message}</p>
    </section>
  );
}
