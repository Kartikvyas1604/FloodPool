"use client";

import { useState, useEffect } from "react";
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
  const [animPhase, setAnimPhase] = useState<"idle" | "flipping" | "settled">(
    "idle"
  );

  useEffect(() => {
    if (!show) {
      setAnimPhase("idle");
      return;
    }
    setAnimPhase("flipping");
    const timer = setTimeout(() => {
      setAnimPhase("settled");
    }, 1200);
    return () => clearTimeout(timer);
  }, [show]);

  const isOver = winner === "OVER";

  return (
    <div className="flip-card w-full max-w-lg mx-auto">
      <div
        className={cn(
          "flip-card-inner",
          (animPhase === "flipping" || animPhase === "settled") && "flipped"
        )}
      >
        {/* Front face (hidden during flip) */}
        <div className="flip-card-front">
          <div className="scoreboard-panel px-6 py-4 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-chalk/20 uppercase tracking-widest">
              Result Pending
            </span>
          </div>
        </div>

        {/* Back face (shown after flip) */}
        <div className="flip-card-back">
          <div
            className={cn(
              "scoreboard-panel px-5 sm:px-6 py-5 flex flex-col items-center gap-3",
              animPhase === "settled" && "animate-roll-in"
            )}
          >
            {/* Status badge */}
            <span className="font-mono text-[9px] uppercase tracking-widest text-green-500/70">
              ● CPI Confirmed
            </span>

            {/* Divider line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-chalk/10 to-transparent" />

            {/* Corner tally */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-chalk/30">
              Final Corner Count
            </span>
            <span className="led-digit text-5xl sm:text-6xl text-chalk tabular-nums leading-none">
              {corners}
            </span>

            {/* Winner announcement */}
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  "font-league text-xl sm:text-2xl tracking-widest uppercase",
                  isOver ? "text-corner-flag" : "text-floodlight"
                )}
              >
                {isOver ? "OVER" : "UNDER"} WINS
              </span>
            </div>

            {/* Payout */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-chalk/30">
                Payout
              </span>
              <span
                className={cn(
                  "led-digit text-2xl sm:text-3xl tabular-nums",
                  isOver ? "text-corner-flag" : "text-floodlight"
                )}
              >
                ${formatUsdc(payout)} USDC
              </span>
            </div>

            {/* Release badge */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[8px] uppercase tracking-widest text-chalk/20">
                Released to winner
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
