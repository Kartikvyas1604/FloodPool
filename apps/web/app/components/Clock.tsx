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
  const timeStr = formatTime(seconds);

  return (
    <div className={cn("flex flex-col items-center gap-0.5", className)}>
      <div className="scoreboard-panel px-3 py-2 flex items-center gap-2 sm:gap-3">
        <span className="led-digit text-2xl sm:text-3xl md:text-4xl text-floodlight tabular-nums overflow-hidden leading-none">
          {timeStr}
        </span>
        <span className="text-chalk/50 text-xl sm:text-2xl font-mono leading-none">|</span>
        <div className="flex flex-col items-start gap-0">
          <span className="font-league text-[9px] tracking-widest text-chalk/70 uppercase leading-tight">
            Corners
          </span>
          <span className="led-digit text-xl sm:text-2xl md:text-3xl text-corner-flag tabular-nums overflow-hidden leading-none">
            {String(corners).padStart(2, "0")}
          </span>
        </div>
      </div>
      {running && (
        <span className="font-mono text-[9px] uppercase tracking-widest text-floodlight animate-pulse">
          &bull; Live
        </span>
      )}
      {!running && (
        <span className="font-mono text-[9px] uppercase tracking-widest text-chalk/50">
          &bull; Paused
        </span>
      )}
    </div>
  );
}
