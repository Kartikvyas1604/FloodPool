export interface TxLineFeed {
  fixtureId: number;
  clock: number;
  corners: number;
  synced: boolean;
  statKey: string;
  timestamp: number;
}

export interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: number;
  status: "upcoming" | "live" | "halftime" | "finished";
}

export interface OracleState {
  feed: TxLineFeed;
  verified: boolean;
  signature?: string;
}
