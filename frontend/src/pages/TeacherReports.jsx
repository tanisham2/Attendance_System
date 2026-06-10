import React from "react";
import { Card, StatCard, ProgressBar, NoWallet } from "../components/UI";
import { SUBJECTS, MOCK_STUDENTS } from "../utils/constants";

const TeacherReports = ({ wallet, connect }) => {
  if (!wallet.connected) return <NoWallet connect={connect} connecting={wallet.connecting} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <h2 className="font-display font-bold text-lg text-chain-text mb-4">Attendance Report by Subject</h2>
        <div className="space-y-3">
          {SUBJECTS.map((s) => {
            const avg = 60 + Math.floor(Math.random() * 35);
            return (
              <div key={s.id} className="flex items-center gap-4 p-4 bg-chain-bg rounded-xl border border-chain-border">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs font-bold flex-shrink-0">
                  {s.code.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-sm font-medium text-chain-text">{s.name}</p>
                    <span className={`font-display font-bold text-sm ${avg >= 75 ? "text-chain-green" : avg >= 60 ? "text-amber-400" : "text-red-400"}`}>{avg}%</span>
                  </div>
                  <ProgressBar value={avg} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="font-display font-bold text-lg text-chain-text mb-4">Student Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-chain-border">
                {["Name", "Roll No", "Attendance", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-medium text-chain-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...MOCK_STUDENTS].sort((a, b) => b.attendance - a.attendance).map((s, i) => (
                <tr key={i} className="border-b border-chain-border/50 hover:bg-chain-bg transition-colors">
                  <td className="py-3 px-4 font-medium text-chain-text">{s.name}</td>
                  <td className="py-3 px-4 font-mono text-xs text-chain-muted">{s.rollNo}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20"><ProgressBar value={s.attendance} /></div>
                      <span className={`font-semibold text-sm ${s.attendance >= 75 ? "text-chain-green" : s.attendance >= 60 ? "text-amber-400" : "text-red-400"}`}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-chain-muted">
                    {s.attendance >= 75 ? "✅ Good" : s.attendance >= 60 ? "⚠️ At Risk" : "❌ Defaulter"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TeacherReports;
