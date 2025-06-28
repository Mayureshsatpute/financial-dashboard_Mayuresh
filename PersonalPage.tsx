import React from "react";
import {
  FaChartPie,
  FaUserCircle,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaMoneyBillWave,
  FaCoins,
  FaShieldAlt,
  FaGift,
  FaNewspaper,
  FaMobile,
} from "react-icons/fa";

const features = [
  {
    title: "Dashboard Overview",
    icon: <FaChartPie />,
    items: ["Balance & Investments", "Recent Transactions", "Spending Analytics", "Quick Actions"],
  },
  {
    title: "Account Management",
    icon: <FaUserCircle />,
    items: ["Multi-currency", "Linked cards", "Virtual cards", "Security settings"],
  },
  {
    title: "Transactions",
    icon: <FaFileInvoiceDollar />,
    items: ["Filter history", "Export CSV", "Recurring", "Search"],
  },
  {
    title: "Budgeting",
    icon: <FaBalanceScale />,
    items: ["Planner", "Categorization", "Savings", "Reports"],
  },
  {
    title: "Payments",
    icon: <FaMoneyBillWave />,
    items: ["Send/Receive", "Pay Bills", "Split Bills", "Scheduled"],
  },
  {
    title: "Investments",
    icon: <FaCoins />,
    items: ["Crypto", "Stocks", "FDs", "Portfolio"],
  },
  {
    title: "Security",
    icon: <FaShieldAlt />,
    items: ["2FA", "Notifications", "Freeze Card"],
  },
  {
    title: "Rewards",
    icon: <FaGift />,
    items: ["Loyalty", "Cashback", "Referrals"],
  },
  {
    title: "Support",
    icon: <FaUserCircle />,
    items: ["Live Chat", "Help Center", "Email"],
  },
  {
    title: "Mobile App",
    icon: <FaMobile />,
    items: ["iOS/Android", "QR Login", "Sync"],
  },
  {
    title: "News",
    icon: <FaNewspaper />,
    items: ["Blogs", "Market News", "Tips"],
  },
  {
    title: "Legal",
    icon: <FaBalanceScale />,
    items: ["Privacy", "T&C", "KYC"],
  },
];

const PersonalPage: React.FC = () => {
  const user = {
    name: "Mayuresh Satpute",
    email: "mayuresh@example.com",
    role: "Financial Analyst",
    joined: "2024-06-01",
    profileImg: "https://ui-avatars.com/api/?name=Mayuresh+S&background=0D8ABC&color=fff",
  };

  const transactions = [
    {
      id: 1,
      amount: 5000,
      category: "Revenue",
      status: "Paid",
      date: "2025-06-25",
    },
    {
      id: 2,
      amount: 1200,
      category: "Expense",
      status: "Paid",
      date: "2025-06-24",
    },
  ];

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
      {/* Profile Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
        <img
          src={user.profileImg}
          alt="Profile"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: "24px" }}>Welcome, {user.name}</h2>
          <p style={{ margin: "5px 0", color: "#9ca3af" }}>{user.email}</p>
          <p style={{ margin: 0, color: "#9ca3af" }}>
            <strong>Role:</strong> {user.role} | <strong>Joined:</strong>{" "}
            {new Date(user.joined).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div
        style={{
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ marginBottom: "15px", fontSize: "20px" }}>Your Transactions</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((txn) => (
            <li
              key={txn.id}
              style={{
                backgroundColor: "#374151",
                padding: "15px",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              <p style={{ marginBottom: 5 }}>
                <strong>Amount:</strong> ₹{txn.amount}
              </p>
              <p style={{ marginBottom: 5 }}>
                <strong>Category:</strong> {txn.category}
              </p>
              <p style={{ marginBottom: 5 }}>
                <strong>Status:</strong> {txn.status}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Date:</strong> {new Date(txn.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Features Grid */}
      <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>📋 Financial Features</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              backgroundColor: "#1f2937",
              padding: "20px",
              borderRadius: "8px",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ fontSize: "20px", color: "#3b82f6" }}>{feature.icon}</div>
              <h4 style={{ margin: 0 }}>{feature.title}</h4>
            </div>
            <ul style={{ paddingLeft: "20px", color: "#d1d5db", fontSize: "14px" }}>
              {feature.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalPage;
