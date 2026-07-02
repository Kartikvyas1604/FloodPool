"use client";

import { cn } from "../lib/utils";
import type { FeedState } from "../lib/types";

interface FeedTickerProps {
  feed: FeedState;
  className?: string;
}

export function FeedTicker({ feed, className }: FeedTickerProps) {
  const isSynced = feed.synced;

  return (
    <div
      className={cn(
        "scoreboard-panel px-4 py-2 overflow-hidden",
        !isSynced && "border-corner-flag/30",
        className
      )}
    >
      <div className="ticker-text flex items-center gap-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
        {/* Sync status */}
        {isSynced ? (
          <span className="text-green-500/60">● SYNCED</span>
        ) : (
          <span className="text-corner-flag animate-pulse">● FEED LOST — RETRYING</span>
        )}

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

        {/* Duplicate for scroll */}
        <span className="text-chalk/20">·</span>
        {isSynced ? (
          <span className="text-green-500/60">● SYNCED</span>
        ) : (
          <span className="text-corner-flag animate-pulse">● FEED LOST — RETRYING</span>
        )}
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
