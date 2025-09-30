'use client'
import React, { useState } from "react";


const initialTenses = [
  // Present
  { id: 1, title: "Present Simple", path: "/mavzular/presentsimple" },
  { id: 2, title: "Present Continuous", path: "/mavzular/continius" },
  { id: 3, title: "Present Perfect", path: "/mavzular/perfekt" },
  { id: 4, title: "Present Perfect Continuous", path: "/mavzular/presentperfcont" },

  // Past
  { id: 5, title: "Past Simple", path: "/mavzular/pastimple" },
  { id: 6, title: "Past Continuous", path: "/mavzular/pastcont" }, // agar past uchun alohida papka bo‘lsa, shu nomni yoz
  { id: 7, title: "Past Perfect", path: "/mavzular/pastperfekt" },
  { id: 8, title: "Past Perfect Continuous", path: "/mavzular/pastperfcont" },

  // Future
  { id: 9, title: "Future Simple", path: "/mavzular/future" },
  { id: 10, title: "Future Continuous", path: "/mavzular/futurecont" },
  { id: 11, title: "Future Perfect", path: "/mavzular/futureperf" },
  { id: 12, title: "Future Perfect Continuous", path: "/mavzular/futureperfcont" },
];

const Learn = () => {
  const [lessons] = useState(initialTenses);

  return (
    <div className="all">
         <header className="header">
    <div className="container">
      <div className="header-content">
        <a href="/">
        <div className="logo">
          <div className="logo-icon">Mr</div>
          <div className="logo-text">Akhmadjon IELTS</div>
        </div></a>
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
      <h1 className="learn-title">Zamonlar</h1>

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
