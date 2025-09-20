"use client"; 

import React from "react";
import { ToastContainer, toast } from "react-toastify";


const Page = () => {
  const notify = () => toast(`Call to this number to get full Help
    
    +998 95 238 22 16
    `  ,{
    autoClose:17000
     
  });

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

                
                <li>
                  <button
                    className="lkmn h-[40px] w-[40px] flex justify-center items-center bg-indigo-600 text-white rounded"
                    onClick={notify}
                  >
                    Help
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>



  <section id="location" className="map-section">
    <div className="container">
      <div className="section-title">
        <h2>Our Location</h2>
        <h3>if you have any problems click "Help"</h3>
      </div>
      <div className="map-container">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d716.5531943047517!2d66.23165955268114!3d40.00401054729337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4df500557108bd%3A0x5652e93b7feac174!2sAkram%20bobo&#39;s%20house!5e0!3m2!1sen!2s!4v1758368609292!5m2!1sen!2s"  loading="lazy"title='Akhmadjon teachers home'></iframe>
      </div>
    </div>
  </section>


      <ToastContainer theme="dark" position="top-left" />
       <footer id="contact" className="footer">
    <div className="container">
      <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
    </div>
  </footer>
    </div>
  );
};

export default Page;
