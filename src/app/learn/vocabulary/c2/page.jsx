'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "aberration", meaning: "me’yordan chetlanish", example: "His sudden anger was an aberration from his usual calmness." },
  { id: 2, word: "acrimonious", meaning: "achchiq, dushmanona", example: "The debate became increasingly acrimonious." },
  { id: 3, word: "alacrity", meaning: "shijoat, xursandlik bilan", example: "She accepted the invitation with alacrity." },
  { id: 4, word: "anachronistic", meaning: "zamonga to‘g‘ri kelmaydigan", example: "The novel contained anachronistic references to modern technology." },
  { id: 5, word: "antediluvian", meaning: "juda qadimiy", example: "He has some antediluvian views about gender roles." },
  { id: 6, word: "conundrum", meaning: "murakkab muammo", example: "The engineers faced a conundrum during the project." },
  { id: 7, word: "deleterious", meaning: "zararli, halokatli", example: "The policy had deleterious effects on the economy." },
  { id: 8, word: "ephemeral", meaning: "o‘tkinchi, qisqa muddatli", example: "Fame can be ephemeral in the entertainment industry." },
  { id: 9, word: "esoteric", meaning: "tor doiraga oid, maxfiy", example: "The professor’s lecture was full of esoteric references." },
  { id: 10, word: "fastidious", meaning: "nihoyatda talabchan", example: "He was fastidious about cleanliness." },
  { id: 11, word: "intransigent", meaning: "murosasiz", example: "The union remained intransigent during negotiations." },
  { id: 12, word: "lachrymose", meaning: "ko‘z yoshi to‘kadigan, qayg‘uli", example: "It was a lachrymose film that made everyone cry." },
  { id: 13, word: "munificent", meaning: "saxiy, nihoyatda qo‘l ochiq", example: "The billionaire was munificent in his donations." },
  { id: 14, word: "obfuscate", meaning: "chalkashtirmoq, noaniq qilmoq", example: "The company tried to obfuscate the real financial situation." },
  { id: 15, word: "paradigm", meaning: "namuna, model", example: "This discovery shifted the scientific paradigm." },
  { id: 16, word: "pellucid", meaning: "nihoyatda tiniq", example: "The lake was pellucid and beautiful." },
  { id: 17, word: "perfunctory", meaning: "rasmiyatchilik uchun qilingan", example: "He gave a perfunctory nod and walked away." },
  { id: 18, word: "recalcitrant", meaning: "itoatsiz, bo‘ysunmaydigan", example: "The recalcitrant student refused to follow the rules." },
  { id: 19, word: "sagacious", meaning: "donishmand, zukko", example: "She is a sagacious leader admired by many." },
  { id: 20, word: "ubiquitous", meaning: "hamma joyda uchraydigan", example: "Smartphones have become ubiquitous in modern society." },
];

const C2Vocabulary = () => {
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
      <a href="/learn/vocab"><button className="lkmn">←orqaga</button> </a>    <h1 className="learn-title">C2 – Proficiency Vocabulary</h1>

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
                <div className="mt-2 text-sm text-gray-700  fonstizeuchun">
                  <p><strong>Meaning:</strong> {item.meaning}</p>
                  <p><strong>Example:</strong> {item.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-gray-600">
          💡 Maslahat: C2 darajasidagi so‘zlarni **ilmiy maqolalarda, rasmiy yozishmalarda, akademik chiqishlarda** qo‘llashga harakat qiling.
        </p>
      </div>
    </div>
  );
};

export default C2Vocabulary;
