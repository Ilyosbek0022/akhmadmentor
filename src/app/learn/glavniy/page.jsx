'use client'
import React, { useState } from "react";
import { validateLocaleAndSetLanguage } from "typescript";

const initialLessons = [
  { id: 1, title: "Vocabulary", path: "/learn/vocab", checked: true },
  { id: 2, title: "Grammar", path: "/learn/glavniygrammar", checked: true },

  { id: 3, title: "Speaking", path: "/learn/speaking" ,checked :true },
  { id: 4, title: "Writing", path: "/learn/writing" }, 
  { id: 5, title: "Listening", path: "/learn/listening" },
  { id: 6, title: "Reading", path: "/learn/reading" },
  { id: 7, title: "Formulalar", path: "/learn/formulalar" },
  { id: 8, title: "Exercises", path: "/learn/exercises" },
];

const Learn = () => {
  const [lessons] = useState(initialLessons);

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
        <h1 className="learn-title">Learning Sections</h1>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <a key={lesson.id} href={lesson.path}>
              <div className="lesson-card cursor-pointer">

           
                {lesson.checked && (
                  <div className="ios-active-dot"></div>
                )}

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
