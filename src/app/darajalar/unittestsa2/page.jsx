"use client";
import Link from "next/link";
import React from "react";
import Header from "../../learn/header";
import Footer from "../../learn/footer";


const page = () => {
  const database = {
    courses: [
       
      {
        title: "A2 unit tests 1",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 2",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 3",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 4",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 5",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 6",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },{
        title: "A2 unit tests 7",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 8",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 9",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
      },
      {
        title: "A2 unit tests 10",
        description:
          "Basic grammar exam with simple present, articles, pronouns, and very easy sentence structures.",
        level: "Beginner",
        TestAmount: "50",
        link: "https://speacial-rep-for-unit-a1.vercel.app/",
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
