"use client";

import { cn } from "../lib/utils";
import type { Match } from "../lib/types";

interface MatchSelectorProps {
  matches: Match[];
  selected: Match | null;
  onSelect: (match: Match) => void;
  disabled?: boolean;
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  live: { label: "● LIVE", color: "text-floodlight" },
  upcoming: { label: "UPCOMING", color: "text-chalk/50" },
  halftime: { label: "HALFTIME", color: "text-floodlight" },
  settled: { label: "SETTLED", color: "text-chalk/40" },
};

export function MatchSelector({
  matches,
  selected,
  onSelect,
  disabled,
}: MatchSelectorProps) {
  return (
    <div
      className={cn(
        "scoreboard-panel p-2 flex items-center gap-2",
        "animate-roll-in stagger-3"
      )}
    >
      <span className="font-league text-[11px] tracking-widest text-chalk/70 uppercase shrink-0">
        Matches
      </span>
      <div className="flex gap-1.5 overflow-x-auto">
        {matches.map((match) => {
          const isSelected = selected?.id === match.id;
          const status = STATUS_LABEL[match.status];

          return (
            <button
              key={match.id}
              onClick={() => onSelect(match)}
              disabled={disabled}
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider px-2 py-1.5 rounded whitespace-nowrap",
                "border transition-all duration-200 shrink-0",
                isSelected
                  ? "bg-floodlight text-scoreboard-black border-floodlight font-semibold"
                  : "border-chalk/10 text-chalk/60 hover:border-chalk/30 hover:text-chalk/80",
                disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="leading-tight">{match.homeTeam}</span>
              <span className="text-[8px] text-chalk/50 mx-0.5">vs</span>
              <span className="leading-tight">{match.awayTeam}</span>
              <span className={cn("block text-[7px] leading-tight", status.color)}>
                {status.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
