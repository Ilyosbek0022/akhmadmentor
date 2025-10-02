'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "airport", meaning: "aeroport", example: "We arrived at the airport early." },
  { id: 2, word: "angry", meaning: "jahli chiqqan", example: "She was angry with her brother." },
  { id: 3, word: "beautiful", meaning: "chiroyli", example: "The garden is beautiful in spring." },
  { id: 4, word: "busy", meaning: "band", example: "The street is busy with cars." },
  { id: 5, word: "clothes", meaning: "kiyimlar", example: "I bought new clothes yesterday." },
  { id: 6, word: "country", meaning: "mamlakat", example: "France is a beautiful country." },
  { id: 7, word: "different", meaning: "boshqa, turli", example: "We like different kinds of music." },
  { id: 8, word: "early", meaning: "erta", example: "He woke up early in the morning." },
  { id: 9, word: "family", meaning: "oila", example: "My family is very important to me." },
  { id: 10, word: "holiday", meaning: "ta’til", example: "We went to Spain on holiday." },
  { id: 11, word: "interesting", meaning: "qiziqarli", example: "The film was very interesting." },
  { id: 12, word: "language", meaning: "til", example: "English is an international language." },
  { id: 13, word: "market", meaning: "bozor", example: "She buys vegetables at the market." },
  { id: 14, word: "money", meaning: "pul", example: "I don’t have enough money." },
  { id: 15, word: "never", meaning: "hech qachon", example: "I never eat fast food." },
  { id: 16, word: "often", meaning: "tez-tez", example: "They often go to the park." },
  { id: 17, word: "sometimes", meaning: "ba’zan", example: "I sometimes watch TV in the evening." },
  { id: 18, word: "tired", meaning: "charchagan", example: "He is tired after work." },
  { id: 19, word: "weather", meaning: "ob-havo", example: "The weather is hot today." },
  { id: 20, word: "yesterday", meaning: "kecha", example: "I met him yesterday." },
];

const A2Vocabulary = () => {
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
      <a href="/learn/vocab"><button className="lkmn">←orqaga</button></a>    <h1 className="learn-title">A2 – Elementary Vocabulary</h1>

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
          💡 Maslahat: So‘zlarni o‘qib, tarjimasini ochib ko‘ring va misol gapni baland ovozda takrorlang!
        </p>
      </div>
    </div>
  );
};

export default A2Vocabulary;
