"use client";

import { cn, formatUsdc } from "../lib/utils";
import type { Side } from "../lib/types";

interface ResolutionFlipProps {
  show: boolean;
  corners: number;
  winner: Side | null;
  payout: number;
}

export function ResolutionFlip({
  show,
  corners,
  winner,
  payout,
}: ResolutionFlipProps) {
  return (
    <div className="flip-card w-full max-w-lg mx-auto">
      <div
        className={cn(
          "flip-card-inner",
          show && "flipped"
        )}
      >
        <div className="flip-card-front">
          <div className="scoreboard-panel px-6 py-4 flex flex-col items-center gap-2 opacity-0">
            <span className="font-mono text-xs text-chalk/30">
              placeholder
            </span>
          </div>
        </div>

        <div className="flip-card-back">
          <div
            className={cn(
              "scoreboard-panel px-6 py-5 flex flex-col items-center gap-3",
              "animate-roll-in"
            )}
          >
            <span className="font-league text-xs tracking-widest text-floodlight uppercase">
              CPI Confirmed
            </span>

            <span className="led-digit text-5xl sm:text-6xl text-chalk tabular-nums">
              {corners} Corners
            </span>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-league text-2xl tracking-widest uppercase",
                  winner === "OVER"
                    ? "text-corner-flag"
                    : "text-floodlight"
                )}
              >
                {winner === "OVER" ? "OVER" : "UNDER"} Wins
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-chalk/40">
                Payout
              </span>
              <span className="led-digit text-3xl text-chalk tabular-nums">
                ${formatUsdc(payout)} USDC
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-chalk/30">
                Released
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
