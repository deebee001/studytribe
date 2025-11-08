import React, { useEffect, useState } from "react";
import Intro from "./components/Intro";
import UserForm from "./components/UserForm";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Tutors from "./components/Tutors";
import TutorProfile from "./components/TutorProfile";
import Classes from "./components/Classes";
import ChatRoom from "./components/ChatRoom";
import Saved from "./components/Saved";

const INITIAL_POSTS = [
  { id: "p1", title: "Pythagoras Tip", body: "a² + b² = c² — remember to square catheti!", likes: 0 },
  { id: "p2", title: "Space Fact", body: "Jupiter's Great Red Spot is a storm larger than Earth.", likes: 0 },
  { id: "p3", title: "Motivation", body: "Do one hard thing today — small wins compound.", likes: 0 },
  { id: "p4", title: "Algebra", body: "To solve 2x+3=11 → x=4", likes: 0 },
  { id: "p5", title: "Trigonometry", body: "sin(30°) = 1/2, cos(60°) = 1/2", likes: 0 },
  { id: "p6", title: "Physics", body: "F = ma — Newton's second law.", likes: 0 },
  { id: "p7", title: "Chemistry", body: "Water: H₂O — two hydrogens, one oxygen.", likes: 0 },
  { id: "p8", title: "Space Fact 2", body: "Light from the Sun takes ~8 minutes to reach Earth.", likes: 0 },
  { id: "p9", title: "Math Trick", body: "Multiply by 11: 23 × 11 = 253", likes: 0 },
  { id: "p10", title: "Motivation 2", body: "Break tasks into 25-min sprints.", likes: 0 },
  { id: "p11", title: "Calculus", body: "Derivative of x² is 2x.", likes: 0 },
  { id: "p12", title: "Binary", body: "1010 (binary) = 10 (decimal).", likes: 0 },
  { id: "p13", title: "Study Tip", body: "Active recall > passive reading.", likes: 0 },
  { id: "p14", title: "Space Tech", body: "The ISS orbits roughly every 90 minutes.", likes: 0 },
  { id: "p15", title: "Math Puzzle", body: "What is the next number? 2, 3, 5, 7, 11... (primes!)", likes: 0 },
];

const INITIAL_TUTORS = [
  { id: "t1", name: "Mr. Ade", subject: "Mathematics", career: "10 years teaching secondary school", rating: 4.8, img: null },
  { id: "t2", name: "Ms. Ngozi", subject: "Physics", career: "8 years, university lab instructor", rating: 4.7, img: null },
  { id: "t3", name: "Dr. K", subject: "Computer Science", career: "Researcher & lecturer", rating: 4.9, img: null },
  { id: "t4", name: "Prof. Amin", subject: "Chemistry", career: "20 years", rating: 4.6, img: null }
];

export default function App() {
  // Always start with intro if not seen
  const [showIntro, setShowIntro] = useState(() => localStorage.getItem("seenIntro") !== "true");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [view, setView] = useState("home");
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("posts")) || INITIAL_POSTS);
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem("saved")) || []);
  const [joinedClasses, setJoinedClasses] = useState(() => JSON.parse(localStorage.getItem("classes")) || []);
  const [tutors] = useState(INITIAL_TUTORS);
  const [activeTutor, setActiveTutor] = useState(null);
  const [activeClass, setActiveClass] = useState(null);

  useEffect(() => { localStorage.setItem("posts", JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem("saved", JSON.stringify(savedIds)); }, [savedIds]);
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("classes", JSON.stringify(joinedClasses)); }, [joinedClasses]);
  useEffect(() => { localStorage.setItem("theme", theme); document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const finishIntro = () => {
    setShowIntro(false);
    localStorage.setItem("seenIntro", "true");
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p._liked ? p.likes - 1 : p.likes + 1, _liked: !p._liked } : p));
  };

  const toggleSave = (postId) => {
    setSavedIds(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  };

  const joinClass = (tutor) => {
    const classId = `class_${tutor.id}`;
    if (!joinedClasses.find(c => c.id === classId)) {
      const newClass = { id: classId, tutorId: tutor.id, name: `${tutor.subject} with ${tutor.name}`, messages: [] };
      setJoinedClasses(prev => [...prev, newClass]);
    }
    setActiveClass(classId);
    setView("classes");
  };

  const openTutor = (tutor) => setActiveTutor(tutor);

  const sendMessageToClass = (classId, sender, text) => {
    setJoinedClasses(prev => prev.map(c => c.id === classId ? { ...c, messages: [...c.messages, { id: Date.now(), sender, text }] } : c));
  };

  return (
    <div className={`app-root ${theme}`}>
      {/* Intro always first */}
      {showIntro ? (
        <Intro onFinish={finishIntro} />
      ) : !user ? (
        <UserForm onSave={setUser} />
      ) : (
        <div className="app-container">
          <Header
            user={user}
            theme={theme}
            setTheme={setTheme}
            onLogout={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                setUser(null);
                setShowIntro(true); // reset intro
                localStorage.removeItem("user");
              }
            }}
          />
          <div className="main-area">
            <Sidebar active={view} onChange={setView} mobile={() => {}} />
            <div className="content-area">
              {view === "home" && <Feed posts={posts} onLike={toggleLike} onSave={toggleSave} savedIds={savedIds} />}
              {view === "tutors" && <Tutors tutors={tutors} onOpen={openTutor} />}
              {activeTutor && <TutorProfile tutor={activeTutor} onClose={() => setActiveTutor(null)} onJoin={() => { joinClass(activeTutor); setActiveTutor(null); }} />}
              {view === "classes" && <Classes joinedClasses={joinedClasses} tutors={tutors} openChat={(id) => setActiveClass(id)} activeClass={activeClass} setActiveClass={setActiveClass} />}
              {view === "saved" && <Saved posts={posts.filter(p => savedIds.includes(p.id))} onUnsave={toggleSave} />}
              {activeClass && <ChatRoom classData={joinedClasses.find(c => c.id === activeClass)} tutors={tutors} sendMessage={(msg) => {
                sendMessageToClass(activeClass, "You", msg);
                // AI reply
                setTimeout(() => {
                  const tutorObj = tutors.find(t => t.id === joinedClasses.find(c => c.id === activeClass).tutorId);
                  const reply = tutorObj ? `Hi, I'm ${tutorObj.name}. Here's a tip: ${simpleAiReply(msg)}` : `AI Tutor: ${simpleAiReply(msg)}`;
                  sendMessageToClass(activeClass, tutorObj ? tutorObj.name : "AI Tutor", reply);
                }, 900);
              }} onClose={() => setActiveClass(null)} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function simpleAiReply(userMsg) {
  const msg = userMsg.toLowerCase();
  if (msg.includes("solve") || msg.includes("how") || msg.includes("what")) return "Let's break that down step by step. First, identify knowns and unknowns.";
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! What topic are you studying today?";
  if (msg.includes("help")) return "Tell me the exact problem and I'll guide you through solving it.";
  if (msg.includes("formula")) return "Remember formulas are tools. Use them after checking units and variables.";
  return "Interesting question — try describing the problem in more detail so I can help.";
}
