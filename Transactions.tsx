// src/pages/Transactions.tsx
import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import CsvExportModal from "../components/CsvExportModal";
import localData from "./transactions.json"; // Use the same data source

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTransactions(localData);
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
      <h2 style={{ marginBottom: "20px" }}>Transactions</h2>

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

export default Transactions;
