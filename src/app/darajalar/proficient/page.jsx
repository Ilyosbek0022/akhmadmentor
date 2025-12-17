'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Advanced phrase: He is known ___ his generosity.", options: ["for", "about", "with"], answer: "for" },
  { q: "2) Correct sentence:", options: ["Were I to know, I would tell you.", "If I to know, I would tell you.", "If I knew, I tell you."], answer: "Were I to know, I would tell you." },
  { q: "3) Which is grammatically correct?", options: ["Had it not been for your help, I fail.", "Had it not been for your help, I would have failed.", "If it not for your help, I failed."], answer: "Had it not been for your help, I would have failed." },
  { q: "4) Correct collocation: He ___ the responsibility for the mistake.", options: ["took", "made", "did"], answer: "took" },
  { q: "5) Which is correct?", options: ["Scarcely had he spoken when she interrupted.", "Scarcely he had spoken when she interrupted.", "He scarcely had spoken when interrupted she."], answer: "Scarcely had he spoken when she interrupted." },
  { q: "6) Choose correct usage:", options: ["She is accustomed with working late.", "She is accustomed to working late.", "She accustomed to work late."], answer: "She is accustomed to working late." },
  { q: "7) Correct structure:", options: ["It was John whom broke the vase.", "It was John who broke the vase.", "It was John which broke the vase."], answer: "It was John who broke the vase." },
  { q: "8) Which is advanced grammar?", options: ["Should you need help, call me.", "If you need help, you should call me.", "If you will need help, call me."], answer: "Should you need help, call me." },
  { q: "9) Correct form:", options: ["He denied to steal the money.", "He denied having stolen the money.", "He denied steal the money."], answer: "He denied having stolen the money." },
  { q: "10) Advanced inversion:", options: ["Little I knew about it.", "Little did I know about it.", "I little did know about it."], answer: "Little did I know about it." },
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
    setResult(score);
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

      <div className="test-container">
        <h2 className="test-title">English Level Test (Proficient)</h2>

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

        {result !== null && (
          <div className="result">
            <p>Score: {result} / {questions.length}</p>
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
