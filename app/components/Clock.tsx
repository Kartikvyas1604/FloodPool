"use client";

import { cn } from "../lib/utils";

interface ClockProps {
  seconds: number;
  corners: number;
  running: boolean;
  className?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Clock({ seconds, corners, running, className }: ClockProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        className
      )}
    >
      <div className="scoreboard-panel px-6 py-3 flex items-center gap-4">
        <span className="led-digit text-5xl sm:text-6xl md:text-7xl text-floodlight tabular-nums">
          {formatTime(seconds)}
        </span>
        <span className="text-chalk/30 text-4xl font-mono">|</span>
        <div className="flex flex-col items-start">
          <span className="font-league text-xs tracking-widest text-chalk/40 uppercase">
            Corners
          </span>
          <span className="led-digit text-4xl sm:text-5xl md:text-6xl text-corner-flag tabular-nums">
            {corners}
          </span>
        </div>
      </div>
      {running && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse">
          ● Live
        </span>
      )}
    </div>
  );
}
