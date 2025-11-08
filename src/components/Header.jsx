import React from "react";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";

export default function Header({ user, theme, setTheme, onLogout }) {
  return (
    <header className="app-header">
      <div className="brand">Study Group</div>
      <div className="header-right">
        <div className="welcome">Welcome, <strong>{user.name}</strong></div>
        <button className="icon-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="Toggle theme">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <button className="icon-btn" onClick={onLogout} title="Logout"><FaSignOutAlt /></button>
      </div>
    </header>
  );
}
