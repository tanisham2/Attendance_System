import React, { useState } from "react";
import { Card, StatCard, Badge, TxSuccess, ErrorBox, NoWallet, Spinner, ProgressBar } from "../components/UI";
import { SUBJECTS, CLASSES, MOCK_STUDENTS, MOCK_STATS } from "../utils/constants";
import { verifyAttendanceOnChain } from "../services/blockchain";

const PENDING_RECORDS = [
  { id: 1, student: "Rohan Sharma", rollNo: "220101003", subject: "Operating Systems", date: "2026-04-10", status: "pending" },
  { id: 2, student: "Vikram Nair", rollNo: "220101005", subject: "Deep Learning", date: "2026-04-09", status: "pending" },
  { id: 3, student: "Sneha Reddy", rollNo: "220101006", subject: "Machine Learning", date: "2026-04-08", status: "pending" },
];

const AdminDashboard = ({ wallet, connect }) => {
  const [tab, setTab] = useState("overview");
  const [pending, setPending] = useState(PENDING_RECORDS);
  const [verifying, setVerifying] = useState(null);
  const [txResult, setTxResult] = useState(null);
  const [error, setError] = useState(null);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [addingSubject, setAddingSubject] = useState(false);

  const handleVerify = async (record, approve) => {
    setVerifying(record.id);
    setError(null);
    try {
      const result = await verifyAttendanceOnChain(wallet.signer, "0x123", record.id);
      setPending((p) => p.filter((r) => r.id !== record.id));
      setTxResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(null);
    }
  };

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.code) return;
    setSubjects((s) => [...s, { id: s.length + 1, name: newSubject.name, code: newSubject.code }]);
    setNewSubject({ name: "", code: "" });
    setAddingSubject(false);
  };

  if (!wallet.connected) return <NoWallet connect={connect} connecting={wallet.connecting} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total Students" value={MOCK_STATS.totalStudents} color="accent"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Subjects" value={MOCK_STATS.totalSubjects} color="purple"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>}
        />
        <StatCard label="Classes" value={MOCK_STATS.totalClasses} color="green"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 5V3a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5"/></svg>}
        />
        <StatCard label="Today Present" value={MOCK_STATS.attendanceToday} color="green"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <StatCard label="Pending Verify" value={pending.length} color="amber"
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-chain-surface border border-chain-border rounded-xl p-1 w-fit">
        {["overview", "subjects", "classes", "verify"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-chain-card text-chain-text shadow" : "text-chain-muted hover:text-chain-text"}`}
          >
            {t}
            {t === "verify" && pending.length > 0 && (
              <span className="ml-2 bg-amber-500 text-chain-bg text-xs rounded-full px-1.5 py-0.5 font-bold">{pending.length}</span>
            )}
          </button>
        ))}
      </div>

      {txResult && <TxSuccess txHash={txResult.txHash} onClose={() => setTxResult(null)} />}
      {error && <ErrorBox message={error} onClose={() => setError(null)} />}

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-display font-bold text-lg text-chain-text mb-4">Overall Attendance Rate</h2>
            <div className="flex items-center justify-center py-6">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e2d45" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#00ffa3" strokeWidth="10"
                    strokeDasharray={`${MOCK_STATS.overallAttendance * 2.51} 251`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-2xl text-chain-green">{MOCK_STATS.overallAttendance}%</span>
                  <span className="text-xs text-chain-muted">Overall</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {MOCK_STUDENTS.slice(0, 4).map((s) => (
                <div key={s.rollNo} className="flex items-center gap-3">
                  <span className="text-xs text-chain-muted w-28 truncate">{s.name}</span>
                  <div className="flex-1"><ProgressBar value={s.attendance} /></div>
                  <span className={`text-xs font-semibold w-8 text-right ${s.attendance >= 75 ? "text-chain-green" : s.attendance >= 60 ? "text-amber-400" : "text-red-400"}`}>{s.attendance}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-display font-bold text-lg text-chain-text mb-4">Quick Stats</h2>
            <div className="space-y-3">
              {[
                { label: "Students Above 75%", value: `${MOCK_STUDENTS.filter(s => s.attendance >= 75).length}/${MOCK_STUDENTS.length}`, color: "text-chain-green" },
                { label: "Students At Risk (60–75%)", value: `${MOCK_STUDENTS.filter(s => s.attendance >= 60 && s.attendance < 75).length}`, color: "text-amber-400" },
                { label: "Defaulters (< 60%)", value: `${MOCK_STUDENTS.filter(s => s.attendance < 60).length}`, color: "text-red-400" },
                { label: "Pending Verifications", value: pending.length, color: "text-amber-400" },
                { label: "Today's Attendance", value: `${MOCK_STATS.attendanceToday}/${MOCK_STATS.totalStudents}`, color: "text-chain-accent" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-chain-border/50">
                  <span className="text-sm text-chain-muted">{item.label}</span>
                  <span className={`font-display font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Subjects */}
      {tab === "subjects" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-chain-text">Manage Subjects</h2>
            <button
              onClick={() => setAddingSubject(true)}
              className="flex items-center gap-1.5 text-sm text-chain-accent bg-chain-accent/10 border border-chain-accent/30 rounded-xl px-4 py-2 hover:bg-chain-accent/20 transition-colors"
            >
              <span className="text-lg leading-none">+</span> Add Subject
            </button>
          </div>

          {addingSubject && (
            <div className="bg-chain-bg border border-chain-border rounded-xl p-4 mb-4 flex gap-3 items-end flex-wrap">
              <div className="flex-1 min-w-36">
                <label className="block text-xs text-chain-muted mb-1">Subject Name</label>
                <input value={newSubject.name} onChange={(e) => setNewSubject(s => ({ ...s, name: e.target.value }))}
                  className="w-full bg-chain-surface border border-chain-border text-chain-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-chain-accent/60"
                  placeholder="e.g. Cloud Computing" />
              </div>
              <div className="w-28">
                <label className="block text-xs text-chain-muted mb-1">Code</label>
                <input value={newSubject.code} onChange={(e) => setNewSubject(s => ({ ...s, code: e.target.value }))}
                  className="w-full bg-chain-surface border border-chain-border text-chain-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-chain-accent/60"
                  placeholder="CS601" />
              </div>
              <button onClick={handleAddSubject} className="bg-chain-accent text-chain-bg px-4 py-2 rounded-xl text-sm font-semibold hover:bg-chain-accent/90">Add</button>
              <button onClick={() => setAddingSubject(false)} className="text-chain-muted hover:text-chain-text px-4 py-2 rounded-xl text-sm border border-chain-border">Cancel</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjects.map((s) => (
              <div key={s.id} className="flex items-center gap-3 bg-chain-bg border border-chain-border rounded-xl p-3.5">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs font-bold flex-shrink-0">
                  {s.code.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-chain-text truncate">{s.name}</p>
                  <p className="text-xs text-chain-muted">{s.code}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Classes */}
      {tab === "classes" && (
        <Card>
          <h2 className="font-display font-bold text-lg text-chain-text mb-4">Manage Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CLASSES.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-chain-bg border border-chain-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-chain-green/10 border border-chain-green/20 flex items-center justify-center text-chain-green font-display font-bold text-sm">
                  {c.id}
                </div>
                <div>
                  <p className="text-sm font-medium text-chain-text">{c.name}</p>
                  <p className="text-xs text-chain-muted">{MOCK_STUDENTS.length} students enrolled</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Verify */}
      {tab === "verify" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-chain-text">Pending Verifications</h2>
            <Badge variant="warning">{pending.length} pending</Badge>
          </div>

          {pending.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-chain-green/10 border border-chain-green/20 flex items-center justify-center text-chain-green mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-chain-muted text-sm">All records verified!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((r) => (
                <div key={r.id} className="flex items-center gap-4 bg-chain-bg border border-chain-border rounded-xl p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-chain-text">{r.student}</p>
                      <span className="font-mono text-xs text-chain-muted">{r.rollNo}</span>
                    </div>
                    <p className="text-xs text-chain-muted">{r.subject} · {r.date}</p>
                  </div>
                  <Badge variant="warning">pending</Badge>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(r, true)}
                      disabled={verifying === r.id}
                      className="flex items-center gap-1.5 bg-chain-green/10 text-chain-green border border-chain-green/30 hover:bg-chain-green/20 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      {verifying === r.id ? <Spinner size="sm" /> : "Approve"}
                    </button>
                    <button
                      onClick={() => setPending(p => p.filter(x => x.id !== r.id))}
                      className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;