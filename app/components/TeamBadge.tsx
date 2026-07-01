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

const SIDE_COLORS = {
  OVER: "corner-flag" as const,
  UNDER: "floodlight" as const,
} as const;

export function TeamBadge({
  label,
  side,
  stake,
  position,
  address,
  onConnect,
}: TeamBadgeProps) {
  const isActive = stake?.side === side;
  const sideKey = side === "OVER" ? "OVER" : "UNDER";
  const accentStyle = {
    OVER: "text-corner-flag border-corner-flag/40 hover:bg-corner-flag/10",
    UNDER:
      "text-floodlight border-floodlight/40 hover:bg-floodlight/10",
  };

  const activeStyle = {
    OVER: "text-corner-flag",
    UNDER: "text-floodlight",
  };

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
          isActive && activeStyle[sideKey]
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
                activeStyle[sideKey]
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
            accentStyle[sideKey]
          )}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
