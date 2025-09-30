'use client'
import React, { useState } from "react";

const words = [
  { id: 1, word: "ambiguity", meaning: "noaniqlik", example: "The ambiguity of the text confused the readers." },
  { id: 2, word: "coherent", meaning: "mantiqli, izchil", example: "She gave a coherent explanation of her ideas." },
  { id: 3, word: "compelling", meaning: "ishontiruvchi, kuchli", example: "He made a compelling argument during the debate." },
  { id: 4, word: "contemplate", meaning: "chuqur o‘ylamoq", example: "She contemplated moving to another country." },
  { id: 5, word: "credible", meaning: "ishonchli", example: "The witness gave a credible statement." },
  { id: 6, word: "detrimental", meaning: "zararli, salbiy", example: "Smoking has a detrimental effect on health." },
  { id: 7, word: "discretion", meaning: "ehtiyotkorlik", example: "Use discretion when discussing sensitive topics." },
  { id: 8, word: "elaborate", meaning: "batafsil tushuntirmoq", example: "Can you elaborate on your last point?" },
  { id: 9, word: "emphasize", meaning: "urg‘u bermoq", example: "The teacher emphasized the importance of practice." },
  { id: 10, word: "feasible", meaning: "amalga oshadigan, real", example: "This plan seems feasible given our budget." },
  { id: 11, word: "fluctuate", meaning: "o‘zgarib turmoq", example: "Prices fluctuate depending on the season." },
  { id: 12, word: "hypothetical", meaning: "faraziy", example: "They discussed a hypothetical situation." },
  { id: 13, word: "implement", meaning: "amalga oshirmoq", example: "The company will implement a new policy." },
  { id: 14, word: "inevitable", meaning: "muqarrar", example: "Change is inevitable in life." },
  { id: 15, word: "intricate", meaning: "murakkab, chigal", example: "The watch had an intricate design." },
  { id: 16, word: "justify", meaning: "oqilona asoslamoq", example: "He tried to justify his late arrival." },
  { id: 17, word: "notion", meaning: "tushuncha, qarash", example: "She disagreed with the notion of luck." },
  { id: 18, word: "prevalent", meaning: "keng tarqalgan", example: "This belief is prevalent in many cultures." },
  { id: 19, word: "substantiate", meaning: "isbotlamoq", example: "He couldn’t substantiate his claim with evidence." },
  { id: 20, word: "viable", meaning: "hayotiy, ishlaydigan", example: "This is not a viable solution for the problem." },
];

const C1Vocabulary = () => {
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
      <button className="lkmn">←orqaga</button>   <h1 className="learn-title">C1 – Advanced Vocabulary</h1>

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
          💡 Maslahat: C1 darajasida so‘zlarni **esse yozishda, akademik munozaralarda** ishlatib ko‘ring.
        </p>
      </div>
    </div>
  );
};

export default C1Vocabulary;
