import type { ButtonProps } from "./Button.types";

const variantStyles = {
  primary: "bg-corner-flag text-chalk hover:bg-corner-flag/90 active:scale-95",
  secondary:
    "border border-floodlight/40 text-floodlight hover:bg-floodlight/10",
  ghost: "text-chalk/40 hover:text-chalk/60 hover:bg-chalk/5",
} as const;

const sizeStyles = {
  sm: "px-2 py-1 text-[9px]",
  md: "px-3 py-1.5 text-[10px]",
  lg: "px-4 py-2 text-[11px]",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "font-mono uppercase tracking-widest rounded transition-all duration-200 inline-flex items-center justify-center gap-2";

  return (
    <button
      className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
