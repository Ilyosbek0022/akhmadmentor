"use client";
import Link from "next/link";
import React from "react";
import Header from "../../learn/header";
import Footer from "../../learn/footer";


const FullExamTest = () => {
  const database = {
    courses: [
        {
        title: "A1",
        description:
          "unit,achievement,mid and end courses included",
        level: "A1-B2",
        TestAmount: "50",
        link: "/darajalar/turlara1",
      },
       {
        title: "A2",
        description:
          "unit,achievement,mid and end courses included",
        level: "A1-B2",
        TestAmount: "50",
        link: "/darajalar/turlara2",
      },
       {
        title: "B1",
        description:
          "unit,achievement,mid and end courses included",
        level: "A1-B2",
        TestAmount: "50",
        link: "/darajalar/turlarb1",
      },
       {
        title: "B2",
        description:
          "unit,achievement,mid and end courses included",
        level: "A1-B2",
        TestAmount: "50",
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
            <h2 className="main-title">Welcome to our exam grammar tests</h2>
            <p className="subtitle">
              Take grammar tests from A1 to C2 and find your level.
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
