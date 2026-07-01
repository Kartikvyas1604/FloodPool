"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pitch-dark">
      <div className="flex flex-col items-center gap-4 max-w-xs text-center">
        <span className="font-league text-xl tracking-widest text-corner-flag uppercase">
          Feed Unsynced
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-chalk/40 leading-relaxed">
          {error.message ?? "The oracle feed encountered an error. Retrying..."}
        </span>
        <button
          onClick={reset}
          className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded border border-floodlight/40 text-floodlight hover:bg-floodlight/10 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
