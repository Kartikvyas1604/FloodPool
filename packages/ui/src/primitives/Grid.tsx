import type { HTMLAttributes } from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number | string;
}

export function Grid({
  columns = 2,
  gap = 4,
  children,
  style,
  ...props
}: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
