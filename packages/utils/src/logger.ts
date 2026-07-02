const LOG_PREFIX = "[HalfLine]";

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.info(`${LOG_PREFIX} ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`${LOG_PREFIX} ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`${LOG_PREFIX} ${message}`, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`${LOG_PREFIX} ${message}`, ...args);
    }
  },
};
