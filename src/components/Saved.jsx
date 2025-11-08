import React from "react";

export default function Saved({ posts, onUnsave }) {
  return (
    <div className="saved">
      <h2>Saved</h2>
      {posts.length === 0 && <p className="muted">No saved posts yet.</p>}
      <div className="saved-list">
        {posts.map(p => (
          <div className="saved-card" key={p.id}>
            <div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
            <div>
              <button className="btn ghost" onClick={() => onUnsave(p.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
