import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  attendance: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 1v4M12 1v4M2 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  students: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  subjects: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  stats: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15V10M7 15V7M11 15V4M15 15V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  verify: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6L15 6.5l-3 2.9.7 4.1L9 11.4l-3.7 2.1.7-4.1L3 6.5l4.2-.9L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41M3.22 14.78l1.41-1.41M13.37 4.63l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
};

const ROLE_NAVS = {
  student: [
    { label: "Dashboard", icon: "dashboard", to: "/student" },
    { label: "Attendance", icon: "attendance", to: "/student/attendance" },
    { label: "Records", icon: "students", to: "/student/records" },
  ],
  teacher: [
    { label: "Dashboard", icon: "dashboard", to: "/teacher" },
    { label: "Attendance", icon: "attendance", to: "/teacher/attendance" },
    { label: "Students", icon: "students", to: "/teacher/students" },
    { label: "Reports", icon: "stats", to: "/teacher/reports" },
  ],
  admin: [
    { label: "Overview", icon: "dashboard", to: "/admin" },
    { label: "Subjects", icon: "subjects", to: "/admin/subjects" },
    { label: "Classes", icon: "students", to: "/admin/classes" },
    { label: "Verify", icon: "verify", to: "/admin/verify" },
    { label: "Statistics", icon: "stats", to: "/admin/stats" },
  ],
};

const ROLE_COLORS = {
  student: "text-chain-accent",
  teacher: "text-chain-green",
  admin: "text-purple-400",
};

const ROLE_BADGES = {
  student: { label: "Student", color: "bg-chain-accent/10 text-chain-accent border-chain-accent/20" },
  teacher: { label: "Teacher", color: "bg-chain-green/10 text-chain-green border-chain-green/20" },
  admin: { label: "Admin", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

const Sidebar = ({ role, wallet }) => {
  const navigate = useNavigate();
  const navItems = ROLE_NAVS[role] || [];
  const badge = ROLE_BADGES[role];
  const roleColor = ROLE_COLORS[role];

  return (
    <aside className="w-60 min-h-screen bg-chain-surface border-r border-chain-border flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6 border-b border-chain-border">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-chain-accent/10 border border-chain-accent/30 flex items-center justify-center text-chain-accent group-hover:bg-chain-accent/20 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="7" width="4" height="4" rx="1" fill="currentColor"/>
              <rect x="7" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="13" y="7" width="4" height="4" rx="1" fill="currentColor" opacity="0.5"/>
              <path d="M5 9h2M11 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-display font-bold text-sm text-chain-text leading-tight">AttendChain</div>
            <div className="text-xs text-chain-muted">Blockchain System</div>
          </div>
        </button>
      </div>

      {/* Role badge */}
      <div className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3 py-1.5 rounded-full border ${badge.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {badge.label} Portal
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to.split("/").length === 2}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-150 ${
                isActive
                  ? `${roleColor} bg-chain-card font-medium`
                  : "text-chain-muted hover:text-chain-text hover:bg-chain-card/60"
              }`
            }
          >
            <span className="opacity-80">{icons[item.icon]}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Wallet status */}
      {wallet?.connected && (
        <div className="mx-3 mb-4 p-3 bg-chain-card rounded-xl border border-chain-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-chain-green animate-pulse-slow" />
            <span className="text-xs text-chain-muted font-medium">Wallet Connected</span>
          </div>
          <p className="font-mono text-xs text-chain-accent truncate">{wallet.address}</p>
        </div>
      )}

      {/* Switch role */}
      <div className="px-3 pb-6">
        <button
          onClick={() => navigate("/")}
          className="w-full text-xs text-chain-muted hover:text-chain-text py-2 px-3 rounded-xl hover:bg-chain-card transition-colors text-left flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Switch Role
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;