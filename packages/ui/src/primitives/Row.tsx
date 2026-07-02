import type { HTMLAttributes } from "react";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: "center" | "start" | "end" | "stretch";
  justify?: "center" | "start" | "end" | "between" | "around";
}

export function Row({
  gap = 4,
  align = "center",
  justify,
  children,
  style,
  ...props
}: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: align,
        ...(justify && {
          justifyContent: justify === "between"
            ? "space-between"
            : justify === "around"
              ? "space-around"
              : `flex-${justify}`,
        }),
        gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
