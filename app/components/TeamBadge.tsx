"use client";

import { cn, shortenAddress, formatUsdc } from "../lib/utils";
import type { Side, StakePosition } from "../lib/types";

interface TeamBadgeProps {
  label: string;
  side: Side;
  stake: StakePosition | null;
  position: "left" | "right";
  address?: string;
  onConnect?: () => void;
}

export function TeamBadge({
  label,
  side,
  stake,
  position,
  address,
  onConnect,
}: TeamBadgeProps) {
  const isActive = stake?.side === side;
  const accentColor = side === "OVER" ? "corner-flag" : "floodlight";
  const sideColor = side === "OVER" ? "corner-flag" : "floodlight";

  return (
    <div
      className={cn(
        "scoreboard-panel p-4 sm:p-6 flex flex-col items-center gap-3 min-w-[160px] sm:min-w-[200px]",
        "animate-slide-left",
        position === "right" && "animate-slide-right"
      )}
    >
      <span
        className={cn(
          "font-league text-lg sm:text-xl tracking-widest text-chalk uppercase",
          isActive && `text-${accentColor}`
        )}
      >
        {side}
      </span>

      <span className="font-mono text-[10px] uppercase tracking-widest text-chalk/40">
        {label}
      </span>

      {stake ? (
        <div className="flex flex-col items-center gap-1">
          <span
            className={cn(
              "led-digit text-2xl sm:text-3xl tabular-nums",
              side === "OVER" ? "text-corner-flag" : "text-floodlight"
            )}
          >
            ${formatUsdc(stake.amount)}
          </span>
          <span className="font-mono text-[10px] text-chalk/40">
            {shortenAddress(stake.wallet)}
          </span>
          {stake.confirmed && (
            <span
              className={cn(
                "font-mono text-[9px] uppercase tracking-widest",
                `text-${sideColor}`
              )}
            >
              ● Staked
            </span>
          )}
        </div>
      ) : address ? (
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs text-chalk/30">
            {shortenAddress(address)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-chalk/20">
            No stake
          </span>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded",
            "border border-dashed transition-colors duration-200",
            `border-${sideColor}/40 text-${sideColor} hover:bg-${sideColor}/10`
          )}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
