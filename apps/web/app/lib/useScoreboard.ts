import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { Match, Side, StakePosition, MatchStatus, FeedState } from "./types";

function buildMockMatches(): Match[] {
  const now = Date.now();
  return [
    {
      id: "m1",
      homeTeam: "Brazil",
      awayTeam: "Argentina",
      fixtureId: 4471,
      statKey: "1007+1008",
      kickoff: now - 120000,
      status: "live",
    },
    {
      id: "m2",
      homeTeam: "Germany",
      awayTeam: "France",
      fixtureId: 4472,
      statKey: "1007+1008",
      kickoff: now + 1800000,
      status: "upcoming",
    },
    {
      id: "m3",
      homeTeam: "England",
      awayTeam: "Spain",
      fixtureId: 4473,
      statKey: "1007+1008",
      kickoff: now - 3600000,
      status: "settled",
    },
  ];
}

function getDefaultFeed(match: Match | null): FeedState {
  return {
    synced: true,
    fixtureId: match?.fixtureId ?? null,
    statKey: match?.statKey ?? "—",
  };
}

export interface ScoreboardResult {
  corners: number;
  winner: Side | null;
  payout: number;
}

export function useScoreboard() {
  const { publicKey, connected } = useWallet();

  const [matchList] = useState<Match[]>(buildMockMatches);
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
  const [result, setResult] = useState<ScoreboardResult | null>(null);

  const cornersRef = useRef(corners);
  cornersRef.current = corners;

  const overStake = useMemo(
    () => stakes.find((s) => s.side === "OVER") ?? null,
    [stakes]
  );

  const underStake = useMemo(
    () => stakes.find((s) => s.side === "UNDER") ?? null,
    [stakes]
  );

  const myStakeSide = useMemo(
    () =>
      publicKey
        ? (stakes.find((s) => s.wallet === publicKey.toBase58())?.side ?? null)
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

  return {
    matchList,
    match,
    matchStatus,
    clock,
    corners,
    stakes,
    feed,
    result,
    opponentStake,
    myOverStake,
    connected,
    publicKey,
    handleSelectMatch,
    handleStake,
  } as const;
}
