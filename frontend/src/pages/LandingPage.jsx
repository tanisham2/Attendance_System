import React from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../services/blockchain";

const LandingPage = () => {
  const navigate = useNavigate();

  // 🟢 STUDENT
  const handleStudent = async () => {
    try {
      await connectWallet();
      navigate("/student");
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔵 TEACHER
  const handleTeacher = async () => {
    try {
      await connectWallet();
      navigate("/teacher");
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔴 ADMIN
  const handleAdmin = async () => {
    try {
      await connectWallet();
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>Attendance System</h1>
      <p style={subtitle}>
        A decentralized attendance system powered by Ethereum Smart Contracts.
      </p>

      <div style={cardContainer}>
        {/* STUDENT */}
        <div style={card}>
          <h2>Student</h2>
          <p>Mark attendance and view records</p>
          <button style={button} onClick={handleStudent}>
            Enter
          </button>
        </div>

        {/* TEACHER */}
        <div style={card}>
          <h2>Teacher</h2>
          <p>Monitor attendance and reports</p>
          <button style={button} onClick={handleTeacher}>
            Enter
          </button>
        </div>

        {/* ADMIN */}
        <div style={card}>
          <h2>Admin</h2>
          <p>Manage system and verify records</p>
          <button style={button} onClick={handleAdmin}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

// 🎨 STYLES (to match your UI)
const container = {
  padding: "60px",
  background: "#020617",
  minHeight: "100vh",
  color: "white",
};

const title = {
  fontSize: "36px",
  fontWeight: "bold",
};

const subtitle = {
  color: "#94a3b8",
  marginTop: "10px",
};

const cardContainer = {
  display: "flex",
  gap: "30px",
  marginTop: "40px",
};

const card = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  width: "280px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const button = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "#22d3ee",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default LandingPage;