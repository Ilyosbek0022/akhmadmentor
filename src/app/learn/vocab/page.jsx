'use client'
import React, { useState } from "react";

const initialVocabulary = [
  { id: 1, title: "A1 – Beginner Vocabulary", path: "/learn/vocabulary/a1" },
  { id: 2, title: "A2 – Elementary Vocabulary", path: "/learn/vocabulary/a2" },
  { id: 3, title: "B1 – Intermediate Vocabulary", path: "/learn/vocabulary/b1" },
  { id: 4, title: "B2 – Upper-Intermediate Vocabulary", path: "/learn/vocabulary/b2" },
  { id: 5, title: "C1 – Advanced Vocabulary", path: "/learn/vocabulary/c1" },
  { id: 6, title: "C2 – Proficiency Vocabulary", path: "/learn/vocabulary/c2" },
];

const Learn = () => {
  const [lessons] = useState(initialVocabulary);

  return (
    <div className="all">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/">
              <div className="logo">
                <div className="logo-icon">Mr</div>
                <div className="logo-text">Akhmadjon IELTS</div>
              </div>
            </a>
            <nav className="nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/price">Price</a></li>
                <li><a href="/test">Tests</a></li>
                <li><a href="/locate">Location</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/learn/glavniy">Learn</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="learn-page">
        <h1 className="learn-title">Vocabulary Levels</h1>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <a key={lesson.id} href={lesson.path}>
              <div className="lesson-card cursor-pointer">
                <div className="lesson-circle">
                  {lesson.title.charAt(0)}
                </div>
                <h2>{lesson.title}</h2>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
