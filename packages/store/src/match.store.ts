import { create } from "zustand";

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

export interface FeedState {
  synced: boolean;
  fixtureId: number | null;
  statKey: string;
}

export interface MatchResult {
  corners: number;
  winner: Side | null;
  payout: number;
}

interface MatchStore {
  match: Match | null;
  matchStatus: MatchStatus;
  clock: number;
  corners: number;
  stakes: StakePosition[];
  feed: FeedState;
  result: MatchResult | null;
  setMatch: (match: Match | null) => void;
  setMatchStatus: (status: MatchStatus) => void;
  setClock: (clock: number) => void;
  setCorners: (corners: number) => void;
  addStake: (stake: StakePosition) => void;
  setFeed: (feed: FeedState) => void;
  setResult: (result: MatchResult) => void;
  reset: () => void;
}

const initialState = {
  match: null as Match | null,
  matchStatus: "upcoming" as MatchStatus,
  clock: 0,
  corners: 0,
  stakes: [] as StakePosition[],
  feed: { synced: false, fixtureId: null, statKey: "—" },
  result: null as MatchResult | null,
};

export const useMatchStore = create<MatchStore>((set) => ({
  ...initialState,

  setMatch: (match) => set({ match }),
  setMatchStatus: (matchStatus) => set({ matchStatus }),
  setClock: (clock) => set({ clock }),
  setCorners: (corners) => set({ corners }),

  addStake: (stake) =>
    set((state) => {
      const filtered = state.stakes.filter((s) => s.wallet !== stake.wallet);
      return { stakes: [...filtered, stake] };
    }),

  setFeed: (feed) => set({ feed }),
  setResult: (result) => set({ result }),

  reset: () => set(initialState),
}));
