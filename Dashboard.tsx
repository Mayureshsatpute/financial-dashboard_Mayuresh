// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import TransactionTable from "../components/TransactionTable";
import RevenueChart from "../components/RevenueChart";
import CsvExportModal from "../components/CsvExportModal";
import localData from "./transactions.json"; // ✅ Load local data

interface DashboardProps {
  token?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Load JSON data directly
    setTransactions(localData);
    setLoading(false);
  }, []);

  const filteredTransactions = transactions.filter((tx: any) => {
    const matchesSearch =
      tx.category?.toLowerCase().includes(search.toLowerCase()) ||
      tx.status?.toLowerCase().includes(search.toLowerCase()) ||
      tx.user_id?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? tx.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const handleExport = (selectedFields: string[]) => {
    const csvHeader = selectedFields.join(",");
    const csvRows = filteredTransactions.map((tx) =>
      selectedFields.map((field) => tx[field]).join(",")
    );
    const csvString = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "filtered_transactions.csv";
    a.click();

    setIsModalOpen(false);
  };

  if (loading)
    return <p style={{ color: "#fff", padding: "20px" }}>Loading Dashboard...</p>;

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
      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
          justifyContent: "space-between",
        }}
      >
        {["Balance", "Revenue", "Expenses", "Savings"].map((title, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1f2937",
              flex: "1 1 220px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "6px" }}>
              {title}
            </p>
            <h2 style={{ margin: 0 }}>₹{(Math.random() * 50000 + 10000).toFixed(2)}</h2>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            flex: "1 1 200px",
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "6px",
            color: "#fff",
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            flex: "1 1 150px",
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "6px",
            color: "#fff",
          }}
        >
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            flexShrink: 0,
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Chart - ✅ Only Revenue */}
      <div style={{ marginBottom: "30px" }}>
        <RevenueChart transactions={filteredTransactions.filter(tx => tx.category === "Revenue")} />
      </div>

      {/* Table */}
      <TransactionTable transactions={filteredTransactions} />

      {/* Modal */}
      <CsvExportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default Dashboard;
