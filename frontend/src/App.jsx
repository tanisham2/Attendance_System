import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentRecords from "./pages/StudentRecords";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherReports from "./pages/TeacherReports";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/DashboardLayout";

import { connectWallet } from "./services/blockchain";

// Wrappers
const StudentRoute = ({ page, title, wallet, connect }) => (
  <DashboardLayout role="student" title={title} wallet={wallet} connect={connect}>
    {page}
  </DashboardLayout>
);

const TeacherRoute = ({ page, title, wallet, connect }) => (
  <DashboardLayout role="teacher" title={title} wallet={wallet} connect={connect}>
    {page}
  </DashboardLayout>
);

const AdminRoute = ({ page, title, wallet, connect }) => (
  <DashboardLayout role="admin" title={title} wallet={wallet} connect={connect}>
    {page}
  </DashboardLayout>
);

export default function App() {

  const [wallet, setWallet] = useState({
    connected: false,
    connecting: false,
    signer: null,
    address: "",
  });

  const handleConnect = async () => {
    try {
      setWallet((w) => ({ ...w, connecting: true }));
      const res = await connectWallet();

      setWallet({
        connected: true,
        connecting: false,
        signer: res.signer,
        address: res.address,
      });
    } catch (err) {
      console.error(err);
      setWallet((w) => ({ ...w, connecting: false }));
    }
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage connect={handleConnect} />} />

        {/* Student */}
        <Route
          path="/student"
          element={
            <StudentRoute
              title="Student Dashboard"
              page={<StudentDashboard />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

        <Route
          path="/student/attendance"
          element={
            <StudentRoute
              title="Mark Attendance"
              page={<StudentDashboard />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

        <Route
          path="/student/records"
          element={
            <StudentRoute
              title="Attendance Records"
              page={<StudentRecords />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

        {/* Teacher */}
        <Route
          path="/teacher"
          element={
            <TeacherRoute
              title="Teacher Dashboard"
              page={<TeacherDashboard />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

        <Route
          path="/teacher/reports"
          element={
            <TeacherRoute
              title="Reports"
              page={<TeacherReports />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute
              title="Admin Overview"
              page={<AdminDashboard />}
              wallet={wallet}
              connect={handleConnect}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}



