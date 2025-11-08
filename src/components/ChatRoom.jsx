import React, { useEffect, useRef, useState } from "react";

export default function ChatRoom({ classData, tutors, sendMessage, onClose }) {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [classData]);

  if (!classData) return null;
  const tutor = tutors.find(t => t.id === classData.tutorId) || { name: "AI Tutor" };

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  return (
    <div className="modal chat-modal">
      <div className="modal-content">
        <div className="chat-header">
          <h3>{classData.name}</h3>
          <div>
            <button className="btn ghost" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="chat-body">
          {classData.messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.sender === "You" ? "you" : "other"}`}>
              <div className="sender">{m.sender}</div>
              <div className="text">{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form className="chat-input" onSubmit={submit}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder={`Ask ${tutor.name}...`} />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
