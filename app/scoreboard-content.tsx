"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Clock } from "./components/Clock";
import { TeamBadge } from "./components/TeamBadge";
import { StakePanel } from "./components/StakePanel";
import { MatchSelector } from "./components/MatchSelector";
import { FeedTicker } from "./components/FeedTicker";
import { ResolutionFlip } from "./components/ResolutionFlip";
import { WalletButton } from "./components/WalletButton";
import { cn } from "./lib/utils";
import type { Match, Side, StakePosition, MatchStatus, FeedState } from "./lib/types";

const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    fixtureId: 4471,
    statKey: "1007+1008",
    kickoff: Date.now() - 120000,
    status: "live",
  },
  {
    id: "m2",
    homeTeam: "Germany",
    awayTeam: "France",
    fixtureId: 4472,
    statKey: "1007+1008",
    kickoff: Date.now() + 1800000,
    status: "upcoming",
  },
  {
    id: "m3",
    homeTeam: "England",
    awayTeam: "Spain",
    fixtureId: 4473,
    statKey: "1007+1008",
    kickoff: Date.now() - 3600000,
    status: "settled",
  },
];

function getDefaultFeed(match: Match | null): FeedState {
  return {
    synced: true,
    fixtureId: match?.fixtureId ?? null,
    statKey: match?.statKey ?? "—",
  };
}

export function ScoreboardContent() {
  const { publicKey, connected } = useWallet();

  const [match, setMatch] = useState<Match | null>(null);
  const [matchStatus, setMatchStatus] = useState<MatchStatus>("upcoming");
  const [clock, setClock] = useState(0);
  const [corners, setCorners] = useState(0);
  const [stakes, setStakes] = useState<StakePosition[]>([]);
  const [feed, setFeed] = useState<FeedState>({
    synced: false,
    fixtureId: null,
    statKey: "—",
  });
  const [result, setResult] = useState<{
    corners: number;
    winner: Side | null;
    payout: number;
  } | null>(null);

  const cornersRef = useRef(corners);
  cornersRef.current = corners;

  const opponentStake = useMemo(
    () =>
      stakes.length === 2 && publicKey
        ? (stakes.find((s) => s.wallet !== publicKey.toBase58()) ?? null)
        : null,
    [stakes, publicKey]
  );

  const myOverStake = useMemo(
    () =>
      publicKey
        ? (stakes.find(
            (s) =>
              s.wallet === publicKey.toBase58() && s.side === "OVER"
          ) ?? null)
        : null,
    [stakes, publicKey]
  );

  const handleSelectMatch = useCallback((m: Match) => {
    setMatch(m);
    setMatchStatus(m.status);
    setFeed({ synced: true, fixtureId: m.fixtureId, statKey: m.statKey });
    setCorners(0);
    setClock(0);
    setResult(null);
    setStakes([]);
  }, []);

  const handleStake = useCallback(
    (side: Side, amount: number) => {
      if (!publicKey) return;
      const addr = publicKey.toBase58();
      setStakes((prev) => {
        const filtered = prev.filter((s) => s.wallet !== addr);
        return [
          ...filtered,
          { wallet: addr, side, amount, confirmed: true },
        ];
      });
    },
    [publicKey]
  );

  // Simulate clock
  useEffect(() => {
    if (matchStatus !== "live") return;
    const interval = setInterval(() => {
      setClock((c) => {
        if (c >= 2700) {
          clearInterval(interval);
          setMatchStatus("halftime");
          return 2700;
        }
        return c + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [matchStatus]);

  // Trigger result when halftime hits
  useEffect(() => {
    if (matchStatus === "halftime" && !result) {
      setMatch((prev) =>
        prev ? { ...prev, status: "halftime" } : prev
      );
      const timer = setTimeout(() => {
        const finalCorners = cornersRef.current;
        setResult({
          corners: finalCorners,
          winner: finalCorners > 5 ? "OVER" : "UNDER",
          payout: 240,
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [matchStatus, result]);

  // Simulate corner updates
  useEffect(() => {
    if (matchStatus !== "live") return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setCorners((c) => c + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [matchStatus]);

  // Feed ticker
  useEffect(() => {
    if (!match) {
      setFeed({ synced: false, fixtureId: null, statKey: "—" });
      return;
    }
    setFeed(getDefaultFeed(match));
    const interval = setInterval(() => {
      setFeed((f) => ({
        ...f,
        synced: f.synced ? Math.random() > 0.05 : Math.random() > 0.4,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [match]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="halfline-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="flex items-center justify-between px-4 sm:px-6 py-3">
          <h1 className="font-league text-xl sm:text-2xl tracking-widest text-chalk uppercase">
            HalfLine
          </h1>
          <WalletButton />
        </header>

        <main
          className={cn(
            "flex-1 flex flex-col items-center justify-center px-4 gap-6 py-6 max-w-4xl mx-auto w-full",
            matchStatus === "live" && "live-glow"
          )}
        >
          {match && (
            <div className="animate-roll-in stagger-1 text-center">
              <span className="font-league text-2xl sm:text-3xl md:text-4xl tracking-widest text-chalk uppercase block leading-tight">
                {match.homeTeam}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-chalk/20 uppercase block my-1">
                vs
              </span>
              <span className="font-league text-2xl sm:text-3xl md:text-4xl tracking-widest text-chalk uppercase block leading-tight">
                {match.awayTeam}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-chalk/20 uppercase block mt-2">
                Fixture #{match.fixtureId} · {match.statKey}
              </span>
            </div>
          )}

          {!match && (
            <div className="flex flex-col items-center gap-2 animate-roll-in stagger-1">
              <span className="font-league text-2xl tracking-widest text-chalk/50 uppercase">
                Select a Match
              </span>
              <span className="font-mono text-[10px] text-chalk/20 uppercase tracking-widest">
                Choose from live World Cup fixtures below
              </span>
            </div>
          )}

          {match && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full mt-2">
              <TeamBadge
                label={publicKey ? "Your Wallet" : "Unconnected"}
                side="OVER"
                stake={myOverStake}
                position="left"
                address={publicKey?.toBase58()}
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
                label={
                  opponentStake
                    ? "Opponent"
                    : publicKey
                      ? "Awaiting Opponent"
                      : "Unconnected"
                }
                side="UNDER"
                stake={opponentStake}
                position="right"
              />
            </div>
          )}

          <MatchSelector
            matches={MOCK_MATCHES}
            selected={match}
            onSelect={handleSelectMatch}
            disabled={matchStatus === "live"}
          />

          {connected && match && matchStatus === "live" && (
            <StakePanel onStake={handleStake} />
          )}

          {!connected && match && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/30 text-center animate-roll-in stagger-4">
              CONNECT WALLET TO PLACE STAKE
            </div>
          )}

          {connected && match && matchStatus === "upcoming" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/30 text-center animate-roll-in stagger-4">
              KICKOFF PENDING — SELECT A LIVE MATCH
            </div>
          )}

          {matchStatus === "halftime" && !result && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-floodlight text-center animate-pulse">
              SETTLING ON-CHAIN VIA TxLINE CPI...
            </div>
          )}

          {matchStatus === "settled" && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-chalk/30 text-center">
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
