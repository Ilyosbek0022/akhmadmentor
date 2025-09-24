'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Present perfect: She ___ in London for 3 years.", options: ["lives", "has lived", "lived"], answer: "has lived" },
  { q: "2) Choose the correct modal: You ___ study harder.", options: ["should", "mustn’t", "don’t"], answer: "should" },
  { q: "3) Correct comparative: This book is ___ than that one.", options: ["more interesting", "interestinger", "most interesting"], answer: "more interesting" },
  { q: "4) Which is correct?", options: ["I have saw him.", "I have seen him.", "I seen him."], answer: "I have seen him." },
  { q: "5) Fill in: If it ___ tomorrow, we’ll stay at home.", options: ["rains", "rain", "raining"], answer: "rains" },
  { q: "6) Choose the synonym of 'start':", options: ["begin", "finish", "stop"], answer: "begin" },
  { q: "7) Which sentence is passive?", options: ["They build houses.", "Houses are built by them.", "They are building houses."], answer: "Houses are built by them." },
  { q: "8) Correct past perfect: By 8 o’clock, she ___ dinner.", options: ["has cooked", "cooked", "had cooked"], answer: "had cooked" },
  { q: "9) Translate: 'U ingliz tilini yaxshi biladi.'", options: ["He knows English well.", "He know English good.", "He is knowing English well."], answer: "He knows English well." },
  { q: "10) Which is correct?", options: ["I’m used to wake up early.", "I used to waking up early.", "I’m used to waking up early."], answer: "I’m used to waking up early." },
];




function TestCEFR() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const evaluateCEFR = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    let level = "";
    if (score <= 2) level = "A1 (Beginner)";
    else if (score <= 4) level = "A2 (Elementary)";
    else if (score <= 6) level = "B1 (Intermediate)";
    else if (score <= 8) level = "B2 (Upper-Intermediate)";
    else if (score === 9) level = "C1 (Advanced)";
    else if (score === 10) level = "C2(ChatGpt)";

    setResult({ score, level });
  };

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
    <div className="test-container">
      
      <h2 className="test-title">English Level Test (CEFR)</h2>

      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <p>{q.q}</p>
          {q.options.map((opt, j) => (
            <label key={j} className="option">
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={evaluateCEFR}>
        Submit
      </button>

      {result && (
        <div className="result">
          <p>
            Score: {result.score} / {questions.length}
          </p>
          <p>Predicted Level: <strong>{result.level}</strong></p>
        </div>
      )}
    </div>
     <footer id="contact" className="footer">
    <div className="container">
      <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
    </div>
  </footer>
    </div>
  );
}

export default TestCEFR;
