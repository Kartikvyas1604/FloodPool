"use client";

import { cn } from "../lib/utils";
import type { Side } from "../lib/types";

interface SideSelectorProps {
  selected: Side | null;
  onSelect: (side: Side) => void;
  disabled?: boolean;
}

export function SideSelector({
  selected,
  onSelect,
  disabled,
}: SideSelectorProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onSelect("OVER")}
        disabled={disabled}
        className={cn(
          "font-league text-lg tracking-widest uppercase px-6 py-3 rounded",
          "border-2 transition-all duration-200",
          selected === "OVER"
            ? "bg-corner-flag text-chalk border-corner-flag"
            : "border-corner-flag/30 text-corner-flag/60 hover:border-corner-flag/60 hover:text-corner-flag/80",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        Over {selected === "OVER" && "◀"}
      </button>
      <button
        onClick={() => onSelect("UNDER")}
        disabled={disabled}
        className={cn(
          "font-league text-lg tracking-widest uppercase px-6 py-3 rounded",
          "border-2 transition-all duration-200",
          selected === "UNDER"
            ? "bg-floodlight text-scoreboard-black border-floodlight"
            : "border-floodlight/30 text-floodlight/60 hover:border-floodlight/60 hover:text-floodlight/80",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        Under {selected === "UNDER" && "◀"}
      </button>
    </div>
  );
}
