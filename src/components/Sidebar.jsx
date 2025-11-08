import React from "react";
import { FaHome, FaChalkboardTeacher, FaLayerGroup, FaBookmark } from "react-icons/fa";

export default function Sidebar({ active, onChange }) {
  const items = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "tutors", label: "Tutors", icon: <FaChalkboardTeacher /> },
    { key: "classes", label: "Classes", icon: <FaLayerGroup /> },
    { key: "saved", label: "Saved", icon: <FaBookmark /> }
  ];
  return (
    <>
      <aside className="sidebar desktop">
        <div className="sidebar-top">Study Group</div>
        <nav>
          {items.map(it => (
            <button key={it.key} className={`nav-btn ${active === it.key ? "active" : ""}`} onClick={() => onChange(it.key)}>
              <span className="icon">{it.icon}</span>
              <span className="text">{it.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <nav className="bottombar mobile">
        {items.map(it => (
          <button key={it.key} className={`nav-btn ${active === it.key ? "active" : ""}`} onClick={() => onChange(it.key)}>
            <span className="icon">{it.icon}</span>
            {/* On mobile we hide text to match your requirement */}
          </button>
        ))}
      </nav>
    </>
  );
}
