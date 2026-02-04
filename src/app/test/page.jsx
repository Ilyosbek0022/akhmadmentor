"use client";
import Link from "next/link";
import React from "react";
import Header from "../learn/header";
import Footer from "../learn/footer";

const page = () => {
  const database = {
    courses: [
        {
        title: "Entry Test",
        description:
          "Lets test your English level",
        level: "A1-C2",
        TestAmount: "50",
        link: "/darajalar/entry",
      },
      {
        title: "A1 – Beginner",
        description:
          "Basic grammar practice with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "10",
        link: "/darajalar/beginner",
      },
      {
        title: "A2 – Elementary",
        description:
          "Grammar practice with past simple, questions, prepositions, and more everyday sentence patterns.",
        level: "Elementary",
        TestAmount: "10",
        link: "/darajalar/elementary",
      },
      {
        title: "B1 – Intermediate",
        description:
          "Grammar tests on present perfect, comparatives, modals, and sentence combinations.",
        level: "Intermediate",
        TestAmount: "10",
        link: "/darajalar/intermediate",
      },
      {
        title: "B2 – Upper-Intermediate",
        description:
          "Practice with conditionals, passive voice, reported speech, and complex sentence structures.",
        level: "Upper-Intermediate",
        TestAmount: "10",
        link: "/darajalar/upper-intermediate",
      },
      {
        title: "C1 – Advanced",
        description:
          "Challenging grammar tests with advanced tenses, mixed conditionals, and detailed sentence transformations.",
        level: "Advanced",
        TestAmount: "10",
        link: "/darajalar/advanced",
      },
      {
        title: "C2 – Proficient",
        description:
          "High-level grammar practice focusing on accuracy, subtle differences, and native-like sentence use.",
        level: "Proficient",
        TestAmount: "10",
        link: "/darajalar/proficient",
      },
      {
        title: "A1–C2 Quick Test",
        description:
          "High-level grammar test to check your real CEFR level quickly and accurately.",
        level: "Mixed",
        TestAmount: "10",
        link: "/darajalar/quicktest",
      },
    ],
  };

  return (
    <div>
      
     <Header/>
      
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="section-title">
            <h2 className="main-title">🧠 Our Grammar Tests</h2>
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

export default page;
