'use client'
import React from 'react'
import Link from 'next/link'
import Footer from '../learn/footer'
import Header from '../learn/header'

const Page = () => {
  const database = {
    courses: [
      {
        title: "IELTS Preparation",
        description: "Comprehensive course covering all four IELTS components.",
        duration: "8 weeks",
        level: "Intermediate to Advanced",
        price: "300K sum",
        link: "/contact",
      },
      {
        title: "Writing Excellence",
        description: "Learn to write high-scoring essays and reports.",
        duration: "6 weeks",
        level: "Intermediate to Advanced",
        price: "300K sum",
        link: "/contact",
      },
      {
        title: "Intensive Multilevel Course",
        description: "B1 to B2,B2 to C1 level improvement in a short time.",
        duration: "4 weeks",
        level: "Advanced",
        price: "250K sum",
        link: "/contact",
      },
      {
        title: "Speaking Mastery",
        description: "Focused training on fluency, pronunciation, and confidence.",
        duration: "6 weeks",
        level: "All levels",
        price: "250K sum",
        link: "/contact",
      },
      {
        title: "Grammar & Vocabulary Boost",
        description: "Strengthen your grammar and vocabulary for higher IELTS band scores.",
        duration: "5 weeks",
        level: "Beginner to Intermediate",
        price: "200K sum",
        link: "/contact",
      },
      {
        title: "Mock Test & Feedback Program",
        description: "Simulated IELTS tests with detailed feedback to track your progress.",
        duration: "3 weeks",
        level: "Intermediate to Advanced",
        price: "250K sum",
        link: "/contact",
      },
    ],
  }

  return (
    <div>
      {/* === HEADER === */}
     <Header/>

      {/* === COURSES SECTION === */}
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="section-title">
            <h2 className="main-title">🎓 Our IELTS Courses</h2>
            <p className="subtitle">
              Comprehensive IELTS programs designed to help you reach your target band score.
            </p>
          </div>

          <div className="courses-grid">
            {database.courses.map((course, index) => (
              <div key={index} className="course-card">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-meta">
                  <span>⏱️ {course.duration}</span>
                  <span>👤 {course.level}</span>
                  <span>💸 {course.price}</span>
                </div>
                <Link href={course.link}>
                  <button className="lkmn"> Contact</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
     <Footer/>
    </div>
  )
}

export default Page
