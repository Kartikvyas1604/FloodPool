export type Side = "OVER" | "UNDER";

export type MatchStatus = "upcoming" | "live" | "halftime" | "settled";

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  fixtureId: number;
  statKey: string;
  kickoff: number;
  status: MatchStatus;
}

export interface StakePosition {
  wallet: string;
  side: Side;
  amount: number;
  confirmed: boolean;
}

export interface MatchState {
  match: Match | null;
  clock: number;
  corners: number;
  stakes: StakePosition[];
  status: MatchStatus;
  result: {
    corners: number;
    winner: Side | null;
    payout: number;
  } | null;
}

export interface FeedState {
  synced: boolean;
  fixtureId: number | null;
  statKey: string;
}
