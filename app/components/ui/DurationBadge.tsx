interface DurationBadgeProps {
  minutes: number;
  variant?: 'small' | 'large';
}

export default function DurationBadge({
  minutes,
  variant = 'small'
}: DurationBadgeProps) {
  const formatDuration = (mins: number) => {
    if (mins < 60) {
      return `${mins}m`;
    }
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  const formattedDuration = formatDuration(minutes);

  const className = variant === 'small'
    ? 'text-sm text-gray-600'
    : 'text-gray-600';

  return <span className={className}>{formattedDuration}</span>;
}
