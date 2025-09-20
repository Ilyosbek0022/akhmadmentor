import Link from "next/link";
import React from "react";


const Contact = () => {
  return (
    <div className="all">
        
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
    <div className="contact-wrapper">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>This form uses fabform.io to save form submissions.</p>
      </div>

      <form
        
        method="post"
        className="contact-form"
      >
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="first-name">First name</label>
            <input type="text" name="first-name" id="first-name" />
          </div>

          <div className="form-field">
            <label htmlFor="last-name">Last name</label>
            <input type="text" name="last-name" id="last-name" />
          </div>

         

          <div className="form-field full">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className="form-field full">
            <label htmlFor="phone-number">Phone number</label>
            <input type="tel" name="phone-number" id="phone-number" placeholder="+998-00-000-00-00"/>
          </div>

          <div className="form-field full">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="4" placeholder="How much is your beginner course?"></textarea>
          </div>
        </div>

        <div className="policy-check">
          <input type="checkbox" id="policy" />
          <label htmlFor="policy">
            By selecting this, you agree to our{" "}
            <a href="#" className="policy-link">
              privacy policy
            </a>
            .
          </label>
        </div>

        <div className="form-submit">
         <Link href={'/'}><button type="submit">Let's talk</button></Link> 
        </div>
      </form>
    </div>
     <footer id="contact" className="footer">
    <div className="container">
      <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
    </div>
  </footer>
    </div>
  );
};

export default Contact;
