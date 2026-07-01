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

function DigitRoll({ char, delay }: { char: string; delay: number }) {
  return (
    <span
      className="inline-block led-digit-roll"
      style={{ animationDelay: `${delay}s` }}
    >
      {char}
    </span>
  );
}

export function Clock({ seconds, corners, running, className }: ClockProps) {
  const timeStr = formatTime(seconds);

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="scoreboard-panel px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
        <span className="led-digit text-3xl sm:text-5xl md:text-7xl text-floodlight tabular-nums overflow-hidden">
          {timeStr.split("").map((char, i) => (
            <DigitRoll key={`t${i}`} char={char} delay={0.3 + i * 0.08} />
          ))}
        </span>
        <span className="text-chalk/30 text-2xl sm:text-4xl font-mono">|</span>
        <div className="flex flex-col items-start">
          <span className="font-league text-[10px] sm:text-xs tracking-widest text-chalk/40 uppercase">
            Corners
          </span>
          <span className="led-digit text-2xl sm:text-4xl md:text-6xl text-corner-flag tabular-nums overflow-hidden">
            {String(corners)
              .padStart(2, "0")
              .split("")
              .map((char, i) => (
                <DigitRoll key={`c${i}`} char={char} delay={0.5 + i * 0.1} />
              ))}
          </span>
        </div>
      </div>
      {running && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse">
          ● Live
        </span>
      )}
      {!running && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-chalk/20">
          ● Paused
        </span>
      )}
    </div>
  );
}
