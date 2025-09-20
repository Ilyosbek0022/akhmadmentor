import React from 'react'

const page = () => {
const  databse={

 
   courses: [
    {
      title: "IELTS Preparation",
      description: "Comprehensive course covering all four IELTS components",
      duration: "8 weeks",
      level: "Intermediate to Advanced",
      price:"300K sum",
    },
    {
      title: "Writing Excellence",
      description: "Learn to write high-scoring essays and reports",
      duration: "6 weeks",
      level: "Intermediate to Advanced",
      price:"300K sum",
    },
    {
      title: "Intensive Crash Course",
      description: "Fast-track preparation for upcoming tests",
      duration: "4 weeks",
      level: "Advanced",
      price:"250K sum",

    },
    {
      title: "Speaking Mastery",
      description: "Focused training on fluency, pronunciation, and confidence in speaking.",
      duration: "6 weeks",
      level: "All levels",
      price:"250K sum",
    },
    ,
    {
      title: "Grammar & Vocabulary Boost",
      description: "Strengthen your grammar and vocabulary for higher IELTS band scores.",
      duration: "5 weeks",
      level: "Beginner to Intermediate",
      price:"200K sum",
    },,
    {
      title: "Mock Test & Feedback Program",
      description: "Simulated IELTS tests with detailed feedback to track your progress.",
      duration: "3 weeks",
      level: "Intermediate to Advanced",
      price:"250K sum",
    },
    
  ] }
  return (
    <div>
       <header className="header">
    <div className="container">
      <div className="header-content">
         <a href="/">
        <div className="logo">
          <div className="logo-icon">M</div>
          <div className="logo-text">Mrakhmadjon IELTS</div>
        </div></a>
        <nav className="nav">
          <ul>
                   <li><a href="/">Home</a></li>
            <li><a href="/price">Price</a></li>
            <li><a href="/test">Tests</a></li>
            <li><a href="/locate">Location</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
    <section id="courses" className="courses">
    <div className="container">
      <div className="section-title">
        <h2>Our Courses</h2>
        <p>Comprehensive IELTS preparation programs designed for success</p>
      </div>
      <div className="courses-grid">
        {databse.courses.map((course, index) => (
          <div key={index} className="course-card">
            <h1>{course.title}</h1>
            <h2>{course.description}</h2>
            <div className="course-meta">
              <span>⏱️ {course.duration}</span>
              <span>👤 {course.level}</span>
              <h1>💸{course.price}</h1>
              <a href="/contact"><button className='lkmn'>Contact</button></a>
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