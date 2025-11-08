import React from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Feed({ posts, onLike, onSave, savedIds }) {
  return (
    <div className="feed">
      <h2>Feed</h2>
      <div className="posts">
        {posts.map(p => (
          <article className="post-card" key={p.id}>
            <div className="post-body">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
            <div className="post-actions">
              <button onClick={() => onLike(p.id)} className="icon-btn">
                {p._liked ? <FaHeart /> : <FaRegHeart />} <span className="small">{p.likes}</span>
              </button>
              <button onClick={() => onSave(p.id)} className="icon-btn">
                {savedIds.includes(p.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
