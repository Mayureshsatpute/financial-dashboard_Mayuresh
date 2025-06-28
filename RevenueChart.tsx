// src/components/RevenueChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  date: string;
  amount: number;
}

interface Props {
  transactions: Transaction[];
}

const RevenueChart: React.FC<Props> = ({ transactions }) => {
  const dailyData: Record<string, number> = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date).toISOString().split("T")[0]; // yyyy-mm-dd
    dailyData[date] = (dailyData[date] || 0) + tx.amount;
  });

  const chartData = Object.keys(dailyData)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => ({
      date,
      amount: dailyData[date],
    }));

  return (
    <div style={{ height: 300, marginBottom: "30px" }}>
      <h3>Revenue Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
