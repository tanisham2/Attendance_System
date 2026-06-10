import React from "react";
import { formatAddress } from "../services/blockchain";

const WalletConnect = ({ wallet, connect, disconnect, shortAddress }) => {
  if (wallet.connected) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-chain-card border border-chain-border rounded-xl px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-chain-green animate-pulse-slow" />
          <span className="font-mono text-sm text-chain-accent">{shortAddress}</span>
          {wallet.network && (
            <span className="text-xs text-chain-muted bg-chain-bg px-2 py-0.5 rounded-full">
              {wallet.network.name === "unknown" ? `Chain ${wallet.network.chainId}` : wallet.network.name}
            </span>
          )}
        </div>
        <button
          onClick={disconnect}
          className="text-xs text-chain-muted hover:text-chain-red transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={wallet.connecting}
      className="flex items-center gap-2 bg-chain-accent/10 hover:bg-chain-accent/20 text-chain-accent border border-chain-accent/30 hover:border-chain-accent/60 rounded-xl px-5 py-2.5 font-display font-semibold text-sm transition-all duration-200 disabled:opacity-50"
    >
      {wallet.connecting ? (
        <>
          <span className="w-4 h-4 border-2 border-chain-accent/30 border-t-chain-accent rounded-full animate-spin" />
          Connecting…
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="11.5" cy="10.5" r="1" fill="currentColor" />
          </svg>
          Connect Wallet
        </>
      )}
    </button>
  );
};

export default WalletConnect;