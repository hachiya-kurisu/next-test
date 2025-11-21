import Link from 'next/link';

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export default function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-3">
        <ol className="flex items-center gap-2 text-sm text-secondary">
          {segments.map((segment, idx) => {
            const isLast = idx === segments.length - 1;

            return (
              <li key={idx} className="flex items-center gap-2">
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
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
