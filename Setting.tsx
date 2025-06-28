import React, { useState } from "react";

const Settings: React.FC = () => {
  const [name, setName] = useState("Mayuresh Satpute");
  const [email, setEmail] = useState("mayuresh@example.com");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Dark");

  return (
    <div
      style={{
        padding: "20px",
        background: "#111827",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>⚙️ Settings</h2>

      {/* Personal Info */}
      <div
        style={{
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>👤 Personal Info</h3>

        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Preferences */}
      <div
        style={{
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>🎛️ Preferences</h3>

        <div style={{ marginBottom: "15px" }}>
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={inputStyle}
          >
            <option>English</option>
            <option>Marathi</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={inputStyle}
          >
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button style={buttonPrimary}>💾 Save</button>
        <button style={buttonSecondary}>❌ Cancel</button>
      </div>
    </div>
  );
};

// Style definitions
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  backgroundColor: "#374151",
  border: "1px solid #4b5563",
  borderRadius: "6px",
  color: "#fff",
};

const buttonPrimary: React.CSSProperties = {
  backgroundColor: "#2563eb",
  border: "none",
  borderRadius: "6px",
  padding: "10px 20px",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const buttonSecondary: React.CSSProperties = {
  backgroundColor: "#374151",
  border: "none",
  borderRadius: "6px",
  padding: "10px 20px",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

export default Settings;
