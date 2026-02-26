'use client'
import React, { useState } from "react";
import { validateLocaleAndSetLanguage } from "typescript";
import Header from "../header";

const initialLessons = [
  { id: 1, title: "Vocabulary", path: "/learn/vocab", checked: true },
  { id: 2, title: "Grammar", path: "/learn/glavniygrammar", checked: true },

  { id: 3, title: "Speaking", path: "/learn/speaking" ,checked :true },
  { id: 4, title: "Writing", path: "/learn/writing",checked :true  }, 
  { id: 5, title: "Listening", path: "/learn/listening" },
  { id: 6, title: "Reading", path: "/learn/reading" ,checked :true  },
  { id: 7, title: "Formulalar", path: "/learn/formulalar",checked :true   },
  { id: 8, title: "Exercises", path: "/learn/exercises",checked :true   },
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
