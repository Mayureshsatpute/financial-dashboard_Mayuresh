import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Login with JWT
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Fetch transactions from backend OR fallback to local file
export const fetchTransactions = async (token?: string) => {
  try {
    if (token) {
      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      const response = await fetch("/transactions.json");
      if (!response.ok) {
        throw new Error("Local JSON fetch failed");
      }
      return await response.json();
    }
  } catch (err) {
    console.error("Error fetching transactions:", err);
    throw err;
  }
};
