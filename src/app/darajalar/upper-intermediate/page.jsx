'use client'
import React, { useState } from "react";

const questions = [
  { q: "1) Conditional: If I ___ you, I would apologize.", options: ["was", "were", "am"], answer: "were" },
  { q: "2) Which is correct passive?", options: ["The cake was eaten.", "The cake ate.", "The cake was eat."], answer: "The cake was eaten." },
  { q: "3) Reported speech: He said he ___ busy.", options: ["is", "was", "were"], answer: "was" },
  { q: "4) Choose the correct phrase:", options: ["Despite of the rain", "In spite of the rain", "Although of the rain"], answer: "In spite of the rain" },
  { q: "5) Which is correct?", options: ["She suggested go to the park.", "She suggested going to the park.", "She suggested to going."], answer: "She suggested going to the park." },
  { q: "6) Choose synonym of 'angry':", options: ["furious", "calm", "happy"], answer: "furious" },
  { q: "7) Correct relative pronoun: The man ___ called you is my teacher.", options: ["who", "which", "whom"], answer: "who" },
  { q: "8) Fill in: He speaks English ___ than his brother.", options: ["fluent", "more fluent", "more fluently"], answer: "more fluently" },
  { q: "9) Which is advanced structure?", options: ["Not only he is clever, but also kind.", "Not only is he clever, but also kind.", "He not only clever, but also kind."], answer: "Not only is he clever, but also kind." },
  { q: "10) Which is correct?", options: ["It’s high time we go.", "It’s high time we went.", "It’s high time we gone."], answer: "It’s high time we went." },
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
