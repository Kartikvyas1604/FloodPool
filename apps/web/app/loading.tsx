export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pitch-dark">
      <div className="flex flex-col items-center gap-3">
        <span className="font-league text-2xl tracking-widest text-chalk/30 uppercase">
          HalfLine
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse">
          Syncing feed...
        </span>
      </div>
    </div>
  );
}
