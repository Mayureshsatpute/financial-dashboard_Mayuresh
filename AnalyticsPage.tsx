import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  note?: string;
};

const AnalyticsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/transactions.json");
        const data: Transaction[] = await res.json();

        const paidTxns = data.filter((txn) => txn.status === "Paid");

        const totalIncome = paidTxns
          .filter((t) => t.category === "Revenue")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = paidTxns
          .filter((t) => t.category === "Expense")
          .reduce((sum, t) => sum + t.amount, 0);

        setIncome(totalIncome);
        setExpenses(totalExpense);

        // Aggregate monthly data
        const monthlyMap: Record<string, { income: number; expense: number }> = {};

        paidTxns.forEach((txn) => {
          const month = new Date(txn.date).toLocaleString("default", {
            month: "short",
          });
          if (!monthlyMap[month]) {
            monthlyMap[month] = { income: 0, expense: 0 };
          }
          if (txn.category === "Revenue") {
            monthlyMap[month].income += txn.amount;
          } else {
            monthlyMap[month].expense += txn.amount;
          }
        });

        const chartArray = Object.entries(monthlyMap).map(([month, values]) => ({
          month,
          income: values.income,
          expense: values.expense,
        }));

        setChartData(chartArray);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 sm:ml-64 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Spending Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-600">Total Income</p>
          <h3 className="text-xl font-bold text-green-600">₹ {income.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-600">Total Expenses</p>
          <h3 className="text-xl font-bold text-red-500">₹ {expenses.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 shadow rounded-xl">
          <p className="text-gray-600">Savings</p>
          <h3 className="text-xl font-bold text-blue-600">
            ₹ {(income - expenses).toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-xl">
        <h4 className="text-lg font-medium mb-4 text-gray-700">
          Monthly Income vs Expense
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#00e676" />
            <Line type="monotone" dataKey="expense" stroke="#ff1744" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
