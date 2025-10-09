"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "Men kecha kitob o‘qidim", a: "I read a book yesterday." },
  { q: "Ular o‘tgan hafta Samarqandga bordi", a: "They visited Samarkand last week.", a: "They went to the Samarkand last week.", a: "They went to  Samarkand last week." },
  { q: "U ikki kun oldin ovqat pishirdi", a: "She cooked dinner two days ago." },
  { q: "Biz kecha futbol o‘ynadik", a: "We played football yesterday." },
  { q: "U ishga bormadi kecha", a: "He didn’t go to work yesterday." },
  { q: "Men savolni tushunmadim", a: "I didn’t understand the question." },
  { q: "Siz o‘sha filmni ko‘rdingizmi?", a: "Did you see that film?" },
  { q: "Ular o‘tgan yili uchrashdimi?", a: "Did they meet last year?" },
  { q: "Men bolaligimda Toshkentga bordim", a: "I visited Tashkent when I was a child." },
  { q: "Biz 2000-yilda Angliyaga borgan edik", a: "We visited England in 2000." }
];

// Tekshiruvni yumshatish funksiyasi
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PastSimplePage = () => {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0); 
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const userAns = normalize(answer);
    const correctAns = normalize(questions[level].a);

    if (userAns === correctAns) {
      setShowResult(true);
      toast.success(`🎉 Level ${level + 1} cleared!`);
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setAnswer("");
          setShowResult(null);
        } else {
          toast.success("🏆 Tabriklaymiz! Barcha levelni tugatdingiz!");
          setLevel(0);
          setHearts(3);
          setAnswer("");
        }
      }, 1200);
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
          }, 1500);
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
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-purple-600 to-pink-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ⏳ Past Simple Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Past Simple</b> – o‘tgan zamonda tugallangan ish-harakatlarni ifodalaydi.
            Kundalik muloqotda eng ko‘p ishlatiladigan zamonlardan biri.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📌 Tuzilishi</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                <th className="border px-4 py-3">Tur</th>
                <th className="border px-4 py-3">Formula</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Affirmative</td>
                <td className="border px-4 py-4">Subject + V2 (ed)</td>
                <td className="border px-4 py-4">I visited Tashkent.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + did not + V1</td>
                <td className="border px-4 py-4">She didn’t play football.</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Did + Subject + V1?</td>
                <td className="border px-4 py-4">Did you watch TV?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            yesterday, last week, ago, in 2000, when I was a child, two days ago, last year...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I watched</u> a movie <i>yesterday</i>.</li>
            <li><u>They visited</u> Samarkand <i>last week</i>.</li>
            <li><u>She cooked</u> dinner two days <i>ago</i>.</li>
            <li><u>We played</u> football after school.</li>
            <li><u>He didn’t</u> go to work <i>yesterday</i>.</li>
            <li><u>I didn’t</u> understand the question.</li>
            <li><u>Did</u> you see that film?</li>
            <li><u>Did</u> they meet <i>last year</i>?</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo‘shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>To be (was/were)</b> → I was at home. / They were at school.</li>
            <li><b>Regular verbs</b> → V + ed → played, watched, cleaned.</li>
            <li><b>Irregular verbs</b> → go → went, see → saw, eat → ate.</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Past Simple Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-3xl mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* Question */}
          <p className="text-lg font-medium text-gray-800 mb-4">
            Level {level + 1}: {questions[level].q}
          </p>

          {/* Input */}
          <input
            type="text"
            placeholder="✍️ Javob yozing..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-2/3 p-4 border-2 border-gray-300 rounded-2xl 
                       shadow-md bg-white 
                       text-gray-900 placeholder-gray-400
                       focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                       transition-all duration-300 outline-none text-lg"
          />

          {/* Button */}
          <button
            onClick={handleCheck}
            className="px-8 py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white font-medium rounded-xl shadow-md 
                       hover:scale-105 transition-transform"
          >
            ✅ Check
          </button>

          {/* Result */}
          {showResult === true && (
            <p className="mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>
          )}
          {showResult === false && (
            <p className="mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>
          )}
        </section>
      </div>
      <ToastContainer position="top-center" />
    </div>
    </div>
  );
};

export default PastSimplePage;
