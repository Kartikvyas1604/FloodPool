"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { cn, shortenAddress } from "../lib/utils";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  const { publicKey, connected, disconnect, connecting, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

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
    const addr = publicKey.toBase58();
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(addr);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="font-mono text-[10px] uppercase tracking-widest px-2 py-1.5 rounded border border-chalk/10 text-chalk/60 hover:text-chalk/80 hover:border-chalk/20 transition-colors"
          title="Copy address"
        >
          {copied ? "COPIED" : shortenAddress(addr)}
        </button>
        <button
          onClick={() => disconnect()}
          className="font-mono text-[10px] uppercase tracking-widest px-2 py-1.5 rounded text-corner-flag/70 hover:text-corner-flag border border-corner-flag/10 hover:border-corner-flag/30 transition-colors"
          title="Disconnect"
        >
          ✕
        </button>
      </div>
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
