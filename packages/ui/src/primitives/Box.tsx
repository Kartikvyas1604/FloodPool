import type { HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

export function Box({ as: Tag = "div", children, ...props }: BoxProps) {
  return <Tag {...props}>{children}</Tag>;
}
