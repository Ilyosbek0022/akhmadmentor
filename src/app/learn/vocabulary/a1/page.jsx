'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "apple", meaning: "olma", example: "I eat an apple every day." },
  { id: 2, word: "book", meaning: "kitob", example: "This is my favorite book." },
  { id: 3, word: "dog", meaning: "it", example: "The dog is running in the park." },
  { id: 4, word: "cat", meaning: "mushuk", example: "The cat is sleeping." },
  { id: 5, word: "school", meaning: "maktab", example: "We go to school at 8 o'clock." },
  { id: 6, word: "teacher", meaning: "o‘qituvchi", example: "The teacher is very kind." },
  { id: 7, word: "water", meaning: "suv", example: "I drink water every morning." },
  { id: 8, word: "bread", meaning: "non", example: "We eat bread with butter." },
  { id: 9, word: "car", meaning: "mashina", example: "My father drives a car." },
  { id: 10, word: "house", meaning: "uy", example: "Our house is big." },
  { id: 11, word: "friend", meaning: "do‘st", example: "My friend is very nice." },
  { id: 12, word: "pen", meaning: "ruchka", example: "I write with a blue pen." },
  { id: 13, word: "milk", meaning: "sut", example: "The baby drinks milk." },
  { id: 14, word: "table", meaning: "stol", example: "The food is on the table." },
  { id: 15, word: "chair", meaning: "stul", example: "She sits on the chair." },
  { id: 16, word: "sun", meaning: "quyosh", example: "The sun is shining." },
  { id: 17, word: "moon", meaning: "oy", example: "The moon looks bright tonight." },
  { id: 18, word: "street", meaning: "ko‘cha", example: "The street is very busy." },
  { id: 19, word: "bread", meaning: "non", example: "We bought fresh bread." },
  { id: 20, word: "door", meaning: "eshik", example: "Please close the door." },
];

const A1Vocabulary = () => {
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
        <button className="lkmn">←orqaga</button> <h1 className="learn-title">A1 – Beginner Vocabulary </h1>

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
          💡 Maslahat: Kartochkaga bosib tarjimasini oching, yopib o‘zingizni sinab ko‘ring!
        </p>
      </div>
    </div>
  );
};

export default A1Vocabulary;
