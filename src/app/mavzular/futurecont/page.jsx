"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "Men ertaga soat 8 da dars qilayotgan bo‘laman", a: "I will be studying at 8 o’clock tomorrow." },
  { q: "Ular ertaga futbol o‘ynayotgan bo‘lishadi", a: "They will be playing football tomorrow." },
  { q: "Biz shu paytda sayohat qilayotgan bo‘lamiz", a: "We will be traveling at that time." },
  { q: "U kechqurun televizor ko‘rayotgan bo‘ladi", a: "He will be watching TV in the evening." },
  { q: "Men kutubxonada o‘qiyotgan bo‘laman", a: "I will be reading in the library." },
  { q: "Ular ishda ishlayotgan bo‘lishadi", a: "They will be working at the office." },
  { q: "Biz kechqurun ovqatlanayotgan bo‘lamiz", a: "We will be having dinner in the evening." },
  { q: "U uxlayotgan bo‘ladi", a: "She will be sleeping." },
  { q: "Men senga qo‘ng‘iroq qilayotgan bo‘laman", a: "I will be calling you." },
  { q: "Ular mashina haydayotgan bo‘lishadi", a: "They will be driving a car." }
];

const normalize = (text = "") =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const FutureContinuousPage = () => {
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
          setShowResult(null);
        }
      }, 900);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const newHearts = h - 1;
        if (newHearts <= 0) {
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
                    bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-100 px-4 py-10 sm:py-16">
      <div className="w-full max-w-4xl space-y-10 text-center px-4 sm:px-6">

        {/* Title */}
        <header>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
                         bg-gradient-to-r from-sky-600 to-blue-600 
                         bg-clip-text text-transparent drop-shadow-sm">
            ⏳ Future Continuous Tense
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Future Continuous</b> – kelajakda ma’lum bir paytda davom etayotgan ish-harakatni bildiradi.  
            Asosan <b>will be + V-ing</b> shaklida tuziladi.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-700 mb-4">📘 Tuzilishi</h2>

          {/* Make table horizontally scrollable on small screens */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
            <table className="w-full min-w-[640px] text-center border-collapse rounded-xl">
              <thead>
                <tr className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-800">
                  <th className="border px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">Tur</th>
                  <th className="border px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">Formula</th>
                  <th className="border px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">Misol</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-blue-50 transition">
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Affirmative</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Subject + will be + V-ing</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">I will be reading a book.</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-sky-50 transition">
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Negative</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Subject + will not be + V-ing</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">She won’t be watching TV.</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Question</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Will + Subject + be + V-ing?</td>
                  <td className="border px-3 sm:px-4 py-3 text-sm sm:text-base">Will they be working tomorrow?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-sky-700 mb-3">🚦 Signal words</h2>
          <p className="text-sm sm:text-base text-gray-700 italic max-w-2xl mx-auto">
            at this time tomorrow, at 5 p.m. tomorrow, soon, next week, in the evening...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10 text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-700 mb-4">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            <li><u>I will be studying</u> at 8 o’clock tomorrow.</li>
            <li><u>They will be playing</u> football in the evening.</li>
            <li><u>We will be traveling</u> next week.</li>
            <li><u>She will be cooking</u> dinner at that time.</li>
            <li><u>Will</u> you <u>be working</u> tomorrow?</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-3xl border border-gray-200 p-6 sm:p-10">
          <h2 className="text-lg sm:text-xl font-semibold text-sky-700 mb-4">📚 Qo‘shimcha ma’lumot</h2>
          <ul className="text-left text-gray-700 text-sm sm:text-base max-w-2xl mx-auto space-y-2">
            <li><b>will be + V-ing</b> — barcha shaxslar uchun bir xil ishlatiladi.</li>
            <li>Kelajakda ma’lum vaqtda davom etayotgan harakatni bildiradi.</li>
            <li><i>Masalan:</i> “This time tomorrow, I will be flying to London.”</li>
          </ul>
        </section>

        {/* Quiz Game (single input style from original, responsive) */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-700 mb-4">🎮 Future Continuous Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-xl sm:text-3xl mb-4">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* Question */}
          <p className="text-base sm:text-lg font-medium text-gray-800 mb-4">
            Level {level + 1}: {questions[level].q}
          </p>

          {/* Input area - responsive */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="✍️ Javob yozing..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCheck(); }}
              aria-label="Javob"
              className="w-full sm:w-2/3 lg:w-1/2 p-3 sm:p-4 border-2 border-gray-300 rounded-2xl 
                         shadow-sm bg-white text-gray-900 placeholder-gray-400
                         focus:border-sky-500 focus:ring-4 focus:ring-sky-100 
                         transition-all duration-200 outline-none text-sm sm:text-base"
            />

            <button
              onClick={handleCheck}
              className="mt-4 sm:mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 
                         text-white font-medium rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              ✅ Check
            </button>
          </div>

          {/* Result */}
          <div className="mt-4 min-h-[28px]">
            {showResult === true && (
              <p className="text-green-700 font-semibold">✅ To‘g‘ri!</p>
            )}
            {showResult === false && (
              <p className="text-red-600 font-semibold">❌ Noto‘g‘ri!</p>
            )}
          </div>
        </section>
      </div>

      <ToastContainer position="top-center" />
    </div>
    </div>
  );
};

export default FutureContinuousPage;
