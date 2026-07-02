import type { HTMLAttributes } from "react";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
}

export function Stack({ gap = 4, children, style, ...props }: StackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
