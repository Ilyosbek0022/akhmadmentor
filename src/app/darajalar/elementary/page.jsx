'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Past tense of 'play' is:", options: ["played", "plays", "playing"], answer: "played" },
  { q: "2) Choose the correct sentence.", options: ["He don’t work.", "He doesn’t work.", "He no work."], answer: "He doesn’t work." },
  { q: "3) Fill in: I ___ to school yesterday.", options: ["go", "went", "goes"], answer: "went" },
  { q: "4) Which preposition fits? I live ___ Tashkent.", options: ["on", "in", "at"], answer: "in" },
  { q: "5) Choose the correct form: She ___ TV now.", options: ["watch", "watches", "is watching"], answer: "is watching" },
  { q: "6) Comparative form of 'big' is:", options: ["biger", "bigger", "biggest"], answer: "bigger" },
  { q: "7) What is the opposite of 'happy'?", options: ["glad", "sad", "fun"], answer: "sad" },
  { q: "8) Correct question: ___ you like pizza?", options: ["Do", "Does", "Did"], answer: "Do" },
  { q: "9) Translate: 'U maktabga bordi.'", options: ["He go to school.", "He goes to school.", "He went to school."], answer: "He went to school." },
  { q: "10) Which sentence is correct?", options: ["I can to swim.", "I can swim.", "I swam can."], answer: "I can swim." },
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
    setResult({ score });
  };

  return (
    <div className="all">
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
            
          </ul>
        </nav>
      </div>
    </div>
  </header>

      <div className="test-container">
        <h2 className="test-title">English Level Test (Elementary)</h2>

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
