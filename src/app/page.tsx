'use client'
import React, { useState } from 'react';
import { ThemeProvider } from './components/providers/theme-provider';

// Data for the website
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
    }
  ],
  testimonials: [
    {
      name: "Ilyosbek",
      score: "IELTS 17",
      text: "Mrakhmadjon's methods helped me improve my meme understanding from 6.0 to 7.0 in just 4 weeks!"
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
      name: "Islom",
      score: "IELTS 7.5",
      text: "The feedback on my writing was detailed and helped me understand my mistakes."
    }
  ]
};

// Header Component
const Header = () => {
  return (
    <header className="header">
      
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">M</div>
            <div className="logo-text">Mrakhmadjon IELTS</div>
          </div>
          <nav className="nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Courses</a></li>
              <li><a href="#courses">Tests</a></li>
              
              <li><a href="#location">Location</a></li>
              <li><a href="#contact">Contact</a></li>
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Achieve Your IELTS Goals with Expert Guidance</h1>
          <p>Professional IELTS preparation with a certified instructor who has helped over {websiteData.teacher.studentsTaught} students succeed</p>
          <a href="#courses" className="btn">Explore Courses</a>
        </div>
      </div>
    </section>
  );
};

// Teacher Info Component
const TeacherInfo = () => {
  return (
    <section id="about" className="teacher-info">
      <div className="container">
        <div className="section-title">
          <h2>About Your Instructor</h2>
          <p>Learn from an experienced IELTS specialist with proven results</p>
        </div>
        <div className="teacher-content">
          <div className="teacher-image">
            <img src="/mallim.jpg" alt="Mrakhmadjon" />
          </div>
          <div className="teacher-details">
            <h3>{websiteData.teacher.name} - IELTS Specialist</h3>
            <p>With over 7 years of teaching experience and a personal IELTS score of 7.5 overall, I have developed proven methods to help students achieve their target scores. My students typically achieve scores between 6.5 and 7.0 overall.</p>
            
            <div className="stats">
              <div className="stat-box">
                <div className="stat-icon">👨‍🎓</div>
                <h4>2500+</h4>
                <p>Students Taught</p>
              </div>
              <div className="stat-box">
                <div className="stat-icon">📈</div>
                <h4>7.5</h4>
                <p>Personal IELTS Score</p>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🏆</div>
                <h4>98%</h4>
                <p>Success Rate</p>
              </div>
              <div className="stat-box">
                <div className="stat-icon">⏱️</div>
                <h4>7+ Years</h4>
                <p>Teaching Experience</p>
              </div>
            </div>
            
            <p>My teaching methodology focuses on identifying each student's weaknesses and creating personalized strategies to overcome them. Through targeted practice and detailed feedback, I help students achieve scores they might not have thought possible.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Courses Component
const Courses = () => {
  return (
    <section id="courses" className="courses">
      <div className="container">
        <div className="section-title">
          <h2>Our Courses</h2>
          <p>Comprehensive IELTS preparation programs designed for success</p>
        </div>
        <div className="courses-grid">
          {websiteData.courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-image">
                <img src={`https://images.unsplash.com/photo-${['1516321318423-f06f85e504b3', '1581093458799-9510c3dee0ad', '1546410531-bb4caa6b424d', '1434030216411-0b793f4b4173'][index]}?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80`} alt={course.title} />
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>⏱️ {course.duration}</span>
                  <span>👤 {course.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % websiteData.testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + websiteData.testimonials.length) % websiteData.testimonials.length);
  };
  
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Student Testimonials</h2>
          <p>Hear from our successful students who achieved their target scores</p>
        </div>
        
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{websiteData.testimonials[currentTestimonial].text}</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src={`https://randomuser.me/api/portraits/${['men', 'women', 'men', 'men'][currentTestimonial]}/${[32, 44, 22, 45][currentTestimonial]}.jpg`} alt={websiteData.testimonials[currentTestimonial].name} />
              </div>
              <div className="author-details">
                <h4>{websiteData.testimonials[currentTestimonial].name}</h4>
                <p>{websiteData.testimonials[currentTestimonial].score}</p>
              </div>
            </div>
          </div>
          
          <div className="slider-controls">
            <button onClick={prevTestimonial} className="slider-btn">←</button>
            <div className="slider-dots">
              {websiteData.testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} className="slider-btn">→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Map Component
const MapSection = () => {
  return (
    <section id="location" className="map-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Location</h2>
          <p>Visit our center for a consultation or trial lesson</p>
        </div>
        
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95908.84428605671!2d69.2014006841168!3d41.28267853773998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b534175ed31%3A0x52a8f9d9414a2ad8!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1684572352322!5m2!1sen!2s" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mrakhmadjon IELTS Center Location"
          ></iframe>
        </div>
        
        <div className="location-info">
          <p>📍Kattakurgan,payshanba,koinotda Uzbekistan</p>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Mrakhmadjon IELTS</h3>
            <p>Professional IELTS preparation with proven results. Join our community of successful students.</p>
            <div className="social-icons">
              <a href="#" className="social-link">FB</a>
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">TG</a>
              <a href="#" className="social-link">YT</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li>📍Kattakurgan,payshanba,koinotda Uzbekistan</li>
              <li>📞 +998 33 490 11 03</li>
              <li>✉️ Akhmadjonmentor@gmail.com</li>
              <li>⏰ Mon-Sat: 8:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
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
};







export default App;