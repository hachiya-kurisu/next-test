type Props = {
  minutes: number;
  seconds: number;
};

export function TimeBadge({ minutes, seconds }: Props) {
  return (
    <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
      {minutes}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
