"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [key]);

  function setStored(newValue: T | ((prev: T) => T)) {
    setValue((prev) => {
      const resolved = typeof newValue === "function"
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore
      }
      return resolved;
    });
  }

  return [value, setStored] as const;
}
