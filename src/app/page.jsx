'use client'
import Link from 'next/link';
import React, { useState } from 'react';


const websiteData = {
  teacher: {
    name: "Mrakhmadjon",
    qualifications: "CELTA Certified, IELTS Specialist",
    experience: "7+ years teaching experience",
    studentsTaught: "2500+ students",
    averageScore: "6.5-7.0 average student IELTS score",
    personalScore: "IELTS 7.5 Overall"
  },
  courses: [
    {
      title: "IELTS Preparation",
      description: "Comprehensive course covering all four IELTS components",
      duration: "8 weeks",
      level: "Intermediate to Advanced"
    },
    {
      title: "Writing Excellence",
      description: "Learn to write high-scoring essays and reports",
      duration: "6 weeks",
      level: "Intermediate to Advanced"
    },
    {
      title: "Intensive Crash Course",
      description: "Fast-track preparation for upcoming tests",
      duration: "4 weeks",
      level: "Advanced"
    }, {
      title: "Mock Test & Feedback Program",
      description: "Simulated IELTS tests with detailed feedback to track your progress.",
      duration: "3 weeks",
      level: "Intermediate to Advanced",
      
    },
  ],
  testimonials: [
    {
      name: "Ilyosbek",
      score: "IELTS 7.0",
      text: "Mrakhmadjon's methods helped me improve from 6.0 to 7.0 in just 4 weeks!"
    },
    {
      name: "Islom",
      score: "IELTS 7.0",
      text: "The speaking practice sessions were incredibly helpful. I gained so much confidence."
    },
    {
      name: "Sardor",
      score: "IELTS 6.5",
      text: "I never thought I could get this score. The teacher's strategies really work."
    },
    {
      name: "Sarvara",
      score: "IELTS 7.5",
      text: "The feedback on my writing was detailed and helped me understand my mistakes."
    },
    {
      name: "Intizor",
      score: "IELTS 6.5",
      text: "The practice tests and feedback made me feel fully prepared for the real IELTS exam."
    },{
      name: "Oybek",
      score: "IELTS 7.0",
      text: "The personalized support motivated me to stay focused and reach my target score."
    }
    ,{
      name: "Afruza",
      score: "IELTS 7.5",
      text: "The strategies I learned made answering reading questions much easier for me."
    }
  ]
};


const Header = () => (
  <header className="header static top-0 left-0 ">
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
            <li><a href="/learn/gemini">GEMINI AI</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);


const HeroSection = () => (
  <section id="home" className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>Achieve Your IELTS Goals with Expert Guidance</h1>
        <p>
          Professional IELTS preparation with a certified instructor who has helped over{" "}
          {websiteData.teacher.studentsTaught} students succeed
        </p>
        <a href="/price" className="btn">Explore Courses</a>
        <a href="/learn/glavniy" className="btn">Study for free</a>
      </div>
    </div>
  </section>
);


const TeacherInfo = () => (
  <section id="about" className="teacher-info">
    <div className="container">
      <div className="section-title">
        <h2>About Your Instructor</h2>
        <p>Learn from an experienced IELTS specialist with proven results</p>
      </div>
      <div className="teacher-content">
        <div className="teacher-image">
          <img src="/tutor.jpg" alt="Mrakhmadjon" />
        </div>
        <div className="teacher-details">
          <h3>{websiteData.teacher.name} - IELTS Specialist</h3>
          <p>
            With over {websiteData.teacher.experience} and a personal IELTS score of{" "}
            {websiteData.teacher.personalScore}, I have developed proven methods
            to help students achieve their target scores.
          </p>
        </div>
      </div>
    </div>
  </section>
);


const Courses = () => (
  <section id="courses" className="courses">
    <div className="container">
      <div className="section-title">
        <h2>Our Courses</h2>
        <p>Comprehensive IELTS preparation programs designed for success</p>
      </div>
      <div className="courses-grid">
        {websiteData.courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          
            <div className="course-meta">
              <span>⏱️ {course.duration}</span>
              <span className='darajasi'>👤 {course.level}</span>
                <Link href={'/price'}><button className='lkmn'>Check</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const next = () => setCurrentTestimonial((prev) => (prev + 1) % websiteData.testimonials.length);
  const prev = () => setCurrentTestimonial((prev) => (prev - 1 + websiteData.testimonials.length) % websiteData.testimonials.length);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Student Testimonials</h2>
        </div>
        <div className="testimonial-card">
          <p>{websiteData.testimonials[currentTestimonial].text}</p>
          <h4>{websiteData.testimonials[currentTestimonial].name} - {websiteData.testimonials[currentTestimonial].score}</h4>
        </div>
        <div className="sliderprnt">
        <div >
          <button onClick={prev} className='slider'><h1>←</h1></button>
          <button onClick={next} className='slider'><h1>→</h1></button>
        </div>
        </div>
      </div>
    </section>
  );
};


const MapSection = () => (
  <section id="location" className="map-section">
    <div className="container">
      <div className="section-title">
        <h2>Our Location</h2>
      </div>
      <div className="map-container">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d716.5531943047517!2d66.23165955268114!3d40.00401054729337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4df500557108bd%3A0x5652e93b7feac174!2sAkram%20bobo&#39;s%20house!5e0!3m2!1sen!2s!4v1758368609292!5m2!1sen!2s"  loading="lazy"title='Akhmadjon teachers home'></iframe>
      </div>
    </div>
  </section>
);


const Footer = () => (
  <footer id="contact" className="footer">
    <div className="container">
      <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
    </div>
  </footer>
);


const App = () => (
  <div className="app">
    <Header />
    <HeroSection />
    <TeacherInfo />
    <Courses />
    <Testimonials />
    <MapSection />
    <Footer />
  </div>
);

export default App;
