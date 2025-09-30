import Link from 'next/link'
import React from 'react'

const page = () => {
const database = {
  courses: [
    {
      title: "A1 – Beginner",
      description: "Basic grammar practice with simple present, articles, pronouns, and very easy sentence structures.",
      level: "Beginner",
      TestAmount: "10",
      link: "/darajalar/beginner"
    },
    {
      title: "A2 – Elementary",
      description: "Grammar practice with past simple, questions, prepositions, and more everyday sentence patterns.",
      level: "Elementary",
      TestAmount: "10",
      link: "/darajalar/elementary"
    },
    {
      title: "B1 – Intermediate",
      description: "Grammar tests on present perfect, comparatives, modals, and sentence combinations.",
      level: "Intermediate",
      TestAmount: "10",
      link: "/darajalar/intermediate"
    },
    {
      title: "B2 – Upper-Intermediate",
      description: "Practice with conditionals, passive voice, reported speech, and complex sentence structures.",
      level: "Upper-Intermediate",
      TestAmount: "10",
      link: "/darajalar/upper-intermediate"
    },
    {
      title: "C1 – Advanced",
      description: "Challenging grammar tests with advanced tenses, mixed conditionals, and detailed sentence transformations.",
      level: "Advanced",
      TestAmount: "10",
      link: "/darajalar/advanced"
    },
    {
      title: "C2 – Proficient",
      description: "High-level grammar practice focusing on accuracy, subtle differences, and native-like sentence use.",
      level: "Proficient",
      TestAmount: "10",
      link: "/darajalar/proficient"
    },
     {
      title: "A1-C2  questions",
      description: "High-level grammar practice where you can know your level",
      level: "Beginner-Proficient",
      TestAmount: "10",
      link: "/darajalar/quicktest"
    },
  ]
}

  return (
    <div>
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
            <li><a href="/learn/asospage">Learn</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
    <section id="courses" className="courses">
    <div className="container">
      <div className="section-title">
        <h2>Our Tests</h2>
        <p>Take grammar tests from A1 to C2, all levels included.</p>
      </div>
      <div className="courses-grid">
        {database.courses.map((course, index) => (
          <div key={index} className="course-card">
            <h1>{course.title}</h1>
            <h2>{course.description}</h2>
            <div className="course-meta">
              
              <span>👤 {course.level}</span>
              <h1>Test Amount {course.TestAmount}</h1>
              <Link href={course.link}><button className='lkmn'>Complete</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
   <footer id="contact" className="footer">
    <div className="container">
      <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
    </div>
  </footer>
    </div>
  )
}

export default page