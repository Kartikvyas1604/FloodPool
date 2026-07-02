export const colors = {
  pitch: {
    dark: "#0B3D2E",
    stripe: "#146443",
  },
  chalk: "#F4F1E8",
  floodlight: "#FFB627",
  cornerFlag: "#E4572E",
  scoreboardBlack: "#111111",
} as const;

export type ColorToken = keyof typeof colors;
