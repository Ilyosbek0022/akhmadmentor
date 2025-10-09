"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "He said, 'I am tired.' → ?", a: "He said he was tired." },
  { q: "She said, 'I have finished my work.' → ?", a: "She said she had finished her work." },
  { q: "They said, 'We will go to the park.' → ?", a: "They said they would go to the park." },
  { q: "He said, 'I was playing football.' → ?", a: "He said he had been playing football." },
  { q: "She said, 'I can swim.' → ?", a: "She said she could swim." },
  { q: "He said, 'I may come tomorrow.' → ?", a: "He said he might come the next day." },
  { q: "They said, 'We are watching TV.' → ?", a: "They said they were watching TV." },
  { q: "She said, 'I must go now.' → ?", a: "She said she had to go then." },
  { q: "He said, 'I like apples.' → ?", a: "He said he liked apples." },
  { q: "She said, 'I am studying English.' → ?", a: "She said she was studying English." },
];

const normalize = (t) => t.toLowerCase().trim().replace(/[.?!]/g, "");

const ReportedSpeechPage = () => {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const userAns = normalize(answer);
    const correct = normalize(questions[level].a);
    if (userAns === correct) {
      setShowResult(true);
      toast.success(`✅ To‘g‘ri! Level ${level + 1} cleared!`);
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setAnswer("");
          setShowResult(null);
        } else {
          toast.success("🏆 Barcha savollar tugadi!");
          setLevel(0);
          setHearts(3);
          setAnswer("");
        }
      }, 1000);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const nh = h - 1;
        if (nh === 0) {
          toast.error("💔 Yurak tugadi! Qayta boshlang!");
          setTimeout(() => {
            setLevel(0);
            setHearts(3);
            setAnswer("");
            setShowResult(null);
          }, 1500);
        }
        return nh;
      });
    }
  };

  return (
    <div className="all">
      {/* Header */}
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

      <div className="min-h-screen flex items-center justify-center 
                      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 px-6 py-16">
        <div className="max-w-5xl w-full space-y-16 text-center">

          {/* Title */}
          <header>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
              🗣 Reported Speech
            </h1>
         
          </header>

          {/* Tense Change Table */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">⏳ Tense o‘zgarishlari (Backshift)</h2>
            <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                  <th className="border px-4 py-3">Direct Speech</th>
                  <th className="border px-4 py-3">Reported Speech</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-purple-50 transition">
                  <td className="border px-4 py-4">Present Simple</td>
                  <td className="border px-4 py-4">Past Simple</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-pink-50 transition">
                  <td className="border px-4 py-4">Present Continuous</td>
                  <td className="border px-4 py-4">Past Continuous</td>
                </tr>
                <tr className="hover:bg-purple-50 transition">
                  <td className="border px-4 py-4">Present Perfect</td>
                  <td className="border px-4 py-4">Past Perfect</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-pink-50 transition">
                  <td className="border px-4 py-4">Past Simple</td>
                  <td className="border px-4 py-4">Past Perfect</td>
                </tr>
                <tr className="hover:bg-purple-50 transition">
                  <td className="border px-4 py-4">Will</td>
                  <td className="border px-4 py-4">Would</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-pink-50 transition">
                  <td className="border px-4 py-4">Can</td>
                  <td className="border px-4 py-4">Could</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Signal words */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🔁 Vaqt so‘zlarining o‘zgarishi</h2>
            <p className="text-gray-700 text-lg italic">
              today → that day, tomorrow → the next day, yesterday → the day before, 
              now → then, ago → before, this → that, these → those
            </p>
          </section>

          {/* Quiz */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Reported Speech Mini Quiz</h2>
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
              placeholder="✍️ Javob yozing..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-2/3 p-4 border-2 border-gray-300 rounded-2xl 
                         shadow-md bg-white text-gray-900 placeholder-gray-400
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                         transition-all duration-300 outline-none text-lg"
            />
            <button
              onClick={handleCheck}
              className="px-8 py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                         text-white font-medium rounded-xl shadow-md 
                         hover:scale-105 transition-transform"
            >
              ✅ Check
            </button>
            {showResult === true && <p className="mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>}
            {showResult === false && <p className="mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>}
          </section>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ReportedSpeechPage;
