import React from "react";

export default function Tutors({ tutors, onOpen }) {
  return (
    <div className="tutors">
      <h2>Tutors</h2>
      <div className="tutor-list">
        {tutors.map(t => (
          <div className="tutor-card" key={t.id} onClick={() => onOpen(t)}>
            <div className="avatar">{t.name.split(" ").map(n => n[0]).join("").slice(0,2)}</div>
            <div className="tutor-info">
              <h3>{t.name}</h3>
              <p className="muted">{t.subject} • Rating: {t.rating}</p>
            </div>
            <div className="cta">View</div>
          </div>
        ))}
      </div>
    </div>
  );
}
