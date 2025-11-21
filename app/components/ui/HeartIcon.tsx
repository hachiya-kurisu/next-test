export const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <div className="relative inline-block group cursor-pointer"
       style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="rgb(239, 68, 68)"
      stroke="rgb(239, 68, 68)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 transition-[clip-path] duration-500 ease-out
                 [clip-path:inset(100%_0_0_0)]
                 group-hover:[clip-path:inset(0_0_0_0)]"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </div>
);
