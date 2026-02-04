'use client'
import React, { useState } from "react";

const words = ["because", "but", "didn’t like", "enjoy", "favourite", "for", "fun", "like", "so", "started"];

const FillInTheBlanks = () => {
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [checked, setChecked] = useState(false);

  const correctAnswers = [
    "favourite",
    "for",
    "like",
    "but",
    "started",
    "so",
    "enjoy",
    "fun",
    "didn’t like",
    "because"
  ];

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    if (checked) setChecked(false); // reset check when user changes answer
  };

  const checkAnswers = () => {
    setChecked(true);
    const results = answers.map((ans, i) => ans.trim().toLowerCase() === correctAnswers[i].toLowerCase());
    
    const correctCount = results.filter(Boolean).length;
    alert(
      `Natija: ${correctCount}/${correctAnswers.length}\n\n` +
      results.map((res, i) => `Bo'shliq ${i + 1}: ${res ? "✅ To'g'ri" : "❌ Noto'g'ri"}`).join("\n")
    );
  };

  const getSelectClass = (index) => {
    if (!checked) return "";
    const userAns = answers[index]?.trim().toLowerCase();
    const correct = correctAnswers[index].toLowerCase();
    if (userAns === correct) return "border-green-500 bg-green-50 text-green-800";
    if (userAns && userAns !== correct) return "border-red-500 bg-red-50 text-red-800";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Fill in the Blanks</h1>
          <p className="text-indigo-100 text-lg">
            Table tennis haqidagi matnni to‘ldiring. So‘zlarni to‘g‘ri joylashtiring!
          </p>
        </div>

        {/* Words box */}
        <div className="p-6 md:p-8 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Foydalaniladigan so‘zlar:</h2>
          <div className="flex flex-wrap gap-3">
            {words.map((word) => (
              <span
                key={word}
                className="suzlar px-4 py-2 bg-white border border-indigo-200 rounded-full text-indigo-700 font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-10 space-y-10">
          {/* Paragraph 1 */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            Table tennis is my{" "}
            <select
              onChange={(e) => handleChange(0, e.target.value)}
              value={answers[0]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(0)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            hobby. I play it with my cousin at the sports centre near my house. We practise{" "}
            <select
              onChange={(e) => handleChange(1, e.target.value)}
              value={answers[1]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(1)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            one or two hours three days a week. We sometimes play other sports,{" "}
            <select
              onChange={(e) => handleChange(2, e.target.value)}
              value={answers[2]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(2)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            basketball or volleyball,{" "}
            <select
              onChange={(e) => handleChange(3, e.target.value)}
              value={answers[3]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(3)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            I prefer table tennis.
          </div>

          {/* Paragraph 2 */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            I{" "}
            <select
              onChange={(e) => handleChange(4, e.target.value)}
              value={answers[4]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(4)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            playing table tennis two years ago. My cousin showed me how to play, and I loved it,{" "}
            <select
              onChange={(e) => handleChange(5, e.target.value)}
              value={answers[5]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(5)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            I wanted to learn more. At first, it was a bit difficult,{" "}
            <select
              onChange={(e) => handleChange(6, e.target.value)}
              value={answers[6]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(6)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            practised a lot and got better. Now I sometimes play in competitions.
          </div>

          {/* Paragraph 3 */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            I{" "}
            <select
              onChange={(e) => handleChange(7, e.target.value)}
              value={answers[7]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(7)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            playing table tennis because it’s{" "}
            <select
              onChange={(e) => handleChange(8, e.target.value)}
              value={answers[8]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(8)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            and it’s important to do exercise. I tried other sports, like swimming and football, but I{" "}
            <select
              onChange={(e) => handleChange(9, e.target.value)}
              value={answers[9]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(9)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>{" "}
            them. I prefer table tennis because it’s exciting, and you can learn it quickly.
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={checkAnswers}
            disabled={answers.every(a => !a.trim())}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Javoblarni tekshirish
          </button>

          {checked && (
            <button
              onClick={() => {
                setAnswers(Array(10).fill(""));
                setChecked(false);
              }}
              className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all shadow-md"
            >
              Qayta boshlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlanks;