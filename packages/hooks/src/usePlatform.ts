export type Platform = "web" | "mobile" | "extension";

export function usePlatform(): Platform {
  if (typeof window === "undefined") return "web";
  if ("chrome" in window && "runtime" in (window as any).chrome) return "extension";
  if (typeof document !== "undefined" && "documentMode" in document) return "web";
  return "web";
}
