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

export function ScoreboardContent() {
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
    publicKey,
    handleSelectMatch,
    handleStake,
  } = useScoreboard();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="halfline-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="flex items-center justify-between px-4 sm:px-6 py-3">
          <h1 className="font-league text-xl sm:text-2xl tracking-widest text-white uppercase">
            HalfLine
          </h1>
          <WalletButton />
        </header>

        <main
          className={cn(
            "flex-1 flex flex-col items-center justify-center px-4 gap-6 py-6 max-w-4xl mx-auto w-full",
            matchStatus === "live" && "live-glow"
          )}
          role="main"
          aria-label="Scoreboard"
        >
          {/* Fixture heading */}
          {match && (
            <div className="animate-roll-in stagger-1 text-center">
              <span
                className="font-league text-2xl sm:text-3xl md:text-4xl tracking-widest text-white uppercase block leading-tight"
                role="heading"
                aria-level={2}
              >
                {match.homeTeam}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-chalk/40 uppercase block my-1">
                vs
              </span>
              <span
                className="font-league text-2xl sm:text-3xl md:text-4xl tracking-widest text-white uppercase block leading-tight"
                role="heading"
                aria-level={2}
              >
                {match.awayTeam}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-chalk/40 uppercase block mt-2">
                Fixture #{match.fixtureId} · {match.statKey}
              </span>
            </div>
          )}

          {!match && (
            <div className="flex flex-col items-center gap-2 animate-roll-in stagger-1">
              <span
                className="font-league text-2xl tracking-widest text-white/80 uppercase"
                role="heading"
                aria-level={2}
              >
                Select a Match
              </span>
              <span className="font-mono text-[10px] text-chalk/40 uppercase tracking-widest">
                Choose from live World Cup fixtures below
              </span>
            </div>
          )}

          {/* Scoreboard centerpiece */}
          {match && (
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full mt-2"
              role="region"
              aria-label="Match scoreboard"
            >
              <TeamBadge
                label={overStake ? "OVER" : "OVER — Open"}
                side="OVER"
                stake={overStake}
                position="left"
                address={overStake?.wallet}
                highlight={myStakeSide === "OVER"}
              />

              {matchStatus !== "halftime" && matchStatus !== "settled" ? (
                <div className="animate-roll-in stagger-2 flex-shrink-0">
                  <Clock
                    seconds={clock}
                    corners={corners}
                    running={matchStatus === "live"}
                  />
                </div>
              ) : result ? (
                <div className="animate-roll-in stagger-2 flex-shrink-0">
                  <ResolutionFlip
                    show={true}
                    corners={result.corners}
                    winner={result.winner}
                    payout={result.payout}
                  />
                </div>
              ) : (
                <div className="animate-roll-in stagger-2 flex-shrink-0">
                  <div className="scoreboard-panel settling-panel px-6 py-5 flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse">
                      Settling...
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-chalk/20">
                      TxLINE CPI Verify
                    </span>
                  </div>
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
          )}

          {/* Match selector */}
          <MatchSelector
            matches={matchList}
            selected={match}
            onSelect={handleSelectMatch}
            disabled={matchStatus === "live"}
          />

          {/* Stake panel */}
          {connected && match && matchStatus === "live" && (
            <StakePanel onStake={handleStake} />
          )}

          {!connected && match && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/50 text-center animate-roll-in stagger-4">
              CONNECT WALLET TO PLACE STAKE
            </div>
          )}

          {connected && match && matchStatus === "upcoming" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/50 text-center animate-roll-in stagger-4">
              KICKOFF PENDING — SELECT A LIVE MATCH
            </div>
          )}

          {matchStatus === "halftime" && !result && (
            <div
              className="font-mono text-[10px] uppercase tracking-widest text-floodlight text-center animate-pulse"
              role="status"
              aria-live="polite"
            >
              SETTLING ON-CHAIN VIA TxLINE CPI...
            </div>
          )}

          {matchStatus === "settled" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/50 text-center">
              MATCH SETTLED — NO FURTHER STAKES
            </div>
          )}
        </main>

        <footer className="sticky bottom-0 px-4 pb-4">
          <FeedTicker feed={feed} />
        </footer>
      </div>
    </div>
  );
}
