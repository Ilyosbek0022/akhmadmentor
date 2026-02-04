'use client'
import React from "react";


const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/">
            <div className="logo">
              <div className="logo-icon">Mr</div>
              <div className="logo-text">Akhmadjon IELTS</div>
            </div>
          </a>
          <nav className="nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/price">Price</a></li>
              <li><a href="/test">Tests</a></li>
              <li><a href="/locate">Location</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/learn/glavniy">Learn</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
