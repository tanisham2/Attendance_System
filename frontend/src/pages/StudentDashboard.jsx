import React, { useState } from "react";
import { Card, StatCard, Badge, Select, TxSuccess, ErrorBox, NoWallet, Spinner, AttendanceDot, ProgressBar } from "../components/UI";
import { SUBJECTS, CLASSES, MOCK_ATTENDANCE_RECORDS } from "../utils/constants";
import { markAttendanceOnChain } from "../services/blockchain";

const today = new Date().toISOString().split("T")[0];

const StudentDashboard = ({ wallet, connect }) => {
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [txResult, setTxResult] = useState(null);
  const [error, setError] = useState(null);
  const [markedToday, setMarkedToday] = useState(false);

  const selectedSubject = SUBJECTS.find((s) => String(s.id) === subjectId);
  const selectedClass = CLASSES.find((c) => String(c.id) === classId);

  const handleMarkAttendance = async () => {
    if (!subjectId || !classId) return setError("Please select both subject and class.");
    setLoading(true);
    setError(null);
    setTxResult(null);
    try {
      const result = await markAttendanceOnChain(wallet.signer, Number(classId), Number(subjectId));
      setTxResult(result);
      setMarkedToday(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const presentCount = MOCK_ATTENDANCE_RECORDS.filter((r) => r.status === "present").length;
  const percentage = Math.round((presentCount / MOCK_ATTENDANCE_RECORDS.length) * 100);

  if (!wallet.connected) return <NoWallet connect={connect} connecting={wallet.connecting} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Overall Attendance" value={`${percentage}%`} color="green"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <StatCard label="Classes Attended" value={presentCount} sub="This month" color="accent"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 9h16M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Total Subjects" value={SUBJECTS.length} color="purple"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Pending Verify" value="3" color="amber"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Mark Attendance */}
        <Card className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="font-display font-bold text-lg text-chain-text">Mark Attendance</h2>
            <p className="text-xs text-chain-muted mt-0.5">{today}</p>
          </div>

          {markedToday && (
            <Badge variant="success">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Already marked today
            </Badge>
          )}

          <Select label="Subject" value={subjectId} onChange={setSubjectId} options={SUBJECTS} placeholder="Select subject…" />
          <Select label="Class" value={classId} onChange={setClassId} options={CLASSES} placeholder="Select class…" />

          {txResult && <TxSuccess txHash={txResult.txHash} onClose={() => setTxResult(null)} />}
          {error && <ErrorBox message={error} onClose={() => setError(null)} />}

          <button
            onClick={handleMarkAttendance}
            disabled={loading || !subjectId || !classId}
            className="w-full flex items-center justify-center gap-2 bg-chain-accent text-chain-bg font-display font-semibold py-3 rounded-xl hover:bg-chain-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <><Spinner size="sm" /> Submitting to Chain…</> : "Mark Attendance"}
          </button>

          {selectedSubject && selectedClass && (
            <div className="bg-chain-bg rounded-xl p-3 border border-chain-border text-xs text-chain-muted space-y-1">
              <div className="flex justify-between"><span>Subject</span><span className="text-chain-text">{selectedSubject.code}</span></div>
              <div className="flex justify-between"><span>Class</span><span className="text-chain-text">{selectedClass.name}</span></div>
              <div className="flex justify-between"><span>Date</span><span className="text-chain-text">{today}</span></div>
            </div>
          )}
        </Card>

        {/* Attendance Records */}
        <Card className="lg:col-span-3">
          <h2 className="font-display font-bold text-lg text-chain-text mb-4">Recent Records</h2>
          <div className="space-y-2">
            {MOCK_ATTENDANCE_RECORDS.map((r, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5 px-3 rounded-xl bg-chain-bg hover:bg-chain-surface transition-colors group">
                <AttendanceDot status={r.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-chain-text font-medium truncate">{r.subject}</p>
                  <p className="text-xs text-chain-muted">{r.date} · {r.class}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.status === "present" ? "success" : "danger"}>{r.status}</Badge>
                  {r.verified ? (
                    <Badge variant="info">verified</Badge>
                  ) : (
                    <Badge variant="warning">pending</Badge>
                  )}
                </div>
                {r.txHash && (
                  <span className="font-mono text-xs text-chain-muted hidden group-hover:block truncate max-w-24">
                    {r.txHash}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Per-subject attendance */}
      <Card>
        <h2 className="font-display font-bold text-lg text-chain-text mb-4">Attendance by Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((s) => {
            const pct = 60 + Math.floor(Math.random() * 35);
            return (
              <div key={s.id} className="bg-chain-bg rounded-xl p-4 border border-chain-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-chain-text">{s.name}</p>
                    <p className="text-xs text-chain-muted">{s.code}</p>
                  </div>
                  <span className={`font-display font-bold text-sm ${pct >= 75 ? "text-chain-green" : pct >= 60 ? "text-amber-400" : "text-red-400"}`}>{pct}%</span>
                </div>
                <ProgressBar value={pct} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;