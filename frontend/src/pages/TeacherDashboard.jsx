import React, { useState } from "react";
import { Card, StatCard, Badge, Select, NoWallet, ProgressBar, AttendanceDot } from "../components/UI";
import { SUBJECTS, CLASSES, MOCK_STUDENTS, MOCK_ATTENDANCE_RECORDS } from "../utils/constants";

const TeacherDashboard = ({ wallet, connect }) => {
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [view, setView] = useState("students"); // students | records

  const filteredRecords = MOCK_ATTENDANCE_RECORDS.filter((r) => {
    if (dateFilter && r.date !== dateFilter) return false;
    if (subjectId) {
      const sub = SUBJECTS.find((s) => String(s.id) === subjectId);
      if (sub && r.subject !== sub.name) return false;
    }
    return true;
  });

  if (!wallet.connected) return <NoWallet connect={connect} connecting={wallet.connecting} />;

  const totalPresent = MOCK_STUDENTS.reduce((a, s) => a + (s.attendance >= 75 ? 1 : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={MOCK_STUDENTS.length} color="accent"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Above 75%" value={totalPresent} sub="Students in good standing" color="green"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <StatCard label="Subjects Teaching" value={SUBJECTS.length} color="purple"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Classes" value={CLASSES.length} color="amber"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 9h16M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-40">
            <Select label="Subject" value={subjectId} onChange={setSubjectId} options={SUBJECTS} placeholder="All Subjects" />
          </div>
          <div className="flex-1 min-w-40">
            <Select label="Class" value={classId} onChange={setClassId} options={CLASSES} placeholder="All Classes" />
          </div>
          <div className="flex-1 min-w-40">
            <label className="block text-xs font-medium text-chain-muted mb-1.5">Filter by Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-chain-bg border border-chain-border text-chain-text rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-chain-accent/60 transition-colors"
            />
          </div>
          <button
            onClick={() => { setSubjectId(""); setClassId(""); setDateFilter(""); }}
            className="text-xs text-chain-muted hover:text-chain-text px-4 py-2.5 rounded-xl border border-chain-border hover:border-chain-accent/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </Card>

      {/* Tab toggle */}
      <div className="flex gap-1 bg-chain-surface border border-chain-border rounded-xl p-1 w-fit">
        {["students", "records"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${view === v ? "bg-chain-card text-chain-text shadow" : "text-chain-muted hover:text-chain-text"}`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "students" && (
        <Card>
          <h2 className="font-display font-bold text-lg text-chain-text mb-4">Student Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-chain-border">
                  {["Student", "Roll No", "Wallet", "Attendance %", "Status"].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-medium text-chain-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map((s, i) => (
                  <tr key={i} className="border-b border-chain-border/50 hover:bg-chain-bg transition-colors">
                    <td className="py-3 px-4 font-medium text-chain-text">{s.name}</td>
                    <td className="py-3 px-4 font-mono text-xs text-chain-muted">{s.rollNo}</td>
                    <td className="py-3 px-4 font-mono text-xs text-chain-accent">{s.address}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-24"><ProgressBar value={s.attendance} /></div>
                        <span className={`font-display font-semibold text-sm ${s.attendance >= 75 ? "text-chain-green" : s.attendance >= 60 ? "text-amber-400" : "text-red-400"}`}>{s.attendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={s.attendance >= 75 ? "success" : s.attendance >= 60 ? "warning" : "danger"}>
                        {s.attendance >= 75 ? "Good" : s.attendance >= 60 ? "At Risk" : "Defaulter"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {view === "records" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-chain-text">Attendance Records</h2>
            <Badge variant="info">{filteredRecords.length} records</Badge>
          </div>
          <div className="space-y-2">
            {filteredRecords.length === 0 ? (
              <p className="text-chain-muted text-sm text-center py-8">No records match the filters.</p>
            ) : filteredRecords.map((r, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-4 rounded-xl bg-chain-bg hover:bg-chain-surface transition-colors">
                <AttendanceDot status={r.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-chain-text">{r.subject}</p>
                  <p className="text-xs text-chain-muted">{r.date} · {r.class}</p>
                </div>
                <Badge variant={r.status === "present" ? "success" : "danger"}>{r.status}</Badge>
                <Badge variant={r.verified ? "info" : "warning"}>{r.verified ? "verified" : "pending"}</Badge>
                {r.txHash && <span className="font-mono text-xs text-chain-muted hidden md:block">{r.txHash}</span>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TeacherDashboard;