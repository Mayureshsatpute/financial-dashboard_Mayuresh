import React, { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaMobileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

// Define Transaction type with description
type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  description?: string;
};

const Wallet: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const res = await fetch("/transactions.json");
        const data: Transaction[] = await res.json();

        const paidTxns = data.filter((txn) => txn.status === "Paid");
        setTransactions(paidTxns.slice(0, 5));

        const bal = paidTxns.reduce((sum, txn) => {
          return txn.category === "Revenue"
            ? sum + txn.amount
            : sum - txn.amount;
        }, 0);
        setBalance(bal);
      } catch (err) {
        console.error("Failed to fetch wallet data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleTransaction = (category: string) => {
    if (!amount || !receiver) return;

    const newTxn: Transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount,
      category,
      status: "Paid",
      user_id: receiver,
      description: description || `${category} Transaction`,
    };

    const updatedTxns = [newTxn, ...transactions].slice(0, 5);
    setTransactions(updatedTxns);

    const newBalance =
      category === "Revenue" ? balance + amount : balance - amount;
    setBalance(newBalance);

    setAmount(0);
    setReceiver("");
    setDescription("");
    setShowModal(null);
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        ⏳ Loading Wallet...
      </div>
    );
  }

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
      {/* Balance Card */}
      <div
        style={{
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Available Balance</p>
        <h2 style={{ fontSize: "32px", margin: "10px 0" }}>₹{balance.toLocaleString()}</h2>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>Last updated just now</p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "30px" }}>
        <ActionButton icon={<FaArrowUp />} label="Send Money" onClick={() => setShowModal("Expense")} />
        <ActionButton icon={<FaArrowDown />} label="Receive" onClick={() => setShowModal("Revenue")} />
        <ActionButton icon={<FaMobileAlt />} label="Recharge" onClick={() => setShowModal("Expense")} />
        <ActionButton icon={<FaMoneyBillWave />} label="Pay Bill" onClick={() => setShowModal("Expense")} />
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ background: "#000000c0", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#1f2937", padding: "30px", borderRadius: "8px", width: "300px" }}>
            <h3 style={{ marginBottom: "20px" }}>New Transaction</h3>
            <input
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter Amount"
              type="number"
              style={inputStyle}
            />
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Receiver ID"
              style={inputStyle}
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              style={inputStyle}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => handleTransaction(showModal)} style={submitBtnStyle}>
                Send
              </button>
              <button onClick={() => setShowModal(null)} style={{ ...submitBtnStyle, backgroundColor: "#6b7280" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>🧾 Recent Transactions</h3>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {transactions.map((txn) => (
            <li
              key={txn.id}
              style={{
                backgroundColor: "#1f2937",
                marginBottom: "12px",
                padding: "15px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ margin: 0 }}>{txn.description || "Transaction"}</p>
                <p style={{ margin: "4px 0", fontSize: "12px", color: "#9ca3af" }}>
                  {new Date(txn.date).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div
                style={{
                  color: txn.category === "Revenue" ? "#10b981" : "#ef4444",
                  fontWeight: "bold",
                }}
              >
                {txn.category === "Revenue" ? "+" : "-"}₹{txn.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: "#2563eb",
      border: "none",
      borderRadius: "6px",
      padding: "12px 20px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: "16px" }}>{icon}</span>
    {label}
  </button>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #374151",
  backgroundColor: "#111827",
  color: "#fff",
};

const submitBtnStyle: React.CSSProperties = {
  padding: "10px 15px",
  backgroundColor: "#2563eb",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

export default Wallet;
