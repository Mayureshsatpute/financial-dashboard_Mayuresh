import React from "react";

const Topbar: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#1f1f2e",
      color: "#fff",
      borderBottom: "1px solid #333"
    }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          width: "300px"
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span>🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          style={{ borderRadius: "50%", width: "35px", height: "35px" }}
        />
      </div>
    </div>
  );
};

export default Topbar;
