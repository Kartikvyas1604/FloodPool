interface IconProps {
  size?: number;
  className?: string;
}

export function CornerFlag({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="4 21 4 3 20 3 16 9 20 15 4 15" />
    </svg>
  );
}
