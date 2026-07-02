import type { Metadata } from "next";
import { League_Gothic, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const leagueGothic = League_Gothic({
  variable: "--font-league",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HalfLine — Live Match Escrow",
  description:
    "Peer-to-peer USDC escrow on Solana — stake on first-half corner counts, settled automatically at halftime via TxLINE CPI.",
  openGraph: {
    title: "HalfLine",
    description: "Stake USDC on live match corners. Settled at halftime.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${leagueGothic.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
