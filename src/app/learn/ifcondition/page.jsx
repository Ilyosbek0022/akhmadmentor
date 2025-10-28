"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "If you heat water, it ___ (boil).", a: "boils" },
  { q: "If it rains, we ___ (stay) at home.", a: "will stay" },
  { q: "If I were you, I ___ (study) harder.", a: "would study" },
  { q: "If they had known, they ___ (help) you.", a: "would have helped" },
  { q: "If I had studied, I ___ (be) a doctor now.", a: "would be" },
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const IfConditionalsPage = () => {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const userAns = normalize(answer);
    const correctAns = normalize(questions[level].a);

    if (userAns === correctAns) {
      setShowResult(true);
      toast.success(`🎉 To‘g‘ri! Level ${level + 1} cleared!`);
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setAnswer("");
          setShowResult(null);
        } else {
          toast.success("🏆 Tabriklaymiz! Barcha conditionallarni tugatdingiz!");
          setLevel(0);
          setHearts(3);
          setAnswer("");
        }
      }, 1000);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const newHearts = h - 1;
        if (newHearts === 0) {
          toast.error("💔 O‘yin tugadi! Qaytadan boshlang!");
          setTimeout(() => {
            setLevel(0);
            setHearts(3);
            setAnswer("");
            setShowResult(null);
          }, 1200);
        }
        return newHearts;
      });
    }
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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">
        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-md">
            🌿 If Conditionals
          </h1>
          
        </header>

        {/* Structure Table */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📘 Asosiy turlari</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800">
                <th className="border px-4 py-3">Turi</th>
                <th className="border px-4 py-3">If (Condition)</th>
                <th className="border px-4 py-3">Main (Result)</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Zero Conditional</td>
                <td className="border px-4 py-4">Present Simple</td>
                <td className="border px-4 py-4">Present Simple</td>
                <td className="border px-4 py-4">If you heat water, it boils.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-emerald-50 transition">
                <td className="border px-4 py-4 font-medium">First Conditional</td>
                <td className="border px-4 py-4">Present Simple</td>
                <td className="border px-4 py-4">Future Simple (will + V)</td>
                <td className="border px-4 py-4">If it rains, we will stay home.</td>
              </tr>
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Second Conditional</td>
                <td className="border px-4 py-4">Past Simple</td>
                <td className="border px-4 py-4">would + V</td>
                <td className="border px-4 py-4">If I were you, I would study.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-emerald-50 transition">
                <td className="border px-4 py-4 font-medium">Third Conditional</td>
                <td className="border px-4 py-4">Past Perfect</td>
                <td className="border px-4 py-4">would have + V3</td>
                <td className="border px-4 py-4">If they had known, they would have helped.</td>
              </tr>
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Mixed Conditional</td>
                <td className="border px-4 py-4">Past Perfect</td>
                <td className="border px-4 py-4">would + V</td>
                <td className="border px-4 py-4">If I had studied, I would be a doctor now.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚦 Signal Words</h2>
          <p className="text-gray-700 text-lg italic">
            if, unless, as long as, in case, provided that, when
          </p>
        </section>

        {/* Examples */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>If you heat</u> ice, it <u>melts</u>.</li>
            <li><u>If she studies</u> hard, she <u>will pass</u> the exam.</li>
            <li><u>If I had money</u>, I <u>would buy</u> a car.</li>
            <li><u>If they had left</u> earlier, they <u>would have arrived</u> on time.</li>
            <li><u>If I had listened</u> to you, I <u>would be</u> happier now.</li>
          </ul>
        </section>

        {/* Quiz */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">🎮 Conditional Challenge</h2>
          <div className="flex justify-center gap-2 text-3xl mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          <p className="text-lg font-medium text-gray-800 mb-4">
            Level {level + 1}: {questions[level].q}
          </p>

          <input
            type="text"
            placeholder="✍️ Fe’lni to‘ldiring..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-2/3 p-4 border-2 border-gray-300 rounded-2xl shadow-md bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 outline-none text-lg"
          />

          <button
            onClick={handleCheck}
            className="px-8 py-3 mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            ✅ Check
          </button>

          {showResult === true && (
            <p className="mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>
          )}
          {showResult === false && (
            <p className="mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>
          )}
        </section>
      </div>
      <ToastContainer
  position="top-center"
  style={{
    width: "auto",
    maxWidth: "220px",
    maxHeight: "120px",
    margin: "0 auto",
  }}
/>

    </div>
    </div>
  );
};

export default IfConditionalsPage;
