"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import type { Side } from "../lib/types";
import { SideSelector } from "./SideSelector";

interface StakePanelProps {
  onStake: (side: Side, amount: number) => void;
  disabled?: boolean;
}

export function StakePanel({ onStake, disabled }: StakePanelProps) {
  const [side, setSide] = useState<Side | null>(null);
  const [amount, setAmount] = useState("");
  const [focused, setFocused] = useState(false);

  const numericAmount = parseFloat(amount);
  const valid = side && numericAmount > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onStake(side, numericAmount);
    setAmount("");
    setSide(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "scoreboard-panel p-4 sm:p-5 flex flex-col items-center gap-4",
        "animate-roll-in stagger-4"
      )}
    >
      <span className="font-league text-sm tracking-widest text-chalk/50 uppercase">
        Place Stake
      </span>

      <SideSelector
        selected={side}
        onSelect={setSide}
        disabled={disabled}
      />

      <div className="relative w-full max-w-[220px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-dseg7 text-lg text-chalk/30">
          $
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={cn(
            "w-full bg-scoreboard-black border rounded px-7 py-2.5 font-dseg7 text-lg text-chalk",
            "placeholder:text-chalk/15 outline-none transition-colors duration-200",
            focused
              ? "border-floodlight/50"
              : "border-chalk/10 hover:border-chalk/20",
            disabled && "opacity-40 cursor-not-allowed"
          )}
        />
      </div>

      <button
        type="submit"
        disabled={!valid || disabled}
        className={cn(
          "font-league text-base tracking-widest uppercase px-8 py-2.5 rounded",
          "transition-all duration-200",
          valid && !disabled
            ? "bg-corner-flag text-chalk hover:bg-corner-flag/90 active:scale-95"
            : "bg-chalk/5 text-chalk/20 cursor-not-allowed"
        )}
      >
        Confirm Stake
      </button>
    </form>
  );
}
