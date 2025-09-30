'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "accurate", meaning: "aniq, to‘g‘ri", example: "The information in the report is accurate." },
  { id: 2, word: "affect", meaning: "ta’sir qilmoq", example: "The weather can affect your mood." },
  { id: 3, word: "approach", meaning: "yondashuv", example: "We need a different approach to solve this issue." },
  { id: 4, word: "assume", meaning: "taxmin qilmoq", example: "I assume you have finished your homework." },
  { id: 5, word: "complex", meaning: "murakkab", example: "The problem is too complex to solve quickly." },
  { id: 6, word: "concern", meaning: "xavotir", example: "There is growing concern about climate change." },
  { id: 7, word: "consequence", meaning: "oqibat", example: "Every action has a consequence." },
  { id: 8, word: "convince", meaning: "ishontirmoq", example: "She convinced me to try something new." },
  { id: 9, word: "debate", meaning: "munozara", example: "There was a long debate about the new law." },
  { id: 10, word: "define", meaning: "ta’rif bermoq", example: "Can you define the word ‘innovation’?" },
  { id: 11, word: "efficient", meaning: "samarali", example: "This machine is more efficient than the old one." },
  { id: 12, word: "evidence", meaning: "dalil", example: "There is no evidence to support his claim." },
  { id: 13, word: "expand", meaning: "kengaytirmoq", example: "The company plans to expand into Asia." },
  { id: 14, word: "feature", meaning: "xususiyat", example: "The phone has many useful features." },
  { id: 15, word: "impact", meaning: "ta’sir", example: "Technology has a huge impact on our lives." },
  { id: 16, word: "maintain", meaning: "saqlab qolmoq", example: "She tries to maintain a healthy lifestyle." },
  { id: 17, word: "obvious", meaning: "oshkora, ravshan", example: "It’s obvious that he is tired." },
  { id: 18, word: "participate", meaning: "qatnashmoq", example: "Many students participated in the competition." },
  { id: 19, word: "require", meaning: "talab qilmoq", example: "This job requires strong communication skills." },
  { id: 20, word: "significant", meaning: "muhim, ahamiyatli", example: "There has been a significant change in the plan." },
];

const B2Vocabulary = () => {
  const [showMeaning, setShowMeaning] = useState({});

  const toggleMeaning = (id) => {
    setShowMeaning((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
      <div className="learn-page">
    <button className="lkmn">←orqaga</button>     <h1 className="learn-title">B2 – Upper-Intermediate Vocabulary</h1>

        <div className="lesson-grid">
          {words.map((item) => (
            <div
              key={item.id}
              className="lesson-card cursor-pointer"
              onClick={() => toggleMeaning(item.id)}
            >
              <div className="lesson-circle">
                {item.word.charAt(0).toUpperCase()}
              </div>
              <h2>{item.word}</h2>
              {showMeaning[item.id] && (
                <div className="mt-2 text-sm text-gray-700">
                  <p><strong>Meaning:</strong> {item.meaning}</p>
                  <p><strong>Example:</strong> {item.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-gray-600">
          💡 Maslahat: So‘zlarni yozma insholarda va og‘zaki nutqda ishlatishga harakat qiling – shunda B2 darajaga xos bo‘ladi.
        </p>
      </div>
    </div>
  );
};

export default B2Vocabulary;
