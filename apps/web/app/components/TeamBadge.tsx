"use client";

import { cn, shortenAddress, formatUsdc } from "../lib/utils";
import type { Side, StakePosition } from "../lib/types";

interface TeamBadgeProps {
  label: string;
  side: Side;
  stake: StakePosition | null;
  position: "left" | "right";
  address?: string;
  highlight?: boolean;
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
  const sideKey = side === "OVER" ? "OVER" : "UNDER";

  const accentStyle = {
    OVER: "text-corner-flag border-corner-flag/40 hover:bg-corner-flag/10",
    UNDER: "text-floodlight border-floodlight/40 hover:bg-floodlight/10",
  };

  return (
    <div
      className={cn(
        "scoreboard-panel p-3 flex flex-col items-center gap-1.5 w-full min-w-0 max-w-[180px]",
        "animate-slide-left",
        position === "right" && "animate-slide-right"
      )}
    >
      <span className="font-league text-base sm:text-lg tracking-widest text-white uppercase leading-tight">
        {side}
      </span>

      <span className="font-mono text-[9px] uppercase tracking-widest text-chalk/70 leading-tight">
        {label}
      </span>

      {stake ? (
        <div className="flex flex-col items-center gap-0.5">
          <span
            className={cn(
              "led-digit text-xl sm:text-2xl tabular-nums leading-tight",
              side === "OVER" ? "text-corner-flag" : "text-floodlight"
            )}
          >
            ${formatUsdc(stake.amount)}
          </span>
          <span className="font-mono text-[9px] text-chalk/70">
            {shortenAddress(stake.wallet)}
          </span>
          {stake.confirmed && (
            <span
              className={cn(
                "font-mono text-[8px] uppercase tracking-widest",
                side === "OVER" ? "text-corner-flag" : "text-floodlight"
              )}
            >
              &bull; Staked
            </span>
          )}
        </div>
      ) : address ? (
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-mono text-[10px] text-chalk/70">
            {shortenAddress(address)}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-chalk/60">
            No stake
          </span>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className={cn(
            "font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded",
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
