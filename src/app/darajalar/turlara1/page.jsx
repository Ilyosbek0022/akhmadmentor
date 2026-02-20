"use client";
import Link from "next/link";
import React from "react";
import Header from "../../learn/header";
import Footer from "../../learn/footer";


const FullExamTest = () => {
  const database = {
    courses: [
        {
        title: "Unit tests",
        description:
          "unit tests included",
        level: "A1",
        TestAmount: "10",
        link: "/darajalar/unittestsa1",
      },
       {
        title: "Achievement tests",
        description:
          "achievement tests included",
        level: "A1",
        TestAmount: "5",
        link: "/darajalar/turlara2",
      },
       {
        title: "mid course tests",
        description:
          "mid course tests included",
        level: "A1",
        TestAmount: "2",
        link: "/darajalar/turlarb1",
      },
       {
        title: "end course tests",
        description:
          "end course tests included",
        level: "A1",
        TestAmount: "2",
        link: "/darajalar/turlarb2",
      },
    ],
  };

  return (
    <div className="all">
      
     <Header/>
      
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="section-title">
            <h2 className="main-title">Welcome to our grammar tests</h2>
            <p className="subtitle">
            take grammar tests from different units and take your level to the next step.
            </p>
          </div>

          <div className="courses-grid">
            {database.courses.map((course, index) => (
              <div key={index} className="course-card">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-meta">
                  <span>👤 {course.level}</span>
                  <span>🧩 {course.TestAmount} Tests</span>
                </div>
                <Link href={course.link}>
                  <button className="lkmn">🚀 Start</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
<Footer/>
     
    </div>
  );
};

export default FullExamTest;
