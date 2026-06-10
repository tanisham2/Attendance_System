import React from "react";
import { Card, Badge, AttendanceDot, NoWallet } from "../components/UI";
import { MOCK_ATTENDANCE_RECORDS } from "../utils/constants";

const StudentRecords = ({ wallet, connect }) => {
  if (!wallet.connected) return <NoWallet connect={connect} connecting={wallet.connecting} />;

  const present = MOCK_ATTENDANCE_RECORDS.filter((r) => r.status === "present").length;
  const total = MOCK_ATTENDANCE_RECORDS.length;
  const pct = Math.round((present / total) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <h2 className="font-display font-bold text-lg text-chain-text mb-1">Full Attendance History</h2>
        <p className="text-xs text-chain-muted mb-4">Wallet: <span className="font-mono text-chain-accent">{wallet.address}</span></p>
        <div className="flex items-center gap-6 mb-6 p-4 bg-chain-bg rounded-xl border border-chain-border">
          <div className="text-center">
            <p className="font-display font-black text-3xl text-chain-green">{pct}%</p>
            <p className="text-xs text-chain-muted">Overall</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-xl text-chain-text">{present}</p>
            <p className="text-xs text-chain-muted">Present</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-xl text-chain-text">{total - present}</p>
            <p className="text-xs text-chain-muted">Absent</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-xl text-chain-text">{total}</p>
            <p className="text-xs text-chain-muted">Total</p>
          </div>
        </div>

        <div className="space-y-2">
          {MOCK_ATTENDANCE_RECORDS.map((r, i) => (
            <div key={i} className="flex items-center gap-4 py-3 px-4 rounded-xl bg-chain-bg hover:bg-chain-surface transition-colors">
              <AttendanceDot status={r.status} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-chain-text">{r.subject}</p>
                <p className="text-xs text-chain-muted">{r.date} · {r.class}</p>
              </div>
              <Badge variant={r.status === "present" ? "success" : "danger"}>{r.status}</Badge>
              <Badge variant={r.verified ? "info" : "warning"}>{r.verified ? "verified" : "pending"}</Badge>
              {r.txHash ? (
                <span className="font-mono text-xs text-chain-muted hidden md:block">{r.txHash}</span>
              ) : (
                <span className="font-mono text-xs text-chain-muted/40 hidden md:block">No tx</span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentRecords;
