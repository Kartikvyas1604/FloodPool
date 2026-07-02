import { TouchableOpacity, Text, StyleSheet } from "react-native";
import type { ButtonProps } from "./Button.types";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  primary: {
    backgroundColor: "#E4572E",
  },
  secondary: {
    borderWidth: 1,
    borderColor: "rgba(255, 182, 39, 0.4)",
  },
  sm: { paddingHorizontal: 8, paddingVertical: 4 },
  md: { paddingHorizontal: 12, paddingVertical: 6 },
  lg: { paddingHorizontal: 16, paddingVertical: 8 },
  text: {
    fontFamily: "IBM Plex Mono",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  primaryText: { color: "#F4F1E8" },
  secondaryText: { color: "#FFB627" },
});

export function Button({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles[size]]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
