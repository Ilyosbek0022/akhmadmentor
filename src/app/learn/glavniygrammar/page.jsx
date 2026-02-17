'use client'
import React, { useState } from "react";
import Header from "../header";


const initialLessons = [
  // Vocabulary
  { id: 1, title: "If conditional", path: "/learn/ifcondition" },

  // Grammar
  { id: 2, title: "Zamonlar", path: "/learn/asospage" },

  // Skills
  { id: 3, title: "Passive voice", path: "/learn/passive" },
  { id: 4, title: "Reported speeech", path: "/learn/reportedspeech" },
  { id: 5, title: "article", path: "/learn/article" },
  { id: 6, title: "To be to", path: "/learn/tobeto" },

  // Extras
  { id: 7, title: "Predlog", path: "/learn/predlog" },
  { id: 8, title: "Tests", path: "/learn/testsas" },
  
];

const Learn = () => {
  const [lessons] = useState(initialLessons);

  return (
    <div className="all">
     <Header/>

      <div className="learn-page">
        <h1 className="learn-title">Learning Sections</h1>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <a key={lesson.id} href={lesson.path}>
              <div className="lesson-card cursor-pointer "  id="gramglavniy">
                
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
