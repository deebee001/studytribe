import React, { useState } from "react";

export default function UserForm({ onSave }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [courses, setCourses] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const user = { name: name.trim(), age: Number(age), courses: courses.split(",").map(c => c.trim()).filter(Boolean) };
    if (!user.name) { alert("Please enter a name."); return; }
    onSave(user);
  };

  return (
    <div className="userform-wrap">
      <form className="userform" onSubmit={submit}>
        <h2>Set your profile</h2>
        <label>Name<input value={name} onChange={e => setName(e.target.value)} /></label>
        <label>Age<input type="number" value={age} onChange={e => setAge(e.target.value)} /></label>
        <label>Preferred courses (comma separated)<input value={courses} onChange={e => setCourses(e.target.value)} placeholder="Math, Physics, CS" /></label>
        <div className="actions">
          <button className="btn" type="submit">Start</button>
        </div>
      </form>
    </div>
  );
}
