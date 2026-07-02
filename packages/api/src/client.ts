import type { TxLineFeed } from "./types";

const TXLINE_API_BASE = process.env.NEXT_PUBLIC_TXLINE_API ?? "https://api.devnet.txline.io";

export const client = {
  async getFeed(fixtureId: number): Promise<TxLineFeed> {
    const res = await fetch(`${TXLINE_API_BASE}/fixtures/${fixtureId}/feed`);
    if (!res.ok) throw new Error(`TxLINE feed error: ${res.status}`);
    return res.json();
  },

  async getFixtures(): Promise<{ fixtures: Array<{ id: number; homeTeam: string; awayTeam: string; kickoff: number }> }> {
    const res = await fetch(`${TXLINE_API_BASE}/fixtures`);
    if (!res.ok) throw new Error(`TxLINE fixtures error: ${res.status}`);
    return res.json();
  },
};
