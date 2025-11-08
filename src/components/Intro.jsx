import React, { useState } from "react";
import "./Intro.css";

export default function Intro({ onFinish }) {
  const slides = [
    { id: 1, text: "Welcome to StudyGroup! Learn smarter." },
    { id: 2, text: "Connect with tutors and classmates easily." },
    { id: 3, text: "Track progress, save posts, join classes." }
  ];
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish(); // triggers App.jsx to hide intro
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-slide">{slides[index].text}</div>
      <button className="intro-next" onClick={nextSlide}>
        {index === slides.length - 1 ? "Get Started" : "Next"}
      </button>
    </div>
  );
}
