import React from "react";

export default function TutorProfile({ tutor, onClose, onJoin }) {
  return (
    <div className="modal tutor-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <div className="tutor-header">
          <div className="big-avatar">{tutor.name.split(" ").map(n=>n[0]).join("")}</div>
          <div>
            <h2>{tutor.name}</h2>
            <p className="muted">{tutor.subject}</p>
            <p>{tutor.career}</p>
            <p>Rating: {tutor.rating}</p>
          </div>
        </div>
        <div className="tutor-actions">
          <button className="btn" onClick={onJoin}>Join Class</button>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
