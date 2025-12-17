'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Choose the correct article: ___ apple a day keeps the doctor away.", options: ["A", "An", "The"], answer: "An" },
  { q: "2) Past tense of 'go' is:", options: ["goed", "went", "gone"], answer: "went" },
  { q: "3) Translate: 'Men kitob o‘qiyapman.'", options: ["I read a book", "I am reading a book", "I will read a book"], answer: "I am reading a book" },
  { q: "4) Which one is correct?", options: ["She don’t like tea", "She doesn’t like tea", "She not like tea"], answer: "She doesn’t like tea" },
  { q: "5) Fill in: If I ___ rich, I would travel the world.", options: ["am", "was", "were"], answer: "was" },
  { q: "6) Which is formal?", options: ["What’s up?", "How do you do?", "Yo!"], answer: "How do you do?" },
  { q: "7) Choose the synonym of 'big':", options: ["tiny", "huge", "small"], answer: "huge" },
  { q: "8) Which sentence is correct?", options: ["He has lived here since 5 years", "He has lived here for 5 years", "He lived here since 5 years"], answer: "He has lived here for 5 years" },
  { q: "9) Advanced: The book, ___ you gave me, was fascinating.", options: ["which", "what", "who"], answer: "which" },
  { q: "10) Advanced: Choose the correct sentence.", options: [
      "Had I known about the traffic, I would have left earlier.",
      "If I would know about the traffic, I had left earlier.",
      "If I know about the traffic, I would left earlier."
    ], answer: "Had I known about the traffic, I would have left earlier."
  },
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
              <li><a href="/learn/glavniy">Learn</a></li>
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
