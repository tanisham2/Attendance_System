import React from "react";

export const Card = ({ children, className = "", glow }) => (
  <div className={`bg-chain-card border border-chain-border rounded-2xl p-6 ${glow ? "shadow-glow" : "shadow-card"} ${className}`}>
    {children}
  </div>
);

export const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-chain-card text-chain-muted border-chain-border",
    success: "bg-chain-green/10 text-chain-green border-chain-green/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    info: "bg-chain-accent/10 text-chain-accent border-chain-accent/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const StatCard = ({ label, value, icon, sub, color = "accent" }) => {
  const colorMap = {
    accent: "text-chain-accent bg-chain-accent/10 border-chain-accent/20",
    green: "text-chain-green bg-chain-green/10 border-chain-green/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };
  return (
    <Card className="animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-chain-muted text-sm mb-1">{label}</p>
          <p className="font-display font-bold text-3xl text-chain-text">{value}</p>
          {sub && <p className="text-xs text-chain-muted mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const Spinner = ({ size = "md" }) => {
  const sizes = { sm: "w-4 h-4 border-2", md: "w-6 h-6 border-2", lg: "w-8 h-8 border-3" };
  return (
    <span className={`${sizes[size]} border-chain-accent/30 border-t-chain-accent rounded-full animate-spin inline-block`} />
  );
};

export const TxSuccess = ({ txHash, onClose }) => (
  <div className="flex items-start gap-3 bg-chain-green/10 border border-chain-green/30 rounded-xl p-4 animate-fade-in">
    <div className="w-6 h-6 rounded-full bg-chain-green/20 text-chain-green flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-chain-green font-medium text-sm">Transaction Successful</p>
      {txHash && (
        <p className="font-mono text-xs text-chain-muted mt-0.5 truncate">
          Tx: {txHash.slice(0, 20)}…{txHash.slice(-8)}
        </p>
      )}
    </div>
    {onClose && (
      <button onClick={onClose} className="text-chain-muted hover:text-chain-text text-lg leading-none">&times;</button>
    )}
  </div>
);

export const ErrorBox = ({ message, onClose }) => (
  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in">
    <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">!</div>
    <div className="flex-1">
      <p className="text-red-400 font-medium text-sm">Error</p>
      <p className="text-chain-muted text-xs mt-0.5">{message}</p>
    </div>
    {onClose && <button onClick={onClose} className="text-chain-muted hover:text-chain-text text-lg leading-none">&times;</button>}
  </div>
);

export const Select = ({ label, value, onChange, options, placeholder = "Select…" }) => (
  <div>
    {label && <label className="block text-xs font-medium text-chain-muted mb-1.5">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-chain-bg border border-chain-border text-chain-text rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-chain-accent/60 transition-colors appearance-none cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.name}</option>
      ))}
    </select>
  </div>
);

export const AttendanceDot = ({ status }) => (
  <span className={`w-2.5 h-2.5 rounded-full inline-block ${status === "present" ? "bg-chain-green" : "bg-red-400"}`} />
);

export const ProgressBar = ({ value, color = "accent" }) => {
  const colorMap = { accent: "bg-chain-accent", green: "bg-chain-green", amber: "bg-amber-400", red: "bg-red-400" };
  const barColor = value >= 75 ? "green" : value >= 60 ? "amber" : "red";
  return (
    <div className="w-full bg-chain-bg rounded-full h-1.5 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${colorMap[barColor]}`} style={{ width: `${value}%` }} />
    </div>
  );
};

export const NoWallet = ({ connect, connecting }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-chain-card border border-chain-border flex items-center justify-center mb-4 text-chain-accent">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="8" width="24" height="17" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 13h24" stroke="currentColor" strokeWidth="1.5"/><circle cx="19" cy="18.5" r="1.5" fill="currentColor"/></svg>
    </div>
    <h3 className="font-display font-bold text-lg text-chain-text mb-2">Connect Your Wallet</h3>
    <p className="text-chain-muted text-sm mb-6 max-w-xs">Please connect your MetaMask wallet to access this dashboard.</p>
    <button
      onClick={connect}
      disabled={connecting}
      className="flex items-center gap-2 bg-chain-accent text-chain-bg font-display font-semibold px-6 py-3 rounded-xl hover:bg-chain-accent/90 transition-colors disabled:opacity-50"
    >
      {connecting ? <><span className="w-4 h-4 border-2 border-chain-bg/30 border-t-chain-bg rounded-full animate-spin"/>Connecting…</> : "Connect MetaMask"}
    </button>
  </div>
);