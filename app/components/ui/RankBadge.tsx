type Props = {
  rank: number;
};

export function RankBadge({ rank }: Props) {
  return (
    <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
      {rank}
    </div>
  );
}
