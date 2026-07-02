"use client";

import { useScoreboard } from "./lib/useScoreboard";
import { cn } from "./lib/utils";
import { Clock } from "./components/Clock";
import { TeamBadge } from "./components/TeamBadge";
import { StakePanel } from "./components/StakePanel";
import { MatchSelector } from "./components/MatchSelector";
import { FeedTicker } from "./components/FeedTicker";
import { ResolutionFlip } from "./components/ResolutionFlip";
import { WalletButton } from "./components/WalletButton";

export default function Page() {
  const {
    matchList,
    match,
    matchStatus,
    clock,
    corners,
    feed,
    result,
    overStake,
    underStake,
    myStakeSide,
    connected,
    handleSelectMatch,
    handleStake,
  } = useScoreboard();

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-pitch-dark relative select-none">
      <div className="halfline-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full">
        {/* ── Header ── */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-2 shrink-0">
          <h1 className="font-league text-xl tracking-widest text-white uppercase">
            HalfLine
          </h1>
          <WalletButton />
        </header>

        {/* ── Fixture info ── */}
        <div className="shrink-0 text-center pb-1">
          {match ? (
            <>
              <span className="inline-block font-mono text-[10px] tracking-widest text-chalk/80 uppercase leading-tight">
                {match.homeTeam}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-chalk/60 uppercase mx-1.5">
                vs
              </span>
              <span className="inline-block font-mono text-[10px] tracking-widest text-chalk/80 uppercase leading-tight">
                {match.awayTeam}
              </span>
              <div className="font-mono text-[8px] text-chalk/60 tracking-widest mt-0.5">
                Fixture #{match.fixtureId} &middot; {match.statKey}
              </div>
            </>
          ) : (
            <>
              <span className="font-mono text-[10px] tracking-widest text-chalk/80 uppercase">
                Select a Match
              </span>
              <div className="font-mono text-[8px] text-chalk/60 uppercase tracking-widest mt-0.5">
                Choose from live fixtures below
              </div>
            </>
          )}
        </div>

        {/* ── Main scoreboard (flex-1 fills remaining space) ── */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center px-2 min-h-0",
            matchStatus === "live" && "live-glow"
          )}
        >
          {match ? (
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-3xl">
              <TeamBadge
                label={overStake ? "OVER" : "OVER — Open"}
                side="OVER"
                stake={overStake}
                position="left"
                address={overStake?.wallet}
                highlight={myStakeSide === "OVER"}
              />

              {matchStatus !== "halftime" && matchStatus !== "settled" ? (
                <Clock
                  seconds={clock}
                  corners={corners}
                  running={matchStatus === "live"}
                />
              ) : result ? (
                <ResolutionFlip
                  show={true}
                  corners={result.corners}
                  winner={result.winner}
                  payout={result.payout}
                />
              ) : (
                <div className="scoreboard-panel px-4 py-3 flex flex-col items-center gap-1.5 settling-panel">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse">
                    Settling...
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-chalk/40">
                    TxLINE CPI Verify
                  </span>
                </div>
              )}

              <TeamBadge
                label={underStake ? "UNDER" : "UNDER — Open"}
                side="UNDER"
                stake={underStake}
                position="right"
                address={underStake?.wallet}
                highlight={myStakeSide === "UNDER"}
              />
            </div>
          ) : (
            <div className="font-mono text-[10px] text-chalk/60 uppercase tracking-widest text-center">
              Select a match to begin
            </div>
          )}
        </div>

        {/* ── Bottom section (selector + stake + status) ── */}
        <div className="shrink-0 px-4 space-y-1.5 pb-1.5">
          <MatchSelector
            matches={matchList}
            selected={match}
            onSelect={handleSelectMatch}
            disabled={matchStatus === "live"}
          />

          {connected && match && matchStatus === "live" && (
            <StakePanel onStake={handleStake} />
          )}

          {!connected && match && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/60 text-center">
              CONNECT WALLET TO PLACE STAKE
            </div>
          )}

          {connected && match && matchStatus === "upcoming" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/60 text-center">
              KICKOFF PENDING &mdash; SELECT A LIVE MATCH
            </div>
          )}

          {matchStatus === "halftime" && !result && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-floodlight text-center animate-pulse">
              SETTLING ON-CHAIN VIA TxLINE CPI...
            </div>
          )}

          {matchStatus === "settled" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/60 text-center">
              MATCH SETTLED &mdash; NO FURTHER STAKES
            </div>
          )}
        </div>

        {/* ── Ticker ── */}
        <div className="shrink-0 px-4 pb-2">
          <FeedTicker feed={feed} />
        </div>
      </div>
    </div>
  );
}
