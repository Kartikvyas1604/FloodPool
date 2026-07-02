type StorageType = "localStorage" | "asyncStorage" | "chromeStorage";

function getStorage(): Storage {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  return {
    length: 0,
    clear: () => {},
    getItem: () => null,
    key: () => null,
    removeItem: () => {},
    setItem: () => {},
  } as Storage;
}

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = getStorage().getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      getStorage().setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  },

  remove(key: string): void {
    try {
      getStorage().removeItem(key);
    } catch {
      // Unavailable
    }
  },

  clear(): void {
    try {
      getStorage().clear();
    } catch {
      // Unavailable
    }
  },
};
