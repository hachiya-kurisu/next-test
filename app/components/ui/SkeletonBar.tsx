interface SkeletonBarProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonBar({
  width,
  height,
  className = '',
}: SkeletonBarProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`bg-border rounded shimmer ${className}`.trim()}
      style={style}
    />
  );
}
