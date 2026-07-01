"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { cn, shortenAddress } from "../lib/utils";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  const { publicKey, connected, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  if (connecting) {
    return (
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest text-floodlight animate-pulse",
          className
        )}
      >
        Connecting...
      </span>
    );
  }

  if (connected && publicKey) {
    return (
      <button
        onClick={() => disconnect()}
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded",
          "border border-chalk/15 text-chalk/50 hover:text-chalk/70 hover:border-chalk/30",
          "transition-colors duration-200",
          className
        )}
      >
        {shortenAddress(publicKey.toBase58())} ✕
      </button>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      className={cn(
        "font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded",
        "border border-floodlight/40 text-floodlight hover:bg-floodlight/10",
        "transition-colors duration-200",
        className
      )}
    >
      Connect Wallet
    </button>
  );
}
