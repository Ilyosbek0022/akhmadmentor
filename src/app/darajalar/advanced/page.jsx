'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Correct form: Had I ___, I would have joined you.", options: ["know", "knew", "known"], answer: "known" },
  { q: "2) Which sentence is correct?", options: ["No sooner I arrived than it started raining.", "No sooner had I arrived than it started raining.", "No sooner I had arrived than it started raining."], answer: "No sooner had I arrived than it started raining." },
  { q: "3) Advanced conditional: If she ___ harder, she might have passed.", options: ["study", "studied", "had studied"], answer: "had studied" },
  { q: "4) Choose the correct inversion:", options: ["Never I have seen such beauty.", "Never have I seen such beauty.", "I never have seen such beauty."], answer: "Never have I seen such beauty." },
  { q: "5) Fill in: He spoke as if he ___ the boss.", options: ["is", "was", "were"], answer: "were" },
  { q: "6) Correct advanced tense: By next year, I ___ my degree.", options: ["will finish", "will have finished", "finished"], answer: "will have finished" },
  { q: "7) Which is correct?", options: ["I look forward to meet you.", "I look forward to meeting you.", "I look forward meeting you."], answer: "I look forward to meeting you." },
  { q: "8) Advanced collocation: He paid ___ attention to detail.", options: ["close", "near", "closed"], answer: "close" },
  { q: "9) Choose the correct:", options: ["Hardly he had arrived when the phone rang.", "Hardly had he arrived when the phone rang.", "He had hardly arrived when rang the phone."], answer: "Hardly had he arrived when the phone rang." },
  { q: "10) Correct usage:", options: ["She insisted to pay.", "She insisted on paying.", "She insisted paying."], answer: "She insisted on paying." },
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
      
      <h2 className="test-title">English Level Test (Advanced)</h2>

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
