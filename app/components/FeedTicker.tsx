"use client";

import { cn } from "../lib/utils";
import type { FeedState } from "../lib/types";

interface FeedTickerProps {
  feed: FeedState;
  className?: string;
}

export function FeedTicker({ feed, className }: FeedTickerProps) {
  const statusText = feed.synced
    ? "SYNCED"
    : "FEED UNSYNCED — RETRYING";

  const statusColor = feed.synced
    ? "text-chalk/40"
    : "text-corner-flag";

  return (
    <div
      className={cn(
        "scoreboard-panel px-4 py-2 overflow-hidden",
        className
      )}
    >
      <div className="ticker-text flex items-center gap-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
        <span className={statusColor}>{statusText}</span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          FIXTURE #{feed.fixtureId ?? "—"}
        </span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          statKey {feed.statKey}
        </span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          TxLINE CPI · Devnet
        </span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/30">
          {new Date().toISOString().slice(11, 19)} UTC
        </span>
        <span className="text-chalk/20">·</span>
        <span className={statusColor}>{statusText}</span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          FIXTURE #{feed.fixtureId ?? "—"}
        </span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          statKey {feed.statKey}
        </span>
        <span className="text-chalk/20">·</span>
        <span className="text-chalk/40">
          TxLINE CPI · Devnet
        </span>
      </div>
    </div>
  );
}
