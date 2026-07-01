"use client";

import dynamic from "next/dynamic";

const ScoreboardContent = dynamic(
  () => import("./scoreboard-content").then((m) => m.ScoreboardContent),
  { ssr: false }
);

export default function Home() {
  return <ScoreboardContent />;
}
