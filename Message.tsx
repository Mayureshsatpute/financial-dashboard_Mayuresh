import React from "react";
import { FaInbox, FaBell, FaCommentDots, FaEnvelopeOpenText } from "react-icons/fa";

const messages = [
  {
    id: 1,
    title: "Welcome to Penta!",
    content: "Thanks for joining our financial dashboard. Explore all features at your fingertips.",
    date: "2025-06-20",
    icon: <FaInbox />,
  },
  {
    id: 2,
    title: "Monthly Summary Ready",
    content: "Your June financial summary is now available. Check your reports for insights.",
    date: "2025-06-27",
    icon: <FaEnvelopeOpenText />,
  },
  {
    id: 3,
    title: "Security Update",
    content: "We recommend enabling two-factor authentication for enhanced security.",
    date: "2025-06-25",
    icon: <FaBell />,
  },
  {
    id: 4,
    title: "Support Message",
    content: "Your ticket #2381 has been resolved. Let us know if you need further assistance.",
    date: "2025-06-22",
    icon: <FaCommentDots />,
  },
];

const MessagePage: React.FC = () => {
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
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>📨 Message Center</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              backgroundColor: "#1f2937",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "20px", color: "#3b82f6" }}>{msg.icon}</span>
              <h4 style={{ margin: 0 }}>{msg.title}</h4>
            </div>
            <p style={{ fontSize: "14px", color: "#d1d5db", marginBottom: "10px" }}>{msg.content}</p>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              {new Date(msg.date).toLocaleDateString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
