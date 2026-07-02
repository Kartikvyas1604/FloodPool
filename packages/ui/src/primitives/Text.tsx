import type { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "label" | "h1" | "h2" | "h3" | "h4";
  variant?: "dseg7" | "league" | "mono";
  size?: string;
  color?: string;
}

export function Text({
  as: Tag = "span",
  variant,
  size,
  color,
  children,
  style,
  ...props
}: TextProps) {
  return (
    <Tag
      style={{
        ...(variant && { fontFamily: `var(--font-${variant})` }),
        ...(size && { fontSize: size }),
        ...(color && { color }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
