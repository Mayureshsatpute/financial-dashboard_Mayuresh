import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaWallet,
  FaChartBar,
  FaUser,
  FaEnvelope,
  FaCog,
  FaExchangeAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
    { name: "Wallet", path: "/wallet", icon: <FaWallet /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Personal", path: "/personal", icon: <FaUser /> },
    { name: "Message", path: "/message", icon: <FaEnvelope /> },
    { name: "Setting", path: "/setting", icon: <FaCog /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Penta</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
              {item.icon} <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
