// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import AnalyticsPage from "./pages/AnalyticsPage";
import PersonalPage from "./pages/PersonalPage";
import Message from "./pages/Message";
import Setting from "./pages/Setting";
import "./App.css";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  return (
    <Router>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="app">
          <Sidebar />
          <div className="main">
            <Topbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/analytics" element={<AnalyticsPage token={token} />} />
                <Route path="/personal" element={<PersonalPage token={token} />} />
                <Route path="/message" element={<Message />} />
                <Route path="/setting" element={<Setting />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
