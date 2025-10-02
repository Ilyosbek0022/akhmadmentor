'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "advice", meaning: "maslahat", example: "She gave me good advice." },
  { id: 2, word: "agree", meaning: "rozilik bildirmoq", example: "I agree with your opinion." },
  { id: 3, word: "borrow", meaning: "qarzga olmoq", example: "Can I borrow your pen?" },
  { id: 4, word: "challenge", meaning: "qiyinchilik", example: "Climbing that mountain was a big challenge." },
  { id: 5, word: "community", meaning: "jamiyat", example: "Our community is very friendly." },
  { id: 6, word: "compare", meaning: "solishtirmoq", example: "Let’s compare these two products." },
  { id: 7, word: "decision", meaning: "qaror", example: "It was a difficult decision to make." },
  { id: 8, word: "develop", meaning: "rivojlantirmoq", example: "They want to develop new software." },
  { id: 9, word: "environment", meaning: "atrof-muhit", example: "We must protect the environment." },
  { id: 10, word: "experience", meaning: "tajriba", example: "I had a great experience in London." },
  { id: 11, word: "government", meaning: "hukumat", example: "The government announced new rules." },
  { id: 12, word: "improve", meaning: "yaxshilamoq", example: "Reading books helps you improve your vocabulary." },
  { id: 13, word: "include", meaning: "o‘z ichiga olmoq", example: "The price includes breakfast." },
  { id: 14, word: "interest", meaning: "qiziqish", example: "He has an interest in history." },
  { id: 15, word: "knowledge", meaning: "bilim", example: "Knowledge is power." },
  { id: 16, word: "opinion", meaning: "fikr", example: "Everyone has a different opinion." },
  { id: 17, word: "problem", meaning: "muammo", example: "We need to solve this problem quickly." },
  { id: 18, word: "reason", meaning: "sabab", example: "What’s the reason for your absence?" },
  { id: 19, word: "relationship", meaning: "munosabat", example: "They have a close relationship." },
  { id: 20, word: "solution", meaning: "yechim", example: "We must find a solution to this issue." },
];

const B1Vocabulary = () => {
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
   <a href="/learn/vocab"><button className="lkmn">←orqaga</button></a>     <h1 className="learn-title">B1 – Intermediate Vocabulary</h1>

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
          💡 Maslahat: So‘zlarni yodlab, o‘z hayotingizga oid gaplarda ishlatib ko‘ring – shunda tez esda qoladi!
        </p>
      </div>
    </div>
  );
};

export default B1Vocabulary;
