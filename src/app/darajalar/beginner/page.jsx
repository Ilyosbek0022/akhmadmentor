'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Choose the correct article: ___ orange is on the table.", options: ["A", "An", "The"], answer: "An" },
  { q: "2) Plural of 'book' is:", options: ["books", "bookes", "book"], answer: "books" },
  { q: "3) Choose the correct sentence.", options: ["He am a student.", "He is a student.", "He are a student."], answer: "He is a student." },
  { q: "4) What is 'dog' in plural?", options: ["dog", "dogs", "doges"], answer: "dogs" },
  { q: "5) Fill in: I ___ happy.", options: ["is", "am", "are"], answer: "am" },
  { q: "6) Choose the negative form: 'She likes milk.'", options: ["She don't likes milk.", "She doesn't like milk.", "She not like milk."], answer: "She doesn't like milk." },
  { q: "7) Which is a question?", options: ["She is my sister.", "Is she my sister?", "She my sister?"], answer: "Is she my sister?" },
  { q: "8) Select the correct word: ___ cat is black.", options: ["A", "An", "The"], answer: "The" },
  { q: "9) Choose the opposite of 'hot':", options: ["cold", "warm", "cool"], answer: "cold" },
  { q: "10) Which is correct?", options: ["I has a pen.", "I have a pen.", "I haves a pen."], answer: "I have a pen." },
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
        <h2 className="test-title">English Level Test (Beginner)</h2>

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
