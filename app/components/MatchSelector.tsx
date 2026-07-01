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
  upcoming: { label: "UPCOMING", color: "text-chalk/30" },
  halftime: { label: "HALFTIME", color: "text-floodlight" },
  settled: { label: "SETTLED", color: "text-chalk/20" },
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
        "scoreboard-panel p-3 sm:p-4 flex flex-col items-center gap-3",
        "animate-roll-in stagger-3"
      )}
    >
      <span className="font-league text-sm tracking-widest text-chalk/50 uppercase">
        Select Match
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {matches.map((match) => {
          const isSelected = selected?.id === match.id;
          const status = STATUS_LABEL[match.status];

          return (
            <button
              key={match.id}
              onClick={() => onSelect(match)}
              disabled={disabled}
              className={cn(
                "font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded",
                "border transition-all duration-200 text-left",
                isSelected
                  ? "bg-floodlight text-scoreboard-black border-floodlight font-semibold"
                  : "border-chalk/10 text-chalk/50 hover:border-chalk/30 hover:text-chalk/70",
                disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="block leading-tight font-semibold">
                {match.homeTeam}
              </span>
              <span className="block text-[9px] text-chalk/30 leading-tight">
                vs
              </span>
              <span className="block leading-tight font-semibold">
                {match.awayTeam}
              </span>
              <span
                className={cn(
                  "block text-[8px] leading-tight mt-1",
                  status.color
                )}
              >
                {status.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
