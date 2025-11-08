import React from "react";

export default function Classes({ joinedClasses, tutors, openChat, activeClass, setActiveClass }) {
  return (
    <div className="classes">
      <h2>Classes</h2>
      {joinedClasses.length === 0 && <p className="muted">You haven't joined any classes yet.</p>}
      <div className="class-list">
        {joinedClasses.map(c => {
          const tutor = tutors.find(t => t.id === c.tutorId) || {};
          return (
            <div key={c.id} className={`class-card ${activeClass === c.id ? "active" : ""}`}>
              <div className="class-info">
                <h3>{c.name}</h3>
                <p className="muted">Tutor: {tutor.name || "TBA"}</p>
              </div>
              <div className="class-actions">
                <button className="btn" onClick={() => openChat(c.id)}>Open Chat</button>
                <button className="btn ghost" onClick={() => setActiveClass(c.id === activeClass ? null : c.id)}>{activeClass === c.id ? "Hide" : "Preview"}</button>
              </div>
              {activeClass === c.id && (
                <div className="chat-preview">
                  {c.messages.length === 0 && <p className="muted">No messages yet.</p>}
                  {c.messages.slice(-4).map(m => <div key={m.id} className="msg"><strong>{m.sender}:</strong> {m.text}</div>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
