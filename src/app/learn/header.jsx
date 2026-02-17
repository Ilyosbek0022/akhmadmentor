import React from "react";
import Navbar from "../components/Navbar";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content flex items-center justify-between">
          
          <a href="/">
            <div className="logo flex items-center gap-2">
              <div className="logo-icon">Mr</div>
              <div className="logo-text">Akhmadjon IELTS</div>
            </div>
          </a>

          <div className="flex items-center gap-6">
            <nav className="nav">
              <ul className="flex items-center gap-6">
               <li><a href="/">Home</a></li>
              <li><a href="/price">Price</a></li>
              <li><a href="/test">Tests</a></li>
              <li><a href="/locate">Location</a></li>
              <li><a href="/contact">Log-in</a></li>
              <li><a href="/signup">Sign-up</a></li>
              <li><a href="/learn/glavniy">Learn</a></li>
              </ul>
            </nav>

            {/* Avatar / Navbar component */}
            <Navbar />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
